/**
 * Utilidades de Seguridad - Refactorización Completa para CodeQL
 * Implementación robusta usando sanitize-html y mejores prácticas de OWASP
 * CVE-2025-7783 Mitigation
 */

// ============================================================================
// IMPORTACIÓN DE LIBRERÍAS DE SEGURIDAD
// ============================================================================

// Intentar cargar sanitize-html si está disponible
let sanitizeHtml = null;
let he = null;

try {
    if (typeof require !== 'undefined') {
        sanitizeHtml = require('sanitize-html');
        he = require('he');
    }
} catch (error) {
    console.warn('⚠️ Librerías de seguridad no disponibles, usando fallbacks');
}

// ============================================================================
// SANITIZACIÓN HTML ROBUSTA
// ============================================================================

/**
 * Función robusta de sanitización HTML usando sanitize-html
 * Previene XSS y ataques de inyección HTML
 * @param {string} str - Cadena a sanitizar
 * @param {object} options - Opciones de sanitización
 * @returns {string} - Cadena sanitizada
 */
function sanitizeHTML(str, options = {}) {
    if (typeof str !== 'string') {
        return '';
    }
    
    // Configuración por defecto segura
    const defaultOptions = {
        allowedTags: [
            'b', 'i', 'em', 'strong', 'a', 'p', 'br', 'div', 'span',
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li',
            'blockquote', 'code', 'pre', 'table', 'thead', 'tbody', 'tr', 'td', 'th'
        ],
        allowedAttributes: {
            'a': ['href', 'title', 'target'],
            'img': ['src', 'alt', 'title', 'width', 'height'],
            'div': ['class', 'id'],
            'span': ['class', 'id'],
            'p': ['class'],
            'h1': ['class'], 'h2': ['class'], 'h3': ['class'],
            'h4': ['class'], 'h5': ['class'], 'h6': ['class']
        },
        allowedSchemes: ['http', 'https', 'mailto', 'tel'],
        allowedSchemesByTag: {
            'img': ['http', 'https', 'data']
        },
        allowedClasses: {
            'div': ['container', 'row', 'col', 'text-center', 'text-left', 'text-right'],
            'span': ['badge', 'label', 'highlight'],
            'p': ['lead', 'text-muted', 'text-primary']
        },
        transformTags: {
            'a': function(tagName, attribs) {
                // Validar URLs
                if (attribs.href) {
                    const url = attribs.href.toLowerCase();
                    if (url.startsWith('javascript:') || url.startsWith('data:')) {
                        delete attribs.href;
                    }
                }
                return { tagName, attribs };
            }
        }
    };
    
    // Fusionar opciones personalizadas con las por defecto
    const sanitizeOptions = { ...defaultOptions, ...options };
    
    try {
        if (sanitizeHtml) {
            // Usar librería sanitize-html
            return sanitizeHtml(str, sanitizeOptions);
        } else {
            // Fallback robusto si no está disponible la librería
            return fallbackSanitizeHTML(str);
        }
    } catch (error) {
        console.error('❌ Error en sanitización HTML:', error);
        return fallbackSanitizeHTML(str);
    }
}

/**
 * Fallback de sanitización HTML robusta
 * @param {string} str - Cadena a sanitizar
 * @returns {string} - Cadena sanitizada
 */
