import { obtenerPeliculaPorId } from './peliculas.js';

document.addEventListener('DOMContentLoaded', async () => {
  const peliculaId = localStorage.getItem('peliculaId');
  if (!peliculaId) {
    window.location.href = 'index.html';
    return;
  }

  try {
    const pelicula = await obtenerPeliculaPorId(peliculaId);

    document.getElementById('titulo').textContent = pelicula.titulo;
    document.getElementById('imagen').src = pelicula.imagen;
    document.getElementById('descripcion').textContent = pelicula.descripcion;
    document.getElementById('categoria').textContent = `Categoría: ${pelicula.categoria}`;

    if (pelicula.video_url) {
      document.getElementById('video-source').src = pelicula.video_url;
      document.getElementById('video-player').load();
    } else {
      document.getElementById('video-container').innerHTML = "<p style='color:white;'>No hay video disponible para esta película.</p>";
    }
  } catch {
    alert('Error al cargar película');
    window.location.href = 'index.html';
  }
});
