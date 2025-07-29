import gsap from 'gsap';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import IconPanel from './IconPanel.js';

// --- SETUP ESCENA ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const container = document.getElementById('three-canvas-container');
container.appendChild(renderer.domElement);

// --- POSTPROCESADO ---
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.4, 0.4, 0.85);
composer.addPass(bloomPass);

// --- LUCES ---
const ambient = new THREE.AmbientLight(0x222233, 1.2);
scene.add(ambient);

// --- FONDO VOLUMÉTRICO ---
const fogGeometry = new THREE.SphereGeometry(30, 64, 64);
const fogMaterial = new THREE.MeshBasicMaterial({ color: 0x181c2a, transparent: true, opacity: 0.7, side: THREE.BackSide });
const fogSphere = new THREE.Mesh(fogGeometry, fogMaterial);
scene.add(fogSphere);

// --- ICONOS ---
const iconPanel = new IconPanel(scene);

// --- SLIDER MANUAL ---
const spacing = 3.5; // El mismo espaciado que en IconPanel.js
function centerOnIcon(index) {
    const targetX = -index * spacing;
    gsap.to(iconPanel.group.position, {
        x: targetX,
        duration: 0.8,
        ease: 'power3.inOut'
    });
}

// Iniciar centrado en el icono de GitHub (índice 1)
centerOnIcon(1);

// --- MENÚ DE NAVEGACIÓN ---
const navBtns = document.querySelectorAll('.nav-btn');
navBtns.forEach((btn) => {
    btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        const iconName = btn.dataset.icon;
        if (iconName === 'figma') centerOnIcon(0);
        if (iconName === 'github') centerOnIcon(1);
        if (iconName === 'linkedin') centerOnIcon(2);
    });
});

// --- RAYCASTER ---
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(-100, -100);
window.addEventListener('pointermove', e => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    iconPanel.handlePointer(raycaster);
});
window.addEventListener('pointerdown', e => {
    raycaster.setFromCamera(pointer, camera);
    iconPanel.handleClick(raycaster);
});

// --- LOOP PRINCIPAL ---
const clock = new THREE.Clock();
function animate() {
    const delta = clock.getDelta();
    iconPanel.update(delta);
    composer.render();
    requestAnimationFrame(animate);
}
animate();

// --- RESPONSIVIDAD ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
}); 