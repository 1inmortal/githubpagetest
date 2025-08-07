#!/usr/bin/env python3
"""
Script de verificación para la configuración de CodeQL
Verifica que todos los archivos necesarios estén presentes y correctos
"""

import os
import sys
import yaml
from pathlib import Path

def check_file_exists(file_path: str, description: str) -> bool:
    """Verifica si un archivo existe"""
    if Path(file_path).exists():
        print(f"✅ {description}: {file_path}")
        return True
    else:
        print(f"❌ {description}: {file_path} - NO ENCONTRADO")
        return False

def check_python_files() -> bool:
    """Verifica que existan archivos Python en el repositorio"""
    python_files = list(Path(".").rglob("*.py"))
    if python_files:
        print(f"✅ Archivos Python encontrados: {len(python_files)}")
        for file in python_files[:5]:  # Mostrar solo los primeros 5
            print(f"   - {file}")
        if len(python_files) > 5:
            print(f"   ... y {len(python_files) - 5} más")
        return True
    else:
        print("❌ No se encontraron archivos Python")
        return False

def check_workflow_files() -> bool:
    """Verifica los archivos de workflow de GitHub Actions"""
    workflow_files = [
        (".github/workflows/codeql.yml", "Workflow de CodeQL"),
        (".github/codeql/codeql-config.yml", "Configuración de CodeQL"),
        (".github/workflows/sitemap.yml", "Workflow de Sitemap"),
        (".github/workflows/static-site-deploy.yml", "Workflow de Deploy"),
    ]
    
    all_exist = True
    for file_path, description in workflow_files:
        if not check_file_exists(file_path, description):
            all_exist = False
    
    return all_exist

def check_python_config_files() -> bool:
    """Verifica los archivos de configuración de Python"""
    config_files = [
        ("requirements.txt", "Dependencias de Python"),
        ("pyproject.toml", "Configuración moderna de Python"),
        ("setup.py", "Configuración de instalación"),
        (".python-version", "Versión de Python"),
        ("__init__.py", "Archivo de inicialización"),
    ]
    
    all_exist = True
    for file_path, description in config_files:
        if not check_file_exists(file_path, description):
            all_exist = False
    
    return all_exist

def check_gitignore() -> bool:
    """Verifica que .gitignore no excluya archivos Python importantes"""
    gitignore_path = Path(".gitignore")
    if not gitignore_path.exists():
        print("❌ Archivo .gitignore no encontrado")
        return False
    
    with open(gitignore_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Verificar que no excluya archivos Python importantes
    important_patterns = ["*.py", "requirements.txt", "setup.py", "pyproject.toml"]
    excluded_patterns = []
    
    for pattern in important_patterns:
        # Buscar patrones que excluyan completamente estos archivos
        if pattern == "*.py" and "*.py[cod]" in content:
            # *.py[cod] es normal, no excluye todos los .py
            continue
        elif pattern == "*.py" and "*.py,cover" in content:
            # *.py,cover es normal, no excluye todos los .py
            continue
        elif pattern in content:
            excluded_patterns.append(pattern)
    
    if excluded_patterns:
        print(f"⚠️  Patrones importantes excluidos en .gitignore: {excluded_patterns}")
        return False
    else:
        print("✅ .gitignore no excluye archivos Python importantes")
        return True

def check_yaml_syntax() -> bool:
    """Verifica la sintaxis YAML de los archivos de configuración"""
    yaml_files = [
        ".github/workflows/codeql.yml",
        ".github/codeql/codeql-config.yml",
        ".github/workflows/sitemap.yml",
        ".github/workflows/static-site-deploy.yml",
    ]
    
    all_valid = True
    for file_path in yaml_files:
        if Path(file_path).exists():
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    yaml.safe_load(f)
                print(f"✅ Sintaxis YAML válida: {file_path}")
            except yaml.YAMLError as e:
                print(f"❌ Error de sintaxis YAML en {file_path}: {e}")
                all_valid = False
        else:
            print(f"⚠️  Archivo YAML no encontrado: {file_path}")
            all_valid = False
    
    return all_valid

def main():
    """Función principal de verificación"""
    print("🔍 Verificando configuración de CodeQL...\n")
    
    checks = [
        ("Archivos Python", check_python_files),
        ("Archivos de Workflow", check_workflow_files),
        ("Configuración de Python", check_python_config_files),
        ("Configuración de .gitignore", check_gitignore),
        ("Sintaxis YAML", check_yaml_syntax),
    ]
    
    results = []
    for description, check_func in checks:
        print(f"\n📋 Verificando {description}:")
        result = check_func()
        results.append((description, result))
    
    print("\n" + "="*50)
    print("📊 RESUMEN DE VERIFICACIÓN")
    print("="*50)
    
    passed = 0
    total = len(results)
    
    for description, result in results:
        status = "✅ PASÓ" if result else "❌ FALLÓ"
        print(f"{status}: {description}")
        if result:
            passed += 1
    
    print(f"\n🎯 Resultado: {passed}/{total} verificaciones pasaron")
    
    if passed == total:
        print("🎉 ¡Todas las verificaciones pasaron! CodeQL debería funcionar correctamente.")
        return 0
    else:
        print("⚠️  Algunas verificaciones fallaron. Revisa los archivos faltantes.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
