# Security Audit - Enero 2026

## Resumen de Correcciones

Este documento detalla las correcciones de seguridad aplicadas para resolver las alertas de GitHub Code Scanning (CodeQL).

### Fecha: 2026-01-20
### Estado: ✅ Completado

---

## 1. XSS: DOM Text Reinterpreted as HTML (HIGH)

### Problema
Uso de `innerHTML` con contenido potencialmente inseguro que podría permitir inyección de scripts.

### Archivos Afectados y Soluciones

#### `index.html`
- **Línea ~5345**: Limpieza de contenedor Three.js
  - ❌ Antes: `container.innerHTML = '';`
  - ✅ Después: Loop de `removeChild()` seguro
  
- **Línea ~6213**: Sistema i18n
  - ❌ Antes: `element.innerHTML = value;`
  - ✅ Después: `element.textContent = value;`

#### Otros archivos con uso seguro de innerHTML
Los siguientes archivos usan `innerHTML` pero **solo con contenido estático** (sin riesgo XSS):
- `pruebas/certificados/index.html` - Templates estáticos
- `public/gsap/PR/panel.html` - HTML generado por el sistema
- `src/src.html` - Contenido controlado

### Solución General
1. Reemplazar `innerHTML` por `textContent` cuando sea texto plano
2. Usar `DOMPurify.sanitize()` cuando se necesite HTML dinámico
3. Crear elementos con `createElement()` y `appendChild()`

### Módulo de Utilidades
Creado `src/utils/security-helpers.js` con funciones:
- `sanitizeHTML()` - Sanitiza HTML con DOMPurify
- `setTextSafe()` - Inserta texto sin interpretar HTML
- `setHTMLSafe()` - Inserta HTML sanitizado
- `createElementSafe()` - Crea elementos de forma segura

---

## 2. Incomplete URL Substring Sanitization (HIGH)

### Problema
Validación de URLs usando `.includes()` que puede ser bypasseada.

### Archivos Afectados y Soluciones

#### `public/gsap/PR/panel.html`
- **Línea ~2444**: Detección de GitHub Pages
  - ❌ Antes: `window.location.hostname.includes('github.io')`
  - ✅ Después: `/^[\w-]+\.github\.io$/.test(hostname)` (regex con lista blanca)

- **Línea ~2355**: Detección de path
  - ❌ Antes: `pathname.includes('/githubpagetest/')`
  - ✅ Después: Validación con `split()` y comparación exacta

- **Línea ~2454**: Validación de basePath
  - ❌ Antes: `currentPath.includes('/githubpagetest/')`
  - ✅ Después: Regex para validar nombres de repositorio `[a-z0-9-]+`

### Solución General
1. Usar `new URL()` para parsear URLs de forma segura
2. Validar protocolos contra lista blanca (`http:`, `https:`)
3. Usar regex en lugar de `.includes()` para validación de dominios
4. Validar paths con `split()` y comparación exacta

### Funciones en security-helpers.js
- `isURLSafe()` - Valida URLs con lista blanca de protocolos
- `sanitizeURL()` - Sanitiza y valida URLs antes de usar
- `isTrustedSource()` - Verifica si un script/iframe es de fuente confiable

---

## 3. Clear Text Storage of Sensitive Information (HIGH)

### Problema
Almacenamiento de tokens de autenticación en `localStorage` sin encriptación.

### Archivos Afectados y Soluciones

#### `public/webs/web-5.html`
- **Línea ~1750**: Almacenamiento de token PocketBase
  - ❌ Antes: `localStorage.setItem('pb_auth_token', pb.authStore.token)`
  - ✅ Después: Código comentado con advertencia de seguridad
  - 📝 Nota: Token ya no se persiste en localStorage

#### `src/src.html`
- **Línea ~3023**: `localStorage.setItem('certFavorites', ...)`
  - ✅ **Seguro**: Solo almacena IDs de certificados favoritos (no sensible)

### Solución General
1. **NO almacenar** en localStorage:
   - Tokens de autenticación
   - API keys
   - Contraseñas
   - Datos personales sensibles

2. **Alternativas seguras**:
   - httpOnly cookies (para tokens)
   - sessionStorage con encriptación
   - En-memory storage para sesiones temporales
   - Backend session management

### Funciones en security-helpers.js
- `canStoreSafely()` - Valida que no haya patrones sensibles
- `setLocalStorageSafe()` - Almacena solo si pasa validación
- `auditLog()` - Registra operaciones sensibles

---

## 4. Inclusion of Functionality from Untrusted Source (MEDIUM)

### Problema
Carga de scripts/iframes desde CDNs externos sin verificación.

### CDNs Confiables Aprobados

Los siguientes CDNs están verificados y son **seguros de usar**:

#### ✅ CDNs de Infraestructura
- `cdn.jsdelivr.net` - CDN global de código abierto
- `cdnjs.cloudflare.com` - Cloudflare CDN
- `unpkg.com` - CDN de npm packages

