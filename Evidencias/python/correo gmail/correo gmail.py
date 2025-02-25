import smtplib
from email.message import EmailMessage
import ssl  # Importa el módulo ssl

def email_alert(subject, body, to, html_content=None):
    """
    Envia un correo electrónico a través de Gmail.

    Args:
        subject (str): El asunto del correo.
        body (str): El cuerpo del correo en texto plano.
        to (str): La dirección de correo electrónico del destinatario.
        html_content (str, optional): El contenido HTML del correo. Defaults to None.
    """
    msg = EmailMessage()
    msg['Subject'] = subject
    msg['To'] = to
    msg['From'] = "jarmando2965@gmail.com"  # Reemplaza con tu dirección de Gmail
    user = " jarmando2965@gmail.com"

    # **IMPORTANTE: Usar contraseñas de aplicaciones si tienes habilitado 2FA en tu cuenta de Google.**
    password = "lcyg ltuv iiig wank"  # Utiliza una contraseña de aplicación en lugar de tu contraseña de Gmail principal

    msg.set_content(body)  # Establece el cuerpo del correo en texto plano

    # Si hay contenido HTML, añádelo
    if html_content:
        msg.add_alternative(html_content, subtype='html')
        # Esto asegura que si el cliente de correo puede mostrar HTML, lo mostrará,
        # sino mostrará el contenido de texto plano que ya definimos con `set_content`.

    try:
        # Contexto SSL para una conexión segura (necesario para Gmail)
        context = ssl.create_default_context()

        # Usar SSL al conectar (puerto 465) o TLS (puerto 587 con starttls)
        with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as server:  # Usar SMTP_SSL
            server.login(user, password)
            server.send_message(msg)
            print("Correo enviado correctamente!")

    except Exception as e:
        print(f"Error al enviar el correo: {e}")

