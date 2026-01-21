/**
 * Security Utilities for DOM manipulation and URL validation
 * Soluciones para alertas de CodeQL/GitHub Code Scanning
 */

import DOMPurify from 'dompurify';

/**
 * Sanitiza HTML usando DOMPurify antes de insertarlo en el DOM
 * Previene XSS: DOM text reinterpreted as HTML
 * @param {string} dirtyHtml - HTML potencialmente inseguro
 * @param {object} config - Configuración de DOMPurify
 * @returns {string} HTML sanitizado
 */
export function sanitizeHTML(dirtyHtml, config = {}) {
  const defaultConfig = {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'span', 'div', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'title', 'class', 'id'],
    ALLOW_DATA_ATTR: false,
    ...config
  };
  
  return DOMPurify.sanitize(dirtyHtml, defaultConfig);
}

/**
 * Inserta texto de forma segura en un elemento (sin interpretar HTML)
 * Previene XSS usando textContent en lugar de innerHTML
 * @param {HTMLElement} element - Elemento destino
 * @param {string} text - Texto a insertar
 */
export function setTextSafe(element, text) {
  if (!element) {
    console.warn('[Security] Element is null or undefined');
    return;
  }
  element.textContent = String(text);
}

/**
 * Inserta HTML sanitizado en un elemento
 * Previene XSS: DOM text reinterpreted as HTML
 * @param {HTMLElement} element - Elemento destino
 * @param {string} html - HTML a insertar
 * @param {object} config - Configuración de DOMPurify
 */
export function setHTMLSafe(element, html, config = {}) {
  if (!element) {
    console.warn('[Security] Element is null or undefined');
    return;
  }
  const cleanHTML = sanitizeHTML(html, config);
  element.innerHTML = cleanHTML;
}

/**
 * Valida una URL usando lista blanca de protocolos
 * Previene: Incomplete URL substring sanitization
 * @param {string} url - URL a validar
 * @param {string[]} allowedProtocols - Protocolos permitidos
 * @returns {boolean} true si la URL es segura
 */
export function isURLSafe(url, allowedProtocols = ['http:', 'https:']) {
  if (!url || typeof url !== 'string') {
    return false;
  }

  try {
    const trimmedUrl = url.trim();
    
    // Detectar intentos de bypass con espacios/tabs
    if (/[\s\t\n\r]/.test(trimmedUrl)) {
      console.warn('[Security] URL contains whitespace characters');
      return false;
    }

    // Parsear URL de forma segura
    const parsed = new URL(trimmedUrl, window.location.origin);
    
    // Validar protocolo contra lista blanca
    if (!allowedProtocols.includes(parsed.protocol)) {
      console.warn(`[Security] Protocol "${parsed.protocol}" not allowed`);
      return false;
    }

    return true;
  } catch (error) {
    console.warn('[Security] Invalid URL:', error.message);
    return false;
  }
}

/**
 * Sanitiza y valida una URL antes de usarla
 * Previene: Incomplete URL substring sanitization
 * @param {string} url - URL a sanitizar
 * @param {string} fallbackUrl - URL de respaldo si la validación falla
 * @returns {string} URL segura o fallback
 */
export function sanitizeURL(url, fallbackUrl = '#') {
  if (!isURLSafe(url)) {
    console.warn(`[Security] URL rejected, using fallback: ${fallbackUrl}`);
    return fallbackUrl;
  }
  return url;
}

/**
 * Crea un elemento de forma segura con texto
 * @param {string} tagName - Nombre del tag HTML
 * @param {string} text - Texto a insertar
 * @param {object} attributes - Atributos del elemento
 * @returns {HTMLElement} Elemento creado
 */
export function createElementSafe(tagName, text = '', attributes = {}) {
  const element = document.createElement(tagName);
  
  if (text) {
    element.textContent = text;
  }
  
  Object.entries(attributes).forEach(([key, value]) => {
    // Validar href si es un enlace
    if (key === 'href' && tagName.toLowerCase() === 'a') {
      element.setAttribute(key, sanitizeURL(value, '#'));
    } else {
      element.setAttribute(key, String(value));
    }
  });
  
  return element;
}

/**
 * Valida que no haya datos sensibles antes de almacenar en localStorage
 * Previene: Clear text storage of sensitive information
 * @param {string} key - Clave de localStorage
 * @param {any} value - Valor a almacenar
 * @returns {boolean} true si se puede almacenar de forma segura
 */
export function canStoreSafely(key, value) {
  const sensitivePatterns = [
    /password/i,
    /secret/i,
    /api[_-]?key/i,
    /auth[_-]?token/i,
    /access[_-]?token/i,
    /private[_-]?key/i,
    /credential/i
  ];

  const keyStr = String(key).toLowerCase();
  const valueStr = String(value).toLowerCase();

  for (const pattern of sensitivePatterns) {
    if (pattern.test(keyStr) || pattern.test(valueStr)) {
      console.error(`[Security] Attempted to store sensitive data with key: ${key}`);
      return false;
    }
  }

  return true;
}

/**
 * Almacena datos en localStorage solo si pasan validación de seguridad
 * Previene: Clear text storage of sensitive information
 * @param {string} key - Clave de localStorage
 * @param {any} value - Valor a almacenar
 * @returns {boolean} true si se almacenó exitosamente
 */
export function setLocalStorageSafe(key, value) {
  if (!canStoreSafely(key, value)) {
    console.error('[Security] Blocked attempt to store sensitive data in localStorage');
    return false;
  }

  try {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error('[Security] Failed to store in localStorage:', error.message);
    return false;
  }
}

/**
 * Valida origen de script/iframe
 * Previene: Inclusion of functionality from an untrusted source
 * @param {string} src - URL del recurso
 * @param {string[]} trustedDomains - Dominios confiables
 * @returns {boolean} true si el origen es confiable
 */
export function isTrustedSource(src, trustedDomains = []) {
  const defaultTrustedDomains = [
    'cdn.jsdelivr.net',
    'unpkg.com',
    'cdnjs.cloudflare.com',
    'code.jquery.com',
    'stackpath.bootstrapcdn.com',
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'www.googletagmanager.com',
    'www.google-analytics.com',
    'ajax.googleapis.com'
  ];

  const allTrustedDomains = [...defaultTrustedDomains, ...trustedDomains];

  try {
    const url = new URL(src, window.location.origin);
    const hostname = url.hostname.toLowerCase();

    // Verificar si el dominio está en la lista de confianza
    return allTrustedDomains.some(trusted => 
      hostname === trusted || hostname.endsWith(`.${trusted}`)
    );
  } catch (error) {
    console.warn('[Security] Invalid source URL:', src);
    return false;
  }
}

/**
 * Log de auditoría para operaciones sensibles
 * @param {string} operation - Nombre de la operación
 * @param {object} details - Detalles adicionales
 */
export function auditLog(operation, details = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    operation,
    ...details,
    userAgent: navigator.userAgent,
    url: window.location.href
  };

  // En producción, esto debería enviarse a un servicio de logging
  console.info('[Security Audit]', logEntry);
}
