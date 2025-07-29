import { renderPeliculas, actualizarNavbar } from './ui.js';
import { escucharCambiosPeliculas } from './peliculas.js';
import { inicializarToggle } from './toggle.js';

/* Guardar ID de película para detalle */
window.verDetalle = (id) => {
  localStorage.setItem('peliculaId', id);
  window.location.href = 'detalle.html';
};

/* Inicialización al cargar la página */
document.addEventListener('DOMContentLoaded', async () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  actualizarNavbar(usuario);

  // Contenedor para Supabase (películas propias)
  const supabaseContainer = document.getElementById('supabase-list');

  if (!usuario) {
    supabaseContainer.innerHTML = "<p style='padding:20px;'>Debes iniciar sesión para ver las películas de la plataforma.</p>";
  } else {
    async function cargarPeliculasSupabase() {
      await renderPeliculas(supabaseContainer);
    }

    await cargarPeliculasSupabase();
    escucharCambiosPeliculas(cargarPeliculasSupabase);
  }

  // Activar modo oscuro/claro
  inicializarToggle();
});

// Función para mostrar modal con detalles de la película
window.mostrarModal = function (id) {
  const movie = window.tmdbPeliculas.find(m => m.id === id);
  const modal = document.getElementById('modal');
  const content = document.getElementById('modal-content');
  console.log("Abriendo modal para ID:", id);

  if (!movie) {
    content.innerHTML = `<p>No se encontró la película.</p>`;
    modal.classList.remove('hide');
    modal.classList.add('show');
    return;
  }

  content.innerHTML = `
    <h2>${movie.title}</h2>
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
    <p><strong>Fecha de estreno:</strong> ${movie.release_date}</p>
    <p><strong>Promedio de votos:</strong> ${movie.vote_average}</p>
    <p><strong>Descripción:</strong> ${movie.overview}</p>
    <button onclick="cerrarModal()">Cerrar</button>
  `;
  modal.classList.remove('hide');
  modal.classList.add('show');
};

// Función para cerrar el modal
window.cerrarModal = function () {
  const modal = document.querySelector('.modal');
  modal.classList.remove('show');
  modal.classList.add('hide');

};

