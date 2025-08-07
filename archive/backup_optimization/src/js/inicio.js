/******************************************************
 PANTALLA DE CARGA (LOADER)
-------------------------------------------------------
Simulamos la progresión de carga de 0 a 100%,
actualizando la barra y el texto. Al llegar a 100%
ocultamos el overlay y revelamos el header y el hero.
******************************************************/
let progress = 0;
const loaderBar = document.getElementById('loaderBar');
const loaderPercentage = document.getElementById('loaderPercentage');
const loaderOverlayEl = document.getElementById('loaderOverlay');

// Intervalo para simular la carga (incrementa 1% cada 30ms)
const simulateLoading = setInterval(() => {
  progress += 1;
  loaderBar.style.width = progress + '%';
  loaderPercentage.textContent = progress + '%';

  if (progress >= 100) {
    clearInterval(simulateLoading);
    // Transición suave para ocultar el overlay
    loaderOverlayEl.style.opacity = '0';
    setTimeout(() => {
      loaderOverlayEl.style.display = 'none';
      // Mostrar el header y sección hero con animación
      const mainHeader = document.getElementById('mainHeader');
      mainHeader.classList.add('visible');
      const heroSection = document.querySelector('.hero');
      heroSection.classList.add('visible');
    }, 500);
  }
}, 30);


/******************************************************
 MENÚ FILTRAR + OVERLAY + SONIDO DE CLIC
-------------------------------------------------------
Se despliega un panel de filtros al pulsar el botón,
mostrando también un overlay semitransparente detrás.
Incluimos un sonido de clic y cerramos todo al hacer 
clic en el overlay o fuera del panel.
******************************************************/
const filterBtn = document.getElementById('filter-btn');
const filterPanel = document.getElementById('filter-panel');
const filterOverlay = document.getElementById('filterOverlay'); // <div id="filterOverlay">
const clickSound = new Audio('Audio/Sound-mp3/Sound.mp3');

// Al hacer clic en "Filtrar"
filterBtn.addEventListener('click', (e) => {
  e.stopPropagation();    // Evitar propagación al documento
  clickSound.play();

  // Alternar las clases "open" en panel y overlay
  filterPanel.classList.toggle('open');
  filterOverlay.classList.toggle('open');
});

// Al hacer clic en el overlay, cerramos el panel y el overlay
filterOverlay.addEventListener('click', () => {
  filterPanel.classList.remove('open');
  filterOverlay.classList.remove('open');
});

// Cerrar el panel si clicamos fuera de él y del botón "Filtrar"
document.addEventListener('click', (e) => {
  if (!filterPanel.contains(e.target) && !filterBtn.contains(e.target)) {
    filterPanel.classList.remove('open');
    filterOverlay.classList.remove('open');
  }
});


/******************************************************
 SCROLL REVEAL
-------------------------------------------------------
Hace que ciertos elementos (con clase .reveal, 
.section-title, etc.) se animen al entrar en el viewport.
******************************************************/
const reveals = document.querySelectorAll(
  '.reveal, .section-title, .contact-section p, .contact-button, .about, .skills, .blog'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.1 });

// Observamos cada elemento "reveal"
reveals.forEach(el => observer.observe(el));


/******************************************************
 CARRUSEL DE TESTIMONIOS
-------------------------------------------------------
Permite cambiar entre varios testimonios con transiciones.
******************************************************/
const testimonials = document.querySelectorAll('.testimonial');
const buttons = document.querySelectorAll('.carousel-controls button');
let currentIndex = 0;

// Agregamos listeners a los botones de control
buttons.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    changeTestimonial(i);
  });
});

function changeTestimonial(index) {
  testimonials[currentIndex].classList.remove('active');
  buttons[currentIndex].classList.remove('active');
  currentIndex = index;
  testimonials[currentIndex].classList.add('active');
  buttons[currentIndex].classList.add('active');
}


/******************************************************
 PARTÍCULAS ALEATORIAS
-------------------------------------------------------
Genera un número definido de partículas que flotan 
aleatoriamente desde abajo hacia arriba en la pantalla.
******************************************************/
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


/******************************************************
 AUDIO DE FONDO AL PRIMER CLIC
-------------------------------------------------------
Reproduce la música de fondo (si está en pausa) 
cuando el usuario hace clic por primera vez en la página.
******************************************************/
document.body.addEventListener('click', () => {
  const audioElement = document.getElementById('background-audio');
  if (audioElement.paused) {
    audioElement.play();
  }
}, { once: true });


