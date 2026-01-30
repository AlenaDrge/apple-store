// Khởi tạo trang danh mục
document.addEventListener('DOMContentLoaded', function() {
    // Lấy tham số từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryType = urlParams.get('type') || 'iphones';
    
    // Lưu danh mục hiện tại
    window.currentCategory = categoryType;
    
    // Khởi tạo dữ liệu
    initData();
    
    // Tải sản phẩm
    loadCategoryProducts(categoryType);
    
    // Cập nhật số giỏ hàng
    updateCartCount();
    
    // Cập nhật trạng thái người dùng
    updateUserStatus();
    
    // Xử lý modal sản phẩm
    setupProductModal();
    
    // Xử lý bộ lọc
    setupFilters();
    
    // Xử lý menu mobile
    setupMobileMenu();
});

// Khởi tạo dữ liệu
function initData() {
    if (!localStorage.getItem('products')) {
        // Dữ liệu từ main.js
        const sampleProducts = [
            {
                id: 1,
                name: 'iPhone 14 Pro Max',
                category: 'iphones',
                price: 29990000,
                quantity: 10, // THÊM TRƯỜNG QUANTITY
                description: 'iPhone 14 Pro Max với chip A16 Bionic, màn hình Super Retina XDR 6.7 inch, camera chính 48MP.',
                image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/_/t_m_19.png'
            },
            {
                id: 2,
                name: 'iPhone 17 Pro Max',
                category: 'iphones',
                price: 37769000,
                quantity: 20, // THÊM TRƯỜNG QUANTITY
                description: 'iPhone 17 Pro Max với chip A19 Bionic Pro, camera 48MP, thời lượng pin cả ngày.',
                image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-17-pro-max.jpg'
            },
            {
                id: 3,
                name: 'iPhone 15 ',
                category: 'iphones',
                price: 16790000,
                quantity: 30, // THÊM TRƯỜNG QUANTITY
                description: 'iPhone 15 với chip A15 Bionic, camera 48MP, thời lượng pin cả ngày.',
                image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-15-128gb-xanh-la.png'
            },

            {
                id: 4,
                name: 'MacBook Air M4',
                category: 'macbooks',
                price: 23990000,
                quantity: 30, // THÊM TRƯỜNG QUANTITY
                description: 'MacBook Air M4 13 inch với chip M2 Pro, 16GB RAM, SSD 512GB, màn hình Liquid Retina XDR.',
                image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_15__7_163.png'
            },
            {
                id: 5,
                name: 'MacBook Air M2',
                category: 'macbooks',
                price: 27990000,
                quantity: 10, // THÊM TRƯỜNG QUANTITY
                description: 'MacBook Air siêu mỏng nhẹ với chip M2, 8GB RAM, SSD 256GB, thời lượng pin lên đến 18 giờ.',
                image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/m/a/macbook_air_m2_4_1_1_2.jpg'
            },
            {
                id: 6,
                name: 'MacBook Pro 14 M5',
                category: 'macbooks',
                price: 41690000,
                quantity: 20, // THÊM TRƯỜNG QUANTITY
                description: 'MacBook Pro 14 M5 với chip M5, 16GB RAM, SSD 512GB, thời lượng pin lên đến 18 giờ.',
                image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/m/a/macbook_air_m2_4_1_1_2.jpg'
            },
            
            {
                id: 7,
                name: 'iPad Air 11',
                category: 'ipads',
                price: 17590000,
                quantity: 20, // THÊM TRƯỜNG QUANTITY
                description: 'iPad Air 11 inch với chip M3, màn hình Liquid Retina XDR, hỗ trợ Apple Pencil 2.',
                image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_45_.jpg'
            },
            {
               id: 8,
                name: 'iPad Air 5',
                category: 'ipads',
                price: 12990000,
                quantity: 15, // THÊM TRƯỜNG QUANTITY
                description: 'iPad Air với chip M1, màn hình Liquid Retina 10.9 inch, hỗ trợ Apple Pencil 2 và Magic Keyboard.',
                image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/7/_/7_87_3.jpg'
            },
            {
               id: 9,
                name: 'iPad Mini 7',
                category: 'ipads',
                price: 17590000,
                quantity: 15, // THÊM TRƯỜNG QUANTITY
                description: 'iPad Mini 7 với chip A17 Pro, màn hình Liquid Retina 8.3 inch, hỗ trợ Apple Pencil 2 và Magic Keyboard.',
                image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-mini-7-5g-gray_2.jpg'
            },

            {
               id: 10,
                name: 'AirPods Pro 2',
                category: 'airpods',
                price: 6990000,
                quantity: 25, // THÊM TRƯỜNG QUANTITY
                description: 'AirPods Pro thế hệ 2 với tính năng chống ồn chủ động, âm thanh chất lượng cao và sạc không dây.',
                image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/i/airpods_pro_2_sep24_pdp_image_position_7__vn-vi.jpg'
            },
            {
               id: 11,
                name: 'AirPods 3',
                category: 'airpods',
                price: 4990000,
                quantity: 10, // THÊM TRƯỜNG QUANTITY
                description: 'AirPods thế hệ 3 với thiết kế contoured, tính năng Spatial Audio và thời lượng pin lên đến 6 giờ.',
                image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-3-2022-ksp-1.png'
            },
            {
               id: 12,
                name: 'AirPods Pro 2021 Magsafe',
                category: 'airpods',
                price: 4690000,
                quantity: 20, // THÊM TRƯỜNG QUANTITY
                description: 'AirPods Pro 2021 Magsafe với tính năng chống ồn chủ động, âm thanh chất lượng cao và sạc không dây.',
                image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/w/mwp22_2.jpg'
            }
        ];
        
        localStorage.setItem('products', JSON.stringify(sampleProducts));
    }
    
    // Khởi tạo userCarts
    if (!localStorage.getItem('userCarts')) {
        localStorage.setItem('userCarts', JSON.stringify({}));
    }
}

