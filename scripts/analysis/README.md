# Análisis de Dependencias y Enlaces Estáticos

Este directorio contiene scripts para analizar y corregir dependencias en archivos `index.*` del repositorio.

## Scripts Disponibles

### 1. `find-all-index-files.py`
**Propósito**: Encuentra todos los archivos `index.*` en el repositorio.

**Uso**:
```bash
python find-all-index-files.py
```

**Salida**: Lista todos los archivos `index.*` encontrados, agrupados por tipo.

### 2. `analyze-main-index-files.py`
**Propósito**: Analiza los archivos `index.*` principales del proyecto y genera un reporte detallado de dependencias.

**Uso**:
```bash
python analyze-main-index-files.py
```

**Salida**: 
- Reporte en consola con resumen de análisis
- Archivo JSON: `main-index-files-analysis.json`

**Archivos analizados**:
- `index.html` (raíz)
- `src/components/Certificados/index.*`
- `src/components/react-ui-login/src/index.*`
- `src/components/evidencias/laboratorio/index.html`
- `src/components/evidencias/presentacion/slowed/promptdj-midi/index.*`
- Y otros archivos `index.*` importantes del proyecto

### 3. `dependency-analysis-report.py`
**Propósito**: Script original para análisis general de dependencias.

**Uso**:
```bash
python dependency-analysis-report.py
```

**Salida**:
- Reporte en consola
- Archivo JSON: `dependency-analysis-report.json`

### 4. `fix-broken-references.py`
**Propósito**: Corrige automáticamente las referencias rotas encontradas en el análisis.

**Uso**:
```bash
python fix-broken-references.py
```

**Correcciones aplicadas**:
- Referencias a `main.css` → `navegacion.css`
- Referencias a `manifest.json` → `config/manifest.json`
- Referencias a `Blog/Ceo.html` → `src/components/Blog/Ceo.html`
- Referencias de imágenes y assets
- Referencias en archivos de certificados
- Y otras correcciones automáticas

**Salida**:
- Log de correcciones aplicadas
- Archivo JSON: `fixes-applied.json`

## Estructura de Archivos Generados

### Reportes JSON
- `main-index-files-analysis.json`: Análisis detallado de archivos principales
- `dependency-analysis-report.json`: Análisis general de dependencias
- `fixes-applied.json`: Log de correcciones aplicadas

### Estructura del Reporte
```json
{
  "summary": {
    "total_index_files": 18,
    "total_connections": 359,
    "total_broken_connections": 236,
    "files_with_issues": 11
  },
  "index_files": [
    {
      "file_path": "index.html",
      "file_type": "html",
      "total_connections": 163,
      "broken_connections": 110,
      "missing_files": [...],
      "connections": [...]
    }
  ]
}
```

## Tipos de Referencias Analizadas

### HTML
- `href` enlaces
- `src` scripts e imágenes
- `@import` CSS
- `import` JavaScript

### JavaScript/TypeScript
- `import` statements
- `require()` calls
- Referencias a módulos

### CSS
- `@import` statements
- `url()` references

## Estado de las Conexiones

- **OK**: Referencia válida, archivo existe
- **Broken**: Referencia rota, archivo no encontrado
- **Missing**: Archivo faltante

## Recomendaciones

1. **Revisar correcciones**: Siempre verifica que las correcciones automáticas sean correctas
2. **Archivos de audio/video**: Algunas referencias pueden necesitar corrección manual
3. **Secciones internas**: Las referencias `#` son válidas para navegación interna
4. **Archivos faltantes**: Considera crear los archivos faltantes o ajustar rutas

## Uso Recomendado

1. **Análisis inicial**:
   ```bash
   python find-all-index-files.py
   python analyze-main-index-files.py
   ```

2. **Revisar reporte**:
   - Revisar `main-index-files-analysis.json`
   - Identificar problemas críticos

3. **Aplicar correcciones**:
   ```bash
   python fix-broken-references.py
   ```

4. **Verificar resultados**:
   - Revisar archivos modificados
   - Ejecutar análisis nuevamente para confirmar mejoras

## Dependencias

- Python 3.6+
- Bibliotecas estándar: `os`, `re`, `json`, `pathlib`, `typing`

## Notas Técnicas

- Los scripts excluyen automáticamente `node_modules`
- Se ignoran URLs externas (http://, https://, //)
- Las correcciones son conservadoras y específicas
- Se mantiene un log completo de todas las operaciones
