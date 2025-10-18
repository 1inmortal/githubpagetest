"""
Utilidades para procesamiento de datos
Incluye procesadores para videos, imágenes y datos de entrenamiento
"""

import os
import cv2
import numpy as np
from pathlib import Path
import json
from datetime import datetime
from typing import List, Dict, Tuple, Optional, Union
import yaml

class DataProcessor:
    """Procesador base para datos"""
    
    def __init__(self):
        self.supported_video_formats = ['.mp4', '.avi', '.mov', '.mkv', '.flv', '.wmv']
        self.supported_image_formats = ['.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.webp']
    
    def validate_file(self, file_path: str) -> bool:
        """Valida si el archivo es compatible"""
        path = Path(file_path)
        if not path.exists():
            return False
        
        extension = path.suffix.lower()
        return extension in self.supported_video_formats or extension in self.supported_image_formats
    
    def get_file_info(self, file_path: str) -> Dict:
        """Obtiene información del archivo"""
        path = Path(file_path)
        if not path.exists():
            return None
        
        info = {
            'path': str(path.absolute()),
            'name': path.name,
            'extension': path.suffix.lower(),
            'size': path.stat().st_size,
            'modified': datetime.fromtimestamp(path.stat().st_mtime).isoformat()
        }
        
        return info

class VideoProcessor(DataProcessor):
    """Procesador específico para videos"""
    
    def __init__(self):
        super().__init__()
    
    def get_video_info(self, video_path: str) -> Dict:
        """Obtiene información detallada del video"""
        if not self.validate_file(video_path):
            return None
        
        cap = cv2.VideoCapture(video_path)
        if not cap.isOpened():
            return None
        
        info = self.get_file_info(video_path)
        info.update({
            'fps': cap.get(cv2.CAP_PROP_FPS),
            'frame_count': int(cap.get(cv2.CAP_PROP_FRAME_COUNT)),
            'width': int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)),
            'height': int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT)),
            'duration': cap.get(cv2.CAP_PROP_FRAME_COUNT) / cap.get(cv2.CAP_PROP_FPS),
            'codec': int(cap.get(cv2.CAP_PROP_FOURCC))
        })
        
        cap.release()
        return info
    
    def extract_frames(self, video_path: str, output_dir: str, interval: int = 30) -> List[str]:
        """Extrae frames del video a intervalos específicos"""
        if not self.validate_file(video_path):
            return []
        
        os.makedirs(output_dir, exist_ok=True)
        
        cap = cv2.VideoCapture(video_path)
        if not cap.isOpened():
            return []
        
        frame_count = 0
        extracted_frames = []
        
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            
            if frame_count % interval == 0:
                frame_path = os.path.join(output_dir, f"frame_{frame_count:06d}.jpg")
                cv2.imwrite(frame_path, frame)
                extracted_frames.append(frame_path)
            
            frame_count += 1
        
        cap.release()
        return extracted_frames
    
    def resize_video(self, video_path: str, output_path: str, width: int, height: int) -> bool:
        """Redimensiona un video"""
        if not self.validate_file(video_path):
            return False
        
        cap = cv2.VideoCapture(video_path)
        if not cap.isOpened():
            return False
        
        fps = cap.get(cv2.CAP_PROP_FPS)
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
        
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            
            resized_frame = cv2.resize(frame, (width, height))
            out.write(resized_frame)
        
        cap.release()
        out.release()
        return True

