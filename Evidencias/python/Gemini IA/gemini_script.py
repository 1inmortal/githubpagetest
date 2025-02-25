import os
import google.generativeai as genai

def to_markdown(text):
    return text  # Devuelve solo texto plano

def install_package():
    try:
        import google.generativeai
    except ImportError:
        print("📦 Instalando google-generativeai...")
        os.system("pip install google-generativeai")

def configure_api():
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    if not GOOGLE_API_KEY:
        GOOGLE_API_KEY = input("🔑 Ingresa tu API Key de Gemini: ").strip()
        os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY
    genai.configure(api_key=GOOGLE_API_KEY)

def generate_text(prompt):
    model = genai.GenerativeModel("gemini-1.5-pro")
    print("⏳ Generando respuesta...")
    response = model.generate_content(prompt)
    return response.text

def main():
    install_package()
    configure_api()
    
    while True:
        prompt = input("📝 Escribe un mensaje para Gemini (o 'salir' para terminar): ")
        if prompt.lower() == 'salir':
            print("👋 Saliendo del programa. ¡Hasta la próxima!")
            break
        
        response = generate_text(prompt)
        print("\n🔹 Respuesta de Gemini:")
        print(to_markdown(response))

if __name__ == "__main__":
    main()
