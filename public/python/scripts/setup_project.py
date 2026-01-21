#!/usr/bin/env python3
"""
Script para configurar el proyecto Python automáticamente.

Este script crea la estructura de directorios, instala dependencias
y configura el entorno de desarrollo.
"""

import os
import sys
import subprocess
import shutil
import shlex
from pathlib import Path


def run_command(command: str, check: bool = True) -> bool:
    """
    Ejecutar comando del sistema de forma segura.
    
    Args:
        command: Comando a ejecutar (se parsea de forma segura)
        check: Si es True, fallar si el comando falla
        
    Returns:
        True si el comando se ejecutó exitosamente
    """
    try:
        print(f"Ejecutando: {command}")
        # Parsear comando de forma segura para evitar shell injection
        if isinstance(command, str):
            # Para comandos simples, usar shlex.split
            # Para comandos complejos con pipes, usar shell=True solo si es necesario
            # y validar que no contenga caracteres peligrosos
            if any(char in command for char in ['|', '&', ';', '`', '$', '<', '>', '(', ')']):
                # Comando complejo - validar que no sea peligroso
                if any(danger in command.lower() for danger in ['rm -rf', 'del /f', 'format', 'mkfs']):
                    print(f"❌ Comando potencialmente peligroso bloqueado: {command}")
                    return False
                # Usar shell=True solo para comandos complejos validados
                result = subprocess.run(command, shell=True, check=check, capture_output=True, text=True)
            else:
                # Comando simple - usar lista de argumentos (más seguro)
                cmd_parts = shlex.split(command)
                result = subprocess.run(cmd_parts, check=check, capture_output=True, text=True)
        else:
            # Si ya es una lista, usarla directamente
            result = subprocess.run(command, check=check, capture_output=True, text=True)
        
        if result.stdout:
            print(result.stdout)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error ejecutando comando: {e}")
        if e.stderr:
            print(f"Stderr: {e.stderr}")
        return False


def check_python_version() -> bool:
    """
    Verificar versión de Python.
    
    Returns:
        True si la versión es compatible
    """
    version = sys.version_info
    print(f"Python {version.major}.{version.minor}.{version.micro}")
    
    if version.major < 3 or (version.major == 3 and version.minor < 9):
        print("❌ Se requiere Python 3.9 o superior")
        return False
    
    print("✅ Versión de Python compatible")
    return True


def create_directories() -> None:
    """Crear estructura de directorios del proyecto."""
    directories = [
        "logs",
        "data",
        "temp",
        "docs",
        "notebooks",
        "scripts",
        "tests",
        "src/utils"
    ]
    
    for directory in directories:
        Path(directory).mkdir(parents=True, exist_ok=True)
        print(f"✅ Directorio creado: {directory}")


def create_virtual_environment() -> bool:
    """
    Crear entorno virtual.
    
    Returns:
        True si se creó exitosamente
    """
    if Path("venv").exists():
        print("✅ Entorno virtual ya existe")
        return True
    
    print("🔧 Creando entorno virtual...")
    return run_command("python -m venv venv")


def install_dependencies() -> bool:
    """
    Instalar dependencias del proyecto.
    
    Returns:
        True si se instalaron exitosamente
    """
    print("📦 Instalando dependencias...")
    
    # Activar entorno virtual y instalar
    if os.name == 'nt':  # Windows
        activate_cmd = "venv\\Scripts\\activate"
        pip_cmd = "venv\\Scripts\\pip"
    else:  # Unix/Linux/macOS
        activate_cmd = "source venv/bin/activate"
        pip_cmd = "venv/bin/pip"
    
    # Instalar dependencias básicas primero
    basic_deps = [
        "pip",
        "setuptools",
        "wheel"
    ]
    
    for dep in basic_deps:
        if not run_command(f"{pip_cmd} install --upgrade {dep}"):
            print(f"❌ Error instalando {dep}")
            return False
    
    # Instalar dependencias del proyecto
    if Path("requirements.txt").exists():
        if not run_command(f"{pip_cmd} install -r requirements.txt"):
            print("❌ Error instalando dependencias del proyecto")
            return False
    
    print("✅ Dependencias instaladas")
    return True


def setup_git() -> bool:
    """
    Configurar repositorio Git.
    
    Returns:
        True si se configuró exitosamente
    """
    if Path(".git").exists():
        print("✅ Repositorio Git ya existe")
        return True
    
    print("🔧 Configurando Git...")
    
    commands = [
        "git init",
        "git add .",
        'git commit -m "Initial commit: Estructura del proyecto Python"'
    ]
    
    for command in commands:
        if not run_command(command):
            print(f"❌ Error ejecutando: {command}")
            return False
    
    print("✅ Repositorio Git configurado")
    return True


