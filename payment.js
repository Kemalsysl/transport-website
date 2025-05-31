document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const backToBookingBtns = document.querySelectorAll('[id^="back-to-booking"]');
    const creditCardForm = document.getElementById('credit-card-form');
    const confirmTransferBtn = document.getElementById('confirm-transfer');
    
    // Initialize
    setupEventListeners();
    
    // Functions
    function setupEventListeners() {
        // Tab switching
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.dataset.tab;
                
                // Update active tab button
                tabButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Update active tab content
                tabContents.forEach(content => content.classList.remove('active'));
                document.getElementById(tabId).classList.add('active');
            });
        });
        
        // Back to booking buttons
        backToBookingBtns.forEach(button => {
            button.addEventListener('click', function() {
                if (confirm('Ödeme bilgileriniz kaybolacak. Geri dönmek istediğinize emin misiniz?')) {
                    window.location.href = 'booking.html';
                }
            });
        });
        
        // Credit card form submission
        if (creditCardForm) {
            creditCardForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // In a real app, you would validate card details here
                // and process the payment with a payment gateway
                
                // Simulate payment processing
                simulatePayment();
            });
        }
        
        // Bank transfer confirmation
        if (confirmTransferBtn) {
            confirmTransferBtn.addEventListener('click', function() {
                if (confirm('Banka havalesi yaptığınızı onaylıyor musunuz?')) {
                    simulatePayment();
                }
            });
        }
    }
    
    function simulatePayment() {
        // Show loading state
        const submitBtn = document.querySelector('#credit-card-form [type="submit"]') || confirmTransferBtn;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> İşleniyor...';
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Redirect to confirmation page
            window.location.href = 'confirmation.html';
        }, 2000);
    }
    
    // Credit card number formatting
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            // Remove all non-digit characters
            let value = this.value.replace(/\D/g, '');
            
            // Add space after every 4 digits
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            
            // Update input value
            this.value = value;
        });
    }
    
    // Expiry date formatting
    const expiryInput = document.getElementById('card-expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            // Remove all non-digit characters
            let value = this.value.replace(/\D/g, '');
            
            // Add slash after 2 digits
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            
            // Update input value
            this.value = value;
        });
    }
});