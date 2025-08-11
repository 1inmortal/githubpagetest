#!/usr/bin/env python3
"""
Script para generar archivos de audio placeholder
para las conexiones rotas detectadas en el análisis
"""

import os
import wave
import struct
import math
from pathlib import Path

def generate_sine_wave(frequency, duration, sample_rate=44100, amplitude=0.3):
    """Genera una onda sinusoidal simple"""
    num_samples = int(sample_rate * duration)
    samples = []
    
    for i in range(num_samples):
        sample = amplitude * math.sin(2 * math.pi * frequency * i / sample_rate)
        samples.append(sample)
    
    return samples

def create_audio_file(filename, frequency=440, duration=1.0, sample_rate=44100):
    """Crea un archivo de audio WAV simple"""
    samples = generate_sine_wave(frequency, duration, sample_rate)
    
    # Crear directorio si no existe
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    
    with wave.open(filename, 'w') as wav_file:
        # Configurar parámetros del archivo WAV
        wav_file.setnchannels(1)  # Mono
        wav_file.setsampwidth(2)  # 16-bit
        wav_file.setframerate(sample_rate)
        
        # Escribir muestras
        for sample in samples:
            # Convertir a 16-bit integer
            sample_int = int(sample * 32767)
            wav_file.writeframes(struct.pack('h', sample_int))

def generate_all_audio_files():
    """Genera todos los archivos de audio que faltan"""
    
    # Lista de archivos de audio que faltan según el análisis
    audio_files = [
        # Servicios
        "src/assets/media/sounds/audio-services-section-enter.mp3",
        "src/assets/media/sounds/audio-services-title-hover.mp3",
        "src/assets/media/sounds/audio-service-web-design-hover.mp3",
        "src/assets/media/sounds/audio-service-web-design-open.mp3",
        "src/assets/media/sounds/audio-service-web-design-close.mp3",
        "src/assets/media/sounds/audio-service-frontend-hover.mp3",
        "src/assets/media/sounds/audio-service-frontend-open.mp3",
        "src/assets/media/sounds/audio-service-frontend-close.mp3",
        "src/assets/media/sounds/audio-service-backend-hover.mp3",
        "src/assets/media/sounds/audio-service-backend-open.mp3",
        "src/assets/media/sounds/audio-service-backend-close.mp3",
        
        # Proceso
        "src/assets/media/sounds/audio-process-section-enter.mp3",
        "src/assets/media/sounds/audio-process-step1-hover.mp3",
        "src/assets/media/sounds/audio-process-step2-hover.mp3",
        "src/assets/media/sounds/audio-process-step3-hover.mp3",
        "src/assets/media/sounds/audio-process-step4-hover.mp3",
        
        # Portfolio
        "src/assets/media/sounds/audio-portfolio-section-enter.mp3",
        "src/assets/media/sounds/audio-portfolio-title-hover.mp3",
        "src/assets/media/sounds/audio-portfolio-card1-hover.mp3",
        "src/assets/media/sounds/audio-portfolio-card1-click.mp3",
        "src/assets/media/sounds/audio-portfolio-card2-hover.mp3",
        "src/assets/media/sounds/audio-portfolio-card2-click.mp3",
        "src/assets/media/sounds/audio-portfolio-card3-hover.mp3",
        "src/assets/media/sounds/audio-portfolio-card3-click.mp3",
        "src/assets/media/sounds/audio-portfolio-prev-hover.mp3",
        "src/assets/media/sounds/audio-portfolio-prev-click.mp3",
        "src/assets/media/sounds/audio-portfolio-next-hover.mp3",
        "src/assets/media/sounds/audio-portfolio-next-click.mp3",
        "src/assets/media/sounds/audio-portfolio-indicator1-hover.mp3",
        "src/assets/media/sounds/audio-portfolio-indicator1-click.mp3",
        "src/assets/media/sounds/audio-portfolio-indicator2-hover.mp3",
        "src/assets/media/sounds/audio-portfolio-indicator2-click.mp3",
        "src/assets/media/sounds/audio-portfolio-indicator3-hover.mp3",
        "src/assets/media/sounds/audio-portfolio-indicator3-click.mp3",
        
        # Testimonios
        "src/assets/media/sounds/audio-testimonials-section-enter.mp3",
        "src/assets/media/sounds/audio-testimonials-title-hover.mp3",
        "src/assets/media/sounds/audio-testimonial1-hover.mp3",
        "src/assets/media/sounds/audio-testimonial2-hover.mp3",
        "src/assets/media/sounds/audio-testimonial3-hover.mp3",
        "src/assets/media/sounds/audio-testimonials-prev-hover.mp3",
        "src/assets/media/sounds/audio-testimonials-prev-click.mp3",
        "src/assets/media/sounds/audio-testimonials-next-hover.mp3",
        "src/assets/media/sounds/audio-testimonials-next-click.mp3",
        
        # FAQ
        "src/assets/media/sounds/audio-faq-section-enter.mp3",
        "src/assets/media/sounds/audio-faq-title-hover.mp3",
        "src/assets/media/sounds/audio-faq-question1-hover.mp3",
        "src/assets/media/sounds/audio-faq-question1-open.mp3",
        "src/assets/media/sounds/audio-faq-question1-close.mp3"
    ]
    
    print("🎵 Generando archivos de audio placeholder...")
    
    # Frecuencias diferentes para variedad
    frequencies = [440, 523, 659, 784, 880, 1047, 1319, 1568]
    freq_index = 0
    
    for audio_file in audio_files:
        # Generar archivo WAV temporal
        temp_wav = audio_file.replace('.mp3', '.wav')
        
        # Frecuencia rotativa para variedad
        frequency = frequencies[freq_index % len(frequencies)]
        freq_index += 1
        
        # Duración basada en el tipo de sonido
        if 'click' in audio_file:
            duration = 0.1  # Sonidos de click cortos
        elif 'hover' in audio_file:
            duration = 0.2  # Sonidos de hover medianos
        else:
            duration = 0.5  # Sonidos de entrada más largos
        
        try:
            create_audio_file(temp_wav, frequency, duration)
            print(f"✅ Generado: {temp_wav}")
        except Exception as e:
            print(f"❌ Error generando {temp_wav}: {e}")
    
    print("\n🎯 Archivos de audio placeholder generados exitosamente!")
    print("💡 Nota: Estos son archivos WAV temporales. Para producción,")
    print("   considera convertir a MP3 usando herramientas como FFmpeg.")

if __name__ == "__main__":
    generate_all_audio_files()
