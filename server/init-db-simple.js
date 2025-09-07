const { Pool } = require('pg');

// Usar la cadena de conexión COMPLETA y CORRECTA
const connectionString = 'postgresql://backend_db_lhz2_user:uRcP1glBw2cRnx8WvYuTjKJlBiCObpMC@dpg-d2p9bbmr433s73d0vm60-a.oregon-postgres.render.com/backend_db_lhz2';

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

async function initializeDatabase() {
  try {
    console.log('🔌 Conectando a la base de datos...');
    console.log('📍 Host:', 'dpg-d2p9bbmr433s73d0vm60-a.oregon-postgres.render.com');
    console.log('👤 Usuario:', 'backend_db_lhz2_user');
    console.log('🗄️ Base de datos:', 'backend_db_lhz2');
    
    // Probar conexión simple primero
    const client = await pool.connect();
    console.log('✅ Conexión exitosa!');
    
    // Crear tabla usuarios
    console.log('📋 Creando tabla usuarios...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Crear tabla productos
    console.log('📋 Creando tabla productos...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS productos (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(200) NOT NULL,
        descripcion TEXT,
        precio DECIMAL(10,2) NOT NULL,
        stock INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Insertar datos de ejemplo
    console.log('📝 Insertando datos de ejemplo...');
    
    await client.query(`
      INSERT INTO usuarios (nombre, email, password) VALUES 
        ('Usuario Demo', 'demo@example.com', 'password123'),
        ('Admin', 'admin@example.com', 'admin123')
      ON CONFLICT (email) DO NOTHING
    `);
    
    await client.query(`
      INSERT INTO productos (nombre, descripcion, precio, stock) VALUES 
        ('Producto Demo 1', 'Descripción del producto demo 1', 29.99, 10),
        ('Producto Demo 2', 'Descripción del producto demo 2', 49.99, 5)
      ON CONFLICT DO NOTHING
    `);
    
    console.log('✅ Base de datos inicializada correctamente!');
    
    // Verificar tablas
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('📋 Tablas disponibles:', tablesResult.rows.map(row => row.table_name));
    
    // Contar registros
    const usuariosCount = await client.query('SELECT COUNT(*) FROM usuarios');
    const productosCount = await client.query('SELECT COUNT(*) FROM productos');
    
    console.log(`👥 Usuarios: ${usuariosCount.rows[0].count}`);
    console.log(`📦 Productos: ${productosCount.rows[0].count}`);
    
    client.release();
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('🔍 Código de error:', error.code);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 El servidor de base de datos no está accesible');
    }
    
    if (error.code === '28P01') {
      console.log('💡 Error de autenticación - verifica usuario/contraseña');
    }
    
    if (error.code === '3D000') {
      console.log('💡 Base de datos no existe');
    }
  } finally {
    await pool.end();
  }
}

initializeDatabase();
