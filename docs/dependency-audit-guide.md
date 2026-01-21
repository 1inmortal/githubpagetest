# 🔍 Guía de Auditoría de Dependencias

Esta guía explica cómo auditar y proteger las dependencias del proyecto contra vulnerabilidades y ataques a la cadena de suministro.

## 📋 Herramientas Disponibles

### 1. npm audit (Nativo)

La herramienta nativa de npm para auditar dependencias:

```bash
# Auditoría básica
npm audit

# Intentar arreglar automáticamente
npm audit fix

# Auditoría en formato JSON
npm audit --json
```

### 2. Script de Auditoría Completa

Script personalizado que integra múltiples herramientas:

```bash
npm run audit:dependencies
```

Este script ejecuta:
- ✅ npm audit
- ✅ Snyk (si está instalado)
- ✅ Socket (si está instalado)
- ✅ Verificación de versiones seguras

### 3. Fijar Versiones Seguras

Para fijar versiones de paquetes (pre-septiembre 2025):

```bash
npm run pin:versions
```

## 🛠️ Instalación de Herramientas Adicionales

### Snyk

Snyk es una herramienta de seguridad que escanea dependencias en busca de vulnerabilidades:

```bash
# Instalar Snyk globalmente
npm install -g snyk

# Autenticarse (requiere cuenta gratuita)
snyk auth

# Ejecutar auditoría
snyk test

# Monitorear proyecto
snyk monitor
```

### Socket

Socket detecta cambios sospechosos en paquetes npm:

```bash
# Instalar Socket CLI
npm install -g @socketsecurity/cli

# Ejecutar auditoría
socket ci
```

### JFrog Xray

JFrog Xray requiere una cuenta de JFrog y configuración adicional. Consulta la [documentación oficial](https://jfrog.com/integrations/npm-xray/).

## 🔒 Fijar Versiones Seguras

### ¿Por qué fijar versiones?

Después de los ataques masivos a npm en septiembre de 2025, es recomendable fijar versiones de paquetes a versiones publicadas antes de esa fecha para evitar paquetes comprometidos.

### Cómo funciona

El script `pin-secure-versions.js`:

1. **Identifica paquetes vulnerables**: Busca paquetes conocidos que fueron comprometidos
2. **Fija versiones**: Elimina `^` y `~` de las versiones para usar versiones exactas
3. **Usa versiones seguras**: Para paquetes comprometidos, usa versiones pre-septiembre 2025

### Ejemplo

**Antes:**
```json
{
  "dependencies": {
    "@google/genai": "^1.14.0",
    "chalk": "^4.1.2"
  }
}
```

**Después:**
```json
{
  "dependencies": {
    "@google/genai": "1.14.0",
    "chalk": "4.1.2"
  }
}
```

## 📊 Interpretar Reportes

Los reportes se guardan en `reports/dependency-audit-*.json` con:

- **npm_audit**: Resultados de npm audit
- **snyk_audit**: Resultados de Snyk (si está disponible)
- **socket_audit**: Resultados de Socket (si está disponible)
- **vulnerabilities**: Lista de vulnerabilidades encontradas
- **recommendations**: Recomendaciones de actualización

### Niveles de Severidad

- **Critical**: Requiere acción inmediata
- **High**: Debe resolverse pronto
- **Moderate**: Debe resolverse cuando sea posible
- **Low**: Puede resolverse en el futuro

## 🚨 Vulnerabilidades Conocidas

### jws 4.0.0 (GHSA-869p-cjfg-cm3x)

**Severidad**: Alta  
**Paquete afectado**: `@google/genai` (dependencia transitiva)

**Solución**:
1. Actualizar `@google/genai` a la última versión
2. Verificar que la nueva versión no use `jws@4.0.0`

```bash
npm update @google/genai
npm audit
```

## 🔄 Flujo de Trabajo Recomendado

1. **Auditoría regular**:
   ```bash
   npm run audit:dependencies
   ```

2. **Revisar reporte**:
   - Revisar `reports/dependency-audit-*.json`
   - Identificar vulnerabilidades críticas y altas

3. **Aplicar correcciones**:
   ```bash
   npm audit fix
   ```

4. **Fijar versiones** (opcional, para máxima seguridad):
   ```bash
   npm run pin:versions
   npm install
   ```

5. **Verificar**:
   ```bash
   npm audit
   npm test
   ```

## 📝 Integración con CI/CD

### GitHub Actions

```yaml
name: Dependency Audit

on:
  schedule:
    - cron: '0 0 * * 0'  # Semanal
  push:
    branches: [ main ]

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run audit:dependencies
      - uses: actions/upload-artifact@v3
        with:
          name: audit-report
          path: reports/
```

## 🔗 Recursos Adicionales

- [npm Security Best Practices](https://docs.npmjs.com/security-best-practices)
- [Snyk Documentation](https://docs.snyk.io/)
- [Socket Documentation](https://docs.socket.dev/)
- [GitHub Security Advisories](https://github.com/advisories)

## ⚠️ Notas Importantes

1. **Actualizaciones automáticas**: `npm audit fix` puede actualizar paquetes automáticamente. Revisa los cambios antes de hacer commit.

2. **Versiones fijadas**: Después de fijar versiones, necesitarás actualizar manualmente los paquetes cuando sea necesario.

3. **Dependencias transitivas**: Algunas vulnerabilidades pueden estar en dependencias transitivas. Usa `npm ls <package>` para rastrear el origen.

4. **Falsos positivos**: Algunas herramientas pueden reportar falsos positivos. Siempre verifica las vulnerabilidades reportadas.

## 🆘 Solución de Problemas

### npm audit no encuentra vulnerabilidades pero otras herramientas sí

Esto puede ocurrir porque:
- npm audit usa una base de datos diferente
- Las herramientas tienen diferentes criterios de detección
- Algunas vulnerabilidades son específicas de ciertas herramientas

**Solución**: Usa múltiples herramientas para una auditoría completa.

### No puedo actualizar un paquete debido a dependencias

**Solución**:
1. Usa `npm ls <package>` para ver el árbol de dependencias
2. Considera usar `npm audit fix --force` (con precaución)
3. Actualiza manualmente las dependencias que lo requieren

### Snyk/Socket no funcionan

**Solución**:
1. Verifica que estén instalados: `snyk --version` o `socket --version`
2. Para Snyk, autentícate: `snyk auth`
3. Revisa la documentación de cada herramienta

