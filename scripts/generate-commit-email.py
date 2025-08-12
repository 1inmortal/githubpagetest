#!/usr/bin/env python3
"""
Script para generar correos HTML personalizados de commits
@author INMORTAL_OS
"""

import os
import sys
import subprocess
import re
from datetime import datetime
from pathlib import Path

def get_git_info():
    """Obtener información del último commit"""
    try:
        # Obtener hash del commit
        commit_hash = subprocess.check_output(
            ['git', 'rev-parse', 'HEAD'], 
            text=True, 
            stderr=subprocess.PIPE
        ).strip()
        
        # Obtener mensaje del commit
        commit_message = subprocess.check_output(
            ['git', 'log', '-1', '--pretty=%B'], 
            text=True, 
            stderr=subprocess.PIPE
        ).strip()
        
        # Obtener autor
        author_name = subprocess.check_output(
            ['git', 'log', '-1', '--pretty=%an'], 
            text=True, 
            stderr=subprocess.PIPE
        ).strip()
        
        author_email = subprocess.check_output(
            ['git', 'log', '-1', '--pretty=%ae'], 
            text=True, 
            stderr=subprocess.PIPE
        ).strip()
        
        # Obtener fecha
        commit_date = subprocess.check_output(
            ['git', 'log', '-1', '--pretty=%cd', '--date=format:%d/%m/%Y %H:%M'], 
            text=True, 
            stderr=subprocess.PIPE
        ).strip()
        
        # Obtener rama actual
        branch_name = subprocess.check_output(
            ['git', 'branch', '--show-current'], 
            text=True, 
            stderr=subprocess.PIPE
        ).strip()
        
        # Obtener nombre del repositorio
        repo_name = subprocess.check_output(
            ['git', 'config', '--get', 'remote.origin.url'], 
            text=True, 
            stderr=subprocess.PIPE
        ).strip()
        repo_name = repo_name.split('/')[-1].replace('.git', '')
        
        # Obtener estadísticas del commit
        stats = subprocess.check_output(
            ['git', 'diff', '--stat', 'HEAD~1', 'HEAD'], 
            text=True, 
            stderr=subprocess.PIPE
        )
        
        # Parsear estadísticas
        files_changed = 0
        insertions = 0
        deletions = 0
        
        if stats:
            lines = stats.strip().split('\n')
            if len(lines) >= 2:
                last_line = lines[-1]
                # Formato: " X files changed, Y insertions(+), Z deletions(-)"
                match = re.search(r'(\d+)\s+files?\s+changed', last_line)
                if match:
                    files_changed = int(match.group(1))
                
                match = re.search(r'(\d+)\s+insertions?', last_line)
                if match:
                    insertions = int(match.group(1))
                
                match = re.search(r'(\d+)\s+deletions?', last_line)
                if match:
                    deletions = int(match.group(1))
        
        return {
            'commit_hash': commit_hash[:8],  # Solo los primeros 8 caracteres
            'commit_message': commit_message,
            'author_name': author_name,
            'author_email': author_email,
            'commit_date': commit_date,
            'branch_name': branch_name,
            'repo_name': repo_name,
            'files_changed': files_changed,
            'insertions': insertions,
            'deletions': deletions
        }
        
    except subprocess.CalledProcessError as e:
        print(f"Error obteniendo información de Git: {e}")
        return None

def generate_html_email(git_info):
    """Generar correo HTML personalizado"""
    
    # Leer la plantilla HTML
    template_path = Path(__file__).parent.parent / '.gitmessage.html'
    
    if not template_path.exists():
        print("❌ Plantilla HTML no encontrada")
        return None
    
    with open(template_path, 'r', encoding='utf-8') as f:
        template = f.read()
    
    # Reemplazar variables en la plantilla
    html_content = template
    for key, value in git_info.items():
        placeholder = f"{{{{{key}}}}}"
        html_content = html_content.replace(placeholder, str(value))
    
    return html_content

def save_html_email(html_content, git_info):
    """No guarda el email HTML localmente - solo envío por email"""
    return None

def main():
    """Función principal"""
    print("🚀 Generando correo HTML personalizado del commit...")
    
    # Obtener información del commit
    git_info = get_git_info()
    if not git_info:
        print("❌ No se pudo obtener información del commit")
        sys.exit(1)
    
    print(f"✅ Información obtenida del commit {git_info['commit_hash']}")
    
    # Generar HTML
    html_content = generate_html_email(git_info)
    if not html_content:
        print("❌ No se pudo generar el HTML")
        sys.exit(1)
    
    # No guardar archivo localmente
    save_html_email(html_content, git_info)
    
    print(f"✅ Correo HTML generado (sin guardar localmente)")
    print(f"📧 Hash: {git_info['commit_hash']}")
    print(f"📝 Mensaje: {git_info['commit_message']}")
    print(f"👤 Autor: {git_info['author_name']}")
    print(f"📅 Fecha: {git_info['commit_date']}")
    print(f"🌿 Rama: {git_info['branch_name']}")
    print(f"📊 Archivos: {git_info['files_changed']}, +{git_info['insertions']}, -{git_info['deletions']}")
    
    print("💡 Email enviado directamente a jarmando2965@gmail.com")

if __name__ == "__main__":
    main()
