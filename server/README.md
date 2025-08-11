# 🖥️ Servidor Backend - GitHub Page Test

Este es el servidor backend de tu aplicación que proporciona una API REST para gestionar proyectos, certificaciones y autenticación de usuarios.

## 🎯 **¿Qué hace este servidor?**

- **API REST**: Endpoints para proyectos, certificaciones y usuarios
- **Base de Datos**: SQLite con Prisma ORM
- **Autenticación**: JWT con cookies seguras
- **Seguridad**: CORS, Helmet, Rate Limiting, validación de datos

## 🚀 **Configuración Rápida**

### **1. Instalar dependencias**
```bash
cd server
npm install
```

### **2. Configurar variables de entorno**
```bash
# Copiar archivo de ejemplo
cp env.example .env

# Editar .env con tus valores
nano .env
```

### **3. Configurar base de datos**
```bash
# Generar cliente de Prisma
npm run db:generate

# Crear tablas en la base de datos
npm run db:migrate

# Insertar datos de ejemplo (opcional)
npm run db:seed
```

### **4. Ejecutar servidor**
```bash
# Desarrollo con auto-reload
npm run dev

# Producción
npm start
```

## 🌐 **Endpoints de la API**

### **Autenticación**
```
POST   /api/auth/register    → Registrar usuario
POST   /api/auth/login       → Iniciar sesión
POST   /api/auth/logout      → Cerrar sesión
GET    /api/auth/profile     → Obtener perfil
```

### **Proyectos**
```
GET    /api/projects         → Listar todos los proyectos
GET    /api/projects/:id     → Obtener proyecto específico
POST   /api/projects         → Crear nuevo proyecto
PUT    /api/projects/:id     → Actualizar proyecto
DELETE /api/projects/:id     → Eliminar proyecto
```

### **Certificaciones**
```
GET    /api/certifications         → Listar todas las certificaciones
GET    /api/certifications/:id     → Obtener certificación específica
POST   /api/certifications         → Crear nueva certificación
PUT    /api/certifications/:id     → Actualizar certificación
DELETE /api/certifications/:id     → Eliminar certificación
```

### **Sistema**
```
GET    /api/health          → Estado del servidor
GET    /                    → Información de la API
```

## 🔧 **Comandos Disponibles**

```bash
# Desarrollo
npm run dev              # Servidor con auto-reload
npm run dev:api          # Solo servidor API

# Base de datos
npm run db:migrate       # Ejecutar migraciones
npm run db:seed          # Insertar datos de ejemplo
npm run db:studio        # Interfaz visual de la DB
npm run db:generate      # Generar cliente Prisma
npm run db:reset         # Resetear base de datos

# Testing
npm test                 # Tests unitarios
npm run test:api         # Tests de API

# Linting
npm run lint             # Verificar código
npm run lint:fix         # Corregir problemas automáticamente
```

## 🌍 **Configuración de Entornos**

### **Desarrollo Local**
```bash
# .env
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000
DATABASE_URL="file:./dev.db"
```

### **Producción**
```bash
# .env
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://tu-usuario.github.io/githubpagetest
DATABASE_URL="file:./prod.db"
JWT_SECRET=tu-secret-super-seguro
```

## 🔒 **Seguridad Implementada**

- **JWT**: Tokens de autenticación seguros
- **Cookies**: HttpOnly, Secure, SameSite
- **CORS**: Configuración restrictiva
- **Helmet**: Headers de seguridad HTTP
- **Rate Limiting**: Protección contra spam
- **Validación**: Sanitización de entrada
- **bcrypt**: Hash de contraseñas

## 📊 **Base de Datos**

### **Modelos**
- **User**: Usuarios con autenticación
- **Project**: Proyectos con metadatos
- **Certification**: Certificaciones profesionales

### **Características**
- **SQLite**: Base de datos local (perfecta para desarrollo)
- **Prisma**: ORM moderno y type-safe
- **Migraciones**: Control de versiones de la DB
- **Seeding**: Datos de ejemplo para desarrollo

## 🚨 **Solución de Problemas**

### **Error: "ECONNREFUSED"**
```bash
# El servidor no está ejecutándose
npm run dev
```

### **Error: "Database locked"**
```bash
# Reiniciar base de datos
npm run db:reset
```

### **Error: "JWT_SECRET not defined"**
```bash
# Verificar archivo .env
cat .env | grep JWT_SECRET
```

### **Error: "CORS policy"**
```bash
# Verificar FRONTEND_URL en .env
# Debe coincidir con la URL de tu frontend
```

## 🌐 **Despliegue en Producción**

### **Opciones de Hosting**
1. **Heroku**: Fácil despliegue
2. **Vercel**: Serverless functions
3. **Railway**: Base de datos incluida
4. **DigitalOcean**: VPS completo

### **Variables de Entorno de Producción**
```bash
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://tu-usuario.github.io/githubpagetest
DATABASE_URL="postgresql://usuario:password@host:puerto/db"
JWT_SECRET=secret-super-seguro-y-largo
SESSION_SECRET=otro-secret-unico
```

## 📱 **Comunicación con Frontend**

### **Desarrollo Local**
```
Frontend (localhost:3000) ←→ Servidor (localhost:3001)
```

### **Producción**
```
Frontend (github.io) ←→ Servidor (tu-servidor.com)
```

## 🔍 **Monitoreo y Logs**

```bash
# Ver logs en tiempo real
npm run dev | grep -E "(ERROR|WARN|INFO)"

# Verificar estado de la API
curl http://localhost:3001/api/health
```

## 📚 **Recursos Adicionales**

- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [JWT.io](https://jwt.io/)
- [bcrypt.js](https://github.com/dcodeIO/bcrypt.js/)

---

**🎯 ¿Necesitas ayuda?** Revisa los logs del servidor o consulta la documentación de la API en `/docs/API.md`
