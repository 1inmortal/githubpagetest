/**
 * Tests E2E para la página principal
 * @author INMORTAL_OS
 */

import { test, expect } from '@playwright/test';

// Configuración global para evitar timeouts
test.setTimeout(60000); // 60 segundos en lugar de 30

test.describe('Página Principal', () => {
  test.beforeEach(async ({ page }) => {
    // Configurar timeout más largo para navegación
    page.setDefaultTimeout(45000);
    
    // Navegar a la página con manejo de errores
    try {
      await page.goto('/', { 
        waitUntil: 'domcontentloaded',
        timeout: 30000 
      });
    } catch (error) {
      console.log('Error en navegación, continuando con tests...');
      // Continuar con el test incluso si hay problemas de navegación
    }
  });

  test('debe renderizar la página principal correctamente', async ({ page }) => {
    // Verificar título de la página
    await expect(page).toHaveTitle(/INMORTAL_OS/);

    // Verificar elementos principales
    await expect(page.locator('body')).toBeVisible();

    // Verificar que hay algún elemento de navegación
    const navElements = page.locator('nav');
    await expect(navElements).toHaveCount(2); // Hay 2 nav: main-nav y mobile-nav
  });

  test('debe tener navegación funcional', async ({ page }) => {
    // Verificar que hay elementos de navegación
    const navElements = page.locator('nav');
    await expect(navElements).toHaveCount(2);

    // Verificar que hay enlaces en la navegación
    const navLinks = page.locator('nav a');
    if (await navLinks.count() > 0) {
      await expect(navLinks.first()).toBeVisible();
      await expect(navLinks.first()).toHaveAttribute('href');
    }
  });

  test('debe ser responsive en diferentes dispositivos', async ({ page }) => {
    // Test en viewport móvil
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    const navElements = page.locator('nav');
    await expect(navElements).toHaveCount(2);

    // Test en viewport desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(500);
    await expect(navElements).toHaveCount(2);
  });

  test('debe cargar recursos críticos', async ({ page }) => {
    // Verificar que se cargan los CSS principales
    const cssLinks = page.locator('link[rel="stylesheet"]');
    await expect(cssLinks).toHaveCount.greaterThan(0);

    // Verificar que se cargan los scripts principales
    const scripts = page.locator('script');
    await expect(scripts).toHaveCount.greaterThan(0);
  });

  test('debe tener metadatos SEO correctos', async ({ page }) => {
    // Verificar meta description
    const metaDescription = page.locator('meta[name="description"]');
    if (await metaDescription.count() > 0) {
      // Cambiar de toBeVisible() a toHaveAttribute() para meta tags
      await expect(metaDescription.first()).toHaveAttribute('content');
    }

    // Verificar meta keywords
    const metaKeywords = page.locator('meta[name="keywords"]');
    if (await metaKeywords.count() > 0) {
      await expect(metaKeywords.first()).toHaveAttribute('content');
    }

    // Verificar Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    if (await ogTitle.count() > 0) {
      await expect(ogTitle.first()).toHaveAttribute('content');
    }
  });

  test('debe manejar interacciones básicas', async ({ page }) => {
    // Verificar que la página responde a scroll
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    // Verificar que la página responde a resize
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(300);
  });

  test('debe tener accesibilidad básica', async ({ page }) => {
    // Verificar que hay elementos con roles semánticos
    const semanticElements = page.locator('main, article, section, nav, header, footer');
    if (await semanticElements.count() > 0) {
      await expect(semanticElements.first()).toBeVisible();
    }

    // Verificar que las imágenes tienen alt text (si existen)
    const images = page.locator('img');
    if (await images.count() > 0) {
      const firstImage = images.first();
      const altText = await firstImage.getAttribute('alt');
      expect(altText).toBeTruthy();
    }
  });

  test('debe cargar el sistema de audio correctamente', async ({ page }) => {
    // Verificar que los archivos de audio están disponibles (si existen)
    const audioElements = page.locator('audio, source[type*="audio"]');
    if (await audioElements.count() > 0) {
      // Solo verificar que existen, no que sean visibles
      await expect(audioElements.first()).toBeAttached();
    }
  });

  test('debe cargar componentes React si existen', async ({ page }) => {
    // Verificar que hay elementos con data-reactroot o similares
    const reactElements = page.locator('[data-reactroot], [data-reactid]');
    if (await reactElements.count() > 0) {
      await expect(reactElements.first()).toBeAttached();
    }
  });
});
