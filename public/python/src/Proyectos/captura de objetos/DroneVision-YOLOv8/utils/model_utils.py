"""
Utilidades para gestión de modelos
Incluye gestión de modelos, cálculo de métricas y validación
"""

import os
import json
import torch
import numpy as np
from pathlib import Path
from typing import Dict, List, Optional, Tuple
from ultralytics import YOLO
import yaml

class ModelManager:
    """Gestor de modelos YOLO"""
    
    def __init__(self, models_dir: str = "models"):
        self.models_dir = Path(models_dir)
        self.models_dir.mkdir(exist_ok=True)
        
        self.model_configs = {
            'visdrone': {
                'name': 'visdrone_yolov8.pt',
                'type': 'detect',
                'classes': 10,
                'description': 'Análisis urbano general'
            },
            'uavdt': {
                'name': 'uavdt_yolov8.pt',
                'type': 'detect',
                'classes': 3,
                'description': 'Seguimiento de tráfico'
            },
            'agriculture': {
                'name': 'ai4agriculture_yolov8-seg.pt',
                'type': 'segment',
                'classes': 5,
                'description': 'Monitoreo agrícola'
            }
        }
    
    def list_models(self) -> Dict[str, Dict]:
        """Lista todos los modelos disponibles"""
        available_models = {}
        
        for model_id, config in self.model_configs.items():
            model_path = self.models_dir / config['name']
            available_models[model_id] = {
                **config,
                'path': str(model_path),
                'exists': model_path.exists(),
                'size': model_path.stat().st_size if model_path.exists() else 0
            }
        
        return available_models
    
    def load_model(self, model_id: str) -> Optional[YOLO]:
        """Carga un modelo específico"""
        if model_id not in self.model_configs:
            return None
        
        model_path = self.models_dir / self.model_configs[model_id]['name']
        if not model_path.exists():
            return None
        
        try:
            model = YOLO(str(model_path))
            return model
        except Exception as e:
            print(f"Error al cargar modelo {model_id}: {e}")
            return None
    
    def get_model_info(self, model_id: str) -> Optional[Dict]:
        """Obtiene información detallada de un modelo"""
        if model_id not in self.model_configs:
            return None
        
        model_path = self.models_dir / self.model_configs[model_id]['name']
        if not model_path.exists():
            return None
        
        try:
            model = YOLO(str(model_path))
            info = {
                'id': model_id,
                'name': self.model_configs[model_id]['name'],
                'type': self.model_configs[model_id]['type'],
                'classes': self.model_configs[model_id]['classes'],
                'description': self.model_configs[model_id]['description'],
                'path': str(model_path),
                'size': model_path.stat().st_size,
                'model_info': {
                    'names': model.names,
                    'nc': model.model[-1].nc if hasattr(model.model, '__getitem__') else None
                }
            }
            return info
        except Exception as e:
            print(f"Error al obtener información del modelo {model_id}: {e}")
            return None
    
    def validate_model(self, model_id: str, test_data: str) -> Dict:
        """Valida un modelo con datos de prueba"""
        model = self.load_model(model_id)
        if not model:
            return {'valid': False, 'error': 'Modelo no encontrado'}
        
        try:
            # Probar predicción
            results = model.predict(test_data, verbose=False)
            
            return {
                'valid': True,
                'predictions': len(results),
                'message': 'Modelo validado exitosamente'
            }
        except Exception as e:
            return {'valid': False, 'error': f'Error en validación: {e}'}