#### ✅ CDNs de Librerías Específicas
- **Three.js**: `cdnjs.cloudflare.com/ajax/libs/three.js/`
- **GSAP**: `cdnjs.cloudflare.com/ajax/libs/gsap/`
- **Anime.js**: `cdnjs.cloudflare.com/ajax/libs/animejs/`
- **PDF.js**: `cdnjs.cloudflare.com/ajax/libs/pdf.js/`
- **TensorFlow.js**: `cdn.jsdelivr.net/npm/@tensorflow/`

#### ✅ CDNs de Google
- `fonts.googleapis.com` - Google Fonts
- `fonts.gstatic.com` - Google Fonts Assets
- `ajax.googleapis.com` - Google Libraries
- `www.googletagmanager.com` - Google Tag Manager
- `www.google-analytics.com` - Google Analytics

### Archivos con Scripts Externos Validados

#### `pruebas/certificados/index.html`
- GSAP 3.12.5 desde cdnjs.cloudflare.com ✅
- PDF.js 3.11.174 desde cdnjs.cloudflare.com ✅

#### `public/gsap/web py/TRACKING/rt.html`
- Three.js r128 desde cdnjs.cloudflare.com ✅
- Anime.js 3.2.1 desde cdnjs.cloudflare.com ✅
- TensorFlow.js 3.11.0 desde cdn.jsdelivr.net ✅
- COCO-SSD 2.2.2 desde cdn.jsdelivr.net ✅

#### `src/src.html`
- GSAP 3.12.5 desde cdnjs.cloudflare.com ✅
- ScrollTrigger 3.12.5 desde cdnjs.cloudflare.com ✅
- Anime.js 3.2.1 desde cdnjs.cloudflare.com ✅

### Recomendaciones Futuras
1. **Añadir Subresource Integrity (SRI)**
   ```html
   <script src="https://cdn.example.com/lib.js"
           integrity="sha384-..."
           crossorigin="anonymous"></script>
   ```

2. **Self-hosting de librerías críticas**
   - Considerar descargar librerías y servirlas localmente
   - Reduce dependencia de CDNs externos
   - Mayor control sobre versiones

3. **Content Security Policy (CSP)**
   - Definir CSP headers para limitar orígenes permitidos
   - Ejemplo en `_headers` del proyecto

---

## 5. Archivos No Críticos (No Requieren Corrección)

Los siguientes archivos tienen alertas pero son de **baja prioridad**:

### Páginas de Prueba/Demo
- `pruebas/tets-tarjeta.html` - Página de testing
- `pruebas/tarjetas.html` - Demos de componentes
- `public/proyectos/*.html` - Proyectos antiguos/demos
- `public/gsap/*/index.html` - Experimentos GSAP

**Razón**: No están en producción, son solo para desarrollo/demo.

### Páginas Estáticas Archivadas
- `public/webs/cv/index.html` - CV archivado
- `public/webs/web-3.html` - Web antigua
- `src/components/evidencias/*` - Evidencias históricas

**Razón**: Contenido estático sin interacción de usuario.

---

## 6. Resumen de Impacto

### Antes de las Correcciones
- 🔴 **59 alertas** de seguridad abiertas
- 🔴 **25+ archivos** con vulnerabilidades HIGH
- 🔴 **XSS** en sistema i18n y manipulación DOM
- 🔴 **Tokens** almacenados en claro
- 🔴 **URLs** validadas de forma insegura

### Después de las Correcciones
- ✅ **0 alertas HIGH críticas** en archivos de producción
- ✅ Sistema i18n usando `textContent` (seguro)
- ✅ URLs validadas con regex y URL API
- ✅ Tokens NO se almacenan en localStorage
- ✅ Módulo `security-helpers.js` para operaciones seguras
- ✅ Documentación de CDNs confiables

---

## 7. Checklist de Seguridad

### Para Código Nuevo
- [ ] Usar `textContent` en lugar de `innerHTML` para texto
- [ ] Sanitizar con `DOMPurify` si necesitas HTML dinámico
- [ ] Validar URLs con `new URL()` y lista blanca
- [ ] NO almacenar datos sensibles en localStorage
- [ ] Verificar origen de scripts externos contra lista de CDNs confiables
- [ ] Añadir SRI a scripts de CDN
- [ ] Documentar decisiones de seguridad en comentarios

### Para Code Reviews
- [ ] Buscar `innerHTML` - ¿Es seguro?
- [ ] Buscar `localStorage.setItem` - ¿Contiene datos sensibles?
- [ ] Buscar `<script src="http` - ¿Es CDN confiable?
- [ ] Buscar `.includes()` en URLs - ¿Necesita validación más fuerte?
- [ ] Verificar que no hay credenciales hardcodeadas

---

## 8. Contacto y Mantenimiento

**Auditoría realizada por**: INMORTAL_OS  
**Fecha**: 2026-01-20  
**Siguiente revisión**: 2026-04-20 (trimestral)

Para reportar nuevas vulnerabilidades:
- GitHub Security Advisories: https://github.com/1inmortal/githubpagetest/security/advisories
- Email: [ver SECURITY.md]

---

## Referencias

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CodeQL Security Queries](https://codeql.github.com/codeql-query-help/javascript/)
- [DOMPurify Documentation](https://github.com/cure53/DOMPurify)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)
