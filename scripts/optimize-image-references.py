#!/usr/bin/env python3
"""
Script de Optimización de Referencias de Imágenes - GitHub Page Test
Consolida referencias inconsistentes de imágenes sin afectar la funcionalidad
"""

import os
import re
import json
from pathlib import Path
from typing import Dict, List, Set, Tuple
from datetime import datetime
import logging

class ImageReferenceOptimizer:
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
        
        # Mapeo de referencias de imágenes a consolidar
        self.image_reference_mapping = {
            # Referencias inconsistentes del logo
            "IMG/FAVICON/LOGO.png": "src/assets/img/FAVICON/LOGO.png",
            "/assets/img/FAVICON/LOGO.png": "src/assets/img/FAVICON/LOGO.png",
            "assets/img/FAVICON/LOGO.png": "src/assets/img/FAVICON/LOGO.png",
            
            # Referencias relativas inconsistentes
            "../assets/img/FAVICON/LOGO.png": "src/assets/img/FAVICON/LOGO.png",
            "../../assets/img/FAVICON/LOGO.png": "src/assets/img/FAVICON/LOGO.png",
            
            # Referencias absolutas incorrectas
            "/src/assets/img/FAVICON/LOGO.png": "src/assets/img/FAVICON/LOGO.png"
        }
        
        # Tipos de archivos a procesar
        self.file_extensions = ['.html', '.js', '.css', '.tsx', '.ts']
        
        # Archivos a excluir
        self.exclude_patterns = [
            'node_modules',
            '.git',
            'backup_duplicates_cleanup',
            'dist',
            'playwright-report',
            'test-results'
        ]
    
    def should_process_file(self, file_path: Path) -> bool:
        """Determinar si un archivo debe ser procesado"""
        # Verificar extensión
        if file_path.suffix not in self.file_extensions:
            return False
        
        # Verificar patrones de exclusión
        for pattern in self.exclude_patterns:
            if pattern in str(file_path):
                return False
        
        return True
    
    def find_files_to_process(self) -> List[Path]:
        """Encontrar archivos a procesar"""
        files_to_process = []
        
        for file_path in self.root_path.rglob('*'):
            if file_path.is_file() and self.should_process_file(file_path):
                files_to_process.append(file_path)
        
        self.logger.info(f"📁 Encontrados {len(files_to_process)} archivos para procesar")
        return files_to_process
    
    def optimize_file_references(self, file_path: Path) -> bool:
        """Optimizar referencias de imágenes en un archivo"""
        try:
            # Leer contenido del archivo
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            modifications_made = False
            
            # Aplicar cada mapeo de referencias
            for old_reference, new_reference in self.image_reference_mapping.items():
                # Buscar referencias exactas
                if old_reference in content:
                    content = content.replace(old_reference, new_reference)
                    modifications_made = True
                    self.logger.info(f"   🔄 {old_reference} → {new_reference}")
                
                # Buscar referencias en atributos HTML
                # href, src, data-src, etc.
                html_patterns = [
                    rf'href=["\']{re.escape(old_reference)}["\']',
                    rf'src=["\']{re.escape(old_reference)}["\']',
                    rf'data-src=["\']{re.escape(old_reference)}["\']',
                    rf'content=["\']{re.escape(old_reference)}["\']'
                ]
                
                for pattern in html_patterns:
                    if re.search(pattern, content):
                        new_pattern = pattern.replace(re.escape(old_reference), re.escape(new_reference))
                        content = re.sub(pattern, new_pattern, content)
                        modifications_made = True
                        self.logger.info(f"   🔄 HTML: {old_reference} → {new_reference}")
            
            # Si se hicieron modificaciones, escribir el archivo
            if modifications_made:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                # Registrar en log
                self.optimization_log.append({
                    "file_path": str(file_path),
                    "modifications": modifications_made,
                    "timestamp": datetime.now().isoformat()
                })
                
                self.files_modified += 1
                self.logger.info(f"✅ Archivo optimizado: {file_path}")
                return True
            
            return False
            
        except Exception as e:
            self.logger.error(f"❌ Error procesando {file_path}: {e}")
            return False
    
    def verify_image_references(self) -> Dict[str, List[str]]:
        """Verificar referencias de imágenes en el proyecto"""
        verification_results = {
            "consistent_references": [],
            "inconsistent_references": [],
            "broken_references": []
        }
        
        # Buscar todas las referencias a LOGO.png
        logo_pattern = re.compile(r'["\']([^"\']*LOGO\.png[^"\']*)["\']')
        
        for file_path in self.find_files_to_process():
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                matches = logo_pattern.findall(content)
                for match in matches:
                    if 'LOGO.png' in match:
                        # Verificar si la referencia es consistente
                        if match == "src/assets/img/FAVICON/LOGO.png":
                            if match not in verification_results["consistent_references"]:
                                verification_results["consistent_references"].append(match)
                        elif match in self.image_reference_mapping:
                            if match not in verification_results["inconsistent_references"]:
                                verification_results["inconsistent_references"].append(match)
                        else:
                            if match not in verification_results["broken_references"]:
                                verification_results["broken_references"].append(match)
            
            except Exception as e:
                self.logger.warning(f"⚠️ No se pudo verificar {file_path}: {e}")
        
        return verification_results
    
    def run_optimization(self) -> bool:
        """Ejecutar optimización completa"""
        self.logger.info("🚀 Iniciando optimización de referencias de imágenes...")
        
        # Verificar estado actual
        verification_results = self.verify_image_references()
        
        self.logger.info("🔍 ESTADO ACTUAL DE REFERENCIAS:")
        self.logger.info(f"   ✅ Referencias consistentes: {len(verification_results['consistent_references'])}")
        self.logger.info(f"   ⚠️ Referencias inconsistentes: {len(verification_results['inconsistent_references'])}")
        self.logger.info(f"   ❌ Referencias rotas: {len(verification_results['broken_references'])}")
        
        if verification_results['inconsistent_references']:
            self.logger.info("📋 Referencias inconsistentes encontradas:")
            for ref in verification_results['inconsistent_references']:
                self.logger.info(f"   - {ref}")
        
        # Procesar archivos
        files_to_process = self.find_files_to_process()
        
        self.logger.info(f"\n🔄 Procesando {len(files_to_process)} archivos...")
        
        for file_path in files_to_process:
            self.optimize_file_references(file_path)
        
        # Generar reporte
        self.generate_optimization_report(verification_results)
        
        return self.files_modified > 0
    
    def generate_optimization_report(self, verification_results: Dict[str, List[str]]):
        """Generar reporte de optimización"""
        report = {
            "optimization_summary": {
                "timestamp": datetime.now().isoformat(),
                "files_processed": len(self.find_files_to_process()),
                "files_modified": self.files_modified,
                "verification_results": verification_results
            },
            "optimization_log": self.optimization_log
        }
        
        # Guardar reporte
        report_path = self.root_path / "reports" / f"image-references-optimization_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        report_path.parent.mkdir(exist_ok=True)
        
        with open(report_path, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        # Mostrar resumen
        self.logger.info("\n📊 RESUMEN DE OPTIMIZACIÓN:")
        self.logger.info(f"   📁 Archivos procesados: {len(self.find_files_to_process())}")
        self.logger.info(f"   ✏️ Archivos modificados: {self.files_modified}")
        self.logger.info(f"   📄 Reporte guardado: {report_path}")
        
        if self.files_modified > 0:
            self.logger.info("✅ Optimización completada exitosamente!")
        else:
            self.logger.info("ℹ️ No se encontraron referencias para optimizar")

def main():
    """Función principal"""
    print("🖼️ OPTIMIZADOR DE REFERENCIAS DE IMÁGENES - GitHub Page Test")
    print("=" * 60)
    
    optimizer = ImageReferenceOptimizer()
    
    # Verificar estado actual
    print("\n🔍 Verificando estado actual de referencias...")
    verification_results = optimizer.verify_image_references()
    
    print(f"\n📊 ESTADO ACTUAL:")
    print(f"   ✅ Referencias consistentes: {len(verification_results['consistent_references'])}")
    print(f"   ⚠️ Referencias inconsistentes: {len(verification_results['inconsistent_references'])}")
    print(f"   ❌ Referencias rotas: {len(verification_results['broken_references'])}")
    
    if verification_results['inconsistent_references']:
        print(f"\n📋 Referencias inconsistentes encontradas:")
        for ref in verification_results['inconsistent_references']:
            print(f"   - {ref}")
    
    print("\n" + "=" * 60)
    response = input("¿Continuar con la optimización? (s/N): ").strip().lower()
    
    if response in ['s', 'si', 'sí', 'y', 'yes']:
        print("\n🚀 Ejecutando optimización...")
        success = optimizer.run_optimization()
        
        if success:
            print("\n✅ Optimización completada exitosamente!")
            print("📋 Revisa el reporte generado para más detalles.")
        else:
            print("\nℹ️ No se encontraron referencias para optimizar.")
            print("📋 Revisa el reporte generado para más detalles.")
    else:
        print("\n❌ Optimización cancelada por el usuario.")

if __name__ == "__main__":
    main()
