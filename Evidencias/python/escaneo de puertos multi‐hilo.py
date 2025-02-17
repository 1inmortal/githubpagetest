#!/usr/bin/env python3
"""
========================================================================
Título: Escáner Avanzado de Puertos y Envío de Paquetes Personalizados con Scapy
Descripción:
    Este script integra varias técnicas avanzadas de ciberseguridad, combinando:
      - Escaneo de puertos multi‐hilo concurrente.
      - Captura de banners en puertos abiertos.
      - Envío de paquetes ICMP personalizados utilizando la biblioteca scapy.

    Se utiliza un ThreadPoolExecutor para el escaneo paralelo de puertos y se muestra
    información detallada a través de logging. Además, se envía un paquete ICMP con
    datos personalizados al objetivo para demostrar el uso de scapy.

Advertencia:
    Este script es únicamente para fines educativos y de demostración en entornos
    controlados. No lo utilices sin autorización en redes o sistemas que no te pertenezcan.
========================================================================
"""

import argparse
import socket
import logging
from concurrent.futures import ThreadPoolExecutor, as_completed
import sys
import time

# Intentamos importar scapy. Si no está instalada, se informa al usuario y se finaliza el script.
try:
    from scapy.all import IP, ICMP, sr1, conf
except ImportError:
    print("La biblioteca 'scapy' no está instalada. Instálala con: pip install scapy")
    sys.exit(1)

# Configuración de logging para mostrar mensajes detallados y con formato.
logging.basicConfig(
    level=logging.DEBUG,  # Nivel de logging: DEBUG mostrará todos los mensajes
    format='%(asctime)s [%(levelname)s] %(message)s',
    datefmt='%H:%M:%S'
)

def banner_grab(ip: str, port: int, timeout: float = 3.0) -> str:
    """
    Intenta conectarse a un puerto específico en el host y capturar su banner.

    Parámetros:
        ip (str): Dirección IP del objetivo.
        port (int): Puerto a escanear.
        timeout (float): Tiempo máximo de espera para la conexión.

    Retorna:
        str: El banner obtenido o un mensaje indicando que no se obtuvo.
    """
    try:
        # Se crea un socket TCP para conectarse al puerto objetivo
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(timeout)  # Se establece el tiempo de espera
            result = s.connect_ex((ip, port))
            if result == 0:  # Si el puerto está abierto
                try:
                    # Se envía una petición HTTP HEAD para intentar obtener el banner
                    s.sendall(b'HEAD / HTTP/1.0\r\n\r\n')
                    banner = s.recv(1024).decode().strip()
                    logging.debug(f"Banner en {ip}:{port} -> {banner}")
                    return banner if banner else "Sin banner"
                except Exception as e:
                    logging.debug(f"Error al obtener banner en {ip}:{port}: {e}")
                    return "Sin banner (error)"
            else:
                return ""
    except Exception as e:
        logging.error(f"Error en conexión a {ip}:{port}: {e}")
        return ""

def scan_port(ip: str, port: int) -> dict:
    """
    Escanea un puerto en el host y devuelve el estado y, en caso de estar abierto, el banner.

    Parámetros:
        ip (str): Dirección IP del objetivo.
        port (int): Puerto a escanear.

    Retorna:
        dict: Diccionario con la información del puerto, incluyendo:
              - 'ip': Dirección IP escaneada.
              - 'port': Número de puerto.
              - 'status': 'Abierto' o 'Cerrado'.
              - 'banner': Banner obtenido (si está disponible).
    """
    logging.debug(f"Iniciando escaneo en {ip}:{port}")
    result = {'ip': ip, 'port': port, 'status': 'Cerrado', 'banner': None}
    try:
        # Se crea un socket TCP para intentar conectarse al puerto
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(1)  # Tiempo de espera de 1 segundo
            if s.connect_ex((ip, port)) == 0:
                result['status'] = 'Abierto'
                # Si el puerto está abierto, se intenta obtener el banner
                result['banner'] = banner_grab(ip, port)
                logging.info(f"Puerto abierto encontrado: {ip}:{port}")
    except Exception as e:
        logging.error(f"Error escaneando {ip}:{port} -> {e}")
    return result

