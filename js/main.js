// Khởi tạo dữ liệu mẫu nếu chưa có
document.addEventListener('DOMContentLoaded', function() {
    initData();
    loadProducts();
    updateCartCount();
    updateUserStatus();
    updateOrdersCount();
    
    const modal = document.getElementById('product-modal');
    const closeModal = modal ? modal.querySelector('.close-modal') : null;
    
    if (closeModal && modal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    setupActiveNavigation();
    setupProfileForm();
});

// Khởi tạo dữ liệu mẫu
function initData() {
    // Kiểm tra xem đã có dữ liệu sản phẩm chưa
    if (!localStorage.getItem('products')) {
        if (typeof sampleProducts !== 'undefined' && Array.isArray(sampleProducts)) {
            localStorage.setItem('products', JSON.stringify(sampleProducts));
        } else {
            localStorage.setItem('products', JSON.stringify([]));
        }
    }
    
    // Kiểm tra xem đã có dữ liệu giỏ hàng chưa
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    
    // Kiểm tra xem đã có dữ liệu người dùng chưa
    if (!localStorage.getItem('users')) {
        if (typeof sampleUsers !== 'undefined' && Array.isArray(sampleUsers)) {
            localStorage.setItem('users', JSON.stringify(sampleUsers));
        } else {
            localStorage.setItem('users', JSON.stringify([]));
        }
    } else {
        // Đồng bộ role cho dữ liệu cũ
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        let updated = false;
        existingUsers.forEach(u => {
            if (!u.role) {
                u.role = u.isAdmin ? 'admin' : 'user';
                updated = true;
            }
        });
        if (updated) {
            localStorage.setItem('users', JSON.stringify(existingUsers));
        }
    }
    
    if (!localStorage.getItem('orders')) {
        if (typeof sampleOrders !== 'undefined' && Array.isArray(sampleOrders)) {
            localStorage.setItem('orders', JSON.stringify(sampleOrders));
        } else {
            localStorage.setItem('orders', JSON.stringify([]));
        }
    }
    
    // Thêm dữ liệu giỏ hàng cho từng user (demo)
    if (!localStorage.getItem('userCarts')) {
        const userCarts = {
            2: [ // User ID 2
                {
                    id: 1,
                    name: 'iPhone 14 Pro Max',
                    price: 29990000,
                    quantity: 1,
                    image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/_/t_m_19.png'
                },
                {
                    id: 61,
                    name: 'AirPods Pro 2',
                    category: 'airpods',
                    price: 6990000,
                    quantity: 1,
                    description: 'AirPods Pro thế hệ 2 với tính năng chống ồn chủ động, âm thanh chất lượng cao và sạc không dây.',
                    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/i/airpods_pro_2_sep24_pdp_image_position_7__vn-vi.jpg'
                }
            ],
            3: [ // User ID 3
                {
                    id: 22,
                    name: 'MacBook Air M2',
                    category: 'macbooks',
                    price: 27990000,
                    quantity: 1,
                    description: 'MacBook Air siêu mỏng nhẹ với chip M2, 8GB RAM, SSD 256GB, thời lượng pin lên đến 18 giờ.',
                    image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/m/a/macbook_air_m2_4_1_1_2.jpg'
                }
            ]
        };
        
        localStorage.setItem('userCarts', JSON.stringify(userCarts));
    }
    // ===== HẾT ĐOẠN THÊM =====
}

// Tải sản phẩm lên trang chủ
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    // Phân loại sản phẩm theo danh mục
    const iphones = products.filter(product => product.category === 'iphones');
    const macbooks = products.filter(product => product.category === 'macbooks');
    const ipads = products.filter(product => product.category === 'ipads');
    const airpods = products.filter(product => product.category === 'airpods');
    const applewatches = products.filter(product => product.category === 'applewatches');
    
    // Hiển thị sản phẩm iPhone
    displayProducts(iphones, 'iphone-products');
    
    // Hiển thị sản phẩm MacBook
    displayProducts(macbooks, 'macbook-products');
    
    // Hiển thị sản phẩm iPad
    displayProducts(ipads, 'ipad-products');
    
    // Hiển thị sản phẩm AirPods
    displayProducts(airpods, 'airpods-products');
    
    // Hiển thị sản phẩm Apple Watch
    displayProducts(applewatches, 'applewatch-products');
}

