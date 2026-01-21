# 🚀 Instrucciones para Ejecutar Zona Gráfica React

## ✅ Estado Actual
- ✅ **npm inicializado** correctamente
- ✅ **Dependencias instaladas** (Vite, React, Swiper, PocketBase)
- ✅ **Configuración Vite** lista

## 🌐 Acceso al Proyecto

### Servidor Vite (Recomendado)
```bash
npm install
npm run dev
# Acceso: http://localhost:3001
```

### Live Server (Alternativo, solo si no usas imports npm)
```bash
npm run dev:live
```

### Servidor Estático
```bash
npm run serve
# Accede a: http://localhost:5000
```

### Despliegue en GitHub Pages

```bash
cd public/webs/zonagrafica
npm run build
git add -f dist              # forzar inclusión si está en .gitignore
git commit -m "build: dist para Pages"
git push
```

- URL: `https://1inmortal.github.io/githubpagetest/public/webs/zonagrafica/dist/`
- Asegúrate de enlazar a `dist/index.html` desde `public/proyectos.html`.

Si ves 404 de `index-*.js` o `index-*.css`, sube los archivos con hash actuales en `dist/assets/`.

## 📁 Archivos del Proyecto

```
public/webs/zonagrafica/
├── App.jsx              # ✅ Componente principal React
├── App.css              # ✅ Estilos CSS completos
├── main.jsx             # ✅ Punto de entrada
├── index.html           # ✅ Página HTML principal
├── vite.config.js       # ✅ Configuración Vite
├── package.json         # ✅ Dependencias configuradas
└── node_modules/        # ✅ Dependencias instaladas
```

## 🔧 Comandos Disponibles

```bash
# Desarrollo
npm run dev              # Servidor Vite (puerto 3001)
npm run dev:live         # Live Server (puerto 3001)

# Producción
npm run build            # Construir para producción
npm run preview          # Vista previa de producción

# Servidor estático
npm run serve            # Servidor estático simple
```

## 🌟 Características del Proyecto

- ✅ **React 18** con hooks modernos
- ✅ **Vite** para desarrollo rápido (JSX + módulos ESM)
- ✅ **Swiper.js** para carruseles
- ✅ **Responsive Design** completo
- ✅ **Formulario de Contacto** funcional
- ✅ **Integración PocketBase** para contenido dinámico
- ✅ **WhatsApp Integration** para contacto directo

## 🚨 Solución de Problemas

### Si el servidor no inicia:
```bash
# Detener procesos en puerto 3001
npx kill-port 3001

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# Iniciar servidor
npm run dev
```

### Si hay errores de CORS (formulario contacto):
- Backend (Render) debe permitir el origen `https://1inmortal.github.io` y responder `OPTIONS /contacto` con:
  - `Access-Control-Allow-Origin: https://1inmortal.github.io`
  - `Access-Control-Allow-Methods: GET, POST, OPTIONS`
  - `Access-Control-Allow-Headers: Content-Type, Authorization`

### Si hay errores de módulos:
```bash
# Limpiar caché de Vite
rm -rf .vite
npm run dev
```

## 📱 URLs de Acceso

- **Desarrollo**: http://localhost:3001
- **Preview producción**: http://localhost:4173 (después de `npm run build`)

## 🎯 Próximos Pasos

1. **Abrir navegador** en http://localhost:3001
2. **Verificar funcionalidades**:
   - Navegación responsive
   - Carrusel de banners
   - Grid de servicios
   - Formulario de contacto
   - Testimonios
3. **Personalizar contenido** según necesidades
4. **Desplegar** cuando esté listo (usa `npm run build`)

---

**¡El proyecto está listo para usar! 🎉**