def enviar_paquete_icmp(target: str) -> None:
    """
    Envía un paquete ICMP personalizado al objetivo y muestra la respuesta.

    Parámetros:
        target (str): Dirección IP del objetivo.
    """
    logging.info(f"Enviando paquete ICMP a {target}")
    try:
        # Construcción del paquete ICMP con datos personalizados
        paquete = IP(dst=target) / ICMP() / b'Paquete ICMP personalizado'
        # Se envía el paquete y se espera una respuesta, con timeout de 3 segundos
        respuesta = sr1(paquete, timeout=3, verbose=0)
        if respuesta:
            logging.info(f"Respuesta recibida de {target}:")
            respuesta.show()  # Muestra los detalles de la respuesta
        else:
            logging.warning(f"No se recibió respuesta de {target}.")
    except Exception as e:
        logging.error(f"Error al enviar paquete ICMP a {target}: {e}")

def main():
    """
    Función principal:
    - Procesa los argumentos de línea de comandos.
    - Resuelve la dirección IP del objetivo.
    - Escanea un rango de puertos de forma concurrente.
    - Muestra la información de los puertos abiertos y sus banners.
    - Envía un paquete ICMP personalizado al objetivo.
    """
    # Configuración del parser de argumentos
    parser = argparse.ArgumentParser(
        description="Escáner avanzado de puertos y prueba de ICMP con scapy"
    )
    parser.add_argument('target', help="Dirección IP o nombre de host a escanear")
    parser.add_argument('--ports', type=str, default="1-1024",
                        help="Rango de puertos a escanear (ej. 20-1024)")
    parser.add_argument('--threads', type=int, default=100,
                        help="Número de hilos para el escaneo concurrente")
    args = parser.parse_args()

    target = args.target
    try:
        # Se resuelve el nombre de host a una dirección IP
        ip_target = socket.gethostbyname(target)
    except socket.gaierror:
        logging.error(f"No se pudo resolver el host: {target}")
        sys.exit(1)
    logging.info(f"Iniciando escaneo en {target} ({ip_target})")

    # Procesar el rango de puertos proporcionado
    try:
        port_range = args.ports.split('-')
        start_port = int(port_range[0])
        end_port = int(port_range[1]) if len(port_range) > 1 else start_port
    except Exception as e:
        logging.error(f"Error al procesar el rango de puertos: {e}")
        sys.exit(1)

    open_ports = []  # Lista para almacenar información de puertos abiertos

    # Escaneo concurrente de puertos usando ThreadPoolExecutor
    with ThreadPoolExecutor(max_workers=args.threads) as executor:
        # Se crea un futuro por cada puerto a escanear
        future_to_port = {
            executor.submit(scan_port, ip_target, port): port 
            for port in range(start_port, end_port + 1)
        }
        # Se itera sobre los futuros a medida que se completan
        for future in as_completed(future_to_port):
            result = future.result()
            if result['status'] == 'Abierto':
                open_ports.append(result)
                print(f"[+] Puerto {result['port']} abierto | Banner: {result['banner']}")
            else:
                logging.debug(f"Puerto {result['port']} cerrado.")

    logging.info(f"Escaneo completado. Puertos abiertos: {len(open_ports)}")
    
    # Envío de paquete ICMP personalizado al objetivo
    logging.info("Iniciando prueba ICMP personalizada con scapy.")
    enviar_paquete_icmp(ip_target)

if __name__ == '__main__':
    inicio = time.time()  # Marca el inicio de la ejecución
    main()
    fin = time.time()  # Marca el fin de la ejecución
    logging.info(f"Tiempo total de ejecución: {fin - inicio:.2f} segundos")
