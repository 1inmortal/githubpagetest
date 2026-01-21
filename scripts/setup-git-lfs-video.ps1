# Script para configurar Git LFS para el video captura.mp4
# GitHub Pages puede tener problemas sirviendo archivos grandes sin Git LFS

Write-Host "🔧 Configurando Git LFS para captura.mp4..." -ForegroundColor Cyan
Write-Host ""

# Verificar si Git LFS está instalado
try {
    $lfsVersion = git lfs version 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Git LFS no está instalado." -ForegroundColor Red
        Write-Host ""
        Write-Host "💡 Instalación:" -ForegroundColor Yellow
        Write-Host "   Windows (Chocolatey): choco install git-lfs" -ForegroundColor White
        Write-Host "   Windows (Instalador): https://git-lfs.github.com/" -ForegroundColor White
        Write-Host "   macOS: brew install git-lfs" -ForegroundColor White
        Write-Host "   Linux: sudo apt install git-lfs" -ForegroundColor White
        exit 1
    }
    Write-Host "✓ Git LFS está instalado: $lfsVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Error al verificar Git LFS: $_" -ForegroundColor Red
    exit 1
}

# Cambiar al directorio del proyecto
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

Write-Host ""
Write-Host "📂 Directorio del proyecto: $projectRoot" -ForegroundColor Cyan

# Inicializar Git LFS
Write-Host ""
Write-Host "🔧 Inicializando Git LFS..." -ForegroundColor Cyan
git lfs install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al inicializar Git LFS" -ForegroundColor Red
    exit 1
}

# Configurar tracking para archivos MP4
Write-Host ""
Write-Host "📝 Configurando tracking para archivos MP4..." -ForegroundColor Cyan
git lfs track "*.mp4"
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al configurar tracking" -ForegroundColor Red
    exit 1
}

# Verificar que .gitattributes existe
if (Test-Path ".gitattributes") {
    Write-Host "✓ .gitattributes creado/actualizado" -ForegroundColor Green
    Write-Host ""
    Write-Host "Contenido de .gitattributes:" -ForegroundColor Cyan
    Get-Content ".gitattributes" | Write-Host
} else {
    Write-Host "⚠️  .gitattributes no se creó" -ForegroundColor Yellow
}

# Añadir archivos al staging
Write-Host ""
Write-Host "📦 Añadiendo archivos al staging..." -ForegroundColor Cyan
git add .gitattributes
git add public/gsap/PR/mp4/captura.mp4

# Verificar estado
Write-Host ""
Write-Host "📊 Estado de Git:" -ForegroundColor Cyan
git status --short

Write-Host ""
Write-Host "✅ Configuración completada!" -ForegroundColor Green
Write-Host ""
Write-Host "💡 Próximos pasos:" -ForegroundColor Yellow
Write-Host "   1. Revisa los cambios: git status" -ForegroundColor White
Write-Host "   2. Haz commit: git commit -m 'Configurar Git LFS para video captura.mp4'" -ForegroundColor White
Write-Host "   3. Push a GitHub: git push origin main" -ForegroundColor White
Write-Host "   4. Espera 5-10 minutos para que GitHub Pages se actualice" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  NOTA: Si el archivo ya estaba en Git, necesitarás migrarlo a LFS:" -ForegroundColor Yellow
Write-Host "   git lfs migrate import --include='*.mp4' --everything" -ForegroundColor White
Write-Host "   git push origin main --force" -ForegroundColor White

