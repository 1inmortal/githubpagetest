#!/usr/bin/env python3
"""
Script de predicción para el módulo VisDrone
Análisis Urbano General - Detección de objetos en entornos urbanos
"""

import os
import sys
import argparse
import cv2
import numpy as np
from pathlib import Path
from ultralytics import YOLO
import json
from datetime import datetime

def load_model(model_path):
    """Carga el modelo YOLO"""
    try:
        model = YOLO(model_path)
        print(f"✅ Modelo cargado desde: {model_path}")
        return model
    except Exception as e:
        print(f"❌ Error al cargar el modelo: {e}")
        sys.exit(1)

def process_video(model, video_path, output_dir, conf=0.5, iou=0.45, save_txt=True, save_conf=True):
    """
    Procesa un video con el modelo VisDrone
    
    Args:
        model: Modelo YOLO cargado
        video_path: Ruta al video de entrada
        output_dir: Directorio de salida
        conf: Umbral de confianza
        iou: Umbral de IoU para NMS
        save_txt: Guardar anotaciones en formato YOLO
        save_conf: Incluir confianza en anotaciones
    """
    
    print(f"🎬 Procesando video: {video_path}")
    print(f"📊 Parámetros:")
    print(f"   - Confianza: {conf}")
    print(f"   - IoU: {iou}")
    print(f"   - Guardar TXT: {save_txt}")
    print(f"   - Guardar confianza: {save_conf}")
    
    try:
        # Crear directorio de salida
        os.makedirs(output_dir, exist_ok=True)
        
        # Procesar video
        results = model.predict(
            source=video_path,
            conf=conf,
            iou=iou,
            save=True,
            save_txt=save_txt,
            save_conf=save_conf,
            project=output_dir,
            name='urban_analysis',
            exist_ok=True,
            show=False,
            verbose=True,
            device=args.device
        )
        
        print("✅ Procesamiento completado!")
        print(f"📁 Resultados guardados en: {output_dir}/urban_analysis")
        
        return results
        
    except Exception as e:
        print(f"❌ Error durante el procesamiento: {e}")
        return None

def process_image(model, image_path, output_dir, conf=0.5, iou=0.45, save_txt=True, save_conf=True):
    """
    Procesa una imagen con el modelo VisDrone
    
    Args:
        model: Modelo YOLO cargado
        image_path: Ruta a la imagen de entrada
        output_dir: Directorio de salida
        conf: Umbral de confianza
        iou: Umbral de IoU para NMS
        save_txt: Guardar anotaciones en formato YOLO
        save_conf: Incluir confianza en anotaciones
    """
    
    print(f"🖼️  Procesando imagen: {image_path}")
    print(f"📊 Parámetros:")
    print(f"   - Confianza: {conf}")
    print(f"   - IoU: {iou}")
    print(f"   - Guardar TXT: {save_txt}")
    print(f"   - Guardar confianza: {save_conf}")
    
    try:
        # Crear directorio de salida
        os.makedirs(output_dir, exist_ok=True)
        
        # Procesar imagen
        results = model.predict(
            source=image_path,
            conf=conf,
            iou=iou,
            save=True,
            save_txt=save_txt,
            save_conf=save_conf,
            project=output_dir,
            name='urban_analysis',
            exist_ok=True,
            show=False,
            verbose=True,
            device=args.device
        )
        
        print("✅ Procesamiento completado!")
        print(f"📁 Resultados guardados en: {output_dir}/urban_analysis")
        
        return results
        
    except Exception as e:
        print(f"❌ Error durante el procesamiento: {e}")
        return None

