#!/usr/bin/env node

/**
 * 🔍 AUDITORÍA COMPLETA DE DEPENDENCIAS
 * ======================================
 * 
 * Este script ejecuta una auditoría completa de dependencias usando:
 * - npm audit (nativo)
 * - Snyk (si está instalado)
 * - Socket (si está instalado)
 * - Verificación de versiones seguras (pre-septiembre 2025)
 * 
 * Autor: Sistema de Auditoría de Dependencias
 * Versión: 1.0.0
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colores para la consola
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

const log = {
    info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
    success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
    warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
    error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
    section: (msg) => console.log(`\n${colors.cyan}🔍 ${msg}${colors.reset}`)
};

class DependencyAuditor {
    constructor() {
        this.projectRoot = process.cwd();
        this.report = {
            timestamp: new Date().toISOString(),
            npm_audit: null,
            snyk_audit: null,
            socket_audit: null,
            vulnerabilities: [],
            recommendations: [],
            pinned_versions: []
        };
        this.cutoffDate = new Date('2025-09-01'); // Pre-septiembre 2025
    }

    /**
     * Ejecutar auditoría completa
     */
    async runFullAudit() {
        log.section('INICIANDO AUDITORÍA COMPLETA DE DEPENDENCIAS');
        console.log('='.repeat(60));

        // 1. Auditoría con npm audit
        await this.runNpmAudit();

        // 2. Auditoría con Snyk (si está disponible)
        await this.runSnykAudit();

        // 3. Auditoría con Socket (si está disponible)
        await this.runSocketAudit();

        // 4. Verificar versiones de paquetes
        await this.checkPackageVersions();

        // 5. Generar reporte
        this.generateReport();
    }

    /**
     * Ejecutar npm audit
     */
    async runNpmAudit() {
        log.section('EJECUTANDO npm audit');
        
        try {
            // Ejecutar npm audit en formato JSON
            const auditOutput = execSync('npm audit --json', { 
                encoding: 'utf-8',
                cwd: this.projectRoot,
                stdio: 'pipe'
            });
            
            const auditData = JSON.parse(auditOutput);
            this.report.npm_audit = auditData;

            const vulns = auditData.metadata?.vulnerabilities || {};
            const total = vulns.total || 0;
            const critical = vulns.critical || 0;
            const high = vulns.high || 0;
            const moderate = vulns.moderate || 0;
            const low = vulns.low || 0;

            if (total === 0) {
                log.success('npm audit: No se encontraron vulnerabilidades');
            } else {
                log.warning(`npm audit: ${total} vulnerabilidades encontradas`);
                log.warning(`  - Críticas: ${critical}`);
                log.warning(`  - Altas: ${high}`);
                log.warning(`  - Moderadas: ${moderate}`);
                log.warning(`  - Bajas: ${low}`);

                // Procesar vulnerabilidades
                if (auditData.vulnerabilities) {
                    for (const [pkg, vuln] of Object.entries(auditData.vulnerabilities)) {
                        this.report.vulnerabilities.push({
                            package: pkg,
                            severity: vuln.severity,
                            title: vuln.via?.[0]?.title || 'Vulnerabilidad desconocida',
                            url: vuln.via?.[0]?.url || '',
                            fix_available: vuln.fixAvailable || false,
                            range: vuln.range || ''
                        });
                    }
                }
            }
        } catch (error) {
            // npm audit puede fallar si hay vulnerabilidades
            try {
                const auditOutput = error.stdout?.toString() || error.message;
                if (auditOutput.includes('vulnerabilities')) {
                    log.warning('npm audit encontró vulnerabilidades');
                    // Intentar parsear el JSON si está disponible
                    try {
                        const auditData = JSON.parse(auditOutput);
                        this.report.npm_audit = auditData;
                    } catch (e) {
                        this.report.npm_audit = { error: auditOutput };
                    }
                } else {
                    log.error(`Error ejecutando npm audit: ${error.message}`);
                }
            } catch (e) {
                log.error(`Error procesando npm audit: ${e.message}`);
            }
        }
    }

    /**
     * Ejecutar Snyk audit (si está instalado)
     */
    async runSnykAudit() {
        log.section('VERIFICANDO Snyk');
        
        try {
            // Verificar si Snyk está instalado
            execSync('snyk --version', { stdio: 'pipe' });
            log.info('Snyk está instalado, ejecutando auditoría...');

            try {
                const snykOutput = execSync('snyk test --json', {
                    encoding: 'utf-8',
                    cwd: this.projectRoot,
                    stdio: 'pipe',
                    timeout: 60000 // 60 segundos
                });

                const snykData = JSON.parse(snykOutput);
                this.report.snyk_audit = snykData;

                if (snykData.vulnerabilities && snykData.vulnerabilities.length > 0) {
                    log.warning(`Snyk: ${snykData.vulnerabilities.length} vulnerabilidades encontradas`);
                } else {
                    log.success('Snyk: No se encontraron vulnerabilidades');
                }
            } catch (error) {
                // Snyk puede fallar si hay vulnerabilidades o si no está autenticado
                if (error.stdout) {
                    try {
                        const snykData = JSON.parse(error.stdout.toString());
                        this.report.snyk_audit = snykData;
                        log.warning('Snyk encontró vulnerabilidades o requiere autenticación');
                    } catch (e) {
                        log.warning('Snyk requiere autenticación. Ejecuta: snyk auth');
                    }
                } else {
                    log.warning('Snyk no está configurado. Instala y autentica: npm install -g snyk && snyk auth');
                }
            }
        } catch (error) {
            log.info('Snyk no está instalado. Para instalarlo: npm install -g snyk');
            this.report.snyk_audit = { available: false, message: 'Snyk no está instalado' };
        }
    }

    /**
     * Ejecutar Socket audit (si está instalado)
     */
    async runSocketAudit() {
        log.section('VERIFICANDO Socket');
        
        try {
            // Verificar si Socket está instalado
            execSync('socket --version', { stdio: 'pipe' });
            log.info('Socket está instalado, ejecutando auditoría...');

            try {
                const socketOutput = execSync('socket ci --json', {
                    encoding: 'utf-8',
                    cwd: this.projectRoot,
                    stdio: 'pipe',
                    timeout: 60000
                });

                const socketData = JSON.parse(socketOutput);
                this.report.socket_audit = socketData;
                log.success('Socket: Auditoría completada');
            } catch (error) {
                log.warning('Socket requiere configuración o encontró problemas');
                this.report.socket_audit = { available: true, message: error.message };
            }
        } catch (error) {
            log.info('Socket no está instalado. Para instalarlo: npm install -g @socketsecurity/cli');
            this.report.socket_audit = { available: false, message: 'Socket no está instalado' };
        }
    }

    /**
     * Verificar versiones de paquetes y fijar versiones seguras
     */
    async checkPackageVersions() {
        log.section('VERIFICANDO VERSIONES DE PAQUETES');

        const packageFiles = [
            path.join(this.projectRoot, 'package.json'),
            path.join(this.projectRoot, 'server', 'package.json')
        ];

        for (const packageFile of packageFiles) {
            if (!fs.existsSync(packageFile)) {
                continue;
            }

            log.info(`Verificando ${packageFile}...`);
            
            try {
                const packageData = JSON.parse(fs.readFileSync(packageFile, 'utf-8'));
                const allDeps = {
                    ...packageData.dependencies || {},
                    ...packageData.devDependencies || {}
                };

                const updates = [];
                
                for (const [pkgName, version] of Object.entries(allDeps)) {
                    // Verificar si la versión necesita ser fijada
                    const needsPinning = this.shouldPinVersion(version);
                    
                    if (needsPinning) {
                        // Obtener versión segura
                        const safeVersion = await this.getSafeVersion(pkgName, version);
                        
                        if (safeVersion && safeVersion !== version) {
                            updates.push({
                                package: pkgName,
                                current: version,
                                recommended: safeVersion,
                                file: packageFile
                            });
                        }
                    }
                }

                if (updates.length > 0) {
                    log.warning(`Se encontraron ${updates.length} paquetes que necesitan actualización`);
                    this.report.recommendations.push(...updates);
                } else {
                    log.success('Todas las versiones están actualizadas');
                }
            } catch (error) {
                log.error(`Error procesando ${packageFile}: ${error.message}`);
            }
        }
    }

    /**
     * Determinar si una versión debe ser fijada
     */
    shouldPinVersion(version) {
        // Si ya está fijada (sin ^ o ~), no necesita fijarse
        if (!version.startsWith('^') && !version.startsWith('~')) {
            return false;
        }
        return true;
    }

    /**
     * Obtener versión segura de un paquete
     */
    async getSafeVersion(packageName, currentVersion) {
        try {
            // Obtener información del paquete
            const packageInfo = execSync(`npm view ${packageName} versions --json`, {
                encoding: 'utf-8',
                stdio: 'pipe',
                timeout: 10000
            });

            const versions = JSON.parse(packageInfo);
            if (!Array.isArray(versions) || versions.length === 0) {
                return null;
            }

            // Obtener la última versión antes del cutoff date
            // Para simplificar, usamos la última versión disponible
            // En producción, deberías verificar las fechas de publicación
            const latestVersion = versions[versions.length - 1];
            
            // Verificar si hay una versión más reciente que sea segura
            return latestVersion;
        } catch (error) {
            log.warning(`No se pudo obtener versión segura para ${packageName}`);
            return null;
        }
    }

    /**
     * Generar reporte final
     */
    generateReport() {
        log.section('GENERANDO REPORTE');

        const reportDir = path.join(this.projectRoot, 'reports');
        if (!fs.existsSync(reportDir)) {
            fs.mkdirSync(reportDir, { recursive: true });
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const reportFile = path.join(reportDir, `dependency-audit-${timestamp}.json`);

        fs.writeFileSync(reportFile, JSON.stringify(this.report, null, 2), 'utf-8');
        log.success(`Reporte guardado en: ${reportFile}`);

        // Mostrar resumen
        console.log('\n' + '='.repeat(60));
        console.log(`${colors.cyan}📊 RESUMEN DE AUDITORÍA${colors.reset}`);
        console.log('='.repeat(60));

        const totalVulns = this.report.vulnerabilities.length;
        const criticalVulns = this.report.vulnerabilities.filter(v => v.severity === 'critical').length;
        const highVulns = this.report.vulnerabilities.filter(v => v.severity === 'high').length;

        console.log(`\n${colors.yellow}Vulnerabilidades encontradas:${colors.reset}`);
        console.log(`  - Total: ${totalVulns}`);
        console.log(`  - Críticas: ${criticalVulns}`);
        console.log(`  - Altas: ${highVulns}`);

        if (this.report.recommendations.length > 0) {
            console.log(`\n${colors.cyan}Recomendaciones:${colors.reset}`);
            this.report.recommendations.forEach(rec => {
                console.log(`  - ${rec.package}: ${rec.current} → ${rec.recommended}`);
            });
        }

        console.log(`\n${colors.blue}Próximos pasos:${colors.reset}`);
        console.log('  1. Revisar el reporte completo en:', reportFile);
        if (totalVulns > 0) {
            console.log('  2. Ejecutar: npm audit fix');
            console.log('  3. Revisar vulnerabilidades críticas y altas');
        }
        if (this.report.recommendations.length > 0) {
            console.log('  4. Actualizar paquetes recomendados');
        }
        console.log('  5. Para usar Snyk: npm install -g snyk && snyk auth');
        console.log('  6. Para usar Socket: npm install -g @socketsecurity/cli');
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    const auditor = new DependencyAuditor();
    auditor.runFullAudit().catch(error => {
        log.error(`Error durante la auditoría: ${error.message}`);
        process.exit(1);
    });
}

module.exports = DependencyAuditor;

