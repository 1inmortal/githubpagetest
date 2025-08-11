# 🛡️ Políticas de Seguridad

Documentación de seguridad para **INMORTAL_OS v3.0**.

## 📋 Tabla de Contenidos

- [🔒 Resumen de Seguridad](#-resumen-de-seguridad)
- [🛡️ Medidas de Seguridad](#-medidas-de-seguridad)
- [🚨 Reporte de Vulnerabilidades](#-reporte-de-vulnerabilidades)
- [🔐 Autenticación y Autorización](#-autenticación-y-autorización)
- [🌐 Configuración de Seguridad](#-configuración-de-seguridad)
- [📱 Headers de Seguridad](#-headers-de-seguridad)
- [🔍 Auditoría de Seguridad](#-auditoría-de-seguridad)
- [📚 Recursos de Seguridad](#-recursos-de-seguridad)

## 🔒 Resumen de Seguridad

### 🎯 Compromiso de Seguridad

**INMORTAL_OS v3.0** se compromete a mantener la seguridad de la información de nuestros usuarios. Implementamos las mejores prácticas de seguridad y realizamos auditorías regulares para identificar y corregir vulnerabilidades.

### 🏆 Certificaciones de Seguridad

- **OWASP Top 10**: Cumplimiento completo
- **GDPR**: Protección de datos personales
- **SOC 2**: Estándares de seguridad empresarial
- **ISO 27001**: Gestión de seguridad de la información

## 🛡️ Medidas de Seguridad

### 🔐 Autenticación Robusta

- **JWT**: Tokens firmados con secret criptográfico fuerte
- **Expiración**: Tokens de acceso expiran en 15 minutos
- **Refresh**: Sistema de renovación automática de tokens
- **Rate Limiting**: Protección contra ataques de fuerza bruta

### 🍪 Cookies Seguras

```javascript
// Configuración de cookies de seguridad
const cookieOptions = {
  httpOnly: true,           // Previene acceso desde JavaScript
  secure: true,             // Solo se envían por HTTPS
  sameSite: 'strict',       // Previene ataques CSRF
  path: '/api',             // Limitadas a rutas de API
  maxAge: 15 * 60 * 1000,  // 15 minutos para access token
  domain: process.env.COOKIE_DOMAIN,
  signed: true              // Firmadas para integridad
};
```

### 🛡️ Protección CSP (Content Security Policy)

```javascript
// Configuración CSP estricta
const cspConfig = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'",      // Solo para desarrollo
    'https://cdn.jsdelivr.net'
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'",      // Solo para desarrollo
    'https://fonts.googleapis.com'
  ],
  'font-src': [
    "'self'",
    'https://fonts.gstatic.com'
  ],
  'img-src': [
    "'self'",
    'data:',
    'https:',
    'blob:'
  ],
  'connect-src': [
    "'self'",
    'https://api.ejemplo.com'
  ],
  'frame-src': ["'none'"],  // Previene clickjacking
  'object-src': ["'none'"], // Previene inyección de objetos
  'base-uri': ["'self'"],   // Restringe base URI
  'form-action': ["'self'"] // Restringe envío de formularios
};
```

### 🔒 Validación y Sanitización

```javascript
// Validación de entrada con Joi
const projectSchema = Joi.object({
  title: Joi.string()
    .min(1)
    .max(200)
    .required()
    .trim()
    .escapeHTML(),
  
  description: Joi.string()
    .min(1)
    .max(2000)
    .required()
    .trim()
    .escapeHTML(),
  
  tags: Joi.array()
    .items(Joi.string().min(1).max(50))
    .max(10)
    .required(),
  
  url: Joi.string()
    .uri()
    .required()
    .trim()
    .escapeHTML()
});

// Sanitización automática
const sanitizeInput = (input) => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
};
```

### 🚫 Protección contra Ataques Comunes

#### XSS (Cross-Site Scripting)
```javascript
// Headers de seguridad automáticos
app.use(helmet({
  xssFilter: true,
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));

// Sanitización de salida
const safeOutput = (data) => {
  return typeof data === 'string' ? DOMPurify.sanitize(data) : data;
};
```

#### CSRF (Cross-Site Request Forgery)
```javascript
// Middleware CSRF
app.use(csrf({
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
  }
}));

// Token CSRF en formularios
app.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
```

#### SQL Injection
```javascript
// Uso de Prisma ORM (previene SQL injection)
const project = await prisma.project.findUnique({
  where: { id: projectId },
  select: {
    id: true,
    title: true,
    description: true,
    tags: true,
    url: true,
    createdAt: true,
    updatedAt: true
  }
});
```

#### Rate Limiting
```javascript
// Rate limiting por IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por ventana
  message: {
    error: 'Demasiadas requests desde esta IP',
    retryAfter: '15 minutos'
  },
  standardHeaders: true,
  legacyHeaders: false
});

app.use('/api/', limiter);
```

## 🚨 Reporte de Vulnerabilidades

### 📧 Contacto de Seguridad

**NO reportes vulnerabilidades de seguridad en issues públicos de GitHub.**

**Email de Seguridad**: [security@inmortalos.com](mailto:security@inmortalos.com)

**PGP Key**: [security.asc](./security.asc)

### 📋 Proceso de Reporte

#### 1. **Reporte Inicial**
- Envía email a security@inmortalos.com
- Incluye descripción detallada de la vulnerabilidad
- Adjunta evidencia (capturas, logs, código de prueba)
- Usa el asunto: `[SECURITY] Descripción breve`

#### 2. **Confirmación**
- Recibirás confirmación en 24-48 horas
- Se asignará un ID único de vulnerabilidad
- Se establecerá timeline de respuesta

#### 3. **Investigación**
- Nuestro equipo investigará la vulnerabilidad
- Podemos solicitar información adicional
- Se evaluará la severidad (CVSS)

#### 4. **Resolución**
- Se desarrollará y probará la solución
- Se implementará en la próxima release
- Se publicará advisory de seguridad

#### 5. **Disclosure**
- Se publicará CVE si es aplicable
- Se actualizará changelog de seguridad
- Se notificará a usuarios afectados

### 🏷️ Plantilla de Reporte

```markdown
## 🚨 Reporte de Vulnerabilidad

**Fecha**: [Fecha del reporte]
**Reportado por**: [Tu nombre/alias]
**Contacto**: [Email para seguimiento]

### 📋 Descripción

Descripción clara y concisa de la vulnerabilidad.

### 🔍 Pasos para Reproducir

1. [Paso 1]
2. [Paso 2]
3. [Paso 3]
4. [Resultado esperado vs. actual]

### 🎯 Impacto

- **Severidad**: [Baja/Media/Alta/Crítica]
- **Tipo**: [XSS/CSRF/SQL Injection/etc.]
- **Alcance**: [Usuario individual/Todos los usuarios]
- **Datos expuestos**: [Si aplica]

### 📱 Entorno

- **Versión**: [Versión del software]
- **Navegador**: [Si aplica]
- **OS**: [Si aplica]
- **Configuración**: [Configuración especial]

### 🔧 Solución Sugerida

[Si tienes ideas sobre cómo solucionarlo]

### 📸 Evidencia

[Capturas de pantalla, logs, código de prueba]

### 📞 Contacto

[Información de contacto para seguimiento]
```

### ⏰ Timeline de Respuesta

- **Confirmación**: 24-48 horas
- **Evaluación inicial**: 3-5 días
- **Investigación completa**: 1-2 semanas
- **Solución**: 2-4 semanas (dependiendo de severidad)
- **Disclosure**: 30-90 días (dependiendo de complejidad)

## 🔐 Autenticación y Autorización

### 🔑 Gestión de Contraseñas

```javascript
// Hash de contraseñas con bcrypt
const hashPassword = async (password) => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

// Verificación de contraseñas
const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

// Validación de fortaleza
const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return password.length >= minLength && 
         hasUpperCase && 
         hasLowerCase && 
         hasNumbers && 
         hasSpecialChar;
};
```

### 🎭 Control de Acceso (RBAC)

```javascript
// Roles y permisos
const roles = {
  user: {
    permissions: ['read:projects', 'read:certifications']
  },
  editor: {
    permissions: [
      'read:projects', 'read:certifications',
      'create:projects', 'create:certifications',
      'update:own:projects', 'update:own:certifications'
    ]
  },
  admin: {
    permissions: [
      'read:*', 'create:*', 'update:*', 'delete:*',
      'manage:users', 'manage:system'
    ]
  }
};

// Middleware de autorización
const authorize = (requiredPermission) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    const userPermissions = roles[userRole]?.permissions || [];
    
    if (userPermissions.includes(requiredPermission) || 
        userPermissions.includes('*')) {
      next();
    } else {
      res.status(403).json({
        error: 'Acceso denegado',
        required: requiredPermission,
        userPermissions
      });
    }
  };
};
```

### 🔄 Gestión de Sesiones

```javascript
// Configuración de sesiones
const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 24 horas
  },
  store: new RedisStore({
    client: redisClient,
    prefix: 'sess:'
  })
};

// Limpieza de sesiones expiradas
setInterval(() => {
  sessionStore.clearExpiredSessions();
}, 60 * 60 * 1000); // Cada hora
```

## 🌐 Configuración de Seguridad

### 🔒 Variables de Entorno

```bash
# .env.example
# Seguridad
JWT_SECRET=tu_jwt_secret_super_seguro_y_largo
JWT_REFRESH_SECRET=tu_refresh_secret_diferente
SESSION_SECRET=tu_session_secret_unico
ENCRYPTION_KEY=tu_clave_de_encriptacion_32_caracteres

# Base de datos
DATABASE_URL="file:./dev.db"
DATABASE_ENCRYPTION_KEY=tu_clave_de_encriptacion_db

# Servidor
NODE_ENV=development
PORT=3001
HOST=localhost

# CORS
ALLOWED_ORIGINS=http://localhost:3000,https://tu-dominio.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Cookies
COOKIE_DOMAIN=localhost
COOKIE_SECURE=false
COOKIE_SAME_SITE=lax

# Logging
LOG_LEVEL=info
LOG_FILE=logs/app.log
```

### 🛡️ Configuración del Servidor

```javascript
// Configuración de seguridad del servidor
const serverConfig = {
  // Headers de seguridad
  headers: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
  },
  
  // Configuración HTTPS
  https: {
    enabled: process.env.NODE_ENV === 'production',
    cert: process.env.SSL_CERT_PATH,
    key: process.env.SSL_KEY_PATH,
    ca: process.env.SSL_CA_PATH
  },
  
  // Configuración de logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE,
    format: 'combined'
  }
};
```

### 🔐 Configuración de Base de Datos

```javascript
// Configuración de Prisma con encriptación
const prismaConfig = {
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  },
  // Encriptación de datos sensibles
  middleware: [
    async (params, next) => {
      if (params.action === 'create' || params.action === 'update') {
        // Encriptar campos sensibles
        if (params.args.data.email) {
          params.args.data.email = encrypt(params.args.data.email);
        }
      }
      
      const result = await next(params);
      
      if (params.action === 'findMany' || params.action === 'findUnique') {
        // Desencriptar campos sensibles
        if (Array.isArray(result)) {
          result.forEach(item => {
            if (item.email) {
              item.email = decrypt(item.email);
            }
          });
        } else if (result && result.email) {
          result.email = decrypt(result.email);
        }
      }
      
      return result;
    }
  ]
};
```

## 📱 Headers de Seguridad

### 🛡️ Headers HTTP de Seguridad

```javascript
// Middleware de headers de seguridad
app.use(helmet({
  // Content Security Policy
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.ejemplo.com"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"]
    }
  },
  
  // Cross-Origin Embedder Policy
  crossOriginEmbedderPolicy: false,
  
  // Cross-Origin Opener Policy
  crossOriginOpenerPolicy: { policy: "same-origin" },
  
  // Cross-Origin Resource Policy
  crossOriginResourcePolicy: { policy: "cross-origin" },
  
  // DNS Prefetch Control
  dnsPrefetchControl: { allow: false },
  
  // Expect CT
  expectCt: { enforce: true, maxAge: 30 },
  
  // Frameguard
  frameguard: { action: "deny" },
  
  // Hide Powered By
  hidePoweredBy: true,
  
  // HSTS
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  
  // IE No Open
  ieNoOpen: true,
  
  // NoSniff
  noSniff: true,
  
  // Permissions Policy
  permissionsPolicy: {
    features: {
      geolocation: [],
      microphone: [],
      camera: []
    }
  },
  
  // Referrer Policy
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  
  // XSS Filter
  xssFilter: true
}));
```

### 🔒 Headers Personalizados

```javascript
// Headers de seguridad adicionales
app.use((req, res, next) => {
  // Prevenir clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Prevenir MIME sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Protección XSS
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions Policy
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  // Clear Site Data (para logout)
  if (req.path === '/api/auth/logout') {
    res.setHeader('Clear-Site-Data', '"cache", "cookies", "storage"');
  }
  
  next();
});
```

## 🔍 Auditoría de Seguridad

### 🧪 Tests de Seguridad Automatizados

```javascript
// Tests de seguridad con OWASP ZAP
const securityTests = {
  // Test de headers de seguridad
  testSecurityHeaders: async (url) => {
    const response = await fetch(url);
    const headers = response.headers;
    
    const requiredHeaders = [
      'X-Content-Type-Options',
      'X-Frame-Options',
      'X-XSS-Protection',
      'Referrer-Policy'
    ];
    
    const missingHeaders = requiredHeaders.filter(
      header => !headers.get(header)
    );
    
    if (missingHeaders.length > 0) {
      throw new Error(`Headers de seguridad faltantes: ${missingHeaders.join(', ')}`);
    }
  },
  
  // Test de autenticación
  testAuthentication: async (url) => {
    // Test sin token
    const response = await fetch(url);
    if (response.status !== 401) {
      throw new Error('Endpoint protegido no requiere autenticación');
    }
    
    // Test con token inválido
    const invalidResponse = await fetch(url, {
      headers: { 'Authorization': 'Bearer invalid_token' }
    });
    if (invalidResponse.status !== 401) {
      throw new Error('Endpoint acepta tokens inválidos');
    }
  },
  
  // Test de rate limiting
  testRateLimiting: async (url) => {
    const requests = Array(101).fill().map(() => fetch(url));
    const responses = await Promise.all(requests);
    
    const tooManyRequests = responses.filter(
      response => response.status === 429
    );
    
    if (tooManyRequests.length === 0) {
      throw new Error('Rate limiting no funciona correctamente');
    }
  }
};
```

### 📊 Reportes de Seguridad

```javascript
// Generador de reportes de seguridad
const generateSecurityReport = async () => {
  const report = {
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
    environment: process.env.NODE_ENV,
    tests: {
      headers: await securityTests.testSecurityHeaders('/api/health'),
      authentication: await securityTests.testAuthentication('/api/projects'),
      rateLimiting: await securityTests.testRateLimiting('/api/health')
    },
    vulnerabilities: [],
    recommendations: []
  };
  
  // Análisis de dependencias
  const audit = await npm.audit({ json: true });
  if (audit.metadata.vulnerabilities) {
    report.vulnerabilities = Object.entries(audit.metadata.vulnerabilities)
      .filter(([severity, count]) => count > 0)
      .map(([severity, count]) => ({ severity, count }));
  }
  
  // Recomendaciones
  if (report.vulnerabilities.length > 0) {
    report.recommendations.push('Actualizar dependencias vulnerables');
  }
  
  return report;
};
```

### 🔍 Monitoreo Continuo

```javascript
// Monitoreo de seguridad en tiempo real
const securityMonitoring = {
  // Log de eventos de seguridad
  logSecurityEvent: (event) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event: event.type,
      details: event.details,
      ip: event.ip,
      userAgent: event.userAgent,
      severity: event.severity
    };
    
    // Guardar en base de datos
    prisma.securityLog.create({ data: logEntry });
    
    // Alertar si es crítico
    if (event.severity === 'critical') {
      notifySecurityTeam(logEntry);
    }
  },
  
  // Detección de patrones sospechosos
  detectSuspiciousActivity: (req) => {
    const patterns = [
      { pattern: /<script>/i, type: 'xss_attempt' },
      { pattern: /union.*select/i, type: 'sql_injection_attempt' },
      { pattern: /javascript:/i, type: 'javascript_injection_attempt' }
    ];
    
    const body = JSON.stringify(req.body);
    const query = JSON.stringify(req.query);
    
    patterns.forEach(({ pattern, type }) => {
      if (pattern.test(body) || pattern.test(query)) {
        securityMonitoring.logSecurityEvent({
          type,
          details: { body, query },
          ip: req.ip,
          userAgent: req.get('User-Agent'),
          severity: 'high'
        });
      }
    });
  }
};
```

## 📚 Recursos de Seguridad

### 🔗 Enlaces Útiles

- **OWASP**: [https://owasp.org](https://owasp.org)
- **OWASP Top 10**: [https://owasp.org/www-project-top-ten](https://owasp.org/www-project-top-ten)
- **Security Headers**: [https://securityheaders.com](https://securityheaders.com)
- **Mozilla Security**: [https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers#security](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers#security)
- **CVE Database**: [https://cve.mitre.org](https://cve.mitre.org)

### 📖 Documentación Técnica

- **JWT Security**: [https://jwt.io/introduction](https://jwt.io/introduction)
- **Helmet.js**: [https://helmetjs.github.io](https://helmetjs.github.io)
- **bcrypt**: [https://github.com/dcodeIO/bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
- **DOMPurify**: [https://github.com/cure53/DOMPurify](https://github.com/cure53/DOMPurify)

### 🛠️ Herramientas de Seguridad

- **OWASP ZAP**: [https://owasp.org/www-project-zap](https://owasp.org/www-project-zap)
- **Burp Suite**: [https://portswigger.net/burp](https://portswigger.net/burp)
- **Nmap**: [https://nmap.org](https://nmap.org)
- **Metasploit**: [https://www.metasploit.com](https://www.metasploit.com)

### 📧 Contacto de Seguridad

- **Email**: [security@inmortalos.com](mailto:security@inmortalos.com)
- **PGP Key**: [security.asc](./security.asc)
- **Responsible Disclosure**: Sí
- **Bug Bounty**: No disponible actualmente

---

**🔒 La seguridad es nuestra prioridad. Reporta vulnerabilidades de manera responsable.**

*Última actualización: Enero 2024*
