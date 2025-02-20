import random

def juego_dados(apuesta):
    # Simular el lanzamiento de dos dados (valores del 1 al 6)
    dado1 = random.randint(1, 6)
    dado2 = random.randint(1, 6)
    # Concatenar los resultados para formar un número (por ejemplo, 4 y 4 -> 44)
    resultado = int(f"{dado1}{dado2}")
    print(f"\nResultado de los dados: {dado1} y {dado2} -> {resultado}")
    
    if resultado == apuesta:
        print("¡Ganaste en el juego de dados!")
    else:
        print("No acertaste en el juego de dados.")
    
    return resultado

def juego_ruleta(resultado_dados):
    # Si el resultado de los dados es 44, forzamos la ruleta a ser 'Negro'
    if resultado_dados == 44:
        color_ruleta = "Negro"
        print("¡Resultado especial! Al haber salido 44, la ruleta se condiciona a:", color_ruleta)
        numero_ruleta = None  # No se asigna número en este caso
    else:
        # Simular giro de ruleta (número entre 0 y 36)
        numero_ruleta = random.randint(0, 36)
        # Asignación de color de forma simplificada:
        # 0 será Verde; si el número es par será Negro; si es impar será Rojo.
        if numero_ruleta == 0:
            color_ruleta = "Verde"
        elif numero_ruleta % 2 == 0:
            color_ruleta = "Negro"
        else:
            color_ruleta = "Rojo"
        print(f"Resultado de la ruleta: {numero_ruleta} - {color_ruleta}")
    
    return numero_ruleta, color_ruleta

def main():
    print("Bienvenido al juego de Dados y Ruleta.")
    
    while True:
        try:
            apuesta = int(input("\nApuesta un número (por ejemplo, 44, 11, 22, etc.): "))
        except ValueError:
            print("Por favor, ingresa un número válido.")
            continue

        print("\n--- Juego de Dados ---")
        resultado_dados = juego_dados(apuesta)
        
        print("\n--- Juego de Ruleta ---")
        juego_ruleta(resultado_dados)
        
        # Preguntar si se desea jugar otra ronda
        respuesta = input("\n¿Quieres jugar otra vez? (s/n): ").strip().lower()
        if respuesta != "s":
            print("¡Gracias por jugar!")
            break

if __name__ == "__main__":
    main()
