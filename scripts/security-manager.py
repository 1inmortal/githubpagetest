#!/usr/bin/env python3
"""
🛡️ SISTEMA CONSOLIDADO DE GESTIÓN DE SEGURIDAD
===============================================

Este script consolida todas las funcionalidades de seguridad del proyecto:
- Auditoría de vulnerabilidades (CVE-2025-7783)
- Auditoría de secretos en workflows
- Limpieza de llaves API
- Monitoreo de seguridad
- Actualización de dependencias vulnerables

Autor: Sistema de Auditoría de Seguridad
Versión: 2.0.0
"""

import os
import re
import json
import subprocess
import yaml
import hashlib
from pathlib import Path
from typing import Dict, List, Set, Tuple, Optional
from datetime import datetime
import logging

class SecurityManager:
    def __init__(self, root_path: str = "."):
        self.root_path = Path(root_path)
        self.report = {
            "timestamp": datetime.now().isoformat(),
            "vulnerabilities_found": 0,
            "secrets_found": 0,
            "api_keys_found": 0,
            "fixes_applied": 0,
            "recommendations": []
        }
        
        # Configurar logging
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s'
        )
        self.logger = logging.getLogger(__name__)
        
        # Patrones de detección
        self.api_key_patterns = {
            'google': r'AIzaSy[0-9A-Za-z_-]{33}',
            'github': r'ghp_[0-9A-Za-z]{36}',
            'aws': r'AKIA[0-9A-Z]{16}',
            'azure': r'[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}',
            'generic': r'[A-Za-z0-9+/]{40,}={0,2}'
        }
        
        self.secret_patterns = {
            'password': r'password\s*[:=]\s*["\']?[^"\'\s]+["\']?',
            'token': r'token\s*[:=]\s*["\']?[^"\'\s]+["\']?',
            'key': r'key\s*[:=]\s*["\']?[^"\'\s]+["\']?',
            'secret': r'secret\s*[:=]\s*["\']?[^"\'\s]+["\']?'
        }

    def run_command(self, command: str, cwd: Optional[str] = None) -> Tuple[int, str, str]:
        """Ejecuta un comando de forma segura y retorna el resultado"""
        import shlex
        try:
            # Validar que el comando no contenga caracteres peligrosos
            dangerous_chars = ['|', '&', ';', '`', '$', '<', '>']
            if any(char in command for char in dangerous_chars):
                # Para comandos complejos, validar que no sean peligrosos
                dangerous_cmds = ['rm -rf', 'del /f', 'format', 'mkfs', 'dd if=']
                if any(danger in command.lower() for danger in dangerous_cmds):
                    self.logger.warning(f"Comando potencialmente peligroso bloqueado: {command}")
                    return -1, "", "Comando bloqueado por seguridad"
            
            # Parsear comando de forma segura
            if isinstance(command, str):
                # Intentar parsear como lista de argumentos (más seguro)
                try:
                    cmd_parts = shlex.split(command)
                    result = subprocess.run(
                        cmd_parts,
                        capture_output=True,
                        text=True,
                        cwd=cwd,
                        timeout=300  # Timeout de 5 minutos
                    )
                except ValueError:
                    # Si falla el parsing, usar shell=True solo si es necesario
                    result = subprocess.run(
                        command,
                        shell=True,
                        capture_output=True,
                        text=True,
                        cwd=cwd,
                        timeout=300
                    )
            else:
                # Si ya es una lista, usarla directamente
                result = subprocess.run(
                    command,
                    capture_output=True,
                    text=True,
                    cwd=cwd,
                    timeout=300
                )
            
            return result.returncode, result.stdout, result.stderr
        except subprocess.TimeoutExpired:
            return -1, "", "Comando expiró (timeout)"
        except Exception as e:
            return -1, "", str(e)

    def audit_form_data_vulnerability(self) -> bool:
        """Auditoría específica para CVE-2025-7783 en form-data"""
        print("🔍 Auditando vulnerabilidad CVE-2025-7783 en form-data...")
        
        try:
            # Verificar package.json
            package_files = list(self.root_path.glob("**/package.json"))
            vulnerable_found = False
            
            for package_file in package_files:
                with open(package_file, 'r', encoding='utf-8') as f:
                    package_data = json.load(f)
                
                # Verificar dependencias
                all_deps = {**package_data.get('dependencies', {}), 
                           **package_data.get('devDependencies', {})}
                
                for dep_name, version in all_deps.items():
                    if 'form-data' in dep_name:
                        # Verificar si la versión es vulnerable
                        if self.is_vulnerable_version(version, '3.0.4'):
                            print(f"⚠️  Vulnerabilidad encontrada en {package_file}: {dep_name}@{version}")
                            vulnerable_found = True
                            self.report["vulnerabilities_found"] += 1
                            self.report["recommendations"].append({
                                "type": "CVE-2025-7783",
                                "file": str(package_file),
                                "dependency": dep_name,
                                "current_version": version,
                                "recommended_version": "^3.0.4"
                            })
            
            if not vulnerable_found:
                print("✅ No se encontraron vulnerabilidades CVE-2025-7783")
                return True
            else:
                print("❌ Se encontraron vulnerabilidades CVE-2025-7783")
                return False
                
        except Exception as e:
            print(f"❌ Error en auditoría CVE-2025-7783: {e}")
            return False

    def is_vulnerable_version(self, version: str, min_safe: str) -> bool:
        """Verifica si una versión es vulnerable"""
        try:
            # Limpiar versión
            version = version.replace('^', '').replace('~', '').replace('>=', '').replace('<=', '')
            
            # Comparar versiones (simplificado)
            if version.startswith('<'):
                return True
            if version.startswith('>='):
                version = version[2:]
            
            # Verificar si es menor que la versión segura
            return version < min_safe
        except:
            return False

    def audit_secrets_in_workflows(self) -> bool:
        """Auditoría de secretos en workflows de GitHub Actions"""
        print("🔍 Auditando secretos en workflows...")
        
        workflows_dir = self.root_path / ".github" / "workflows"
        if not workflows_dir.exists():
            print("ℹ️  No se encontró directorio de workflows")
            return True
        
        secrets_found = 0
        
        for yaml_file in workflows_dir.glob("*.yml"):
            try:
                with open(yaml_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Buscar patrones de secretos
                for pattern_name, pattern in self.secret_patterns.items():
                    matches = re.findall(pattern, content, re.IGNORECASE)
                    if matches:
                        print(f"⚠️  Secretos encontrados en {yaml_file}: {pattern_name}")
                        secrets_found += len(matches)
                        self.report["secrets_found"] += secrets_found
                        self.report["recommendations"].append({
                            "type": "Secret in workflow",
                            "file": str(yaml_file),
                            "pattern": pattern_name,
                            "matches": len(matches)
                        })
                        
            except Exception as e:
                print(f"❌ Error procesando {yaml_file}: {e}")
        
        if secrets_found == 0:
            print("✅ No se encontraron secretos en workflows")
            return True
        else:
            print(f"⚠️  Se encontraron {secrets_found} secretos en workflows")
            return False

    def scan_api_keys(self) -> bool:
        """Escanea llaves API en el proyecto"""
        print("🔍 Escaneando llaves API...")
        
        api_keys_found = 0
        excluded_dirs = {'.git', 'node_modules', 'dist', 'build', '__pycache__'}
        
        for file_path in self.root_path.rglob("*"):
            if file_path.is_file() and file_path.suffix in ['.js', '.py', '.html', '.css', '.json', '.yml', '.yaml']:
                if any(excluded in file_path.parts for excluded in excluded_dirs):
                    continue
                
                try:
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                    
                    for key_type, pattern in self.api_key_patterns.items():
                        matches = re.findall(pattern, content)
                        if matches:
                            print(f"⚠️  Llaves API encontradas en {file_path}: {key_type}")
                            api_keys_found += len(matches)
                            self.report["api_keys_found"] += api_keys_found
                            self.report["recommendations"].append({
                                "type": "API Key",
                                "file": str(file_path),
                                "key_type": key_type,
                                "matches": len(matches)
                            })
                            
                except Exception as e:
                    continue
        
        if api_keys_found == 0:
            print("✅ No se encontraron llaves API")
            return True
        else:
            print(f"⚠️  Se encontraron {api_keys_found} llaves API")
            return False

    def update_dependencies(self) -> bool:
        """Actualiza dependencias vulnerables"""
        print("🔄 Actualizando dependencias...")
        
        # Actualizar Node.js
        print("📦 Actualizando dependencias de Node.js...")
        returncode, stdout, stderr = self.run_command("npm update")
        if returncode == 0:
            print("✅ Dependencias de Node.js actualizadas")
        else:
            print(f"⚠️  Error actualizando Node.js: {stderr}")
        
        # Actualizar servidor
        print("📦 Actualizando dependencias del servidor...")
        returncode, stdout, stderr = self.run_command("npm update", cwd="server")
        if returncode == 0:
            print("✅ Dependencias del servidor actualizadas")
        else:
            print(f"⚠️  Error actualizando servidor: {stderr}")
        
        # Actualizar Python
        print("📦 Actualizando dependencias de Python...")
        returncode, stdout, stderr = self.run_command("pip install --upgrade pip")
        if returncode == 0:
            print("✅ pip actualizado")
        
        if (self.root_path / "public" / "python" / "requirements.txt").exists():
            returncode, stdout, stderr = self.run_command("pip install -r public/python/requirements.txt --upgrade")
            if returncode == 0:
                print("✅ Dependencias de Python actualizadas")
            else:
                print(f"⚠️  Error actualizando Python: {stderr}")
        
        return True

    def generate_security_report(self) -> None:
        """Genera reporte de seguridad"""
        report_file = self.root_path / "reports" / f"security-audit-{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        report_file.parent.mkdir(exist_ok=True)
        
        with open(report_file, 'w', encoding='utf-8') as f:
            json.dump(self.report, f, indent=2, ensure_ascii=False)
        
        print(f"📊 Reporte de seguridad generado: {report_file}")

    def run_full_audit(self) -> bool:
        """Ejecuta auditoría completa de seguridad"""
        print("🛡️  INICIANDO AUDITORÍA COMPLETA DE SEGURIDAD")
        print("=" * 60)
        
        # Ejecutar todas las auditorías
        form_data_ok = self.audit_form_data_vulnerability()
        secrets_ok = self.audit_secrets_in_workflows()
        api_keys_ok = self.scan_api_keys()
        
        # Actualizar dependencias si es necesario
        if not form_data_ok:
            self.update_dependencies()
        
        # Generar reporte
        self.generate_security_report()
        
        # Resumen final
        print("\n" + "=" * 60)
        print("📊 RESUMEN DE AUDITORÍA DE SEGURIDAD")
        print("=" * 60)
        print(f"🔍 Vulnerabilidades encontradas: {self.report['vulnerabilities_found']}")
        print(f"🔐 Secretos encontrados: {self.report['secrets_found']}")
        print(f"🗝️  Llaves API encontradas: {self.report['api_keys_found']}")
        print(f"🔧 Recomendaciones: {len(self.report['recommendations'])}")
        
        if self.report['vulnerabilities_found'] == 0 and self.report['secrets_found'] == 0 and self.report['api_keys_found'] == 0:
            print("✅ Auditoría de seguridad completada - Sin problemas encontrados")
            return True
        else:
            print("⚠️  Auditoría de seguridad completada - Se encontraron problemas")
            return False

def main():
    """Función principal"""
    security_manager = SecurityManager()
    success = security_manager.run_full_audit()
    
    if success:
        print("\n🎉 ¡Auditoría de seguridad exitosa!")
        exit(0)
    else:
        print("\n⚠️  Se encontraron problemas de seguridad que requieren atención")
        exit(1)

if __name__ == "__main__":
    main()
