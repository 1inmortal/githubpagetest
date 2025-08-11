#!/usr/bin/env node

/**
 * Auditoría de Seguridad del Repositorio
 * Verifica que todas las mejoras de seguridad estén implementadas correctamente
 */

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

/**
 * Clase principal de auditoría de seguridad
 */
class SecurityAuditor {
  constructor () {
    this.projectRoot = process.cwd();
    this.auditResults = {
      passed: [],
      warnings: [],
      errors: [],
      recommendations: []
    };
  }

  /**
     * Ejecutar auditoría completa
     */
  async runFullAudit () {
    log.section('INICIANDO AUDITORÍA DE SEGURIDAD COMPLETA');

    await this.checkDependencies();
    await this.checkContentSecurityPolicy();
    await this.checkXSSProtection();
    await this.checkAuthenticationSecurity();
    await this.checkEvalUsage();
    await this.checkEnvironmentVariables();
    await this.checkInlineScripts();

    this.generateReport();
  }

  /**
     * Verificar dependencias y package.json
     */
  async checkDependencies () {
    log.section('VERIFICANDO DEPENDENCIAS');

    const packagePath = path.join(this.projectRoot, 'config', 'package.json');

    if (fs.existsSync(packagePath)) {
      try {
        const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

        // Verificar jQuery
        if (packageData.dependencies && packageData.dependencies.jquery) {
          const jqueryVersion = packageData.dependencies.jquery;
          if (jqueryVersion.includes('^3.7.1') || jqueryVersion.includes('>=3.7.1')) {
            this.auditResults.passed.push('jQuery actualizado a versión 3.7.1+');
            log.success('jQuery actualizado a versión segura');
          } else {
            this.auditResults.warnings.push('jQuery puede necesitar actualización');
            log.warning(`jQuery versión: ${jqueryVersion}`);
          }
        }

        // Verificar dependencias de seguridad
        const securityDeps = ['helmet', 'dompurify', 'mathjs', 'sanitize-html'];
        securityDeps.forEach(dep => {
          if (packageData.dependencies && packageData.dependencies[dep]) {
            this.auditResults.passed.push(`Dependencia de seguridad ${dep} instalada`);
            log.success(`${dep} instalado`);
          } else {
            this.auditResults.warnings.push(`Dependencia de seguridad ${dep} no encontrada`);
            log.warning(`${dep} no encontrado`);
          }
        });

      } catch (error) {
        this.auditResults.errors.push(`Error leyendo package.json: ${error.message}`);
        log.error('Error leyendo package.json');
      }
    } else {
      this.auditResults.warnings.push('package.json no encontrado en config/');
      log.warning('package.json no encontrado');
    }
  }

  /**
     * Verificar Content Security Policy
     */
  async checkContentSecurityPolicy () {
    log.section('VERIFICANDO CONTENT SECURITY POLICY');

    const serverPath = path.join(this.projectRoot, 'src', 'components', 'evidencias', 'Proyecto x', 'server.js');

    if (fs.existsSync(serverPath)) {
      const serverContent = fs.readFileSync(serverPath, 'utf8');

      // Verificar que no hay unsafe-inline
      if (!serverContent.includes('\'unsafe-inline\'')) {
        this.auditResults.passed.push('CSP configurado sin unsafe-inline');
        log.success('CSP sin unsafe-inline');
      } else {
        this.auditResults.errors.push('CSP contiene unsafe-inline');
        log.error('CSP contiene unsafe-inline');
      }

      // Verificar que no hay unsafe-eval
      if (!serverContent.includes('\'unsafe-eval\'')) {
        this.auditResults.passed.push('CSP configurado sin unsafe-eval');
        log.success('CSP sin unsafe-eval');
      } else {
        this.auditResults.errors.push('CSP contiene unsafe-eval');
        log.error('CSP contiene unsafe-eval');
      }

      // Verificar headers de seguridad
      const securityHeaders = ['Strict-Transport-Security', 'Permissions-Policy', 'Cross-Origin-Opener-Policy'];
      securityHeaders.forEach(header => {
        if (serverContent.includes(header)) {
          this.auditResults.passed.push(`Header de seguridad ${header} configurado`);
          log.success(`${header} configurado`);
        } else {
          this.auditResults.warnings.push(`Header de seguridad ${header} no encontrado`);
          log.warning(`${header} no encontrado`);
        }
      });
    } else {
      this.auditResults.warnings.push('server.js no encontrado');
      log.warning('server.js no encontrado');
    }
  }

