// Sincronizar las letras con la canción
const audio = document.querySelector('audio');
const lyrics = document.querySelector('#lyrics');

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
const lyricsData = [
  { text: 'Yo sé que ya no estás para mi, yeah', time: 21 },
  { text: '¿Tus amigas me odian? Casi', time: 24 },
  { text: 'No sé, quizás salga más tarde', time: 27 },
  { text: 'Mi cabeza quiere matarme, yeah (Yeah), yeah (Yeah-yeah)', time: 30 },
  { text: 'No es tu culpa, amor, fui yo', time: 35 },
  { text: 'No miento, se que eres perfecta', time: 38 },
  { text: '¿Es mi sábana tu abrigo?', time: 42 },
  { text: 'Y tu mi vida para que entiendas', time: 45 },
  { text: 'Que me haces falta (Eh)', time: 48 },
  { text: 'Entre ellas tú resaltas', time: 51 },
  { text: 'En fotos sin mi te ves tan bien (Bien, yeah)', time: 54 },
  { text: 'Y verte bien me encanta', time: 58 },
  { text: 'Ma ya extraño llamarte a las 12, yeah', time: 61 },
  { text: 'Todo el día hablaba contigo y ahora no estas aquí', time: 64 },
  { text: 'Como si no me conoces, yeah', time: 68 },
  { text: 'Solo quiero más de ti (Yeh), yeh', time: 72 },
  { text: 'No es tu culpa, amor, fui yo', time: 76 },
  { text: 'No miento, se que eres perfecta', time: 80 },
  { text: '¿Es mi sábana tu abrigo?', time: 83 },
  { text: 'Y tu mi vida para que entiendas', time: 86 },
  { text: 'No es tu culpa, amor, soy yo', time: 90 },
  { text: 'No miento, se que eres perfecta', time: 94 },
  { text: '¿Es mi sábana tu abrigo?', time: 96 },
  { text: 'Y tu mi vida para que entiendas', time: 101 }

];

// Animar las letras
function updateLyrics () {
  const time = Math.floor(audio.currentTime);
  const currentLine = lyricsData.find(
    (line) => time >= line.time && time < line.time + 6
  );

  if (currentLine) {
    // Calcula la opacidad basada en el tiempo en la línea actual
    const fadeInDuration = 0.1; // Duración del efecto de aparición en segundos
    const opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);

    // Aplica el efecto de aparición
    lyrics.style.opacity = opacity;
    lyrics.innerHTML = currentLine.text;
  } else {
    // Restablece la opacidad y el contenido si no hay una línea actual
    lyrics.style.opacity = 0;
    lyrics.innerHTML = '';
  }
}

setInterval(updateLyrics, 1000);

//funcion titulo
// Función para ocultar el título después de 216 segundos
function ocultarTitulo () {
  const titulo = document.querySelector('.titulo');
  titulo.style.animation =
    'fadeOut 3s ease-in-out forwards'; /* Duración y función de temporización de la desaparición */
  setTimeout(function () {
    titulo.style.display = 'none';
  }, 3000); // Espera 3 segundos antes de ocultar completamente
}

// Llama a la función después de 216 segundos (216,000 milisegundos)
setTimeout(ocultarTitulo, 216000);
