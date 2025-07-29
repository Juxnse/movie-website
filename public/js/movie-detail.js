import { environment } from './environment.js';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: environment.apikey
    }
};

const container = document.getElementById('movie-detail');
const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');

// Función para obtener el tráiler de una película

(async function cargarDetalle() {
    if (!movieId) {
        container.innerHTML = '<p>No se encontró la película.</p>';
        return;
    }

    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
        const data = await response.json();

        if (!data.results) {
            container.innerHTML = '<p>Error al obtener la lista de películas.</p>';
            console.error('Respuesta inesperada:', data);
            return;
        }

        const pelicula = data.results.find(p => String(p.id) === movieId);

        if (!pelicula) {
            container.innerHTML = '<p>Película no encontrada en la lista.</p>';
            return;
        }
        mostrarDetalle(pelicula);

  } catch (error) {
    container.innerHTML = '<p>Error cargando detalles.</p>';
    console.error('Error en fetch:', error);
  }
})();

// Mostrar detalle
function mostrarDetalle(movie) {
  container.innerHTML = `
    <h1>${movie.title}</h1>
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
    <p><strong>Fecha de estreno:</strong> ${movie.release_date}</p>
    <p><strong>Promedio de votos:</strong> ${movie.vote_average}</p>
    <p><strong>Descripción:</strong> ${movie.overview}</p>
    <a href="index.html" class="btn-auth">← Volver al inicio</a>
  `;
}
