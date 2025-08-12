#!/usr/bin/env node

/**
 * Script para generar secretos seguros para el servidor
 * @author INMORTAL_OS
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para generar un secreto seguro
function generateSecureSecret(length = 64) {
  return crypto.randomBytes(length).toString('hex');
}

// Función para generar un JWT secret
function generateJWTSecret() {
  return crypto.randomBytes(32).toString('base64');
}

// Función para generar un cookie secret
function generateCookieSecret() {
  return crypto.randomBytes(32).toString('base64');
}

// Función para leer el archivo .env si existe
async function readEnvFile() {
  const envPath = path.join(__dirname, '..', '.env');
  try {
    const content = await fs.readFile(envPath, 'utf8');
    return content;
  } catch (error) {
    return '';
  }
}

// Función para escribir el archivo .env
async function writeEnvFile(content) {
  const envPath = path.join(__dirname, '..', '.env');
  await fs.writeFile(envPath, content, 'utf8');
}

// Función para actualizar o crear el archivo .env
async function updateEnvFile() {
  console.log('🔐 Generando secretos seguros...\n');

  const existingContent = await readEnvFile();
  const lines = existingContent.split('\n');
  
  // Generar nuevos secretos
  const newJWTSecret = generateJWTSecret();
  const newCookieSecret = generateCookieSecret();
  const newSessionSecret = generateSecureSecret(32);

  // Mapeo de variables a actualizar
  const secretsToUpdate = {
    'JWT_SECRET': newJWTSecret,
    'COOKIE_SECRET': newCookieSecret,
    'SESSION_SECRET': newSessionSecret
  };

  let updated = false;
  const updatedLines = [];

  // Procesar líneas existentes
  for (const line of lines) {
    let updatedLine = line;
    
    for (const [key, value] of Object.entries(secretsToUpdate)) {
      if (line.startsWith(`${key}=`)) {
        updatedLine = `${key}=${value}`;
        updated = true;
        console.log(`✅ Actualizado: ${key}`);
        break;
      }
    }
    
    updatedLines.push(updatedLine);
  }

  // Agregar nuevas variables si no existen
  for (const [key, value] of Object.entries(secretsToUpdate)) {
    if (!existingContent.includes(`${key}=`)) {
      updatedLines.push(`${key}=${value}`);
      updated = true;
      console.log(`✅ Agregado: ${key}`);
    }
  }

  // Agregar otras configuraciones de seguridad si no existen
  const securityConfigs = [
    'MAX_FILE_SIZE=5242880',
    'UPLOADS_DIR=./uploads',
    'ALLOWED_IMAGE_TYPES=image/jpeg,image/jpg,image/png,image/webp',
    'RATE_LIMIT_WINDOW_MS=900000',
    'RATE_LIMIT_MAX_REQUESTS=100',
    'JWT_EXPIRES_IN=24h',
    'HELMET_ENABLED=true'
  ];

  for (const config of securityConfigs) {
    const [key] = config.split('=');
    if (!existingContent.includes(`${key}=`)) {
      updatedLines.push(config);
      updated = true;
      console.log(`✅ Agregado: ${key}`);
    }
  }

  if (updated) {
    await writeEnvFile(updatedLines.join('\n'));
    console.log('\n🎉 Archivo .env actualizado exitosamente!');
    console.log('\n⚠️  IMPORTANTE:');
    console.log('   - Los secretos han sido regenerados');
    console.log('   - Cualquier sesión activa será invalidada');
    console.log('   - Reinicia el servidor para aplicar los cambios');
  } else {
    console.log('ℹ️  No se requieren cambios en el archivo .env');
  }

  console.log('\n🔒 Secretos generados:');
  console.log(`   JWT_SECRET: ${newJWTSecret.substring(0, 20)}...`);
  console.log(`   COOKIE_SECRET: ${newCookieSecret.substring(0, 20)}...`);
  console.log(`   SESSION_SECRET: ${newSessionSecret.substring(0, 20)}...`);
}

// Función para verificar la seguridad del archivo .env
async function checkSecurity() {
  console.log('\n🔍 Verificando seguridad del archivo .env...\n');

  const envPath = path.join(__dirname, '..', '.env');
  
  try {
    const content = await fs.readFile(envPath, 'utf8');
    const lines = content.split('\n');
    
    let securityIssues = 0;
    
    // Verificar secretos por defecto
    const defaultSecrets = [
      'dev-jwt-secret-change-in-production',
      'dev-cookie-secret-change-in-production',
      'dev-session-secret-change-in-production'
    ];

    for (const line of lines) {
      for (const defaultSecret of defaultSecrets) {
        if (line.includes(defaultSecret)) {
          console.log(`❌ SECURIDAD CRÍTICA: Se encontró secreto por defecto: ${defaultSecret}`);
          securityIssues++;
        }
      }
    }

    // Verificar que los secretos tengan suficiente entropía
    for (const line of lines) {
      if (line.startsWith('JWT_SECRET=') || line.startsWith('COOKIE_SECRET=')) {
        const value = line.split('=')[1];
        if (value && value.length < 32) {
          console.log(`⚠️  ADVERTENCIA: Secreto demasiado corto: ${line.split('=')[0]}`);
          securityIssues++;
        }
      }
    }

    if (securityIssues === 0) {
      console.log('✅ Archivo .env es seguro');
    } else {
      console.log(`\n❌ Se encontraron ${securityIssues} problemas de seguridad`);
      console.log('   Ejecuta este script nuevamente para regenerar los secretos');
    }

  } catch (error) {
    console.log('ℹ️  Archivo .env no encontrado, se creará uno nuevo');
  }
}

// Función principal
async function main() {
  try {
    await updateEnvFile();
    await checkSecurity();
    
    console.log('\n🚀 Configuración completada!');
    console.log('   Ejecuta "npm run dev" para iniciar el servidor');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateSecureSecret, generateJWTSecret, generateCookieSecret };
