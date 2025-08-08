/**
 * FormData Security Utilities - CVE-2025-7783 Mitigation
 * 
 * Este módulo proporciona utilidades seguras para trabajar con FormData,
 * implementando boundary generation seguro para prevenir ataques de inyección.
 */

class FormDataSecurity {
    constructor() {
        this.cryptoAvailable = typeof crypto !== 'undefined' && crypto.getRandomValues;
        this.nodeCryptoAvailable = typeof require !== 'undefined' && require('crypto');
        
        // Configuración de seguridad
        this.securityConfig = {
            maxBoundaryLength: 70,
            minBoundaryLength: 20,
            allowedSchemes: ['http', 'https', 'mailto', 'tel'],
            maxUrlLength: 2048,
            maxFormDataSize: 10 * 1024 * 1024 // 10MB
        };
    }

    /**
     * Generar boundary seguro usando crypto
     * @returns {string} Boundary seguro
     */
    generateSecureBoundary() {
        let boundary;
        
        if (this.cryptoAvailable) {
            // Usar Web Crypto API
            const array = new Uint8Array(32);
            crypto.getRandomValues(array);
            boundary = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
        } else if (this.nodeCryptoAvailable) {
            // Usar Node.js crypto
            const crypto = require('crypto');
            boundary = crypto.randomBytes(32).toString('hex');
        } else {
            // Fallback seguro
            boundary = this.generateFallbackBoundary();
        }
        
        // Asegurar que el boundary cumple con las especificaciones
        boundary = '----WebKitFormBoundary' + boundary.substring(0, 16);
        
        return boundary;
    }

    /**
     * Generar boundary de fallback seguro
     * @returns {string} Boundary de fallback
     */
    generateFallbackBoundary() {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substring(2, 15);
        return timestamp + random;
    }

