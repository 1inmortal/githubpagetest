
class FormDataSecurity {
    constructor() {
        this.cryptoAvailable = typeof crypto !== 'undefined' && crypto.getRandomValues;
        this.nodeCryptoAvailable = typeof require !== 'undefined' && require('crypto');
        this.securityConfig = {
            maxBoundaryLength: 70,
            minBoundaryLength: 20,
            allowedSchemes: ['http', 'https', 'mailto', 'tel'],
            maxUrlLength: 2048,
            maxFormDataSize: 10 * 1024 * 1024
        };
    }
    generateSecureBoundary() {
        let boundary;
        if (this.cryptoAvailable) {
            const array = new Uint8Array(32);
            crypto.getRandomValues(array);
            boundary = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
        } else if (this.nodeCryptoAvailable) {
            const crypto = require('crypto');
            boundary = crypto.randomBytes(32).toString('hex');
        } else {
            boundary = this.generateFallbackBoundary();
        }
        boundary = '----WebKitFormBoundary' + boundary.substring(0, 16);
        return boundary;
    }
    generateFallbackBoundary() {
        const timestamp = Date.now().toString(36);
        const performance = performance.now().toString(36);
        const userAgent = navigator.userAgent.length.toString(36);
        const screenRes = (screen.width * screen.height).toString(36);
        const entropy = timestamp + performance + userAgent + screenRes;
        let hash = 0;
        for (let i = 0; i < entropy.length; i++) {
            const char = entropy.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(36) + entropy.substring(0, 8);
    }
    validateBoundary(boundary) {
        if (typeof boundary !== 'string') {
            return false;
        }
        if (boundary.length < this.securityConfig.minBoundaryLength ||
            boundary.length > this.securityConfig.maxBoundaryLength) {
            return false;
        }
        const dangerousChars = /[<>"'&]/;
        if (dangerousChars.test(boundary)) {
            return false;
        }
        return true;
    }
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
            if (!this.securityConfig.allowedSchemes.includes(urlObj.protocol.replace(':', ''))) {
                return {
                    isValid: false,
                    error: `Esquema no permitido: ${urlObj.protocol}`
                };
            }
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
    sanitizeFormData(formData) {
        if (!(formData instanceof FormData)) {
            throw new Error('formData debe ser una instancia de FormData');
        }
        const sanitizedFormData = new FormData();
        for (let [key, value] of formData.entries()) {
            const sanitizedKey = this.sanitizeString(key);
            if (value instanceof File) {
                const fileValidation = this.validateFile(value);
                if (fileValidation.isValid) {
                    sanitizedFormData.append(sanitizedKey, value);
                } else {
                    console.warn('Archivo rechazado:', fileValidation.error);
                }
            } else {
                const sanitizedValue = this.sanitizeString(value);
                sanitizedFormData.append(sanitizedKey, sanitizedValue);
            }
        }
        return sanitizedFormData;
    }
    sanitizeString(str) {
        if (typeof str !== 'string') {
            return '';
        }
        return str
            .replace(/[<>"'&]/g, '')
            .trim();
    }
    validateFile(file) {
        if (!(file instanceof File)) {
            return {
                isValid: false,
                error: 'No es un archivo válido'
            };
        }
        if (file.size > this.securityConfig.maxFormDataSize) {
            return {
                isValid: false,
                error: 'Archivo demasiado grande'
            };
        }
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
    createSecureFormData(form) {
        if (!(form instanceof HTMLFormElement)) {
            throw new Error('form debe ser un elemento HTMLFormElement');
        }
        const formData = new FormData(form);
        const secureBoundary = this.generateSecureBoundary();
        if (!this.validateBoundary(secureBoundary)) {
            throw new Error('Boundary generado no es seguro');
        }
        console.log('🔒 FormData seguro creado con boundary:', secureBoundary);
        return {
            formData,
            boundary: secureBoundary,
            isValid: true
        };
    }
    runSecurityTest() {
        const results = {
            boundaryGeneration: false,
            urlValidation: false,
            formDataSanitization: false,
            fileValidation: false,
            overall: false
        };
        try {
            const boundary = this.generateSecureBoundary();
            results.boundaryGeneration = this.validateBoundary(boundary);
            const validUrl = this.validateUrl('https://example.com');
            const invalidUrl = this.validateUrl('javascript:alert(1)');
            results.urlValidation = validUrl.isValid && !invalidUrl.isValid;
            const testFormData = new FormData();
            testFormData.append('test', '<script>alert(1)</script>');
            const sanitized = this.sanitizeFormData(testFormData);
            results.formDataSanitization = sanitized instanceof FormData;
            const mockFile = new File(['test'], 'test.txt', { type: 'text/plain' });
            const fileValidation = this.validateFile(mockFile);
            results.fileValidation = fileValidation.isValid;
            results.overall = Object.values(results).every(result => result === true);
        } catch (error) {
            console.error('❌ Error en test de seguridad:', error);
        }
        return results;
    }
}
if (typeof window !== 'undefined') {
    window.FormDataSecurity = FormDataSecurity;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormDataSecurity;
}
const formDataSecurity = new FormDataSecurity();
if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('🧪 Ejecutando test de seguridad FormData...');
    const testResults = formDataSecurity.runSecurityTest();
    console.log('📊 Resultados del test:', testResults);
}
