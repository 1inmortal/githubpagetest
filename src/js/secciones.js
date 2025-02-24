// ================================
// LIGHT/DARK MODE
// ================================
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;
themeToggle.addEventListener('click', () => {
  if(htmlEl.getAttribute('data-theme') === 'dark') {
    htmlEl.setAttribute('data-theme','light');
    // Ajustar colores para modo claro, si deseas
    themeToggle.textContent = 'Dark Mode';
  } else {
    htmlEl.setAttribute('data-theme','dark');
    themeToggle.textContent = 'Light Mode';
  }
});

// ================================
// FILTRO/BÚSQUEDA INTERNA (EJEMPLO BÁSICO)
// ================================
const searchProjectInput = document.getElementById('searchProjectInput');
const searchProjectBtn = document.getElementById('searchProjectBtn');
const projectGrid = document.getElementById('projectGrid');
searchProjectBtn.addEventListener('click', () => {
  const term = searchProjectInput.value.toLowerCase();
  const items = projectGrid.querySelectorAll('.project-item');
  items.forEach(item => {
    const text = item.innerText.toLowerCase();
    item.style.display = text.includes(term) ? 'block' : 'none';
  });
});

// ================================
// GAMIFICACIÓN (EJEMPLO BÁSICO)
// ================================
const gamificationBanner = document.getElementById('gamificationBanner');
const gamificationMessage = document.getElementById('gamificationMessage');
let clicks = 0;
gamificationBanner.addEventListener('click', () => {
  clicks++;
  if(clicks === 3){
    gamificationMessage.textContent = '¡Felicidades! Has descubierto el Easter Egg. 🎉';
  } else {
    gamificationMessage.textContent = `Has hecho clic ${clicks} veces... ¡Sigue intentando!`;
  }
});

// ================================
// DESCARGAS
// ================================
const downloadButtons = document.querySelectorAll('.download-item button');
downloadButtons.forEach(btn => {
  btn.addEventListener('click', ()=> {
    const file = btn.getAttribute('data-file');
    window.open(file, '_blank');
  });
});

// ================================
// INTERNACIONALIZACIÓN BÁSICA
// ================================
const langToggle = document.getElementById('langToggle');
langToggle.addEventListener('click', () => {
  if(langToggle.textContent === 'EN'){
    // Cambiar a inglés (Ejemplo mínimo)
    langToggle.textContent = 'ES';
    document.getElementById('heroTitle').textContent = 'IMMORTAL PORTFOLIO';
    document.getElementById('heroSubtitle').textContent = 
      'Creating impossible digital experiences, merging aesthetics, technology, and glitch effects that defy logic, with dancing auroras and interactive particles.';
    document.getElementById('testimonialsTitle').textContent = 'What They Say';
    document.getElementById('aboutText').innerHTML = `
      <p>I am a developer passionate about creating innovative digital experiences. With a solid background in design and programming, 
      I specialize in merging aesthetics and functionality to provide solutions that are not only visually appealing but also highly efficient.</p>
      <p>My approach focuses on understanding clients’ and users’ needs to develop projects that exceed their expectations. 
      I always seek to stay up-to-date with the latest trends and technologies to ensure each project is relevant and cutting-edge.</p>
    `;
    document.getElementById('contactTitle').textContent = 'Let’s Talk';
    document.getElementById('contactIntro').textContent = 
      'Ready to boost your next project? This is where technology, art, and interaction converge. Get in touch.';
    document.getElementById('contactBtn').textContent = 'Contact Me';
    document.getElementById('footerCopy').textContent = '© 2024 Futurism. All rights reserved.';
  } else {
    // Cambiar a español
    langToggle.textContent = 'EN';
    document.getElementById('heroTitle').textContent = 'PORTAFOLIO DE INMORTAL';
    document.getElementById('heroSubtitle').textContent = 
      'Creando experiencias digitales imposibles, fusionando estética, tecnología y efectos glitch que desafían la lógica, con auroras danzantes y partículas interactivas.';
    document.getElementById('testimonialsTitle').textContent = 'Lo Que Dicen';
    document.getElementById('aboutText').innerHTML = `
      <p>Soy un desarrollador apasionado por la creación de experiencias digitales 
      innovadoras. Con una sólida formación en diseño y programación, me especializo 
      en fusionar estética y funcionalidad para ofrecer soluciones que no solo son 
      visualmente atractivas sino también altamente eficientes.</p>
      <p>Mi enfoque se centra en entender las necesidades de mis clientes y usuarios 
      para desarrollar proyectos que superen sus expectativas. Siempre busco estar 
      al día con las últimas tendencias y tecnologías para asegurar que cada proyecto 
      sea relevante y de vanguardia.</p>
    `;
    document.getElementById('contactTitle').textContent = 'Hablemos';
    document.getElementById('contactIntro').textContent = 
      '¿Listo para impulsar tu siguiente proyecto? Aquí la tecnología, el arte y la interacción convergen. Contáctame.';
    document.getElementById('contactBtn').textContent = 'Contactar';
    document.getElementById('footerCopy').textContent = '© 2024 Futurismo. Todos los derechos reservados.';
  }
});

