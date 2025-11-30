import * as THREE from 'three';

// --- 1. ANIME.JS TEXT ANIMATION (Hero) ---
export function initAnimeText() {
    // Wrapper para letras
    const textWrapper = document.querySelector('.hero h1');
    if(textWrapper) {
        // Preservar <br> y spans existentes
        // Estrategia simplificada: animar todo el bloque o palabras
        // Para efectos "letra por letra" robustos con HTML anidado, mejor usar una librería dedicada o un parseo complejo.
        // Aquí haremos un efecto de "palabras" para no romper el HTML.
        
        // Opción segura: Animar los hijos directos si ya son bloques, o simplemente animar el bloque entero con glitch
        // Vamos a aplicar el efecto al H1 entero con un clip-path reveal
        
        anime({
            targets: '.hero h1',
            opacity: [0, 1],
            translateY: [20, 0],
            easing: "easeOutExpo",
            duration: 1200,
            delay: 500 // Esperar al intro overlay
        });
    }

    // Stats Counters
    const stats = document.querySelectorAll('.stat-item h4');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const el = entry.target;
                const finalValue = parseInt(el.innerText.replace('+', ''));
                
                const obj = { val: 0 };
                anime({
                    targets: obj,
                    val: finalValue,
                    easing: 'easeOutExpo',
                    round: 1,
                    duration: 2000,
                    update: function() {
                        el.innerHTML = '+' + obj.val;
                    },
                    complete: function() {
                        anime({
                            targets: el,
                            scale: [1, 1.2, 1],
                            duration: 400,
                            easing: 'easeOutQuad'
                        });
                    }
                });
                observer.unobserve(el);
            }
        });
    });
    
    stats.forEach(stat => observer.observe(stat));
}

// --- 2. ANIMATED HEADINGS (Lines) ---
export function initAnimeHeadings() {
    const headings = document.querySelectorAll('.section h2');
    
    headings.forEach(h2 => {
        // Wrap content
        const text = h2.innerText;
        h2.innerHTML = `<span class="heading-wrapper">${text}<svg class="heading-line" viewBox="0 0 100 2" preserveAspectRatio="none"><path d="M0,1 L100,1" stroke="var(--accent-primary)" stroke-width="2" fill="none" vector-effect="non-scaling-stroke"></path></svg></span>`;
        
        const path = h2.querySelector('path');
        if(!path) return;
        
        // Set initial dash
        path.style.strokeDasharray = '100';
        path.style.strokeDashoffset = '100';
        
        // Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        strokeDashoffset: [anime.setDashoffset, 0],
                        easing: 'easeInOutSine',
                        duration: 800,
                        delay: 200
                    });
                    observer.unobserve(entry.target.closest('h2'));
                }
            });
        });
        
        observer.observe(path);
    });
}

// --- 3. MICRO-INTERACTIONS (Cards) ---
export function initAnimeCards() {
    if(window.matchMedia('(hover: none)').matches) return;

    const cards = document.querySelectorAll('.card, .dv-row');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime.remove(card);
            anime({
                targets: card,
                scale: 1.01,
                translateY: -4,
                boxShadow: '0 10px 30px rgba(139, 92, 246, 0.15)',
                easing: 'easeOutQuad',
                duration: 300
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime.remove(card);
            anime({
                targets: card,
                scale: 1,
                translateY: 0,
                boxShadow: '0 0 0 rgba(0,0,0,0)', // Reset to CSS default via class logic usually, but hard reset here works
                easing: 'easeOutQuad',
                duration: 300
            });
        });
    });
}

// --- 4. WEBGL DETAILS (Tech Stream Separator) ---
export function initWebGLDetails() {
    const container = document.getElementById('tech-separator');
    if(!container) return;

    const width = container.offsetWidth;
    const height = 2; // Very thin line
    
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(1); // Low res for performance
    container.appendChild(renderer.domElement);
    
    // Shader simple de "corriente de datos"
    const material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 1.0 },
            color: { value: new THREE.Color('#8b5cf6') }
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float time;
            uniform vec3 color;
            varying vec2 vUv;
            
            void main() {
                // Efecto de barra de carga / scanner moviéndose
                float scan = sin(vUv.x * 20.0 + time * 5.0) * 0.5 + 0.5;
                float alpha = smoothstep(0.0, 1.0, scan);
                
                // Fade en los bordes
                float edges = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x);
                
                gl_FragColor = vec4(color, alpha * edges);
            }
        `,
        transparent: true
    });
    
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    function animate() {
        requestAnimationFrame(animate);
        material.uniforms.time.value += 0.05;
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
        const newWidth = container.offsetWidth;
        renderer.setSize(newWidth, height);
    });
}

