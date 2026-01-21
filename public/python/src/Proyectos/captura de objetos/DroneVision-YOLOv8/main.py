#!/usr/bin/env python3
"""
DroneVision-YOLOv8 - Plataforma de Análisis Aéreo Multi-Dominio
Interfaz CLI principal para selección y ejecución de módulos de análisis
"""

import os
import sys
import argparse
import subprocess
from pathlib import Path
import json
from datetime import datetime

class DroneVisionCLI:
    """Interfaz CLI principal para DroneVision-YOLOv8"""
    
    def __init__(self):
        self.modules = {
            "1": {
                "name": "Análisis Urbano General",
                "description": "Detección de objetos en entornos urbanos (VisDrone)",
                "model": "visdrone_yolov8.pt",
                "script": "scripts/predict_urban.py",
                "config": "configs/visdrone.yaml"
            },
            "2": {
                "name": "Seguimiento de Tráfico",
                "description": "Detección y tracking de vehículos (UAVDT)",
                "model": "uavdt_yolov8.pt",
                "script": "scripts/predict_traffic.py",
                "config": "configs/uavdt.yaml"
            },
            "3": {
                "name": "Monitoreo Agrícola",
                "description": "Segmentación semántica para agricultura (AI4Agriculture)",
                "model": "ai4agriculture_yolov8-seg.pt",
                "script": "scripts/predict_agriculture.py",
                "config": "configs/agri.yaml"
            }
        }
        
        self.training_scripts = {
            "1": "scripts/train_visdrone.py",
            "2": "scripts/train_uavdt.py",
            "3": "scripts/train_agriculture.py"
        }
    
    def print_banner(self):
        """Imprime el banner de la aplicación"""
        banner = """
╔══════════════════════════════════════════════════════════════════════════════╗
║                    DroneVision-YOLOv8 - Análisis Aéreo Multi-Dominio        ║
║                                                                              ║
║  🚁 Plataforma modular de análisis de videos de drones (DJI Mini 2)        ║
║  🎯 Integración de modelos especializados: VisDrone, UAVDT, AI4Agriculture  ║
║  🔧 Detección, Tracking y Segmentación semántica                            ║
╚══════════════════════════════════════════════════════════════════════════════╝
        """
        print(banner)
    
    def print_module_menu(self):
        """Imprime el menú de módulos disponibles"""
        print("\n🎯 MÓDULOS DISPONIBLES:")
        print("=" * 60)
        
        for key, module in self.modules.items():
            print(f"{key}. {module['name']}")
            print(f"   📝 {module['description']}")
            print(f"   🤖 Modelo: {module['model']}")
            print()
    
    def check_model_exists(self, model_path):
        """Verifica si el modelo existe"""
        return os.path.exists(model_path)
    
    def check_dependencies(self):
        """Verifica las dependencias del sistema"""
        print("🔍 Verificando dependencias...")
        
        try:
            import ultralytics
            print("✅ Ultralytics YOLOv8 instalado")
        except ImportError:
            print("❌ Ultralytics YOLOv8 no encontrado")
            print("   Instalar con: pip install ultralytics")
            return False
        
        try:
            import cv2
            print("✅ OpenCV instalado")
        except ImportError:
            print("❌ OpenCV no encontrado")
            print("   Instalar con: pip install opencv-python")
            return False
        
        try:
            import torch
            print("✅ PyTorch instalado")
            if torch.cuda.is_available():
                print(f"✅ GPU disponible: {torch.cuda.get_device_name(0)}")
            else:
                print("⚠️  GPU no disponible, usando CPU")
        except ImportError:
            print("❌ PyTorch no encontrado")
            print("   Instalar con: pip install torch")
            return False
        
        return True
    
    def run_prediction(self, module_key, source, output=None, **kwargs):
        """Ejecuta la predicción con el módulo seleccionado"""
        if module_key not in self.modules:
            print(f"❌ Módulo {module_key} no válido")
            return False
        
        module = self.modules[module_key]
        model_path = f"models/{module['model']}"
        
        # Verificar si el modelo existe
        if not self.check_model_exists(model_path):
            print(f"❌ Modelo no encontrado: {model_path}")
            print("   Ejecuta el entrenamiento primero con: python main.py --train")
            return False
        
        # Configurar directorio de salida por defecto
        if output is None:
            output = f"results/{module['name'].lower().replace(' ', '_')}"
        
        # Construir comando
        cmd = [
            sys.executable,
            module['script'],
            '--model', model_path,
            '--source', source,
            '--output', output
        ]
        
        # Agregar parámetros adicionales
        for key, value in kwargs.items():
            if value is not None and value is not False:
                if isinstance(value, bool):
                    if value:  # Solo agregar si es True
                        cmd.append(f'--{key.replace("_", "-")}')
                else:
                    cmd.extend([f'--{key.replace("_", "-")}', str(value)])
        
        print(f"🚀 Ejecutando: {' '.join(cmd)}")
        
        try:
            result = subprocess.run(cmd, check=True, capture_output=True, text=True, encoding='utf-8', errors='ignore')
            print("✅ Predicción completada exitosamente!")
            return True
        except subprocess.CalledProcessError as e:
            print(f"❌ Error durante la predicción: {e}")
            print(f"   Salida de error: {e.stderr}")
            return False
    
    def run_training(self, module_key, **kwargs):
        """Ejecuta el entrenamiento del módulo seleccionado"""
        if module_key not in self.training_scripts:
            print(f"❌ Script de entrenamiento para módulo {module_key} no encontrado")
            return False
        
        script_path = self.training_scripts[module_key]
        
        # Construir comando
        cmd = [sys.executable, script_path]
        
        # Agregar parámetros adicionales
        for key, value in kwargs.items():
            if value is not None and value is not False:
                if isinstance(value, bool):
                    if value:  # Solo agregar si es True
                        cmd.append(f'--{key.replace("_", "-")}')
                else:
                    cmd.extend([f'--{key.replace("_", "-")}', str(value)])
        
        print(f"🚀 Ejecutando entrenamiento: {' '.join(cmd)}")
        
        try:
            result = subprocess.run(cmd, check=True, capture_output=True, text=True, encoding='utf-8', errors='ignore')
            print("✅ Entrenamiento completado exitosamente!")
            return True
        except subprocess.CalledProcessError as e:
            print(f"❌ Error durante el entrenamiento: {e}")
            print(f"   Salida de error: {e.stderr}")
            return False
    
    def interactive_mode(self):
        """Modo interactivo de la CLI"""
        self.print_banner()
        
        while True:
            print("\n" + "=" * 60)
            print("🎯 MENÚ PRINCIPAL")
            print("=" * 60)
            print("1. Ejecutar análisis")
            print("2. Entrenar modelo")
            print("3. Verificar dependencias")
            print("4. Mostrar información del sistema")
            print("5. Salir")
            
            choice = input("\nSelecciona una opción (1-5): ").strip()
            
            if choice == "1":
                self.run_analysis_menu()
            elif choice == "2":
                self.run_training_menu()
            elif choice == "3":
                self.check_dependencies()
            elif choice == "4":
                self.show_system_info()
            elif choice == "5":
                print("👋 ¡Hasta luego!")
                break
            else:
                print("❌ Opción no válida")
    
    def run_analysis_menu(self):
        """Menú para ejecutar análisis"""
        self.print_module_menu()
        
        module_choice = input("\nSelecciona un módulo (1-3): ").strip()
        
        if module_choice not in self.modules:
            print("❌ Módulo no válido")
            return
        
        source = input("Ruta al video/imagen de entrada: ").strip()
        if not os.path.exists(source):
            print("❌ Archivo no encontrado")
            return
        
        output = input("Directorio de salida (Enter para usar por defecto): ").strip()
        if not output:
            output = None
        
        # Parámetros adicionales
        conf = input("Umbral de confianza (Enter para usar por defecto): ").strip()
        conf = float(conf) if conf else None
        
        iou = input("Umbral de IoU (Enter para usar por defecto): ").strip()
        iou = float(iou) if iou else None
        
        # Ejecutar predicción
        self.run_prediction(
            module_choice,
            source,
            output,
            conf=conf,
            iou=iou
        )
    
    def run_training_menu(self):
        """Menú para entrenar modelos"""
        self.print_module_menu()
        
        module_choice = input("\nSelecciona un módulo para entrenar (1-3): ").strip()
        
        if module_choice not in self.training_scripts:
            print("❌ Módulo no válido")
            return
        
        # Parámetros de entrenamiento
        epochs = input("Número de épocas (Enter para usar por defecto): ").strip()
        epochs = int(epochs) if epochs else None
        
        batch = input("Tamaño del batch (Enter para usar por defecto): ").strip()
        batch = int(batch) if batch else None
        
        device = input("Dispositivo (0 para GPU, 'cpu' para CPU, Enter para usar por defecto): ").strip()
        device = device if device else None
        
        # Ejecutar entrenamiento
        self.run_training(
            module_choice,
            epochs=epochs,
            batch=batch,
            device=device
        )
    
    def show_system_info(self):
        """Muestra información del sistema"""
        print("\n📊 INFORMACIÓN DEL SISTEMA:")
        print("=" * 40)
        
        # Información de Python
        print(f"Python: {sys.version}")
        
        # Información de PyTorch
        try:
            import torch
            print(f"PyTorch: {torch.__version__}")
            if torch.cuda.is_available():
                print(f"CUDA: {torch.version.cuda}")
                print(f"GPU: {torch.cuda.get_device_name(0)}")
            else:
                print("CUDA: No disponible")
        except ImportError:
            print("PyTorch: No instalado")
        
        # Información de Ultralytics
        try:
            import ultralytics
            print(f"Ultralytics: {ultralytics.__version__}")
        except ImportError:
            print("Ultralytics: No instalado")
        
        # Información de modelos
        print("\n🤖 MODELOS DISPONIBLES:")
        for key, module in self.modules.items():
            model_path = f"models/{module['model']}"
            status = "✅ Disponible" if self.check_model_exists(model_path) else "❌ No encontrado"
            print(f"   {module['name']}: {status}")
    
    def run_cli(self, args):
        """Ejecuta la CLI con argumentos de línea de comandos"""
        if args.interactive:
            self.interactive_mode()
            return
        
        if args.train:
            if args.module:
                # Crear diccionario de argumentos sin module
                kwargs = {k: v for k, v in vars(args).items() 
                         if k != 'module' and v is not None}
                self.run_training(args.module, **kwargs)
            else:
                print("❌ Especifica un módulo para entrenar con --module")
        else:
            if args.module and args.source:
                # Crear diccionario de argumentos sin source, module y output
                kwargs = {k: v for k, v in vars(args).items() 
                         if k not in ['module', 'source', 'output'] and v is not None}
                self.run_prediction(args.module, args.source, args.output, **kwargs)
            else:
                print("❌ Especifica un módulo y fuente con --module y --source")

