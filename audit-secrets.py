#!/usr/bin/env python3
"""
Auditoría de Secretos en Workflows GitHub Actions
Analiza todos los workflows YAML para identificar secretos y variables de entorno
"""

import os
import re
import yaml
from pathlib import Path
from typing import Dict, List, Set, Tuple

class SecretsAuditor:
    def __init__(self, workflows_dir: str = ".github/workflows"):
        self.workflows_dir = Path(workflows_dir)
        self.secrets_found = {}
        self.missing_secrets = {}
        self.suggested_names = {}
        
    def scan_workflows(self) -> Dict[str, List[str]]:
        """Escanea todos los workflows YAML para encontrar secretos"""
        if not self.workflows_dir.exists():
            print(f"❌ Directorio {self.workflows_dir} no encontrado")
            return {}
            
        workflows = {}
        for yaml_file in self.workflows_dir.glob("*.yml"):
            if yaml_file.name.endswith('.backup'):
                continue
                
            print(f"🔍 Analizando: {yaml_file.name}")
            secrets = self.analyze_workflow(yaml_file)
            if secrets:
                workflows[yaml_file.name] = secrets
                
        return workflows
    
    def analyze_workflow(self, yaml_file: Path) -> List[str]:
        """Analiza un workflow específico para encontrar secretos"""
        try:
            with open(yaml_file, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Buscar patrones de secretos
            secrets = []
            
            # Patrón para ${{ secrets.SECRET_NAME }}
            secret_pattern = r'\$\{\{\s*secrets\.([A-Z_][A-Z0-9_]*)\s*\}\}'
            matches = re.findall(secret_pattern, content)
            secrets.extend(matches)
            
            # Patrón para variables de entorno
            env_pattern = r'\$\{\{\s*env\.([A-Z_][A-Z0-9_]*)\s*\}\}'
            env_matches = re.findall(env_pattern, content)
            secrets.extend([f"ENV_{match}" for match in env_matches])
            
            # Patrón para variables de contexto
            context_pattern = r'\$\{\{\s*([a-z]+\.[a-z_]+)\s*\}\}'
            context_matches = re.findall(context_pattern, content)
            # Filtrar solo los que no son secretos o env
            context_secrets = [match for match in context_matches 
                             if not match.startswith('secrets.') 
                             and not match.startswith('env.')]
            secrets.extend(context_secrets)
            
            return list(set(secrets))  # Eliminar duplicados
            
        except Exception as e:
            print(f"❌ Error analizando {yaml_file}: {e}")
            return []
    
    def suggest_secure_names(self, secrets: List[str]) -> Dict[str, str]:
        """Sugiere nombres seguros y consistentes para secretos largos"""
        suggestions = {}
        
        for secret in secrets:
            if len(secret) > 50:  # Secretos muy largos
                if 'AZURE' in secret:
                    if 'CLIENTID' in secret:
                        suggestions[secret] = 'AZURE_CLIENT_ID'
                    elif 'TENANTID' in secret:
                        suggestions[secret] = 'AZURE_TENANT_ID'
                    elif 'SUBSCRIPTIONID' in secret:
                        suggestions[secret] = 'AZURE_SUBSCRIPTION_ID'
                    else:
                        suggestions[secret] = 'AZURE_CREDENTIALS'
                elif 'DOCKER' in secret:
                    if 'USERNAME' in secret:
                        suggestions[secret] = 'DOCKER_USERNAME'
                    elif 'PASSWORD' in secret:
                        suggestions[secret] = 'DOCKER_PASSWORD'
                    else:
                        suggestions[secret] = 'DOCKER_CREDENTIALS'
                else:
                    # Generar nombre corto basado en el contenido
                    short_name = re.sub(r'[^A-Z]', '', secret)[:20]
                    suggestions[secret] = f"SECRET_{short_name}"
                    
        return suggestions
    
    def generate_report(self, workflows: Dict[str, List[str]]) -> str:
        """Genera un reporte completo de la auditoría"""
        report = []
        report.append("# 🔐 AUDITORÍA DE SECRETOS - GITHUB ACTIONS")
        report.append("")
        report.append(f"📊 **Total de workflows analizados:** {len(workflows)}")
        report.append("")
        
        all_secrets = set()
        for secrets in workflows.values():
            all_secrets.update(secrets)
            
        report.append(f"🔑 **Total de secretos únicos encontrados:** {len(all_secrets)}")
        report.append("")
        
        # Análisis por workflow
        report.append("## 📋 ANÁLISIS POR WORKFLOW")
        report.append("")
        
        for workflow, secrets in workflows.items():
            report.append(f"### 🔧 {workflow}")
            if secrets:
                for secret in sorted(secrets):
                    status = "✅" if len(secret) <= 50 else "⚠️"
                    report.append(f"- {status} `{secret}`")
            else:
                report.append("- ✅ No se encontraron secretos")
            report.append("")
        
        # Secretos problemáticos
        long_secrets = [s for s in all_secrets if len(s) > 50]
        if long_secrets:
            report.append("## ⚠️ SECRETOS PROBLEMÁTICOS (Muy largos)")
            report.append("")
            suggestions = self.suggest_secure_names(long_secrets)
            
            for secret in sorted(long_secrets):
                suggested = suggestions.get(secret, "NOMBRE_CORTO")
                report.append(f"### 🔄 `{secret}`")
                report.append(f"**Sugerencia:** `{suggested}`")
                report.append(f"**Longitud:** {len(secret)} caracteres")
                report.append("")
        
        # Comandos para configurar secretos
        report.append("## 🛠️ COMANDOS PARA CONFIGURAR SECRETOS")
        report.append("")
        report.append("### Usando GitHub CLI:")
        report.append("```bash")
        
        for secret in sorted(all_secrets):
            if secret.startswith('ENV_'):
                continue  # Variables de entorno no necesitan ser secretos
            if secret in ['GITHUB_TOKEN', 'github.actor', 'github.repository', 'github.sha']:
                continue  # Variables del contexto de GitHub
                
            report.append(f"# Configurar {secret}")
            report.append(f"gh secret set {secret} --body \"TU_VALOR_AQUI\"")
            report.append("")
        
        report.append("```")
        report.append("")
        
        # Recomendaciones de seguridad
        report.append("## 🛡️ RECOMENDACIONES DE SEGURIDAD")
        report.append("")
        report.append("1. **Rotación regular:** Cambia los secretos cada 90 días")
        report.append("2. **Principio de mínimo privilegio:** Usa solo los permisos necesarios")
        report.append("3. **Auditoría:** Revisa regularmente qué workflows usan cada secreto")
        report.append("4. **Nombres descriptivos:** Usa nombres que indiquen claramente el propósito")
        report.append("5. **Separación de entornos:** Usa diferentes secretos para dev/staging/prod")
        report.append("")
        
        return "\n".join(report)
    
    def update_workflow_names(self, workflows: Dict[str, List[str]]) -> None:
        """Actualiza los nombres de secretos en los workflows"""
        suggestions = self.suggest_secure_names([s for secrets in workflows.values() for s in secrets])
        
        if not suggestions:
            print("✅ No hay secretos que necesiten renombrarse")
            return
            
        for yaml_file in self.workflows_dir.glob("*.yml"):
            if yaml_file.name.endswith('.backup'):
                continue
                
            try:
                with open(yaml_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original_content = content
                updated = False
                
                for old_name, new_name in suggestions.items():
                    if old_name in content:
                        # Reemplazar en el contexto de secrets.
                        replacement = f'${{{{ secrets.{new_name} }}}}'
                        content = re.sub(
                            rf'\$\{{\{{\s*secrets\.{re.escape(old_name)}\s*\}\}}',
                            replacement,
                            content
                        )
                        updated = True
                        print(f"🔄 {yaml_file.name}: {old_name} → {new_name}")
                
                if updated:
                    # Crear backup
                    backup_file = yaml_file.with_suffix('.yml.backup')
                    with open(backup_file, 'w', encoding='utf-8') as f:
                        f.write(original_content)
                    
                    # Escribir archivo actualizado
                    with open(yaml_file, 'w', encoding='utf-8') as f:
                        f.write(content)
                        
                    print(f"✅ {yaml_file.name} actualizado (backup creado)")
                    
            except Exception as e:
                print(f"❌ Error actualizando {yaml_file}: {e}")

def main():
    print("🔐 Iniciando auditoría de secretos en workflows GitHub Actions...")
    print("")
    
    auditor = SecretsAuditor()
    workflows = auditor.scan_workflows()
    
    if not workflows:
        print("❌ No se encontraron workflows para analizar")
        return
    
    # Generar reporte
    report = auditor.generate_report(workflows)
    
    # Guardar reporte
    with open('SECRETS_AUDIT_REPORT.md', 'w', encoding='utf-8') as f:
        f.write(report)
    
    print("✅ Reporte generado: SECRETS_AUDIT_REPORT.md")
    print("")
    
    # Preguntar si actualizar nombres
    response = input("¿Deseas actualizar automáticamente los nombres de secretos largos? (s/n): ")
    if response.lower() in ['s', 'si', 'sí', 'y', 'yes']:
        auditor.update_workflow_names(workflows)
        print("✅ Actualización completada")
    else:
        print("ℹ️  No se realizaron cambios automáticos")

if __name__ == "__main__":
    main() 