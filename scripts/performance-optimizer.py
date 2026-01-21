#!/usr/bin/env python3
"""
Script de Optimización de Rendimiento - GitHub Page Test
Optimiza el rendimiento basado en métricas de Lighthouse
"""

import os
import re
import json
import shutil
from pathlib import Path
from typing import Dict, List, Set, Tuple
from datetime import datetime
import logging

class PerformanceOptimizer:
    def __init__(self, root_path: str = "."):
        self.root_path = Path(root_path)
        self.optimization_log = []
        self.files_modified = 0
        
        # Configurar logging
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s'
        )
        self.logger = logging.getLogger(__name__)
        
        # Métricas objetivo basadas en Lighthouse
        self.performance_targets = {
            "fcp": 1.0,      # First Contentful Paint (ya está bien)
            "lcp": 2.5,      # Largest Contentful Paint (objetivo: <2.5s)
            "tbt": 200,      # Total Blocking Time (objetivo: <200ms)
            "cls": 0.1,      # Cumulative Layout Shift (ya está bien)
            "speed_index": 3.4  # Speed Index (objetivo: <3.4s)
        }
        
        # Archivos a optimizar
        self.optimization_targets = {
            "javascript": {
                "main.js": "src/assets/js/main.js",
                "inicio.js": "src/assets/js/inicio.js",
                "secciones.js": "src/assets/js/secciones.js"
            },
            "css": {
                "main.css": "src/assets/css/main.css",
                "navegacion.css": "src/assets/css/navegacion.css",
                "animaciones.css": "src/assets/css/animaciones.css"
            },
            "images": [
                "src/assets/img/FAVICON/LOGO.png",
                "src/assets/img/posterA.png",
                "src/assets/img/posterB.png",
                "src/assets/img/posterC.png"
            ]
        }
    
    def analyze_current_performance(self) -> Dict[str, any]:
        """Analizar el rendimiento actual del proyecto"""
        self.logger.info("🔍 Analizando rendimiento actual...")
        
        analysis = {
            "javascript_files": {},
            "css_files": {},
            "image_files": {},
            "total_size": 0,
            "recommendations": []
        }
        
        # Analizar archivos JavaScript
        for js_name, js_path in self.optimization_targets["javascript"].items():
            file_path = self.root_path / js_path
            if file_path.exists():
                size = file_path.stat().st_size
                analysis["javascript_files"][js_name] = {
                    "path": js_path,
                    "size_bytes": size,
                    "size_kb": round(size / 1024, 2)
                }
                analysis["total_size"] += size
        
        # Analizar archivos CSS
        for css_name, css_path in self.optimization_targets["css"].items():
            file_path = self.root_path / css_path
            if file_path.exists():
                size = file_path.stat().st_size
                analysis["css_files"][css_name] = {
                    "path": css_path,
                    "size_bytes": size,
                    "size_kb": round(size / 1024, 2)
                }
                analysis["total_size"] += size
        
        # Analizar imágenes
        for img_path in self.optimization_targets["images"]:
            file_path = self.root_path / img_path
            if file_path.exists():
                size = file_path.stat().st_size
                analysis["image_files"][img_path] = {
                    "size_bytes": size,
                    "size_kb": round(size / 1024, 2)
                }
                analysis["total_size"] += size
        
        # Generar recomendaciones
        analysis["recommendations"] = self.generate_recommendations(analysis)
        
        return analysis
    
    def generate_recommendations(self, analysis: Dict) -> List[str]:
        """Generar recomendaciones de optimización"""
        recommendations = []
        
        total_js_size = sum(js["size_bytes"] for js in analysis["javascript_files"].values())
        total_css_size = sum(css["size_bytes"] for css in analysis["css_files"].values())
        total_img_size = sum(img["size_bytes"] for img in analysis["image_files"].values())
        
        # Recomendaciones de JavaScript
        if total_js_size > 100 * 1024:  # > 100KB
            recommendations.append("🚨 JavaScript muy pesado: Considerar code splitting y lazy loading")
        
        # Recomendaciones de CSS
        if total_css_size > 50 * 1024:  # > 50KB
            recommendations.append("🎨 CSS muy pesado: Considerar purging de CSS no utilizado")
        
        # Recomendaciones de imágenes
        if total_img_size > 500 * 1024:  # > 500KB
            recommendations.append("🖼️ Imágenes muy pesadas: Considerar compresión y formatos WebP")
        
        # Recomendaciones generales
        if analysis["total_size"] > 1024 * 1024:  # > 1MB
            recommendations.append("📦 Proyecto muy pesado: Implementar estrategias de carga diferida")
        
        return recommendations
    
    def create_performance_backup(self) -> bool:
        """Crear respaldo de archivos antes de optimizar"""
        try:
            backup_dir = self.root_path / "backup_performance_optimization"
            if backup_dir.exists():
                shutil.rmtree(backup_dir)
            backup_dir.mkdir(exist_ok=True)
            
            # Respaldar archivos JavaScript
            js_backup = backup_dir / "js"
            js_backup.mkdir(exist_ok=True)
            for js_name, js_path in self.optimization_targets["javascript"].items():
                src_path = self.root_path / js_path
                if src_path.exists():
                    shutil.copy2(src_path, js_backup / js_name)
            
            # Respaldar archivos CSS
            css_backup = backup_dir / "css"
            css_backup.mkdir(exist_ok=True)
            for css_name, css_path in self.optimization_targets["css"].items():
                src_path = self.root_path / css_path
                if src_path.exists():
                    shutil.copy2(src_path, css_backup / css_name)
            
            self.logger.info(f"✅ Respaldo de rendimiento creado: {backup_dir}")
            return True
            
        except Exception as e:
            self.logger.error(f"❌ Error creando respaldo: {e}")
            return False
    
    def optimize_javascript_files(self) -> bool:
        """Optimizar archivos JavaScript"""
        self.logger.info("🔧 Optimizando archivos JavaScript...")
        
        optimizations_made = False
        
        for js_name, js_path in self.optimization_targets["javascript"].items():
            file_path = self.root_path / js_path
            if file_path.exists():
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    original_size = len(content)
                    optimized_content = content
                    
                    # Eliminar comentarios de una línea
                    optimized_content = re.sub(r'//.*$', '', optimized_content, flags=re.MULTILINE)
                    
                    # Eliminar comentarios multilínea
                    optimized_content = re.sub(r'/\*.*?\*/', '', optimized_content, flags=re.DOTALL)
                    
                    # Eliminar líneas en blanco múltiples
                    optimized_content = re.sub(r'\n\s*\n', '\n', optimized_content)
                    
                    # Eliminar espacios en blanco al final de las líneas
                    optimized_content = re.sub(r'[ \t]+$', '', optimized_content, flags=re.MULTILINE)
                    
                    if len(optimized_content) < original_size:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(optimized_content)
                        
                        size_saved = original_size - len(optimized_content)
                        self.logger.info(f"   ✅ {js_name}: {round(size_saved/1024, 2)} KB ahorrados")
                        
                        self.optimization_log.append({
                            "file": js_name,
                            "type": "javascript",
                            "size_saved_bytes": size_saved,
                            "timestamp": datetime.now().isoformat()
                        })
                        
                        optimizations_made = True
                        self.files_modified += 1
                
                except Exception as e:
                    self.logger.error(f"❌ Error optimizando {js_name}: {e}")
        
        return optimizations_made
    
    def optimize_css_files(self) -> bool:
        """Optimizar archivos CSS"""
        self.logger.info("🎨 Optimizando archivos CSS...")
        
        optimizations_made = False
        
        for css_name, css_path in self.optimization_targets["css"].items():
            file_path = self.root_path / css_path
            if file_path.exists():
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    original_size = len(content)
                    optimized_content = content
                    
                    # Eliminar comentarios CSS
                    optimized_content = re.sub(r'/\*.*?\*/', '', optimized_content, flags=re.DOTALL)
                    
                    # Eliminar líneas en blanco múltiples
                    optimized_content = re.sub(r'\n\s*\n', '\n', optimized_content)
                    
                    # Eliminar espacios en blanco al final de las líneas
                    optimized_content = re.sub(r'[ \t]+$', '', optimized_content, flags=re.MULTILINE)
                    
                    if len(optimized_content) < original_size:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(optimized_content)
                        
                        size_saved = original_size - len(optimized_content)
                        self.logger.info(f"   ✅ {css_name}: {round(size_saved/1024, 2)} KB ahorrados")
                        
                        self.optimization_log.append({
                            "file": css_name,
                            "type": "css",
                            "size_saved_bytes": size_saved,
                            "timestamp": datetime.now().isoformat()
                        })
                        
                        optimizations_made = True
                        self.files_modified += 1
                
                except Exception as e:
                    self.logger.error(f"❌ Error optimizando {css_name}: {e}")
        
        return optimizations_made
    
    def create_performance_config(self) -> bool:
        """Crear archivos de configuración para optimización de rendimiento"""
        try:
            # Crear .htaccess para optimización de caché
            htaccess_content = """# Optimización de Rendimiento - GitHub Page Test
# Configuración de caché para recursos estáticos

# Caché para archivos CSS (1 mes)
<FilesMatch "\\.(css)$">
    Header set Cache-Control "max-age=2592000, public"
</FilesMatch>

# Caché para archivos JavaScript (1 mes)
<FilesMatch "\\.(js)$">
    Header set Cache-Control "max-age=2592000, public"
</FilesMatch>

# Caché para imágenes (6 meses)
<FilesMatch "\\.(png|jpg|jpeg|gif|webp|svg|ico)$">
    Header set Cache-Control "max-age=15768000, public"
</FilesMatch>

# Caché para fuentes (1 año)
<FilesMatch "\\.(woff|woff2|ttf|eot)$">
    Header set Cache-Control "max-age=31536000, public"
</FilesMatch>

# Compresión GZIP
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Headers de seguridad
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>
"""
            
            htaccess_path = self.root_path / ".htaccess"
            with open(htaccess_path, 'w', encoding='utf-8') as f:
                f.write(htaccess_content)
            
            self.logger.info("✅ Archivo .htaccess creado para optimización de caché")
            
            # Crear manifest de recursos para PWA
            resources_manifest = {
                "version": "1.0.0",
                "cache_strategy": "cache-first",
                "resources": {
                    "css": list(self.optimization_targets["css"].keys()),
                    "js": list(self.optimization_targets["javascript"].keys()),
                    "images": self.optimization_targets["images"]
                },
                "performance_targets": self.performance_targets
            }
            
            manifest_path = self.root_path / "config" / "performance-manifest.json"
            manifest_path.parent.mkdir(exist_ok=True)
            
            with open(manifest_path, 'w', encoding='utf-8') as f:
                json.dump(resources_manifest, f, indent=2, ensure_ascii=False)
            
            self.logger.info("✅ Manifest de rendimiento creado")
            
            return True
            
        except Exception as e:
            self.logger.error(f"❌ Error creando configuración: {e}")
            return False
    
    def run_optimization(self) -> bool:
        """Ejecutar optimización completa de rendimiento"""
        self.logger.info("🚀 Iniciando optimización de rendimiento...")
        
        # Crear respaldo
        if not self.create_performance_backup():
            self.logger.error("❌ No se pudo crear respaldo. Abortando optimización.")
            return False
        
        # Analizar rendimiento actual
        analysis = self.analyze_current_performance()
        
        self.logger.info("📊 ANÁLISIS DE RENDIMIENTO:")
        self.logger.info(f"   📁 Archivos JavaScript: {len(analysis['javascript_files'])}")
        self.logger.info(f"   🎨 Archivos CSS: {len(analysis['css_files'])}")
        self.logger.info(f"   🖼️ Imágenes: {len(analysis['image_files'])}")
        self.logger.info(f"   💾 Tamaño total: {round(analysis['total_size']/1024, 2)} KB")
        
        if analysis['recommendations']:
            self.logger.info("📋 RECOMENDACIONES:")
            for rec in analysis['recommendations']:
                self.logger.info(f"   {rec}")
        
        # Ejecutar optimizaciones
        js_optimized = self.optimize_javascript_files()
        css_optimized = self.optimize_css_files()
        config_created = self.create_performance_config()
        
        # Generar reporte
        self.generate_performance_report(analysis)
        
        return js_optimized or css_optimized or config_created
    
    def generate_performance_report(self, analysis: Dict):
        """Generar reporte de optimización de rendimiento"""
        report = {
            "optimization_summary": {
                "timestamp": datetime.now().isoformat(),
                "files_modified": self.files_modified,
                "analysis": analysis,
                "performance_targets": self.performance_targets
            },
            "optimization_log": self.optimization_log
        }
        
        # Guardar reporte
        report_path = self.root_path / "reports" / f"performance-optimization_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        report_path.parent.mkdir(exist_ok=True)
        
        with open(report_path, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        # Mostrar resumen
        self.logger.info("\n📊 RESUMEN DE OPTIMIZACIÓN DE RENDIMIENTO:")
        self.logger.info(f"   ✏️ Archivos modificados: {self.files_modified}")
        self.logger.info(f"   📄 Reporte guardado: {report_path}")
        
        if self.files_modified > 0:
            self.logger.info("✅ Optimización de rendimiento completada exitosamente!")
        else:
            self.logger.info("ℹ️ No se encontraron archivos para optimizar")

def main():
    """Función principal"""
    print("🚀 OPTIMIZADOR DE RENDIMIENTO - GitHub Page Test")
    print("=" * 60)
    
    optimizer = PerformanceOptimizer()
    
    # Analizar rendimiento actual
    print("\n🔍 Analizando rendimiento actual...")
    analysis = optimizer.analyze_current_performance()
    
    print(f"\n📊 ANÁLISIS ACTUAL:")
    print(f"   📁 Archivos JavaScript: {len(analysis['javascript_files'])}")
    print(f"   🎨 Archivos CSS: {len(analysis['css_files'])}")
    print(f"   🖼️ Imágenes: {len(analysis['image_files'])}")
    print(f"   💾 Tamaño total: {round(analysis['total_size']/1024, 2)} KB")
    
    if analysis['recommendations']:
        print(f"\n📋 RECOMENDACIONES:")
        for rec in analysis['recommendations']:
            print(f"   {rec}")
    
    print("\n" + "=" * 60)
    response = input("¿Continuar con la optimización de rendimiento? (s/N): ").strip().lower()
    
    if response in ['s', 'si', 'sí', 'y', 'yes']:
        print("\n🚀 Ejecutando optimización...")
        success = optimizer.run_optimization()
        
        if success:
            print("\n✅ Optimización de rendimiento completada exitosamente!")
            print("📋 Revisa el reporte generado para más detalles.")
        else:
            print("\nℹ️ No se encontraron archivos para optimizar.")
            print("📋 Revisa el reporte generado para más detalles.")
    else:
        print("\n❌ Optimización cancelada por el usuario.")

if __name__ == "__main__":
    main()
