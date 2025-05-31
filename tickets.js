document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const tabButtons = document.querySelectorAll('.tabs .tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const cancelButtons = document.querySelectorAll('.btn-danger');
    
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
        
        // Cancel ticket buttons
        cancelButtons.forEach(button => {
            button.addEventListener('click', function() {
                const ticketCard = this.closest('.ticket-card');
                const ticketNumber = ticketCard.querySelector('.ticket-number').textContent;
                
                if (confirm(`${ticketNumber} numaralı biletinizi iptal etmek istediğinize emin misiniz?`)) {
                    // In a real app, you would make an API call to cancel the ticket
                    simulateTicketCancellation(ticketCard);
                    // Bileti iptal edilenler sekmesine taşı
                    const cancelledTab = document.getElementById('cancelled');
                    cancelledTab.appendChild(ticketCard);

                }
            });
        });
    }
    
    function simulateTicketCancellation(ticketCard) {
        // Show loading state
        const buttons = ticketCard.querySelectorAll('.ticket-footer button');
        buttons.forEach(btn => {
            btn.disabled = true;
        });
        
        // Change status to cancelling
        const statusDiv = ticketCard.querySelector('.ticket-status');
        statusDiv.className = 'ticket-status warning';
        statusDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> İptal Ediliyor...';
        
        // Simulate API call delay
        setTimeout(() => {
            // Update status to cancelled
            statusDiv.className = 'ticket-status cancelled';
            statusDiv.innerHTML = '<i class="fas fa-times-circle"></i> İptal Edildi';
            
            // Update buttons
            ticketCard.querySelector('.ticket-footer').innerHTML = `
                <button class="btn btn-outline">
                    <i class="fas fa-redo"></i> Yeniden Satın Al
                </button>
                <button class="btn btn-outline">
                    <i class="fas fa-file-invoice-dollar"></i> İade Talebi
                </button>
            `;
            
            // Show success message
            const message = document.createElement('div');
            message.className = 'alert alert-success';
            message.innerHTML = `
                <i class="fas fa-check-circle"></i>
                Bilet başarıyla iptal edildi. İade işlemi 3-5 iş günü içinde gerçekleşecektir.
            `;
            ticketCard.insertBefore(message, ticketCard.firstChild);
            
            // Remove message after 5 seconds
            setTimeout(() => {
                message.remove();
            }, 5000);
        }, 1500);
    }
});
setTimeout(() => {
    // ... mevcut işlemler ...

    // Show success message
    const message = document.createElement('div');
    message.className = 'alert alert-success';
    message.innerHTML = `
        <i class="fas fa-check-circle"></i>
        Bilet başarıyla iptal edildi. İade işlemi 3-5 iş günü içinde gerçekleşecektir.
    `;
    ticketCard.insertBefore(message, ticketCard.firstChild);

    // Remove message after 5 seconds
    setTimeout(() => {
        message.remove();
    }, 5000);

    // 🆕 Bileti "İptal Edilenler" sekmesine taşı
    const cancelledTab = document.getElementById('cancelled');
    cancelledTab.appendChild(ticketCard);
    setTimeout(() => {
    // ... önceki işlemler ...

    // Remove message after 5 seconds
    setTimeout(() => {
        message.remove();
    }, 5000);

    // 🆕 Bileti "İptal Edilenler" sekmesine taşı
    const cancelledTab = document.getElementById('cancelled');
    cancelledTab.appendChild(ticketCard);

    // 🆕 Yeni butonlara işlev ekle
    ticketCard.querySelector('.fa-redo')?.closest('button')?.addEventListener('click', () => {
        alert('Yeniden satın alma özelliği yakında eklenecek.');
    });

    ticketCard.querySelector('.fa-file-invoice-dollar')?.closest('button')?.addEventListener('click', () => {
        alert('İade talebi başarıyla gönderildi.');
    });

}, 1500);


}, 1500);

