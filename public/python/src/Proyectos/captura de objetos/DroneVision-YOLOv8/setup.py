#!/usr/bin/env python3
"""
Script de configuración inicial para DroneVision-YOLOv8
Configura el entorno y verifica las dependencias del sistema
"""

import os
import sys
import subprocess
import platform
import torch
from pathlib import Path

class DroneVisionSetup:
    """Configurador del sistema DroneVision-YOLOv8"""
    
    def __init__(self):
        self.project_root = Path(__file__).parent
        self.python_version = sys.version_info
        self.platform_system = platform.system()
        self.requirements_file = self.project_root / "requirements.txt"
    
    def print_banner(self):
        """Imprime el banner de configuración"""
        banner = """
╔══════════════════════════════════════════════════════════════════════════════╗
║                    DroneVision-YOLOv8 - Configuración Inicial               ║
║                                                                              ║
║  🚁 Configurando entorno para análisis aéreo multi-dominio                 ║
║  🎯 Verificando dependencias y preparando sistema                          ║
║  🔧 Instalando modelos y configuraciones necesarias                        ║
╚══════════════════════════════════════════════════════════════════════════════╝
        """
        print(banner)
    
    def check_python_version(self):
        """Verifica la versión de Python"""
        print("🐍 Verificando versión de Python...")
        
        if self.python_version < (3, 8):
            print("❌ Python 3.8 o superior es requerido")
            print(f"   Versión actual: {self.python_version.major}.{self.python_version.minor}")
            return False
        
        print(f"✅ Python {self.python_version.major}.{self.python_version.minor}.{self.python_version.micro} - Compatible")
        return True
    
    def check_system_requirements(self):
        """Verifica los requisitos del sistema"""
        print("💻 Verificando requisitos del sistema...")
        
        # Verificar memoria RAM
        try:
            import psutil
            memory = psutil.virtual_memory()
            memory_gb = memory.total / (1024**3)
            
            if memory_gb < 8:
                print(f"⚠️  Memoria RAM baja: {memory_gb:.1f} GB (Recomendado: 16+ GB)")
            else:
                print(f"✅ Memoria RAM: {memory_gb:.1f} GB")
        except ImportError:
            print("⚠️  No se pudo verificar la memoria RAM")
        
        # Verificar espacio en disco
        disk_usage = psutil.disk_usage(str(self.project_root))
        free_gb = disk_usage.free / (1024**3)
        
        if free_gb < 10:
            print(f"⚠️  Espacio en disco bajo: {free_gb:.1f} GB (Recomendado: 50+ GB)")
        else:
            print(f"✅ Espacio en disco disponible: {free_gb:.1f} GB")
        
        return True
    
    def check_gpu_availability(self):
        """Verifica la disponibilidad de GPU"""
        print("🎮 Verificando disponibilidad de GPU...")
        
        try:
            if torch.cuda.is_available():
                gpu_count = torch.cuda.device_count()
                gpu_name = torch.cuda.get_device_name(0)
                gpu_memory = torch.cuda.get_device_properties(0).total_memory / (1024**3)
                
                print(f"✅ GPU detectada: {gpu_name}")
                print(f"✅ Memoria GPU: {gpu_memory:.1f} GB")
                print(f"✅ Número de GPUs: {gpu_count}")
                
                if gpu_memory < 6:
                    print("⚠️  Memoria GPU baja (Recomendado: 8+ GB para entrenamiento)")
                
                return True
            else:
                print("⚠️  GPU no disponible - Se usará CPU (entrenamiento será más lento)")
                return False
        except Exception as e:
            print(f"❌ Error al verificar GPU: {e}")
            return False
    
    def install_dependencies(self):
        """Instala las dependencias del sistema"""
        print("📦 Instalando dependencias...")
        
        if not self.requirements_file.exists():
            print("❌ Archivo requirements.txt no encontrado")
            return False
        
        try:
            # Instalar dependencias básicas primero
            basic_deps = [
                "ultralytics",
                "opencv-python",
                "numpy",
                "pandas",
                "matplotlib",
                "seaborn",
                "tqdm",
                "pyyaml"
            ]
            
            print("Instalando dependencias básicas...")
            for dep in basic_deps:
                subprocess.run([sys.executable, "-m", "pip", "install", dep], 
                             check=True, capture_output=True)
            
            # Instalar todas las dependencias
            print("Instalando todas las dependencias...")
            subprocess.run([sys.executable, "-m", "pip", "install", "-r", str(self.requirements_file)], 
                         check=True, capture_output=True)
            
            print("✅ Dependencias instaladas exitosamente")
            return True
            
        except subprocess.CalledProcessError as e:
            print(f"❌ Error al instalar dependencias: {e}")
            return False
    
    def create_directories(self):
        """Crea la estructura de directorios necesaria"""
        print("📁 Creando estructura de directorios...")
        
        directories = [
            "models",
            "data/visdrone/images/train",
            "data/visdrone/images/val",
            "data/visdrone/labels/train",
            "data/visdrone/labels/val",
            "data/uavdt/images/train",
            "data/uavdt/images/val",
            "data/uavdt/labels/train",
            "data/uavdt/labels/val",
            "data/agriculture/images/train",
            "data/agriculture/images/val",
            "data/agriculture/labels/train",
            "data/agriculture/labels/val",
            "configs",
            "scripts",
            "results",
            "utils",
            "logs",
            "backups",
            "templates"
        ]
        
        for directory in directories:
            dir_path = self.project_root / directory
            dir_path.mkdir(parents=True, exist_ok=True)
        
        print("✅ Estructura de directorios creada")
        return True
    
    def download_base_models(self):
        """Descarga los modelos base de YOLOv8"""
        print("🤖 Descargando modelos base...")
        
        try:
            from ultralytics import YOLO
            
            # Descargar modelos base
            models = {
                "yolov8n.pt": "Modelo nano (más rápido)",
                "yolov8s.pt": "Modelo small (balanceado)",
                "yolov8m.pt": "Modelo medium (recomendado)",
                "yolov8l.pt": "Modelo large (más preciso)",
                "yolov8x.pt": "Modelo extra large (máxima precisión)"
            }
            
            for model_name, description in models.items():
                print(f"Descargando {model_name} - {description}")
                model = YOLO(model_name)
                # El modelo se descarga automáticamente al instanciarlo
            
            print("✅ Modelos base descargados")
            return True
            
        except Exception as e:
            print(f"❌ Error al descargar modelos: {e}")
            return False
    
    def create_sample_configs(self):
        """Crea archivos de configuración de ejemplo"""
        print("⚙️  Creando configuraciones de ejemplo...")
        
        try:
            from utils.config_utils import ConfigManager
            
            config_manager = ConfigManager()
            
            # Crear configuraciones por defecto
            for config_name in ['visdrone', 'uavdt', 'agriculture']:
                config_manager.create_default_config(config_name)
                print(f"✅ Configuración {config_name} creada")
            
            return True
            
        except Exception as e:
            print(f"❌ Error al crear configuraciones: {e}")
            return False
    
    def run_system_test(self):
        """Ejecuta una prueba del sistema"""
        print("🧪 Ejecutando prueba del sistema...")
        
        try:
            # Probar importaciones principales
            import ultralytics
            import cv2
            import numpy as np
            import torch
            
            print("✅ Importaciones principales funcionando")
            
            # Probar YOLO
            from ultralytics import YOLO
            model = YOLO('yolov8n.pt')
            print("✅ YOLO funcionando correctamente")
            
            # Probar procesamiento de imagen
            test_image = np.zeros((640, 640, 3), dtype=np.uint8)
            results = model.predict(test_image, verbose=False)
            print("✅ Procesamiento de imagen funcionando")
            
            print("✅ Prueba del sistema completada exitosamente")
            return True
            
        except Exception as e:
            print(f"❌ Error en prueba del sistema: {e}")
            return False
    
    def generate_setup_report(self):
        """Genera un reporte de configuración"""
        print("📊 Generando reporte de configuración...")
        
        try:
            report = {
                "timestamp": str(datetime.now()),
                "python_version": f"{self.python_version.major}.{self.python_version.minor}.{self.python_version.micro}",
                "platform": self.platform_system,
                "gpu_available": torch.cuda.is_available(),
                "gpu_name": torch.cuda.get_device_name(0) if torch.cuda.is_available() else None,
                "gpu_memory": torch.cuda.get_device_properties(0).total_memory / (1024**3) if torch.cuda.is_available() else None,
                "setup_status": "completed"
            }
            
            report_path = self.project_root / "setup_report.json"
            with open(report_path, 'w') as f:
                json.dump(report, f, indent=2)
            
            print(f"✅ Reporte guardado en: {report_path}")
            return True
            
        except Exception as e:
            print(f"❌ Error al generar reporte: {e}")
            return False
    
    def run_setup(self):
        """Ejecuta la configuración completa"""
        self.print_banner()
        
        steps = [
            ("Verificar Python", self.check_python_version),
            ("Verificar sistema", self.check_system_requirements),
            ("Verificar GPU", self.check_gpu_availability),
            ("Crear directorios", self.create_directories),
            ("Instalar dependencias", self.install_dependencies),
            ("Descargar modelos", self.download_base_models),
            ("Crear configuraciones", self.create_sample_configs),
            ("Probar sistema", self.run_system_test),
            ("Generar reporte", self.generate_setup_report)
        ]
        
        success_count = 0
        total_steps = len(steps)
        
        for step_name, step_func in steps:
            print(f"\n{'='*60}")
            print(f"🔄 {step_name}...")
            print('='*60)
            
            try:
                if step_func():
                    success_count += 1
                    print(f"✅ {step_name} completado")
                else:
                    print(f"❌ {step_name} falló")
            except Exception as e:
                print(f"❌ Error en {step_name}: {e}")
        
        print(f"\n{'='*60}")
        print(f"🎉 CONFIGURACIÓN COMPLETADA")
        print(f"✅ Pasos exitosos: {success_count}/{total_steps}")
        print('='*60)
        
        if success_count == total_steps:
            print("🚀 Sistema listo para usar!")
            print("   Ejecuta: python main.py --interactive")
        else:
            print("⚠️  Algunos pasos fallaron. Revisa los errores anteriores.")
        
        return success_count == total_steps

def main():
    """Función principal"""
    setup = DroneVisionSetup()
    setup.run_setup()

if __name__ == "__main__":
    main()
