/**
 * Utilidades de Seguridad - Mejoras para prevenir inyecciones SQL y XSS
 * Basado en las mejores prácticas de OWASP y bibliotecas probadas
 */

// ============================================================================
// DESINFECCIÓN HTML MEJORADA
// ============================================================================

/**
 * Función mejorada de sanitización HTML que previene XSS
 * Basada en DOMPurify pero implementada de forma nativa
 * @param {string} str - Cadena a sanitizar
 * @returns {string} - Cadena sanitizada
 */
function sanitizeHTML(str) {
    if (typeof str !== 'string') {
        return '';
    }
    
    // Crear elemento temporal
    const temp = document.createElement('div');
    temp.textContent = str;
    
    // Obtener el contenido HTML escapado
    let sanitized = temp.innerHTML;
    
    // Eliminar cualquier script que pudiera haberse insertado
    sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    // Eliminar eventos inline
    sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
    
    // Eliminar javascript: en href
    sanitized = sanitized.replace(/href\s*=\s*["']\s*javascript:/gi, 'href="#"');
    
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
    
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.textContent || temp.innerText || '';
}

// ============================================================================
// ESCAPE DE COMILLAS MEJORADO
// ============================================================================

/**
 * Función mejorada para escapar comillas simples en SQL
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
    
    return s.replace(/"/g, '&quot;');
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
// VALIDACIÓN DE ENTRADA
// ============================================================================

/**
 * Validar y sanitizar entrada de usuario para consultas SQL
 * @param {string} input - Entrada del usuario
 * @param {string} type - Tipo de validación ('email', 'name', 'text', 'number')
 * @returns {object} - {isValid: boolean, sanitized: string, error: string}
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
            
        case 'text':
        default:
            // Para texto general, solo eliminar caracteres peligrosos
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
    // Esta función simula parámetros preparados
    // En un entorno real, usarías una biblioteca como sqlstring
    
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
    const element = document.createElement(tagName);
    
    // Agregar atributos de forma segura
    Object.keys(attributes).forEach(key => {
        const value = attributes[key];
        if (typeof value === 'string' && value.trim() !== '') {
            // Evitar atributos peligrosos
            if (!key.toLowerCase().startsWith('on') && 
                key.toLowerCase() !== 'javascript:') {
                element.setAttribute(key, sanitizeTextOnly(value));
            }
        }
    });
    
    // Agregar contenido de forma segura
    if (content) {
        element.textContent = sanitizeTextOnly(content);
    }
    
    return element;
}

/**
 * Insertar contenido HTML de forma segura
 * @param {HTMLElement} container - Contenedor donde insertar
 * @param {string} html - HTML a insertar
 */
function insertSafeHTML(container, html) {
    if (!container || !html) return;
    
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
