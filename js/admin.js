document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra xem người dùng có phải là admin không
    checkAdminAccess();
    
    // Khởi tạo trang admin
    initAdmin();
    
    // Xử lý chuyển tab
    setupTabNavigation();
    
    // Tải danh sách sản phẩm
    loadProductsTable();
    
    // Cập nhật số lượng sản phẩm theo danh mục
    updateCategoryStats();
    
    // Xử lý form thêm sản phẩm
    setupAddProductForm();
    
    // Xử lý form chỉnh sửa sản phẩm
    setupEditProductForm();
    
    // Xử lý tìm kiếm và lọc
    setupFilterAndSearch();
    
    // Xử lý đăng xuất
    setupLogout();
    
    // TẢI DANH SÁCH NGƯỜI DÙNG
    loadUsersTable();
    
    // XỬ LÝ TÌM KIẾM NGƯỜI DÙNG
    setupUserSearch();
    
    // XỬ LÝ THÊM NGƯỜI DÙNG
    setupAddUserButton();
});

// Kiểm tra quyền truy cập admin
function checkAdminAccess() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser || !currentUser.isAdmin) {
        // Chuyển hướng về trang đăng nhập nếu không phải admin
        window.location.href = 'login.html?redirect=admin';
    } else {
        // Hiển thị tên người dùng
        const adminUsername = document.getElementById('admin-username');
        if (adminUsername) {
            adminUsername.textContent = currentUser.name;
        }
    }
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
                <td colspan="7" style="text-align: center; padding: 40px;">
                    Không tìm thấy người dùng nào.
                </td>
            </tr>
        `;
        return;
    }
    
    let html = '';
    
    filteredUsers.forEach(user => {
        // Tạo ngày tạo giả lập (cho demo)
        const createdDate = new Date();
        createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 30));
        
        html += `
            <tr>
                <td>${user.id}</td>
                <td>
                    <strong>${user.name}</strong>
                    ${user.isAdmin ? ' 👑' : ''}
                </td>
                <td>${user.email}</td>
                <td>${user.phone || 'Chưa cập nhật'}</td>
                <td>
                    <span class="user-type-badge ${user.isAdmin ? 'user-type-admin' : 'user-type-user'}">
                        ${user.isAdmin ? 'Quản trị viên' : 'Người dùng'}
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
                                    <option value="user" ${!user.isAdmin ? 'selected' : ''}>Người dùng</option>
                                    <option value="admin" ${user.isAdmin ? 'selected' : ''}>Quản trị viên</option>
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
        isAdmin: userType === 'admin'
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