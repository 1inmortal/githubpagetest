import argparse
import os
import sys
import time
import math
import csv
import random
import cv2
import numpy as np
from collections import deque, defaultdict
from datetime import timedelta, datetime
from ultralytics import YOLO
import easyocr
import json

# ============================ Config / Constantes ============================
# Clases de COCO que nos interesan
CLASES_COCO = {"person":0,"bicycle":1,"car":2,"motorbike":3,"bus":5,"truck":7}

# Umbrales de velocidad en km/h (más realistas)
VEL_VERDE = 50.0
VEL_AMARILLO = 80.0
VEL_MAX_REALISTA = 120.0  # Velocidad máxima realista en ciudad

# Estilo del HUD
FONT_UI = cv2.FONT_HERSHEY_DUPLEX
THEME = {"ink":(235,235,238),"muted":(185,185,195),"brand":(0,190,255),"panel":(22,22,28),"line":(70,70,88), "alert":(20,20,220)}

# --- Constantes para medición real mejorada ---
# Parámetros de la cámara (ajustar según tu configuración real)
CAMERA_HEIGHT_M = 5.0  # Altura real de la cámara desde el suelo
CAMERA_ANGLE_DEG = 15.0  # Ángulo de inclinación de la cámara (hacia abajo)
FOCAL_LENGTH_PX = 1000.0  # Distancia focal en píxeles (calibrar)
KNOWN_OBJECT_HEIGHT_M = 1.5  # Altura real de un vehículo promedio
KNOWN_OBJECT_HEIGHT_PX = 80  # Altura en píxeles del mismo vehículo a distancia conocida
KNOWN_DISTANCE_M = 25.0  # Distancia real a ese vehículo de referencia

# Configuración para captura de fotos
CAPTURE_FOLDER = "capturas_vehiculos"
MIN_CONFIDENCE_FOR_CAPTURE = 0.6  # Confianza mínima para capturar foto
MIN_SPEED_FOR_CAPTURE = 5.0  # Velocidad mínima para considerar movimiento real

# Configuración para captura única y de alta calidad
CAPTURE_ONE_PER_VEHICLE = True  # Solo una captura por vehículo
CAPTURE_BEST_MOMENT = True  # Capturar en el mejor momento (más cerca)
CAPTURE_FULL_FRAME = False  # Capturar solo la región del vehículo
CAPTURE_ENHANCED = False  # Aplicar mejoras de imagen automáticamente (desactivado por defecto)
CAPTURE_ORIGINAL_COLORS = True  # Mantener colores originales sin distorsión
CAPTURE_ZOOM_FACTOR = 3.0  # Factor de zoom para región del vehículo (más grande)
CAPTURE_RESOLUTION_BOOST = True  # Aumentar resolución de la imagen
CAPTURE_QUALITY = 100  # Calidad JPEG máxima (1-100)
CAPTURE_MIN_DISTANCE = 15.0  # Distancia mínima para capturar (más cerca = mejor)

# --- NUEVA CONFIGURACIÓN PARA SELECCIÓN INTELIGENTE ---
CAPTURE_INTELLIGENT_SELECTION = True  # Activar selección inteligente de frames
CAPTURE_ANALYSIS_WINDOW = 30  # Ventana de análisis en frames para encontrar el mejor momento
CAPTURE_QUALITY_THRESHOLD = 0.3  # Umbral mínimo de calidad para considerar captura (reducido de 0.7)
CAPTURE_STABILITY_THRESHOLD = 0.5  # Umbral de estabilidad del vehículo (reducido de 0.8)
CAPTURE_ANGLE_OPTIMIZATION = True  # Optimizar por ángulo de visión del vehículo
CAPTURE_MULTI_FACTOR_SCORING = True  # Usar puntuación multi-factor para selección

# Configuración para organización de capturas
ORGANIZE_BY_TYPE = True  # Organizar por tipo de vehículo
ORGANIZE_BY_DATE = True  # Organizar por fecha
ORGANIZE_BY_SPEED = True  # Organizar por velocidad
CREATE_INFRACTIONS_FOLDER = True  # Carpeta para infracciones
CREATE_SUSPICIOUS_FOLDER = True  # Carpeta para vehículos sospechosos

# Umbrales para clasificación
SPEED_INFRACTION_THRESHOLD = 80.0  # km/h para considerar infracción
SUSPICIOUS_STOP_TIME = 30.0  # segundos parado para considerar sospechoso

# Inicialización del lector de matrículas (una sola vez)
try:
    LPR_READER = easyocr.Reader(['es'], gpu=True)
    print("✅ Lector de matrículas (ANPR) cargado en GPU.")
except Exception as e:
    LPR_READER = easyocr.Reader(['es'], gpu=False)
    print(f"⚠️  No se pudo cargar LPR en GPU ({e}), usando CPU. Puede ser lento.")

# --- NUEVO: MODO DE CAPTURA SIMPLE ---
CAPTURE_SIMPLE_MODE = False  # Modo simple para capturar más fácilmente
CAPTURE_FALLBACK_AFTER_FRAMES = 50  # Capturar después de N frames si no se cumple criterio inteligente

# ============================ Funciones de UI y Lógica ============================

def lerp(a,b,t): return a + (b-a)*t

def make_layout(W, H):
    m = int(lerp(0.04, 0.08, np.clip(1280/max(1,W), 0, 1)) * min(W,H))
    safe = {"l": m, "t": m, "r": W - m, "b": H - m}
    cols = 12; gutter = max(8, int(W*0.008))
    col_w = int((safe["r"] - safe["l"] - gutter*(cols-1)) / cols)
    scale = float(np.clip(W/1280.0, 0.75, 1.35))
    return {"safe": safe, "cols": cols, "col_w": col_w, "gutter": gutter, "scale": scale}

def _color_velocidad(kmh):
    if kmh is None: return THEME["muted"]
    if kmh < VEL_VERDE: return (60, 220, 60)
    if kmh < VEL_AMARILLO: return (60, 180, 255)
    if kmh < VEL_MAX_REALISTA: return (50, 60, 255)
    return (20, 20, 255)  # Rojo para velocidades irreales

def _rounded_box(img, pt1, pt2, color_bg, alpha, r, border, border_col):
    x1, y1 = int(pt1[0]), int(pt1[1]); x2, y2 = int(pt2[0]), int(pt2[1])
    w, h = x2 - x1, y2 - y1; r = min(r, w//2, h//2)
    overlay = img.copy()
    # Dibuja los rectángulos y círculos para las esquinas redondeadas
    cv2.rectangle(overlay, (x1 + r, y1), (x2 - r, y2), color_bg, -1)
    cv2.rectangle(overlay, (x1, y1 + r), (x2, y2 - r), color_bg, -1)
    cv2.circle(overlay, (x1 + r, y1 + r), r, color_bg, -1)
    cv2.circle(overlay, (x2 - r, y1 + r), r, color_bg, -1)
    cv2.circle(overlay, (x1 + r, y2 - r), r, color_bg, -1)
    cv2.circle(overlay, (x2 - r, y2 - r), r, color_bg, -1)
    cv2.addWeighted(overlay, alpha, img, 1 - alpha, 0, img)
    # Dibuja el borde
    if border > 0:
        cv2.line(img, (x1 + r, y1), (x2 - r, y1), border_col, border)
        cv2.line(img, (x1 + r, y2), (x2 - r, y2), border_col, border)
        cv2.line(img, (x1, y1 + r), (x1, y2 - r), border_col, border)
        cv2.line(img, (x2, y1 + r), (x2, y2 - r), border_col, border)
        cv2.ellipse(img, (x1 + r, y1 + r), (r, r), 180, 0, 90, border_col, border)
        cv2.ellipse(img, (x2 - r, y1 + r), (r, r), 270, 0, 90, border_col, border)
        cv2.ellipse(img, (x1 + r, y2 - r), (r, r), 90, 0, 90, border_col, border)
        cv2.ellipse(img, (x2 - r, y2 - r), (r, r), 0, 0, 90, border_col, border)


def _put_label(img, text, x, y, scale=0.55, col=(240,240,240), thick=1):
    cv2.putText(img, str(text), (int(x), int(y)), FONT_UI, float(scale), col, int(thick), cv2.LINE_AA)

def _blit(img, small, x, y):
    sh, sw = small.shape[:2]; x, y = int(x), int(y)
    x2, y2 = min(img.shape[1], x+sw), min(img.shape[0], y+sh)
    if y2 <= y or x2 <= x: return
    img[y:y2, x:x2] = small[:(y2-y), :(x2-x)]

# --- Lógica de Medición Real Mejorada ---

def setup_calibration(args):
    """Configuración de calibración real de la cámara"""
    return {
        'camera_height': CAMERA_HEIGHT_M,
        'camera_angle': math.radians(CAMERA_ANGLE_DEG),
        'focal_length': FOCAL_LENGTH_PX,
        'known_object_height': KNOWN_OBJECT_HEIGHT_M,
        'known_object_height_px': KNOWN_OBJECT_HEIGHT_PX,
        'known_distance': KNOWN_DISTANCE_M
    }

def calculate_real_distance(bbox_height_px, calib):
    """
    Calcula la distancia real usando la geometría de la cámara y la perspectiva.
    Basado en la relación entre altura del objeto en píxeles y distancia real.
    """
    if bbox_height_px < 1:
        return None
    
    # Usar la relación de triángulos similares
    # distancia_real = (altura_objeto_real * distancia_focal) / altura_objeto_px
    distance_m = (calib['known_object_height'] * calib['focal_length']) / bbox_height_px
    
    # Ajuste por el ángulo de la cámara (corrección de perspectiva)
    angle_correction = math.cos(calib['camera_angle'])
    distance_m *= angle_correction
    
    return max(0.1, distance_m)  # Mínimo 0.1 metros

def calculate_real_speed_improved(positions_world, time_delta, calib):
    """
    Calcula la velocidad real con mejoras para evitar valores irreales.
    """
    if len(positions_world) < 2 or time_delta <= 0:
        return None
    
    # Filtrar posiciones que tengan sentido físico
    valid_positions = []
    for i in range(1, len(positions_world)):
        dx = positions_world[i][0] - positions_world[i-1][0]
        dy = positions_world[i][1] - positions_world[i-1][1]
        distance = math.sqrt(dx*dx + dy*dy)
        
        # Filtrar movimientos muy pequeños (ruido) o muy grandes (error de medición)
        if 0.1 < distance < 50.0:  # Entre 10cm y 50m por frame
            valid_positions.append((dx, dy))
    
    if len(valid_positions) < 1:
        return None
    
    # Calcular velocidad promedio usando solo movimientos válidos
    total_distance = sum(math.sqrt(dx*dx + dy*dy) for dx, dy in valid_positions)
    speed_ms = total_distance / time_delta
    speed_kmh = speed_ms * 3.6
    
    # Aplicar límites realistas
    if speed_kmh > VEL_MAX_REALISTA:
        # Si la velocidad es muy alta, usar un valor más conservador
        speed_kmh = min(speed_kmh * 0.7, VEL_MAX_REALISTA)
    
    return speed_kmh

def world_to_image_coords(world_point, calib, frame_height):
    """
    Convierte coordenadas del mundo real a coordenadas de imagen.
    """
    # Aplicar transformación inversa de la perspectiva de la cámara
    x_world, y_world = world_point
    
    # Corrección por altura de la cámara y ángulo
    z_corrected = y_world * math.cos(calib['camera_angle'])
    
    # Proyección a coordenadas de imagen
    x_img = x_world * calib['focal_length'] / z_corrected + frame_height / 2
    y_img = y_world * calib['focal_length'] / z_corrected + frame_height / 2
    
    return np.array([x_img, y_img])

def image_to_world_coords(image_point, calib, frame_height):
    """
    Convierte coordenadas de imagen a coordenadas del mundo real.
    """
    x_img, y_img = image_point
    
    # Centrar las coordenadas de imagen
    x_centered = x_img - frame_height / 2
    y_centered = y_img - frame_height / 2
    
    # Aplicar transformación de perspectiva real
    # Usar la distancia focal y la altura de la cámara
    z_world = calib['focal_length'] * calib['camera_height'] / (y_centered + 1e-6)
    x_world = x_centered * z_world / calib['focal_length']
    y_world = z_world
    
    # Corrección por el ángulo de la cámara
    y_world = y_world / math.cos(calib['camera_angle'])
    
    return np.array([x_world, y_world])

def sharpness_score(img_bgr):
    if img_bgr is None or img_bgr.size == 0: return 0.0
    g = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)
    return float(cv2.Laplacian(g, cv2.CV_64F).var())

