#!/usr/bin/env python3
"""
Script de predicción para el módulo UAVDT
Seguimiento de Tráfico - Detección y tracking de vehículos
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

def process_video_tracking(model, video_path, output_dir, conf=0.6, iou=0.7, tracker='bytetrack', save_txt=True):
    """
    Procesa un video con tracking de vehículos
    
    Args:
        model: Modelo YOLO cargado
        video_path: Ruta al video de entrada
        output_dir: Directorio de salida
        conf: Umbral de confianza
        iou: Umbral de IoU para NMS
        tracker: Algoritmo de tracking
        save_txt: Guardar tracks en formato MOT
    """
    
    print(f"🎬 Procesando video con tracking: {video_path}")
    print(f"📊 Parámetros:")
    print(f"   - Confianza: {conf}")
    print(f"   - IoU: {iou}")
    print(f"   - Tracker: {tracker}")
    print(f"   - Guardar TXT: {save_txt}")
    
    try:
        # Crear directorio de salida
        os.makedirs(output_dir, exist_ok=True)
        
        # Procesar video con tracking
        results = model.track(
            source=video_path,
            conf=conf,
            iou=iou,
            tracker=tracker,
            save=True,
            save_txt=save_txt,
            project=output_dir,
            name='traffic_tracking',
            exist_ok=True,
            show=False,
            verbose=True
        )
        
        print("✅ Procesamiento con tracking completado!")
        print(f"📁 Resultados guardados en: {output_dir}/traffic_tracking")
        
        return results
        
    except Exception as e:
        print(f"❌ Error durante el procesamiento: {e}")
        return None

def process_image_detection(model, image_path, output_dir, conf=0.6, iou=0.7, save_txt=True, save_conf=True):
    """
    Procesa una imagen con detección de vehículos
    
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
            name='traffic_detection',
            exist_ok=True,
            show=False,
            verbose=True
        )
        
        print("✅ Procesamiento completado!")
        print(f"📁 Resultados guardados en: {output_dir}/traffic_detection")
        
        return results
        
    except Exception as e:
        print(f"❌ Error durante el procesamiento: {e}")
        return None

def analyze_traffic_flow(results, output_dir):
    """Analiza el flujo de tráfico"""
    print("🚗 Analizando flujo de tráfico...")
    
    try:
        # Contar vehículos por clase
        vehicle_counts = {'car': 0, 'bus': 0, 'truck': 0}
        total_vehicles = 0
        unique_tracks = set()
        
        for result in results:
            if result.boxes is not None:
                for box in result.boxes:
                    class_id = int(box.cls[0])
                    class_name = model.names[class_id]
                    confidence = float(box.conf[0])
                    
                    if class_name in vehicle_counts:
                        vehicle_counts[class_name] += 1
                        total_vehicles += 1
                
                # Contar tracks únicos si hay tracking
                if hasattr(result, 'boxes') and result.boxes.id is not None:
                    for track_id in result.boxes.id:
                        unique_tracks.add(int(track_id))
        
        # Calcular métricas de tráfico
        traffic_analysis = {
            "timestamp": datetime.now().isoformat(),
            "model": "UAVDT - Seguimiento de Tráfico",
            "total_vehicles": total_vehicles,
            "unique_tracks": len(unique_tracks),
            "vehicle_counts": vehicle_counts,
            "traffic_density": "Alta" if total_vehicles > 50 else "Media" if total_vehicles > 20 else "Baja",
            "analysis_type": "traffic_tracking"
        }
        
        # Guardar análisis
        analysis_path = os.path.join(output_dir, "traffic_analysis.json")
        with open(analysis_path, 'w', encoding='utf-8') as f:
            json.dump(traffic_analysis, f, indent=2, ensure_ascii=False)
        
        print("✅ Análisis de tráfico completado!")
        print(f"📁 Análisis guardado en: {analysis_path}")
        
        # Mostrar resumen
        print("\n🚗 RESUMEN DE ANÁLISIS DE TRÁFICO:")
        print(f"   - Total de vehículos detectados: {total_vehicles}")
        print(f"   - Tracks únicos: {len(unique_tracks)}")
        print(f"   - Densidad de tráfico: {traffic_analysis['traffic_density']}")
        for vehicle_type, count in vehicle_counts.items():
            print(f"   - {vehicle_type}: {count}")
        
        return traffic_analysis
        
    except Exception as e:
        print(f"❌ Error al analizar tráfico: {e}")
        return None

