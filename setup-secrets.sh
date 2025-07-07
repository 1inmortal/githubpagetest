#!/bin/bash

# Script para configurar secretos en GitHub Actions
# Autor: Sistema de Auditoría de Seguridad
# Fecha: $(date)

echo "🔐 Configurando secretos para GitHub Actions..."
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para verificar si gh CLI está instalado
check_gh_cli() {
    if ! command -v gh &> /dev/null; then
        echo -e "${RED}❌ GitHub CLI (gh) no está instalado${NC}"
        echo -e "${YELLOW}💡 Instala GitHub CLI desde: https://cli.github.com/${NC}"
        exit 1
    fi
    
    # Verificar si está autenticado
    if ! gh auth status &> /dev/null; then
        echo -e "${RED}❌ No estás autenticado en GitHub CLI${NC}"
        echo -e "${YELLOW}💡 Ejecuta: gh auth login${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ GitHub CLI está instalado y autenticado${NC}"
}

# Función para mostrar comandos de configuración
show_setup_commands() {
    echo -e "${BLUE}📋 COMANDOS PARA CONFIGURAR SECRETOS:${NC}"
    echo ""
    
    echo -e "${YELLOW}🔧 Secretos de Docker Hub:${NC}"
    echo "gh secret set DOCKER_USERNAME --body \"tu_docker_username\""
    echo "gh secret set DOCKER_PASSWORD --body \"tu_docker_password\""
    echo ""
    
    echo -e "${YELLOW}☁️  Secretos de Azure (nuevos nombres):${NC}"
    echo "gh secret set AZURE_CLIENT_ID --body \"tu_azure_client_id\""
    echo "gh secret set AZURE_TENANT_ID --body \"tu_azure_tenant_id\""
    echo "gh secret set AZURE_SUBSCRIPTION_ID --body \"tu_azure_subscription_id\""
    echo ""
    
    echo -e "${YELLOW}🗑️  Comandos para eliminar secretos antiguos (después de verificar):${NC}"
    echo "gh secret delete AZUREAPPSERVICE_CLIENTID_50916B56A1E54F7E8A271114431680E9"
    echo "gh secret delete AZUREAPPSERVICE_TENANTID_640BE7320F1F4152843291CF35C38EA9"
    echo "gh secret delete AZUREAPPSERVICE_SUBSCRIPTIONID_E6CFEE2E249A45E59D4C0F467B441DBE"
    echo ""
}

# Función para configurar secretos interactivamente
interactive_setup() {
    echo -e "${BLUE}🤖 CONFIGURACIÓN INTERACTIVA DE SECRETOS${NC}"
    echo ""
    
    read -p "¿Deseas configurar los secretos ahora? (s/n): " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        echo -e "${YELLOW}🔧 Configurando secretos de Docker Hub...${NC}"
        
        read -p "Docker Username: " docker_username
        if [ ! -z "$docker_username" ]; then
            gh secret set DOCKER_USERNAME --body "$docker_username"
            echo -e "${GREEN}✅ DOCKER_USERNAME configurado${NC}"
        fi
        
        read -s -p "Docker Password: " docker_password
        echo ""
        if [ ! -z "$docker_password" ]; then
            gh secret set DOCKER_PASSWORD --body "$docker_password"
            echo -e "${GREEN}✅ DOCKER_PASSWORD configurado${NC}"
        fi
        
        echo ""
        echo -e "${YELLOW}☁️  Configurando secretos de Azure...${NC}"
        
        read -p "Azure Client ID: " azure_client_id
        if [ ! -z "$azure_client_id" ]; then
            gh secret set AZURE_CLIENT_ID --body "$azure_client_id"
            echo -e "${GREEN}✅ AZURE_CLIENT_ID configurado${NC}"
        fi
        
        read -p "Azure Tenant ID: " azure_tenant_id
        if [ ! -z "$azure_tenant_id" ]; then
            gh secret set AZURE_TENANT_ID --body "$azure_tenant_id"
            echo -e "${GREEN}✅ AZURE_TENANT_ID configurado${NC}"
        fi
        
        read -p "Azure Subscription ID: " azure_subscription_id
        if [ ! -z "$azure_subscription_id" ]; then
            gh secret set AZURE_SUBSCRIPTION_ID --body "$azure_subscription_id"
            echo -e "${GREEN}✅ AZURE_SUBSCRIPTION_ID configurado${NC}"
        fi
        
        echo ""
        echo -e "${GREEN}✅ Todos los secretos configurados exitosamente${NC}"
    else
        echo -e "${YELLOW}ℹ️  Configuración manual requerida${NC}"
    fi
}

