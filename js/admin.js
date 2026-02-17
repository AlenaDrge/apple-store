document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const role = currentUser ? (currentUser.role || (currentUser.isAdmin ? 'admin' : 'user')) : null;
    
    if (!currentUser || (role !== 'admin' && role !== 'shipper')) {
        window.location.href = 'login.html?redirect=admin';
        return;
    }
    
    const adminUsername = document.getElementById('admin-username');
    if (adminUsername) {
        adminUsername.textContent = role === 'shipper'
            ? `${currentUser.name} (Người giao hàng)`
            : currentUser.name;
    }
    
    if (role === 'admin') {
        initAdmin();
        setupTabNavigation();
        loadProductsTable();
        updateCategoryStats();
        setupAddProductForm();
        setupEditProductForm();
        setupFilterAndSearch();
        setupLogout();
        loadUsersTable();
        setupUserSearch();
        setupAddUserButton();
        loadOrdersTable();
        setupOrdersFilterAndSearch();
        setupDiscountTab();
    } else if (role === 'shipper') {
        initShipperDashboard();
    }
});

// Hàm khởi tạo dành cho Người giao hàng
function initShipperDashboard() {
    const productsTab = document.getElementById('products-tab');
    const addProductTab = document.getElementById('add-product-tab');
    const usersTab = document.getElementById('users-tab');
    const categoriesTab = document.getElementById('categories-tab');
    const discountsTab = document.getElementById('discounts-tab');
    
    [productsTab, addProductTab, usersTab, categoriesTab, discountsTab].forEach(tab => {
        if (tab) {
            tab.style.display = 'none';
        }
    });
    
    const navLinks = document.querySelectorAll('.admin-nav a');
    navLinks.forEach(link => {
        const tab = link.getAttribute('data-tab');
        if (tab !== 'orders') {
            link.parentElement.style.display = 'none';
        } else {
            link.classList.add('active');
        }
    });
    
    const ordersTab = document.getElementById('orders-tab');
    if (ordersTab) {
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        ordersTab.classList.add('active');
    }
    
    setupLogout();
    setupShipperOrdersFilterAndSearch();
    loadOrdersTableForShipper();
}

// Khởi tạo trang admin
function initAdmin() {
    // Xử lý modal chỉnh sửa sản phẩm
    const editModal = document.getElementById('edit-product-modal');
    const closeEditModal = editModal.querySelector('.close-modal');
    
    if (closeEditModal) {
        closeEditModal.addEventListener('click', function() {
            editModal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === editModal) {
            editModal.style.display = 'none';
        }
    });
    
    // Xử lý tải hình ảnh từ máy
    const uploadImageBtn = document.getElementById('upload-image-btn');
    const imageFileInput = document.getElementById('image-file-input');
    
    if (uploadImageBtn && imageFileInput) {
        uploadImageBtn.addEventListener('click', function() {
            imageFileInput.click();
        });
        
        imageFileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    const imagePreview = document.getElementById('image-preview');
                    imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
                    
                    // Lưu dữ liệu hình ảnh dưới dạng URL data
                    document.getElementById('product-image-url').value = e.target.result;
                };
                
                reader.readAsDataURL(this.files[0]);
            }
        });
    }
}

// Thiết lập điều hướng tab
function setupTabNavigation() {
    const tabLinks = document.querySelectorAll('.admin-nav a');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Xóa active class từ tất cả các tab
            tabLinks.forEach(l => l.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            
            // Thêm active class cho tab được chọn
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
}

// Tải danh sách sản phẩm vào bảng
function loadProductsTable(filterCategory = 'all', searchQuery = '') {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const tableBody = document.getElementById('products-table-body');
    
    if (!tableBody) return;
    
    // Lọc sản phẩm
    let filteredProducts = products;
    
    if (filterCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === filterCategory);
    }
    
    if (searchQuery) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    
    if (filteredProducts.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 40px;">
                    Không tìm thấy sản phẩm nào.
                </td>
            </tr>
        `;
        return;
    }
    
    let html = '';
    
    filteredProducts.forEach(product => {
        // Xác định badge class dựa trên số lượng
        const quantity = product.quantity || 0;
        let quantityBadgeClass = 'quantity-out';
        let quantityTooltip = 'Hết hàng';
        
        if (quantity > 20) {
            quantityBadgeClass = 'quantity-in-stock';
            quantityTooltip = 'Còn nhiều hàng';
        } else if (quantity > 0) {
            quantityBadgeClass = 'quantity-low';
            quantityTooltip = 'Sắp hết hàng';
        }
        
        html += `
            <tr>
                <td>${product.id}</td>
                <td>
                    <img src="${product.image}" alt="${product.name}" class="product-table-image">
                </td>
                <td>${product.name}</td>
                <td>
                    <span class="product-category-badge">${getCategoryName(product.category)}</span>
                </td>
                <td>${formatPrice(product.price)} VNĐ</td>
                <td>
                    <div class="quantity-tooltip">
                        <span class="quantity-badge ${quantityBadgeClass}">
                            ${quantity}
                        </span>
                        <span class="tooltip-text">${quantityTooltip}</span>
                    </div>
                </td>
                <td class="product-actions-cell">
                    <button class="btn-edit" onclick="openEditProductModal(${product.id})">Sửa</button>
                    <button class="btn-delete" onclick="deleteProduct(${product.id})">Xóa</button>
                </td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = html;
}

// Người giao hàng nhận đơn
function shipperAcceptOrder(orderId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderIndex = allOrders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) {
        alert('Đơn hàng không tồn tại!');
        return;
    }
    
    const order = allOrders[orderIndex];
    if (order.status !== 'confirmed') {
        alert('Chỉ có thể nhận các đơn đang ở trạng thái Đã xác nhận.');
        return;
    }
    
    allOrders[orderIndex].status = 'shipped';
    allOrders[orderIndex].shipper = {
        id: currentUser.id,
        name: currentUser.name,
        phone: currentUser.phone || '',
        email: currentUser.email
    };
    
    localStorage.setItem('orders', JSON.stringify(allOrders));
    alert('Bạn đã nhận đơn hàng thành công.');
    loadOrdersTableForShipper();
}

// Người giao hàng hủy nhận đơn
function shipperCancelOrder(orderId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderIndex = allOrders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) {
        alert('Đơn hàng không tồn tại!');
        return;
    }
    
    const order = allOrders[orderIndex];
    if (order.status !== 'shipped' || !order.shipper || order.shipper.id !== currentUser.id) {
        alert('Bạn chỉ có thể hủy các đơn đang giao do chính bạn nhận.');
        return;
    }
    
    let reason = prompt('Vui lòng nhập lý do hủy nhận đơn (bắt buộc):');
    if (!reason || !reason.trim()) {
        alert('Lý do hủy là bắt buộc. Hành động đã bị hủy.');
        return;
    }
    
    allOrders[orderIndex].status = 'confirmed';
    allOrders[orderIndex].shipperCancelReason = reason.trim();
    allOrders[orderIndex].shipperCancelledAt = new Date().toISOString();
    delete allOrders[orderIndex].shipper;
    
    localStorage.setItem('orders', JSON.stringify(allOrders));
    alert('Bạn đã hủy nhận đơn. Đơn hàng được chuyển lại về trạng thái Đã xác nhận.');
    loadOrdersTableForShipper();
}

