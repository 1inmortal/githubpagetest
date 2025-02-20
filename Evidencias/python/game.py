import random

def mostrar_menu():
    print("\n=========================")
    print("  ¡Bienvenido al juego!  ")
    print("=========================")
    print("1. Jugar")
    print("2. Salir")

def adivina_el_numero():
    
    numero = 55
    control = 0
    intentos = 1
    

    print("\nHe seleccionado un número entre 1 y 100. ¿Puedes adivinarlo?")

    while control == 0:
        try:
            adivinanza = int(input("Introduce tu número: "))

            if adivinanza < numero:
                print("Demasiado bajo. Intenta de nuevo.")
            elif adivinanza > numero:
                print("Demasiado alto. Intenta de nuevo.")
            else:
                print(f"¡Felicidades! Has adivinado el número {numero} en {intentos} intentos.")
                control = 1
                break

            intentos += 1
        except ValueError:
            print("Por favor, introduce un número válido.")

def main():
    while True:
        mostrar_menu()
        opcion = input("Selecciona una opción: ")

        if opcion == "1":
            adivina_el_numero()
        elif opcion == "2":
            print("Gracias por jugar. ¡Hasta la próxima!")
            break
        else:
            print("Opción no válida. Intenta de nuevo.")

if __name__ == "__main__":
    main()


# tarea un numero de entrada juego de dados si sale 44 negro etc ect ruleta condicionadolo 