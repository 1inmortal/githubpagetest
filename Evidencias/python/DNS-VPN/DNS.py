import os

def limpiar_dns_windows():
    # Limpiar la caché DNS en Windows
    os.system('ipconfig /flushdns')
    print("Caché DNS limpiada en Windows.")

# Llamar a la función
limpiar_dns_windows()
