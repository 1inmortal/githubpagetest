#!/usr/bin/env node

/**
 * 📌 FIJAR VERSIONES SEGURAS DE DEPENDENCIAS
 * ===========================================
 * 
 * Este script fija versiones seguras de paquetes (pre-septiembre 2025)
 * para proteger contra ataques a la cadena de suministro.
 * 
 * Autor: Sistema de Gestión de Versiones Seguras
 * Versión: 1.0.0
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colores para la consola
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

const log = {
    info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
    success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
    warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
    error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
    section: (msg) => console.log(`\n${colors.cyan}🔍 ${msg}${colors.reset}`)
};

// Fecha de corte: pre-septiembre 2025
const CUTOFF_DATE = new Date('2025-09-01');

// Paquetes conocidos que fueron comprometidos después de septiembre 2025
const COMPROMISED_PACKAGES = [
    '@ctrl/tinycolor',
    'chalk',
    'debug',
    'ansi-styles'
];

class VersionPinner {
    constructor() {
        this.projectRoot = process.cwd();
        this.changes = [];
    }

    /**
     * Fijar versiones seguras en todos los package.json
     */
    async pinSecureVersions() {
        log.section('FIJANDO VERSIONES SEGURAS DE DEPENDENCIAS');
        console.log('='.repeat(60));

        const packageFiles = [
            path.join(this.projectRoot, 'package.json'),
            path.join(this.projectRoot, 'server', 'package.json')
        ];

        for (const packageFile of packageFiles) {
            if (!fs.existsSync(packageFile)) {
                continue;
            }

            await this.processPackageFile(packageFile);
        }

        this.generateSummary();
    }

    /**
     * Procesar un archivo package.json
     */
    async processPackageFile(packageFile) {
        log.info(`Procesando ${packageFile}...`);

        try {
            const packageData = JSON.parse(fs.readFileSync(packageFile, 'utf-8'));
            let modified = false;

            // Procesar dependencias
            if (packageData.dependencies) {
                modified = this.pinDependencies(packageData.dependencies, packageFile) || modified;
            }

            // Procesar devDependencies
            if (packageData.devDependencies) {
                modified = this.pinDependencies(packageData.devDependencies, packageFile) || modified;
            }

            // Guardar si hubo cambios
            if (modified) {
                fs.writeFileSync(
                    packageFile,
                    JSON.stringify(packageData, null, 2) + '\n',
                    'utf-8'
                );
                log.success(`Actualizado: ${packageFile}`);
            } else {
                log.info(`Sin cambios necesarios: ${packageFile}`);
            }
        } catch (error) {
            log.error(`Error procesando ${packageFile}: ${error.message}`);
        }
    }

    /**
     * Fijar versiones en un objeto de dependencias
     */
    pinDependencies(dependencies, packageFile) {
        let modified = false;

        for (const [pkgName, version] of Object.entries(dependencies)) {
            // Verificar si es un paquete comprometido
            const isCompromised = COMPROMISED_PACKAGES.some(compromised => 
                pkgName.includes(compromised) || compromised.includes(pkgName)
            );

            // Si tiene ^ o ~, fijar a versión exacta
            if (version.startsWith('^') || version.startsWith('~')) {
                const exactVersion = version.replace(/^[\^~]/, '');
                
                // Para paquetes comprometidos, usar versión anterior a septiembre 2025
                if (isCompromised) {
                    const safeVersion = this.getSafeVersionForCompromised(pkgName, exactVersion);
                    if (safeVersion && safeVersion !== version) {
                        dependencies[pkgName] = safeVersion;
                        this.changes.push({
                            package: pkgName,
                            old: version,
                            new: safeVersion,
                            reason: 'Paquete comprometido - usando versión pre-septiembre 2025',
                            file: packageFile
                        });
                        modified = true;
                    }
                } else {
                    // Para otros paquetes, simplemente fijar la versión
                    dependencies[pkgName] = exactVersion;
                    this.changes.push({
                        package: pkgName,
                        old: version,
                        new: exactVersion,
                        reason: 'Versión fijada para seguridad',
                        file: packageFile
                    });
                    modified = true;
                }
            }
        }

        return modified;
    }

    /**
     * Obtener versión segura para paquetes comprometidos
     */
    getSafeVersionForCompromised(packageName, currentVersion) {
        // Para paquetes comprometidos, intentar obtener versión anterior a septiembre 2025
        // Por ahora, simplemente fijar la versión actual sin ^ o ~
        // En producción, deberías verificar las fechas de publicación de cada versión
        
        // Versiones conocidas seguras (pre-septiembre 2025)
        const safeVersions = {
            '@ctrl/tinycolor': '3.4.0',
            'chalk': '4.1.2',
            'debug': '4.3.4',
            'ansi-styles': '4.3.0'
        };

        if (safeVersions[packageName]) {
            return safeVersions[packageName];
        }

        // Si no hay versión conocida, usar la versión actual sin ^ o ~
        return currentVersion;
    }

    /**
     * Generar resumen de cambios
     */
    generateSummary() {
        console.log('\n' + '='.repeat(60));
        console.log(`${colors.cyan}📊 RESUMEN DE CAMBIOS${colors.reset}`);
        console.log('='.repeat(60));

        if (this.changes.length === 0) {
            log.success('No se realizaron cambios. Todas las versiones ya están fijadas.');
        } else {
            log.info(`Se realizaron ${this.changes.length} cambios:`);
            console.log('');

            this.changes.forEach(change => {
                console.log(`  ${colors.yellow}${change.package}${colors.reset}`);
                console.log(`    ${change.old} → ${change.new}`);
                console.log(`    Razón: ${change.reason}`);
                console.log(`    Archivo: ${change.file}`);
                console.log('');
            });

            log.warning('IMPORTANTE: Ejecuta "npm install" para actualizar package-lock.json');
        }
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    const pinner = new VersionPinner();
    pinner.pinSecureVersions().catch(error => {
        log.error(`Error fijando versiones: ${error.message}`);
        process.exit(1);
    });
}

module.exports = VersionPinner;

