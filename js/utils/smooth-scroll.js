// ============================================================
// SMOOTH SCROLL
// ============================================================

window.smoothScrollTo = function(targetSelector) {
    const targetElement = document.querySelector(targetSelector);
    const mainHeader = document.getElementById('mainHeader');
    
    if (targetElement && mainHeader) {
        const headerOffset = mainHeader.offsetHeight + 20;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    } else if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth'});
    }
};

// Apply smooth scroll to all anchor links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (!anchor.closest('.carousel-controls') && !anchor.closest('.modal-content') && anchor.getAttribute('href') !== '#' && anchor.getAttribute('href') !== '#0') {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                if (window.playSound) window.playSound('click');
                window.smoothScrollTo(this.getAttribute('href'));
            });
        }
    });
}); 