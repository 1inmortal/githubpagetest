
        document.addEventListener('DOMContentLoaded', () => {
    
            /**
             * Sistema de Audio Inmersivo
             * Maneja toda la funcionalidad de audio del portafolio
             */
            class AudioSystem {
                constructor(uiManager) {
                    this.uiManager = uiManager;
                    this.isAudioEnabled = true;
                    this.hasUserInteracted = false;
                    this.backgroundMusic = document.getElementById('background-music');
                    this.audioToggle = document.getElementById('audio-toggle');
                    
                    this.init();
                }
                
                init() {
                    this.setupAudioToggle();
                    this.setupBackgroundMusic();
                    this.setupSoundEffects();
                    this.setupUserInteraction();
                }
                
                setupAudioToggle() {
                    if (!this.audioToggle) return;
                    
                    this.audioToggle.addEventListener('click', () => {
                        this.isAudioEnabled = !this.isAudioEnabled;
                        this.audioToggle.classList.toggle('muted', !this.isAudioEnabled);
                        
                        // Agregar efecto visual de confirmación
                        this.audioToggle.classList.add('active');
                        setTimeout(() => this.audioToggle.classList.remove('active'), 200);
                        
                        if (this.isAudioEnabled) {
                            if (this.hasUserInteracted) {
                                this.backgroundMusic.play().catch(e => console.log('Audio play failed:', e));
                            }
                        } else {
                            this.backgroundMusic.pause();
                        }
                    });
                }
                
                setupBackgroundMusic() {
                    if (!this.backgroundMusic) return;
                    
                    // Configurar volumen bajo para música de fondo
                    this.backgroundMusic.volume = 0.3;
                    
                    // La música se iniciará con la primera interacción del usuario
                }
                
                setVolume(type, volume) {
                    const audioElements = {
                        background: this.backgroundMusic,
                        effects: document.querySelectorAll('#audio-players audio:not(#background-music)')
                    };
                    
                    if (type === 'background' && audioElements.background) {
                        audioElements.background.volume = Math.max(0, Math.min(1, volume));
                    } else if (type === 'effects') {
                        audioElements.effects.forEach(audio => {
                            audio.volume = Math.max(0, Math.min(1, volume));
                        });
                    }
                }
                
                setupUserInteraction() {
                    // Detectar la primera interacción del usuario para iniciar la música
                    const startMusicOnInteraction = () => {
                        if (!this.hasUserInteracted && this.isAudioEnabled) {
                            this.hasUserInteracted = true;
                            this.backgroundMusic.play().catch(e => console.log('Background music failed to start:', e));
                            
                            // Remover los event listeners después de la primera interacción
                            document.removeEventListener('click', startMusicOnInteraction);
                            document.removeEventListener('keydown', startMusicOnInteraction);
                            document.removeEventListener('touchstart', startMusicOnInteraction);
                        }
                    };
                    
                    document.addEventListener('click', startMusicOnInteraction);
                    document.addEventListener('keydown', startMusicOnInteraction);
                    document.addEventListener('touchstart', startMusicOnInteraction);
                }
                
                setupSoundEffects() {
                    // Configurar efectos de sonido para diferentes elementos
                    this.setupHoverEffects();
                    this.setupClickEffects();
                    this.setupAccordionEffects();
                    this.setupNavigationEffects();
                    this.setupFormEffects();
                    this.setupTooltipEffects();
                }
                
                setupHoverEffects() {
                    // Botones y elementos interactivos
                    const hoverElements = [
                        { selector: '.nav-link', sound: 'nav-menu-hover' },
                        { selector: '.hero h1, .hero h2, .hero p', sound: 'hero-text-hover' },
                        { selector: '.hero .cta-button', sound: 'hero-button-hover' },
                        { selector: '.about p, .about h2, .about h3', sound: 'about-text-hover' },
                        { selector: '.about img', sound: 'about-image-hover' },
                        { selector: '.skill-item', sound: 'skills-icon-hover' },
                        { selector: '.skill-category', sound: 'skills-category-hover' },
                        { selector: '.service-item', sound: 'services-card-hover' },
                        { selector: '.process-step', sound: 'process-step-hover' },
                        { selector: '.portfolio-card', sound: 'portfolio-card-hover' },
                        { selector: '.testimonial-card', sound: 'testimonials-hover' },
                        { selector: '.faq-question', sound: 'faq-question-hover' },
                        { selector: 'input, textarea', sound: 'contact-field-hover' },
                        { selector: '.social-link', sound: 'social-icon-hover' }
                    ];
                    
                    hoverElements.forEach(({ selector, sound }) => {
                        document.querySelectorAll(selector).forEach(element => {
                            element.addEventListener('mouseenter', () => this.playSound(sound));
                        });
                    });
                }
                
                setupClickEffects() {
                    // Clics en botones y elementos importantes
                    const clickElements = [
                        { selector: '.cta-button', sound: 'hero-button-hover' },
                        { selector: '.portfolio-card', sound: 'portfolio-click' },
                        { selector: '.service-header', sound: 'services-click' },
                        { selector: '.faq-header', sound: 'faq-click' },
                        { selector: '.social-link', sound: 'social-icon-hover' },
                        { selector: '.hamburger', sound: 'nav-menu-hover' },
                        { selector: '.skill-item', sound: 'skills-icon-hover' },
                        { selector: '.process-step', sound: 'process-step-hover' },
                        { selector: '.testimonial-card', sound: 'testimonials-hover' }
                    ];
                    
                    clickElements.forEach(({ selector, sound }) => {
                        document.querySelectorAll(selector).forEach(element => {
                            element.addEventListener('click', () => this.playSound(sound));
                        });
                    });
                }
                
                setupAccordionEffects() {
                    // Efectos para acordeones (servicios y FAQ)
                    document.querySelectorAll('.service-header, .faq-header').forEach(header => {
                        header.addEventListener('click', () => {
                            const item = header.closest('.service-item, .faq-item');
                            const isActive = item.classList.contains('active');
                            this.playSound(isActive ? 'services-click' : 'services-click');
                        });
                    });
                }
                
                setupNavigationEffects() {
                    // Efectos para navegación del portafolio
                    document.querySelectorAll('#prev-project, #next-project').forEach(btn => {
                        btn.addEventListener('click', () => this.playSound('portfolio-click'));
                    });
                    
                    document.querySelectorAll('#prev-testimonial, #next-testimonial').forEach(btn => {
                        btn.addEventListener('click', () => this.playSound('testimonials-hover'));
                    });
                }
                
                setupFormEffects() {
                    // Efectos para formularios
                    document.querySelectorAll('input, textarea').forEach(input => {
                        input.addEventListener('focus', () => this.playSound('contact-field-hover'));
                        input.addEventListener('input', () => this.playSound('contact-field-hover'));
                    });
                    
                    // Efecto para el botón de envío
                    document.querySelectorAll('button[type="submit"], .submit-button').forEach(button => {
                        button.addEventListener('mouseenter', () => this.playSound('contact-submit-hover'));
                        button.addEventListener('click', () => this.playSound('contact-submit-hover'));
                    });
                    
                    document.querySelectorAll('form').forEach(form => {
                        form.addEventListener('submit', () => this.playSound('contact-submit-hover'));
                    });
                }
                
                setupTooltipEffects() {
                    // Efectos para tooltips de habilidades
                    // Solo aplicar sonido a los paneles de categorías, no a los iconos individuales
                    document.querySelectorAll('.skill-category').forEach(category => {
                        category.addEventListener('mouseenter', () => {
                            // Pequeño delay para que el tooltip aparezca primero
                            setTimeout(() => this.playSound('skills-icon-hover'), 100);
                        });
                    });
                }
                
                playSound(soundId) {
                    if (!this.isAudioEnabled) return;
                    
                    const audio = document.getElementById(soundId);
                    if (audio) {
                        try {
                            // Resetear el audio para permitir reproducción múltiple
                            audio.currentTime = 0;
                            audio.volume = 0.5; // Volumen moderado para efectos
                            
                            // Usar una promesa para manejar mejor los errores
                            const playPromise = audio.play();
                            if (playPromise !== undefined) {
                                playPromise.catch(error => {
                                    // Solo loggear errores que no sean de autoplay policy
                                    if (error.name !== 'NotAllowedError') {
                                        console.log(`Sound ${soundId} failed to play:`, error);
                                    }
                                });
                            }
                        } catch (error) {
                            console.log(`Error playing sound ${soundId}:`, error);
                        }
                    }
                }
            }
    
            /**
             * Maneja la escena de fondo con Three.js.
             * (Sin cambios, ya es eficiente y encapsulada).
             */
            class ThreeJSScene {
                constructor(canvasId) {
                    this.canvas = document.getElementById(canvasId);
                    if (!this.canvas) {
                        console.error('Three.js canvas not found!');
                        return;
                    }
                    this.init();
                }
                init() {
                    this.scene = new THREE.Scene();
                    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
                    this.camera.position.set(0, 0, 60);
                    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
                    this.renderer.setClearColor(0x0a0a1a, 1);
                    this.renderer.setSize(window.innerWidth, window.innerHeight);
                    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                    this.createNebula();
                    window.addEventListener('resize', this.onWindowResize.bind(this));
                    this.animate(0);
                }
                createNebula() {
                    const bgGeo = new THREE.SphereGeometry(900, 32, 32);
                    this.nebulaMaterial = new THREE.ShaderMaterial({
                        uniforms: { time: { value: 0 } },
                        vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
                        fragmentShader: `uniform float time; varying vec2 vUv; void main() { float n = sin(vUv.x * 12.0 + time) * cos(vUv.y * 8.0 + time * 0.7); vec3 col = mix(vec3(0.05, 0.07, 0.25), vec3(0.4, 0.02, 0.08), n * 0.5 + 0.5); gl_FragColor = vec4(col, 1.0); }`,
                        side: THREE.BackSide
                    });
                    this.scene.add(new THREE.Mesh(bgGeo, this.nebulaMaterial));
                }
                onWindowResize() {
                    this.camera.aspect = window.innerWidth / window.innerHeight;
                    this.camera.updateProjectionMatrix();
                    this.renderer.setSize(window.innerWidth, window.innerHeight);
                }
                animate(time) {
                    this.nebulaMaterial.uniforms.time.value = time * 0.0005;
                    this.renderer.render(this.scene, this.camera);
                    requestAnimationFrame(this.animate.bind(this));
                }
            }
    
            /**
             * Maneja todas las animaciones con GSAP y ScrollTrigger.
             */
            class ScrollAnimations {
                constructor() {
                    gsap.registerPlugin(ScrollTrigger);
                    // ANÁLISIS Y MEJORA: Hacemos una propiedad para que el UIManager pueda acceder a ella.
                    this.portfolioScrollTrigger = null; 
                    this.init();
                }
                init() {
                    this.revealElements();
                    this.initHorizontalPortfolio();
                }
                revealElements() {
                    gsap.utils.toArray('.reveal-up').forEach(el => {
                        gsap.fromTo(el, { opacity: 0, y: 50 }, {
                            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
                        });
                    });
                }
                initHorizontalPortfolio() {
                    if (window.innerWidth <= 768) return;
                    let portfolioContainer = document.querySelector("#portfolio-container");
                    let portfolioGrid = document.querySelector(".portfolio-grid");
                    
                    // ANÁLISIS Y MEJORA: Guardamos la instancia de ScrollTrigger en la propiedad de la clase.
                    // Esto es crucial para que los botones de navegación puedan controlarla.
                    let tween = gsap.to(portfolioGrid, {
                        x: () => -(portfolioGrid.scrollWidth - document.documentElement.clientWidth),
                        ease: "none",
                        scrollTrigger: {
                            trigger: portfolioContainer,
                            pin: true,
                            scrub: 1,
                            end: () => "+=" + (portfolioGrid.scrollWidth - document.documentElement.clientWidth),
                            invalidateOnRefresh: true,
                            // ANÁLISIS Y MEJORA: Añadimos un onUpdate para sincronizar los indicadores.
                            onUpdate: self => {
                                 const progress = self.progress;
                                 const totalProjects = document.querySelectorAll('.portfolio-card').length;
                                 const currentIndex = Math.round(progress * (totalProjects - 1));
                                 document.querySelectorAll('.portfolio-indicators .indicator').forEach((indicator, index) => {
                                     indicator.classList.toggle('active', index === currentIndex);
                                 });
                            }
                        },
                    });
    
                    // Extraemos el ScrollTrigger de la animación para poder controlarlo externamente.
                    this.portfolioScrollTrigger = tween.scrollTrigger;
                }
            }
    
            /**
             * Maneja todas las interacciones de la interfaz de usuario.
             */
            class UIManager {
                // ANÁLISIS Y MEJORA: Acepta la instancia de scrollAnimations para poder interactuar con ella.
                constructor(scrollAnimations) {
                    this.scrollAnimations = scrollAnimations;
                    this.init();
                }
                init() {
                    this.handleHeaderScroll();
                    this.setupAccordion('.service-item', '.service-header', '.service-details');
                    this.setupAccordion('.faq-item', '.faq-header', '.faq-answer');
                    this.setupMobileNav();
                    this.setupSkillsMatrix();
                    this.setupPortfolioNavigation(); // Ahora funcionará correctamente
                    this.setupTestimonials();
                    this.setupFuturisticTitleEffect(); // Consolidado aquí
                    this.setupFooterAnimation(); // Consolidado aquí
                }
                handleHeaderScroll() {
                    const header = document.querySelector('.main-header');
                    ScrollTrigger.create({
                        start: 'top -80', end: 99999,
                        onUpdate: self => header.classList.toggle('scrolled', self.direction === 1 && self.scroll() > 80)
                    });
                }
                setupAccordion(itemSelector, headerSelector, detailsSelector) {
                    const accordionItems = document.querySelectorAll(itemSelector);
                    accordionItems.forEach(item => {
                        const header = item.querySelector(headerSelector);
                        const details = item.querySelector(detailsSelector);
                        header.addEventListener('click', () => {
                            const isActive = item.classList.contains('active');
                            accordionItems.forEach(otherItem => {
                                if (otherItem !== item && otherItem.classList.contains('active')) {
                                    otherItem.classList.remove('active');
                                    gsap.to(otherItem.querySelector(detailsSelector), { maxHeight: 0, duration: 0.5, ease: 'power2.inOut' });
                                }
                            });
                            item.classList.toggle('active');
                            gsap.to(details, {
                                maxHeight: isActive ? 0 : details.scrollHeight + 20,
                                duration: 0.5, ease: 'power2.inOut'
                            });
                        });
                    });
                }
                setupMobileNav() {
                    const hamburger = document.querySelector('.hamburger');
                    const mainNav = document.querySelector('.main-nav');
                    const navLinks = document.querySelectorAll('.main-nav .nav-link');
                    const body = document.body;
                    
                    // Validación de elementos
                    if (!hamburger || !mainNav) {
                        console.warn('Elementos de navegación móvil no encontrados');
                        return;
                    }
                    
                    let isMenuOpen = false;
                    
                    // Función para abrir menú
                    const openMenu = () => {
                        if (isMenuOpen) return;
                        
                        isMenuOpen = true;
                        hamburger.classList.add('active');
                        mainNav.classList.add('active');
                        hamburger.setAttribute('aria-expanded', 'true');
                        
                        // Bloquear scroll del body
                        body.style.overflow = 'hidden';
                        
                        // Animación GSAP si está disponible
                        if (typeof gsap !== 'undefined') {
                            gsap.fromTo(navLinks, 
                                { opacity: 0, y: -20 },
                                { 
                                    opacity: 1, 
                                    y: 0, 
                                    duration: 0.3, 
                                    stagger: 0.1,
                                    ease: 'power2.out'
                                }
                            );
                        }
                        
                        // Efecto de sonido
                        const audioSystem = document.querySelector('#audio-toggle')?.closest('.audio-system')?.querySelector('audio[id="nav-menu-hover"]');
                        if (audioSystem) {
                            try {
                                audioSystem.currentTime = 0;
                                audioSystem.volume = 0.5;
                                audioSystem.play().catch(e => console.log('Audio play failed:', e));
                            } catch (error) {
                                console.log('Error playing sound:', error);
                            }
                        }
                    };
                    
                    // Función para cerrar menú
                    const closeMenu = () => {
                        if (!isMenuOpen) return;
                        
                        isMenuOpen = false;
                        hamburger.classList.remove('active');
                        mainNav.classList.remove('active');
                        hamburger.setAttribute('aria-expanded', 'false');
                        
                        // Restaurar scroll del body
                        body.style.overflow = '';
                        
                        // Animación GSAP si está disponible
                        if (typeof gsap !== 'undefined') {
                            gsap.to(navLinks, {
                                opacity: 0,
                                y: -20,
                                duration: 0.2,
                                ease: 'power2.in'
                            });
                        }
                    };
                    
                    // Event listener para el botón hamburguesa
                    hamburger.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        if (isMenuOpen) {
                            closeMenu();
                        } else {
                            openMenu();
                        }
                    });
                    
                    // Cerrar al hacer click en enlaces
                    navLinks.forEach(link => {
                        link.addEventListener('click', () => {
                            closeMenu();
                        });
                    });
                    
                    // Cerrar con tecla Escape
                    document.addEventListener('keydown', (e) => {
                        if (e.key === 'Escape' && isMenuOpen) {
                            closeMenu();
                        }
                    });
                    
                    // Cerrar al hacer click fuera del menú
                    document.addEventListener('click', (e) => {
                        if (isMenuOpen && 
                            !hamburger.contains(e.target) && 
                            !mainNav.contains(e.target)) {
                            closeMenu();
                        }
                    });
                    
                    // Cerrar al cambiar tamaño de ventana (responsive)
                    window.addEventListener('resize', () => {
                        if (window.innerWidth > 768 && isMenuOpen) {
                            closeMenu();
                        }
                    });
                    
                    // Mejorar accesibilidad
                    hamburger.setAttribute('aria-label', 'Abrir menú de navegación');
                    hamburger.setAttribute('aria-expanded', 'false');
                    hamburger.setAttribute('aria-controls', 'main-nav');
                    
                    // Añadir focus management
                    hamburger.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            hamburger.click();
                        }
                    });
                }
                
                // ANÁLISIS Y MEJORA: Se crea una función auxiliar para evitar repetir código.
                _setupHoverEffect(selector) {
                    document.querySelectorAll(selector).forEach(item => {
                        item.addEventListener('mouseenter', () => item.classList.add('active'));
                        item.addEventListener('mouseleave', () => item.classList.remove('active'));
                    });
                }
                setupSkillsMatrix() {
                    this._setupHoverEffect('.skill-category');
                    this._setupHoverEffect('.skill-item');
                }
    
                // ANÁLISIS Y MEJORA: Lógica completamente rehecha para no entrar en conflicto.
                setupPortfolioNavigation() {
                    const prevBtn = document.getElementById('prev-project');
                    const nextBtn = document.getElementById('next-project');
                    const indicators = document.querySelectorAll('.portfolio-indicators .indicator');
                    const totalProjects = document.querySelectorAll('.portfolio-card').length;
                    let currentIndex = 0;
    
                    // Si el scrolltrigger no se inicializó (estamos en móvil), no hacer nada.
                    if (!this.scrollAnimations.portfolioScrollTrigger) return;
                    
                    const st = this.scrollAnimations.portfolioScrollTrigger;
                    const scrollDistancePerProject = (st.end - st.start) / (totalProjects - 1);
                    
                    const updateCurrentIndex = () => {
                         const progress = (st.scroll() - st.start) / (st.end - st.start);
                         currentIndex = Math.round(progress * (totalProjects - 1));
                    };
    
                    const scrollToProject = (index) => {
                        updateCurrentIndex();
                        const targetScroll = st.start + index * scrollDistancePerProject;
                        gsap.to(window, {
                            scrollTo: { y: targetScroll, autoKill: false },
                            duration: 1,
                            ease: 'power2.inOut'
                        });
                    };
    
                    prevBtn.addEventListener('click', () => {
                        updateCurrentIndex();
                        scrollToProject(Math.max(0, currentIndex - 1));
                    });
                    nextBtn.addEventListener('click', () => {
                        updateCurrentIndex();
                        scrollToProject(Math.min(totalProjects - 1, currentIndex + 1));
                    });
                    indicators.forEach((indicator, index) => {
                        indicator.addEventListener('click', () => scrollToProject(index));
                    });
                }
                
                setupTestimonials() {
                    const testimonialCards = document.querySelectorAll('.testimonial-card');
                    const prevBtn = document.getElementById('prev-testimonial');
                    const nextBtn = document.getElementById('next-testimonial');
                    
                    if (testimonialCards.length === 0) return;
    
                    let currentTestimonial = 0;
                    const totalTestimonials = testimonialCards.length;
                    let autoplayInterval;

                    const showTestimonial = (index) => {
                        testimonialCards.forEach((card, i) => {
                            const isActive = i === index;
                            gsap.to(card, {
                                opacity: isActive ? 1 : 0,
                                pointerEvents: isActive ? 'auto' : 'none',
                                duration: 0.5,
                                ease: 'power2.out'
                            });
                            if(isActive) {
                               card.classList.add('glitch');
                               setTimeout(() => card.classList.remove('glitch'), 300);
                            }
                        });
                        document.querySelectorAll('.status-dot').forEach((dot, i) => dot.classList.toggle('active', i === index));
                    }

                    const nextTestimonial = () => {
                        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
                        showTestimonial(currentTestimonial);
                    }

                    const prevTestimonial = () => {
                        currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
                        showTestimonial(currentTestimonial);
                    }

                    // Ocultar todos excepto el primero al inicio
                    showTestimonial(0);

                    // Event listeners para botones
                    if (prevBtn) {
                        prevBtn.addEventListener('click', () => {
                            clearInterval(autoplayInterval);
                            prevTestimonial();
                            startAutoplay();
                        });
                    }

                    if (nextBtn) {
                        nextBtn.addEventListener('click', () => {
                            clearInterval(autoplayInterval);
                            nextTestimonial();
                            startAutoplay();
                        });
                    }

                    // Función para iniciar autoplay
                    const startAutoplay = () => {
                        autoplayInterval = setInterval(() => {
                            nextTestimonial();
                        }, 5000); // Cambiar testimonio cada 5 segundos
                    };

                    // Iniciar autoplay
                    startAutoplay();

                    // Pausar autoplay al hacer hover sobre testimonios
                    testimonialCards.forEach(card => {
                        card.addEventListener('mouseenter', () => {
                            clearInterval(autoplayInterval);
                        });
                        
                        card.addEventListener('mouseleave', () => {
                            startAutoplay();
                        });
                    });
                }
                
                // ANÁLISIS Y MEJORA: Funciones de los otros scripts, consolidadas aquí.
                setupFuturisticTitleEffect() {
                    const typewriterText = document.querySelector('.typewriter-text');
                    if (!typewriterText) return;
                    
                    const chars = typewriterText.querySelectorAll('.char');
                    let currentIndex = 0;
                    
                    // Función para animar cada letra
                    const animateNextChar = () => {
                        if (currentIndex < chars.length) {
                            const char = chars[currentIndex];
                            
                            // Agregar clase para activar la animación
                            char.style.animationDelay = `${currentIndex * 0.06}s`;
                            char.style.animationFillMode = 'forwards';
                            
                            // Reproducir sonido de máquina de escribir (si está disponible)
                            if (this.uiManager && this.uiManager.audioSystem) {
                                this.uiManager.audioSystem.playSound('typewriter-sound');
                            }
                            
                            currentIndex++;
                            
                            // Programar la siguiente letra - más rápido
                            setTimeout(animateNextChar, 60);
                        } else {
                            // Animación completada
                            setTimeout(() => {
                                // Agregar efecto de cursor parpadeante
                                typewriterText.classList.add('typing-complete');
                            }, 300);
                        }
                    };
                    
                    // Iniciar la animación cuando la página se carga
                    setTimeout(() => {
                        animateNextChar();
                    }, 1000);
                    
                    // Reiniciar animación al hacer hover
                    typewriterText.addEventListener('mouseenter', () => {
                        // Reiniciar animación
                        chars.forEach((char, index) => {
                            char.style.animation = 'none';
                            char.offsetHeight; // Trigger reflow
                            char.style.animation = `typewriter-fade-in 0.08s ease-out ${index * 0.03}s forwards`;
                        });
                        
                        currentIndex = 0;
                        setTimeout(() => {
                            animateNextChar();
                        }, 50);
                    });
                }
                setupFooterAnimation() {
                     gsap.to('.footer-divider', {
                        boxShadow: '0 0 32px 8px var(--accent-primary)',
                        repeat: -1, yoyo: true, duration: 2.5, ease: 'power1.inOut'
                     });
                }
            }
    
            // --- INICIALIZACIÓN DE MÓDULOS ---
            new ThreeJSScene('three-canvas');
            const scrollAnimations = new ScrollAnimations();
            const uiManager = new UIManager(scrollAnimations); // Pasamos la instancia para que puedan comunicarse.
            
            // --- SISTEMA DE AUDIO INMERSIVO ---
            new AudioSystem(uiManager);

            /**
             * Sistema de Certificaciones
             * Maneja la lógica de la sección de certificaciones
             */
            class CertificationsSystem {
                constructor() {
                    this.certData = [
                        {
                            id: 'foundations-cybersecurity',
                            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1024px-IBM_logo.svg.png',
                            title: 'Foundations of Cybersecurity',
                            date: '2024',
                            image: 'Certificados/img/Foundations of Cybersecurity.jpg',
                            description: 'Certificación fundamental en ciberseguridad que valida conocimientos en principios de seguridad, amenazas cibernéticas, protección de datos y mejores prácticas de seguridad informática.',
                            skills: ['Cybersecurity', 'Security Fundamentals', 'Network Security', 'Threat Analysis', 'Security Protocols'],
                            verifyLink: 'https://coursera.org/share/6b22fbd49ea42bb1745c29ad95c6e946',
                            certId: 'IBM-CYBERSEC-2024-001',
                            validUntil: 'Diciembre 2026',
                            level: 'Fundamental',
                            studyHours: '120 horas',
                            downloadLink: '#'
                        },
                        {
                            id: 'play-it-safe-security',
                            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1024px-IBM_logo.svg.png',
                            title: 'Play It Safe: Manage Security Risks',
                            date: '2024',
                            image: 'Certificados/img/Play It Safe_ Manage Security Risks.jpg',
                            description: 'Certificación especializada en gestión de riesgos de seguridad que cubre identificación de amenazas, evaluación de vulnerabilidades, implementación de controles de seguridad y respuesta a incidentes.',
                            skills: ['Security Risk Management', 'Threat Analysis', 'Security Protocols', 'Incident Response', 'Risk Assessment'],
                            verifyLink: 'https://coursera.org/share/d651519cbbe7c2051b9e9d977623b21b',
                            certId: 'IBM-SECURITY-RISK-2024-002',
                            validUntil: 'Diciembre 2026',
                            level: 'Intermediate',
                            studyHours: '100 horas',
                            downloadLink: '#'
                        },
                        {
                            id: 'defensa-red',
                            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1024px-IBM_logo.svg.png',
                            title: 'Defensa de la Red',
                            date: '2024',
                            image: 'Certificados/img/Defensa de la red.jpeg',
                            description: 'Certificación en defensa de redes que valida competencias en protección de infraestructura de red, detección de intrusiones, análisis forense y estrategias de defensa cibernética.',
                            skills: ['Network Defense', 'Security Operations', 'Incident Response', 'Forensic Analysis', 'Cyber Defense'],
                            verifyLink: 'https://www.netacad.com/es/certificates?issuanceId=688ed571-1d5f-41e3-a5de-70eaff4cbab2',
                            certId: 'IBM-NETWORK-DEFENSE-2024-003',
                            validUntil: 'Diciembre 2026',
                            level: 'Advanced',
                            studyHours: '150 horas',
                            downloadLink: '#'
                        },
                        {
                            id: 'full-stack-assessment',
                            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1024px-IBM_logo.svg.png',
                            title: 'Full Stack Software Developer Assessment',
                            date: '2024',
                            image: 'Certificados/img/Full Stack Software Developer Assessment.jpg',
                            description: 'Evaluación completa de habilidades en desarrollo full stack que valida competencias en frontend, backend, bases de datos, APIs y arquitectura de aplicaciones web.',
                            skills: ['Full Stack Development', 'Software Engineering', 'Web Development', 'Frontend', 'Backend', 'APIs'],
                            verifyLink: 'https://coursera.org/share/c62f0378affc1863cc71ef618795c52d',
                            certId: 'IBM-FULLSTACK-2024-004',
                            validUntil: 'Diciembre 2026',
                            level: 'Professional',
                            studyHours: '200 horas',
                            downloadLink: '#'
                        },
                        {
                            id: 'introduction-html-css-js',
                            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1024px-IBM_logo.svg.png',
                            title: 'Introduction to HTML, CSS, & JavaScript',
                            date: '2024',
                            image: 'Certificados/img/Introduction to HTML, CSS, & JavaScript.jpg',
                            description: 'Certificación en tecnologías web fundamentales que cubre HTML5, CSS3 y JavaScript moderno para el desarrollo de interfaces web interactivas y responsivas.',
                            skills: ['HTML', 'CSS', 'JavaScript', 'Web Development', 'Frontend', 'Responsive Design'],
                            verifyLink: 'https://coursera.org/share/af180c47d747d439a930e625181bf532',
                            certId: 'IBM-WEB-DEV-2024-005',
                            validUntil: 'Diciembre 2026',
                            level: 'Fundamental',
                            studyHours: '80 horas',
                            downloadLink: '#'
                        },
                        {
                            id: 'introduction-software-engineering',
                            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1024px-IBM_logo.svg.png',
                            title: 'Introduction to Software Engineering',
                            date: '2024',
                            image: 'Certificados/img/Introduction to Software Engineering.jpg',
                            description: 'Certificación en principios de ingeniería de software que cubre metodologías de desarrollo, control de versiones, testing, y mejores prácticas en el ciclo de vida del software.',
                            skills: ['Software Engineering', 'Development Lifecycle', 'Best Practices', 'Version Control', 'Testing'],
                            verifyLink: 'https://coursera.org/share/7491949eacd3e6adc48e06e4c03fef39',
                            certId: 'IBM-SOFTWARE-ENG-2024-006',
                            validUntil: 'Diciembre 2026',
                            level: 'Fundamental',
                            studyHours: '120 horas',
                            downloadLink: '#'
                        },
                        {
                            id: 'python-data-science-ai',
                            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1024px-IBM_logo.svg.png',
                            title: 'Python for Data Science, AI & Development',
                            date: '2024',
                            image: 'Certificados/img/Python for Data Science, Al & Development.jpg',
                            description: 'Certificación en Python aplicado a ciencia de datos e inteligencia artificial que valida competencias en análisis de datos, machine learning y desarrollo de aplicaciones AI.',
                            skills: ['Python', 'Data Science', 'Artificial Intelligence', 'Machine Learning', 'Data Analysis'],
                            verifyLink: 'https://coursera.org/share/b2ce7a15804584829acd19483653b484',
                            certId: 'IBM-PYTHON-AI-2024-007',
                            validUntil: 'Diciembre 2026',
                            level: 'Intermediate',
                            studyHours: '160 horas',
                            downloadLink: '#'
                        },
                        {
                            id: 'introduction-modern-ai',
                            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1024px-IBM_logo.svg.png',
                            title: 'Introduction to Modern AI',
                            date: '2024',
                            image: 'Certificados/img/Introduction to Modern Al.jpeg',
                            description: 'Certificación en inteligencia artificial moderna que cubre fundamentos de IA, machine learning, deep learning y aplicaciones prácticas de tecnologías AI emergentes.',
                            skills: ['Artificial Intelligence', 'Machine Learning', 'AI Applications', 'Deep Learning', 'AI Ethics'],
                            verifyLink: 'https://www.netacad.com/es/certificates?issuanceId=0563ec82-4ce4-4a5e-afa1-a22873c99e48',
                            certId: 'IBM-MODERN-AI-2024-008',
                            validUntil: 'Diciembre 2026',
                            level: 'Intermediate',
                            studyHours: '140 horas',
                            downloadLink: '#'
                        },
                        {
                            id: 'git-github',
                            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1024px-IBM_logo.svg.png',
                            title: 'Getting Started with Git and GitHub',
                            date: '2024',
                            image: 'Certificados/img/Getting Started with Git and GitHub.jpg',
                            description: 'Certificación en control de versiones con Git y GitHub que valida competencias en gestión de código, colaboración en proyectos y flujos de trabajo modernos de desarrollo.',
                            skills: ['Git', 'GitHub', 'Version Control', 'Collaboration', 'Development Workflow'],
                            verifyLink: 'https://coursera.org/share/2c7de9916c423d2e3d3c14b6f93fbf16',
                            certId: 'IBM-GIT-GITHUB-2024-009',
                            validUntil: 'Diciembre 2026',
                            level: 'Fundamental',
                            studyHours: '60 horas',
                            downloadLink: '#'
                        },
                        {
                            id: 'generative-ai-software',
                            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1024px-IBM_logo.svg.png',
                            title: 'Generative AI: Elevate your Software Development Career',
                            date: '2024',
                            image: 'Certificados/img/Generative Al_ Elevate your Software Development Career.jpg',
                            description: 'Certificación en IA generativa aplicada al desarrollo de software que cubre herramientas AI para programación, automatización de tareas y mejora de productividad en desarrollo.',
                            skills: ['Generative AI', 'Software Development', 'AI Tools', 'Programming Automation', 'Productivity'],
                            verifyLink: 'https://coursera.org/share/a568cdf63b4ea24dc505ac274c1ca750',
                            certId: 'IBM-GENERATIVE-AI-2024-010',
                            validUntil: 'Diciembre 2026',
                            level: 'Advanced',
                            studyHours: '180 horas',
                            downloadLink: '#'
                        },
                        {
                            id: 'marketing',
                            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1024px-Google_%22G%22_Logo.svg.png',
                            title: 'Marketing Digital',
                            date: '2024',
                            image: 'Certificados/img/marketing.jpg',
                            description: 'Certificación en marketing digital que valida competencias en estrategias de marketing online, análisis de datos, publicidad digital y gestión de campañas de marketing.',
                            skills: ['Digital Marketing', 'Marketing Strategy', 'Brand Management', 'Analytics', 'Campaign Management'],
                            verifyLink: 'https://www.credly.com/badges/xxxxxxxxxxxx',
                            certId: 'GOOGLE-MARKETING-2024-011',
                            validUntil: 'Diciembre 2026',
                            level: 'Intermediate',
                            studyHours: '100 horas',
                            downloadLink: '#'
                        }
                    ];
                    
                    this.init();
                }
                
                init() {
                    this.setupCertificationCards();
                    this.setupModal();
                }
                
                setupCertificationCards() {
                    // Event listeners para certificaciones
                    document.querySelectorAll('.cert-card').forEach(card => {
                        // Efecto de atenuación al pasar el mouse
                        card.addEventListener('mouseover', () => {
                            document.querySelectorAll('.cert-card').forEach(otherCard => {
                                if (otherCard !== card) {
                                    otherCard.classList.add('attenuated');
                                }
                            });
                        });
                        
                        card.addEventListener('mouseout', () => {
                            document.querySelectorAll('.cert-card').forEach(otherCard => {
                                otherCard.classList.remove('attenuated');
                            });
                        });

                        // Click para abrir modal
                        card.addEventListener('click', () => {
                            const certId = card.dataset.certId;
                            if (!certId) {
                                console.warn('No se encontró data-cert-id en la tarjeta');
                                return;
                            }

                            const selectedCert = this.certData.find(cert => cert.id === certId);
                            if (selectedCert) {
                                const success = this.updateModalWithCertData(selectedCert, certId);
                                if (success) {
                                    const modalOverlay = this.getElement('certModalOverlay');
                                    if (modalOverlay) {
                                        modalOverlay.classList.add('active');
                                        document.body.style.overflow = 'hidden';
                                    }
                                }
                            } else {
                                console.warn(`Certificación con ID '${certId}' no encontrada en certData`);
                            }
                        });
                    });
                }
                
                setupModal() {
                    // Cerrar modal
                    const closeModalButton = this.getElement('closeModalButton');
                    const modalOverlay = this.getElement('certModalOverlay');
                    
                    if (closeModalButton && modalOverlay) {
                        closeModalButton.addEventListener('click', () => {
                            modalOverlay.classList.remove('active');
                            document.body.style.overflow = '';
                        });
                        
                        modalOverlay.addEventListener('click', (e) => {
                            if (e.target === modalOverlay) {
                                modalOverlay.classList.remove('active');
                                document.body.style.overflow = '';
                            }
                        });
                    }
                }
                
                // Función segura para obtener elementos del DOM
                getElement(id) {
                    const element = document.getElementById(id);
                    if (!element) {
                        console.warn(`Elemento con ID '${id}' no encontrado`);
                        return null;
                    }
                    return element;
                }
                
                // Función para actualizar modal con datos
                updateModalWithCertData(selectedCert, certId) {
                    try {
                        // Información básica
                        const modalLogo = this.getElement('modalLogo');
                        const modalTitle = this.getElement('modalTitle');
                        const modalDate = this.getElement('modalDate');
                        const modalCertImage = this.getElement('modalCertImage');
                        const modalDescription = this.getElement('modalDescription');
                        const modalVerifyButton = this.getElement('modalVerifyButton');

                        if (modalLogo) modalLogo.src = selectedCert.logo || '';
                        if (modalTitle) modalTitle.textContent = selectedCert.title || '';
                        if (modalDate) modalDate.textContent = selectedCert.date || '';
                        if (modalCertImage) modalCertImage.src = selectedCert.image || '';
                        if (modalDescription) modalDescription.textContent = selectedCert.description || '';
                        if (modalVerifyButton) modalVerifyButton.href = selectedCert.verifyLink || '#';

                        // Detalles profesionales
                        const modalCertId = this.getElement('modalCertId');
                        const modalValidUntil = this.getElement('modalValidUntil');
                        const modalLevel = this.getElement('modalLevel');
                        const modalStudyHours = this.getElement('modalStudyHours');

                        if (modalCertId) modalCertId.textContent = selectedCert.certId || 'CERT-' + certId.toUpperCase();
                        if (modalValidUntil) modalValidUntil.textContent = selectedCert.validUntil || 'Diciembre 2025';
                        if (modalLevel) modalLevel.textContent = selectedCert.level || 'Profesional';
                        if (modalStudyHours) modalStudyHours.textContent = selectedCert.studyHours || '120 horas';

                        // Botón de descarga
                        const downloadBtn = this.getElement('modalDownloadButton');
                        if (downloadBtn) {
                            downloadBtn.href = selectedCert.downloadLink || '#';
                            downloadBtn.style.display = selectedCert.downloadLink ? 'flex' : 'none';
                        }

                        // Skills con animación
                        const modalSkills = this.getElement('modalSkills');
                        if (modalSkills) {
                            modalSkills.innerHTML = '';
                            (selectedCert.skills || []).forEach((skill, index) => {
                                const span = document.createElement('span');
                                span.classList.add('skill-tag');
                                span.textContent = skill;
                                span.style.opacity = '0';
                                span.style.transform = 'translateY(10px)';
                                modalSkills.appendChild(span);

                                // Animación escalonada
                                setTimeout(() => {
                                    span.style.transition = 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
                                    span.style.opacity = '1';
                                    span.style.transform = 'translateY(0)';
                                }, index * 100);
                            });
                        }

                        return true;
                    } catch (error) {
                        console.error('Error al actualizar modal:', error);
                        return false;
                    }
                }
            }

            /**
             * Sistema de Ecosistema 3D
             * Maneja la lógica del ecosistema interactivo 3D
             */
            class Ecosystem3D {
                constructor() {
                    this.nodes = {};
                    this.lines = {};
                    this.isMobile = /Mobi|Android/i.test(navigator.userAgent);
                    this.draggableInstance = null;
                    
                    this.init();
                }
                
                init() {
                    // Verificar que los contenedores necesarios existan
                    const ecosystemContainer = document.getElementById('ecosystemContainer');
                    const connectionLines = document.getElementById('connectionLines');
                    
                    if (!ecosystemContainer || !connectionLines) {
                        console.warn('Ecosystem containers not found, skipping initialization');
                        return;
                    }
                    
                    this.createNodes();
                    this.createConnectionLines();
                    this.updateLinePositions();
                    this.setupInteractivity();
                    this.setupAnimations();
                }
                
                createNodes() {
                    // Crear nodos del ecosistema
                    const container = document.getElementById('ecosystemContainer');
                    if (!container) {
                        console.warn('Ecosystem container not found, skipping node creation');
                        return;
                    }
                    
                    const nodeData = [
                        { id: 'aws-sa-pro', x: 20, y: 30, connections: ['scrum-master', 'azure-dp-203', 'terraform-associate', 'docker-certified'] },
                        { id: 'azure-dp-203', x: 80, y: 20, connections: ['aws-sa-pro', 'terraform-associate'] },
                        { id: 'terraform-associate', x: 60, y: 70, connections: ['aws-sa-pro', 'azure-dp-203', 'docker-certified'] },
                        { id: 'docker-certified', x: 40, y: 80, connections: ['aws-sa-pro', 'terraform-associate'] },
                        { id: 'scrum-master', x: 10, y: 60, connections: ['aws-sa-pro', 'google-pm'] },
                        { id: 'google-pm', x: 90, y: 60, connections: ['scrum-master'] }
                    ];
                    
                    nodeData.forEach(nodeInfo => {
                        const node = document.createElement('div');
                        node.className = 'ecosystem-node';
                        node.id = `node-${nodeInfo.id}`;
                        node.dataset.nodeId = nodeInfo.id;
                        node.style.left = `${nodeInfo.x}%`;
                        node.style.top = `${nodeInfo.y}%`;
                        
                        // Contenido del nodo
                        node.innerHTML = `
                            <img src="https://via.placeholder.com/60x60/1A1A1A/FFFFFF?text=${nodeInfo.id.charAt(0).toUpperCase()}" alt="${nodeInfo.id}">
                            <span class="node-title">${nodeInfo.id.replace('-', ' ').toUpperCase()}</span>
                        `;
                        
                        container.appendChild(node);
                        this.nodes[nodeInfo.id] = node;
                    });
                }
                
                createConnectionLines() {
                    // Crear líneas de conexión entre nodos
                    const svg = document.getElementById('connectionLines');
                    if (!svg) {
                        console.warn('Connection lines SVG not found, skipping line creation');
                        return;
                    }
                    
                    const connectionData = [
                        { from: 'aws-sa-pro', to: 'scrum-master' },
                        { from: 'aws-sa-pro', to: 'azure-dp-203' },
                        { from: 'aws-sa-pro', to: 'terraform-associate' },
                        { from: 'aws-sa-pro', to: 'docker-certified' },
                        { from: 'azure-dp-203', to: 'terraform-associate' },
                        { from: 'terraform-associate', to: 'docker-certified' },
                        { from: 'scrum-master', to: 'google-pm' }
                    ];
                    
                    connectionData.forEach((connection, index) => {
                        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                        line.id = `line-${index}`;
                        line.classList.add('connection-line');
                        line.setAttribute('data-from', connection.from);
                        line.setAttribute('data-to', connection.to);
                        
                        svg.appendChild(line);
                        this.lines[`${connection.from}-${connection.to}`] = line;
                    });
                }
                
                updateLinePositions() {
                    // Actualizar posiciones de las líneas de conexión
                    const container = document.getElementById('ecosystemContainer');
                    if (!container) return;
                    
                    Object.values(this.lines).forEach(line => {
                        if (!line || !line.parentNode) return;
                        
                        const fromId = line.getAttribute('data-from');
                        const toId = line.getAttribute('data-to');
                        
                        const fromNode = this.nodes[fromId];
                        const toNode = this.nodes[toId];
                        
                        if (fromNode && toNode && fromNode.parentNode && toNode.parentNode) {
                            const fromRect = fromNode.getBoundingClientRect();
                            const toRect = toNode.getBoundingClientRect();
                            const containerRect = container.getBoundingClientRect();
                            
                            if (containerRect && fromRect && toRect) {
                                const fromX = fromRect.left + fromRect.width / 2 - containerRect.left;
                                const fromY = fromRect.top + fromRect.height / 2 - containerRect.top;
                                const toX = toRect.left + toRect.width / 2 - containerRect.left;
                                const toY = toRect.top + toRect.height / 2 - containerRect.top;
                                
                                line.setAttribute('x1', fromX);
                                line.setAttribute('y1', fromY);
                                line.setAttribute('x2', toX);
                                line.setAttribute('y2', toY);
                            }
                        }
                    });
                }
                
                setupInteractivity() {
                    // Configurar interactividad de los nodos
                    Object.values(this.nodes).forEach(node => {
                        if (!node || !node.parentNode) return;
                        
                        node.addEventListener('click', () => {
                            this.focusNode(node.dataset.nodeId);
                        });
                        
                        node.addEventListener('mouseenter', () => {
                            this.highlightConnections(node.dataset.nodeId);
                        });
                        
                        node.addEventListener('mouseleave', () => {
                            this.clearHighlights();
                        });
                    });
                }
                
                setupAnimations() {
                    // Animaciones de entrada
                    if (typeof gsap !== 'undefined') {
                        const nodes = Object.values(this.nodes).filter(node => node && node.parentNode);
                        const lines = Object.values(this.lines).filter(line => line && line.parentNode);
                        
                        if (nodes.length > 0) {
                            gsap.fromTo(nodes, 
                                { opacity: 0, scale: 0.5, y: "+=50" },
                                { 
                                    opacity: 1, 
                                    scale: 1, 
                                    y: 0, 
                                    duration: 1, 
                                    ease: "back.out(1.7)", 
                                    stagger: 0.05, 
                                    delay: 0.5 
                                }
                            );
                        }
                        
                        if (lines.length > 0) {
                            gsap.fromTo(lines, 
                                { opacity: 0, strokeWidth: 0 },
                                { 
                                    opacity: 1, 
                                    strokeWidth: 2, 
                                    duration: 1.5, 
                                    delay: 1, 
                                    ease: "power2.out" 
                                }
                            );
                        }
                    }
                }
                
                focusNode(nodeId) {
                    // Enfocar un nodo específico
                    Object.values(this.nodes).forEach(node => {
                        if (!node || !node.parentNode) return;
                        
                        if (node.dataset.nodeId === nodeId) {
                            node.classList.add('focused');
                        } else {
                            node.classList.remove('focused');
                        }
                    });
                }
                
                highlightConnections(nodeId) {
                    // Resaltar conexiones de un nodo
                    Object.values(this.lines).forEach(line => {
                        if (!line || !line.parentNode) return;
                        
                        const fromId = line.getAttribute('data-from');
                        const toId = line.getAttribute('data-to');
                        
                        if (fromId === nodeId || toId === nodeId) {
                            line.classList.add('active');
                        }
                    });
                }
                
                clearHighlights() {
                    // Limpiar resaltados
                    Object.values(this.lines).forEach(line => {
                        if (!line || !line.parentNode) return;
                        line.classList.remove('active');
                    });
                    
                    Object.values(this.nodes).forEach(node => {
                        if (!node || !node.parentNode) return;
                        node.classList.remove('focused');
                    });
                }
            }

            /**
             * Sistema de Formulario de Contacto
             * Maneja la lógica del formulario de contacto
             */
            class ContactForm {
                constructor() {
                    this.form = document.querySelector('.contact-form');
                    this.init();
                }
                
                init() {
                    if (this.form) {
                        this.setupFormValidation();
                        this.setupFormSubmission();
                    }
                }
                
                setupFormValidation() {
                    const inputs = this.form.querySelectorAll('input, textarea');
                    
                    inputs.forEach(input => {
                        input.addEventListener('blur', () => {
                            this.validateField(input);
                        });
                        
                        input.addEventListener('input', () => {
                            this.clearFieldError(input);
                        });
                    });
                }
                
                setupFormSubmission() {
                    this.form.addEventListener('submit', (e) => {
                        e.preventDefault();
                        
                        if (this.validateForm()) {
                            this.submitForm();
                        }
                    });
                }
                
                validateField(field) {
                    const value = field.value.trim();
                    let isValid = true;
                    let errorMessage = '';
                    
                    switch (field.type) {
                        case 'email':
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            isValid = emailRegex.test(value);
                            errorMessage = 'Por favor ingresa un email válido';
                            break;
                            
                        case 'text':
                        case 'textarea':
                            isValid = value.length >= 3;
                            errorMessage = 'Este campo debe tener al menos 3 caracteres';
                            break;
                    }
                    
                    if (!isValid) {
                        this.showFieldError(field, errorMessage);
                    } else {
                        this.clearFieldError(field);
                    }
                    
                    return isValid;
                }
                
                validateForm() {
                    const inputs = this.form.querySelectorAll('input, textarea');
                    let isValid = true;
                    
                    inputs.forEach(input => {
                        if (!this.validateField(input)) {
                            isValid = false;
                        }
                    });
                    
                    return isValid;
                }
                
                showFieldError(field, message) {
                    this.clearFieldError(field);
                    
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'field-error';
                    errorDiv.textContent = message;
                    
                    field.classList.add('error');
                    field.parentNode.appendChild(errorDiv);
                }
                
                clearFieldError(field) {
                    field.classList.remove('error');
                    const errorDiv = field.parentNode.querySelector('.field-error');
                    if (errorDiv) {
                        errorDiv.remove();
                    }
                }
                
                async submitForm() {
                    const formData = new FormData(this.form);
                    const submitButton = this.form.querySelector('button[type="submit"]');
                    
                    // Mostrar estado de carga
                    submitButton.disabled = true;
                    submitButton.textContent = 'Enviando...';
                    
                    try {
                        // Simular envío (aquí iría la lógica real de envío)
                        await new Promise(resolve => setTimeout(resolve, 2000));
                        
                        this.showSuccessMessage();
                        this.form.reset();
                        
                    } catch (error) {
                        this.showErrorMessage();
                    } finally {
                        submitButton.disabled = false;
                        submitButton.textContent = 'Enviar Mensaje';
                    }
                }
                
                showSuccessMessage() {
                    const message = document.createElement('div');
                    message.className = 'form-message success';
                    message.textContent = '¡Mensaje enviado exitosamente! Te responderé pronto.';
                    
                    this.form.appendChild(message);
                    
                    setTimeout(() => {
                        message.remove();
                    }, 5000);
                }
                
                showErrorMessage() {
                    const message = document.createElement('div');
                    message.className = 'form-message error';
                    message.textContent = 'Hubo un error al enviar el mensaje. Por favor intenta nuevamente.';
                    
                    this.form.appendChild(message);
                    
                    setTimeout(() => {
                        message.remove();
                    }, 5000);
                }
            }





            /**
             * Inicialización de todos los sistemas
             */
            function initializeSystems() {
                // Inicializar sistemas principales
                const certificationsSystem = new CertificationsSystem();
                const ecosystem3D = new Ecosystem3D();
                const contactForm = new ContactForm();
                
                // Configurar GSAP si está disponible
                if (typeof gsap !== 'undefined') {
                    gsap.registerPlugin(ScrollTrigger);
                    
                    // Animaciones de scroll
                    gsap.utils.toArray('.animate-on-scroll').forEach(element => {
                        gsap.from(element, {
                            scrollTrigger: {
                                trigger: element,
                                start: 'top 80%',
                                end: 'bottom 20%',
                                toggleActions: 'play none none reverse'
                            },
                            y: 50,
                            opacity: 0,
                            duration: 1,
                            ease: 'power2.out'
                        });
                    });
                }
                
                console.log('Sistemas del portafolio inicializados correctamente');
            }

            // Inicializar todos los sistemas
            initializeSystems();
        });
    
