#!/bin/bash
# Script para actualizar dependencias de seguridad restantes
# Resuelve las 6 alertas de Dependabot pendientes

set -e

echo "🔒 Actualizando dependencias de seguridad..."
echo ""

# Actualizar dependencias en root
echo "📦 Actualizando dependencias en root..."
npm update glob js-yaml vite

# Actualizar dependencias en zonagrafica
echo ""
echo "📦 Actualizando dependencias en public/webs/zonagrafica..."
cd public/webs/zonagrafica
npm update braces esbuild vite

# Regenerar lockfiles
echo ""
echo "🔄 Regenerando lockfiles..."
npm install

# Volver a raíz
cd ../../..

# Verificar
echo ""
echo "✅ Verificando vulnerabilidades..."
npm audit

echo ""
echo "✨ Actualización completada!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Revisar y mergear PRs #28, #35, #36 si aún están abiertos"
echo "2. Ejecutar 'npm audit' para verificar que todas las alertas se resolvieron"
echo "3. Hacer commit de los cambios en package-lock.json"

