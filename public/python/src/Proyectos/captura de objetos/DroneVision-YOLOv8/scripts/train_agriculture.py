#!/usr/bin/env python3
"""
Script de entrenamiento para el modelo AI4Agriculture
Monitoreo Agrícola - Segmentación semántica para análisis de precisión agrícola
"""

import os
import sys
import argparse
import yaml
from pathlib import Path
from ultralytics import YOLO
import torch

def setup_training_environment():
    """Configura el entorno de entrenamiento"""
    print("🚀 Configurando entorno de entrenamiento AI4Agriculture...")
    
    # Verificar GPU disponible
    if torch.cuda.is_available():
        device = torch.cuda.current_device()
        gpu_name = torch.cuda.get_device_name(device)
        print(f"✅ GPU detectada: {gpu_name}")
        print(f"✅ Memoria GPU disponible: {torch.cuda.get_device_properties(device).total_memory / 1e9:.1f} GB")
    else:
        print("⚠️  No se detectó GPU, usando CPU (entrenamiento será más lento)")
    
    # Crear directorios de resultados
    os.makedirs("runs/segment/agriculture", exist_ok=True)
    os.makedirs("results/agriculture", exist_ok=True)

def load_config(config_path):
    """Carga la configuración desde el archivo YAML"""
    try:
        with open(config_path, 'r', encoding='utf-8') as file:
            config = yaml.safe_load(file)
        print(f"✅ Configuración cargada desde: {config_path}")
        return config
    except Exception as e:
        print(f"❌ Error al cargar configuración: {e}")
        sys.exit(1)

def train_agriculture_model(config_path, epochs=120, imgsz=960, batch=8, device=0, workers=8):
    """
    Entrena el modelo AI4Agriculture para segmentación agrícola
    
    Args:
        config_path: Ruta al archivo de configuración YAML
        epochs: Número de épocas de entrenamiento
        imgsz: Tamaño de imagen (mayor resolución para segmentación)
        batch: Tamaño del batch (reducido por mayor resolución)
        device: Dispositivo a usar (0 para GPU, 'cpu' para CPU)
        workers: Número de workers para carga de datos
    """
    
    print("🎯 Iniciando entrenamiento del modelo AI4Agriculture...")
    print(f"📊 Parámetros de entrenamiento:")
    print(f"   - Épocas: {epochs}")
    print(f"   - Tamaño de imagen: {imgsz}x{imgsz}")
    print(f"   - Batch size: {batch}")
    print(f"   - Dispositivo: {device}")
    print(f"   - Workers: {workers}")
    
    try:
        # Cargar modelo base YOLOv8m-seg para segmentación
        print("📥 Cargando modelo base YOLOv8m-seg...")
        model = YOLO('yolov8m-seg.pt')
        
        # Entrenar el modelo
        print("🏋️  Iniciando entrenamiento...")
        results = model.train(
            data=config_path,
            epochs=epochs,
            imgsz=imgsz,
            batch=batch,
            device=device,
            workers=workers,
            project='runs/segment',
            name='agriculture',
            exist_ok=True,
            pretrained=True,
            optimizer='AdamW',
            lr0=0.01,
            lrf=0.01,
            momentum=0.937,
            weight_decay=0.0005,
            warmup_epochs=3,
            warmup_momentum=0.8,
            warmup_bias_lr=0.1,
            box=7.5,
            cls=0.5,
            dfl=1.5,
            pose=12.0,
            kobj=1.0,
            label_smoothing=0.0,
            nbs=64,
            overlap_mask=True,
            mask_ratio=4,
            drop_path=0.0,
            hsv_h=0.02,
            hsv_s=0.8,
            hsv_v=0.5,
            degrees=5.0,
            translate=0.1,
            scale=0.3,
            shear=0.0,
            perspective=0.0,
            flipud=0.0,
            fliplr=0.5,
            mosaic=1.0,
            mixup=0.0,
            copy_paste=0.0,
            auto_augment='randaugment',
            erasing=0.4,
            crop_fraction=1.0,
            save=True,
            save_period=10,
            cache=False,
            rect=False,
            cos_lr=False,
            close_mosaic=10,
            resume=False,
            amp=True,
            fraction=1.0,
            profile=False,
            freeze=None,
            multi_scale=False,
            single_cls=False,
            verbose=True,
            seed=0,
            deterministic=True,
            plots=True,
            val=True,
            split='val',
            save_json=False,
            save_hybrid=False,
            conf=None,
            iou=0.7,
            max_det=300,
            half=False,
            dnn=False,
            data_dict=None,
            task='segment'
        )
        
        print("✅ Entrenamiento completado exitosamente!")
        print(f"📁 Resultados guardados en: runs/segment/agriculture")
        
        # Guardar el mejor modelo
        best_model_path = "runs/segment/agriculture/weights/best.pt"
        if os.path.exists(best_model_path):
            import shutil
            shutil.copy2(best_model_path, "models/ai4agriculture_yolov8-seg.pt")
            print(f"💾 Mejor modelo guardado como: models/ai4agriculture_yolov8-seg.pt")
        
        return results
        
    except Exception as e:
        print(f"❌ Error durante el entrenamiento: {e}")
        sys.exit(1)