class ImageProcessor(DataProcessor):
    """Procesador específico para imágenes"""
    
    def __init__(self):
        super().__init__()
    
    def get_image_info(self, image_path: str) -> Dict:
        """Obtiene información detallada de la imagen"""
        if not self.validate_file(image_path):
            return None
        
        image = cv2.imread(image_path)
        if image is None:
            return None
        
        info = self.get_file_info(image_path)
        info.update({
            'width': image.shape[1],
            'height': image.shape[0],
            'channels': image.shape[2] if len(image.shape) > 2 else 1,
            'dtype': str(image.dtype)
        })
        
        return info
    
    def resize_image(self, image_path: str, output_path: str, width: int, height: int) -> bool:
        """Redimensiona una imagen"""
        if not self.validate_file(image_path):
            return False
        
        image = cv2.imread(image_path)
        if image is None:
            return False
        
        resized_image = cv2.resize(image, (width, height))
        return cv2.imwrite(output_path, resized_image)
    
    def crop_image(self, image_path: str, output_path: str, x: int, y: int, width: int, height: int) -> bool:
        """Recorta una imagen"""
        if not self.validate_file(image_path):
            return False
        
        image = cv2.imread(image_path)
        if image is None:
            return False
        
        cropped_image = image[y:y+height, x:x+width]
        return cv2.imwrite(output_path, cropped_image)

class DatasetManager:
    """Gestor de datasets para entrenamiento"""
    
    def __init__(self, data_dir: str):
        self.data_dir = Path(data_dir)
        self.datasets = ['visdrone', 'uavdt', 'agriculture']
    
    def create_dataset_structure(self, dataset_name: str) -> bool:
        """Crea la estructura de directorios para un dataset"""
        if dataset_name not in self.datasets:
            return False
        
        dataset_path = self.data_dir / dataset_name
        
        # Crear directorios
        (dataset_path / 'images' / 'train').mkdir(parents=True, exist_ok=True)
        (dataset_path / 'images' / 'val').mkdir(parents=True, exist_ok=True)
        (dataset_path / 'labels' / 'train').mkdir(parents=True, exist_ok=True)
        (dataset_path / 'labels' / 'val').mkdir(parents=True, exist_ok=True)
        
        return True
    
    def split_dataset(self, dataset_name: str, train_ratio: float = 0.8) -> bool:
        """Divide un dataset en entrenamiento y validación"""
        if dataset_name not in self.datasets:
            return False
        
        dataset_path = self.data_dir / dataset_name
        images_dir = dataset_path / 'images'
        labels_dir = dataset_path / 'labels'
        
        # Obtener lista de archivos
        image_files = list(images_dir.glob('*.*'))
        image_files = [f for f in image_files if f.suffix.lower() in ['.jpg', '.jpeg', '.png']]
        
        # Mezclar y dividir
        np.random.shuffle(image_files)
        split_idx = int(len(image_files) * train_ratio)
        
        train_files = image_files[:split_idx]
        val_files = image_files[split_idx:]
        
        # Mover archivos
        for file in train_files:
            file.rename(images_dir / 'train' / file.name)
            # Mover label correspondiente si existe
            label_file = labels_dir / (file.stem + '.txt')
            if label_file.exists():
                label_file.rename(labels_dir / 'train' / label_file.name)
        
        for file in val_files:
            file.rename(images_dir / 'val' / file.name)
            # Mover label correspondiente si existe
            label_file = labels_dir / (file.stem + '.txt')
            if label_file.exists():
                label_file.rename(labels_dir / 'val' / label_file.name)
        
        return True
    
    def validate_dataset(self, dataset_name: str) -> Dict:
        """Valida la estructura y contenido de un dataset"""
        if dataset_name not in self.datasets:
            return {'valid': False, 'error': 'Dataset no válido'}
        
        dataset_path = self.data_dir / dataset_name
        
        # Verificar estructura
        required_dirs = [
            'images/train', 'images/val',
            'labels/train', 'labels/val'
        ]
        
        for dir_path in required_dirs:
            if not (dataset_path / dir_path).exists():
                return {'valid': False, 'error': f'Directorio faltante: {dir_path}'}
        
        # Contar archivos
        train_images = len(list((dataset_path / 'images/train').glob('*.*')))
        val_images = len(list((dataset_path / 'images/val').glob('*.*')))
        train_labels = len(list((dataset_path / 'labels/train').glob('*.txt')))
        val_labels = len(list((dataset_path / 'labels/val').glob('*.txt')))
        
        return {
            'valid': True,
            'train_images': train_images,
            'val_images': val_images,
            'train_labels': train_labels,
            'val_labels': val_labels,
            'total_images': train_images + val_images,
            'total_labels': train_labels + val_labels
        }
