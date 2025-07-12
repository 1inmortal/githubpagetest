"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // ============================================================
    // SELECTORS
    // ============================================================
    const loaderOverlayEl = document.getElementById('loaderOverlay');
    const loaderBar = document.getElementById('loaderBar');
    const loaderPercentage = document.getElementById('loaderPercentage');
    const loaderText = document.getElementById('loaderText');
    const loaderSubtext = document.getElementById('loaderSubtext');
    const mainHeader = document.getElementById('mainHeader');
    const mainContent = document.getElementById('mainContent');
    const hudOverlay = document.querySelector('.hud-overlay');
    const hudClock = document.getElementById('hudClock');
    const hudScrollIndicator = document.getElementById('hudScrollIndicator');
    const themeToggle = document.getElementById('themeToggle');
    const langToggle = document.getElementById('langToggle');
    const muteButton = document.getElementById('muteButton');
    const htmlEl = document.documentElement;

    // Elements specific to this portfolio structure
    const skillFills = document.querySelectorAll('.progress-bar-fill');
    const faqItems = document.querySelectorAll('.faq-item');
    const lazyImages = document.querySelectorAll('img[data-src]');
    const searchProjectInput = document.getElementById('searchProjectInput');
    const searchProjectBtn = document.getElementById('searchProjectBtn');
    const projectGrid = document.getElementById('projectGrid');
    const allProjectItems = projectGrid ? Array.from(projectGrid.querySelectorAll('.project-item')) : [];
    const downloadButtons = document.querySelectorAll('.download-trigger');
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modals = document.querySelectorAll('.modal');
    const closeModals = document.querySelectorAll('.close-modal');

    const timelineItems = document.querySelectorAll('.timeline-item'); // Added for timeline beacon
    const hudCornerElements = hudOverlay ? hudOverlay.querySelectorAll('.hud-corner') : []; // For JS dot/noise animations
    const hudLineElements = hudOverlay ? hudOverlay.querySelectorAll('.hud-line') : []; // For JS streak animations

    // Get the mobile breakpoint value from CSS
    const mobileBreak = parseInt(getComputedStyle(htmlEl).getPropertyValue('--mobile-break'));

    // ============================================================
    // LOADER & TYPEWRITER EFFECT
    // ============================================================
    const typewriterSpeed = 30; // ms per character
    let typingTimeout;

    function typeWriter(element, text, callback) {
        if (!element) return;
        element.textContent = ''; // Clear existing text
        element.classList.remove('typing-complete'); // Remove class if exists
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                typingTimeout = setTimeout(type, typewriterSpeed);
            } else {
                element.classList.add('typing-complete'); // Add class when typing is complete
                if (callback) callback();
            }
        }
        type();
    }

    function stopTypewriter() {
        clearTimeout(typingTimeout);
        if(loaderText) loaderText.classList.add('typing-complete');
        if(loaderSubtext) loaderSubtext.classList.add('typing-complete');
    }

    if (loaderOverlayEl) {
        let progress = 0;
        const loadingSteps = [
            { percent: 15, text: "Booting Kernal", subtext: "Memory check..." },
            { percent: 30, text: "Loading UI Modules", subtext: "Initializing HUD..." },
            { percent: 55, text: "Establishing Comms Link", subtext: "Verifying connection..." },
            { percent: 75, text: "Decrypting Asset Data", subtext: "Processing portfolio..." },
            { percent: 90, text: "Final System Checks", subtext: "Almost there..." },
            { percent: 100, text: "SYSTEM ONLINE", subtext: "Welcome." }
        ];
        let currentStep = 0;
        let isTyping = false;

        if (!window.isMuted && window.sounds && window.sounds.loading && window.sounds.background && window.sounds.background.paused) {
            window.playSound('loading', 0.4);
        }

        const simulateLoading = setInterval(() => {
            progress += Math.random() * 2 + 0.5;
            progress = Math.min(progress, 100);

            if(loaderBar) loaderBar.style.width = progress + '%';
            if(loaderPercentage) loaderPercentage.textContent = Math.floor(progress) + '%';

            // Check if we should move to the next step and trigger typing
            if (currentStep < loadingSteps.length && progress >= loadingSteps[currentStep].percent && !isTyping) {
                isTyping = true;
                typeWriter(loaderText, loadingSteps[currentStep].text, () => {
                    typeWriter(loaderSubtext, loadingSteps[currentStep].subtext, () => {
                        isTyping = false; // Allow next step when subtext typing is done
                        currentStep++;
                    });
                });
            }

            if (progress >= 100) {
                clearInterval(simulateLoading);
                stopTypewriter(); // Ensure typing stops
                window.stopSound('loading');
                window.playSound('complete', 0.6);

                setTimeout(() => {
                    loaderOverlayEl.classList.remove('active');

                    setTimeout(() => {
                        loaderOverlayEl.style.display = 'none';
                        if(mainHeader) mainHeader.classList.add('visible');
                        if(mainContent) mainContent.classList.add('visible');
                        if(hudOverlay) hudOverlay.classList.add('visible');
                        if (!window.isMuted && window.sounds && window.sounds.background) {
                            window.playSound('background', 0.2);
                        }
                        triggerVisibleReveals(); // Trigger animations after content is visible
                        startClock();
                        startHudAnimations(); // Start JS-based HUD animations
                    }, 700);
                }, 500);
            }
        }, 50);
    } else {
        // Fallback if loader overlay isn't found
        if(mainHeader) mainHeader.classList.add('visible');
        if(mainContent) mainContent.classList.add('visible');
        if(hudOverlay) hudOverlay.classList.add('visible');
        if (!window.isMuted && window.sounds && window.sounds.background) {
            window.playSound('background', 0.2);
        }
        triggerVisibleReveals();
        startClock();
        startHudAnimations(); // Start JS-based HUD animations immediately
    }

    // ============================================================
    // HUD JS Animations ([HUD_PIXEL_DRIFT], [NOISE_FIELD], [SYSTEM_GLITCH_PIXELS], [INTERACTION_BURST])
    // ============================================================

    function startHudAnimations() {
        // Check window width *before* starting animation loops
        if (window.innerWidth <= mobileBreak) {
            console.log("HUD JS animations disabled on small screens.");
            return; // Disable on small screens
        }

        const cornerSize = hudCornerElements.length > 0 ? parseFloat(getComputedStyle(hudCornerElements[0]).getPropertyValue('--hud-corner-size')) : 25; // Default if element not found
        const borderSize = hudCornerElements.length > 0 ? parseFloat(getComputedStyle(hudCornerElements[0]).getPropertyValue('--hud-border-width')) : 2; // Default

        const cornerRects = [];
        if (hudOverlay && hudCornerElements.length > 0) {
            const overlayRect = hudOverlay.getBoundingClientRect();
            hudCornerElements.forEach(corner => {
                const rect = corner.getBoundingClientRect();
                let innerRect = {};
                // Define the square area *within* the corner shape's quadrant relative to overlay
                if (corner.classList.contains('top-left')) {
                    innerRect = {
                        x: rect.left - overlayRect.left + borderSize,
                        y: rect.top - overlayRect.top + borderSize,
                        width: cornerSize,
                        height: cornerSize
                    };
                } else if (corner.classList.contains('top-right')) {
                    innerRect = {
                        x: rect.right - overlayRect.left - cornerSize - borderSize,
                        y: rect.top - overlayRect.top + borderSize,
                        width: cornerSize,
                        height: cornerSize
                    };
                } else if (corner.classList.contains('bottom-left')) {
                    innerRect = {
                        x: rect.left - overlayRect.left + borderSize,
                        y: rect.bottom - overlayRect.top - cornerSize - borderSize,
                        width: cornerSize,
                        height: cornerSize
                    };
                } else if (corner.classList.contains('bottom-right')) {
                    innerRect = {
                        x: rect.right - overlayRect.left - cornerSize - borderSize,
                        y: rect.bottom - overlayRect.top - cornerSize - borderSize,
                        width: cornerSize,
                        height: cornerSize
                    };
                }
                if (innerRect.width > 0 && innerRect.height > 0) { // Ensure valid rect
                    cornerRects.push(innerRect);
                }
            });
        }

        // [HUD_PIXEL_DRIFT] & [NOISE_FIELD] Animation Loop
        function animateRandomBitsInCorners() {
            if (window.innerWidth <= mobileBreak || cornerRects.length === 0 || !hudOverlay) {
                // Stop animation if on mobile or corners not found
                return;
            }

            // Create random dots in corners
            const dot = document.createElement('div');
            dot.style.position = 'absolute';
            dot.style.width = '2px';
            dot.style.height = '2px';
            dot.style.backgroundColor = 'var(--hud-dot-color)';
            dot.style.borderRadius = '50%';
            dot.style.pointerEvents = 'none';
            dot.style.zIndex = '1000';

            // Random corner selection
            const randomCorner = cornerRects[Math.floor(Math.random() * cornerRects.length)];
            const x = randomCorner.x + Math.random() * randomCorner.width;
            const y = randomCorner.y + Math.random() * randomCorner.height;

            dot.style.left = x + 'px';
            dot.style.top = y + 'px';
            dot.style.opacity = '0';

            hudOverlay.appendChild(dot);

            // Animate dot appearance and disappearance
            requestAnimationFrame(() => {
                dot.style.transition = 'opacity 0.5s ease-in-out';
                dot.style.opacity = '1';
            });

            setTimeout(() => {
                dot.style.opacity = '0';
                setTimeout(() => {
                    if (dot.parentNode) {
                        dot.parentNode.removeChild(dot);
                    }
                }, 500);
            }, 1000 + Math.random() * 2000);

            // Schedule next animation
            setTimeout(animateRandomBitsInCorners, 200 + Math.random() * 800);
        }

        // Start the animation loop
        animateRandomBitsInCorners();
    }

    // ============================================================
    // CLOCK SYSTEM
    // ============================================================
    function startClock() {
        if (!hudClock) return;

        function updateClock() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            hudClock.textContent = `${hours}:${minutes}:${seconds}`;
        }

        updateClock();
        setInterval(updateClock, 1000);
    }

    // ============================================================
    // REVEAL ANIMATION (SCROLL) & SECTION SCAN
    // ============================================================
    const revealElements = document.querySelectorAll('.reveal');
    if (typeof IntersectionObserver !== 'undefined') {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        triggerProgressBars(entry.target); // Animate bars inside revealed section
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
            triggerProgressBars(el); // Trigger bars on fallback
        });
    }

    // Manually trigger reveals for visible elements on page load
    function triggerVisibleReveals() {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            // Check if the element is currently in the viewport
            if (rect.top < window.innerHeight && rect.bottom >= 0 && rect.left < window.innerWidth && rect.right >= 0) {
                el.classList.add('visible');
                triggerProgressBars(el); // Also trigger bars for initially visible sections
            }
        });
    }

    // ============================================================
    // DYNAMIC PROGRESS BARS (SKILLS) & Sparkle
    // ============================================================
    function triggerProgressBars(containerElement) {
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
    }

    // Initialize all modules
    console.log('Main.js: Initializing portfolio modules...');
}); 