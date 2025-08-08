#!/bin/bash

# Script de monitoreo continuo de secretos
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
CONFIG_FILE="config/secrets-management.json"
LOG_FILE="./secrets_monitor_$(date +%Y%m%d_%H%M%S).log"
SCAN_DIRS=("src" "config" "scripts")
EXCLUDED_DIRS=(".git" "node_modules" "dist" "build")

# Función para logging
log() {
    echo -e "$1" | tee -a "$LOG_FILE"
}

# Función para cargar configuración
load_config() {
    if [[ -f "$CONFIG_FILE" ]]; then
        log "${BLUE}📋 Cargando configuración desde $CONFIG_FILE${NC}"
        # Aquí se cargaría la configuración JSON
    else
        log "${YELLOW}⚠️ Archivo de configuración no encontrado, usando patrones por defecto${NC}"
    fi
}

# Función para escanear secretos
scan_secrets() {
    local found_secrets=0
    
    log "${BLUE}🔍 Iniciando escaneo de secretos...${NC}"
    
    # Patrones de búsqueda
    local patterns=(
        "AIzaSy[0-9A-Za-z_\\-]{35}"
        "sk-[0-9a-zA-Z]{48}"
        "pk_[0-9a-zA-Z]{48}"
        "ghp_[0-9a-zA-Z]{36}"
        "gho_[0-9a-zA-Z]{36}"
        "ghu_[0-9a-zA-Z]{36}"
        "ghs_[0-9a-zA-Z]{36}"
        "ghr_[0-9a-zA-Z]{36}"
    )
    
    for pattern in "${patterns[@]}"; do
        log "${BLUE}🔎 Buscando patrón: $pattern${NC}"
        
        for dir in "${SCAN_DIRS[@]}"; do
            if [[ -d "$dir" ]]; then
                local matches=$(find "$dir" -type f \( -name "*.js" -o -name "*.html" -o -name "*.json" -o -name "*.py" -o -name "*.sh" \) -exec grep -l "$pattern" {} \; 2>/dev/null || true)
                
                if [[ -n "$matches" ]]; then
                    log "${RED}❌ SECRETO DETECTADO en:${NC}"
                    echo "$matches" | while read -r file; do
                        log "${RED}   📄 $file${NC}"
                        ((found_secrets++))
                    done
                fi
            fi
        done
    done
    
    if [[ $found_secrets -eq 0 ]]; then
        log "${GREEN}✅ No se detectaron secretos en el escaneo${NC}"
    else
        log "${RED}🚨 Se detectaron $found_secrets archivos con secretos${NC}"
        return 1
    fi
}

# Función para verificar variables de entorno
check_env_vars() {
    log "${BLUE}🔧 Verificando variables de entorno...${NC}"
    
    local required_vars=("GOOGLE_API_KEY" "DATABASE_URL")
    local missing_vars=0
    
    for var in "${required_vars[@]}"; do
        if [[ -z "${!var:-}" ]]; then
            log "${YELLOW}⚠️ Variable de entorno faltante: $var${NC}"
            ((missing_vars++))
        else
            log "${GREEN}✅ Variable de entorno presente: $var${NC}"
        fi
    done
    
    if [[ $missing_vars -gt 0 ]]; then
        log "${YELLOW}⚠️ Faltan $missing_vars variables de entorno${NC}"
    fi
}

# Función para verificar archivos de configuración
check_config_files() {
    log "${BLUE}📁 Verificando archivos de configuración...${NC}"
    
    local config_files=(
        ".env"
        ".env.local"
        "config/secrets-management.json"
    )
    
    for file in "${config_files[@]}"; do
        if [[ -f "$file" ]]; then
            log "${GREEN}✅ Archivo de configuración presente: $file${NC}"
        else
            log "${YELLOW}⚠️ Archivo de configuración faltante: $file${NC}"
        fi
    done
}

# Función para generar reporte
generate_report() {
    local report_file="./secrets_report_$(date +%Y%m%d_%H%M%S).json"
    
    log "${BLUE}📊 Generando reporte de seguridad...${NC}"
    
    cat > "$report_file" << EOF
{
  "scan_date": "$(date -Iseconds)",
  "scan_duration": "$SECONDS segundos",
  "files_scanned": $(find "${SCAN_DIRS[@]}" -type f \( -name "*.js" -o -name "*.html" -o -name "*.json" -o -name "*.py" -o -name "*.sh" \) | wc -l),
  "secrets_found": $found_secrets,
  "status": "$([[ $found_secrets -eq 0 ]] && echo "clean" || echo "vulnerable")",
  "recommendations": [
    "Usar variables de entorno para secretos",
    "Implementar rotación automática de claves",
    "Configurar alertas de seguridad",
    "Revisar permisos de archivos"
  ]
}
EOF
    
    log "${GREEN}📄 Reporte generado: $report_file${NC}"
}

# Función principal
main() {
    log "${BLUE}🛡️ Iniciando monitoreo de secretos${NC}"
    log "${BLUE}⏰ Fecha: $(date)${NC}"
    
    SECONDS=0
    
    # Cargar configuración
    load_config
    
    # Verificar archivos de configuración
    check_config_files
    
    # Verificar variables de entorno
    check_env_vars
    
    # Escanear secretos
    if scan_secrets; then
        log "${GREEN}✅ Escaneo completado exitosamente${NC}"
    else
        log "${RED}❌ Se detectaron secretos en el repositorio${NC}"
        log "${YELLOW}💡 Recomendaciones:${NC}"
        log "${YELLOW}   - Revisar y purgar secretos detectados${NC}"
        log "${YELLOW}   - Usar variables de entorno${NC}"
        log "${YELLOW}   - Implementar git hooks de seguridad${NC}"
    fi
    
    # Generar reporte
    generate_report
    
    log "${BLUE}🏁 Monitoreo completado en $SECONDS segundos${NC}"
}

# Ejecutar función principal
main "$@"