def generate_traffic_report(results, output_dir):
    """Genera un reporte detallado de tráfico"""
    print("📊 Generando reporte de tráfico...")
    
    try:
        # Análisis básico
        traffic_analysis = analyze_traffic_flow(results, output_dir)
        
        # Generar reporte adicional
        report = {
            "timestamp": datetime.now().isoformat(),
            "model": "UAVDT - Seguimiento de Tráfico",
            "analysis": traffic_analysis,
            "recommendations": [
                "Monitorear densidad de tráfico en tiempo real",
                "Implementar alertas automáticas para congestiones",
                "Analizar patrones de flujo por tipo de vehículo",
                "Generar estadísticas de tráfico por hora"
            ]
        }
        
        # Guardar reporte
        report_path = os.path.join(output_dir, "traffic_report.json")
        with open(report_path, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        print("✅ Reporte de tráfico generado!")
        print(f"📁 Reporte guardado en: {report_path}")
        
        return report
        
    except Exception as e:
        print(f"❌ Error al generar reporte: {e}")
        return None

def main():
    """Función principal"""
    parser = argparse.ArgumentParser(description='Seguimiento de tráfico con modelo UAVDT')
    parser.add_argument('--model', type=str, default='../models/uavdt_yolov8.pt',
                       help='Ruta al modelo entrenado')
    parser.add_argument('--source', type=str, required=True,
                       help='Ruta al video o imagen de entrada')
    parser.add_argument('--output', type=str, default='../results/traffic',
                       help='Directorio de salida')
    parser.add_argument('--conf', type=float, default=0.6,
                       help='Umbral de confianza')
    parser.add_argument('--iou', type=float, default=0.7,
                       help='Umbral de IoU para NMS')
    parser.add_argument('--tracker', type=str, default='bytetrack',
                       help='Algoritmo de tracking')
    parser.add_argument('--save-txt', action='store_true', default=True,
                       help='Guardar tracks en formato MOT')
    parser.add_argument('--save-conf', action='store_true', default=True,
                       help='Incluir confianza en anotaciones')
    parser.add_argument('--analyze', action='store_true', default=True,
                       help='Analizar flujo de tráfico')
    parser.add_argument('--report', action='store_true', default=True,
                       help='Generar reporte de tráfico')
    
    # Argumentos adicionales que pueden ser pasados por main.py
    parser.add_argument('--interactive', action='store_true', default=False,
                       help='Modo interactivo (ignorado)')
    parser.add_argument('--train', action='store_true', default=False,
                       help='Modo entrenamiento (ignorado)')
    
    args = parser.parse_args()
    
    print("=" * 60)
    print("🎯 SEGUIMIENTO DE TRÁFICO - UAVDT")
    print("   Detección y tracking de vehículos")
    print("=" * 60)
    
    # Cargar modelo
    model = load_model(args.model)
    
    # Determinar si es video o imagen
    source_path = Path(args.source)
    if source_path.suffix.lower() in ['.mp4', '.avi', '.mov', '.mkv', '.flv']:
        # Procesar video con tracking
        results = process_video_tracking(
            model=model,
            video_path=args.source,
            output_dir=args.output,
            conf=args.conf,
            iou=args.iou,
            tracker=args.tracker,
            save_txt=args.save_txt
        )
    elif source_path.suffix.lower() in ['.jpg', '.jpeg', '.png', '.bmp', '.tiff']:
        # Procesar imagen con detección
        results = process_image_detection(
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
    
    # Analizar tráfico si se solicita
    if args.analyze and results:
        analyze_traffic_flow(results, args.output)
    
    # Generar reporte si se solicita
    if args.report and results:
        generate_traffic_report(results, args.output)
    
    print("=" * 60)
    print("🎉 ANÁLISIS DE TRÁFICO COMPLETADO")
    print("=" * 60)

if __name__ == "__main__":
    main()
