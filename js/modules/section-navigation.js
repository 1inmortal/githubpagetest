// ============================================================
// SECTION NAVIGATION
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // Section scroll buttons functionality
    const sectionScrollButtons = document.querySelectorAll('.section-scroll-button');
    
    sectionScrollButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetSection = button.closest('.section-container');
            const nextSection = targetSection.nextElementSibling;
            
            if (nextSection && nextSection.classList.contains('section-container')) {
                const headerOffset = document.getElementById('mainHeader')?.offsetHeight + 20 || 100;
                const elementPosition = nextSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                if (window.playSound) window.playSound('click');
            }
        });
    });
}); 