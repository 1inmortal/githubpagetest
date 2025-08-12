#!/usr/bin/env node

/**
 * Script de auditoría de seguridad para verificar vulnerabilidades
 * Basado en el informe de Securibot PR #123
 * @author INMORTAL_OS
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de la auditoría
const AUDIT_CONFIG = {
  criticalVulnerabilities: [
    'image-processing-lib@1.2.0',
    'logging-framework@3.1.0'
  ],
  securityPatterns: [
    {
      name: 'AWS Credentials',
      pattern: /AKIA[0-9A-Z]{16}|accessKeyId|secretAccessKey/gi,
      severity: 'CRÍTICA',
      description: 'Credenciales de AWS hardcodeadas'
    },
    {
      name: 'XSS Vulnerable Code',
      pattern: /res\.send\(.*error\.message.*\)/gi,
      severity: 'ALTA',
      description: 'Código vulnerable a XSS reflejado'
    },
    {
      name: 'Path Traversal',
      pattern: /\.\.\/|path\.join.*req\.body|req\.params/gi,
      severity: 'MEDIA',
      description: 'Posible vulnerabilidad de path traversal'
    },
    {
      name: 'Hardcoded Secrets',
      pattern: /password.*=.*['"][^'"]+['"]|secret.*=.*['"][^'"]+['"]|key.*=.*['"][^'"]+['"]/gi,
      severity: 'ALTA',
      description: 'Secretos hardcodeados en el código'
    }
  ],
  fileExtensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.env', '.yml', '.yaml'],
  ignorePatterns: [
    'node_modules',
    '.git',
    'dist',
    'build',
    'coverage',
    'test-results',
    'playwright-report'
  ]
};

// Clase para el reporte de auditoría
class SecurityAuditReport {
  constructor() {
    this.timestamp = new Date().toISOString();
    this.vulnerabilities = [];
    this.dependencies = [];
    this.recommendations = [];
    this.score = 100;
  }

  addVulnerability(type, severity, file, line, description, recommendation) {
    this.vulnerabilities.push({
      type,
      severity,
      file,
      line,
      description,
      recommendation,
      timestamp: new Date().toISOString()
    });

    // Reducir puntuación según severidad
    const severityScores = { 'CRÍTICA': 30, 'ALTA': 20, 'MEDIA': 10, 'BAJA': 5 };
    this.score -= severityScores[severity] || 0;
    this.score = Math.max(0, this.score);
  }

  addDependency(name, version, vulnerability) {
    this.dependencies.push({
      name,
      version,
      vulnerability,
      timestamp: new Date().toISOString()
    });
  }

  addRecommendation(priority, action, description) {
    this.recommendations.push({
      priority,
      action,
      description,
      timestamp: new Date().toISOString()
    });
  }

  generateReport() {
    const report = {
      timestamp: this.timestamp,
      securityScore: this.score,
      totalVulnerabilities: this.vulnerabilities.length,
      vulnerabilities: this.vulnerabilities,
      dependencies: this.dependencies,
      recommendations: this.recommendations,
      summary: this.generateSummary()
    };

    return report;
  }

  generateSummary() {
    const criticalCount = this.vulnerabilities.filter(v => v.severity === 'CRÍTICA').length;
    const highCount = this.vulnerabilities.filter(v => v.severity === 'ALTA').length;
    const mediumCount = this.vulnerabilities.filter(v => v.severity === 'MEDIA').length;
    const lowCount = this.vulnerabilities.filter(v => v.severity === 'BAJA').length;

    let riskLevel = 'BAJO';
    if (criticalCount > 0) riskLevel = 'CRÍTICO';
    else if (highCount > 0) riskLevel = 'ALTO';
    else if (mediumCount > 0) riskLevel = 'MEDIO';

    return {
      riskLevel,
      criticalCount,
      highCount,
      mediumCount,
      lowCount,
      overallAssessment: this.getOverallAssessment()
    };
  }

  getOverallAssessment() {
    if (this.score >= 90) return 'Excelente - Muy pocas vulnerabilidades';
    if (this.score >= 80) return 'Bueno - Algunas vulnerabilidades menores';
    if (this.score >= 60) return 'Regular - Varias vulnerabilidades que requieren atención';
    if (this.score >= 40) return 'Malo - Múltiples vulnerabilidades críticas';
    return 'Crítico - Requiere acción inmediata';
  }
}

// Función para escanear archivos en busca de vulnerabilidades
async function scanFilesForVulnerabilities(directory, report) {
  try {
    const files = await fs.readdir(directory, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(directory, file.name);
      
      // Ignorar directorios y archivos según patrones
      if (file.isDirectory()) {
        if (!AUDIT_CONFIG.ignorePatterns.some(pattern => file.name.includes(pattern))) {
          await scanFilesForVulnerabilities(fullPath, report);
        }
        continue;
      }

      // Verificar extensión del archivo
      const ext = path.extname(file.name);
      if (!AUDIT_CONFIG.fileExtensions.includes(ext)) continue;

      try {
        const content = await fs.readFile(fullPath, 'utf8');
        const lines = content.split('\n');
        
        // Escanear cada línea en busca de patrones de vulnerabilidad
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          const lineNumber = i + 1;
          
          for (const pattern of AUDIT_CONFIG.securityPatterns) {
            if (pattern.pattern.test(line)) {
              report.addVulnerability(
                pattern.name,
                pattern.severity,
                fullPath,
                lineNumber,
                pattern.description,
                `Revisar y corregir la línea ${lineNumber} en ${fullPath}`
              );
            }
          }
        }
      } catch (error) {
        console.warn(`⚠️  No se pudo leer el archivo ${fullPath}:`, error.message);
      }
    }
  } catch (error) {
    console.warn(`⚠️  No se pudo acceder al directorio ${directory}:`, error.message);
  }
}

// Función para verificar dependencias vulnerables
async function checkDependencies(report) {
  try {
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
    
    console.log('📦 Verificando dependencias...');
    
    // Verificar dependencias críticas mencionadas en el informe
    for (const criticalDep of AUDIT_CONFIG.criticalVulnerabilities) {
      const [name, version] = criticalDep.split('@');
      
      if (packageJson.dependencies?.[name] || packageJson.devDependencies?.[name]) {
        const currentVersion = packageJson.dependencies?.[name] || packageJson.devDependencies?.[name];
        
        if (currentVersion === version) {
          report.addDependency(name, currentVersion, 'Vulnerabilidad crítica conocida');
          report.addVulnerability(
            'Dependency Vulnerability',
            'CRÍTICA',
            packageJsonPath,
            0,
            `Dependencia ${name}@${version} contiene vulnerabilidades críticas`,
            `Actualizar ${name} a la versión más reciente disponible`
          );
        }
      }
    }
    
    // Ejecutar npm audit si está disponible
    try {
      console.log('🔍 Ejecutando npm audit...');
      const auditOutput = execSync('npm audit --json', { 
        cwd: path.dirname(packageJsonPath),
        encoding: 'utf8',
        stdio: 'pipe'
      });
      
      const auditData = JSON.parse(auditOutput);
      
      if (auditData.vulnerabilities) {
        for (const [pkg, vuln] of Object.entries(auditData.vulnerabilities)) {
          const severity = vuln.severity?.toUpperCase() || 'MEDIA';
          report.addDependency(pkg, vuln.from?.[0] || 'unknown', vuln.title || 'Vulnerabilidad detectada');
          
          if (severity === 'CRITICAL' || severity === 'HIGH') {
            report.addVulnerability(
              'Dependency Vulnerability',
              severity === 'CRITICAL' ? 'CRÍTICA' : 'ALTA',
              packageJsonPath,
              0,
              `Dependencia ${pkg} tiene vulnerabilidad: ${vuln.title}`,
              `Actualizar ${pkg} o aplicar parches de seguridad`
            );
          }
        }
      }
    } catch (error) {
      console.warn('⚠️  npm audit no disponible o falló:', error.message);
    }
    
  } catch (error) {
    console.error('❌ Error al verificar dependencias:', error.message);
  }
}

// Función para generar recomendaciones
function generateRecommendations(report) {
  const criticalVulns = report.vulnerabilities.filter(v => v.severity === 'CRÍTICA');
  const highVulns = report.vulnerabilities.filter(v => v.severity === 'ALTA');
  
  if (criticalVulns.length > 0) {
    report.addRecommendation(
      'INMEDIATA',
      'Bloquear PR',
      'El PR contiene vulnerabilidades críticas y debe ser bloqueado hasta que se corrijan'
    );
  }
  
  if (highVulns.length > 0) {
    report.addRecommendation(
      'ALTA',
      'Revisar código',
      'Corregir todas las vulnerabilidades de alta severidad antes de fusionar'
    );
  }
  
  // Recomendaciones específicas basadas en el informe de Securibot
  report.addRecommendation(
    'ALTA',
    'Actualizar dependencias',
    'Actualizar image-processing-lib a 1.2.1 y logging-framework a 3.1.2'
  );
  
  report.addRecommendation(
    'ALTA',
    'Implementar sanitización',
    'Usar funciones de sanitización para prevenir XSS en mensajes de error'
  );
  
  report.addRecommendation(
    'ALTA',
    'Validar nombres de archivo',
    'Implementar validación estricta de nombres de archivo para prevenir path traversal'
  );
  
  report.addRecommendation(
    'MEDIA',
    'Configurar variables de entorno',
    'Mover todas las credenciales a variables de entorno o gestores de secretos'
  );
  
  report.addRecommendation(
    'MEDIA',
    'Implementar escaneo automático',
    'Configurar hooks pre-commit y pipelines de CI para escaneo de seguridad'
  );
}

// Función principal de auditoría
async function runSecurityAudit() {
  console.log('🔒 Iniciando auditoría de seguridad...\n');
  
  const report = new SecurityAuditReport();
  const projectRoot = path.join(__dirname, '..', '..');
  
  // Escanear archivos en busca de vulnerabilidades
  console.log('📁 Escaneando archivos del proyecto...');
  await scanFilesForVulnerabilities(projectRoot, report);
  
  // Verificar dependencias
  await checkDependencies(report);
  
  // Generar recomendaciones
  generateRecommendations(report);
  
  // Generar reporte final
  const finalReport = report.generateReport();
  
  // Guardar reporte
  const reportPath = path.join(__dirname, '..', 'security-audit-report.json');
  await fs.writeFile(reportPath, JSON.stringify(finalReport, null, 2));
  
  // Mostrar resumen
  console.log('\n📊 RESUMEN DE LA AUDITORÍA');
  console.log('========================');
  console.log(`Puntuación de seguridad: ${finalReport.securityScore}/100`);
  console.log(`Nivel de riesgo: ${finalReport.summary.riskLevel}`);
  console.log(`Total de vulnerabilidades: ${finalReport.totalVulnerabilities}`);
  console.log(`\nVulnerabilidades críticas: ${finalReport.summary.criticalCount}`);
  console.log(`Vulnerabilidades altas: ${finalReport.summary.highCount}`);
  console.log(`Vulnerabilidades medias: ${finalReport.summary.mediumCount}`);
  console.log(`Vulnerabilidades bajas: ${finalReport.summary.lowCount}`);
  
  console.log(`\n📝 Evaluación general: ${finalReport.summary.overallAssessment}`);
  
  if (finalReport.summary.criticalCount > 0) {
    console.log('\n🚨 ACCIÓN REQUERIDA: Se encontraron vulnerabilidades críticas');
    console.log('   El PR debe ser bloqueado hasta que se corrijan estos problemas');
  }
  
  console.log(`\n📄 Reporte completo guardado en: ${reportPath}`);
  
  return finalReport;
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  runSecurityAudit().catch(console.error);
}

export { SecurityAuditReport, runSecurityAudit };
