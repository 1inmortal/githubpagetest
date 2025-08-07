# 📁 Código Fuente (src/)

Esta carpeta contiene todo el código fuente del proyecto organizado de manera modular.

## 📂 Estructura

```
src/
├── pages/           # Páginas HTML principales
├── components/      # Componentes reutilizables
├── assets/         # Recursos estáticos (CSS, JS, imágenes, media)
├── data/           # Datos JSON y archivos de configuración
└── pdf/            # Documentos PDF
```

## 🚀 Páginas Principales

- `pages/index.html` - Página principal del portafolio
- `pages/terms.html` - Términos y condiciones
- `pages/privacy-policy.html` - Política de privacidad
- `pages/verificación.html` - Página de verificación

## 🧩 Componentes

- `components/Blog/` - Componentes del blog
- `components/Certificados/` - Componentes de certificados
- `components/evidencias/` - Componentes de evidencias
- `components/react-ui-login/` - Componente de login en React

## 🎨 Assets

- `assets/css/` - Hojas de estilo
- `assets/js/` - Scripts JavaScript
- `assets/images/` - Imágenes del proyecto
- `assets/media/` - Archivos multimedia (audio, video)
- `assets/svg/` - Iconos SVG

## 📊 Datos

- `data/certificaciones.json` - Datos de certificaciones
- `data/skills.json` - Habilidades técnicas
- `data/proyectos.json` - Información de proyectos
- `data/testimonios.json` - Testimonios de clientes

## 🔧 Desarrollo

Para trabajar en esta carpeta:

1. **Páginas HTML**: Editar directamente en `pages/`
2. **Componentes**: Crear nuevos en `components/`
3. **Estilos**: Modificar archivos en `assets/css/`
4. **Scripts**: Actualizar archivos en `assets/js/`
5. **Datos**: Editar archivos JSON en `data/`

## 📝 Convenciones

- **Nombres de archivos**: kebab-case (ej: `mi-archivo.html`)
- **Carpetas**: snake_case (ej: `mi_carpeta/`)
- **Componentes**: PascalCase (ej: `MiComponente/`)
- **CSS/JS**: camelCase (ej: `miArchivo.js`)

## 🔗 Referencias

- Las páginas en `pages/` deben referenciar assets como `../assets/`
- Los componentes deben usar rutas relativas apropiadas
- Los datos JSON se cargan dinámicamente desde `data/`
