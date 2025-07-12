// ============================================================
// TESTIMONIALS INTERFACE
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    const testimonialsContainer = document.querySelector('.testimonials-container');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    
    if (testimonialsContainer && testimonialItems.length > 0) {
        let currentIndex = 0;
        
        function showTestimonial(index) {
            testimonialItems.forEach((item, i) => {
                if (i === index) {
                    item.classList.add('active');
                    item.style.display = 'block';
                } else {
                    item.classList.remove('active');
                    item.style.display = 'none';
                }
            });
        }
        
        function nextTestimonial() {
            currentIndex = (currentIndex + 1) % testimonialItems.length;
            showTestimonial(currentIndex);
            if (window.playSound) window.playSound('click');
        }
        
        function prevTestimonial() {
            currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
            showTestimonial(currentIndex);
            if (window.playSound) window.playSound('click');
        }
        
        // Navigation buttons
        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevTestimonial);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', nextTestimonial);
        }
        
        // Auto-advance testimonials
        let autoAdvanceInterval;
        
        function startAutoAdvance() {
            autoAdvanceInterval = setInterval(nextTestimonial, 5000); // Change every 5 seconds
        }
        
        function stopAutoAdvance() {
            if (autoAdvanceInterval) {
                clearInterval(autoAdvanceInterval);
            }
        }
        
        // Pause auto-advance on hover
        testimonialsContainer.addEventListener('mouseenter', stopAutoAdvance);
        testimonialsContainer.addEventListener('mouseleave', startAutoAdvance);
        
        // Initialize
        showTestimonial(0);
        startAutoAdvance();
    }
}); 