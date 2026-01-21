#!/usr/bin/env node

/**
 * Script de Análisis de Rendimiento
 * Analiza el archivo HTML y proporciona recomendaciones
 * 
 * Uso: node scripts/analyze-performance.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = path.join(__dirname, '..', 'index.html');

console.log('🔍 Analizando rendimiento de index.html...\n');

try {
    const html = fs.readFileSync(INPUT_FILE, 'utf8');
    const lines = html.split('\n');
    
    // Métricas básicas
    console.log('📊 MÉTRICAS GENERALES:');
    console.log(`   Tamaño del archivo: ${(html.length / 1024).toFixed(2)} KB`);
    console.log(`   Número de líneas: ${lines.length.toLocaleString()}`);
    console.log(`   Caracteres totales: ${html.length.toLocaleString()}\n`);
    
    // Contar elementos
    const scripts = (html.match(/<script/g) || []).length;
    const styles = (html.match(/<style/g) || []).length;
    const images = (html.match(/<img/g) || []).length;
    const links = (html.match(/<link/g) || []).length;
    
    console.log('🔧 RECURSOS:');
    console.log(`   Scripts: ${scripts}`);
    console.log(`   Estilos: ${styles}`);
    console.log(`   Imágenes: ${images}`);
    console.log(`   Links: ${links}\n`);
    
    // Detectar recursos externos
    const cdnResources = html.match(/https?:\/\/[^\s"']+/g) || [];
    const uniqueDomains = [...new Set(cdnResources.map(url => {
        try {
            return new URL(url).hostname;
        } catch {
            return null;
        }
    }).filter(Boolean))];
    
    console.log('🌐 DOMINIOS EXTERNOS:');
    uniqueDomains.forEach(domain => {
        const count = cdnResources.filter(url => url.includes(domain)).length;
        console.log(`   ${domain}: ${count} recursos`);
    });
    console.log('');
    
    // Análisis de tamaño de CSS y JS inline
    const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
    const scriptMatch = html.match(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/gi);
    
    let cssSize = 0;
    let jsSize = 0;
    
    if (styleMatch) {
        cssSize = styleMatch.join('').length;
    }
    
    if (scriptMatch) {
        jsSize = scriptMatch.join('').length;
    }
    
    console.log('💾 CONTENIDO INLINE:');
    console.log(`   CSS inline: ${(cssSize / 1024).toFixed(2)} KB`);
    console.log(`   JavaScript inline: ${(jsSize / 1024).toFixed(2)} KB`);
    console.log(`   HTML + otros: ${((html.length - cssSize - jsSize) / 1024).toFixed(2)} KB\n`);
    
    // Recomendaciones
    console.log('💡 RECOMENDACIONES:');
    
    if (html.length > 500 * 1024) {
        console.log('   ⚠️  El archivo es muy grande (>500KB). Considera dividirlo.');
    }
    
    if (cssSize > 100 * 1024) {
        console.log('   ⚠️  Mucho CSS inline. Considera extraerlo a un archivo externo.');
    }
    
    if (jsSize > 100 * 1024) {
        console.log('   ⚠️  Mucho JavaScript inline. Considera extraerlo a un archivo externo.');
    }
    
    if (scripts > 10) {
        console.log('   ⚠️  Muchos scripts. Considera combinarlos o usar lazy loading.');
    }
    
    if (uniqueDomains.length > 5) {
        console.log('   ⚠️  Múltiples dominios externos. Considera usar preconnect.');
    }
    
    // Buscar problemas comunes
    if (!html.includes('defer') && !html.includes('async')) {
        console.log('   ⚠️  No se detectaron scripts con defer o async.');
    }
    
    if (!html.includes('preconnect') && uniqueDomains.length > 0) {
        console.log('   ✅ Considera agregar rel="preconnect" para dominios externos.');
    }
    
    if (html.includes('loading="lazy"')) {
        console.log('   ✅ Lazy loading de imágenes detectado.');
    } else if (images > 0) {
        console.log('   ⚠️  Considera agregar loading="lazy" a las imágenes.');
    }
    
    console.log('\n✅ Análisis completado.');
    
} catch (error) {
    console.error('❌ Error durante el análisis:', error.message);
    process.exit(1);
}
