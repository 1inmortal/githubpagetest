# Solución: Video no se carga en GitHub Pages

## Problema

El video `captura.mp4` (60MB) no se carga en GitHub Pages, mostrando error 404 en todas las rutas probadas.

## Causa

**GitHub Pages puede tener problemas sirviendo archivos grandes (>50MB)**, incluso si están dentro del límite de 100MB de Git. Esto es especialmente común con archivos de video.

## Solución Recomendada: Git LFS

Git LFS (Large File Storage) es la solución oficial de GitHub para archivos grandes.

### Paso 1: Instalar Git LFS

**Windows:**
```powershell
# Con Chocolatey
choco install git-lfs

# O descarga el instalador desde:
# https://git-lfs.github.com/
```

**macOS:**
```bash
brew install git-lfs
```

**Linux:**
```bash
sudo apt install git-lfs
```

### Paso 2: Configurar Git LFS (Automático)

Ejecuta el script proporcionado:

```powershell
.\scripts\setup-git-lfs-video.ps1
```

### Paso 2: Configurar Git LFS (Manual)

```bash
# 1. Inicializar Git LFS
git lfs install

# 2. Configurar tracking para archivos MP4
git lfs track "*.mp4"

# 3. Añadir .gitattributes al repositorio
git add .gitattributes

# 4. Si el archivo ya está en Git, migrarlo a LFS
git lfs migrate import --include="*.mp4" --everything

# 5. Añadir el archivo de video
git add public/gsap/PR/mp4/captura.mp4

# 6. Commit
git commit -m "Configurar Git LFS para video captura.mp4"

# 7. Push (puede requerir --force si migraste)
git push origin main
```

### Paso 3: Verificar

1. Espera 5-10 minutos para que GitHub Pages se actualice
2. Verifica que el archivo está en LFS:
   ```
   https://github.com/1inmortal/githubpagetest/tree/main/public/gsap/PR/mp4
   ```
   Deberías ver un indicador de que el archivo está en LFS.

3. Prueba la URL:
   ```
   https://1inmortal.github.io/githubpagetest/public/gsap/PR/mp4/captura.mp4
   ```

## Solución Alternativa: CDN Externo

Si Git LFS no funciona o prefieres otra solución:

### Opción 1: Cloudinary (Recomendado - Gratis hasta 25GB)

1. Crea cuenta en [Cloudinary](https://cloudinary.com/)
2. Sube el video a Cloudinary
3. Obtén la URL pública del video
4. Actualiza `panel.html` línea ~1755:

```javascript
// Reemplaza la lógica de carga con:
video.src = 'https://res.cloudinary.com/tu-cuenta/video/upload/captura.mp4';
```

### Opción 2: GitHub Releases

1. Crea un nuevo Release en GitHub
2. Sube `captura.mp4` como asset del release
3. Usa la URL del asset en tu código:

```javascript
video.src = 'https://github.com/1inmortal/githubpagetest/releases/download/v1.0/captura.mp4';
```

### Opción 3: AWS S3 + CloudFront

1. Sube el video a S3
2. Configura CloudFront para CDN
3. Usa la URL de CloudFront

## Verificación del Problema

Para verificar si el problema es específico de GitHub Pages:

1. **Verifica que el archivo está en GitHub:**
   ```
   https://github.com/1inmortal/githubpagetest/tree/main/public/gsap/PR/mp4
   ```

2. **Intenta acceder directamente:**
   ```
   https://1inmortal.github.io/githubpagetest/public/gsap/PR/mp4/captura.mp4
   ```

3. **Revisa los logs de la consola:**
   - Abre DevTools (F12)
   - Ve a la pestaña Network
   - Intenta cargar el video
   - Revisa el código de estado HTTP

## Notas Importantes

- **GitHub Pages puede tardar 5-10 minutos** en actualizarse después de un push
- **Archivos >50MB** pueden tener problemas sin Git LFS
- **Git LFS tiene un límite de 1GB** en el plan gratuito de GitHub
- **Los archivos en LFS** se descargan bajo demanda, no se clonan automáticamente

## Contacto

Si el problema persiste después de seguir estos pasos, verifica:
- Los logs de la consola del navegador (F12)
- La pestaña Network en DevTools
- Que GitHub Pages esté habilitado en la configuración del repositorio

