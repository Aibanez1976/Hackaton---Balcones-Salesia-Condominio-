@echo off
REM Script para subir SalesiaAdmin Pro a GitHub (Windows)
REM Uso: deploy-to-github.bat <GITHUB_URL>

setlocal enabledelayedexpansion

echo ================================
echo SalesiaAdmin Pro - GitHub Deploy
echo ================================
echo.

REM Verificar que se proporcionó la URL
if "%1"=="" (
    echo ❌ Error: Debes proporcionar la URL del repositorio GitHub
    echo Uso: deploy-to-github.bat https://github.com/usuario/salesia-admin-pro.git
    pause
    exit /b 1
)

set GITHUB_URL=%1

echo 📦 Iniciando proceso de deploy...
echo.

REM Paso 1: Verificar que .gitignore existe
echo ✓ Paso 1: Verificando .gitignore...
if not exist ".gitignore" (
    echo ❌ Error: .gitignore no encontrado
    pause
    exit /b 1
)
echo ✅ .gitignore encontrado
echo.

REM Paso 2: Inicializar git si no está inicializado
echo ✓ Paso 2: Inicializando Git...
if not exist ".git" (
    call git init
    echo ✅ Repositorio Git inicializado
) else (
    echo ✅ Repositorio Git ya existe
)
echo.

REM Paso 3: Configurar usuario
echo ✓ Paso 3: Configurando usuario Git...
call git config user.name "Hackathon Cúcuta 2025" 2>nul
call git config user.email "hackathon@salesia.com" 2>nul
echo ✅ Usuario configurado
echo.

REM Paso 4: Agregar archivos
echo ✓ Paso 4: Agregando archivos...
call git add .
echo ✅ Archivos agregados
echo.

REM Paso 5: Verificar estado
echo ✓ Paso 5: Verificando estado...
echo.
call git status
echo.

REM Paso 6: Crear commit
echo ✓ Paso 6: Creando commit...
call git commit -m "Initial commit: SalesiaAdmin Pro - FASE 2 Completa - Implementación de Conciliación Bancaria, Respaldo Automático, Bitácora de Cambios, Top Morosos, 16 endpoints API nuevos, Documentación completa, Validación 100 exitosa, Servidor probado y funcionando"

if errorlevel 1 (
    echo ⚠️  No hay cambios para hacer commit
) else (
    echo ✅ Commit creado
)
echo.

REM Paso 7: Agregar remote
echo ✓ Paso 7: Configurando remote...
call git remote remove origin 2>nul
call git remote add origin "%GITHUB_URL%"
echo ✅ Remote configurado: %GITHUB_URL%
echo.

REM Paso 8: Renombrar rama
echo ✓ Paso 8: Configurando rama principal...
call git branch -M main 2>nul
echo ✅ Rama configurada como 'main'
echo.

REM Paso 9: Subir a GitHub
echo ✓ Paso 9: Subiendo a GitHub...
echo ⏳ Esto puede tomar unos minutos...
call git push -u origin main

if errorlevel 1 (
    echo.
    echo ❌ Error al subir a GitHub
    echo Verifica tu conexión y credenciales
    pause
    exit /b 1
) else (
    echo.
    echo ================================
    echo ✅ ¡DEPLOY EXITOSO!
    echo ================================
    echo.
    echo 📍 Tu repositorio está en:
    echo    %GITHUB_URL%
    echo.
    echo 📋 Próximos pasos:
    echo    1. Verifica que los archivos estén en GitHub
    echo    2. Comparte la URL con el jurado
    echo    3. Proporciona instrucciones de instalación
    echo.
    echo 🚀 Para clonar y ejecutar:
    echo    git clone %GITHUB_URL%
    echo    cd salesia-admin-pro
    echo    npm install
    echo    npm start
    echo.
    pause
)
