# Portfolio de Certificaciones - React App

Aplicación React moderna para mostrar certificaciones profesionales con una interfaz elegante y profesional.

## 🚀 Características

- ✨ Interfaz moderna con Tailwind CSS
- 🎨 Diseño responsivo y oscuro premium
- 🔍 Búsqueda y filtrado de certificaciones
- 📱 Totalmente responsive
- 🎯 Modal de detalles interactivo
- ⚡ Construido con Vite para máxima velocidad

## 📦 Instalación

```bash
npm install
```

## 🛠️ Scripts Disponibles

### Desarrollo
```bash
npm run dev
```
Inicia el servidor de desarrollo en `http://localhost:5173`

### Build de Producción
```bash
npm run build
```
Genera los archivos optimizados en la carpeta `dist/`

### Vista Previa del Build
```bash
npm run preview
```
Previsualiza la versión de producción localmente

## 📁 Estructura del Proyecto

```
certificates-app/
├── src/
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Punto de entrada
│   └── index.css        # Estilos globales + Tailwind
├── public/              # Archivos estáticos
├── index.html           # HTML principal
├── vite.config.js       # Configuración de Vite
├── tailwind.config.js   # Configuración de Tailwind
└── package.json         # Dependencias y scripts
```

## 🎨 Tecnologías

- **React 18** - Biblioteca UI
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Framework de estilos
- **Lucide React** - Iconos modernos

## 📝 Personalización

Puedes personalizar los datos de certificaciones editando el array `CERTIFICATES_DATA` en `src/App.jsx`.

## 🌐 Despliegue

Los archivos de producción se generan en `dist/` y pueden ser desplegados en:
- GitHub Pages
- Vercel
- Netlify
- Cualquier servidor de archivos estáticos

## 📄 Licencia

MIT
