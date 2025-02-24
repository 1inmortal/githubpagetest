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
    user = "jarmando2965@gmail.com"

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
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        font-family: 'Segoe UI', Arial, sans-serif;
        background: linear-gradient(135deg, #0a192f 0%, #1a365d 100%);
        color: #ffffff;
        margin: 0;
        padding: 20px 0;
        line-height: 1.5;
      }

      .container {
        max-width: 680px;
        margin: 0 auto;
        background: rgba(16, 24, 39, 0.95);
        border-radius: 16px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 40px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      }

      h1 {
        color: #00f3ff;
        text-align: center;
        font-size: 2.4em;
        margin-bottom: 30px;
        text-shadow: 0 0 15px rgba(0, 243, 255, 0.3);
      }

      h2 {
        color: #7b61ff;
        text-align: center;
        font-size: 2em;
        margin-bottom: 25px;
      }

      h3, p {
        color: #ffffff;
      }

      .cta-button {
        background: linear-gradient(135deg, #7b61ff 0%, #00f3ff 100%);
        color: #ffffff;
        padding: 14px 32px;
        border-radius: 8px;
        font-weight: bold;
        text-align: center;
        display: inline-block;
        margin: 25px 0;
        text-decoration: none;
        box-shadow: 0 4px 15px rgba(123, 97, 255, 0.3);
        transition: transform 0.3s ease;
      }

      .cta-button:hover {
        transform: translateY(-2px);
      }

      .project-card {
        background: rgba(255, 255, 255, 0.05);
        padding: 20px;
        border-radius: 12px;
        margin-bottom: 20px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 4px 12px rgba(0, 243, 255, 0.2);
      }

      .project-card h3 {
        color: #00f3ff;
        margin-bottom: 10px;
      }

      .project-card p {
        margin-bottom: 10px;
      }

      .tech-stack {
        display: flex;
        justify-content: center;
        gap: 25px;
        margin: 30px 0;
      }

      .tech-icon {
        width: 50px;
        filter: drop-shadow(0 0 8px rgba(0, 243, 255, 0.3));
      }

      .social-links {
        text-align: center;
        margin-top: 40px;
        padding-top: 30px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }

      .social-button {
        background: linear-gradient(135deg, #7b61ff 0%, #00f3ff 100%);
        color: #ffffff;
        padding: 12px 28px;
        margin: 10px;
        border-radius: 8px;
        font-weight: bold;
        display: inline-block;
        text-decoration: none;
        transition: transform 0.3s ease;
      }

      .social-button:hover {
        transform: translateY(-4px);
      }

      .timeline {
        border-left: 3px solid #7b61ff;
        padding-left: 25px;
        margin: 30px 0;
      }

      .timeline-item {
        margin: 20px 0;
        position: relative;
      }

      .timeline-item:before {
        content: "";
        position: absolute;
        left: -30px;
        top: 5px;
        width: 12px;
        height: 12px;
        background: #00f3ff;
        border-radius: 50%;
      }

      ul {
        color: #ffffff;
        margin-left: 20px;
        padding-left: 10px;
      }

      li {
        margin-bottom: 8px;
        line-height: 1.6;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>🚀 Resumen del Proyecto: QuantumCode</h1>
      
      <!-- Sección Línea Temporal Cuántica -->
      <h2>⏳ Línea Temporal Cuántica</h2>
      <div class="project-card">
        <h3>⚡ Hitos de Desarrollo</h3>
        <div class="timeline">
          <div class="timeline-item">
            <p><strong>2025-Q3:</strong> Integración con computación cuántica de IBM</p>
          </div>
          <div class="timeline-item">
            <p><strong>2026-Q1:</strong> Lanzamiento del SDK para desarrolladores</p>
          </div>
          <div class="timeline-item">
            <p><strong>2026-Q4:</strong> Implementación de algoritmos post-cuánticos</p>
          </div>
        </div>
      </div>

      <!-- Sección Colaboraciones Galácticas -->
      <h2>🌌 Colaboraciones Galácticas</h2>
      <div class="project-card">
        <h3>🔗 Alianzas Interdimensionales</h3>
        <p>Proyectos conjuntos con organizaciones pioneras en tecnología cuántica:</p>
        <ul>
          <li>NASA Quantum Lab - Optimización de trayectorias espaciales</li>
          <li>CERN Q-Network - Simulación de partículas subatómicas</li>
        </ul>
        <a href="#" class="cta-button">Ver Alianzas</a>
      </div>

      <!-- Sección Innovaciones Disruptivas -->
      <h2>🧠 Innovaciones Disruptivas</h2>
      <div class="project-card">
        <h3>🤖 Neuro-Interfaces Cuánticas</h3>
        <p>Desarrollo de interfaces cerebro-computadora utilizando:</p>
        <div class="tech-stack">
          <img src="https://cdn-icons-png.flaticon.com/512/2587/2587902.png" class="tech-icon" alt="NeuroTech">
          <img src="https://cdn-icons-png.flaticon.com/512/2332/2332498.png" class="tech-icon" alt="Quantum Processor">
        </div>
        <p>Latencia reducida a 0.5ns - Compatibilidad con implantes neurales</p>
      </div>

      <!-- Sección Realidad Holográfica -->
      <h2>🌀 Realidad Holográfica</h2>
      <div class="project-card">
        <h3>📡 Proyecto HoloCore</h3>
        <p>Sistema de renderizado holográfico en tiempo real usando:</p>
        <div class="tech-stack">
          <img src="https://cdn-icons-png.flaticon.com/512/3522/3522669.png" class="tech-icon" alt="Photonics">
          <img src="https://cdn-icons-png.flaticon.com/512/1260/1260667.png" class="tech-icon" alt="AI Rendering">
        </div>
        <p>Resolución 8K holográfica - Soporte para multi-usuario</p>
        <a href="#" class="cta-button">Demo Interactiva</a>
      </div>

      <!-- Sección Seguridad Cuántica -->
      <h2>🔐 Seguridad Cuántica</h2>
      <div class="project-card">
        <h3>🛡️ Q-Shield Protocol</h3>
        <p>Criptografía post-cuántica con:</p>
        <ul>
          <li>Encriptación lattice-based</li>
          <li>Autenticación biométrica cuántica</li>
          <li>Protección contra ataques Q-Day</li>
        </ul>
        <div class="tech-stack">
          <img src="https://cdn-icons-png.flaticon.com/512/2092/2092663.png" class="tech-icon" alt="Cryptography">
        </div>
      </div>

      <!-- Secciones Originales -->
      <h2>Proyectos en GitHub</h2>
      <div class="project-card">
        <h3>✨ Proyecto: QuantumAI</h3>
        <p><strong>Descripción:</strong> Desarrollo de un sistema de inteligencia artificial para la predicción cuántica.</p>
        <p><strong>Estado:</strong> Finalizado, versión 1.0 desplegada.</p>
        <a href="https://github.com/1inmortal/quantum-ai" class="cta-button">Ver Proyecto</a>
      </div>

      <div class="project-card">
        <h3>🛠 Proyecto: QuantumCloud</h3>
        <p><strong>Descripción:</strong> Integración de tecnologías cuánticas con la nube de AWS.</p>
        <p><strong>Estado:</strong> En desarrollo, versión 0.9.</p>
        <a href="https://github.com/1inmortal/quantum-cloud" class="cta-button">Ver Proyecto</a>
      </div>

      <div class="tech-stack">
        <img src="https://cdn-icons-png.flaticon.com/512/5968/5968350.png" class="tech-icon" alt="Python">
        <img src="https://cdn-icons-png.flaticon.com/512/6132/6132222.png" class="tech-icon" alt="C++">
        <img src="https://cdn-icons-png.flaticon.com/512/1260/1260667.png" class="tech-icon" alt="AI">
      </div>

      <center>
        <a href="https://github.com/1inmortal" class="cta-button">Explorar Repositorio</a>
      </center>

      <div class="social-links">
        <a href="https://github.com/1inmortal" class="social-button">GitHub</a>
        <a href="https://www.linkedin.com/in/1inmortal/" class="social-button">LinkedIn</a>
        <a href="https://twitter.com/1inmortal" class="social-button">Twitter</a>
        <a href="https://gitlab.com/1inmortal" class="social-button">GitLab</a>
      </div>

      <p style="text-align: center; color: #7b61ff; margin-top: 25px;">
        ✉️ Contacto: equipo@quantumcode.dev | 🌐 www.quantumcode.dev
      </p>
    </div>
  </body>
</html>
"""
    # Llama a la función para enviar el correo
    email_alert(
        subject="Resumen de Proyectos QuantumCode",
        body="Este es el cuerpo del correo en texto plano.  Por favor, ve la versión HTML para una mejor experiencia.",
        to="jarmando2965@gmail.com",
        html_content=cuerpo_html  # Usa el contenido HTML definido arriba
    )

