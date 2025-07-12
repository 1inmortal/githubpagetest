// ============================================================
// SOUND MANAGEMENT
// ============================================================

// Global sound management
window.sounds = {
    loading: document.getElementById('loadingAudio'),
    complete: document.getElementById('loadCompleteAudio'),
    background: document.getElementById('backgroundAudio'),
    click: document.getElementById('uiClickAudio'),
    hover: document.getElementById('uiHoverAudio'),
    filterHover: document.getElementById('filterHoverAudio')
};

window.isMuted = localStorage.getItem('portfolioMuted') === 'true';

function updateMuteButton() {
    const muteButton = document.getElementById('muteButton');
    if (!muteButton) return;
    
    // Ensure Font Awesome icons are present before updating opacity
    if (!muteButton.querySelector('.fa-volume-up')) {
        muteButton.innerHTML = '<i class="fas fa-volume-up"></i><i class="fas fa-volume-mute mute-slash"></i>';
    }
    const volumeUp = muteButton.querySelector('.fa-volume-up');
    const volumeMute = muteButton.querySelector('.fa-volume-mute');

    if (window.isMuted) {
        muteButton.classList.add('muted');
        muteButton.setAttribute('aria-label', 'Activar Sonidos');
        if (volumeUp) volumeUp.style.opacity = '0.3';
        if (volumeMute) volumeMute.style.opacity = '1';
    } else {
        muteButton.classList.remove('muted');
        muteButton.setAttribute('aria-label', 'Silenciar Sonidos');
        if (volumeUp) volumeUp.style.opacity = '1';
        if (volumeMute) volumeMute.style.opacity = '0';
    }
}

window.playSound = function(soundName, volume = 0.5) {
    if (window.isMuted || !window.sounds[soundName]) return;
    try {
        window.sounds[soundName].volume = volume;
        window.sounds[soundName].currentTime = 0;
        // Using a small timeout to help with rapid clicks on some browsers
        setTimeout(() => {
            window.sounds[soundName].play().catch(e => console.warn(`Error al reproducir sonido (${soundName}):`, e));
        }, 10);
    } catch (e) {
        console.warn(`Error al manejar sonido (${soundName}):`, e);
    }
};

window.stopSound = function(soundName) {
    if (window.sounds[soundName]) {
        try {
            window.sounds[soundName].pause();
            window.sounds[soundName].currentTime = 0;
        } catch(e) {
            console.warn("Error al detener sonido:", e);
        }
    }
};

// Initialize mute button and sounds
document.addEventListener('DOMContentLoaded', () => {
    updateMuteButton(); // Call once to set initial state and add icons if missing
    if(window.sounds.background) window.sounds.background.volume = 0.2;
    if(window.sounds.loading) window.sounds.loading.volume = 0.4;

    const muteButton = document.getElementById('muteButton');
    if (muteButton) {
        muteButton.addEventListener('click', () => {
            window.isMuted = !window.isMuted;
            localStorage.setItem('portfolioMuted', window.isMuted);
            updateMuteButton();
            if (window.isMuted) {
                window.stopSound('background');
                window.stopSound('loading');
            } else {
                const loaderOverlayEl = document.getElementById('loaderOverlay');
                const mainContent = document.getElementById('mainContent');
                if (loaderOverlayEl && loaderOverlayEl.classList.contains('active')) {
                    // Only play loading if loader is active and not muted
                    window.playSound('loading', 0.4);
                } else if (mainContent && mainContent.classList.contains('visible')) {
                    // Only play background if content is visible and not muted
                    window.playSound('background', 0.2);
                }
            }
            window.playSound('click', 0.6); // Click sound plays regardless of mute state (common UI pattern)
        });
    }

    // Apply click sound to interactive elements (excluding specific ones)
    document.querySelectorAll('a, button').forEach(el => {
        // Avoid adding listener if it's the mute button or elements inside modals
        if (el !== muteButton && !el.closest('.modal-content')) {
            el.addEventListener('click', (event) => {
                // Add button pulse animation here as well
                if (el.tagName === 'BUTTON' && el.classList.contains('hud-button')) {
                    el.classList.add('pulsing');
                    el.addEventListener('animationend', () => el.classList.remove('pulsing'), { once: true });
                }
                window.playSound('click', 0.5);
                // [INTERACTION_BURST] Trigger interaction burst
                const mobileBreak = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--mobile-break'));
                if (window.innerWidth > mobileBreak) { // Only on non-mobile
                    if (window.createInteractionBurst) {
                        window.createInteractionBurst(event.clientX, event.clientY);
                    }
                }
            });
        }
        // Add hover sound to buttons (optional)
        if (el.tagName === 'BUTTON' && el.classList.contains('hud-button') && el !== muteButton) {
            el.addEventListener('mouseenter', () => window.playSound('hover', 0.3));
        }
    });

    // Add click/hover sounds specifically to modal close buttons
    const closeModals = document.querySelectorAll('.close-modal');
    if(closeModals) closeModals.forEach(btn => btn.addEventListener('click', () => window.playSound('click', 0.4)));
}); 