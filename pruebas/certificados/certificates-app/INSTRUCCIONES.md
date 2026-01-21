# 📋 Instrucciones de Uso - Portfolio de Certificaciones

## ✅ Build Completado

El build de producción se ha generado exitosamente en la carpeta `dist/`.

### 📁 Archivos Generados

```
dist/
├── index.html (0.60 kB - gzip: 0.36 kB)
└── assets/
    ├── index-CA1exxCI.css (25.01 kB - gzip: 5.18 kB)
    └── index-ltpK41nF.js (169.18 kB - gzip: 53.16 kB)
```

**Tamaño Total Optimizado:** ~194 kB (~58 kB comprimido)

---

## 🚀 Opciones de Despliegue

### Opción 1: GitHub Pages

1. Copia todos los archivos de `dist/` a la raíz de tu repositorio o a una carpeta específica
2. Ve a Settings > Pages en tu repositorio de GitHub
3. Selecciona la rama y carpeta donde copiaste los archivos
4. Guarda los cambios y espera el despliegue

### Opción 2: Netlify

1. Ve a [netlify.com](https://netlify.com)
2. Arrastra la carpeta `dist/` a la página de Netlify
3. Tu sitio estará en línea en segundos

### Opción 3: Vercel

```bash
npm install -g vercel
cd dist
vercel
```

### Opción 4: Servidor Local (Prueba)

```bash
# En la raíz del proyecto (no en dist)
npm run preview
```

Abre http://localhost:4173 en tu navegador

---

## 🛠️ Comandos Útiles

### Desarrollo
```bash
npm run dev
```
Servidor de desarrollo en http://localhost:5173 con hot reload

### Build
```bash
npm run build
```
Genera una nueva versión optimizada en `dist/`

### Preview
```bash
npm run preview
```
Previsualiza el build de producción localmente

---

## 🎨 Personalización

Para modificar el contenido de las certificaciones:

1. Abre `src/App.jsx`
2. Busca el array `CERTIFICATES_DATA` (línea ~31)
3. Modifica, agrega o elimina certificaciones
4. Ejecuta `npm run build` para regenerar el build

### Ejemplo de Certificación:

```javascript
{
  id: 'c7',
  title: 'Tu Certificación',
  provider: 'GOOGLE', // GOOGLE, MICROSOFT, IBM, AWS
  issueDate: '2024-01-15',
  expirationDate: '2026-01-15', // Opcional
  credentialId: 'TU-CRED-ID',
  verificationUrl: 'https://verify.example.com',
  skills: ['Skill 1', 'Skill 2', 'Skill 3'],
  level: 'Expert', // Expert, Professional, Associate, etc.
  area: 'Cloud', // Cloud, AI, Data, Security, DevOps
  featured: true, // true o false
  description: 'Descripción detallada de la certificación...'
}
```

---

## 📱 Características Implementadas

✅ Diseño responsivo (móvil, tablet, desktop)
✅ Tema oscuro premium
✅ Búsqueda en tiempo real
✅ Filtrado por proveedor
✅ Modal de detalles interactivo
✅ Animaciones suaves
✅ Optimización de rendimiento
✅ SEO básico configurado

---

## 🔧 Tecnologías Utilizadas

- React 18.2.0
- Vite 5.0.8
- Tailwind CSS 3.3.6
- Lucide React 0.294.0
- PostCSS + Autoprefixer

---

## 📊 Optimizaciones Aplicadas

- ✅ Minificación con esbuild
- ✅ Tree shaking automático
- ✅ Code splitting
- ✅ CSS optimizado
- ✅ Compresión gzip
- ✅ Sin source maps en producción

---

## 🐛 Solución de Problemas

### El sitio no carga correctamente
- Verifica que todos los archivos de `dist/` estén presentes
- Comprueba las rutas en el servidor (debe usar rutas relativas)

### Los estilos no se aplican
- Asegúrate de que el archivo CSS esté en `dist/assets/`
- Verifica que el navegador no tenga cache antiguo (Ctrl+F5)

### Errores al hacer build
```bash
# Limpia node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📞 Soporte

Si tienes problemas, verifica:
1. Node.js versión 16 o superior: `node --version`
2. npm versión 7 o superior: `npm --version`
3. Todos los archivos en `dist/` están presentes

---

## 📄 Licencia

MIT - Puedes usar y modificar libremente este proyecto.

**¡Tu portfolio está listo para ser desplegado! 🎉**
