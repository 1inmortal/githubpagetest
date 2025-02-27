import PyPDF2
import pyttsx3
from transformers import pipeline

def extraer_texto_pdf(ruta_pdf):
    """Extrae el texto de todas las páginas de un archivo PDF."""
    texto = ""
    try:
        with open(ruta_pdf, "pdf/guia_ciberseguridad_para_todos.pdf") as archivo:
            lector = PyPDF2.PdfReader(archivo)
            for pagina in lector.pages:
                texto += pagina.extract_text() + "\n"
    except Exception as e:
        print(f"Error al leer el PDF: {e}")
    return texto

def listar_voces(engine):
    """Muestra las voces disponibles en el motor TTS."""
    voces = engine.getProperty('voices')
    for indice, voz in enumerate(voces):
        print(f"{indice}: {voz.name} - {voz.languages}")

def hablar_texto(texto, indice_voz=0, velocidad=150):
    """Lee el texto en voz alta usando la voz seleccionada."""
    engine = pyttsx3.init()
    voces = engine.getProperty('voices')
    if indice_voz < 0 or indice_voz >= len(voces):
        print("Índice de voz no válido. Se usará la voz por defecto.")
    else:
        engine.setProperty('voice', voces[indice_voz].id)
    engine.setProperty('rate', velocidad)
    engine.say(texto)
    engine.runAndWait()

def dividir_texto(texto, longitud_max=1000):
    """Divide el texto en fragmentos para procesarlo en el resumen.
       Se basa en la longitud (número de caracteres) de cada fragmento.
    """
    fragmentos = []
    inicio = 0
    while inicio < len(texto):
        fragmentos.append(texto[inicio:inicio+longitud_max])
        inicio += longitud_max
    return fragmentos

def generar_resumen(texto, max_long=130, min_long=30):
    """Genera un resumen del texto utilizando un pipeline de Hugging Face."""
    resumen_final = ""
    # Dividimos el texto en fragmentos para no sobrepasar el límite del modelo
    fragmentos = dividir_texto(texto, longitud_max=1000)
    resumidor = pipeline("summarization")
    for fragmento in fragmentos:
        # Evitar procesar fragmentos muy cortos
        if len(fragmento) < min_long:
            continue
        resumen = resumidor(fragmento, max_length=max_long, min_length=min_long, do_sample=False)
        resumen_final += resumen[0]['summary_text'] + " "
    return resumen_final.strip()

def main():
    # Solicitar al usuario la ruta del PDF
    ruta_pdf = input("Introduce la ruta de tu documento PDF: ")
    texto_pdf = extraer_texto_pdf(ruta_pdf)
    
    if not texto_pdf.strip():
        print("No se pudo extraer texto del PDF o está vacío.")
        return
    
    print("El texto se extrajo correctamente del PDF.\n")
    
    # Configurar el motor de TTS y mostrar las opciones de voz
    engine = pyttsx3.init()
    print("Selecciona la voz que prefieras:")
    listar_voces(engine)
    try:
        indice_voz = int(input("Introduce el número de la voz deseada: "))
    except ValueError:
        print("Entrada no válida. Se usará la voz por defecto (índice 0).")
        indice_voz = 0
    
    # Leer el texto en voz alta
    print("\nLeyendo el documento en voz alta...\n")
    hablar_texto(texto_pdf, indice_voz=indice_voz)
    
    # Generar y mostrar un resumen del contenido
    print("\nGenerando resumen del documento...\n")
    resumen = generar_resumen(texto_pdf)
    print("Resumen del documento:")
    print(resumen)

if __name__ == "__main__":
    main()
