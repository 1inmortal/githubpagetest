import os
import nmap
import openai
import smtplib
from email.mime.text import MIMEText
import schedule
import time
from datetime import datetime
from dotenv import load_dotenv

# Cargar variables de entorno desde el archivo .env
load_dotenv()

# Configuraciones de OpenAI
openai.api_key = os.getenv('OPENAI_API_KEY')

# Configuraciones de Email
EMAIL_ADDRESS = os.getenv('EMAIL_ADDRESS')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')
SMTP_SERVER = os.getenv('SMTP_SERVER')
SMTP_PORT = int(os.getenv('SMTP_PORT', 587))
DESTINATARIO_EMAIL = os.getenv('DESTINATARIO_EMAIL')

def escanear_puertos(ip_objetivo):
    """
    Escanea los puertos abiertos en la IP objetivo utilizando nmap.
    """
    nm = nmap.PortScanner()
    print(f"[{datetime.now()}] Iniciando escaneo en {ip_objetivo}...")
    nm.scan(ip_objetivo, arguments='-sV')  # -sV para detectar versiones de servicios
    if ip_objetivo in nm.all_hosts():
        return nm[ip_objetivo].all_tcp()
    else:
        print(f"[{datetime.now()}] No se encontraron hosts activos en {ip_objetivo}.")
        return []

def generar_informe(resultados_escaner):
    """
    Genera un informe analizando los resultados del escaneo con la API de OpenAI.
    """
    if not resultados_escaner:
        return "No se encontraron puertos abiertos o el host no está activo."

    # Formatear los resultados para el análisis
    detalles_puertos = ""
    for puerto in resultados_escaner:
        estado = resultados_escaner[puerto]['state']
        servicio = resultados_escaner[puerto]['name']
        version = resultados_escaner[puerto]['version']
        detalles_puertos += f"Puerto {puerto}/TCP: {estado} - Servicio: {servicio} - Versión: {version}\n"

    prompt = (
        "Eres un experto en seguridad informática. Analiza los siguientes resultados de escaneo de puertos y detecta posibles vulnerabilidades:\n\n"
        f"{detalles_puertos}\n\nInforme:"
    )

    try:
        respuesta = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "Eres un asistente que ayuda a analizar escaneos de puertos y detectar vulnerabilidades."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=500,
            temperature=0.5,
        )
        informe = respuesta.choices[0].message['content'].strip()
        return informe
    except Exception as e:
        print(f"Error al comunicarse con la API de OpenAI: {e}")
        return "Error al generar el informe de análisis."

def enviar_correo(asunto, cuerpo, destinatario):
    """
    Envía un correo electrónico con el asunto y cuerpo especificados.
    """
    mensaje = MIMEText(cuerpo, 'plain', 'utf-8')
    mensaje['Subject'] = asunto
    mensaje['From'] = EMAIL_ADDRESS
    mensaje['To'] = destinatario

    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.sendmail(EMAIL_ADDRESS, destinatario, mensaje.as_string())
        print(f"[{datetime.now()}] Correo enviado a {destinatario}.")
    except Exception as e:
        print(f"Error al enviar el correo: {e}")

def tarea_de_escaner():
    """
    Tarea programada que realiza el escaneo, genera el informe y envía el correo.
    """
    ip_objetivo = '192.168.1.1'  # Reemplaza con la IP que deseas escanear
    resultados = escanear_puertos(ip_objetivo)
    informe = generar_informe(resultados)
    asunto = f"Informe de Seguridad - {datetime.now().strftime('%Y-%m-%d')}"
    enviar_correo(asunto, informe, DESTINATARIO_EMAIL)

def main():
    """
    Configura la programación de tareas y mantiene el script en ejecución.
    """
    # Programar la tarea (puedes ajustar según tus necesidades)
    schedule.every().day.at("08:00").do(tarea_de_escaner)      # Diario a las 08:00
    # schedule.every().monday.at("09:00").do(tarea_de_escaner) # Semanal los lunes a las 09:00

    print("El programa de escaneo de seguridad está en ejecución.")
    while True:
        schedule.run_pending()
        time.sleep(60)  # Espera un minuto antes de verificar nuevamente

if __name__ == "__main__":
    main()
