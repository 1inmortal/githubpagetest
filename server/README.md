# Backend Node.js con Express y PostgreSQL

Backend simple y limpio en Node.js con Express conectado únicamente a PostgreSQL.

## Instalación

```bash
npm install
```

## Configuración

1. Copia el archivo `env.example` a `.env`
2. Configura las variables de entorno con tus credenciales de PostgreSQL:
   - `DB_USER`: Usuario de PostgreSQL
   - `DB_PASSWORD`: Contraseña de PostgreSQL
   - `DB_HOST`: Host de la base de datos
   - `DB_PORT`: Puerto de PostgreSQL (por defecto 5432)
   - `DB_NAME`: Nombre de la base de datos

## Ejecución

```bash
npm start
```

El servidor se ejecutará en el puerto 3000 (o el puerto especificado en la variable `PORT`).

## Endpoints

- `GET /` - Devuelve "API funcionando 🚀"
- `GET /usuarios` - Obtiene todos los usuarios
- `POST /usuarios` - Crea un nuevo usuario
- `GET /productos` - Obtiene todos los productos
- `POST /productos` - Crea un nuevo producto

## Estructura de la base de datos

### Tabla usuarios
- id (SERIAL PRIMARY KEY)
- nombre (VARCHAR)
- email (VARCHAR)
- password (VARCHAR)

### Tabla productos
- id (SERIAL PRIMARY KEY)
- nombre (VARCHAR)
- descripcion (TEXT)
- precio (DECIMAL)
- stock (INTEGER)
