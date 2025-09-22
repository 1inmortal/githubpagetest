/**
 * Utilidades de Seguridad para el Portafolio
 * Reemplaza funcionalidades inseguras por alternativas seguras
 */

// Importar mathjs para reemplazar eval
import * as math from 'https://cdn.jsdelivr.net/npm/mathjs@12.3.1/+esm';

// Importar DOMPurify para sanitización
import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@3.0.8/+esm';

/**
 * Clase para manejo seguro de cookies
 */
class SecureCookieManager {
    constructor() {
        this.domain = '.github.io';
        this.secure = true;
        this.sameSite = 'strict';
        this.maxAge = 86400000; // 24 horas
    }

    /**
     * Establecer una cookie segura
     * @param {string} name - Nombre de la cookie
     * @param {string} value - Valor de la cookie
     * @param {Object} options - Opciones adicionales
     */
    setCookie(name, value, options = {}) {
        const cookieOptions = {
            domain: this.domain,
            secure: this.secure,
            sameSite: this.sameSite,
            maxAge: this.maxAge,
            path: '/',
            ...options
        };

        let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
        
        if (cookieOptions.domain) cookieString += `; domain=${cookieOptions.domain}`;
        if (cookieOptions.path) cookieString += `; path=${cookieOptions.path}`;
        if (cookieOptions.maxAge) cookieString += `; max-age=${cookieOptions.maxAge}`;
        if (cookieOptions.secure) cookieString += '; secure';
        if (cookieOptions.sameSite) cookieString += `; samesite=${cookieOptions.sameSite}`;

        document.cookie = cookieString;
    }

    /**
     * Obtener el valor de una cookie
     * @param {string} name - Nombre de la cookie
     * @returns {string|null} - Valor de la cookie o null si no existe
     */
    getCookie(name) {
        const nameEQ = encodeURIComponent(name) + "=";
        const ca = document.cookie.split(';');
        
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) {
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
            }
        }
        return null;
    }

    /**
     * Eliminar una cookie
     * @param {string} name - Nombre de la cookie
     */
    deleteCookie(name) {
        this.setCookie(name, '', { maxAge: -1 });
    }
}

/**
 * Clase para sanitización segura de contenido
 */
class ContentSanitizer {
    constructor() {
        this.domPurify = DOMPurify;
        this.configureDOMPurify();
    }

    /**
     * Configurar DOMPurify con opciones seguras
     */
    configureDOMPurify() {
        this.domPurify.setConfig({
            ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'span', 'div'],
            ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'id'],
            ALLOWED_URI_REGEXP: /^(https?:|mailto:|tel:)/i,
            FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input'],
            FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur']
        });
    }

    /**
     * Sanitizar texto HTML
     * @param {string} html - HTML a sanitizar
     * @returns {string} - HTML sanitizado
     */
    sanitizeHTML(html) {
        if (typeof html !== 'string') return '';
        return this.domPurify.sanitize(html);
    }

    /**
     * Sanitizar texto plano
     * @param {string} text - Texto a sanitizar
     * @returns {string} - Texto sanitizado
     */
    sanitizeText(text) {
        if (typeof text !== 'string') return '';
        return this.domPurify.sanitize(text, { ALLOWED_TAGS: [] });
    }

    /**
     * Sanitizar URL
     * @param {string} url - URL a sanitizar
     * @returns {string} - URL sanitizada o cadena vacía si es insegura
     */
    sanitizeURL(url) {
        if (typeof url !== 'string') return '';
        
        try {
            const parsed = new URL(url);
            if (['http:', 'https:', 'mailto:', 'tel:'].includes(parsed.protocol)) {
                return url;
            }
        } catch (e) {
            // URL inválida
        }
        
        return '';
    }
}

/**
 * Clase para evaluación segura de expresiones matemáticas
 */
class SafeExpressionEvaluator {
    constructor() {
        this.math = math;
        this.configureMathJS();
    }

    /**
     * Configurar mathjs con opciones seguras
     */
    configureMathJS() {
        this.math.config({
            number: 'BigNumber',
            precision: 20,
            predictable: true
        });
    }

    /**
     * Evaluar expresión matemática de forma segura
     * @param {string} expression - Expresión matemática
     * @returns {*} - Resultado de la evaluación
     * @throws {Error} - Si la expresión es inválida o insegura
     */
    evaluate(expression) {
        if (typeof expression !== 'string') {
            throw new Error('La expresión debe ser una cadena de texto');
        }

        // Validar que solo contenga caracteres matemáticos seguros
        const safePattern = /^[0-9+\-*/()., \s]+$/;
        if (!safePattern.test(expression)) {
            throw new Error('La expresión contiene caracteres no permitidos');
        }

        try {
            return this.math.evaluate(expression);
        } catch (error) {
            throw new Error(`Error al evaluar la expresión: ${error.message}`);
        }
    }