// Người giao hàng đánh dấu giao thành công
function shipperMarkDelivered(orderId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderIndex = allOrders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) {
        alert('Đơn hàng không tồn tại!');
        return;
    }
    
    const order = allOrders[orderIndex];
    if (order.status !== 'shipped' || !order.shipper || order.shipper.id !== currentUser.id) {
        alert('Chỉ có thể đánh dấu đã giao cho các đơn bạn đang giao.');
        return;
    }
    
    allOrders[orderIndex].status = 'delivered';
    allOrders[orderIndex].deliveredAt = new Date().toISOString();
    
    localStorage.setItem('orders', JSON.stringify(allOrders));
    alert('Đã cập nhật trạng thái: Đã giao thành công.');
    loadOrdersTableForShipper();
}

// Người giao hàng đánh dấu giao hàng thất bại
function shipperMarkFailed(orderId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderIndex = allOrders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) {
        alert('Đơn hàng không tồn tại!');
        return;
    }
    
    const order = allOrders[orderIndex];
    if (order.status !== 'shipped' || !order.shipper || order.shipper.id !== currentUser.id) {
        alert('Chỉ có thể đánh dấu giao thất bại cho các đơn bạn đang giao.');
        return;
    }
    
    let reason = prompt('Vui lòng nhập lý do giao hàng thất bại (bắt buộc):');
    if (!reason || !reason.trim()) {
        alert('Lý do giao hàng thất bại là bắt buộc. Hành động đã bị hủy.');
        return;
    }
    
    allOrders[orderIndex].status = 'failed';
    allOrders[orderIndex].deliveryFailedReason = reason.trim();
    allOrders[orderIndex].deliveryFailedAt = new Date().toISOString();
    
    localStorage.setItem('orders', JSON.stringify(allOrders));
    alert('Đã cập nhật trạng thái: Giao hàng thất bại.');
    loadOrdersTableForShipper();
}

// Lấy tên danh mục từ mã danh mục
function getCategoryName(categoryCode) {
    const categoryNames = {
        'iphones': 'iPhone',
        'macbooks': 'MacBook',
        'ipads': 'iPad',
        'airpods': 'AirPods'
    };
    
    return categoryNames[categoryCode] || categoryCode;
}

// Cập nhật thống kê số lượng sản phẩm theo danh mục
function updateCategoryStats() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    const iphoneCount = products.filter(p => p.category === 'iphones').length;
    const macbookCount = products.filter(p => p.category === 'macbooks').length;
    const ipadCount = products.filter(p => p.category === 'ipads').length;
    const airpodsCount = products.filter(p => p.category === 'airpods').length;
    
    document.getElementById('iphone-count').textContent = iphoneCount;
    document.getElementById('macbook-count').textContent = macbookCount;
    document.getElementById('ipad-count').textContent = ipadCount;
    document.getElementById('airpods-count').textContent = airpodsCount;
}

// Thiết lập form thêm sản phẩm
function setupAddProductForm() {
    const form = document.getElementById('add-product-form');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Lấy dữ liệu từ form
        const name = document.getElementById('product-name').value.trim();
        const category = document.getElementById('product-category').value;
        const price = parseInt(document.getElementById('product-price').value);
        const quantity = parseInt(document.getElementById('product-quantity').value);
        const description = document.getElementById('product-description').value.trim();
        const imageUrl = document.getElementById('product-image-url').value.trim();
        
        // Kiểm tra dữ liệu
        if (!name || !category || !price || quantity < 0 || !description || !imageUrl) {
            alert('Vui lòng điền đầy đủ thông tin sản phẩm!');
            return;
        }
        
        // Lấy danh sách sản phẩm hiện tại
        const products = JSON.parse(localStorage.getItem('products')) || [];
        
        // Tạo ID mới
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        
        // Tạo sản phẩm mới
        const newProduct = {
            id: newId,
            name,
            category,
            price,
            quantity,
            description,
            image: imageUrl
        };
        
        // Thêm sản phẩm vào danh sách
        products.push(newProduct);
        
        // Lưu vào localStorage
        localStorage.setItem('products', JSON.stringify(products));
        
        // Hiển thị thông báo
        alert('Thêm sản phẩm thành công!');
        
        // Đặt lại form
        form.reset();
        document.getElementById('image-preview').innerHTML = `
            <i class="fas fa-image"></i>
            <p>Chưa có hình ảnh</p>
        `;
        
        // Cập nhật bảng sản phẩm
        loadProductsTable();
        
        // Cập nhật thống kê danh mục
        updateCategoryStats();
        
        // Chuyển về tab sản phẩm
        document.querySelector('.admin-nav a[data-tab="products"]').click();
    });
}

// Mở modal chỉnh sửa sản phẩm
function openEditProductModal(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        alert('Sản phẩm không tồn tại!');
        return;
    }
    
    // Điền dữ liệu vào form
    document.getElementById('edit-product-id').value = product.id;
    document.getElementById('edit-product-name').value = product.name;
    document.getElementById('edit-product-category').value = product.category;
    document.getElementById('edit-product-price').value = product.price;
    document.getElementById('edit-product-quantity').value = product.quantity || 0;
    document.getElementById('edit-product-description').value = product.description;
    document.getElementById('edit-product-image-url').value = product.image;
    
    // Hiển thị hình ảnh preview
    const editImagePreview = document.getElementById('edit-image-preview');
    editImagePreview.innerHTML = `<img src="${product.image}" alt="${product.name}">`;
    
    // Hiển thị modal
    document.getElementById('edit-product-modal').style.display = 'flex';
}

// Thiết lập form chỉnh sửa sản phẩm
function setupEditProductForm() {
    const form = document.getElementById('edit-product-form');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Lấy dữ liệu từ form
        const id = parseInt(document.getElementById('edit-product-id').value);
        const name = document.getElementById('edit-product-name').value.trim();
        const category = document.getElementById('edit-product-category').value;
        const price = parseInt(document.getElementById('edit-product-price').value);
        const quantity = parseInt(document.getElementById('edit-product-quantity').value);
        const description = document.getElementById('edit-product-description').value.trim();
        const imageUrl = document.getElementById('edit-product-image-url').value.trim();
        
        // Kiểm tra dữ liệu
        if (!name || !category || !price || quantity < 0 || !description || !imageUrl) {
            alert('Vui lòng điền đầy đủ thông tin sản phẩm!');
            return;
        }
        
        // Lấy danh sách sản phẩm hiện tại
        const products = JSON.parse(localStorage.getItem('products')) || [];
        
        // Tìm vị trí sản phẩm cần sửa
        const productIndex = products.findIndex(p => p.id === id);
        
        if (productIndex === -1) {
            alert('Sản phẩm không tồn tại!');
            return;
        }
        
        // Cập nhật sản phẩm
        products[productIndex] = {
            id,
            name,
            category,
            price,
            quantity,
            description,
            image: imageUrl
        };
        
        // Lưu vào localStorage
        localStorage.setItem('products', JSON.stringify(products));
        
        // Hiển thị thông báo
        alert('Cập nhật sản phẩm thành công!');
        
        // Đóng modal
        document.getElementById('edit-product-modal').style.display = 'none';
        
        // Cập nhật bảng sản phẩm
        loadProductsTable();
        
        // Cập nhật thống kê danh mục
        updateCategoryStats();
    });
}

