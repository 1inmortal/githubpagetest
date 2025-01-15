import java.util.Scanner; // Importa la clase Scanner para la entrada del usuario

// Clase principal de la calculadora
public class Calculadora {
    public static void main(String[] args) {
        // Crea un objeto Scanner para leer las entradas del usuario
        Scanner scanner = new Scanner(System.in);
        boolean continuar = true; // Variable de control para repetir el programa

        // Mensaje de bienvenida
        System.out.println("Bienvenido a la Calculadora Básica");
        System.out.println("----------------------------------");

        // Bucle principal para permitir múltiples cálculos
        while (continuar) {
            try {
                // Solicita al usuario ingresar el primer número
                System.out.print("Ingrese el primer número: ");
                double num1 = scanner.nextDouble();

                // Solicita al usuario ingresar el operador aritmético
                System.out.print("Ingrese el operador (+, -, *, /): ");
                char operador = scanner.next().charAt(0);

                // Solicita al usuario ingresar el segundo número
                System.out.print("Ingrese el segundo número: ");
                double num2 = scanner.nextDouble();

                // Llama al método realizarCalculo para obtener el resultado
                double resultado = realizarCalculo(num1, num2, operador);
                System.out.println("Resultado: " + resultado); // Muestra el resultado
            } catch (Exception e) {
                // Captura errores por entradas no válidas y muestra un mensaje
                System.out.println("Error: Entrada no válida. Por favor, intente de nuevo.");
                scanner.nextLine(); // Limpia el buffer del Scanner para evitar problemas
            }

            // Pregunta al usuario si desea realizar otro cálculo
            System.out.print("¿Desea realizar otro cálculo? (S/N): ");
            char respuesta = scanner.next().toUpperCase().charAt(0); // Convierte la respuesta a mayúscula
            continuar = (respuesta == 'S'); // Determina si el bucle continúa
        }

        // Mensaje de despedida
        System.out.println("Gracias por usar la calculadora. ¡Hasta luego!");
        scanner.close(); // Cierra el objeto Scanner para liberar recursos
    }

    /**
     * Realiza el cálculo según el operador ingresado.
     *
     * @param num1 Primer número
     * @param num2 Segundo número
     * @param operador Operador aritmético
     * @return Resultado de la operación
     * @throws IllegalArgumentException Si el operador no es válido o si hay división por cero
     */
    private static double realizarCalculo(double num1, double num2, char operador) {
        // Determina la operación según el operador ingresado
        switch (operador) {
            case '+':
                return num1 + num2; // Suma de los dos números
            case '-':
                return num1 - num2; // Resta de los dos números
            case '*':
                return num1 * num2; // Multiplicación de los dos números
            case '/':
                // Verifica si el divisor es cero para evitar errores
                if (num2 == 0) {
                    throw new IllegalArgumentException("No se puede dividir por cero.");
                }
                return num1 / num2; // División de los dos números
            default:
                // Lanza una excepción si el operador no es válido
                throw new IllegalArgumentException("Operador no válido.");
        }
    }
}

