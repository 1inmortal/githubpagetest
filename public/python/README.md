# 🐍 Estructura Completa para Proyectos de Python

Esta carpeta contiene una estructura profesional y completa para desarrollar proyectos de Python con las mejores prácticas y herramientas modernas.

## 🚀 Características

- **Python 3.9+** - Versión estable y moderna
- **Gestión de dependencias** con `requirements.txt` y `pyproject.toml`
- **Herramientas de calidad de código**: Black, Flake8, MyPy
- **Testing completo** con pytest y coverage
- **Frameworks web**: Flask, Django, FastAPI
- **Machine Learning**: TensorFlow, PyTorch, Scikit-learn
- **Procesamiento de datos**: Pandas, NumPy, Matplotlib
- **Entornos virtuales** y gestión de dependencias

## 📋 Requisitos Previos

- **Python 3.9 o superior** (recomendado Python 3.11 o 3.12)
- **pip** (incluido con Python 3.4+)
- **Git** para control de versiones

### Datasets de Kaggle requeridos
- Global Cybersecurity Threats (2015-2024) → renombrar a `Global_Cybersecurity_Threats_2015-2024.csv`
- Phishing Email Dataset (archivo `CEAS_08.csv`) → renombrar a `CEAS_08.csv`

Coloca los CSV en `data/`, `notebooks/` o la raíz del proyecto.

## ⚡ Generación rápida de reportes (CLI)

Se incluye un generador de reportes por CLI:

```bash
python scripts/generate_report.py --fast
```

Por defecto buscará los CSV en `notebooks/`, `data/` o la raíz. También puedes especificar rutas:

```bash
python scripts/generate_report.py \\
  --threats data/Global_Cybersecurity_Threats_2015-2024.csv \\
  --phishing data/CEAS_08.csv \\
  --from-year 2018 --to-year 2024 \\
  --outdir reports/mi_reporte
```

Flags disponibles:
- `--threats`: ruta al CSV de amenazas.
- `--phishing`: ruta al CSV de phishing.
- `--from-year` / `--to-year`: filtra por rango de años.
- `--outdir`: carpeta de salida. Si no se indica, se crea `reports/YYYYMMDD_HHMMSS`.
- `--fast`: modo rápido (omite gráficas pesadas como WordCloud/boxplots).
- `--no-plots`: desactiva todas las gráficas.

### Salidas
En la carpeta de salida se generan:
- `report.json`: resumen consolidado (KPIs, segmentaciones, top categorías).
- CSVs: `kpis.csv`, `mttr_by_year.csv`, `mttd_by_year.csv`, `mttr_by_type.csv`, `mttd_by_type.csv`, `top_threat_types.csv`, `top_industries.csv` (según columnas disponibles).
- Gráficas (si habilitadas): `comparacion_metricas.png`, `evolucion_anual.png`, `boxplot_mttr_tipo.png`, `wordcloud_phishing.png`.
- `report_summary.md`: resumen ejecutivo con timestamp.

### Logs
Se escriben en `logs/generate_report_YYYYMMDD.log`.

## 🛠️ Instalación

### 1. Clonar o descargar esta estructura
```bash
# Si usas Git
git clone <tu-repositorio>
cd python-projects

# O simplemente descargar y extraer en tu carpeta
```

### 2. Crear entorno virtual (Recomendado)
```bash
# Opción 1: venv (incluido con Python)
python -m venv venv

# Opción 2: virtualenv
pip install virtualenv
virtualenv venv

# Activar el entorno virtual
# En Windows:
venv\Scripts\activate

# En macOS/Linux:
source venv/bin/activate
```

### 3. Instalar dependencias
```bash
# Instalar todas las dependencias
pip install -r requirements.txt

# O instalar solo las básicas
pip install flask django pandas numpy pytest black flake8
```

## 🏗️ Estructura de Directorios