// Xóa sản phẩm
function deleteProduct(productId) {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
        return;
    }
    
    // Lấy danh sách sản phẩm hiện tại
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    // Lọc bỏ sản phẩm cần xóa
    const updatedProducts = products.filter(p => p.id !== productId);
    
    // Lưu vào localStorage
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    
    // Hiển thị thông báo
    alert('Xóa sản phẩm thành công!');
    
    // Cập nhật bảng sản phẩm
    loadProductsTable();
    
    // Cập nhật thống kê danh mục
    updateCategoryStats();
}

// Thiết lập bộ lọc và tìm kiếm
function setupFilterAndSearch() {
    const categoryFilter = document.getElementById('category-filter');
    const productSearch = document.getElementById('product-search');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            const searchQuery = productSearch ? productSearch.value : '';
            loadProductsTable(this.value, searchQuery);
        });
    }
    
    if (productSearch) {
        productSearch.addEventListener('input', function() {
            const categoryValue = categoryFilter ? categoryFilter.value : 'all';
            loadProductsTable(categoryValue, this.value);
        });
    }
}

// Thiết lập đăng xuất
function setupLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Xóa thông tin người dùng hiện tại
            localStorage.removeItem('currentUser');
            
            // Chuyển hướng về trang chủ
            window.location.href = 'index.html';
        });
    }
}

// ==================== USERS MANAGEMENT FUNCTIONS ====================

// Tải danh sách người dùng
function loadUsersTable(searchQuery = '') {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tableBody = document.getElementById('users-table-body');
    
    if (!tableBody) return;
    
    // Lọc người dùng nếu có search query
    let filteredUsers = users;
    
    if (searchQuery) {
        filteredUsers = filteredUsers.filter(user => 
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (user.phone && user.phone.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }
    
    if (filteredUsers.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 40px;">
                    Không tìm thấy người dùng nào.
                </td>
            </tr>
        `;
        return;
    }
    
    let html = '';
    
    filteredUsers.forEach(user => {
        const role = user.role || (user.isAdmin ? 'admin' : 'user');
        let roleLabel = 'Người dùng';
        let roleClass = 'user-type-user';
        if (role === 'admin') {
            roleLabel = 'Quản trị viên';
            roleClass = 'user-type-admin';
        } else if (role === 'shipper') {
            roleLabel = 'Người giao hàng';
            roleClass = 'user-type-shipper';
        }
        const createdDate = new Date();
        createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 30));
        
        html += `
            <tr>
                <td>${user.id}</td>
                <td>
                    <strong>${user.name}</strong>
                    ${role === 'admin' ? ' 👑' : ''}
                </td>
                <td>${user.email}</td>
                <td>${user.phone || 'Chưa cập nhật'}</td>
                <td>${user.address || 'Chưa cập nhật'}</td>
                <td>
                    <span class="user-type-badge ${roleClass}">
                        ${roleLabel}
                    </span>
                </td>
                <td>${createdDate.toLocaleDateString('vi-VN')}</td>
                <td>
                    <div class="user-actions">
                        <button class="btn-view-cart" onclick="viewUserCart(${user.id})">
                            <i class="fas fa-shopping-cart"></i> Giỏ hàng
                        </button>
                        <button class="btn-edit-user" onclick="openEditUserModal(${user.id})">
                            <i class="fas fa-edit"></i> Sửa
                        </button>
                        ${user.id > 3 ? `<button class="btn-delete-user" onclick="deleteUser(${user.id})">
                            <i class="fas fa-trash"></i> Xóa
                        </button>` : ''}
                    </div>
                </td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = html;
}

// Thiết lập tìm kiếm người dùng
function setupUserSearch() {
    const userSearch = document.getElementById('user-search');
    
    if (userSearch) {
        userSearch.addEventListener('input', function() {
            loadUsersTable(this.value);
        });
    }
}

// Thiết lập nút thêm người dùng
function setupAddUserButton() {
    const addUserBtn = document.getElementById('add-user-btn');
    
    if (addUserBtn) {
        addUserBtn.addEventListener('click', function() {
            openAddUserModal();
        });
    }
}

// Xem giỏ hàng của người dùng
function viewUserCart(userId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.id === userId);
    
    if (!user) {
        alert('Người dùng không tồn tại!');
        return;
    }
    
    // Trong demo, giả sử mỗi user có giỏ hàng riêng
    const allCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
    const userCart = allCarts[user.email] || [];
    
    let cartHtml = '';
    
    if (userCart.length === 0) {
        cartHtml = `
            <div class="user-cart-empty">
                <i class="fas fa-shopping-cart"></i>
                <h3>Giỏ hàng trống</h3>
                <p>Người dùng chưa thêm sản phẩm nào vào giỏ hàng.</p>
            </div>
        `;
    } else {
        let total = 0;
        
        userCart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            cartHtml += `
                <div class="user-cart-item">
                    <div class="user-cart-item-info">
                        <div class="user-cart-item-name">${item.name}</div>
                        <div class="user-cart-item-price">${formatPrice(item.price)} VNĐ</div>
                    </div>
                    <div class="user-cart-item-quantity">
                        Số lượng: ${item.quantity}
                    </div>
                    <div class="user-cart-item-total">
                        ${formatPrice(itemTotal)} VNĐ
                    </div>
                </div>
            `;
        });
        
        cartHtml += `
            <div class="user-cart-total">
                Tổng cộng: <strong>${formatPrice(total)} VNĐ</strong>
            </div>
        `;
    }
    
    // Tạo modal xem giỏ hàng
    const modalHtml = `
        <div class="modal" id="user-cart-modal">
            <div class="modal-content">
                <span class="close-modal" onclick="document.getElementById('user-cart-modal').style.display='none'">&times;</span>
                <div class="modal-body">
                    <h2 class="modal-title">Giỏ hàng của ${user.name}</h2>
                    <div class="user-cart-items">
                        ${cartHtml}
                    </div>
                    <div class="form-actions">
                        <button class="btn-secondary" onclick="document.getElementById('user-cart-modal').style.display='none'">Đóng</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Thêm modal vào DOM
    const existingModal = document.getElementById('user-cart-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Hiển thị modal
    document.getElementById('user-cart-modal').style.display = 'flex';
}

// Mở modal chỉnh sửa người dùng
function openEditUserModal(userId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.id === userId);
    const role = user && (user.role || (user.isAdmin ? 'admin' : 'user'));
    
    if (!user) {
        alert('Người dùng không tồn tại!');
        return;
    }
    
    const modalHtml = `
        <div class="modal" id="edit-user-modal">
            <div class="modal-content">
                <span class="close-modal" onclick="document.getElementById('edit-user-modal').style.display='none'">&times;</span>
                <div class="modal-body">
                    <h2 class="modal-title">Chỉnh sửa người dùng</h2>
                    <form class="user-modal-form" id="edit-user-form">
                        <input type="hidden" id="edit-user-id" value="${user.id}">
                        
                        <div class="user-form-grid">
                            <div class="form-group">
                                <label for="edit-user-name">Tên người dùng *</label>
                                <input type="text" id="edit-user-name" value="${user.name}" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="edit-user-email">Email *</label>
                                <input type="email" id="edit-user-email" value="${user.email}" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="edit-user-phone">Số điện thoại</label>
                                <input type="tel" id="edit-user-phone" value="${user.phone || ''}">
                            </div>
                            
                            <div class="form-group">
                                <label for="edit-user-type">Loại tài khoản</label>
                                <select id="edit-user-type">
                                    <option value="user" ${role === 'user' ? 'selected' : ''}>Người dùng</option>
                                    <option value="shipper" ${role === 'shipper' ? 'selected' : ''}>Người giao hàng</option>
                                    <option value="admin" ${role === 'admin' ? 'selected' : ''}>Quản trị viên</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="edit-user-address">Địa chỉ</label>
                            <textarea id="edit-user-address" rows="3">${user.address || ''}</textarea>
                        </div>
                        
                        <div class="form-group">
                            <label>Đặt lại mật khẩu</label>
                            <div class="password-input">
                                <input type="password" id="edit-user-password" placeholder="Để trống nếu không thay đổi">
                                <button type="button" class="toggle-password">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="user-form-actions">
                            <button type="submit" class="btn-primary">Cập nhật</button>
                            <button type="button" class="btn-secondary" onclick="document.getElementById('edit-user-modal').style.display='none'">Hủy</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Thêm modal vào DOM
    const existingModal = document.getElementById('edit-user-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Hiển thị modal
    document.getElementById('edit-user-modal').style.display = 'flex';
    
    // Xử lý submit form
    const form = document.getElementById('edit-user-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            updateUser(userId);
        });
    }
    
    // Xử lý toggle password
    const toggleBtn = document.querySelector('#edit-user-modal .toggle-password');
    const passwordInput = document.getElementById('edit-user-password');
    
    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }
}