// Hiển thị sản phẩm theo danh mục
function displayProducts(products, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = '<p class="no-products">Chưa có sản phẩm nào trong danh mục này.</p>';
        return;
    }
    
    // KIỂM TRA NGƯỜI DÙNG ĐÃ ĐĂNG NHẬP CHƯA
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isLoggedIn = !!currentUser;
    
    let html = '';
    
    products.forEach(product => {
        const rawDescription = product.description || '';
        const textDescription = rawDescription.replace(/<[^>]*>/g, ' ');
        const shortDescription = textDescription.length > 120 ? textDescription.substring(0, 120).trim() + '...' : textDescription.trim();
        // XÁC ĐỊNH TEXT VÀ CLASS CHO NÚT
        const addToCartText = isLoggedIn ? 'Thêm vào giỏ' : 'Đăng nhập để mua';
        const addToCartClass = isLoggedIn ? 'btn-add-to-cart' : 'btn-add-to-cart disabled';
        const onClickHandler = isLoggedIn ? `onclick="addToCart(${product.id})"` : 'onclick="requireLogin()"';
        
        html += `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${shortDescription}</p>
                    <div class="product-price">${formatPrice(product.price)} VNĐ</div>
                    <!-- HIỂN THỊ SỐ LƯỢNG TRÊN TRANG CHỦ (TÙY CHỌN) -->
                    <div class="product-quantity" style="font-size: 14px; color: var(--gray-color); margin-bottom: 10px;">
                        <i class="fas fa-box" style="margin-right: 5px;"></i>
                        Còn lại: <strong>${product.quantity || 0}</strong> sản phẩm
                    </div>
                    <div class="product-actions">
                        <button class="${addToCartClass}" ${onClickHandler}>
                            ${addToCartText}
                        </button>
                        ${!isLoggedIn ? '<div class="login-required-tooltip">Bạn cần đăng nhập để mua sản phẩm</div>' : ''}
                        <button class="btn-view-details" onclick="viewProductDetails(${product.id})">Xem chi tiết</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Hàm yêu cầu đăng nhập (khi chưa đăng nhập)
function requireLogin() {
    showNotification('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
    setTimeout(() => {
        window.location.href = 'login.html?redirect=index';
    }, 1500);
}

// Định dạng giá tiền
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function calculateUserMembership(user) {
    if (!user) {
        return {
            levelKey: 'bronze',
            levelName: 'Hạng Đồng',
            totalSpent: 0,
            totalItems: 0
        };
    }
    
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const validOrders = orders.filter(order => 
        order.customer && order.customer.email === user.email && order.status === 'delivered'
    );
    
    let totalSpent = 0;
    let totalItems = 0;
    
    validOrders.forEach(order => {
        const baseSubtotal = (order.items || []).reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
        
        const baseShipping = baseSubtotal > 0 ? 30000 : 0;
        
        let discountAmount = 0;
        if (order.discount && typeof order.discount.amount === 'number' && order.discount.amount > 0) {
            discountAmount = order.discount.amount;
        }
        
        const taxableAmount = Math.max(baseSubtotal - discountAmount, 0);
        const tax = Math.round(taxableAmount * 0.1);
        const total = typeof order.total === 'number'
            ? order.total
            : taxableAmount + baseShipping + tax;
        
        totalSpent += total;
        
        (order.items || []).forEach(item => {
            totalItems += item.quantity || 0;
        });
    });
    
    let levelKey = 'bronze';
    let levelName = 'Hạng Đồng';
    
    if (totalSpent >= 100000000) {
        levelKey = 'gold';
        levelName = 'Hạng Vàng';
    } else if (totalSpent >= 50000000) {
        levelKey = 'silver';
        levelName = 'Hạng Bạc';
    }
    
    return {
        levelKey,
        levelName,
        totalSpent,
        totalItems
    };
}

// Thêm sản phẩm vào giỏ hàng
function addToCart(productId) {
    // KIỂM TRA XEM NGƯỜI DÙNG ĐÃ ĐĂNG NHẬP CHƯA
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        // Hiển thị thông báo yêu cầu đăng nhập
        showNotification('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
        
        // Chuyển hướng đến trang đăng nhập sau 1.5 giây
        setTimeout(() => {
            window.location.href = 'login.html?redirect=index';
        }, 1500);
        return;
    }
    
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        alert('Sản phẩm không tồn tại!');
        return;
    }
    
    // KIỂM TRA SỐ LƯỢNG TỒN KHO
    if (!product.quantity || product.quantity <= 0) {
        showNotification('Sản phẩm này đã hết hàng!');
        return;
    }
    
    // KIỂM TRA XEM ĐÃ ĐẠT GIỚI HẠN MUA CHƯA
    let userCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
    let userCart = userCarts[currentUser.email] || [];
    const existingItem = userCart.find(item => item.id === productId);
    
    if (existingItem) {
        // Nếu sản phẩm đã có trong giỏ hàng, kiểm tra xem có vượt quá số lượng tồn không
        if (existingItem.quantity + 1 > product.quantity) {
            showNotification('Số lượng mua vượt quá số lượng tồn kho!');
            return;
        }
        existingItem.quantity += 1;
    } else {
        // Nếu chưa có trong giỏ hàng, thêm mới
        userCart.push({
            ...product,
            quantity: 1
        });
    }
    
    userCarts[currentUser.email] = userCart;
    localStorage.setItem('userCarts', JSON.stringify(userCarts));
    localStorage.setItem('cart', JSON.stringify(userCart));
    updateCartCount();
    
    // Hiển thị thông báo
    showNotification(`Đã thêm "${product.name}" vào giỏ hàng!`);
}
urrentUser = JSON.parse(localStorage.getItem('currentUser'));
    let cart = [];
    
    if (currentUser) {
        const userCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
        cart = userCarts[currentUser.email] || [];
    }
    
// Cập nhật số lượng sản phẩm trong giỏ hàng
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Cập nhật trên trang chủ
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
    
    // Cập nhật trên trang giỏ hàng (nếu có)
    const cartPageCount = document.getElementById('cart-page-count');
    if (cartPageCount) {
        cartPageCount.textContent = totalItems;
    }
}

// Xem chi tiết sản phẩm
function viewProductDetails(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        alert('Sản phẩm không tồn tại!');
        return;
    }
    
    const modal = document.getElementById('product-modal');
    const modalBody = document.getElementById('modal-body');
    
    // KIỂM TRA NGƯỜI DÙNG ĐÃ ĐĂNG NHẬP CHƯA
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isLoggedIn = !!currentUser;
    
    const gallery = Array.isArray(product.gallery) && product.gallery.length > 0
        ? product.gallery
        : [product.image];
    
    const memoryOptions = Array.isArray(product.memoryOptions) && product.memoryOptions.length > 0
        ? product.memoryOptions
        : [];
    
    const colors = Array.isArray(product.colors) && product.colors.length > 0
        ? product.colors
        : [];
    
    const initialPrice = product.price;
    
    const memoryOptionsHtml = memoryOptions.length > 0
        ? memoryOptions.map((opt, index) => {
            const label = typeof opt === 'string' ? opt : opt.label;
            return `
            <button class="variant-option${index === 0 ? ' active' : ''}" data-memory-index="${index}">
                ${label}
            </button>`;
        }).join('')
        : '';
    
    const colorsHtml = colors.length > 0
        ? colors.map((c, index) => `
            <button class="variant-option${index === 0 ? ' active' : ''}" data-color-value="${c}">
                ${c}
            </button>
        `).join('')
        : '';
    
    const thumbsHtml = gallery.map((img, index) => `
        <div class="product-gallery-thumb${index === 0 ? ' active' : ''}" data-gallery-index="${index}">
            <img src="${img}" alt="${product.name}">
        </div>
    `).join('');
    
    modalBody.innerHTML = `
        <div class="product-details">
            <div class="product-details-main">
                <div class="product-gallery">
                    <div class="product-gallery-main">
                        <img src="${gallery[0]}" alt="${product.name}" id="product-main-image">
                    </div>
                    <div class="product-gallery-thumbs">
                        ${thumbsHtml}
                    </div>
                </div>
                <div class="product-details-info">
                    <h2>${product.name}</h2>
                    <div class="product-details-price" id="product-details-price">${formatPrice(initialPrice)} VNĐ</div>
                    <div class="product-variants">
                        ${memoryOptionsHtml ? `
                        <div>
                            <div class="variant-group-label">Phiên bản bộ nhớ</div>
                            <div class="variant-options-row" id="memory-options-row">
                                ${memoryOptionsHtml}
                            </div>
                        </div>` : ''}
                        ${colorsHtml ? `
                        <div>
                            <div class="variant-group-label">Màu sắc</div>
                            <div class="variant-options-row" id="color-options-row">
                                ${colorsHtml}
                            </div>
                        </div>` : ''}
                    </div>
                    <div class="product-details-quantity" style="margin-bottom: 20px; padding: 10px; background-color: var(--light-color); border-radius: 8px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-box" style="color: var(--primary-color);"></i>
                            <div>
                                <div style="font-weight: 600; color: var(--dark-color);">Tình trạng kho</div>
                                <div style="font-size: 18px; font-weight: 700; color: ${(product.quantity || 0) > 10 ? 'var(--success-color)' : (product.quantity || 0) > 0 ? 'var(--warning-color)' : 'var(--danger-color)'}">
                                    ${(product.quantity || 0) > 0 ? `Còn ${product.quantity} sản phẩm` : 'Hết hàng'}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="product-details-actions">
                        ${isLoggedIn
                            ? `<button class="btn-primary" id="product-add-to-cart-btn">Thêm vào giỏ hàng</button>`
                            : `<button class="btn-primary" id="product-login-to-buy-btn">Đăng nhập để mua</button>`
                        }
                        <button class="btn-view-details" onclick="document.getElementById('product-modal').style.display='none';">Tiếp tục mua sắm</button>
                    </div>
                </div>
            </div>
            <div class="product-details-description-full">
                ${product.description || ''}
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    
    setupProductDetailInteractions(productId);
    

function setupProductDetailInteractions(productId) {
    const modal = document.getElementById('product-modal');
    if (!modal) return;
    
    const priceElement = document.getElementById('product-details-price');
    const memoryRow = document.getElementById('memory-options-row');
    const colorRow = document.getElementById('color-options-row');
    const mainImage = document.getElementById('product-main-image');
    const addToCartBtn = document.getElementById('product-add-to-cart-btn');
    const loginToBuyBtn = document.getElementById('product-login-to-buy-btn');
    
    if (memoryRow && priceElement) {
        memoryRow.addEventListener('click', function(e) {
            const button = e.target.closest('.variant-option');
            if (!button) return;
            const buttons = memoryRow.querySelectorAll('.variant-option');
            buttons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
        });
    }
    
    if (colorRow) {
        colorRow.addEventListener('click', function(e) {
            const button = e.target.closest('.variant-option');
            if (!button) return;
            const buttons = colorRow.querySelectorAll('.variant-option');
            buttons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
        });
    }
    
    const thumbs = modal.querySelectorAll('.product-gallery-thumb');
    if (thumbs && mainImage) {
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', function() {
                const index = parseInt(thumb.getAttribute('data-gallery-index'));
                const products = JSON.parse(localStorage.getItem('products')) || [];
                const product = products.find(p => p.id === productId);
                if (!product) return;
                const gallery = Array.isArray(product.gallery) && product.gallery.length > 0
                    ? product.gallery
                    : [product.image];
                const src = gallery[index] || gallery[0];
                mainImage.src = src;
                thumbs.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
        });
    }
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            addConfiguredProductToCart(productId);
            document.getElementById('product-modal').style.display = 'none';
        });
    }
    
    if (loginToBuyBtn) {
        loginToBuyBtn.addEventListener('click', function() {
            showNotification('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
            setTimeout(() => {
                window.location.href = 'login.html?redirect=index';
            }, 1500);
        });
    }
}

