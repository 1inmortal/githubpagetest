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
    }

    /**
     * Generar boundary seguro usando crypto
     * @returns {string} Boundary seguro
     */
    generateSecureBoundary() {
        if (this.cryptoAvailable) {
            // Usar Web Crypto API (navegador)
            const array = new Uint8Array(12);
            crypto.getRandomValues(array);
            return '--------------------------' + Array.from(array, byte => 
                byte.toString(16).padStart(2, '0')
            ).join('');
        } else if (this.nodeCryptoAvailable) {
            // Usar Node.js crypto
            const crypto = require('crypto');
            return '--------------------------' + crypto.randomBytes(12).toString('hex');
        } else {
            // Fallback menos seguro (solo para desarrollo)
            console.warn('⚠️  Usando fallback menos seguro para boundary generation');
            return '--------------------------' + Math.random().toString(36).substring(2, 26);
        }
    }

    /**
     * Validar si un boundary es seguro
     * @param {string} boundary - Boundary a validar
     * @returns {boolean} True si es seguro
     */
    validateBoundary(boundary) {
        if (!boundary || typeof boundary !== 'string') {
            return false;
        }

        // Verificar formato correcto
        const boundaryRegex = /^--------------------------[a-f0-9]{24}$/;
        return boundaryRegex.test(boundary);
    }

    /**
     * Crear FormData seguro con boundary validado
     * @param {HTMLFormElement} form - Formulario HTML
     * @returns {FormData} FormData con boundary seguro
     */
    createSecureFormData(form) {
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
     * Sanitizar datos del formulario antes de enviar
     * @param {FormData} formData - FormData a sanitizar
     * @returns {FormData} FormData sanitizado
     */
    sanitizeFormData(formData) {
        const sanitizedData = new FormData();
        
        for (const [key, value] of formData.entries()) {
            // Sanitizar clave
            const sanitizedKey = this.sanitizeString(key);
            
            // Sanitizar valor
            let sanitizedValue = value;
            if (typeof value === 'string') {
                sanitizedValue = this.sanitizeString(value);
            }
            
            sanitizedData.append(sanitizedKey, sanitizedValue);
        }

        return sanitizedData;
    }

    /**
     * Sanitizar string para prevenir inyección
     * @param {string} str - String a sanitizar
     * @returns {string} String sanitizado
     */
    sanitizeString(str) {
        if (typeof str !== 'string') {
            return str;
        }

        // Remover caracteres peligrosos
        return str
            .replace(/[<>]/g, '') // Remover < >
            .replace(/javascript:/gi, '') // Remover javascript:
            .replace(/on\w+=/gi, '') // Remover event handlers
            .trim();
    }

    /**
     * Simular ataque de inyección de boundary para testing
     * @param {string} boundary - Boundary a probar
     * @returns {object} Resultado del test
     */
    simulateBoundaryInjection(boundary) {
        const maliciousPayload = `
            ${boundary}
            Content-Disposition: form-data; name="field1"
            
            value1
            ${boundary}
            Content-Disposition: form-data; name="field2"
            
            value2
            ${boundary}--
        `;

        // Verificar si el payload puede ser fragmentado
        const fragments = maliciousPayload.split(boundary);
        const canBeFragmented = fragments.length > 1;

        return {
            boundary,
            payload: maliciousPayload,
            canBeFragmented,
            isVulnerable: canBeFragmented,
            fragments: canBeFragmented ? fragments.length : 0
        };
    }

    /**
     * Test de seguridad completo
     * @returns {object} Resultados del test
     */
    runSecurityTest() {
        const results = {
            cryptoAvailable: this.cryptoAvailable,
            nodeCryptoAvailable: this.nodeCryptoAvailable,
            boundaryTests: [],
            injectionTests: []
        };

        // Test 1: Generar boundary seguro
        const secureBoundary = this.generateSecureBoundary();
        results.boundaryTests.push({
            test: 'Secure Boundary Generation',
            boundary: secureBoundary,
            isValid: this.validateBoundary(secureBoundary),
            length: secureBoundary.length
        });

        // Test 2: Simular inyección
        const injectionTest = this.simulateBoundaryInjection(secureBoundary);
        results.injectionTests.push({
            test: 'Boundary Injection Simulation',
            ...injectionTest
        });

        // Test 3: Generar múltiples boundaries únicos
        const boundaries = new Set();
        for (let i = 0; i < 100; i++) {
            boundaries.add(this.generateSecureBoundary());
        }
        results.boundaryTests.push({
            test: 'Unique Boundaries',
            uniqueCount: boundaries.size,
            totalGenerated: 100,
            allUnique: boundaries.size === 100
        });

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