def clean_plate_text(text):
    return "".join(c for c in text.upper() if c.isalnum())

def read_plate(image):
    if image is None or image.size == 0: return None
    results = LPR_READER.readtext(image, detail=1, paragraph=False, batch_size=4)
    if not results: return None
    best_text = max(results, key=lambda r: r[2] if len(clean_plate_text(r[1])) >= 4 else 0, default=None)
    if best_text and best_text[2] > 0.35:
        return clean_plate_text(best_text[1])
    return None

def setup_capture_folder():
    """Crea la carpeta para almacenar las capturas de vehículos con organización inteligente"""
    if not os.path.exists(CAPTURE_FOLDER):
        os.makedirs(CAPTURE_FOLDER)
        print(f"✅ Carpeta de capturas creada: {CAPTURE_FOLDER}")
    
    # Crear subcarpetas de organización
    if CREATE_INFRACTIONS_FOLDER:
        infractions_folder = os.path.join(CAPTURE_FOLDER, "infracciones")
        if not os.path.exists(infractions_folder):
            os.makedirs(infractions_folder)
            print(f"✅ Carpeta de infracciones creada: {infractions_folder}")
    
    if CREATE_SUSPICIOUS_FOLDER:
        suspicious_folder = os.path.join(CAPTURE_FOLDER, "sospechosos")
        if not os.path.exists(suspicious_folder):
            os.makedirs(suspicious_folder)
            print(f"✅ Carpeta de sospechosos creada: {suspicious_folder}")
    
    # Crear carpeta de reportes
    reports_folder = os.path.join(CAPTURE_FOLDER, "reportes")
    if not os.path.exists(reports_folder):
        os.makedirs(reports_folder)
        print(f"✅ Carpeta de reportes creada: {reports_folder}")
    
    # Crear carpeta de alta velocidad
    high_speed_folder = os.path.join(CAPTURE_FOLDER, "alta_velocidad")
    if not os.path.exists(high_speed_folder):
        os.makedirs(high_speed_folder)
        print(f"✅ Carpeta de alta velocidad creada: {high_speed_folder}")

def enhance_image_quality(image):
    """
    Mejora la calidad de la imagen aplicando filtros y ajustes sin distorsionar colores.
    """
    try:
        if image is None or image.size == 0:
            return image
        
        # Crear una copia para no modificar la original
        enhanced = image.copy()
        
        if CAPTURE_ENHANCED:
            # Aplicar filtro bilateral para reducir ruido preservando bordes
            enhanced = cv2.bilateralFilter(enhanced, 9, 75, 75)
            
            # Aplicar unsharp mask para mejorar la nitidez
            gaussian = cv2.GaussianBlur(enhanced, (0, 0), 2.0)
            enhanced = cv2.addWeighted(enhanced, 1.5, gaussian, -0.5, 0)
            
            # Ajustar contraste usando CLAHE solo en el canal L (luminancia)
            lab = cv2.cvtColor(enhanced, cv2.COLOR_BGR2LAB)
            clahe = cv2.createCLAHE(clipLimit=1.5, tileGridSize=(8,8))
            lab[:,:,0] = clahe.apply(lab[:,:,0])  # Solo canal L
            enhanced = cv2.cvtColor(lab, cv2.COLOR_LAB2BGR)
            
            # Ajustar brillo y contraste de manera sutil
            alpha = 1.1  # Contraste
            beta = 5     # Brillo
            enhanced = cv2.convertScaleAbs(enhanced, alpha=alpha, beta=beta)
        
        return enhanced
        
    except Exception as e:
        print(f"⚠️  Error al mejorar imagen: {e}")
        return image

# --- NUEVAS FUNCIONES PARA MEJORA AUTOMÁTICA DE CALIDAD CON IA ---

def ai_upscale_image(image, target_scale=2.0, method="advanced"):
    """
    Aplica upscaling inteligente usando técnicas de IA y procesamiento avanzado.
    """
    try:
        if image is None or image.size == 0:
            return image
        
        original_height, original_width = image.shape[:2]
        target_height = int(original_height * target_scale)
        target_width = int(original_width * target_scale)
        
        if method == "advanced":
            # Método avanzado: múltiples pasos de mejora
            enhanced = advanced_ai_upscaling(image, target_scale)
        elif method == "fast":
            # Método rápido: upscaling con interpolación inteligente
            enhanced = fast_ai_upscaling(image, target_scale)
        else:
            # Método estándar: interpolación cúbica con post-procesamiento
            enhanced = standard_ai_upscaling(image, target_scale)
        
        return enhanced
        
    except Exception as e:
        print(f"⚠️  Error en upscaling con IA: {e}")
        # Fallback a método estándar
        return cv2.resize(image, (target_width, target_height), interpolation=cv2.INTER_CUBIC)

def advanced_ai_upscaling(image, target_scale):
    """
    Upscaling avanzado con múltiples técnicas de mejora.
    """
    try:
        # Paso 1: Upscaling inicial con interpolación cúbica
        height, width = image.shape[:2]
        new_height = int(height * target_scale)
        new_width = int(width * target_scale)
        
        # Usar interpolación cúbica para el upscaling inicial
        upscaled = cv2.resize(image, (new_width, new_height), interpolation=cv2.INTER_CUBIC)
        
        # Paso 2: Reducción de ruido adaptativo
        # Aplicar filtro bilateral para reducir ruido preservando bordes
        denoised = cv2.bilateralFilter(upscaled, 15, 50, 50)
        
        # Paso 3: Mejora de nitidez con máscara de enfoque
        # Crear máscara de enfoque usando Laplaciano
        gray = cv2.cvtColor(denoised, cv2.COLOR_BGR2GRAY)
        laplacian = cv2.Laplacian(gray, cv2.CV_64F)
        laplacian = np.uint8(np.absolute(laplacian))
        
        # Aplicar máscara de enfoque
        sharpened = cv2.addWeighted(denoised, 1.5, cv2.cvtColor(laplacian, cv2.COLOR_GRAY2BGR), -0.5, 0)
        
        # Paso 4: Mejora de contraste adaptativo
        # Convertir a LAB para trabajar con luminancia
        lab = cv2.cvtColor(sharpened, cv2.COLOR_BGR2LAB)
        
        # Aplicar CLAHE en el canal L (luminancia)
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
        lab[:,:,0] = clahe.apply(lab[:,:,0])
        
        # Convertir de vuelta a BGR
        enhanced = cv2.cvtColor(lab, cv2.COLOR_LAB2BGR)
        
        # Paso 5: Suavizado final para reducir artefactos
        # Aplicar filtro de mediana para eliminar ruido residual
        final = cv2.medianBlur(enhanced, 3)
        
        return final
        
    except Exception as e:
        print(f"⚠️  Error en upscaling avanzado: {e}")
        return image

