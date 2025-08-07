#!/usr/bin/env python3
"""
Script para corregir automáticamente las referencias rotas en archivos index.*
Basado en el análisis de dependencias realizado
"""

import os
import re
import json
from pathlib import Path
from typing import Dict, List, Tuple

class ReferenceFixer:
    def __init__(self):
        self.fixes_applied = 0
        self.fixes_failed = 0
        self.fixes_log = []
    
    def load_analysis_report(self, report_file: str = "main-index-files-analysis.json") -> Dict:
        """Carga el reporte de análisis"""
        try:
            with open(report_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            print(f"❌ No se encontró el archivo {report_file}")
            return None
    
    def apply_fix(self, file_path: str, line_number: int, old_reference: str, new_reference: str) -> bool:
        """Aplica una corrección específica a un archivo"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            lines = content.split('\n')
            if line_number <= 0 or line_number > len(lines):
                return False
            
            # Obtener la línea a modificar
            target_line = lines[line_number - 1]
            
            # Aplicar la corrección
            if old_reference in target_line:
                new_line = target_line.replace(old_reference, new_reference)
                lines[line_number - 1] = new_line
                
                # Escribir el archivo modificado
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write('\n'.join(lines))
                
                self.fixes_log.append({
                    'file': file_path,
                    'line': line_number,
                    'old': old_reference,
                    'new': new_reference,
                    'status': 'success'
                })
                return True
            else:
                self.fixes_log.append({
                    'file': file_path,
                    'line': line_number,
                    'old': old_reference,
                    'new': new_reference,
                    'status': 'failed - reference not found'
                })
                return False
                
        except Exception as e:
            self.fixes_log.append({
                'file': file_path,
                'line': line_number,
                'old': old_reference,
                'new': new_reference,
                'status': f'failed - {str(e)}'
            })
            return False
    
    def fix_main_css_reference(self):
        """Corrige la referencia a main.css en index.html"""
        fixes = [
            {
                'file': 'index.html',
                'line': 50,
                'old': 'src/assets/css/main.css',
                'new': 'src/assets/css/navegacion.css'
            },
            {
                'file': 'index.html',
                'line': 4025,
                'old': 'src/assets/css/main.css',
                'new': 'src/assets/css/navegacion.css'
            }
        ]
        
        for fix in fixes:
            if self.apply_fix(fix['file'], fix['line'], fix['old'], fix['new']):
                self.fixes_applied += 1
            else:
                self.fixes_failed += 1
    
    def fix_manifest_reference(self):
        """Corrige la referencia a manifest.json"""
        fix = {
            'file': 'index.html',
            'line': 55,
            'old': 'manifest.json',
            'new': 'config/manifest.json'
        }
        
        if self.apply_fix(fix['file'], fix['line'], fix['old'], fix['new']):
            self.fixes_applied += 1
        else:
            self.fixes_failed += 1
    
    def fix_blog_reference(self):
        """Corrige la referencia al blog"""
        fix = {
            'file': 'index.html',
            'line': 4060,
            'old': 'Blog/Ceo.html',
            'new': 'src/components/Blog/Ceo.html'
        }
        
        if self.apply_fix(fix['file'], fix['line'], fix['old'], fix['new']):
            self.fixes_applied += 1
        else:
            self.fixes_failed += 1
    
    def fix_sitemap_reference(self):
        """Corrige la referencia al sitemap"""
        fix = {
            'file': 'index.html',
            'line': 6448,
            'old': 'sitemap.xml',
            'new': 'src/sitemap.xml'
        }
        
        if self.apply_fix(fix['file'], fix['line'], fix['old'], fix['new']):
            self.fixes_applied += 1
        else:
            self.fixes_failed += 1
    
    def fix_robots_reference(self):
        """Corrige la referencia a robots.txt"""
        fix = {
            'file': 'index.html',
            'line': 6449,
            'old': 'robots.txt',
            'new': 'src/robots.txt'
        }
        
        if self.apply_fix(fix['file'], fix['line'], fix['old'], fix['new']):
            self.fixes_applied += 1
        else:
            self.fixes_failed += 1
    
    def fix_certificados_references(self):
        """Corrige las referencias en el archivo de certificados"""
        fixes = [
            {
                'file': 'src/components/Certificados/index.html',
                'line': 7,
                'old': 'styles.css',
                'new': 'index.css'
            },
            {
                'file': 'src/components/Certificados/index.html',
                'line': 8,
                'old': 'script.js',
                'new': 'index.js'
            }
        ]
        
        for fix in fixes:
            if self.apply_fix(fix['file'], fix['line'], fix['old'], fix['new']):
                self.fixes_applied += 1
            else:
                self.fixes_failed += 1
    
    def fix_image_references(self):
        """Corrige referencias de imágenes comunes"""
        image_fixes = [
            {
                'file': 'src/components/evidencias/laboratorio/index.html',
                'line': 13,
                'old': 'IMG/FAVICON/LOGO.png',
                'new': 'src/assets/img/FAVICON/LOGO.png'
            },
            {
                'file': 'src/components/evidencias/diseños/codepen/index.html',
                'line': 8,
                'old': '/assets/img/FAVICON/LOGO.png',
                'new': 'src/assets/img/FAVICON/LOGO.png'
            },
            {
                'file': 'src/components/evidencias/diseños/codepen/index.html',
                'line': 661,
                'old': '/assets/img/FAVICON/LOGO.png',
                'new': 'src/assets/img/FAVICON/LOGO.png'
            }
        ]
        
        for fix in image_fixes:
            if self.apply_fix(fix['file'], fix['line'], fix['old'], fix['new']):
                self.fixes_applied += 1
            else:
                self.fixes_failed += 1
    
    def fix_audio_references(self):
        """Corrige referencias de audio"""
        audio_fix = {
            'file': 'src/components/evidencias/laboratorio/index.html',
            'line': 1842,
            'old': 'Audio/Hybrid & Dark.mp3',
            'new': 'src/assets/media/Hybrid & Dark.mp3'
        }
        
        if self.apply_fix(audio_fix['file'], audio_fix['line'], audio_fix['old'], audio_fix['new']):
            self.fixes_applied += 1
        else:
            self.fixes_failed += 1
    
    def fix_mp3_carrusel_references(self):
        """Corrige referencias en el carrusel MP3"""
        mp3_fixes = [
            {
                'file': 'src/components/evidencias/diseños/mp3-carrusel/index.html',
                'line': 442,
                'old': 'assets/img/DEMBO.jpeg',
                'new': 'img/DEMBO.jpeg'
            },
            {
                'file': 'src/components/evidencias/diseños/mp3-carrusel/index.html',
                'line': 469,
                'old': 'assets/img/DEMBO.jpeg',
                'new': 'img/DEMBO.jpeg'
            },
            {
                'file': 'src/components/evidencias/diseños/mp3-carrusel/index.html',
                'line': 478,
                'old': 'assets/img/LOCURA.jpeg',
                'new': 'img/LOCURA.jpeg'
            },
            {
                'file': 'src/components/evidencias/diseños/mp3-carrusel/index.html',
                'line': 487,
                'old': 'assets/img/GALACTICO.jpeg',
                'new': 'img/GALACTICO.jpeg'
            },
            {
                'file': 'src/components/evidencias/diseños/mp3-carrusel/index.html',
                'line': 496,
                'old': 'assets/img/RETURN TO ZERO.jpeg',
                'new': 'img/RETURN TO ZERO.jpeg'
            },
            {
                'file': 'src/components/evidencias/diseños/mp3-carrusel/index.html',
                'line': 505,
                'old': 'assets/img/IMPERIUM.jpeg',
                'new': 'img/IMPERIUM.jpeg'
            },
            {
                'file': 'src/components/evidencias/diseños/mp3-carrusel/index.html',
                'line': 514,
                'old': 'assets/img/UNIVERSO.jpg',
                'new': 'img/UNIVERSO.jpg'
            }
        ]
        
        for fix in mp3_fixes:
            if self.apply_fix(fix['file'], fix['line'], fix['old'], fix['new']):
                self.fixes_applied += 1
            else:
                self.fixes_failed += 1
    
    def fix_web_uman_references(self):
        """Corrige referencias en web-uman"""
        web_uman_fixes = [
            {
                'file': 'src/components/evidencias/diseños/web-uman/index.html',
                'line': 751,
                'old': 'assets/img/U-removebg-preview.png',
                'new': 'img/U-removebg-preview.png'
            },
            {
                'file': 'src/components/evidencias/diseños/web-uman/index.html',
                'line': 807,
                'old': 'assets/img/6.jpg',
                'new': 'img/6.jpg'
            },
            {
                'file': 'src/components/evidencias/diseños/web-uman/index.html',
                'line': 819,
                'old': 'assets/img/3.jpg',
                'new': 'img/3.jpg'
            },
            {
                'file': 'src/components/evidencias/diseños/web-uman/index.html',
                'line': 826,
                'old': 'assets/img/5.jpg',
                'new': 'img/5.jpg'
            },
            {
                'file': 'src/components/evidencias/diseños/web-uman/index.html',
                'line': 833,
                'old': 'assets/img/6.jpg',
                'new': 'img/6.jpg'
            },
            {
                'file': 'src/components/evidencias/diseños/web-uman/index.html',
                'line': 850,
                'old': 'assets/img/6.jpg',
                'new': 'img/6.jpg'
            },
            {
                'file': 'src/components/evidencias/diseños/web-uman/index.html',
                'line': 927,
                'old': 'assets/img/7.jpg',
                'new': 'img/7.jpg'
            }
        ]
        
        for fix in web_uman_fixes:
            if self.apply_fix(fix['file'], fix['line'], fix['old'], fix['new']):
                self.fixes_applied += 1
            else:
                self.fixes_failed += 1
    
    def fix_hackin_etico_references(self):
        """Corrige referencias en HACKIN ETICO"""
        hackin_fixes = [
            {
                'file': 'src/components/evidencias/presentacion/HACKIN ETICO/index.html',
                'line': 449,
                'old': 'assets/img/kali.jpg',
                'new': 'src/img/kali.jpg'
            },
            {
                'file': 'src/components/evidencias/presentacion/HACKIN ETICO/index.html',
                'line': 450,
                'old': 'assets/img/kali.jpg',
                'new': 'src/img/kali.jpg'
            }
        ]
        
        for fix in hackin_fixes:
            if self.apply_fix(fix['file'], fix['line'], fix['old'], fix['new']):
                self.fixes_applied += 1
            else:
                self.fixes_failed += 1
    
    def apply_all_fixes(self):
        """Aplica todas las correcciones automáticas"""
        print("🔧 Aplicando correcciones automáticas...")
        
        # Aplicar todas las correcciones
        self.fix_main_css_reference()
        self.fix_manifest_reference()
        self.fix_blog_reference()
        self.fix_sitemap_reference()
        self.fix_robots_reference()
        self.fix_certificados_references()
        self.fix_image_references()
        self.fix_audio_references()
        self.fix_mp3_carrusel_references()
        self.fix_web_uman_references()
        self.fix_hackin_etico_references()
        
        # Guardar log de correcciones
        with open('fixes-applied.json', 'w', encoding='utf-8') as f:
            json.dump({
                'summary': {
                    'total_fixes_applied': self.fixes_applied,
                    'total_fixes_failed': self.fixes_failed
                },
                'fixes_log': self.fixes_log
            }, f, indent=2, ensure_ascii=False)
        
        print(f"\n✅ Correcciones aplicadas: {self.fixes_applied}")
        print(f"❌ Correcciones fallidas: {self.fixes_failed}")
        print(f"📝 Log guardado en: fixes-applied.json")

def main():
    """Función principal"""
    print("🔧 INICIANDO CORRECCIÓN AUTOMÁTICA DE REFERENCIAS")
    print("="*60)
    
    fixer = ReferenceFixer()
    fixer.apply_all_fixes()
    
    print("\n" + "="*60)
    print("📊 RESUMEN DE CORRECCIONES")
    print("="*60)
    
    # Mostrar algunas correcciones aplicadas
    print("\n🔧 Correcciones aplicadas:")
    for fix in fixer.fixes_log[:10]:  # Mostrar solo las primeras 10
        status_icon = "✅" if fix['status'] == 'success' else "❌"
        print(f"   {status_icon} {fix['file']}:{fix['line']}")
        print(f"      • {fix['old']} → {fix['new']}")
    
    if len(fixer.fixes_log) > 10:
        print(f"   ... y {len(fixer.fixes_log) - 10} correcciones más")
    
    print(f"\n💡 Recomendaciones:")
    print("   • Revisa los archivos modificados para verificar que las correcciones sean correctas")
    print("   • Algunas referencias a archivos de audio y video pueden necesitar corrección manual")
    print("   • Las referencias a secciones internas (#) son válidas y no necesitan corrección")
    print("   • Considera crear los archivos faltantes o ajustar las rutas según tu estructura")

if __name__ == "__main__":
    main()
