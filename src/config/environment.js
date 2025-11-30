/**
 * Configuración de entorno para la aplicación
 * @author INMORTAL_OS
 */

// Configuración según el entorno
const config = {
  // Desarrollo local
  development: {
    apiBaseURL: 'http://localhost:3001/api',
    frontendURL: 'http://localhost:3000',
    environment: 'development'
  },
  
  // Producción (GitHub Pages)
  production: {
    // IMPORTANTE: Cambiar esta URL por tu servidor real en producción
    apiBaseURL: 'https://tu-servidor-produccion.com/api',
    frontendURL: 'https://tu-usuario.github.io/githubpagetest',
    environment: 'production'
  }
};

// Función para obtener la configuración actual
const ALLOWED_HOSTS = ['1inmortal.github.io', 'localhost', '127.0.0.1'];

export function getConfig() {
  const hostname = window.location.hostname;

  // Validación estricta por lista blanca de hostnames
  if (!ALLOWED_HOSTS.includes(hostname)) {
    // Host no autorizado: forzar entorno de desarrollo para evitar envs ambiguos
    return config.development;
  }

  if (hostname === '1inmortal.github.io') {
    return config.production;
  }

  // localhost o 127.0.0.1
  return config.development;
}

// Configuración actual
export const currentConfig = getConfig();

// URLs específicas
export const API_BASE_URL = currentConfig.apiBaseURL;
export const FRONTEND_URL = currentConfig.frontendURL;
export const ENVIRONMENT = currentConfig.environment;

// Función para construir URLs completas
export function buildApiUrl(endpoint) {
  return `${API_BASE_URL}${endpoint}`;
}

// Función para verificar si estamos en desarrollo
export function isDevelopment() {
  return ENVIRONMENT === 'development';
}

// Función para verificar si estamos en producción
export function isProduction() {
  return ENVIRONMENT === 'production';
}

export default config;
