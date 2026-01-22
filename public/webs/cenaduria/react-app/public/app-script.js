// Evitar ejecución múltiple
if (window.appScriptLoaded) {
    console.log('⚠️ Script ya cargado, evitando duplicación');
} else {
    window.appScriptLoaded = true;
    
    const businessData = {
        menu: [
            { id: 1, name: "Pozole Rojo", desc: "Maíz cacahuazintle, carne de puerco, rábano y lechuga fresca.", cat: "fuertes", price: "$85", img: "https://images.unsplash.com/photo-1599321955726-e04852be82d2?q=80&w=500" },
            { id: 2, name: "Tacos Rojos", desc: "Orden de 5. Papa y zanahoria, queso fresco y salsa de la casa.", cat: "antojitos", price: "$60", img: "https://images.unsplash.com/photo-1552332386-f8dd00d59264?q=80&w=500" },
            { id: 3, name: "Flautas Doradas", desc: "Pollo o deshebrada. Crujientes, con crema de rancho.", cat: "antojitos", price: "$70", img: "https://images.unsplash.com/photo-1568106690101-fd6822e876f6?q=80&w=500" },
            { id: 4, name: "Arroz con Leche", desc: "Receta de la abuela. Canela, pasas y un toque de vainilla.", cat: "postres", price: "$30", img: "https://images.unsplash.com/photo-1547924475-6f7f502c6b41?q=80&w=500" },
            { id: 5, name: "Sopes", desc: "Masa a mano. Frijol, salsa verde y tu guiso favorito.", cat: "antojitos", price: "$25", img: "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?q=80&w=500" },
            { id: 6, name: "Tostada Siberia", desc: "La gigante. Montaña de pollo, aguacate y crema.", cat: "antojitos", price: "$55", img: "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?q=80&w=500" }
        ]
    };

    (function initApp() {
        // Setup Smooth Scroll (Check if Lenis is loaded)
        if (typeof Lenis !== 'undefined') {
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                direction: 'vertical',
                gestureDirection: 'vertical',
                smooth: true,
                mouseMultiplier: 0.8,
                smoothTouch: false,
                touchMultiplier: 2,
                infinite: false,
            });
            
            // Usar solo GSAP ticker para evitar conflictos
            lenis.on('scroll', ScrollTrigger.update);
            
            // Integrar con GSAP ticker (más eficiente que RAF duplicado)
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });
            
            // Habilitar lag smoothing para mejor rendimiento
            gsap.ticker.lagSmoothing(500, 33);
        } else {
            document.documentElement.style.overflow = 'auto';
        }

        renderMenu();
        
        // Solo inicializar cursor y tilt si no es táctil
        const isTouch = window.matchMedia("(pointer: coarse)").matches;
        if (!isTouch) {
            initCustomCursor();
        }

        initLoaderAndHero();
        initScrollAnimations(isTouch);
        if (!isTouch) initTiltEffect();
    })();

    function renderMenu() {
        const grid = document.getElementById('menu-grid');
        if (!grid) {
            console.error('❌ Elemento menu-grid no encontrado');
            return;
        }
        
        businessData.menu.forEach(item => {
            const card = document.createElement('div');
            card.className = `dish-card item-${item.cat}`;
            card.setAttribute('data-cursor', 'hover');
            card.innerHTML = `
                <div class="dish-card-inner">
                    <div class="dish-image-wrapper">
                        <img src="${item.img}" alt="${item.name}" loading="lazy">
                    </div>
                    <h3 class="serif" style="font-size: 1.5rem; color: var(--cream);">${item.name}</h3>
                    <p style="font-size: 0.9rem; opacity: 0.7; margin-top: 0.5rem; line-height: 1.4;">${item.desc}</p>
                    <span class="price">${item.price}</span>
                </div>
            `;
            grid.appendChild(card);
        });
        console.log('✅ Menú renderizado correctamente');
    }

    function splitTextToSpans(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            const text = el.innerText;
            const chars = text.split('').map(char => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
            el.innerHTML = chars;
        });
    }

    function initLoaderAndHero() {
        const tl = gsap.timeline();
        tl.to('.loader-line', { width: '100%', duration: 1.5, ease: 'power2.inOut' })
          .to('.loader-logo', { y: -50, opacity: 0, duration: 0.5 })
          .to('.loader', { yPercent: -100, duration: 1, ease: 'power4.inOut' }, "-=0.2");

        splitTextToSpans('.split-text');
        tl.from('.hero .char', { y: 100, opacity: 0, rotation: 5, duration: 1, stagger: 0.05, ease: 'back.out(1.7)' }, "-=0.5");

        gsap.to('.hero-bg-pattern', {
            yPercent: 30, ease: 'none',
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
        });
    }

    function initScrollAnimations(isTouch) {
        // ScrollMatchMedia para manejar Desktop vs Mobile
        ScrollTrigger.matchMedia({
            // Desktop: Scroll Horizontal
            "(min-width: 769px)": function() {
                const gallerySection = document.querySelector('.gallery-wrapper');
                const track = document.querySelector('.gallery-track');
                
                let scrollTween = gsap.to(track, {
                    x: () => -(track.scrollWidth - window.innerWidth),
                    ease: "none",
                    scrollTrigger: {
                        trigger: gallerySection,
                        pin: true,
                        scrub: 1,
                        end: () => "+=" + track.scrollWidth / 2,
                        invalidateOnRefresh: true
                    }
                });

                document.querySelectorAll('.gallery-img img').forEach(img => {
                    gsap.to(img, {
                        x: -100, ease: "none",
                        scrollTrigger: {
                            trigger: img.parentElement,
                            containerAnimation: scrollTween,
                            start: "left right",
                            end: "right left",
                            scrub: true
                        }
                    });
                });
            },
            // Mobile: Fade in simple vertical
            "(max-width: 768px)": function() {
                gsap.from(".gallery-img", {
                    y: 50, opacity: 0, duration: 0.8, stagger: 0.2,
                    scrollTrigger: { trigger: ".gallery-wrapper", start: "top 70%" }
                });
            }
        });

        // Menu Filters
        const buttons = document.querySelectorAll('.filter-btn');
        const cards = document.querySelectorAll('.dish-card');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;

                gsap.to(cards, {
                    opacity: 0, scale: 0.9, duration: 0.3,
                    onComplete: () => {
                        cards.forEach(card => {
                            if (filter === 'all' || card.classList.contains(`item-${filter}`)) {
                                card.style.display = 'block';
                            } else {
                                card.style.display = 'none';
                            }
                        });
                        ScrollTrigger.refresh();
                        gsap.fromTo(cards, 
                            { opacity: 0, scale: 0.9 },
                            { 
                                opacity: (i, target) => target.style.display === 'none' ? 0 : 1, 
                                scale: 1, duration: 0.4, stagger: 0.05, clearProps: "transform"
                            }
                        );
                    }
                });
            });
        });
        
        gsap.to('.dish-card', { opacity: 1, duration: 0.5, stagger: 0.1, delay: 2.5 });
    }

    function initTiltEffect() {
        const cards = document.querySelectorAll('.dish-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                gsap.to(card, { rotationX: rotateX, rotationY: rotateY, duration: 0.5, ease: "power2.out" });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.5, ease: "power2.out" });
            });
        });

        const magnets = document.querySelectorAll('.magnetic-wrap');
        magnets.forEach(mag => {
            mag.addEventListener('mousemove', (e) => {
                const rect = mag.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(mag, { x: x * 0.3, y: y * 0.3, duration: 0.3 });
            });
            mag.addEventListener('mouseleave', () => {
                gsap.to(mag, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
            });
        });
    }

    function initCustomCursor() {
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorCircle = document.querySelector('.cursor-circle');
        
        window.addEventListener('mousemove', (e) => {
            gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.1 });
            gsap.to(cursorCircle, { x: e.clientX, y: e.clientY, duration: 0.3 });
        });

        const hoverables = document.querySelectorAll('[data-cursor="hover"], a, button');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    }
}
