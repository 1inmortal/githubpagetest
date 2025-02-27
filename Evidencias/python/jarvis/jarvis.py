import speech_recognition as sr
import pyttsx3
import datetime
import wikipedia
import webbrowser
import os
import random
import subprocess  # Importa subprocess para ejecutar comandos del sistema

# Inicializamos el motor de síntesis de voz
engine = pyttsx3.init()
voices = engine.getProperty('voices')
# Seleccionamos una voz (ajusta el índice según tus preferencias o sistema)
engine.setProperty('voice', voices[0].id)

def speak(text):
    """Convierte el texto a voz."""
    engine.say(text)
    engine.runAndWait()

def listen():
    """Escucha el audio del micrófono y lo convierte en texto."""
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Escuchando...")
        recognizer.pause_threshold = 1  # Ajusta el umbral de pausa si es necesario
        audio = recognizer.listen(source)
    try:
        print("Reconociendo...")
        query = recognizer.recognize_google(audio, language='es-ES')
        print(f"Usuario dijo: {query}")
    except sr.UnknownValueError:
        print("No te he entendido, repite por favor.")
        speak("No te he entendido, repite por favor.")
        return ""
    except sr.RequestError as e:
        print(f"No se pudo conectar con el servicio de reconocimiento de voz; {e}")
        speak("No pude acceder al servicio de reconocimiento de voz. Comprueba tu conexión a internet.")
        return ""
    return query

def greet():
    """Saluda al usuario según la hora del día."""
    hour = datetime.datetime.now().hour
    if 6 <= hour < 12:
        greet_text = "Buenos días, soy Jarvis. ¿En qué puedo ayudarte?"
    elif 12 <= hour < 18:
        greet_text = "Buenas tardes, soy Jarvis. ¿En qué puedo ayudarte?"
    else:
        greet_text = "Buenas noches, soy Jarvis. ¿En qué puedo ayudarte?"
    speak(greet_text)

def process_query(query):
    """Procesa y ejecuta el comando solicitado por el usuario."""
    query = query.lower()

    if 'wikipedia' in query:
        speak("Buscando en Wikipedia...")
        query = query.replace("wikipedia", "")
        try:
            results = wikipedia.summary(query, sentences=2)
            speak("Según Wikipedia")
            print(results)
            speak(results)
        except Exception as e:
            speak("Lo siento, no encontré resultados en Wikipedia.")

    elif 'abrir youtube' in query:
        speak("Abriendo YouTube.")
        webbrowser.open("https://www.youtube.com")

    elif 'abrir google' in query or 'abrir el navegador' in query:
        speak("Abriendo Google.")
        webbrowser.open("https://www.google.com")

    elif 'hora' in query:
        strTime = datetime.datetime.now().strftime("%H:%M:%S")
        speak(f"La hora actual es {strTime}")

    elif 'reproducir música' in query:
        # Cambia esta ruta por la ubicación de tu carpeta de música
        music_dir = "C:/Users/TuUsuario/Music" #**IMPORTANTE: Reemplaza con tu ruta.**
        try:
            songs = os.listdir(music_dir)
            if songs:
                song = random.choice(songs)
                speak(f"Reproduciendo {song}")
                os.startfile(os.path.join(music_dir, song))
            else:
                speak("No encontré canciones en la carpeta de música.")
        except Exception as e:
            speak("Ocurrió un error al intentar reproducir música.")

    elif 'apagar sistema' in query:
        speak("Apagando el sistema. Hasta luego.")
        os.system("shutdown /s /t 1")

    elif 'reiniciar sistema' in query:
        speak("Reiniciando el sistema.")
        os.system("shutdown /r /t 1")

    elif 'cerrar sesión' in query:
        speak("Cerrando sesión.")
        os.system("shutdown -l")

    elif 'salir' in query or 'adiós' in query or 'terminar' in query:
        speak("Hasta luego, cuídate.")
        exit(0)

    #  Ejecutar aplicaciones (Más flexible usando subprocess)
    elif 'abrir' in query:
        query = query.replace("abrir", "").strip()
        try:
            speak(f"Abriendo {query}.")
            subprocess.Popen([query])  # Intenta abrir la aplicación por nombre
        except FileNotFoundError:
            speak(f"No pude encontrar una aplicación llamada {query}.")
        except Exception as e:
            speak(f"Ocurrió un error al abrir {query}: {e}")

    #  Control de volumen (Ejemplo - Requiere ajustes específicos del sistema)
    elif 'subir volumen' in query:
        speak("Subiendo el volumen.")
        #  Aquí iría el código específico para subir el volumen en tu sistema
        #  Ejemplo (Linux usando amixer):  subprocess.call(["amixer", "-D", "pulse", "sset", "Master", "5%+"])
        print("Subir volumen (IMPLEMENTAR CÓDIGO ESPECÍFICO DEL SISTEMA)")  # Placeholder
    elif 'bajar volumen' in query:
        speak("Bajando el volumen.")
        #  Aquí iría el código específico para bajar el volumen en tu sistema
        #  Ejemplo (Linux usando amixer): subprocess.call(["amixer", "-D", "pulse", "sset", "Master", "5%-"])
        print("Bajar volumen (IMPLEMENTAR CÓDIGO ESPECÍFICO DEL SISTEMA)")  # Placeholder

    else:
        speak("Lo siento, no reconozco ese comando. Por favor, intenta de nuevo.")

def main():
    """Función principal que inicializa a Jarvis y mantiene el bucle de escucha."""
    greet()
    while True:
        query = listen()
        if query:
            process_query(query)
        else:
            continue

if __name__ == "__main__":
    main()