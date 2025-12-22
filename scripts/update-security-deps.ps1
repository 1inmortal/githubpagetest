# Script PowerShell para actualizar dependencias de seguridad restantes
# Resuelve las 6 alertas de Dependabot pendientes

Write-Host "🔒 Actualizando dependencias de seguridad..." -ForegroundColor Cyan
Write-Host ""

# Actualizar dependencias en root
Write-Host "📦 Actualizando dependencias en root..." -ForegroundColor Yellow
npm update glob js-yaml vite

# Actualizar dependencias en zonagrafica
Write-Host ""
Write-Host "📦 Actualizando dependencias en public/webs/zonagrafica..." -ForegroundColor Yellow
Set-Location public/webs/zonagrafica
npm update braces esbuild vite

# Regenerar lockfiles
Write-Host ""
Write-Host "🔄 Regenerando lockfiles..." -ForegroundColor Yellow
npm install

# Volver a raíz
Set-Location ../../..

# Verificar
Write-Host ""
Write-Host "✅ Verificando vulnerabilidades..." -ForegroundColor Green
npm audit

Write-Host ""
Write-Host "✨ Actualización completada!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. Revisar y mergear PRs #28, #35, #36 si aún están abiertos"
Write-Host "2. Ejecutar 'npm audit' para verificar que todas las alertas se resolvieron"
Write-Host "3. Hacer commit de los cambios en package-lock.json"

