# Blueprint: DroneVision-YOLOv8 - Plataforma de Análisis Aéreo Multi-Dominio

## 🚀 Visión General del Proyecto

### Objetivo Principal
Desarrollar una herramienta CLI/Python modular que permita al usuario seleccionar el módulo de análisis aéreo más adecuado para videos capturados con DJI Mini 2, integrando tres modelos especializados de YOLOv8 para diferentes dominios de aplicación.

### Alcance Técnico
- **Detección de Objetos**: Identificación y clasificación de elementos en videos aéreos
- **Tracking de Vehículos**: Seguimiento persistente con ID único para análisis de flujo de tráfico
- **Segmentación Semántica**: Análisis de terrenos para aplicaciones agrícolas y urbanas

### Casos de Uso
- **Vigilancia Urbana**: Monitoreo de seguridad en áreas metropolitanas
- **Gestión de Tráfico**: Análisis de flujo vehicular en autopistas y calles
- **Agricultura de Precisión**: Monitoreo de cultivos, detección de plagas y estrés hídrico

---

## ⚙️ Arquitectura Técnica y Requisitos

### Framework Principal
- **Ultralytics YOLOv8**: Framework de detección de objetos de última generación
- **Instalación**: `pip install ultralytics`
- **Versión Mínima**: YOLOv8 8.0.0+

### Requisitos de Hardware
| Componente | Mínimo | Recomendado |
|------------|--------|-------------|
| **GPU** | RTX 2060 (6GB VRAM) | RTX 3080+ (10GB+ VRAM) |
| **RAM** | 16GB | 32GB+ |
| **Almacenamiento** | 50GB libres | 100GB+ SSD |
| **CPU** | Intel i5-8400 / AMD Ryzen 5 2600 | Intel i7-10700K / AMD Ryzen 7 3700X |

### Dependencias del Sistema
```bash
# Dependencias principales
pip install ultralytics
pip install opencv-python
pip install numpy
pip install pandas
pip install matplotlib
pip install seaborn
pip install pillow
pip install tqdm

# Dependencias opcionales para procesamiento avanzado
pip install albumentations
pip install wandb
pip install tensorboard
```

### Modelos Preentrenados Requeridos
- `visdrone_yolov8.pt` - Modelo para análisis urbano general
- `uavdt_yolov8.pt` - Modelo para seguimiento de tráfico
- `ai4agriculture_yolov8-seg.pt` - Modelo para segmentación agrícola

---

## 🎯 Módulos de Ejecución y Tareas (Uso en Producción)

### Módulo 1: Análisis Urbano General (VisDrone)
**Enfoque**: Detección y clasificación de objetos en entornos urbanos

#### Características Técnicas
- **Clases de Objetos**: Personas, vehículos, estructuras, señales de tráfico
- **Resolución de Entrada**: 640x640 píxeles
- **FPS de Procesamiento**: 15-30 FPS (dependiendo del hardware)
- **Precisión Esperada**: mAP@0.5 > 0.75

#### Comando de Implementación
```bash
yolo detect predict model=visdrone_yolov8.pt source=city_video.mp4 save=True conf=0.5 iou=0.45
```

#### Parámetros de Configuración
- `conf`: Umbral de confianza (0.5)
- `iou`: Umbral de IoU para NMS (0.45)
- `save`: Guardar resultados (True)
- `save_txt`: Guardar anotaciones en formato YOLO (True)
- `save_conf`: Incluir confianza en anotaciones (True)

### Módulo 2: Seguimiento de Flujo de Tráfico (UAVDT)
**Enfoque**: Detección y tracking persistente de vehículos

#### Características Técnicas
- **Clases de Vehículos**: Carros, autobuses, camiones, motocicletas
- **Algoritmo de Tracking**: ByteTrack
- **ID Persistente**: Mantiene identificación única por vehículo
- **Precisión de Tracking**: MOTA > 0.80