def generate_analysis_report(results, output_dir):
    """Genera un reporte de análisis urbano"""
    print("📊 Generando reporte de análisis...")
    
    try:
        # Contar detecciones por clase
        class_counts = {}
        total_detections = 0
        
        for result in results:
            if result.boxes is not None:
                for box in result.boxes:
                    class_id = int(box.cls[0])
                    class_name = model.names[class_id]
                    confidence = float(box.conf[0])
                    
                    if class_name not in class_counts:
                        class_counts[class_name] = 0
                    class_counts[class_name] += 1
                    total_detections += 1
        
        # Crear reporte
        report = {
            "timestamp": datetime.now().isoformat(),
            "model": "VisDrone - Análisis Urbano General",
            "total_detections": total_detections,
            "class_counts": class_counts,
            "analysis_type": "urban_general"
        }
        
        # Guardar reporte
        report_path = os.path.join(output_dir, "urban_analysis_report.json")
        with open(report_path, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        print("✅ Reporte generado!")
        print(f"📁 Reporte guardado en: {report_path}")
        
        # Mostrar resumen
        print("\n📊 RESUMEN DE ANÁLISIS URBANO:")
        print(f"   - Total de detecciones: {total_detections}")
        for class_name, count in class_counts.items():
            print(f"   - {class_name}: {count}")
        
        return report
        
    except Exception as e:
        print(f"❌ Error al generar reporte: {e}")
        return None

def main():
    """Función principal"""
    parser = argparse.ArgumentParser(description='Análisis urbano general con modelo VisDrone')
    parser.add_argument('--model', type=str, default='../models/visdrone_yolov8.pt',
                       help='Ruta al modelo entrenado')
    parser.add_argument('--source', type=str, required=True,
                       help='Ruta al video o imagen de entrada')
    parser.add_argument('--output', type=str, default='../results/urban',
                       help='Directorio de salida')
    parser.add_argument('--conf', type=float, default=0.5,
                       help='Umbral de confianza')
    parser.add_argument('--iou', type=float, default=0.45,
                       help='Umbral de IoU para NMS')
    parser.add_argument('--save-txt', action='store_true', default=True,
                       help='Guardar anotaciones en formato YOLO')
    parser.add_argument('--save-conf', action='store_true', default=True,
                       help='Incluir confianza en anotaciones')
    parser.add_argument('--report', action='store_true', default=True,
                       help='Generar reporte de análisis')
    
    # Argumentos adicionales que pueden ser pasados por main.py
    parser.add_argument('--interactive', action='store_true', default=False,
                       help='Modo interactivo (ignorado)')
    parser.add_argument('--train', action='store_true', default=False,
                       help='Modo entrenamiento (ignorado)')
    parser.add_argument('--device', type=str, default=None,
                       help='Dispositivo a usar: cpu, 0, 1, etc.')
    
    args = parser.parse_args()
    
    print("=" * 60)
    print("🎯 ANÁLISIS URBANO GENERAL - VISDRONE")
    print("   Detección de objetos en entornos urbanos")
    print("=" * 60)
    
    # Cargar modelo
    model = load_model(args.model)
    
    # Determinar si es video o imagen
    source_path = Path(args.source)
    if source_path.suffix.lower() in ['.mp4', '.avi', '.mov', '.mkv', '.flv']:
        # Procesar video
        results = process_video(
            model=model,
            video_path=args.source,
            output_dir=args.output,
            conf=args.conf,
            iou=args.iou,
            save_txt=args.save_txt,
            save_conf=args.save_conf
        )
    elif source_path.suffix.lower() in ['.jpg', '.jpeg', '.png', '.bmp', '.tiff']:
        # Procesar imagen
        results = process_image(
            model=model,
            image_path=args.source,
            output_dir=args.output,
            conf=args.conf,
            iou=args.iou,
            save_txt=args.save_txt,
            save_conf=args.save_conf
        )
    else:
        print(f"❌ Formato de archivo no soportado: {source_path.suffix}")
        sys.exit(1)
    
    # Generar reporte si se solicita
    if args.report and results:
        generate_analysis_report(results, args.output)
    
    print("=" * 60)
    print("🎉 ANÁLISIS COMPLETADO")
    print("=" * 60)

if __name__ == "__main__":
    main()
