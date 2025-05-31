document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const logoutBtn = document.getElementById('logout-btn');
    const profileForm = document.getElementById('profile-form');
    const addAddressBtn = document.querySelector('.add-address');
    const deleteAddressBtns = document.querySelectorAll('.delete-address');
    
    
    // Initialize
    setupEventListeners();
    
    // Functions
    function setupEventListeners() {
        // Logout button
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                if (confirm('Çıkış yapmak istediğinize emin misiniz?')) {
                    // In a real app, you would clear the session/token
                    window.location.href = 'index.html';
                }
            });
        }
        
        // Profile form submission
        if (profileForm) {
            profileForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Show loading state
                const submitBtn = this.querySelector('[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Kaydediliyor...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    alert('Profil bilgileriniz başarıyla güncellendi!');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1000);
            });
        }
        
        // Add address button
        if (addAddressBtn) {
            addAddressBtn.addEventListener('click', function() {
                // In a real app, you would show a modal/form to add new address
                alert('Yeni adres ekleme formu açılacak');
            });
        }
        
        // Delete address buttons
        deleteAddressBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                if (confirm('Bu adresi silmek istediğinize emin misiniz?')) {
                    // In a real app, you would make an API call to delete
                    const addressCard = this.closest('.address-card');
                    addressCard.remove();
                    
                    // Show success message
                    const message = document.createElement('div');
                    message.className = 'alert alert-success';
                    message.textContent = 'Adres başarıyla silindi.';
                    document.querySelector('.address-cards').prepend(message);
                    
                    // Remove message after 3 seconds
                    setTimeout(() => {
                        message.remove();
                    }, 3000);
                }
            });
        });
    }
    
    // Phone number formatting for profile
    const profilePhoneInput = document.getElementById('profile-phone');
    if (profilePhoneInput) {
        profilePhoneInput.addEventListener('input', function(e) {
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
fetch('/api/profil/guncelle', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        ad: document.getElementById('profile-firstname').value,
        soyad: document.getElementById('profile-lastname').value,
        email: document.getElementById('profile-email').value,
        telefon: document.getElementById('profile-phone').value.replace(/\s/g, ''),
        dogum: document.getElementById('profile-birthdate').value,
        cinsiyet: document.getElementById('profile-gender').value,
        tc: document.getElementById('profile-tc').value
    })
})
.then(res => res.json())
.then(data => {
    alert('Bilgiler güncellendi!');
})
.catch(err => {
    alert('Bir hata oluştu.');
});