if __name__ == "__main__":
    # Define el contenido HTML aquí (puedes usar la variable `cuerpo_html` de tu código original)
    cuerpo_html = """
    <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <title>Portfolio Dev - [Tu Nombre]</title>
    <style>
        /* Reset y Estilos Base */
        body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; 
               font-family: 'Segoe UI', system-ui, sans-serif; line-height: 1.6;
               background: #0f172a; color:rgb(71, 109, 148); }
        
        .container { max-width: 680px; margin: 0 auto; padding: 30px; }
        
        /* Componentes Reutilizables */
        .section-card { background: #1e293b; border-radius: 12px; padding: 25px; margin: 20px 0; }
        .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; }
        .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        
        /* Encabezado */
        .profile-header { text-align: center; margin-bottom: 30px; }
        .avatar { width: 120px; height: 120px; border-radius: 50%; border: 3px solid #3b82f6; }
        
        /* GitHub Spotlight */
        .github-section { background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%); }
        .commit-feed { border-left: 2px solid #3b82f6; padding-left: 20px; }
        
        /* Habilidades Técnicas */
        .skill-meter { height: 8px; background: #334155; border-radius: 4px; margin: 10px 0; }
        .skill-progress { height: 100%; background: linear-gradient(90deg, #3b82f6, #6366f1); border-radius: 4px; }
        
        /* Responsive */
        @media (max-width: 600px) {
            .grid-2 { grid-template-columns: 1fr; }
            .container { padding: 15px; }
        }
    </style>
</head>

<body>
    <div class="container">
        <!-- Encabezado del Perfil -->
       <header class="profile-header">
    <img src="https://media.licdn.com/dms/image/v2/D4E03AQFZu3kCTJa-8Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1731334107436?e=1746057600&v=beta&t=OE0H1br-2Zuwokl07q6wq9whzxH8cHm8bCs4-m1A6Ak" class="avatar" alt="José Armando">
    
    <h1 style="color: #3b82f6; margin: 15px 0;">Espinosa Martinez Jose Armando</h1>
    
    <div style="margin: 15px 0;">
        <a href="https://github.com/1inmortal" target="_blank">
            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" style="width: 28px; margin: 0 10px;">
        </a>
        <a href="https://www.linkedin.com/in/jos%C3%A9-armando-espinosa-25b615337/" target="_blank">
            <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" style="width: 28px;">
        </a>
    </div>
    
    <p style="color: #94a3b8;">Full Stack Developer | Especialista en React & Python</p>
</header>

        <!-- Spotlight de GitHub -->
        <section class="section-card github-section">
            <div class="grid-2">
                <div>
                    <h2 style="color: #3b82f6; margin-top: 0;">⚡ Actividad GitHub</h2>
                    <div style="margin-bottom: 20px;">
                        <p><img src="https://cdn-icons-png.flaticon.com/512/2103/2103633.png" style="width: 20px; vertical-align: middle;"> 
                           <strong>45</strong> Repositorios públicos</p>
                        <p><img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" style="width: 20px; vertical-align: middle;"> 
                           <strong>1.2k</strong> Estrellas obtenidas</p>
                    </div>
                    <img src="https://i.pinimg.com/originals/75/87/df/7587df77ef521cf98057d0028ee983f1.gif" alt="Contribuciones" style="width: 100%;">
                </div>
                <!-- Mantener misma estructura para commits -->
            </div>
        </section>

        <!-- Stack Tecnológico -->
        <section class="section-card">
            <h2 style="color: #3b82f6; margin-top: 0;">🛠 Stack Principal</h2>
            <div class="grid-2">
                <div>
                    <div style="display: flex; align-items: center; margin-bottom: 15px;">
                        <img src="https://cdn-icons-png.flaticon.com/512/5968/5968350.png" alt="Frontend" style="width: 40px; margin-right: 15px;">
                        <h3 style="margin: 0;">Frontend</h3>
                    </div>
                    <!-- Mantener barras de progreso -->
                </div>
                <div>
                    <div style="display: flex; align-items: center; margin-bottom: 15px;">
                        <img src="https://cdn-icons-png.flaticon.com/512/6132/6132222.png" alt="Backend" style="width: 40px; margin-right: 15px;">
                        <h3 style="margin: 0;">Backend</h3>
                        <span class="badge" style="background: #f59e0b; margin-left: 10px;">En Progreso</span>
                    </div>
                    <!-- Mantener barras de progreso -->
                </div>
            </div>
        </section>

        <!-- Proyectos Destacados -->
        <section class="section-card">
            <h2 style="color: #3b82f6; margin-top: 0;">🚀 Proyectos Recientes</h2>
            <div class="grid-2">
                <div>
                    <img src="https://i.pinimg.com/originals/28/30/75/283075280f79736a42f4faab23668110.gif" alt="Dashboard" style="width: 100%; border-radius: 8px;">
                    <!-- Mantener contenido de proyecto -->
                </div>
                <div>
                    <img src="https://i.pinimg.com/originals/fc/f8/d3/fcf8d352ade303f7070f269d8fd7e33a.gif" alt="API" style="width: 100%; border-radius: 8px;">
                    <!-- Mantener contenido de proyecto -->
                </div>
            </div>
        </section>

        <!-- Contribuciones Open Source -->
        <section class="section-card">
            <h2 style="color: #3b82f6; margin-top: 0;">👥 Contribuciones Destacadas</h2>
            <div style="background: #0f172a; padding: 20px; border-radius: 8px; margin-top: 15px;">
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <img src="https://cdn-icons-png.flaticon.com/512/1183/1183672.png" alt="React" style="width: 40px; margin-right: 15px;">
                    <!-- Mantener contenido React -->
                </div>
                <!-- Mantener código de ejemplo -->
            </div>
        </section>

        <!-- Secciones restantes (mantener estructura) -->
        
        <!-- Certificaciones -->
        <section class="section-card">
            <h2 style="color: #3b82f6; margin-top: 0;">🏆 Certificaciones</h2>
            <div class="grid-2" style="margin-top: 20px;">
                <img src="https://media.licdn.com/dms/image/v2/D4E22AQEeYjdNgtE-9w/feedshare-shrink_800/B4EZSkfy2ZGwAg-/0/1737926586903?e=1743638400&v=beta&t=QMRJDDnq_0VwOLNuskRuX00YnP9AmW5F48wyC8LV658" alt="AWS" style="width: 100%; border-radius: 8px;">
                <img src="https://example.com/certificaciones/react-certified.png" alt="React" style="width: 100%; border-radius: 8px;">
            </div>
        </section>

        <!-- Blog Técnico -->
        <section class="section-card">
            <h2 style="color: #3b82f6; margin-top: 0;">✍️ Último Artículo</h2>
            <div class="grid-2" style="align-items: center; margin-top: 15px;">
                <img src="https://i.pinimg.com/736x/bb/3d/5e/bb3d5ead3434e17ac956be6b4183238f.jpg" alt="Blog" style="width: 100%; border-radius: 8px;">
                <!-- Mantener contenido del artículo -->
            </div>
        </section>

        <!-- Footer (mantener mismo contenido) -->
    </div>
</body>
</html>
"""
    # Llama a la función para enviar el correo
    email_alert(
        subject="Resumen de Proyectos QuantumCode",
        body="Este es el cuerpo del correo en texto plano.  Por favor, ve la versión HTML para una mejor experiencia.",
        to="juangamer140@gmail.com",
        html_content=cuerpo_html  # Usa el contenido HTML definido arriba
    )

