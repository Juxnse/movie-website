import { supabase } from './supabase.js';

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
}
