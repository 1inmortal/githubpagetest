# Despliegue en Render

## Configuración de Variables de Entorno en Render

### 1. Acceder al Panel de Control
1. Ve a [render.com](https://render.com) y accede a tu cuenta
2. Selecciona tu servicio web
3. Haz clic en la pestaña "Environment" en el panel lateral izquierdo

### 2. Configurar Variables de Entorno
En la sección "Environment Variables", haz clic en "+ Add Environment Variable" y añade:

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `DB_USER` | `tu_usuario_postgresql` | Usuario de tu base de datos PostgreSQL |
| `DB_PASSWORD` | `tu_password_postgresql` | Contraseña de tu base de datos PostgreSQL |
| `DB_HOST` | `tu_host_postgresql` | Host de tu base de datos (ej: db.render.com) |
| `DB_PORT` | `5432` | Puerto de PostgreSQL (por defecto 5432) |
| `DB_NAME` | `tu_nombre_base_datos` | Nombre de tu base de datos |
| `PORT` | `10000` | Puerto del servidor (Render usa 10000 por defecto) |

### 3. Opciones de Guardado
- **"Save, rebuild, and deploy"**: Render reconstruirá y desplegará tu servicio
- **"Save and deploy"**: Render redeployará tu servicio existente
- **"Save only"**: Render guardará las variables sin desplegar

## Configuración de la Base de Datos

### Opción 1: PostgreSQL en Render (Recomendado)
1. Crea un nuevo servicio de base de datos PostgreSQL en Render
2. Usa las credenciales proporcionadas por Render
3. Ejecuta el archivo `schema.sql` en tu base de datos

### Opción 2: Base de Datos Externa
- **Supabase**: Servicio gratuito de PostgreSQL
- **Neon**: PostgreSQL serverless
- **Railway**: Base de datos PostgreSQL incluida

## Ejecutar el Esquema de la Base de Datos

```sql
-- Copia y pega el contenido de schema.sql en tu cliente PostgreSQL
-- O ejecuta desde la línea de comandos:
psql -h tu_host -U tu_usuario -d tu_base_datos -f schema.sql
```

## Verificar el Despliegue

### Desde el Navegador
- Accede a la URL de tu servicio en Render
- Deberías ver: "API funcionando 🚀"

### Desde Postman
1. **GET /** - Ruta raíz
   - URL: `https://tu-servicio.onrender.com/`
   - Debería devolver: "API funcionando 🚀"

2. **GET /usuarios** - Obtener usuarios
   - URL: `https://tu-servicio.onrender.com/usuarios`
   - Método: GET

3. **POST /usuarios** - Crear usuario
   - URL: `https://tu-servicio.onrender.com/usuarios`
   - Método: POST
   - Headers: `Content-Type: application/json`
   - Body:
   ```json
   {
     "nombre": "Juan Pérez",
     "email": "juan@example.com",
     "password": "password123"
   }
   ```

4. **GET /productos** - Obtener productos
   - URL: `https://tu-servicio.onrender.com/productos`
   - Método: GET

5. **POST /productos** - Crear producto
   - URL: `https://tu-servicio.onrender.com/productos`
   - Método: POST
   - Headers: `Content-Type: application/json`
   - Body:
   ```json
   {
     "nombre": "Producto Test",
     "descripcion": "Descripción del producto",
     "precio": 29.99,
     "stock": 10
   }
   ```

## Solución de Problemas

### Error: "Connection refused"
- Verifica que las variables de entorno estén correctamente configuradas
- Asegúrate de que la base de datos esté activa

### Error: "Authentication failed"
- Verifica `DB_USER` y `DB_PASSWORD`
- Asegúrate de que el usuario tenga permisos en la base de datos

### Error: "Database does not exist"
- Verifica `DB_NAME`
- Crea la base de datos si no existe

## Monitoreo
- Revisa los logs en la pestaña "Logs" de Render
- Monitorea el estado de tu base de datos
- Verifica el uptime en la pestaña "Metrics"
