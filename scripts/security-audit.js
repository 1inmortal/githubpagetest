#!/usr/bin/env node

/**
 * Auditoría de Seguridad Automatizada
 * Script para detectar y reportar vulnerabilidades de seguridad
 * Basado en las mejores prácticas de OWASP y CodeQL
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class SecurityAuditor {
    constructor() {
        this.vulnerabilities = [];
        this.securityScore = 100;
        this.config = this.loadSecurityConfig();
    }

    /**
     * Cargar configuración de seguridad
     */
    loadSecurityConfig() {
        try {
            const configPath = path.join(__dirname, '../config/security-config.json');
            return JSON.parse(fs.readFileSync(configPath, 'utf8'));
        } catch (error) {
            console.warn('⚠️ No se pudo cargar security-config.json, usando configuración por defecto');
            return {
                security: {
                    sanitization: {
                        maxInputLength: 1000,
                        allowedSchemes: ['http', 'https', 'mailto', 'tel']
                    }
                }
            };
        }
    }

    /**
     * Escanear archivos JavaScript en busca de vulnerabilidades
     */
    async scanJavaScriptFiles() {
        console.log('🔍 Escaneando archivos JavaScript...');
        
        const jsFiles = this.findFiles('../src', '.js');
        
        for (const file of jsFiles) {
            await this.auditJavaScriptFile(file);
        }
    }

    /**
     * Escanear archivos HTML en busca de vulnerabilidades
     */
    async scanHTMLFiles() {
        console.log('🔍 Escaneando archivos HTML...');
        
        const htmlFiles = this.findFiles('../src', '.html');
        
        for (const file of htmlFiles) {
            await this.auditHTMLFile(file);
        }
    }

    /**
     * Encontrar archivos recursivamente
     */
    findFiles(dir, extension) {
        const files = [];
        
        function scanDirectory(currentDir) {
            try {
                const items = fs.readdirSync(currentDir);
                
                for (const item of items) {
                    const fullPath = path.join(currentDir, item);
                    const stat = fs.statSync(fullPath);
                    
                    if (stat.isDirectory()) {
                        scanDirectory(fullPath);
                    } else if (item.endsWith(extension)) {
                        files.push(fullPath);
                    }
                }
            } catch (error) {
                console.warn(`⚠️ No se pudo escanear directorio: ${currentDir}`);
            }
        }
        
        scanDirectory(path.join(__dirname, dir));
        return files;
    }

    /**
     * Auditar archivo JavaScript
     */
    async auditJavaScriptFile(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const relativePath = path.relative(path.join(__dirname, '..'), filePath);
            
            // Detectar vulnerabilidades comunes
            this.detectXSSVulnerabilities(content, relativePath);
            this.detectSQLInjectionVulnerabilities(content, relativePath);
            this.detectInsecureRegex(content, relativePath);
            this.detectHardcodedSecrets(content, relativePath);
            this.detectInsecureCrypto(content, relativePath);
            
        } catch (error) {
            console.error(`❌ Error auditando archivo: ${filePath}`, error.message);
        }
    }

    /**
     * Auditar archivo HTML
     */
    async auditHTMLFile(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const relativePath = path.relative(path.join(__dirname, '..'), filePath);
            
            // Detectar vulnerabilidades en HTML
            this.detectXSSInHTML(content, relativePath);
            this.detectInsecureAttributes(content, relativePath);
            this.detectInlineScripts(content, relativePath);
            
        } catch (error) {
            console.error(`❌ Error auditando archivo HTML: ${filePath}`, error.message);
        }
    }

    /**
     * Detectar vulnerabilidades XSS
     */
    detectXSSVulnerabilities(content, filePath) {
        const xssPatterns = [
            /\.innerHTML\s*=\s*[^;]+/g,
            /\.outerHTML\s*=\s*[^;]+/g,
            /document\.write\s*\(/g,
            /eval\s*\(/g,
            /Function\s*\(/g
        ];
        
        xssPatterns.forEach((pattern, index) => {
            const matches = content.match(pattern);
            if (matches) {
                this.addVulnerability({
                    type: 'XSS',
                    severity: 'HIGH',
                    file: filePath,
                    line: this.findLineNumber(content, pattern),
                    description: 'Posible vulnerabilidad XSS detectada',
                    recommendation: 'Usar textContent en lugar de innerHTML, o sanitizar la entrada'
                });
            }
        });
    }

    /**
     * Detectar vulnerabilidades de inyección SQL
     */
    detectSQLInjectionVulnerabilities(content, filePath) {
        const sqlPatterns = [
            /SELECT.*FROM.*WHERE.*\+/g,
            /INSERT.*VALUES.*\+/g,
            /UPDATE.*SET.*\+/g,
            /DELETE.*WHERE.*\+/g
        ];
        
        sqlPatterns.forEach(pattern => {
            const matches = content.match(pattern);
            if (matches) {
                this.addVulnerability({
                    type: 'SQL_INJECTION',
                    severity: 'HIGH',
                    file: filePath,
                    line: this.findLineNumber(content, pattern),
                    description: 'Posible vulnerabilidad de inyección SQL',
                    recommendation: 'Usar parámetros preparados o consultas parametrizadas'
                });
            }
        });
    }

    /**
     * Detectar expresiones regulares inseguras
     */
    detectInsecureRegex(content, filePath) {
        const insecureRegexPatterns = [
            /\.replace\s*\(\s*['"`][^'"`]*['"`]\s*,\s*['"`][^'"`]*['"`]\s*\)/g,
            /new RegExp\s*\([^)]*\)/g
        ];
        
        insecureRegexPatterns.forEach(pattern => {
            const matches = content.match(pattern);
            if (matches) {
                this.addVulnerability({
                    type: 'INSECURE_REGEX',
                    severity: 'MEDIUM',
                    file: filePath,
                    line: this.findLineNumber(content, pattern),
                    description: 'Expresión regular potencialmente insegura',
                    recommendation: 'Validar y sanitizar las entradas antes de usar en regex'
                });
            }
        });
    }

    /**
     * Detectar secretos hardcodeados
     */
    detectHardcodedSecrets(content, filePath) {
        const secretPatterns = [
            /api[_-]?key\s*[:=]\s*['"`][^'"`]+['"`]/gi,
            /password\s*[:=]\s*['"`][^'"`]+['"`]/gi,
            /secret\s*[:=]\s*['"`][^'"`]+['"`]/gi,
            /token\s*[:=]\s*['"`][^'"`]+['"`]/gi
        ];
        
        secretPatterns.forEach(pattern => {
            const matches = content.match(pattern);
            if (matches) {
                this.addVulnerability({
                    type: 'HARDCODED_SECRET',
                    severity: 'HIGH',
                    file: filePath,
                    line: this.findLineNumber(content, pattern),
                    description: 'Secreto hardcodeado detectado',
                    recommendation: 'Usar variables de entorno para secretos'
                });
            }
        });
    }

    /**
     * Detectar criptografía insegura
     */
    detectInsecureCrypto(content, filePath) {
        const insecureCryptoPatterns = [
            /Math\.random\s*\(/g,
            /Date\.now\s*\(/g,
            /new Date\s*\(/g
        ];
        
        insecureCryptoPatterns.forEach(pattern => {
            const matches = content.match(pattern);
            if (matches) {
                this.addVulnerability({
                    type: 'INSECURE_CRYPTO',
                    severity: 'MEDIUM',
                    file: filePath,
                    line: this.findLineNumber(content, pattern),
                    description: 'Uso de criptografía insegura',
                    recommendation: 'Usar crypto.getRandomValues() para valores aleatorios seguros'
                });
            }
        });
    }

    /**
     * Detectar XSS en HTML
     */
    detectXSSInHTML(content, filePath) {
        const xssHTMLPatterns = [
            /<script[^>]*>/gi,
            /javascript:/gi,
            /on\w+\s*=/gi,
            /data:text\/html/gi
        ];
        
        xssHTMLPatterns.forEach(pattern => {
            const matches = content.match(pattern);
            if (matches) {
                this.addVulnerability({
                    type: 'XSS_HTML',
                    severity: 'HIGH',
                    file: filePath,
                    line: this.findLineNumber(content, pattern),
                    description: 'Posible XSS en HTML',
                    recommendation: 'Sanitizar contenido HTML antes de insertarlo'
                });
            }
        });
    }

    /**
     * Detectar atributos inseguros en HTML
     */
    detectInsecureAttributes(content, filePath) {
        const insecureAttrPatterns = [
            /on\w+\s*=\s*["'][^"']*["']/gi,
            /javascript:\s*["'][^"']*["']/gi
        ];
        
        insecureAttrPatterns.forEach(pattern => {
            const matches = content.match(pattern);
            if (matches) {
                this.addVulnerability({
                    type: 'INSECURE_ATTRIBUTES',
                    severity: 'HIGH',
                    file: filePath,
                    line: this.findLineNumber(content, pattern),
                    description: 'Atributos inseguros detectados',
                    recommendation: 'Eliminar eventos inline y javascript: URLs'
                });
            }
        });
    }

    /**
     * Detectar scripts inline
     */
    detectInlineScripts(content, filePath) {
        const inlineScriptPattern = /<script[^>]*>[\s\S]*?<\/script>/gi;
        const matches = content.match(inlineScriptPattern);
        
        if (matches) {
            this.addVulnerability({
                type: 'INLINE_SCRIPTS',
                severity: 'MEDIUM',
                file: filePath,
                line: this.findLineNumber(content, inlineScriptPattern),
                description: 'Scripts inline detectados',
                recommendation: 'Mover scripts a archivos externos y usar CSP'
            });
        }
    }

    /**
     * Encontrar número de línea aproximado
     */
    findLineNumber(content, pattern) {
        const match = content.match(pattern);
        if (match) {
            const beforeMatch = content.substring(0, match.index);
            return beforeMatch.split('\n').length;
        }
        return 'N/A';
    }

    /**
     * Agregar vulnerabilidad a la lista
     */
    addVulnerability(vulnerability) {
        this.vulnerabilities.push({
            ...vulnerability,
            id: crypto.randomBytes(8).toString('hex'),
            timestamp: new Date().toISOString()
        });
        
        // Reducir puntuación de seguridad
        const severityScores = { 'LOW': 5, 'MEDIUM': 10, 'HIGH': 20 };
        this.securityScore -= severityScores[vulnerability.severity] || 5;
    }

    /**
     * Generar reporte de seguridad
     */
    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            securityScore: Math.max(0, this.securityScore),
            totalVulnerabilities: this.vulnerabilities.length,
            vulnerabilities: this.vulnerabilities,
            summary: {
                critical: this.vulnerabilities.filter(v => v.severity === 'HIGH').length,
                medium: this.vulnerabilities.filter(v => v.severity === 'MEDIUM').length,
                low: this.vulnerabilities.filter(v => v.severity === 'LOW').length
            },
            recommendations: this.generateRecommendations()
        };
        
        return report;
    }

    /**
     * Generar recomendaciones generales
     */
    generateRecommendations() {
        const recommendations = [];
        
        if (this.vulnerabilities.some(v => v.type === 'XSS')) {
            recommendations.push('Implementar sanitización HTML robusta usando sanitize-html');
        }
        
        if (this.vulnerabilities.some(v => v.type === 'SQL_INJECTION')) {
            recommendations.push('Usar parámetros preparados para todas las consultas SQL');
        }
        
        if (this.vulnerabilities.some(v => v.type === 'HARDCODED_SECRET')) {
            recommendations.push('Mover todos los secretos a variables de entorno');
        }
        
        if (this.vulnerabilities.some(v => v.type === 'INSECURE_CRYPTO')) {
            recommendations.push('Usar crypto.getRandomValues() para valores aleatorios seguros');
        }
        
        if (this.vulnerabilities.some(v => v.type === 'INLINE_SCRIPTS')) {
            recommendations.push('Implementar Content Security Policy (CSP)');
        }
        
        return recommendations;
    }

    /**
     * Ejecutar auditoría completa
     */
    async runAudit() {
        console.log('🚀 Iniciando auditoría de seguridad...\n');
        
        await this.scanJavaScriptFiles();
        await this.scanHTMLFiles();
        
        const report = this.generateReport();
        
        console.log('\n📊 REPORTE DE AUDITORÍA DE SEGURIDAD');
        console.log('=====================================');
        console.log(`Puntuación de seguridad: ${report.securityScore}/100`);
        console.log(`Total de vulnerabilidades: ${report.totalVulnerabilities}`);
        console.log(`Críticas: ${report.summary.critical}`);
        console.log(`Medias: ${report.summary.medium}`);
        console.log(`Bajas: ${report.summary.low}`);
        
        if (report.vulnerabilities.length > 0) {
            console.log('\n🔍 VULNERABILIDADES DETECTADAS:');
            report.vulnerabilities.forEach(vuln => {
                console.log(`\n[${vuln.severity}] ${vuln.type}`);
                console.log(`Archivo: ${vuln.file}`);
                console.log(`Línea: ${vuln.line}`);
                console.log(`Descripción: ${vuln.description}`);
                console.log(`Recomendación: ${vuln.recommendation}`);
            });
        }
        
        if (report.recommendations.length > 0) {
            console.log('\n💡 RECOMENDACIONES GENERALES:');
            report.recommendations.forEach(rec => {
                console.log(`• ${rec}`);
            });
        }
        
        // Guardar reporte en archivo
        const reportPath = path.join(__dirname, '../security-audit-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        console.log(`\n📄 Reporte guardado en: ${reportPath}`);
        
        return report;
    }
}

// Ejecutar auditoría si se llama directamente
if (require.main === module) {
    const auditor = new SecurityAuditor();
    auditor.runAudit().catch(console.error);
}

module.exports = SecurityAuditor;
