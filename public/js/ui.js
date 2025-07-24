import { obtenerPeliculas } from './peliculas.js';
import { logoutUsuario } from './auth.js';

export async function renderPeliculas(container) {
  const peliculas = await obtenerPeliculas();
  container.innerHTML = '';

  peliculas.forEach(p => {

    let imagenUrl = 'img/placeholder.jpg';
    if (p.imagen.startsWith('http')) {
  imagenUrl = p.imagen;
} else {
  imagenUrl = `img/${p.imagen.replace('img/', '')}`;
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

export function actualizarNavbar(usuario) {
  const profileText = document.querySelector('.profile-text');
  const authButtons = document.getElementById('auth-buttons');

  if (usuario) {
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
