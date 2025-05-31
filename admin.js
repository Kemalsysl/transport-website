document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const adminSidebar = document.querySelector('.admin-sidebar');
    const profileDropdown = document.querySelector('.profile-dropdown');
    const notificationBtn = document.querySelector('.notification-btn');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    const adminLoginForm = document.getElementById('admin-login-form');
    
    // Initialize
    setupEventListeners();
    
    // Functions
    function setupEventListeners() {
        // Sidebar toggle for mobile
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', function() {
                adminSidebar.classList.toggle('active');
            });
        }
        
        // Profile dropdown
        if (profileDropdown) {
            profileDropdown.addEventListener('click', function(e) {
                e.stopPropagation();
                this.querySelector('.dropdown-menu').classList.toggle('show');
            });
        }
        
        // Notification dropdown
        if (notificationBtn) {
            notificationBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                // In a real app, you would show notifications dropdown
                alert('Bildirimler burada gösterilecek');
            });
        }
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', function() {
            const dropdowns = document.querySelectorAll('.dropdown-menu');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        });
        
        // Toggle password visibility
        togglePasswordBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const input = this.closest('.form-group').querySelector('input');
                const isPassword = input.type === 'password';
                
                input.type = isPassword ? 'text' : 'password';
                this.innerHTML = isPassword ? '<i class="far fa-eye-slash"></i>' : '<i class="far fa-eye"></i>';
            });
        });
        
        // Admin login form
        if (adminLoginForm) {
            adminLoginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const username = document.getElementById('admin-username').value;
                const password = document.getElementById('admin-password').value;
                
                // In a real app, you would validate and send to server
                simulateAdminLogin(username, password);
            });
        }
    }
    
    function simulateAdminLogin(username, password) {
        // Show loading state
        const submitBtn = adminLoginForm.querySelector('[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Giriş Yapılıyor...';
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // In a real app, you would check the response and handle errors
            window.location.href = 'admin/index.html';
        }, 1500);
    }
    
    // Initialize charts
    function initCharts() {
        // Booking Chart
        const bookingCtx = document.getElementById('bookingsChart');
        if (bookingCtx) {
            new Chart(bookingCtx, {
                type: 'line',
                data: {
                    labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
                    datasets: [{
                        label: 'Rezervasyon Sayısı',
                        data: [1250, 1900, 1700, 2100, 2400, 3200],
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }
    
    // Initialize charts when page loads
    initCharts();
});
// User Management Functions
function initUserManagement() {
    // User table row click event
    const userRows = document.querySelectorAll('.admin-table tbody tr');
    userRows.forEach(row => {
        row.addEventListener('click', function(e) {
            // Don't trigger if clicked on a button or checkbox
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') {
                return;
            }
            
            // In a real app, you would redirect to user detail page
            console.log('User ID:', this.querySelector('td:nth-child(2) span').textContent);
        });
    });
    
    // Block user button
    const blockButtons = document.querySelectorAll('.btn-icon[title="Engelle"]');
    blockButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const userId = this.closest('tr').querySelector('td:nth-child(2) span').textContent;
            if (confirm(`${userId} numaralı kullanıcıyı engellemek istediğinize emin misiniz?`)) {
                // In a real app, you would make an API call
                this.closest('tr').querySelector('.badge').className = 'badge bg-danger';
                this.closest('tr').querySelector('.badge').textContent = 'Engelli';
                this.title = 'Aktif Et';
                this.innerHTML = '<i class="fas fa-check"></i>';
            }
        });
    });
    
    // Activate user button
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-icon[title="Aktif Et"]')) {
            e.stopPropagation();
            const btn = e.target.closest('.btn-icon');
            const userId = btn.closest('tr').querySelector('td:nth-child(2) span').textContent;
            if (confirm(`${userId} numaralı kullanıcıyı aktif etmek istediğinize emin misiniz?`)) {
                // In a real app, you would make an API call
                btn.closest('tr').querySelector('.badge').className = 'badge bg-success';
                btn.closest('tr').querySelector('.badge').textContent = 'Aktif';
                btn.title = 'Engelle';
                btn.innerHTML = '<i class="fas fa-ban"></i>';
            }
        }
    });
}

// Report Functions
function initReports() {
    // Date range picker
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(today.getMonth() - 1);
    
    document.getElementById('start-date').valueAsDate = lastMonth;
    document.getElementById('end-date').valueAsDate = today;
    
    // Export buttons
    document.querySelectorAll('[id$="-report"] .btn-primary').forEach(btn => {
        btn.addEventListener('click', function() {
            const reportType = this.closest('.admin-card').id.replace('-report', '');
            alert(`${reportType} raporu indirilecek`);
        });
    });
}

// Initialize modules when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Existing code...
    
    // Initialize user management if on users page
    if (document.querySelector('.admin-table tbody tr')) {
        initUserManagement();
    }
    
    // Initialize reports if on reports page
    if (document.getElementById('salesChart')) {
        initReports();
    }
});