```
python-projects/
├── src/                    # Código fuente principal
│   ├── __init__.py
│   ├── main.py            # Punto de entrada
│   └── utils/             # Utilidades comunes
├── tests/                  # Tests unitarios e integración
│   ├── __init__.py
│   ├── test_main.py
│   └── conftest.py
├── docs/                   # Documentación
├── notebooks/              # Jupyter notebooks
├── scripts/                # Scripts útiles
├── data/                   # Datos del proyecto
├── logs/                   # Archivos de log
├── requirements.txt        # Dependencias
├── pyproject.toml         # Configuración del proyecto
├── .env.example           # Variables de entorno de ejemplo
├── .gitignore             # Archivos a ignorar en Git
└── README.md              # Este archivo
```

## 🚀 Uso Rápido

### Crear un proyecto Flask simple
```python
# src/app.py
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return '¡Hola Mundo desde Python!'

if __name__ == '__main__':
    app.run(debug=True)
```

### Ejecutar tests
```bash
# Ejecutar todos los tests
pytest

# Con coverage
pytest --cov=src

# Tests específicos
pytest tests/test_main.py -v
```

### Formatear código
```bash
# Formatear con Black
black src/ tests/

# Verificar con Flake8
flake8 src/ tests/

# Verificar tipos con MyPy
mypy src/
```

## 🔧 Herramientas de Desarrollo

### **Black** - Formateador de código
- Formatea automáticamente el código Python
- Configurado para línea de 88 caracteres
- Compatible con PEP 8

### **Flake8** - Linter de código
- Verifica estilo y calidad del código
- Configurado para ser compatible con Black

### **MyPy** - Verificador de tipos
- Verificación estática de tipos
- Configuración estricta para mejor calidad

### **Pytest** - Framework de testing
- Tests unitarios e integración
- Coverage reporting
- Fixtures y parametrización

## 📊 Machine Learning y Data Science

### Librerías incluidas:
- **Pandas**: Manipulación de datos
- **NumPy**: Computación numérica
- **Matplotlib/Seaborn**: Visualización
- **Scikit-learn**: Machine Learning clásico
- **TensorFlow**: Deep Learning
- **PyTorch**: Deep Learning (alternativa)

### Ejemplo de uso:
```python
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Cargar datos
data = pd.read_csv('data/dataset.csv')

# Preparar features
X = data.drop('target', axis=1)
y = data['target']

# Split train/test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Entrenar modelo
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Predecir
predictions = model.predict(X_test)
```

## 🌐 Desarrollo Web

### **Flask** - Microframework
```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/data')
def get_data():
    return jsonify({'message': 'API funcionando'})
```

### **Django** - Framework completo
```bash
django-admin startproject myproject
cd myproject
python manage.py runserver
```

### **FastAPI** - API moderna y rápida
```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}
```

## 📝 Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:
```bash
# .env
DEBUG=True
SECRET_KEY=tu-clave-secreta-aqui
DATABASE_URL=postgresql://user:pass@localhost/dbname
API_KEY=tu-api-key
```

## 🧪 Testing

### Estructura de tests recomendada:
```python
# tests/test_example.py
import pytest
from src.utils import example_function

def test_example_function():
    """Test básico de ejemplo"""
    result = example_function(2, 3)
    assert result == 5

@pytest.mark.slow
def test_slow_function():
    """Test marcado como lento"""
    # Test que toma tiempo
    pass

@pytest.mark.integration
def test_integration():
    """Test de integración"""
    # Test que requiere servicios externos
    pass
```

## 📚 Recursos Adicionales

- [Documentación oficial de Python](https://docs.python.org/)
- [PEP 8 - Guía de estilo](https://www.python.org/dev/peps/pep-0008/)
- [Real Python](https://realpython.com/) - Tutoriales excelentes
- [Python Package Index](https://pypi.org/) - Librerías oficiales

## 🤝 Contribuir

1. Fork del proyecto
2. Crear rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:
- Revisa la documentación
- Busca en issues existentes
- Crea un nuevo issue con detalles del problema

---

**¡Feliz programación con Python! 🐍✨**