#### Comando de Implementación
```bash
yolo track predict model=uavdt_yolov8.pt source=highway_video.mp4 tracker=bytetrack save=True conf=0.6
```

#### Parámetros de Configuración
- `tracker`: Algoritmo de seguimiento (bytetrack)
- `conf`: Umbral de confianza (0.6)
- `save`: Guardar resultados con tracking (True)
- `save_txt`: Guardar tracks en formato MOT (True)

### Módulo 3: Monitoreo Agrícola (AI4Agriculture)
**Enfoque**: Segmentación semántica para análisis de precisión agrícola

#### Características Técnicas
- **Clases de Segmentación**: Vegetación, suelo, agua, cultivos, plagas
- **Resolución de Entrada**: 960x960 píxeles
- **Tipo de Modelo**: YOLOv8-seg (segmentación)
- **Precisión de Segmentación**: mIoU > 0.70

#### Comando de Implementación
```bash
yolo segment predict model=ai4agriculture_yolov8-seg.pt source=farm_video.mp4 save=True conf=0.4
```

#### Parámetros de Configuración
- `conf`: Umbral de confianza (0.4)
- `save`: Guardar máscaras de segmentación (True)
- `save_txt`: Guardar polígonos de segmentación (True)
- `save_crop`: Guardar crops de objetos segmentados (True)

---

## 🛠️ Plan de Desarrollo y Fine-Tuning

### Fase 1: Preparación de Datos

#### Estructura de Directorios
```
data/
├── visdrone/
│   ├── images/
│   │   ├── train/
│   │   └── val/
│   └── labels/
│       ├── train/
│       └── val/
├── uavdt/
│   ├── images/
│   └── labels/
└── agriculture/
    ├── images/
    └── labels/
```

#### Archivos de Configuración YAML

**visdrone.yaml**
```yaml
path: ./data/visdrone
train: images/train
val: images/val
test: images/test

nc: 10
names: ['person', 'people', 'bicycle', 'car', 'van', 'truck', 'tricycle', 'awning-tricycle', 'bus', 'motor']
```

**uavdt.yaml**
```yaml
path: ./data/uavdt
train: images/train
val: images/val

nc: 3
names: ['car', 'bus', 'truck']
```

**agri.yaml**
```yaml
path: ./data/agriculture
train: images/train
val: images/val

nc: 5
names: ['vegetation', 'soil', 'water', 'crop', 'pest']
```

### Fase 2: Entrenamiento de Modelos

#### Paso A: Desarrollo del Modelo VisDrone Personalizado
```bash
yolo detect train data=visdrone.yaml model=yolov8m.pt epochs=100 imgsz=640 batch=16 device=0 workers=8
```

**Parámetros de Entrenamiento**:
- `epochs`: 100 épocas
- `imgsz`: 640x640 píxeles
- `batch`: 16 (ajustar según VRAM disponible)
- `device`: 0 (GPU principal)
- `workers`: 8 (procesos paralelos)

#### Paso B: Desarrollo del Modelo UAVDT Personalizado
```bash
yolo detect train data=uavdt.yaml model=yolov8m.pt epochs=80 imgsz=640 batch=16 device=0 workers=8
```

**Parámetros de Entrenamiento**:
- `epochs`: 80 épocas
- `imgsz`: 640x640 píxeles
- `batch`: 16
- `device`: 0
- `workers`: 8

#### Paso C: Desarrollo del Modelo Agrícola Personalizado
```bash
yolo segment train data=agri.yaml model=yolov8m-seg.pt epochs=120 imgsz=960 batch=8 device=0 workers=8
```

**Parámetros de Entrenamiento**:
- `epochs`: 120 épocas
- `imgsz`: 960x960 píxeles (mayor resolución para segmentación)
- `batch`: 8 (reducido por mayor resolución)
- `device`: 0
- `workers`: 8

### Fase 3: Validación y Optimización

