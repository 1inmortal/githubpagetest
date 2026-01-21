#!/usr/bin/env python3
"""
Archivo principal del proyecto Python.

Este módulo contiene la función principal y ejemplos de uso de las funcionalidades.
"""

import sys
import logging
from pathlib import Path
from typing import Optional

from .utils.helpers import setup_logging, load_config
from .utils.data_processor import DataProcessor
from .utils.ml_utils import MLUtils

# Configurar logging
logger = logging.getLogger(__name__)


def main() -> int:
    """
    Función principal del proyecto.
    
    Returns:
        int: Código de salida (0 para éxito, 1 para error)
    """
    try:
        # Configurar logging
        setup_logging()
        logger.info("Iniciando aplicación Python")
        
        # Cargar configuración
        config = load_config()
        logger.info(f"Configuración cargada: {config.get('app_name', 'Python Project')}")
        
        # Ejemplo de procesamiento de datos
        data_processor = DataProcessor()
        result = data_processor.process_example_data()
        logger.info(f"Procesamiento de datos completado: {result}")
        
        # Ejemplo de utilidades de ML
        ml_utils = MLUtils()
        ml_result = ml_utils.example_ml_operation()
        logger.info(f"Operación ML completada: {ml_result}")
        
        logger.info("Aplicación ejecutada exitosamente")
        return 0
        
    except Exception as e:
        logger.error(f"Error en la aplicación: {e}")
        return 1


def run_flask_app() -> None:
    """Ejecutar aplicación Flask de ejemplo."""
    try:
        from flask import Flask, jsonify
        
        app = Flask(__name__)
        
        @app.route('/')
        def home():
            return jsonify({
                'message': '¡Hola desde Python!',
                'status': 'success',
                'version': '1.0.0'
            })
        
        @app.route('/health')
        def health():
            return jsonify({'status': 'healthy'})
        
        logger.info("Iniciando servidor Flask en http://localhost:5000")
        app.run(debug=True, host='0.0.0.0', port=5000)
        
    except ImportError:
        logger.error("Flask no está instalado. Ejecuta: pip install flask")
    except Exception as e:
        logger.error(f"Error al iniciar Flask: {e}")


def run_fastapi_app() -> None:
    """Ejecutar aplicación FastAPI de ejemplo."""
    try:
        import uvicorn
        from fastapi import FastAPI
        
        app = FastAPI(title="Python Project API", version="1.0.0")
        
        @app.get("/")
        async def root():
            return {"message": "¡Hola desde FastAPI!", "version": "1.0.0"}
        
        @app.get("/health")
        async def health():
            return {"status": "healthy"}
        
        logger.info("Iniciando servidor FastAPI en http://localhost:8000")
        uvicorn.run(app, host="0.0.0.0", port=8000)
        
    except ImportError:
        logger.error("FastAPI no está instalado. Ejecuta: pip install fastapi uvicorn")
    except Exception as e:
        logger.error(f"Error al iniciar FastAPI: {e}")


def run_data_analysis() -> None:
    """Ejecutar análisis de datos de ejemplo."""
    try:
        import pandas as pd
        import numpy as np
        
        # Crear datos de ejemplo
        data = pd.DataFrame({
            'x': np.random.randn(100),
            'y': np.random.randn(100),
            'category': np.random.choice(['A', 'B', 'C'], 100)
        })
        
        # Análisis básico
        print("=== ANÁLISIS DE DATOS ===")
        print(f"Forma de los datos: {data.shape}")
        print(f"Columnas: {list(data.columns)}")
        print("\nEstadísticas descriptivas:")
        print(data.describe())
        print(f"\nConteo por categoría:\n{data['category'].value_counts()}")
        
        logger.info("Análisis de datos completado exitosamente")
        
    except ImportError:
        logger.error("Pandas/NumPy no están instalados. Ejecuta: pip install pandas numpy")
    except Exception as e:
        logger.error(f"Error en análisis de datos: {e}")


if __name__ == "__main__":
    # Verificar argumentos de línea de comandos
    if len(sys.argv) > 1:
        command = sys.argv[1].lower()
        
        if command == "flask":
            run_flask_app()
        elif command == "fastapi":
            run_fastapi_app()
        elif command == "data":
            run_data_analysis()
        elif command == "help":
            print("Comandos disponibles:")
            print("  python -m src.main          - Ejecutar función principal")
            print("  python -m src.main flask    - Ejecutar servidor Flask")
            print("  python -m src.main fastapi  - Ejecutar servidor FastAPI")
            print("  python -m src.main data     - Ejecutar análisis de datos")
            print("  python -m src.main help     - Mostrar esta ayuda")
        else:
            print(f"Comando desconocido: {command}")
            print("Usa 'python -m src.main help' para ver comandos disponibles")
    else:
        # Ejecutar función principal
        sys.exit(main())
