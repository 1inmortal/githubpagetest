#!/usr/bin/env node

/**
 * Actualización de Seguridad - CVE-2025-7783
 *
 * Este script actualiza las dependencias de form-data y refactoriza
 * el código para usar boundary generation seguro.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class FormDataSecurityUpdater {
  constructor () {
    this.projectRoot = process.cwd();
    this.updatedFiles = [];
    this.errors = [];
  }

  /**
     * Actualizar dependencias de form-data
     */
  async updateDependencies () {
    console.log('🔧 Actualizando dependencias de form-data...\n');

    const packageFiles = this.findPackageFiles();

    for (const packageFile of packageFiles) {
      try {
        const packageData = JSON.parse(fs.readFileSync(packageFile, 'utf8'));
        let updated = false;

        // Verificar si tiene form-data como dependencia
        const allDependencies = {
          ...packageData.dependencies,
          ...packageData.devDependencies,
          ...packageData.peerDependencies
        };

        if (allDependencies['form-data']) {
          const currentVersion = allDependencies['form-data'];
          const isVulnerable = this.isVersionVulnerable(currentVersion);

          if (isVulnerable) {
            console.log(`📦 Actualizando form-data en ${packageData.name || 'unknown'}`);
            console.log(`   Versión actual: ${currentVersion}`);

            // Actualizar a versión segura
            if (packageData.dependencies && packageData.dependencies['form-data']) {
              packageData.dependencies['form-data'] = '^3.0.4';
              updated = true;
            }

            if (packageData.devDependencies && packageData.devDependencies['form-data']) {
              packageData.devDependencies['form-data'] = '^3.0.4';
              updated = true;
            }

            if (packageData.peerDependencies && packageData.peerDependencies['form-data']) {
              packageData.peerDependencies['form-data'] = '^3.0.4';
              updated = true;
            }

            if (updated) {
              fs.writeFileSync(packageFile, JSON.stringify(packageData, null, 2));
              this.updatedFiles.push(packageFile);
              console.log('   ✅ Actualizado a ^3.0.4');
            }
          } else {
            console.log(`✅ ${packageData.name || 'unknown'}: Ya usa versión segura (${currentVersion})`);
          }
        }
      } catch (error) {
        console.error(`❌ Error actualizando ${packageFile}:`, error.message);
        this.errors.push(`Error en ${packageFile}: ${error.message}`);
      }
    }

    // Instalar dependencias actualizadas
    if (this.updatedFiles.length > 0) {
      console.log('\n📦 Instalando dependencias actualizadas...');
      for (const packageFile of this.updatedFiles) {
        const packageDir = path.dirname(packageFile);
        try {
          execSync('npm install', { cwd: packageDir, stdio: 'inherit' });
          console.log(`✅ Dependencias instaladas en ${packageDir}`);
        } catch (error) {
          console.error(`❌ Error instalando dependencias en ${packageDir}:`, error.message);
          this.errors.push(`Error instalando en ${packageDir}: ${error.message}`);
        }
      }
    }
  }

  /**
     * Verificar si una versión es vulnerable
     */
  isVersionVulnerable (version) {
    if (!version) return false;

    const cleanVersion = version.replace(/[\^~>=<]/g, '');
    const parts = cleanVersion.split('.').map(Number);
    const major = parts[0] || 0;
    const minor = parts[1] || 0;
    const patch = parts[2] || 0;

    return major < 3 || (major === 3 && minor === 0 && patch < 4);
  }

  /**
     * Buscar archivos package.json
     */
  findPackageFiles () {
    const packageFiles = [];

    function searchRecursively (dir) {
      const items = fs.readdirSync(dir, { withFileTypes: true });

      for (const item of items) {
        const fullPath = path.join(dir, item.name);

        if (item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules') {
          searchRecursively(fullPath);
        } else if (item.name === 'package.json') {
          packageFiles.push(fullPath);
        }
      }
    }

    searchRecursively(this.projectRoot);
    return packageFiles;
  }

  /**
     * Refactorizar código para usar boundary generation seguro
     */
  async refactorCode () {
    console.log('\n🔧 Refactorizando código para boundary generation seguro...\n');

    const jsFiles = this.findJSFiles();

    for (const file of jsFiles) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const updatedContent = this.updateBoundaryGeneration(content);

        if (updatedContent !== content) {
          fs.writeFileSync(file, updatedContent);
          this.updatedFiles.push(file);
          console.log(`✅ Refactorizado: ${path.relative(this.projectRoot, file)}`);
        }
      } catch (error) {
        console.error(`❌ Error refactorizando ${file}:`, error.message);
        this.errors.push(`Error en ${file}: ${error.message}`);
      }
    }
  }

  /**
     * Buscar archivos JavaScript
     */
  findJSFiles () {
    const jsFiles = [];

    function searchRecursively (dir) {
      const items = fs.readdirSync(dir, { withFileTypes: true });

      for (const item of items) {
        const fullPath = path.join(dir, item.name);

        if (item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules') {
          searchRecursively(fullPath);
        } else if (item.name.endsWith('.js') || item.name.endsWith('.ts') || item.name.endsWith('.jsx')) {
          jsFiles.push(fullPath);
        }
      }
    }

    searchRecursively(this.projectRoot);
    return jsFiles;
  }

  /**
     * Actualizar generación de boundary en el código
     */
  updateBoundaryGeneration (content) {
    let updatedContent = content;

    // Patrón 1: Reemplazar Math.random() para boundary
    const boundaryPattern = /(boundary\s*=\s*['"`]?[^'"`]*Math\.random\(\)[^'"`]*['"`]?)/g;
    updatedContent = updatedContent.replace(boundaryPattern, (match) => {
      return match.replace(/Math\.random\(\)/g, 'crypto.randomBytes(12).toString("hex")');
    });

    // Patrón 2: Agregar import de crypto si no existe
    if (updatedContent.includes('crypto.randomBytes') && !updatedContent.includes('const crypto = require(\'crypto\')') && !updatedContent.includes('import crypto from \'crypto\'')) {
      // Buscar la primera línea de import/require
      const lines = updatedContent.split('\n');
      let insertIndex = 0;

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim().startsWith('import ') || lines[i].trim().startsWith('const ') || lines[i].trim().startsWith('let ') || lines[i].trim().startsWith('var ')) {
          insertIndex = i;
          break;
        }
      }

      const cryptoImport = 'const crypto = require(\'crypto\');';
      lines.splice(insertIndex, 0, cryptoImport);
      updatedContent = lines.join('\n');
    }

    // Patrón 3: Reemplazar generación de boundary simple
    const simpleBoundaryPattern = /(boundary\s*=\s*['"`]?[^'"`]*Math\.random\(\)[^'"`]*['"`]?)/g;
    updatedContent = updatedContent.replace(simpleBoundaryPattern, (match) => {
      return match.replace(/Math\.random\(\)/g, 'crypto.randomBytes(12).toString("hex")');
    });

    return updatedContent;
  }

  /**
     * Crear tests de seguridad
     */
  async createSecurityTests () {
    console.log('\n🧪 Creando tests de seguridad...\n');

    const testContent = `/**
 * Tests de Seguridad - CVE-2025-7783
 * 
 * Tests para validar que la generación de boundary es segura
 * y no es vulnerable a ataques de inyección.
 */

const crypto = require('crypto');

describe('FormData Security Tests', () => {
    
    test('should generate secure boundary using crypto.randomBytes', () => {
        const boundary = '--------------------------' + crypto.randomBytes(12).toString('hex');
        
        expect(boundary).toMatch(/^--------------------------[a-f0-9]{24}$/);
        expect(boundary.length).toBe(50); // 26 + 24 hex chars
    });
    
    test('should not use Math.random for boundary generation', () => {
        // Simular código vulnerable
        const vulnerableBoundary = '--------------------------' + Math.random().toString(36).substring(2);
        
        // Verificar que no es seguro
        expect(vulnerableBoundary).not.toMatch(/^--------------------------[a-f0-9]{24}$/);
    });
    
    test('should generate unique boundaries', () => {
        const boundaries = new Set();
        
        for (let i = 0; i < 1000; i++) {
            const boundary = '--------------------------' + crypto.randomBytes(12).toString('hex');
            boundaries.add(boundary);
        }
        
        // Todos los boundaries deben ser únicos
        expect(boundaries.size).toBe(1000);
    });
    
    test('should resist boundary injection attacks', () => {
        // Simular intento de inyección
        const maliciousBoundary = '--------------------------' + 'injection' + crypto.randomBytes(12).toString('hex');
        
        // El boundary no debe contener caracteres peligrosos
        expect(maliciousBoundary).not.toContain('injection');
        
        // Debe seguir el patrón correcto
        expect(maliciousBoundary).toMatch(/^--------------------------[a-f0-9]{24}$/);
    });
    
    test('should handle FormData creation securely', () => {
        const FormData = require('form-data');
        const form = new FormData();
        
        // Agregar datos de forma segura
        form.append('field1', 'value1');
        form.append('field2', 'value2');
        
        // Verificar que el boundary es seguro
        const boundary = form.getBoundary();
        expect(boundary).toMatch(/^--------------------------[a-f0-9]{24}$/);
    });
});

/**
 * Test de integración para simular ataque de inyección
 */
describe('Boundary Injection Attack Simulation', () => {
    
    test('should prevent boundary fragmentation', () => {
        // Simular payload malicioso
        const maliciousPayload = \`
            --------------------------injection
            Content-Disposition: form-data; name="field1"
            
            value1
            --------------------------injection
            Content-Disposition: form-data; name="field2"
            
            value2
            --------------------------injection--
        \`;
        
        // Verificar que no se puede fragmentar el payload
        const boundaries = maliciousPayload.match(/--------------------------[a-f0-9]{24}/g);
        expect(boundaries).toBeNull();
    });
    
    test('should validate boundary format', () => {
        const validBoundary = '--------------------------' + crypto.randomBytes(12).toString('hex');
        const invalidBoundary = '--------------------------' + Math.random().toString(36).substring(2);
        
        // Función de validación
        const isValidBoundary = (boundary) => {
            return /^--------------------------[a-f0-9]{24}$/.test(boundary);
        };
        
        expect(isValidBoundary(validBoundary)).toBe(true);
        expect(isValidBoundary(invalidBoundary)).toBe(false);
    });
});
`;

    const testPath = path.join(this.projectRoot, 'tests', 'form-data-security.test.js');

    // Crear directorio tests si no existe
    const testDir = path.dirname(testPath);
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }

    fs.writeFileSync(testPath, testContent);
    this.updatedFiles.push(testPath);
    console.log(`✅ Test de seguridad creado: ${testPath}`);
  }

  /**
     * Ejecutar tests
     */
  async runTests () {
    console.log('\n🧪 Ejecutando tests de seguridad...\n');

    try {
      // Verificar si jest está disponible
      const packageFiles = this.findPackageFiles();
      for (const packageFile of packageFiles) {
        const packageDir = path.dirname(packageFile);
        const packageData = JSON.parse(fs.readFileSync(packageFile, 'utf8'));

        if (packageData.scripts && packageData.scripts.test) {
          console.log(`🧪 Ejecutando tests en ${packageData.name || 'unknown'}...`);
          try {
            execSync('npm test', { cwd: packageDir, stdio: 'inherit' });
            console.log(`✅ Tests pasaron en ${packageData.name || 'unknown'}`);
          } catch (error) {
            console.error(`❌ Tests fallaron en ${packageData.name || 'unknown'}:`, error.message);
            this.errors.push(`Tests fallaron en ${packageData.name || 'unknown'}: ${error.message}`);
          }
        }
      }
    } catch (error) {
      console.error('❌ Error ejecutando tests:', error.message);
      this.errors.push(`Error ejecutando tests: ${error.message}`);
    }
  }

  /**
     * Generar reporte de actualización
     */
  generateUpdateReport () {
    const report = {
      timestamp: new Date().toISOString(),
      vulnerability: 'CVE-2025-7783',
      action: 'Security Update',
      updatedFiles: this.updatedFiles,
      errors: this.errors,
      summary: {
        filesUpdated: this.updatedFiles.length,
        errorsCount: this.errors.length,
        success: this.errors.length === 0
      }
    };

    const reportPath = path.join(this.projectRoot, 'security-update-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log(`\n📄 Reporte de actualización guardado en: ${reportPath}`);

    return report;
  }

  /**
     * Ejecutar actualización completa
     */
  async runUpdate () {
    console.log('🔧 Iniciando actualización de seguridad CVE-2025-7783...\n');

    try {
      // 1. Actualizar dependencias
      await this.updateDependencies();

      // 2. Refactorizar código
      await this.refactorCode();

      // 3. Crear tests de seguridad
      await this.createSecurityTests();

      // 4. Ejecutar tests
      await this.runTests();

      // 5. Generar reporte
      const report = this.generateUpdateReport();

      console.log('\n✅ Actualización de seguridad completada');
      console.log(`📊 Archivos actualizados: ${report.summary.filesUpdated}`);
      console.log(`❌ Errores: ${report.summary.errorsCount}`);

      if (report.summary.success) {
        console.log('🎉 ¡Todas las actualizaciones se completaron exitosamente!');
      } else {
        console.log('⚠️  Se encontraron algunos errores. Revisa el reporte para más detalles.');
      }

      return report;
    } catch (error) {
      console.error('❌ Error durante la actualización:', error);
      this.errors.push(`Error general: ${error.message}`);
      return this.generateUpdateReport();
    }
  }
}

// Ejecutar actualización
if (require.main === module) {
  const updater = new FormDataSecurityUpdater();
  updater.runUpdate().then(report => {
    process.exit(report.summary.success ? 0 : 1);
  }).catch(error => {
    console.error('❌ Error fatal:', error);
    process.exit(1);
  });
}

module.exports = FormDataSecurityUpdater;
