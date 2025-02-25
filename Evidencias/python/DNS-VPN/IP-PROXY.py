import requests

# Datos del proxy (sustituir con los tuyos)
proxy_ip = "123.45.67.89"  # Dirección IP del proxy
proxy_port = "8080"  # Puerto del proxy

proxies = {
    "http": f"http://{proxy_ip}:{proxy_port}",
    "https": f"https://{proxy_ip}:{proxy_port}",
}

# Prueba hacer una solicitud usando el proxy
try:
    response = requests.get("http://www.example.com", proxies=proxies)
    print("Página cargada correctamente")
    print(response.text)  # Muestra el contenido de la página
except requests.exceptions.RequestException as e:
    print(f"Error al conectar con el proxy: {e}")