  /**
     * Verificar protección contra XSS
     */
  async checkXSSProtection () {
    log.section('VERIFICANDO PROTECCIÓN CONTRA XSS');

    // Verificar archivos de utilidades de seguridad
    const securityFiles = [
      'src/assets/js/security-utils.js',
      'src/assets/js/safe-dom-utils.js',
      'src/assets/js/localStorage-migration.js'
    ];

    securityFiles.forEach(filePath => {
      const fullPath = path.join(this.projectRoot, filePath);
      if (fs.existsSync(fullPath)) {
        this.auditResults.passed.push(`Archivo de seguridad ${filePath} existe`);
        log.success(`${filePath} existe`);
      } else {
        this.auditResults.errors.push(`Archivo de seguridad ${filePath} no encontrado`);
        log.error(`${filePath} no encontrado`);
      }
    });

    // Verificar uso de innerHTML en archivos críticos
    const criticalFiles = [
      'index.html',
      'src/assets/js/main.js',
      'src/components/Blog/Ceo.html'
    ];

    criticalFiles.forEach(filePath => {
      const fullPath = path.join(this.projectRoot, filePath);
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const innerHTMLMatches = content.match(/\.innerHTML\s*=/g);

        if (innerHTMLMatches) {
          this.auditResults.warnings.push(`${filePath} contiene ${innerHTMLMatches.length} usos de innerHTML`);
          log.warning(`${filePath}: ${innerHTMLMatches.length} usos de innerHTML`);
        } else {
          this.auditResults.passed.push(`${filePath} no contiene innerHTML`);
          log.success(`${filePath} sin innerHTML`);
        }
      }
    });
  }

  /**
     * Verificar seguridad de autenticación
     */
  async checkAuthenticationSecurity () {
    log.section('VERIFICANDO SEGURIDAD DE AUTENTICACIÓN');

    // Verificar migración de localStorage
    const migrationFile = path.join(this.projectRoot, 'src/assets/js/localStorage-migration.js');
    if (fs.existsSync(migrationFile)) {
      const content = fs.readFileSync(migrationFile, 'utf8');

      if (content.includes('LocalStorageMigrator') && content.includes('setCookie')) {
        this.auditResults.passed.push('Sistema de migración de localStorage implementado');
        log.success('Migración de localStorage implementada');
      } else {
        this.auditResults.warnings.push('Sistema de migración de localStorage incompleto');
        log.warning('Migración de localStorage incompleta');
      }
    }

    // Verificar configuración de cookies seguras
    const securityConfig = path.join(this.projectRoot, 'config/security-config.js');
    if (fs.existsSync(securityConfig)) {
      const content = fs.readFileSync(securityConfig, 'utf8');

      if (content.includes('httpOnly: true') && content.includes('secure: true')) {
        this.auditResults.passed.push('Configuración de cookies seguras implementada');
        log.success('Cookies seguras configuradas');
      } else {
        this.auditResults.warnings.push('Configuración de cookies seguras incompleta');
        log.warning('Cookies seguras incompletas');
      }
    }
  }

  /**
     * Verificar uso de eval
     */
  async checkEvalUsage () {
    log.section('VERIFICANDO USO DE EVAL');

    // Buscar en archivos críticos
    const criticalFiles = [
      'src/components/evidencias/presentacion/presentacion.html'
    ];

    criticalFiles.forEach(filePath => {
      const fullPath = path.join(this.projectRoot, filePath);
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');

        if (content.includes('eval(')) {
          this.auditResults.errors.push(`${filePath} contiene eval()`);
          log.error(`${filePath} contiene eval()`);
        } else {
          this.auditResults.passed.push(`${filePath} no contiene eval()`);
          log.success(`${filePath} sin eval()`);
        }
      }
    });
  }

  /**
     * Verificar variables de entorno
     */
  async checkEnvironmentVariables () {
    log.section('VERIFICANDO VARIABLES DE ENTORNO');

    // Verificar .gitignore
    const gitignorePath = path.join(this.projectRoot, '.gitignore');
    if (fs.existsSync(gitignorePath)) {
      const content = fs.readFileSync(gitignorePath, 'utf8');

      if (content.includes('.env') && content.includes('*.key')) {
        this.auditResults.passed.push('.gitignore protege archivos sensibles');
        log.success('.gitignore protege archivos sensibles');
      } else {
        this.auditResults.warnings.push('.gitignore puede no proteger todos los archivos sensibles');
        log.warning('.gitignore incompleto');
      }
    }

    // Verificar archivo de ejemplo
    const envExamplePath = path.join(this.projectRoot, 'config/env.example');
    if (fs.existsSync(envExamplePath)) {
      this.auditResults.passed.push('Archivo de ejemplo de variables de entorno existe');
      log.success('env.example existe');
    } else {
      this.auditResults.warnings.push('Archivo de ejemplo de variables de entorno no encontrado');
      log.warning('env.example no encontrado');
    }
  }

  /**
     * Verificar scripts inline
     */
  async checkInlineScripts () {
    log.section('VERIFICANDO SCRIPTS INLINE');

    // Verificar index.html
    const indexPath = path.join(this.projectRoot, 'index.html');
    if (fs.existsSync(indexPath)) {
      const content = fs.readFileSync(indexPath, 'utf8');

      // Verificar que se incluyen las librerías de seguridad
      if (content.includes('dompurify') && content.includes('mathjs')) {
        this.auditResults.passed.push('Librerías de seguridad incluidas en index.html');
        log.success('Librerías de seguridad incluidas');
      } else {
        this.auditResults.warnings.push('Librerías de seguridad no encontradas en index.html');
        log.warning('Librerías de seguridad no encontradas');
      }

      // Verificar scripts de seguridad
      if (content.includes('security-utils.js') && content.includes('safe-dom-utils.js')) {
        this.auditResults.passed.push('Scripts de seguridad incluidos en index.html');
        log.success('Scripts de seguridad incluidos');
      } else {
        this.auditResults.warnings.push('Scripts de seguridad no encontrados en index.html');
        log.warning('Scripts de seguridad no encontrados');
      }
    }
  }

  /**
     * Generar reporte final
     */
  generateReport () {
    log.section('REPORTE FINAL DE AUDITORÍA');

    console.log(`\n${colors.cyan}📊 RESUMEN DE RESULTADOS:${colors.reset}`);
    console.log(`✅ Pasaron: ${this.auditResults.passed.length}`);
    console.log(`⚠️  Advertencias: ${this.auditResults.warnings.length}`);
    console.log(`❌ Errores: ${this.auditResults.errors.length}`);

    if (this.auditResults.passed.length > 0) {
      console.log(`\n${colors.green}✅ VERIFICACIONES EXITOSAS:${colors.reset}`);
      this.auditResults.passed.forEach(item => console.log(`  • ${item}`));
    }

    if (this.auditResults.warnings.length > 0) {
      console.log(`\n${colors.yellow}⚠️  ADVERTENCIAS:${colors.reset}`);
      this.auditResults.warnings.forEach(item => console.log(`  • ${item}`));
    }

    if (this.auditResults.errors.length > 0) {
      console.log(`\n${colors.red}❌ ERRORES CRÍTICOS:${colors.reset}`);
      this.auditResults.errors.forEach(item => console.log(`  • ${item}`));
    }

    // Calcular puntuación
    const totalChecks = this.auditResults.passed.length + this.auditResults.warnings.length + this.auditResults.errors.length;
    const score = totalChecks > 0 ? Math.round((this.auditResults.passed.length / totalChecks) * 100) : 0;

    console.log(`\n${colors.cyan}🎯 PUNTUACIÓN DE SEGURIDAD: ${score}%${colors.reset}`);

    if (score >= 90) {
      console.log(`${colors.green}🎉 ¡Excelente! El proyecto cumple con altos estándares de seguridad.${colors.reset}`);
    } else if (score >= 70) {
      console.log(`${colors.yellow}👍 Bueno. Hay algunas áreas que pueden mejorarse.${colors.reset}`);
    } else {
      console.log(`${colors.red}🚨 Atención. Se requieren mejoras significativas de seguridad.${colors.reset}`);
    }

    // Recomendaciones
    if (this.auditResults.errors.length > 0 || this.auditResults.warnings.length > 0) {
      console.log(`\n${colors.cyan}💡 RECOMENDACIONES:${colors.reset}`);
      console.log('  1. Revisar y corregir todos los errores críticos');
      console.log('  2. Implementar las advertencias pendientes');
      console.log('  3. Ejecutar npm audit fix para dependencias');
      console.log('  4. Verificar que todos los scripts inline usen nonces');
      console.log('  5. Completar la migración de localStorage a cookies');
    }
  }
}

// Ejecutar auditoría si se llama directamente
if (require.main === module) {
  const auditor = new SecurityAuditor();
  auditor.runFullAudit().catch(error => {
    log.error(`Error durante la auditoría: ${error.message}`);
    process.exit(1);
  });
}

module.exports = SecurityAuditor;
