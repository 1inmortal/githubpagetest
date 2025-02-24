import os

# Ruta base donde se crearán las carpetas y archivos
base_path = r"Tu aubicacion del archivo donde lo guardaras"

# Estructura de carpetas
folders = [
    "scraper",           # Código del rastreador
    "scraper/logs",      # Registros de ejecución
    "scraper/data",      # Datos extraídos
    "scraper/configs"    # Configuraciones
]

# Crear las carpetas
for folder in folders:
    folder_path = os.path.join(base_path, folder)
    os.makedirs(folder_path, exist_ok=True)
    print(f"Carpeta creada o ya existente: {folder_path}")

# Archivos a crear con contenido base
files_content = {
    "scraper/main.py": """import requests
from bs4 import BeautifulSoup

def scrape(url):
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        return [a["href"] for a in soup.find_all("a", href=True)]
    return []

if __name__ == "__main__":
    url = "https://example.com"
    links = scrape(url)
    print("Enlaces encontrados:", links)
""",
    "scraper/config.py": """# Configuración del rastreador
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
TIMEOUT = 5
""",
    "scraper/requirements.txt": """requests
beautifulsoup4
""",
    "scraper/logs/log.txt": "",  # Archivo vacío para logs
    "scraper/data/output.json": ""  # Archivo vacío para datos extraídos
}

# Crear archivos con contenido
for file, content in files_content.items():
    file_path = os.path.join(base_path, file)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Archivo creado: {file_path}")

print("✅ Estructura de rastreador creada correctamente.")
