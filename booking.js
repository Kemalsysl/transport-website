document.addEventListener('DOMContentLoaded', function() {
    // Sample seat data - In a real app, this would come from an API based on the selected trip
    const seatData = {
        totalSeats: 36,
        bookedSeats: [4, 5, 12, 13, 21, 22, 30, 31],
        femaleSeats: [7, 8, 16, 17, 25, 26, 34, 35],
        maleSeats: [2, 3, 10, 11, 19, 20, 28, 29],
        selectedSeats: []
    };

    // DOM Elements
    const busSeats = document.getElementById('bus-seats');
    const passengerForm = document.getElementById('passenger-form');
    const backToTripsBtn = document.getElementById('back-to-trips');
    const steps = document.querySelectorAll('.booking-steps .step');

    // Initialize
    renderBusSeats();
    setupEventListeners();

    // Functions
    function renderBusSeats() {
        busSeats.innerHTML = '';
        
        // Create seats in 9 rows (4 seats per row)
        for (let row = 1; row <= 9; row++) {
            const rowElement = document.createElement('div');
            rowElement.className = 'seat-row';
            
            // Create 4 seats for each row
            for (let seatNum = 1; seatNum <= 4; seatNum++) {
                const seatId = (row - 1) * 4 + seatNum;
                const seatElement = document.createElement('div');
                seatElement.className = 'seat';
                seatElement.dataset.seatId = seatId;
                
                // Determine seat status
                if (seatData.bookedSeats.includes(seatId)) {
                    seatElement.classList.add('booked');
                } else if (seatData.femaleSeats.includes(seatId)) {
                    seatElement.classList.add('female');
                } else if (seatData.maleSeats.includes(seatId)) {
                    seatElement.classList.add('male');
                } else {
                    seatElement.classList.add('available');
                }
                
                // Add aisle class for seats 2 and 3 in each row
                if (seatNum === 2 || seatNum === 3) {
                    seatElement.classList.add('aisle');
                }
                
                seatElement.innerHTML = `<span>${seatId}</span>`;
                rowElement.appendChild(seatElement);
            }
            
            busSeats.appendChild(rowElement);
        }
    }

    function setupEventListeners() {
        // Seat selection
        busSeats.addEventListener('click', function(e) {
            const seat = e.target.closest('.seat');
            if (!seat) return;
            
            const seatId = parseInt(seat.dataset.seatId);
            
            // Don't allow selection of booked seats
            if (seat.classList.contains('booked')) {
                return;
            }
            
            // Toggle seat selection
            if (seat.classList.contains('selected')) {
                seat.classList.remove('selected');
                seatData.selectedSeats = seatData.selectedSeats.filter(id => id !== seatId);
            } else {
                // Check if max seats selected (for this demo, max 5 seats)
                if (seatData.selectedSeats.length >= 5) {
                    alert('En fazla 5 koltuk seçebilirsiniz.');
                    return;
                }
                
                seat.classList.add('selected');
                seatData.selectedSeats.push(seatId);
            }
            
            // Update UI based on selected seats
            updateSelectionSummary();
        });

        // Back to trips button
        backToTripsBtn.addEventListener('click', function() {
            if (confirm('Seçtiğiniz koltuklar kaybolacak. Seferler sayfasına dönmek istediğinize emin misiniz?')) {
                window.location.href = 'seferler.html';
            }
        });

        // Form submission
        passengerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (seatData.selectedSeats.length === 0) {
                alert('Lütfen en az bir koltuk seçiniz.');
                return;
            }
            
            // In a real app, you would validate all form fields here
            
            // Move to next step (payment)
            setActiveStep(2);
            
            // Scroll to top
            window.scrollTo(0, 0);
            
            // In a real app, you would save the booking data and redirect to payment page
            console.log('Booking data:', {
                seats: seatData.selectedSeats,
                passenger: {
                    name: document.getElementById('passenger-name').value,
                    tc: document.getElementById('passenger-tc').value,
                    phone: document.getElementById('passenger-phone').value,
                    email: document.getElementById('passenger-email').value,
                    gender: document.getElementById('passenger-gender').value,
                    birthdate: document.getElementById('passenger-birthdate').value,
                    requests: document.getElementById('special-requests').value
                }
            });
        });
    }

    function updateSelectionSummary() {
        // In a real app, you would update a summary section with selected seats and total price
        console.log('Selected seats:', seatData.selectedSeats);
    }

    function setActiveStep(stepNumber) {
        steps.forEach((step, index) => {
            if (index < stepNumber) {
                step.classList.add('completed');
                step.classList.add('active');
            } else if (index === stepNumber) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active');
                step.classList.remove('completed');
            }
        });
    }
});