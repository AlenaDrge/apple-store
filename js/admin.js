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
                <td colspan="6" style="text-align: center; padding: 40px;">
                    Không tìm thấy sản phẩm nào.
                </td>
            </tr>
        `;
        return;
    }
    
    let html = '';
    
    filteredProducts.forEach(product => {
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
        const description = document.getElementById('product-description').value.trim();
        const imageUrl = document.getElementById('product-image-url').value.trim();
        
        // Kiểm tra dữ liệu
        if (!name || !category || !price || !description || !imageUrl) {
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
        const description = document.getElementById('edit-product-description').value.trim();
        const imageUrl = document.getElementById('edit-product-image-url').value.trim();
        
        // Kiểm tra dữ liệu
        if (!name || !category || !price || !description || !imageUrl) {
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