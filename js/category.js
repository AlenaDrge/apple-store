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
    // Kiểm tra xem đã có dữ liệu sản phẩm chưa
    if (!localStorage.getItem('products')) {
        const sampleProducts = [
            {
                id: 1,
                name: 'iPhone 14 Pro Max',
                category: 'iphones',
                price: 29990000,
                quantity: 10,
                description: 'iPhone 14 Pro Max với chip A16 Bionic, màn hình Super Retina XDR 6.7 inch, camera chính 48MP.',
                image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/_/t_m_19.png'
            },
            {
                id: 2,
                name: 'iPhone 17 Pro Max',
                category: 'iphones',
                price: 37769000,
                quantity: 20,
                description: 'iPhone 17 Pro Max với chip A19 Bionic Pro, camera 48MP, thời lượng pin cả ngày.',
                image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-17-pro-max.jpg'
            },
            {
                id: 3,
                name: 'iPhone 15 ',
                category: 'iphones',
                price: 16790000,
                quantity: 30,
                description: 'iPhone 15 với chip A15 Bionic, camera 48MP, thời lượng pin cả ngày.',
                image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-15-128gb-xanh-la.png'
            },
            {
                id: 4,
                name: 'MacBook Air M4',
                category: 'macbooks',
                price: 23990000,
                quantity: 30,
                description: 'MacBook Air M4 13 inch với chip M2 Pro, 16GB RAM, SSD 512GB, màn hình Liquid Retina XDR.',
                image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_15__7_163.png'
            },
            {
                id: 5,
                name: 'MacBook Air M2',
                category: 'macbooks',
                price: 27990000,
                quantity: 15,
                description: 'MacBook Air với chip M2, màn hình Liquid Retina 13.6 inch, pin lên đến 18 giờ.',
                image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665'
            },
            {
                id: 6,
                name: 'MacBook Pro 16',
                category: 'macbooks',
                price: 49990000,
                quantity: 8,
                description: 'MacBook Pro 16 inch với chip M3 Max, màn hình Liquid Retina XDR, GPU 12-core.',
                image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/m/a/macbook-pro-16-m3-max-2024.jpg'
            },
            {
                id: 7,
                name: 'iPad Air',
                category: 'ipads',
                price: 15990000,
                quantity: 30,
                description: 'iPad Air với chip M1, màn hình Liquid Retina 10.9 inch, hỗ trợ Apple Pencil.',
                image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-air-select-wifi-blue-202303?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1677596435000'
            },
            {
                id: 8,
                name: 'iPad Pro 12.9',
                category: 'ipads',
                price: 21990000,
                quantity: 12,
                description: 'iPad Pro 12.9 inch với chip M2, màn hình ProMotion 120Hz, camera LiDAR.',
                image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-pro-12-9inch-select-wifi-spacegray-202210?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1664913471000'
            },
            {
                id: 9,
                name: 'iPad Pro 11',
                category: 'ipads',
                price: 18990000,
                quantity: 18,
                description: 'iPad Pro 11 inch với chip M2, màn hình Liquid Retina, hỗ trợ Magic Keyboard.',
                image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-pro-11-m2-2024.jpg'
            },
            {
                id: 10,
                name: 'AirPods Pro 2',
                category: 'airpods',
                price: 6990000,
                quantity: 2,
                description: 'AirPods Pro 2 với khử tiếng ồn chủ động, âm thanh không gian, pin 6 giờ.',
                image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-pro-2-hero-select-202209?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1660917417891'
            },
            {
                id: 11,
                name: 'AirPods Max',
                category: 'airpods',
                price: 19990000,
                quantity: 8,
                description: 'AirPods Max - Tai nghe over-ear cao cấp với âm thanh Spatial Audio.',
                image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-max-hero-select-202412?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1731000000000'
            },
            {
                id: 12,
                name: 'AirPods 3',
                category: 'airpods',
                price: 4990000,
                quantity: 25,
                description: 'AirPods 3 với Adaptive Audio, pin 6 giờ, sạc nhanh.',
                image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/a/i/airpods-3-white-2.jpg'
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
    const sortPriceAscBtn = document.getElementById('sort-price-asc');
    const sortPriceDescBtn = document.getElementById('sort-price-desc');
    const sortNameBtn = document.getElementById('sort-name');
    
    // Áp dụng bộ lọc giá
    applyBtn.addEventListener('click', function() {
        const minPrice = parseInt(minPriceInput.value) || 0;
        const maxPrice = parseInt(maxPriceInput.value) || Infinity;
        
        window.filteredProducts = window.originalProducts.filter(p => 
            p.price >= minPrice && p.price <= maxPrice
        );
        
        displayProducts(window.filteredProducts);
        showNotification('Đã áp dụng bộ lọc');
    });
    
    // Xóa bộ lọc
    clearBtn.addEventListener('click', function() {
        minPriceInput.value = '';
        maxPriceInput.value = '';
        window.filteredProducts = [...window.originalProducts];
        displayProducts(window.filteredProducts);
        
        // Reset sort buttons
        document.querySelectorAll('.sort-btn').forEach(btn => btn.classList.remove('active'));
        sortDefaultBtn.classList.add('active');
        
        showNotification('Đã xóa bộ lọc');
    });
    
    // Sắp xếp mặc định
    sortDefaultBtn.addEventListener('click', function() {
        updateSortButtons(sortDefaultBtn);
        window.filteredProducts.sort((a, b) => a.id - b.id);
        displayProducts(window.filteredProducts);
    });
    
    // Sắp xếp giá từ thấp đến cao
    sortPriceAscBtn.addEventListener('click', function() {
        updateSortButtons(sortPriceAscBtn);
        window.filteredProducts.sort((a, b) => a.price - b.price);
        displayProducts(window.filteredProducts);
    });
    
    // Sắp xếp giá từ cao đến thấp
    sortPriceDescBtn.addEventListener('click', function() {
        updateSortButtons(sortPriceDescBtn);
        window.filteredProducts.sort((a, b) => b.price - a.price);
        displayProducts(window.filteredProducts);
    });
    
    // Sắp xếp theo tên
    sortNameBtn.addEventListener('click', function() {
        updateSortButtons(sortNameBtn);
        window.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        displayProducts(window.filteredProducts);
    });
}

// Cập nhật nút sort
function updateSortButtons(activeBtn) {
    document.querySelectorAll('.sort-btn').forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

// Mở modal xem chi tiết sản phẩm
function openProductModal(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        console.error('Product not found with ID:', productId);
        return;
    }
    
    console.log('Opening modal for product:', product.name);

    const isLoggedIn = JSON.parse(localStorage.getItem('currentUser')) !== null;
    const addToCartButton = isLoggedIn 
        ? `<button class="btn-primary" onclick="addToCart(${product.id}); document.getElementById('product-modal').style.display='none';">Thêm vào giỏ hàng</button>`
        : `<button class="btn-primary" onclick="showNotification('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!'); setTimeout(() => { window.location.href = 'login.html?redirect=category.html?type=${window.currentCategory}'; }, 1500);">Đăng nhập để mua</button>`;
    
    // Tạo highlight items dựa vào loại sản phẩm
    let highlights = '';
    
    if (product.category === 'iphones') {
        highlights = `
            <div class="product-highlights">
                <div class="highlight-item">
                    <div class="highlight-icon"><i class="fas fa-microchip"></i></div>
                    <div class="highlight-content">
                        <strong>Chip A16 Bionic</strong>
                        <p>Hiệu năng vô cùng mạnh mẽ</p>
                    </div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-icon"><i class="fas fa-camera"></i></div>
                    <div class="highlight-content">
                        <strong>Camera 48MP</strong>
                        <p>Chụp ảnh chất lượng cao</p>
                    </div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-icon"><i class="fas fa-battery-full"></i></div>
                    <div class="highlight-content">
                        <strong>Pin cả ngày</strong>
                        <p>Thời lượng pin lên đến 29 giờ</p>
                    </div>
                </div>
            </div>
        `;
    } else if (product.category === 'macbooks') {
        highlights = `
            <div class="product-highlights">
                <div class="highlight-item">
                    <div class="highlight-icon"><i class="fas fa-wind"></i></div>
                    <div class="highlight-content">
                        <strong>Chip Apple Silicon</strong>
                        <p>Hiệu năng tuyệt vời, tiết kiệm pin</p>
                    </div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-icon"><i class="fas fa-display"></i></div>
                    <div class="highlight-content">
                        <strong>Liquid Retina Display</strong>
                        <p>Màn hình sắc nét, sống động</p>
                    </div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-icon"><i class="fas fa-weight"></i></div>
                    <div class="highlight-content">
                        <strong>Nhẹ & Mỏng</strong>
                        <p>Dễ dàng mang theo mọi nơi</p>
                    </div>
                </div>
            </div>
        `;
    } else if (product.category === 'ipads') {
        highlights = `
            <div class="product-highlights">
                <div class="highlight-item">
                    <div class="highlight-icon"><i class="fas fa-pencil-alt"></i></div>
                    <div class="highlight-content">
                        <strong>Apple Pencil Support</strong>
                        <p>Hoàn hảo cho sáng tạo</p>
                    </div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-icon"><i class="fas fa-zap"></i></div>
                    <div class="highlight-content">
                        <strong>ProMotion 120Hz</strong>
                        <p>Màn hình mượt mà tuyệt vời</p>
                    </div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-icon"><i class="fas fa-gamepad"></i></div>
                    <div class="highlight-content">
                        <strong>Gaming & Media</strong>
                        <p>Trải nghiệm giải trí tuyệt vời</p>
                    </div>
                </div>
            </div>
        `;
    } else if (product.category === 'airpods') {
        highlights = `
            <div class="product-highlights">
                <div class="highlight-item">
                    <div class="highlight-icon"><i class="fas fa-volume-mute"></i></div>
                    <div class="highlight-content">
                        <strong>Noise Cancellation</strong>
                        <p>Khử tiếng ồn chủ động</p>
                    </div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-icon"><i class="fas fa-music"></i></div>
                    <div class="highlight-content">
                        <strong>Spatial Audio</strong>
                        <p>Âm thanh không gian sống động</p>
                    </div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-icon"><i class="fas fa-clock"></i></div>
                    <div class="highlight-content">
                        <strong>Pin lâu</strong>
                        <p>Thời lượng pin lên đến 30 giờ</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    const stockClass = product.quantity > 0 ? 'in-stock' : 'out-of-stock';
    const stockIcon = product.quantity > 0 ? 'fa-check-circle' : 'fa-times-circle';
    const stockText = product.quantity > 0 ? `Còn ${product.quantity} sản phẩm` : 'Hết hàng';
    
    const modalInner = document.getElementById('modal-inner');
    if (!modalInner) {
        console.error('Modal inner element not found!');
        return;
    }
    
    modalInner.innerHTML = `
        <div class="product-details-modal">
            <div class="product-image-large">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-details-info">
                <h2>${product.name}</h2>
                <div class="product-price-large">${formatPrice(product.price)} VNĐ</div>
                <div class="product-stock-label">Tính trạng kho</div>
                <div class="product-stock-large ${stockClass}">
                    <i class="fas ${stockIcon}"></i>
                    <span>${stockText}</span>
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-actions">
                    ${addToCartButton}
                    <button class="btn-secondary" onclick="document.getElementById('product-modal').style.display='none';">Tiếp tục mua sắm</button>
                </div>
            </div>
        </div>
        <div class="product-highlights-hidden" data-highlights="${btoa(highlights)}" style="display: none;"></div>
    `;
    
    const modal = document.getElementById('product-modal');
    if (!modal) {
        console.error('Modal element not found!');
        return;
    }
    
    modal.style.display = 'flex';
}

// Đặt up modal
function setupProductModal() {
    const modal = document.getElementById('product-modal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (!modal || !closeBtn) {
        console.error('Modal or close button not found!');
        return;
    }
    
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
        return;
    }
    
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const userCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
    if (!userCarts[currentUser.email]) {
        userCarts[currentUser.email] = [];
    }
    
    const userCart = userCarts[currentUser.email];
    const existingItem = userCart.find(item => item.id === productId);
    
    if (product.quantity <= 0) {
        showNotification('Sản phẩm này đã hết hàng!');
        return;
    }
    
    if (existingItem) {
        if (existingItem.quantity < product.quantity) {
            existingItem.quantity++;
        } else {
            showNotification('Số lượng mua vượt quá số lượng tồn kho!');
            return;
        }
    } else {
        userCart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('userCarts', JSON.stringify(userCarts));
    showNotification(`Đã thêm "${product.name}" vào giỏ hàng!`);
    updateCartCount();
}

// Yêu cầu đăng nhập
function requireLogin() {
    showNotification('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
    setTimeout(() => {
        window.location.href = 'login.html?redirect=category.html?type=' + window.currentCategory;
    }, 1500);
}

// Cập nhật số lượng giỏ hàng
function updateCartCount() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const cartCountEl = document.getElementById('cart-count');
    
    if (!currentUser) {
        cartCountEl.textContent = '0';
        return;
    }
    
    const userCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
    const userCart = userCarts[currentUser.email] || [];
    const totalItems = userCart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartCountEl.textContent = totalItems;
}

// Cập nhật trạng thái người dùng
function updateUserStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');
    const adminLink = document.getElementById('admin-link');
    
    if (currentUser) {
        loginLink.classList.add('hidden');
        logoutLink.classList.remove('hidden');
        
        if (currentUser.isAdmin) {
            adminLink.classList.remove('hidden');
        }
    } else {
        loginLink.classList.remove('hidden');
        logoutLink.classList.add('hidden');
        adminLink.classList.add('hidden');
    }
}

// Đăng xuất người dùng
function logoutUser() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cart');
    updateCartCount();
    updateUserStatus();
    showNotification('Đã đăng xuất thành công!');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
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

// Toggle user menu
function toggleUserMenu() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
}
