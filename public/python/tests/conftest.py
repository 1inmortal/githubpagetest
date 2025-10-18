"""
Configuración de pytest y fixtures comunes.

Este archivo contiene la configuración global de pytest y fixtures
que pueden ser utilizados por todos los tests.
"""

import pytest
import tempfile
import shutil
from pathlib import Path
from typing import Generator, Dict, Any, List

from src.utils.helpers import setup_logging
from src.utils.data_processor import DataProcessor
from src.utils.ml_utils import MLUtils


@pytest.fixture(scope="session")
def setup_test_logging():
    """Configurar logging para tests."""
    setup_logging(level="WARNING")  # Reducir ruido en tests


@pytest.fixture
def temp_data_dir() -> Generator[Path, None, None]:
    """
    Crear directorio temporal para datos de test.
    
    Yields:
        Path: Ruta al directorio temporal
        
    Teardown:
        Elimina el directorio temporal después de cada test
    """
    temp_dir = Path(tempfile.mkdtemp())
    yield temp_dir
    
    # Limpiar después del test
    if temp_dir.exists():
        shutil.rmtree(temp_dir)


@pytest.fixture
def sample_data() -> List[Dict[str, Any]]:
    """
    Datos de ejemplo para tests.
    
    Returns:
        Lista de diccionarios con datos de prueba
    """
    return [
        {"id": 1, "name": "Test1", "value": 10, "category": "A"},
        {"id": 2, "name": "Test2", "value": 20, "category": "B"},
        {"id": 3, "name": "Test3", "value": 15, "category": "A"},
        {"id": 4, "name": "Test4", "value": 25, "category": "C"},
        {"id": 5, "name": "Test5", "value": 30, "category": "B"},
    ]


@pytest.fixture
def data_processor(temp_data_dir) -> DataProcessor:
    """
    Instancia de DataProcessor para tests.
    
    Args:
        temp_data_dir: Directorio temporal para datos
        
    Returns:
        DataProcessor: Instancia configurada para tests
    """
    return DataProcessor(str(temp_data_dir))


@pytest.fixture
def ml_utils() -> MLUtils:
    """
    Instancia de MLUtils para tests.
    
    Returns:
        MLUtils: Instancia para tests
    """
    return MLUtils()


@pytest.fixture
def sample_ml_data():
    """
    Datos de ejemplo para tests de ML.
    
    Returns:
        Tupla con (X, y) para tests de ML
    """
    X = [[1.0, 2.0], [2.0, 3.0], [3.0, 4.0], [4.0, 5.0]]
    y = [3.0, 5.0, 7.0, 9.0]
    return X, y


@pytest.fixture(autouse=True)
def setup_test_environment():
    """
    Configurar entorno de test automáticamente.
    
    Esta fixture se ejecuta automáticamente en cada test.
    """
    # Configurar variables de entorno para tests
    import os
    os.environ['TESTING'] = 'True'
    os.environ['ENVIRONMENT'] = 'test'
    
    yield
    
    # Limpiar después del test
    if 'TESTING' in os.environ:
        del os.environ['TESTING']
    if 'ENVIRONMENT' in os.environ:
        del os.environ['ENVIRONMENT']


# Marcadores personalizados para pytest
def pytest_configure(config):
    """Configurar marcadores personalizados de pytest."""
    config.addinivalue_line(
        "markers", "slow: marks tests as slow (deselect with '-m \"not slow\"')"
    )
    config.addinivalue_line(
        "markers", "integration: marks tests as integration tests"
    )
    config.addinivalue_line(
        "markers", "unit: marks tests as unit tests"
    )
    config.addinivalue_line(
        "markers", "data: marks tests related to data processing"
    )
    config.addinivalue_line(
        "markers", "ml: marks tests related to machine learning"
    )
