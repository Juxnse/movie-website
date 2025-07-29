import { supabase } from './supabase.js';
import { environment } from './environment.js';
import { logoutUsuario } from './auth.js';

/* 
===================================
  1. Export: obtenerPeliculas
  (usado por renderPeliculas)
===================================
*/
export async function obtenerPeliculas() {
  const { data, error } = await supabase.from('peliculas').select('*');
  if (error) {
    console.error("Error obteniendo películas de Supabase:", error.message);
    return [];
  }
  return data;
}

/* 
===================================
  2. Renderizar películas (para main.js)
===================================
*/
export async function renderPeliculas(container) {
  const peliculas = await obtenerPeliculas();
  container.innerHTML = '';

  peliculas.forEach(p => {
    let imagenUrl = 'img/placeholder.jpg';
    if (p.imagen) {
      if (p.imagen.startsWith('http') || p.imagen.startsWith('img/')) {
        imagenUrl = p.imagen;
      } else {
        imagenUrl = `img/${p.imagen}`;
      }
    }

    const item = document.createElement('div');
    item.classList.add('movie-list-item');

    item.innerHTML = `
      <img class="movie-list-item-img" src="${imagenUrl}" alt="${p.titulo}">
      <span class="movie-list-item-title">${p.titulo}</span>
      <p class="movie-list-item-desc">${p.descripcion}</p>
      <button class="movie-list-item-button" onclick="verDetalle(${p.id})">Watch</button>
    `;
    container.appendChild(item);
  });
}

/* 
===================================
  3. Actualizar navbar (para main.js)
===================================
*/
export function actualizarNavbar(usuario) {
  const profileText = document.querySelector('.profile-text');
  const authButtons = document.getElementById('auth-buttons');

  if (profileText && authButtons) {
    if (usuario && usuario.nombre) {
      profileText.textContent = usuario.nombre;
      authButtons.innerHTML = `<button class="btn-logout" id="logout-btn">Cerrar sesión</button>`;
      document.getElementById('logout-btn').addEventListener('click', logoutUsuario);
    } else {
      profileText.textContent = 'Invitado';
      authButtons.innerHTML = `
        <a href="login.html" class="btn-auth">Iniciar sesión</a>
        <a href="register.html" class="btn-auth">Registrarse</a>
      `;
    }
  }
}

/* 
===================================
  4. Lógica para carrusel TMDB
===================================
*/
const tmdbContainer = document.getElementById('tmdb-list');

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: environment.apikey // Ya incluye Bearer
  }
};

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

/* 
===================================
  5. Lógica para carrusel Supabase
===================================
*/
const supabaseContainer = document.getElementById('supabase-list');

async function fetchMoviesSupabase() {
  try {
    const peliculas = await obtenerPeliculas();

    peliculas.forEach(movie => {
      const card = createMovieCardSupabase(movie);
      supabaseContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Error al mostrar películas de Supabase:', error.message);
  }
}

function createMovieCardSupabase(movie) {
  const card = document.createElement('div');
  card.classList.add('movie-list-item');

  let imagenUrl = 'img/placeholder.jpg';
  if (movie.imagen) {
    if (movie.imagen.startsWith('http')) {
      imagenUrl = movie.imagen;
    } else if (movie.imagen.startsWith('img/')) {
      imagenUrl = movie.imagen;
    } else {
      imagenUrl = `img/${movie.imagen}`;
    }
  }

  card.innerHTML = `
    <img class="movie-list-item-img" src="${imagenUrl}" alt="${movie.titulo}">
    <span class="movie-list-item-title">${movie.titulo}</span>
    <p class="movie-list-item-desc">${movie.descripcion}</p>
    <button class="movie-list-item-button" onclick="verDetalle(${movie.id})">Watch</button>
  `;

  return card;
}

/* 
===================================
  6. Llamar las funciones de los carruseles
===================================
*/
fetchMoviesTMDB();
fetchMoviesSupabase();
