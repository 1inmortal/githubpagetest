"""
Utilidades para gestión de configuración
Incluye gestión de archivos de configuración YAML y parámetros del sistema
"""

import os
import yaml
from pathlib import Path
from typing import Dict, Any, Optional
import json

class ConfigManager:
    """Gestor de configuraciones del sistema"""
    
    def __init__(self, config_dir: str = "configs"):
        self.config_dir = Path(config_dir)
        self.config_dir.mkdir(exist_ok=True)
        
        # Configuraciones por defecto
        self.default_configs = {
            'visdrone': {
                'path': './data/visdrone',
                'train': 'images/train',
                'val': 'images/val',
                'test': 'images/test',
                'nc': 10,
                'names': ['person', 'people', 'bicycle', 'car', 'van', 'truck', 
                         'tricycle', 'awning-tricycle', 'bus', 'motor'],
                'imgsz': 640,
                'augment': True,
                'hsv_h': 0.015,
                'hsv_s': 0.7,
                'hsv_v': 0.4,
                'degrees': 0.0,
                'translate': 0.1,
                'scale': 0.5,
                'shear': 0.0,
                'perspective': 0.0,
                'flipud': 0.0,
                'fliplr': 0.5,
                'mosaic': 1.0,
                'mixup': 0.0,
                'copy_paste': 0.0,
                'val_period': 1,
                'save_period': 10
            },
            'uavdt': {
                'path': './data/uavdt',
                'train': 'images/train',
                'val': 'images/val',
                'test': 'images/test',
                'nc': 3,
                'names': ['car', 'bus', 'truck'],
                'imgsz': 640,
                'augment': True,
                'hsv_h': 0.015,
                'hsv_s': 0.7,
                'hsv_v': 0.4,
                'degrees': 0.0,
                'translate': 0.1,
                'scale': 0.5,
                'shear': 0.0,
                'perspective': 0.0,
                'flipud': 0.0,
                'fliplr': 0.5,
                'mosaic': 1.0,
                'mixup': 0.0,
                'copy_paste': 0.0,
                'tracker': 'bytetrack',
                'track_high_thresh': 0.5,
                'track_low_thresh': 0.1,
                'new_track_thresh': 0.6,
                'track_buffer': 30,
                'match_thresh': 0.8,
                'val_period': 1,
                'save_period': 10
            },
            'agriculture': {
                'path': './data/agriculture',
                'train': 'images/train',
                'val': 'images/val',
                'test': 'images/test',
                'nc': 5,
                'names': ['vegetation', 'soil', 'water', 'crop', 'pest'],
                'imgsz': 960,
                'augment': True,
                'hsv_h': 0.02,
                'hsv_s': 0.8,
                'hsv_v': 0.5,
                'degrees': 5.0,
                'translate': 0.1,
                'scale': 0.3,
                'shear': 0.0,
                'perspective': 0.0,
                'flipud': 0.0,
                'fliplr': 0.5,
                'mosaic': 1.0,
                'mixup': 0.0,
                'copy_paste': 0.0,
                'seg_mask_ratio': 4,
                'overlap_mask': True,
                'mask_ratio': 4,
                'val_period': 1,
                'save_period': 10,
                'metrics': ['mIoU', 'pixel_accuracy', 'dice_score']
            }
        }
    
    def load_config(self, config_name: str) -> Optional[Dict[str, Any]]:
        """Carga una configuración desde archivo YAML"""
        config_path = self.config_dir / f"{config_name}.yaml"
        
        if not config_path.exists():
            print(f"Archivo de configuración no encontrado: {config_path}")
            return None
        
        try:
            with open(config_path, 'r', encoding='utf-8') as file:
                config = yaml.safe_load(file)
            return config
        except Exception as e:
            print(f"Error al cargar configuración {config_name}: {e}")
            return None
    
    def save_config(self, config_name: str, config: Dict[str, Any]) -> bool:
        """Guarda una configuración en archivo YAML"""
        config_path = self.config_dir / f"{config_name}.yaml"
        
        try:
            with open(config_path, 'w', encoding='utf-8') as file:
                yaml.dump(config, file, default_flow_style=False, allow_unicode=True)
            return True
        except Exception as e:
            print(f"Error al guardar configuración {config_name}: {e}")
            return False
    
    def create_default_config(self, config_name: str) -> bool:
        """Crea una configuración por defecto"""
        if config_name not in self.default_configs:
            print(f"Configuración por defecto no disponible para: {config_name}")
            return False
        
        config = self.default_configs[config_name]
        return self.save_config(config_name, config)
    
    def update_config(self, config_name: str, updates: Dict[str, Any]) -> bool:
        """Actualiza una configuración existente"""
        config = self.load_config(config_name)
        if config is None:
            return False
        
        # Actualizar configuración
        config.update(updates)
        
        # Guardar configuración actualizada
        return self.save_config(config_name, config)
    
    def validate_config(self, config_name: str) -> Dict[str, Any]:
        """Valida una configuración"""
        config = self.load_config(config_name)
        if config is None:
            return {'valid': False, 'error': 'Configuración no encontrada'}
        
        # Validar campos requeridos
        required_fields = ['path', 'train', 'val', 'nc', 'names']
        missing_fields = [field for field in required_fields if field not in config]
        
        if missing_fields:
            return {
                'valid': False,
                'error': f'Campos faltantes: {missing_fields}'
            }
        
        # Validar tipos de datos
        if not isinstance(config['nc'], int) or config['nc'] <= 0:
            return {
                'valid': False,
                'error': 'nc debe ser un entero positivo'
            }
        
        if not isinstance(config['names'], list) or len(config['names']) != config['nc']:
            return {
                'valid': False,
                'error': 'names debe ser una lista con nc elementos'
            }
        
        # Validar rutas
        data_path = Path(config['path'])
        if not data_path.exists():
            return {
                'valid': False,
                'error': f'Directorio de datos no existe: {data_path}'
            }
        
        return {'valid': True, 'config': config}
    
    def get_training_config(self, config_name: str) -> Dict[str, Any]:
        """Obtiene configuración específica para entrenamiento"""
        config = self.load_config(config_name)
        if config is None:
            return {}
        
        # Configuración base para entrenamiento
        training_config = {
            'data': str(self.config_dir / f"{config_name}.yaml"),
            'epochs': 100,
            'imgsz': config.get('imgsz', 640),
            'batch': 16,
            'device': 0,
            'workers': 8,
            'project': 'runs',
            'name': config_name,
            'exist_ok': True,
            'pretrained': True,
            'optimizer': 'AdamW',
            'lr0': 0.01,
            'lrf': 0.01,
            'momentum': 0.937,
            'weight_decay': 0.0005,
            'warmup_epochs': 3,
            'warmup_momentum': 0.8,
            'warmup_bias_lr': 0.1,
            'box': 7.5,
            'cls': 0.5,
            'dfl': 1.5,
            'pose': 12.0,
            'kobj': 1.0,
            'label_smoothing': 0.0,
            'nbs': 64,
            'overlap_mask': True,
            'mask_ratio': 4,
            'drop_path': 0.0,
            'save': True,
            'save_period': config.get('save_period', 10),
            'cache': False,
            'rect': False,
            'cos_lr': False,
            'close_mosaic': 10,
            'resume': False,
            'amp': True,
            'fraction': 1.0,
            'profile': False,
            'freeze': None,
            'multi_scale': False,
            'single_cls': False,
            'verbose': True,
            'seed': 0,
            'deterministic': True,
            'plots': True,
            'val': True,
            'split': 'val',
            'save_json': False,
            'save_hybrid': False,
            'conf': None,
            'iou': 0.7,
            'max_det': 300,
            'half': False,
            'dnn': False,
            'data_dict': None
        }
        
        # Agregar parámetros específicos de aumentos de datos
        augmentation_params = [
            'hsv_h', 'hsv_s', 'hsv_v', 'degrees', 'translate', 'scale',
            'shear', 'perspective', 'flipud', 'fliplr', 'mosaic', 'mixup', 'copy_paste'
        ]
        
        for param in augmentation_params:
            if param in config:
                training_config[param] = config[param]
        
        # Configurar tipo de tarea
        if config_name == 'agriculture':
            training_config['task'] = 'segment'
        else:
            training_config['task'] = 'detect'
        
        return training_config
    
    def get_prediction_config(self, config_name: str) -> Dict[str, Any]:
        """Obtiene configuración específica para predicción"""
        config = self.load_config(config_name)
        if config is None:
            return {}
        
        # Configuración base para predicción
        prediction_config = {
            'conf': 0.5,
            'iou': 0.45,
            'save': True,
            'save_txt': True,
            'save_conf': True,
            'show': False,
            'verbose': True
        }
        
        # Configuración específica por módulo
        if config_name == 'uavdt':
            prediction_config.update({
                'conf': 0.6,
                'iou': 0.7,
                'tracker': 'bytetrack'
            })
        elif config_name == 'agriculture':
            prediction_config.update({
                'conf': 0.4,
                'iou': 0.7,
                'save_crop': True
            })
        
        return prediction_config
    
    def list_configs(self) -> List[str]:
        """Lista todas las configuraciones disponibles"""
        config_files = list(self.config_dir.glob("*.yaml"))
        return [f.stem for f in config_files]
    
    def backup_config(self, config_name: str, backup_dir: str = "backups") -> bool:
        """Crea una copia de seguridad de una configuración"""
        config_path = self.config_dir / f"{config_name}.yaml"
        if not config_path.exists():
            return False
        
        backup_path = Path(backup_dir)
        backup_path.mkdir(exist_ok=True)
        
        import shutil
        from datetime import datetime
        
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_file = backup_path / f"{config_name}_{timestamp}.yaml"
        
        try:
            shutil.copy2(config_path, backup_file)
            return True
        except Exception as e:
            print(f"Error al crear backup: {e}")
            return False
