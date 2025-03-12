/* ==================================================
   FUNCTION: Toggle Menú Móvil (definida globalmente)
   Se encarga de alternar la clase 'open' en el contenedor del menú móvil.
================================================== */
function toggleMobileMenu() {
  // Busca el elemento con id "mobileMenu"
  let mobileMenu = document.getElementById('mobileMenu');
  // Si no se encuentra, intenta seleccionar el primer elemento con la clase "mobile-menu"
  if (!mobileMenu) {
    mobileMenu = document.querySelector('nav.mobile-menu');
  }
  if (mobileMenu) {
    mobileMenu.classList.toggle('open');
  } else {
    console.warn('No se encontró el menú móvil (mobileMenu)');
  }
}

/* ==================================================
   LOADER: SIMULACIÓN DE CARGA INICIAL
================================================== */
let progress = 0;
const loaderOverlay = document.getElementById('loaderOverlay');
const loaderBar = document.getElementById('loaderBar');
const loaderPercentage = document.getElementById('loaderPercentage');
const simulateLoading = setInterval(() => {
  progress += 1;
  loaderBar.style.width = progress + '%';
  loaderPercentage.textContent = progress + '%';
  if (progress >= 100) {
    clearInterval(simulateLoading);
    loaderOverlay.style.opacity = '0';
    setTimeout(() => {
      loaderOverlay.style.display = 'none';
    }, 500);
  }
}, 30);

/* ==================================================
   PARTICULAS: CREACIÓN DINÁMICA DE EFECTOS
================================================== */
const particlesContainer = document.querySelector('.particles');
const particleCount = 70;
for (let i = 0; i < particleCount; i++) {
  const p = document.createElement('div');
  p.classList.add('particle');
  const size = Math.random() * 5 + 4;
  p.style.width = size + 'px';
  p.style.height = size + 'px';
  p.style.left = (Math.random() * 100) + 'vw';
  p.style.top = (Math.random() * 100) + 'vh';
  p.style.animationDelay = (Math.random() * 5) + 's';
  p.style.animationDuration = (10 + Math.random() * 10) + 's';
  particlesContainer.appendChild(p);
}

/* ==================================================
   CURSOR PERSONALIZADO: MOVIMIENTO Y VIBRACIÓN
================================================== */
const cursorDot = document.getElementById('cursor-dot');
const cursorDotExpanded = document.getElementById('cursor-dot-expanded');
document.addEventListener('mousemove', (e) => {
  cursorDot.style.top = e.clientY + 'px';
  cursorDot.style.left = e.clientX + 'px';
  cursorDotExpanded.style.top = e.clientY + 'px';
  cursorDotExpanded.style.left = e.clientX + 'px';
});
document.addEventListener('click', () => {
  if (navigator.vibrate) {
    navigator.vibrate(100);
  }
});

/* ==================================================
   AUDIOS: SONIDOS AL INTERACTUAR
================================================== */
const audioHover = document.getElementById('audio-hover');
const audioClick = document.getElementById('audio-click');
const audioFilterClick = document.getElementById('audio-filter-click');
const audioFilterHover = document.getElementById('audio-filter-hover');

// Sonido para hover en elementos interactivos
const hoverables = document.querySelectorAll('.hoverable');
hoverables.forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (audioHover) {
      audioHover.currentTime = 0;
      audioHover.play().catch(() => {});
    }
  });
});
function playClickSound() {
  if (audioClick) {
    audioClick.currentTime = 0;
    audioClick.play().catch(() => {});
  }
}
function playNavSound() {
  playClickSound();
}
function playFilterClickSound() {
  if (audioFilterClick) {
    audioFilterClick.currentTime = 0;
    audioFilterClick.play().catch(() => {});
  }
}

/* ==================================================
   FILTRO / OVERLAY: MENÚ CON EFECTOS DE TEXTO
================================================== */
const filterOverlay = document.getElementById('filterOverlay');
const filterLinks = document.querySelectorAll('.filter-link');
function toggleFilterOverlay() {
  playFilterClickSound();
  filterOverlay.classList.toggle('active');
}
filterLinks.forEach(link => {
  const realText = link.getAttribute('data-text') || link.textContent;
  link.addEventListener('mouseenter', () => {
    if (audioFilterHover) {
      audioFilterHover.currentTime = 0;
      audioFilterHover.play().catch(() => {});
    }
    scrambleOnHover(link, realText);
  });
  link.addEventListener('mouseleave', () => {
    link.textContent = realText;
    link.classList.remove('scrambled');
  });
});
function scrambleOnHover(element, realText) {
  const chars = "!<>-_\\/[]{}—=+*?0123456789abcdefghijkmnopqrstuvwxyz";
  let iteration = 0;
  const totalIterations = 15;
  const originalText = realText;
  let scrambleInterval = setInterval(() => {
    element.textContent = originalText.split('').map((char, index) => {
      if (index < iteration) {
        return originalText[index];
      }
      return chars[Math.floor(Math.random() * chars.length)];
    }).join('');
    iteration++;
    if (iteration > originalText.length || iteration > totalIterations) {
      clearInterval(scrambleInterval);
      element.textContent = originalText;
    }
  }, 50);
  element.classList.add('scrambled');
}

