# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a **INMORTAL_OS v3.0**! Este documento te guiará a través del proceso de contribución.

## 📋 Tabla de Contenidos

- [🎯 Antes de Contribuir](#-antes-de-contribuir)
- [🚀 Flujo de Trabajo](#-flujo-de-trabajo)
- [📝 Convención de Commits](#-convención-de-commits)
- [🔧 Estándares de Código](#-estándares-de-código)
- [🧪 Testing](#-testing)
- [📚 Documentación](#-documentación)
- [🐛 Reportando Bugs](#-reportando-bugs)
- [✨ Sugiriendo Features](#-sugiriendo-features)
- [❓ Preguntas Frecuentes](#-preguntas-frecuentes)

## 🎯 Antes de Contribuir

### 📋 Checklist de Contribución

- [ ] He leído y entiendo el [README](./README.md)
- [ ] He revisado los [issues existentes](https://github.com/1inmortal/githubpagetest/issues)
- [ ] Mi contribución sigue los estándares del proyecto
- [ ] He probado mi código localmente
- [ ] He ejecutado los tests y pasan
- [ ] He actualizado la documentación si es necesario

### 🛠️ Setup del Entorno de Desarrollo

```bash
# 1. Fork y clonar
git clone https://github.com/TU_USUARIO/githubpagetest.git
cd githubpagetest

# 2. Configurar upstream
git remote add upstream https://github.com/1inmortal/githubpagetest.git

# 3. Instalar dependencias
npm ci
cd server && npm ci && cd ..

# 4. Configurar variables de entorno
cp server/.env.example server/.env
# Editar server/.env

# 5. Inicializar base de datos
npm run db:migrate
npm run db:seed
```

## 🚀 Flujo de Trabajo

### 1. **Crear una Rama**

```bash
# Actualizar main
git checkout main
git pull upstream main

# Crear rama para tu feature
git checkout -b feature/nombre-descriptivo
# o para bugfix
git checkout -b fix/nombre-del-bug
# o para documentación
git checkout -b docs/nombre-del-doc
```

### 2. **Desarrollar y Commitear**

```bash
# Hacer cambios
# ... editar archivos ...

# Agregar cambios
git add .

# Commit con mensaje descriptivo
git commit -m "feat: agregar sistema de notificaciones"

# Push a tu fork
git push origin feature/nombre-descriptivo
```

### 3. **Crear Pull Request**

1. Ve a tu fork en GitHub
2. Haz clic en "New Pull Request"
3. Selecciona `main` como base y tu rama como compare
4. Completa la plantilla del PR
5. Asigna reviewers si es necesario
6. Envía el PR

### 4. **Revisión y Merge**

- Los maintainers revisarán tu código
- Puede haber solicitudes de cambios
- Una vez aprobado, se hará merge automáticamente

## 📝 Convención de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/) para mantener un historial claro y automatizar releases.

### 📋 Formato

```
<tipo>[<scope>]: <descripción>

[cuerpo opcional]

[nota de pie opcional]
```

### 🏷️ Tipos de Commit

- **`feat`**: Nueva feature
- **`fix`**: Corrección de bug
- **`docs`**: Cambios en documentación
- **`style`**: Cambios de formato (espacios, punto y coma, etc.)
- **`refactor`**: Refactorización de código
- **`test`**: Agregar o corregir tests
- **`chore`**: Cambios en build, config, etc.

### 📍 Scope (Opcional)

- **`api`**: Cambios en la API
- **`ui`**: Cambios en la interfaz
- **`auth`**: Cambios en autenticación
- **`db`**: Cambios en base de datos
- **`ci`**: Cambios en CI/CD

### 💡 Ejemplos

```bash
# Feature
git commit -m "feat(auth): implementar login con Google OAuth"

# Bug fix
git commit -m "fix(ui): corregir responsive en móviles"

# Documentación
git commit -m "docs: actualizar guía de instalación"

# Refactorización
git commit -m "refactor(store): simplificar gestión de estado"

# Test
git commit -m "test(api): agregar tests para endpoint de proyectos"

# Chore
git commit -m "chore(deps): actualizar dependencias de seguridad"
```

## 🔧 Estándares de Código

### 📱 JavaScript/TypeScript

```javascript
/**
 * Función de ejemplo siguiendo estándares
 * @param {string} name - Nombre del usuario
 * @param {number} age - Edad del usuario
 * @returns {string} Saludo personalizado
 */
function greetUser(name, age) {
  // Validar parámetros
  if (!name || typeof name !== 'string') {
    throw new Error('Nombre es requerido y debe ser string');
  }
  
  if (age < 0 || age > 150) {
    throw new Error('Edad debe estar entre 0 y 150');
  }
  
  // Lógica principal
  const greeting = `Hola ${name}, tienes ${age} años`;
  
  return greeting;
}

// Exportar función
export default greetUser;
```

### 🎨 CSS

```css
/* Usar BEM para naming */
.user-card {
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-card__header {
  margin-bottom: 1rem;
}

.user-card__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}

.user-card--featured {
  border: 2px solid #007bff;
}
```

### 🧪 Tests

```javascript
/**
 * Tests para función de ejemplo
 */
import { describe, it, expect } from 'vitest';
import greetUser from './greetUser';

describe('greetUser', () => {
  it('debe saludar correctamente', () => {
    const result = greetUser('Juan', 25);
    expect(result).toBe('Hola Juan, tienes 25 años');
  });

  it('debe validar nombre requerido', () => {
    expect(() => greetUser('', 25)).toThrow('Nombre es requerido');
    expect(() => greetUser(null, 25)).toThrow('Nombre es requerido');
  });

  it('debe validar edad válida', () => {
    expect(() => greetUser('Juan', -1)).toThrow('Edad debe estar entre 0 y 150');
    expect(() => greetUser('Juan', 151)).toThrow('Edad debe estar entre 0 y 150');
  });
});
```

## 🧪 Testing

### 📋 Reglas de Testing

- **Cobertura mínima**: 80% para código nuevo
- **Tests unitarios**: Para toda lógica de negocio
- **Tests de integración**: Para APIs y servicios
- **Tests E2E**: Para flujos críticos de usuario

### 🚀 Ejecutar Tests

```bash
# Todos los tests
npm run test

# Tests unitarios
npm run test:unit

# Tests de API
npm run test:api

# Tests E2E
npm run test:e2e

# Con coverage
npm run test:coverage
```

### 📊 Reportes de Coverage

Los reportes se generan automáticamente en:
- `coverage/` - Reporte local
- GitHub Actions - Reporte en CI/CD

## 📚 Documentación

### 📝 Reglas de Documentación

- **README**: Setup y uso básico
- **JSDoc**: Para todas las funciones públicas
- **API docs**: Para endpoints y modelos
- **Changelog**: Para cada release

### 🔧 Actualizar Documentación

```bash
# Si cambias la API
npm run docs:api

# Si cambias el README
# Editar README.md directamente

# Si cambias componentes
# Actualizar JSDoc en el código
```

## 🐛 Reportando Bugs

### 📋 Plantilla de Bug Report

```markdown
## 🐛 Descripción del Bug

Descripción clara y concisa del problema.

## 🔍 Pasos para Reproducir

1. Ve a '...'
2. Haz clic en '...'
3. Desplázate hacia abajo hasta '...'
4. Ve el error

## ✅ Comportamiento Esperado

Descripción de lo que debería pasar.

## 📱 Información del Sistema

- **OS**: [ej. Windows 10, macOS 12.0]
- **Navegador**: [ej. Chrome 120, Firefox 119]
- **Versión**: [ej. 3.0.0]

## 📸 Capturas de Pantalla

Si es aplicable, agrega capturas para explicar el problema.

## 🔧 Información Adicional

Cualquier otra información que pueda ser útil.
```

## ✨ Sugiriendo Features

### 📋 Plantilla de Feature Request

```markdown
## 🚀 Descripción de la Feature

Descripción clara de la funcionalidad que te gustaría ver.

## 💡 Caso de Uso

Explica por qué esta feature sería útil.

## 🔧 Implementación Sugerida

Si tienes ideas sobre cómo implementarla, compártelas.

## 📱 Alternativas Consideradas

Describe alternativas que has considerado.

## 📚 Información Adicional

Cualquier otra información o contexto.
```

## ❓ Preguntas Frecuentes

### 🤔 ¿Puedo contribuir si soy principiante?

¡Absolutamente! Apreciamos contribuciones de todos los niveles. Empieza con:
- Documentación
- Tests
- Bug fixes simples
- Mejoras de UI menores

### 🔒 ¿Necesito permisos especiales?

No, solo necesitas:
- Fork del repositorio
- Entorno de desarrollo configurado
- Seguir las convenciones del proyecto

### 🚀 ¿Cómo sé si mi contribución es buena?

Una buena contribución:
- Resuelve un problema real
- Sigue los estándares del proyecto
- Incluye tests apropiados
- Está bien documentada

### ⏰ ¿Cuánto tiempo toma revisar un PR?

- **Bug fixes**: 1-3 días
- **Features menores**: 3-7 días
- **Features mayores**: 1-2 semanas
- **Refactorizaciones**: 1-2 semanas

### 🐛 ¿Qué hago si mi PR no se aprueba?

- Lee los comentarios cuidadosamente
- Haz los cambios solicitados
- Responde a las preguntas
- Pide aclaraciones si algo no está claro

## 🎉 Reconocimientos

### 🌟 Contribuidores Destacados

- **@1inmortal** - Mantenedor principal
- **@contribuidor1** - Contribuciones significativas
- **@contribuidor2** - Mejoras de documentación

### 🏆 Badges de Contribución

- **🥇 Gold**: 50+ commits o 10+ PRs
- **🥈 Silver**: 20+ commits o 5+ PRs
- **🥉 Bronze**: 5+ commits o 1+ PR

## 📞 Contacto

- **📧 Email**: [tu-email@ejemplo.com](mailto:tu-email@ejemplo.com)
- **🐙 GitHub**: [@tu-usuario](https://github.com/tu-usuario)
- **💬 Discord**: [Servidor del proyecto](https://discord.gg/proyecto)

---

**¡Gracias por contribuir a INMORTAL_OS v3.0! 🚀**

*Juntos construimos el futuro del desarrollo web.*
