/**
 * 🚀 SISTEMA AVANZADO DE WEBGL SHADERS
 * Implementación completa de efectos visuales futuristas para el portafolio
 * 
 * Shaders incluidos:
 * - Holographic Projection
 * - Neural Network Visualization  
 * - Glitch Matrix
 * - Quantum Particle Field
 * - Cyberpunk UI
 * - Aurora Borealis
 */

class WebGLShaderSystem {
    constructor() {
        this.canvas = null;
        this.gl = null;
        this.programs = {};
        this.textures = {};
        this.uniforms = {};
        this.animationId = null;
        this.time = 0;
        this.mousePosition = { x: 0, y: 0 };
        this.resolution = { x: 0, y: 0 };
        
        this.init();
    }

    init() {
        this.createCanvas();
        this.setupWebGL();
        this.createShaders();
        this.setupEventListeners();
        this.startAnimation();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.pointerEvents = 'none';
        document.body.appendChild(this.canvas);
        
        this.resize();
    }

    setupWebGL() {
        this.gl = this.canvas.getContext('webgl2') || this.canvas.getContext('webgl');
        if (!this.gl) {
            console.error('WebGL no soportado');
            return;
        }

        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    }

    createShaders() {
        // Vertex Shader común
        const vertexShaderSource = `
            attribute vec2 a_position;
            varying vec2 v_uv;
            
            void main() {
                gl_Position = vec4(a_position, 0.0, 1.0);
                v_uv = a_position * 0.5 + 0.5;
            }
        `;

        // 1. HOLOGRAPHIC PROJECTION SHADER
        const holographicFragment = `
            precision highp float;
            uniform float u_time;
            uniform vec2 u_resolution;
            uniform vec3 u_lightPosition;
            varying vec2 v_uv;
            
            void main() {
                vec2 uv = v_uv;
                float time = u_time;
                
                // Efecto de refracción cromática
                float refraction = sin(uv.x * 0.1 + time) * 0.02;
                vec3 refractedColor = vec3(
                    sin(time + uv.x * 0.1) * 0.5 + 0.5,
                    sin(time + uv.y * 0.1 + 2.0) * 0.5 + 0.5,
                    sin(time + (uv.x + uv.y) * 0.1 + 4.0) * 0.5 + 0.5
                );
                
                // Efecto de scanning tipo Blade Runner
                float scanLine = step(0.98, sin(uv.y * 50.0 + time * 10.0));
                vec3 scanColor = vec3(0.0, 1.0, 0.8) * scanLine;
                
                // Efecto de distorsión holográfica
                float distortion = sin(uv.x * 20.0 + time * 5.0) * 0.01;
                vec2 distortedUV = uv + vec2(distortion, 0.0);
                
                vec3 finalColor = refractedColor + scanColor;
                gl_FragColor = vec4(finalColor, 0.8);
            }
        `;

        // 2. NEURAL NETWORK VISUALIZATION SHADER
        const neuralFragment = `
            precision highp float;
            uniform float u_time;
            uniform vec2 u_resolution;
            varying vec2 v_uv;
            
            void main() {
                vec2 uv = v_uv;
                float time = u_time;
                
                // Nodos de red neuronal
                vec2 node1 = vec2(0.2, 0.3);
                vec2 node2 = vec2(0.8, 0.7);
                vec2 node3 = vec2(0.5, 0.9);
                
                // Calcular distancias y conexiones
                float dist1 = distance(uv, node1);
                float dist2 = distance(uv, node2);
                float dist3 = distance(uv, node3);
                
                // Efecto de pulso de datos
                float pulse1 = sin(time * 2.0 + dist1 * 20.0) * 0.5 + 0.5;
                float pulse2 = sin(time * 1.5 + dist2 * 15.0) * 0.5 + 0.5;
                float pulse3 = sin(time * 3.0 + dist3 * 25.0) * 0.5 + 0.5;
                
                // Conexiones entre nodos
                float connection = 1.0 - smoothstep(0.0, 0.1, abs(dot(uv - node1, normalize(node2 - node1))));
                
                // Efecto de datos fluyendo
                float dataFlow = sin(uv.x * 10.0 + time * 3.0) * 0.1;
                
                vec3 color = vec3(pulse1, pulse2, pulse3) * connection + dataFlow;
                gl_FragColor = vec4(color, 0.9);
            }
        `;

        // 3. GLITCH MATRIX SHADER
        const matrixFragment = `
            precision highp float;
            uniform float u_time;
            uniform vec2 u_resolution;
            varying vec2 v_uv;
            
            float random(vec2 st) {
                return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
            }
            
            void main() {
                vec2 uv = v_uv;
                float time = u_time;
                
                // Ruido para efecto glitch
                float noise = random(uv * 10.0 + time);
                
                // Efecto de digitalización
                float digitize = step(0.5, sin(uv.y * 100.0 + time * 5.0));
                
                // Efecto de corrupción de datos
                float corruption = step(0.95, noise);
                vec2 glitchUV = uv + vec2(sin(time * 10.0) * 0.1, 0.0) * corruption;
                
                // Caracteres Matrix
                float char = step(0.5, sin(glitchUV.x * 20.0 + time * 3.0));
                vec3 matrixColor = vec3(0.0, char, 0.0) * digitize;
                
                // Efecto de scan horizontal
                float scan = step(0.98, sin(uv.y * 200.0 + time * 20.0));
                matrixColor += vec3(0.0, 1.0, 0.0) * scan;
                
                // Efecto de glitch RGB
                vec3 glitchRGB = vec3(
                    sin(time * 5.0 + uv.x * 50.0) * 0.1,
                    sin(time * 7.0 + uv.y * 30.0) * 0.1,
                    sin(time * 3.0 + (uv.x + uv.y) * 40.0) * 0.1
                );
                
                gl_FragColor = vec4(matrixColor + glitchRGB, 1.0);
            }
        `;

        // 4. QUANTUM PARTICLE FIELD SHADER
        const quantumFragment = `
            precision highp float;
            uniform float u_time;
            uniform vec2 u_resolution;
            uniform vec2 u_mouse;
            varying vec2 v_uv;
            
            void main() {
                vec2 uv = (v_uv - 0.5) * 2.0;
                float time = u_time;
                
                // Campo de partículas cuánticas
                float particles = 0.0;
                for(int i = 0; i < 50; i++) {
                    float fi = float(i);
                    vec2 pos = vec2(
                        sin(fi * 1.3 + time * 0.5) * 0.8,
                        cos(fi * 1.7 + time * 0.3) * 0.6
                    );
                    
                    float dist = distance(uv, pos);
                    float size = 0.02 + sin(fi + time) * 0.01;
                    particles += smoothstep(size, 0.0, dist);
                }
                
                // Efecto de interferencia cuántica
                float interference = sin(uv.x * 50.0 + time * 2.0) * 
                                    sin(uv.y * 30.0 + time * 1.5) * 0.1;
                
                // Color cuántico
                vec3 quantumColor = vec3(
                    sin(time + uv.x * 2.0) * 0.5 + 0.5,
                    sin(time + uv.y * 2.0 + 2.0) * 0.5 + 0.5,
                    sin(time + (uv.x + uv.y) * 2.0 + 4.0) * 0.5 + 0.5
                );
                
                // Efecto de campo magnético
                float magneticField = sin(distance(uv, u_mouse) * 10.0 - time * 3.0) * 0.2;
                
                gl_FragColor = vec4(quantumColor * particles + interference + magneticField, 0.7);
            }
        `;

        // 5. CYBERPUNK UI SHADER
        const cyberpunkFragment = `
            precision highp float;
            uniform float u_time;
            uniform vec2 u_resolution;
            uniform vec2 u_mouse;
            uniform float u_progress;
            varying vec2 v_uv;
            
            void main() {
                vec2 uv = v_uv;
                float time = u_time;
                
                // Efecto de grid holográfico
                vec2 grid = abs(fract(uv * 20.0) - 0.5) / fwidth(uv * 20.0);
                float gridLine = min(grid.x, grid.y);
                gridLine = 1.0 - min(gridLine, 1.0);
                
                // Efecto de barra de progreso
                float progressBar = step(uv.x, u_progress) * step(uv.y, 0.1) * step(0.05, uv.y);
                
                // Efecto de glow
                float glow = 1.0 - smoothstep(0.0, 0.1, distance(uv, u_mouse));
                
                // Efecto de scan lines
                float scanLines = step(0.98, sin(uv.y * 200.0 + time * 10.0));
                
                // Color cyberpunk
                vec3 cyberColor = vec3(0.0, 1.0, 0.8) * gridLine + 
                                 vec3(1.0, 0.0, 0.5) * progressBar +
                                 vec3(0.0, 0.8, 1.0) * glow +
                                 vec3(0.0, 1.0, 0.0) * scanLines;
                
                gl_FragColor = vec4(cyberColor, 0.8);
            }
        `;

        // 6. AURORA BOREALIS SHADER
        const auroraFragment = `
            precision highp float;
            uniform float u_time;
            uniform vec2 u_resolution;
            varying vec2 v_uv;
            
            void main() {
                vec2 uv = v_uv;
                float time = u_time;
                
                // Múltiples capas de aurora
                float aurora1 = sin(uv.x * 3.0 + time * 0.5) * 
                               sin(uv.y * 2.0 + time * 0.3) * 
                               sin(uv.x * uv.y * 5.0 + time * 0.8);
                
                float aurora2 = sin(uv.x * 2.0 + time * 0.7) * 
                               sin(uv.y * 3.0 + time * 0.4) * 
                               sin(uv.x * uv.y * 3.0 + time * 1.2);
                
                // Efecto de movimiento ondulante
                float wave = sin(uv.y * 10.0 + time * 2.0) * 0.1;
                vec2 distortedUV = uv + vec2(wave, 0.0);
                
                // Colores de aurora
                vec3 auroraColor = vec3(
                    sin(aurora1 + time) * 0.5 + 0.5,
                    sin(aurora2 + time + 2.0) * 0.5 + 0.5,
                    sin(aurora1 + aurora2 + time + 4.0) * 0.5 + 0.5
                );
                
                // Efecto de fade vertical
                float fade = 1.0 - smoothstep(0.0, 0.5, uv.y);
                
                // Efecto de partículas brillantes
                float sparkles = step(0.99, sin(uv.x * 100.0 + time * 5.0) * sin(uv.y * 100.0 + time * 3.0));
                
                gl_FragColor = vec4(auroraColor * fade + sparkles, 0.8);
            }
        `;

        // Crear programas de shader
        this.programs.holographic = this.createProgram(vertexShaderSource, holographicFragment);
        this.programs.neural = this.createProgram(vertexShaderSource, neuralFragment);
        this.programs.matrix = this.createProgram(vertexShaderSource, matrixFragment);
        this.programs.quantum = this.createProgram(vertexShaderSource, quantumFragment);
        this.programs.cyberpunk = this.createProgram(vertexShaderSource, cyberpunkFragment);
        this.programs.aurora = this.createProgram(vertexShaderSource, auroraFragment);

        this.setupGeometry();
    }