// === SCRAMBLE TEXT EFFECT FOR NAV MENU ===
function scrambleText(element, originalText, scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*', speed = 30, rounds = 8) {
    // Fijar el ancho actual para evitar "temblor"
    const originalWidth = element.offsetWidth;
    element.style.display = 'inline-block';
    element.style.width = originalWidth + 'px';
    let iteration = 0;
    let scrambled = '';
    let interval = setInterval(() => {
        scrambled = '';
        for (let i = 0; i < originalText.length; i++) {
            if (iteration > rounds || originalText[i] === ' ') {
                scrambled += originalText[i];
            } else {
                scrambled += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            }
        }
        element.textContent = scrambled;
        iteration++;
        if (iteration > rounds) {
            clearInterval(interval);
            element.textContent = originalText;
            // Restaurar el ancho
            element.style.width = '';
            element.style.display = '';
        }
    }, speed);
}

// Aplica el efecto a todos los .nav-link
const navLinks = document.querySelectorAll('.main-nav .nav-link');
navLinks.forEach(link => {
    const original = link.textContent;
    link.addEventListener('mouseenter', () => {
        scrambleText(link, original);
    });
    // Opcional: re-scramble al salir
    // link.addEventListener('mouseleave', () => {
    //     scrambleText(link, original);
    // });
});

