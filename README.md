# INMORTAL_OS v3.0 - Portfolio Profesional

[![CI/CD Pipeline](https://github.com/1inmortal/githubpagetest/workflows/CI/CD%20Pipeline/badge.svg)](https://github.com/1inmortal/githubpagetest/actions)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)](https://github.com/1inmortal/githubpagetest/actions)
[![Coverage](https://img.shields.io/badge/coverage-80%25-brightgreen)](https://github.com/1inmortal/githubpagetest/actions)

Portfolio profesional moderno con arquitectura full-stack, sistema de gestión de estado, API REST, y testing completo.

## 🏗️ Arquitectura

### Frontend
- **Estado**: Store minimal con persistencia en IndexedDB (fallback a localStorage)
- **Datos**: Cliente de datos con cache SWR y revalidación en background
- **UI**: Componentes modulares con diseño responsive y accesible
- **Testing**: Vitest (unit), Playwright (E2E)

### Backend
- **API**: Express.js con middleware de autenticación JWT
- **Base de Datos**: Prisma ORM con SQLite
- **Autenticación**: JWT con cookies HttpOnly+Secure+SameSite=Strict
- **Testing**: Supertest para tests de API

### Infraestructura
- **CI/CD**: GitHub Actions con pipeline completo
- **Testing**: Unit, API, y E2E automatizados
- **Despliegue**: GitHub Pages automático
- **Dependencias**: Dependabot para actualizaciones automáticas

## 🚀 Setup Rápido

### Prerrequisitos
- Node.js 20.x o superior
- npm 10.x o superior
- Git

### 1. Clonar y Instalar
```bash
git clone https://github.com/1inmortal/githubpagetest.git
cd githubpagetest
npm ci
cd server && npm ci
cd ..
```

### 2. Configurar Variables de Entorno
```bash
cp server/.env.example server/.env
# Editar server/.env con tus valores
```

### 3. Inicializar Base de Datos
```bash
npm run db:migrate
npm run db:seed
```

### 4. Ejecutar Aplicación Completa
```bash
# Terminal 1: Backend
npm run dev:api

# Terminal 2: Frontend
npm run dev:frontend

# Terminal 3: Docker Compose (opcional)
docker-compose -f config/compose.dev.yml up -d
```

## 📁 Estructura del Proyecto

```
githubpagetest/
├── src/                    # Frontend source
│   ├── core/              # Core functionality
│   │   └── store.js       # State management
│   ├── services/          # Data services
│   │   └── dataClient.js  # API client with SWR
│   └── components/        # UI components
├── server/                 # Backend API
│   ├── src/               # Server source
│   ├── prisma/            # Database schema & migrations
│   └── package.json       # Backend dependencies
├── tests/                  # Test suites
│   ├── unit/              # Unit tests (Vitest)
│   ├── api/               # API tests (Supertest)
│   └── e2e/               # E2E tests (Playwright)
├── config/                 # Configuration files
├── docs/                   # Documentation
└── .github/                # GitHub workflows
```

## 🛠️ Scripts Disponibles

### Frontend
```bash
npm run dev:frontend      # Desarrollo frontend
npm run build             # Build para producción
npm run preview           # Preview del build
npm run lint              # Linting del código
```

### Backend
```bash
npm run dev:api           # Desarrollo API
npm run db:migrate        # Ejecutar migraciones
npm run db:seed           # Poblar base de datos
npm run db:studio         # Abrir Prisma Studio
```

### Testing
```bash
npm run test              # Todos los tests
npm run test:unit         # Tests unitarios
npm run test:api          # Tests de API
npm run test:e2e          # Tests E2E
npm run test:coverage     # Reporte de cobertura
```

### Docker
```bash
docker-compose -f config/compose.dev.yml up -d    # Levantar servicios
docker-compose -f config/compose.dev.yml down     # Detener servicios
docker-compose -f config/compose.dev.yml logs     # Ver logs
```

## 🔧 Configuración

### Variables de Entorno
```env
# Backend (.env)
JWT_SECRET=tu_jwt_secret_super_seguro
DATABASE_URL="file:./dev.db"
NODE_ENV=development
PORT=3001

# Frontend
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=INMORTAL_OS v3.0
```

### Base de Datos
El proyecto usa SQLite con Prisma para desarrollo local. Los modelos incluyen:
- **Project**: Proyectos con título, descripción, tags y URL
- **Certification**: Certificaciones con nombre, emisor y fecha
- **User**: Usuarios con email, password hash y rol

## 🧪 Testing

### Tests Unitarios (Vitest)
```bash
npm run test:unit
```
- Store: gestión de estado y persistencia
- Utilidades: funciones auxiliares
- Componentes: lógica de UI

### Tests de API (Supertest)
```bash
npm run test:api
```
- Endpoints CRUD para projects y certifications
- Autenticación JWT
- Validación de datos
- Manejo de errores

### Tests E2E (Playwright)
```bash
npm run test:e2e
```
- Flujos de usuario completos
- Renderizado de páginas
- Responsividad en diferentes dispositivos
- Accesibilidad básica

## 🚀 CI/CD

### Pipeline Automático
El pipeline se ejecuta en cada push y PR:
1. **Lint**: Verificación de código y formato
2. **Tests**: Unit, API, y E2E automáticos
3. **Build**: Verificación de build exitoso
4. **Despliegue**: Automático a GitHub Pages (solo main)

### Dependabot
- Actualizaciones semanales de dependencias
- Pull requests automáticos para npm y GitHub Actions
- Revisión manual antes de merge

## 🔒 Seguridad

- **JWT**: Tokens firmados con secret seguro
- **Cookies**: HttpOnly+Secure+SameSite=Strict
- **CORS**: Configuración restrictiva
- **Validación**: Sanitización de inputs
- **Rate Limiting**: Protección contra abuso

## 📚 Documentación Adicional

- [CONTRIBUTING.md](./CONTRIBUTING.md) - Guía de contribución
- [API.md](./docs/API.md) - Documentación de la API
- [SECURITY.md](./docs/SECURITY.md) - Políticas de seguridad
- [CHANGELOG.md](./CHANGELOG.md) - Historial de cambios

## 🐛 Problemas Comunes

### Error de Base de Datos
```bash
# Resetear base de datos
rm server/dev.db
npm run db:migrate
npm run db:seed
```

### Puerto en Uso
```bash
# Cambiar puerto en .env
PORT=3002
```

### Tests Fallando
```bash
# Limpiar cache y reinstalar
rm -rf node_modules
npm ci
```

### Docker no Inicia
```bash
# Verificar que Docker esté corriendo
docker --version
docker-compose --version
```

## 🤝 Contribuir

Ver [CONTRIBUTING.md](./CONTRIBUTING.md) para detalles sobre:
- Flujo de trabajo con Git
- Convención de commits
- Proceso de Pull Request
- Estándares de código

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](./LICENSE) para más detalles.

## 👨‍💻 Autor

**INMORTAL_OS** - [GitHub](https://github.com/1inmortal)

---

⭐ Si este proyecto te ayuda, ¡dale una estrella!
