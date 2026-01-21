# 🚀 Guía de Despliegue - Portafolio de Certificaciones React

## ✅ Configuración Completada

Todo está listo para publicar tu proyecto React en GitHub Pages. Aquí está lo que se ha configurado:

### 📝 Archivos Actualizados

1. **`vite.config.js`** - Configurado para:
   - Base path: `/githubpagetest/`
   - Multi-page build (index.html + react.html)
   - Optimización de chunks (vendor, icons)
   - Sourcemaps habilitados

2. **`.github/workflows/ci.yml`** - Pipeline CI/CD que:
   - Compila automáticamente el proyecto React con Vite
   - Ejecuta tests (opcional)
   - Despliega a GitHub Pages automáticamente en push a `main`

3. **`.nojekyll`** - Archivo necesario para GitHub Pages

### 🎯 URLs Finales

Después del despliegue, tu proyecto estará disponible en:

- **Página principal**: `https://1inmortal.github.io/githubpagetest/`
- **Certificados React**: `https://1inmortal.github.io/githubpagetest/pruebas/certificados/react.html`
- **Certificados HTML**: `https://1inmortal.github.io/githubpagetest/pruebas/certificados/index.html`

## 🚀 Cómo Publicar

### Opción 1: Automático (Recomendado)

```bash
# 1. Hacer commit de tus cambios
git add .
git commit -m "feat: Configurar deploy de React a GitHub Pages"

# 2. Push a la rama main
git push origin main

# 3. ¡Espera 2-3 minutos!
# GitHub Actions compilará y publicará automáticamente
```

### Opción 2: Manual (Build local)

```bash
# 1. Compilar proyecto localmente
npm run build

# 2. Ver el resultado en dist/
# Los archivos en dist/ son los que se publicarán

# 3. Hacer commit y push
git add .
git commit -m "feat: Build de producción"
git push origin main
```

## 🔍 Verificar el Despliegue

1. Ve a tu repositorio: `https://github.com/1inmortal/githubpagetest`
2. Click en la pestaña **Actions**
3. Verás el workflow "CI/CD Pipeline" ejecutándose
4. Espera a que termine (ícono verde ✅)
5. Ve a **Settings** → **Pages** para ver la URL publicada

## 📦 Estructura del Build

```
dist/
├── index.html                    # Página principal compilada
├── pruebas/
│   └── certificados/
│       └── react.html           # React app compilada
├── assets/
│   ├── certificates-*.css       # Estilos compilados
│   ├── certificates-*.js        # React app bundle
│   ├── vendor-*.js             # React + React DOM
│   └── icons-*.js              # Lucide icons
└── public/                      # Archivos públicos copiados
```

## ⚙️ Características del Build

- ✅ **React 19** con Vite 7
- ✅ **Code splitting** automático
- ✅ **Tree shaking** para optimizar tamaño
- ✅ **Sourcemaps** para debugging
- ✅ **Minificación** de CSS y JS
- ✅ **Multi-idioma** (ES/EN) funcionando
- ✅ **Responsive** para móviles y desktop

## 🐛 Solución de Problemas

### El sitio no se actualiza
```bash
# Limpia la caché del build
rm -rf dist/
npm run build
git add .
git commit -m "chore: Rebuild para GitHub Pages"
git push
```

### Error en el workflow
1. Ve a la pestaña **Actions**
2. Click en el workflow fallido
3. Revisa los logs para ver el error
4. Corrige y vuelve a hacer push

### Los assets no cargan
- Verifica que `base: '/githubpagetest/'` esté en `vite.config.js`
- Asegúrate de que los paths sean relativos o absolutos correctamente

## 🎨 Próximos Pasos

1. **Personaliza el contenido**:
   - Actualiza `react.jsx` con tus datos
   - Agrega más certificados en `CERTIFICATES_DATA`

2. **Mejora el SEO**:
   - Agrega meta tags en `react.html`
   - Crea un `sitemap.xml`

3. **Optimiza rendimiento**:
   - Implementa lazy loading de imágenes
   - Usa dynamic imports para rutas

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en GitHub Actions
2. Verifica la consola del navegador
3. Asegúrate de que todas las dependencias están instaladas

---

**¡Listo para desplegar! 🚀**

Haz commit y push, y en 2-3 minutos tu sitio estará en vivo.
