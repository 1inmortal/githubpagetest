import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  // Configuración global de timeouts
  timeout: 60000, // 60 segundos para tests
  expect: {
    timeout: 10000 // 10 segundos para expectaciones
  },
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    // Configuraciones adicionales para estabilidad
    actionTimeout: 15000,
    navigationTimeout: 30000,
    viewport: { width: 1280, height: 720 }
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Configuraciones específicas para Chromium
        launchOptions: {
          args: ['--no-sandbox', '--disable-dev-shm-usage']
        }
      }
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        // Configuraciones específicas para Firefox
        launchOptions: {
          args: ['--no-sandbox']
        }
      }
    },
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        // Configuraciones específicas para WebKit
        launchOptions: {
          args: ['--no-sandbox']
        }
      }
    },
    {
      name: 'Mobile Chrome',
      use: { 
        ...devices['Pixel 5'],
        // Configuraciones específicas para móvil
        launchOptions: {
          args: ['--no-sandbox', '--disable-dev-shm-usage']
        }
      }
    },
    {
      name: 'Mobile Safari',
      use: { 
        ...devices['iPhone 12'],
        // Configuraciones específicas para iOS
        launchOptions: {
          args: ['--no-sandbox']
        }
      }
    }
  ],

  webServer: {
    command: 'npm run dev:frontend',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    
    // Configuraciones adicionales para el servidor
    stderr: 'pipe',
    stdout: 'pipe',
    
    // Esperar a que el servidor esté listo
    waitFor: {
      url: 'http://localhost:3000',
      timeout: 30000
    }
  },
  
  // Configuración para CI/CD
  globalSetup: process.env.CI ? './tests/setup.js' : undefined,
  globalTeardown: process.env.CI ? './tests/teardown.js' : undefined
});
