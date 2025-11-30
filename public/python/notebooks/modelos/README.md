# 📊 Directorio de Modelos de Machine Learning

## 📁 Estructura del Proyecto

```
modelos/
├── 📂 Data/                                    # Datos y datasets
│   └── Global_Cybersecurity_Threats_2015-2024.csv
├── 📂 Notebooks/                               # Jupyter Notebooks principales
│   ├── clasificacion.ipynb
│   └── regrecion.ipynb
├── 📂 Modelos_Desarrollo/                      # Desarrollo y experimentación
│   ├── cross validation/
│   ├── regrecion ols/
│   ├── regrecion sk/
│   └── models/
└── 📄 README.md                               # Este archivo
```

## 🎯 Descripción del Proyecto

Este directorio contiene modelos de machine learning para análisis de datos de ciberseguridad, incluyendo:

- **Clasificación**: Modelos para categorizar amenazas de ciberseguridad
- **Regresión**: Análisis predictivo de tendencias de seguridad
- **Validación cruzada**: Técnicas de evaluación de modelos
- **Modelos entrenados**: Archivos de modelos guardados

## 📊 Datasets

- **Global_Cybersecurity_Threats_2015-2024.csv**: Dataset principal con amenazas de ciberseguridad globales desde 2015 hasta 2024

## 🚀 Uso Rápido

1. **Para análisis de clasificación**:
   ```bash
   jupyter notebook Notebooks/clasificacion.ipynb
   ```

2. **Para análisis de regresión**:
   ```bash
   jupyter notebook Notebooks/regrecion.ipynb
   ```

3. **Para desarrollo de modelos**:
   - Explora las carpetas en `Modelos_Desarrollo/`
   - Utiliza los datasets en `Data/`

## 📋 Requisitos

- Python 3.8+
- Jupyter Notebook
- Pandas
- Scikit-learn
- NumPy
- Matplotlib/Seaborn

## 🔧 Instalación

```bash
pip install -r requirements.txt
```

## 📈 Resultados

Los resultados de los modelos se guardan en las carpetas correspondientes dentro de `Modelos_Desarrollo/`.

## 📝 Notas

- Los notebooks principales están en la carpeta `Notebooks/`
- Los archivos de desarrollo y experimentación están en `Modelos_Desarrollo/`
- Los datasets están organizados en la carpeta `Data/`

---
*Última actualización: $(Get-Date -Format "dd/MM/yyyy HH:mm")*