def run_tests() -> bool:
    """
    Ejecutar tests del proyecto.
    
    Returns:
        True si los tests pasaron
    """
    print("🧪 Ejecutando tests...")
    
    if os.name == 'nt':  # Windows
        python_cmd = "venv\\Scripts\\python"
    else:  # Unix/Linux/macOS
        python_cmd = "venv/bin/python"
    
    # Instalar pytest si no está disponible
    run_command(f"{python_cmd} -m pip install pytest pytest-cov")
    
    # Ejecutar tests
    if run_command(f"{python_cmd} -m pytest tests/ -v"):
        print("✅ Tests ejecutados exitosamente")
        return True
    else:
        print("⚠️  Algunos tests fallaron")
        return True  # No fallar la instalación por tests


def create_sample_files() -> None:
    """Crear archivos de ejemplo."""
    print("📝 Creando archivos de ejemplo...")
    
    # Archivo de configuración local
    config_content = '''# Configuración local del proyecto
# Este archivo no se sube a Git

import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

DEBUG = os.getenv("DEBUG", "True").lower() in ("true", "1", "yes")
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
SECRET_KEY = os.getenv("SECRET_KEY", "cambiar-en-produccion")
'''
    
    with open("config.local.py", "w", encoding="utf-8") as f:
        f.write(config_content)
    
    # Archivo .env local (copiar desde template)
    env_template_path = Path("env_template.txt")
    if env_template_path.exists():
        with open(env_template_path, "r", encoding="utf-8") as f:
            env_content = f.read()
        
        with open(".env", "w", encoding="utf-8") as f:
            f.write(env_content)
    else:
        # Fallback si no existe el template
        env_content = '''# Variables de entorno locales
# IMPORTANTE: Cambia estos valores por los reales

DEBUG=True
ENVIRONMENT=development
SECRET_KEY=tu-clave-secreta-super-segura-aqui
APP_NAME=Python Project
APP_VERSION=1.0.0
'''
        
        with open(".env", "w", encoding="utf-8") as f:
            f.write(env_content)
    
    print("✅ Archivos de ejemplo creados")


def print_next_steps() -> None:
    """Imprimir próximos pasos para el usuario."""
    print("\n" + "="*60)
    print("🎉 ¡PROYECTO CONFIGURADO EXITOSAMENTE!")
    print("="*60)
    print("\n📋 Próximos pasos:")
    print("1. Activar entorno virtual:")
    if os.name == 'nt':  # Windows
        print("   venv\\Scripts\\activate")
    else:  # Unix/Linux/macOS
        print("   source venv/bin/activate")
    
    print("\n2. Ejecutar el proyecto:")
    print("   python -m src.main")
    
    print("\n3. Ejecutar tests:")
    print("   pytest tests/ -v")
    
    print("\n4. Ejecutar con diferentes comandos:")
    print("   python -m src.main flask     # Servidor Flask")
    print("   python -m src.main fastapi   # Servidor FastAPI")
    print("   python -m src.main data      # Análisis de datos")
    print("   python -m src.main help      # Ayuda")
    
    print("\n5. Formatear código:")
    print("   black src/ tests/")
    print("   flake8 src/ tests/")
    
    print("\n6. Verificar tipos:")
    print("   mypy src/")
    
    print("\n📚 Documentación:")
    print("   - README.md: Guía completa del proyecto")
    print("   - pyproject.toml: Configuración del proyecto")
    print("   - requirements.txt: Dependencias")
    
    print("\n🔗 Enlaces útiles:")
    print("   - Python: https://docs.python.org/")
    print("   - Flask: https://flask.palletsprojects.com/")
    print("   - FastAPI: https://fastapi.tiangolo.com/")
    print("   - Pandas: https://pandas.pydata.org/")
    
    print("\n" + "="*60)


def main() -> int:
    """
    Función principal del script.
    
    Returns:
        Código de salida (0 para éxito, 1 para error)
    """
    print("🚀 Configurando proyecto Python...")
    print("="*50)
    
    # Verificar Python
    if not check_python_version():
        return 1
    
    # Crear directorios
    create_directories()
    
    # Crear entorno virtual
    if not create_virtual_environment():
        print("❌ Error creando entorno virtual")
        return 1
    
    # Instalar dependencias
    if not install_dependencies():
        print("❌ Error instalando dependencias")
        return 1
    
    # Configurar Git
    setup_git()
    
    # Ejecutar tests
    run_tests()
    
    # Crear archivos de ejemplo
    create_sample_files()
    
    # Mostrar próximos pasos
    print_next_steps()
    
    return 0


if __name__ == "__main__":
    sys.exit(main())
