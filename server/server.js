const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('express').json;

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(bodyParser());

// Configuración de la conexión a PostgreSQL usando variables de entorno
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

// Ruta raíz
app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

// Obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear un nuevo usuario
app.post('/usuarios', async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING *',
      [nombre, email, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener todos los productos
app.get('/productos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear un nuevo producto
app.post('/productos', async (req, res) => {
  const { nombre, descripcion, precio, stock } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO productos (nombre, descripcion, precio, stock) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, descripcion, precio, stock]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
