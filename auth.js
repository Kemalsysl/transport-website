document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    const passwordStrength = document.querySelector('.password-strength');
    const passwordStrengthBars = document.querySelectorAll('.strength-bar');
    const passwordStrengthText = document.querySelector('.strength-text');
    
    // Initialize
    setupEventListeners();
    
    // Functions
    function setupEventListeners() {
        // Toggle password visibility
        togglePasswordBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const input = this.previousElementSibling;
                const isPassword = input.type === 'password';
                
                input.type = isPassword ? 'text' : 'password';
                this.innerHTML = isPassword ? '<i class="far fa-eye-slash"></i>' : '<i class="far fa-eye"></i>';
            });
        });
        
        // Password strength indicator
        if (registerForm) {
            const passwordInput = registerForm.querySelector('#register-password');
            
            passwordInput.addEventListener('input', function() {
                const password = this.value;
                const strength = calculatePasswordStrength(password);
                
                updatePasswordStrengthIndicator(strength);
            });
        }
        
        // Login form submission
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;
                
                // In a real app, you would validate and send to server
                simulateLogin(email, password);
            });
        }
        
        // Register form submission
        if (registerForm) {
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const firstName = document.getElementById('register-firstname').value;
                const lastName = document.getElementById('register-lastname').value;
                const email = document.getElementById('register-email').value;
                const phone = document.getElementById('register-phone').value;
                const password = document.getElementById('register-password').value;
                const confirmPassword = document.getElementById('register-confirm-password').value;
                
                // Validate passwords match
                if (password !== confirmPassword) {
                    alert('Şifreler eşleşmiyor!');
                    return;
                }
                
                // In a real app, you would validate and send to server
                simulateRegistration(firstName, lastName, email, phone, password);
            });
        }
    }
    
    function calculatePasswordStrength(password) {
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        
        // Character variety
        if (/[A-Z]/.test(password)) strength += 1; // Uppercase
        if (/[a-z]/.test(password)) strength += 1; // Lowercase
        if (/[0-9]/.test(password)) strength += 1; // Numbers
        if (/[^A-Za-z0-9]/.test(password)) strength += 1; // Special chars
        
        // Cap at 5 for our 3-bar display
        return Math.min(strength, 5);
    }
    
    function updatePasswordStrengthIndicator(strength) {
        // Reset all bars
        passwordStrengthBars.forEach(bar => {
            bar.style.backgroundColor = '#eee';
        });
        
        // Update bars based on strength
        if (strength <= 2) { // Weak
            passwordStrengthBars[0].style.backgroundColor = '#dc3545';
            passwordStrengthText.textContent = 'Şifre gücü: zayıf';
            passwordStrengthText.style.color = '#dc3545';
        } else if (strength <= 4) { // Medium
            passwordStrengthBars[0].style.backgroundColor = '#fd7e14';
            passwordStrengthBars[1].style.backgroundColor = '#fd7e14';
            passwordStrengthText.textContent = 'Şifre gücü: orta';
            passwordStrengthText.style.color = '#fd7e14';
        } else { // Strong
            passwordStrengthBars[0].style.backgroundColor = '#28a745';
            passwordStrengthBars[1].style.backgroundColor = '#28a745';
            passwordStrengthBars[2].style.backgroundColor = '#28a745';
            passwordStrengthText.textContent = 'Şifre gücü: güçlü';
            passwordStrengthText.style.color = '#28a745';
        }
    }
    
    function simulateLogin(email, password) {
        // Show loading state
        const submitBtn = loginForm.querySelector('[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Giriş Yapılıyor...';
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // In a real app, you would check the response and handle errors
            alert('Giriş başarılı! Yönlendiriliyorsunuz...');
            window.location.href = 'biletlerim.html';
        }, 1500);
    }
    
    function simulateRegistration(firstName, lastName, email, phone, password) {
        // Show loading state
        const submitBtn = registerForm.querySelector('[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Kayıt Olunuyor...';
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // In a real app, you would check the response and handle errors
            alert('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...');
            window.location.href = 'giris.html';
        }, 1500);
    }
    
    // Phone number formatting
    const phoneInput = document.getElementById('register-phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            
            // Format as 5__ ___ __ __
            if (value.length > 0) {
                value = value.substring(0, 10);
                value = value.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1$2 $3 $4 $5');
            }
            
            this.value = value;
        });
    }
});
document.getElementById("register-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const firstname = document.getElementById("register-firstname").value;
    const lastname = document.getElementById("register-lastname").value;
    const email = document.getElementById("register-email").value;
    const phone = document.getElementById("register-phone").value;
    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById("register-confirm-password").value;
    const acceptTerms = document.getElementById("accept-terms").checked;
    const acceptPromotions = document.getElementById("accept-promotions").checked;

    if (!acceptTerms) {
        alert("Kayıt olmak için kullanım koşullarını kabul etmelisiniz.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Şifreler eşleşmiyor.");
        return;
    }

    const response = await fetch("http://127.0.0.1:5000/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstname,
            lastname,
            email,
            phone,
            password,
            acceptPromotions
        })
    });

    const result = await response.json();
    if (response.ok) {
        alert("Kayıt başarılı!");
        window.location.href = "giris.html";
    } else {
        alert(result.error || "Bir hata oluştu.");
    }
});
document.getElementById("login-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (response.ok) {
        alert("Giriş başarılı! Ana sayfaya yönlendiriliyorsunuz.");
        // Oturum saklama (örnek)
        localStorage.setItem("user", JSON.stringify(result.user));
        window.location.href = "index.html";
    } else {
        alert(result.error || "E-posta veya şifre hatalı.");
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function (e) {
            e.preventDefault();
            localStorage.removeItem("user");
            alert("Oturum kapatıldı.");
            window.location.href = "giris.html";
        });
    }

    // Giriş yapılmışsa kullanıcı bilgisi göster
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        const userInfoContainer = document.getElementById("user-info");
        if (userInfoContainer) {
            userInfoContainer.innerHTML = `<strong>${user.firstname}</strong> olarak giriş yapıldı.`;
        }
        const user = localStorage.getItem("user");
if (!user) {
    window.location.href = "giris.html"; // oturum yoksa girişe yönlendir
}
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function (e) {
            e.preventDefault();
            localStorage.removeItem("user");
            alert("Oturum kapatıldı.");
            window.location.href = "giris.html";
        });
    }

    // Giriş yapılmışsa kullanıcı bilgisi göster
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        const userInfoContainer = document.getElementById("user-info");
        if (userInfoContainer) {
            userInfoContainer.innerHTML = `<strong>${user.firstname}</strong> olarak giriş yapıldı.`;
        }
    }
});

