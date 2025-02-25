import requests  # Para hacer solicitudes HTTP
from bs4 import BeautifulSoup  # Para analizar el HTML y extraer información

class WebScraper:
    def __init__(self, url_inicial, max_profundidad=1):
        # Inicialización de variables: URL inicial y profundidad máxima para el rastreo
        self.url_inicial = url_inicial
        self.max_profundidad = max_profundidad
        self.visitadas = set()  # Conjunto para almacenar las URLs que ya han sido visitadas
        self.enlaces_encontrados = set()  # Conjunto para almacenar los enlaces encontrados en el rastreo

    def rastrear(self, url_actual, profundidad=0):
        # Si la profundidad excede la máxima o si ya hemos visitado la URL, terminamos el rastreo
        if profundidad > self.max_profundidad or url_actual in self.visitadas:
            return

        # Imprimimos la URL que estamos rastreando y la profundidad
        print(f"Rastreando: {url_actual} (Profundidad: {profundidad})")
        
        # Añadimos la URL actual al conjunto de páginas visitadas
        self.visitadas.add(url_actual)

        # Cabeceras HTTP que simulan una solicitud de un navegador real
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
            'Referer': ''  # Referer se deja vacío, pero se puede personalizar si se desea
        }

        try:
            # Realizamos la solicitud HTTP con las cabeceras y un tiempo de espera
            respuesta = requests.get(url_actual, headers=headers, timeout=5)

            # Si la respuesta no es exitosa (código de estado no 2xx), lanza una excepción
            respuesta.raise_for_status()

            # Analizamos el contenido HTML de la respuesta con BeautifulSoup
            sopa = BeautifulSoup(respuesta.text, "html.parser")

            # Buscamos todos los enlaces (etiquetas <a>) con atributo href
            for enlace in sopa.find_all("a", href=True):
                url_enlace = enlace["href"]  # Extraemos el enlace

                # Filtramos los enlaces para asegurarnos de que sean absolutos (http o https)
                if url_enlace.startswith("http"):
                    # Añadimos el enlace encontrado al conjunto de enlaces encontrados
                    self.enlaces_encontrados.add(url_enlace)

                    # Llamamos a la función rastrear recursivamente para seguir explorando los enlaces
                    self.rastrear(url_enlace, profundidad + 1)

        except requests.RequestException as e:
            # Si ocurre un error (como un problema de conexión o un error HTTP), lo capturamos y lo mostramos
            print(f"Error al acceder a: {url_actual} - {e}")

# Crear una instancia del rastreador y pasar la URL inicial y la profundidad máxima
scraper = WebScraper("https://www.speedtest.net/es", max_profundidad=1)

# Comenzamos el rastreo desde la URL inicial
scraper.rastrear(scraper.url_inicial)

# Mostramos los enlaces que han sido encontrados durante el rastreo
print("\nEnlaces encontrados:")
for enlace in scraper.enlaces_encontrados:
    print(enlace)
