import { registrarUsuario } from './auth.js';

document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = e.target.nombre.value;
  const correo = e.target.correo.value;
  const contraseña = e.target.contraseña.value;

  const { error } = await registrarUsuario(nombre, correo, contraseña);
  if (error) {
    alert('Error: ' + error.message);
  } else {
    alert('Usuario registrado con éxito');
    window.location.href = 'login.html';
  }
});
