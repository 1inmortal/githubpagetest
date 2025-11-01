#!/usr/bin/env python3
"""
🔧 SISTEMA CONSOLIDADO DE MANTENIMIENTO
======================================

Este script consolida todas las funcionalidades de mantenimiento del proyecto:
- Limpieza de duplicados
- Corrección de referencias rotas
- Corrección de referencias de audio
- Generación de placeholders

Autor: Sistema de Mantenimiento
Versión: 2.0.0
"""

import os
import re
import json
import shutil
import hashlib
import wave
import struct
import math
from pathlib import Path
from typing import Dict, List, Set, Tuple, Optional
from datetime import datetime
import logging

class MaintenanceManager:
    def __init__(self, root_path: str = "."):
        self.root_path = Path(root_path)
        self.backup_dir = self.root_path / "backup_maintenance"
        self.cleanup_log = []
        self.fixes_applied = 0
        self.space_saved = 0
        
        # Configurar logging
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s'
        )
        self.logger = logging.getLogger(__name__)
        
        # Archivos duplicados conocidos
        self.known_duplicates = {
            "index.html": ["public/index.html", "dist/index.html"],
            "LOGO.png": ["src/assets/img/FAVICON/LOGO.png", "public/img/LOGO.png"],
            "main.css": ["src/assets/css/main.css", "public/css/main.css"]
        }
        
        # Mapeo de referencias rotas a correctas
        self.reference_fixes = {
            # Referencias de LOGO.png rotas
            "srcsrcsrc/assets/img/FAVICON/LOGO.png": "src/assets/img/FAVICON/LOGO.png",
            "config/assets/img/FAVICON/LOGO.png": "src/assets/img/FAVICON/LOGO.png",
            "assets/img/FAVICON/LOGO.png": "src/assets/img/FAVICON/LOGO.png",
            
            # Referencias de CSS rotas
            "srcsrcsrc/assets/css/": "src/assets/css/",
            "config/assets/css/": "src/assets/css/",
            
            # Referencias de JS rotas
            "srcsrcsrc/assets/js/": "src/assets/js/",
            "config/assets/js/": "src/assets/js/",
            
            # Referencias de imágenes rotas
            "srcsrcsrc/assets/img/": "src/assets/img/",
            "config/assets/img/": "src/assets/img/",
        }
        
        # Patrones de reemplazo para archivos de audio
        self.audio_replacements = {
            # Servicios
            'src/assets/media/sounds/audio-services-section-enter.mp3': 'src/assets/media/sounds/audio-services-section-enter.wav',
            'src/assets/media/sounds/audio-services-title-hover.mp3': 'src/assets/media/sounds/audio-services-title-hover.wav',
            'src/assets/media/sounds/audio-services-card-hover.mp3': 'src/assets/media/sounds/audio-services-card-hover.wav',
            
            # Proyectos
            'src/assets/media/sounds/audio-projects-section-enter.mp3': 'src/assets/media/sounds/audio-projects-section-enter.wav',
            'src/assets/media/sounds/audio-projects-title-hover.mp3': 'src/assets/media/sounds/audio-projects-title-hover.wav',
            'src/assets/media/sounds/audio-projects-card-hover.mp3': 'src/assets/media/sounds/audio-projects-card-hover.wav',
            
            # Contacto
            'src/assets/media/sounds/audio-contact-section-enter.mp3': 'src/assets/media/sounds/audio-contact-section-enter.wav',
            'src/assets/media/sounds/audio-contact-form-focus.mp3': 'src/assets/media/sounds/audio-contact-form-focus.wav',
            'src/assets/media/sounds/audio-contact-form-submit.mp3': 'src/assets/media/sounds/audio-contact-form-submit.wav',
        }

    def cleanup_duplicates(self) -> bool:
        """Elimina archivos duplicados de forma segura"""
        print("🧹 Limpiando duplicados...")
        
        # Crear directorio de backup
        self.backup_dir.mkdir(exist_ok=True)
        
        duplicates_removed = 0
        
        for main_file, duplicates in self.known_duplicates.items():
            main_path = self.root_path / main_file
            if not main_path.exists():
                continue
                
            for duplicate in duplicates:
                dup_path = self.root_path / duplicate
                if dup_path.exists() and dup_path != main_path:
                    # Verificar que son idénticos
                    if self._files_identical(main_path, dup_path):
                        # Hacer backup
                        backup_path = self.backup_dir / duplicate
                        backup_path.parent.mkdir(parents=True, exist_ok=True)
                        shutil.copy2(dup_path, backup_path)
                        
                        # Eliminar duplicado
                        dup_path.unlink()
                        duplicates_removed += 1
                        self.cleanup_log.append(f"Duplicado eliminado: {duplicate}")
                        print(f"✅ Duplicado eliminado: {duplicate}")
                    else:
                        print(f"⚠️  Archivos diferentes, no eliminando: {duplicate}")
        
        # Buscar duplicados por hash
        file_hashes = {}
        duplicates_by_hash = []
        
        for file_path in self.root_path.rglob("*"):
            if file_path.is_file() and file_path.suffix in ['.html', '.css', '.js', '.png', '.jpg', '.jpeg']:
                if any(excluded in file_path.parts for excluded in ['.git', 'node_modules', 'dist', 'backup']):
                    continue
                
                try:
                    file_hash = self._calculate_file_hash(file_path)
                    if file_hash in file_hashes:
                        duplicates_by_hash.append((file_path, file_hashes[file_hash]))
                    else:
                        file_hashes[file_hash] = file_path
                except Exception as e:
                    self.logger.warning(f"Error calculando hash de {file_path}: {e}")
        
        # Eliminar duplicados por hash
        for duplicate, original in duplicates_by_hash:
            if duplicate != original:
                # Hacer backup
                backup_path = self.backup_dir / duplicate.relative_to(self.root_path)
                backup_path.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(duplicate, backup_path)
                
                # Eliminar duplicado
                duplicate.unlink()
                duplicates_removed += 1
                self.cleanup_log.append(f"Duplicado por hash eliminado: {duplicate}")
                print(f"✅ Duplicado por hash eliminado: {duplicate}")
        
        print(f"✅ Duplicados eliminados: {duplicates_removed}")
        return duplicates_removed > 0

    def _files_identical(self, file1: Path, file2: Path) -> bool:
        """Verifica si dos archivos son idénticos"""
        try:
            return file1.stat().st_size == file2.stat().st_size and \
                   self._calculate_file_hash(file1) == self._calculate_file_hash(file2)
        except:
            return False

    def _calculate_file_hash(self, file_path: Path) -> str:
        """Calcula hash MD5 de un archivo"""
        hash_md5 = hashlib.md5()
        with open(file_path, "rb") as f:
            for chunk in iter(lambda: f.read(4096), b""):
                hash_md5.update(chunk)
        return hash_md5.hexdigest()

    def fix_broken_references(self) -> bool:
        """Corrige referencias rotas en archivos"""
        print("🔗 Corrigiendo referencias rotas...")
        
        files_to_check = list(self.root_path.glob("**/*.html"))
        files_to_check.extend(list(self.root_path.glob("**/*.css")))
        files_to_check.extend(list(self.root_path.glob("**/*.js")))
        
        references_fixed = 0
        
        for file_path in files_to_check:
            if any(excluded in file_path.parts for excluded in ['.git', 'node_modules', 'dist', 'backup']):
                continue
                
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original_content = content
                
                for broken_ref, correct_ref in self.reference_fixes.items():
                    if broken_ref in content:
                        content = content.replace(broken_ref, correct_ref)
                        references_fixed += 1
                        self.cleanup_log.append(f"Referencia corregida en {file_path}: {broken_ref} -> {correct_ref}")
                
                if content != original_content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    self.fixes_applied += 1
                    
            except Exception as e:
                self.logger.warning(f"Error procesando {file_path}: {e}")
        
        print(f"✅ Referencias corregidas: {references_fixed}")
        return references_fixed > 0

    def fix_audio_references(self) -> bool:
        """Corrige referencias de audio de .mp3 a .wav"""
        print("🎵 Corrigiendo referencias de audio...")
        
        html_files = list(self.root_path.glob("**/*.html"))
        audio_fixes = 0
        
        for html_file in html_files:
            if any(excluded in html_file.parts for excluded in ['.git', 'node_modules', 'dist', 'backup']):
                continue
                
            try:
                with open(html_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original_content = content
                
                for mp3_ref, wav_ref in self.audio_replacements.items():
                    if mp3_ref in content:
                        content = content.replace(mp3_ref, wav_ref)
                        audio_fixes += 1
                        self.cleanup_log.append(f"Referencia de audio corregida en {html_file}: {mp3_ref} -> {wav_ref}")
                
                if content != original_content:
                    with open(html_file, 'w', encoding='utf-8') as f:
                        f.write(content)
                    self.fixes_applied += 1
                    
            except Exception as e:
                self.logger.warning(f"Error procesando {html_file}: {e}")
        
        print(f"✅ Referencias de audio corregidas: {audio_fixes}")
        return audio_fixes > 0

    def generate_audio_placeholders(self) -> bool:
        """Genera archivos de audio placeholder para conexiones rotas"""
        print("🎵 Generando placeholders de audio...")
        
        placeholders_created = 0
        
        for mp3_ref, wav_ref in self.audio_replacements.items():
            wav_path = self.root_path / wav_ref
            
            if not wav_path.exists():
                # Crear directorio si no existe
                wav_path.parent.mkdir(parents=True, exist_ok=True)
                
                # Generar archivo WAV placeholder
                self._create_audio_placeholder(wav_path)
                placeholders_created += 1
                self.cleanup_log.append(f"Placeholder de audio creado: {wav_path}")
        
        print(f"✅ Placeholders de audio creados: {placeholders_created}")
        return placeholders_created > 0

    def _create_audio_placeholder(self, file_path: Path, frequency: int = 440, duration: float = 1.0) -> None:
        """Crea un archivo de audio WAV placeholder"""
        sample_rate = 44100
        num_samples = int(sample_rate * duration)
        
        # Generar onda sinusoidal
        samples = []
        for i in range(num_samples):
            sample = 0.3 * math.sin(2 * math.pi * frequency * i / sample_rate)
            samples.append(int(sample * 32767))
        
        # Escribir archivo WAV
        with wave.open(str(file_path), 'w') as wav_file:
            wav_file.setnchannels(1)  # Mono
            wav_file.setsampwidth(2)  # 16-bit
            wav_file.setframerate(sample_rate)
            wav_file.writeframes(struct.pack('<' + 'h' * len(samples), *samples))

    def generate_maintenance_report(self) -> None:
        """Genera reporte de mantenimiento"""
        report = {
            "timestamp": datetime.now().isoformat(),
            "cleanup_log": self.cleanup_log,
            "fixes_applied": self.fixes_applied,
            "space_saved": self.space_saved,
            "backup_location": str(self.backup_dir)
        }
        
        report_file = self.root_path / "reports" / f"maintenance-{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        report_file.parent.mkdir(exist_ok=True)
        
        with open(report_file, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        print(f"📊 Reporte de mantenimiento generado: {report_file}")

    def run_full_maintenance(self) -> bool:
        """Ejecuta mantenimiento completo"""
        print("🔧 INICIANDO MANTENIMIENTO COMPLETO")
        print("=" * 50)
        
        # Ejecutar todas las tareas de mantenimiento
        duplicates_cleaned = self.cleanup_duplicates()
        references_fixed = self.fix_broken_references()
        audio_fixed = self.fix_audio_references()
        placeholders_created = self.generate_audio_placeholders()
        
        # Generar reporte
        self.generate_maintenance_report()
        
        # Resumen final
        print("\n" + "=" * 50)
        print("📊 RESUMEN DE MANTENIMIENTO")
        print("=" * 50)
        print(f"🧹 Duplicados eliminados: {'Sí' if duplicates_cleaned else 'No'}")
        print(f"🔗 Referencias corregidas: {'Sí' if references_fixed else 'No'}")
        print(f"🎵 Referencias de audio corregidas: {'Sí' if audio_fixed else 'No'}")
        print(f"🎵 Placeholders de audio creados: {'Sí' if placeholders_created else 'No'}")
        print(f"🔧 Total de correcciones: {self.fixes_applied}")
        print(f"💾 Espacio ahorrado: {self.space_saved / 1024:.1f}KB")
        print(f"📁 Backup creado en: {self.backup_dir}")
        
        return True

def main():
    """Función principal"""
    maintenance_manager = MaintenanceManager()
    success = maintenance_manager.run_full_maintenance()
    
    if success:
        print("\n🎉 ¡Mantenimiento completado!")
        exit(0)
    else:
        print("\n⚠️  El mantenimiento no se completó correctamente")
        exit(1)

if __name__ == "__main__":
    main()
