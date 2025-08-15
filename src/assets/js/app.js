/**
 * INMORTAL_OS Portfolio - Archivo JavaScript Consolidado
 * Combina toda la funcionalidad del portafolio en un solo archivo
 * Versión: 3.0
 * Fecha: 2025
 */

// ========================================================
// 1. UTILIDADES DE SEGURIDAD
// ========================================================

// Importar mathjs para reemplazar eval
import * as math from 'https://cdn.jsdelivr.net/npm/mathjs@12.3.1/+esm';

// Importar DOMPurify para sanitización
import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@3.0.8/+esm';

/**
 * Clase para manejo seguro de cookies
 */
class SecureCookieManager {
    constructor() {
        this.domain = '.github.io';
        this.secure = true;
        this.sameSite = 'strict';
        this.maxAge = 86400000; // 24 horas
    }

    setCookie(name, value, options = {}) {
        const cookieOptions = {
            domain: this.domain,
            secure: this.secure,
            sameSite: this.sameSite,
            maxAge: this.maxAge,
            path: '/',
            ...options
        };

        let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
        
        if (cookieOptions.domain) cookieString += `; domain=${cookieOptions.domain}`;
        if (cookieOptions.path) cookieString += `; path=${cookieOptions.path}`;
        if (cookieOptions.maxAge) cookieString += `; max-age=${cookieOptions.maxAge}`;
        if (cookieOptions.secure) cookieString += '; secure';
        if (cookieOptions.sameSite) cookieString += `; samesite=${cookieOptions.sameSite}`;

        document.cookie = cookieString;
    }

    getCookie(name) {
        const nameEQ = encodeURIComponent(name) + "=";
        const ca = document.cookie.split(';');
        
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) {
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
            }
        }
        return null;
    }

    deleteCookie(name) {
        this.setCookie(name, '', { maxAge: -1 });
    }
}

/**
 * Clase para sanitización segura de contenido
 */
class ContentSanitizer {
    constructor() {
        this.domPurify = DOMPurify;
        this.configureDOMPurify();
    }

    configureDOMPurify() {
        this.domPurify.setConfig({
            ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'span', 'div'],
            ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'id'],
            ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
            FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input'],
            FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur']
        });
    }

    sanitizeHTML(html) {
        return this.domPurify.sanitize(html);
    }

    sanitizeURL(url) {
        return this.domPurify.sanitize(url, { ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i });
    }
}

// ========================================================
// 2. MANIPULACIÓN SEGURA DEL DOM
// ========================================================

/**
 * Clase para manipulación segura del DOM
 */
class SafeDOMUtils {
    constructor() {
        this.domPurify = DOMPurify;
        this.configureSanitizer();
    }

    configureSanitizer() {
        if (this.domPurify) {
            this.domPurify.setConfig({
                ALLOWED_TAGS: [
                    'b', 'i', 'em', 'strong', 'a', 'p', 'br', 'span', 'div',
                    'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                    'table', 'thead', 'tbody', 'tr', 'td', 'th', 'caption',
                    'blockquote', 'code', 'pre', 'mark', 'small', 'sub', 'sup'
                ],
                ALLOWED_ATTR: [
                    'href', 'target', 'rel', 'class', 'id', 'title', 'alt',
                    'width', 'height', 'style', 'data-*'
                ],
                ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
                FORBID_TAGS: [
                    'script', 'style', 'iframe', 'object', 'embed', 'form',
                    'input', 'textarea', 'select', 'button', 'label'
                ],
                FORBID_ATTR: [
                    'onerror', 'onload', 'onclick', 'onmouseover', 'onfocus',
                    'onblur', 'onchange', 'onsubmit', 'onreset', 'onselect',
                    'onunload', 'onbeforeunload', 'onresize', 'onscroll'
                ]
            });
        }
    }

    setSafeContent(element, content, allowHTML = false) {
        if (!element) {
            console.error('❌ Elemento no válido para setSafeContent');
            return;
        }

        try {
            if (allowHTML && this.domPurify) {
                const sanitized = this.domPurify.sanitize(content);
                element.innerHTML = sanitized;
            } else {
                element.textContent = content;
            }
        } catch (error) {
            console.error('❌ Error en setSafeContent:', error);
            element.textContent = content;
        }
    }

    createSafeElement(html) {
        if (!this.domPurify) {
            const temp = document.createElement('div');
            temp.textContent = html;
            return temp;
        }

        try {
            const sanitized = this.domPurify.sanitize(html);
            const template = document.createElement('template');
            template.innerHTML = sanitized;
            return template.content;
        } catch (error) {
            console.error('❌ Error en createSafeElement:', error);
            const temp = document.createElement('div');
            temp.textContent = html;
            return temp;
        }
    }
}