/* ==================================================
   NAVBAR AUTO-HIDE: OCULTAR/MOSTRAR SEGÚN SCROLL
================================================== */
let lastScrollPos = 0;
const navBar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  navBar.style.top = currentScroll > lastScrollPos ? '-80px' : '20px';
  lastScrollPos = currentScroll;
});

/* ==================================================
   BARRA DE SCROLL: INDICADOR DE PROGRESO
================================================== */
const scrollBar = document.getElementById('scrollProgressBar');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  scrollBar.style.width = progress + '%';
});

/* ==================================================
   EASTER EGG: MENSAJE OCULTO AL HACER 3 CLICS EN HERO
================================================== */
const easterEggMsg = document.getElementById('easterEggMsg');
let heroClickCount = 0;
const heroSection = document.getElementById('hero');
heroSection.addEventListener('click', () => {
  heroClickCount++;
  if (heroClickCount === 3) {
    easterEggMsg.classList.add('active');
    setTimeout(() => {
      easterEggMsg.classList.remove('active');
      heroClickCount = 0;
    }, 3000);
  }
});

/* ==================================================
   MODO OSCURO/CLARO: INTERCAMBIO DE ESTILOS
================================================== */
let isDarkMode = true;
function toggleDarkLightMode() {
  isDarkMode = !isDarkMode;
  const bodyEl = document.getElementById('bodyElement');
  if (isDarkMode) {
    bodyEl.classList.remove('gradient-animated');
  } else {
    bodyEl.classList.add('gradient-animated');
  }
}

/* ==================================================
   MENÚ DE PREFERENCIAS: OPCIONES DEL USUARIO
================================================== */
const preferencesPanel = document.getElementById('preferencesPanel');
let panelOpen = false;
function togglePreferencesPanel() {
  panelOpen = !panelOpen;
  preferencesPanel.classList.toggle('open', panelOpen);
}
const particlesToggle = document.getElementById('particlesToggle');
const cursorToggle = document.getElementById('cursorToggle');
const bgVideoToggle = document.getElementById('bgVideoToggle');
particlesToggle.addEventListener('change', () => {
  particlesContainer.style.display = particlesToggle.checked ? 'block' : 'none';
});
cursorToggle.addEventListener('change', () => {
  if (cursorToggle.checked) {
    document.body.classList.add('custom-cursor');
    cursorDot.style.display = 'block';
    cursorDotExpanded.style.display = 'block';
  } else {
    document.body.classList.remove('custom-cursor');
    cursorDot.style.display = 'none';
    cursorDotExpanded.style.display = 'none';
  }
});
bgVideoToggle.addEventListener('change', () => {
  const bgVideo = document.getElementById('bg-video');
  bgVideo.style.display = bgVideoToggle.checked ? 'block' : 'none';
});

/* ==================================================
   RECARGA AL VOLVER ATRÁS (FORZAR REFRESH)
================================================== */
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    window.location.reload();
  }
});

/* ==================================================
   AUDIO DE FONDO: ACTIVACIÓN AL PRIMER CLIC
================================================== */
document.body.addEventListener('click', () => {
  const audioElement = document.getElementById('background-audio');
  if (audioElement.paused) {
    audioElement.play().catch(() => {});
  }
}, { once: true });

/* ==================================================
   INTERACCIONES CON CHART.JS Y GALERÍA
================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Animaciones para secciones de Proyecto X
  const projectCards = document.querySelectorAll(".projectx-details, .projectx-visuals");
  projectCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.boxShadow = "0 0 20px rgba(0, 255, 255, 0.7)";
      card.style.transform = "translateY(-10px)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.boxShadow = "0 0 10px rgba(0, 255, 255, 0.5)";
      card.style.transform = "translateY(0)";
    });
  });

  // Video Demo: reproducir/pausar al hacer clic
  const video = document.querySelector("video");
  if (video) {
    video.addEventListener("click", () => {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
  }

  // Configuración del gráfico interactivo con Chart.js en Proyecto X
  const ctx = document.getElementById("projectxChart");
  if (ctx) {
    const projectProgressChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
        datasets: [{
          label: "Progreso del Proyecto (%)",
          data: [20, 40, 60, 80, 100],
          borderColor: "cyan",
          backgroundColor: "rgba(0, 255, 255, 0.2)",
          borderWidth: 2,
          tension: 0.4,
          fill: true,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true } },
        scales: {
          x: { grid: { color: "rgba(255, 255, 255, 0.1)" } },
          y: { grid: { color: "rgba(255, 255, 255, 0.1)" } }
        }
      }
    });
    let progressIndex = 0;
    const progressInterval = setInterval(() => {
      if (progressIndex < projectProgressChart.data.labels.length) {
        projectProgressChart.data.datasets[0].data[progressIndex] += Math.random() * 10;
        projectProgressChart.update();
        progressIndex++;
      } else {
        clearInterval(progressInterval);
      }
    }, 2000);

    // Galería: resalta la imagen seleccionada
    const galleryImages = document.querySelectorAll(".gallery img");
    galleryImages.forEach((img, index) => {
      img.addEventListener("click", () => {
        galleryImages.forEach(i => i.style.border = "none");
        img.style.border = "3px solid cyan";
        alert(`Haz seleccionado la imagen ${index + 1}`);
      });
    });
  }
});






