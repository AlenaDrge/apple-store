document.addEventListener('DOMContentLoaded', function() {
    // Tải giỏ hàng
    loadCart();
    
    // Cập nhật số lượng giỏ hàng
    updateCartCount();
    
    // Xử lý thanh toán
    setupCheckout();
    
    // Kiểm tra trạng thái người dùng
    checkUserStatus();
});

// Tải giỏ hàng
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartElement = document.getElementById('empty-cart');
    const cartItemsCount = document.getElementById('cart-items-count');
    
    if (cart.length === 0) {
        // Hiển thị thông báo giỏ hàng trống
        if (emptyCartElement) {
            emptyCartElement.style.display = 'block';
        }
        
        // Ẩn phần tóm tắt đơn hàng nếu có
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.disabled = true;
            checkoutBtn.style.opacity = '0.6';
            checkoutBtn.style.cursor = 'not-allowed';
        }
        
        // Cập nhật số lượng sản phẩm
        if (cartItemsCount) {
            cartItemsCount.textContent = '0 sản phẩm';
        }
        
        return;
    }
    
    // Ẩn thông báo giỏ hàng trống
    if (emptyCartElement) {
        emptyCartElement.style.display = 'none';
    }
    
    // Kích hoạt nút thanh toán
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.disabled = false;
        checkoutBtn.style.opacity = '1';
        checkoutBtn.style.cursor = 'pointer';
    }
    
    // Hiển thị số lượng sản phẩm
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartItemsCount) {
        cartItemsCount.textContent = `${totalItems} sản phẩm`;
    }
    
    // Hiển thị sản phẩm trong giỏ hàng
    let html = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        
        html += `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </div>
                <div class="cart-item-info">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <p class="cart-item-description">${item.description}</p>
                    <div class="cart-item-price">${formatPrice(item.price)} VNĐ</div>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <div class="cart-item-total">${formatPrice(itemTotal)} VNĐ</div>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i> Xóa
                    </button>
                </div>
            </div>
        `;
    });
    
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = html;
    }
    
    // Cập nhật tổng tiền
    updateCartTotal();
}

// Cập nhật số lượng sản phẩm
function updateQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex === -1) return;
    
    const newQuantity = cart[itemIndex].quantity + change;
    
    if (newQuantity < 1) {
        // Xóa sản phẩm nếu số lượng = 0
        removeFromCart(productId);
        return;
    }
    
    cart[itemIndex].quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Cập nhật giao diện
    loadCart();
    updateCartCount();
    
    // Hiển thị thông báo
    showNotification(`Đã cập nhật số lượng sản phẩm`);
}

// Xóa sản phẩm khỏi giỏ hàng
function removeFromCart(productId) {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?')) {
        return;
    }
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const initialLength = cart.length;
    
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Cập nhật giao diện
    loadCart();
    updateCartCount();
    
    // Hiển thị thông báo nếu đã xóa sản phẩm
    if (cart.length < initialLength) {
        showNotification('Đã xóa sản phẩm khỏi giỏ hàng');
    }
}

// Cập nhật tổng tiền
function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Tính tổng tiền
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 30000 : 0; // Phí vận chuyển 30,000 VNĐ
    const tax = Math.round(subtotal * 0.1); // Thuế VAT 10%
    const total = subtotal + shipping + tax;
    
    // Cập nhật giao diện
    const subtotalElement = document.getElementById('subtotal-price');
    const shippingElement = document.getElementById('shipping-price');
    const taxElement = document.getElementById('tax-price');
    const totalElement = document.getElementById('total-price');
    
    if (subtotalElement) subtotalElement.textContent = `${formatPrice(subtotal)} VNĐ`;
    if (shippingElement) shippingElement.textContent = `${formatPrice(shipping)} VNĐ`;
    if (taxElement) taxElement.textContent = `${formatPrice(tax)} VNĐ`;
    if (totalElement) totalElement.textContent = `${formatPrice(total)} VNĐ`;
}

// Thiết lập thanh toán
function setupCheckout() {
    const checkoutBtn = document.getElementById('checkout-btn');
    const confirmCheckoutBtn = document.getElementById('confirm-checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeModal = checkoutModal.querySelector('.close-modal');
    
    if (!checkoutBtn || !checkoutModal) return;
    
    // Mở modal thanh toán
    checkoutBtn.addEventListener('click', function() {
        // Kiểm tra xem người dùng đã đăng nhập chưa
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (!currentUser) {
            alert('Vui lòng đăng nhập để tiếp tục thanh toán!');
            window.location.href = 'login.html?redirect=cart';
            return;
        }
        
        // Tải thông tin thanh toán
        loadCheckoutSummary();
        
        // Điền thông tin người dùng nếu có
        if (currentUser) {
            document.getElementById('customer-name').value = currentUser.name || '';
            document.getElementById('customer-email').value = currentUser.email || '';
            document.getElementById('customer-phone').value = currentUser.phone || '';
            document.getElementById('customer-address').value = currentUser.address || '';
        }
        
        // Hiển thị modal
        checkoutModal.style.display = 'flex';
    });
    
    // Đóng modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            checkoutModal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === checkoutModal) {
            checkoutModal.style.display = 'none';
        }
    });
    
    // Xác nhận thanh toán
    if (confirmCheckoutBtn) {
        confirmCheckoutBtn.addEventListener('click', function() {
            processCheckout();
        });
    }
}

