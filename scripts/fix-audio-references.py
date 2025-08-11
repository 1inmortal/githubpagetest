#!/usr/bin/env python3
"""
Script para corregir las referencias a archivos de audio en el HTML principal
Cambia las referencias de .mp3 a .wav para los archivos generados
"""

import re
import os
from pathlib import Path

def fix_audio_references():
    """Corrige las referencias a archivos de audio en el HTML principal"""
    
    html_file = "index.html"
    
    if not os.path.exists(html_file):
        print(f"❌ Archivo {html_file} no encontrado")
        return
    
    print(f"🔧 Corrigiendo referencias de audio en {html_file}...")
    
    # Leer el archivo HTML
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Patrones de reemplazo para archivos de audio
    audio_replacements = {
        # Servicios
        'src/assets/media/sounds/audio-services-section-enter.mp3': 'src/assets/media/sounds/audio-services-section-enter.wav',
        'src/assets/media/sounds/audio-services-title-hover.mp3': 'src/assets/media/sounds/audio-services-title-hover.wav',
        'src/assets/media/sounds/audio-service-web-design-hover.mp3': 'src/assets/media/sounds/audio-service-web-design-hover.wav',
        'src/assets/media/sounds/audio-service-web-design-open.mp3': 'src/assets/media/sounds/audio-service-web-design-open.wav',
        'src/assets/media/sounds/audio-service-web-design-close.mp3': 'src/assets/media/sounds/audio-service-web-design-close.wav',
        'src/assets/media/sounds/audio-service-frontend-hover.mp3': 'src/assets/media/sounds/audio-service-frontend-hover.wav',
        'src/assets/media/sounds/audio-service-frontend-open.mp3': 'src/assets/media/sounds/audio-service-frontend-open.wav',
        'src/assets/media/sounds/audio-service-frontend-close.mp3': 'src/assets/media/sounds/audio-service-frontend-close.wav',
        'src/assets/media/sounds/audio-service-backend-hover.mp3': 'src/assets/media/sounds/audio-service-backend-hover.wav',
        'src/assets/media/sounds/audio-service-backend-open.mp3': 'src/assets/media/sounds/audio-service-backend-open.wav',
        'src/assets/media/sounds/audio-service-backend-close.mp3': 'src/assets/media/sounds/audio-service-backend-close.wav',
        
        # Proceso
        'src/assets/media/sounds/audio-process-section-enter.mp3': 'src/assets/media/sounds/audio-process-section-enter.wav',
        'src/assets/media/sounds/audio-process-step1-hover.mp3': 'src/assets/media/sounds/audio-process-step1-hover.wav',
        'src/assets/media/sounds/audio-process-step2-hover.mp3': 'src/assets/media/sounds/audio-process-step2-hover.wav',
        'src/assets/media/sounds/audio-process-step3-hover.mp3': 'src/assets/media/sounds/audio-process-step3-hover.wav',
        'src/assets/media/sounds/audio-process-step4-hover.mp3': 'src/assets/media/sounds/audio-process-step4-hover.wav',
        
        # Portfolio
        'src/assets/media/sounds/audio-portfolio-section-enter.mp3': 'src/assets/media/sounds/audio-portfolio-section-enter.wav',
        'src/assets/media/sounds/audio-portfolio-title-hover.mp3': 'src/assets/media/sounds/audio-portfolio-title-hover.wav',
        'src/assets/media/sounds/audio-portfolio-card1-hover.mp3': 'src/assets/media/sounds/audio-portfolio-card1-hover.wav',
        'src/assets/media/sounds/audio-portfolio-card1-click.mp3': 'src/assets/media/sounds/audio-portfolio-card1-click.wav',
        'src/assets/media/sounds/audio-portfolio-card2-hover.mp3': 'src/assets/media/sounds/audio-portfolio-card2-hover.wav',
        'src/assets/media/sounds/audio-portfolio-card2-click.mp3': 'src/assets/media/sounds/audio-portfolio-card2-click.wav',
        'src/assets/media/sounds/audio-portfolio-card3-hover.mp3': 'src/assets/media/sounds/audio-portfolio-card3-hover.wav',
        'src/assets/media/sounds/audio-portfolio-card3-click.mp3': 'src/assets/media/sounds/audio-portfolio-card3-click.wav',
        'src/assets/media/sounds/audio-portfolio-prev-hover.mp3': 'src/assets/media/sounds/audio-portfolio-prev-hover.wav',
        'src/assets/media/sounds/audio-portfolio-prev-click.mp3': 'src/assets/media/sounds/audio-portfolio-prev-click.wav',
        'src/assets/media/sounds/audio-portfolio-next-hover.mp3': 'src/assets/media/sounds/audio-portfolio-next-hover.wav',
        'src/assets/media/sounds/audio-portfolio-next-click.mp3': 'src/assets/media/sounds/audio-portfolio-next-click.wav',
        'src/assets/media/sounds/audio-portfolio-indicator1-hover.mp3': 'src/assets/media/sounds/audio-portfolio-indicator1-hover.wav',
        'src/assets/media/sounds/audio-portfolio-indicator1-click.mp3': 'src/assets/media/sounds/audio-portfolio-indicator1-click.wav',
        'src/assets/media/sounds/audio-portfolio-indicator2-hover.mp3': 'src/assets/media/sounds/audio-portfolio-indicator2-hover.wav',
        'src/assets/media/sounds/audio-portfolio-indicator2-click.mp3': 'src/assets/media/sounds/audio-portfolio-indicator2-click.wav',
        'src/assets/media/sounds/audio-portfolio-indicator3-hover.mp3': 'src/assets/media/sounds/audio-portfolio-indicator3-hover.wav',
        'src/assets/media/sounds/audio-portfolio-indicator3-click.mp3': 'src/assets/media/sounds/audio-portfolio-indicator3-click.wav',
        
        # Testimonios
        'src/assets/media/sounds/audio-testimonials-section-enter.mp3': 'src/assets/media/sounds/audio-testimonials-section-enter.wav',
        'src/assets/media/sounds/audio-testimonials-title-hover.mp3': 'src/assets/media/sounds/audio-testimonials-title-hover.wav',
        'src/assets/media/sounds/audio-testimonial1-hover.mp3': 'src/assets/media/sounds/audio-testimonial1-hover.wav',
        'src/assets/media/sounds/audio-testimonial2-hover.mp3': 'src/assets/media/sounds/audio-testimonial2-hover.wav',
        'src/assets/media/sounds/audio-testimonial3-hover.mp3': 'src/assets/media/sounds/audio-testimonial3-hover.wav',
        'src/assets/media/sounds/audio-testimonials-prev-hover.mp3': 'src/assets/media/sounds/audio-testimonials-prev-hover.wav',
        'src/assets/media/sounds/audio-testimonials-prev-click.mp3': 'src/assets/media/sounds/audio-testimonials-prev-click.wav',
        'src/assets/media/sounds/audio-testimonials-next-hover.mp3': 'src/assets/media/sounds/audio-testimonials-next-hover.wav',
        'src/assets/media/sounds/audio-testimonials-next-click.mp3': 'src/assets/media/sounds/audio-testimonials-next-click.wav',
        
        # FAQ
        'src/assets/media/sounds/audio-faq-section-enter.mp3': 'src/assets/media/sounds/audio-faq-section-enter.wav',
        'src/assets/media/sounds/audio-faq-title-hover.mp3': 'src/assets/media/sounds/audio-faq-title-hover.wav',
        'src/assets/media/sounds/audio-faq-question1-hover.mp3': 'src/assets/media/sounds/audio-faq-question1-hover.wav',
        'src/assets/media/sounds/audio-faq-question1-open.mp3': 'src/assets/media/sounds/audio-faq-question1-open.wav',
        'src/assets/media/sounds/audio-faq-question1-close.mp3': 'src/assets/media/sounds/audio-faq-question1-close.wav'
    }
    
    # Contador de reemplazos
    replacements_count = 0
    
    # Realizar reemplazos
    for old_path, new_path in audio_replacements.items():
        if old_path in content:
            content = content.replace(old_path, new_path)
            replacements_count += 1
            print(f"✅ Reemplazado: {old_path} → {new_path}")
    
    # Escribir el archivo corregido
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"\n🎯 Corrección completada!")
    print(f"📊 Total de reemplazos realizados: {replacements_count}")
    
    if replacements_count == 0:
        print("💡 No se encontraron referencias a archivos de audio MP3 para corregir")

if __name__ == "__main__":
    fix_audio_references()
