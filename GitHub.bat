@echo off
setlocal enabledelayedexpansion

REM --- Códigos de Color ANSI ---
REM Requiere una terminal que soporte códigos de escape ANSI (ej. Windows Terminal, cmd.exe moderno, Git Bash)
REM Para cmd.exe en versiones antiguas de Windows, quizás necesites habilitar VirtualTerminalLevel. Puedes intentar ejecutar esto en cmd una vez:
REM reg add HKCU\Console /v VirtualTerminalLevel /t REG_DWORD /d 1 /f

:: Define el carácter de ESCAPE ANSI (ASCII 27) de forma robusta
for /F "tokens=1 delims=" %%a in ('echo Prompt $E ^| cmd') do set "ESC=%%a"

set "COLOR_RESET=%ESC%[0m"
set "COLOR_TITLE=%ESC%[1;36m"   REM Cian, Negrita
set "COLOR_MENU_OPTION=%ESC%[33m" REM Amarillo
set "COLOR_PROMPT=%ESC%[1;32m"  REM Verde, Negrita
set "COLOR_INFO=%ESC%[34m"    REM Azul
set "COLOR_ERROR=%ESC%[1;31m"  REM Rojo, Negrita
set "COLOR_SUCCESS=%ESC%[1;32m"REM Verde, Negrita
set "COLOR_HEADER=%ESC%[1;35m" REM Magenta, Negrita

title Panel de Control de Repositorio Git - %cd%

REM Comprueba si está dentro de un repositorio Git
if not exist .git (
    echo %COLOR_ERROR%Error: Este script debe ejecutarse desde la raíz de un repositorio Git.%COLOR_RESET%
    echo %COLOR_INFO%Por favor, navegue a la carpeta de su repositorio Git y ejecute el script de nuevo.%COLOR_RESET%
    pause
    exit /b 1
)

:MainMenu
cls
echo %COLOR_TITLE%==============================================================================%COLOR_RESET%
echo %COLOR_TITLE%        Panel de Control de Repositorio Git - %cd% %COLOR_RESET%
echo %COLOR_TITLE%==============================================================================%COLOR_RESET%
echo.
echo %COLOR_MENU_OPTION%  1. %COLOR_RESET%Ver Estado del Repositorio
echo %COLOR_MENU_OPTION%  2. %COLOR_RESET%Ver Commits Recientes (Últimos 20)
echo %COLOR_MENU_OPTION%  3. %COLOR_RESET%Hacer un Commit Rápido (Añadir todo, luego commit)
echo %COLOR_MENU_OPTION%  4. %COLOR_RESET%Mostrar Información de Última Actualización del Repositorio
echo %COLOR_MENU_OPTION%  5. %COLOR_RESET%Mostrar Estadísticas del Repositorio
echo %COLOR_MENU_OPTION%  6. %COLOR_RESET%Gestión de Marca de Tiempo de Última Revisión
echo %COLOR_MENU_OPTION%  7. %COLOR_RESET%Ver Estado de Flujos de Trabajo de GitHub (Requiere CLI 'gh')
echo %COLOR_MENU_OPTION%  8. %COLOR_RESET%Ver Git Reflog (Actividad reciente)
echo %COLOR_MENU_OPTION%  9. %COLOR_RESET%Marcador de Posición para Informes de Errores/Linter Personalizados
echo.
echo %COLOR_MENU_OPTION%  0. %COLOR_RESET%Salir
echo.
echo %COLOR_PROMPT%------------------------------------------------------------------------------%COLOR_RESET%
set /p "choice=Introduce tu elección [0-9]: "

if "%choice%"=="1" goto ShowStatus
if "%choice%"=="2" goto ViewCommits
if "%choice%"=="3" goto MakeCommit
if "%choice%"=="4" goto LastUpdate
if "%choice%"=="5" goto ShowStats
if "%choice%"=="6" goto LastReviewedMenu
if "%choice%"=="7" goto WorkflowStatus
if "%choice%"=="8" goto ViewReflog
if "%choice%"=="9" goto ErrorList
if "%choice%"=="0" (
    cls
    echo %COLOR_INFO%Saliendo del panel de control. ¡Adiós!%COLOR_RESET%
    timeout /t 1 /nobreak >nul
    exit /b 0
)
echo %COLOR_ERROR%Elección inválida. Por favor, inténtalo de nuevo.%COLOR_RESET%
timeout /t 2 /nobreak >nul
goto MainMenu

REM --- Manejadores de Opciones del Menú ---

:ShowStatus
cls
echo %COLOR_HEADER%======================= Estado del Repositorio =======================%COLOR_RESET%
echo.
git status -sb
echo.
echo %COLOR_PROMPT%---------------- Presiona cualquier tecla para volver al menú ----------------%COLOR_RESET%
pause >nul
goto MainMenu

