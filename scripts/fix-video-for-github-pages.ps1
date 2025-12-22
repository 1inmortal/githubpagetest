# Script para revertir captura.mp4 de Git LFS y subirlo normalmente
# GitHub Pages no soporta archivos LFS directamente

Write-Host "🔧 Revertiendo captura.mp4 de Git LFS para GitHub Pages..." -ForegroundColor Cyan
Write-Host ""

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

$videoPath = "public/gsap/PR/mp4/captura.mp4"

# Verificar que el archivo existe
if (-not (Test-Path $videoPath)) {
    Write-Host "❌ Archivo no encontrado: $videoPath" -ForegroundColor Red
    exit 1
}

$fileSize = (Get-Item $videoPath).Length / 1MB
Write-Host "📊 Tamaño del archivo: $([math]::Round($fileSize, 2)) MB" -ForegroundColor Cyan

# Verificar tamaño (GitHub Pages funciona mejor con archivos <50MB)
if ($fileSize -gt 50) {
    Write-Host ""
    Write-Host "⚠️  ADVERTENCIA: El archivo es mayor a 50MB" -ForegroundColor Yellow
    Write-Host "   GitHub Pages puede tener problemas con archivos grandes" -ForegroundColor Yellow
    Write-Host ""
    $compress = Read-Host "¿Deseas comprimir el video? (s/n)"
    
    if ($compress -eq "s" -or $compress -eq "S") {
        Write-Host ""
        Write-Host "🎬 Comprimiendo video..." -ForegroundColor Cyan
        
        # Verificar si FFmpeg está instalado
        try {
            $ffmpegVersion = ffmpeg -version 2>&1 | Select-Object -First 1
            Write-Host "✓ FFmpeg encontrado" -ForegroundColor Green
        } catch {
            Write-Host "❌ FFmpeg no está instalado" -ForegroundColor Red
            Write-Host ""
            Write-Host "💡 Instalación:" -ForegroundColor Yellow
            Write-Host "   Windows: choco install ffmpeg" -ForegroundColor White
            Write-Host "   macOS: brew install ffmpeg" -ForegroundColor White
            Write-Host "   Linux: sudo apt install ffmpeg" -ForegroundColor White
            Write-Host ""
            Write-Host "O continúa sin comprimir (puede no funcionar en GitHub Pages)" -ForegroundColor Yellow
            $continue = Read-Host "¿Continuar sin comprimir? (s/n)"
            if ($continue -ne "s" -and $continue -ne "S") {
                exit 1
            }
        }
        
        if (Get-Command ffmpeg -ErrorAction SilentlyContinue) {
            $compressedPath = "public/gsap/PR/mp4/captura_compressed.mp4"
            Write-Host "   Comprimiendo a: $compressedPath" -ForegroundColor Cyan
            
            # Comprimir con FFmpeg (calidad web, tamaño reducido)
            ffmpeg -i $videoPath -vcodec libx264 -crf 28 -preset slow -acodec aac -b:a 128k -movflags +faststart $compressedPath
            
            if (Test-Path $compressedPath) {
                $newSize = (Get-Item $compressedPath).Length / 1MB
                Write-Host "✓ Video comprimido: $([math]::Round($newSize, 2)) MB" -ForegroundColor Green
                
                # Reemplazar el original
                Remove-Item $videoPath -Force
                Rename-Item $compressedPath $videoPath
                Write-Host "✓ Archivo reemplazado" -ForegroundColor Green
            }
        }
    }
}

Write-Host ""
Write-Host "📝 Removiendo tracking de LFS para este archivo..." -ForegroundColor Cyan

# Remover el archivo de LFS (pero mantenerlo en el working directory)
git lfs untrack $videoPath

# Actualizar .gitattributes para excluir este archivo específico
$gitattributesPath = ".gitattributes"
if (Test-Path $gitattributesPath) {
    $content = Get-Content $gitattributesPath
    $newContent = $content | Where-Object { $_ -notmatch "public/gsap/PR/mp4/captura\.mp4" }
    
    # Añadir excepción si no existe
    $hasException = $newContent | Where-Object { $_ -match "public/gsap/PR/mp4/captura\.mp4" -and $_ -match "!filter" }
    if (-not $hasException) {
        $newContent += "public/gsap/PR/mp4/captura.mp4 !filter !diff !merge !text"
    }
    
    $newContent | Set-Content $gitattributesPath
    Write-Host "✓ .gitattributes actualizado" -ForegroundColor Green
}

Write-Host ""
Write-Host "📦 Añadiendo archivo a Git (sin LFS)..." -ForegroundColor Cyan

# Añadir el archivo real (no el puntero LFS)
git add -f $videoPath
git add $gitattributesPath

Write-Host ""
Write-Host "📊 Estado:" -ForegroundColor Cyan
git status --short | Select-String "captura"

Write-Host ""
Write-Host "✅ Preparado para commit!" -ForegroundColor Green
Write-Host ""
Write-Host "💡 Próximos pasos:" -ForegroundColor Yellow
Write-Host "   1. Revisa los cambios: git status" -ForegroundColor White
Write-Host "   2. Commit: git commit -m 'Subir captura.mp4 sin LFS para GitHub Pages'" -ForegroundColor White
Write-Host "   3. Push: git push origin main" -ForegroundColor White
Write-Host "   4. Espera 5-10 minutos para que GitHub Pages se actualice" -ForegroundColor White
Write-Host ""
Write-Host "NOTA: Si el archivo es mayor a 50MB, considera usar un CDN externo" -ForegroundColor Yellow
Write-Host "   Opciones: Cloudinary, AWS S3, o GitHub Releases" -ForegroundColor Yellow

