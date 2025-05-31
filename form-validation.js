document.addEventListener('DOMContentLoaded', function() {
    // Common form validation functions
    
    // Validate email format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Validate Turkish phone number
    function validatePhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.length === 10 && cleaned.startsWith('5');
    }
    
    // Validate TCKN (basic check for 11 digits)
    function validateTCKN(tckn) {
        return /^\d{11}$/.test(tckn);
    }
    
    // Setup form validations
    function setupFormValidations() {
        // Email validation
        const emailInputs = document.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value && !validateEmail(this.value)) {
                    this.classList.add('invalid');
                    showValidationError(this, 'Geçerli bir e-posta adresi giriniz.');
                } else {
                    this.classList.remove('invalid');
                    removeValidationError(this);
                }
            });
        });
        
        // Phone validation
        const phoneInputs = document.querySelectorAll('input[type="tel"]');
        phoneInputs.forEach(input => {
            input.addEventListener('blur', function() {
                const cleanedValue = this.value.replace(/\D/g, '');
                if (cleanedValue && !validatePhone(cleanedValue)) {
                    this.classList.add('invalid');
                    showValidationError(this, 'Geçerli bir telefon numarası giriniz (5__ ___ __ __).');
                } else {
                    this.classList.remove('invalid');
                    removeValidationError(this);
                }
            });
        });
        
        // TCKN validation
        const tcknInputs = document.querySelectorAll('input[id$="tckn"], input[id$="tc"]');
        tcknInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value && !validateTCKN(this.value)) {
                    this.classList.add('invalid');
                    showValidationError(this, 'Geçerli bir TC Kimlik No giriniz (11 haneli).');
                } else {
                    this.classList.remove('invalid');
                    removeValidationError(this);
                }
            });
        });
        
        // Password confirmation
        const passwordForms = document.querySelectorAll('form[id$="form"]');
        passwordForms.forEach(form => {
            const passwordInput = form.querySelector('input[type="password"]');
            const confirmInput = form.querySelector('input[id*="confirm"]');
            
            if (passwordInput && confirmInput) {
                confirmInput.addEventListener('blur', function() {
                    if (this.value && this.value !== passwordInput.value) {
                        this.classList.add('invalid');
                        showValidationError(this, 'Şifreler eşleşmiyor.');
                    } else {
                        this.classList.remove('invalid');
                        removeValidationError(this);
                    }
                });
            }
        });
    }
    
    function showValidationError(input, message) {
        // Remove existing error if any
        removeValidationError(input);
        
        // Create error element
        const error = document.createElement('div');
        error.className = 'validation-error';
        error.textContent = message;
        
        // Insert after input
        input.parentNode.insertBefore(error, input.nextSibling);
    }
    
    function removeValidationError(input) {
        const error = input.parentNode.querySelector('.validation-error');
        if (error) {
            error.remove();
        }
    }
    
    // Initialize form validations
    setupFormValidations();
});