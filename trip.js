document.addEventListener('DOMContentLoaded', function() {
    // Sample trip data - In a real app, this would come from an API
    const tripsData = [
        {
            id: 1,
            from: 'İstanbul',
            to: 'Ankara',
            date: '2023-12-15',
            departure: '08:00',
            arrival: '12:30',
            duration: '4 saat 30 dakika',
            price: 250,
            busType: 'luxury',
            timeOfDay: 'morning',
            seatsAvailable: 12,
            amenities: ['wifi', 'tv', 'refreshment', 'power-outlet']
        },
        {
            id: 2,
            from: 'İstanbul',
            to: 'Ankara',
            date: '2023-12-15',
            departure: '12:00',
            arrival: '16:30',
            duration: '4 saat 30 dakika',
            price: 220,
            busType: 'standard',
            timeOfDay: 'afternoon',
            seatsAvailable: 24,
            amenities: ['wifi', 'power-outlet']
        },
        {
            id: 3,
            from: 'İstanbul',
            to: 'Ankara',
            date: '2023-12-15',
            departure: '18:00',
            arrival: '22:30',
            duration: '4 saat 30 dakika',
            price: 280,
            busType: 'vip',
            timeOfDay: 'evening',
            seatsAvailable: 8,
            amenities: ['wifi', 'tv', 'refreshment', 'power-outlet', 'massage-seat']
        },
        {
            id: 4,
            from: 'İstanbul',
            to: 'Ankara',
            date: '2023-12-15',
            departure: '23:00',
            arrival: '03:30',
            duration: '4 saat 30 dakika',
            price: 200,
            busType: 'standard',
            timeOfDay: 'night',
            seatsAvailable: 18,
            amenities: ['wifi']
        },
        {
            id: 5,
            from: 'İstanbul',
            to: 'İzmir',
            date: '2023-12-15',
            departure: '09:00',
            arrival: '15:30',
            duration: '6 saat 30 dakika',
            price: 180,
            busType: 'standard',
            timeOfDay: 'morning',
            seatsAvailable: 22,
            amenities: ['wifi', 'power-outlet']
        },
        {
            id: 6,
            from: 'İstanbul',
            to: 'İzmir',
            date: '2023-12-15',
            departure: '14:00',
            arrival: '20:30',
            duration: '6 saat 30 dakika',
            price: 210,
            busType: 'luxury',
            timeOfDay: 'afternoon',
            seatsAvailable: 15,
            amenities: ['wifi', 'tv', 'refreshment', 'power-outlet']
        },
        {
            id: 7,
            from: 'Ankara',
            to: 'İzmir',
            date: '2023-12-15',
            departure: '07:30',
            arrival: '13:00',
            duration: '5 saat 30 dakika',
            price: 230,
            busType: 'luxury',
            timeOfDay: 'morning',
            seatsAvailable: 10,
            amenities: ['wifi', 'tv', 'refreshment', 'power-outlet']
        },
        {
            id: 8,
            from: 'Ankara',
            to: 'İzmir',
            date: '2023-12-15',
            departure: '16:00',
            arrival: '21:30',
            duration: '5 saat 30 dakika',
            price: 190,
            busType: 'standard',
            timeOfDay: 'afternoon',
            seatsAvailable: 20,
            amenities: ['wifi', 'power-outlet']
        }
    ];

    // DOM Elements
    const tripsGrid = document.querySelector('.trips-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    const sortBy = document.getElementById('sort-by');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageNumbers = document.getElementById('page-numbers');

    // Current state
    let currentFilter = 'all';
    let currentBusType = 'all';
    let currentMaxPrice = 500;
    let currentSort = 'price-asc';
    let currentPage = 1;
    const tripsPerPage = 4;

    // Initialize
    updatePriceValue();
    renderTrips();
    setupEventListeners();

    // Functions
    function renderTrips() {
        // Filter trips
        let filteredTrips = tripsData.filter(trip => {
            const matchesFilter = currentFilter === 'all' || trip.timeOfDay === currentFilter;
            const matchesBusType = currentBusType === 'all' || trip.busType === currentBusType;
            const matchesPrice = trip.price <= currentMaxPrice;
            
            // Get URL parameters
            const urlParams = new URLSearchParams(window.location.search);
            const fromParam = urlParams.get('from');
            const toParam = urlParams.get('to');
            const dateParam = urlParams.get('date');
            
            // If URL parameters exist, filter by them
            const matchesFrom = !fromParam || trip.from.toLowerCase() === fromParam.toLowerCase();
            const matchesTo = !toParam || trip.to.toLowerCase() === toParam.toLowerCase();
            const matchesDate = !dateParam || trip.date === dateParam;
            
            return matchesFilter && matchesBusType && matchesPrice && matchesFrom && matchesTo && matchesDate;
        });

        // Sort trips
        filteredTrips = sortTrips(filteredTrips, currentSort);

        // Pagination
        const totalPages = Math.ceil(filteredTrips.length / tripsPerPage);
        const startIndex = (currentPage - 1) * tripsPerPage;
        const paginatedTrips = filteredTrips.slice(startIndex, startIndex + tripsPerPage);

        // Clear existing trips
        tripsGrid.innerHTML = '';

        // Render trips
        if (paginatedTrips.length === 0) {
            tripsGrid.innerHTML = '<div class="no-results">Seçtiğiniz kriterlere uygun sefer bulunamadı.</div>';
        } else {
            paginatedTrips.forEach(trip => {
                const tripElement = createTripElement(trip);
                tripsGrid.appendChild(tripElement);
            });
        }

        // Update pagination
        updatePagination(filteredTrips.length, totalPages);
    }

    function createTripElement(trip) {
        const tripElement = document.createElement('div');
        tripElement.className = `trip-card ${trip.busType}`;
        
        // Amenities icons
        const amenitiesIcons = {
            'wifi': '<i class="fas fa-wifi" title="Ücretsiz WiFi"></i>',
            'tv': '<i class="fas fa-tv" title="Kişisel Ekran"></i>',
            'refreshment': '<i class="fas fa-coffee" title="İkram Hizmeti"></i>',
            'power-outlet': '<i class="fas fa-plug" title="Prizer"></i>',
            'massage-seat': '<i class="fas fa-spa" title="Masaj Koltuğu"></i>'
        };
        
        const amenitiesHTML = trip.amenities.map(amenity => amenitiesIcons[amenity]).join('');
        
        tripElement.innerHTML = `
            <div class="trip-header">
                <h3>${trip.from} → ${trip.to}</h3>
                <span class="price">₺${trip.price}</span>
            </div>
            <div class="trip-details">
                <div class="time-details">
                    <div class="departure">
                        <span>Kalkış</span>
                        <strong>${trip.departure}</strong>
                    </div>
                    <div class="duration">
                        <span>${trip.duration}</span>
                        <div class="line"></div>
                    </div>
                    <div class="arrival">
                        <span>Varış</span>
                        <strong>${trip.arrival}</strong>
                    </div>
                </div>
                <div class="bus-type ${trip.busType}">
                    <span>${getBusTypeName(trip.busType)}</span>
                </div>
                <div class="amenities">
                    ${amenitiesHTML}
                </div>
                <div class="seats-available">
                    <i class="fas fa-chair"></i>
                    <span>${trip.seatsAvailable} koltuk boş</span>
                </div>
            </div>
            <div class="trip-footer">
                <button class="btn btn-outline view-details" data-id="${trip.id}">Detaylar</button>
                <button class="btn btn-primary book-now" data-id="${trip.id}">Bilet Al</button>
            </div>
        `;
        
        return tripElement;
    }

    function getBusTypeName(type) {
        const types = {
            'standard': 'Standart',
            'luxury': 'Lüks',
            'vip': 'VIP'
        };
        return types[type] || type;
    }

    function sortTrips(trips, sortBy) {
        switch(sortBy) {
            case 'price-asc':
                return [...trips].sort((a, b) => a.price - b.price);
            case 'price-desc':
                return [...trips].sort((a, b) => b.price - a.price);
            case 'time-asc':
                return [...trips].sort((a, b) => a.departure.localeCompare(b.departure));
            case 'time-desc':
                return [...trips].sort((a, b) => b.departure.localeCompare(a.departure));
            case 'duration-asc':
                return [...trips].sort((a, b) => {
                    const aDuration = parseInt(a.duration);
                    const bDuration = parseInt(b.duration);
                    return aDuration - bDuration;
                });
            case 'duration-desc':
                return [...trips].sort((a, b) => {
                    const aDuration = parseInt(a.duration);
                    const bDuration = parseInt(b.duration);
                    return bDuration - aDuration;
                });
            default:
                return trips;
        }
    }

    function updatePriceValue() {
        priceValue.textContent = `₺${currentMaxPrice} ve altı`;
    }

    function updatePagination(totalTrips, totalPages) {
        pageNumbers.innerHTML = '';
        
        if (totalPages <= 1) {
            prevPageBtn.disabled = true;
            nextPageBtn.disabled = true;
            return;
        }
        
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
        
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `btn ${i === currentPage ? 'btn-primary' : 'btn-outline'}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                renderTrips();
            });
            pageNumbers.appendChild(pageBtn);
        }
    }

    function setupEventListeners() {
        // Filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filterType = this.dataset.filter;
                
                // Time filters
                if (['all', 'morning', 'afternoon', 'evening', 'night'].includes(filterType)) {
                    currentFilter = filterType;
                    document.querySelectorAll('.filter-btn[data-filter^="time"]').forEach(btn => btn.classList.remove('active'));
                }
                
                // Bus type filters
                if (['standard', 'luxury', 'vip'].includes(filterType)) {
                    currentBusType = filterType;
                    document.querySelectorAll('.filter-btn[data-filter^="bus"]').forEach(btn => btn.classList.remove('active'));
                }
                
                this.classList.add('active');
                currentPage = 1;
                renderTrips();
            });
        });

        // Price range
        priceRange.addEventListener('input', function() {
            currentMaxPrice = parseInt(this.value);
            updatePriceValue();
            currentPage = 1;
            renderTrips();
        });

        // Sort by
        sortBy.addEventListener('change', function() {
            currentSort = this.value;
            renderTrips();
        });

        // Pagination
        prevPageBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                renderTrips();
            }
        });

        nextPageBtn.addEventListener('click', function() {
            const totalTrips = tripsData.length;
            const totalPages = Math.ceil(totalTrips / tripsPerPage);
            
            if (currentPage < totalPages) {
                currentPage++;
                renderTrips();
            }
        });

        // Book now buttons (event delegation)
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('book-now')) {
                const tripId = parseInt(e.target.dataset.id);
                const trip = tripsData.find(t => t.id === tripId);
                
                if (trip) {
                    // In a real app, you would redirect to booking page with trip ID
                    window.location.href = `booking.html?tripId=${tripId}`;
                }
            }
            
            if (e.target.classList.contains('view-details')) {
                const tripId = parseInt(e.target.dataset.id);
                const trip = tripsData.find(t => t.id === tripId);
                
                if (trip) {
                    alert(`Sefer Detayları:\n\nKalkış: ${trip.from}\nVarış: ${trip.to}\nTarih: ${trip.date}\nKalkış Saati: ${trip.departure}\nVarış Saati: ${trip.arrival}\nSüre: ${trip.duration}\nOtobüs Tipi: ${getBusTypeName(trip.busType)}\nFiyat: ₺${trip.price}\nKalan Koltuk: ${trip.seatsAvailable}`);
                }
            }
        });
    }
});