const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Configuración de PostgreSQL
const pool = new Pool({
  user: 'TU_USUARIO',      // <--- Cambia esto por tu usuario de Postgres
  host: 'localhost',
  database: 'movie_website', // <--- Asegúrate de crear esta BD en Postgres
  password: 'TU_PASSWORD',  // <--- Cambia esto por tu contraseña de Postgres
  port: 5432
});

// Crear tabla de usuarios si no existe
pool.query(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    correo VARCHAR(100) UNIQUE,
    contraseña VARCHAR(200)
  )
`);

// Ruta de registro
app.post('/register', async (req, res) => {
  const { nombre, correo, contraseña } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    await pool.query(
      'INSERT INTO usuarios (nombre, correo, contraseña) VALUES ($1, $2, $3)',
      [nombre, correo, hashedPassword]
    );
    res.json({ message: 'Usuario registrado con éxito' });
  } catch (err) {
    res.status(400).json({ error: 'El correo ya existe o hay un error en el registro' });
  }
});

// Ruta de login
app.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;
  const result = await pool.query('SELECT * FROM usuarios WHERE correo=$1', [correo]);

  if (result.rows.length === 0) return res.status(400).json({ error: 'Usuario no encontrado' });

  const usuario = result.rows[0];
  const match = await bcrypt.compare(contraseña, usuario.contraseña);
  if (!match) return res.status(400).json({ error: 'Contraseña incorrecta' });

  res.json({
    message: 'Login exitoso',
    usuario: { id: usuario.id, nombre: usuario.nombre }
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
