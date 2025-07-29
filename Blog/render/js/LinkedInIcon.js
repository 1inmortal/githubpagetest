import Icon3D from './Icon3D.js';
import * as THREE from 'three';
import gsap from 'gsap';

export default class LinkedInIcon extends Icon3D {
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
            // Cargar los mismos shaders que GitHub para un efecto líquido consistente
            const vs = await fetch('shaders/cubeliquid_vs.glsl').then(r => r.text());
            const fs = await fetch('shaders/cubeliquid_fs.glsl').then(r => r.text());

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

            // Logo LinkedIn (canvas con texto "in")
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 256;
            const ctx = canvas.getContext('2d');

            // Fondo azul LinkedIn
            ctx.fillStyle = '#0077B5'; // Color corporativo de LinkedIn
            ctx.fillRect(0, 0, 256, 256);
            
            // Texto "in"
            ctx.font = 'bold 150px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('in', 128, 128);

            const logoTexture = new THREE.CanvasTexture(canvas);

            // Plano para el logo
            this.logo = new THREE.Mesh(
                new THREE.PlaneGeometry(1.2, 1.2),
                new THREE.MeshBasicMaterial({ map: logoTexture, transparent: true })
            );
            this.logo.position.z = 1.12;
            this.group.add(this.logo);

            // Estado
            this.isHover = false;
            this.isClicked = false;
            this.ready = true;
        } catch (e) {
            console.error('[LinkedInIcon] Error cargando shaders o creando el cubo:', e);
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
        // Animación de disolución
        gsap.to(this.uniforms.dissolve, { value: 1, duration: 0.7, ease: 'power2.in' });
        gsap.to(this.logo.material, { opacity: 0, duration: 0.4, ease: 'power1.in' });
    }

    update(delta) {
        if (!this.ready) return;
        this.uniforms.time.value += delta;
    }

    cleanup() {
        super.cleanup();
    }
}