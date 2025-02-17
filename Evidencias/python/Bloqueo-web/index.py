# -------------------------------------------------------
# Título: Web con Bloqueo Progresivo por Falta de Pago
# Descripción:
#   Este programa implementa un mecanismo para oscurecer progresivamente
#   el contenido de un sitio web usando Flask. Si un cliente no realiza el pago
#   en la fecha establecida, se incrementa la opacidad de un overlay negro sobre la página,
#   bloqueando gradualmente el acceso al contenido.
#
#   Además, se ha ampliado el HTML para incluir secciones adicionales (Servicios,
#   Testimonios y Blog) con animaciones y contenido interactivo gestionado mediante JS.
#
#   Advertencia:
#       Este ejemplo es ilustrativo y puede tener implicaciones legales y éticas.
#       Asegúrate de contar con el consentimiento explícito del cliente y cumplir la legislación
#       aplicable antes de implementarlo en producción.
#
# Autor: INMORTAL
# Fecha: 17/02/2025
# -------------------------------------------------------

from flask import Flask, render_template
from datetime import datetime, timedelta

app = Flask(__name__)

@app.route("/")
def index():
    # Variable de ejemplo: True si se ha recibido el pago, False en caso contrario.
    payment_received = False  # Cambia este valor según la verificación real del pago
    
    # Fecha de vencimiento del pago: se establece para mañana
    due_date = datetime.now() + timedelta(days=1)
    now = datetime.now()  # Fecha y hora actual

    if payment_received:
        overlay_opacity = 0
    else:
        delta_days = (now - due_date).days
        if delta_days < 0:
            delta_days = 0
        max_days = 10
        overlay_opacity = min(delta_days / max_days, 1)

    # Renderizamos la plantilla externa "index.html" ubicada en la carpeta "templates"
    return render_template("index.html", opacity=overlay_opacity)

if __name__ == "__main__":
    app.run(debug=True)
