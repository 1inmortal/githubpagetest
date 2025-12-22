#!/usr/bin/env node

/**
 * Script de verificación para el video captura.mp4
 * Verifica que el archivo existe y está listo para GitHub Pages
 */

const fs = require('fs');
const path = require('path');

const videoPath = path.join(__dirname, '..', 'public', 'gsap', 'PR', 'mp4', 'captura.mp4');
const videoDir = path.dirname(videoPath);

console.log('🔍 Verificando video captura.mp4...\n');

// 1. Verificar si el directorio existe
if (!fs.existsSync(videoDir)) {
  console.error('❌ El directorio no existe:', videoDir);
  console.log('💡 Crea el directorio: mkdir -p public/gsap/PR/mp4');
  process.exit(1);
}

console.log('✓ Directorio existe:', videoDir);

// 2. Verificar si el archivo existe
if (!fs.existsSync(videoPath)) {
  console.error('❌ El archivo no existe:', videoPath);
  console.log('💡 Asegúrate de que el archivo esté en: public/gsap/PR/mp4/captura.mp4');
  process.exit(1);
}

console.log('✓ Archivo existe:', videoPath);

// 3. Verificar tamaño del archivo
const stats = fs.statSync(videoPath);
const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
const fileSizeBytes = stats.size;

console.log(`✓ Tamaño del archivo: ${fileSizeMB} MB (${fileSizeBytes.toLocaleString()} bytes)`);

// 4. Verificar límite de GitHub (100MB)
const GITHUB_LIMIT = 100 * 1024 * 1024; // 100MB en bytes
if (stats.size > GITHUB_LIMIT) {
  console.warn('⚠️  ADVERTENCIA: El archivo excede el límite de 100MB de GitHub');
  console.warn('   GitHub rechazará archivos mayores a 100MB');
  console.warn('   Considera usar un CDN externo (Cloudinary, AWS S3, etc.)');
} else {
  console.log('✓ El archivo está dentro del límite de GitHub (<100MB)');
}

// 5. Verificar si está en .gitignore
const gitignorePath = path.join(__dirname, '..', '.gitignore');
let isIgnored = false;

if (fs.existsSync(gitignorePath)) {
  const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
  const relativePath = path.relative(path.join(__dirname, '..'), videoPath);
  
  // Verificar patrones comunes que podrían ignorar el archivo
  const patterns = [
    /\.mp4/i,
    /mp4/i,
    /video/i,
    /public\/gsap/i,
    relativePath.replace(/\\/g, '/')
  ];
  
  isIgnored = patterns.some(pattern => {
    if (pattern instanceof RegExp) {
      return pattern.test(gitignoreContent);
    }
    return gitignoreContent.includes(pattern);
  });
}

if (isIgnored) {
  console.warn('⚠️  ADVERTENCIA: El archivo podría estar siendo ignorado por .gitignore');
  console.warn('   Verifica tu archivo .gitignore');
} else {
  console.log('✓ El archivo no está en .gitignore');
}

// 6. Verificar formato (extensión)
if (!videoPath.endsWith('.mp4')) {
  console.warn('⚠️  ADVERTENCIA: El archivo no tiene extensión .mp4');
} else {
  console.log('✓ Extensión correcta: .mp4');
}

// 7. Resumen
console.log('\n📋 Resumen:');
console.log('   ✓ Archivo encontrado');
console.log(`   ✓ Tamaño: ${fileSizeMB} MB`);
console.log('   ✓ Listo para commit');

console.log('\n💡 Próximos pasos:');
console.log('   1. Verifica que el archivo esté en el staging area:');
console.log('      git add public/gsap/PR/mp4/captura.mp4');
console.log('   2. Haz commit del archivo:');
console.log('      git commit -m "Agregar video captura.mp4"');
console.log('   3. Sube a GitHub:');
console.log('      git push origin main');
console.log('   4. Verifica en GitHub que el archivo existe en:');
console.log('      https://github.com/1inmortal/githubpagetest/tree/main/public/gsap/PR/mp4');
console.log('   5. Espera a que GitHub Pages se actualice (puede tardar unos minutos)');
console.log('   6. Verifica la URL en producción:');
console.log('      https://1inmortal.github.io/githubpagetest/public/gsap/PR/mp4/captura.mp4');

if (stats.size > GITHUB_LIMIT) {
  console.log('\n⚠️  IMPORTANTE: Si el archivo es muy grande, considera:');
  console.log('   - Comprimir el video (HandBrake, FFmpeg)');
  console.log('   - Usar un servicio de CDN (Cloudinary, AWS S3, Google Cloud Storage)');
  console.log('   - Usar GitHub Releases para archivos grandes');
}

process.exit(0);

