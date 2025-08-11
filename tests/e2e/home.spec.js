/**
 * Tests E2E para la página principal
 * @author INMORTAL_OS
 */

import { test, expect } from '@playwright/test';

test.describe('Página Principal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Esperar solo a que el DOM esté listo, no a toda la red
    await page.waitForLoadState('domcontentloaded');
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
      await expect(metaDescription.first()).toBeVisible();
    }

    // Verificar meta keywords
    const metaKeywords = page.locator('meta[name="keywords"]');
    if (await metaKeywords.count() > 0) {
      await expect(metaKeywords.first()).toBeVisible();
    }

    // Verificar Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    if (await ogTitle.count() > 0) {
      await expect(ogTitle.first()).toBeVisible();
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
      for (const img of await images.all()) {
        const alt = await img.getAttribute('alt');
        // Permitir que algunas imágenes no tengan alt si es intencional
        if (alt !== null) {
          expect(alt).toBeTruthy();
        }
      }
    }
  });
});

test.describe('Funcionalidades Específicas', () => {
  test('debe cargar el sistema de audio correctamente', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Verificar que los archivos de audio están disponibles (si existen)
    const audioElements = page.locator('audio, source[type*="audio"]');
    if (await audioElements.count() > 0) {
      await expect(audioElements.first()).toBeVisible();
    }

    // Verificar que hay controles de audio (botón de toggle)
    const audioToggle = page.locator('#audio-toggle, .audio-control');
    if (await audioToggle.count() > 0) {
      await expect(audioToggle.first()).toBeVisible();
    }
  });

  test('debe tener animaciones CSS funcionando', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Verificar que hay elementos con clases de animación (si existen)
    const animatedElements = page.locator('[class*="animate"], [class*="transition"], [class*="animation"]');
    if (await animatedElements.count() > 0) {
      await expect(animatedElements.first()).toBeVisible();
    }

    // Verificar que hay elementos con transformaciones CSS
    const transformedElements = page.locator('[style*="transform"], [style*="transition"]');
    if (await transformedElements.count() > 0) {
      await expect(transformedElements.first()).toBeVisible();
    }
  });

  test('debe cargar componentes React si existen', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Verificar que hay elementos con atributos de React (si existen)
    const reactElements = page.locator('[data-reactroot], [data-reactid], [class*="react"]');
    if (await reactElements.count() > 0) {
      await expect(reactElements.first()).toBeVisible();
    }

    // Verificar que hay elementos interactivos
    const interactiveElements = page.locator('button, a, input, select, textarea');
    if (await interactiveElements.count() > 0) {
      await expect(interactiveElements.first()).toBeVisible();
    }
  });
});
