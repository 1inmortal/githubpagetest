/**
 * Configuración de seguridad centralizada
 * @author INMORTAL_OS
 */

import dotenv from 'dotenv';

dotenv.config();

export const securityConfig = {
  // Configuración de archivos
  files: {
    maxSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB por defecto
    uploadsDir: process.env.UPLOADS_DIR || './uploads',
    allowedImageTypes: (process.env.ALLOWED_IMAGE_TYPES || 'image/jpeg,image/jpg,image/png,image/webp').split(','),
    allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp']
  },

  // Configuración de rate limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutos
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
  },

  // Configuración de JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'dev-jwt-secret-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },

  // Configuración de cookies
  cookies: {
    secret: process.env.COOKIE_SECRET || 'dev-cookie-secret-change-in-production',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict'
  },

  // Configuración de CORS
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
  },

  // Configuración de Helmet
  helmet: {
    enabled: process.env.HELMET_ENABLED !== 'false',
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        scriptSrc: ["'self'", "https://cdnjs.cloudflare.com", "https://www.googletagmanager.com"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        frameSrc: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: []
      }
    }
  },

  // Configuración de validación
  validation: {
    maxEmailLength: 254,
    maxMessageLength: 200,
    maxFileNameLength: 255
  }
};

// Función para validar que las configuraciones críticas estén presentes
export function validateSecurityConfig() {
  const requiredEnvVars = [
    'JWT_SECRET',
    'COOKIE_SECRET'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.warn('⚠️  Variables de entorno de seguridad faltantes:', missingVars);
    console.warn('⚠️  Usando valores por defecto inseguros para desarrollo');
  }

  // Validar que JWT_SECRET no sea el valor por defecto en producción
  if (process.env.NODE_ENV === 'production' && 
      securityConfig.jwt.secret === 'dev-jwt-secret-change-in-production') {
    throw new Error('JWT_SECRET debe ser configurado en producción');
  }

  // Validar que COOKIE_SECRET no sea el valor por defecto en producción
  if (process.env.NODE_ENV === 'production' && 
      securityConfig.cookies.secret === 'dev-cookie-secret-change-in-production') {
    throw new Error('COOKIE_SECRET debe ser configurado en producción');
  }

  return true;
}

// Función para generar secretos seguros (solo para desarrollo)
export function generateSecureSecret(length = 64) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Función para verificar si estamos en un entorno seguro
export function isSecureEnvironment() {
  return process.env.NODE_ENV === 'production' && 
         process.env.JWT_SECRET && 
         process.env.COOKIE_SECRET &&
         process.env.JWT_SECRET !== 'dev-jwt-secret-change-in-production' &&
         process.env.COOKIE_SECRET !== 'dev-cookie-secret-change-in-production';
}
