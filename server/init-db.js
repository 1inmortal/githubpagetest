require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Configuración de la conexión a PostgreSQL usando variables de entorno
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

async function initializeDatabase() {
  try {
    console.log('🔌 Conectando a la base de datos...');
    
    // Leer el archivo schema.sql
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('📋 Ejecutando esquema de la base de datos...');
    
    // Ejecutar el esquema SQL
    await pool.query(schemaSQL);
    
    console.log('✅ Base de datos inicializada correctamente!');
    console.log('📊 Tablas creadas: usuarios, productos');
    
    // Verificar que las tablas existen
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('usuarios', 'productos')
    `);
    
    console.log('📋 Tablas disponibles:', tablesResult.rows.map(row => row.table_name));
    
    // Contar registros en cada tabla
    const usuariosCount = await pool.query('SELECT COUNT(*) FROM usuarios');
    const productosCount = await pool.query('SELECT COUNT(*) FROM productos');
    
    console.log(`👥 Usuarios en la base de datos: ${usuariosCount.rows[0].count}`);
    console.log(`📦 Productos en la base de datos: ${productosCount.rows[0].count}`);
    
  } catch (error) {
    console.error('❌ Error inicializando la base de datos:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Verifica que:');
      console.log('   - La base de datos esté activa');
      console.log('   - Las credenciales en .env sean correctas');
      console.log('   - El host y puerto sean accesibles');
    }
    
    if (error.code === '28P01') {
      console.log('💡 Error de autenticación:');
      console.log('   - Verifica DB_USER y DB_PASSWORD');
    }
    
    if (error.code === '3D000') {
      console.log('💡 Base de datos no existe:');
      console.log('   - Verifica DB_NAME');
    }
  } finally {
    await pool.end();
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  initializeDatabase();
}

module.exports = { initializeDatabase };
