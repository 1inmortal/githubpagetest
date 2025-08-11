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
export function getConfig() {
  const hostname = window.location.hostname;
  
  // Detectar entorno
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return config.development;
  }
  
  if (hostname.includes('github.io')) {
    return config.production;
  }
  
  // Fallback para otros entornos
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
