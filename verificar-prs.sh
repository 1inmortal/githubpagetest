#!/bin/bash
export PATH="$PATH:/c/Program Files/GitHub CLI"
cd /c/Users/jarma/OneDrive/Documentos/GitHub/githubpagetest

echo "📋 Listando todos los PRs abiertos..."
gh pr list --state open --limit 20

echo ""
echo "📋 Listando PRs de Dependabot específicamente..."
gh pr list --state open --author "app/dependabot" --limit 20

echo ""
echo "📋 Listando PRs con 'dependabot' en el título..."
gh pr list --state open --search "dependabot" --limit 20