// Tải sản phẩm theo danh mục
function loadCategoryProducts(categoryType) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const categoryProducts = products.filter(p => p.category === categoryType);
    
    // Lưu sản phẩm ban đầu
    window.originalProducts = categoryProducts;
    window.filteredProducts = [...categoryProducts];
    
    // Cập nhật tiêu đề
    const categoryNames = {
        'iphones': 'iPhone',
        'macbooks': 'MacBook',
        'ipads': 'iPad',
        'airpods': 'AirPods'
    };
    
    document.getElementById('category-title').textContent = categoryNames[categoryType] || 'Danh mục sản phẩm';
    document.getElementById('category-description').textContent = `Khám phá ${categoryNames[categoryType]} tuyệt vời từ Apple`;
    
    // Hiển thị sản phẩm
    displayProducts(categoryProducts);
}

// Hiển thị sản phẩm
function displayProducts(products) {
    const productsContainer = document.getElementById('category-products');
    const emptyState = document.getElementById('empty-products');
    const productsCount = document.getElementById('products-count');
    
    if (products.length === 0) {
        productsContainer.innerHTML = '';
        emptyState.classList.remove('hidden');
        productsCount.textContent = 'Không có sản phẩm';
        return;
    }
    
    emptyState.classList.add('hidden');
    productsCount.textContent = `Hiển thị ${products.length} sản phẩm`;
    
    let html = '';
    
    products.forEach(product => {
        const isLoggedIn = JSON.parse(localStorage.getItem('currentUser')) !== null;
        const addToCartClass = isLoggedIn ? 'btn-add-to-cart' : 'btn-add-to-cart disabled';
        const onClickHandler = isLoggedIn ? `onclick="addToCart(${product.id})"` : 'onclick="requireLogin()"';
        const addToCartText = isLoggedIn ? 'Thêm vào giỏ' : 'Đăng nhập để mua';
        
        html += `
            <div class="product-card">
                <div class="product-image" onclick="openProductModal(${product.id})">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <div class="product-overlay">
                        <button class="btn-view-details" onclick="openProductModal(${product.id})">Xem chi tiết</button>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">${formatPrice(product.price)} VNĐ</p>
                    <div class="product-stock">
                        ${product.quantity > 0 ? `<span class="in-stock">Còn hàng (${product.quantity})</span>` : '<span class="out-of-stock">Hết hàng</span>'}
                    </div>
                    <button class="${addToCartClass}" ${onClickHandler}>
                        ${addToCartText}
                    </button>
                </div>
            </div>
        `;
    });
    
    productsContainer.innerHTML = html;
}

