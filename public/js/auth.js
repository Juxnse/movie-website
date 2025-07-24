import { supabase } from './supabase.js';

export async function registrarUsuario(nombre, correo, contraseña) {
  return await supabase.from('usuarios').insert([{ nombre, correo, contraseña }]);
}

export async function loginUsuario(correo, contraseña) {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('correo', correo)
    .eq('contraseña', contraseña);

  if (error || data.length === 0) throw new Error('Credenciales inválidas');
  localStorage.setItem('usuario', JSON.stringify(data[0]));
}

export function logoutUsuario() {
  localStorage.removeItem('usuario');
  window.location.href = 'index.html';
}
