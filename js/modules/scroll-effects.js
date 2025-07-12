// ============================================================
// SCROLL EFFECTS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // Parallax effect for background elements
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    }
    
    // Throttle scroll events for performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Canvas-based scroll effects
    const canvasElements = document.querySelectorAll('canvas[data-scroll-effect]');
    
    canvasElements.forEach(canvas => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        // Set canvas size
        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Animation loop
        function animate() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.01;
            
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw scroll-based effects
            ctx.fillStyle = 'rgba(0, 255, 170, 0.1)';
            ctx.fillRect(0, rate % canvas.height, canvas.width, 2);
            
            requestAnimationFrame(animate);
        }
        
        animate();
    });
}); 