// === MENÚ HAMBURGUESA Y OVERLAY ===
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.getElementById('mobile-nav-overlay');
    const navLinksMobile = document.querySelectorAll('.mobile-nav .mobile-nav-link');

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function openMobileMenu() {
        hamburger.classList.add('active');
        mobileNav.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('📱 Menú móvil abierto');
        
        // Animación mejorada para las secciones del menú móvil
        const mobileNavSections = document.querySelectorAll('.mobile-nav-section');
        mobileNavSections.forEach((section, index) => {
            section.style.animationDelay = `${0.1 + (index * 0.1)}s`;
            section.style.animation = 'mobileSlideInUp 0.6s ease forwards';
        });
    }

    function smoothScrollTo(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const headerHeight = document.querySelector('.main-header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            console.log('🎯 Scrolling to:', targetId, 'Position:', targetPosition);
            
            // Verificar soporte para scroll suave
            if ('scrollBehavior' in document.documentElement.style) {
                // Navegadores modernos
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } else {
                // Fallback para navegadores antiguos
                window.scrollTo(0, targetPosition);
            }
        } else {
            console.warn('❌ Sección no encontrada:', targetId);
        }
    }

    // Función mejorada para scroll con animación personalizada
    function smoothScrollWithAnimation(targetId) {
        const targetSection = document.querySelector(targetId);
        if (!targetSection) {
            console.warn('❌ Sección no encontrada:', targetId);
            return;
        }

        const headerHeight = document.querySelector('.main-header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800; // 800ms
        let start = null;

        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Función de easing para animación suave
        function easeInOutCubic(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        }

        requestAnimationFrame(animation);
    }

    // Limpiar cualquier evento existente que pueda interferir
    function clearExistingEvents() {
        const existingHamburger = document.querySelector('.hamburger');
        if (existingHamburger) {
            const newHamburger = existingHamburger.cloneNode(true);
            existingHamburger.parentNode.replaceChild(newHamburger, existingHamburger);
            return newHamburger;
        }
        return existingHamburger;
    }

    if (hamburger && mobileNav && overlay) {
        console.log('✅ Elementos del menú móvil encontrados');
        
        // Limpiar eventos existentes
        const cleanHamburger = clearExistingEvents();
        
        cleanHamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('🍔 Hamburger clicked');
            
            const isActive = cleanHamburger.classList.contains('active');
            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
        
        overlay.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('🖱️ Overlay clicked');
            closeMobileMenu();
        });
        
        navLinksMobile.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🔗 Link clicked:', link.getAttribute('href'));
                
                // Cerrar el menú primero
                closeMobileMenu();
                
                // Navegar a la sección después de un pequeño delay
                setTimeout(() => {
                    const targetId = link.getAttribute('href');
                    if (targetId && targetId !== '#') {
                        console.log('🎯 Navegando a:', targetId);
                        smoothScrollWithAnimation(targetId);
                    }
                }, 150);
            });
        });
        
        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && hamburger.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Prevenir scroll cuando el menú móvil está abierto
        document.addEventListener('touchmove', (e) => {
            if (hamburger.classList.contains('active')) {
                e.preventDefault();
            }
        }, { passive: false });
        
    } else {
        console.warn('❌ Algunos elementos del menú móvil no se encontraron:', {
            hamburger: !!hamburger,
            mainNav: !!mainNav,
            overlay: !!overlay
        });
    }
}

// Inicializar el menú móvil cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
}

// === NAVEGACIÓN SUAVE PARA TODOS LOS LINKS ===
function initSmoothNavigation() {
    const allNavLinks = document.querySelectorAll('.nav-link');
    
    allNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId !== '#') {
                e.preventDefault();
                console.log('🔗 Desktop link clicked:', targetId);
                smoothScrollWithAnimation(targetId);
            }
        });
    });
}

// Inicializar navegación suave
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSmoothNavigation);
} else {
    initSmoothNavigation();
}

// === VERIFICACIÓN DE SECCIONES ===
function verifySections() {
    const sections = [
        '#about',
        '#skills', 
        '#services',
        '#process',
        '#portfolio',
        '#testimonials',
        '#faq',
        '#contact-form'
    ];
    
    console.log('🔍 Verificando secciones...');
    sections.forEach(sectionId => {
        const section = document.querySelector(sectionId);
        if (section) {
            console.log(`✅ ${sectionId} - Encontrada`);
        } else {
            console.warn(`❌ ${sectionId} - NO ENCONTRADA`);
        }
    });
}

// Verificar secciones cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', verifySections);
} else {
    verifySections();
}
    