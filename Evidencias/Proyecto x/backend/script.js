// ================== Funciones de Favoritos ==================
document.querySelectorAll('.favorite-btn').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('btn-primary');
    if (button.classList.contains('btn-primary')) {
      button.innerText = '❤ Favorito';
      // Aquí podrías añadir lógica para guardar el favorito en la base de datos
    } else {
      button.innerText = '❤ Favorito';
      // Aquí podrías añadir lógica para eliminar el favorito de la base de datos
    }
  });
});

// ================== Funciones de Compartir ==================
document.querySelectorAll('.share-btn').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const card = button.closest('.card');
    const title = card.querySelector('.card-title').innerText;
    const url = window.location.origin + '/' + card.querySelector('a').getAttribute('href');
    navigator.clipboard.writeText(url).then(() => {
      alert('URL copiada al portapapeles!');
    }).catch(err => {
      console.error('Error al copiar:', err);
    });
  });
});

// ================== Función de Búsqueda Avanzada ==================
document.getElementById('search-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('search-title').value;
  const genre = document.getElementById('search-genre').value;
  const author = document.getElementById('search-author').value;

  // Lógica de búsqueda: enviar parámetros al servidor o filtrar en el frontend
  console.log(`Buscar: Título=${title}, Género=${genre}, Autor=${author}`);
});

// ================== Funciones de Comentarios y Calificaciones ==================

// Simulación de comentarios
const commentsContainer = document.querySelector('.comments-container');

// Función para renderizar un comentario
function renderComment(author, text, rating) {
  const commentDiv = document.createElement('div');
  commentDiv.classList.add('comment', 'animate__animated', 'animate__fadeIn');

  const authorP = document.createElement('p');
  authorP.classList.add('author');
  authorP.innerText = author;

  const ratingP = document.createElement('p');
  ratingP.classList.add('rating');
  ratingP.innerText = '★'.repeat(rating);

  const textP = document.createElement('p');
  textP.innerText = text;

  commentDiv.appendChild(authorP);
  commentDiv.appendChild(ratingP);
  commentDiv.appendChild(textP);

  commentsContainer.appendChild(commentDiv);
}

// Manejar el envío del formulario de comentarios
document.getElementById('comment-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const commentText = document.getElementById('comment-text').value;
  const rating = document.getElementById('rating').value;

  if(commentText && rating){
    // Aquí podrías enviar los datos al servidor
    renderComment('Usuario', commentText, rating);
    e.target.reset();
    // Actualizar recompensas
    actualizarRecompensas();
  }
});

// ================== Sistema de Recompensas ==================
let commentCount = 0;

function actualizarRecompensas() {
  commentCount += 1;
  if(commentCount === 10){
    alert('¡Has alcanzado el nivel Bronce!');
    // Aquí podrías actualizar el perfil del usuario
  }
  if(commentCount === 50){
    alert('¡Has alcanzado el nivel Plata!');
    // Aquí podrías actualizar el perfil del usuario
  }
  if(commentCount === 100){
    alert('¡Has alcanzado el nivel Oro!');
    // Aquí podrías actualizar el perfil del usuario
  }
}

// ================== Funciones del Modal ==================
// Obtener elementos del modal
const bookModal = new bootstrap.Modal(document.getElementById('bookModal'));
const modalTitle = document.getElementById('bookModalLabel');
const modalImage = document.getElementById('modal-book-image');
const modalDescription = document.getElementById('modal-book-description');
const modalMultimedia = document.getElementById('modal-book-multimedia');

// Agregar eventos a las tarjetas de libros
document.querySelectorAll('#library-logos .card').forEach(card => {
  card.addEventListener('click', () => {
    const title = card.querySelector('.card-title').innerText;
    const imageSrc = card.querySelector('img').src;
    const description = 'Descripción detallada del libro...'; // Esto debería ser dinámico
    const multimedia = ''; // Aquí puedes agregar contenido multimedia

    modalTitle.innerText = title;
    modalImage.src = imageSrc;
    modalDescription.innerText = description;
    modalMultimedia.innerHTML = multimedia;

    bookModal.show();
  });
});

// ================== Funciones de Notificaciones en Tiempo Real ==================
// Simulación de notificaciones
function mostrarNotificacion(mensaje) {
  const notif = document.createElement('div');
  notif.classList.add('toast', 'align-items-center', 'text-bg-primary', 'border-0', 'show');
  notif.setAttribute('role', 'alert');
  notif.setAttribute('aria-live', 'assertive');
  notif.setAttribute('aria-atomic', 'true');

  notif.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        ${mensaje}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button>
    </div>
  `;

  document.body.appendChild(notif);

  setTimeout(() => {
    notif.remove();
  }, 5000);
}

// Ejemplo de uso
// mostrarNotificacion('¡Tienes un nuevo comentario!');

// ================== Funciones de Perfil Personalizable ==================
// Aquí podrías agregar funciones para editar el perfil del usuario
// Por ejemplo, cambiar foto, biografía, etc.

// ================== Funciones de Multilenguaje ==================
// Simulación de cambio de idioma
document.getElementById('language-select')?.addEventListener('change', (e) => {
  const idioma = e.target.value;
  // Lógica para cambiar el idioma de la interfaz
  console.log(`Idioma seleccionado: ${idioma}`);
});

// ================== Funciones de Lectura Offline ==================
// Implementación de Service Workers para lectura offline
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker registrado:', reg))
      .catch(err => console.error('Service Worker fallo:', err));
  });
}
