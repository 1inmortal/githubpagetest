/**
 * INMORTAL_OS Performance Optimizer
 * Optimizaciones avanzadas de rendimiento para la web
 * Versión: 2.0
 */

class PerformanceOptimizer {
    constructor() {
        this.isInitialized = false;
        this.observers = new Map();
        this.loadedResources = new Set();
        this.criticalImages = [
            'src/assets/img/ID/1.jpg',
            'src/assets/img/FAVICON/LOGO.png'
        ];
        
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        // Esperar a que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeOptimizations());
        } else {
            this.initializeOptimizations();
        }
        
        this.isInitialized = true;
    }

    initializeOptimizations() {
        this.setupLazyLoading();
        this.setupBackgroundImageLazyLoading();
        this.optimizeImages();
        this.setupResourceHints();
        this.initServiceWorker();
        this.setupCriticalResourceLoading();
        this.monitorPerformance();
        this.optimizeFonts();
    }

    /**
     * Configurar lazy loading para imágenes
     */
    setupLazyLoading() {
        // Configuración del Intersection Observer para lazy loading
        const imageObserverConfig = {
            root: null,
            rootMargin: '50px 0px',
            threshold: 0.01
        };

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, imageObserverConfig);

        this.observers.set('images', imageObserver);

        // Observar todas las imágenes con data-src
        this.observeLazyImages();
        
        // Observar nuevas imágenes que se añadan dinámicamente
        this.setupMutationObserver();
    }

    observeLazyImages() {
        const lazyImages = document.querySelectorAll('img[data-src], img[loading="lazy"]');
        const imageObserver = this.observers.get('images');
        
        lazyImages.forEach(img => {
            // Añadir clase de skeleton mientras carga
            img.classList.add('skeleton');
            imageObserver.observe(img);
        });
    }

    loadImage(img) {
        return new Promise((resolve, reject) => {
            const imageUrl = img.dataset.src || img.src;
            
            // Crear nueva imagen para precargar
            const newImg = new Image();
            
            newImg.onload = () => {
                // Aplicar la imagen cargada
                img.src = imageUrl;
                img.classList.remove('skeleton');
                img.classList.add('loaded');
                
                // Remover data-src después de cargar
                if (img.dataset.src) {
                    delete img.dataset.src;
                }
                
                this.loadedResources.add(imageUrl);
                resolve(img);
            };
            
            newImg.onerror = () => {
                img.classList.remove('skeleton');
                img.classList.add('error');
                console.warn(`Error cargando imagen: ${imageUrl}`);
                reject(new Error(`Failed to load image: ${imageUrl}`));
            };
            
            newImg.src = imageUrl;
        });
    }

    /**
     * Optimizar imágenes existentes
     */
    optimizeImages() {
        const images = document.querySelectorAll('img:not([data-src]):not([loading="lazy"])');
        
        images.forEach(img => {
            // Añadir loading="lazy" a imágenes que no son críticas
            if (!this.criticalImages.includes(img.src)) {
                img.loading = 'lazy';
            }
            
            // Añadir decode="async" para mejor rendimiento
            img.decoding = 'async';
        });
    }

    /**
     * Configurar resource hints dinámicos
     */
    setupResourceHints() {
        // Preconnect a dominios críticos
        const criticalDomains = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com',
            'https://cdnjs.cloudflare.com',
            'https://cdn.jsdelivr.net'
        ];

        criticalDomains.forEach(domain => {
            this.addResourceHint('preconnect', domain);
        });

        // DNS prefetch para dominios secundarios
        const prefetchDomains = [
            '//images.unsplash.com',
            '//upload.wikimedia.org'
        ];

        prefetchDomains.forEach(domain => {
            this.addResourceHint('dns-prefetch', domain);
        });
    }

    addResourceHint(rel, href, crossorigin = false) {
        const link = document.createElement('link');
        link.rel = rel;
        link.href = href;
        if (crossorigin) link.crossOrigin = 'anonymous';
        
        document.head.appendChild(link);
    }

    /**
     * Inicializar Service Worker
     */
    async initServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/src/sw.js');
                console.log('Service Worker registrado:', registration);
                
                // Actualizar SW cuando esté disponible
                registration.addEventListener('updatefound', () => {
                    console.log('Nueva versión del Service Worker disponible');
                });
                
            } catch (error) {
                console.warn('Error registrando Service Worker:', error);
            }
        }
    }

    /**
     * Cargar recursos críticos de forma prioritaria
     */
    setupCriticalResourceLoading() {
        // Precargar imágenes críticas
        this.criticalImages.forEach(imageSrc => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = imageSrc;
            link.as = 'image';
            link.fetchPriority = 'high';
            document.head.appendChild(link);
        });

        // Precargar CSS crítico
        const criticalCSS = [
            'src/assets/css/main.css',
            'src/assets/css/variables.css'
        ];

        criticalCSS.forEach(cssFile => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = cssFile;
            link.as = 'style';
            link.onload = function() {
                this.onload = null;
                this.rel = 'stylesheet';
            };
            document.head.appendChild(link);
        });
    }

    /**
     * Configurar MutationObserver para nuevas imágenes
     */
    setupMutationObserver() {
        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            // Observar nuevas imágenes lazy
                            const lazyImages = node.querySelectorAll ? 
                                node.querySelectorAll('img[data-src], img[loading="lazy"]') : 
                                (node.matches && node.matches('img[data-src], img[loading="lazy"]') ? [node] : []);
                            
                            const imageObserver = this.observers.get('images');
                            lazyImages.forEach(img => {
                                img.classList.add('skeleton');
                                imageObserver.observe(img);
                            });
                        }
                    });
                }
            });
        });

        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });

        this.observers.set('mutations', mutationObserver);
    }

    /**
     * Monitorear métricas de rendimiento
     */
    monitorPerformance() {
        // Web Vitals
        if ('PerformanceObserver' in window) {
            // Largest Contentful Paint (LCP)
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime);
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

            // First Input Delay (FID)
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });

            // Cumulative Layout Shift (CLS)
            const clsObserver = new PerformanceObserver((list) => {
                let clsValue = 0;
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                console.log('CLS:', clsValue);
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
        }

        // Navigation Timing
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Tiempo de carga:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
                console.log('DOMContentLoaded:', perfData.domContentLoadedEventEnd - perfData.fetchStart, 'ms');
            }, 0);
        });
    }

    /**
     * Configurar lazy loading para imágenes de fondo
     */
    setupBackgroundImageLazyLoading() {
        const backgroundSections = document.querySelectorAll('.section-1, .section-2, .section-3, .section-4, .section-5, .section-6, .section-7');
        
        const backgroundObserverConfig = {
            root: null,
            rootMargin: '100px 0px',
            threshold: 0.1
        };

        const backgroundObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const section = entry.target;
                    this.loadBackgroundImage(section);
                    observer.unobserve(section);
                }
            });
        }, backgroundObserverConfig);

        this.observers.set('backgrounds', backgroundObserver);

        backgroundSections.forEach(section => {
            backgroundObserver.observe(section);
        });
    }

    loadBackgroundImage(section) {
        // Obtener la URL de la imagen de fondo desde las clases CSS
        const backgroundUrls = {
            'section-1': 'https://i.pinimg.com/1200x/a5/ca/51/a5ca519d1ce2b61fdfa779c4a428e33f.jpg',
            'section-2': 'https://i.pinimg.com/1200x/ff/3b/2b/ff3b2b07e81f0636eeebee255700ac42.jpg',
            'section-3': 'https://i.pinimg.com/1200x/a5/1d/11/a51d11ee16d57efb9d21b7e4d372abdc.jpg',
            'section-4': 'https://i.pinimg.com/1200x/22/34/8c/22348cd14df60aae68d804dfbad44325.jpg',
            'section-5': 'https://i.pinimg.com/originals/17/f6/ae/17f6aee105b91f8608d517d50077fe3c.gif',
            'section-6': 'https://i.pinimg.com/originals/79/e0/be/79e0bec2053fad1e60df1cca1bb0b83c.gif',
            'section-7': 'https://i.pinimg.com/1200x/00/c6/cb/00c6cbd9e4f01ed7efbd31a47e2527a6.jpg'
        };

        // Encontrar qué sección es
        let sectionClass = null;
        for (let i = 1; i <= 7; i++) {
            if (section.classList.contains(`section-${i}`)) {
                sectionClass = `section-${i}`;
                break;
            }
        }

        if (sectionClass && backgroundUrls[sectionClass]) {
            const imageUrl = backgroundUrls[sectionClass];
            
            // Precargar la imagen
            const img = new Image();
            img.onload = () => {
                // Aplicar la clase 'loaded' para mostrar el fondo
                section.classList.add('loaded');
                this.loadedResources.add(imageUrl);
                console.log(`✅ Fondo cargado: ${sectionClass}`);
            };
            
            img.onerror = () => {
                console.warn(`⚠️ Error cargando fondo: ${sectionClass} - ${imageUrl}`);
                // Mantener el fondo por defecto
            };
            
            img.src = imageUrl;
        }
    }

    /**
     * Optimizar fuentes
     */
    optimizeFonts() {
        // Precargar fuentes críticas
        const criticalFonts = [
            'https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap',
            'https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600&display=swap'
        ];

        criticalFonts.forEach(fontUrl => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = fontUrl;
            link.as = 'style';
            link.onload = function() {
                this.onload = null;
                this.rel = 'stylesheet';
            };
            document.head.appendChild(link);
        });
    }

    /**
     * Limpiar recursos y observers
     */
    destroy() {
        this.observers.forEach((observer) => {
            observer.disconnect();
        });
        this.observers.clear();
        this.loadedResources.clear();
    }
}

// Inicializar el optimizador de rendimiento
const performanceOptimizer = new PerformanceOptimizer();

// Exportar para uso global
window.PerformanceOptimizer = PerformanceOptimizer;
window.performanceOptimizer = performanceOptimizer;