def validate_model(model_path, config_path):
    """Valida el modelo entrenado"""
    print("🔍 Validando modelo entrenado...")
    
    try:
        model = YOLO(model_path)
        results = model.val(data=config_path, split='val')
        
        print("✅ Validación completada!")
        print(f"📊 Métricas de validación:")
        print(f"   - mAP@0.5: {results.box.map50:.4f}")
        print(f"   - mAP@0.5:0.95: {results.box.map:.4f}")
        print(f"   - Precision: {results.box.mp:.4f}")
        print(f"   - Recall: {results.box.mr:.4f}")
        
        # Métricas específicas de segmentación
        if hasattr(results, 'seg'):
            print(f"   - mIoU: {results.seg.map50:.4f}")
            print(f"   - Pixel Accuracy: {results.seg.mp:.4f}")
        
        return results
        
    except Exception as e:
        print(f"❌ Error durante la validación: {e}")
        return None

def test_segmentation(model_path, video_path):
    """Prueba la segmentación en un video"""
    print("🎬 Probando segmentación en video...")
    
    try:
        model = YOLO(model_path)
        results = model.predict(
            source=video_path,
            conf=0.4,
            iou=0.7,
            save=True,
            save_txt=True,
            save_crop=True,
            project='results/agriculture',
            name='segmentation_test'
        )
        
        print("✅ Prueba de segmentación completada!")
        print(f"📁 Resultados guardados en: results/agriculture/segmentation_test")
        
        return results
        
    except Exception as e:
        print(f"❌ Error durante la prueba de segmentación: {e}")
        return None

def analyze_agricultural_metrics(results):
    """Analiza métricas específicas para agricultura"""
    print("🌾 Analizando métricas agrícolas...")
    
    try:
        # Aquí se pueden agregar análisis específicos para agricultura
        # como detección de estrés hídrico, plagas, etc.
        
        print("📊 Análisis de métricas agrícolas:")
        print("   - Vegetación detectada: [Análisis en desarrollo]")
        print("   - Suelo identificado: [Análisis en desarrollo]")
        print("   - Áreas de agua: [Análisis en desarrollo]")
        print("   - Cultivos segmentados: [Análisis en desarrollo]")
        print("   - Plagas detectadas: [Análisis en desarrollo]")
        
    except Exception as e:
        print(f"❌ Error durante el análisis agrícola: {e}")

def main():
    """Función principal"""
    parser = argparse.ArgumentParser(description='Entrenar modelo AI4Agriculture para segmentación agrícola')
    parser.add_argument('--config', type=str, default='../configs/agri.yaml',
                       help='Ruta al archivo de configuración YAML')
    parser.add_argument('--epochs', type=int, default=120,
                       help='Número de épocas de entrenamiento')
    parser.add_argument('--imgsz', type=int, default=960,
                       help='Tamaño de imagen para entrenamiento (mayor para segmentación)')
    parser.add_argument('--batch', type=int, default=8,
                       help='Tamaño del batch (reducido por mayor resolución)')
    parser.add_argument('--device', type=str, default='0',
                       help='Dispositivo a usar (0 para GPU, cpu para CPU)')
    parser.add_argument('--workers', type=int, default=8,
                       help='Número de workers para carga de datos')
    parser.add_argument('--validate', action='store_true',
                       help='Validar el modelo después del entrenamiento')
    parser.add_argument('--test-segmentation', type=str, default=None,
                       help='Probar segmentación en un video específico')
    parser.add_argument('--analyze-metrics', action='store_true',
                       help='Analizar métricas específicas para agricultura')
    
    args = parser.parse_args()
    
    # Configurar ruta absoluta del archivo de configuración
    config_path = os.path.abspath(args.config)
    
    print("=" * 60)
    print("🎯 ENTRENAMIENTO DEL MODELO AI4AGRICULTURE")
    print("   Monitoreo Agrícola - Segmentación Semántica")
    print("=" * 60)
    
    # Configurar entorno
    setup_training_environment()
    
    # Cargar configuración
    config = load_config(config_path)
    
    # Convertir device a int si es posible
    device = int(args.device) if args.device.isdigit() else args.device
    
    # Entrenar modelo
    results = train_agriculture_model(
        config_path=config_path,
        epochs=args.epochs,
        imgsz=args.imgsz,
        batch=args.batch,
        device=device,
        workers=args.workers
    )
    
    # Validar modelo si se solicita
    if args.validate:
        model_path = "runs/segment/agriculture/weights/best.pt"
        if os.path.exists(model_path):
            validate_model(model_path, config_path)
        else:
            print("⚠️  No se encontró el modelo entrenado para validar")
    
    # Probar segmentación si se proporciona un video
    if args.test_segmentation:
        model_path = "runs/segment/agriculture/weights/best.pt"
        if os.path.exists(model_path):
            test_segmentation(model_path, args.test_segmentation)
        else:
            print("⚠️  No se encontró el modelo entrenado para probar segmentación")
    
    # Analizar métricas agrícolas si se solicita
    if args.analyze_metrics:
        analyze_agricultural_metrics(results)
    
    print("=" * 60)
    print("🎉 ENTRENAMIENTO COMPLETADO")
    print("=" * 60)

if __name__ == "__main__":
    main()
