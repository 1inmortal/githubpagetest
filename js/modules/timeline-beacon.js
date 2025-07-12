// ============================================================
// TIMELINE BEACON
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (typeof IntersectionObserver !== 'undefined') {
        const timelineObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    if (window.playSound) window.playSound('click', 0.3);
                } else {
                    // Optional: remove active class when out of view
                    // entry.target.classList.remove('active');
                }
            });
        }, {
            root: null,
            threshold: 0.5, // Trigger when 50% of the item is visible
            rootMargin: '0px 0px -100px 0px'
        });

        timelineItems.forEach(item => timelineObserver.observe(item));
    } else {
        // Fallback for no IntersectionObserver support
        timelineItems.forEach(item => {
            item.classList.add('active');
        });
    }
}); 