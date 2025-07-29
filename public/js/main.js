import { renderPeliculas, actualizarNavbar } from './ui.js';
import { escucharCambiosPeliculas } from './peliculas.js';
import { inicializarToggle } from './toggle.js';

/* Guardar ID de película para detalle (Supabase) */
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

  // Inicializar controles de flechas
  inicializarFlechasCarrusel();
});

// Función para mostrar modal con detalles de TMDB
window.mostrarModal = function (id) {
  const movie = window.tmdbPeliculas.find(m => m.id === id);
  const modal = document.getElementById('modal');
  const content = document.getElementById('modal-content');
  console.log("Abriendo modal para ID:", id);

  if (!movie) {
    content.innerHTML = `<p>No se encontró la película.</p>`;
    modal.classList.remove('hidden');
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

  modal.classList.remove('hidden');
};

// Función para cerrar el modal
window.cerrarModal = function () {
  const modal = document.getElementById('modal');
  modal.classList.add('hidden');
};

/* ----------- Lógica para flechas de carrusel ----------- */
function inicializarFlechasCarrusel() {
  // Selecciona todos los contenedores de listas de películas
  document.querySelectorAll('.movie-list-wrapper').forEach(wrapper => {
    const list = wrapper.querySelector('.movie-list');
    const rightArrow = wrapper.querySelector('.arrow.right');
    const leftArrow = wrapper.querySelector('.arrow.left');

    let scrollAmount = 0;
    const scrollStep = 300; // píxeles por desplazamiento, ajusta según tu diseño

    // Flecha derecha
    rightArrow.addEventListener('click', () => {
      scrollAmount += scrollStep;
      list.style.transform = `translateX(-${scrollAmount}px)`;
    });

    // Flecha izquierda
    leftArrow.addEventListener('click', () => {
      scrollAmount -= scrollStep;
      if (scrollAmount < 0) scrollAmount = 0; // evitar sobrepasar el inicio
      list.style.transform = `translateX(-${scrollAmount}px)`;
    });
  });
}
