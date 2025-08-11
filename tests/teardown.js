/**
 * Teardown global para tests en CI/CD
 * @author INMORTAL_OS
 */

async function globalTeardown() {
  console.log('🧹 Iniciando teardown global para CI/CD...');
  
  try {
    // Limpiar archivos temporales si es necesario
    console.log('✅ Limpieza completada');
  } catch (error) {
    console.log('⚠️ Advertencia durante teardown:', error.message);
  }
  
  console.log('✅ Teardown global completado');
}

export default globalTeardown;
