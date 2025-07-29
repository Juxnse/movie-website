import { environment } from './environment.js';
import { supabase } from './supabase.js';

const tmdbContainer = document.getElementById('tmdb-list');
const supabaseContainer = document.getElementById('supabase-list');

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: environment.apikey // Ya incluye Bearer
  }
};

/* ===========================================
   1. Export: obtenerPeliculas (para ui.js)
=========================================== */
export async function obtenerPeliculas() {
  const { data, error } = await supabase.from('peliculas').select('*');
  if (error) {
    console.error("Error obteniendo películas de Supabase:", error.message);
    return [];
  }
  return data;
}

/* ===========================================
   2. Export: escucharCambiosPeliculas (para main.js)
=========================================== */
export function escucharCambiosPeliculas(callback) {
  supabase.channel('realtime:peliculas')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'peliculas' },
      payload => {
        console.log('Cambio detectado en películas:', payload);
        callback(); // Vuelve a renderizar cuando hay cambios
      }
    )
    .subscribe();
}

/* ===========================================
   3. Películas desde TMDB (Carrusel)
=========================================== */
async function fetchMoviesTMDB() {
  try {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
    const data = await response.json();

    if (!data.results) {
      console.error('Respuesta inesperada de TMDB:', data);
      return;
    }

    data.results.forEach(movie => {
      const card = createMovieCardTMDB(movie);
      tmdbContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Error al obtener películas de TMDB:', error);
  }
}

function createMovieCardTMDB(movie) {
  const { title, name, backdrop_path, release_date } = movie;
  const card = document.createElement('div');
  card.classList.add('movie-list-item');

  card.innerHTML = `
    <img class="movie-list-item-img" src="${backdrop_path ? `https://image.tmdb.org/t/p/w500${backdrop_path}` : 'img/placeholder.jpg'}" alt="${title}">
    <span class="movie-list-item-title">${title || name}</span>
    <p class="movie-list-item-desc">Estreno: ${release_date}</p>
    <button class="movie-list-item-button">Watch</button>
  `;

  return card;
}

/* ===========================================
   4. Películas desde Supabase (Carrusel)
=========================================== */
async function fetchMoviesSupabase() {
  try {
    const { data, error } = await supabase.from('peliculas').select('*');

    if (error) throw error;

    data.forEach(movie => {
      const card = createMovieCardSupabase(movie);
      supabaseContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Error al obtener películas de Supabase:', error.message);
  }
}

function createMovieCardSupabase(movie) {
  const card = document.createElement('div');
  card.classList.add('movie-list-item');

  card.innerHTML = `
    <img class="movie-list-item-img" src="${movie.imagen}" alt="${movie.titulo}">
    <span class="movie-list-item-title">${movie.titulo}</span>
    <p class="movie-list-item-desc">${movie.descripcion}</p>
    <button class="movie-list-item-button">Watch</button>
  `;

  return card;
}

/* ===========================================
   5. Llamar a ambas para cargar carruseles
=========================================== */
fetchMoviesTMDB();
fetchMoviesSupabase();