:ViewCommits
cls
echo %COLOR_HEADER%======================= Commits Recientes ==========================%COLOR_RESET%
echo.
git log --graph --pretty=format:"%ESC%[31m%h%ESC%[0m -%ESC%[33m%d%ESC%[0m %s %ESC%[32m(%cr)%ESC%[0m %ESC%[1;34m<%an>%ESC%[0m" --abbrev-commit --date=relative -n 20 --color=always
echo.
echo %COLOR_PROMPT%---------------- Presiona cualquier tecla para volver al menú ----------------%COLOR_RESET%
pause >nul
goto MainMenu

:MakeCommit
cls
echo %COLOR_HEADER%========================= Hacer Commit ===========================%COLOR_RESET%
echo.
echo %COLOR_INFO%Estado actual:%COLOR_RESET%
git status -sb
echo.
echo %COLOR_PROMPT%Esto añadirá TODOS los cambios no preparados y creará un commit.%COLOR_RESET%
set "confirm="
set /p "confirm=¿Estás seguro de que quieres añadir todos los cambios y hacer commit? (s/n): "
if /i not "%confirm%"=="s" (
    echo %COLOR_INFO%Commit cancelado.%COLOR_RESET%
    timeout /t 2 /nobreak >nul
    goto MainMenu
)
echo.
git add .
echo %COLOR_SUCCESS%Todos los cambios añadidos al área de preparación.%COLOR_RESET%
echo.
set "commitMessage="
set /p "commitMessage=Introduce el mensaje del commit: "
if "%commitMessage%"=="" (
    echo %COLOR_ERROR%El mensaje del commit no puede estar vacío. Commit cancelado.%COLOR_RESET%
    timeout /t 3 /nobreak >nul
    goto MainMenu
)
git commit -m "%commitMessage%"
echo.
echo %COLOR_PROMPT%---------------- Presiona cualquier tecla para volver al menú ----------------%COLOR_RESET%
pause >nul
goto MainMenu

:LastUpdate
cls
echo %COLOR_HEADER%=================== Última Actualización del Repositorio ====================%COLOR_RESET%
echo.
git show -s --format="Último commit en: %ESC%[1;33m%ci%ESC%[0m (%ESC%[32m%cr%ESC%[0m)" HEAD
git show -s --format="Autor: %ESC%[1;34m%an%ESC%[0m <%ESC%[1;34m%ae%ESC%[0m>" HEAD
git show -s --format="Hash del Commit: %ESC%[1;31m%H%ESC%[0m" HEAD
git show -s --format="Mensaje del Commit: %ESC%[37m%s%ESC%[0m" HEAD
echo.
echo %COLOR_PROMPT%---------------- Presiona cualquier tecla para volver al menú ----------------%COLOR_RESET%
pause >nul
goto MainMenu

:ShowStats
cls
echo %COLOR_HEADER%==================== Estadísticas del Repositorio ====================%COLOR_RESET%
echo.
echo %COLOR_INFO%Principales Contribuidores (por número de commits):%COLOR_RESET%
git shortlog -s -n --all --no-merges
echo.
echo %COLOR_INFO%Total de Commits en el Repositorio:%COLOR_RESET%
for /f %%i in ('git rev-list --all --count') do echo   %%i commits
echo.
echo %COLOR_INFO%Total Aproximado de Archivos Rastreados (requiere 'wc' de Git Bash):%COLOR_RESET%
git ls-files | wc -l | findstr /R /N "^" | findstr /R /V /C:":0" >nul && (
    for /f "tokens=*" %%a in ('git ls-files ^| wc -l') do echo   %%a archivos
) || (
    echo   %COLOR_ERROR%No se pudieron contar los archivos. El comando 'wc' podría no estar disponible o no se encontraron archivos.%COLOR_RESET%
)
echo.
echo %COLOR_PROMPT%---------------- Presiona cualquier tecla para volver al menú ----------------%COLOR_RESET%
pause >nul
goto MainMenu

:LastReviewedMenu
cls
echo %COLOR_HEADER%================= Gestión de Marca de Tiempo de Última Revisión =================%COLOR_RESET%
echo.
set "timestamp_file=.last_reviewed_timestamp"
echo %COLOR_MENU_OPTION%  1. %COLOR_RESET%Mostrar Marca de Tiempo de Última Revisión
echo %COLOR_MENU_OPTION%  2. %COLOR_RESET%Marcar como Revisado Ahora
echo %COLOR_MENU_OPTION%  3. %COLOR_RESET%Volver al Menú Principal
echo.
set "review_choice="
set /p "review_choice=Introduce tu elección [1-3]: "

