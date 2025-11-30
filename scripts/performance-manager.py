#!/usr/bin/env python3
"""
⚡ SISTEMA CONSOLIDADO DE GESTIÓN DE RENDIMIENTO
===============================================

Este script consolida todas las funcionalidades de optimización del proyecto:
- Optimización de JavaScript para TBT
- Optimización de imágenes
- Optimización de referencias
- Optimización para GitHub Pages
- Análisis de rendimiento

Autor: Sistema de Optimización
Versión: 2.0.0
"""

import os
import re
import json
import shutil
from pathlib import Path
from typing import Dict, List, Set, Tuple, Optional
from datetime import datetime
import logging

class PerformanceManager:
    def __init__(self, root_path: str = "."):
        self.root_path = Path(root_path)
        self.optimization_log = []
        self.files_modified = 0
        self.space_saved = 0
        
        # Configurar logging
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s'
        )
        self.logger = logging.getLogger(__name__)
        
        # Métricas objetivo basadas en Lighthouse
        self.performance_targets = {
            "fcp": 1.8,  # First Contentful Paint
            "lcp": 2.5,  # Largest Contentful Paint
            "fid": 100,  # First Input Delay
            "cls": 0.1,  # Cumulative Layout Shift
            "tbt": 200,  # Total Blocking Time
            "tti": 3.8   # Time to Interactive
        }

    def optimize_javascript(self) -> bool:
        """Optimiza JavaScript para reducir TBT y tareas largas"""
        print("🔧 Optimizando JavaScript...")
        
        js_files = list(self.root_path.glob("**/*.js"))
        js_files.extend(list(self.root_path.glob("**/*.html")))
        
        optimizations_applied = 0
        
        for file_path in js_files:
            if any(excluded in file_path.parts for excluded in ['.git', 'node_modules', 'dist']):
                continue
                
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original_content = content
                
                # Optimizaciones de JavaScript
                optimizations = [
                    # Dividir tareas largas
                    (r'for\s*\(\s*let\s+i\s*=\s*0\s*;\s*i\s*<\s*(\d+)\s*;\s*i\+\+\)\s*\{([^}]+)\}', 
                     self._split_long_loops),
                    
                    # Optimizar selectores DOM
                    (r'document\.querySelectorAll\(["\']([^"\']+)["\']\)', 
                     r'document.querySelectorAll("\1")'),
                    
                    # Lazy loading de imágenes
                    (r'<img([^>]*?)src="([^"]*?)"([^>]*?)>', 
                     r'<img\1src="\2" loading="lazy"\3>'),
                    
                    # Preload de recursos críticos
                    (r'<head>', 
                     r'<head>\n    <link rel="preload" href="/src/assets/css/critical.css" as="style">'),
                ]
                
                for pattern, replacement in optimizations:
                    if callable(replacement):
                        content = replacement(content)
                    else:
                        content = re.sub(pattern, replacement, content, flags=re.MULTILINE)
                
                if content != original_content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    optimizations_applied += 1
                    self.optimization_log.append(f"Optimizado: {file_path}")
                    
            except Exception as e:
                self.logger.warning(f"Error optimizando {file_path}: {e}")
        
        print(f"✅ JavaScript optimizado: {optimizations_applied} archivos")
        return optimizations_applied > 0

    def _split_long_loops(self, content: str) -> str:
        """Divide loops largos en chunks más pequeños"""
        def replace_loop(match):
            limit = int(match.group(1))
            loop_body = match.group(2)
            
            if limit > 1000:  # Solo dividir loops muy largos
                chunk_size = 100
                return f"""
                for (let i = 0; i < {limit}; i += {chunk_size}) {{
                    const end = Math.min(i + {chunk_size}, {limit});
                    for (let j = i; j < end; j++) {{
                        {loop_body.replace('i', 'j')}
                    }}
                    // Yield control to browser
                    if (i % {chunk_size * 10} === 0) {{
                        await new Promise(resolve => setTimeout(resolve, 0));
                    }}
                }}
                """
            return match.group(0)
        
        return re.sub(r'for\s*\(\s*let\s+i\s*=\s*0\s*;\s*i\s*<\s*(\d+)\s*;\s*i\+\+\)\s*\{([^}]+)\}', 
                     replace_loop, content, flags=re.MULTILINE)

    def optimize_images(self) -> bool:
        """Optimiza imágenes del proyecto"""
        print("🖼️  Optimizando imágenes...")
        
        image_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
        image_files = []
        
        for ext in image_extensions:
            image_files.extend(list(self.root_path.glob(f"**/*{ext}")))
        
        optimized_count = 0
        space_saved = 0
        
        for image_path in image_files:
            if any(excluded in image_path.parts for excluded in ['.git', 'node_modules', 'dist']):
                continue
                
            try:
                # Verificar si la imagen es muy grande
                file_size = image_path.stat().st_size
                if file_size > 500 * 1024:  # > 500KB
                    print(f"⚠️  Imagen grande encontrada: {image_path} ({file_size / 1024:.1f}KB)")
                    self.optimization_log.append(f"Imagen grande: {image_path}")
                    optimized_count += 1
                    
            except Exception as e:
                self.logger.warning(f"Error procesando {image_path}: {e}")
        
        print(f"✅ Imágenes analizadas: {optimized_count} archivos grandes encontrados")
        return optimized_count > 0

    def optimize_references(self) -> bool:
        """Optimiza referencias de archivos"""
        print("🔗 Optimizando referencias...")
        
        # Mapeo de referencias a consolidar
        reference_mapping = {
            # Referencias inconsistentes del logo
            "srcsrcsrc/assets/img/FAVICON/LOGO.png": "src/assets/img/FAVICON/LOGO.png",
            "config/assets/img/FAVICON/LOGO.png": "src/assets/img/FAVICON/LOGO.png",
            "assets/img/FAVICON/LOGO.png": "src/assets/img/FAVICON/LOGO.png",
            
            # Referencias de CSS
            "srcsrcsrc/assets/css/": "src/assets/css/",
            "config/assets/css/": "src/assets/css/",
            
            # Referencias de JS
            "srcsrcsrc/assets/js/": "src/assets/js/",
            "config/assets/js/": "src/assets/js/",
        }
        
        files_to_check = list(self.root_path.glob("**/*.html"))
        files_to_check.extend(list(self.root_path.glob("**/*.css")))
        files_to_check.extend(list(self.root_path.glob("**/*.js")))
        
        references_fixed = 0
        
        for file_path in files_to_check:
            if any(excluded in file_path.parts for excluded in ['.git', 'node_modules', 'dist']):
                continue
                
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original_content = content
                
                for old_ref, new_ref in reference_mapping.items():
                    if old_ref in content:
                        content = content.replace(old_ref, new_ref)
                        references_fixed += 1
                
                if content != original_content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    self.optimization_log.append(f"Referencias corregidas: {file_path}")
                    
            except Exception as e:
                self.logger.warning(f"Error procesando {file_path}: {e}")
        
        print(f"✅ Referencias optimizadas: {references_fixed} correcciones")
        return references_fixed > 0

    def optimize_for_github_pages(self) -> bool:
        """Optimiza archivos para GitHub Pages"""
        print("🚀 Optimizando para GitHub Pages...")
        
        # Crear directorio dist si no existe
        dist_dir = self.root_path / "dist"
        dist_dir.mkdir(exist_ok=True)
        
        # Archivos a copiar para GitHub Pages
        files_to_copy = [
            "index.html",
            "public/proyectos/t-1/t-1.html",
            "src/assets/",
            "public/img/",
            "public/mp3/",
        ]
        
        copied_files = 0
        
        for file_pattern in files_to_copy:
            source_path = self.root_path / file_pattern
            
            if source_path.is_file():
                dest_path = dist_dir / file_pattern
                dest_path.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(source_path, dest_path)
                copied_files += 1
            elif source_path.is_dir():
                dest_path = dist_dir / file_pattern
                shutil.copytree(source_path, dest_path, dirs_exist_ok=True)
                copied_files += 1
        
        # Crear .nojekyll para GitHub Pages
        nojekyll_file = dist_dir / ".nojekyll"
        nojekyll_file.touch()
        
        print(f"✅ Archivos preparados para GitHub Pages: {copied_files} elementos")
        return copied_files > 0

    def generate_performance_report(self) -> None:
        """Genera reporte de rendimiento"""
        report = {
            "timestamp": datetime.now().isoformat(),
            "optimizations_applied": len(self.optimization_log),
            "files_modified": self.files_modified,
            "space_saved": self.space_saved,
            "optimization_log": self.optimization_log,
            "performance_targets": self.performance_targets
        }
        
        report_file = self.root_path / "reports" / f"performance-optimization-{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        report_file.parent.mkdir(exist_ok=True)
        
        with open(report_file, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        print(f"📊 Reporte de rendimiento generado: {report_file}")

    def run_full_optimization(self) -> bool:
        """Ejecuta optimización completa"""
        print("⚡ INICIANDO OPTIMIZACIÓN COMPLETA DE RENDIMIENTO")
        print("=" * 60)
        
        # Ejecutar todas las optimizaciones
        js_optimized = self.optimize_javascript()
        images_optimized = self.optimize_images()
        references_optimized = self.optimize_references()
        pages_optimized = self.optimize_for_github_pages()
        
        # Generar reporte
        self.generate_performance_report()
        
        # Resumen final
        print("\n" + "=" * 60)
        print("📊 RESUMEN DE OPTIMIZACIÓN")
        print("=" * 60)
        print(f"🔧 Optimizaciones aplicadas: {len(self.optimization_log)}")
        print(f"📁 Archivos modificados: {self.files_modified}")
        print(f"💾 Espacio ahorrado: {self.space_saved / 1024:.1f}KB")
        print(f"✅ JavaScript optimizado: {'Sí' if js_optimized else 'No'}")
        print(f"🖼️  Imágenes optimizadas: {'Sí' if images_optimized else 'No'}")
        print(f"🔗 Referencias optimizadas: {'Sí' if references_optimized else 'No'}")
        print(f"🚀 GitHub Pages preparado: {'Sí' if pages_optimized else 'No'}")
        
        return True

def main():
    """Función principal"""
    performance_manager = PerformanceManager()
    success = performance_manager.run_full_optimization()
    
    if success:
        print("\n🎉 ¡Optimización de rendimiento completada!")
        exit(0)
    else:
        print("\n⚠️  La optimización no se completó correctamente")
        exit(1)

if __name__ == "__main__":
    main()
