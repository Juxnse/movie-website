// Importar cliente de Supabase
import { supabase } from './supabase.js';

// Elemento donde se van a insertar las películas
const movieListContainers = document.querySelectorAll(".movie-list");

// Función para cargar películas desde Supabase
async function cargarPeliculas() {
  const { data: peliculas, error } = await supabase.from('peliculas').select('*');

  if (error) {
    console.error("Error al obtener películas:", error.message);
    return;
  }

  // Limpiar las listas
  movieListContainers.forEach(container => container.innerHTML = "");

  // Crear elementos dinámicamente
  peliculas.forEach(pelicula => {
    // Crear item
    const item = document.createElement('div');
    item.classList.add('movie-list-item');

    // Imagen
    const img = document.createElement('img');
    img.classList.add('movie-list-item-img');
    img.src = pelicula.imagen;
    img.alt = pelicula.titulo;

    // Título
    const title = document.createElement('span');
    title.classList.add('movie-list-item-title');
    title.textContent = pelicula.titulo;

    // Descripción
    const desc = document.createElement('p');
    desc.classList.add('movie-list-item-desc');
    desc.textContent = pelicula.descripcion;

    // Botón Watch
    const button = document.createElement('button');
    button.classList.add('movie-list-item-button');
    button.textContent = 'Watch';

    // Al hacer clic en Watch redirige a detalle.html (futuro)
    button.addEventListener('click', () => {
      localStorage.setItem('peliculaId', pelicula.id);
      window.location.href = 'detalle.html';
    });

    // Agregar elementos al item
    item.appendChild(img);
    item.appendChild(title);
    item.appendChild(desc);
    item.appendChild(button);

    // Agregar item al contenedor
    movieListContainers[0].appendChild(item); // Usamos el primer contenedor
  });
}

// Llamar función al cargar
cargarPeliculas();


// --- Código para el toggle (modo oscuro) que ya tenías ---
const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});

const { data: peliculas, error } = await supabase.from('peliculas').select('*');
console.log("Películas traídas desde Supabase:", peliculas);

button.addEventListener('click', () => {
  localStorage.setItem('peliculaId', pelicula.id);
  window.location.href = 'detalle.html';
});
