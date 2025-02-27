import cv2
import numpy as np
import time

# Cargar el clasificador de rostros de OpenCV
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Iniciar la cámara con CAP_DSHOW para evitar algunos errores en Windows
cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)

# Verificar que la cámara se abrió correctamente
if not cap.isOpened():
    print("No se pudo abrir la cámara.")
    exit()

# Ajustar resolución y FPS para equilibrar calidad y rendimiento
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
cap.set(cv2.CAP_PROP_FPS, 30)

# Rangos de color de piel (pueden ajustarse según la iluminación)
lower_skin = np.array([0, 20, 70], dtype=np.uint8)
upper_skin = np.array([20, 255, 255], dtype=np.uint8)

def detect_faces(frame, cascade):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5, minSize=(30, 30))
    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)  # Verde para rostro
    return frame

def detect_hands(frame, lower_skin, upper_skin):
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    mask = cv2.inRange(hsv, lower_skin, upper_skin)
    mask = cv2.GaussianBlur(mask, (5, 5), 0)
    
    # Aplicar operaciones morfológicas para reducir el ruido
    kernel = np.ones((3, 3), np.uint8)
    mask = cv2.erode(mask, kernel, iterations=1)
    mask = cv2.dilate(mask, kernel, iterations=1)
    
    contours, _ = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    for contour in contours:
        area = cv2.contourArea(contour)
        if area > 5000:  # Filtrar pequeños ruidos
            x, y, w, h = cv2.boundingRect(contour)
            cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)  # Azul para manos
    return frame

# Variables para medir FPS
prev_frame_time = 0
new_frame_time = 0

while True:
    new_frame_time = time.time()
    ret, frame = cap.read()  # Leer frame de la cámara

    if not ret:
        print("Error al leer el frame. Verificando la cámara...")
        break

    # Procesar detección de rostros y manos
    frame = detect_faces(frame, face_cascade)
    frame = detect_hands(frame, lower_skin, upper_skin)
    
    # Calcular y mostrar los FPS
    fps = 1 / (new_frame_time - prev_frame_time) if prev_frame_time != 0 else 0
    prev_frame_time = new_frame_time
    cv2.putText(frame, f'FPS: {int(fps)}', (10, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 255), 2)

    # Mostrar el video en tiempo real
    cv2.imshow('Detección de Rostro y Manos', frame)

    # Salir con la tecla 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Liberar la cámara y cerrar ventanas
cap.release()
cv2.destroyAllWindows()
