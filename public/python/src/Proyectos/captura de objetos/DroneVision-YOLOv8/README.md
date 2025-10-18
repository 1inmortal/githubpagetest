# 🚁 DroneVision-YOLOv8 - Plataforma de Análisis Aéreo Multi-Dominio

Una plataforma modular de análisis de videos de drones (DJI Mini 2) que integra tres modelos especializados de YOLOv8 para diferentes dominios de aplicación: análisis urbano, seguimiento de tráfico y monitoreo agrícola.

## 🎯 Características Principales

- **🔍 Análisis Urbano General**: Detección de objetos en entornos urbanos (VisDrone)
- **🚗 Seguimiento de Tráfico**: Detección y tracking de vehículos (UAVDT)
- **🌾 Monitoreo Agrícola**: Segmentación semántica para agricultura de precisión (AI4Agriculture)
- **⚡ Interfaz CLI Intuitiva**: Selección fácil de módulos y parámetros
- **🔧 Configuración Modular**: Scripts de entrenamiento y predicción independientes
- **📊 Reportes Automáticos**: Generación de análisis y métricas detalladas

## 🚀 Instalación Rápida

### 1. Clonar el Repositorio
```bash
git clone <repository-url>
cd DroneVision-YOLOv8
```

### 2. Configuración Automática
```bash
python setup.py
```

### 3. Verificar Instalación
```bash
python main.py --interactive
```

## 📋 Requisitos del Sistema

### Hardware Mínimo
- **GPU**: RTX 2060 (6GB VRAM) o superior
- **RAM**: 16GB (Recomendado: 32GB+)
- **Almacenamiento**: 50GB libres (Recomendado: 100GB+ SSD)
- **CPU**: Intel i5-8400 / AMD Ryzen 5 2600

### Software
- **Python**: 3.8 o superior
- **CUDA**: 11.8 o superior (para GPU)
- **Sistema Operativo**: Windows 10/11, Linux, macOS

## 🎮 Uso del Sistema

### Modo Interactivo
```bash
python main.py --interactive
```

### Uso Directo por Línea de Comandos

#### Análisis Urbano
```bash
python main.py --module 1 --source video.mp4 --output results/urban
```

#### Seguimiento de Tráfico
```bash
python main.py --module 2 --source highway.mp4 --output results/traffic
```

#### Monitoreo Agrícola
```bash
python main.py --module 3 --source farm.mp4 --output results/agriculture
```

### Entrenamiento de Modelos
```bash
# Entrenar modelo urbano
python main.py --train --module 1 --epochs 100

# Entrenar modelo de tráfico
python main.py --train --module 2 --epochs 80

# Entrenar modelo agrícola
python main.py --train --module 3 --epochs 120
```

## 📁 Estructura del Proyecto

```
DroneVision-YOLOv8/
├── 📁 configs/                 # Archivos de configuración YAML
│   ├── visdrone.yaml          # Configuración para análisis urbano
│   ├── uavdt.yaml             # Configuración para seguimiento de tráfico
│   └── agri.yaml              # Configuración para monitoreo agrícola
├── 📁 data/                   # Datos de entrenamiento
│   ├── visdrone/              # Dataset VisDrone
│   ├── uavdt/                 # Dataset UAVDT
│   └── agriculture/           # Dataset AI4Agriculture
├── 📁 models/                 # Modelos entrenados
│   ├── visdrone_yolov8.pt     # Modelo urbano
│   ├── uavdt_yolov8.pt        # Modelo de tráfico
│   └── ai4agriculture_yolov8-seg.pt  # Modelo agrícola
├── 📁 scripts/                # Scripts de entrenamiento y predicción
│   ├── train_visdrone.py      # Entrenamiento urbano
│   ├── train_uavdt.py         # Entrenamiento de tráfico
│   ├── train_agriculture.py   # Entrenamiento agrícola
│   ├── predict_urban.py       # Predicción urbana
│   ├── predict_traffic.py     # Predicción de tráfico
│   └── predict_agriculture.py # Predicción agrícola
├── 📁 utils/                  # Utilidades del sistema
│   ├── data_utils.py          # Procesamiento de datos
│   ├── model_utils.py         # Gestión de modelos
│   ├── visualization.py       # Visualización de resultados
│   └── config_utils.py        # Gestión de configuraciones
├── 📁 results/                # Resultados de análisis
├── 📁 logs/                   # Archivos de log
├── 📁 backups/                # Copias de seguridad
├── 📁 templates/              # Plantillas de reportes
├── main.py                    # Interfaz CLI principal
├── setup.py                   # Script de configuración
├── requirements.txt           # Dependencias del sistema
└── README.md                  # Este archivo
```

## 🔧 Configuración Avanzada

### Parámetros de Entrenamiento

#### VisDrone (Análisis Urbano)
```yaml
epochs: 100
imgsz: 640
batch: 16
device: 0
workers: 8
```

#### UAVDT (Seguimiento de Tráfico)
```yaml
epochs: 80
imgsz: 640
batch: 16
device: 0
workers: 8
tracker: bytetrack
```

#### AI4Agriculture (Monitoreo Agrícola)
```yaml
epochs: 120
imgsz: 960
batch: 8
device: 0
workers: 8
task: segment
```

