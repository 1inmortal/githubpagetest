#!/usr/bin/env python3
"""
Ejemplo de uso de DroneVision-YOLOv8
Demuestra cómo usar la plataforma para diferentes tipos de análisis
"""

import os
import sys
from pathlib import Path

# Agregar el directorio del proyecto al path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

from main import DroneVisionCLI

def run_example_analysis():
    """Ejecuta un ejemplo de análisis"""
    print("🚁 DroneVision-YOLOv8 - Ejemplo de Uso")
    print("=" * 50)
    
    # Crear instancia de CLI
    cli = DroneVisionCLI()
    
    # Verificar dependencias
    print("🔍 Verificando dependencias...")
    if not cli.check_dependencies():
        print("❌ Faltan dependencias. Ejecuta: python setup.py")
        return False
    
    # Mostrar información del sistema
    print("\n📊 Información del Sistema:")
    cli.show_system_info()
    
    # Ejemplo de análisis urbano (si hay un modelo disponible)
    print("\n🎯 Ejemplo de Análisis Urbano:")
    model_path = "models/visdrone_yolov8.pt"
    if os.path.exists(model_path):
        print("✅ Modelo urbano encontrado")
        print("   Para analizar un video urbano, ejecuta:")
        print("   python main.py --module 1 --source tu_video.mp4")
    else:
        print("⚠️  Modelo urbano no encontrado")
        print("   Para entrenar el modelo, ejecuta:")
        print("   python main.py --train --module 1")
    
    # Ejemplo de seguimiento de tráfico
    print("\n🚗 Ejemplo de Seguimiento de Tráfico:")
    model_path = "models/uavdt_yolov8.pt"
    if os.path.exists(model_path):
        print("✅ Modelo de tráfico encontrado")
        print("   Para analizar tráfico, ejecuta:")
        print("   python main.py --module 2 --source highway_video.mp4")
    else:
        print("⚠️  Modelo de tráfico no encontrado")
        print("   Para entrenar el modelo, ejecuta:")
        print("   python main.py --train --module 2")
    
    # Ejemplo de monitoreo agrícola
    print("\n🌾 Ejemplo de Monitoreo Agrícola:")
    model_path = "models/ai4agriculture_yolov8-seg.pt"
    if os.path.exists(model_path):
        print("✅ Modelo agrícola encontrado")
        print("   Para analizar agricultura, ejecuta:")
        print("   python main.py --module 3 --source farm_video.mp4")
    else:
        print("⚠️  Modelo agrícola no encontrado")
        print("   Para entrenar el modelo, ejecuta:")
        print("   python main.py --train --module 3")
    
    print("\n🎉 Ejemplo completado!")
    print("   Para usar el sistema interactivo, ejecuta:")
    print("   python main.py --interactive")
    
    return True

def create_sample_data():
    """Crea datos de ejemplo para testing"""
    print("\n📁 Creando datos de ejemplo...")
    
    # Crear directorio de datos de ejemplo
    sample_dir = Path("sample_data")
    sample_dir.mkdir(exist_ok=True)
    
    # Crear archivo de ejemplo
    sample_file = sample_dir / "example_usage.txt"
    with open(sample_file, 'w') as f:
        f.write("""
DroneVision-YOLOv8 - Datos de Ejemplo

Para usar este sistema, necesitas:

1. Videos o imágenes de drones
2. Modelos entrenados (se descargan automáticamente)
3. Configuraciones apropiadas

Ejemplos de comandos:

# Análisis urbano
python main.py --module 1 --source video_urbano.mp4

# Seguimiento de tráfico  
python main.py --module 2 --source video_autopista.mp4

# Monitoreo agrícola
python main.py --module 3 --source video_campo.mp4

# Modo interactivo
python main.py --interactive

# Entrenar modelos
python main.py --train --module 1
python main.py --train --module 2  
python main.py --train --module 3
        """)
    
    print(f"✅ Datos de ejemplo creados en: {sample_dir}")
    return True

def main():
    """Función principal del ejemplo"""
    try:
        # Ejecutar ejemplo de análisis
        success = run_example_analysis()
        
        if success:
            # Crear datos de ejemplo
            create_sample_data()
            
            print("\n" + "=" * 50)
            print("🎯 SISTEMA LISTO PARA USAR")
            print("=" * 50)
            print("Próximos pasos:")
            print("1. Coloca tus videos de drones en el directorio del proyecto")
            print("2. Ejecuta: python main.py --interactive")
            print("3. Selecciona el módulo apropiado para tu análisis")
            print("4. ¡Disfruta analizando videos de drones!")
        else:
            print("\n❌ Error en la configuración del sistema")
            print("   Ejecuta: python setup.py")
    
    except Exception as e:
        print(f"\n❌ Error durante la ejecución: {e}")
        print("   Verifica que todas las dependencias estén instaladas")

if __name__ == "__main__":
    main()
