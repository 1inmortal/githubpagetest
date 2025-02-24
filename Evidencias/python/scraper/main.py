import requests
from bs4 import BeautifulSoup
import json
import os
import logging
from configs.config import USER_AGENT, TIMEOUT

# Configuración de logs
logging.basicConfig(filename="logs/log.txt", level=logging.INFO, format="%(asctime)s - %(message)s")



def scrape(url):
    headers = {"User-Agent": USER_AGENT}
    try:
        response = requests.get(url, headers=headers, timeout=TIMEOUT)
        response.raise_for_status()  # Lanza un error si el estado no es 200

        soup = BeautifulSoup(response.text, "html.parser")
        links = [a["href"] for a in soup.find_all("a", href=True)]
        
        # Guardar los enlaces en un archivo JSON
        output_path = "data/output.json"
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(links, f, indent=4)

        logging.info(f"Scrape exitoso en {url} - {len(links)} enlaces encontrados.")
        return links

    except requests.exceptions.RequestException as e:
        logging.error(f"Error al hacer scraping en {url}: {e}")
        return []

if __name__ == "__main__":
    url = "https://www3.animeflv.net/ver/kekkai-sensen-1"  # Cambia esto por la URL que deseas analizar
    enlaces = scrape(url)
    print("Enlaces encontrados:", enlaces)
