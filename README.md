# GitHub Page Test - Portafolio Profesional

## 📁 Estructura del Proyecto

Este proyecto ha sido reorganizado para una mejor gestión de archivos y mantenimiento:

### 🗂️ Directorios Principales

- **`/`** - Archivos de configuración y dependencias principales
- **`/public/`** - Archivos HTML estáticos y recursos públicos
- **`/src/`** - Código fuente de la aplicación
- **`/server/`** - Backend API con Express y Prisma
- **`/tests/` - Pruebas unitarias y E2E
- **`/config-files/`** - Archivos de configuración (copia de seguridad)
- **`/documentation/` - Documentación completa del proyecto
- **`/assets/`** - Reportes, análisis y archivos de datos
- **`/scripts/`** - Scripts de utilidad
- **`/docs/`** - Documentación adicional
- **`/archive/`** - Archivos históricos

### 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Ejecutar frontend en modo desarrollo
npm run dev:frontend

# Ejecutar backend API
npm run dev:api

# Ejecutar ambos (frontend + backend)
npm run dev

# Construir para producción
npm run build

# Ejecutar pruebas
npm run test
```

### 📋 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo completo
- `npm run dev:frontend` - Solo frontend con Vite
- `npm run dev:api` - Solo backend API
- `npm run build` - Construcción de producción
- `npm run test` - Ejecutar todas las pruebas
- `npm run test:unit` - Pruebas unitarias con Vitest
- `npm run test:e2e` - Pruebas E2E con Playwright
- `npm run lint` - Verificar código con ESLint
- `npm run format` - Formatear código con Prettier

### 🔧 Tecnologías

- **Frontend**: React 18 con Vite
- **Backend**: Express.js con Prisma y SQLite
- **Testing**: Vitest + Playwright
- **Linting**: ESLint + Prettier
- **CI/CD**: GitHub Actions
- **Containerización**: Docker

### 📚 Documentación Completa

Para información detallada, consulta la carpeta `/documentation/` que contiene:
- README completo del proyecto
- Reporte de mantenimiento y actualización
- Políticas de seguridad
- Guía de contribución
- Código de conducta

### 🌐 Acceso

- **GitHub Pages**: https://1inmortal.github.io/githubpagetest/
- **Repositorio**: https://github.com/1inmortal/githubpagetest

---

**Nota**: Los archivos HTML se han movido a `/public/` para mantener una estructura más organizada, pero las conexiones y funcionalidades se mantienen intactas.
