# Configuración de CodeQL

Este documento explica la configuración de CodeQL para el análisis de seguridad del código.

## Descripción

CodeQL es la herramienta de análisis de código de GitHub que identifica vulnerabilidades de seguridad y problemas de calidad en el código. En este proyecto, CodeQL está configurado para analizar:

- **Python**: Scripts de auditoría de secretos y herramientas de seguridad
- **JavaScript/TypeScript**: Código frontend y herramientas de desarrollo
- **HTML/CSS**: Archivos de la página web

## Archivos de Configuración

### Workflow Principal
- `.github/workflows/codeql.yml`: Configuración del workflow de GitHub Actions

### Configuración de CodeQL
- `.github/codeql/codeql-config.yml`: Configuración específica de CodeQL
- `pyproject.toml`: Configuración del proyecto Python
- `requirements.txt`: Dependencias de Python
- `setup.py`: Configuración de instalación del proyecto

## Lenguajes Soportados

### Python
- **Archivos principales**: `audit-secrets.py`, scripts en `Evidencias/`
- **Dependencias**: PyYAML, llama-cpp-python
- **Análisis**: Vulnerabilidades de seguridad, problemas de calidad, secretos hardcodeados

### JavaScript/TypeScript
- **Archivos**: Scripts en `assets/js/`, `react-ui-login/`
- **Análisis**: Vulnerabilidades XSS, inyección de código, problemas de seguridad

## Configuración de Entorno

### Python
```bash
# Instalar dependencias
pip install -r requirements.txt

# Configurar entorno de desarrollo
pip install -e .
```

### CodeQL CLI (Opcional)
```bash
# Instalar CodeQL CLI
gh extension install github/gh-codeql

# Configurar base de datos
codeql database create db --language=python
codeql database analyze db python-security-and-quality.qls --format=sarif-latest --output=results.sarif
```

## Solución de Problemas

### Error: "No se encontró ningún código Python"
1. Verificar que los archivos `.py` estén en el repositorio
2. Asegurar que no estén en `.gitignore`
3. Verificar la configuración en `codeql-config.yml`

### Error: "CodeQL no pudo procesar nada"
1. Verificar que las dependencias estén en `requirements.txt`
2. Asegurar que el archivo `setup.py` esté presente
3. Verificar la configuración de `pyproject.toml`

### Error: "Autobuild falló"
1. Verificar que el archivo `requirements.txt` esté presente
2. Asegurar que las dependencias sean correctas
3. Verificar la configuración de Python en el workflow

## Archivos Importantes

### Para Python
- `audit-secrets.py`: Script principal de auditoría
- `requirements.txt`: Dependencias de Python
- `pyproject.toml`: Configuración moderna del proyecto
- `setup.py`: Configuración de instalación

### Para CodeQL
- `.github/workflows/codeql.yml`: Workflow principal
- `.github/codeql/codeql-config.yml`: Configuración específica
- `.python-version`: Versión de Python

## Comandos Útiles

```bash
# Verificar sintaxis de Python
python -m py_compile audit-secrets.py

# Verificar dependencias
pip check

# Ejecutar auditoría localmente
python audit-secrets.py

# Verificar configuración de CodeQL
gh codeql database list
```

## Notas Importantes

1. **Secretos**: Nunca incluir secretos reales en el código
2. **Dependencias**: Mantener `requirements.txt` actualizado
3. **Configuración**: Verificar que todos los archivos de configuración estén presentes
4. **Versiones**: Usar versiones específicas de las dependencias

## Recursos Adicionales

- [Documentación oficial de CodeQL](https://codeql.github.com/)
- [Guía de configuración de Python](https://codeql.github.com/docs/codeql-language-guides/python/)
- [Workflows de GitHub Actions](https://docs.github.com/en/actions)
