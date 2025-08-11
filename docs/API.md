# 📚 Documentación de la API

Documentación completa de la API REST de **INMORTAL_OS v3.0**.

## 📋 Tabla de Contenidos

- [🔐 Autenticación](#-autenticación)
- [📊 Endpoints](#-endpoints)
- [🔧 Ejemplos de Uso](#-ejemplos-de-uso)
- [📝 Códigos de Estado](#-códigos-de-estado)
- [🛡️ Seguridad](#-seguridad)
- [📱 SDKs y Clientes](#-sdks-y-clientes)

## 🔐 Autenticación

### JWT (JSON Web Tokens)

La API usa JWT para autenticación. Los tokens se envían en el header `Authorization`:

```http
Authorization: Bearer <token>
```

### Cookies de Sesión

Para mayor seguridad, también se usan cookies HttpOnly:
- `accessToken`: Token de acceso JWT
- `refreshToken`: Token de renovación
- Configuración: `HttpOnly`, `Secure`, `SameSite=Strict`

## 📊 Endpoints

### 🔑 Autenticación

#### POST `/api/auth/register`

Registra un nuevo usuario.

**Headers:**
```http
Content-Type: application/json
```

**Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123",
  "role": "user"
}
```

**Respuesta Exitosa (201):**
```json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "id": "uuid",
    "email": "usuario@ejemplo.com",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST `/api/auth/login`

Inicia sesión de usuario.

**Headers:**
```http
Content-Type: application/json
```

**Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

**Respuesta Exitosa (200):**
```json
{
  "message": "Login exitoso",
  "accessToken": "jwt_token_aqui",
  "user": {
    "id": "uuid",
    "email": "usuario@ejemplo.com",
    "role": "user"
  }
}
```

#### POST `/api/auth/refresh`

Renueva el token de acceso.

**Headers:**
```http
Authorization: Bearer <refresh_token>
```

**Respuesta Exitosa (200):**
```json
{
  "accessToken": "nuevo_jwt_token",
  "message": "Token renovado exitosamente"
}
```

#### POST `/api/auth/logout`

Cierra la sesión del usuario.

**Headers:**
```http
Authorization: Bearer <access_token>
```

**Respuesta Exitosa (200):**
```json
{
  "message": "Logout exitoso"
}
```

### 📁 Proyectos

#### GET `/api/projects`

Obtiene todos los proyectos (público).

**Query Parameters:**
- `page`: Número de página (default: 1)
- `limit`: Elementos por página (default: 10)
- `sort`: Campo de ordenamiento (default: createdAt)
- `order`: Orden (asc/desc, default: desc)

**Respuesta Exitosa (200):**
```json
[
  {
    "id": "uuid",
    "title": "Proyecto Ejemplo",
    "description": "Descripción del proyecto",
    "tags": ["web", "react"],
    "url": "https://ejemplo.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### GET `/api/projects/:id`

Obtiene un proyecto específico por ID.

**Respuesta Exitosa (200):**
```json
{
  "id": "uuid",
  "title": "Proyecto Ejemplo",
  "description": "Descripción del proyecto",
  "tags": ["web", "react"],
  "url": "https://ejemplo.com",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### POST `/api/projects`

Crea un nuevo proyecto (requiere autenticación).

**Headers:**
```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Body:**
```json
{
  "title": "Nuevo Proyecto",
  "description": "Descripción del nuevo proyecto",
  "tags": ["web", "react", "typescript"],
  "url": "https://nuevo-proyecto.com"
}
```

**Respuesta Exitosa (201):**
```json
{
  "message": "Proyecto creado exitosamente",
  "project": {
    "id": "uuid",
    "title": "Nuevo Proyecto",
    "description": "Descripción del nuevo proyecto",
    "tags": ["web", "react", "typescript"],
    "url": "https://nuevo-proyecto.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT `/api/projects/:id`

Actualiza un proyecto existente (requiere autenticación).

**Headers:**
```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Body:**
```json
{
  "title": "Proyecto Actualizado",
  "description": "Descripción actualizada",
  "tags": ["web", "react", "typescript", "updated"]
}
```

**Respuesta Exitosa (200):**
```json
{
  "message": "Proyecto actualizado exitosamente",
  "project": {
    "id": "uuid",
    "title": "Proyecto Actualizado",
    "description": "Descripción actualizada",
    "tags": ["web", "react", "typescript", "updated"],
    "url": "https://nuevo-proyecto.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### DELETE `/api/projects/:id`

Elimina un proyecto (requiere autenticación).

**Headers:**
```http
Authorization: Bearer <access_token>
```

**Respuesta Exitosa (200):**
```json
{
  "message": "Proyecto eliminado exitosamente"
}
```

#### GET `/api/projects/search`

Busca proyectos por término (público).

**Query Parameters:**
- `q`: Término de búsqueda (requerido)
- `page`: Número de página (default: 1)
- `limit`: Elementos por página (default: 10)

**Respuesta Exitosa (200):**
```json
[
  {
    "id": "uuid",
    "title": "Proyecto de Búsqueda",
    "description": "Descripción que coincide con la búsqueda",
    "tags": ["web", "react"],
    "url": "https://ejemplo.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### 🏆 Certificaciones

#### GET `/api/certifications`

Obtiene todas las certificaciones (público).

**Query Parameters:**
- `page`: Número de página (default: 1)
- `limit`: Elementos por página (default: 10)
- `sort`: Campo de ordenamiento (default: issuedAt)
- `order`: Orden (asc/desc, default: desc)

**Respuesta Exitosa (200):**
```json
[
  {
    "id": "uuid",
    "name": "Certificación Ejemplo",
    "issuer": "Entidad Emisora",
    "issuedAt": "2024-01-01T00:00:00.000Z",
    "url": "https://certificacion.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### GET `/api/certifications/:id`

Obtiene una certificación específica por ID.

**Respuesta Exitosa (200):**
```json
{
  "id": "uuid",
  "name": "Certificación Ejemplo",
  "issuer": "Entidad Emisora",
  "issuedAt": "2024-01-01T00:00:00.000Z",
  "url": "https://certificacion.com",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### POST `/api/certifications`

Crea una nueva certificación (requiere autenticación).

**Headers:**
```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Nueva Certificación",
  "issuer": "Nueva Entidad",
  "issuedAt": "2024-01-01T00:00:00.000Z",
  "url": "https://nueva-certificacion.com"
}
```

**Respuesta Exitosa (201):**
```json
{
  "message": "Certificación creada exitosamente",
  "certification": {
    "id": "uuid",
    "name": "Nueva Certificación",
    "issuer": "Nueva Entidad",
    "issuedAt": "2024-01-01T00:00:00.000Z",
    "url": "https://nueva-certificacion.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT `/api/certifications/:id`

Actualiza una certificación existente (requiere autenticación).

**Headers:**
```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Certificación Actualizada",
  "issuer": "Entidad Actualizada"
}
```

**Respuesta Exitosa (200):**
```json
{
  "message": "Certificación actualizada exitosamente",
  "certification": {
    "id": "uuid",
    "name": "Certificación Actualizada",
    "issuer": "Entidad Actualizada",
    "issuedAt": "2024-01-01T00:00:00.000Z",
    "url": "https://nueva-certificacion.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### DELETE `/api/certifications/:id`

Elimina una certificación (requiere autenticación).

**Headers:**
```http
Authorization: Bearer <access_token>
```

**Respuesta Exitosa (200):**
```json
{
  "message": "Certificación eliminada exitosamente"
}
```

#### GET `/api/certifications/search`

Busca certificaciones por término (público).

**Query Parameters:**
- `q`: Término de búsqueda (requerido)
- `page`: Número de página (default: 1)
- `limit`: Elementos por página (default: 10)

**Respuesta Exitosa (200):**
```json
[
  {
    "id": "uuid",
    "name": "Certificación de Búsqueda",
    "issuer": "Entidad que coincide",
    "issuedAt": "2024-01-01T00:00:00.000Z",
    "url": "https://certificacion.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### 🏥 Health Check

#### GET `/api/health`

Verifica el estado de la API.

**Respuesta Exitosa (200):**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 12345,
  "version": "3.0.0",
  "environment": "development"
}
```

## 🔧 Ejemplos de Uso

### 📱 Archivo .http (VS Code REST Client)

```http
### Variables de entorno
@baseUrl = http://localhost:3001
@accessToken = tu_token_aqui

### 1. Registrar usuario
POST {{baseUrl}}/api/auth/register
Content-Type: application/json

{
  "email": "test@ejemplo.com",
  "password": "contraseña123",
  "role": "user"
}

### 2. Login
# @name login
POST {{baseUrl}}/api/auth/login
Content-Type: application/json

{
  "email": "test@ejemplo.com",
  "password": "contraseña123"
}

### 3. Extraer token del login
@authToken = {{login.response.body.accessToken}}

### 4. Crear proyecto
POST {{baseUrl}}/api/projects
Authorization: Bearer {{authToken}}
Content-Type: application/json

{
  "title": "Mi Proyecto",
  "description": "Descripción del proyecto",
  "tags": ["web", "react"],
  "url": "https://mi-proyecto.com"
}

### 5. Obtener proyectos
GET {{baseUrl}}/api/projects?page=1&limit=5

### 6. Buscar proyectos
GET {{baseUrl}}/api/projects/search?q=react&page=1&limit=10

### 7. Crear certificación
POST {{baseUrl}}/api/certifications
Authorization: Bearer {{authToken}}
Content-Type: application/json

{
  "name": "Certificación React",
  "issuer": "Meta",
  "issuedAt": "2024-01-01T00:00:00.000Z",
  "url": "https://certificacion-react.com"
}

### 8. Health check
GET {{baseUrl}}/api/health
```

### 🐚 cURL

#### Autenticación

```bash
# Registrar usuario
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@ejemplo.com",
    "password": "contraseña123",
    "role": "user"
  }'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@ejemplo.com",
    "password": "contraseña123"
  }'

# Guardar token en variable
TOKEN=$(curl -s -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@ejemplo.com", "password": "contraseña123"}' \
  | jq -r '.accessToken')
```

#### Proyectos

```bash
# Crear proyecto
curl -X POST http://localhost:3001/api/projects \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mi Proyecto",
    "description": "Descripción del proyecto",
    "tags": ["web", "react"],
    "url": "https://mi-proyecto.com"
  }'

# Obtener proyectos
curl -X GET "http://localhost:3001/api/projects?page=1&limit=5"

# Buscar proyectos
curl -X GET "http://localhost:3001/api/projects/search?q=react&page=1&limit=10"

# Obtener proyecto por ID
curl -X GET http://localhost:3001/api/projects/PROJECT_ID

# Actualizar proyecto
curl -X PUT http://localhost:3001/api/projects/PROJECT_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Proyecto Actualizado",
    "description": "Nueva descripción"
  }'

# Eliminar proyecto
curl -X DELETE http://localhost:3001/api/projects/PROJECT_ID \
  -H "Authorization: Bearer $TOKEN"
```

#### Certificaciones

```bash
# Crear certificación
curl -X POST http://localhost:3001/api/certifications \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Certificación React",
    "issuer": "Meta",
    "issuedAt": "2024-01-01T00:00:00.000Z",
    "url": "https://certificacion-react.com"
  }'

# Obtener certificaciones
curl -X GET "http://localhost:3001/api/certifications?page=1&limit=5"

# Buscar certificaciones
curl -X GET "http://localhost:3001/api/certifications/search?q=react&page=1&limit=10"
```

### 🔌 JavaScript/Node.js

```javascript
// Cliente de API
class APIClient {
  constructor(baseURL, token = null) {
    this.baseURL = baseURL;
    this.token = token;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers
      },
      ...options
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  // Autenticación
  async login(email, password) {
    const data = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    
    this.token = data.accessToken;
    return data;
  }

  // Proyectos
  async getProjects(page = 1, limit = 10) {
    return this.request(`/api/projects?page=${page}&limit=${limit}`);
  }

  async createProject(projectData) {
    return this.request('/api/projects', {
      method: 'POST',
      body: JSON.stringify(projectData)
    });
  }

  // Certificaciones
  async getCertifications(page = 1, limit = 10) {
    return this.request(`/api/certifications?page=${page}&limit=${limit}`);
  }

  async createCertification(certData) {
    return this.request('/api/certifications', {
      method: 'POST',
      body: JSON.stringify(certData)
    });
  }
}

// Uso
const api = new APIClient('http://localhost:3001');

// Login
api.login('test@ejemplo.com', 'contraseña123')
  .then(() => {
    // Crear proyecto
    return api.createProject({
      title: 'Mi Proyecto',
      description: 'Descripción del proyecto',
      tags: ['web', 'react'],
      url: 'https://mi-proyecto.com'
    });
  })
  .then(project => console.log('Proyecto creado:', project))
  .catch(error => console.error('Error:', error));
```

## 📝 Códigos de Estado

### ✅ Éxito
- **200 OK**: Solicitud exitosa
- **201 Created**: Recurso creado exitosamente
- **204 No Content**: Solicitud exitosa sin contenido

### 🔄 Redirección
- **301 Moved Permanently**: Recurso movido permanentemente
- **302 Found**: Recurso encontrado temporalmente

### ❌ Error del Cliente
- **400 Bad Request**: Solicitud malformada
- **401 Unauthorized**: No autenticado
- **403 Forbidden**: No autorizado
- **404 Not Found**: Recurso no encontrado
- **409 Conflict**: Conflicto con el estado actual
- **422 Unprocessable Entity**: Entidad no procesable

### 🚨 Error del Servidor
- **500 Internal Server Error**: Error interno del servidor
- **502 Bad Gateway**: Error de gateway
- **503 Service Unavailable**: Servicio no disponible

## 🛡️ Seguridad

### 🔐 Autenticación

- **JWT**: Tokens firmados con secret seguro
- **Expiración**: Access tokens expiran en 15 minutos
- **Refresh**: Refresh tokens expiran en 7 días
- **Rotación**: Tokens se rotan automáticamente

### 🍪 Cookies

- **HttpOnly**: Previene acceso desde JavaScript
- **Secure**: Solo se envían por HTTPS
- **SameSite**: Previene ataques CSRF
- **Path**: Limitadas a `/api`

### 🚫 Rate Limiting

- **Límite**: 100 requests por minuto por IP
- **Headers**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`
- **Reset**: `X-RateLimit-Reset`

### 🛡️ CORS

```javascript
// Configuración CORS
{
  origin: ['http://localhost:3000', 'https://tu-dominio.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
```

### 🔒 Validación

- **Sanitización**: Inputs se sanitizan automáticamente
- **Validación**: Esquemas Joi para validación
- **SQL Injection**: Previene con Prisma ORM
- **XSS**: Headers de seguridad automáticos

## 📱 SDKs y Clientes

### 🔌 Cliente JavaScript

```bash
npm install @inmortalos/api-client
```

```javascript
import { APIClient } from '@inmortalos/api-client';

const client = new APIClient({
  baseURL: 'http://localhost:3001',
  token: 'tu_token'
});

// Usar métodos del cliente
const projects = await client.projects.list();
const project = await client.projects.create({
  title: 'Nuevo Proyecto',
  description: 'Descripción'
});
```

### 🐍 Cliente Python

```bash
pip install inmortalos-api-client
```

```python
from inmortalos_api import APIClient

client = APIClient(
    base_url="http://localhost:3001",
    token="tu_token"
)

# Usar métodos del cliente
projects = client.projects.list()
project = client.projects.create(
    title="Nuevo Proyecto",
    description="Descripción"
)
```

### 📱 Cliente React Hook

```bash
npm install @inmortalos/react-hooks
```

```jsx
import { useProjects, useCertifications } from '@inmortalos/react-hooks';

function ProjectsList() {
  const { data: projects, loading, error } = useProjects();
  
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {projects.map(project => (
        <div key={project.id}>{project.title}</div>
      ))}
    </div>
  );
}
```

## 📚 Recursos Adicionales

- [📖 Guía de Inicio Rápido](./README.md)
- [🔧 Contribuir](./CONTRIBUTING.md)
- [🛡️ Seguridad](./SECURITY.md)
- [📝 Changelog](./CHANGELOG.md)
- [🐛 Reportar Bugs](https://github.com/1inmortal/githubpagetest/issues)
- [💡 Sugerir Features](https://github.com/1inmortal/githubpagetest/issues)

---

**¿Necesitas ayuda?** Abre un [issue](https://github.com/1inmortal/githubpagetest/issues) o contacta al equipo de desarrollo.
