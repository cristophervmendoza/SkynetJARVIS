@echo off
title Nexa AI - Install
cd /d "%~dp0"

echo ==================================
echo   Nexa AI - Instalando dependencias
echo ==================================
echo.

:: npm
echo [1/2] Node.js...
if exist "node_modules" (
    echo   Ya instalado, saltando...
) else (
    call npm install
    if %errorlevel% neq 0 (
        echo   ERROR: npm install fallo
        pause
        exit /b 1
    )
    echo   OK
)
echo.

:: pip
echo [2/2] Python...
if exist "services\api\__pycache__" (
    echo   Verificando paquetes...
)
pip install -r services\api\requirements.txt --quiet 2>nul
if %errorlevel% neq 0 (
    echo   WARN: pip tuvo problemas (revisa que tengas Python 3.11+)
) else (
    echo   OK
)
echo.

echo ==================================
echo   Instalacion completa!
echo   Usa "start.bat" para iniciar.
echo ==================================
pause
