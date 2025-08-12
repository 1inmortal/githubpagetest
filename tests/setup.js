/**
 * Setup global para tests en CI/CD
 * @author INMORTAL_OS
 */

import { chromium } from '@playwright/test';

async function globalSetup() {
  console.log('🚀 Iniciando setup global para CI/CD...');
  
  try {
    // Verificar que el servidor esté funcionando
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    // Intentar conectar al servidor
    await page.goto('http://localhost:3000', { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    
    console.log('✅ Servidor funcionando correctamente');
    await browser.close();
    
  } catch (error) {
    console.log('⚠️ Advertencia: No se pudo conectar al servidor en setup');
    console.log('Los tests se ejecutarán con el servidor integrado de Playwright');
  }
  
  console.log('✅ Setup global completado');
}

export default globalSetup;