#### Métricas de Evaluación
- **Detección**: mAP@0.5, mAP@0.5:0.95, Precision, Recall
- **Tracking**: MOTA, MOTP, IDF1, MT, ML
- **Segmentación**: mIoU, Pixel Accuracy, Dice Score

#### Comandos de Validación
```bash
# Validación de detección
yolo detect val data=visdrone.yaml model=runs/detect/train/weights/best.pt

# Validación de tracking
yolo track val data=uavdt.yaml model=runs/detect/train/weights/best.pt

# Validación de segmentación
yolo segment val data=agri.yaml model=runs/segment/train/weights/best.pt
```

---

## 📊 Tabla Comparativa de Módulos

| Modelo | Enfoque Principal | Ideal Para | Resolución | FPS Esperado | Precisión |
|--------|-------------------|------------|------------|--------------|-----------|
| **VisDrone** | Detección urbana general | Vigilancia de seguridad, monitoreo urbano | 640x640 | 25-30 | mAP@0.5 > 0.75 |
| **UAVDT** | Tracking de vehículos | Análisis de tráfico, conteo vehicular | 640x640 | 20-25 | MOTA > 0.80 |
| **AI4Agriculture** | Segmentación agrícola | Monitoreo de cultivos, detección de plagas | 960x960 | 15-20 | mIoU > 0.70 |

---

## 🚀 Guía de Implementación Rápida

### Instalación del Entorno
```bash
# Crear entorno virtual
python -m venv dronevision_env
source dronevision_env/bin/activate  # Linux/Mac
# dronevision_env\Scripts\activate  # Windows

# Instalar dependencias
pip install ultralytics opencv-python numpy pandas matplotlib seaborn
```

### Ejecución de Pruebas
```bash
# Probar con video de ejemplo
yolo detect predict model=yolov8n.pt source=test_video.mp4 save=True

# Verificar instalación
yolo checks
```

### Estructura de Proyecto Recomendada
```
DroneVision-YOLOv8/
├── models/
│   ├── visdrone_yolov8.pt
│   ├── uavdt_yolov8.pt
│   └── ai4agriculture_yolov8-seg.pt
├── data/
│   ├── visdrone/
│   ├── uavdt/
│   └── agriculture/
├── configs/
│   ├── visdrone.yaml
│   ├── uavdt.yaml
│   └── agri.yaml
├── scripts/
│   ├── train_models.py
│   ├── predict_urban.py
│   ├── predict_traffic.py
│   └── predict_agriculture.py
├── results/
└── README.md
```

---

## 📎 Resumen y Conclusión

### Beneficios del Sistema Modular
1. **Flexibilidad**: Selección del módulo según el tipo de análisis requerido
2. **Escalabilidad**: Fácil adición de nuevos módulos especializados
3. **Eficiencia**: Optimización específica para cada dominio de aplicación
4. **Mantenibilidad**: Código modular y bien documentado

### Próximos Pasos
1. **Recolección de Datos**: Obtener videos de DJI Mini 2 para cada dominio
2. **Etiquetado**: Anotar datos para entrenamiento personalizado
3. **Entrenamiento**: Ejecutar los comandos de fine-tuning
4. **Validación**: Probar modelos con datos reales
5. **Despliegue**: Implementar interfaz CLI para selección de módulos

### Consideraciones Técnicas
- **Memoria GPU**: Monitorear uso de VRAM durante entrenamiento
- **Tiempo de Procesamiento**: Planificar tiempos de entrenamiento (8-24 horas por modelo)
- **Calidad de Datos**: Asegurar diversidad en videos de entrenamiento
- **Actualizaciones**: Mantener modelos actualizados con nuevas versiones de YOLOv8

Este blueprint proporciona una hoja de ruta completa para desarrollar un sistema robusto y modular de análisis de videos de drones, optimizado para las capacidades específicas del DJI Mini 2 y los tres dominios de aplicación identificados.
