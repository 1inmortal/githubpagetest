#!/usr/bin/env python3
"""
Script para listar archivos Python del proyecto
Excluye archivos del entorno virtual y otros directorios innecesarios
"""

import os
from pathlib import Path

def is_project_file(file_path: Path) -> bool:
    """Verifica si un archivo es parte del proyecto (no del entorno virtual)"""
    # Excluir directorios del entorno virtual
    exclude_dirs = {
        '.venv', 'venv', 'env', '__pycache__', 'node_modules',
        'build', 'dist', '.git', '.vscode', '.idea'
    }
    
    # Verificar si alguna parte del path está en los directorios excluidos
    for part in file_path.parts:
        if part in exclude_dirs:
            return False
    
    # Excluir archivos de site-packages
    if 'site-packages' in str(file_path):
        return False
    
    # Excluir archivos de Scripts (Windows)
    if 'Scripts' in str(file_path):
        return False
    
    # Excluir archivos de bin (Linux/Mac)
    if 'bin' in str(file_path):
        return False
    
    return True

def list_project_python_files():
    """Lista todos los archivos Python del proyecto"""
    project_root = Path('.')
    python_files = []
    
    print("🔍 Buscando archivos Python del proyecto...")
    print("=" * 50)
    
    for py_file in project_root.rglob("*.py"):
        if is_project_file(py_file):
            python_files.append(py_file)
            print(f"✅ {py_file}")
    
    print("=" * 50)
    print(f"📊 Total de archivos Python del proyecto: {len(python_files)}")
    
    # Listar archivos principales
    print("\n📋 Archivos principales:")
    main_files = [
        'audit-secrets.py',
        'setup.py',
        'verify-codeql-setup.py',
        '__init__.py'
    ]
    
    for main_file in main_files:
        if Path(main_file).exists():
            print(f"  ✅ {main_file}")
        else:
            print(f"  ❌ {main_file} (no encontrado)")
    
    # Listar archivos en Evidencias
    evidencias_files = list(Path('Evidencias').rglob("*.py")) if Path('Evidencias').exists() else []
    if evidencias_files:
        print(f"\n📁 Archivos en Evidencias: {len(evidencias_files)}")
        for file in evidencias_files[:5]:  # Mostrar solo los primeros 5
            print(f"  📄 {file}")
        if len(evidencias_files) > 5:
            print(f"  ... y {len(evidencias_files) - 5} más")
    
    return python_files

if __name__ == "__main__":
    list_project_python_files()
