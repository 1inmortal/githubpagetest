import time

T_int = 5000000  # Total de iteraciones
T_T = 5.0  # Tiempo total deseado en segundos
I_M = 1000000  # Número de interacciones por bloque

# Inicia el bucle para las iteraciones totales
start_time = time.time()  # Registro de inicio del tiempo total
for i in range(T_int):
    # Realizar las interacciones dentro de un bloque de I_M iteraciones
    if i % I_M == 0 and i != 0:  # Cada vez que llegamos a I_M iteraciones
        end_time = time.time()  # Final del bloque de iteraciones
        T_total = end_time - start_time  # Cálculo del tiempo total
        print(f"Bloque completado con {i} iteraciones. Tiempo total: {T_total} segundos")
        
        # Si se alcanza el tiempo total deseado (aproximadamente T_T), salimos del bucle
        if T_total >= T_T:
            break

# Mostrar el resultado final
end_time = time.time()  # Final del tiempo total
T_total_final = end_time - start_time
print(f"Tiempo total al final: {T_total_final} segundos")
print(f"Iteraciones completadas: {i + 1}")


