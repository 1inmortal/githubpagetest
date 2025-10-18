#!/usr/bin/env python3
"""
Script de predicción para el módulo AI4Agriculture
Monitoreo Agrícola - Segmentación semántica para análisis de precisión agrícola
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
    """Carga el modelo YOLO de segmentación"""
    try:
        model = YOLO(model_path)
        print(f"✅ Modelo cargado desde: {model_path}")
        return model
    except Exception as e:
        print(f"❌ Error al cargar el modelo: {e}")
        sys.exit(1)

def process_video_segmentation(model, video_path, output_dir, conf=0.4, iou=0.7, save_txt=True, save_crop=True):
    """
    Procesa un video con segmentación agrícola
    
    Args:
        model: Modelo YOLO de segmentación cargado
        video_path: Ruta al video de entrada
        output_dir: Directorio de salida
        conf: Umbral de confianza
        iou: Umbral de IoU para NMS
        save_txt: Guardar polígonos de segmentación
        save_crop: Guardar crops de objetos segmentados
    """
    
    print(f"🎬 Procesando video con segmentación: {video_path}")
    print(f"📊 Parámetros:")
    print(f"   - Confianza: {conf}")
    print(f"   - IoU: {iou}")
    print(f"   - Guardar TXT: {save_txt}")
    print(f"   - Guardar crops: {save_crop}")
    
    try:
        # Crear directorio de salida
        os.makedirs(output_dir, exist_ok=True)
        
        # Procesar video con segmentación
        results = model.predict(
            source=video_path,
            conf=conf,
            iou=iou,
            save=True,
            save_txt=save_txt,
            save_crop=save_crop,
            project=output_dir,
            name='agriculture_segmentation',
            exist_ok=True,
            show=False,
            verbose=True
        )
        
        print("✅ Procesamiento con segmentación completado!")
        print(f"📁 Resultados guardados en: {output_dir}/agriculture_segmentation")
        
        return results
        
    except Exception as e:
        print(f"❌ Error durante el procesamiento: {e}")
        return None

def process_image_segmentation(model, image_path, output_dir, conf=0.4, iou=0.7, save_txt=True, save_crop=True):
    """
    Procesa una imagen con segmentación agrícola
    
    Args:
        model: Modelo YOLO de segmentación cargado
        image_path: Ruta a la imagen de entrada
        output_dir: Directorio de salida
        conf: Umbral de confianza
        iou: Umbral de IoU para NMS
        save_txt: Guardar polígonos de segmentación
        save_crop: Guardar crops de objetos segmentados
    """
    
    print(f"🖼️  Procesando imagen con segmentación: {image_path}")
    print(f"📊 Parámetros:")
    print(f"   - Confianza: {conf}")
    print(f"   - IoU: {iou}")
    print(f"   - Guardar TXT: {save_txt}")
    print(f"   - Guardar crops: {save_crop}")
    
    try:
        # Crear directorio de salida
        os.makedirs(output_dir, exist_ok=True)
        
        # Procesar imagen con segmentación
        results = model.predict(
            source=image_path,
            conf=conf,
            iou=iou,
            save=True,
            save_txt=save_txt,
            save_crop=save_crop,
            project=output_dir,
            name='agriculture_segmentation',
            exist_ok=True,
            show=False,
            verbose=True
        )
        
        print("✅ Procesamiento con segmentación completado!")
        print(f"📁 Resultados guardados en: {output_dir}/agriculture_segmentation")
        
        return results
        
    except Exception as e:
        print(f"❌ Error durante el procesamiento: {e}")
        return None

def analyze_agricultural_areas(results, output_dir):
    """Analiza las áreas agrícolas segmentadas"""
    print("🌾 Analizando áreas agrícolas...")
    
    try:
        # Contar áreas por clase
        area_counts = {'vegetation': 0, 'soil': 0, 'water': 0, 'crop': 0, 'pest': 0}
        total_areas = 0
        total_pixels = 0
        
        for result in results:
            if result.masks is not None:
                for mask in result.masks:
                    class_id = int(mask.cls[0])
                    class_name = model.names[class_id]
                    confidence = float(mask.conf[0])
                    
                    if class_name in area_counts:
                        area_counts[class_name] += 1
                        total_areas += 1
                        
                        # Calcular área aproximada
                        mask_area = np.sum(mask.data[0].cpu().numpy())
                        total_pixels += mask_area
        
        # Calcular porcentajes de cobertura
        coverage_percentages = {}
        if total_pixels > 0:
            for class_name, count in area_counts.items():
                # Estimación aproximada del porcentaje de cobertura
                coverage_percentages[class_name] = (count / total_areas) * 100 if total_areas > 0 else 0
        
        # Análisis agrícola
        agricultural_analysis = {
            "timestamp": datetime.now().isoformat(),
            "model": "AI4Agriculture - Segmentación Agrícola",
            "total_areas": total_areas,
            "total_pixels": int(total_pixels),
            "area_counts": area_counts,
            "coverage_percentages": coverage_percentages,
            "crop_health": "Excelente" if area_counts['pest'] == 0 else "Buena" if area_counts['pest'] < 5 else "Requiere atención",
            "water_coverage": "Adecuada" if coverage_percentages.get('water', 0) > 10 else "Insuficiente",
            "analysis_type": "agricultural_segmentation"
        }
        
        # Guardar análisis
        analysis_path = os.path.join(output_dir, "agricultural_analysis.json")
        with open(analysis_path, 'w', encoding='utf-8') as f:
            json.dump(agricultural_analysis, f, indent=2, ensure_ascii=False)
        
        print("✅ Análisis agrícola completado!")
        print(f"📁 Análisis guardado en: {analysis_path}")
        
        # Mostrar resumen
        print("\n🌾 RESUMEN DE ANÁLISIS AGRÍCOLA:")
        print(f"   - Total de áreas segmentadas: {total_areas}")
        print(f"   - Salud del cultivo: {agricultural_analysis['crop_health']}")
        print(f"   - Cobertura de agua: {agricultural_analysis['water_coverage']}")
        for class_name, count in area_counts.items():
            percentage = coverage_percentages.get(class_name, 0)
            print(f"   - {class_name}: {count} áreas ({percentage:.1f}%)")
        
        return agricultural_analysis
        
    except Exception as e:
        print(f"❌ Error al analizar áreas agrícolas: {e}")
        return None

def detect_agricultural_issues(analysis):
    """Detecta problemas agrícolas basados en el análisis"""
    print("🔍 Detectando problemas agrícolas...")
    
    try:
        issues = []
        recommendations = []
        
        # Detectar plagas
        pest_count = analysis['area_counts'].get('pest', 0)
        if pest_count > 0:
            issues.append(f"Se detectaron {pest_count} áreas con posibles plagas")
            recommendations.append("Aplicar tratamiento fitosanitario inmediato")
        
        # Verificar cobertura de agua
        water_coverage = analysis['coverage_percentages'].get('water', 0)
        if water_coverage < 10:
            issues.append("Cobertura de agua insuficiente")
            recommendations.append("Implementar sistema de riego adicional")
        
        # Verificar salud del cultivo
        crop_health = analysis['crop_health']
        if crop_health != "Excelente":
            issues.append(f"Salud del cultivo: {crop_health}")
            recommendations.append("Realizar inspección manual detallada")
        
        # Verificar cobertura de vegetación
        vegetation_coverage = analysis['coverage_percentages'].get('vegetation', 0)
        if vegetation_coverage < 50:
            issues.append("Cobertura de vegetación baja")
            recommendations.append("Revisar densidad de siembra")
        
        return {
            "issues": issues,
            "recommendations": recommendations,
            "priority": "Alta" if pest_count > 5 or water_coverage < 5 else "Media" if issues else "Baja"
        }
        
    except Exception as e:
        print(f"❌ Error al detectar problemas: {e}")
        return {"issues": [], "recommendations": [], "priority": "Desconocida"}

def generate_agricultural_report(results, output_dir):
    """Genera un reporte detallado agrícola"""
    print("📊 Generando reporte agrícola...")
    
    try:
        # Análisis básico
        agricultural_analysis = analyze_agricultural_areas(results, output_dir)
        
        # Detectar problemas
        issues_analysis = detect_agricultural_issues(agricultural_analysis)
        
        # Generar reporte completo
        report = {
            "timestamp": datetime.now().isoformat(),
            "model": "AI4Agriculture - Segmentación Agrícola",
            "analysis": agricultural_analysis,
            "issues": issues_analysis,
            "recommendations": [
                "Monitorear regularmente la salud del cultivo",
                "Implementar sistema de alertas automáticas",
                "Realizar análisis de suelo periódicos",
                "Optimizar el sistema de riego basado en datos",
                "Aplicar tratamientos preventivos contra plagas"
            ]
        }
        
        # Guardar reporte
        report_path = os.path.join(output_dir, "agricultural_report.json")
        with open(report_path, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        print("✅ Reporte agrícola generado!")
        print(f"📁 Reporte guardado en: {report_path}")
        
        # Mostrar problemas detectados
        if issues_analysis['issues']:
            print("\n⚠️  PROBLEMAS DETECTADOS:")
            for issue in issues_analysis['issues']:
                print(f"   - {issue}")
            
            print("\n💡 RECOMENDACIONES:")
            for rec in issues_analysis['recommendations']:
                print(f"   - {rec}")
        else:
            print("\n✅ No se detectaron problemas significativos")
        
        return report
        
    except Exception as e:
        print(f"❌ Error al generar reporte: {e}")
        return None

def main():
    """Función principal"""
    parser = argparse.ArgumentParser(description='Monitoreo agrícola con modelo AI4Agriculture')
    parser.add_argument('--model', type=str, default='../models/ai4agriculture_yolov8-seg.pt',
                       help='Ruta al modelo entrenado')
    parser.add_argument('--source', type=str, required=True,
                       help='Ruta al video o imagen de entrada')
    parser.add_argument('--output', type=str, default='../results/agriculture',
                       help='Directorio de salida')
    parser.add_argument('--conf', type=float, default=0.4,
                       help='Umbral de confianza')
    parser.add_argument('--iou', type=float, default=0.7,
                       help='Umbral de IoU para NMS')
    parser.add_argument('--save-txt', action='store_true', default=True,
                       help='Guardar polígonos de segmentación')
    parser.add_argument('--save-crop', action='store_true', default=True,
                       help='Guardar crops de objetos segmentados')
    parser.add_argument('--analyze', action='store_true', default=True,
                       help='Analizar áreas agrícolas')
    parser.add_argument('--report', action='store_true', default=True,
                       help='Generar reporte agrícola')
    
    # Argumentos adicionales que pueden ser pasados por main.py
    parser.add_argument('--interactive', action='store_true', default=False,
                       help='Modo interactivo (ignorado)')
    parser.add_argument('--train', action='store_true', default=False,
                       help='Modo entrenamiento (ignorado)')
    
    args = parser.parse_args()
    
    print("=" * 60)
    print("🎯 MONITOREO AGRÍCOLA - AI4AGRICULTURE")
    print("   Segmentación semántica para análisis de precisión agrícola")
    print("=" * 60)
    
    # Cargar modelo
    model = load_model(args.model)
    
    # Determinar si es video o imagen
    source_path = Path(args.source)
    if source_path.suffix.lower() in ['.mp4', '.avi', '.mov', '.mkv', '.flv']:
        # Procesar video con segmentación
        results = process_video_segmentation(
            model=model,
            video_path=args.source,
            output_dir=args.output,
            conf=args.conf,
            iou=args.iou,
            save_txt=args.save_txt,
            save_crop=args.save_crop
        )
    elif source_path.suffix.lower() in ['.jpg', '.jpeg', '.png', '.bmp', '.tiff']:
        # Procesar imagen con segmentación
        results = process_image_segmentation(
            model=model,
            image_path=args.source,
            output_dir=args.output,
            conf=args.conf,
            iou=args.iou,
            save_txt=args.save_txt,
            save_crop=args.save_crop
        )
    else:
        print(f"❌ Formato de archivo no soportado: {source_path.suffix}")
        sys.exit(1)
    
    # Analizar áreas agrícolas si se solicita
    if args.analyze and results:
        analyze_agricultural_areas(results, args.output)
    
    # Generar reporte si se solicita
    if args.report and results:
        generate_agricultural_report(results, args.output)
    
    print("=" * 60)
    print("🎉 ANÁLISIS AGRÍCOLA COMPLETADO")
    print("=" * 60)

if __name__ == "__main__":
    main()