function addConfiguredProductToCart(productId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        showNotification('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
        setTimeout(() => {
            window.location.href = 'login.html?redirect=index';
        }, 1500);
        return;
    }
    
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        alert('Sản phẩm không tồn tại!');
        return;
    }
    
    if (!product.quantity || product.quantity <= 0) {
        showNotification('Sản phẩm này đã hết hàng!');
        return;
    }
    
    const modal = document.getElementById('product-modal');
    const memoryRow = modal ? modal.querySelector('#memory-options-row') : null;
    const colorRow = modal ? modal.querySelector('#color-options-row') : null;
    
    let selectedMemory = null;
    let selectedPrice = product.price;
    
    if (memoryRow) {
        const activeMemory = memoryRow.querySelector('.variant-option.active');
        if (activeMemory) {
            selectedMemory = activeMemory.textContent.trim();
        }
    }
    
    let selectedColor = null;
    if (colorRow) {
        const activeColor = colorRow.querySelector('.variant-option.active');
        if (activeColor) {
            selectedColor = activeColor.getAttribute('data-color-value') || activeColor.textContent.trim();
        }
    }
    
    let userCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
    let userCart = userCarts[currentUser.email] || [];
    
    const itemKey = productId + '|' + (selectedMemory || '') + '|' + (selectedColor || '');
    
    const existingItem = userCart.find(item => (item.cartKey || (item.id + '|' + (item.selectedMemory || '') + '|' + (item.selectedColor || ''))) === itemKey);
    
    if (existingItem) {
        if (existingItem.quantity + 1 > product.quantity) {
            showNotification('Số lượng mua vượt quá số lượng tồn kho!');
            return;
        }
        existingItem.quantity += 1;
    } else {
        const cartItem = {
            ...product,
            price: selectedPrice,
            quantity: 1,
            selectedMemory: selectedMemory,
            selectedColor: selectedColor,
            cartKey: itemKey
        };
        userCart.push(cartItem);
    }
    
    userCarts[currentUser.email] = userCart;
    localStorage.setItem('userCarts', JSON.stringify(userCarts));
    localStorage.setItem('cart', JSON.stringify(userCart));
    updateCartCount();
    
    showNotification(`Đã thêm "${product.name}" vào giỏ hàng!`);
}
    setupProductDetailInteractions(productId);
}