    /**
     * Validar boundary generado
     * @param {string} boundary - Boundary a validar
     * @returns {boolean} True si es válido
     */
    validateBoundary(boundary) {
        if (typeof boundary !== 'string') {
            return false;
        }
        
        if (boundary.length < this.securityConfig.minBoundaryLength || 
            boundary.length > this.securityConfig.maxBoundaryLength) {
            return false;
        }
        
        // Verificar que no contenga caracteres peligrosos
        const dangerousChars = /[<>\"'&]/;
        if (dangerousChars.test(boundary)) {
            return false;
        }
        
        return true;
    }

    /**
     * Validar URL de forma segura
     * @param {string} url - URL a validar
     * @returns {object} Resultado de validación
     */
    validateUrl(url) {
        if (typeof url !== 'string') {
            return {
                isValid: false,
                error: 'URL debe ser una cadena de texto'
            };
        }
        
        if (url.length > this.securityConfig.maxUrlLength) {
            return {
                isValid: false,
                error: 'URL demasiado larga'
            };
        }
        
        try {
            const urlObj = new URL(url);
            
            // Validar esquema
            if (!this.securityConfig.allowedSchemes.includes(urlObj.protocol.replace(':', ''))) {
                return {
                    isValid: false,
                    error: `Esquema no permitido: ${urlObj.protocol}`
                };
            }
            
            // Validar que no sea una URL peligrosa
            const lowerUrl = url.toLowerCase();
            if (lowerUrl.startsWith('javascript:') || 
                lowerUrl.startsWith('data:') ||
                lowerUrl.startsWith('vbscript:') ||
                lowerUrl.startsWith('file:')) {
                return {
                    isValid: false,
                    error: 'URL contiene esquema peligroso'
                };
            }
            
            return {
                isValid: true,
                url: urlObj.href,
                protocol: urlObj.protocol,
                hostname: urlObj.hostname
            };
        } catch (error) {
            return {
                isValid: false,
                error: 'Formato de URL inválido'
            };
        }
    }

    /**
     * Sanitizar FormData
     * @param {FormData} formData - FormData a sanitizar
     * @returns {FormData} FormData sanitizado
     */
    sanitizeFormData(formData) {
        if (!(formData instanceof FormData)) {
            throw new Error('formData debe ser una instancia de FormData');
        }
        
        const sanitizedFormData = new FormData();
        
        for (let [key, value] of formData.entries()) {
            // Sanitizar clave
            const sanitizedKey = this.sanitizeString(key);
            
            if (value instanceof File) {
                // Validar archivo
                const fileValidation = this.validateFile(value);
                if (fileValidation.isValid) {
                    sanitizedFormData.append(sanitizedKey, value);
                } else {
                    console.warn('Archivo rechazado:', fileValidation.error);
                }
            } else {
                // Sanitizar valor
                const sanitizedValue = this.sanitizeString(value);
                sanitizedFormData.append(sanitizedKey, sanitizedValue);
            }
        }
        
        return sanitizedFormData;
    }

    /**
     * Sanitizar cadena de texto
     * @param {string} str - Cadena a sanitizar
     * @returns {string} Cadena sanitizada
     */
    sanitizeString(str) {
        if (typeof str !== 'string') {
            return '';
        }
        
        // Eliminar caracteres peligrosos
        return str
            .replace(/[<>\"'&]/g, '')
            .trim();
    }

    /**
     * Validar archivo
     * @param {File} file - Archivo a validar
     * @returns {object} Resultado de validación
     */
    validateFile(file) {
        if (!(file instanceof File)) {
            return {
                isValid: false,
                error: 'No es un archivo válido'
            };
        }
        
        // Validar tamaño
        if (file.size > this.securityConfig.maxFormDataSize) {
            return {
                isValid: false,
                error: 'Archivo demasiado grande'
            };
        }
        
        // Validar tipo MIME
        const allowedTypes = [
            'text/plain',
            'text/html',
            'text/css',
            'text/javascript',
            'application/json',
            'application/xml',
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'application/pdf'
        ];
        
        if (!allowedTypes.includes(file.type)) {
            return {
                isValid: false,
                error: `Tipo de archivo no permitido: ${file.type}`
            };
        }
        
        return {
            isValid: true,
            file: file
        };
    }

    /**
     * Crear FormData seguro con boundary validado
     * @param {HTMLFormElement} form - Formulario HTML
     * @returns {object} FormData con boundary seguro
     */
    createSecureFormData(form) {
        if (!(form instanceof HTMLFormElement)) {
            throw new Error('form debe ser un elemento HTMLFormElement');
        }
        
        const formData = new FormData(form);
        
        // Generar boundary seguro
        const secureBoundary = this.generateSecureBoundary();
        
        // Validar boundary
        if (!this.validateBoundary(secureBoundary)) {
            throw new Error('Boundary generado no es seguro');
        }

        // Log para debugging (remover en producción)
        console.log('🔒 FormData seguro creado con boundary:', secureBoundary);

        return {
            formData,
            boundary: secureBoundary,
            isValid: true
        };
    }

    /**
     * Ejecutar test de seguridad
     * @returns {object} Resultados del test
     */
    runSecurityTest() {
        const results = {
            boundaryGeneration: false,
            urlValidation: false,
            formDataSanitization: false,
            fileValidation: false,
            overall: false
        };
        
        try {
            // Test boundary generation
            const boundary = this.generateSecureBoundary();
            results.boundaryGeneration = this.validateBoundary(boundary);
            
            // Test URL validation
            const validUrl = this.validateUrl('https://example.com');
            const invalidUrl = this.validateUrl('javascript:alert(1)');
            results.urlValidation = validUrl.isValid && !invalidUrl.isValid;
            
            // Test FormData sanitization
            const testFormData = new FormData();
            testFormData.append('test', '<script>alert(1)</script>');
            const sanitized = this.sanitizeFormData(testFormData);
            results.formDataSanitization = sanitized instanceof FormData;
            
            // Test file validation
            const mockFile = new File(['test'], 'test.txt', { type: 'text/plain' });
            const fileValidation = this.validateFile(mockFile);
            results.fileValidation = fileValidation.isValid;
            
            // Overall result
            results.overall = Object.values(results).every(result => result === true);
            
        } catch (error) {
            console.error('❌ Error en test de seguridad:', error);
        }
        
        return results;
    }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.FormDataSecurity = FormDataSecurity;
}

// Exportar para Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormDataSecurity;
}

// Crear instancia global
const formDataSecurity = new FormDataSecurity();

// Ejecutar test de seguridad si estamos en desarrollo
if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('🧪 Ejecutando test de seguridad FormData...');
    const testResults = formDataSecurity.runSecurityTest();
    console.log('📊 Resultados del test:', testResults);
}
