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
        if (typeof sampleProducts !== 'undefined' && Array.isArray(sampleProducts)) {
            localStorage.setItem('products', JSON.stringify(sampleProducts));
        } else {
            localStorage.setItem('products', JSON.stringify([]));
        }
    }
    
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
    
    const initialPrice = memoryOptions.length > 0 ? memoryOptions[0].price : product.price;
    
    const memoryOptionsHtml = memoryOptions.length > 0
        ? memoryOptions.map((opt, index) => `
            <button class="variant-option${index === 0 ? ' active' : ''}" data-memory-index="${index}" data-memory-price="${opt.price}">
                ${opt.label}
                <span>${formatPrice(opt.price)} VNĐ</span>
            </button>
        `).join('')
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
    
    const modalBody = document.getElementById('modal-body');
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
    
    document.getElementById('product-modal').style.display = 'flex';
    
    setupCategoryProductDetailInteractions(productId);
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

function setupCategoryProductDetailInteractions(productId) {
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
            const price = parseInt(button.getAttribute('data-memory-price'));
            if (!isNaN(price)) {
                priceElement.textContent = formatPrice(price) + ' VNĐ';
            }
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
            addConfiguredProductToCartFromCategory(productId);
            document.getElementById('product-modal').style.display = 'none';
        });
    }
    
    if (loginToBuyBtn) {
        loginToBuyBtn.addEventListener('click', function() {
            showNotification('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
            setTimeout(() => {
                window.location.href = 'login.html?redirect=category.html?type=' + window.currentCategory;
            }, 1500);
        });
    }
}

function addConfiguredProductToCartFromCategory(productId) {
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
    
    const modal = document.getElementById('product-modal');
    const memoryRow = modal ? modal.querySelector('#memory-options-row') : null;
    const colorRow = modal ? modal.querySelector('#color-options-row') : null;
    
    let selectedMemory = null;
    let selectedPrice = product.price;
    
    if (memoryRow) {
        const activeMemory = memoryRow.querySelector('.variant-option.active');
        if (activeMemory) {
            selectedMemory = activeMemory.textContent.trim();
            const price = parseInt(activeMemory.getAttribute('data-memory-price'));
            if (!isNaN(price)) {
                selectedPrice = price;
            }
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
        order.customer && order.customer.email === user.email && order.status !== 'deleted'
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
