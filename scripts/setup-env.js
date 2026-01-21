#!/usr/bin/env node

/**
 * Script para configurar automáticamente el archivo .env
 * Basado en las credenciales encontradas en el proyecto
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colores para output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m'
};

function log(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function createEnvFile() {
  const envPath = path.join(process.cwd(), '.env');
  const templatePath = path.join(process.cwd(), 'env_template.env');
  
  // Verificar si ya existe .env
  if (fs.existsSync(envPath)) {
    log('⚠️  El archivo .env ya existe. ¿Deseas sobrescribirlo? (y/N)', 'yellow');
    return;
  }
  
  // Verificar si existe el template
  if (!fs.existsSync(templatePath)) {
    log('❌ No se encontró el archivo env_template.env', 'red');
    return;
  }
  
  try {
    // Leer el template
    const templateContent = fs.readFileSync(templatePath, 'utf8');
    
    // Crear el archivo .env
    fs.writeFileSync(envPath, templateContent);
    
    log('✅ Archivo .env creado exitosamente', 'green');
    log(`📁 Ubicación: ${envPath}`, 'cyan');
    
    // Mostrar instrucciones
    log('\n📋 Próximos pasos:', 'yellow');
    log('1. Edita el archivo .env con tus credenciales reales', 'white');
    log('2. Reemplaza los valores de ejemplo con tus datos reales', 'white');
    log('3. Asegúrate de que .env esté en .gitignore', 'white');
    log('4. Nunca commitees el archivo .env al repositorio', 'white');
    
    // Mostrar credenciales importantes que necesitan ser configuradas
    log('\n🔑 Credenciales importantes a configurar:', 'magenta');
    log('• DB_USER, DB_PASSWORD, DB_HOST, DB_NAME (Base de datos)', 'white');
    log('• JWT_SECRET, SECRET_KEY (Seguridad)', 'white');
    log('• CLOUD_API_ACCESS_TOKEN (WhatsApp API)', 'white');
    log('• EMAIL_USER, EMAIL_PASSWORD (Email)', 'white');
    log('• API_KEY, API_SECRET (APIs externas)', 'white');
    
  } catch (error) {
    log(`❌ Error creando archivo .env: ${error.message}`, 'red');
  }
}

function showCredentialStatus() {
  log('\n🔍 Estado de credenciales en el proyecto:', 'cyan');
  
  const filesToCheck = [
    'server/server.js',
    'public/python/src/utils/env_loader.py',
    'config/env.example'
  ];
  
  filesToCheck.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const envVars = content.match(/process\.env\.\w+|get_env_var\(["']\w+["']\)|os\.getenv\(["']\w+["']\)/g);
      
      if (envVars) {
        log(`\n📄 ${file}:`, 'yellow');
        const uniqueVars = [...new Set(envVars)].slice(0, 10); // Mostrar solo las primeras 10
        uniqueVars.forEach(envVar => {
          log(`  • ${envVar}`, 'white');
        });
        if (envVars.length > 10) {
          log(`  ... y ${envVars.length - 10} más`, 'white');
        }
      }
    }
  });
}

function main() {
  log('🚀 Configurador de Variables de Entorno', 'green');
  log('=====================================', 'green');
  
  // Crear archivo .env
  createEnvFile();
  
  // Mostrar estado de credenciales
  showCredentialStatus();
  
  log('\n✨ Configuración completada', 'green');
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { createEnvFile, showCredentialStatus };
