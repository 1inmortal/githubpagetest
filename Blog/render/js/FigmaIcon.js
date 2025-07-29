import Icon3D from './Icon3D.js';
import * as THREE from 'three';
import gsap from 'gsap';

export default class FigmaIcon extends Icon3D {
    constructor(scene, position) {
        super(scene, position);
        this.uniforms = {
            time: { value: 0.0 },
            hoverIntensity: { value: 0.0 },
            dissolve: { value: 0.0 }
        };
        this.ready = false;
        this._loadShadersAndInit();
    }
    async _loadShadersAndInit() {
        try {
            console.log('[FigmaIcon] Cargando shaders...');
            const vs = await fetch('shaders/figmaliquid_vs.glsl').then(r => r.text());
            const fs = await fetch('shaders/figmaliquid_fs.glsl').then(r => r.text());
            console.log('[FigmaIcon] Shaders cargados.');
            // Crear material shader
            this.material = new THREE.ShaderMaterial({
                uniforms: this.uniforms,
                vertexShader: vs,
                fragmentShader: fs,
                transparent: true
            });
            // Cubo base
            this.cube = new THREE.Mesh(
                new THREE.BoxGeometry(2.2, 2.2, 2.2),
                this.material
            );
            this.group.add(this.cube);
            console.log('[FigmaIcon] Cubo creado y añadido al grupo.');
            // Logo Figma (canvas con formas)
            const canvas = document.createElement('canvas');
            canvas.width = 256; canvas.height = 256;
            const ctx = canvas.getContext('2d');
            // Fondo
            ctx.fillStyle = '#101820';
            ctx.fillRect(0,0,256,256);
            // Dibuja el logo de Figma (cinco círculos/óvalos de colores)
            const colors = ['#F24E1E','#A259FF','#1ABCFE','#0ACF83','#FF7262'];
            const positions = [
                [128, 70],   // rojo
                [128, 128],  // morado
                [128, 186],  // azul
                [86, 99],    // verde
                [170, 99]    // naranja
            ];
            for(let i=0;i<5;i++){
                ctx.beginPath();
                ctx.arc(positions[i][0], positions[i][1], 32, 0, Math.PI*2);
                ctx.fillStyle = colors[i];
                ctx.globalAlpha = 0.95;
                ctx.fill();
            }
            ctx.globalAlpha = 1.0;
            const logoTexture = new THREE.CanvasTexture(canvas);
            // Plano para el logo
            this.logo = new THREE.Mesh(
                new THREE.PlaneGeometry(1.2,1.2),
                new THREE.MeshBasicMaterial({ map: logoTexture, transparent: true })
            );
            this.logo.position.z = 1.12;
            this.group.add(this.logo);
            console.log('[FigmaIcon] Logo añadido.');
            // Estado
            this.isHover = false;
            this.isClicked = false;
            this.ready = true;
        } catch (e) {
            console.error('[FigmaIcon] Error cargando shaders o creando cubo:', e);
        }
    }
    onHover() {
        if (!this.ready || this.isHover || this.isClicked) return;
        this.isHover = true;
        gsap.to(this.uniforms.hoverIntensity, { value: 1.0, duration: 0.5, overwrite: true });
        gsap.to(this.cube.scale, { x: 1.12, y: 1.12, z: 1.12, duration: 0.5, ease: 'elastic.out(1,0.5)' });
        gsap.to(this.logo.material, { opacity: 1, duration: 0.4 });
    }
    onUnhover() {
        if (!this.ready || !this.isHover || this.isClicked) return;
        this.isHover = false;
        gsap.to(this.uniforms.hoverIntensity, { value: 0.0, duration: 0.5, overwrite: true });
        gsap.to(this.cube.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: 'power2.out' });
        gsap.to(this.logo.material, { opacity: 0.85, duration: 0.4 });
    }
    onClick() {
        if (!this.ready || this.isClicked) return;
        this.isClicked = true;
        // Disolución y animación de partículas (simplificado)
        gsap.to(this.uniforms.dissolve, { value: 1, duration: 0.7, ease: 'power2.in' });
        gsap.to(this.logo.material, { opacity: 0, duration: 0.4, ease: 'power1.in' });
        // Aquí puedes agregar lógica para partículas de pintura
    }
    update(delta) {
        if (!this.ready) return;
        this.uniforms.time.value += delta;
    }
    cleanup() {
        super.cleanup();
    }
} 