// Tải tóm tắt thanh toán
function loadCheckoutSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutSummary = document.getElementById('checkout-summary');
    
    if (!checkoutSummary) return;
    
    if (cart.length === 0) {
        checkoutSummary.innerHTML = '<p>Giỏ hàng của bạn đang trống.</p>';
        return;
    }
    
    // Tính tổng tiền
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 30000 : 0;
    const tax = Math.round(subtotal * 0.1);
    const total = subtotal + shipping + tax;
    
    let itemsHtml = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        itemsHtml += `
            <div class="order-item">
                <div class="order-item-info">
                    <div class="order-item-name">${item.name}</div>
                    <div class="order-item-quantity">Số lượng: ${item.quantity}</div>
                </div>
                <div class="order-item-price">${formatPrice(itemTotal)} VNĐ</div>
            </div>
        `;
    });
    
    checkoutSummary.innerHTML = `
        <div class="order-summary-checkout">
            <div class="order-items-summary">
                ${itemsHtml}
            </div>
            <div class="summary-details">
                <div class="summary-row">
                    <span>Tạm tính</span>
                    <span>${formatPrice(subtotal)} VNĐ</span>
                </div>
                <div class="summary-row">
                    <span>Phí vận chuyển</span>
                    <span>${formatPrice(shipping)} VNĐ</span>
                </div>
                <div class="summary-row">
                    <span>Thuế (VAT 10%)</span>
                    <span>${formatPrice(tax)} VNĐ</span>
                </div>
                <div class="summary-row total">
                    <span>Tổng cộng</span>
                    <span>${formatPrice(total)} VNĐ</span>
                </div>
            </div>
        </div>
    `;
}

// Xử lý thanh toán
function processCheckout() {
    // Lấy thông tin từ form
    const customerName = document.getElementById('customer-name').value.trim();
    const customerEmail = document.getElementById('customer-email').value.trim();
    const customerPhone = document.getElementById('customer-phone').value.trim();
    const customerAddress = document.getElementById('customer-address').value.trim();
    const paymentMethod = document.getElementById('payment-method').value;
    const orderNotes = document.getElementById('order-notes').value.trim();
    
    // Kiểm tra thông tin
    if (!customerName || !customerEmail || !customerPhone || !customerAddress || !paymentMethod) {
        alert('Vui lòng điền đầy đủ thông tin thanh toán!');
        return;
    }
    
    // Kiểm tra email hợp lệ
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
        alert('Vui lòng nhập địa chỉ email hợp lệ!');
        return;
    }
    
    // Kiểm tra số điện thoại hợp lệ
    const phoneRegex = /^(0|\+84)(\d{9,10})$/;
    if (!phoneRegex.test(customerPhone)) {
        alert('Vui lòng nhập số điện thoại hợp lệ!');
        return;
    }
    
    // Lấy giỏ hàng
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        alert('Giỏ hàng của bạn đang trống!');
        return;
    }
    
    // Tạo mã đơn hàng
    const orderId = 'APP' + Date.now().toString().substr(-8);
    
    // Tạo đơn hàng
    const order = {
        id: orderId,
        date: new Date().toISOString(),
        customer: {
            name: customerName,
            email: customerEmail,
            phone: customerPhone,
            address: customerAddress
        },
        items: cart,
        paymentMethod: paymentMethod,
        notes: orderNotes,
        status: 'pending'
    };
    
    // Lưu đơn hàng
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Xóa giỏ hàng
    localStorage.setItem('cart', JSON.stringify([]));
    
    // Hiển thị thông báo thành công
    document.getElementById('checkout-form').style.display = 'none';
    document.getElementById('checkout-success').style.display = 'block';
    document.getElementById('order-id').textContent = `#${orderId}`;
    
    // Cập nhật giao diện sau 5 giây
    setTimeout(() => {
        updateCartCount();
        loadCart();
    }, 100);
    
    // Cập nhật thông tin người dùng
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        currentUser.phone = customerPhone;
        currentUser.address = customerAddress;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
}

// Kiểm tra trạng thái người dùng
function checkUserStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userLoginBtn = document.getElementById('user-login-btn');
    const userRegisterBtn = document.getElementById('user-register-btn');
    const adminBtn = document.getElementById('admin-btn');
    
    if (currentUser) {
        // Người dùng đã đăng nhập
        if (userLoginBtn) userLoginBtn.textContent = currentUser.name;
        if (userRegisterBtn) userRegisterBtn.style.display = 'none';
        
        // Hiển thị nút admin nếu là admin
        if (adminBtn && currentUser.isAdmin) {
            adminBtn.style.display = 'flex';
        }
    } else {
        // Người dùng chưa đăng nhập
        if (adminBtn) adminBtn.style.display = 'none';
    }
}