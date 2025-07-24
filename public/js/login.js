import { loginUsuario } from './auth.js';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const correo = e.target.correo.value;
  const contraseña = e.target.contraseña.value;

  try {
    await loginUsuario(correo, contraseña);
    window.location.href = 'index.html';
  } catch {
    alert('Correo o contraseña incorrectos');
  }
});
