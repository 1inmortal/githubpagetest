@echo off
echo ========================================
echo Iniciando servidor de desarrollo...
echo Certificates App
echo ========================================
echo.

cd /d "%~dp0"
echo Directorio actual: %CD%
echo.

echo Instalando dependencias (si es necesario)...
call npm install
echo.

echo Iniciando servidor Vite...
call npm run dev

pause
