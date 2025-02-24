import random

class Ruleta:
    def __init__(self, saldo_inicial=500):
        self.saldo = saldo_inicial
        self.numeros_rojos = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]  # Números rojos
        self.numeros_negros = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]  # Números negros

    def jugar(self):
        while self.saldo > 0:
            print(f"\nSaldo actual: {self.saldo} puntos.")
            color = input("¿A qué color deseas apostar? (rojo/negro): ").lower()
            while color not in ['rojo', 'negro']:
                print("Opción inválida. Intenta de nuevo.")
                color = input("¿A qué color deseas apostar? (rojo/negro): ").lower()

            numero = int(input("¿A qué número deseas apostar? (entre 1 y 36): "))
            while numero < 1 or numero > 36:
                print("Número inválido. Intenta de nuevo.")
                numero = int(input("¿A qué número deseas apostar? (entre 1 y 36): "))

            cantidad = int(input(f"¿Cuántos puntos deseas apostar? (Saldo disponible: {self.saldo}): "))
            while cantidad > self.saldo or cantidad <= 0:
                print(f"Apuesta inválida. Debes apostar entre 1 y {self.saldo} puntos.")
                cantidad = int(input(f"¿Cuántos puntos deseas apostar? (Saldo disponible: {self.saldo}): "))

            self.ruleta_girar(color, numero, cantidad)

        print("Te has quedado sin puntos. ¡Game Over!")

    def ruleta_girar(self, color, numero, cantidad):
        resultado_numero = random.randint(1, 36)
        # Determinamos el color del número
        if resultado_numero in self.numeros_rojos:
            resultado_color = 'rojo'
        else:
            resultado_color = 'negro'

        print(f"La ruleta ha caído en el número {resultado_numero} ({resultado_color}).")

        # Comprobamos si el jugador ha acertado color y número
        if resultado_color == color and resultado_numero == numero:
            print(f"¡Ganaste {cantidad * 35} puntos! El número y color coinciden.")
            self.saldo += cantidad * 35  # Si acierta, gana la apuesta multiplicada por 35
        else:
            print(f"Perdiste {cantidad} puntos.")
            self.saldo -= cantidad

# Crear una instancia de la ruleta y comenzar el juego
ruleta = Ruleta()
ruleta.jugar()
