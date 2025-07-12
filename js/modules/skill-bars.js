// ============================================================
// SKILL BARS
// ============================================================

window.triggerProgressBars = function(containerElement) {
    const bars = containerElement.querySelectorAll('.progress-bar-fill');
    bars.forEach(bar => {
        const level = bar.getAttribute('data-skill-level');
        const container = bar.closest('.progress-bar-container');

        // Use a flag or check current width to avoid re-animating bars that are already full
        // Also check if container exists before accessing it
        if (level && container && (bar.style.width === '' || bar.style.width === '0%' || parseFloat(bar.style.width) < parseFloat(level))) {
            // Temporarily remove transition to set initial state if needed, then re-add
            bar.style.transition = 'none';
            bar.style.width = '0%';
            // Add class to container to trigger sparkle animation *before* width transition
            container.classList.remove('animate-fill'); // Reset
            requestAnimationFrame(() => { // Use rAF for next frame update
                requestAnimationFrame(() => {
                    bar.style.transition = 'width 1.5s ease-out';
                    container.classList.add('animate-fill'); // Start sparkle animation CSS
                    bar.style.width = level + '%';
                    // Update data-label attribute on the container for CSS ::after
                    container.setAttribute('data-label', level);
                    // Store level on the fill for CSS animation duration calculation
                    bar.style.setProperty('--skill-level', level);
                });
            });
        }
    });
}; 