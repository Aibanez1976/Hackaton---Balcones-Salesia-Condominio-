#!/bin/bash

# Script para subir SalesiaAdmin Pro a GitHub
# Uso: ./deploy-to-github.sh <GITHUB_URL>

echo "================================"
echo "SalesiaAdmin Pro - GitHub Deploy"
echo "================================"
echo ""

# Verificar que se proporcionó la URL
if [ -z "$1" ]; then
    echo "❌ Error: Debes proporcionar la URL del repositorio GitHub"
    echo "Uso: ./deploy-to-github.sh https://github.com/usuario/salesia-admin-pro.git"
    exit 1
fi

GITHUB_URL=$1

echo "📦 Iniciando proceso de deploy..."
echo ""

# Paso 1: Verificar que .gitignore existe
echo "✓ Paso 1: Verificando .gitignore..."
if [ ! -f ".gitignore" ]; then
    echo "❌ Error: .gitignore no encontrado"
    exit 1
fi
echo "✅ .gitignore encontrado"
echo ""

# Paso 2: Inicializar git si no está inicializado
echo "✓ Paso 2: Inicializando Git..."
if [ ! -d ".git" ]; then
    git init
    echo "✅ Repositorio Git inicializado"
else
    echo "✅ Repositorio Git ya existe"
fi
echo ""

# Paso 3: Configurar usuario (opcional)
echo "✓ Paso 3: Configurando usuario Git..."
git config user.name "Hackathon Cúcuta 2025" 2>/dev/null || true
git config user.email "hackathon@salesia.com" 2>/dev/null || true
echo "✅ Usuario configurado"
echo ""

# Paso 4: Agregar archivos
echo "✓ Paso 4: Agregando archivos..."
git add .
echo "✅ Archivos agregados"
echo ""

# Paso 5: Verificar estado
echo "✓ Paso 5: Verificando estado..."
echo ""
git status
echo ""

# Paso 6: Crear commit
echo "✓ Paso 6: Creando commit..."
git commit -m "Initial commit: SalesiaAdmin Pro - FASE 2 Completa

- Implementación de Conciliación Bancaria
- Implementación de Respaldo Automático
- Implementación de Bitácora de Cambios
- Implementación de Reporte Top Morosos
- 16 endpoints API nuevos
- Documentación completa
- Validación 100% exitosa
- Servidor probado y funcionando"

if [ $? -ne 0 ]; then
    echo "⚠️  No hay cambios para hacer commit"
else
    echo "✅ Commit creado"
fi
echo ""

# Paso 7: Agregar remote
echo "✓ Paso 7: Configurando remote..."
git remote remove origin 2>/dev/null || true
git remote add origin "$GITHUB_URL"
echo "✅ Remote configurado: $GITHUB_URL"
echo ""

# Paso 8: Renombrar rama
echo "✓ Paso 8: Configurando rama principal..."
git branch -M main 2>/dev/null || true
echo "✅ Rama configurada como 'main'"
echo ""

# Paso 9: Subir a GitHub
echo "✓ Paso 9: Subiendo a GitHub..."
echo "⏳ Esto puede tomar unos minutos..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "================================"
    echo "✅ ¡DEPLOY EXITOSO!"
    echo "================================"
    echo ""
    echo "📍 Tu repositorio está en:"
    echo "   $GITHUB_URL"
    echo ""
    echo "📋 Próximos pasos:"
    echo "   1. Verifica que los archivos estén en GitHub"
    echo "   2. Comparte la URL con el jurado"
    echo "   3. Proporciona instrucciones de instalación"
    echo ""
    echo "🚀 Para clonar y ejecutar:"
    echo "   git clone $GITHUB_URL"
    echo "   cd salesia-admin-pro"
    echo "   npm install"
    echo "   npm start"
    echo ""
else
    echo ""
    echo "❌ Error al subir a GitHub"
    echo "Verifica tu conexión y credenciales"
    exit 1
fi
