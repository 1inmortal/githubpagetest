// main.js
onload = () => {
  document.body.classList.remove('container');

  const audio = document.querySelector('audio');
  // Necesitamos una interacción del usuario para reproducir el audio
  document.addEventListener('click', () => {
    audio.play();
  });
};
