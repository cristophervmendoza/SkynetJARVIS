@echo off
title Nexa AI Workspace
cd /d "%~dp0"

echo ==========================================
echo   Nexa AI - Iniciando servidores
echo ==========================================
echo.

:: Verificar que existe node_modules
if not exist "node_modules" (
    echo Primero ejecuta install.bat para instalar dependencias.
    pause
    exit /b 1
)

:: API
echo  Iniciando API en http://localhost:8000 ...
start "Nexa API" cmd /k "title Nexa API && cd /d "%~dp0services\api" && python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"

:: esperar
timeout /t 3 /nobreak >nul

:: Web
echo  Iniciando Web en http://localhost:3000 ...
start "Nexa Web" cmd /k "title Nexa Web && cd /d "%~dp0apps\web" && npm run dev"

echo.
echo ==========================================
echo   Abre http://localhost:3000 en tu navegador
echo   Cierra las ventanas para detener
echo ==========================================
echo.
pause
