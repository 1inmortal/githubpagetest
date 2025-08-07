#!/bin/bash

# Directorio del proyecto
PROJECT_DIR="/c/Users/jarma/OneDrive/Documentos/GitHub/githubpagetest"

# Mensaje de commit (puede ser personalizado)
COMMIT_MESSAGE="Automated commit on $(date +'%Y-%m-%d %H:%M:%S')"

# Navegar al directorio del proyecto
cd "$PROJECT_DIR" || { echo "No se pudo acceder al directorio del proyecto"; exit 1; }

# Verificar si hay cambios para commitear
if [[ -n $(git status --porcelain) ]]; then
    echo "Detectados cambios. Preparando para commit."

    # Agregar todos los cambios
    git add .

    # Hacer commit
    git commit -m "$COMMIT_MESSAGE"

    # Enviar al repositorio remoto
    git push origin main

    echo "Cambios enviados exitosamente al repositorio remoto."
else
    echo "No hay cambios para commitear."
fi