// Mở modal thêm người dùng mới
function openAddUserModal() {
    const modalHtml = `
        <div class="modal" id="add-user-modal">
            <div class="modal-content">
                <span class="close-modal" onclick="document.getElementById('add-user-modal').style.display='none'">&times;</span>
                <div class="modal-body">
                    <h2 class="modal-title">Thêm người dùng mới</h2>
                    <form class="user-modal-form" id="add-user-form">
                        <div class="user-form-grid">
                            <div class="form-group">
                                <label for="new-user-name">Tên người dùng *</label>
                                <input type="text" id="new-user-name" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="new-user-email">Email *</label>
                                <input type="email" id="new-user-email" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="new-user-phone">Số điện thoại</label>
                                <input type="tel" id="new-user-phone">
                            </div>
                            
                            <div class="form-group">
                                <label for="new-user-type">Loại tài khoản</label>
                                <select id="new-user-type">
                                    <option value="user">Người dùng</option>
                                    <option value="shipper">Người giao hàng</option>
                                    <option value="admin">Quản trị viên</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="user-form-grid">
                            <div class="form-group">
                                <label for="new-user-password">Mật khẩu *</label>
                                <div class="password-input">
                                    <input type="password" id="new-user-password" required>
                                    <button type="button" class="toggle-password">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="new-user-confirm-password">Xác nhận mật khẩu *</label>
                                <div class="password-input">
                                    <input type="password" id="new-user-confirm-password" required>
                                    <button type="button" class="toggle-password">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="new-user-address">Địa chỉ</label>
                            <textarea id="new-user-address" rows="3"></textarea>
                        </div>
                        
                        <div class="user-form-actions">
                            <button type="submit" class="btn-primary">Thêm người dùng</button>
                            <button type="button" class="btn-secondary" onclick="document.getElementById('add-user-modal').style.display='none'">Hủy</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Thêm modal vào DOM
    const existingModal = document.getElementById('add-user-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Hiển thị modal
    document.getElementById('add-user-modal').style.display = 'flex';
    
    // Xử lý submit form
    const form = document.getElementById('add-user-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewUser();
        });
    }
    
    // Xử lý toggle password
    const toggleButtons = document.querySelectorAll('#add-user-modal .toggle-password');
    toggleButtons.forEach((btn, index) => {
        const passwordInput = index === 0 ? 
            document.getElementById('new-user-password') : 
            document.getElementById('new-user-confirm-password');
        
        btn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    });
}

// Cập nhật thông tin người dùng
function updateUser(userId) {
    const name = document.getElementById('edit-user-name').value.trim();
    const email = document.getElementById('edit-user-email').value.trim();
    const phone = document.getElementById('edit-user-phone').value.trim();
    const address = document.getElementById('edit-user-address').value.trim();
    const userType = document.getElementById('edit-user-type').value;
    const password = document.getElementById('edit-user-password').value;
    
    // Validation
    if (!name || !email) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
    }
    
    if (!validateEmail(email)) {
        alert('Email không hợp lệ!');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        alert('Người dùng không tồn tại!');
        return;
    }
    
    // Kiểm tra email trùng (trừ email của chính user đó)
    const emailExists = users.some((u, index) => 
        index !== userIndex && u.email === email
    );
    
    if (emailExists) {
        alert('Email này đã được sử dụng bởi người dùng khác!');
        return;
    }
    
    // Cập nhật thông tin
    users[userIndex].name = name;
    users[userIndex].email = email;
    users[userIndex].phone = phone;
    users[userIndex].address = address;
    users[userIndex].isAdmin = userType === 'admin';
    users[userIndex].role = userType;
    
    // Cập nhật mật khẩu nếu có
    if (password) {
        if (password.length < 6) {
            alert('Mật khẩu phải có ít nhất 6 ký tự!');
            return;
        }
        users[userIndex].password = password;
    }
    
    // Lưu vào localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    // Cập nhật currentUser nếu đang chỉnh sửa chính mình
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.id === userId) {
        currentUser.name = name;
        currentUser.email = email;
        currentUser.phone = phone;
        currentUser.address = address;
        currentUser.isAdmin = userType === 'admin';
        currentUser.role = userType;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Cập nhật UI
        updateUserStatus();
    }
    
    // Đóng modal
    document.getElementById('edit-user-modal').style.display = 'none';
    
    // Reload bảng
    loadUsersTable();
    
    // Thông báo
    alert('Cập nhật thông tin người dùng thành công!');
}

// Thêm người dùng mới
function addNewUser() {
    const name = document.getElementById('new-user-name').value.trim();
    const email = document.getElementById('new-user-email').value.trim();
    const phone = document.getElementById('new-user-phone').value.trim();
    const address = document.getElementById('new-user-address').value.trim();
    const userType = document.getElementById('new-user-type').value;
    const password = document.getElementById('new-user-password').value;
    const confirmPassword = document.getElementById('new-user-confirm-password').value;
    
    // Validation
    if (!name || !email || !password) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
    }
    
    if (!validateEmail(email)) {
        alert('Email không hợp lệ!');
        return;
    }
    
    if (password.length < 6) {
        alert('Mật khẩu phải có ít nhất 6 ký tự!');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Mật khẩu xác nhận không khớp!');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Kiểm tra email trùng
    const emailExists = users.some(u => u.email === email);
    
    if (emailExists) {
        alert('Email này đã được đăng ký!');
        return;
    }
    
    // Tạo ID mới
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    
    // Tạo user mới
    const newUser = {
        id: newId,
        name: name,
        email: email,
        phone: phone,
        address: address,
        password: password,
        isAdmin: userType === 'admin',
        role: userType
    };
    
    // Thêm vào danh sách
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Đóng modal
    document.getElementById('add-user-modal').style.display = 'none';
    
    // Reload bảng
    loadUsersTable();
    
    // Thông báo
    alert('Thêm người dùng mới thành công!');
}

// Xóa người dùng
function deleteUser(userId) {
    if (userId <= 3) {
        alert('Không thể xóa tài khoản mẫu!');
        return;
    }
    
    if (!confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.filter(u => u.id !== userId);
    
    // Kiểm tra nếu đang xóa chính mình
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.id === userId) {
        alert('Không thể xóa tài khoản đang đăng nhập!');
        return;
    }
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Reload bảng
    loadUsersTable();
    
    // Thông báo
    alert('Xóa người dùng thành công!');
}

// Helper: Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Helper: Định dạng giá tiền (nếu chưa có)
function formatPrice(price) {
    if (!price) return '0';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// ===== QUẢN LÝ ĐƠN HÀNG - ADMIN =====

// Tải bảng đơn hàng
function loadOrdersTable(filterStatus = 'all', searchQuery = '') {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const tableBody = document.getElementById('orders-table-body');
    
    if (!tableBody) return;
    
    // Lọc đơn hàng
    let filteredOrders = orders;
    
    if (filterStatus !== 'all') {
        filteredOrders = filteredOrders.filter(order => order.status === filterStatus);
    }
    
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredOrders = filteredOrders.filter(order => 
            order.id.toLowerCase().includes(query) ||
            order.customer.name.toLowerCase().includes(query) ||
            (order.customer.phone && order.customer.phone.toLowerCase().includes(query))
        );
    }
    
    if (filteredOrders.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="orders-empty-row">
                    Không tìm thấy đơn hàng nào.
                </td>
            </tr>
        `;
        return;
    }
    
    let html = '';
    
    filteredOrders.forEach(order => {
        const orderDate = new Date(order.date).toLocaleDateString('vi-VN');
        const baseSubtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const baseShipping = baseSubtotal > 0 ? 30000 : 0;
        const baseDiscount = order.discount && typeof order.discount.amount === 'number' ? order.discount.amount : 0;
        const baseTaxable = Math.max(baseSubtotal - baseDiscount, 0);
        const baseTax = Math.round(baseTaxable * 0.1);
        const totalPrice = typeof order.total === 'number' ? order.total : baseTaxable + baseShipping + baseTax;
        const statusClass = `status-${order.status}`;
        const statusText = getAdminOrderStatusText(order.status);
        
        const hasShipper = !!(order.shipper && order.shipper.name);
        const shipperInfo = hasShipper
            ? `${order.shipper.name} (${order.shipper.phone || 'Chưa có SĐT'})`
            : 'Chưa có';
        
        html += `
            <tr>
                <td><strong>${order.id}</strong></td>
                <td>${order.customer.name}</td>
                <td>${order.customer.phone || ''}</td>
                <td>${order.customer.address || ''}</td>
                <td>${orderDate}</td>
                <td>${formatPrice(totalPrice)} VNĐ</td>
                <td>
                    <span class="order-status ${statusClass}">${statusText}</span>
                </td>
                <td>
                    <div class="order-assignee-cell">
                        <span class="order-assignee-label">Người giao: ${shipperInfo}</span>
                        <div class="order-admin-actions">
                            <button class="btn-edit" onclick="viewAdminOrderDetails('${order.id}')">Xem chi tiết</button>
                            <button class="btn-delete" onclick="deleteOrder('${order.id}')">Xóa</button>
                        </div>
                    </div>
                </td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = html;
}

// Tải bảng đơn hàng dành cho Người giao hàng
function loadOrdersTableForShipper(filterStatus = 'all', searchQuery = '') {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const tableBody = document.getElementById('orders-table-body');
    
    if (!tableBody) return;
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    const role = currentUser.role || (currentUser.isAdmin ? 'admin' : 'user');
    
    // Người giao hàng có thể xem tất cả đơn hàng, nhưng chỉ nhận đơn ở trạng thái Đã xác nhận
    let filteredOrders = orders;
    
    if (filterStatus !== 'all') {
        filteredOrders = filteredOrders.filter(order => order.status === filterStatus);
    }
    
    if (searchQuery) {
        filteredOrders = filteredOrders.filter(order => 
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (order.customer.phone && order.customer.phone.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }
    
    if (filteredOrders.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="orders-empty-row">
                    Không có đơn hàng phù hợp.
                </td>
            </tr>
        `;
        return;
    }
    
    let html = '';
    
    filteredOrders.forEach(order => {
        const orderDate = new Date(order.date).toLocaleDateString('vi-VN');
        const baseSubtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const baseShipping = baseSubtotal > 0 ? 30000 : 0;
        const baseDiscount = order.discount && typeof order.discount.amount === 'number' ? order.discount.amount : 0;
        const baseTaxable = Math.max(baseSubtotal - baseDiscount, 0);
        const baseTax = Math.round(baseTaxable * 0.1);
        const totalPrice = typeof order.total === 'number' ? order.total : baseTaxable + baseShipping + baseTax;
        const statusClass = `status-${order.status}`;
        const statusText = getAdminOrderStatusText(order.status);
        
        const hasShipper = !!(order.shipper && order.shipper.name);
        const shipperInfo = hasShipper
            ? `${order.shipper.name} (${order.shipper.phone || 'Chưa có SĐT'})`
            : 'Chưa có';
        
        let actionButtonHtml = '';
        if (order.status === 'confirmed') {
            actionButtonHtml = `
                <button class="btn-primary" onclick="shipperAcceptOrder('${order.id}')">Nhận đơn</button>
            `;
        } else if (order.status === 'shipped' && hasShipper && order.shipper.id === currentUser.id) {
            actionButtonHtml = `
                <button class="btn-primary" onclick="shipperMarkDelivered('${order.id}')">Đã giao thành công</button>
                <button class="btn-warning" onclick="shipperMarkFailed('${order.id}')">Giao hàng thất bại</button>
                <button class="btn-secondary" onclick="shipperCancelOrder('${order.id}')">Hủy nhận đơn</button>
            `;
        }
        
        html += `
            <tr>
                <td><strong>${order.id}</strong></td>
                <td>${order.customer.name}</td>
                <td>${order.customer.phone || ''}</td>
                <td>${order.customer.address || ''}</td>
                <td>${orderDate}</td>
                <td>${formatPrice(totalPrice)} VNĐ</td>
                <td>
                    <span class="order-status ${statusClass}">${statusText}</span>
                </td>
                <td>
                    <div class="order-assignee-cell">
                        <span class="order-assignee-label">Người giao: ${shipperInfo}</span>
                        <div class="order-shipper-actions">
                            ${actionButtonHtml}
                        </div>
                    </div>
                </td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = html;
}

// Lấy text trạng thái đơn hàng cho Admin
function getAdminOrderStatusText(status) {
    const statusMap = {
        'pending': 'Chờ xác nhận',
        'confirmed': 'Đã xác nhận',
        'shipped': 'Đang giao',
        'delivered': 'Đã giao',
        'failed': 'Giao hàng thất bại',
        'cancelled': 'Đã hủy',
        'deleted': 'Đã xóa'
    };
    return statusMap[status] || status;
}

// Thiết lập tìm kiếm và lọc đơn hàng
function setupOrdersFilterAndSearch() {
    const orderSearchInput = document.getElementById('order-search');
    const orderStatusFilter = document.getElementById('order-status-filter');
    
    if (orderSearchInput) {
        orderSearchInput.addEventListener('input', function() {
            const status = orderStatusFilter ? orderStatusFilter.value : 'all';
            loadOrdersTable(status, this.value);
        });
    }
    
    if (orderStatusFilter) {
        orderStatusFilter.addEventListener('change', function() {
            const searchQuery = orderSearchInput ? orderSearchInput.value : '';
            loadOrdersTable(this.value, searchQuery);
        });
    }
}

// Thiết lập tìm kiếm và lọc đơn hàng dành cho Người giao hàng
function setupShipperOrdersFilterAndSearch() {
    const orderSearchInput = document.getElementById('order-search');
    const orderStatusFilter = document.getElementById('order-status-filter');
    
    if (orderSearchInput) {
        orderSearchInput.addEventListener('input', function() {
            const status = orderStatusFilter ? orderStatusFilter.value : 'all';
            loadOrdersTableForShipper(status, this.value);
        });
    }
    
    if (orderStatusFilter) {
        orderStatusFilter.addEventListener('change', function() {
            const searchQuery = orderSearchInput ? orderSearchInput.value : '';
            loadOrdersTableForShipper(this.value, searchQuery);
        });
    }
}

// Xem chi tiết đơn hàng (Admin)
function viewAdminOrderDetails(orderId) {
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = allOrders.find(o => o.id === orderId);
    
    if (!order) {
        alert('Đơn hàng không tồn tại!');
        return;
    }
    
    const orderDate = new Date(order.date).toLocaleDateString('vi-VN');
    const orderTime = new Date(order.date).toLocaleTimeString('vi-VN');
    const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 30000 : 0;
    let discountAmount = 0;
    let discountLabel = '';
    if (order.discount && typeof order.discount.amount === 'number' && order.discount.amount > 0) {
        discountAmount = order.discount.amount;
        if (order.discount.type === 'percent') {
            discountLabel = `Giảm giá (${order.discount.value}%)`;
        } else {
            discountLabel = `Giảm giá (${formatPrice(order.discount.value)} VNĐ)`;
        }
    }
    const taxableAmount = Math.max(subtotal - discountAmount, 0);
    const tax = Math.round(taxableAmount * 0.1);
    const total = typeof order.total === 'number' ? order.total : taxableAmount + shipping + tax;
    
    const itemsHtml = order.items.map(item => `
        <tr>
            <td>${item.name}</td>
            <td style="text-align: center;">${item.quantity}</td>
            <td style="text-align: right;">${formatPrice(item.price)} VNĐ</td>
            <td style="text-align: right;">${formatPrice(item.price * item.quantity)} VNĐ</td>
        </tr>
    `).join('');
    
    const statusHtml = `
        <select id="order-status-select" class="order-status-select">
            <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Chờ xác nhận</option>
            <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>Đã xác nhận</option>
            <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Đang giao</option>
            <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Đã giao</option>
            <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Đã hủy</option>
        </select>
    `;
    
    let cancelReasonHtml = '';
    if (order.status === 'cancelled') {
        cancelReasonHtml = `
        <div class="order-details-section" style="border-top: 1px solid #eee; padding-top: 20px;">
            <h3>Lý do hủy</h3>
            <p>${order.cancelReason || 'Không có lý do'}</p>
            <p style="font-size: 12px; color: #666;">Hủy lúc: ${order.cancelledAt ? new Date(order.cancelledAt).toLocaleString('vi-VN') : ''}</p>
        </div>
        `;
    } else if (order.status === 'deleted') {
        cancelReasonHtml = `
        <div class="order-details-section" style="border-top: 1px solid #eee; padding-top: 20px;">
            <h3>Lý do xóa</h3>
            <p>${order.deleteReason || 'Không có lý do'}</p>
            <p style="font-size: 12px; color: #666;">Xóa lúc: ${order.deletedAt ? new Date(order.deletedAt).toLocaleString('vi-VN') : ''}</p>
        </div>
        `;
    } else if (order.status === 'failed') {
        cancelReasonHtml = `
        <div class="order-details-section" style="border-top: 1px solid #eee; padding-top: 20px;">
            <h3>Lý do giao hàng thất bại</h3>
            <p>${order.deliveryFailedReason || 'Không có lý do'}</p>
            <p style="font-size: 12px; color: #666;">Thời gian ghi nhận: ${order.deliveryFailedAt ? new Date(order.deliveryFailedAt).toLocaleString('vi-VN') : ''}</p>
            ${order.shipper && order.shipper.name ? `<p style="font-size: 12px; color: #666;">Người giao hàng: ${order.shipper.name}${order.shipper.phone ? ' (SĐT: ' + order.shipper.phone + ')' : ''}</p>` : ''}
        </div>
        `;
    }
    
    const discountSummaryHtml = discountAmount > 0 ? `
                        <div class="summary-row">
                            <span>${discountLabel}</span>
                            <span>- ${formatPrice(discountAmount)} VNĐ</span>
                        </div>
    ` : '';
    
    const discountInfoHtml = order.discount && order.discount.code ? `
                <div class="order-details-section">
                    <h3>Mã giảm giá</h3>
                    <p>Mã: <strong>${order.discount.code}</strong></p>
                    <p>Giảm: <strong>${order.discount.type === 'percent' ? order.discount.value + '%' : formatPrice(order.discount.value) + ' VNĐ'}</strong></p>
                    <p>Số tiền đã giảm: <strong>${formatPrice(discountAmount)} VNĐ</strong></p>
                </div>
    ` : '';
    
    const modalContent = `
        <div class="order-details-modal">
            <div class="modal-header">
                <h2>Chi tiết đơn hàng ${order.id}</h2>
                <span class="close-modal" onclick="closeAdminOrderModal()">&times;</span>
            </div>
            
            <div class="modal-body">
                <div class="order-details-section">
                    <h3>Thông tin đơn hàng</h3>
                    <div class="details-grid">
                        <div class="detail-item">
                            <span class="label">Mã đơn hàng:</span>
                            <span class="value">${order.id}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Ngày đặt:</span>
                            <span class="value">${orderDate} ${orderTime}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Trạng thái:</span>
                            <span class="value">${statusHtml}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Phương thức thanh toán:</span>
                            <span class="value">${order.paymentMethod === 'cod' ? 'COD (Thanh toán khi nhận)' : order.paymentMethod === 'bank' ? 'Chuyển khoản ngân hàng' : 'Thẻ tín dụng'}</span>
                        </div>
                    </div>
                </div>
                
                <div class="order-details-section">
                    <h3>Thông tin khách hàng</h3>
                    <div class="details-grid">
                        <div class="detail-item">
                            <span class="label">Họ và tên:</span>
                            <span class="value">${order.customer.name}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Email:</span>
                            <span class="value">${order.customer.email}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Số điện thoại:</span>
                            <span class="value">${order.customer.phone}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Địa chỉ giao hàng:</span>
                            <span class="value">${order.customer.address}</span>
                        </div>
                    </div>
                </div>
                
                <div class="order-details-section">
                    <h3>Chi tiết sản phẩm</h3>
                    <table class="order-items-table">
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th style="text-align: center;">Số lượng</th>
                                <th style="text-align: right;">Đơn giá</th>
                                <th style="text-align: right;">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsHtml}
                        </tbody>
                    </table>
                </div>
                
                <div class="order-details-section">
                    <h3>Tóm tắt thanh toán</h3>
                    <div class="summary-grid">
                        <div class="summary-row">
                            <span>Tạm tính:</span>
                            <span>${formatPrice(subtotal)} VNĐ</span>
                        </div>
                        <div class="summary-row">
                            <span>Phí vận chuyển:</span>
                            <span>${formatPrice(shipping)} VNĐ</span>
                        </div>
                        <div class="summary-row">
                            <span>Thuế (VAT 10%):</span>
                            <span>${formatPrice(tax)} VNĐ</span>
                        </div>
                        ${discountSummaryHtml}
                        <div class="summary-row total">
                            <span>Tổng cộng:</span>
                            <span><strong>${formatPrice(total)} VNĐ</strong></span>
                        </div>
                    </div>
                </div>
                
                ${order.notes ? `
                <div class="order-details-section">
                    <h3>Ghi chú</h3>
                    <p>${order.notes}</p>
                </div>
                ` : ''}
                
                ${discountInfoHtml}
                ${cancelReasonHtml}
            </div>
            
            <div class="modal-footer">
                <button class="btn-primary" onclick="updateOrderStatus('${order.id}')">Cập nhật trạng thái</button>
                <button class="btn-secondary" onclick="closeAdminOrderModal()">Đóng</button>
            </div>
        </div>
    `;
    
    // Tạo modal
    const existingModal = document.getElementById('admin-order-details-container');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.id = 'admin-order-details-container';
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = modalContent;
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    document.body.appendChild(modal);
}

// Đóng modal chi tiết đơn hàng (Admin)
function closeAdminOrderModal() {
    const modal = document.getElementById('admin-order-details-container');
    if (modal) {
        modal.remove();
    }
}

// Cập nhật trạng thái đơn hàng
function updateOrderStatus(orderId) {
    const statusSelect = document.getElementById('order-status-select');
    
    if (!statusSelect) {
        alert('Vui lòng chọn trạng thái!');
        return;
    }
    
    const newStatus = statusSelect.value;
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderIndex = allOrders.findIndex(o => o.id === orderId);
    
    if (orderIndex === -1) {
        alert('Đơn hàng không tồn tại!');
        return;
    }
    
    // Nếu admin đổi sang trạng thái cancelled hoặc failed, yêu cầu nhập lý do
    if (newStatus === 'cancelled') {
        let reason = prompt('Vui lòng nhập lý do hủy đơn hàng (bắt buộc):');
        if (!reason || !reason.trim()) {
            alert('Lý do hủy là bắt buộc. Hành động đã bị hủy.');
            return;
        }
        allOrders[orderIndex].status = 'cancelled';
        allOrders[orderIndex].cancelReason = reason.trim();
        allOrders[orderIndex].cancelledAt = new Date().toISOString();
        
        // Hoàn lại số lượng tồn kho khi hủy
        restoreProductStock(allOrders[orderIndex].items);
    } else if (newStatus === 'failed') {
        let reason = prompt('Vui lòng nhập lý do giao hàng thất bại (bắt buộc):');
        if (!reason || !reason.trim()) {
            alert('Lý do giao hàng thất bại là bắt buộc. Hành động đã bị hủy.');
            return;
        }
        allOrders[orderIndex].status = 'failed';
        allOrders[orderIndex].deliveryFailedReason = reason.trim();
        allOrders[orderIndex].deliveryFailedAt = new Date().toISOString();
    } else {
        // Nếu trạng thái khác (ví dụ confirmed, shipped...), xóa lý do hủy nếu có
        allOrders[orderIndex].status = newStatus;
        if (allOrders[orderIndex].cancelReason) delete allOrders[orderIndex].cancelReason;
        if (allOrders[orderIndex].cancelledAt) delete allOrders[orderIndex].cancelledAt;
        if (allOrders[orderIndex].deliveryFailedReason) delete allOrders[orderIndex].deliveryFailedReason;
        if (allOrders[orderIndex].deliveryFailedAt) delete allOrders[orderIndex].deliveryFailedAt;
        
        // Khi admin chỉnh sửa trạng thái, không thay đổi thông tin người giao hàng
    }

    // Lưu lại
    localStorage.setItem('orders', JSON.stringify(allOrders));
    
    // Đóng modal
    closeAdminOrderModal();
    
    // Hiển thị thông báo
    alert('Cập nhật trạng thái đơn hàng thành công!');
    
    // Tải lại bảng đơn hàng
    loadOrdersTable();
}

// Xóa đơn hàng
function deleteOrder(orderId) {
    if (!confirm('Bạn có chắc chắn muốn xóa đơn hàng này? Hành động này không thể hoàn tác!')) {
        return;
    }

    // Yêu cầu lý do xóa và lưu lại dưới dạng trạng thái 'deleted' để người dùng vẫn có thể xem lý do
    let reason = prompt('Vui lòng nhập lý do xóa đơn hàng (bắt buộc):');
    if (!reason || !reason.trim()) {
        alert('Lý do xóa là bắt buộc. Hành động đã bị hủy.');
        return;
    }

    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderIndex = allOrders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) {
        alert('Đơn hàng không tồn tại!');
        return;
    }

    // Đánh dấu là deleted và lưu lý do
    allOrders[orderIndex].status = 'deleted';
    allOrders[orderIndex].deleteReason = reason.trim();
    allOrders[orderIndex].deletedAt = new Date().toISOString();
    
    // Hoàn lại số lượng tồn kho khi xóa đơn hàng
    restoreProductStock(allOrders[orderIndex].items);

    localStorage.setItem('orders', JSON.stringify(allOrders));

    alert('Đã xóa (đánh dấu) đơn hàng thành công và lưu lý do.');

    // Tải lại bảng
    loadOrdersTable();
}

// Hoàn lại số lượng tồn kho khi hủy/xóa đơn hàng
function restoreProductStock(items) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    items.forEach(item => {
        const productIndex = products.findIndex(p => p.id === item.id);
        if (productIndex !== -1) {
            products[productIndex].quantity = (products[productIndex].quantity || 0) + item.quantity;
        }
    });
    
    localStorage.setItem('products', JSON.stringify(products));
}

// ========== QUẢN LÝ MÃ GIẢM GIÁ ==========

function setupDiscountTab() {
    loadDiscountsTable();
    const addBtn = document.getElementById('add-discount-btn');
    if (addBtn) {
        addBtn.onclick = openAddDiscountModal;
    }
    const searchInput = document.getElementById('discount-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            loadDiscountsTable(this.value);
        });
    }
}

function loadDiscountsTable(search = '') {
    const discounts = JSON.parse(localStorage.getItem('discountCodes')) || [];
    const tbody = document.getElementById('discounts-table-body');
    if (!tbody) return;
    let filtered = discounts;
    if (search) {
        filtered = discounts.filter(d => d.code.toLowerCase().includes(search.toLowerCase()) || (d.description && d.description.toLowerCase().includes(search.toLowerCase())));
    }
    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;">Không có mã giảm giá nào.</td></tr>`;
        return;
    }
    let html = '';
    filtered.forEach(d => {
        html += `<tr>
            <td>${d.code}</td>
            <td>${d.type === 'percent' ? 'Phần trăm' : 'Số tiền'}</td>
            <td>${d.type === 'percent' ? d.value + '%' : formatPrice(d.value) + ' VNĐ'}</td>
            <td>${d.expiry ? new Date(d.expiry).toLocaleDateString('vi-VN') : ''}</td>
            <td>${d.description || ''}</td>
            <td>${isDiscountActive(d) ? 'Còn hạn' : 'Hết hạn'}</td>
            <td>
                <button class="btn-edit" onclick="openEditDiscountModal('${d.code}')">Sửa</button>
                <button class="btn-delete" onclick="deleteDiscountCode('${d.code}')">Xóa</button>
                <button class="btn-view-details" onclick="viewDiscountDetails('${d.code}')">Chi tiết</button>
            </td>
        </tr>`;
    });
    tbody.innerHTML = html;
}

