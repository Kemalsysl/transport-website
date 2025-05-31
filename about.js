// Rakam animasyonu
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // 2 saniye
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        const increment = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(increment);
            } else {
                stat.textContent = target;
            }
        };
        
        increment();
    });
}

// Sayfa yüklendiğinde animasyonu başlat
document.addEventListener('DOMContentLoaded', () => {
    // Sadece stats-section görünür olduğunda animasyonu tetikle
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(document.querySelector('.stats-section'));
});