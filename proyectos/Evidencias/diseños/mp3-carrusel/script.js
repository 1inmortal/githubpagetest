// Variables para el carrusel
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const audioPlayer = document.getElementById('audioPlayer');
const trackTitle = document.getElementById('track-title');
let currentIndex = 0;

// Cambiar a la diapositiva actual
function updateCarousel() {
  const currentSlide = slides[currentIndex];
  const color = currentSlide.getAttribute('data-color');
  const audioSrc = currentSlide.getAttribute('data-audio');
  
  // Actualizar estilos
  document.body.style.backgroundColor = color;
  
  // Actualizar el audio
  audioPlayer.src = audioSrc;
  audioPlayer.play();
  
  // Actualizar la posición del carrusel
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
  
  // Cambiar título
  trackTitle.textContent = `Reproduciendo: Pista ${currentIndex + 1}`;
}

// Botones para moverse
prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
});

// Reproducir la primera canción al cargar
document.addEventListener('DOMContentLoaded', updateCarousel);