// ========================================================
// 3. MIGRACIÓN DE LOCALSTORAGE
// ========================================================

const COOKIE_CONFIG = {
    domain: '.github.io',
    secure: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000,
    path: '/'
};

const MIGRATION_MAP = new Map([
    ['isAudioEnabled', 'audio_enabled'],
    ['menuMuted', 'menu_muted'],
    ['dashboardMuted', 'dashboard_muted'],
    ['theme', 'app_theme'],
    ['themePrimaryColor', 'theme_primary'],
    ['themeSecondaryColor', 'theme_secondary'],
    ['themeAccentColor', 'theme_accent'],
    ['highContrast', 'high_contrast'],
    ['volume', 'audio_volume'],
    ['playlistData', 'playlist_data'],
    ['selectedItemId_projects', 'selected_project_id'],
    ['selectedItemId_missions', 'selected_mission_id'],
    ['selectedMissionId', 'selected_mission'],
    ['projectOrder', 'project_order'],
    ['achievements', 'user_achievements'],
    ['animationsEnabled', 'animations_enabled'],
    ['soundNotificationsEnabled', 'sound_notifications'],
    ['vibrationEnabled', 'vibration_enabled'],
    ['layoutDragEnabled', 'layout_drag_enabled'],
    ['animationSpeedFactor', 'animation_speed'],
    ['tutorialShown', 'tutorial_shown'],
    ['cyberToolsSettings', 'cyber_tools_settings'],
    ['phonkPrompts', 'phonk_prompts']
]);

class LocalStorageMigrator {
    constructor() {
        this.migrationMap = MIGRATION_MAP;
        this.cookieConfig = COOKIE_CONFIG;
    }

    migrateValue(localStorageKey, defaultValue = '') {
        const cookieKey = this.migrationMap.get(localStorageKey);
        if (!cookieKey) return defaultValue;
        
        let value = this.getCookie(cookieKey);
        if (value === null) {
            const localValue = localStorage.getItem(localStorageKey);
            if (localValue !== null) {
                value = localValue;
                this.setCookie(cookieKey, value);
                localStorage.removeItem(localStorageKey);
                console.log(`🔄 Migrado: ${localStorageKey} -> ${cookieKey}`);
            }
        }
        return value !== null ? value : defaultValue;
    }

    setSecureValue(localStorageKey, value) {
        const cookieKey = this.migrationMap.get(localStorageKey);
        if (cookieKey) {
            this.setCookie(cookieKey, value);
        }
    }

    getSecureValue(localStorageKey, defaultValue = '') {
        return this.migrateValue(localStorageKey, defaultValue);
    }

    setCookie(name, value) {
        let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
        if (this.cookieConfig.domain) cookieString += `; domain=${this.cookieConfig.domain}`;
        if (this.cookieConfig.path) cookieString += `; path=${this.cookieConfig.path}`;
        if (this.cookieConfig.maxAge) cookieString += `; max-age=${this.cookieConfig.maxAge}`;
        if (this.cookieConfig.secure) cookieString += '; secure';
        if (this.cookieConfig.sameSite) cookieString += `; samesite=${this.cookieConfig.sameSite}`;
        document.cookie = cookieString;
    }

    getCookie(name) {
        const nameEQ = encodeURIComponent(name) + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) {
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
            }
        }
        return null;
    }

    deleteCookie(name) {
        this.setCookie(name, '', { maxAge: -1 });
    }
}

// ========================================================
// 4. SEGURIDAD DE FORMULARIOS
// ========================================================

class FormDataSecurity {
    constructor() {
        this.cryptoAvailable = typeof crypto !== 'undefined' && crypto.getRandomValues;
        this.nodeCryptoAvailable = typeof require !== 'undefined' && require('crypto');
        this.securityConfig = {
            maxBoundaryLength: 70,
            minBoundaryLength: 20,
            allowedSchemes: ['http', 'https', 'mailto', 'tel'],
            maxUrlLength: 2048,
            maxFormDataSize: 10 * 1024 * 1024
        };
    }

    generateSecureBoundary() {
        let boundary;
        if (this.cryptoAvailable) {
            const array = new Uint8Array(32);
            crypto.getRandomValues(array);
            boundary = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
        } else if (this.nodeCryptoAvailable) {
            const crypto = require('crypto');
            boundary = crypto.randomBytes(32).toString('hex');
        } else {
            boundary = this.generateFallbackBoundary();
        }
        boundary = '----WebKitFormBoundary' + boundary.substring(0, 16);
        return boundary;
    }

