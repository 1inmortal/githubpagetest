# Script para hacer push de los cambios
Write-Host "=== Verificando estado de Git ===" -ForegroundColor Cyan
git status

Write-Host "`n=== Agregando archivos ===" -ForegroundColor Cyan
git add public/gsap/PR/panel.html
git add public/gsap/PR/mp4/captura.mp4

Write-Host "`n=== Verificando archivos agregados ===" -ForegroundColor Cyan
git status --short

Write-Host "`n=== Haciendo commit ===" -ForegroundColor Cyan
git commit -m "Mejorar depuración de carga de video y agregar archivo de video"

Write-Host "`n=== Verificando commits pendientes ===" -ForegroundColor Cyan
git log origin/main..HEAD --oneline

Write-Host "`n=== Haciendo push ===" -ForegroundColor Cyan
git push origin main

Write-Host "`n=== Estado final ===" -ForegroundColor Cyan
git status

