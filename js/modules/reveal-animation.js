// ============================================================
// REVEAL ANIMATION
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');
    
    if (typeof IntersectionObserver !== 'undefined') {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        if (window.triggerProgressBars) {
                            window.triggerProgressBars(entry.target); // Animate bars inside revealed section
                        }
                    }, 50);
                } else {
                    // Optional: remove visible class to re-trigger on scroll back up
                    // entry.target.classList.remove('visible');
                    // resetProgressBars(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1, // Start reveal when 10% of the element is visible
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for no IntersectionObserver support
        revealElements.forEach(el => {
            el.classList.add('visible');
            if (window.triggerProgressBars) {
                window.triggerProgressBars(el); // Trigger bars on fallback
            }
        });
    }

    // Manually trigger reveals for visible elements on page load
    window.triggerVisibleReveals = function() {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            // Check if the element is currently in the viewport
            if (rect.top < window.innerHeight && rect.bottom >= 0 && rect.left < window.innerWidth && rect.right >= 0) {
                el.classList.add('visible');
                if (window.triggerProgressBars) {
                    window.triggerProgressBars(el); // Also trigger bars for initially visible sections
                }
            }
        });
    };
}); 