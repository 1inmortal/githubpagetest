#!/bin/bash

# Script para purgar y reemplazar claves de API de Google
# Autor: Sistema de Auditoría de Seguridad
# Fecha: $(date)

set -euo pipefail

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuración
BACKUP_DIR="./backup_$(date +%Y%m%d_%H%M%S)"
LOG_FILE="./api_keys_purge_$(date +%Y%m%d_%H%M%S).log"
REPLACEMENT_KEY="AIzaSyREPLACED_API_KEY_DO_NOT_USE"

# Función para logging
log() {
    echo -e "$1" | tee -a "$LOG_FILE"
}

# Función para crear backup
create_backup() {
    log "${BLUE}📦 Creando backup en $BACKUP_DIR...${NC}"
    mkdir -p "$BACKUP_DIR"
    
    # Copiar archivos que contienen claves API
    find . -name "*.html" -o -name "*.js" -o -name "*.json" -o -name "*.py" | while read -r file; do
        if grep -q "AIzaSy" "$file" 2>/dev/null; then
            cp "$file" "$BACKUP_DIR/"
            log "${YELLOW}📁 Backup: $file${NC}"
        fi
    done
    
    log "${GREEN}✅ Backup completado${NC}"
}

# Función para detectar claves API
detect_api_keys() {
    log "${YELLOW}🔍 Detectando claves API de Google...${NC}"
    
    local found_keys=0
    
    # Buscar en archivos actuales
    while IFS= read -r -d '' file; do
        if grep -q "AIzaSy" "$file" 2>/dev/null; then
            log "${RED}⚠️  Clave API encontrada en: $file${NC}"
            grep -n "AIzaSy" "$file" | while read -r line; do
                log "${RED}   Línea: $line${NC}"
            done
            ((found_keys++))
        fi
    done < <(find . -type f \( -name "*.html" -o -name "*.js" -o -name "*.json" -o -name "*.py" \) -print0)
    
    # Buscar en historial Git
    log "${YELLOW}🔍 Buscando en historial Git...${NC}"
    git_grep_result=$(git grep -I --break --heading --line-number 'AIzaSy[0-9A-Za-z_\-]\{35\}' $(git rev-list --all) 2>/dev/null || true)
    
    if [ -n "$git_grep_result" ]; then
        log "${RED}⚠️  Claves API encontradas en historial Git:${NC}"
        echo "$git_grep_result" | head -20
        log "${YELLOW}💡 Se encontraron claves en el historial Git${NC}"
    fi
    
    log "${GREEN}✅ Detección completada. Total de archivos con claves: $found_keys${NC}"
    return $found_keys
}

# Función para purgar claves API
purge_api_keys() {
    log "${YELLOW}🧹 Purgando claves API...${NC}"
    
    local purged_files=0
    
    # Procesar archivos HTML
    find . -name "*.html" -type f | while read -r file; do
        if grep -q "AIzaSy" "$file" 2>/dev/null; then
            log "${YELLOW}📝 Procesando: $file${NC}"
            
            # Crear backup del archivo original
            cp "$file" "$file.backup"
            
            # Reemplazar claves API
            sed -i 's/AIzaSy[0-9A-Za-z_\-]\{35\}/AIzaSyREPLACED_API_KEY_DO_NOT_USE/g' "$file"
            
            # Verificar que se reemplazó
            if grep -q "AIzaSyREPLACED_API_KEY_DO_NOT_USE" "$file"; then
                log "${GREEN}✅ Clave API reemplazada en: $file${NC}"
                ((purged_files++))
            else
                log "${RED}❌ Error al reemplazar en: $file${NC}"
            fi
        fi
    done
    
    # Procesar archivos JavaScript
    find . -name "*.js" -type f | while read -r file; do
        if grep -q "AIzaSy" "$file" 2>/dev/null; then
            log "${YELLOW}📝 Procesando: $file${NC}"
            
            # Crear backup del archivo original
            cp "$file" "$file.backup"
            
            # Reemplazar claves API
            sed -i 's/AIzaSy[0-9A-Za-z_\-]\{35\}/AIzaSyREPLACED_API_KEY_DO_NOT_USE/g' "$file"
            
            # Verificar que se reemplazó
            if grep -q "AIzaSyREPLACED_API_KEY_DO_NOT_USE" "$file"; then
                log "${GREEN}✅ Clave API reemplazada en: $file${NC}"
                ((purged_files++))
            else
                log "${RED}❌ Error al reemplazar en: $file${NC}"
            fi
        fi
    done
    
    log "${GREEN}✅ Purga completada. Archivos procesados: $purged_files${NC}"
}

