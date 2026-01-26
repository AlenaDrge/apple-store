// Khởi tạo dữ liệu mẫu nếu chưa có
document.addEventListener('DOMContentLoaded', function() {
    initData();
    loadProducts();
    updateCartCount();
    
    // Xử lý modal sản phẩm
    const modal = document.getElementById('product-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Xử lý menu mobile
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
    
    // Kiểm tra xem có phải là admin đã đăng nhập không
    checkAdminStatus();
});

// Khởi tạo dữ liệu mẫu
function initData() {
    // Kiểm tra xem đã có dữ liệu sản phẩm chưa
    if (!localStorage.getItem('products')) {
        const sampleProducts = [
            {
                id: 1,
                name: 'iPhone 14 Pro Max',
                category: 'iphones',
                price: 29990000,
                description: 'iPhone 14 Pro Max với chip A16 Bionic, màn hình Super Retina XDR 6.7 inch, camera chính 48MP.',
                image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-2-202209?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660753617559'
            },
            {
                id: 2,
                name: 'iPhone 14',
                category: 'iphones',
                price: 21990000,
                description: 'iPhone 14 với chip A15 Bionic, camera kép 12MP, thời lượng pin cả ngày.',
                image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1661027201597'
            },
            {
                id: 3,
                name: 'MacBook Pro 16 inch',
                category: 'macbooks',
                price: 59990000,
                description: 'MacBook Pro 16 inch với chip M2 Pro, 16GB RAM, SSD 512GB, màn hình Liquid Retina XDR.',
                image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-pro-14-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1671304673202'
            },
            {
                id: 4,
                name: 'MacBook Air M2',
                category: 'macbooks',
                price: 27990000,
                description: 'MacBook Air siêu mỏng nhẹ với chip M2, 8GB RAM, SSD 256GB, thời lượng pin lên đến 18 giờ.',
                image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665'
            },
            {
                id: 5,
                name: 'iPad Pro 12.9 inch',
                category: 'ipads',
                price: 32990000,
                description: 'iPad Pro 12.9 inch với chip M2, màn hình Liquid Retina XDR, hỗ trợ Apple Pencil 2.',
                image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-pro-12-11-select-202210?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1664411200794'
            },
            {
                id: 6,
                name: 'iPad Air 5',
                category: 'ipads',
                price: 16990000,
                description: 'iPad Air với chip M1, màn hình Liquid Retina 10.9 inch, hỗ trợ Apple Pencil 2 và Magic Keyboard.',
                image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-air-select-wifi-blue-202203?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1645636337373'
            },
            {
                id: 7,
                name: 'AirPods Pro 2',
                category: 'airpods',
                price: 6990000,
                description: 'AirPods Pro thế hệ 2 với tính năng chống ồi chủ động, âm thanh chất lượng cao và sạc không dây.',
                image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-pro-2-hero-select-202209?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1660917417891'
            },
            {
                id: 8,
                name: 'AirPods 3',
                category: 'airpods',
                price: 4990000,
                description: 'AirPods thế hệ 3 với thiết kế contoured, tính năng Spatial Audio và thời lượng pin lên đến 6 giờ.',
                image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-3rd-gen-hero-select-202203?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1644961773563'
            }
        ];
        
        localStorage.setItem('products', JSON.stringify(sampleProducts));
    }
    
    // Kiểm tra xem đã có dữ liệu giỏ hàng chưa
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    
    // Kiểm tra xem đã có dữ liệu người dùng chưa
    if (!localStorage.getItem('users')) {
        const sampleUsers = [
            {
                id: 1,
                name: 'Admin',
                email: 'admin@example.com',
                password: 'admin123',
                isAdmin: true
            },
            {
                id: 2,
                name: 'Người dùng',
                email: 'user@example.com',
                password: 'user123',
                isAdmin: false
            }
        ];
        
        localStorage.setItem('users', JSON.stringify(sampleUsers));
    }
}

// Tải sản phẩm lên trang chủ
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    // Phân loại sản phẩm theo danh mục
    const iphones = products.filter(product => product.category === 'iphones');
    const macbooks = products.filter(product => product.category === 'macbooks');
    const ipads = products.filter(product => product.category === 'ipads');
    const airpods = products.filter(product => product.category === 'airpods');
    
    // Hiển thị sản phẩm iPhone
    displayProducts(iphones, 'iphone-products');
    
    // Hiển thị sản phẩm MacBook
    displayProducts(macbooks, 'macbook-products');
    
    // Hiển thị sản phẩm iPad
    displayProducts(ipads, 'ipad-products');
    
    // Hiển thị sản phẩm AirPods
    displayProducts(airpods, 'airpods-products');
}

// Hiển thị sản phẩm theo danh mục
function displayProducts(products, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = '<p class="no-products">Chưa có sản phẩm nào trong danh mục này.</p>';
        return;
    }
    
    let html = '';
    
    products.forEach(product => {
        html += `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">${formatPrice(product.price)} VNĐ</div>
                    <div class="product-actions">
                        <button class="btn-add-to-cart" onclick="addToCart(${product.id})">Thêm vào giỏ</button>
                        <button class="btn-view-details" onclick="viewProductDetails(${product.id})">Xem chi tiết</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Định dạng giá tiền
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Thêm sản phẩm vào giỏ hàng
function addToCart(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        alert('Sản phẩm không tồn tại!');
        return;
    }
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Hiển thị thông báo
    showNotification(`Đã thêm "${product.name}" vào giỏ hàng!`);
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
    
    modalBody.innerHTML = `
        <div class="product-details">
            <div class="product-details-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-details-info">
                <h2>${product.name}</h2>
                <div class="product-details-price">${formatPrice(product.price)} VNĐ</div>
                <p class="product-details-description">${product.description}</p>
                <div class="product-details-actions">
                    <button class="btn-primary" onclick="addToCart(${product.id}); document.getElementById('product-modal').style.display='none';">Thêm vào giỏ hàng</button>
                    <button class="btn-view-details" onclick="document.getElementById('product-modal').style.display='none';">Tiếp tục mua sắm</button>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
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

// Kiểm tra trạng thái admin
function checkAdminStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const adminBtn = document.getElementById('admin-btn');
    
    if (adminBtn) {
        if (currentUser && currentUser.isAdmin) {
            adminBtn.style.display = 'flex';
        } else {
            adminBtn.style.display = 'none';
        }
    }
}