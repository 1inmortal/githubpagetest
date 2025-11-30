#!/usr/bin/env python3
"""
Script de entrenamiento para el modelo UAVDT
Seguimiento de Tráfico - Detección y tracking de vehículos
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
    print("🚀 Configurando entorno de entrenamiento UAVDT...")
    
    # Verificar GPU disponible
    if torch.cuda.is_available():
        device = torch.cuda.current_device()
        gpu_name = torch.cuda.get_device_name(device)
        print(f"✅ GPU detectada: {gpu_name}")
        print(f"✅ Memoria GPU disponible: {torch.cuda.get_device_properties(device).total_memory / 1e9:.1f} GB")
    else:
        print("⚠️  No se detectó GPU, usando CPU (entrenamiento será más lento)")
    
    # Crear directorios de resultados
    os.makedirs("runs/detect/uavdt", exist_ok=True)
    os.makedirs("results/uavdt", exist_ok=True)

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

def train_uavdt_model(config_path, epochs=80, imgsz=640, batch=16, device=0, workers=8):
    """
    Entrena el modelo UAVDT para seguimiento de tráfico
    
    Args:
        config_path: Ruta al archivo de configuración YAML
        epochs: Número de épocas de entrenamiento
        imgsz: Tamaño de imagen
        batch: Tamaño del batch
        device: Dispositivo a usar (0 para GPU, 'cpu' para CPU)
        workers: Número de workers para carga de datos
    """
    
    print("🎯 Iniciando entrenamiento del modelo UAVDT...")
    print(f"📊 Parámetros de entrenamiento:")
    print(f"   - Épocas: {epochs}")
    print(f"   - Tamaño de imagen: {imgsz}x{imgsz}")
    print(f"   - Batch size: {batch}")
    print(f"   - Dispositivo: {device}")
    print(f"   - Workers: {workers}")
    
    try:
        # Cargar modelo base YOLOv8m
        print("📥 Cargando modelo base YOLOv8m...")
        model = YOLO('yolov8m.pt')
        
        # Entrenar el modelo
        print("🏋️  Iniciando entrenamiento...")
        results = model.train(
            data=config_path,
            epochs=epochs,
            imgsz=imgsz,
            batch=batch,
            device=device,
            workers=workers,
            project='runs/detect',
            name='uavdt',
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
            hsv_h=0.015,
            hsv_s=0.7,
            hsv_v=0.4,
            degrees=0.0,
            translate=0.1,
            scale=0.5,
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
            task='detect'
        )
        
        print("✅ Entrenamiento completado exitosamente!")
        print(f"📁 Resultados guardados en: runs/detect/uavdt")
        
        # Guardar el mejor modelo
        best_model_path = "runs/detect/uavdt/weights/best.pt"
        if os.path.exists(best_model_path):
            import shutil
            shutil.copy2(best_model_path, "models/uavdt_yolov8.pt")
            print(f"💾 Mejor modelo guardado como: models/uavdt_yolov8.pt")
        
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
        
        return results
        
    except Exception as e:
        print(f"❌ Error durante la validación: {e}")
        return None

def test_tracking(model_path, video_path):
    """Prueba el tracking en un video"""
    print("🎬 Probando tracking en video...")
    
    try:
        model = YOLO(model_path)
        results = model.track(
            source=video_path,
            tracker='bytetrack',
            conf=0.6,
            iou=0.7,
            save=True,
            save_txt=True,
            project='results/uavdt',
            name='tracking_test'
        )
        
        print("✅ Prueba de tracking completada!")
        print(f"📁 Resultados guardados en: results/uavdt/tracking_test")
        
        return results
        
    except Exception as e:
        print(f"❌ Error durante la prueba de tracking: {e}")
        return None

def main():
    """Función principal"""
    parser = argparse.ArgumentParser(description='Entrenar modelo UAVDT para seguimiento de tráfico')
    parser.add_argument('--config', type=str, default='../configs/uavdt.yaml',
                       help='Ruta al archivo de configuración YAML')
    parser.add_argument('--epochs', type=int, default=80,
                       help='Número de épocas de entrenamiento')
    parser.add_argument('--imgsz', type=int, default=640,
                       help='Tamaño de imagen para entrenamiento')
    parser.add_argument('--batch', type=int, default=16,
                       help='Tamaño del batch')
    parser.add_argument('--device', type=str, default='0',
                       help='Dispositivo a usar (0 para GPU, cpu para CPU)')
    parser.add_argument('--workers', type=int, default=8,
                       help='Número de workers para carga de datos')
    parser.add_argument('--validate', action='store_true',
                       help='Validar el modelo después del entrenamiento')
    parser.add_argument('--test-tracking', type=str, default=None,
                       help='Probar tracking en un video específico')
    
    args = parser.parse_args()
    
    # Configurar ruta absoluta del archivo de configuración
    config_path = os.path.abspath(args.config)
    
    print("=" * 60)
    print("🎯 ENTRENAMIENTO DEL MODELO UAVDT")
    print("   Seguimiento de Tráfico - Detección y Tracking de Vehículos")
    print("=" * 60)
    
    # Configurar entorno
    setup_training_environment()
    
    # Cargar configuración
    config = load_config(config_path)
    
    # Convertir device a int si es posible
    device = int(args.device) if args.device.isdigit() else args.device
    
    # Entrenar modelo
    results = train_uavdt_model(
        config_path=config_path,
        epochs=args.epochs,
        imgsz=args.imgsz,
        batch=args.batch,
        device=device,
        workers=args.workers
    )
    
    # Validar modelo si se solicita
    if args.validate:
        model_path = "runs/detect/uavdt/weights/best.pt"
        if os.path.exists(model_path):
            validate_model(model_path, config_path)
        else:
            print("⚠️  No se encontró el modelo entrenado para validar")
    
    # Probar tracking si se proporciona un video
    if args.test_tracking:
        model_path = "runs/detect/uavdt/weights/best.pt"
        if os.path.exists(model_path):
            test_tracking(model_path, args.test_tracking)
        else:
            print("⚠️  No se encontró el modelo entrenado para probar tracking")
    
    print("=" * 60)
    print("🎉 ENTRENAMIENTO COMPLETADO")
    print("=" * 60)

if __name__ == "__main__":
    main()