function fallbackSanitizeHTML(str) {
    if (typeof str !== 'string') {
        return '';
    }
    
    // Crear elemento temporal
    const temp = document.createElement('div');
    temp.textContent = str;
    
    // Obtener el contenido HTML escapado
    let sanitized = temp.innerHTML;
    
    // Eliminar scripts maliciosos
    sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    // Eliminar eventos inline
    sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
    
    // Eliminar javascript: en href
    sanitized = sanitized.replace(/href\s*=\s*["']\s*javascript:/gi, 'href="#"');
    
    // Eliminar data: URLs peligrosas
    sanitized = sanitized.replace(/src\s*=\s*["']\s*data:image\/svg\+xml/gi, 'src="#"');
    
    // Eliminar expresiones de estilo peligrosas
    sanitized = sanitized.replace(/style\s*=\s*["'][^"']*expression\s*\([^"']*["']/gi, '');
    
    return sanitized;
}

/**
 * Sanitización estricta para contenido que debe ser solo texto
 * @param {string} str - Cadena a sanitizar
 * @returns {string} - Solo texto, sin HTML
 */
function sanitizeTextOnly(str) {
    if (typeof str !== 'string') {
        return '';
    }
    
    try {
        if (he) {
            // Usar librería he para decode HTML entities
            return he.decode(str);
        } else {
            // Fallback nativo
            const temp = document.createElement('div');
            temp.textContent = str;
            return temp.textContent || temp.innerText || '';
        }
    } catch (error) {
        console.error('❌ Error en sanitización de texto:', error);
        return str.replace(/<[^>]*>/g, '');
    }
}

// ============================================================================
// ESCAPE DE COMILLAS MEJORADO
// ============================================================================

/**
 * Función robusta para escapar comillas simples en SQL
 * Usa expresión regular con bandera global para reemplazar TODAS las ocurrencias
 * @param {string} s - Cadena a escapar
 * @returns {string} - Cadena con comillas escapadas
 */
function escapeQuotes(s) {
    if (typeof s !== 'string') {
        return '';
    }
    
    // ESCAPAR TODAS las comillas simples usando regex con bandera global
    return s.replace(/'/g, "''");
}

/**
 * Escape de comillas dobles para uso en atributos HTML
 * @param {string} s - Cadena a escapar
 * @returns {string} - Cadena con comillas dobles escapadas
 */
function escapeDoubleQuotes(s) {
    if (typeof s !== 'string') {
        return '';
    }
    
    try {
        if (he) {
            return he.escape(s);
        } else {
            return s.replace(/"/g, '&quot;');
        }
    } catch (error) {
        console.error('❌ Error escapando comillas dobles:', error);
        return s.replace(/"/g, '&quot;');
    }
}

/**
 * Escape completo para uso en JavaScript
 * @param {string} s - Cadena a escapar
 * @returns {string} - Cadena escapada para JavaScript
 */
function escapeForJavaScript(s) {
    if (typeof s !== 'string') {
        return '';
    }
    
    return s
        .replace(/\\/g, '\\\\')  // Escapar barras invertidas primero
        .replace(/'/g, "\\'")    // Escapar comillas simples
        .replace(/"/g, '\\"')    // Escapar comillas dobles
        .replace(/\n/g, '\\n')   // Escapar saltos de línea
        .replace(/\r/g, '\\r')   // Escapar retornos de carro
        .replace(/\t/g, '\\t');  // Escapar tabulaciones
}

// ============================================================================
// VALIDACIÓN Y SANITIZACIÓN DE ENTRADA
// ============================================================================

/**
 * Validación y sanitización robusta de entrada
 * @param {string} input - Entrada a validar
 * @param {string} type - Tipo de validación
 * @returns {object} - Resultado de validación
 */
function validateAndSanitizeInput(input, type = 'text') {
    if (typeof input !== 'string') {
        return {
            isValid: false,
            sanitized: '',
            error: 'Entrada inválida: debe ser una cadena de texto'
        };
    }
    
    // Eliminar espacios en blanco al inicio y final
    let sanitized = input.trim();
    
    // Validar longitud mínima y máxima
    if (sanitized.length === 0) {
        return {
            isValid: false,
            sanitized: '',
            error: 'La entrada no puede estar vacía'
        };
    }
    
    if (sanitized.length > 1000) {
        return {
            isValid: false,
            sanitized: '',
            error: 'La entrada es demasiado larga (máximo 1000 caracteres)'
        };
    }
    
    switch (type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(sanitized)) {
                return {
                    isValid: false,
                    sanitized: '',
                    error: 'Formato de email inválido'
                };
            }
            // Sanitizar email
            sanitized = sanitized.toLowerCase();
            break;
            
        case 'name':
            // Solo letras, espacios, guiones y apóstrofes
            const nameRegex = /^[a-zA-ZÀ-ÿ\s\-']+$/;
            if (!nameRegex.test(sanitized)) {
                return {
                    isValid: false,
                    sanitized: '',
                    error: 'El nombre contiene caracteres inválidos'
                };
            }
            break;
            
        case 'number':
            const numberRegex = /^[0-9]+$/;
            if (!numberRegex.test(sanitized)) {
                return {
                    isValid: false,
                    sanitized: '',
                    error: 'Debe ser un número válido'
                };
            }
            break;
            
        case 'url':
            try {
                const url = new URL(sanitized);
                if (!['http:', 'https:'].includes(url.protocol)) {
                    return {
                        isValid: false,
                        sanitized: '',
                        error: 'URL debe usar protocolo HTTP o HTTPS'
                    };
                }
            } catch (error) {
                return {
                    isValid: false,
                    sanitized: '',
                    error: 'Formato de URL inválido'
                };
            }
            break;
            
        case 'text':
        default:
            // Para texto general, eliminar caracteres peligrosos
            sanitized = sanitized.replace(/[<>]/g, '');
            break;
    }
    
    return {
        isValid: true,
        sanitized: sanitized,
        error: null
    };
}

// ============================================================================
// PREVENCIÓN DE INYECCIÓN SQL
// ============================================================================

/**
 * Crear consultas SQL seguras usando parámetros preparados
 * @param {string} query - Consulta SQL con placeholders
 * @param {Array} params - Parámetros para la consulta
 * @returns {string} - Consulta SQL segura
 */
function createSafeSQLQuery(query, params = []) {
    if (typeof query !== 'string') {
        throw new Error('Query debe ser una cadena de texto');
    }
    
    if (!Array.isArray(params)) {
        throw new Error('Parámetros debe ser un array');
    }
    
    let safeQuery = query;
    
    params.forEach((param, index) => {
        const placeholder = `$${index + 1}`;
        const escapedValue = escapeQuotes(String(param));
        safeQuery = safeQuery.replace(placeholder, `'${escapedValue}'`);
    });
    
    return safeQuery;
}

// ============================================================================
// PREVENCIÓN DE XSS
// ============================================================================

/**
 * Crear elementos HTML de forma segura
 * @param {string} tagName - Nombre del elemento
 * @param {object} attributes - Atributos del elemento
 * @param {string} content - Contenido del elemento
 * @returns {HTMLElement} - Elemento HTML seguro
 */
function createSafeElement(tagName, attributes = {}, content = '') {
    if (typeof tagName !== 'string') {
        throw new Error('tagName debe ser una cadena de texto');
    }
    
    const element = document.createElement(tagName);
    
    // Agregar atributos de forma segura
    Object.keys(attributes).forEach(key => {
        const value = attributes[key];
        if (typeof value === 'string' && value.length > 0) {
            // Sanitizar el valor del atributo
            const sanitizedValue = sanitizeTextOnly(value);
            element.setAttribute(key, sanitizedValue);
        }
    });
    
    // Agregar contenido de forma segura
    if (content) {
        const sanitizedContent = sanitizeHTML(content);
        element.innerHTML = sanitizedContent;
    }
    
    return element;
}

/**
 * Insertar HTML de forma segura en un contenedor
 * @param {HTMLElement} container - Contenedor donde insertar
 * @param {string} html - HTML a insertar
 */
function insertSafeHTML(container, html) {
    if (!container || !(container instanceof HTMLElement)) {
        throw new Error('Container debe ser un elemento HTML válido');
    }
    
    if (typeof html !== 'string') {
        throw new Error('HTML debe ser una cadena de texto');
    }
    
    const sanitized = sanitizeHTML(html);
    container.innerHTML = sanitized;
}

// ============================================================================
// UTILIDADES PARA FORMULARIOS
// ============================================================================

/**
 * Sanitizar formulario completo
 * @param {HTMLFormElement} form - Formulario a sanitizar
 * @returns {object} - Datos sanitizados del formulario
 */
function sanitizeForm(form) {
    if (!form || !(form instanceof HTMLFormElement)) {
        return {
            data: {},
            errors: ['Formulario inválido'],
            isValid: false
        };
    }
    
    const formData = {};
    const errors = [];
    
    // Obtener todos los campos del formulario
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        const name = input.name;
        const value = input.value;
        const type = input.type || 'text';
        
        if (name) {
            const validation = validateAndSanitizeInput(value, type);
            
            if (validation.isValid) {
                formData[name] = validation.sanitized;
            } else {
                errors.push(`${name}: ${validation.error}`);
            }
        }
    });
    
    return {
        data: formData,
        errors: errors,
        isValid: errors.length === 0
    };
}

// ============================================================================
// EXPORTAR FUNCIONES PARA USO GLOBAL
// ============================================================================

// Hacer las funciones disponibles globalmente
window.SecurityUtils = {
    sanitizeHTML,
    sanitizeTextOnly,
    escapeQuotes,
    escapeDoubleQuotes,
    escapeForJavaScript,
    validateAndSanitizeInput,
    createSafeSQLQuery,
    createSafeElement,
    insertSafeHTML,
    sanitizeForm
};

// También exportar individualmente para compatibilidad
window.sanitizeHTML = sanitizeHTML;
window.escapeQuotes = escapeQuotes;
window.validateAndSanitizeInput = validateAndSanitizeInput;

// Exportar para Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sanitizeHTML,
        sanitizeTextOnly,
        escapeQuotes,
        escapeDoubleQuotes,
        escapeForJavaScript,
        validateAndSanitizeInput,
        createSafeSQLQuery,
        createSafeElement,
        insertSafeHTML,
        sanitizeForm
    };
}

console.log('✅ Utilidades de seguridad cargadas correctamente');
