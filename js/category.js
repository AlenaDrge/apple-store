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
    
    setupProfileForm();
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
    
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div class="product-details">
            <div class="product-details-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-details-info">
                <h2>${product.name}</h2>
                <div class="product-details-price">${formatPrice(product.price)} VNĐ</div>
                <p class="product-details-description">${product.description}</p>
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
                    ${addToCartButton}
                    <button class="btn-view-details" onclick="document.getElementById('product-modal').style.display='none';">Tiếp tục mua sắm</button>
                </div>
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
        let userName = currentUser.name;
        let userClass = '';
        
        if (currentUser.isAdmin) {
            userName = 'Admin';
            userClass = 'admin';
        }
        
        userStatus.innerHTML = `
            <div class="user-profile">
                <span class="user-name ${userClass}" id="header-user-name">${userName}</span>
                <button class="btn-logout" id="logout-btn">Đăng xuất</button>
            </div>
        `;
        
        if (adminBtn && currentUser.isAdmin) {
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
        
        if (adminBtn) {
            adminBtn.classList.add('hidden');
        }
    }
}

function openProfileModal() {
    const profileModal = document.getElementById('profile-modal');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!profileModal || !currentUser) return;
    
    const nameInput = document.getElementById('profile-name');
    const emailInput = document.getElementById('profile-email');
    const addressInput = document.getElementById('profile-address');
    const passwordInput = document.getElementById('profile-password');
    
    if (!nameInput || !emailInput || !addressInput || !passwordInput) return;
    
    nameInput.value = currentUser.name || '';
    emailInput.value = currentUser.email || '';
    addressInput.value = currentUser.address || '';
    passwordInput.value = '';
    
    profileModal.style.display = 'flex';
}

function setupProfileForm() {
    const profileModal = document.getElementById('profile-modal');
    const profileForm = document.getElementById('profile-form');
    const closeButton = document.querySelector('#profile-modal .close-profile-modal');
    
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

// Đăng xuất
function logoutUser() {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('cart');
        updateUserStatus();
        updateCartCount();
        showNotification('Đã đăng xuất thành công!');

        // Cập nhật đếm đơn hàng và clear UI đơn hàng nếu có
        try {
            if (typeof updateOrdersCount === 'function') updateOrdersCount();
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
        } catch (e) {
            console.error('Error clearing orders UI on logout', e);
        }
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