class MetricsCalculator:
    """Calculadora de métricas para modelos"""
    
    def __init__(self):
        self.metrics = {}
    
    def calculate_detection_metrics(self, results) -> Dict:
        """Calcula métricas de detección"""
        if not results:
            return {}
        
        total_detections = 0
        class_counts = {}
        confidence_scores = []
        
        for result in results:
            if result.boxes is not None:
                for box in result.boxes:
                    class_id = int(box.cls[0])
                    class_name = result.names[class_id]
                    confidence = float(box.conf[0])
                    
                    total_detections += 1
                    class_counts[class_name] = class_counts.get(class_name, 0) + 1
                    confidence_scores.append(confidence)
        
        metrics = {
            'total_detections': total_detections,
            'class_counts': class_counts,
            'avg_confidence': np.mean(confidence_scores) if confidence_scores else 0,
            'min_confidence': np.min(confidence_scores) if confidence_scores else 0,
            'max_confidence': np.max(confidence_scores) if confidence_scores else 0
        }
        
        return metrics
    
    def calculate_tracking_metrics(self, results) -> Dict:
        """Calcula métricas de tracking"""
        if not results:
            return {}
        
        unique_tracks = set()
        track_lengths = {}
        class_tracks = {}
        
        for result in results:
            if result.boxes is not None and result.boxes.id is not None:
                for i, track_id in enumerate(result.boxes.id):
                    track_id = int(track_id)
                    class_id = int(result.boxes.cls[i])
                    class_name = result.names[class_id]
                    
                    unique_tracks.add(track_id)
                    
                    if track_id not in track_lengths:
                        track_lengths[track_id] = 0
                        class_tracks[track_id] = class_name
                    
                    track_lengths[track_id] += 1
        
        metrics = {
            'unique_tracks': len(unique_tracks),
            'avg_track_length': np.mean(list(track_lengths.values())) if track_lengths else 0,
            'max_track_length': np.max(list(track_lengths.values())) if track_lengths else 0,
            'min_track_length': np.min(list(track_lengths.values())) if track_lengths else 0,
            'track_lengths': track_lengths,
            'class_tracks': class_tracks
        }
        
        return metrics
    
    def calculate_segmentation_metrics(self, results) -> Dict:
        """Calcula métricas de segmentación"""
        if not results:
            return {}
        
        total_masks = 0
        class_masks = {}
        mask_areas = []
        
        for result in results:
            if result.masks is not None:
                for mask in result.masks:
                    class_id = int(mask.cls[0])
                    class_name = result.names[class_id]
                    
                    total_masks += 1
                    class_masks[class_name] = class_masks.get(class_name, 0) + 1
                    
                    # Calcular área de la máscara
                    mask_area = np.sum(mask.data[0].cpu().numpy())
                    mask_areas.append(mask_area)
        
        metrics = {
            'total_masks': total_masks,
            'class_masks': class_masks,
            'avg_mask_area': np.mean(mask_areas) if mask_areas else 0,
            'total_pixel_area': np.sum(mask_areas) if mask_areas else 0,
            'mask_areas': mask_areas
        }
        
        return metrics
    
    def calculate_performance_metrics(self, results, processing_time: float) -> Dict:
        """Calcula métricas de rendimiento"""
        if not results:
            return {}
        
        total_frames = len(results)
        fps = total_frames / processing_time if processing_time > 0 else 0
        
        metrics = {
            'total_frames': total_frames,
            'processing_time': processing_time,
            'fps': fps,
            'avg_time_per_frame': processing_time / total_frames if total_frames > 0 else 0
        }
        
        return metrics

class ModelValidator:
    """Validador de modelos"""
    
    def __init__(self):
        self.validation_criteria = {
            'visdrone': {
                'min_confidence': 0.5,
                'min_detections': 1,
                'expected_classes': ['person', 'car', 'bus', 'truck']
            },
            'uavdt': {
                'min_confidence': 0.6,
                'min_detections': 1,
                'expected_classes': ['car', 'bus', 'truck']
            },
            'agriculture': {
                'min_confidence': 0.4,
                'min_detections': 1,
                'expected_classes': ['vegetation', 'soil', 'water', 'crop', 'pest']
            }
        }
    
    def validate_model_output(self, model_id: str, results) -> Dict:
        """Valida la salida de un modelo"""
        if model_id not in self.validation_criteria:
            return {'valid': False, 'error': 'Modelo no reconocido'}
        
        criteria = self.validation_criteria[model_id]
        calculator = MetricsCalculator()
        
        # Calcular métricas según el tipo de modelo
        if model_id == 'agriculture':
            metrics = calculator.calculate_segmentation_metrics(results)
        elif model_id == 'uavdt':
            metrics = calculator.calculate_tracking_metrics(results)
        else:
            metrics = calculator.calculate_detection_metrics(results)
        
        # Validar criterios
        validation_results = {
            'valid': True,
            'metrics': metrics,
            'issues': []
        }
        
        # Verificar confianza mínima
        if 'avg_confidence' in metrics and metrics['avg_confidence'] < criteria['min_confidence']:
            validation_results['issues'].append(f"Confianza promedio muy baja: {metrics['avg_confidence']:.3f}")
        
        # Verificar detecciones mínimas
        if 'total_detections' in metrics and metrics['total_detections'] < criteria['min_detections']:
            validation_results['issues'].append(f"Muy pocas detecciones: {metrics['total_detections']}")
        
        # Verificar clases esperadas
        if 'class_counts' in metrics:
            detected_classes = set(metrics['class_counts'].keys())
            expected_classes = set(criteria['expected_classes'])
            missing_classes = expected_classes - detected_classes
            if missing_classes:
                validation_results['issues'].append(f"Clases no detectadas: {missing_classes}")
        
        if validation_results['issues']:
            validation_results['valid'] = False
        
        return validation_results
