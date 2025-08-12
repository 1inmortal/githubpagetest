/************************************************************
 * DATOS PARA CERTIFICADOS DETALLADOS
 ************************************************************/
const certificatesData = {
  cert1: {
    title: 'Desarrollo Web',
    institution: 'Inst. Tecnológico XYZ',
    date: 'Marzo 2023',
    image: 'src/img/certificado1.jpg',
    description: 'Certificado oficial de un programa completo en Desarrollo Web. Abordó desde conceptos básicos de HTML/CSS/JS hasta frameworks modernos.'
  },
  cert2: {
    title: 'Data Science',
    institution: 'Plataforma Online ABC',
    date: 'Junio 2024',
    image: 'src/img/certificado2.jpg',
    description: 'Especialización en Data Science, cubriendo análisis de datos, estadística y machine learning con Python y herramientas de visualización.'
  },
  cert3: {
    title: 'Inteligencia Artificial',
    institution: 'Univ. DEF',
    date: 'Dic 2022',
    image: 'src/img/certificado3.jpg',
    description: 'Diploma avanzado que respalda conocimientos en IA, redes neuronales, procesamiento de lenguaje natural y visión por computadora.'
  }
};

/************************************************************
   * MANEJO DEL MODAL DE CERTIFICADOS
   ************************************************************/
const modal = document.getElementById('certificateModal');
const modalImage = document.getElementById('modalImage');
const modalDetails = document.getElementById('modalDetails');
const closeModal = document.getElementsByClassName('close-modal')[0];

// Seleccionar todas las tarjetas de certificados
const certificateCards = document.querySelectorAll('.certificate-card');
certificateCards.forEach(card => {
  card.addEventListener('click', () => {
    const certId = card.getAttribute('data-id');
    const data = certificatesData[certId];

    if (data) {
      // Actualizar la imagen del modal
      modalImage.src = data.image;

      // Actualizar los detalles del certificado en el modal
      modalDetails.innerHTML = `
          <h3 style="color:#ffbfc6; margin-bottom:4px;">${data.title}</h3>
          <p><strong>Institución:</strong> ${data.institution}</p>
          <p><strong>Fecha:</strong> ${data.date}</p>
          <p style="margin-top:8px;">${data.description}</p>
          <a href="${data.image}" download class="download-btn" style="margin-top:10px; display:inline-flex;">
            <i class="fas fa-download"></i> Descargar Certificado
          </a>
        `;
      // Mostrar el modal
      modal.style.display = 'block';
      // Reproducir sonido de apertura
      playSound('open');
    }
  });
});

// Cerrar el modal al hacer clic en el botón de cerrar
closeModal.onclick = function () {
  modal.style.display = 'none';
  playSound('close');
};

// Cerrar el modal al hacer clic fuera del contenido del modal
window.onclick = function (e) {
  if (e.target == modal) {
    modal.style.display = 'none';
    playSound('close');
  }
};

/************************************************************
   * FUNCIÓN PARA DESCARGAR ARCHIVOS
   ************************************************************/
function downloadFile (filePath) {
  window.open(filePath, '_blank');
  playSound('download');
}

/************************************************************
   * SONIDOS (Howler.js)
   ************************************************************/
const sounds = {
  open: new Howl({ src: ['src/audio/open.mp3'], volume: 0.5 }),
  close: new Howl({ src: ['src/audio/close.mp3'], volume: 0.5 }),
  download: new Howl({ src: ['src/audio/download.mp3'], volume: 0.5 }),
  hover: new Howl({ src: ['src/audio/hover.mp3'], volume: 0.3 })
};

/**
   * Función para reproducir un sonido específico
   * @param {string} name - Nombre del sonido a reproducir
   */
function playSound (name) {
  if (sounds[name]) sounds[name].play();
}

/************************************************************
   * EFECTO SONORO AL PASAR EL RATÓN (hover)
   ************************************************************/
const hoverElements = document.querySelectorAll('.achievement-card, .certificate-card, .tool-item');
hoverElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    playSound('hover');
  });
});
