"""
Utilidades para cargar variables de entorno de forma segura.

Este módulo proporciona funciones para cargar y validar variables de entorno
de manera consistente en todo el proyecto.
"""

import os
import logging
from typing import Any, Optional, Union, List
from pathlib import Path
from dotenv import load_dotenv

logger = logging.getLogger(__name__)


def load_env_file(env_file: str = ".env") -> bool:
    """
    Cargar archivo de variables de entorno.
    
    Args:
        env_file: Ruta al archivo .env
        
    Returns:
        True si se cargó exitosamente, False en caso contrario
    """
    env_path = Path(env_file)
    
    if not env_path.exists():
        logger.warning(f"Archivo de variables de entorno no encontrado: {env_file}")
        return False
    
    try:
        load_dotenv(env_path)
        logger.info(f"Variables de entorno cargadas desde: {env_path}")
        return True
    except Exception as e:
        logger.error(f"Error al cargar variables de entorno: {e}")
        return False


def get_env_var(
    key: str, 
    default: Any = None, 
    required: bool = False,
    var_type: type = str
) -> Any:
    """
    Obtener variable de entorno con validación de tipo.
    
    Args:
        key: Nombre de la variable de entorno
        default: Valor por defecto si no existe
        required: Si es True, lanza excepción si no existe
        var_type: Tipo esperado de la variable
        
    Returns:
        Valor de la variable de entorno convertido al tipo especificado
        
    Raises:
        ValueError: Si la variable es requerida pero no existe
        TypeError: Si no se puede convertir al tipo especificado
    """
    value = os.getenv(key)
    
    if value is None:
        if required:
            raise ValueError(f"Variable de entorno requerida no encontrada: {key}")
        return default
    
    # Convertir tipo
    try:
        if var_type == bool:
            return value.lower() in ("true", "1", "yes", "on")
        elif var_type == int:
            return int(value)
        elif var_type == float:
            return float(value)
        elif var_type == list:
            return [item.strip() for item in value.split(",") if item.strip()]
        else:
            return var_type(value)
    except (ValueError, TypeError) as e:
        raise TypeError(f"No se puede convertir '{value}' a {var_type.__name__} para la variable {key}: {e}")


def get_database_config() -> dict:
    """
    Obtener configuración de base de datos desde variables de entorno.
    
    Returns:
        Diccionario con la configuración de base de datos
    """
    return {
        "url": get_env_var("DATABASE_URL"),
        "host": get_env_var("DATABASE_HOST", "localhost"),
        "port": get_env_var("DATABASE_PORT", 5432, var_type=int),
        "name": get_env_var("DATABASE_NAME", "dronevision"),
        "user": get_env_var("DATABASE_USER"),
        "password": get_env_var("DATABASE_PASSWORD"),
        "sqlite_path": get_env_var("SQLITE_DATABASE_PATH", "./data/database.db")
    }


def get_email_config() -> dict:
    """
    Obtener configuración de email desde variables de entorno.
    
    Returns:
        Diccionario con la configuración de email
    """
    return {
        "host": get_env_var("EMAIL_HOST", "smtp.gmail.com"),
        "port": get_env_var("EMAIL_PORT", 587, var_type=int),
        "user": get_env_var("EMAIL_USER"),
        "password": get_env_var("EMAIL_PASSWORD"),
        "use_tls": get_env_var("EMAIL_USE_TLS", True, var_type=bool),
        "from": get_env_var("EMAIL_FROM")
    }


def get_whatsapp_config() -> dict:
    """
    Obtener configuración de WhatsApp desde variables de entorno.
    
    Returns:
        Diccionario con la configuración de WhatsApp
    """
    return {
        "access_token": get_env_var("CLOUD_API_ACCESS_TOKEN"),
        "phone_number_id": get_env_var("WA_PHONE_NUMBER_ID"),
        "recipient_number": get_env_var("RECIPIENT_NUMBER", "528998733022"),
        "api_version": get_env_var("CLOUD_API_VERSION", "v22.0")
    }


def get_api_config() -> dict:
    """
    Obtener configuración de API desde variables de entorno.
    
    Returns:
        Diccionario con la configuración de API
    """
    return {
        "key": get_env_var("API_KEY"),
        "secret": get_env_var("API_SECRET"),
        "base_url": get_env_var("API_BASE_URL"),
        "timeout": get_env_var("NETWORK_TIMEOUT", 30, var_type=int),
        "retry_attempts": get_env_var("NETWORK_RETRY_ATTEMPTS", 3, var_type=int)
    }


