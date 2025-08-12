#!/usr/bin/env python3
"""
Script para enviar correos HTML de commits por email
@author INMORTAL_OS
"""

import os
import sys
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path
import subprocess
import re
from datetime import datetime

# Configuración del email
EMAIL_CONFIG = {
    'sender_email': 'jarmando2965@gmail.com',  # Tu correo Gmail
    'sender_password': '',  # Se configurará con variables de entorno
    'smtp_server': 'smtp.gmail.com',
    'smtp_port': 587,
    'recipient_email': 'jarmando2965@gmail.com'  # Tu correo para recibir
}

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
        files_changed = 0
        insertions = 0
        deletions = 0
        
        try:
            stats = subprocess.check_output(
                ['git', 'diff', '--stat', 'HEAD~1', 'HEAD'], 
                text=True, 
                stderr=subprocess.PIPE
            )
            
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
        except:
            # Si no hay commits anteriores, usar información del working directory
            try:
                status = subprocess.check_output(
                    ['git', 'status', '--porcelain'], 
                    text=True, 
                    stderr=subprocess.PIPE
                )
                files_changed = len([line for line in status.strip().split('\n') if line])
                insertions = 0
                deletions = 0
            except:
                files_changed = 0
                insertions = 0
                deletions = 0
        
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

def send_email(html_content, git_info):
    """Enviar correo HTML por email"""
    
    # Obtener contraseña de aplicación desde variable de entorno
    app_password = os.getenv('GMAIL_APP_PASSWORD')
    if not app_password:
        print("❌ No se encontró la contraseña de aplicación de Gmail")
        print("💡 Configura la variable de entorno GMAIL_APP_PASSWORD")
        print("📖 Guía: https://support.google.com/accounts/answer/185833")
        return False
    
    # Configurar contraseña
    EMAIL_CONFIG['sender_password'] = app_password
    
    try:
        # Crear mensaje
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f"🚀 Commit: {git_info['commit_message'][:50]}..."
        msg['From'] = EMAIL_CONFIG['sender_email']
        msg['To'] = EMAIL_CONFIG['recipient_email']
        
        # Agregar contenido HTML
        html_part = MIMEText(html_content, 'html')
        msg.attach(html_part)
        
        # Conectar y enviar
        context = ssl.create_default_context()
        
        with smtplib.SMTP(EMAIL_CONFIG['smtp_server'], EMAIL_CONFIG['smtp_port']) as server:
            server.starttls(context=context)
            server.login(EMAIL_CONFIG['sender_email'], EMAIL_CONFIG['sender_password'])
            server.send_message(msg)
        
        print(f"✅ Correo enviado exitosamente a {EMAIL_CONFIG['recipient_email']}")
        return True
        
    except Exception as e:
        print(f"❌ Error enviando correo: {e}")
        return False

def save_html_email(html_content, git_info):
    """No guarda el email HTML localmente - solo envío por email"""
    return None

def main():
    """Función principal"""
    print("🚀 Generando y enviando correo HTML del commit...")
    
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
    
    # Enviar por email (sin guardar localmente)
    if send_email(html_content, git_info):
        print("📧 Correo enviado por email exitosamente")
    else:
        print("❌ Error enviando correo por email")
    
    # Mostrar resumen
    print(f"\n📊 Resumen del commit:")
    print(f"📧 Hash: {git_info['commit_hash']}")
    print(f"📝 Mensaje: {git_info['commit_message']}")
    print(f"👤 Autor: {git_info['author_name']}")
    print(f"📅 Fecha: {git_info['commit_date']}")
    print(f"🌿 Rama: {git_info['branch_name']}")
    print(f"📊 Archivos: {git_info['files_changed']}, +{git_info['insertions']}, -{git_info['deletions']}")
    
    print("✅ Email enviado sin guardar archivos locales")

if __name__ == "__main__":
    main()
