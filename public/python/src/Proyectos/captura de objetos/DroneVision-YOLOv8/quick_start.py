#!/usr/bin/env python3
"""
DroneVision-YOLOv8 - Inicio Rápido
Script para configurar y ejecutar el sistema rápidamente
"""

import os
import sys
import subprocess
from pathlib import Path

def print_banner():
    """Imprime el banner de inicio rápido"""
    banner = """
╔══════════════════════════════════════════════════════════════════════════════╗
║                    DroneVision-YOLOv8 - Inicio Rápido                      ║
║                                                                              ║
║  🚀 Configuración automática y ejecución del sistema                       ║
║  🎯 Análisis aéreo multi-dominio en minutos                               ║
║  🔧 Instalación y configuración simplificada                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
    """
    print(banner)

def check_python():
    """Verifica la versión de Python"""
    print("🐍 Verificando Python...")
    if sys.version_info < (3, 8):
        print("❌ Python 3.8+ requerido")
        return False
    print(f"✅ Python {sys.version_info.major}.{sys.version_info.minor} OK")
    return True

def install_requirements():
    """Instala los requisitos básicos"""
    print("📦 Instalando requisitos básicos...")
    try:
        subprocess.run([sys.executable, "-m", "pip", "install", "ultralytics", "opencv-python", "numpy"], 
                      check=True, capture_output=True)
        print("✅ Requisitos básicos instalados")
        return True
    except subprocess.CalledProcessError:
        print("❌ Error instalando requisitos")
        return False

def download_models():
    """Descarga modelos base"""
    print("🤖 Descargando modelos base...")
    try:
        from ultralytics import YOLO
        # Descargar modelo nano (más rápido para pruebas)
        model = YOLO('yolov8n.pt')
        print("✅ Modelo base descargado")
        return True
    except Exception as e:
        print(f"❌ Error descargando modelo: {e}")
        return False

def create_sample_video():
    """Crea un video de ejemplo para testing"""
    print("🎬 Creando video de ejemplo...")
    try:
        import cv2
        import numpy as np
        
        # Crear video de ejemplo
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        out = cv2.VideoWriter('sample_video.mp4', fourcc, 30.0, (640, 480))
        
        for i in range(90):  # 3 segundos a 30 FPS
            # Crear frame con rectángulos móviles
            frame = np.zeros((480, 640, 3), dtype=np.uint8)
            
            # Rectángulo móvil
            x = int(50 + i * 2)
            y = int(200 + 50 * np.sin(i * 0.1))
            cv2.rectangle(frame, (x, y), (x + 50, y + 30), (0, 255, 0), -1)
            
            # Texto
            cv2.putText(frame, f"Frame {i}", (10, 30), 
                       cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
            
            out.write(frame)
        
        out.release()
        print("✅ Video de ejemplo creado: sample_video.mp4")
        return True
    except Exception as e:
        print(f"❌ Error creando video: {e}")
        return False

def run_demo():
    """Ejecuta una demostración del sistema"""
    print("🎯 Ejecutando demostración...")
    try:
        from ultralytics import YOLO
        
        # Cargar modelo
        model = YOLO('yolov8n.pt')
        
        # Procesar video de ejemplo
        if os.path.exists('sample_video.mp4'):
            print("📹 Procesando video de ejemplo...")
            results = model.predict('sample_video.mp4', save=True, project='demo_results', name='quick_demo')
            print("✅ Demostración completada")
            print("📁 Resultados guardados en: demo_results/quick_demo")
            return True
        else:
            print("⚠️  Video de ejemplo no encontrado")
            return False
    except Exception as e:
        print(f"❌ Error en demostración: {e}")
        return False

def show_next_steps():
    """Muestra los próximos pasos"""
    print("\n" + "=" * 60)
    print("🎉 CONFIGURACIÓN COMPLETADA")
    print("=" * 60)
    print("\n📋 Próximos pasos:")
    print("1. Coloca tus videos de drones en el directorio del proyecto")
    print("2. Ejecuta el sistema interactivo:")
    print("   python main.py --interactive")
    print("\n3. O usa comandos directos:")
    print("   python main.py --module 1 --source tu_video.mp4")
    print("   python main.py --module 2 --source highway_video.mp4")
    print("   python main.py --module 3 --source farm_video.mp4")
    print("\n4. Para entrenar modelos personalizados:")
    print("   python main.py --train --module 1")
    print("   python main.py --train --module 2")
    print("   python main.py --train --module 3")
    print("\n5. Ver documentación completa:")
    print("   cat README.md")
    print("\n🚀 ¡Sistema listo para usar!")

def main():
    """Función principal"""
    print_banner()
    
    steps = [
        ("Verificar Python", check_python),
        ("Instalar requisitos", install_requirements),
        ("Descargar modelos", download_models),
        ("Crear video de ejemplo", create_sample_video),
        ("Ejecutar demostración", run_demo)
    ]
    
    success_count = 0
    for step_name, step_func in steps:
        print(f"\n🔄 {step_name}...")
        if step_func():
            success_count += 1
            print(f"✅ {step_name} completado")
        else:
            print(f"❌ {step_name} falló")
    
    if success_count == len(steps):
        show_next_steps()
    else:
        print(f"\n⚠️  {success_count}/{len(steps)} pasos completados")
        print("   Algunos pasos fallaron, pero el sistema básico debería funcionar")

if __name__ == "__main__":
    main()
