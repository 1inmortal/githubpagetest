// Clase base para iconos 3D interactivos
export default class Icon3D {
    constructor(scene, position = {x:0, y:0, z:0}) {
        this.scene = scene;
        this.group = new THREE.Group();
        this.group.position.set(position.x, position.y, position.z);
        this.scene.add(this.group);
        this.isActive = true;
    }
    // Métodos abstractos
    onHover() { throw new Error('onHover debe ser implementado'); }
    onUnhover() { throw new Error('onUnhover debe ser implementado'); }
    onClick() { throw new Error('onClick debe ser implementado'); }
    update(delta) { /* Animación por frame */ }
    cleanup() { this.scene.remove(this.group); }
} 