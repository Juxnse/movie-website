import { renderPeliculas, actualizarNavbar } from './ui.js';
import { escucharCambiosPeliculas } from './peliculas.js';
import { inicializarToggle } from './toggle.js';

window.verDetalle = (id) => {
  localStorage.setItem('peliculaId', id);
  window.location.href = 'detalle.html';
};

document.addEventListener('DOMContentLoaded', async () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  actualizarNavbar(usuario);

  const movieListContainer = document.querySelector('.movie-list');

  if (!usuario) {
    movieListContainer.innerHTML = "<p style='padding:20px;'>Debes iniciar sesión para ver las películas.</p>";
    return;
  }

  async function cargarPeliculas() {
    await renderPeliculas(movieListContainer);
  }

  await cargarPeliculas();
  escucharCambiosPeliculas(cargarPeliculas);

  inicializarToggle();
});