// Đặt up bộ lọc
function setupFilters() {
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const applyBtn = document.getElementById('apply-price-filter');
    const clearBtn = document.getElementById('clear-filters');
    
    const sortDefaultBtn = document.getElementById('sort-default');
    const sortAscBtn = document.getElementById('sort-price-asc');
    const sortDescBtn = document.getElementById('sort-price-desc');
    const sortNameBtn = document.getElementById('sort-name');
    
    // Áp dụng bộ lọc giá
    applyBtn.addEventListener('click', function() {
        applyPriceFilter();
    });
    
    // Nhấn Enter để áp dụng bộ lọc
    minPriceInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') applyPriceFilter();
    });
    maxPriceInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') applyPriceFilter();
    });
    
    // Sắp xếp
    sortDefaultBtn.addEventListener('click', function() {
        window.filteredProducts = [...window.originalProducts];
        updateSortButtons(sortDefaultBtn);
        displayProducts(window.filteredProducts);
    });
    
    sortAscBtn.addEventListener('click', function() {
        window.filteredProducts.sort((a, b) => a.price - b.price);
        updateSortButtons(sortAscBtn);
        displayProducts(window.filteredProducts);
    });
    
    sortDescBtn.addEventListener('click', function() {
        window.filteredProducts.sort((a, b) => b.price - a.price);
        updateSortButtons(sortDescBtn);
        displayProducts(window.filteredProducts);
    });
    
    sortNameBtn.addEventListener('click', function() {
        window.filteredProducts.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
        updateSortButtons(sortNameBtn);
        displayProducts(window.filteredProducts);
    });
    
    // Xóa bộ lọc
    clearBtn.addEventListener('click', function() {
        minPriceInput.value = '';
        maxPriceInput.value = '';
        window.filteredProducts = [...window.originalProducts];
        updateSortButtons(null);
        displayProducts(window.filteredProducts);
    });
}

// Áp dụng bộ lọc giá
function applyPriceFilter() {
    const minPrice = parseInt(document.getElementById('min-price').value) || 0;
    const maxPrice = parseInt(document.getElementById('max-price').value) || Infinity;
    
    window.filteredProducts = window.originalProducts.filter(p => 
        p.price >= minPrice && p.price <= maxPrice
    );
    
    displayProducts(window.filteredProducts);
    showNotification('Đã áp dụng bộ lọc');
}

