# 🛠️ Scripts Consolidados del Proyecto

Este directorio contiene scripts consolidados para la gestión integral del proyecto.

## 📁 Estructura Consolidada

### **Scripts Principales**
- **`project-manager.py`** - Script maestro que coordina todas las operaciones
- **`security-manager.py`** - Gestión consolidada de seguridad
- **`performance-manager.py`** - Gestión consolidada de rendimiento
- **`maintenance-manager.py`** - Gestión consolidada de mantenimiento

### **Scripts Específicos (Mantenidos)**
- **`cleanup-api-keys.sh`** - Limpieza específica de llaves API
- **`purge-api-keys.sh`** - Purga específica de claves API
- **`secrets-monitor.sh`** - Monitoreo continuo de secretos
- **`setup-env.js`** - Configuración de variables de entorno
- **`setup-secrets.sh`** - Configuración de secretos
- **`generate-updated-report.py`** - Generación de reportes

### **Scripts de Utilidades**
- **`run.sh`** - Ejecuta resolver-prs-comentarios.sh
- **`ejecutar.sh`** - Configura PATH para GitHub CLI
- **`resolver-prs-comentarios.sh`** - Resuelve PRs de Dependabot automáticamente
- **`verificar-prs.sh`** - Lista y verifica PRs abiertos
- **`update-security-deps.sh`** - Actualiza dependencias de seguridad
- **`push-changes.ps1`** - Script PowerShell para push de cambios
- **`update-security-deps.ps1`** - Actualiza dependencias de seguridad (PowerShell)
- **`FFmpeg_Launcher.ps1`** - Launcher GUI para FFmpeg
- **`fix-video-for-github-pages.ps1`** - Soluciona problemas de video en GitHub Pages
- **`setup-git-lfs-video.ps1`** - Configura Git LFS para videos
- **`verify-video.js`** - Verifica que el video existe y está listo

## 🚀 Uso Rápido

### **Pipeline Completo**
```bash
python scripts/project-manager.py --full
```

### **Solo Seguridad**
```bash
python scripts/project-manager.py --security
```

### **Solo Rendimiento**
```bash
python scripts/project-manager.py --performance
```

### **Solo Mantenimiento**
```bash
python scripts/project-manager.py --maintenance
```

## 🛡️ Seguridad

El `security-manager.py` consolida:
- ✅ Auditoría CVE-2025-7783 (form-data)
- ✅ Auditoría de secretos en workflows
- ✅ Escaneo de llaves API
- ✅ Actualización de dependencias vulnerables
- ✅ Generación de reportes de seguridad

## ⚡ Rendimiento

El `performance-manager.py` consolida:
- ✅ Optimización de JavaScript para TBT
- ✅ Optimización de imágenes
- ✅ Optimización de referencias
- ✅ Preparación para GitHub Pages
- ✅ Análisis de métricas de Lighthouse

## 🔧 Mantenimiento

El `maintenance-manager.py` consolida:
- ✅ Limpieza de duplicados
- ✅ Corrección de referencias rotas
- ✅ Corrección de referencias de audio
- ✅ Generación de placeholders
- ✅ Backup automático

## 📊 Reportes

Todos los scripts generan reportes detallados en `reports/`:
- `security-audit-YYYYMMDD_HHMMSS.json`
- `performance-optimization-YYYYMMDD_HHMMSS.json`
- `maintenance-YYYYMMDD_HHMMSS.json`

## 🔄 Scripts Consolidados y Eliminados

Los siguientes scripts fueron consolidados y **ELIMINADOS**:

### **Seguridad (5 scripts eliminados)**
- ❌ `audit-form-data-vulnerability.js` → `security-manager.py`
- ❌ `audit-secrets.py` → `security-manager.py`
- ❌ `security-audit.js` → `security-manager.py`
- ❌ `security-audit.py` → `security-manager.py`
- ❌ `update-form-data-security.js` → `security-manager.py`

### **Rendimiento (5 scripts eliminados)**
- ❌ `javascript-optimizer.py` → `performance-manager.py`
- ❌ `optimize-for-pages.js` → `performance-manager.py`
- ❌ `optimize-image-references.py` → `performance-manager.py`
- ❌ `optimize-images.py` → `performance-manager.py`
- ❌ `performance-optimizer.py` → `performance-manager.py`

### **Mantenimiento (4 scripts eliminados)**
- ❌ `cleanup-duplicates.py` → `maintenance-manager.py`
- ❌ `fix-audio-references.py` → `maintenance-manager.py`
- ❌ `fix-broken-references.py` → `maintenance-manager.py`
- ❌ `generate-audio-placeholders.py` → `maintenance-manager.py`

### **Obsoletos (2 scripts eliminados)**
- ❌ `git_auto.sh` → Eliminado (obsoleto)
- ❌ `simple_interest.sh` → Eliminado (irrelevante)

**Total eliminados: 16 scripts** → **Consolidados en 4 scripts principales**

## 🎯 Beneficios de la Consolidación

1. **Mantenimiento más fácil** - Menos archivos que gestionar
2. **Funcionalidad integrada** - Scripts relacionados trabajan juntos
3. **Mejor documentación** - Un solo archivo bien documentado por categoría
4. **Reducción de duplicación** - Código común reutilizable
5. **Mejor testing** - Pruebas integradas más completas
6. **Gestión centralizada** - Un solo punto de entrada para todas las operaciones

## 📝 Notas

- Todos los scripts requieren Python 3.7+
- Los scripts de seguridad requieren `pip install safety`
- Los scripts de optimización requieren `pip install pillow`
- Los scripts generan backups automáticos antes de realizar cambios
- Los reportes se guardan en el directorio `reports/`