def get_dronevision_config() -> dict:
    """
    Obtener configuración específica de DroneVision desde variables de entorno.
    
    Returns:
        Diccionario con la configuración de DroneVision
    """
    return {
        "debug": get_env_var("DRONEVISION_DEBUG", False, var_type=bool),
        "log_level": get_env_var("DRONEVISION_LOG_LEVEL", "INFO"),
        "device": get_env_var("DRONEVISION_DEVICE", "auto"),
        "workers": get_env_var("DRONEVISION_WORKERS", 8, var_type=int),
        "batch_size": get_env_var("DRONEVISION_BATCH_SIZE", 16, var_type=int),
        "memory_limit": get_env_var("DRONEVISION_MEMORY_LIMIT", "8GB"),
        "visdrone_model_path": get_env_var("VISDRONE_MODEL_PATH", "models/visdrone_yolov8.pt"),
        "uavdt_model_path": get_env_var("UAVDT_MODEL_PATH", "models/uavdt_yolov8.pt"),
        "agriculture_model_path": get_env_var("AGRICULTURE_MODEL_PATH", "models/ai4agriculture_yolov8-seg.pt"),
        "detection_confidence": get_env_var("DETECTION_CONFIDENCE", 0.5, var_type=float),
        "detection_iou_threshold": get_env_var("DETECTION_IOU_THRESHOLD", 0.45, var_type=float),
        "detection_max_detections": get_env_var("DETECTION_MAX_DETECTIONS", 10, var_type=int)
    }


def get_redis_config() -> dict:
    """
    Obtener configuración de Redis desde variables de entorno.
    
    Returns:
        Diccionario con la configuración de Redis
    """
    return {
        "url": get_env_var("REDIS_URL", "redis://localhost:6379/0"),
        "host": get_env_var("REDIS_HOST", "localhost"),
        "port": get_env_var("REDIS_PORT", 6379, var_type=int),
        "db": get_env_var("REDIS_DB", 0, var_type=int),
        "password": get_env_var("REDIS_PASSWORD")
    }


def get_aws_config() -> dict:
    """
    Obtener configuración de AWS desde variables de entorno.
    
    Returns:
        Diccionario con la configuración de AWS
    """
    return {
        "access_key_id": get_env_var("AWS_ACCESS_KEY_ID"),
        "secret_access_key": get_env_var("AWS_SECRET_ACCESS_KEY"),
        "region": get_env_var("AWS_REGION", "us-east-1"),
        "s3_bucket": get_env_var("AWS_S3_BUCKET")
    }


def get_security_config() -> dict:
    """
    Obtener configuración de seguridad desde variables de entorno.
    
    Returns:
        Diccionario con la configuración de seguridad
    """
    return {
        "secret_key": get_env_var("SECRET_KEY", required=True),
        "encrypt_results": get_env_var("ENCRYPT_RESULTS", False, var_type=bool),
        "password_protect": get_env_var("PASSWORD_PROTECT", False, var_type=bool),
        "allowed_hosts": get_env_var("ALLOWED_HOSTS", "localhost,127.0.0.1", var_type=list),
        "cors_origins": get_env_var("CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000", var_type=list)
    }


def validate_required_vars(required_vars: List[str]) -> bool:
    """
    Validar que las variables de entorno requeridas estén presentes.
    
    Args:
        required_vars: Lista de variables de entorno requeridas
        
    Returns:
        True si todas las variables están presentes, False en caso contrario
    """
    missing_vars = []
    
    for var in required_vars:
        if not os.getenv(var):
            missing_vars.append(var)
    
    if missing_vars:
        logger.error(f"Variables de entorno requeridas faltantes: {missing_vars}")
        return False
    
    return True


def print_env_status() -> None:
    """
    Imprimir estado de las variables de entorno cargadas.
    """
    logger.info("=== ESTADO DE VARIABLES DE ENTORNO ===")
    
    # Variables críticas
    critical_vars = [
        "SECRET_KEY", "APP_NAME", "ENVIRONMENT", "DEBUG"
    ]
    
    for var in critical_vars:
        value = os.getenv(var)
        if value:
            # Ocultar valores sensibles
            if "SECRET" in var or "PASSWORD" in var or "KEY" in var:
                display_value = "***" if value else "No definida"
            else:
                display_value = value
            logger.info(f"  {var}: {display_value}")
        else:
            logger.warning(f"  {var}: No definida")


# Cargar variables de entorno al importar el módulo
load_env_file()


if __name__ == "__main__":
    # Ejemplo de uso
    setup_logging = __import__("src.utils.helpers", fromlist=["setup_logging"]).setup_logging
    setup_logging("INFO")
    
    print_env_status()
    
    # Ejemplo de obtener configuraciones
    try:
        db_config = get_database_config()
        logger.info(f"Configuración de base de datos: {db_config}")
        
        whatsapp_config = get_whatsapp_config()
        logger.info(f"Configuración de WhatsApp: {whatsapp_config}")
        
    except Exception as e:
        logger.error(f"Error al cargar configuraciones: {e}")
