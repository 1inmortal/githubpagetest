import os
import textwrap
import google.generativeai as genai

# Si no está en Jupyter, devuelve solo texto plano
def to_markdown(text):
    return text  # Muestra solo el texto sin intentar procesarlo como Markdown

# 🔹 Verifica si el paquete está instalado, si no, lo instala automáticamente
def install_package():
    try:
        import google.generativeai
    except ImportError:
        print("📦 Instalando google-generativeai...")
        os.system("pip install google-generativeai")


# 🔹 Configura la API Key
def configure_api():
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")  # Usa la variable de entorno para la API Key

    if not GOOGLE_API_KEY:
        GOOGLE_API_KEY = input("🔑 Ingresa tu API Key de Gemini: ").strip()
        os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY  # Guarda la clave en la sesión

    genai.configure(api_key=GOOGLE_API_KEY)


# 🔹 Genera texto con la API de Gemini
def generate_text(prompt):
    model = genai.GenerativeModel("gemini-1.5-pro")

    print("⏳ Generando respuesta...")
    response = model.generate_content(prompt)

    return response.text


# 🔹 Función principal
def main():
    install_package()
    configure_api()

    prompt = input("📝 Escribe un mensaje para Gemini: ")
    response = generate_text(prompt)

    print("\n🔹 Respuesta de Gemini:")
    print(to_markdown(response))  # Solo texto plano


if __name__ == "__main__":
    main()
