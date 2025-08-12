#!/usr/bin/env node

/**
 * Script para resolver conflictos de dependencias
 * Uso: node scripts/resolve-deps.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Resolviendo conflictos de dependencias...\n');

// Función para ejecutar comandos de forma segura
function runCommand(command, cwd = process.cwd()) {
  try {
    console.log(`📋 Ejecutando: ${command}`);
    const result = execSync(command, { 
      cwd, 
      stdio: 'inherit',
      encoding: 'utf8'
    });
    return result;
  } catch (error) {
    console.error(`❌ Error ejecutando: ${command}`);
    console.error(error.message);
    return null;
  }
}

// Función para verificar si existe un archivo
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// Función principal
async function resolveDependencies() {
  console.log('📦 Verificando dependencias del proyecto principal...\n');
  
  // 1. Limpiar cache de npm
  console.log('🧹 Limpiando cache de npm...');
  runCommand('npm cache clean --force');
  
  // 2. Eliminar node_modules y package-lock.json
  console.log('🗑️ Eliminando node_modules y package-lock.json...');
  if (fileExists('node_modules')) {
    runCommand('rm -rf node_modules');
  }
  if (fileExists('package-lock.json')) {
    runCommand('rm package-lock.json');
  }
  
  // 3. Instalar dependencias con legacy peer deps
  console.log('📥 Instalando dependencias con legacy peer deps...');
  runCommand('npm install --legacy-peer-deps');
  
  // 4. Verificar dependencias del servidor
  if (fileExists('server/package.json')) {
    console.log('\n🖥️ Verificando dependencias del servidor...');
    runCommand('cd server && npm install --legacy-peer-deps', 'server');
  }
  
  // 5. Verificar dependencias de React UI Login
  if (fileExists('src/components/react-ui-login/package.json')) {
    console.log('\n⚛️ Verificando dependencias de React UI Login...');
    runCommand('cd src/components/react-ui-login && npm install --legacy-peer-deps', 'src/components/react-ui-login');
  }
  
  // 6. Verificar vulnerabilidades
  console.log('\n🔍 Verificando vulnerabilidades...');
  runCommand('npm audit --omit=dev');
  
  // 7. Generar reporte
  console.log('\n📊 Generando reporte de dependencias...');
  runCommand('npm outdated');
  
  console.log('\n✅ Resolución de dependencias completada!');
  console.log('\n📝 Próximos pasos:');
  console.log('1. Revisar el reporte de dependencias desactualizadas');
  console.log('2. Ejecutar tests para verificar que todo funciona');
  console.log('3. Hacer commit de los cambios');
  console.log('4. Crear PR para revisar los cambios');
}

// Ejecutar si se llama directamente
if (require.main === module) {
  resolveDependencies().catch(console.error);
}

module.exports = { resolveDependencies };
