# Mejores Prácticas de Seguridad

Este documento describe las implementaciones de seguridad para prevenir inyecciones SQL y ataques XSS en el proyecto.

## Problemas Identificados y Soluciones

### 1. Función `escapeQuotes` Insegura

**Problema Original:**
```javascript
function escapeQuotes(s) {
    return s.replace("'", "''"); // ❌ Solo reemplaza la PRIMERA comilla
}
```

**Solución Implementada:**
```javascript
function escapeQuotes(s) {
    if (typeof s !== 'string') {
        return '';
    }
    
    // ✅ ESCAPAR TODAS las comillas simples usando regex con bandera global
    return s.replace(/'/g, "''");
}
```

### 2. Sanitización HTML Básica

**Problema Original:**
```javascript
function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML; // ❌ No previene todos los ataques XSS
}
```

**Solución Implementada:**
```javascript
function sanitizeHTML(str) {
    if (typeof str !== 'string') {
        return '';
    }
    
    const temp = document.createElement('div');
    temp.textContent = str;
    
    let sanitized = temp.innerHTML;
    
    // ✅ Eliminar scripts maliciosos
    sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    // ✅ Eliminar eventos inline
    sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
    
    // ✅ Eliminar javascript: en href
    sanitized = sanitized.replace(/href\s*=\s*["']\s*javascript:/gi, 'href="#"');
    
    return sanitized;
}
```

### 3. Archivos PHP Inseguros

**Problema Original:**
```php
$name = strip_tags(htmlspecialchars($_POST['name']));
$email = strip_tags(htmlspecialchars($_POST['email']));
// ❌ Validación básica, no previene inyecciones SQL
```

**Solución Implementada:**
```php
function sanitizeInput($input, $type = 'text') {
    if (empty($input)) {
        return '';
    }
    
    $input = trim($input);
    
    switch ($type) {
        case 'email':
            // ✅ Validar formato de email
            if (!filter_var($input, FILTER_VALIDATE_EMAIL)) {
                return false;
            }
            return filter_var($input, FILTER_SANITIZE_EMAIL);
            
        case 'name':
            // ✅ Solo permitir caracteres seguros
            if (!preg_match('/^[a-zA-ZÀ-ÿ\s\-\']+$/', $input)) {
                return false;
            }
            return htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
    }
}

// ✅ Función mejorada para escapar comillas SQL
function escapeQuotes($s) {
    if (!is_string($s)) {
        return '';
    }
    
    return str_replace("'", "''", $s);
}
```

## Bibliotecas Recomendadas

### Para JavaScript/Node.js

1. **DOMPurify** - Para sanitización HTML
```bash
npm install dompurify
```

2. **sqlstring** - Para consultas SQL seguras
```bash
npm install sqlstring
```

3. **validator.js** - Para validación de entrada
```bash
npm install validator
```

### Para PHP

1. **HTML Purifier** - Para sanitización HTML
```bash
composer require ezyang/htmlpurifier
```

2. **PDO** - Para consultas SQL preparadas
```php
$stmt = $pdo->prepare("INSERT INTO users (name, email) VALUES (?, ?)");
$stmt->execute([$name, $email]);
```

## Ejemplos de Uso

### JavaScript - Validación de Formularios

```javascript
// Usar las funciones de seguridad
const formData = SecurityUtils.sanitizeForm(document.getElementById('contact-form'));

if (formData.isValid) {
    // Enviar datos sanitizados
    console.log('Datos válidos:', formData.data);
} else {
    // Mostrar errores
    console.error('Errores:', formData.errors);
}
```

### PHP - Consultas SQL Seguras

```php
// ❌ INSEGURO - Inyección SQL posible
$query = "SELECT * FROM users WHERE name = '$name'";

// ✅ SEGURO - Usar prepared statements
$stmt = $pdo->prepare("SELECT * FROM users WHERE name = ?");
$stmt->execute([$name]);

// ✅ SEGURO - Usar función de escape mejorada
$safeName = escapeQuotes($name);
$query = "SELECT * FROM users WHERE name = '$safeName'";
```

### JavaScript - Crear Elementos HTML Seguros

```javascript
// ❌ INSEGURO - XSS posible
element.innerHTML = userInput;

// ✅ SEGURO - Usar función de sanitización
element.innerHTML = SecurityUtils.sanitizeHTML(userInput);

// ✅ SEGURO - Crear elementos de forma segura
const safeElement = SecurityUtils.createSafeElement('div', {
    'class': 'user-content'
}, userInput);
```

## Headers de Seguridad

### Headers HTTP Recomendados

```php
// Configurar headers de seguridad
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
header('Content-Security-Policy: default-src \'self\'');
```

### Headers para Apache (.htaccess)

```apache
# Headers de seguridad
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Content-Security-Policy "default-src 'self'"
```

## Validación de Entrada

### Tipos de Validación Implementados

1. **Email** - Validar formato de email
2. **Nombre** - Solo letras, espacios, guiones y apóstrofes
3. **Número** - Solo dígitos
4. **Texto** - Eliminar caracteres peligrosos

### Ejemplo de Validación

```javascript
const validation = SecurityUtils.validateAndSanitizeInput(userInput, 'email');

if (validation.isValid) {
    // Usar validation.sanitized
    console.log('Email válido:', validation.sanitized);
} else {
    // Mostrar validation.error
    console.error('Error:', validation.error);
}
```

## Prevención de Ataques Comunes

### 1. Inyección SQL

**Ataque:**
```sql
'; DROP TABLE users; --
```

**Prevención:**
- Usar prepared statements
- Escapar TODAS las comillas con bandera global
- Validar tipos de entrada

### 2. Cross-Site Scripting (XSS)

**Ataque:**
```html
<script>alert('XSS')</script>
```

**Prevención:**
- Sanitizar HTML con DOMPurify
- Usar `textContent` en lugar de `innerHTML`
- Validar entrada de usuario

### 3. Inyección de Comandos

**Ataque:**
```bash
rm -rf /; echo "hacked"
```

**Prevención:**
- Validar entrada estrictamente
- Usar listas blancas de comandos permitidos
- Escapar caracteres especiales

## Referencias

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE-20: Improper Input Validation](https://cwe.mitre.org/data/definitions/20.html)
- [CWE-80: XSS](https://cwe.mitre.org/data/definitions/80.html)
- [CWE-116: SQL Injection](https://cwe.mitre.org/data/definitions/116.html)
- [npm: sqlstring](https://www.npmjs.com/package/sqlstring)
- [npm: DOMPurify](https://www.npmjs.com/package/dompurify)

## Auditoría de Seguridad

Para verificar que las mejoras están implementadas correctamente:

1. **Revisar funciones de escape** - Asegurar que usen bandera global
2. **Verificar sanitización HTML** - Probar con payloads XSS
3. **Validar consultas SQL** - Usar prepared statements
4. **Revisar headers de seguridad** - Implementar CSP
5. **Auditoría de código** - Usar herramientas como CodeQL

## Comandos de Verificación

```bash
# Verificar vulnerabilidades con npm audit
npm audit

# Verificar dependencias con seguridad
npm audit fix

# Verificar con herramientas de seguridad
npx eslint --ext .js,.ts --config .eslintrc.security.js
```