### Parámetros de Predicción

#### Análisis Urbano
```bash
--conf 0.5    # Umbral de confianza
--iou 0.45    # Umbral de IoU para NMS
--save-txt    # Guardar anotaciones
--save-conf   # Incluir confianza
```

#### Seguimiento de Tráfico
```bash
--conf 0.6    # Umbral de confianza
--iou 0.7     # Umbral de IoU
--tracker bytetrack  # Algoritmo de tracking
--save-txt    # Guardar tracks
```

#### Monitoreo Agrícola
```bash
--conf 0.4    # Umbral de confianza
--iou 0.7     # Umbral de IoU
--save-txt    # Guardar polígonos
--save-crop   # Guardar crops
```

## 📊 Métricas y Evaluación

### Detección (VisDrone)
- **mAP@0.5**: Precisión media en IoU 0.5
- **mAP@0.5:0.95**: Precisión media en IoU 0.5-0.95
- **Precision**: Precisión de detección
- **Recall**: Sensibilidad de detección

### Tracking (UAVDT)
- **MOTA**: Precisión de tracking múltiple
- **MOTP**: Precisión de tracking múltiple
- **IDF1**: F1-score de identificación
- **MT/ML**: Tracks mayormente rastreados/perdidos

### Segmentación (AI4Agriculture)
- **mIoU**: Intersección sobre Unión media
- **Pixel Accuracy**: Precisión de píxeles
- **Dice Score**: Coeficiente de Dice

## 🎯 Casos de Uso

### 1. Vigilancia Urbana
- Monitoreo de seguridad en áreas metropolitanas
- Detección de personas, vehículos y estructuras
- Análisis de comportamiento urbano

### 2. Gestión de Tráfico
- Análisis de flujo vehicular en autopistas
- Conteo automático de vehículos
- Detección de congestiones y accidentes

### 3. Agricultura de Precisión
- Monitoreo de cultivos y vegetación
- Detección de plagas y enfermedades
- Análisis de estrés hídrico
- Optimización de riego

## 🔍 Ejemplos de Uso

### Análisis de Video Urbano
```python
from ultralytics import YOLO

# Cargar modelo
model = YOLO('models/visdrone_yolov8.pt')

# Procesar video
results = model.predict('city_video.mp4', save=True)

# Generar reporte
for result in results:
    print(f"Detecciones: {len(result.boxes)}")
```

### Seguimiento de Tráfico
```python
from ultralytics import YOLO

# Cargar modelo
model = YOLO('models/uavdt_yolov8.pt')

# Procesar con tracking
results = model.track('highway_video.mp4', tracker='bytetrack', save=True)

# Analizar tracks
for result in results:
    if result.boxes.id is not None:
        print(f"Tracks activos: {len(result.boxes.id)}")
```

### Segmentación Agrícola
```python
from ultralytics import YOLO

# Cargar modelo
model = YOLO('models/ai4agriculture_yolov8-seg.pt')

# Procesar con segmentación
results = model.predict('farm_video.mp4', save=True)

# Analizar segmentación
for result in results:
    if result.masks is not None:
        print(f"Máscaras: {len(result.masks)}")
```

## 🛠️ Desarrollo y Contribución

### Estructura de Desarrollo
1. **Fork** del repositorio
2. **Crear** rama de feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Crear** Pull Request

### Estándares de Código
- **Python**: PEP 8
- **Documentación**: Docstrings completos
- **Testing**: Cobertura > 80%
- **Type Hints**: Obligatorios para funciones públicas

## 📚 Documentación Adicional

- [Blueprint Técnico](Blueprint_DroneVision_YOLOv8.md)
- [Guía de Configuración](docs/configuration.md)
- [API Reference](docs/api.md)
- [Ejemplos Avanzados](docs/examples.md)
- [Troubleshooting](docs/troubleshooting.md)

## 🤝 Soporte y Comunidad

- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Discusiones**: [GitHub Discussions](https://github.com/your-repo/discussions)
- **Wiki**: [Documentación Completa](https://github.com/your-repo/wiki)
- **Email**: support@dronevision.ai

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🙏 Agradecimientos

- **Ultralytics** por el framework YOLOv8
- **VisDrone** por el dataset de análisis urbano
- **UAVDT** por el dataset de seguimiento de tráfico
- **AI4Agriculture** por el dataset de segmentación agrícola
- **Comunidad Open Source** por las contribuciones

## 📈 Roadmap

### Versión 1.1
- [ ] Interfaz web con Streamlit
- [ ] API REST con FastAPI
- [ ] Integración con bases de datos
- [ ] Dashboard de monitoreo en tiempo real

### Versión 1.2
- [ ] Soporte para más tipos de drones
- [ ] Modelos de detección de incendios
- [ ] Análisis de calidad del aire
- [ ] Integración con sistemas GIS

### Versión 2.0
- [ ] Aprendizaje federado
- [ ] Modelos de tiempo real
- [ ] Integración con IoT
- [ ] Análisis predictivo

---

**Desarrollado con ❤️ para la comunidad de análisis aéreo**

*DroneVision-YOLOv8 - Transformando la visión aérea en inteligencia accionable*