    generateFallbackBoundary() {
        const timestamp = Date.now().toString(36);
        const performance = performance.now().toString(36);
        const userAgent = navigator.userAgent.length.toString(36);
        const screenRes = (screen.width * screen.height).toString(36);
        const entropy = timestamp + performance + userAgent + screenRes;
        let hash = 0;
        for (let i = 0; i < entropy.length; i++) {
            const char = entropy.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(36) + entropy.substring(0, 8);
    }

    validateBoundary(boundary) {
        if (typeof boundary !== 'string') {
            return false;
        }
        if (boundary.length < this.securityConfig.minBoundaryLength ||
            boundary.length > this.securityConfig.maxBoundaryLength) {
            return false;
        }
        const dangerousChars = /[<>\"'&]/;
        if (dangerousChars.test(boundary)) {
            return false;
        }
        return true;
    }

    validateUrl(url) {
        if (typeof url !== 'string') {
            return {
                isValid: false,
                error: 'URL debe ser una cadena de texto'
            };
        }
        if (url.length > this.securityConfig.maxUrlLength) {
            return {
                isValid: false,
                error: 'URL demasiado larga'
            };
        }
        try {
            const urlObj = new URL(url);
            if (!this.securityConfig.allowedSchemes.includes(urlObj.protocol.replace(':', ''))) {
                return {
                    isValid: false,
                    error: `Esquema no permitido: ${urlObj.protocol}`
                };
            }
            const lowerUrl = url.toLowerCase();
            if (lowerUrl.startsWith('javascript:') ||
                lowerUrl.startsWith('data:') ||
                lowerUrl.startsWith('vbscript:') ||
                lowerUrl.startsWith('file:')) {
                return {
                    isValid: false,
                    error: 'URL contiene esquema peligroso'
                };
            }
            return {
                isValid: true,
                url: urlObj.href,
                protocol: urlObj.protocol,
                hostname: urlObj.hostname
            };
        } catch (error) {
            return {
                isValid: false,
                error: 'Formato de URL inválido'
            };
        }
    }
}

// ========================================================
// 5. SISTEMA PRINCIPAL DE LA APLICACIÓN
// ========================================================

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
            // Efectos de sonido para hover
            const hoverElements = document.querySelectorAll('.skill-item, .portfolio-card, .testimonial-card');
            hoverElements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    if (this.isAudioEnabled) {
                        this.playSoundEffect('hover');
                    }
                });
            });
        }
        
        setupClickEffects() {
            // Efectos de sonido para clicks
            const clickElements = document.querySelectorAll('.cta-button, .nav-link, .hamburger');
            clickElements.forEach(element => {
                element.addEventListener('click', () => {
                    if (this.isAudioEnabled) {
                        this.playSoundEffect('click');
                    }
                });
            });
        }
        
        setupAccordionEffects() {
            // Efectos de sonido para acordeones
            const accordionElements = document.querySelectorAll('.faq-item, .service-item');
            accordionElements.forEach(element => {
                element.addEventListener('click', () => {
                    if (this.isAudioEnabled) {
                        this.playSoundEffect('accordion');
                    }
                });
            });
        }
        
        setupNavigationEffects() {
            // Efectos de sonido para navegación
            const navElements = document.querySelectorAll('.nav-link, .dropdown-toggle');
            navElements.forEach(element => {
                element.addEventListener('click', () => {
                    if (this.isAudioEnabled) {
                        this.playSoundEffect('navigation');
                    }
                });
            });
        }
        
        setupFormEffects() {
            // Efectos de sonido para formularios
            const formElements = document.querySelectorAll('input, textarea, select');
            formElements.forEach(element => {
                element.addEventListener('focus', () => {
                    if (this.isAudioEnabled) {
                        this.playSoundEffect('focus');
                    }
                });
                
                element.addEventListener('blur', () => {
                    if (this.isAudioEnabled) {
                        this.playSoundEffect('blur');
                    }
                });
            });
        }
        
        setupTooltipEffects() {
            // Efectos de sonido para tooltips
            const tooltipElements = document.querySelectorAll('.skill-item');
            tooltipElements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    if (this.isAudioEnabled) {
                        this.playSoundEffect('tooltip');
                    }
                });
            });
        }
        
        playSoundEffect(type) {
            // Buscar el elemento de audio correspondiente
            const audioElement = document.querySelector(`#${type}-sound`);
            if (audioElement) {
                audioElement.currentTime = 0;
                audioElement.play().catch(e => console.log('Sound effect failed:', e));
            }
        }
    }

    /**
     * Gestor de UI Principal
     * Maneja toda la interfaz de usuario del portafolio
     */
    class UIManager {
        constructor() {
            this.audioSystem = null;
            this.currentSection = 'hero';
            this.isMenuOpen = false;
            this.isScrolling = false;
            
            this.init();
        }
        
        init() {
            this.setupAudioSystem();
            this.setupNavigation();
            this.setupMobileMenu();
            this.setupScrollEffects();
            this.setupAnimations();
            this.setupPortfolio();
            this.setupTestimonials();
            this.setupFAQ();
            this.setupContactForm();
            this.setupThreeJS();
            this.setupGSAP();
        }
        
        setupAudioSystem() {
            this.audioSystem = new AudioSystem(this);
        }
        
        setupNavigation() {
            // Navegación suave
            const navLinks = document.querySelectorAll('a[href^="#"]');
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        // Actualizar navegación activa
                        this.updateActiveNavigation(targetId);
                    }
                });
            });
        }
        
        setupMobileMenu() {
            const hamburger = document.querySelector('.hamburger');
            const mobileNav = document.querySelector('.mobile-nav');
            
            if (hamburger && mobileNav) {
                hamburger.addEventListener('click', () => {
                    this.isMenuOpen = !this.isMenuOpen;
                    mobileNav.classList.toggle('active', this.isMenuOpen);
                    hamburger.classList.toggle('active', this.isMenuOpen);
                    
                    // Efecto de sonido
                    if (this.audioSystem && this.audioSystem.isAudioEnabled) {
                        this.audioSystem.playSoundEffect('menu');
                    }
                });
            }
        }
        
        setupScrollEffects() {
            // Efectos de scroll con throttling
            let ticking = false;
            
            const updateScrollEffects = () => {
                this.updateParallax();
                this.updateScrollProgress();
                this.updateActiveSection();
                ticking = false;
            };
            
            const requestTick = () => {
                if (!ticking) {
                    requestAnimationFrame(updateScrollEffects);
                    ticking = true;
                }
            };
            
            window.addEventListener('scroll', requestTick, { passive: true });
        }
        
        setupAnimations() {
            // Animaciones con Intersection Observer
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, observerOptions);
            
            // Observar elementos animables
            const animatableElements = document.querySelectorAll('.reveal-up, .fade-in, .slide-in');
            animatableElements.forEach(el => observer.observe(el));
        }
        
        setupPortfolio() {
            // Sistema de portafolio interactivo
            const portfolioCards = document.querySelectorAll('.portfolio-card');
            const portfolioContainer = document.getElementById('portfolio-container');
            
            if (portfolioContainer) {
                // Navegación del portafolio
                const prevBtn = portfolioContainer.querySelector('.nav-arrow.prev');
                const nextBtn = portfolioContainer.querySelector('.nav-arrow.next');
                
                if (prevBtn && nextBtn) {
                    prevBtn.addEventListener('click', () => this.navigatePortfolio('prev'));
                    nextBtn.addEventListener('click', () => this.navigatePortfolio('next'));
                }
            }
            
            // Efectos hover para tarjetas
            portfolioCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.classList.add('hover');
                });
                
                card.addEventListener('mouseleave', () => {
                    card.classList.remove('hover');
                });
            });
        }
        
        setupTestimonials() {
            // Sistema de testimonios
            const testimonialCards = document.querySelectorAll('.testimonial-card');
            let currentIndex = 0;
            
            // Auto-rotación de testimonios
            setInterval(() => {
                this.rotateTestimonials();
            }, 5000);
            
            // Controles manuales
            const prevBtn = document.querySelector('.testimonials-controls .control-btn.prev');
            const nextBtn = document.querySelector('.testimonials-controls .control-btn.next');
            
            if (prevBtn) prevBtn.addEventListener('click', () => this.rotateTestimonials('prev'));
            if (nextBtn) nextBtn.addEventListener('click', () => this.rotateTestimonials('next'));
        }
        
        setupFAQ() {
            // Sistema de FAQ acordeón
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                const answer = item.querySelector('.faq-answer');
                const toggleIcon = item.querySelector('.faq-toggle-icon');
                
                if (question && answer) {
                    question.addEventListener('click', () => {
                        const isActive = item.classList.contains('active');
                        
                        // Cerrar todos los otros items
                        faqItems.forEach(otherItem => {
                            if (otherItem !== item) {
                                otherItem.classList.remove('active');
                                const otherAnswer = otherItem.querySelector('.faq-answer');
                                if (otherAnswer) {
                                    otherAnswer.style.maxHeight = '0';
                                }
                            }
                        });
                        
                        // Toggle del item actual
                        item.classList.toggle('active');
                        
                        if (item.classList.contains('active')) {
                            answer.style.maxHeight = answer.scrollHeight + 'px';
                            if (toggleIcon) toggleIcon.style.transform = 'rotate(45deg)';
                        } else {
                            answer.style.maxHeight = '0';
                            if (toggleIcon) toggleIcon.style.transform = 'rotate(0deg)';
                        }
                    });
                }
            });
        }
        
        setupContactForm() {
            // Sistema de formulario de contacto
            const contactForm = document.getElementById('contact-form');
            
            if (contactForm) {
                const form = contactForm.querySelector('form');
                const submitBtn = form.querySelector('.submit-button');
                const formStatus = form.querySelector('.form-status');
                
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    
                    if (submitBtn) {
                        submitBtn.disabled = true;
                        submitBtn.innerHTML = '<span class="btn-loading"><span class="spinner">⏳</span> Enviando...</span>';
                    }
                    
                    try {
                        // Simular envío (reemplazar con lógica real)
                        await new Promise(resolve => setTimeout(resolve, 2000));
                        
                        if (formStatus) {
                            formStatus.textContent = '¡Mensaje enviado con éxito!';
                            formStatus.className = 'form-status success';
                            formStatus.style.display = 'block';
                        }
                        
                        form.reset();
                        
                    } catch (error) {
                        if (formStatus) {
                            formStatus.textContent = 'Error al enviar el mensaje. Inténtalo de nuevo.';
                            formStatus.className = 'form-status error';
                            formStatus.style.display = 'block';
                        }
                    } finally {
                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = 'Enviar Mensaje';
                        }
                    }
                });
            }
        }
        
        setupThreeJS() {
            // Configuración de Three.js para efectos 3D
            if (typeof THREE !== 'undefined') {
                this.initThreeJS();
            }
        }
        
        setupGSAP() {
            // Configuración de GSAP para animaciones avanzadas
            if (typeof gsap !== 'undefined') {
                this.initGSAP();
            }
        }
        
        // Métodos auxiliares
        updateActiveNavigation(sectionId) {
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === sectionId) {
                    link.classList.add('active');
                }
            });
        }
        
        navigatePortfolio(direction) {
            // Lógica de navegación del portafolio
            console.log(`Navegando portafolio: ${direction}`);
        }
        
        rotateTestimonials(direction = 'next') {
            // Lógica de rotación de testimonios
            console.log(`Rotando testimonios: ${direction}`);
        }
        
        initThreeJS() {
            // Inicialización de Three.js
            console.log('Three.js inicializado');
        }
        
        initGSAP() {
            // Inicialización de GSAP
            console.log('GSAP inicializado');
        }
    }

    // Inicializar la aplicación
    const app = new UIManager();
    
    // Hacer disponible globalmente para debugging
    window.INMORTAL_OS_APP = app;
    
    console.log('✅ INMORTAL_OS Portfolio inicializado correctamente');
});

// ========================================================
// 6. FUNCIONES GLOBALES Y UTILIDADES
// ========================================================

// Navegación suave
function initSmoothNavigation() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    console.log('✅ Navegación suave inicializada');
}

// Dropdowns
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Cerrar otros dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.querySelector('.dropdown-menu').classList.remove('active');
                    }
                });
                
                // Toggle del dropdown actual
                menu.classList.toggle('active');
            });
        }
    });
    
    // Cerrar dropdowns al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-dropdown')) {
            dropdowns.forEach(dropdown => {
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) menu.classList.remove('active');
            });
        }
    });
    
    console.log('✅ Dropdowns inicializados');
}

// Inicializar navegación suave y dropdowns
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initSmoothNavigation();
        initDropdowns();
    });
} else {
    initSmoothNavigation();
    initDropdowns();
}

// Verificación de secciones
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

// Función global de scroll suave con animación
function smoothScrollWithAnimation(targetPosition) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;

    const easeInOutCubic = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    };

    const animation = (currentTime) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
}

// Exportar para uso en módulos
export {
    SecureCookieManager,
    ContentSanitizer,
    SafeDOMUtils,
    LocalStorageMigrator,
    FormDataSecurity,
    AudioSystem,
    UIManager
};
