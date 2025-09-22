/**
 * Utilidades Seguras para Manipulación del DOM
 * Reemplaza innerHTML por alternativas seguras usando DOMPurify
 */

// Importar DOMPurify para sanitización
let DOMPurify;
try {
    // Intentar importar desde CDN
    DOMPurify = window.DOMPurify;
} catch (error) {
    console.warn('⚠️ DOMPurify no disponible, usando fallback básico');
}

/**
 * Clase para manipulación segura del DOM
 */
class SafeDOMUtils {
    constructor() {
        this.domPurify = DOMPurify;
        this.configureSanitizer();
    }

    /**
     * Configurar el sanitizador con opciones seguras
     */
    configureSanitizer() {
        if (this.domPurify) {
            this.domPurify.setConfig({
                ALLOWED_TAGS: [
                    'b', 'i', 'em', 'strong', 'a', 'p', 'br', 'span', 'div',
                    'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                    'table', 'thead', 'tbody', 'tr', 'td', 'th', 'caption',
                    'blockquote', 'code', 'pre', 'mark', 'small', 'sub', 'sup'
                ],
                ALLOWED_ATTR: [
                    'href', 'target', 'rel', 'class', 'id', 'title', 'alt',
                    'width', 'height', 'style', 'data-*'
                ],
                ALLOWED_URI_REGEXP: /^(https?:|mailto:|tel:)/i,
                FORBID_TAGS: [
                    'script', 'style', 'iframe', 'object', 'embed', 'form',
                    'input', 'textarea', 'select', 'button', 'label'
                ],
                FORBID_ATTR: [
                    'onerror', 'onload', 'onclick', 'onmouseover', 'onfocus',
                    'onblur', 'onchange', 'onsubmit', 'onreset', 'onselect',
                    'onunload', 'onbeforeunload', 'onresize', 'onscroll'
                ]
            });
        }
    }

    /**
     * Establecer contenido HTML de forma segura
     * @param {Element} element - Elemento del DOM
     * @param {string} html - Contenido HTML a insertar
     * @param {boolean} allowHTML - Si permitir HTML o solo texto
     */
    setSafeContent(element, content, allowHTML = false) {
        if (!element) {
            console.error('❌ Elemento no válido para setSafeContent');
            return;
        }

        try {
            if (allowHTML && this.domPurify) {
                // Sanitizar HTML antes de insertar
                const sanitized = this.domPurify.sanitize(content);
                element.innerHTML = sanitized;
            } else {
                // Solo texto plano
                element.textContent = content;
            }
        } catch (error) {
            console.error('❌ Error en setSafeContent:', error);
            // Fallback a texto plano
            element.textContent = content;
        }
    }

    /**
     * Crear elementos HTML de forma segura
     * @param {string} html - HTML a crear
     * @returns {DocumentFragment} - Fragmento del DOM
     */
    createSafeElement(html) {
        if (!this.domPurify) {
            // Fallback: crear elemento temporal
            const temp = document.createElement('div');
            temp.textContent = html;
            return temp;
        }

        try {
            const sanitized = this.domPurify.sanitize(html);
            const template = document.createElement('template');
            template.innerHTML = sanitized;
            return template.content;
        } catch (error) {
            console.error('❌ Error creando elemento seguro:', error);
            const temp = document.createElement('div');
            temp.textContent = html;
            return temp;
        }
    }

    /**
     * Añadir contenido HTML de forma segura
     * @param {Element} element - Elemento contenedor
     * @param {string} html - HTML a añadir
     * @param {boolean} append - Si añadir al final o reemplazar
     */
    addSafeContent(element, html, append = true) {
        if (!element) return;

        try {
            const safeContent = this.createSafeElement(html);
            
            if (append) {
                element.appendChild(safeContent);
            } else {
                element.innerHTML = '';
                element.appendChild(safeContent);
            }
        } catch (error) {
            console.error('❌ Error añadiendo contenido seguro:', error);
            // Fallback a texto plano
            if (append) {
                element.appendChild(document.createTextNode(html));
            } else {
                element.textContent = html;
            }
        }
    }

    /**
     * Limpiar contenido de un elemento de forma segura
     * @param {Element} element - Elemento a limpiar
     */
    clearSafeContent(element) {
        if (element) {
            element.innerHTML = '';
        }
    }

    /**
     * Verificar si el contenido es seguro
     * @param {string} content - Contenido a verificar
     * @returns {boolean} - Si el contenido es seguro
     */
    isContentSafe(content) {
        if (!this.domPurify) return false;
        
        try {
            const sanitized = this.domPurify.sanitize(content);
            return sanitized === content;
        } catch (error) {
            return false;
        }
    }
}

// Instancia global
const safeDOM = new SafeDOMUtils();

// API pública para reemplazar innerHTML
window.safeInnerHTML = {
    set: (element, content, allowHTML = false) => safeDOM.setSafeContent(element, content, allowHTML),
    add: (element, content, append = true) => safeDOM.addSafeContent(element, content, append),
    clear: (element) => safeDOM.clearSafeContent(element),
    create: (html) => safeDOM.createSafeElement(html),
    isSafe: (content) => safeDOM.isContentSafe(content)
};

// Función de compatibilidad para reemplazar innerHTML directamente
window.setSafeInnerHTML = (element, content, allowHTML = false) => {
    safeDOM.setSafeContent(element, content, allowHTML);
};

// Log de carga
console.log('🛡️ Utilidades seguras de DOM cargadas');
console.log('📝 Reemplaza innerHTML por setSafeInnerHTML(element, content, allowHTML)');
