#!/usr/bin/env python3
"""
Script para encontrar todos los archivos index.* en el repositorio
"""

import os
from pathlib import Path


def find_index_files(root_path="."):
    """Encuentra todos los archivos index.* en el repositorio"""
    root_path = Path(root_path)
    index_files = []

    for root, _, files in os.walk(root_path):
        for file in files:
            if file.lower().startswith("index."):
                file_path = Path(root) / file
                relative_path = file_path.relative_to(root_path)
                file_type = file_path.suffix.lstrip(".")
                index_files.append((str(relative_path), file_type))

    return index_files

def main():
    print("🔍 Buscando archivos index.* en el repositorio...")
    
    index_files = find_index_files()
    
    print(f"\n📁 Archivos index.* encontrados ({len(index_files)}):")
    for file_path, file_type in index_files:
        print(f"   • {file_path} ({file_type})")
    
    # Agrupar por tipo
    by_type = {}
    for file_path, file_type in index_files:
        if file_type not in by_type:
            by_type[file_type] = []
        by_type[file_type].append(file_path)
    
    print(f"\n📊 Resumen por tipo:")
    for file_type, files in by_type.items():
        print(f"   • {file_type}: {len(files)} archivos")

if __name__ == "__main__":
    main()
