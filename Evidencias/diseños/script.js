// Simular carga
let progress = 0;
const loaderOverlay = document.getElementById('loaderOverlay');
const loaderBar = document.getElementById('loaderBar');
const loaderPercentage = document.getElementById('loaderPercentage');
const mainContainer = document.getElementById('mainContainer');
const titleEl = document.querySelector('.title');
const menuContainer = document.getElementById('menuContainer');
// Se asume que el footer se encuentra en el HTML con id "footerEl"
// Asegúrate de tenerlo o puedes comentar la siguiente línea:
const footerEl = document.getElementById('footerEl');

const simulateLoading = setInterval(() => {
  progress += 1;
  loaderBar.style.width = progress + '%';
  loaderPercentage.textContent = progress + '%';

  if(progress >= 100) {
    clearInterval(simulateLoading);
    loaderOverlay.style.opacity = '0';
    setTimeout(() => {
      loaderOverlay.style.display = 'none';
      // Mostrar contenido con animación
      mainContainer.classList.add('visible');
      setTimeout(() => {
        titleEl.classList.add('visible');
        menuContainer.classList.add('visible');
        if (footerEl) {
          footerEl.classList.add('visible');
        }
      }, 500);
    }, 500);
  }
}, 30);

// Crear partículas aleatorias
const particlesContainer = document.querySelector('.particles');
const particleCount = 50;
for (let i = 0; i < particleCount; i++) {
  const p = document.createElement('div');
  p.classList.add('particle');
  const size = Math.random() * 5 + 5;
  p.style.width = size + 'px';
  p.style.height = size + 'px';
  p.style.left = (Math.random() * 100) + 'vw';
  p.style.top = (Math.random() * 100) + 'vh';
  p.style.animationDelay = (Math.random() * 5) + 's';
  p.style.animationDuration = (10 + Math.random() * 10) + 's';
  particlesContainer.appendChild(p);
}

// Reproducir audio tras interacción
const audioElement = document.getElementById('background-audio');
document.body.addEventListener('click', () => {
  if (audioElement.paused) {
    audioElement.play();
  }
}, { once: true });

// Efecto ripple y redirección en botones
const buttons = document.querySelectorAll('.menu-button');
buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const href = button.getAttribute('href');

    // Efecto ripple
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255,255,255,0.2)';
    ripple.style.width = ripple.style.height = '100px';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'ripple-animation 0.6s ease-out';
    const rect = button.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);

    // Pequeña pausa antes de redirigir
    mainContainer.style.opacity = '0';
    setTimeout(() => {
      window.location.href = href;
    }, 1500);
  });
});

// Forzar recarga al volver atrás si la página se carga desde caché
window.addEventListener('pageshow', function(event) {
  if (event.persisted) {
    window.location.reload();
  }
});
