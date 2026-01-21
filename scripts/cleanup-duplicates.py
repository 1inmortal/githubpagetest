#!/usr/bin/env python3
"""
Script de Limpieza de Duplicaciones - GitHub Page Test
Elimina archivos duplicados de forma segura sin afectar la funcionalidad
"""

import os
import shutil
import hashlib
import json
from pathlib import Path
from typing import Dict, List, Set, Tuple
from datetime import datetime
import logging

class DuplicateCleaner:
    def __init__(self, root_path: str = "."):
        self.root_path = Path(root_path)
        self.backup_dir = self.root_path / "backup_duplicates_cleanup"
        self.cleanup_log = []
        self.space_saved = 0
        
        # Configurar logging
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s'
        )
        self.logger = logging.getLogger(__name__)
        
        # Archivos duplicados conocidos
        self.known_duplicates = {
            "config-files": {
                "description": "Carpeta de configuración duplicada",
                "files": [
                    "vite.config.js",
                    ".eslintrc.json", 
                    ".prettierrc",
                    "vitest.config.js",
                    "playwright.config.js"
                ],
                "action": "remove_folder"
            },
            "manifest.json": {
                "description": "Manifest duplicado en raíz",
                "action": "remove_file",
                "keep": "config/manifest.json"
            }
        }
    
    def create_backup(self) -> bool:
        """Crear directorio de respaldo"""
        try:
            if self.backup_dir.exists():
                shutil.rmtree(self.backup_dir)
            self.backup_dir.mkdir(exist_ok=True)
            self.logger.info(f"✅ Directorio de respaldo creado: {self.backup_dir}")
            return True
        except Exception as e:
            self.logger.error(f"❌ Error creando respaldo: {e}")
            return False
    
    def calculate_file_hash(self, file_path: Path) -> str:
        """Calcular hash MD5 de un archivo"""
        try:
            with open(file_path, 'rb') as f:
                return hashlib.md5(f.read()).hexdigest()
        except Exception as e:
            self.logger.error(f"❌ Error calculando hash de {file_path}: {e}")
            return ""
    
    def are_files_identical(self, file1: Path, file2: Path) -> bool:
        """Verificar si dos archivos son idénticos"""
        if not file1.exists() or not file2.exists():
            return False
        
        # Comparar tamaños primero
        if file1.stat().st_size != file2.stat().st_size:
            return False
        
        # Comparar hashes
        hash1 = self.calculate_file_hash(file1)
        hash2 = self.calculate_file_hash(file2)
        
        return hash1 == hash2 and hash1 != ""
    
    def backup_file(self, file_path: Path) -> bool:
        """Crear respaldo de un archivo"""
        try:
            if file_path.is_file():
                backup_path = self.backup_dir / file_path.name
                shutil.copy2(file_path, backup_path)
                self.logger.info(f"📋 Respaldo creado: {backup_path}")
                return True
            elif file_path.is_dir():
                backup_path = self.backup_dir / file_path.name
                shutil.copytree(file_path, backup_path)
                self.logger.info(f"📋 Respaldo creado: {backup_path}")
                return True
        except Exception as e:
            self.logger.error(f"❌ Error creando respaldo de {file_path}: {e}")
            return False
        return False
    
    def remove_duplicate_folder(self, folder_path: Path) -> bool:
        """Eliminar carpeta duplicada"""
        try:
            if folder_path.exists():
                # Crear respaldo
                if self.backup_file(folder_path):
                    # Calcular tamaño antes de eliminar
                    folder_size = sum(f.stat().st_size for f in folder_path.rglob('*') if f.is_file())
                    
                    # Eliminar carpeta
                    shutil.rmtree(folder_path)
                    
                    # Registrar en log
                    self.cleanup_log.append({
                        "action": "removed_folder",
                        "path": str(folder_path),
                        "size_bytes": folder_size,
                        "timestamp": datetime.now().isoformat()
                    })
                    
                    self.space_saved += folder_size
                    self.logger.info(f"🗑️ Carpeta eliminada: {folder_path} ({folder_size} bytes)")
                    return True
        except Exception as e:
            self.logger.error(f"❌ Error eliminando carpeta {folder_path}: {e}")
            return False
        return False
    
    def remove_duplicate_file(self, file_path: Path) -> bool:
        """Eliminar archivo duplicado"""
        try:
            if file_path.exists():
                # Crear respaldo
                if self.backup_file(file_path):
                    # Calcular tamaño antes de eliminar
                    file_size = file_path.stat().st_size
                    
                    # Eliminar archivo
                    file_path.unlink()
                    
                    # Registrar en log
                    self.cleanup_log.append({
                        "action": "removed_file",
                        "path": str(file_path),
                        "size_bytes": file_size,
                        "timestamp": datetime.now().isoformat()
                    })
                    
                    self.space_saved += file_size
                    self.logger.info(f"🗑️ Archivo eliminado: {file_path} ({file_size} bytes)")
                    return True
        except Exception as e:
            self.logger.error(f"❌ Error eliminando archivo {file_path}: {file_path}: {e}")
            return False
        return False
    
    def verify_duplicates(self) -> Dict[str, bool]:
        """Verificar duplicaciones antes de eliminar"""
        verification_results = {}
        
        for duplicate_name, duplicate_info in self.known_duplicates.items():
            if duplicate_info["action"] == "remove_folder":
                folder_path = self.root_path / duplicate_name
                if folder_path.exists():
                    # Verificar que los archivos principales sean idénticos
                    main_files = duplicate_info["files"]
                    all_identical = True
                    
                    for file_name in main_files:
                        root_file = self.root_path / file_name
                        duplicate_file = folder_path / file_name
                        
                        if root_file.exists() and duplicate_file.exists():
                            if not self.are_files_identical(root_file, duplicate_file):
                                all_identical = False
                                self.logger.warning(f"⚠️ Archivos diferentes: {root_file} vs {duplicate_file}")
                                break
                        else:
                            all_identical = False
                            self.logger.warning(f"⚠️ Archivo no encontrado: {file_name}")
                            break
                    
                    verification_results[duplicate_name] = all_identical
                    if all_identical:
                        self.logger.info(f"✅ Verificación exitosa para: {duplicate_name}")
                    else:
                        self.logger.warning(f"⚠️ Verificación fallida para: {duplicate_name}")
            
            elif duplicate_info["action"] == "remove_file":
                file_path = self.root_path / duplicate_name
                keep_path = self.root_path / duplicate_info["keep"]
                
                if file_path.exists() and keep_path.exists():
                    # Verificar que sean diferentes (no idénticos)
                    are_different = not self.are_files_identical(file_path, keep_path)
                    verification_results[duplicate_name] = are_different
                    
                    if are_different:
                        self.logger.info(f"✅ Verificación exitosa para: {duplicate_name}")
                    else:
                        self.logger.warning(f"⚠️ Archivos idénticos: {duplicate_name}")
                else:
                    verification_results[duplicate_name] = False
                    self.logger.warning(f"⚠️ Archivo no encontrado: {duplicate_name}")
        
        return verification_results
    
    def cleanup_duplicates(self) -> bool:
        """Ejecutar limpieza de duplicados"""
        self.logger.info("🚀 Iniciando limpieza de duplicados...")
        
        # Crear respaldo
        if not self.create_backup():
            self.logger.error("❌ No se pudo crear respaldo. Abortando limpieza.")
            return False
        
        # Verificar duplicaciones
        verification_results = self.verify_duplicates()
        
        # Ejecutar limpieza
        success_count = 0
        total_count = len(self.known_duplicates)
        
        for duplicate_name, duplicate_info in self.known_duplicates.items():
            if verification_results.get(duplicate_name, False):
                if duplicate_info["action"] == "remove_folder":
                    folder_path = self.root_path / duplicate_name
                    if self.remove_duplicate_folder(folder_path):
                        success_count += 1
                
                elif duplicate_info["action"] == "remove_file":
                    file_path = self.root_path / duplicate_name
                    if self.remove_duplicate_file(file_path):
                        success_count += 1
            else:
                self.logger.warning(f"⚠️ Saltando {duplicate_name} - verificación fallida")
        
        # Generar reporte
        self.generate_report(success_count, total_count)
        
        return success_count > 0
    
    def generate_report(self, success_count: int, total_count: int):
        """Generar reporte de limpieza"""
        report = {
            "cleanup_summary": {
                "timestamp": datetime.now().isoformat(),
                "total_duplicates_found": total_count,
                "successfully_cleaned": success_count,
                "space_saved_bytes": self.space_saved,
                "space_saved_kb": round(self.space_saved / 1024, 2),
                "space_saved_mb": round(self.space_saved / (1024 * 1024), 2)
            },
            "cleanup_log": self.cleanup_log,
            "backup_location": str(self.backup_dir)
        }
        
        # Guardar reporte
        report_path = self.root_path / "reports" / f"duplicates-cleanup-report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        report_path.parent.mkdir(exist_ok=True)
        
        with open(report_path, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        # Mostrar resumen
        self.logger.info("📊 RESUMEN DE LIMPIEZA:")
        self.logger.info(f"   ✅ Duplicados limpiados: {success_count}/{total_count}")
        self.logger.info(f"   💾 Espacio recuperado: {report['cleanup_summary']['space_saved_kb']} KB")
        self.logger.info(f"   📋 Respaldo en: {self.backup_dir}")
        self.logger.info(f"   📄 Reporte guardado: {report_path}")
    
    def show_cleanup_preview(self):
        """Mostrar vista previa de lo que se va a limpiar"""
        self.logger.info("🔍 VISTA PREVIA DE LIMPIEZA:")
        
        for duplicate_name, duplicate_info in self.known_duplicates.items():
            if duplicate_info["action"] == "remove_folder":
                folder_path = self.root_path / duplicate_name
                if folder_path.exists():
                    folder_size = sum(f.stat().st_size for f in folder_path.rglob('*') if f.is_file())
                    self.logger.info(f"   📁 {duplicate_name}/ - {round(folder_size/1024, 2)} KB")
            
            elif duplicate_info["action"] == "remove_file":
                file_path = self.root_path / duplicate_name
                if file_path.exists():
                    file_size = file_path.stat().st_size
                    self.logger.info(f"   📄 {duplicate_name} - {round(file_size/1024, 2)} KB")

def main():
    """Función principal"""
    print("🧹 LIMPIADOR DE DUPLICADOS - GitHub Page Test")
    print("=" * 50)
    
    cleaner = DuplicateCleaner()
    
    # Mostrar vista previa
    cleaner.show_cleanup_preview()
    
    print("\n" + "=" * 50)
    response = input("¿Continuar con la limpieza? (s/N): ").strip().lower()
    
    if response in ['s', 'si', 'sí', 'y', 'yes']:
        print("\n🚀 Ejecutando limpieza...")
        success = cleaner.cleanup_duplicates()
        
        if success:
            print("\n✅ Limpieza completada exitosamente!")
            print("📋 Revisa el reporte generado para más detalles.")
        else:
            print("\n⚠️ La limpieza no se completó completamente.")
            print("📋 Revisa los logs para más detalles.")
    else:
        print("\n❌ Limpieza cancelada por el usuario.")

if __name__ == "__main__":
    main()
