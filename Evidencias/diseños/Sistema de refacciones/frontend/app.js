/* ==========================================================================
   VARIABLES GLOBALES
   ========================================================================== */

// Audio de fondo (puedes colocar un audio .mp3 en tu carpeta de sounds)
let bgAudio = new Audio("assets/sounds/background.mp3");
bgAudio.loop = true;
bgAudio.volume = 0.3;

// Sonido para clics en botones
let clickAudio = new Audio("assets/sounds/click.mp3");
clickAudio.volume = 0.7;

/* ==========================================================================
   DOMContentLoaded
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Iniciar audio de fondo (opcional)
  // bgAudio.play().catch((err) => {
  //   console.log("Reproducción automática bloqueada. Inicia manualmente.");
  // });

  // Efecto en la navegación al hacer scroll
  window.addEventListener("scroll", () => {
    const nav = document.querySelector(".super-navbar");
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  // Agregar sonido de clic a botones
  document.querySelectorAll("button, a").forEach((element) => {
    element.addEventListener("click", () => {
      clickAudio.currentTime = 0;
      clickAudio.play();
    });
  });

  // Inicializar GSAP y ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Animación de aparición de tarjetas de producto
  gsap.from(".tarjeta-producto", {
    scrollTrigger: {
      trigger: ".section-productos",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out",
  });

  // Animación de los servicios
  gsap.from(".servicio-card", {
    scrollTrigger: {
      trigger: ".section-servicios",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
    x: -100,
    opacity: 0,
    duration: 1,
    stagger: 0.3,
    ease: "power1.out",
  });

  // Animación de la sección de contacto
  gsap.from("#seccion-contacto", {
    scrollTrigger: {
      trigger: "#seccion-contacto",
      start: "top 90%",
      end: "bottom 10%",
      toggleActions: "play none none reverse",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "back.out(1.7)",
  });

  // Manejo del formulario de contacto
  const formContacto = document.getElementById("form-contacto");
  formContacto.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Tu mensaje se ha enviado correctamente!");
    formContacto.reset();
  });

  /* ===================
     THREE.JS - WEBGL
     =================== */
  const containerWebGL = document.getElementById("webgl-container");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    containerWebGL.clientWidth / containerWebGL.clientHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(containerWebGL.clientWidth, containerWebGL.clientHeight);
  containerWebGL.appendChild(renderer.domElement);

  // Crear un objeto 3D (TorusKnot)
  const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
  const material = new THREE.MeshBasicMaterial({
    color: 0xff3c48,
    wireframe: true,
  });
  const knot = new THREE.Mesh(geometry, material);
  scene.add(knot);

  camera.position.z = 50;

  // Animación del knot
  function animate() {
    requestAnimationFrame(animate);
    knot.rotation.x += 0.01;
    knot.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();

  // Responsividad
  window.addEventListener("resize", () => {
    camera.aspect =
      containerWebGL.clientWidth / containerWebGL.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(containerWebGL.clientWidth, containerWebGL.clientHeight);
  });
});

/* ==========================================================================
   EJEMPLOS DE FUNCIONES QUE PUEDES AÑADIR PARA CRECER EL PROYECTO
   ========================================================================== */

/**
 * Animación masiva de entrada
 */
function megaIntroAnimation() {
  gsap.from("body", {
    duration: 2,
    opacity: 0,
    ease: "power2.inOut",
  });
}

/**
 * Generar tarjetas de producto dinámicamente (ejemplo)
 */
function generarMasTarjetas(num) {
  const row = document.querySelector(".productos-row");
  for (let i = 0; i < num; i++) {
    const col = document.createElement("div");
    col.classList.add("col", "mb-4");

    const card = document.createElement("div");
    card.classList.add("card", "tarjeta-producto", "hvr-rotate");

    const img = document.createElement("img");
    img.src = "https://via.placeholder.com/300";
    img.alt = `Producto Dinámico ${i+1}`;
    img.className = "card-img-top";

    const bodyCard = document.createElement("div");
    bodyCard.className = "card-body";

    const h5 = document.createElement("h5");
    h5.className = "card-title font-weight-bold";
    h5.innerText = `Producto Dinámico ${i+1}`;

    const p = document.createElement("p");
    p.className = "card-text";
    p.innerText =
      "Descripción detallada de este producto generado dinámicamente.";

    const btn = document.createElement("button");
    btn.classList.add("btn", "btn-outline-primary", "btn-detalles", "hvr-shrink");
    btn.innerText = "Ver Detalles";
    btn.addEventListener("click", () => {
      alert(`Detalles del producto ${i+1}`);
    });

    bodyCard.appendChild(h5);
    bodyCard.appendChild(p);
    bodyCard.appendChild(btn);
    card.appendChild(img);
    card.appendChild(bodyCard);
    col.appendChild(card);
    row.appendChild(col);
  }
}

// Puedes llamar a generarMasTarjetas(10) para añadir 10 tarjetas dinámicamente
// generarMasTarjetas(10);

/* 
   Para llegar a miles de líneas, continúa añadiendo más funciones,
   más animaciones, más lógicas con GSAP, Three.js, etc.
*/
