# 📧 Configuración de Gmail para Envío Automático de Emails

## 🎯 **Descripción**

Esta guía te ayudará a configurar Gmail para enviar automáticamente los correos HTML de commits a tu email `jarmando2965@gmail.com`.

## ⚠️ **IMPORTANTE: Seguridad**

**NUNCA uses tu contraseña normal de Gmail** en scripts. En su lugar, usa **Contraseñas de Aplicación** que son más seguras.

## 🚀 **Paso a Paso**

### **Paso 1: Habilitar Verificación en Dos Pasos**

1. Ve a [myaccount.google.com](https://myaccount.google.com)
2. Selecciona **Seguridad**
3. En "Iniciar sesión en Google", selecciona **Verificación en 2 pasos**
4. Sigue los pasos para activarla

### **Paso 2: Generar Contraseña de Aplicación**

1. Ve a [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Selecciona **Aplicación** → **Otra (nombre personalizado)**
3. Escribe: `INMORTAL_OS Commits`
4. Haz clic en **Generar**
5. **Copia la contraseña de 16 caracteres** (se muestra solo una vez)

### **Paso 3: Configurar Variable de Entorno**

#### **En Windows (PowerShell):**
```powershell
# Temporal (solo para esta sesión)
$env:GMAIL_APP_PASSWORD="tu_contraseña_de_16_caracteres"

# Permanente (para todas las sesiones)
[Environment]::SetEnvironmentVariable("GMAIL_APP_PASSWORD", "tu_contraseña_de_16_caracteres", "User")
```

#### **En Windows (CMD):**
```cmd
# Temporal
set GMAIL_APP_PASSWORD=tu_contraseña_de_16_caracteres

# Permanente
setx GMAIL_APP_PASSWORD "tu_contraseña_de_16_caracteres"
```

#### **En Git Bash:**
```bash
# Temporal
export GMAIL_APP_PASSWORD="tu_contraseña_de_16_caracteres"

# Permanente (agregar al ~/.bashrc)
echo 'export GMAIL_APP_PASSWORD="tu_contraseña_de_16_caracteres"' >> ~/.bashrc
source ~/.bashrc
```

### **Paso 4: Verificar Configuración**

```bash
# Verificar que la variable esté configurada
echo $GMAIL_APP_PASSWORD

# Probar envío de email
npm run email:send
```

## 🔧 **Configuración Avanzada**

### **Personalizar Asunto del Email**

Edita `config/email-config.json`:
```json
{
  "email": {
    "subject_template": "🚀 [{{REPO_NAME}}] {{COMMIT_MESSAGE_SHORT}}"
  }
}
```

### **Cambiar Destinatario**

Edita `scripts/send-commit-email.py`:
```python
EMAIL_CONFIG = {
    'recipient_email': 'otro-email@gmail.com'  # Cambiar aquí
}
```

### **Configurar Múltiples Destinatarios**

```python
# En send-commit-email.py
recipients = [
    'jarmando2965@gmail.com',
    'otro-email@gmail.com'
]

for recipient in recipients:
    msg['To'] = recipient
    # ... enviar email
```

## 🚨 **Solución de Problemas**

### **Error: "Authentication failed"**
- ✅ Verifica que la verificación en 2 pasos esté habilitada
- ✅ Usa la contraseña de aplicación, no tu contraseña normal
- ✅ Asegúrate de que la variable de entorno esté configurada

### **Error: "SMTP server connection failed"**
- ✅ Verifica tu conexión a internet
- ✅ Gmail puede bloquear conexiones desde ciertas redes
- ✅ Intenta desde otra red o usa VPN

### **Error: "Rate limit exceeded"**
- ✅ Gmail tiene límites de envío (500 emails/día para cuentas normales)
- ✅ Espera un tiempo antes de hacer más commits
- ✅ Considera usar una cuenta de Gmail específica para esto

### **No se envía el email**
- ✅ Verifica que Python esté instalado
- ✅ Verifica que la variable GMAIL_APP_PASSWORD esté configurada
- ✅ Revisa los logs del script

## 📱 **Notificaciones Móviles**

### **Configurar Gmail App**
1. Descarga la app de Gmail en tu móvil
2. Inicia sesión con `jarmando2965@gmail.com`
3. Habilita notificaciones push
4. Recibirás notificaciones instantáneas de cada commit

### **Configurar Filtros de Gmail**
1. Ve a Gmail → Configuración → Filtros
2. Crea filtro para emails con asunto "🚀 Commit:"
3. Marca como importante
4. Aplica etiqueta personalizada

## 🔒 **Seguridad Adicional**

### **Restringir Acceso por IP**
En la configuración de Gmail:
1. Ve a Seguridad → Actividad reciente de la cuenta
2. Revisa dispositivos conectados
3. Revoca acceso de dispositivos no autorizados

### **Monitoreo de Actividad**
- Revisa regularmente la actividad de tu cuenta
- Usa solo en redes confiables
- Cambia la contraseña de aplicación periódicamente

## 📊 **Estadísticas de Uso**

### **Límites de Gmail**
- **Cuentas normales:** 500 emails/día
- **Cuentas de trabajo:** 2000 emails/día
- **Cuentas de Google Workspace:** Sin límite

### **Optimización**
- Los emails se envían solo cuando hay commits
- Se guardan localmente como respaldo
- Se pueden deshabilitar temporalmente

## 🎉 **¡Listo para Usar!**

Una vez configurado:
1. **Cada commit** generará automáticamente un correo HTML
2. **Se enviará por email** a `jarmando2965@gmail.com`
3. **Se guardará localmente** en `commit-emails/`
4. **Se abrirá en el navegador** para vista previa

### **Comandos Útiles**
```bash
# Generar email manualmente
npm run email:send

# Solo generar HTML (sin enviar)
npm run email:generate

# Configurar hook automático
npm run email:setup

# Ver configuración de email
npm run email:config
```

---

**¡Disfruta de tus correos HTML profesionales enviados automáticamente! 🎨📧✨**
