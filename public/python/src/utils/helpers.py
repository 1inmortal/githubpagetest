"""
Utilidades auxiliares para el proyecto Python.

Este módulo contiene funciones de configuración, logging y otras utilidades comunes.
"""

import os
import json
import logging
from pathlib import Path
from typing import Dict, Any, Optional
from datetime import datetime


def setup_logging(
    level: str = "INFO",
    log_file: Optional[str] = None,
    log_format: str = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
) -> None:
    """
    Configurar el sistema de logging del proyecto.
    
    Args:
        level: Nivel de logging (DEBUG, INFO, WARNING, ERROR, CRITICAL)
        log_file: Archivo donde guardar los logs (opcional)
        log_format: Formato de los mensajes de log
    """
    # Crear directorio de logs si no existe
    if log_file:
        log_path = Path(log_file)
        log_path.parent.mkdir(parents=True, exist_ok=True)
    
    # Configurar logging básico
    logging.basicConfig(
        level=getattr(logging, level.upper()),
        format=log_format,
        handlers=[
            logging.StreamHandler(),  # Log a consola
            logging.FileHandler(log_file) if log_file else logging.NullHandler()
        ]
    )
    
    # Configurar logging para librerías externas
    logging.getLogger("urllib3").setLevel(logging.WARNING)
    logging.getLogger("requests").setLevel(logging.WARNING)
    logging.getLogger("matplotlib").setLevel(logging.WARNING)
    
    logger = logging.getLogger(__name__)
    logger.info(f"Logging configurado con nivel: {level}")


def load_config(config_file: Optional[str] = None) -> Dict[str, Any]:
    """
    Cargar configuración desde archivo o variables de entorno.
    
    Args:
        config_file: Archivo de configuración JSON (opcional)
        
    Returns:
        Diccionario con la configuración cargada
    """
    config = {
        "app_name": os.getenv("APP_NAME", "Python Project"),
        "version": os.getenv("APP_VERSION", "1.0.0"),
        "environment": os.getenv("ENVIRONMENT", "development"),
        "debug": os.getenv("DEBUG", "True").lower() in ("true", "1", "yes"),
        "secret_key": os.getenv("SECRET_KEY", "default-secret-key-change-in-production"),
    }
    
    # Cargar desde archivo si existe
    if config_file and Path(config_file).exists():
        try:
            with open(config_file, 'r', encoding='utf-8') as f:
                file_config = json.load(f)
                config.update(file_config)
        except Exception as e:
            logging.warning(f"No se pudo cargar archivo de configuración: {e}")
    
    # Sobrescribir con variables de entorno
    env_mappings = {
        "APP_NAME": "app_name",
        "APP_VERSION": "version",
        "ENVIRONMENT": "environment",
        "DEBUG": "debug",
        "SECRET_KEY": "secret_key",
        "DATABASE_URL": "database_url",
        "API_KEY": "api_key",
    }
    
    for env_var, config_key in env_mappings.items():
        env_value = os.getenv(env_var)
        if env_value is not None:
            # Convertir tipos básicos
            if config_key == "debug":
                config[config_key] = env_value.lower() in ("true", "1", "yes")
            else:
                config[config_key] = env_value
    
    return config


def create_directories() -> None:
    """Crear directorios necesarios para el proyecto."""
    directories = [
        "logs",
        "data",
        "temp",
        "docs",
        "notebooks",
        "scripts"
    ]
    
    for directory in directories:
        Path(directory).mkdir(exist_ok=True)
        logging.info(f"Directorio creado/verificado: {directory}")


def get_project_root() -> Path:
    """
    Obtener la ruta raíz del proyecto.
    
    Returns:
        Path: Ruta raíz del proyecto
    """
    # Buscar hacia arriba hasta encontrar archivos del proyecto
    current_path = Path.cwd()
    
    while current_path != current_path.parent:
        if (current_path / "pyproject.toml").exists() or \
           (current_path / "requirements.txt").exists():
            return current_path
        current_path = current_path.parent
    
    # Si no se encuentra, usar el directorio actual
    return Path.cwd()


def format_timestamp(timestamp: Optional[datetime] = None) -> str:
    """
    Formatear timestamp en formato legible.
    
    Args:
        timestamp: Timestamp a formatear (usa datetime.now() si es None)
        
    Returns:
        String formateado del timestamp
    """
    if timestamp is None:
        timestamp = datetime.now()
    
    return timestamp.strftime("%Y-%m-%d %H:%M:%S")


def safe_get(dictionary: Dict[str, Any], key: str, default: Any = None) -> Any:
    """
    Obtener valor de diccionario de forma segura.
    
    Args:
        dictionary: Diccionario del cual obtener el valor
        key: Clave a buscar
        default: Valor por defecto si la clave no existe
        
    Returns:
        Valor encontrado o el valor por defecto
    """
    return dictionary.get(key, default)


def validate_email(email: str) -> bool:
    """
    Validar formato básico de email.
    
    Args:
        email: Email a validar
        
    Returns:
        True si el formato es válido, False en caso contrario
    """
    import re
    
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))


def generate_random_string(length: int = 8) -> str:
    """
    Generar string aleatorio.
    
    Args:
        length: Longitud del string a generar
        
    Returns:
        String aleatorio
    """
    import random
    import string
    
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))


if __name__ == "__main__":
    # Ejemplo de uso
    setup_logging("DEBUG")
    config = load_config()
    print(f"Configuración cargada: {config}")
    
    create_directories()
    project_root = get_project_root()
    print(f"Raíz del proyecto: {project_root}")
    
    print(f"Timestamp actual: {format_timestamp()}")
    print(f"String aleatorio: {generate_random_string(10)}")
    print(f"Email válido: {validate_email('test@example.com')}")