// ================================
// BARRAS DE PROGRESO DINÁMICAS (SKILLS)
// ================================
const skillFills = document.querySelectorAll('.progress-bar-fill');
const skillsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const fillEl = entry.target;
      const level = fillEl.getAttribute('data-skill-level');
      fillEl.style.width = level + '%';
    }
  });
}, {threshold:0.5});
skillFills.forEach(el => skillsObserver.observe(el));

// ================================
// FAQ INTERACTIVO
// ================================
// Seleccionar todos los contenedores de FAQ
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  
  // Al hacer clic en la pregunta, alternar la clase "open"
  question.addEventListener('click', () => {
    item.classList.toggle('open');
  });
});

// ================================
// LAZY LOADING PARA IMÁGENES Y VIDEOS
// ================================
const lazyImages = document.querySelectorAll('img[data-src], video[data-src]');
const lazyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const lazyEl = entry.target;
      const src = lazyEl.getAttribute('data-src');
      if(src){
        lazyEl.src = src;
        lazyEl.removeAttribute('data-src');
      }
      lazyObserver.unobserve(lazyEl);
    }
  });
}, {rootMargin: "0px 0px 200px 0px"});
lazyImages.forEach(el => {
  lazyObserver.observe(el);
});

// ================================
// ANIMACIÓN DE SCRAMBLE EN ENLACES DEL MENÚ DEL FILTRO
// ================================
const menuLinks = document.querySelectorAll('.nav-link');

menuLinks.forEach(link => {
  let originalText = link.textContent;
  let scrambling = false;
  let scrambleInterval;

  link.addEventListener('mouseenter', () => {
    if (scrambling) return;
    scrambling = true;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let iteration = 0;
    const totalIterations = 20;

    scrambleInterval = setInterval(() => {
      link.textContent = originalText.split('').map((char, index) => {
        if(index < iteration){
          return originalText[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      iteration++;
      if(iteration > originalText.length || iteration > totalIterations){
        clearInterval(scrambleInterval);
        link.textContent = originalText;
        scrambling = false;
      }
    }, 50);
  });

  link.addEventListener('mouseleave', () => {
    if(scrambling){
      clearInterval(scrambleInterval);
      link.textContent = originalText;
      scrambling = false;
    }
  });
});

// ================================
// SONIDO DE HOVER EN ENLACES DEL FILTRO
// ================================
const filterLinks = document.querySelectorAll('.filter-panel .nav-link');
const hoverAudio = document.getElementById('hoverSound');
hoverAudio.volume = 0.5; // Ajusta el volumen si es necesario

filterLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    hoverAudio.currentTime = 0; // Reiniciar el audio
    hoverAudio.play();
  });
});