# Función para limpiar historial Git
clean_git_history() {
    log "${YELLOW}🧹 Limpiando historial Git...${NC}"
    
    # Crear script BFG para limpiar historial
    cat > bfg_cleanup.sh << 'EOF'
#!/bin/bash
# Script para limpiar claves API del historial Git usando BFG

# Instalar BFG si no está disponible
if ! command -v bfg &> /dev/null; then
    echo "Instalando BFG..."
    wget https://repo1.maven.org/maven2/com/madgag/bfg/1.14.0/bfg-1.14.0.jar -O bfg.jar
    alias bfg='java -jar bfg.jar'
fi

# Crear archivo de texto con claves a reemplazar
cat > api_keys_to_replace.txt << 'REPLACE_EOF'
AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8==>AIzaSyREPLACED_API_KEY_DO_NOT_USE
REPLACE_EOF

# Ejecutar BFG
bfg --replace-text api_keys_to_replace.txt

# Limpiar y forzar push
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo "Historial Git limpiado. Ejecuta: git push --force-with-lease"
EOF
    
    chmod +x bfg_cleanup.sh
    log "${GREEN}✅ Script BFG creado: bfg_cleanup.sh${NC}"
    log "${YELLOW}💡 Ejecuta manualmente: ./bfg_cleanup.sh${NC}"
}

# Función para crear .gitignore mejorado
create_gitignore() {
    log "${YELLOW}📝 Creando .gitignore mejorado...${NC}"
    
    cat >> .gitignore << 'EOF'

# API Keys y Secretos
*.key
*.pem
*.p12
*.pfx
*.crt
*.env
.env.local
.env.development
.env.test
.env.production

# Archivos de descarga que pueden contener claves
*descarga*
*download*
*temp*
*tmp*

# Logs de seguridad
api_keys_purge_*.log
security_audit_*.log

# Backups
backup_*/
*.backup

# Archivos de configuración con claves
config.json
secrets.json
credentials.json
EOF
    
    log "${GREEN}✅ .gitignore actualizado${NC}"
}

# Función para crear configuración de seguridad
create_security_config() {
    log "${YELLOW}🔒 Creando configuración de seguridad...${NC}"
    
    # Crear archivo de configuración de seguridad
    cat > .env.example << 'EOF'
# Configuración de APIs
# Copia este archivo como .env y configura tus credenciales

# Google APIs
GOOGLE_AI_API_KEY=your_google_ai_api_key_here
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
GOOGLE_ANALYTICS_ID=your_google_analytics_id_here

# Otras APIs
OPENAI_API_KEY=your_openai_api_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
AWS_ACCESS_KEY_ID=your_aws_access_key_here
AWS_SECRET_ACCESS_KEY=your_aws_secret_key_here

# Base de datos
DATABASE_URL=your_database_url_here
REDIS_URL=your_redis_url_here

# Configuración de la aplicación
NODE_ENV=development
PORT=3000
DEBUG=false

# Configuración de seguridad
JWT_SECRET=your_jwt_secret_here
SESSION_SECRET=your_session_secret_here
EOF
    
    # Crear archivo de configuración de pre-commit
    cat > .pre-commit-config.yaml << 'EOF'
repos:
  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.4.0
    hooks:
      - id: detect-secrets
        args: ['--baseline', '.secrets.baseline']
        exclude: ^(.secrets.baseline)$
  
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files
      - id: check-merge-conflict
EOF
    
    log "${GREEN}✅ Configuración de seguridad creada${NC}"
}

# Función para instalar herramientas de seguridad
install_security_tools() {
    log "${YELLOW}🛠️  Instalando herramientas de seguridad...${NC}"
    
    # Instalar detect-secrets si no está disponible
    if ! command -v detect-secrets &> /dev/null; then
        log "${YELLOW}📦 Instalando detect-secrets...${NC}"
        pip install detect-secrets
    fi
    
    # Instalar trufflehog si no está disponible
    if ! command -v trufflehog &> /dev/null; then
        log "${YELLOW}📦 Instalando trufflehog...${NC}"
        pip install trufflehog
    fi
    
    # Crear baseline de secretos
    detect-secrets scan --baseline .secrets.baseline
    
    log "${GREEN}✅ Herramientas de seguridad instaladas${NC}"
}

# Función principal
main() {
    log "${BLUE}🚀 Iniciando purga de claves API...${NC}"
    
    # Crear backup
    create_backup
    
    # Detectar claves API
    detect_api_keys
    
    # Purgar claves API
    purge_api_keys
    
    # Limpiar historial Git
    clean_git_history
    
    # Crear .gitignore mejorado
    create_gitignore
    
    # Crear configuración de seguridad
    create_security_config
    
    # Instalar herramientas de seguridad
    install_security_tools
    
    log "${GREEN}✅ Purga de claves API completada${NC}"
    log "${YELLOW}📋 Resumen:${NC}"
    log "  - Backup creado en: $BACKUP_DIR"
    log "  - Log guardado en: $LOG_FILE"
    log "  - Script BFG creado: bfg_cleanup.sh"
    log "  - Configuración de seguridad creada"
    log "  - Herramientas de seguridad instaladas"
    log ""
    log "${YELLOW}💡 Próximos pasos:${NC}"
    log "  1. Revisa el backup en: $BACKUP_DIR"
    log "  2. Ejecuta: ./bfg_cleanup.sh para limpiar historial Git"
    log "  3. Configura tus credenciales en .env"
    log "  4. Ejecuta: detect-secrets audit .secrets.baseline"
    log "  5. Configura pre-commit hooks"
}

# Ejecutar función principal
main "$@"
