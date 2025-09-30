# Archivos de Video - GSAP

## 📹 Archivo de Video Original

**vigilancia.mp4** - Archivo de video original (119.67 MB)

⚠️ **IMPORTANTE**: Este archivo excede el límite de 100 MB de GitHub y fue removido temporalmente.

## 🔧 Optimización Requerida

Para restaurar el video, necesitas optimizarlo usando una de estas opciones:

### Opción 1: Usando FFmpeg (Recomendado)
```bash
# Instalar FFmpeg primero
# Luego optimizar el video:
ffmpeg -i vigilancia.mp4 -c:v libx264 -crf 28 -c:a aac -b:a 128k vigilancia_optimized.mp4
```

### Opción 2: Usando herramientas online
- [HandBrake](https://handbrake.fr/) - Software gratuito
- [CloudConvert](https://cloudconvert.com/) - Herramienta online
- [Compressor.io](https://compressor.io/) - Optimizador online

### Opción 3: Usando PowerShell (Windows)
```powershell
# Si tienes FFmpeg instalado
ffmpeg -i vigilancia.mp4 -c:v libx264 -crf 30 -preset fast -c:a aac -b:a 96k vigilancia_optimized.mp4
```

## 📋 Especificaciones Recomendadas

- **Tamaño máximo**: < 50 MB (para GitHub Pages)
- **Formato**: MP4 (H.264)
- **Resolución**: 1920x1080 o menor
- **Bitrate de video**: 1-2 Mbps
- **Bitrate de audio**: 96-128 kbps
- **Duración**: Mantener la duración original

## 🚀 Después de Optimizar

1. Renombra el archivo optimizado a `vigilancia.mp4`
2. Colócalo en esta carpeta: `public/gsap/mp4/`
3. Haz commit y push:
   ```bash
   git add public/gsap/mp4/vigilancia.mp4
   git commit -m "add: video optimizado para GitHub Pages"
   git push origin main
   ```

## 📝 Notas

- El archivo original se puede mantener en una carpeta local para referencia
- Considera usar un CDN para archivos de video muy grandes
- GitHub Pages funciona mejor con archivos estáticos pequeños
- Para videos largos, considera usar YouTube o Vimeo y embebidos

## 🔗 Enlaces Útiles

- [GitHub File Size Limits](https://docs.github.com/en/repositories/working-with-files/managing-large-files)
- [Git LFS Documentation](https://git-lfs.github.com/)
- [FFmpeg Documentation](https://ffmpeg.org/documentation.html)
