document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra xem có tham số redirect không
    checkRedirect();
    
    // Khởi tạo form đăng nhập/đăng ký
    initAuthForms();
    
    // Xử lý chuyển đổi giữa các form
    setupFormSwitching();
    
    // Xử lý hiển thị/ẩn mật khẩu
    setupPasswordToggle();
    
    // Cập nhật số lượng giỏ hàng
    updateCartCount();
    
    // Kiểm tra nếu URL có tham số register
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('register') === 'true') {
        showRegisterForm();
    }
});

// Kiểm tra redirect
function checkRedirect() {
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get('redirect');
    
    if (redirect) {
        // Lưu trang cần redirect
        localStorage.setItem('redirectAfterLogin', redirect);
    }
}

// Khởi tạo form đăng nhập/đăng ký
function initAuthForms() {
    // Form đăng nhập
    const loginForm = document.getElementById('login-form-element');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            loginUser();
        });
    }
    
    // Form đăng ký
    const registerForm = document.getElementById('register-form-element');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            registerUser();
        });
    }
    
    // Form quên mật khẩu
    const forgotPasswordForm = document.getElementById('forgot-password-form-element');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            forgotPassword();
        });
    }
}

// Đăng nhập người dùng
function loginUser() {
    // Lấy giá trị từ form
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;
    
    // Xóa thông báo lỗi cũ
    clearErrors('login');
    
    // Kiểm tra dữ liệu
    let isValid = true;
    
    if (!email) {
        showError('login-email-error', 'Vui lòng nhập email');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('login-email-error', 'Email không hợp lệ');
        isValid = false;
    }
    
    if (!password) {
        showError('login-password-error', 'Vui lòng nhập mật khẩu');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Lấy danh sách người dùng
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Tìm người dùng
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        showError('login-password-error', 'Email hoặc mật khẩu không chính xác');
        return;
    }
    
    // Đăng nhập thành công
    // Lưu thông tin người dùng hiện tại
    const userToStore = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        address: user.address || '',
        isAdmin: user.isAdmin || false
    };
    
    localStorage.setItem('currentUser', JSON.stringify(userToStore));
    
    // Hiển thị thông báo thành công
    showNotification('Đăng nhập thành công!');
    
    // Chuyển hướng
    redirectAfterLogin();
}

// Đăng ký người dùng
function registerUser() {
    // Lấy giá trị từ form
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const phone = document.getElementById('register-phone').value.trim();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const acceptTerms = document.getElementById('accept-terms').checked;
    
    // Xóa thông báo lỗi cũ
    clearErrors('register');
    
    // Kiểm tra dữ liệu
    let isValid = true;
    
    if (!name) {
        showError('register-name-error', 'Vui lòng nhập họ và tên');
        isValid = false;
    }
    
    if (!email) {
        showError('register-email-error', 'Vui lòng nhập email');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('register-email-error', 'Email không hợp lệ');
        isValid = false;
    }
    
    if (!phone) {
        showError('register-phone-error', 'Vui lòng nhập số điện thoại');
        isValid = false;
    } else if (!validatePhone(phone)) {
        showError('register-phone-error', 'Số điện thoại không hợp lệ');
        isValid = false;
    }
    
    if (!password) {
        showError('register-password-error', 'Vui lòng nhập mật khẩu');
        isValid = false;
    } else if (password.length < 6) {
        showError('register-password-error', 'Mật khẩu phải có ít nhất 6 ký tự');
        isValid = false;
    }
    
    if (!confirmPassword) {
        showError('register-confirm-password-error', 'Vui lòng xác nhận mật khẩu');
        isValid = false;
    } else if (password !== confirmPassword) {
        showError('register-confirm-password-error', 'Mật khẩu xác nhận không khớp');
        isValid = false;
    }
    
    if (!acceptTerms) {
        showError('accept-terms-error', 'Vui lòng đồng ý với điều khoản dịch vụ');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Kiểm tra xem email đã tồn tại chưa
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
        showError('register-email-error', 'Email này đã được đăng ký');
        return;
    }
    
    // Tạo ID mới
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 3;
    
    // Tạo người dùng mới
    const newUser = {
        id: newId,
        name: name,
        email: email,
        phone: phone,
        password: password,
        isAdmin: false
    };
    
    // Thêm người dùng vào danh sách
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Đăng nhập ngay sau khi đăng ký
    const userToStore = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        isAdmin: false
    };
    
    localStorage.setItem('currentUser', JSON.stringify(userToStore));
    
    // Hiển thị thông báo thành công
    showNotification('Đăng ký tài khoản thành công!');
    
    // Chuyển hướng
    redirectAfterLogin();
}

// Quên mật khẩu
function forgotPassword() {
    const email = document.getElementById('forgot-email').value.trim();
    
    // Xóa thông báo lỗi cũ
    clearErrors('forgot');
    
    if (!email) {
        showError('forgot-email-error', 'Vui lòng nhập email');
        return;
    }
    
    if (!validateEmail(email)) {
        showError('forgot-email-error', 'Email không hợp lệ');
        return;
    }
    
    // Kiểm tra xem email có tồn tại không
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(u => u.email === email);
    
    if (!existingUser) {
        showError('forgot-email-error', 'Email này chưa được đăng ký');
        return;
    }
    
    // Hiển thị thông báo (trong thực tế sẽ gửi email)
    showNotification('Liên kết đặt lại mật khẩu đã được gửi đến email của bạn!');
    
    // Chuyển về form đăng nhập sau 2 giây
    setTimeout(() => {
        showLoginForm();
    }, 2000);
}

