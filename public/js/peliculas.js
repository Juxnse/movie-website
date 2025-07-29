/* import { supabase } from './supabase.js';

export async function obtenerPeliculas() {
  const { data, error } = await supabase.from('peliculas').select('*');
  if (error) throw error;
  return data;
}

export function escucharCambiosPeliculas(callback) {
  supabase.channel('realtime:peliculas')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'peliculas' }, payload => {
      console.log('Cambio detectado en películas:', payload);
      callback();
    })
    .subscribe();
}  */

const moviesContainer = document.getElementById('movies');

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTI0ZmIyOWFkMTc3ODBlYWE1NGQwMWEzYzMyMGUxNCIsIm5iZiI6MTc1Mzc0MTcxMi4yOTYsInN1YiI6IjY4ODdmOTkwYjQ1YjNmYTQ4NTE2Y2I2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AGZQLeTeshWZ5gi7AKg4U_BW5Rxop8TS6uyULcHR4yY'
  }
};

async function fecthMovies(){
  try {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
    const data = await response.json();

    data.results.forEach(movie => {
      const movieCard = createMovieCard(movie);
      moviesContainer.appendChild(movieCard);
    });
    console.log(data);
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

function createMovieCard(movie) {
  const { title, name, backdrop_path, release_date } = movie; 
  const card = document.createElement('div');
  card.classList.add('movie-item');
  card.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${backdrop_path}" alt="${title}" class="movie_img_rounded">
    <div class="title">${title || name}</div>
    <div class="title">${release_date}</div>
  `;
  return card
}
fecthMovies();