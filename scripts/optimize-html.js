#!/usr/bin/env node

/**
 * Script de Optimización de HTML
 * Minifica y optimiza el archivo index.html para producción
 * 
 * Uso: node scripts/optimize-html.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = path.join(__dirname, '..', 'index.html');
const OUTPUT_FILE = path.join(__dirname, '..', 'index.min.html');

console.log('🚀 Iniciando optimización de HTML...\n');

try {
    // Leer el archivo original
    let html = fs.readFileSync(INPUT_FILE, 'utf8');
    
    console.log(`📄 Archivo original: ${(html.length / 1024).toFixed(2)} KB`);
    
    // Optimizaciones básicas (sin romper funcionalidad)
    
    // 1. Remover comentarios HTML (excepto los condicionales de IE)
    // Usar flag 'g' (global) para asegurar reemplazo completo y seguro
    html = html.replace(/<!--(?!\[if)[\s\S]*?-->/g, '');
    
    // 2. Remover espacios en blanco excesivos entre tags (con cuidado)
    // NO minificar dentro de <script> y <style> tags ya que puede romper el código
    html = html.replace(/>\s+</g, '><');
    
    // 3. Remover espacios al inicio y final de líneas
    html = html.split('\n')
        .map(line => line.trim())
        .join('\n');
    
    // 4. Remover líneas vacías múltiples
    html = html.replace(/\n\n+/g, '\n');
    
    console.log(`✨ Archivo optimizado: ${(html.length / 1024).toFixed(2)} KB`);
    console.log(`📉 Reducción: ${(((html.length / fs.readFileSync(INPUT_FILE, 'utf8').length) - 1) * -100).toFixed(2)}%\n`);
    
    // Guardar archivo optimizado
    fs.writeFileSync(OUTPUT_FILE, html, 'utf8');
    
    console.log(`✅ Archivo optimizado guardado en: ${OUTPUT_FILE}`);
    console.log('\n⚠️  IMPORTANTE: Prueba el archivo optimizado antes de usarlo en producción');
    console.log('   Verifica que todas las funcionalidades sigan trabajando correctamente\n');
    
} catch (error) {
    console.error('❌ Error durante la optimización:', error.message);
    process.exit(1);
}