// Cập nhật nút sắp xếp
function updateSortButtons(activeBtn) {
    const buttons = document.querySelectorAll('.sort-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    if (activeBtn) activeBtn.classList.add('active');
}

// Mở modal chi tiết sản phẩm
function openProductModal(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const isLoggedIn = JSON.parse(localStorage.getItem('currentUser')) !== null;
    const addToCartButton = isLoggedIn 
        ? `<button class="btn-primary" onclick="addToCart(${product.id}); document.getElementById('product-modal').style.display='none';">Thêm vào giỏ hàng</button>`
        : `<button class="btn-primary" onclick="showNotification('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!'); setTimeout(() => { window.location.href = 'login.html?redirect=category.html?type=${window.currentCategory}'; }, 1500);">Đăng nhập để mua</button>`;
    
    const modalInner = document.getElementById('modal-inner');
    modalInner.innerHTML = `
        <div class="product-details-modal">
            <div class="product-image-large">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-details-info">
                <h2>${product.name}</h2>
                <p class="product-description">${product.description}</p>
                <div class="product-price-large">${formatPrice(product.price)} VNĐ</div>
                <div class="product-stock-large">
                    ${product.quantity > 0 ? `<span class="in-stock"><i class="fas fa-check-circle"></i> Còn hàng (${product.quantity})</span>` : '<span class="out-of-stock"><i class="fas fa-times-circle"></i> Hết hàng</span>'}
                </div>
                ${addToCartButton}
            </div>
        </div>
    `;
    
    document.getElementById('product-modal').style.display = 'flex';
}

// Đặt up modal
function setupProductModal() {
    const modal = document.getElementById('product-modal');
    const closeBtn = document.querySelector('.close-modal');
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Thêm sản phẩm vào giỏ hàng
function addToCart(productId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        showNotification('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
        setTimeout(() => {
            window.location.href = 'login.html?redirect=category.html?type=' + window.currentCategory;
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
    
    let userCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
    let userCart = userCarts[currentUser.email] || [];
    const existingItem = userCart.find(item => item.id === productId);
    
    if (existingItem) {
        if (existingItem.quantity + 1 > product.quantity) {
            showNotification('Số lượng mua vượt quá số lượng tồn kho!');
            return;
        }
        existingItem.quantity += 1;
    } else {
        userCart.push({
            ...product,
            quantity: 1
        });
    }
    
    userCarts[currentUser.email] = userCart;
    localStorage.setItem('userCarts', JSON.stringify(userCarts));
    localStorage.setItem('cart', JSON.stringify(userCart));
    updateCartCount();
    
    showNotification(`Đã thêm "${product.name}" vào giỏ hàng!`);
}

// Yêu cầu đăng nhập
function requireLogin() {
    showNotification('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
    setTimeout(() => {
        window.location.href = 'login.html?redirect=category.html?type=' + window.currentCategory;
    }, 1500);
}

// Cập nhật số giỏ hàng
function updateCartCount() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let cart = [];
    
    if (currentUser) {
        const userCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
        cart = userCarts[currentUser.email] || [];
    }
    
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Cập nhật trạng thái người dùng
function updateUserStatus() {
    const userStatus = document.getElementById('user-status');
    const adminBtn = document.getElementById('admin-btn');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!userStatus) return;
    
    if (currentUser) {
        // Người dùng đã đăng nhập
        let userName = currentUser.name;
        let userClass = '';
        
        // Nếu là admin, hiển thị "Admin"
        if (currentUser.isAdmin) {
            userName = 'Admin';
            userClass = 'admin';
        }
        
        userStatus.innerHTML = `
            <div class="user-profile">
                <span class="user-name ${userClass}">${userName}</span>
                <button class="btn-logout" id="logout-btn">Đăng xuất</button>
            </div>
        `;
        
        // Hiển thị nút admin nếu là admin
        if (adminBtn && currentUser.isAdmin) {
            adminBtn.classList.remove('hidden');
        } else if (adminBtn) {
            adminBtn.classList.add('hidden');
        }
        
        // Thêm sự kiện logout
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                logoutUser();
            });
        }
    } else {
        // Người dùng chưa đăng nhập
        userStatus.innerHTML = `
            <a href="login.html" class="btn-login">Đăng nhập</a>
            <a href="login.html?register=true" class="btn-register">Đăng ký</a>
        `;
        
        if (adminBtn) {
            adminBtn.classList.add('hidden');
        }
    }
}

// Đăng xuất
function logoutUser() {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('cart');
        updateUserStatus();
        updateCartCount();
        showNotification('Đã đăng xuất thành công!');
    }
}

// Xử lý menu mobile
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
}

// Định dạng giá tiền
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(price);
}

// Hiển thị thông báo
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    
    notificationMessage.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}
