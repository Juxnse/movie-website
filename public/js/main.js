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
