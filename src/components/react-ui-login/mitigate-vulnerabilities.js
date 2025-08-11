#!/usr/bin/env node

/**
 * Script de mitigación de vulnerabilidades para react-ui-login
 * @author INMORTAL_OS
 */

import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';

// Configuración de vulnerabilidades específicas
const VULNERABILITIES = {
  'nth-check': {
    current: '<2.0.1',
    target: '^2.1.1',
    severity: 'HIGH',
    description: 'Inefficient Regular Expression Complexity'
  },
  'webpack-dev-server': {
    current: '<=5.2.0',
    target: '^5.2.1',
    severity: 'MODERATE',
    description: 'Source code theft vulnerability'
  },
  'postcss': {
    current: '<8.4.31',
    target: '^8.4.31',
    severity: 'MODERATE',
    description: 'Line return parsing error'
  },
  'http-proxy-middleware': {
    current: '<2.0.0',
    target: '^2.0.6',
    severity: 'MODERATE',
    description: 'Multiple proxy handling vulnerabilities'
  }
};

// Función para ejecutar comandos npm
function runNpmCommand(command) {
  try {
    console.log(`🔄 Ejecutando: ${command}`);
    const output = execSync(command, { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    return { success: true, output };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Función para verificar versión actual de una dependencia
function checkCurrentVersion(packageName) {
  const result = runNpmCommand(`npm list ${packageName}`);
  if (result.success) {
    const match = result.output.match(new RegExp(`${packageName}@([^\\s]+)`));
    return match ? match[1] : 'unknown';
  }
  return 'unknown';
}

// Función para instalar versión específica de una dependencia
function installSpecificVersion(packageName, version) {
  console.log(`📦 Instalando ${packageName}@${version}...`);
  
  // Intentar instalar como dependencia de desarrollo
  let result = runNpmCommand(`npm install ${packageName}@${version} --save-dev --legacy-peer-deps`);
  
  if (!result.success) {
    // Si falla, intentar como dependencia regular
    console.log(`⚠️  Falló como devDependency, intentando como dependency...`);
    result = runNpmCommand(`npm install ${packageName}@${version} --legacy-peer-deps`);
  }
  
  return result;
}

// Función para verificar si la vulnerabilidad fue mitigada
function verifyMitigation(packageName, targetVersion) {
  const currentVersion = checkCurrentVersion(packageName);
  console.log(`   Versión actual: ${currentVersion}`);
  console.log(`   Versión objetivo: ${targetVersion}`);
  
  // Verificar si la versión actual es mayor o igual a la objetivo
  const current = currentVersion.replace(/[^\d.]/g, '');
  const target = targetVersion.replace(/[^\d.]/g, '');
  
  if (current >= target) {
    console.log(`   ✅ Vulnerabilidad MITIGADA`);
    return true;
  } else {
    console.log(`   ❌ Vulnerabilidad PENDIENTE`);
    return false;
  }
}

// Función principal de mitigación
async function mitigateVulnerabilities() {
  console.log('🚀 Iniciando mitigación de vulnerabilidades...\n');
  
  const results = {};
  
  for (const [packageName, vuln] of Object.entries(VULNERABILITIES)) {
    console.log(`🔍 Analizando ${packageName} (${vuln.severity}): ${vuln.description}`);
    
    // Verificar versión actual
    const currentVersion = checkCurrentVersion(packageName);
    console.log(`   Versión actual: ${currentVersion}`);
    
    // Instalar versión segura
    const installResult = installSpecificVersion(packageName, vuln.target);
    
    if (installResult.success) {
      console.log(`   ✅ Instalación exitosa`);
      
      // Verificar si la mitigación funcionó
      const mitigated = verifyMitigation(packageName, vuln.target);
      results[packageName] = { mitigated, version: vuln.target };
      
    } else {
      console.log(`   ❌ Instalación falló: ${installResult.error}`);
      results[packageName] = { mitigated: false, error: installResult.error };
    }
    
    console.log('');
  }
  
  // Generar reporte de resultados
  console.log('📊 RESUMEN DE MITIGACIÓN');
  console.log('========================');
  
  let mitigatedCount = 0;
  let totalCount = Object.keys(VULNERABILITIES).length;
  
  for (const [packageName, result] of Object.entries(results)) {
    const status = result.mitigated ? '✅ MITIGADO' : '❌ PENDIENTE';
    console.log(`${packageName}: ${status}`);
    if (result.mitigated) mitigatedCount++;
  }
  
  console.log(`\n📈 Progreso: ${mitigatedCount}/${totalCount} vulnerabilidades mitigadas`);
  
  if (mitigatedCount === totalCount) {
    console.log('\n🎉 ¡Todas las vulnerabilidades han sido mitigadas exitosamente!');
  } else {
    console.log('\n⚠️  Algunas vulnerabilidades aún requieren atención manual');
  }
  
  return results;
}

// Función para generar reporte detallado
async function generateDetailedReport(results) {
  const report = {
    timestamp: new Date().toISOString(),
    vulnerabilities: VULNERABILITIES,
    results: results,
    summary: {
      total: Object.keys(VULNERABILITIES).length,
      mitigated: Object.values(results).filter(r => r.mitigated).length,
      pending: Object.values(results).filter(r => !r.mitigated).length
    }
  };
  
  const reportPath = path.join(process.cwd(), 'vulnerability-mitigation-report.json');
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`\n📄 Reporte detallado guardado en: ${reportPath}`);
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  mitigateVulnerabilities()
    .then(generateDetailedReport)
    .catch(console.error);
}

export { mitigateVulnerabilities, VULNERABILITIES };
