/**
 * Middleware de seguridad para prevenir ataques comunes
 * @author INMORTAL_OS
 */

import { securityConfig } from '../config/security.js';

// Middleware para prevenir ataques de timing
export function preventTimingAttacks(req, res, next) {
  // Agregar delay aleatorio para prevenir ataques de timing
  const randomDelay = Math.random() * 100; // 0-100ms
  setTimeout(next, randomDelay);
}

// Middleware para validar y sanitizar entradas
export function sanitizeInputs(req, res, next) {
  // Sanitizar body
  if (req.body) {
    sanitizeObject(req.body);
  }
  
  // Sanitizar query parameters
  if (req.query) {
    sanitizeObject(req.query);
  }
  
  // Sanitizar params
  if (req.params) {
    sanitizeObject(req.params);
  }
  
  next();
}

// Función para sanitizar objetos recursivamente
function sanitizeObject(obj) {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      obj[key] = sanitizeString(value);
    } else if (typeof value === 'object' && value !== null) {
      sanitizeObject(value);
    }
  }
}

// Función para sanitizar strings
function sanitizeString(str) {
  if (typeof str !== 'string') return str;
  
  return str
    .replace(/[<>]/g, '') // Remover < y >
    .replace(/javascript:/gi, '') // Remover javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remover event handlers
    .substring(0, securityConfig.validation.maxMessageLength); // Limitar longitud
}

// Middleware para prevenir ataques de path traversal
export function preventPathTraversal(req, res, next) {
  const path = req.path;
  
  // Verificar que la ruta no contenga secuencias peligrosas
  if (path.includes('..') || path.includes('//') || path.includes('\\')) {
    return res.status(400).json({
      error: 'Ruta inválida detectada',
      code: 'INVALID_PATH'
    });
  }
  
  next();
}

// Middleware para validar tipos de contenido
export function validateContentType(req, res, next) {
  const contentType = req.get('Content-Type');
  
  // Para rutas que esperan JSON
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({
        error: 'Content-Type debe ser application/json',
        code: 'INVALID_CONTENT_TYPE'
      });
    }
  }
  
  next();
}

// Middleware para prevenir ataques de fuerza bruta en login
export function preventBruteForce(req, res, next) {
  // Este middleware se puede extender para implementar
  // bloqueo de IPs después de múltiples intentos fallidos
  
  // Por ahora, solo registramos intentos de login
  if (req.path === '/api/auth/login' && req.method === 'POST') {
    console.log(`🔐 Intento de login desde IP: ${req.ip} - ${new Date().toISOString()}`);
  }
  
  next();
}

// Middleware para validar tamaño de archivos
export function validateFileSize(req, res, next) {
  const contentLength = parseInt(req.get('Content-Length') || '0');
  
  if (contentLength > securityConfig.files.maxSize) {
    return res.status(413).json({
      error: 'Archivo demasiado grande',
      maxSize: securityConfig.files.maxSize,
      receivedSize: contentLength,
      code: 'FILE_TOO_LARGE'
    });
  }
  
  next();
}

// Middleware para agregar headers de seguridad adicionales
export function addSecurityHeaders(req, res, next) {
  // Prevenir clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Prevenir MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Referrer policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions policy
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  // Cache control para respuestas sensibles
  if (req.path.includes('/api/auth') || req.path.includes('/api/users')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
  
  next();
}

// Middleware para validar tokens JWT
export function validateJWTFormat(req, res, next) {
  const authHeader = req.get('Authorization');
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    
    // Validar formato básico del JWT (3 partes separadas por puntos)
    if (!token || token.split('.').length !== 3) {
      return res.status(401).json({
        error: 'Token JWT inválido',
        code: 'INVALID_JWT_FORMAT'
      });
    }
  }
  
  next();
}

// Middleware para prevenir ataques de enumeración de usuarios
export function preventUserEnumeration(req, res, next) {
  // Para rutas de autenticación, usar tiempos de respuesta consistentes
  if (req.path === '/api/auth/login' || req.path === '/api/auth/register') {
    // Agregar delay consistente para prevenir timing attacks
    setTimeout(next, 100);
  } else {
    next();
  }
}

// Middleware para validar rate limiting personalizado
export function customRateLimit(req, res, next) {
  // Implementar rate limiting más granular si es necesario
  // Por ahora, solo registramos para análisis
  
  const clientIP = req.ip;
  const endpoint = req.path;
  const timestamp = Date.now();
  
  console.log(`📊 Request: ${clientIP} -> ${endpoint} [${timestamp}]`);
  
  next();
}

// Middleware para validar archivos de imagen
export function validateImageFile(req, res, next) {
  if (req.file) {
    const allowedTypes = securityConfig.files.allowedImageTypes;
    const fileType = req.file.mimetype;
    
    if (!allowedTypes.includes(fileType)) {
      return res.status(400).json({
        error: 'Tipo de archivo no permitido',
        allowedTypes,
        receivedType: fileType,
        code: 'INVALID_FILE_TYPE'
      });
    }
    
    // Verificar extensión del archivo
    const extension = req.file.originalname.toLowerCase().split('.').pop();
    const allowedExtensions = securityConfig.files.allowedExtensions.map(ext => ext.substring(1));
    
    if (!allowedExtensions.includes(extension)) {
      return res.status(400).json({
        error: 'Extensión de archivo no permitida',
        allowedExtensions,
        receivedExtension: extension,
        code: 'INVALID_FILE_EXTENSION'
      });
    }
  }
  
  next();
}

// Middleware para logging de seguridad
export function securityLogging(req, res, next) {
  const securityEvents = [
    'login',
    'logout',
    'password_change',
    'profile_update',
    'file_upload',
    'file_delete'
  ];
  
  if (securityEvents.some(event => req.path.includes(event))) {
    console.log(`🔒 Evento de seguridad: ${req.method} ${req.path} - IP: ${req.ip} - Usuario: ${req.user?.userId || 'No autenticado'}`);
  }
  
  next();
}

// Exportar todos los middlewares como un array para uso fácil
export const securityMiddlewares = [
  preventTimingAttacks,
  sanitizeInputs,
  preventPathTraversal,
  validateContentType,
  preventBruteForce,
  validateFileSize,
  addSecurityHeaders,
  validateJWTFormat,
  preventUserEnumeration,
  customRateLimit,
  validateImageFile,
  securityLogging
];