def fast_ai_upscaling(image, target_scale):
    """
    Upscaling rápido optimizado para velocidad.
    """
    try:
        height, width = image.shape[:2]
        new_height = int(height * target_scale)
        new_width = int(width * target_scale)
        
        # Upscaling con interpolación cúbica
        upscaled = cv2.resize(image, (new_width, new_height), interpolation=cv2.INTER_CUBIC)
        
        # Mejora rápida de nitidez
        kernel = np.array([[-1,-1,-1], [-1,9,-1], [-1,-1,-1]])
        sharpened = cv2.filter2D(upscaled, -1, kernel)
        
        # Mezclar imagen original con la mejorada
        enhanced = cv2.addWeighted(upscaled, 0.7, sharpened, 0.3, 0)
        
        return enhanced
        
    except Exception as e:
        print(f"⚠️  Error en upscaling rápido: {e}")
        return image

def standard_ai_upscaling(image, target_scale):
    """
    Upscaling estándar con post-procesamiento básico.
    """
    try:
        height, width = image.shape[:2]
        new_height = int(height * target_scale)
        new_width = int(width * target_scale)
        
        # Upscaling estándar
        upscaled = cv2.resize(image, (new_width, new_height), interpolation=cv2.INTER_CUBIC)
        
        # Mejora básica de nitidez
        gaussian = cv2.GaussianBlur(upscaled, (0, 0), 1.0)
        enhanced = cv2.addWeighted(upscaled, 1.3, gaussian, -0.3, 0)
        
        return enhanced
        
    except Exception as e:
        print(f"⚠️  Error en upscaling estándar: {e}")
        return image

def enhance_plate_region(image, bbox):
    """
    Mejora específicamente la región de la placa para mejor legibilidad.
    """
    try:
        if image is None or image.size == 0:
            return image
        
        x1, y1, x2, y2 = bbox.astype(int)
        
        # Extraer región de la placa (asumiendo que está en la parte inferior del vehículo)
        plate_height = int((y2 - y1) * 0.3)  # 30% de la altura del vehículo
        plate_y1 = y2 - plate_height
        plate_region = image[plate_y1:y2, x1:x2]
        
        if plate_region.size == 0:
            return image
        
        # Aplicar mejoras específicas para placas
        # 1. Upscaling de la región de la placa
        plate_enhanced = ai_upscale_image(plate_region, target_scale=3.0, method="advanced")
        
        # 2. Mejora de contraste específica para texto
        # Convertir a escala de grises
        plate_gray = cv2.cvtColor(plate_enhanced, cv2.COLOR_BGR2GRAY)
        
        # Aplicar ecualización de histograma para mejorar contraste
        plate_eq = cv2.equalizeHist(plate_gray)
        
        # 3. Reducción de ruido específica para texto
        # Aplicar filtro de mediana para preservar bordes del texto
        plate_denoised = cv2.medianBlur(plate_eq, 3)
        
        # 4. Mejora de nitidez para texto
        kernel = np.array([[-1,-1,-1], [-1,9,-1], [-1,-1,-1]])
        plate_sharp = cv2.filter2D(plate_denoised, -1, kernel)
        
        # 5. Convertir de vuelta a BGR
        plate_final = cv2.cvtColor(plate_sharp, cv2.COLOR_GRAY2BGR)
        
        # 6. Reemplazar la región original con la mejorada
        # Redimensionar para que coincida con la región original
        plate_final_resized = cv2.resize(plate_final, (x2-x1, plate_height))
        
        # Crear una copia de la imagen original
        result = image.copy()
        
        # Reemplazar la región de la placa
        result[plate_y1:y2, x1:x2] = plate_final_resized
        
        return result
        
    except Exception as e:
        print(f"⚠️  Error al mejorar región de placa: {e}")
        return image

def calculate_image_quality_score(image):
    """
    Calcula un score de calidad de imagen basado en múltiples métricas.
    """
    try:
        if image is None or image.size == 0:
            return 0.0
        
        # Convertir a escala de grises para análisis
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # 1. Score de nitidez (Laplaciano)
        sharpness = cv2.Laplacian(gray, cv2.CV_64F).var()
        sharpness_score = min(1.0, sharpness / 1000.0)  # Normalizar a 0-1
        
        # 2. Score de contraste (desviación estándar)
        contrast = np.std(gray)
        contrast_score = min(1.0, contrast / 100.0)  # Normalizar a 0-1
        
        # 3. Score de brillo (media)
        brightness = np.mean(gray)
        # Brillo óptimo está entre 100-200
        if 100 <= brightness <= 200:
            brightness_score = 1.0
        else:
            brightness_score = 1.0 - min(abs(brightness - 150) / 150, 1.0)
        
        # 4. Score de ruido (usando filtro de mediana)
        median_filtered = cv2.medianBlur(gray, 3)
        noise = np.mean(np.abs(gray.astype(float) - median_filtered.astype(float)))
        noise_score = max(0.0, 1.0 - noise / 50.0)  # Menos ruido = mejor score
        
        # 5. Score de resolución (tamaño de la imagen)
        height, width = gray.shape
        resolution_score = min(1.0, (height * width) / (1920 * 1080))  # Normalizar a 1080p
        
        # Ponderación de factores
        weights = {
            'sharpness': 0.30,      # Nitidez es muy importante
            'contrast': 0.25,       # Contraste es importante
            'brightness': 0.20,     # Brillo es moderadamente importante
            'noise': 0.15,          # Ruido es menos importante
            'resolution': 0.10      # Resolución es menos importante
        }
        
        # Calcular score final ponderado
        final_score = (
            sharpness_score * weights['sharpness'] +
            contrast_score * weights['contrast'] +
            brightness_score * weights['brightness'] +
            noise_score * weights['noise'] +
            resolution_score * weights['resolution']
        )
        
        return final_score
        
    except Exception as e:
        print(f"⚠️  Error al calcular score de calidad: {e}")
        return 0.5  # Score por defecto