if "%review_choice%"=="1" goto ShowLastReviewed
if "%review_choice%"=="2" goto MarkAsReviewed
if "%review_choice%"=="3" goto MainMenu
echo %COLOR_ERROR%Elección inválida.%COLOR_RESET%
timeout /t 2 /nobreak >nul
goto LastReviewedMenu

:ShowLastReviewed
cls
echo %COLOR_HEADER%----------------- Marca de Tiempo de Última Revisión ------------------%COLOR_RESET%
echo.
if exist "%timestamp_file%" (
    echo %COLOR_INFO%La última marca de tiempo de revisión fue registrada el:%COLOR_RESET%
    type "%timestamp_file%"
    echo.
    echo %COLOR_INFO%Nota: Esta es una marca de tiempo rastreada localmente, no del historial de Git.%COLOR_RESET%
) else (
    echo %COLOR_INFO%Aún no se ha registrado ninguna marca de tiempo de revisión para este repositorio.%COLOR_RESET%
    echo %COLOR_INFO%Usa la opción 'Marcar como Revisado Ahora' para establecer una.%COLOR_RESET%
)
echo.
echo %COLOR_PROMPT%---------------- Presiona cualquier tecla para volver al menú ----------------%COLOR_RESET%
pause >nul
goto LastReviewedMenu

:MarkAsReviewed
cls
echo %COLOR_HEADER%------------------- Marcar como Revisado Ahora --------------------%COLOR_RESET%
echo.
echo %DATE% %TIME% > "%timestamp_file%"
echo %COLOR_SUCCESS%Repositorio marcado como revisado en: %DATE% %TIME%%COLOR_RESET%
echo %COLOR_INFO%Marca de tiempo guardada en '%timestamp_file%'.%COLOR_RESET%
echo %COLOR_INFO%Considera añadir '%timestamp_file%' a tu .gitignore si no deseas hacer commit.%COLOR_RESET%
echo.
echo %COLOR_PROMPT%---------------- Presiona cualquier tecla para volver al menú ----------------%COLOR_RESET%
pause >nul
goto LastReviewedMenu

:WorkflowStatus
cls
echo %COLOR_HEADER%=================== Estado de Flujos de Trabajo de GitHub ====================%COLOR_RESET%
echo.
where gh >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo %COLOR_INFO%Obteniendo las últimas ejecuciones de flujos de trabajo de GitHub Actions (últimas 5)...%COLOR_RESET%
    gh run list --limit 5 --repo %cd%
    echo.
    echo %COLOR_INFO%Para más detalles, usa 'gh run view ^<run-id^>' o 'gh workflow view'.%COLOR_RESET%
) else (
    echo %COLOR_ERROR%GitHub CLI ('gh') no encontrado o no en la ruta.%COLOR_RESET%
    echo %COLOR_INFO%Por favor, instálalo desde https://cli.github.com/ para usar esta función.%COLOR_RESET%
)
echo.
echo %COLOR_PROMPT%---------------- Presiona cualquier tecla para volver al menú ----------------%COLOR_RESET%
pause >nul
goto MainMenu

:ViewReflog
cls
echo %COLOR_HEADER%========================= Git Reflog ==========================%COLOR_RESET%
echo.
echo %COLOR_INFO%Mostrando entradas recientes de reflog (actividad del repositorio):%COLOR_RESET%
git reflog show --pretty=format:"%ESC%[31m%h%ESC%[0m %ESC%[33m%gd%ESC%[0m: %gs %ESC%[32m(%cr)%ESC%[0m" -n 20 --color=always
echo.
echo %COLOR_PROMPT%---------------- Presiona cualquier tecla para volver al menú ----------------%COLOR_RESET%
pause >nul
goto MainMenu

:ErrorList
cls
echo %COLOR_HEADER%================= Informes Personalizados de Errores / Linter ===============%COLOR_RESET%
echo.
echo %COLOR_INFO%Este es un marcador de posición para integrar informes de errores personalizados o la salida de un linter.%COLOR_RESET%
echo %COLOR_INFO%Podrías modificar este script para llamar a tus herramientas de linting/construcción específicas%COLOR_RESET%
echo %COLOR_INFO%(ej. ESLint, un script de construcción) y mostrar un resumen de su salida aquí.%COLOR_RESET%
echo.
echo %COLOR_INFO%Ejemplo: Podrías ejecutar 'npm run lint' o 'npm test' y analizar los resultados si estos se guardan en un archivo.%COLOR_RESET%
echo.
echo %COLOR_PROMPT%---------------- Presiona cualquier tecla para volver al menú ----------------%COLOR_RESET%
pause >nul
goto MainMenu