def main():
    """Función principal"""
    parser = argparse.ArgumentParser(
        description='DroneVision-YOLOv8 - Plataforma de Análisis Aéreo Multi-Dominio',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Ejemplos de uso:
  python main.py --interactive
  python main.py --module 1 --source video.mp4
  python main.py --train --module 2 --epochs 100
  python main.py --module 3 --source image.jpg --conf 0.4
        """
    )
    
    parser.add_argument('--interactive', '-i', action='store_true',
                       help='Modo interactivo')
    parser.add_argument('--module', '-m', type=str, choices=['1', '2', '3'],
                       help='Módulo a usar (1: Urbano, 2: Tráfico, 3: Agrícola)')
    parser.add_argument('--source', '-s', type=str,
                       help='Ruta al video/imagen de entrada')
    parser.add_argument('--output', '-o', type=str,
                       help='Directorio de salida')
    parser.add_argument('--conf', type=float,
                       help='Umbral de confianza')
    parser.add_argument('--iou', type=float,
                       help='Umbral de IoU')
    parser.add_argument('--train', action='store_true',
                       help='Entrenar modelo en lugar de hacer predicción')
    parser.add_argument('--epochs', type=int,
                       help='Número de épocas para entrenamiento')
    parser.add_argument('--batch', type=int,
                       help='Tamaño del batch para entrenamiento')
    parser.add_argument('--device', type=str,
                       help='Dispositivo para entrenamiento (0 para GPU, cpu para CPU)')
    
    args = parser.parse_args()
    
    # Crear instancia de CLI
    cli = DroneVisionCLI()
    
    # Verificar dependencias
    if not cli.check_dependencies():
        print("\n❌ Faltan dependencias. Instala las dependencias requeridas.")
        sys.exit(1)
    
    # Ejecutar CLI
    cli.run_cli(args)

if __name__ == "__main__":
    main()
