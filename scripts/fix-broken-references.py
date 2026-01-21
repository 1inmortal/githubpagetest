#!/usr/bin/env python3
"""
Script de Corrección de Referencias Rotas - GitHub Page Test
Corrige todas las referencias incorrectas que están causando errores 404
"""

import os
import re
import json
from pathlib import Path
from datetime import datetime
import logging

class BrokenReferencesFixer:
    def __init__(self, root_path: str = "."):
        self.root_path = Path(root_path)
        self.fixes_applied = 0
        
        # Configurar logging
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s'
        )
        self.logger = logging.getLogger(__name__)
        
        # Mapeo de referencias rotas a correctas
        self.reference_fixes = {
            # Referencias de LOGO.png rotas
            "srcsrcsrc/assets/img/FAVICON/LOGO.png": "src/assets/img/FAVICON/LOGO.png",
            "config/assets/img/FAVICON/LOGO.png": "src/assets/img/FAVICON/LOGO.png",
            
            # Referencias de JavaScript rotas
            "srcsrcsrc/assets/js/main.js": "src/assets/js/main.js",
            
            # Referencias de audio rotas (404)
            "audio-faq-question2-hover.mp3": "src/assets/media/sounds/audio-faq-question2-hover.wav",
            "audio-faq-question2-open.mp3": "src/assets/media/sounds/audio-faq-question2-open.wav",
            "audio-faq-question2-close.mp3": "src/assets/media/sounds/audio-faq-question2-close.wav",
            "audio-faq-question3-hover.mp3": "src/assets/media/sounds/audio-faq-question3-hover.wav",
            "audio-faq-question3-open.mp3": "src/assets/media/sounds/audio-faq-question3-open.wav",
            "audio-faq-question3-close.mp3": "src/assets/media/sounds/audio-faq-question3-close.wav",
            "audio-contact-section-enter.mp3": "src/assets/media/sounds/audio-contact-section-enter.wav",
            "audio-contact-title-hover.mp3": "src/assets/media/sounds/audio-contact-title-hover.wav",
            "audio-contact-name-hover.mp3": "src/assets/media/sounds/audio-contact-name-hover.wav",
            "audio-contact-name-focus.mp3": "src/assets/media/sounds/audio-contact-name-focus.wav",
            "audio-contact-name-typing.mp3": "src/assets/media/sounds/audio-contact-name-typing.wav",
            "audio-contact-email-hover.mp3": "src/assets/media/sounds/audio-contact-email-hover.wav",
            "audio-contact-email-focus.mp3": "src/assets/media/sounds/audio-contact-email-focus.wav",
            "audio-contact-email-typing.mp3": "src/assets/media/sounds/audio-contact-email-typing.wav",
            "audio-contact-message-hover.mp3": "src/assets/media/sounds/audio-contact-message-hover.wav",
            "audio-contact-message-focus.mp3": "src/assets/media/sounds/audio-contact-message-focus.wav",
            "audio-contact-message-typing.mp3": "src/assets/media/sounds/audio-contact-message-typing.wav",
            "audio-contact-send-hover.mp3": "src/assets/media/sounds/audio-contact-send-hover.wav",
            "audio-contact-send-click.mp3": "src/assets/media/sounds/audio-contact-send-click.wav",
            "audio-social-github-hover.mp3": "src/assets/media/sounds/audio-social-github-hover.wav",
            "audio-social-github-click.mp3": "src/assets/media/sounds/audio-social-github-click.wav",
            "audio-social-linkedin-hover.mp3": "src/assets/media/sounds/audio-social-linkedin-hover.wav",
            "audio-social-linkedin-click.mp3": "src/assets/media/sounds/audio-social-linkedin-click.wav",
            "audio-social-twitter-hover.mp3": "src/assets/media/sounds/audio-social-twitter-hover.wav",
            "audio-social-twitter-click.mp3": "src/assets/media/sounds/audio-social-twitter-click.wav"
        }
        
        # Tipos de archivos a procesar
        self.file_extensions = ['.html', '.js', '.css']
        
        # Archivos a excluir
        self.exclude_patterns = [
            'node_modules',
            '.git',
            'backup_',
            'dist',
            'playwright-report',
            'test-results'
        ]
    
    def should_process_file(self, file_path: Path) -> bool:
        """Determinar si un archivo debe ser procesado"""
        if file_path.suffix not in self.file_extensions:
            return False
        
        for pattern in self.exclude_patterns:
            if pattern in str(file_path):
                return False
        
        return True
    
    def fix_file_references(self, file_path: Path) -> bool:
        """Corregir referencias rotas en un archivo"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            fixes_made = False
            
            # Aplicar cada corrección
            for broken_ref, correct_ref in self.reference_fixes.items():
                if broken_ref in content:
                    content = content.replace(broken_ref, correct_ref)
                    fixes_made = True
                    self.logger.info(f"   🔧 {broken_ref} → {correct_ref}")
            
            # Si se hicieron correcciones, escribir el archivo
            if fixes_made:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                self.fixes_applied += 1
                self.logger.info(f"✅ Archivo corregido: {file_path}")
                return True
            
            return False
            
        except Exception as e:
            self.logger.error(f"❌ Error corrigiendo {file_path}: {e}")
            return False
    
    def fix_mathjs_config_error(self) -> bool:
        """Corregir el error de configuración de mathjs"""
        try:
            # Buscar archivos que contengan el error de mathjs
            mathjs_files = []
            for file_path in self.root_path.rglob('*.js'):
                if self.should_process_file(file_path):
                    try:
                        with open(file_path, 'r', encoding='utf-8') as f:
                            content = f.read()
                        
                        if 'mathjs.config' in content and 'global config is readonly' in content:
                            mathjs_files.append(file_path)
                    except:
                        continue
            
            if mathjs_files:
                self.logger.info(f"🔧 Archivos con error de mathjs encontrados: {len(mathjs_files)}")
                
                for file_path in mathjs_files:
                    try:
                        with open(file_path, 'r', encoding='utf-8') as f:
                            content = f.read()
                        
                        # Corregir la configuración de mathjs
                        if 'mathjs.config' in content:
                            # Reemplazar mathjs.config global por instancia local
                            content = content.replace(
                                'mathjs.config({',
                                'const mathjs = create(all);\nmathjs.config({'
                            )
                            
                            # Agregar import si no existe
                            if 'import { create, all }' not in content:
                                content = "import { create, all } from 'mathjs';\n" + content
                            
                            with open(file_path, 'w', encoding='utf-8') as f:
                                f.write(content)
                            
                            self.logger.info(f"✅ Error de mathjs corregido en: {file_path}")
                            self.fixes_applied += 1
                    
                    except Exception as e:
                        self.logger.error(f"❌ Error corrigiendo mathjs en {file_path}: {e}")
            
            return len(mathjs_files) > 0
            
        except Exception as e:
            self.logger.error(f"❌ Error corrigiendo mathjs: {e}")
            return False
    
    def run_fixes(self) -> bool:
        """Ejecutar todas las correcciones"""
        self.logger.info("🚀 Iniciando corrección de referencias rotas...")
        
        # Corregir referencias en archivos HTML, JS y CSS
        self.logger.info("🔧 Corrigiendo referencias rotas...")
        
        files_processed = 0
        for file_path in self.root_path.rglob('*'):
            if file_path.is_file() and self.should_process_file(file_path):
                files_processed += 1
                self.fix_file_references(file_path)
        
        self.logger.info(f"📁 Archivos procesados: {files_processed}")
        
        # Corregir error de mathjs
        self.fix_mathjs_config_error()
        
        # Generar reporte
        self.generate_fix_report()
        
        return self.fixes_applied > 0
    
    def generate_fix_report(self):
        """Generar reporte de correcciones aplicadas"""
        report = {
            "fix_summary": {
                "timestamp": datetime.now().isoformat(),
                "fixes_applied": self.fixes_applied,
                "reference_fixes": self.reference_fixes
            }
        }
        
        # Guardar reporte
        report_path = self.root_path / "reports" / f"broken-references-fix_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        report_path.parent.mkdir(exist_ok=True)
        
        with open(report_path, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        # Mostrar resumen
        self.logger.info("\n📊 RESUMEN DE CORRECCIONES:")
        self.logger.info(f"   🔧 Correcciones aplicadas: {self.fixes_applied}")
        self.logger.info(f"   📄 Reporte guardado: {report_path}")
        
        if self.fixes_applied > 0:
            self.logger.info("✅ Corrección de referencias rotas completada exitosamente!")
        else:
            self.logger.info("ℹ️ No se encontraron referencias rotas para corregir")

def main():
    """Función principal"""
    print("🔧 CORRECTOR DE REFERENCIAS ROTAS - GitHub Page Test")
    print("=" * 60)
    
    fixer = BrokenReferencesFixer()
    
    print("\n🚀 Ejecutando correcciones...")
    success = fixer.run_fixes()
    
    if success:
        print("\n✅ Corrección de referencias rotas completada exitosamente!")
        print("📋 Revisa el reporte generado para más detalles.")
    else:
        print("\nℹ️ No se encontraron referencias rotas para corregir.")
        print("📋 Revisa el reporte generado para más detalles.")

if __name__ == "__main__":
    main()