function isDiscountActive(d) {
    if (!d.expiry) return true;
    return new Date(d.expiry) >= new Date();
}

function openAddDiscountModal() {
    showDiscountModal('add');
}

function openEditDiscountModal(code) {
    showDiscountModal('edit', code);
}

function showDiscountModal(mode, code) {
    let discounts = JSON.parse(localStorage.getItem('discountCodes')) || [];
    let data = { code: '', type: 'amount', value: 0, expiry: '', description: '' };
    if (mode === 'edit') {
        data = discounts.find(d => d.code === code) || data;
    }
    // Tạo modal
    let modal = document.getElementById('discount-modal');
    if (modal) modal.remove();
    modal = document.createElement('div');
    modal.id = 'discount-modal';
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width:500px;">
            <span class="close-modal" onclick="document.getElementById('discount-modal').remove()">&times;</span>
            <div class="modal-body">
                <h2 class="modal-title">${mode === 'add' ? 'Thêm mã giảm giá' : 'Chỉnh sửa mã giảm giá'}</h2>
                <form id="discount-form">
                    <div class="form-group">
                        <label for="discount-code">Mã giảm giá *</label>
                        <input type="text" id="discount-code" value="${data.code}" ${mode === 'edit' ? 'readonly' : ''} required>
                    </div>
                    <div class="form-group">
                        <label for="discount-type">Loại *</label>
                        <select id="discount-type">
                            <option value="amount" ${data.type === 'amount' ? 'selected' : ''}>Số tiền</option>
                            <option value="percent" ${data.type === 'percent' ? 'selected' : ''}>Phần trăm</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="discount-value">Giá trị *</label>
                        <input type="number" id="discount-value" value="${data.value}" min="1" required>
                    </div>
                    <div class="form-group">
                        <label for="discount-expiry">Hạn sử dụng *</label>
                        <input type="date" id="discount-expiry" value="${data.expiry ? new Date(data.expiry).toISOString().split('T')[0] : ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="discount-description">Mô tả</label>
                        <textarea id="discount-description" rows="2">${data.description || ''}</textarea>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn-primary">${mode === 'add' ? 'Thêm' : 'Cập nhật'}</button>
                        <button type="button" class="btn-secondary" onclick="document.getElementById('discount-modal').remove()">Hủy</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('discount-form').onsubmit = function(e) {
        e.preventDefault();
        const code = document.getElementById('discount-code').value.trim().toUpperCase();
        const type = document.getElementById('discount-type').value;
        const value = parseFloat(document.getElementById('discount-value').value);
        const expiry = document.getElementById('discount-expiry').value;
        const description = document.getElementById('discount-description').value.trim();
        if (!code || !type || !value || !expiry) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }
        let discounts = JSON.parse(localStorage.getItem('discountCodes')) || [];
        if (mode === 'add') {
            if (discounts.some(d => d.code === code)) {
                alert('Mã giảm giá đã tồn tại!');
                return;
            }
            discounts.push({ code, type, value, expiry, description });
        } else {
            const idx = discounts.findIndex(d => d.code === code);
            if (idx !== -1) {
                discounts[idx] = { code, type, value, expiry, description };
            }
        }
        localStorage.setItem('discountCodes', JSON.stringify(discounts));
        loadDiscountsTable();
        modal.remove();
    };
}

