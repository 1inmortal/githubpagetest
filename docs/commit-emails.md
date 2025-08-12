# 📧 Sistema de Correos HTML Profesionales para Commits

## 🎯 **Descripción**

Este sistema permite generar correos HTML profesionales y atractivos cada vez que se realiza un commit, sin afectar el proceso normal de Git.

## 🚀 **Características**

- ✅ **Diseño profesional** con gradientes y animaciones CSS
- ✅ **Información completa** del commit (hash, autor, fecha, rama)
- ✅ **Estadísticas visuales** (archivos, adiciones, eliminaciones)
- ✅ **Responsive design** para móviles y desktop
- ✅ **Generación automática** después de cada commit
- ✅ **Sin afectar** el commit y push normal

## 🛠️ **Instalación y Configuración**

### **Paso 1: Configurar el hook de Git**
```bash
# Hacer ejecutable el hook
npm run email:setup

# O manualmente:
chmod +x .git/hooks/post-commit
```

### **Paso 2: Verificar que Python esté instalado**
```bash
python --version
# Debe mostrar Python 3.x
```

## 📖 **Uso**

### **Generación Automática (Recomendado)**
Después de cada commit, el sistema generará automáticamente un correo HTML:
```bash
git add .
git commit -m "feat: nueva funcionalidad"
# ✅ Se genera automáticamente commit-emails/commit_abc12345_20250810_2245.html
```

### **Generación Manual**
Si quieres generar un correo HTML manualmente:
```bash
npm run email:generate
# O
python scripts/generate-commit-email.py
```

## 📁 **Estructura de Archivos**

```
├── .gitmessage.html              # Plantilla HTML principal
├── scripts/
│   └── generate-commit-email.py  # Script de Python
├── .git/hooks/
│   └── post-commit              # Hook automático
└── commit-emails/                # Directorio de salida
    ├── commit_abc12345_20250810_2245.html
    ├── commit_def67890_20250810_2250.html
    └── ...
```

## 🎨 **Personalización**

### **Modificar la Plantilla HTML**
Edita `.gitmessage.html` para cambiar:
- Colores y estilos CSS
- Layout y estructura
- Información mostrada
- Logo y branding

### **Variables Disponibles**
La plantilla usa estas variables que se reemplazan automáticamente:
- `{{COMMIT_HASH}}` - Hash del commit (8 caracteres)
- `{{COMMIT_MESSAGE}}` - Mensaje del commit
- `{{AUTHOR_NAME}}` - Nombre del autor
- `{{AUTHOR_EMAIL}}` - Email del autor
- `{{COMMIT_DATE}}` - Fecha del commit
- `{{BRANCH_NAME}}` - Nombre de la rama
- `{{REPO_NAME}}` - Nombre del repositorio
- `{{FILES_CHANGED}}` - Número de archivos modificados
- `{{INSERTIONS}}` - Líneas añadidas
- `{{DELETIONS}}` - Líneas eliminadas

## 🔧 **Configuración Avanzada**

### **Cambiar Directorio de Salida**
Edita el script Python o el hook para cambiar donde se guardan los archivos:
```python
# En generate-commit-email.py
output_dir = Path(__file__).parent.parent / 'mi-directorio-personalizado'
```

### **Agregar Más Información**
Para mostrar información adicional, modifica el script Python:
```python
def get_git_info():
    # ... código existente ...
    
    # Agregar información personalizada
    git_info['custom_field'] = 'valor personalizado'
    
    return git_info
```

### **Integrar con Servicios de Email**
Para enviar los correos HTML por email real:
```bash
# Usar msmtp (recomendado)
echo "$HTML_CONTENT" | msmtp -a default destinatario@email.com

# O usar sendmail
echo "$HTML_CONTENT" | sendmail -t
```

## 📱 **Vista Previa**

### **Abrir en Navegador**
Los archivos HTML se abren automáticamente en tu navegador predeterminado.

### **Vista Móvil**
Los correos son completamente responsive y se ven perfectos en:
- 📱 Smartphones
- 📱 Tablets
- 💻 Laptops
- 🖥️ Desktops

## 🚨 **Solución de Problemas**

### **Hook no se ejecuta**
```bash
# Verificar permisos
ls -la .git/hooks/post-commit

# Hacer ejecutable
chmod +x .git/hooks/post-commit
```

### **Python no encontrado**
```bash
# Instalar Python 3
# Windows: Descargar de python.org
# macOS: brew install python3
# Linux: sudo apt install python3
```

### **Plantilla HTML no encontrada**
```bash
# Verificar que existe
ls -la .gitmessage.html

# Regenerar si es necesario
cp .gitmessage.html.example .gitmessage.html
```

## 🎉 **Ejemplos de Uso**

### **Commit Normal**
```bash
git add .
git commit -m "feat: agregar sistema de autenticación"
# Se genera: commit-emails/commit_a1b2c3d4_20250810_2300.html
```

### **Commit con Emoji**
```bash
git commit -m "🐛 fix: corregir bug en login"
# El emoji se mantiene en el HTML
```

### **Commit de Merge**
```bash
git merge feature/nueva-funcionalidad
# Se genera correo HTML del merge
```

## 🔮 **Futuras Mejoras**

- [ ] **Templates múltiples** para diferentes tipos de commits
- [ ] **Integración con Slack/Discord** para notificaciones
- [ ] **Dashboard web** para ver historial de commits
- [ ] **Personalización por rama** (diferentes estilos)
- [ ] **Exportación a PDF** para reportes
- [ ] **Integración con CI/CD** para commits automáticos

## 📞 **Soporte**

Si tienes problemas o sugerencias:
1. Revisar la documentación
2. Verificar permisos y configuración
3. Crear issue en el repositorio
4. Contactar al equipo de desarrollo

---

**¡Disfruta de tus correos HTML profesionales! 🎨✨**
