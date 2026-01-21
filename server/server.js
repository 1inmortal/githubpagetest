const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('express').json;
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para CORS (permitir conexiones desde GitHub Pages)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Middleware para parsear JSON
app.use(bodyParser());

// Rate limiting - protección contra DDoS y fuerza bruta
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 peticiones por ventana
  message: 'Demasiadas peticiones desde esta IP, intenta de nuevo más tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting más estricto para endpoints de escritura
const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // máximo 20 peticiones POST por ventana
  message: 'Demasiadas peticiones de escritura, intenta de nuevo más tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Aplicar rate limiting general
app.use(limiter);

// Configuración de la conexión a PostgreSQL usando variables de entorno
const pool = new Pool({
  user: process.env.DB_USER || 'backend_db_lhz2_user',
  password: process.env.DB_PASSWORD || 'uRcP1glBw2cRnx8WvYuTjKJlBiCObpMC',
  host: process.env.DB_HOST || 'dpg-d2p9bbmr433s73d0vm60-a.oregon-postgres.render.com',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'backend_db_lhz2',
  ssl: {
    rejectUnauthorized: false
  }
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
app.post('/usuarios', writeLimiter, async (req, res) => {
  const { nombre, email, password, proyecto, mensaje } = req.body;
  
  try {
    // Insertar usuario
    const userResult = await pool.query(
      'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING *',
      [nombre, email, password]
    );
    
    // Si hay mensaje, guardarlo en una tabla de contactos (opcional)
    if (mensaje) {
      try {
        await pool.query(
          'INSERT INTO contactos (usuario_id, proyecto, mensaje, fecha) VALUES ($1, $2, $3, NOW())',
          [userResult.rows[0].id, proyecto || 'General', mensaje]
        );
      } catch (contactErr) {
        console.log('Error guardando contacto (opcional):', contactErr.message);
      }
    }
    
    res.status(201).json({
      success: true,
      message: 'Usuario y mensaje guardados exitosamente',
      user: userResult.rows[0]
    });
    
  } catch (err) {
    console.error('Error creando usuario:', err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
});

// Ruta específica para formulario de contacto
app.post('/contacto', writeLimiter, async (req, res) => {
  const { nombre, email, proyecto, mensaje } = req.body;
  
  try {
    // Generar password temporal
    const password = 'contacto_' + Date.now();
    
    // Insertar usuario
    const userResult = await pool.query(
      'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING *',
      [nombre, email, password]
    );
    
    // Guardar mensaje de contacto
    try {
      await pool.query(
        'INSERT INTO contactos (usuario_id, proyecto, mensaje, fecha) VALUES ($1, $2, $3, NOW())',
        [userResult.rows[0].id, proyecto || 'General', mensaje]
      );
    } catch (contactErr) {
      console.log('Error guardando contacto:', contactErr.message);
    }
    
    res.status(201).json({
      success: true,
      message: 'Mensaje de contacto enviado exitosamente',
      user: userResult.rows[0]
    });
    
  } catch (err) {
    console.error('Error enviando contacto:', err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
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
app.post('/productos', writeLimiter, async (req, res) => {
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

// Ruta de prueba para verificar conexión a BD
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as current_time, version() as db_version');
    res.json({
      success: true,
      message: 'Conexión a BD exitosa',
      data: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
  console.log(`CORS habilitado para todas las origenes`);
  console.log(`Prueba la API en: http://localhost:${port}`);
  console.log(`Variables de entorno:`);
  console.log(`- DB_HOST: ${process.env.DB_HOST || 'No configurado'}`);
  console.log(`- DB_NAME: ${process.env.DB_NAME || 'No configurado'}`);
  console.log(`- NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
});