function deleteDiscountCode(code) {
    if (!confirm('Bạn có chắc chắn muốn xóa mã giảm giá này?')) return;
    let discounts = JSON.parse(localStorage.getItem('discountCodes')) || [];
    discounts = discounts.filter(d => d.code !== code);
    localStorage.setItem('discountCodes', JSON.stringify(discounts));
    loadDiscountsTable();
}

function viewDiscountDetails(code) {
    const discounts = JSON.parse(localStorage.getItem('discountCodes')) || [];
    const d = discounts.find(d => d.code === code);
    if (!d) return;
    
    let modal = document.getElementById('discount-detail-modal');
    if (modal) modal.remove();
    
    modal = document.createElement('div');
    modal.id = 'discount-detail-modal';
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width:500px;">
            <span class="close-modal" onclick="document.getElementById('discount-detail-modal').remove()">&times;</span>
            <div class="modal-body">
                <h2 class="modal-title">Chi tiết mã giảm giá</h2>
                <div class="discount-details">
                    <div class="detail-item">
                        <span class="label">Mã:</span>
                        <span class="value"><strong>${d.code}</strong></span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Loại:</span>
                        <span class="value">${d.type === 'percent' ? 'Phần trăm' : 'Số tiền'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Giá trị:</span>
                        <span class="value">${d.type === 'percent' ? d.value + '%' : formatPrice(d.value) + ' VNĐ'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Hạn sử dụng:</span>
                        <span class="value">${d.expiry ? new Date(d.expiry).toLocaleDateString('vi-VN') : 'Không giới hạn'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Trạng thái:</span>
                        <span class="value ${isDiscountActive(d) ? 'status-active' : 'status-expired'}">
                            ${isDiscountActive(d) ? 'Còn hạn' : 'Hết hạn'}
                        </span>
                    </div>
                    ${d.description ? `
                    <div class="detail-item">
                        <span class="label">Mô tả:</span>
                        <span class="value">${d.description}</span>
                    </div>
                    ` : ''}
                </div>
                <div class="form-actions">
                    <button class="btn-secondary" onclick="document.getElementById('discount-detail-modal').remove()">Đóng</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}
