# Zona Gráfica - Landing Page React

Landing page completa para Zona Gráfica migrada a React puro con integración de backend, formulario de contacto funcional y diseño responsive moderno.

## 🚀 Características

- ✅ **React 18** - Componentes funcionales con hooks
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **PocketBase Integration** - Backend para contenido dinámico
- ✅ **Formulario de Contacto** - Envío POST funcional
- ✅ **Carruseles Swiper** - Navegación fluida
- ✅ **Glassmorphism** - Efectos visuales modernos
- ✅ **WhatsApp Integration** - Botones de contacto directo

## 📁 Estructura del Proyecto

```
public/webs/zonagrafica/
├── App.jsx              # Componente principal React
├── App.css              # Estilos CSS completos
├── index.html           # Página HTML principal
├── package.json         # Configuración del proyecto
└── README.md           # Documentación
```

## 🛠️ Tecnologías Utilizadas

- **React 18** (CDN) - Componentes funcionales con hooks
- **PocketBase** - Backend para contenido dinámico
- **Swiper.js** - Carruseles responsive
- **CSS3** - Animaciones y glassmorphism
- **Babel Standalone** - Compilación JSX en el navegador

## 🌐 Despliegue en GitHub Pages

1) Configurar base de Vite para Pages

```
// vite.config.js
export default defineConfig({
  base: '/githubpagetest/public/webs/zonagrafica/dist/',
  build: { outDir: 'dist', assetsDir: 'assets' }
});
```

2) Compilar y subir la build

```bash
cd public/webs/zonagrafica
npm run build
# forzar inclusión de dist (si .gitignore la omite)
git add -f dist
git commit -m "build: actualizar dist para Pages"
git push
```

3) Enlace público

- Abre: `https://1inmortal.github.io/githubpagetest/public/webs/zonagrafica/dist/`
- En `public/proyectos.html` enlaza a `webs/zonagrafica/dist/index.html`.

4) Evitar 404 de assets

- Usa rutas normalizadas para imágenes (helper `asset()` ya añadido en `App.jsx`).
- En CSS, usa rutas absolutas que incluyan el prefijo del repo para backgrounds.
- Siempre sube los archivos con hash generados en `dist/assets`.

## 🚀 Instalación y Uso

### Desarrollo con Vite (Recomendado)
```bash
cd public/webs/zonagrafica
npm install
npm run dev        # Abre http://localhost:3001
```

### Build y Preview
```bash
npm run build
npm run preview    # Preview en http://localhost:4173
```

## 🔐 CORS Backend (Formulario)

En producción (Pages), el backend debe permitir el origen `https://1inmortal.github.io` y responder el preflight:

```
Access-Control-Allow-Origin: https://1inmortal.github.io
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

Endpoint esperado: `POST https://inmortal-backend.onrender.com/contacto`.
Responde `OPTIONS /contacto` con 204 y los headers anteriores.

## 📱 Secciones de la Página

1. **Header** - Navegación fija con menú móvil
2. **Banner Carousel** - Productos destacados
3. **Servicios** - Grid dinámico desde PocketBase
4. **Trust Badges** - Elementos de confianza
5. **Testimonios** - Carrusel de clientes
6. **Ubicación** - Información de contacto
7. **Formulario de Contacto** - Envío funcional
8. **Footer** - Enlaces y contacto

## 🔧 Configuración del Backend

### PocketBase
- **URL**: `https://zonagraficapd.ezhostingit.com`
- **Colecciones**: `categorias`, `productos`, `articulos`, `promociones`

### API Endpoint (Formulario)
- Backend Render: define `window.BACKEND_URL` en `index.html`.
- Endpoint efectivo: `POST ${BACKEND_URL}/contacto`
- Formato: `application/json` con payload:
  - `nombre`, `email`, `telefono`, `proyecto` (mapeado desde `servicio`), `mensaje`

Ejemplo en `App.jsx` (handleSubmit):
```javascript
const backendBase = window.BACKEND_URL;
const url = `${backendBase}/contacto`;
const payload = { nombre, email, telefono, proyecto: servicio || 'General', mensaje };
await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
```

Notas:
- El frontend SOLO hace POST al backend. El envío de correo se maneja en el servidor.
- Asegura que el backend responda preflight (OPTIONS) y devuelva `Access-Control-Allow-Origin` para tu origen (GitHub Pages/local dev).

## 📊 Responsive Breakpoints

- **Desktop**: > 1200px
- **Tablet**: 768px - 1200px
- **Mobile**: < 768px
- **Small Mobile**: < 480px
- **Extra Small**: < 360px

