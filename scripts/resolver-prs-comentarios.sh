#!/bin/bash
export PATH="$PATH:/c/Program Files/GitHub CLI"

echo "🚀 Resolviendo PRs de Dependabot usando comandos @dependabot..."
echo ""

# Detectar el repo automáticamente
REPO=$(gh repo view --json nameWithOwner --jq '.nameWithOwner')
echo "📦 Repo: $REPO"
echo ""

# Obtener PRs de dependabot
mapfile -t PRS < <(gh pr list \
    --repo "$REPO" \
    --search "author:app/dependabot" \
    --state open \
    --json number,title,headRefName \
    --jq '.[] | "\(.number)|\(.headRefName)|\(.title)"')

if [ ${#PRS[@]} -eq 0 ]; then
    echo "⚠️ No se encontraron PRs abiertos de Dependabot"
    exit 0
fi

echo "✅ PRs encontrados: ${#PRS[@]}"
echo ""

# Definir acciones
declare -A RULES
RULES["js-yaml"]="merge"
RULES["vite"]="merge"
RULES["scikit-learn"]="comment"
RULES["torch"]="close"

PROCESSED=0

echo "🔧 Aplicando comandos @dependabot..."
echo ""

for pr in "${PRS[@]}"; do
    IFS='|' read -r number branch title <<< "$pr"
    
    ACTION=""
    
    # Buscar acción por coincidencia parcial
    for key in "${!RULES[@]}"; do
        if [[ "$branch" == *"$key"* ]] || [[ "$title" == *"$key"* ]]; then
            ACTION="${RULES[$key]}"
            break
        fi
    done
    
    if [ -z "$ACTION" ]; then
        continue
    fi
    
    case "$ACTION" in
        "merge")
            echo "   ✅ PR #$number ($branch): Comentando @dependabot merge"
            gh pr comment "$number" --repo "$REPO" --body "@dependabot merge" 2>/dev/null && ((PROCESSED++)) || echo "      ⚠️ Error al comentar"
            ;;
        "comment")
            echo "   ⚠️  PR #$number ($branch): Comentando validación requerida"
            COMMENT="⚠️ **Validación requerida antes de merge**

Por favor ejecutar:
- \`jupyter notebook public/python/notebooks/\`
- Verificar que los modelos funcionan correctamente

Después de validar, comentar: \`@dependabot merge\`"
            gh pr comment "$number" --repo "$REPO" --body "$COMMENT" 2>/dev/null && ((PROCESSED++)) || echo "      ⚠️ Error al comentar"
            ;;
        "close")
            echo "   🚫 PR #$number ($branch): Cerrando con @dependabot close"
            COMMENT="🚫 **Actualización MAJOR cerrada**

Motivo: Actualización major de PyTorch (2.1.2 → 2.8.0) requiere plan de migración controlado.

@dependabot close"
            gh pr comment "$number" --repo "$REPO" --body "$COMMENT" 2>/dev/null
            gh pr close "$number" --repo "$REPO" --comment "Actualización MAJOR cerrada. Requiere plan de migración." 2>/dev/null && ((PROCESSED++)) || echo "      ⚠️ Error al cerrar"
            ;;
    esac
    
    sleep 1  # Pequeña pausa entre requests
done

echo ""
echo "📊 Resumen:"
echo "   ✔ PRs procesados: $PROCESSED"
echo ""
echo "✨ Comandos @dependabot aplicados!"
echo "   Los PRs se fusionarán automáticamente cuando pasen los checks de CI/CD"
echo ""

