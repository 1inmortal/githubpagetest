#!/usr/bin/env node

/**
 * Script de optimización para GitHub Pages
 * Este script optimiza los archivos antes del despliegue
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando optimización para GitHub Pages...');

// Función para crear directorio si no existe
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Función para copiar archivos recursivamente
function copyRecursive(src, dest) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    ensureDir(dest);
    const files = fs.readdirSync(src);
    files.forEach(file => {
      copyRecursive(path.join(src, file), path.join(dest, file));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Función para optimizar archivos multimedia
function optimizeMedia(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      optimizeMedia(filePath);
    } else {
      const ext = path.extname(file).toLowerCase();
      const size = stats.size;
      
      // Eliminar archivos multimedia muy pesados
      if ((ext === '.mp3' || ext === '.wav') && size > 5 * 1024 * 1024) {
        console.log(`🗑️  Eliminando archivo pesado: ${file} (${(size / 1024 / 1024).toFixed(2)}MB)`);
        fs.unlinkSync(filePath);
      } else if ((ext === '.mp4') && size > 10 * 1024 * 1024) {
        console.log(`🗑️  Eliminando video pesado: ${file} (${(size / 1024 / 1024).toFixed(2)}MB)`);
        fs.unlinkSync(filePath);
      } else if (ext === '.zip') {
        console.log(`🗑️  Eliminando archivo ZIP: ${file}`);
        fs.unlinkSync(filePath);
      }
    }
  });
}

// Función para limpiar archivos temporales
function cleanTempFiles(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      if (file === 'node_modules' || file === '.git' || file === '.vscode') {
        console.log(`🗑️  Eliminando directorio: ${file}`);
        fs.rmSync(filePath, { recursive: true, force: true });
      } else {
        cleanTempFiles(filePath);
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      if (ext === '.log' || ext === '.tmp' || file === '.DS_Store') {
        console.log(`🗑️  Eliminando archivo temporal: ${file}`);
        fs.unlinkSync(filePath);
      }
    }
  });
}

// Función para crear archivo .nojekyll
function createNoJekyll(dir) {
  const noJekyllPath = path.join(dir, '.nojekyll');
  fs.writeFileSync(noJekyllPath, '');
  console.log('📄 Creado archivo .nojekyll');
}

// Función para crear sitemap optimizado
function createOptimizedSitemap(dir) {
  const sitemapPath = path.join(dir, 'sitemap.xml');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://1inmortal.github.io/githubpagetest/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://1inmortal.github.io/githubpagetest/proyectos.html</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://1inmortal.github.io/githubpagetest/privacy-policy.html</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://1inmortal.github.io/githubpagetest/terms.html</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`;
  
  fs.writeFileSync(sitemapPath, sitemap);
  console.log('🗺️  Creado sitemap optimizado');
}

// Función para crear robots.txt optimizado
function createOptimizedRobots(dir) {
  const robotsPath = path.join(dir, 'robots.txt');
  const robots = `User-agent: *
Allow: /

Sitemap: https://1inmortal.github.io/githubpagetest/sitemap.xml

# Optimizaciones para GitHub Pages
Crawl-delay: 1

# Bloquear archivos innecesarios
Disallow: /node_modules/
Disallow: /.git/
Disallow: /tests/
Disallow: /scripts/
Disallow: /reports/
Disallow: /*.log
Disallow: /*.tmp`;
  
  fs.writeFileSync(robotsPath, robots);
  console.log('🤖 Creado robots.txt optimizado');
}

// Función principal
function main() {
  const distDir = 'dist';
  
  // Crear directorio dist si no existe
  ensureDir(distDir);
  
  // Copiar archivos principales
  console.log('📁 Copiando archivos principales...');
  const filesToCopy = [
    'index.html',
    'privacy-policy.html',
    'terms.html',
    'verificación.html',
    'wordpress.html',
    'sitemap.xml',
    'sw.js',
    'manifest.json',
    'README.md',
    '.nojekyll',
    '_headers',
    '_redirects'
  ];
  
  filesToCopy.forEach(file => {
    if (fs.existsSync(file)) {
      fs.copyFileSync(file, path.join(distDir, file));
      console.log(`✅ Copiado: ${file}`);
    }
  });
  
  // Copiar directorios principales
  const dirsToCopy = ['src', 'public', 'pruebas', 'docs', 'documentation', 'config'];
  dirsToCopy.forEach(dir => {
    if (fs.existsSync(dir)) {
      copyRecursive(dir, path.join(distDir, dir));
      console.log(`✅ Copiado directorio: ${dir}`);
    }
  });
  
  // Optimizar archivos multimedia
  console.log('🎵 Optimizando archivos multimedia...');
  optimizeMedia(distDir);
  
  // Limpiar archivos temporales
  console.log('🧹 Limpiando archivos temporales...');
  cleanTempFiles(distDir);
  
  // Crear archivos de configuración
  createNoJekyll(distDir);
  createOptimizedSitemap(distDir);
  createOptimizedRobots(distDir);
  
  console.log('✅ Optimización completada exitosamente!');
  console.log(`📦 Archivos optimizados en: ${distDir}/`);
}

// Ejecutar script
if (require.main === module) {
  main();
}

module.exports = { main, optimizeMedia, cleanTempFiles };
