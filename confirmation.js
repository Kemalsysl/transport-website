document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const printTicketBtn = document.getElementById('print-ticket');
    const viewTicketsBtn = document.getElementById('view-tickets');
    
    // Initialize
    setupEventListeners();
    
    // Functions
    function setupEventListeners() {
        // Print ticket button
        if (printTicketBtn) {
            printTicketBtn.addEventListener('click', function() {
                window.print();
            });
        }
        
        // View tickets button
        if (viewTicketsBtn) {
            viewTicketsBtn.addEventListener('click', function() {
                window.location.href = 'biletlerim.html';
            });
        }
    }
});