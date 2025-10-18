"""
Paquete principal del proyecto Python.

Este paquete contiene toda la lógica de negocio y funcionalidades principales.
"""

__version__ = "1.0.0"
__author__ = "Tu Nombre"
__email__ = "tu.email@ejemplo.com"

# Importar funciones principales para facilitar el uso
from .main import main
from .utils.helpers import setup_logging, load_config

__all__ = [
    "main",
    "setup_logging", 
    "load_config",
]
