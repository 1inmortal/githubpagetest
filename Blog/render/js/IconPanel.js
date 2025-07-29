import GitHubIcon from './GitHubIcon.js';
import FigmaIcon from './FigmaIcon.js';
import LinkedInIcon from './LinkedInIcon.js';
import * as THREE from 'three';

export default class IconPanel {
    constructor(scene) {
        this.scene = scene;
        this.group = new THREE.Group();
        this.scene.add(this.group);
        // Posiciones horizontales para los iconos
        const spacing = 3.5;
        this.icons = [
            new FigmaIcon(this.group, {x: -spacing, y: 0, z: 0}),
            new GitHubIcon(this.group, {x: 0, y: 0, z: 0}),
            new LinkedInIcon(this.group, {x: spacing, y: 0, z: 0})
        ];
        this.activeIcon = null;
        this.lastHover = null;
    }
    handlePointer(raycaster) {
        // Detectar sobre qué icono está el puntero
        let hovered = null;
        this.icons.forEach((icon, i) => {
            if (icon.cube && raycaster.intersectObject(icon.cube, true).length > 0) hovered = i;
        });
        if (hovered !== this.lastHover) {
            this.icons.forEach((icon, i) => {
                if (i === hovered) icon.onHover();
                else icon.onUnhover();
            });
            this.lastHover = hovered;
        }
    }
    handleClick(raycaster) {
        if (this.activeIcon !== null) return;
        this.icons.forEach((icon, i) => {
            if (icon.cube && raycaster.intersectObject(icon.cube, true).length > 0) {
                this.activeIcon = i;
                icon.onClick();
            }
        });
    }
    update(delta) {
        this.icons.forEach(icon => icon.update(delta));
    }
    reset() {
        this.icons.forEach(icon => icon.cleanup());
        // Reinstanciar si es necesario
    }
} 