def capture_high_quality_region(frame, bbox, zoom_factor=2.0):
    """
    Captura una región de alta calidad alrededor del vehículo.
    """
    try:
        x1, y1, x2, y2 = bbox.astype(int)
        
        # Calcular centro del vehículo
        center_x = (x1 + x2) // 2
        center_y = (y1 + y2) // 2
        
        # Calcular dimensiones del vehículo
        vehicle_width = x2 - x1
        vehicle_height = y2 - y1
        
        # Calcular región expandida
        expanded_width = int(vehicle_width * zoom_factor)
        expanded_height = int(vehicle_height * zoom_factor)
        
        # Calcular nuevos límites
        new_x1 = max(0, center_x - expanded_width // 2)
        new_y1 = max(0, center_y - expanded_height // 2)
        new_x2 = min(frame.shape[1], center_x + expanded_width // 2)
        new_y2 = min(frame.shape[0], center_y + expanded_height // 2)
        
        # Extraer región expandida
        region = frame[new_y1:new_y2, new_x1:new_x2]
        
        return region, (new_x1, new_y1, new_x2, new_y2)
        
    except Exception as e:
        print(f"⚠️  Error al capturar región expandida: {e}")
        return frame, bbox

def capture_full_frame_with_annotation(frame, bbox, track_id, class_name, speed_kmh, plate):
    """
    Captura el frame completo con anotaciones del vehículo.
    """
    try:
        # Crear una copia del frame para no modificar el original
        annotated_frame = frame.copy()
        
        # Dibujar bounding box del vehículo
        x1, y1, x2, y2 = bbox.astype(int)
        color = _color_velocidad(speed_kmh)
        cv2.rectangle(annotated_frame, (x1, y1), (x2, y2), color, 3)
        
        # Añadir información del vehículo
        info_text = f"ID:{track_id} {class_name.upper()}"
        if speed_kmh:
            info_text += f" {speed_kmh:.1f}km/h"
        if plate:
            info_text += f" Placa:{plate}"
        
        # Calcular posición del texto
        text_x = max(10, x1)
        text_y = max(30, y1 - 10)
        
        # Fondo para el texto
        (text_width, text_height), _ = cv2.getTextSize(info_text, cv2.FONT_HERSHEY_SIMPLEX, 0.7, 2)
        cv2.rectangle(annotated_frame, 
                     (text_x - 5, text_y - text_height - 5),
                     (text_x + text_width + 5, text_y + 5),
                     (0, 0, 0), -1)
        
        # Texto
        cv2.putText(annotated_frame, info_text, (text_x, text_y), 
                   cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
        
        # Añadir timestamp
        timestamp_text = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        cv2.putText(annotated_frame, timestamp_text, (10, 30), 
                   cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
        
        return annotated_frame
        
    except Exception as e:
        print(f"⚠️  Error al crear frame anotado: {e}")
        return frame

def capture_vehicle_photo(frame, bbox, track_id, class_name, confidence, speed_kmh, plate, timestamp):
    """
    Captura y guarda una foto del vehículo con información detallada y organización inteligente.
    Solo una captura por vehículo en su mejor momento.
    """
    try:
        x1, y1, x2, y2 = bbox.astype(int)
        
        # Determinar qué tipo de captura realizar
        if CAPTURE_FULL_FRAME:
            # Capturar frame completo con anotaciones
            capture_image = capture_full_frame_with_annotation(frame, bbox, track_id, class_name, speed_kmh, plate)
        else:
            # Capturar solo la región del vehículo con zoom mejorado
            if CAPTURE_ZOOM_FACTOR > 1.0:
                # Usar región expandida para mejor resolución
                capture_image, (new_x1, new_y1, new_x2, new_y2) = capture_high_quality_region(frame, bbox, CAPTURE_ZOOM_FACTOR)
            else:
                # Usar región original con margen
                margin = 30  # Margen más grande para mejor contexto
                y1_margin = max(0, y1 - margin)
                y2_margin = min(frame.shape[0], y2 + margin)
                x1_margin = max(0, x1 - margin)
                x2_margin = min(frame.shape[1], x2 + margin)
                capture_image = frame[y1_margin:y2_margin, x1_margin:x2_margin]
        
        if capture_image.size == 0:
            return None
        
        # --- NUEVA LÓGICA DE MEJORA AUTOMÁTICA DE CALIDAD CON IA ---
        if CAPTURE_ENHANCED:
            # Aplicar upscaling inteligente con IA
            print(f"🚀 Aplicando mejora automática de calidad con IA para ID-{track_id}")
            
            # Calcular score de calidad antes de la mejora
            quality_before = calculate_image_quality_score(capture_image)
            print(f"   - Calidad antes de mejora: {quality_before:.3f}")
            
            # Aplicar upscaling con IA usando el método especificado
            capture_image = ai_upscale_image(capture_image, target_scale=2.0, method="advanced")
            
            # Mejorar específicamente la región de la placa si es posible
            if plate and not CAPTURE_FULL_FRAME:
                capture_image = enhance_plate_region(capture_image, bbox)
                print(f"   - Región de placa mejorada específicamente")
            
            # Calcular score de calidad después de la mejora
            quality_after = calculate_image_quality_score(capture_image)
            print(f"   - Calidad después de mejora: {quality_after:.3f}")
            print(f"   - Mejora de calidad: {((quality_after - quality_before) / quality_before * 100):.1f}%")
        else:
            # Aplicar mejoras básicas si no está activado el modo IA
            capture_image = enhance_image_quality(capture_image)
        
        # Aumentar resolución significativamente para mejor legibilidad de placas
        if CAPTURE_RESOLUTION_BOOST and not CAPTURE_FULL_FRAME:
            height, width = capture_image.shape[:2]
            # Aumentar resolución por 2.5x para mejor calidad
            new_height = int(height * 2.5)
            new_width = int(width * 2.5)
            capture_image = cv2.resize(capture_image, (new_width, new_height), interpolation=cv2.INTER_CUBIC)
            
            # Aplicar filtro de suavizado para reducir artefactos de escalado
            capture_image = cv2.GaussianBlur(capture_image, (3, 3), 0.5)
        
        # Determinar la carpeta de destino basada en criterios
        destination_folder = CAPTURE_FOLDER
        
        # Organizar por tipo de vehículo
        if ORGANIZE_BY_TYPE:
            type_folder = os.path.join(destination_folder, class_name)
            if not os.path.exists(type_folder):
                os.makedirs(type_folder)
            destination_folder = type_folder
        
        # Organizar por fecha
        if ORGANIZE_BY_DATE:
            date_folder = os.path.join(destination_folder, 
                                     timestamp.strftime("%Y"), 
                                     timestamp.strftime("%m"), 
                                     timestamp.strftime("%d"))
            if not os.path.exists(date_folder):
                os.makedirs(date_folder)
            destination_folder = date_folder
        
        # Organizar por velocidad (carpetas especiales)
        if speed_kmh and speed_kmh > SPEED_INFRACTION_THRESHOLD:
            # Vehículo con infracción de velocidad
            if CREATE_INFRACTIONS_FOLDER:
                destination_folder = os.path.join(CAPTURE_FOLDER, "infracciones")
            elif speed_kmh > VEL_MAX_REALISTA:
                # Velocidad extremadamente alta
                destination_folder = os.path.join(CAPTURE_FOLDER, "alta_velocidad")
        
        # Crear nombre único y descriptivo para cada vehículo
        timestamp_str = timestamp.strftime("%Y%m%d_%H%M%S_%f")[:-3]
        speed_str = f"{speed_kmh:.0f}kmh" if speed_kmh else "unknown"
        plate_str = f"placa_{plate}" if plate else "sin_placa"
        capture_type = "frame_completo" if CAPTURE_FULL_FRAME else "region_vehiculo"
        
        # Añadir indicador de calidad si se aplicó mejora con IA
        quality_indicator = "_IA_mejorada" if CAPTURE_ENHANCED else ""
        
        # Nombre único que identifique perfectamente cada vehículo
        unique_filename = f"vehiculo_{track_id:03d}_{class_name}_{speed_str}_{plate_str}_{capture_type}{quality_indicator}_{timestamp_str}.jpg"
        full_path = os.path.join(destination_folder, unique_filename)
        
        # Guardar imagen con calidad máxima
        encode_params = [int(cv2.IMWRITE_JPEG_QUALITY), CAPTURE_QUALITY]
        cv2.imwrite(full_path, capture_image, encode_params)
        
        # Crear archivo de metadatos con nombre sincronizado
        metadata = {
            "track_id": int(track_id),
            "class_name": str(class_name),
            "confidence": float(confidence),
            "speed_kmh": float(speed_kmh) if speed_kmh else None,
            "plate": str(plate) if plate else None,
            "timestamp": timestamp.isoformat(),
            "bbox": [float(x) for x in bbox.tolist()],
            "image_file": str(full_path),
            "unique_filename": str(unique_filename),
            "capture_settings": {
                "full_frame": bool(CAPTURE_FULL_FRAME),
                "enhanced": bool(CAPTURE_ENHANCED),
                "zoom_factor": float(CAPTURE_ZOOM_FACTOR),
                "resolution_boost": bool(CAPTURE_RESOLUTION_BOOST),
                "jpeg_quality": int(CAPTURE_QUALITY),
                "image_dimensions": [int(x) for x in capture_image.shape[:2]],
                "original_dimensions": [int(y2-y1), int(x2-x1)],
                "captured_at_distance_m": float(calculate_real_distance(y2 - y1, setup_calibration({}))) if calculate_real_distance(y2 - y1, setup_calibration({})) else None
            },
            "capture_info": {
                "camera_height_m": float(CAMERA_HEIGHT_M),
                "camera_angle_deg": float(CAMERA_ANGLE_DEG),
                "focal_length_px": float(FOCAL_LENGTH_PX),
                "distance_m": float(calculate_real_distance(y2 - y1, setup_calibration({}))) if calculate_real_distance(y2 - y1, setup_calibration({})) else None,
                "image_quality": {
                    "sharpness_score": float(sharpness_score(capture_image)),
                    "brightness": float(np.mean(capture_image)),
                    "contrast": float(np.std(capture_image)),
                    "ai_quality_score": float(calculate_image_quality_score(capture_image)),
                    "enhancement_applied": bool(CAPTURE_ENHANCED),
                    "upscaling_method": "advanced_ai" if CAPTURE_ENHANCED else "standard"
                },
                "environment": {
                    "hour_of_day": int(timestamp.hour),
                    "day_of_week": str(timestamp.strftime("%A")),
                    "month": str(timestamp.strftime("%B"))
                },
                "classification": {
                    "is_infraction": 1 if (speed_kmh and speed_kmh > SPEED_INFRACTION_THRESHOLD) else 0,
                    "is_high_speed": 1 if (speed_kmh and speed_kmh > VEL_MAX_REALISTA) else 0,
                    "speed_category": "lento" if speed_kmh and speed_kmh < 30 else 
                                    "normal" if speed_kmh and speed_kmh < 60 else
                                    "rapido" if speed_kmh and speed_kmh < 100 else "excesivo"
                }
            }
        }
        
        # Crear JSON con nombre sincronizado (mismo nombre base que la imagen)
        metadata_file = full_path.replace(".jpg", ".json")
        with open(metadata_file, 'w', encoding='utf-8') as f:
            json.dump(metadata, f, indent=2, ensure_ascii=False)
        
        return full_path
        
    except Exception as e:
        print(f"⚠️  Error al capturar foto: {e}")
        return None

def generate_capture_report():
    """
    Genera un reporte automático de todas las capturas realizadas.
    """
    try:
        reports_folder = os.path.join(CAPTURE_FOLDER, "reportes")
        timestamp = datetime.now()
        report_filename = f"reporte_capturas_{timestamp.strftime('%Y%m%d_%H%M%S')}.json"
        report_path = os.path.join(reports_folder, report_filename)
        
        # Contar archivos por tipo
        stats = {
            "total_captures": 0,
            "by_type": {},
            "by_speed_category": {},
            "infractions": 0,
            "high_speed": 0,
            "timestamp": timestamp.isoformat(),
            "folders_created": []
        }
        
        # Contar archivos en cada carpeta
        for root, dirs, files in os.walk(CAPTURE_FOLDER):
            if root != CAPTURE_FOLDER:  # No contar la carpeta raíz
                folder_name = os.path.basename(root)
                jpg_files = [f for f in files if f.endswith('.jpg')]
                json_files = [f for f in files if f.endswith('.json')]
                
                if jpg_files:
                    stats["folders_created"].append({
                        "folder": folder_name,
                        "path": root,
                        "images": len(jpg_files),
                        "metadata": len(json_files)
                    })
                    
                    # Contar por tipo si es una carpeta de tipo de vehículo
                    if folder_name in ["car", "bus", "truck", "motorbike"]:
                        stats["by_type"][folder_name] = len(jpg_files)
                        stats["total_captures"] += len(jpg_files)
                    
                    # Contar infracciones y alta velocidad
                    if folder_name == "infracciones":
                        stats["infractions"] = len(jpg_files)
                    elif folder_name == "alta_velocidad":
                        stats["high_speed"] = len(jpg_files)
        
        # Guardar reporte
        with open(report_path, 'w', encoding='utf-8') as f:
            json.dump(stats, f, indent=2, ensure_ascii=False)
        
        print(f"📊 Reporte generado: {report_path}")
        return report_path
        
    except Exception as e:
        print(f"⚠️  Error al generar reporte: {e}")
        return None

def should_capture_vehicle(confidence, speed_kmh, class_name, distance_m, track_id, tracks_state, frame_idx, fps):
    """
    Determina si se debe capturar una foto del vehículo.
    Solo captura una vez por vehículo en su mejor momento usando selección inteligente.
    """
    if class_name == "person":
        return False
    
    if confidence < MIN_CONFIDENCE_FOR_CAPTURE:
        return False
    
    # --- MODO SIMPLE: Criterios más relajados ---
    if CAPTURE_SIMPLE_MODE:
        # En modo simple, solo verificar confianza y que no sea persona
        if confidence >= 0.4:  # Confianza más baja en modo simple
            # Verificar si ya se capturó este vehículo
            if CAPTURE_ONE_PER_VEHICLE and tracks_state[track_id].get("photo_captured", False):
                return False
            return True
    
    # --- MODO INTELIGENTE: Criterios originales ---
    if speed_kmh is None or speed_kmh < MIN_SPEED_FOR_CAPTURE:
        return False
    
    # Verificar si ya se capturó este vehículo
    if CAPTURE_ONE_PER_VEHICLE and tracks_state[track_id].get("photo_captured", False):
        return False
    
    # Verificar si está en la distancia óptima para captura
    if CAPTURE_BEST_MOMENT and distance_m:
        if distance_m > CAPTURE_MIN_DISTANCE:
            return False
    
    # --- NUEVA LÓGICA DE SELECCIÓN INTELIGENTE DE FRAMES ---
    if CAPTURE_INTELLIGENT_SELECTION:
        # Usar análisis de ventana para determinar el mejor momento
        return analyze_capture_window(tracks_state, track_id, frame_idx, fps)
    
    # Si no está activada la selección inteligente, usar lógica básica
    return True

def is_better_capture_moment(current_distance, current_sharpness, best_distance, best_sharpness):
    """
    Determina si el momento actual es mejor para capturar que el anterior.
    """
    if best_distance is None:
        return True
    
    # Priorizar distancia (más cerca = mejor)
    distance_score = 1.0 / (current_distance + 0.1)
    best_distance_score = 1.0 / (best_distance + 0.1)
    
    # Priorizar nitidez
    sharpness_score = current_sharpness / (best_sharpness + 0.1)
    
    # Combinar ambos factores
    current_score = distance_score * sharpness_score
    best_score = best_distance_score * 1.0
    
    return current_score > best_score

# --- NUEVAS FUNCIONES PARA SELECCIÓN INTELIGENTE DE FRAMES ---

def calculate_frame_stability(bbox_history, current_bbox):
    """
    Calcula la estabilidad del vehículo basada en la variación de su posición.
    """
    if len(bbox_history) < 3:
        return 1.0  # Máxima estabilidad si no hay suficiente historial
    
    try:
        # Calcular variación en el centro del bounding box
        centers = []
        for bbox in bbox_history[-5:]:  # Últimos 5 frames
            center_x = (bbox[0] + bbox[2]) / 2
            center_y = (bbox[1] + bbox[3]) / 2
            centers.append([center_x, center_y])
        
        # Calcular desviación estándar de las posiciones
        centers = np.array(centers)
        std_x = np.std(centers[:, 0])
        std_y = np.std(centers[:, 1])
        
        # Normalizar por el tamaño del frame (asumiendo frame de 1920x1080)
        frame_width, frame_height = 1920, 1080
        normalized_std = (std_x / frame_width + std_y / frame_height) / 2
        
        # Convertir a score de estabilidad (menor variación = mayor estabilidad)
        stability_score = max(0.0, 1.0 - normalized_std * 10)
        
        return stability_score
        
    except Exception as e:
        return 0.8  # Valor por defecto en caso de error

def calculate_optimal_angle_score(bbox, frame_shape):
    """
    Calcula el score del ángulo de visión del vehículo.
    Prefiere vehículos vistos desde un ángulo frontal o trasero.
    """
    try:
        height, width = frame_shape[:2]
        x1, y1, x2, y2 = bbox.astype(int)
        
        # Calcular centro del vehículo
        center_x = (x1 + x2) / 2
        center_y = (y1 + y2) / 2
        
        # Calcular proporción del vehículo
        vehicle_width = x2 - x1
        vehicle_height = y2 - y1
        aspect_ratio = vehicle_width / vehicle_height
        
        # Score por posición en el frame (centro es mejor)
        center_score = 1.0 - (abs(center_x - width/2) / (width/2) + abs(center_y - height/2) / (height/2)) / 2
        
        # Score por proporción (vehículos vistos de frente/trasera tienen mejor proporción)
        if 1.5 < aspect_ratio < 3.0:  # Proporción típica de vehículos vistos de frente
            proportion_score = 1.0
        elif 0.5 < aspect_ratio < 1.5:  # Proporción de vehículos vistos de lado
            proportion_score = 0.6
        else:
            proportion_score = 0.3
        
        # Combinar scores
        angle_score = (center_score * 0.6 + proportion_score * 0.4)
        
        return angle_score
        
    except Exception as e:
        return 0.7  # Valor por defecto

def calculate_multi_factor_score(distance_m, sharpness, stability, angle_score, speed_kmh, confidence):
    """
    Calcula una puntuación multi-factor para determinar la calidad del momento de captura.
    """
    try:
        # Normalizar todos los factores a escala 0-1
        
        # Score de distancia (más cerca = mejor)
        distance_score = 1.0 / (distance_m + 1.0) if distance_m else 0.0
        
        # Score de nitidez (normalizar a 0-1, asumiendo máximo de 1000)
        sharpness_score = min(1.0, sharpness / 1000.0) if sharpness else 0.0
        
        # Score de estabilidad (ya está en 0-1)
        stability_score = stability if stability else 0.0
        
        # Score de ángulo (ya está en 0-1)
        angle_score = angle_score if angle_score else 0.0
        
        # Score de velocidad (velocidad moderada es mejor para captura)
        if speed_kmh is None:
            speed_score = 0.5
        elif speed_kmh < 30:
            speed_score = 0.8  # Vehículo lento, buena captura
        elif speed_kmh < 60:
            speed_score = 1.0  # Velocidad óptima para captura
        elif speed_kmh < 100:
            speed_score = 0.6  # Velocidad alta, captura más difícil
        else:
            speed_score = 0.3  # Velocidad muy alta, captura difícil
        
        # Score de confianza (ya está en 0-1)
        confidence_score = confidence if confidence else 0.0
        
        # Ponderación de factores (ajustar según prioridades)
        weights = {
            'distance': 0.25,      # Distancia es importante
            'sharpness': 0.20,     # Nitidez es importante
            'stability': 0.20,     # Estabilidad es importante
            'angle': 0.15,         # Ángulo es moderadamente importante
            'speed': 0.10,         # Velocidad es menos importante
            'confidence': 0.10     # Confianza es menos importante
        }
        
        # Calcular score ponderado
        final_score = (
            distance_score * weights['distance'] +
            sharpness_score * weights['sharpness'] +
            stability_score * weights['stability'] +
            angle_score * weights['angle'] +
            speed_score * weights['speed'] +
            confidence_score * weights['confidence']
        )
        
        return final_score
        
    except Exception as e:
        return 0.5  # Score por defecto en caso de error

def analyze_capture_window(tracks_state, track_id, current_frame_idx, fps):
    """
    Analiza una ventana de frames para encontrar el mejor momento de captura.
    """
    try:
        track = tracks_state[track_id]
        
        if not CAPTURE_INTELLIGENT_SELECTION:
            return True  # Si no está activado, capturar normalmente
        
        # Obtener historial de frames para análisis
        if 'capture_analysis' not in track:
            track['capture_analysis'] = {
                'frame_scores': [],
                'best_score': 0.0,
                'best_frame': -1,
                'analysis_started': False,
                'frames_since_start': 0
            }
        
        analysis = track['capture_analysis']
        analysis['frames_since_start'] += 1
        
        # Iniciar análisis si es la primera vez
        if not analysis['analysis_started']:
            analysis['analysis_started'] = True
            analysis['start_frame'] = current_frame_idx
            return False  # No capturar en el primer frame
        
        # --- FALLBACK: Capturar después de cierto número de frames si no se cumple criterio inteligente ---
        if analysis['frames_since_start'] >= CAPTURE_FALLBACK_AFTER_FRAMES:
            print(f"🔄 Fallback activado para ID-{track_id}: Capturando después de {CAPTURE_FALLBACK_AFTER_FRAMES} frames")
            return True
        
        # Calcular score del frame actual
        current_score = calculate_multi_factor_score(
            track.get('distance_m'),
            track.get('thumb_sharpness', 0.0),
            calculate_frame_stability(track.get('bbox_history', []), track['bbox']),
            calculate_optimal_angle_score(track['bbox'], (1080, 1920)),  # Asumir resolución estándar
            track.get('smoothed_v_kmh'),
            track.get('confidence', 0.0)
        )
        
        # Guardar score del frame actual
        analysis['frame_scores'].append({
            'frame': current_frame_idx,
            'score': current_score,
            'distance': track.get('distance_m'),
            'sharpness': track.get('thumb_sharpness', 0.0),
            'speed': track.get('smoothed_v_kmh')
        })
        
        # Mantener solo los últimos N frames para análisis
        max_frames = CAPTURE_ANALYSIS_WINDOW
        if len(analysis['frame_scores']) > max_frames:
            analysis['frame_scores'] = analysis['frame_scores'][-max_frames:]
        
        # Actualizar mejor score
        if current_score > analysis['best_score']:
            analysis['best_score'] = current_score
            analysis['best_frame'] = current_frame_idx
        
        # Determinar si es momento de capturar
        frames_analyzed = len(analysis['frame_scores'])
        min_frames = min(5, max_frames // 6)  # Reducido de 10 a 5 frames mínimos
        
        if frames_analyzed >= min_frames:
            # Verificar si el frame actual es el mejor hasta ahora (criterio más relajado)
            if current_score >= analysis['best_score'] * 0.8:  # Reducido de 0.95 a 0.8
                # Verificar si la calidad es suficiente (criterio más relajado)
                if current_score >= CAPTURE_QUALITY_THRESHOLD:
                    # Verificar estabilidad (criterio más relajado)
                    stability = calculate_frame_stability(track.get('bbox_history', []), track['bbox'])
                    if stability >= CAPTURE_STABILITY_THRESHOLD:
                        print(f"🎯 Frame óptimo detectado para ID-{track_id}: Score={current_score:.3f}, Estabilidad={stability:.3f}")
                        return True
        
        return False
        
    except Exception as e:
        print(f"⚠️  Error en análisis de ventana de captura: {e}")
        return True  # En caso de error, capturar normalmente

# ============================ Componentes del HUD ============================

def draw_telemetry_panel(frame, layout):
    """Panel de telemetría con información real del sistema"""
    s = layout["scale"]; safe = layout["safe"]
    sx, sy = safe["l"], safe["t"]
    sw, sh = layout["col_w"] * 3 + layout["gutter"] * 2, int(110 * s)
    _rounded_box(frame, (sx, sy), (sx + sw, sy + sh), THEME["panel"], 0.8, int(14*s), 1, THEME["line"])

    pad = int(12*s)
    _put_label(frame, "SISTEMA DE MEDICIÓN REAL", sx + pad, sy + int(28*s), scale=0.6*s, col=THEME["brand"])
    
    y_line = sy + int(55*s)
    _put_label(frame, f"ALTURA CÁMARA: {CAMERA_HEIGHT_M:.1f} m", sx + pad, y_line, scale=0.5*s, col=THEME["muted"])
    
    y_line += int(20*s)
    _put_label(frame, f"ÁNGULO: {CAMERA_ANGLE_DEG:.1f}°", sx + pad, y_line, scale=0.5*s, col=THEME["muted"])

    y_line += int(20*s)
    _put_label(frame, "ESTADO:", sx + pad, y_line, scale=0.5*s, col=THEME["muted"])
    _put_label(frame, "ACTIVO / MEDICIÓN REAL", sx + pad + int(70*s), y_line, scale=0.5*s, col=(60,220,60))
    
def draw_person_alert_panel(frame, layout):
    """Panel de alerta cuando se detecta una persona"""
    s = layout["scale"]; safe = layout["safe"]
    w, h = int(300 * s), int(40 * s)
    x = (frame.shape[1] - w) // 2
    y = safe["t"]
    _rounded_box(frame, (x, y), (x + w, y + h), THEME["alert"], 0.85, int(12*s), 2, (255,255,255))
    alert_text = "¡¡ ALERTA: PERSONA DETECTADA !!"
    (tw, th), _ = cv2.getTextSize(alert_text, FONT_UI, 0.7*s, 2)
    _put_label(frame, alert_text, x + (w - tw) // 2, y + (h + th) // 2, scale=0.7*s, col=(255,255,255), thick=2)

def draw_calibration_references(frame, layout):
    """Dibuja guías visuales para la medición real"""
    H = frame.shape[0]
    y1, y2 = int(H * 0.6), int(H * 0.95)
    cv2.line(frame, (0, y1), (frame.shape[1], y1), THEME["brand"], 1, cv2.LINE_AA)
    cv2.line(frame, (0, y2), (frame.shape[1], y2), THEME["brand"], 1, cv2.LINE_AA)
    _put_label(frame, "Zona de Medición Real", layout["safe"]["l"], y1 - 10, scale=0.5, col=THEME["brand"])
    
    # Mostrar información de calibración
    info_text = f"Altura: {CAMERA_HEIGHT_M}m | Ángulo: {CAMERA_ANGLE_DEG}° | Focal: {FOCAL_LENGTH_PX}px"
    _put_label(frame, info_text, layout["safe"]["l"], y2 + 20, scale=0.4, col=THEME["muted"])

def draw_callouts(frame, layout, active_tracks):
    """Callouts con información real de medición"""
    s = layout["scale"]
    for t in active_tracks:
        if t["class_name"] == "person": continue # No mostrar callout para personas
        x1,y1,x2,y2 = t["bbox"].astype(int)
        
        vel = t.get("smoothed_v_kmh")
        color = _color_velocidad(vel)
        cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)

        # Contenido del callout
        id_text = f"ID-{t['id']:03d}"
        vel_text = f"{vel:.1f} km/h" if vel is not None else "--- km/h"
        dist_text = f"Dist: {t['distance_m']:.1f} m" if t.get('distance_m') else "Dist: N/A"
        plate_text = f"Placa: {t['plate']}" if t.get('plate') else "Placa: ---"

        # Caja de información
        tw, th = int(200*s), int(85*s)
        cx, cy = x1, y1 - th - 10
        if cy < layout["safe"]["t"]: cy = y2 + 10 # Si no cabe arriba, ponerlo abajo

        _rounded_box(frame, (cx, cy), (cx+tw, cy+th), THEME["panel"], 0.8, int(12*s), 1, color)
        cv2.line(frame, (x1, y1), (cx, cy + th//2), color, 1)

        # Escribir texto en la caja
        _put_label(frame, id_text, cx + 10*s, cy + 22*s, scale=0.6*s, col=THEME["ink"], thick=2)
        _put_label(frame, dist_text, cx + 110*s, cy + 22*s, scale=0.5*s, col=THEME["muted"])
        _put_label(frame, vel_text, cx + 10*s, cy + 48*s, scale=0.7*s, col=color, thick=2)
        _put_label(frame, plate_text, cx + 10*s, cy + 70*s, scale=0.55*s, col=THEME["muted"])

def draw_sidebar_priority(frame, layout, tracks):
    """Panel derecho para vehículos más rápidos con mediciones reales"""
    s = layout["scale"]; safe = layout["safe"]
    sx = layout["col_w"] * 9 + layout["gutter"] * 8 + safe["l"]
    sw = layout["col_w"] * 3 + layout["gutter"] * 2
    sy = safe["t"]
    
    _rounded_box(frame, (sx, sy), (sx + sw, frame.shape[0] - safe["b"] + 44*s), THEME["panel"], 0.8, int(14*s), 1, THEME["line"])
    
    pad = int(12*s); title_h = int(40*s); item_h = int(86*s)
    _put_label(frame, "MEDICIÓN PRIORITARIA", sx + pad, sy + int(title_h*0.7), scale=0.65*s, col=THEME["brand"])
    
    y = sy + title_h
    # Mostrar hasta 5 vehículos, ordenados por velocidad
    tracks_to_show = sorted([t for t in tracks if t['class_name'] != 'person'], key=lambda t: t.get("smoothed_v_kmh") or 0, reverse=True)
    for t in tracks_to_show[:5]:
        if y + item_h > frame.shape[0] - safe["b"]: break
        
        vel = t.get("smoothed_v_kmh"); color_borde = _color_velocidad(vel)
        thumb = t.get("best_thumb"); tw, th = int(100*s), int(70*s)
        
        if thumb is not None and thumb.size:
            timg = cv2.resize(thumb, (tw, th), interpolation=cv2.INTER_AREA)
            _blit(frame, timg, sx + pad, y + (item_h - th)//2)
            cv2.rectangle(frame, (int(sx+pad), int(y + (item_h - th)//2)), (int(sx+pad+tw), int(y + (item_h - th)//2 + th)), color_borde, 2)
        
        tx = sx + pad + tw + 10*s; ty_base = y + int(24*s)
        _put_label(frame, f"ID-{t['id']:03d} ({t['class_name'].upper()})", tx, ty_base, scale=0.5*s, col=THEME["ink"])
        
        vel_text = "--" if vel is None else f"{vel:.1f}"
        _put_label(frame, vel_text, tx, ty_base + 24*s, scale=0.85*s, col=color_borde, thick=2)
        _put_label(frame, "km/h", tx + cv2.getTextSize(vel_text, FONT_UI, 0.85*s, 2)[0][0] + 6, ty_base + 24*s, scale=0.48*s, col=color_borde)
        
        # Mostrar distancia real
        dist = t.get("distance_m")
        dist_text = f"{dist:.1f}m" if dist else "---"
        _put_label(frame, f"DIST: {dist_text}", tx, ty_base + 48*s, scale=0.5*s, col=THEME["muted"])
        y += item_h

def draw_status_bar(frame, layout, frame_idx, total_frames, fps):
    s = layout["scale"]; safe = layout["safe"]
    bar_h = int(44*s); pad = int(12*s)
    x, y, w = safe["l"], safe["b"] - bar_h, safe["r"] - safe["l"]
    _rounded_box(frame, (x, y), (x+w, y+bar_h), THEME["panel"], 0.9, int(12*s), 1, THEME["line"])

    # Barra de progreso
    progress = frame_idx / max(1, total_frames-1)
    progress_x = int(x + 1 + (w - 2) * progress)
    cv2.line(frame, (int(x+1), int(y+bar_h-2)), (progress_x, int(y+bar_h-2)), THEME["brand"], 2)

    cur = str(timedelta(seconds=int(frame_idx/fps))) if fps>0 else '0:00:00'
    tot = str(timedelta(seconds=int(total_frames/fps))) if fps>0 else '0:00:00'
    _put_label(frame, f"TIEMPO {cur} / {tot}", x+pad, y+bar_h*0.68, scale=s*0.7, col=THEME["ink"])
    
    fps_text = f"FPS: {fps:.1f}"
    (tw, th), _ = cv2.getTextSize(fps_text, FONT_UI, s*0.7, 1)
    _put_label(frame, fps_text, x+w-pad-tw, y+bar_h*0.68, scale=s*0.7, col=THEME["muted"])

def draw_hud(frame, tracks_state, frame_idx, total_frames, fps):
    layout = make_layout(frame.shape[1], frame.shape[0])
    active = [t for t in tracks_state.values() if t["visible_now"]]
    
    # Dibuja elementos de fondo primero
    draw_calibration_references(frame, layout)
    
    # Dibuja elementos en la escena
    draw_callouts(frame, layout, active)
    
    # Dibuja paneles de UI
    draw_telemetry_panel(frame, layout)
    draw_sidebar_priority(frame, layout, active)
    # La barra de estado se dibuja con el FPS instantáneo, no el del video
    # Para el cálculo del tiempo sí usamos el FPS del video.
    # Aquí pasamos un placeholder para fps, que no se usa en la función de dibujo.
    draw_status_bar(frame, layout, frame_idx, total_frames, fps)
    
    # Alerta de persona (si es necesario, se dibuja encima de todo)
    if any(t["class_name"] == "person" for t in active):
        draw_person_alert_panel(frame, layout)
        for t in active:
            if t["class_name"] == "person":
                x1,y1,x2,y2 = t["bbox"].astype(int)
                cv2.rectangle(frame, (x1,y1), (x2,y2), THEME["alert"], 3)


# =============================== Main loop ==================================
def main():
    # Declarar variables globales al inicio
    global CAMERA_HEIGHT_M, CAMERA_ANGLE_DEG, FOCAL_LENGTH_PX
    global CAPTURE_FULL_FRAME, CAPTURE_ENHANCED, CAPTURE_ORIGINAL_COLORS, CAPTURE_ZOOM_FACTOR, CAPTURE_RESOLUTION_BOOST, CAPTURE_QUALITY
    global CAPTURE_INTELLIGENT_SELECTION, CAPTURE_ANALYSIS_WINDOW, CAPTURE_QUALITY_THRESHOLD, CAPTURE_STABILITY_THRESHOLD
    global CAPTURE_SIMPLE_MODE, CAPTURE_FALLBACK_AFTER_FRAMES
    
    ap = argparse.ArgumentParser(description="Sistema de vigilancia y análisis de tráfico con medición real v2.0")
    ap.add_argument("--video", default=r"C:\Users\INMORTAL\OneDrive\Documentos\python\src\Proyectos\captura de objetos\DJI-2.mp4", help="Ruta al video (por defecto usa C:\\Users\\INMORTAL\\OneDrive\\Documentos\\python\\src\\Proyectos\\captura de objetos\\DJI-2.mp4).")
    ap.add_argument("--out", default=None, help="Nombre base para salidas.")
    ap.add_argument("--weights", default="yolov8n.pt", help="Pesos YOLOv8.")
    ap.add_argument("--device", default="cpu", help="Dispositivo: 'cpu' o '0' para GPU.")
    ap.add_argument("--classes", default="car,bus,truck,motorbike,person", help="Clases a detectar (incluir 'person' para alertas).")
    ap.add_argument("--camera-height", type=float, default=CAMERA_HEIGHT_M, help="Altura real de la cámara en metros.")
    ap.add_argument("--camera-angle", type=float, default=CAMERA_ANGLE_DEG, help="Ángulo de inclinación de la cámara en grados.")
    ap.add_argument("--focal-length", type=float, default=FOCAL_LENGTH_PX, help="Distancia focal en píxeles.")
    ap.add_argument("--conf", type=float, default=0.3, help="Umbral de confianza para la detección.")
    ap.add_argument("--iou", type=float, default=0.5, help="Umbral de IoU para el seguimiento.")
    ap.add_argument("--full-frame", action="store_true", help="Capturar frame completo en lugar de solo el vehículo.")
    ap.add_argument("--enhanced", action="store_true", help="Aplicar mejoras de imagen automáticamente.")
    ap.add_argument("--original-colors", action="store_true", help="Mantener colores originales sin distorsión.")
    ap.add_argument("--zoom-factor", type=float, default=CAPTURE_ZOOM_FACTOR, help="Factor de zoom para región del vehículo.")
    ap.add_argument("--resolution-boost", action="store_true", help="Aumentar resolución de la imagen capturada.")
    ap.add_argument("--jpeg-quality", type=int, default=CAPTURE_QUALITY, help="Calidad JPEG (1-100).")
    
    # --- NUEVOS ARGUMENTOS PARA FUNCIONALIDADES AVANZADAS ---
    ap.add_argument("--intelligent-selection", action="store_true", default=CAPTURE_INTELLIGENT_SELECTION, 
                   help="Activar selección inteligente de frames para captura.")
    ap.add_argument("--analysis-window", type=int, default=CAPTURE_ANALYSIS_WINDOW,
                   help="Ventana de análisis en frames para selección inteligente.")
    ap.add_argument("--quality-threshold", type=float, default=CAPTURE_QUALITY_THRESHOLD,
                   help="Umbral mínimo de calidad para considerar captura.")
    ap.add_argument("--stability-threshold", type=float, default=CAPTURE_STABILITY_THRESHOLD,
                   help="Umbral de estabilidad del vehículo para captura.")
    ap.add_argument("--upscaling-method", choices=["advanced", "fast", "standard"], default="advanced",
                   help="Método de upscaling con IA: advanced (mejor calidad), fast (más rápido), standard (básico).")
    ap.add_argument("--target-upscale", type=float, default=2.0,
                   help="Factor de upscaling objetivo para mejora de calidad.")
    
    # --- NUEVOS ARGUMENTOS PARA MODO DE CAPTURA SIMPLE ---
    ap.add_argument("--simple-capture", action="store_true", default=CAPTURE_SIMPLE_MODE,
                   help="Activar modo de captura simple (menos restrictivo).")
    ap.add_argument("--fallback-frames", type=int, default=CAPTURE_FALLBACK_AFTER_FRAMES,
                   help="Número de frames antes de activar fallback de captura.")
    
    args = ap.parse_args()
    
    # --- Setup ---
    model = YOLO(args.weights)
    cls_names_arg = [c.strip() for c in args.classes.split(",")]
    class_ids = [CLASES_COCO[c] for c in cls_names_arg if c in CLASES_COCO]
    
    cap = cv2.VideoCapture(args.video)
    fps = cap.get(cv2.CAP_PROP_FPS)
    W = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)); H = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    cap.release()

    base = args.out or os.path.splitext(os.path.basename(args.video))[0]
    writer = cv2.VideoWriter(f"{base}_vigilancia.mp4", cv2.VideoWriter_fourcc(*"mp4v"), fps, (W, H))
    fcsv = open(f"{base}_datos_completos.csv", "w", newline=""); csvw = csv.writer(fcsv)
    csvw.writerow(["frame", "time_s", "track_id", "class", "conf", "x1","y1","x2","y2", "speed_kmh", "plate", "distance_m", "photo_captured"])

    # Actualizar constantes con argumentos de línea de comandos
    CAMERA_HEIGHT_M = args.camera_height
    CAMERA_ANGLE_DEG = args.camera_angle
    FOCAL_LENGTH_PX = args.focal_length
    
    # Actualizar configuración de calidad de imagen
    CAPTURE_FULL_FRAME = args.full_frame
    CAPTURE_ENHANCED = args.enhanced
    CAPTURE_ORIGINAL_COLORS = args.original_colors
    CAPTURE_ZOOM_FACTOR = args.zoom_factor
    CAPTURE_RESOLUTION_BOOST = args.resolution_boost
    CAPTURE_QUALITY = args.jpeg_quality
    
    # --- ACTUALIZAR CONFIGURACIÓN DE FUNCIONALIDADES AVANZADAS ---
    CAPTURE_INTELLIGENT_SELECTION = args.intelligent_selection
    CAPTURE_ANALYSIS_WINDOW = args.analysis_window
    CAPTURE_QUALITY_THRESHOLD = args.quality_threshold
    CAPTURE_STABILITY_THRESHOLD = args.stability_threshold
    
    # --- ACTUALIZAR CONFIGURACIÓN DE MODO SIMPLE ---
    CAPTURE_SIMPLE_MODE = args.simple_capture
    CAPTURE_FALLBACK_AFTER_FRAMES = args.fallback_frames
    
    # Crear carpeta de capturas
    setup_capture_folder()
    
    calib = setup_calibration(args)
    
    # Estructura de datos por vehículo, ahora con más campos
    tracks_state = defaultdict(lambda: {
        "id": None, "bbox": np.zeros(4), "visible_now": False, 
        "hist_world": deque(maxlen=int(fps/2)), # Historial de posiciones para ~0.5s
        "hist_v_kmh": deque(maxlen=10),       # Historial para suavizar velocidad
        "smoothed_v_kmh": None,
        "plate": None, "plate_attempts": 0,
        "best_thumb": None, "thumb_sharpness": 0.0,
        "class_name": "unknown", "distance_m": None,
        "photo_captured": False,  # Si ya se capturó una foto
        "last_capture_time": None,  # Último tiempo de captura
        "best_capture_distance": None, # Distancia óptima para la mejor captura
        "best_capture_sharpness": 0.0, # Nitidez óptima para la mejor captura
        "best_capture_frame": -1, # Índice de frame de la mejor captura
        "photo_file": None, # Ruta de la foto capturada en el mejor momento
        "bbox_history": deque(maxlen=10), # Historial de bounding boxes para análisis de estabilidad
        "confidence": 0.0 # Confianza de la detección
    })

    stream = model.track(source=args.video, stream=True, classes=class_ids, device=args.device, conf=args.conf, iou=args.iou, persist=True, verbose=False)

    # --- Bucle Principal ---
    frame_idx = -1; t0 = time.time()
    for res in stream:
        frame_idx += 1
        frame = res.orig_img
        t_sec = frame_idx / fps if fps > 0 else 0
        current_timestamp = datetime.now()

        for tid in list(tracks_state.keys()): tracks_state[tid]["visible_now"] = False

        if res.boxes is not None and len(res.boxes) > 0:
            for b in res.boxes:
                if b.id is None: continue
                tid = int(b.id.cpu())
                st = tracks_state[tid]
                
                # Actualizar datos básicos
                st["id"] = tid
                st["visible_now"] = True
                st["bbox"] = b.xyxy.cpu().numpy()[0]
                x1,y1,x2,y2 = st["bbox"].astype(int)
                st["class_name"] = model.names[int(b.cls.cpu())]
                confidence = float(b.conf.cpu())
                st["confidence"] = confidence
                
                # --- MANTENER HISTORIAL DE BOUNDING BOXES PARA ANÁLISIS DE ESTABILIDAD ---
                st["bbox_history"].append(st["bbox"].copy())
                
                # --- Lógica de Medición Real Mejorada ---
                # Calcular distancia real basada en la altura del bounding box
                bbox_height = y2 - y1
                st["distance_m"] = calculate_real_distance(bbox_height, calib)
                
                # Velocidad real basada en coordenadas del mundo
                if st["distance_m"] is not None:
                    # Convertir posición de imagen a coordenadas del mundo
                    pt_center = np.array([(x1+x2)/2.0, (y1+y2)/2.0])
                    pt_world = image_to_world_coords(pt_center, calib, H)
                    st["hist_world"].append((t_sec, pt_world[0], pt_world[1]))
                    
                    # Calcular velocidad si tenemos suficientes puntos
                    if len(st["hist_world"]) >= 2:
                        time_delta = st["hist_world"][-1][0] - st["hist_world"][0][0]
                        if time_delta > 0:
                            positions = [(p[1], p[2]) for p in st["hist_world"]]
                            v_kmh = calculate_real_speed_improved(positions, time_delta, calib)
                            if v_kmh is not None:
                                st["hist_v_kmh"].append(v_kmh)
                    
                    # Suavizar velocidad
                    if st["hist_v_kmh"]:
                        st["smoothed_v_kmh"] = np.mean(st["hist_v_kmh"])
                
                # --- Lógica de Matrícula (solo para vehículos) ---
                if st["class_name"] != "person":
                    current_thumb = frame[y1:y2, x1:x2]
                    sharpness = sharpness_score(current_thumb)
                    if sharpness > st["thumb_sharpness"]:
                        st["best_thumb"] = current_thumb; st["thumb_sharpness"] = sharpness
                    
                    if st["plate"] is None and st["plate_attempts"] < 15: # Intentar 15 veces
                        if frame_idx % 3 == 0: # Leer cada 3 frames
                           st["plate_attempts"] += 1
                           plate_text = read_plate(st["best_thumb"])
                           if plate_text: st["plate"] = plate_text
                
                # --- Captura de Fotos de Vehículos ---
                if (st["class_name"] != "person" and 
                    not st["photo_captured"] and 
                    should_capture_vehicle(confidence, st.get("smoothed_v_kmh"), st["class_name"], st.get("distance_m"), tid, tracks_state, frame_idx, fps)):
                    
                    # Calcular nitidez actual
                    current_thumb = frame[y1:y2, x1:x2]
                    current_sharpness = sharpness_score(current_thumb)
                    
                    # Verificar si es el mejor momento para capturar
                    if (st.get("best_capture_distance") is None or 
                        is_better_capture_moment(st.get("distance_m"), current_sharpness, 
                                               st.get("best_capture_distance"), st.get("best_capture_sharpness"))):
                        
                        # Actualizar información del mejor momento
                        st["best_capture_distance"] = st.get("distance_m")
                        st["best_capture_sharpness"] = current_sharpness
                        st["best_capture_frame"] = frame_idx
                        
                        # Capturar la foto en este momento
                        photo_file = capture_vehicle_photo(
                            frame, st["bbox"], tid, st["class_name"], 
                            confidence, st.get("smoothed_v_kmh"), st.get("plate"), 
                            current_timestamp
                        )
                        
                        if photo_file:
                            st["photo_captured"] = True
                            st["last_capture_time"] = current_timestamp
                            st["photo_file"] = photo_file
                            print(f"📸 Foto capturada en mejor momento: {photo_file}")
                            print(f"   - Distancia: {st.get('distance_m'):.1f}m, Nitidez: {current_sharpness:.2f}")

                # Guardar en CSV
                csvw.writerow([frame_idx, round(t_sec,2), tid, st["class_name"], confidence, 
                               x1,y1,x2,y2, 
                               round(st["smoothed_v_kmh"],1) if st["smoothed_v_kmh"] else None,
                               st["plate"], 
                               round(st["distance_m"],1) if st["distance_m"] else None,
                               st["photo_captured"]])

        # Dibujar todo
        fps_now = (frame_idx+1)/max(1e-6,(time.time()-t0))
        # Corrección: pasamos el fps del video a draw_hud para los cálculos de tiempo.
        # la barra de estado se ha modificado para calcular su propio fps_text
        draw_hud(frame, tracks_state, frame_idx, total_frames, fps)
        
        # Reescribimos la barra de estado con el FPS instantáneo
        layout = make_layout(frame.shape[1], frame.shape[0])
        s = layout["scale"]; safe = layout["safe"]
        bar_h = int(44*s); pad = int(12*s)
        x, y, w = safe["l"], safe["b"] - bar_h, safe["r"] - safe["l"]
        fps_text = f"FPS: {fps_now:.1f}"
        (tw, th), _ = cv2.getTextSize(fps_text, FONT_UI, s*0.7, 1)
        _put_label(frame, fps_text, x+w-pad-tw, y+bar_h*0.68, scale=s*0.7, col=THEME["muted"])

        writer.write(frame)
        
        # Barra de progreso en la consola
        print(f'\rProcesando... {frame_idx+1}/{total_frames} ({fps_now:.1f} FPS)', end='')
    
    # --- Finalizar ---
    writer.release(); fcsv.close()
    
    # Generar reporte final de capturas
    report_path = generate_capture_report()
    
    print("\n" + "="*60 + "\n🎉 PROCESO TERMINADO\n" + "="*60)
    print(f"✅ Video con HUD: {base}_vigilancia.mp4")
    print(f"✅ Datos en CSV: {base}_datos_completos.csv")
    print(f"📸 Fotos guardadas en: {CAPTURE_FOLDER}/")
    if report_path:
        print(f"📊 Reporte generado: {report_path}")
    print(f"⏱️  Tiempo Total: {time.time()-t0:.2f}s")
    print(f"📏 Configuración de medición real:")
    print(f"   - Altura de cámara: {CAMERA_HEIGHT_M:.1f} m")
    print(f"   - Ángulo de cámara: {CAMERA_ANGLE_DEG:.1f}°")
    print(f"   - Distancia focal: {FOCAL_LENGTH_PX:.0f} px")
    print(f"🚗 Velocidad máxima realista: {VEL_MAX_REALISTA} km/h")
    print(f"🚨 Umbral de infracción: {SPEED_INFRACTION_THRESHOLD} km/h")


if __name__ == "__main__":
    main()