// Hiển thị thông báo
function showNotification(message) {
    // Kiểm tra xem đã có thông báo nào chưa
    let notification = document.getElementById('notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: var(--success-color);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow);
            z-index: 1000;
            transform: translateX(150%);
            transition: transform 0.3s ease;
        `;
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.style.backgroundColor = 'var(--success-color)';
    
    // Hiển thị thông báo
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Ẩn thông báo sau 3 giây
    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
    }, 3000);
}

// Cập nhật nút sản phẩm trên trang
function updateProductButtons() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isLoggedIn = !!currentUser;
    
    // Cập nhật tất cả nút "Thêm vào giỏ" trên trang
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
    const productActionContainers = document.querySelectorAll('.product-actions');
    
    addToCartButtons.forEach(button => {
        if (isLoggedIn) {
            button.classList.remove('disabled');
            button.textContent = 'Thêm vào giỏ';
            
            // Lấy productId từ parent element
            const productCard = button.closest('.product-card');
            if (productCard) {
                const productId = productCard.getAttribute('data-id');
                button.setAttribute('onclick', `addToCart(${productId})`);
            }
        } else {
            button.classList.add('disabled');
            button.textContent = 'Đăng nhập để mua';
            button.setAttribute('onclick', 'requireLogin()');
        }
    });
    
    // Thêm/xóa tooltip
    productActionContainers.forEach(container => {
        if (!isLoggedIn) {
            // Kiểm tra xem đã có tooltip chưa
            if (!container.querySelector('.login-required-tooltip')) {
                const tooltip = document.createElement('div');
                tooltip.className = 'login-required-tooltip';
                tooltip.textContent = 'Bạn cần đăng nhập để mua sản phẩm';
                container.appendChild(tooltip);
            }
        } else {
            // Xóa tooltip nếu có
            const tooltip = container.querySelector('.login-required-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        }
    });
}

// Hàm cập nhật trạng thái người dùng
function updateUserStatus() {
    const userStatus = document.getElementById('user-status');
    const adminBtn = document.getElementById('admin-btn');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!userStatus) return;
    
    if (currentUser) {
        let userName = currentUser.name;
        let userClass = '';
        
        const role = currentUser.role || (currentUser.isAdmin ? 'admin' : 'user');
        if (role === 'admin') {
            userName = 'Admin';
            userClass = 'admin';
        } else if (role === 'shipper') {
            userClass = 'shipper';
        }
        
        const membership = calculateUserMembership(currentUser);
        const membershipClass = membership && membership.levelKey ? `membership-${membership.levelKey}` : '';
        
        userStatus.innerHTML = `
            <div class="user-profile">
                <span class="user-name ${userClass} ${membershipClass}" id="header-user-name">${userName}</span>
                <button class="btn-logout" id="logout-btn">Đăng xuất</button>
            </div>
        `;
        
        if (adminBtn && (role === 'admin' || role === 'shipper')) {
            adminBtn.classList.remove('hidden');
        } else if (adminBtn) {
            adminBtn.classList.add('hidden');
        }
        
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                logoutUser();
            });
        }
        
        const userNameElement = document.getElementById('header-user-name');
        if (userNameElement) {
            userNameElement.addEventListener('click', function() {
                openProfileModal();
            });
        }
    } else {
        // Người dùng chưa đăng nhập
        userStatus.innerHTML = `
            <a href="login.html" class="btn-login">Đăng nhập</a>
            <a href="login.html?register=true" class="btn-register">Đăng ký</a>
        `;
        
        // Ẩn nút admin
        if (adminBtn) {
            adminBtn.style.display = 'none';
        }
    }
    
    // Cập nhật nút sản phẩm
    updateProductButtons();
}

function openProfileModal() {
    const profileModal = document.getElementById('profile-modal');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!profileModal || !currentUser) return;
    
    const nameInput = document.getElementById('profile-name');
    const emailInput = document.getElementById('profile-email');
    const addressInput = document.getElementById('profile-address');
    const passwordInput = document.getElementById('profile-password');
    const membershipText = document.getElementById('profile-membership');
    
    if (!nameInput || !emailInput || !addressInput || !passwordInput) return;
    
    nameInput.value = currentUser.name || '';
    emailInput.value = currentUser.email || '';
    addressInput.value = currentUser.address || '';
    passwordInput.value = '';
    
    if (membershipText) {
        const membership = calculateUserMembership(currentUser);
        membershipText.textContent = `${membership.levelName} · Tổng tiền đã mua: ${formatPrice(membership.totalSpent)} VNĐ (${membership.totalItems} sản phẩm)`;
    }
    
    profileModal.style.display = 'flex';
}

function setupProfileForm() {
    const profileModal = document.getElementById('profile-modal');
    const profileForm = document.getElementById('profile-form');
    const closeButton = document.querySelector('#profile-modal .close-profile-modal');
    const togglePasswordBtn = document.getElementById('toggle-profile-password');
    const passwordInput = document.getElementById('profile-password');
    
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveProfileChanges();
        });
    }
    
    if (closeButton && profileModal) {
        closeButton.addEventListener('click', function() {
            profileModal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === profileModal) {
            profileModal.style.display = 'none';
        }
    });
    
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', function() {
            const isPassword = passwordInput.getAttribute('type') === 'password';
            passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
            const icon = togglePasswordBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-eye');
                icon.classList.toggle('fa-eye-slash');
            }
            togglePasswordBtn.classList.toggle('active');
        });
    }
}

function saveProfileChanges() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    const nameInput = document.getElementById('profile-name');
    const emailInput = document.getElementById('profile-email');
    const addressInput = document.getElementById('profile-address');
    const passwordInput = document.getElementById('profile-password');
    
    if (!nameInput || !emailInput || !addressInput || !passwordInput) return;
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const address = addressInput.value.trim();
    const password = passwordInput.value;
    
    if (!name || !email) {
        showNotification('Vui lòng nhập đầy đủ họ tên và email');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex === -1) {
        showNotification('Tài khoản không tồn tại');
        return;
    }
    
    const emailExists = users.some((u, index) => index !== userIndex && u.email === email);
    if (emailExists) {
        showNotification('Email này đã được sử dụng bởi người dùng khác');
        return;
    }
    
    const oldEmail = users[userIndex].email;
    
    users[userIndex].name = name;
    users[userIndex].email = email;
    users[userIndex].address = address;
    
    if (password) {
        if (password.length < 6) {
            showNotification('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }
        users[userIndex].password = password;
    }
    
    localStorage.setItem('users', JSON.stringify(users));
    
    const userCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
    if (oldEmail && oldEmail !== email && userCarts[oldEmail]) {
        const cartForUser = userCarts[oldEmail];
        delete userCarts[oldEmail];
        userCarts[email] = cartForUser;
        localStorage.setItem('userCarts', JSON.stringify(userCarts));
        localStorage.setItem('cart', JSON.stringify(cartForUser));
    }
    
    currentUser.name = name;
    currentUser.email = email;
    currentUser.address = address;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    updateUserStatus();
    
    const profileModal = document.getElementById('profile-modal');
    if (profileModal) {
        profileModal.style.display = 'none';
    }
    
    showNotification('Cập nhật thông tin tài khoản thành công');
}

// Hàm đăng xuất
function logoutUser() {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('cart');
        updateUserStatus();
        updateCartCount();
        showNotification('Đã đăng xuất thành công!');

        // Cập nhật đếm đơn hàng (về 0) và xóa UI danh sách đơn hàng nếu đang ở trang Giỏ hàng
        updateOrdersCount();

        const ordersContainer = document.getElementById('orders-list');
        if (ordersContainer) {
            ordersContainer.innerHTML = `
                <div class="empty-orders">
                    <i class="fas fa-inbox"></i>
                    <h3>Chưa có đơn hàng nào</h3>
                    <p>Bạn chưa thực hiện đơn hàng nào. Hãy bắt đầu mua sắm ngay!</p>
                    <a href="index.html" class="btn-primary">Tiếp tục mua sắm</a>
                </div>
            `;
        }

        // Nếu đang ở trang giỏ hàng, chuyển về tab giỏ hàng và cập nhật lại giao diện giỏ
        if (window.location.pathname.includes('cart.html')) {
            setTimeout(() => {
                try {
                    switchTab('cart-tab');
                } catch(e) {}
                
                try {
                    if (typeof checkUserAuth === 'function') {
                        checkUserAuth();
                    }
                } catch(e) {}
            }, 200);
        }

        // Nếu đang ở trang admin, chuyển về trang chủ
        if (window.location.pathname.includes('admin.html')) {
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }
    }
}

// =========== THÊM HÀM XỬ LÝ ACTIVE NAVIGATION ===========

// Hàm xử lý active navigation
function setupActiveNavigation() {
    const navSections = document.querySelectorAll('.nav-section');
    const navHome = document.querySelector('.nav-home');
    const navPages = document.querySelectorAll('.nav-page');
    
    // Chỉ xử lý trên trang chủ
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname.includes('index.html')) {
        // Thêm sự kiện click cho section links (iPhone, MacBook, iPad, AirPods)
        navSections.forEach(link => {
            link.addEventListener('click', function(e) {
                // Xóa active từ tất cả
                document.querySelectorAll('.main-nav a').forEach(a => a.classList.remove('active'));
                // Thêm active cho link được click
                this.classList.add('active');
                
                // Sau 0.5 giây, kiểm tra scroll position để giữ active
                setTimeout(() => {
                    updateActiveOnScroll();
                }, 500);
            });
        });
        
        // Thêm sự kiện click cho trang chủ
        if (navHome) {
            navHome.addEventListener('click', function() {
                document.querySelectorAll('.main-nav a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
            });
        }
        
        // Hàm cập nhật active dựa trên scroll
        function updateActiveOnScroll() {
            const sections = ['iphones', 'macbooks', 'ipads', 'airpods'];
            const scrollPosition = window.scrollY + 120; // Offset
            
            // Kiểm tra nếu ở đầu trang
            if (scrollPosition < 200) {
                document.querySelectorAll('.main-nav a').forEach(a => a.classList.remove('active'));
                if (navHome) navHome.classList.add('active');
                return;
            }
            
            // Kiểm tra từng section
            let currentActive = null;
            
            sections.forEach(sectionId => {
                const section = document.getElementById(sectionId);
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        currentActive = sectionId;
                    }
                }
            });
            
            // Nếu tìm thấy section active
            if (currentActive) {
                document.querySelectorAll('.main-nav a').forEach(a => a.classList.remove('active'));
                const activeLink = document.querySelector(`a[href="#${currentActive}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        }
        
        // Thêm event listener cho scroll
        window.addEventListener('scroll', updateActiveOnScroll);
        
        // Gọi lần đầu để set đúng state
        updateActiveOnScroll();
    }
    
    // Xử lý cho các trang khác (cart, admin, login)
    navPages.forEach(page => {
        page.addEventListener('click', function() {
            // Kiểm tra xem link này có trùng với trang hiện tại không
            const href = this.getAttribute('href');
            const currentPage = window.location.pathname.split('/').pop();
            
            if (href.includes(currentPage)) {
                document.querySelectorAll('.main-nav a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

// Cập nhật số lượng đơn hàng của người dùng (badge)
function updateOrdersCount() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    let count = 0;

    if (currentUser) {
        count = allOrders.filter(o => o.customer && o.customer.email === currentUser.email).length;
    }

    const ordersCountElements = document.querySelectorAll('.orders-count');
    ordersCountElements.forEach(el => el.textContent = count);
}

// ===== QUẢN LÝ BÀI VIẾT (TIN TỨC) =====

function getArticles() {
    const raw = localStorage.getItem('articles');
    let articles = [];
    if (raw) {
        try {
            articles = JSON.parse(raw);
        } catch (e) {
            articles = [];
        }
    }
    
    if (!Array.isArray(articles)) {
        articles = [];
    }
    
    return articles;
}

function saveArticles(articles) {
    localStorage.setItem('articles', JSON.stringify(articles));
}

function initNewsPage() {
    updateUserStatus();
    updateCartCount();
    updateOrdersCount();
    renderNewsList();
    setupNewsDetailHandlers();
    
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

function renderNewsList() {
    const container = document.getElementById('news-list');
    if (!container) return;
    
    const articles = getArticles()
        .filter(a => a.status !== 'hidden')
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    
    if (articles.length === 0) {
        container.innerHTML = `
            <div class="empty-news">
                <i class="fas fa-newspaper"></i>
                <h3>Chưa có bài viết nào</h3>
                <p>Các bài viết nổi bật về công nghệ sẽ xuất hiện tại đây.</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    
    articles.forEach(article => {
        const createdDate = article.createdAt ? new Date(article.createdAt).toLocaleString('vi-VN') : '';
        const thumbnail = article.thumbnail || '';
        const excerpt = article.excerpt || extractExcerptFromContent(article.content || '');
        
        html += `
            <article class="news-item" data-article-id="${article.id}">
                ${thumbnail ? `
                <div class="news-thumbnail">
                    <img src="${thumbnail}" alt="${article.title}">
                </div>` : ''}
                <div class="news-info">
                    <h2 class="news-title">${article.title}</h2>
                    <p class="news-excerpt">${excerpt}</p>
                    <div class="news-meta">
                        <span class="news-author">${article.author || 'Không rõ tác giả'}</span>
                        ${createdDate ? `<span class="news-date">${createdDate}</span>` : ''}
                    </div>
                </div>
            </article>
        `;
    });
    
    container.innerHTML = html;
}

function extractExcerptFromContent(contentHtml) {
    const temp = document.createElement('div');
    temp.innerHTML = contentHtml || '';
    const text = temp.textContent || temp.innerText || '';
    if (text.length <= 160) return text;
    return text.substring(0, 160) + '...';
}

function setupNewsDetailHandlers() {
    const listContainer = document.getElementById('news-list');
    const listSection = document.getElementById('news-list-section');
    const detailSection = document.getElementById('news-detail-section');
    const detailArticle = document.getElementById('news-detail-article');
    const backButton = document.getElementById('back-to-news-list');
    
    if (!listContainer || !listSection || !detailSection || !detailArticle || !backButton) return;
    
    listContainer.addEventListener('click', function(e) {
        const item = e.target.closest('.news-item');
        if (!item) return;
        
        const articleId = item.getAttribute('data-article-id');
        if (!articleId) return;
        
        const articles = getArticles();
        const article = articles.find(a => String(a.id) === String(articleId));
        if (!article) return;
        
        const createdDate = article.createdAt ? new Date(article.createdAt).toLocaleString('vi-VN') : '';
        
        detailArticle.innerHTML = `
            <header class="news-detail-header">
                <h1>${article.title}</h1>
                <div class="news-meta">
                    <span class="news-author">${article.author || 'Không rõ tác giả'}</span>
                    ${createdDate ? `<span class="news-date">${createdDate}</span>` : ''}
                </div>
            </header>
            <section class="news-detail-content">
                ${article.content || '<p>Không có nội dung.</p>'}
            </section>
        `;
        
        listSection.classList.add('hidden');
        detailSection.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    backButton.addEventListener('click', function() {
        detailSection.classList.add('hidden');
        listSection.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
