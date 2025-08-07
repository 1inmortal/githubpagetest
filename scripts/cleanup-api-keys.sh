#!/bin/bash

# Script para limpiar llaves API y secretos del repositorio
# Autor: Sistema de Auditoría de Seguridad
# Fecha: $(date)

echo "🔍 Iniciando limpieza de llaves API y secretos..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para buscar y reportar llaves API
search_api_keys() {
    echo -e "${YELLOW}🔍 Buscando llaves API de Google...${NC}"
    
    # Buscar llaves API de Google
    google_keys=$(grep -r --color=never -E 'AIzaSy[0-9A-Za-z_-]{33}' . --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=.venv 2>/dev/null | wc -l)
    
    if [ "$google_keys" -gt 0 ]; then
        echo -e "${RED}⚠️  Se encontraron $google_keys llaves API de Google${NC}"
        grep -r --color=never -E 'AIzaSy[0-9A-Za-z_-]{33}' . --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=.venv 2>/dev/null | head -10
    else
        echo -e "${GREEN}✅ No se encontraron llaves API de Google${NC}"
    fi
    
    # Buscar otros patrones de llaves API
    echo -e "${YELLOW}🔍 Buscando otros tipos de llaves API...${NC}"
    
    # Patrones comunes de llaves API
    patterns=(
        "sk-[a-zA-Z0-9]{48}"
        "pk_[a-zA-Z0-9]{48}"
        "ghp_[a-zA-Z0-9]{36}"
        "gho_[a-zA-Z0-9]{36}"
        "ghu_[a-zA-Z0-9]{36}"
        "ghs_[a-zA-Z0-9]{36}"
        "ghr_[a-zA-Z0-9]{36}"
    )
    
    for pattern in "${patterns[@]}"; do
        count=$(grep -r --color=never -E "$pattern" . --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=.venv 2>/dev/null | wc -l)
        if [ "$count" -gt 0 ]; then
            echo -e "${RED}⚠️  Se encontraron $count coincidencias con patrón: $pattern${NC}"
        fi
    done
}

# Función para limpiar archivos de descarga
cleanup_downloads() {
    echo -e "${YELLOW}🧹 Limpiando archivos de descarga que pueden contener llaves...${NC}"
    
    # Buscar archivos con "descarga" en el nombre
    find . -name "*descarga*" -type f 2>/dev/null | while read -r file; do
        echo -e "${YELLOW}📁 Archivo encontrado: $file${NC}"
        
        # Verificar si contiene llaves API
        if grep -q "AIzaSy" "$file" 2>/dev/null; then
            echo -e "${RED}⚠️  El archivo $file contiene llaves API${NC}"
            echo -e "${YELLOW}💡 Considera eliminar o limpiar este archivo${NC}"
        fi
    done
}

# Función para verificar archivos .env
check_env_files() {
    echo -e "${YELLOW}🔍 Verificando archivos .env...${NC}"
    
    find . -name ".env*" -type f 2>/dev/null | while read -r file; do
        echo -e "${YELLOW}📁 Archivo .env encontrado: $file${NC}"
        
        # Verificar si contiene llaves API
        if grep -q "AIzaSy\|API_KEY\|SECRET\|TOKEN" "$file" 2>/dev/null; then
            echo -e "${RED}⚠️  El archivo $file puede contener credenciales${NC}"
            echo -e "${YELLOW}💡 Verifica que no contenga información sensible${NC}"
        fi
    done
}

# Función para crear archivo de ejemplo
create_example_env() {
    echo -e "${YELLOW}📝 Creando archivo .env.example...${NC}"
    
    cat > .env.example << 'EOF'
# Archivo de ejemplo para variables de entorno
# Copia este archivo como .env y configura tus credenciales

# Google APIs
GOOGLE_AI_API_KEY=your_google_ai_api_key_here
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Otras APIs
OPENAI_API_KEY=your_openai_api_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here

# Base de datos
DATABASE_URL=your_database_url_here

# Configuración de la aplicación
NODE_ENV=development
PORT=3000
EOF
    
    echo -e "${GREEN}✅ Archivo .env.example creado${NC}"
}

# Ejecutar funciones
search_api_keys
cleanup_downloads
check_env_files
create_example_env

echo -e "${GREEN}✅ Limpieza completada${NC}"
echo -e "${YELLOW}💡 Recomendaciones:${NC}"
echo -e "  1. Revisa los archivos reportados manualmente"
echo -e "  2. Elimina o limpia archivos que contengan llaves API"
echo -e "  3. Usa variables de entorno para credenciales"
echo -e "  4. Configura git-secrets o trufflehog para prevención" 