    createProgram(vertexSource, fragmentSource) {
        const vertexShader = this.compileShader(this.gl.VERTEX_SHADER, vertexSource);
        const fragmentShader = this.compileShader(this.gl.FRAGMENT_SHADER, fragmentSource);
        
        const program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
        
        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            console.error('Error linking program:', this.gl.getProgramInfoLog(program));
            return null;
        }
        
        return program;
    }

    compileShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('Error compiling shader:', this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return null;
        }
        
        return shader;
    }

    setupGeometry() {
        // Crear buffer para un quad que cubra toda la pantalla
        const positions = new Float32Array([
            -1, -1,
             1, -1,
            -1,  1,
             1,  1,
        ]);
        
        this.positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mousePosition.x = e.clientX / this.canvas.width;
            this.mousePosition.y = 1.0 - e.clientY / this.canvas.height;
        });
    }

    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * window.devicePixelRatio;
        this.canvas.height = rect.height * window.devicePixelRatio;
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        
        // Evitar error si el contexto WebGL aún no está inicializado
        if (!this.gl) {
            return;
        }
        
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.resolution.x = this.canvas.width;
        this.resolution.y = this.canvas.height;
    }

    renderShader(program, uniforms = {}) {
        if (!program) return;
        
        this.gl.useProgram(program);
        
        // Configurar geometría
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        const positionLocation = this.gl.getAttribLocation(program, 'a_position');
        this.gl.enableVertexAttribArray(positionLocation);
        this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);
        
        // Configurar uniforms
        this.setUniform(program, 'u_time', this.time);
        this.setUniform(program, 'u_resolution', [this.resolution.x, this.resolution.y]);
        this.setUniform(program, 'u_mouse', [this.mousePosition.x, this.mousePosition.y]);
        
        // Aplicar uniforms personalizados
        Object.keys(uniforms).forEach(key => {
            this.setUniform(program, key, uniforms[key]);
        });
        
        // Renderizar
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }

    setUniform(program, name, value) {
        const location = this.gl.getUniformLocation(program, name);
        if (location === null) return;
        
        if (Array.isArray(value)) {
            if (value.length === 2) {
                this.gl.uniform2f(location, value[0], value[1]);
            } else if (value.length === 3) {
                this.gl.uniform3f(location, value[0], value[1], value[2]);
            } else if (value.length === 4) {
                this.gl.uniform4f(location, value[0], value[1], value[2], value[3]);
            }
        } else if (typeof value === 'number') {
            this.gl.uniform1f(location, value);
        }
    }

    startAnimation() {
        const animate = () => {
            this.time += 0.016; // ~60fps
            
            // Limpiar canvas
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            
            // Renderizar shader de fondo (Aurora)
            this.renderShader(this.programs.aurora);
            
            // Renderizar efectos adicionales basados en interacción
            if (this.mousePosition.x > 0.5) {
                this.renderShader(this.programs.quantum);
            }
            
            this.animationId = requestAnimationFrame(animate);
        };
        
        animate();
    }

    // Métodos públicos para controlar efectos específicos
    showHolographicEffect() {
        this.renderShader(this.programs.holographic);
    }

    showNeuralNetwork() {
        this.renderShader(this.programs.neural);
    }

    showMatrixEffect() {
        this.renderShader(this.programs.matrix);
    }

    showQuantumField() {
        this.renderShader(this.programs.quantum);
    }

    showCyberpunkUI(progress = 0.5) {
        this.renderShader(this.programs.cyberpunk, { u_progress: progress });
    }

    showAurora() {
        this.renderShader(this.programs.aurora);
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Inicializar el sistema de shaders cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.shaderSystem = new WebGLShaderSystem();
});

// Exportar para uso global
window.WebGLShaderSystem = WebGLShaderSystem;

