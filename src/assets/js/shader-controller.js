/**
 * 🎮 CONTROLADOR AVANZADO DE SHADERS
 * Sistema de control inteligente para efectos WebGL
 * Integración con el portafolio y efectos interactivos
 */

class ShaderController {
    constructor(shaderSystem) {
        this.shaderSystem = shaderSystem;
        this.activeEffects = new Set();
        this.effectQueue = [];
        this.isTransitioning = false;
        this.currentSection = null;
        this.interactionMode = 'auto'; // 'auto', 'manual', 'hybrid'
        
        this.init();
    }

    init() {
        this.setupSectionDetection();
        this.setupProjectInteractions();
        this.setupKeyboardControls();
        this.setupEffectTransitions();
        this.createEffectUI();
    }

    setupSectionDetection() {
        // Detectar sección actual y aplicar efectos apropiados
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    this.handleSectionChange(sectionId);
                }
            });
        }, { threshold: 0.5 });

        // Observar todas las secciones principales
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => observer.observe(section));
    }

    handleSectionChange(sectionId) {
        this.currentSection = sectionId;
        
        // Aplicar efectos específicos por sección
        switch(sectionId) {
            case 'hero':
                this.activateEffect('aurora');
                this.activateEffect('quantum');
                break;
            case 'about':
                this.activateEffect('neural');
                break;
            case 'skills':
                this.activateEffect('cyberpunk');
                break;
            case 'projects':
                this.activateEffect('holographic');
                this.activateEffect('matrix');
                break;
            case 'testimonials':
                this.activateEffect('aurora');
                break;
            case 'contact':
                this.activateEffect('quantum');
                this.activateEffect('cyberpunk');
                break;
            default:
                this.activateEffect('aurora');
        }
    }

    setupProjectInteractions() {
        // Efectos especiales para proyectos
        const projectCards = document.querySelectorAll('.project-card, .project-item');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.activateEffect('holographic');
                this.activateEffect('neural');
            });
            
            card.addEventListener('mouseleave', () => {
                this.deactivateEffect('holographic');
                this.deactivateEffect('neural');
            });
            
            card.addEventListener('click', () => {
                this.triggerProjectEffect(card);
            });
        });
    }

    triggerProjectEffect(card) {
        // Efecto especial al hacer clic en un proyecto
        this.queueEffect('matrix', 2000);
        this.queueEffect('quantum', 3000);
        
        // Efecto de "carga" del proyecto
        this.showLoadingEffect();
    }

    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            // Controles de teclado para efectos
            switch(e.key.toLowerCase()) {
                case '1':
                    this.toggleEffect('aurora');
                    break;
                case '2':
                    this.toggleEffect('neural');
                    break;
                case '3':
                    this.toggleEffect('matrix');
                    break;
                case '4':
                    this.toggleEffect('quantum');
                    break;
                case '5':
                    this.toggleEffect('holographic');
                    break;
                case '6':
                    this.toggleEffect('cyberpunk');
                    break;
                case '0':
                    this.clearAllEffects();
                    break;
                case 'r':
                    this.randomizeEffects();
                    break;
            }
        });
    }

    setupEffectTransitions() {
        // Sistema de transiciones suaves entre efectos
        this.transitionDuration = 1000;
        this.transitionEasing = 'ease-in-out';
    }

    createEffectUI() {
        // Crear interfaz de control de efectos
        const controlPanel = document.createElement('div');
        controlPanel.id = 'shader-control-panel';
        controlPanel.innerHTML = `
            <div class="shader-controls">
                <h3>🎮 Shader Controls</h3>
                <div class="effect-buttons">
                    <button data-effect="aurora">Aurora</button>
                    <button data-effect="neural">Neural</button>
                    <button data-effect="matrix">Matrix</button>
                    <button data-effect="quantum">Quantum</button>
                    <button data-effect="holographic">Holographic</button>
                    <button data-effect="cyberpunk">Cyberpunk</button>
                </div>
                <div class="control-options">
                    <button id="clear-effects">Clear All</button>
                    <button id="randomize-effects">Randomize</button>
                    <button id="toggle-auto">Auto Mode</button>
                </div>
                <div class="effect-status">
                    <span>Active: <span id="active-count">0</span></span>
                </div>
            </div>
        `;
        
        // Estilos para el panel de control
        const style = document.createElement('style');
        style.textContent = `
            #shader-control-panel {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                background: rgba(10, 10, 20, 0.9);
                border: 1px solid rgba(0, 255, 136, 0.3);
                border-radius: 10px;
                padding: 15px;
                backdrop-filter: blur(10px);
                color: #e0e0e0;
                font-family: 'Courier Prime', monospace;
                font-size: 12px;
                max-width: 200px;
                opacity: 0.8;
                transition: opacity 0.3s ease;
            }
            
            #shader-control-panel:hover {
                opacity: 1;
            }
            
            .shader-controls h3 {
                margin: 0 0 10px 0;
                color: #00ff88;
                font-size: 14px;
            }
            
            .effect-buttons {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 5px;
                margin-bottom: 10px;
            }
            
            .effect-buttons button {
                background: rgba(0, 255, 136, 0.1);
                border: 1px solid rgba(0, 255, 136, 0.3);
                color: #e0e0e0;
                padding: 5px 8px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 10px;
                transition: all 0.2s ease;
            }
            
            .effect-buttons button:hover {
                background: rgba(0, 255, 136, 0.2);
                border-color: #00ff88;
            }
            
            .effect-buttons button.active {
                background: rgba(0, 255, 136, 0.3);
                border-color: #00ff88;
                color: #00ff88;
            }
            
            .control-options {
                display: flex;
                gap: 5px;
                margin-bottom: 10px;
            }
            
            .control-options button {
                background: rgba(255, 0, 51, 0.1);
                border: 1px solid rgba(255, 0, 51, 0.3);
                color: #e0e0e0;
                padding: 5px 8px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 10px;
                flex: 1;
            }
            
            .control-options button:hover {
                background: rgba(255, 0, 51, 0.2);
                border-color: #ff0033;
            }
            
            .effect-status {
                font-size: 10px;
                color: #a0a0a0;
            }
            
            #active-count {
                color: #00ff88;
                font-weight: bold;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(controlPanel);
        
        // Event listeners para los botones
        this.setupControlPanelEvents();
    }

    setupControlPanelEvents() {
        const panel = document.getElementById('shader-control-panel');
        
        // Botones de efectos
        panel.querySelectorAll('.effect-buttons button').forEach(button => {
            button.addEventListener('click', () => {
                const effect = button.dataset.effect;
                this.toggleEffect(effect);
                this.updateButtonStates();
            });
        });
        
        // Botones de control
        document.getElementById('clear-effects').addEventListener('click', () => {
            this.clearAllEffects();
            this.updateButtonStates();
        });
        
        document.getElementById('randomize-effects').addEventListener('click', () => {
            this.randomizeEffects();
            this.updateButtonStates();
        });
        
        document.getElementById('toggle-auto').addEventListener('click', () => {
            this.toggleAutoMode();
        });
    }

    updateButtonStates() {
        const panel = document.getElementById('shader-control-panel');
        const buttons = panel.querySelectorAll('.effect-buttons button');
        
        buttons.forEach(button => {
            const effect = button.dataset.effect;
            if (this.activeEffects.has(effect)) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
        
        // Actualizar contador
        document.getElementById('active-count').textContent = this.activeEffects.size;
    }

    // Métodos de control de efectos
    activateEffect(effectName) {
        if (!this.activeEffects.has(effectName)) {
            this.activeEffects.add(effectName);
            this.applyEffect(effectName);
            this.updateButtonStates();
        }
    }

    deactivateEffect(effectName) {
        if (this.activeEffects.has(effectName)) {
            this.activeEffects.delete(effectName);
            this.updateButtonStates();
        }
    }

    toggleEffect(effectName) {
        if (this.activeEffects.has(effectName)) {
            this.deactivateEffect(effectName);
        } else {
            this.activateEffect(effectName);
        }
    }

    queueEffect(effectName, duration) {
        this.effectQueue.push({
            effect: effectName,
            duration: duration,
            startTime: Date.now()
        });
        
        this.activateEffect(effectName);
        
        setTimeout(() => {
            this.deactivateEffect(effectName);
            this.effectQueue = this.effectQueue.filter(item => item.effect !== effectName);
        }, duration);
    }

    clearAllEffects() {
        this.activeEffects.clear();
        this.effectQueue = [];
        this.updateButtonStates();
    }

    randomizeEffects() {
        this.clearAllEffects();
        
        const allEffects = ['aurora', 'neural', 'matrix', 'quantum', 'holographic', 'cyberpunk'];
        const numEffects = Math.floor(Math.random() * 3) + 1; // 1-3 efectos aleatorios
        
        for (let i = 0; i < numEffects; i++) {
            const randomEffect = allEffects[Math.floor(Math.random() * allEffects.length)];
            this.activateEffect(randomEffect);
        }
    }

    toggleAutoMode() {
        this.interactionMode = this.interactionMode === 'auto' ? 'manual' : 'auto';
        const button = document.getElementById('toggle-auto');
        button.textContent = this.interactionMode === 'auto' ? 'Auto Mode' : 'Manual Mode';
        button.style.background = this.interactionMode === 'auto' ? 
            'rgba(0, 255, 136, 0.2)' : 'rgba(255, 0, 51, 0.2)';
    }

    applyEffect(effectName) {
        if (!this.shaderSystem) return;
        
        switch(effectName) {
            case 'aurora':
                this.shaderSystem.showAurora();
                break;
            case 'neural':
                this.shaderSystem.showNeuralNetwork();
                break;
            case 'matrix':
                this.shaderSystem.showMatrixEffect();
                break;
            case 'quantum':
                this.shaderSystem.showQuantumField();
                break;
            case 'holographic':
                this.shaderSystem.showHolographicEffect();
                break;
            case 'cyberpunk':
                this.shaderSystem.showCyberpunkUI(Math.random());
                break;
        }
    }

    showLoadingEffect() {
        // Efecto de carga especial
        this.queueEffect('matrix', 1000);
        this.queueEffect('cyberpunk', 2000);
    }

    // Método para integrar con GSAP
    integrateWithGSAP() {
        if (typeof gsap !== 'undefined') {
            // Crear timeline para efectos sincronizados
            this.gsapTimeline = gsap.timeline();
            
            // Efectos en scroll
            gsap.registerPlugin(ScrollTrigger);
            
            ScrollTrigger.create({
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                onUpdate: (self) => {
                    const progress = self.progress;
                    this.shaderSystem.setUniform(this.shaderSystem.programs.cyberpunk, 'u_progress', progress);
                }
            });
        }
    }
}

// Inicializar cuando el sistema de shaders esté listo
document.addEventListener('DOMContentLoaded', () => {
    if (window.shaderSystem) {
        window.shaderController = new ShaderController(window.shaderSystem);
        window.shaderController.integrateWithGSAP();
    }
});

// Exportar para uso global
window.ShaderController = ShaderController;