# Función para verificar secretos existentes
check_existing_secrets() {
    echo -e "${BLUE}🔍 VERIFICANDO SECRETOS EXISTENTES${NC}"
    echo ""
    
    # Listar secretos existentes
    if gh secret list &> /dev/null; then
        echo -e "${GREEN}✅ Secretos existentes:${NC}"
        gh secret list
    else
        echo -e "${YELLOW}⚠️  No se pudieron listar los secretos existentes${NC}"
    fi
    echo ""
}

# Función para mostrar resumen de workflows
show_workflow_summary() {
    echo -e "${BLUE}📊 RESUMEN DE WORKFLOWS Y SECRETOS${NC}"
    echo ""
    
    echo -e "${GREEN}✅ Workflows sin problemas:${NC}"
    echo "  • secret-scan.yml (0 secretos)"
    echo "  • publish-ghcr.yml (GITHUB_TOKEN automático)"
    echo "  • codeql.yml (0 secretos)"
    echo ""
    
    echo -e "${YELLOW}⚠️  Workflows que requieren secretos:${NC}"
    echo "  • main_webapp-inmortal.yml (Azure - 3 secretos)"
    echo "  • pull-image.yml (Docker Hub - 2 secretos)"
    echo "  • publish-image.yml (Docker Hub - 2 secretos)"
    echo ""
    
    echo -e "${RED}🚨 Secretos problemáticos encontrados:${NC}"
    echo "  • AZUREAPPSERVICE_CLIENTID_50916B56A1E54F7E8A271114431680E9 (67 chars)"
    echo "  • AZUREAPPSERVICE_TENANTID_640BE7320F1F4152843291CF35C38EA9 (67 chars)"
    echo "  • AZUREAPPSERVICE_SUBSCRIPTIONID_E6CFEE2E249A45E59D4C0F467B441DBE (67 chars)"
    echo ""
}

# Función para mostrar recomendaciones
show_recommendations() {
    echo -e "${BLUE}🛡️  RECOMENDACIONES DE SEGURIDAD${NC}"
    echo ""
    echo "1. 🔄 Rotación regular: Cambia los secretos cada 90 días"
    echo "2. 🔒 Principio de mínimo privilegio: Usa solo permisos necesarios"
    echo "3. 📋 Auditoría: Revisa regularmente qué workflows usan cada secreto"
    echo "4. 🏷️  Nombres descriptivos: Usa nombres que indiquen claramente el propósito"
    echo "5. 🌍 Separación de entornos: Usa diferentes secretos para dev/staging/prod"
    echo "6. 🔍 Monitoreo: Configura alertas para uso inusual de secretos"
    echo ""
}

# Función principal
main() {
    echo "🔐 ========================================="
    echo "   CONFIGURADOR DE SECRETOS GITHUB ACTIONS"
    echo "========================================="
    echo ""
    
    # Verificar GitHub CLI
    check_gh_cli
    
    # Mostrar resumen
    show_workflow_summary
    
    # Verificar secretos existentes
    check_existing_secrets
    
    # Mostrar comandos
    show_setup_commands
    
    # Configuración interactiva
    interactive_setup
    
    # Mostrar recomendaciones
    show_recommendations
    
    echo -e "${GREEN}✅ Configuración completada${NC}"
    echo ""
    echo -e "${YELLOW}💡 Próximos pasos:${NC}"
    echo "1. Verifica que todos los workflows se ejecuten correctamente"
    echo "2. Elimina los secretos antiguos después de confirmar que todo funciona"
    echo "3. Configura alertas de seguridad para monitoreo continuo"
    echo ""
}

# Ejecutar función principal
main 