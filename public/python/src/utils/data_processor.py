"""
Procesador de datos para el proyecto Python.

Este módulo contiene clases y funciones para el procesamiento y análisis de datos.
"""

import logging
from typing import List, Dict, Any, Optional, Union
from pathlib import Path
import json
import csv

logger = logging.getLogger(__name__)


class DataProcessor:
    """
    Clase para procesamiento y manipulación de datos.
    
    Esta clase proporciona métodos para cargar, procesar, transformar
    y exportar datos en diferentes formatos.
    """
    
    def __init__(self, data_dir: Optional[str] = "data"):
        """
        Inicializar el procesador de datos.
        
        Args:
            data_dir: Directorio donde se almacenan los datos
        """
        self.data_dir = Path(data_dir) if data_dir else Path("data")
        self.data_dir.mkdir(exist_ok=True)
        self.processed_data = {}
        
        logger.info(f"DataProcessor inicializado con directorio: {self.data_dir}")
    
    def load_csv(self, filename: str) -> List[Dict[str, Any]]:
        """
        Cargar datos desde archivo CSV.
        
        Args:
            filename: Nombre del archivo CSV a cargar
            
        Returns:
            Lista de diccionarios con los datos del CSV
        """
        file_path = self.data_dir / filename
        
        if not file_path.exists():
            logger.warning(f"Archivo no encontrado: {file_path}")
            return []
        
        try:
            data = []
            with open(file_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    data.append(row)
            
            logger.info(f"CSV cargado exitosamente: {len(data)} filas")
            return data
            
        except Exception as e:
            logger.error(f"Error al cargar CSV {filename}: {e}")
            return []
    
    def save_csv(self, data: List[Dict[str, Any]], filename: str) -> bool:
        """
        Guardar datos en archivo CSV.
        
        Args:
            data: Lista de diccionarios a guardar
            filename: Nombre del archivo CSV de salida
            
        Returns:
            True si se guardó exitosamente, False en caso contrario
        """
        if not data:
            logger.warning("No hay datos para guardar")
            return False
        
        try:
            file_path = self.data_dir / filename
            
            # Obtener las claves del primer diccionario
            fieldnames = list(data[0].keys())
            
            with open(file_path, 'w', newline='', encoding='utf-8') as file:
                writer = csv.DictWriter(file, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(data)
            
            logger.info(f"CSV guardado exitosamente: {file_path}")
            return True
            
        except Exception as e:
            logger.error(f"Error al guardar CSV {filename}: {e}")
            return False
    
    def load_json(self, filename: str) -> Union[List, Dict]:
        """
        Cargar datos desde archivo JSON.
        
        Args:
            filename: Nombre del archivo JSON a cargar
            
        Returns:
            Datos cargados del JSON (lista o diccionario)
        """
        file_path = self.data_dir / filename
        
        if not file_path.exists():
            logger.warning(f"Archivo no encontrado: {file_path}")
            return {}
        
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                data = json.load(file)
            
            logger.info(f"JSON cargado exitosamente: {filename}")
            return data
            
        except Exception as e:
            logger.error(f"Error al cargar JSON {filename}: {e}")
            return {}
    
    def save_json(self, data: Any, filename: str, indent: int = 2) -> bool:
        """
        Guardar datos en archivo JSON.
        
        Args:
            data: Datos a guardar
            filename: Nombre del archivo JSON de salida
            indent: Indentación del JSON (por defecto 2)
            
        Returns:
            True si se guardó exitosamente, False en caso contrario
        """
        try:
            file_path = self.data_dir / filename
            
            with open(file_path, 'w', encoding='utf-8') as file:
                json.dump(data, file, indent=indent, ensure_ascii=False)
            
            logger.info(f"JSON guardado exitosamente: {file_path}")
            return True
            
        except Exception as e:
            logger.error(f"Error al guardar JSON {filename}: {e}")
            return False
    
    def filter_data(self, data: List[Dict[str, Any]], 
                   filters: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        Filtrar datos según criterios específicos.
        
        Args:
            data: Lista de diccionarios a filtrar
            filters: Diccionario con criterios de filtrado
            
        Returns:
            Lista filtrada de diccionarios
        """
        if not filters:
            return data
        
        filtered_data = []
        
        for item in data:
            match = True
            for key, value in filters.items():
                if key not in item or item[key] != value:
                    match = False
                    break
            
            if match:
                filtered_data.append(item)
        
        logger.info(f"Datos filtrados: {len(filtered_data)} de {len(data)} elementos")
        return filtered_data
    
    def sort_data(self, data: List[Dict[str, Any]], 
                  sort_key: str, reverse: bool = False) -> List[Dict[str, Any]]:
        """
        Ordenar datos por una clave específica.
        
        Args:
            data: Lista de diccionarios a ordenar
            sort_key: Clave por la cual ordenar
            reverse: Si es True, ordenar en orden descendente
            
        Returns:
            Lista ordenada de diccionarios
        """
        if not data or sort_key not in data[0]:
            logger.warning(f"No se puede ordenar por la clave: {sort_key}")
            return data
        
        try:
            sorted_data = sorted(data, key=lambda x: x[sort_key], reverse=reverse)
            logger.info(f"Datos ordenados por {sort_key}")
            return sorted_data
            
        except Exception as e:
            logger.error(f"Error al ordenar datos: {e}")
            return data
    
    def aggregate_data(self, data: List[Dict[str, Any]], 
                      group_key: str, agg_key: str, 
                      operation: str = "sum") -> Dict[str, Any]:
        """
        Agregar datos agrupando por una clave y aplicando una operación.
        
        Args:
            data: Lista de diccionarios a agregar
            group_key: Clave para agrupar
            agg_key: Clave para agregar
            operation: Operación a aplicar (sum, count, avg, min, max)
            
        Returns:
            Diccionario con los datos agregados
        """
        if not data:
            return {}
        
        groups = {}
        
        for item in data:
            if group_key not in item or agg_key not in item:
                continue
            
            group_value = item[group_key]
            agg_value = item[agg_key]
            
            if group_value not in groups:
                groups[group_value] = []
            
            try:
                # Convertir a número si es posible
                numeric_value = float(agg_value)
                groups[group_value].append(numeric_value)
            except (ValueError, TypeError):
                # Si no es numérico, solo contar
                groups[group_value].append(agg_value)
        
        # Aplicar operación de agregación
        result = {}
        for group, values in groups.items():
            if operation == "sum":
                result[group] = sum(values)
            elif operation == "count":
                result[group] = len(values)
            elif operation == "avg":
                result[group] = sum(values) / len(values)
            elif operation == "min":
                result[group] = min(values)
            elif operation == "max":
                result[group] = max(values)
            else:
                result[group] = values
        
        logger.info(f"Datos agregados por {group_key} usando {operation}")
        return result
    
    def process_example_data(self) -> str:
        """
        Procesar datos de ejemplo para demostración.
        
        Returns:
            Mensaje de confirmación del procesamiento
        """
        # Crear datos de ejemplo
        sample_data = [
            {"id": 1, "name": "Alice", "age": 25, "city": "Madrid", "salary": 30000},
            {"id": 2, "name": "Bob", "age": 30, "city": "Barcelona", "salary": 35000},
            {"id": 3, "name": "Charlie", "age": 35, "city": "Madrid", "salary": 40000},
            {"id": 4, "name": "Diana", "age": 28, "city": "Valencia", "salary": 32000},
            {"id": 5, "name": "Eve", "age": 32, "city": "Madrid", "salary": 38000},
        ]
        
        # Guardar datos de ejemplo
        self.save_csv(sample_data, "sample_data.csv")
        self.save_json(sample_data, "sample_data.json")
        
        # Procesar los datos
        # Filtrar por ciudad
        madrid_data = self.filter_data(sample_data, {"city": "Madrid"})
        
        # Ordenar por edad
        sorted_by_age = self.sort_data(sample_data, "age", reverse=True)
        
        # Agregar por ciudad
        salary_by_city = self.aggregate_data(sample_data, "city", "salary", "avg")
        
        # Guardar resultados procesados
        self.save_json({
            "madrid_employees": madrid_data,
            "sorted_by_age": sorted_by_age,
            "avg_salary_by_city": salary_by_city
        }, "processed_data.json")
        
        return f"Procesamiento completado: {len(sample_data)} registros procesados"
    
    def get_data_summary(self) -> Dict[str, Any]:
        """
        Obtener resumen de los datos disponibles.
        
        Returns:
            Diccionario con resumen de los datos
        """
        summary = {
            "data_directory": str(self.data_dir),
            "files": [],
            "total_files": 0,
            "file_types": {}
        }
        
        if self.data_dir.exists():
            for file_path in self.data_dir.iterdir():
                if file_path.is_file():
                    summary["files"].append(file_path.name)
                    summary["total_files"] += 1
                    
                    # Contar tipos de archivo
                    file_ext = file_path.suffix.lower()
                    summary["file_types"][file_ext] = summary["file_types"].get(file_ext, 0) + 1
        
        return summary


if __name__ == "__main__":
    # Ejemplo de uso
    import logging
    logging.basicConfig(level=logging.INFO)
    
    processor = DataProcessor()
    result = processor.process_example_data()
    print(result)
    
    summary = processor.get_data_summary()
    print(f"Resumen: {summary}")
