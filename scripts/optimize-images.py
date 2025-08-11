#!/usr/bin/env python3
"""
Script para optimizar imágenes del proyecto
Reduce el tamaño de archivo manteniendo la calidad
"""

import os
import json
from pathlib import Path
from PIL import Image, ImageOps
import hashlib

def optimize_image(input_path, output_path, quality=85, max_size=(1920, 1080)):
    """Optimiza una imagen individual"""
    try:
        with Image.open(input_path) as img:
            # Convertir a RGB si es necesario
            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGB')
            
            # Redimensionar si es muy grande
            if img.size[0] > max_size[0] or img.size[1] > max_size[1]:
                img.thumbnail(max_size, Image.Resampling.LANCZOS)
            
            # Crear directorio de salida si no existe
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            
            # Guardar imagen optimizada
            img.save(output_path, 'JPEG', quality=quality, optimize=True)
            
            # Calcular ahorro de espacio
            original_size = os.path.getsize(input_path)
            optimized_size = os.path.getsize(output_path)
            savings = ((original_size - optimized_size) / original_size) * 100
            
            return {
                'input_path': str(input_path),
                'output_path': str(output_path),
                'original_size': original_size,
                'optimized_size': optimized_size,
                'savings_percent': round(savings, 2),
                'status': 'success'
            }
            
    except Exception as e:
        return {
            'input_path': str(input_path),
            'output_path': str(output_path),
            'error': str(e),
            'status': 'error'
        }

def generate_image_manifest():
    """Genera un manifiesto de todas las imágenes del proyecto"""
    
    image_extensions = {'.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp'}
    image_manifest = []
    
    # Buscar imágenes en el directorio src
    src_dir = Path('src')
    
    for image_file in src_dir.rglob('*'):
        if image_file.suffix.lower() in image_extensions:
            try:
                with Image.open(image_file) as img:
                    file_info = {
                        'path': str(image_file),
                        'size_bytes': os.path.getsize(image_file),
                        'dimensions': img.size,
                        'format': img.format,
                        'mode': img.mode,
                        'file_size_mb': round(os.path.getsize(image_file) / (1024 * 1024), 2)
                    }
                    image_manifest.append(file_info)
            except Exception as e:
                print(f"❌ Error procesando {image_file}: {e}")
    
    return image_manifest

def optimize_project_images():
    """Optimiza todas las imágenes del proyecto"""
    
    print("🖼️  Iniciando optimización de imágenes...")
    
    # Crear directorio de imágenes optimizadas
    optimized_dir = Path('src/assets/img/optimized')
    optimized_dir.mkdir(parents=True, exist_ok=True)
    
    # Generar manifiesto de imágenes
    print("📋 Generando manifiesto de imágenes...")
    image_manifest = generate_image_manifest()
    
    # Guardar manifiesto
    with open('reports/image-manifest.json', 'w', encoding='utf-8') as f:
        json.dump(image_manifest, f, indent=2, ensure_ascii=False)
    
    print(f"📊 Total de imágenes encontradas: {len(image_manifest)}")
    
    # Estadísticas
    total_original_size = sum(img['size_bytes'] for img in image_manifest)
    total_original_size_mb = round(total_original_size / (1024 * 1024), 2)
    
    print(f"💾 Tamaño total original: {total_original_size_mb} MB")
    
    # Optimizar imágenes
    optimization_results = []
    processed_count = 0
    
    for image_info in image_manifest:
        input_path = Path(image_info['path'])
        
        # Crear ruta de salida en directorio optimizado
        relative_path = input_path.relative_to(Path('src'))
        output_path = optimized_dir / relative_path
        
        print(f"🔧 Optimizando: {relative_path}")
        
        # Optimizar imagen
        result = optimize_image(input_path, output_path)
        optimization_results.append(result)
        
        if result['status'] == 'success':
            processed_count += 1
            print(f"   ✅ Ahorro: {result['savings_percent']}%")
        else:
            print(f"   ❌ Error: {result.get('error', 'Desconocido')}")
    
    # Calcular estadísticas finales
    successful_results = [r for r in optimization_results if r['status'] == 'success']
    
    if successful_results:
        total_optimized_size = sum(r['optimized_size'] for r in successful_results)
        total_savings = sum(r['original_size'] for r in successful_results) - total_optimized_size
        total_savings_mb = round(total_savings / (1024 * 1024), 2)
        total_savings_percent = round((total_savings / total_original_size) * 100, 2)
        
        print(f"\n🎯 OPTIMIZACIÓN COMPLETADA!")
        print(f"📊 Imágenes procesadas: {processed_count}/{len(image_manifest)}")
        print(f"💾 Tamaño original: {total_original_size_mb} MB")
        print(f"💾 Tamaño optimizado: {round(total_optimized_size / (1024 * 1024), 2)} MB")
        print(f"💰 Ahorro total: {total_savings_mb} MB ({total_savings_percent}%)")
    
    # Guardar reporte de optimización
    optimization_report = {
        'timestamp': __import__('datetime').datetime.now().isoformat(),
        'summary': {
            'total_images': len(image_manifest),
            'processed_images': processed_count,
            'total_original_size_mb': total_original_size_mb,
            'total_optimized_size_mb': round(total_optimized_size / (1024 * 1024), 2) if successful_results else 0,
            'total_savings_mb': total_savings_mb if successful_results else 0,
            'total_savings_percent': total_savings_percent if successful_results else 0
        },
        'results': optimization_results
    }
    
    with open('reports/image-optimization-report.json', 'w', encoding='utf-8') as f:
        json.dump(optimization_report, f, indent=2, ensure_ascii=False)
    
    print(f"📁 Reporte guardado: reports/image-optimization-report.json")
    
    return optimization_report

if __name__ == "__main__":
    optimize_project_images()
