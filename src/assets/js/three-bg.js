import * as THREE from 'three';

// --- Configuración ---
const config = {
    gridSize: 40,           // Tamaño de la cuadrícula (40x40)
    cubeSize: 0.15,         // Tamaño de cada cubo
    spacing: 0.8,           // Espaciado entre cubos
    waveSpeed: 0.8,         // Velocidad de la animación de onda
    colorBase: new THREE.Color('#1a1a1a'), // Color base oscuro
    colorActive: new THREE.Color('#8b5cf6') // Color al interactuar (violeta)
};

// --- Escena y Cámara ---
const scene = new THREE.Scene();
scene.fog = new THREE.Fog('#050505', 5, 25); // Niebla para fundir el fondo

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 8, 15);
camera.lookAt(0, 0, 0);

// --- Renderer ---
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// IMPORTANTE: Asegúrate de tener <div id="canvas-container"></div> en tu HTML
const container = document.getElementById('canvas-container');
if (container) {
    container.appendChild(renderer.domElement);
} else {
    document.body.appendChild(renderer.domElement); // Fallback al body
}

// --- Geometría Instanciada ---
const geometry = new THREE.BoxGeometry(config.cubeSize, config.cubeSize, config.cubeSize);
const material = new THREE.MeshStandardMaterial({
    color: config.colorBase,
    roughness: 0.4,
    metalness: 0.8
});

const totalCubes = config.gridSize * config.gridSize;
const mesh = new THREE.InstancedMesh(geometry, material, totalCubes);
scene.add(mesh);

// --- Inicialización del Grid ---
const dummy = new THREE.Object3D();
const positions = []; // Guardamos datos para la animación
const offset = (config.gridSize * config.spacing) / 2;
let i = 0;

for (let x = 0; x < config.gridSize; x++) {
    for (let z = 0; z < config.gridSize; z++) {
        const posX = (x * config.spacing) - offset;
        const posZ = (z * config.spacing) - offset;
        
        dummy.position.set(posX, 0, posZ);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        
        positions.push({ x: posX, z: posZ, id: i });
        i++;
    }
}

// --- Iluminación ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(config.colorActive, 2, 20);
pointLight.position.set(0, 5, 0);
scene.add(pointLight);

// --- Interacción Mouse ---
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0); // Plano imaginario en suelo

window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

// --- Loop de Animación ---
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    // Raycast para seguir el mouse en el plano 3D
    raycaster.setFromCamera(mouse, camera);
    const target = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, target);

    if (target) {
        // Suavizar movimiento de la luz
        pointLight.position.x += (target.x - pointLight.position.x) * 0.1;
        pointLight.position.z += (target.z - pointLight.position.z) * 0.1;
    }

    // Actualizar cada cubo
    let idx = 0;
    for (let x = 0; x < config.gridSize; x++) {
        for (let z = 0; z < config.gridSize; z++) {
            const data = positions[idx];
            
            // Distancia del cubo a la luz/mouse
            const dist = Math.sqrt(
                Math.pow(data.x - pointLight.position.x, 2) + 
                Math.pow(data.z - pointLight.position.z, 2)
            );

            // 1. Onda base sinusoidal
            let y = Math.sin((data.x * 0.3) + time * config.waveSpeed) * Math.cos((data.z * 0.3) + time * config.waveSpeed) * 0.5;

            // 2. Efecto de elevación por proximidad
            const influence = Math.max(0, 1 - dist / 6); 
            y += influence * 2;

            // 3. Escalar al interactuar
            const scale = 1 + influence;

            // Aplicar transformaciones
            dummy.position.set(data.x, y, data.z);
            dummy.scale.set(scale, scale, scale);
            dummy.rotation.x = y * 0.2;
            dummy.rotation.z = y * 0.2;
            dummy.updateMatrix();
            mesh.setMatrixAt(idx, dummy.matrix);

            // Aplicar color dinámico
            const color = new THREE.Color();
            color.copy(config.colorBase);
            color.lerp(config.colorActive, influence * 0.8);
            mesh.setColorAt(idx, color);

            idx++;
        }
    }
    
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    // Movimiento sutil de cámara
    camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05;
    camera.position.y += (-mouse.y * 2 + 8 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
}

animate();

// --- Resize Handler ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

