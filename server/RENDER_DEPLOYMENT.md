# 🚀 DESPLIEGUE EN RENDER - BACKEND INMORTAL

## 📋 PASOS PARA DESPLEGAR EN RENDER

### 1. **Crear Cuenta en Render**
- Ve a [render.com](https://render.com)
- Crea una cuenta gratuita
- Conecta tu repositorio de GitHub

### 2. **Crear Nuevo Servicio Web**
- Click en "New +"
- Selecciona "Web Service"
- Conecta tu repositorio: `githubpagetest`
- Selecciona la rama: `main`

### 3. **Configuración del Servicio**
```
Name: inmortal-backend
Environment: Node
Build Command: npm install
Start Command: npm start
```

### 4. **Variables de Entorno (Environment Variables)**
Agrega estas variables en la sección "Environment Variables":

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` |
| `DB_USER` | `backend_db_lhz2_user` |
| `DB_PASSWORD` | `uRcP1glBw2cRnx8WvYuTjKJlBiCObpMC` |
| `DB_HOST` | `dpg-d2p9bbmr433s73d0vm60-a.oregon-postgres.render.com` |
| `DB_PORT` | `5432` |
| `DB_NAME` | `backend_db_lhz2` |

### 5. **Configuración Avanzada**
- **Auto-Deploy**: Enabled
- **Branch**: main
- **Region**: Oregon (US West)

### 6. **Crear Servicio**
- Click en "Create Web Service"
- Render comenzará a construir y desplegar tu aplicación

## 🔧 VERIFICACIÓN DEL DESPLIEGUE

### **URL de tu API:**
```
https://inmortal-backend.onrender.com
```

### **Endpoints disponibles:**
- `GET /` → "API funcionando 🚀"
- `GET /test-db` → Prueba conexión BD
- `GET /usuarios` → Lista usuarios
- `POST /usuarios` → Crear usuario
- `POST /contacto` → Formulario contacto
- `GET /productos` → Lista productos
- `POST /productos` → Crear producto

## 🌐 CONFIGURAR FRONTEND PARA GITHUB PAGES

### **Actualizar URL en index.html:**
Cambia esta línea en tu `index.html`:

```javascript
// Cambiar de:
const backendUrl = 'http://localhost:3000/contacto';

// A:
const backendUrl = 'https://inmortal-backend.onrender.com/contacto';
```

### **Hacer Commit y Push:**
```bash
git add .
git commit -m "Configurar frontend para Render"
git push origin main
```

## 📊 VERIFICAR EN PGADMIN

### **1. Conectar a tu BD en pgAdmin:**
- Host: `dpg-d2p9bbmr433s73d0vm60-a.oregon-postgres.render.com`
- Port: `5432`
- Database: `backend_db_lhz2`
- Username: `backend_db_lhz2_user`
- Password: `uRcP1glBw2cRnx8WvYuTjKJlBiCObpMC`

### **2. Verificar Tablas:**
```sql
-- Ver usuarios creados desde el formulario
SELECT * FROM usuarios WHERE email LIKE '%@%';

-- Ver mensajes de contacto
SELECT 
    c.id,
    c.proyecto,
    c.mensaje,
    c.fecha,
    u.nombre,
    u.email
FROM contactos c
JOIN usuarios u ON c.usuario_id = u.id
ORDER BY c.fecha DESC;
```

### **3. Verificar Auditorías:**
```sql
-- Ver auditorías del sistema
SELECT * FROM auditorias ORDER BY detectado_en DESC;
```

## 🧪 PRUEBAS

### **1. Probar API desde navegador:**
```
https://inmortal-backend.onrender.com/test-db
```

### **2. Probar formulario de contacto:**
- Abre tu sitio en GitHub Pages
- Llena el formulario de contacto
- Verifica en pgAdmin que se creen registros

### **3. Verificar logs en Render:**
- Ve a tu servicio en Render
- Click en "Logs"
- Verifica que no haya errores

## 🚨 SOLUCIÓN DE PROBLEMAS

### **Error de CORS:**
- Verifica que CORS esté habilitado en el servidor
- Asegúrate de que la URL del frontend esté correcta

### **Error de conexión BD:**
- Verifica variables de entorno en Render
- Confirma que la BD esté activa
- Revisa logs del servidor

### **Error 404:**
- Verifica que las rutas estén correctas
- Confirma que el servidor esté corriendo

## 📱 MONITOREO

### **Render Dashboard:**
- Estado del servicio
- Logs en tiempo real
- Métricas de rendimiento

### **pgAdmin:**
- Monitoreo de BD
- Verificación de datos
- Consultas de auditoría

## 🎯 RESULTADO FINAL

Una vez configurado, tu flujo será:
1. **Usuario llena formulario** en GitHub Pages
2. **Frontend envía datos** a Render
3. **Backend procesa** y guarda en PostgreSQL
4. **Datos visibles** en pgAdmin
5. **Notificación de éxito** en el frontend

¡Tu sitio estará completamente funcional con base de datos en tiempo real! 🚀