    /**
     * Validar si una expresión es segura
     * @param {string} expression - Expresión a validar
     * @returns {boolean} - true si es segura
     */
    isSafe(expression) {
        try {
            this.evaluate(expression);
            return true;
        } catch (e) {
            return false;
        }
    }
}

/**
 * Clase para migración de localStorage a cookies seguras
 */
class LocalStorageMigrator {
    constructor() {
        this.cookieManager = new SecureCookieManager();
        this.migrationMap = new Map();
        this.initializeMigrationMap();
    }

    /**
     * Inicializar mapa de migración
     */
    initializeMigrationMap() {
        this.migrationMap.set('isAudioEnabled', 'audio_enabled');
        this.migrationMap.set('menuMuted', 'menu_muted');
        this.migrationMap.set('dashboardMuted', 'dashboard_muted');
        this.migrationMap.set('themePrimaryColor', 'theme_primary');
        this.migrationMap.set('themeSecondaryColor', 'theme_secondary');
        this.migrationMap.set('themeAccentColor', 'theme_accent');
        this.migrationMap.set('highContrast', 'high_contrast');
        this.migrationMap.set('volume', 'volume_level');
        this.migrationMap.set('animationsEnabled', 'animations_enabled');
        this.migrationMap.set('soundNotificationsEnabled', 'sound_enabled');
        this.migrationMap.set('vibrationEnabled', 'vibration_enabled');
        this.migrationMap.set('animationSpeedFactor', 'animation_speed');
        this.migrationMap.set('layoutDragEnabled', 'layout_drag_enabled');
        this.migrationMap.set('projectOrder', 'project_order');
        this.migrationMap.set('achievements', 'achievements_data');
        this.migrationMap.set('tutorialShown', 'tutorial_shown');
    }

    /**
     * Migrar un valor de localStorage a cookie segura
     * @param {string} localStorageKey - Clave en localStorage
     * @param {string} defaultValue - Valor por defecto
     * @returns {string} - Valor migrado
     */
    migrateValue(localStorageKey, defaultValue = '') {
        const cookieKey = this.migrationMap.get(localStorageKey);
        if (!cookieKey) return defaultValue;

        // Intentar obtener de cookie primero
        let value = this.cookieManager.getCookie(cookieKey);
        
        if (value === null) {
            // Si no hay cookie, intentar localStorage y migrar
            const localValue = localStorage.getItem(localStorageKey);
            if (localValue !== null) {
                value = localValue;
                // Migrar a cookie
                this.cookieManager.setCookie(cookieKey, value);
                // Limpiar localStorage
                localStorage.removeItem(localStorageKey);
            } else {
                value = defaultValue;
            }
        }

        return value;
    }

    /**
     * Establecer valor en cookie segura
     * @param {string} localStorageKey - Clave original de localStorage
     * @param {string} value - Valor a establecer
     */
    setSecureValue(localStorageKey, value) {
        const cookieKey = this.migrationMap.get(localStorageKey);
        if (cookieKey) {
            this.cookieManager.setCookie(cookieKey, value);
        }
    }

    /**
     * Obtener valor de cookie segura
     * @param {string} localStorageKey - Clave original de localStorage
     * @param {string} defaultValue - Valor por defecto
     * @returns {string} - Valor de la cookie
     */
    getSecureValue(localStorageKey, defaultValue = '') {
        return this.migrateValue(localStorageKey, defaultValue);
    }
}

// Exportar utilidades
export {
    SecureCookieManager,
    ContentSanitizer,
    SafeExpressionEvaluator,
    LocalStorageMigrator
};

// Crear instancias globales para compatibilidad
window.SecurityUtils = {
    cookies: new SecureCookieManager(),
    sanitizer: new ContentSanitizer(),
    evaluator: new SafeExpressionEvaluator(),
    migrator: new LocalStorageMigrator()
};

// Función de compatibilidad para reemplazar eval
window.safeEval = (expression) => {
    return window.SecurityUtils.evaluator.evaluate(expression);
};

// Función de compatibilidad para reemplazar innerHTML
window.safeSetContent = (element, content, useHTML = false) => {
    if (!element) return;
    
    if (useHTML) {
        const sanitized = window.SecurityUtils.sanitizer.sanitizeHTML(content);
        element.innerHTML = sanitized;
    } else {
        const sanitized = window.SecurityUtils.sanitizer.sanitizeText(content);
        element.textContent = sanitized;
    }
};