## 🎨 Características del Diseño

- **Mobile-First** - Diseño optimizado para móviles
- **Glassmorphism** - Efectos de cristal modernos
- **Animaciones Suaves** - Transiciones fluidas
- **Gradientes Dinámicos** - Fondos atractivos
- **Tipografía Moderna** - Poppins e Inter fonts

## 🔌 Integraciones

### WhatsApp
- Botón flotante de contacto
- Enlaces directos con mensajes predefinidos
- Número: `+52 899 873 7313`

### Formulario de Contacto
- Validación de campos requeridos
- Estados de carga y mensajes de error/éxito
- Envío asíncrono al backend (Render) y lógica de email en el servidor

### PocketBase (Frontend con ESM)
- npm (instalado): `npm i pocketbase`
- Import en código:
```javascript
import PocketBase from 'pocketbase';
const pb = new PocketBase('https://zonagraficapd.ezhostingit.com');
// await pb.collection('correos').create({ email, mensaje });
```

Importante: actualmente el insert lo hace el backend a partir del POST; si se habilita el insert directo desde frontend, coordinar con backend para reglas/seguridad.

### Logos y Favicon desde PocketBase
- Cabecera (`Header`):
```jsx
<img className="logo-img" src="https://zonagraficapd.ezhostingit.com/api/files/logos/2l093oa950g2vl2/cabecera_awhf16wd05.jpeg" alt="Zona Gráfica" />
```
- Pie de página (`Footer`):
```jsx
<img className="footer-logo" src="https://zonagraficapd.ezhostingit.com/api/files/logos/p837754ujpv1f8k/pie_de_pagina_a49ixaoy6p.jpeg" alt="Zona Gráfica – Hacemos posible tus ideas" />
```
- Favicon (`index.html`):
```html
<link rel="icon" type="image/jpeg" href="https://zonagraficapd.ezhostingit.com/api/files/logos/op1tyvbq8odcpc5/pestana_d0p7y3v446.jpg">
```

## 📝 Estructura de Componentes

```jsx
App
├── Header
├── BannerCarousel
├── ServiciosGrid
├── TrustBadges
├── TestimonialsSection
├── LocationSection
├── ContactForm
└── Footer
```

## 🚀 Funcionalidades Principales

### Servicios Dinámicos
- Carga desde PocketBase con fallback
- Grid responsive para desktop
- Carrusel Swiper para móviles
- Modal de detalles del servicio

### Formulario de Contacto
- Campos: nombre, email, teléfono, servicio, mensaje
- Validación en tiempo real
- Estados de carga con spinner
- Mensajes de éxito y error

### Testimonios
- Carrusel manual con controles
- Responsive: 3 columnas desktop, 1 móvil
- Navegación con flechas prev/next

## 🔧 Personalización

### Colores
```css
:root {
  --bg: #ffffff;
  --card: #ffffff;
  --muted: #4b5563;
  --text: #0b0b10;
  --cyan: #00bcd4;
  --magenta: #e11d48;
  --brand: #25D366;
  --blue: #1E40AF;
}
```

### Configuración PocketBase
```javascript
const POCKETBASE_URL = 'https://zonagraficapd.ezhostingit.com';
const WHATSAPP_PHONE = '528998737313';
```

## 📱 Compatibilidad

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+
- **Mobile Browsers** iOS Safari 14+, Chrome Mobile 90+

## 🐛 Solución de Problemas

### Error de CORS
- Asegura que el backend (Render) responda al preflight `OPTIONS /contacto` con:
  - `Access-Control-Allow-Origin: *` (o tu dominio)
  - `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`
  - `Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization`
- Prueba `GET ${BACKEND_URL}/test-db` para verificar disponibilidad del servicio.

### 404 de assets
- Verifica rutas con espacios URL-encoded (`web%205`).
- Caso corregido: `imprenta.png` ahora apunta a `img/web%205/iconos/imprenta.png`.

### Swiper no funciona
- Verificar que Swiper.js esté cargado
- Comprobar inicialización en useEffect

### PocketBase no conecta
- Verificar URL del backend
- Comprobar colecciones disponibles
- Revisar fallbacks en el código

## 📄 Licencia

MIT License - Ver archivo LICENSE para más detalles.

## 👥 Soporte

Para soporte técnico o consultas:
- **Email**: zgrafica.mx@gmail.com
- **WhatsApp**: +52 899 873 7313
- **Sitio Web**: [Zona Gráfica](https://zonagraficapd.ezhostingit.com)

---

**Desarrollado con ❤️ para Zona Gráfica**