// Chuyển hướng sau khi đăng nhập
function redirectAfterLogin() {
    // Kiểm tra xem có trang cần redirect không
    const redirectPage = localStorage.getItem('redirectAfterLogin');
    
    if (redirectPage) {
        // Xóa thông tin redirect
        localStorage.removeItem('redirectAfterLogin');
        
        // Chuyển hướng đến trang đó
        setTimeout(() => {
            window.location.href = `${redirectPage}.html`;
        }, 1000);
    } else {
        // Mặc định chuyển về trang chủ
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

// Thiết lập chuyển đổi giữa các form
function setupFormSwitching() {
    // Đăng nhập -> Đăng ký
    const showRegisterLink = document.getElementById('show-register-link');
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', function(e) {
            e.preventDefault();
            showRegisterForm();
        });
    }
    
    // Đăng ký -> Đăng nhập
    const showLoginLink = document.getElementById('show-login-link');
    if (showLoginLink) {
        showLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            showLoginForm();
        });
    }
    
    // Quên mật khẩu -> Đăng nhập
    const showLoginFromForgotLink = document.getElementById('show-login-from-forgot-link');
    if (showLoginFromForgotLink) {
        showLoginFromForgotLink.addEventListener('click', function(e) {
            e.preventDefault();
            showLoginForm();
        });
    }
    
    // Đăng nhập -> Quên mật khẩu
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            showForgotPasswordForm();
        });
    }
}

// Hiển thị form đăng nhập
function showLoginForm() {
    document.getElementById('login-form').classList.add('active');
    document.getElementById('register-form').classList.remove('active');
    document.getElementById('forgot-password-form').classList.remove('active');
    
    // Xóa lỗi
    clearErrors('login');
    clearErrors('register');
    clearErrors('forgot');
    
    // Cập nhật URL
    updateURL('login');
}

// Hiển thị form đăng ký
function showRegisterForm() {
    document.getElementById('register-form').classList.add('active');
    document.getElementById('login-form').classList.remove('active');
    document.getElementById('forgot-password-form').classList.remove('active');
    
    // Xóa lỗi
    clearErrors('login');
    clearErrors('register');
    clearErrors('forgot');
    
    // Cập nhật URL
    updateURL('register');
}

// Hiển thị form quên mật khẩu
function showForgotPasswordForm() {
    document.getElementById('forgot-password-form').classList.add('active');
    document.getElementById('login-form').classList.remove('active');
    document.getElementById('register-form').classList.remove('active');
    
    // Xóa lỗi
    clearErrors('login');
    clearErrors('register');
    clearErrors('forgot');
    
    // Cập nhật URL
    updateURL('login');
}

// Cập nhật URL
function updateURL(formType) {
    const url = new URL(window.location);
    
    if (formType === 'register') {
        url.searchParams.set('register', 'true');
    } else {
        url.searchParams.delete('register');
    }
    
    window.history.replaceState({}, '', url);
}

// Thiết lập hiển thị/ẩn mật khẩu
function setupPasswordToggle() {
    // Đăng nhập
    const toggleLoginPassword = document.getElementById('toggle-login-password');
    const loginPasswordInput = document.getElementById('login-password');
    
    if (toggleLoginPassword && loginPasswordInput) {
        toggleLoginPassword.addEventListener('click', function() {
            const type = loginPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            loginPasswordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }
    
    // Đăng ký - Mật khẩu
    const toggleRegisterPassword = document.getElementById('toggle-register-password');
    const registerPasswordInput = document.getElementById('register-password');
    
    if (toggleRegisterPassword && registerPasswordInput) {
        toggleRegisterPassword.addEventListener('click', function() {
            const type = registerPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            registerPasswordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }
    
    // Đăng ký - Xác nhận mật khẩu
    const toggleRegisterConfirmPassword = document.getElementById('toggle-register-confirm-password');
    const registerConfirmPasswordInput = document.getElementById('register-confirm-password');
    
    if (toggleRegisterConfirmPassword && registerConfirmPasswordInput) {
        toggleRegisterConfirmPassword.addEventListener('click', function() {
            const type = registerConfirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            registerConfirmPasswordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }
}

// Hiển thị lỗi
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
    }
}

// Xóa tất cả lỗi
function clearErrors(formType) {
    if (formType === 'login') {
        document.getElementById('login-email-error').textContent = '';
        document.getElementById('login-password-error').textContent = '';
    } else if (formType === 'register') {
        document.getElementById('register-name-error').textContent = '';
        document.getElementById('register-email-error').textContent = '';
        document.getElementById('register-phone-error').textContent = '';
        document.getElementById('register-password-error').textContent = '';
        document.getElementById('register-confirm-password-error').textContent = '';
        document.getElementById('accept-terms-error').textContent = '';
    } else if (formType === 'forgot') {
        document.getElementById('forgot-email-error').textContent = '';
    }
}

// Kiểm tra email hợp lệ
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Kiểm tra số điện thoại hợp lệ
function validatePhone(phone) {
    const re = /^(0|\+84)(\d{9,10})$/;
    return re.test(phone);
}