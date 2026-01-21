@echo off
REM ====================================
REM Script para iniciar el servidor Vite
REM ====================================

REM Cambiar al directorio del proyecto
cd /d "C:\Users\jarma\Documents\githubpagetest"

echo.
echo ========================================
echo   Iniciando Servidor Vite
echo ========================================
echo.
echo Directorio: %CD%
echo Puerto: 3000
echo URL: http://localhost:3000/
echo.
echo Presiona Ctrl+C para detener el servidor
echo ========================================
echo.

REM Ejecutar el servidor de Vite
npm run dev

REM Si el servidor se cierra, pausar para ver mensajes
pause
