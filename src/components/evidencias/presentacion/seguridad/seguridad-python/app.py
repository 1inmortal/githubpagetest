import sys
import os
import typing
# Removed dotenv and google.generativeai imports as they are no longer needed
import time

from PySide6.QtWidgets import (
    QApplication, QMainWindow, QWidget, QVBoxLayout, QHBoxLayout,
    QPushButton, QLabel, QStackedWidget, QFrame, QScrollArea,
    QTableWidget, QTableWidgetItem, QHeaderView, QTextEdit, QLineEdit,
    QCheckBox, QSpacerItem, QSizePolicy, QGridLayout, QMessageBox
)
from PySide6.QtGui import QIcon, QPixmap, QFont, QMovie, QColor, QPalette
from PySide6.QtCore import (
    Qt, QSize, Signal, Slot, QObject, QCoreApplication # Removed QRunnable, QThreadPool
)

# --- No AI Configuration Needed ---
print("AI Integration has been removed.")


# --- No AI Worker Needed ---


# --- Widget Contenedor Base para Secciones ---
class SectionWidget(QWidget):
    # Removed request_ai_signal
    # request_ai_signal = Signal(str, str) # prompt, target_widget_id

    def __init__(self, title, parent=None):
        super().__init__(parent)
        self.setObjectName("SectionContainer") # Para QSS
        self.main_layout = QVBoxLayout(self)
        self.main_layout.setContentsMargins(25, 25, 25, 25) # Simula padding CSS
        self.main_layout.setSpacing(15)

        self.title_label = QLabel(title)
        self.title_label.setObjectName("SectionTitle")
        self.main_layout.addWidget(self.title_label, alignment=Qt.AlignmentFlag.AlignLeft)

        # Contenido específico será añadido por subclases
        self.content_layout = QVBoxLayout() # Layout para el contenido real
        self.main_layout.addLayout(self.content_layout)
        self.main_layout.addStretch(1) # Empuja contenido hacia arriba

    def _create_card(self, header_text="", icon_name=None):
        """ Helper para crear un widget 'Card' simulado """
        card = QFrame()
        card.setObjectName("Card")
        card.setFrameShape(QFrame.Shape.StyledPanel) # Da un borde sutil
        card_layout = QVBoxLayout(card)
        card_layout.setContentsMargins(20, 15, 20, 15)

        if header_text:
            header_label = QLabel(header_text)
            header_label.setObjectName("CardHeader")
            # Icono: Más complejo, requiere QLabel + QPixmap o un widget custom
            card_layout.addWidget(header_label)

        content_widget = QWidget() # Contenedor para el contenido real de la card
        card_layout.addWidget(content_widget)
        return card, content_widget # Devuelve la card y dónde añadir contenido

    # --- Removed AI Response Area Helper ---
    # def _create_ai_response_area(...)

    # --- Helper para Status Dot (Simplificado con texto) ---
    def _status_dot_label(self, status_type, text):
        colors = {
            "success": "#00ff88",
            "warning": "#ffd700",
            "danger": "#ff4d4d",
            "info": "#a0a0a0"
        }
        color = colors.get(status_type, "#e0e0e0")
        # Usamos un caracter ● y color, ya que dibujar círculos es más complejo
        # Usamos   para asegurar un espacio después del punto
        return QLabel(f"<span style='color:{color}; font-size: 14pt;'>●</span> {text}")

    # --- Helper para botones pequeños ---
    def _create_small_button(self, text, object_name=None, button_type="normal"):
        btn = QPushButton(text)
        base_style = "padding: 4px 10px; font-size: 8pt; text-transform: none;" # Quitamos uppercase para botones pequeños
        if object_name:
            btn.setObjectName(object_name)

        if button_type == "secondary":
            btn.setObjectName("SecondaryButton") # Asumiendo que tienes este ID en QSS
            # Aplicar estilo directamente por si QSS falla o para asegurar
            btn.setStyleSheet(base_style + " background-color: transparent; color: #00eaff; border: 1px solid #00eaff;")
        elif button_type == "danger":
            btn.setObjectName("DangerButton")
            btn.setStyleSheet(base_style + " background-color: #ff4d4d; color: #ffffff;")
        elif button_type == "success": # Añadimos success
             btn.setObjectName("SuccessButton")
             btn.setStyleSheet(base_style + " background-color: #00ff88; color: #0a0f2e;")
        else: # Botón normal (primario pequeño)
            btn.setStyleSheet(base_style + " background-color: #00eaff; color: #0a0f2e;")

        return btn

# --- Widgets Específicos para Cada Sección ---

class DashboardWidget(SectionWidget):
    def __init__(self, parent=None):
        super().__init__("Dashboard General", parent)

        grid_layout = QGridLayout()
        grid_layout.setSpacing(20)
        self.content_layout.addLayout(grid_layout)

        # Card 1: Estado Seguridad
        card1, content1 = self._create_card("Estado de Seguridad")
        layout1 = QVBoxLayout(content1)
        layout1.addWidget(self._status_dot_label("success", "Sistema: <strong>Protegido</strong>"))
        layout1.addWidget(QLabel(f"Último análisis: Hoy, {time.strftime('%H:%M')}"))
        layout1.addWidget(QLabel("Amenazas detectadas (24h): <strong>0</strong>"))
        grid_layout.addWidget(card1, 0, 0)

        # Card 2: Comportamiento Anómalo
        card2, content2 = self._create_card("Comportamiento Anómalo")
        layout2 = QVBoxLayout(content2)
        layout2.addWidget(self._status_dot_label("warning", "Actividad reciente: <strong>1 Sospechosa</strong>"))
        layout2.addWidget(QLabel("Origen: Inicio de sesión inusual (IP: 198.51.100.5)"))
        btn_investigar = self._create_small_button("Investigar", button_type="secondary")
        # btn_investigar.clicked.connect(...) # Conectar a cambio de página (requiere referencia a MainWindow o señal)
        layout2.addWidget(btn_investigar, alignment=Qt.AlignmentFlag.AlignLeft)
        grid_layout.addWidget(card2, 0, 1)

        # Card 3: Alertas Recientes
        card3, content3 = self._create_card("Alertas Recientes")
        layout3 = QVBoxLayout(content3)
        layout3.addWidget(QLabel("Alertas críticas: <strong>0</strong>"))
        layout3.addWidget(QLabel("Alertas medias: <strong>1</strong> (Contraseña débil)"))
        layout3.addWidget(QLabel("Alertas bajas: <strong>3</strong>"))
        btn_ver_alertas = self._create_small_button("Ver Alertas", button_type="secondary")
        # btn_ver_alertas.clicked.connect(...)
        layout3.addWidget(btn_ver_alertas, alignment=Qt.AlignmentFlag.AlignLeft)
        grid_layout.addWidget(card3, 1, 0)

        # Card 4: Resumen Tareas
        card4, content4 = self._create_card("Resumen de Tareas")
        layout4 = QVBoxLayout(content4)
        layout4.addWidget(QLabel("Contraseñas por revisar: <strong>2</strong>"))
        layout4.addWidget(QLabel("Configuración MFA pendiente: <strong>Sí (App Móvil)</strong>"))
        btn_ir_boveda = self._create_small_button("Ir a Bóveda", button_type="secondary")
        # btn_ir_boveda.clicked.connect(...)
        layout4.addWidget(btn_ir_boveda, alignment=Qt.AlignmentFlag.AlignLeft)
        grid_layout.addWidget(card4, 1, 1)

        # --- Removed AI Summary Card ---
        # grid_layout.addWidget(card_ai, 2, 0, 1, 2)

        # Ajustar estiramiento si es necesario (puede que no haga falta)
        grid_layout.setRowStretch(2, 1) # Añadir espacio extra al final


class AnomalyDetectionWidget(SectionWidget):
    def __init__(self, parent=None):
        super().__init__("Detección de Comportamientos Anómalos", parent)
        self.content_layout.addWidget(QLabel("Análisis basado en IA de patrones de uso para detectar actividades inusuales."))

        grid = QGridLayout()
        grid.setSpacing(15)
        self.content_layout.addLayout(grid)

        # Card 1: Inicio Sesión Inusual
        card1, content1 = self._create_card("Inicio de Sesión Inusual")
        card1.setStyleSheet("QFrame#Card { border-left: 5px solid #ffd700; }") # Warning color
        layout1 = QVBoxLayout(content1)
        layout1.addWidget(QLabel(f"<strong>Fecha:</strong> {time.strftime('%Y-%m-%d')}"))
        layout1.addWidget(QLabel("<strong>Hora:</strong> 09:15 AM (Simulada)"))
        layout1.addWidget(QLabel("<strong>IP:</strong> 198.51.100.5 (Ubicación desconocida)"))
        layout1.addWidget(QLabel("<strong>Dispositivo:</strong> Navegador Chrome (Windows)"))
        layout1.addWidget(QLabel("<strong>Razón:</strong> Primera vez desde esta IP/región."))
        btn_layout = QHBoxLayout()
        btn_layout.addWidget(self._create_small_button("Bloquear IP (Sim.)", button_type="danger"))
        btn_layout.addWidget(self._create_small_button("Marcar seguro (Sim.)", button_type="success")) # Usar success
        btn_layout.addStretch()
        layout1.addLayout(btn_layout)
        grid.addWidget(card1, 0, 0)

        # Card 2: Acceso Fuera Horario
        card2, content2 = self._create_card("Acceso Fuera de Horario")
        layout2 = QVBoxLayout(content2)
        ayer = time.strftime('%Y-%m-%d', time.localtime(time.time() - 86400))
        layout2.addWidget(QLabel(f"<strong>Fecha:</strong> {ayer} (Ayer)"))
        layout2.addWidget(QLabel("<strong>Hora:</strong> 03:30 AM (Simulada)"))
        layout2.addWidget(QLabel("<strong>Acción:</strong> Intento de modificación de perfil."))
        layout2.addWidget(self._status_dot_label("success", "Estado: Bloqueado por MFA."))
        grid.addWidget(card2, 0, 1)

        # --- Removed AI Analysis Area ---
        # self.content_layout.addWidget(ai_area)


class MfaWidget(SectionWidget):
    def __init__(self, parent=None):
        super().__init__("Gestión de Autenticación Multifactor (MFA)", parent)
        self.content_layout.addWidget(QLabel("Asegura tu cuenta requiriendo una segunda forma de verificación."))

        grid = QGridLayout()
        grid.setSpacing(15)
        self.content_layout.addLayout(grid)

        # Card 1: App Auth
        card1, content1 = self._create_card("App Autenticadora")
        layout1 = QVBoxLayout(content1)
        layout1.addWidget(self._status_dot_label("success", "Estado: Activo"))
        layout1.addWidget(QLabel("Recomendado para máxima seguridad."))
        layout1.addWidget(self._create_small_button("Configurar (Sim.)", button_type="secondary"), alignment=Qt.AlignmentFlag.AlignLeft)
        grid.addWidget(card1, 0, 0)

        # Card 2: SMS
        card2, content2 = self._create_card("SMS / Mensaje de Texto")
        layout2 = QVBoxLayout(content2)
        layout2.addWidget(self._status_dot_label("warning", "Estado: Inactivo"))
        layout2.addWidget(QLabel("Menos seguro que la app, pero mejor que nada."))
        layout2.addWidget(self._create_small_button("Activar (Sim.)"), alignment=Qt.AlignmentFlag.AlignLeft)
        grid.addWidget(card2, 0, 1)

        # Card 3: Claves Físicas
        card3, content3 = self._create_card("Claves Físicas (YubiKey)")
        layout3 = QVBoxLayout(content3)
        layout3.addWidget(self._status_dot_label("danger", "Estado: No configurado"))
        layout3.addWidget(QLabel("El método más seguro contra phishing."))
        layout3.addWidget(self._create_small_button("Más Info (Sim.)", button_type="secondary"), alignment=Qt.AlignmentFlag.AlignLeft)
        grid.addWidget(card3, 1, 0)

        # --- Removed AI Tip Area ---
        # self.content_layout.addWidget(ai_area)


class PasswordVaultWidget(SectionWidget):
    def __init__(self, parent=None):
        super().__init__("Bóveda de Contraseñas Segura", parent)
        self.content_layout.addWidget(QLabel("Gestiona y genera contraseñas fuertes para tus cuentas."))

        btn_layout = QHBoxLayout()
        btn_layout.addWidget(QPushButton("Añadir Nueva (Sim.)"))
        btn_layout.addWidget(QPushButton("Generar Segura (Sim.)", objectName="SecondaryButton"))
        btn_layout.addStretch()
        self.content_layout.addLayout(btn_layout)

        self.table = QTableWidget()
        self.table.setObjectName("PasswordTable") # Para posible estilo específico
        self.table.setColumnCount(5)
        self.table.setHorizontalHeaderLabels(["Sitio/Servicio", "Usuario", "Fortaleza", "Último Cambio", "Acciones"])
        self.table.verticalHeader().setVisible(False)
        self.table.setEditTriggers(QTableWidget.EditTrigger.NoEditTriggers)
        self.table.setSelectionBehavior(QTableWidget.SelectionBehavior.SelectRows)
        self.table.horizontalHeader().setSectionResizeMode(QHeaderView.ResizeMode.Stretch)
        self.table.horizontalHeader().setSectionResizeMode(4, QHeaderView.ResizeMode.ResizeToContents) # Columna Acciones
        self.table.setShowGrid(True) # Mostrar líneas de cuadrícula
        self.content_layout.addWidget(self.table)

        self._populate_table()

        # --- Removed AI Analysis Area ---
        # self.content_layout.addWidget(self.ai_area)

    def _populate_table(self):
        passwords = [
            {"site": "Banco XYZ", "username": "j.espinosa", "strength": "Fuerte", "lastChanged": "Hace 2 meses"},
            {"site": "Red Social A", "username": "jose.armando", "strength": "Débil", "lastChanged": "Hace 1 año"},
            {"site": "Correo Corp.", "username": "jespinosa@tic.com", "strength": "Media", "lastChanged": "Hace 6 meses"},
            {"site": "Tienda Online B", "username": "armando.e", "strength": "Fuerte", "lastChanged": "Hace 1 semana"},
            {"site": "Plataforma Cursos", "username": "jaem", "strength": "Media", "lastChanged": "Hace 3 meses"},
        ]
        self.table.setRowCount(len(passwords))

        # Removed strength_summary list creation
        for row, p in enumerate(passwords):
            site_item = QTableWidgetItem(p["site"])
            user_item = QTableWidgetItem(p["username"])
            changed_item = QTableWidgetItem(p["lastChanged"])

            user_item.setTextAlignment(Qt.AlignmentFlag.AlignCenter)
            changed_item.setTextAlignment(Qt.AlignmentFlag.AlignCenter)

            self.table.setItem(row, 0, site_item)
            self.table.setItem(row, 1, user_item)

            # Ítem de Fortaleza con color
            strength_item = QTableWidgetItem(p["strength"])
            color_map = {"Fuerte": "#00ff88", "Media": "#ffd700", "Débil": "#ff4d4d"}
            color = QColor(color_map.get(p["strength"], "#e0e0e0"))
            strength_item.setForeground(color)
            strength_item.setTextAlignment(Qt.AlignmentFlag.AlignCenter)
            self.table.setItem(row, 2, strength_item)
            # Removed append to strength_summary

            self.table.setItem(row, 3, changed_item)

            # Botones de acción
            btn_widget = QWidget()
            btn_l = QHBoxLayout(btn_widget)
            btn_l.setContentsMargins(2, 2, 2, 2)
            btn_l.setSpacing(5)
            btn_l.addWidget(self._create_small_button("👁️", button_type="secondary")) # Icono Ver
            btn_l.addWidget(self._create_small_button("🗑️", button_type="danger"))   # Icono Papelera
            btn_l.setAlignment(Qt.AlignmentFlag.AlignCenter) # Centrar botones en celda
            self.table.setCellWidget(row, 4, btn_widget)

        self.table.resizeRowsToContents()

        # --- Removed AI Prompt and Button Logic ---


class AlertsWidget(SectionWidget):
    def __init__(self, parent=None):
        super().__init__("Alertas Inteligentes", parent)
        self.content_layout.addWidget(QLabel("Notificaciones sobre eventos de seguridad importantes y recomendaciones."))

        # Layout para las tarjetas de alerta
        self.alerts_layout = QVBoxLayout()
        self.alerts_layout.setSpacing(10)
        self.content_layout.addLayout(self.alerts_layout)
        self.content_layout.addStretch(1) # Empujar alertas hacia arriba si son pocas

        self.alerts_data = []
        self._populate_alerts()

        # --- Removed AI Summary Area ---
        # self.content_layout.insertWidget(1, self.ai_area) # No insertar AI area

    def _time_ago(self, timestamp):
        # Implementación de time_ago (la misma que antes)
        now = time.time()
        diff = now - timestamp
        if diff < 60: return "Hace segs"
        if diff < 3600: return f"Hace {int(diff/60)} min"
        if diff < 86400: return f"Hace {int(diff/3600)} hr"
        if diff < 604800: return f"Hace {int(diff/86400)} día{'s' if int(diff/86400)>1 else ''}"
        return f"Hace {int(diff/604800)} sem"

    def _populate_alerts(self):
        # Limpiar layout anterior para evitar duplicados si se llama de nuevo
        while self.alerts_layout.count():
            item = self.alerts_layout.takeAt(0)
            widget = item.widget()
            if widget:
                widget.deleteLater()

        # Datos de ejemplo (los mismos que antes)
        self.alerts_data = [
            {'id': 1, 'severity': 'medium', 'title': 'Contraseña débil detectada', 'description': 'La contraseña para "Red Social A" es débil y podría estar en filtraciones.', 'timestamp': time.time() - 3600, 'read': False},
            {'id': 2, 'severity': 'low', 'title': 'Nuevo inicio de sesión', 'description': 'Se detectó un inicio de sesión desde nuevo dispositivo (Móvil Android).', 'timestamp': time.time() - 7200, 'read': False},
            {'id': 5, 'severity': 'medium', 'title': 'Intento de acceso bloqueado', 'description': 'Intento sospechoso desde IP 203.0.113.10 (País Y) bloqueado por MFA.', 'timestamp': time.time() - 10800, 'read': False},
            {'id': 3, 'severity': 'low', 'title': 'Revisión de seguridad recomendada', 'description': 'Revisa la seguridad de tu cuenta bancaria (hace 6 meses).', 'timestamp': time.time() - 86400 * 5, 'read': True},
            {'id': 4, 'severity': 'info', 'title': 'Política de privacidad actualizada', 'description': '"Plataforma Cursos" actualizó su política.', 'timestamp': time.time() - 172800 * 2, 'read': True},
        ]
        self.alerts_data.sort(key=lambda x: x['timestamp'], reverse=True) # Más recientes primero

        severity_map = {
            "high": {"color": "#ff4d4d", "icon": "⚠️"},
            "medium": {"color": "#ffd700", "icon": "🟡"},
            "low": {"color": "#00eaff", "icon": "ℹ️"},
            "info": {"color": "#a0a0a0", "icon": "🔔"}
        }

        # Removed unread_alerts_summary list

        if not self.alerts_data:
             no_alerts_label = QLabel("No hay alertas recientes.")
             no_alerts_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
             self.alerts_layout.addWidget(no_alerts_label)
        else:
            for alert in self.alerts_data:
                card = QFrame()
                card.setObjectName("Card") # Usar el estilo de Card
                card_layout = QVBoxLayout(card)
                card_layout.setSpacing(8) # Menos espaciado dentro de la card

                header_layout = QHBoxLayout()
                severity_info = severity_map.get(alert['severity'], severity_map['info'])
                icon_label = QLabel(severity_info['icon'])
                icon_label.setStyleSheet(f"font-size: 14pt; color: {severity_info['color']};")
                header_layout.addWidget(icon_label)

                title_label = QLabel(f"<strong>{alert['title']}</strong>")
                header_layout.addWidget(title_label, 1) # Stretch

                if not alert['read']:
                    unread_label = QLabel("●") # Indicador no leído
                    unread_label.setStyleSheet("color: #00eaff; font-size: 10pt; margin-left: 5px;")
                    header_layout.addWidget(unread_label)
                    # Removed append to unread_alerts_summary

                time_label = QLabel(self._time_ago(alert['timestamp']))
                time_label.setObjectName("MutedText") # Usar estilo muted
                time_label.setAlignment(Qt.AlignmentFlag.AlignRight)
                time_label.setStyleSheet("font-size: 8pt;") # Más pequeño
                header_layout.addWidget(time_label)

                card_layout.addLayout(header_layout)

                desc_label = QLabel(alert['description'])
                desc_label.setWordWrap(True)
                desc_label.setObjectName("MutedText") # Descripción más tenue
                card_layout.addWidget(desc_label)

                action_layout = QHBoxLayout()
                btn_read = self._create_small_button("Marcar leída", button_type="secondary")
                btn_read.setEnabled(not alert['read'])
                # btn_read.clicked.connect(lambda checked, a=alert: self.mark_alert_read(a['id'])) # Conectar acción
                action_layout.addWidget(btn_read)

                btn_delete = self._create_small_button("Eliminar", button_type="danger")
                # btn_delete.clicked.connect(lambda checked, a=alert: self.delete_alert(a['id'])) # Conectar acción
                action_layout.addWidget(btn_delete)
                action_layout.addStretch()
                card_layout.addLayout(action_layout)

                # Estilo diferente para no leídas
                border_style = f"QFrame#Card {{ border-left: 5px solid {severity_info['color']}; "
                if not alert['read']:
                    border_style += " background-color: rgba(26, 42, 108, 0.5); " # Un poco más oscuro
                border_style += "}"
                card.setStyleSheet(border_style)

                self.alerts_layout.addWidget(card)

        # --- Removed AI Prompt and Button Logic ---


class SettingsWidget(SectionWidget):
    # Esta sección no tenía IA, se mantiene igual
    def __init__(self, parent=None):
        super().__init__("Configuración General", parent)

        grid = QGridLayout()
        grid.setSpacing(15)
        self.content_layout.addLayout(grid)

        # Card 1: Perfil
        card1, content1 = self._create_card("Perfil de Usuario")
        layout1 = QGridLayout(content1) # Usar grid para alinear labels y inputs
        layout1.addWidget(QLabel("Nombre:"), 0, 0)
        name_input = QLineEdit("José Armando Espinosa Martínez")
        layout1.addWidget(name_input, 0, 1)
        layout1.addWidget(QLabel("Email:"), 1, 0)
        email_input = QLineEdit("ja.espinosa@tic.com")
        email_input.setReadOnly(True) # Deshabilitado como en el ejemplo
        email_input.setStyleSheet("background-color: rgba(255, 255, 255, 0.05);") # Indicar visualmente
        layout1.addWidget(email_input, 1, 1)
        btn_save = self._create_small_button("Guardar Cambios (Sim.)")
        layout1.addWidget(btn_save, 2, 1, alignment=Qt.AlignmentFlag.AlignRight)
        grid.addWidget(card1, 0, 0)

        # Card 2: Notificaciones
        card2, content2 = self._create_card("Preferencias de Notificación")
        layout2 = QVBoxLayout(content2)
        cb_email = QCheckBox("Recibir alertas críticas por email")
        cb_email.setChecked(True)
        layout2.addWidget(cb_email)
        cb_summary = QCheckBox("Recibir resumen semanal de seguridad")
        layout2.addWidget(cb_summary)
        layout2.addWidget(self._status_dot_label("warning", "Notificaciones push (móvil): Pendiente"))
        grid.addWidget(card2, 0, 1)

        # Card 3: Datos Cuenta
        card3, content3 = self._create_card("Gestión de Datos y Cuenta")
        layout3 = QVBoxLayout(content3)
        layout3.addWidget(self._create_small_button("Exportar mis datos (Sim.)", button_type="secondary"), alignment=Qt.AlignmentFlag.AlignLeft)
        layout3.addWidget(self._create_small_button("Eliminar mi cuenta (Sim.)", button_type="danger"), alignment=Qt.AlignmentFlag.AlignLeft)
        grid.addWidget(card3, 1, 0)

        grid.setColumnStretch(0, 1) # Que las columnas se estiren
        grid.setColumnStretch(1, 1)
        grid.setRowStretch(2, 1) # Espacio extra al final

# --- Secciones de Información del Proyecto (Simplificadas con QLabel) ---
# Estas secciones no tenían IA, se mantienen igual
class ProjectInfoWidget(SectionWidget):
    def __init__(self, parent=None):
        super().__init__("Información del Proyecto", parent)
        # Usar RichText para formateo básico
        info_text = """
        <style>
            p { margin-bottom: 10px; }
            strong { color: #e0e0e0; }
            h3 { color: #00eaff; margin-top: 15px; margin-bottom: 5px; font-size: 13pt;}
            ul { list-style: none; padding-left: 0; margin-left: 0; }
            li { margin-bottom: 5px; }
        </style>
        <p><strong>Título:</strong> Aplicación de Técnicas de Gestión de Proyectos en el Desarrollo de una Aplicación de Seguridad Personalizada con IA</p>
        <p><strong>Presentado por:</strong> Ing. Espinosa Martínez José Armando</p>
        <p><strong>Carrera:</strong> Tecnologías de la Información y la Comunicación (TIC) en sistemas</p>
        <p><strong>Fecha Documento Base:</strong> 25 de enero de 2025</p>

        <h3>Objetivo General:</h3>
        <p>Desarrollar una aplicación multiplataforma con IA que brinde seguridad digital personalizada al usuario, mediante la detección proactiva de amenazas y comportamientos anómalos.</p>

        <h3>Alcance Resumido:</h3>
        <p>Incluye: Frontend (Web/Móvil), Backend (API REST), Modelo de IA (Análisis Comportamiento), Autenticación MFA, Cifrado, Alertas Inteligentes, Bóveda de Contraseñas.</p>
        <p>No incluye: Integraciones con hardware biométrico, análisis profundo de malware, ni módulos de respuesta automática a incidentes de red.</p>

        <h3>Tecnologías Clave (Stack Propuesto):</h3>
        <ul>
            <li><span style="color: #61DAFB;">●</span> Frontend: React Native, React.js</li>
            <li><span style="color: #68A063;">●</span> Backend: Node.js + Express</li>
            <li><span style="color: #3776AB;">●</span> IA: Python (TensorFlow/PyTorch)</li>
            <li><span style="color: #336791;">●</span> Base de Datos: PostgreSQL</li>
            <li><span style="color: #2496ED;">●</span> Contenerización: Docker</li>
            <li><span style="color: #F05032;">●</span> Control Versiones: Git</li>
            <li><span style="color: #217346;">●</span> Gestión Proyectos: Microsoft Project</li>
        </ul>
        """
        label = QLabel(info_text)
        label.setWordWrap(True)
        label.setTextFormat(Qt.TextFormat.RichText)
        label.setAlignment(Qt.AlignmentFlag.AlignTop)
        label.setOpenExternalLinks(True) # Si hubiera links
        self.content_layout.addWidget(label)

class GanttWidget(SectionWidget):
     def __init__(self, parent=None):
        super().__init__("Cronograma (Diagrama de Gantt - Placeholder)", parent)
        info_text = """
        <p>Representación visual del cronograma del proyecto.</p>
        <p>En una aplicación real, esto podría generarse con librerías como Matplotlib o PyQtGraph incrustadas, o mostrar una imagen generada desde MS Project.</p>
        <br>
        <p style='text-align: center; color: #a0a0a0;'><i>[ Placeholder para Imagen/Gráfico de Gantt ]</i></p>
        """
        label = QLabel(info_text)
        label.setWordWrap(True)
        label.setTextFormat(Qt.TextFormat.RichText)
        label.setAlignment(Qt.AlignmentFlag.AlignTop) # Alinear arriba

        # Opcional: Cargar una imagen de placeholder
        placeholder_img = QLabel()
        placeholder_img.setAlignment(Qt.AlignmentFlag.AlignCenter)
        try:
            # Crear un QPixmap simple como placeholder si no tienes imagen
            pixmap = QPixmap(600, 200) # Tamaño del placeholder
            pixmap.fill(QColor(26, 42, 108, 100)) # bg-glass aproximado
            # Podrías dibujar texto simple aquí si quisieras usando QPainter
            placeholder_img.setPixmap(pixmap)
            self.content_layout.addWidget(placeholder_img)
        except Exception as e:
            print(f"No se pudo crear/cargar imagen placeholder: {e}")
            label.setText(label.text() + "<p style='color: #ffaa00;'>No se pudo crear la imagen de ejemplo.</p>")

        self.content_layout.addWidget(label)
        self.content_layout.addStretch(1) # Empujar hacia arriba
        # Aquí iría la lógica para generar/mostrar el gráfico real

class PertCpmWidget(SectionWidget):
    def __init__(self, parent=None):
        super().__init__("Planificación (PERT/CPM)", parent)
        info_text = """
         <style>
            p { margin-bottom: 10px; }
            strong { color: #e0e0e0; }
            h3 { color: #00eaff; margin-top: 15px; margin-bottom: 5px; font-size: 13pt;}
            ul { list-style: disc; padding-left: 20px; margin-left: 0; }
            li { margin-bottom: 5px; }
        </style>
        <p>El método PERT y CPM fueron herramientas clave en la planificación para estimar duraciones, identificar dependencias y determinar la <strong>Ruta Crítica</strong> del proyecto.</p>

        <h3>Aplicación en el Proyecto:</h3>
        <ul>
            <li><strong>Desglose de Tareas (WBS):</strong> Definición y subdivisión de actividades principales.</li>
            <li><strong>Secuenciación:</strong> Establecimiento de dependencias lógicas.</li>
            <li><strong>Estimación PERT:</strong> Uso de O, P, M para calcular Te = (O + 4M + P) / 6 en tareas inciertas (Ej: Entrenamiento IA).</li>
            <li><strong>Identificación Ruta Crítica:</strong> Secuencia de tareas sin holgura que define duración mínima (Ej: Diseño Arq. -> Dev Backend Core -> Entrenamiento IA Base -> Pruebas Integración).</li>
            <li><strong>Gestión de Holguras:</strong> Flexibilidad en tareas no críticas para reasignación.</li>
            <li><strong>Herramienta:</strong> Microsoft Project para visualización y gestión.</li>
        </ul>
        """
        label = QLabel(info_text)
        label.setWordWrap(True)
        label.setTextFormat(Qt.TextFormat.RichText)
        label.setAlignment(Qt.AlignmentFlag.AlignTop)
        self.content_layout.addWidget(label)

        # --- Removed AI Explanation Area ---
        # self.content_layout.addWidget(ai_area)
        self.content_layout.addStretch(1) # Empujar hacia arriba


# --- Ventana Principal ---
class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setObjectName("MainWindow")
        self.setWindowTitle("GuardianAI Desktop - Seguridad Personalizada") # Título sin IA
        self.setGeometry(100, 100, 1100, 700) # Reducir un poco el ancho si no hay tanto contenido

        # Widget central y layout principal
        self.central_widget = QWidget()
        self.setCentralWidget(self.central_widget)
        self.main_layout = QHBoxLayout(self.central_widget)
        self.main_layout.setContentsMargins(0, 0, 0, 0)
        self.main_layout.setSpacing(0)

        # --- Crear Sidebar ---
        self._create_sidebar()

        # --- Crear Área de Contenido Principal (QStackedWidget) ---
        self._create_content_area()

        # Aplicar hoja de estilos
        self._apply_stylesheet()

        # --- No AI signal connections needed ---
        # self.connect_ai_requests()

        # Establecer la página inicial (Dashboard)
        if self.nav_buttons:
            self.nav_buttons[0].setChecked(True) # Marcar como activo visualmente
            self._change_page(self.nav_buttons[0]) # Cambiar página programáticamente


    def _create_sidebar(self):
        self.sidebar = QWidget()
        self.sidebar.setObjectName("Sidebar")
        self.sidebar.setFixedWidth(260) # Ancho fijo como en CSS
        self.sidebar_layout = QVBoxLayout(self.sidebar)
        self.sidebar_layout.setContentsMargins(0, 0, 0, 0)
        self.sidebar_layout.setSpacing(2) # Poco espacio entre botones

        # Header (igual que antes)
        header_frame = QFrame()
        header_layout = QVBoxLayout(header_frame)
        header_layout.setContentsMargins(20, 25, 20, 20)
        icon_label = QLabel("🛡️") # Icono simple de escudo
        icon_label.setStyleSheet("font-size: 30pt; color: #00eaff; margin-bottom: 5px;")
        icon_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        title_label = QLabel("GuardianAI")
        title_label.setStyleSheet("font-size: 16pt; color: #ffffff; font-weight: bold; /* font-family: 'Orbitron'; */ ")
        title_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        header_layout.addWidget(icon_label)
        header_layout.addWidget(title_label)
        self.sidebar_layout.addWidget(header_frame)

        # Botones de Navegación (igual que antes)
        self.nav_buttons = []
        nav_items = [
            ("dashboard", "Dashboard"),
            ("anomaly-detection", "Detección Anomalías"),
            ("mfa", "Gestión MFA"),
            ("password-vault", "Bóveda Contraseñas"),
            ("alerts", "Alertas Inteligentes"),
            ("settings", "Configuración"),
            None, # Separador
            ("project-info", "Info del Proyecto"),
            ("gantt", "Cronograma (Gantt)"),
            ("pert-cpm", "Planificación (PERT/CPM)"),
        ]
        self.page_map = {}
        page_counter = 0
        for item in nav_items:
            if item is None:
                separator = QFrame()
                separator.setFrameShape(QFrame.Shape.HLine); separator.setFrameShadow(QFrame.Shadow.Sunken)
                separator.setFixedHeight(1); separator.setStyleSheet("background-color: rgba(0, 234, 255, 0.2); margin: 15px 25px;")
                self.sidebar_layout.addWidget(separator)
                continue
            section_id, text = item
            button = QPushButton(text); button.setObjectName("NavLink"); button.setCheckable(True)
            button.setIconSize(QSize(18, 18)); button.setProperty("page_index", page_counter)
            self.page_map[section_id] = page_counter; page_counter += 1
            button.clicked.connect(lambda checked, b=button: self._change_page(b))
            self.sidebar_layout.addWidget(button); self.nav_buttons.append(button)

        self.sidebar_layout.addStretch(1)

        # Footer (igual que antes)
        footer_label = QLabel("© 2025 J.A. Espinosa M.<br>TIC - Sistemas")
        footer_label.setAlignment(Qt.AlignmentFlag.AlignCenter); footer_label.setObjectName("MutedText")
        footer_label.setStyleSheet("color: #a0a0a0; font-size: 8pt; padding: 15px; border-top: 1px solid rgba(0, 234, 255, 0.2);")
        self.sidebar_layout.addWidget(footer_label)

        self.main_layout.addWidget(self.sidebar)

    def _create_content_area(self):
        self.content_stack = QStackedWidget()
        self.content_stack.setObjectName("ContentStack")

        # Crear e añadir cada widget de sección
        self.dashboard_page = DashboardWidget()
        self.anomaly_page = AnomalyDetectionWidget()
        self.mfa_page = MfaWidget()
        self.password_page = PasswordVaultWidget()
        self.alerts_page = AlertsWidget()
        self.settings_page = SettingsWidget()
        self.project_info_page = ProjectInfoWidget()
        self.gantt_page = GanttWidget()
        self.pert_page = PertCpmWidget()

        self.pages = [
            self.dashboard_page, self.anomaly_page, self.mfa_page,
            self.password_page, self.alerts_page, self.settings_page,
            self.project_info_page, self.gantt_page, self.pert_page
        ]

        for page in self.pages:
             scroll_area = QScrollArea()
             scroll_area.setWidgetResizable(True)
             scroll_area.setWidget(page)
             # Aplicar estilo común a scrollbars
             scroll_area.setStyleSheet("""
                QScrollArea { border: none; background-color: transparent; }
                /* Estilos de Scrollbar (pueden estar en QSS también) */
                QScrollBar:vertical { border: none; background: rgba(26, 42, 108, 0.3); width: 10px; margin: 0; }
                QScrollBar::handle:vertical { background: #00eaff; min-height: 25px; border-radius: 5px; }
                QScrollBar::add-line:vertical, QScrollBar::sub-line:vertical { height: 0px; }
                QScrollBar::add-page:vertical, QScrollBar::sub-page:vertical { background: none; }
                QScrollBar:horizontal { border: none; background: rgba(26, 42, 108, 0.3); height: 10px; margin: 0; }
                QScrollBar::handle:horizontal { background: #00eaff; min-width: 25px; border-radius: 5px; }
                QScrollBar::add-line:horizontal, QScrollBar::sub-line:horizontal { width: 0px; }
                QScrollBar::add-page:horizontal, QScrollBar::sub-page:horizontal { background: none; }
             """)
             self.content_stack.addWidget(scroll_area)

        self.main_layout.addWidget(self.content_stack)

    # --- Removed AI Signal Connection Method ---
    # def connect_ai_requests(self): ...

    # --- Removed AI Signal Handlers ---
    # def handle_ai_request(self, prompt, target_widget_id): ...
    # def update_ai_response_area(self, target_widget_id, response_text): ...
    # def show_ai_error(self, error_message): ...
    # def _update_widget_text(...): ... # No longer needed as AI doesn't update text

    @Slot(QPushButton) # Aceptar el botón como argumento
    def _change_page(self, sender_button):
        # Lógica de cambio de página (igual que antes)
        page_index = sender_button.property("page_index")
        if page_index is not None and 0 <= page_index < self.content_stack.count():
            for button in self.nav_buttons:
                if button != sender_button:
                    button.setChecked(False)
            sender_button.setChecked(True)
            self.content_stack.setCurrentIndex(page_index)
            print(f"Changing page to index: {page_index} ({sender_button.text()})")
        else:
            print(f"Error: Índice de página inválido ({page_index}) para botón {sender_button.text()}")


    def _apply_stylesheet(self):
        # Lógica para aplicar stylesheet (igual que antes)
        try:
            with open("style.qss", "r") as f:
                style = f.read()
                self.setStyleSheet(style)
                print("Stylesheet 'style.qss' applied.")
        except FileNotFoundError:
            print("Warning: 'style.qss' not found. Applying fallback inline styles.")
            # Aplicar un estilo básico inline como fallback
            self.setStyleSheet("""
                QMainWindow, #MainWindow { background-color: #0a0f2e; }
                QWidget#Sidebar { background-color: #1a2a6c; border-right: 1px solid #004455; }
                QPushButton#NavLink { color: #a0a0a0; border: none; padding: 10px 20px; text-align: left; }
                QPushButton#NavLink:hover { color: #e0e0e0; background-color: #2a3a7c; }
                QPushButton#NavLink:checked { color: #ffffff; background-color: #2a3a7c; border-left: 3px solid #00eaff; font-weight: bold; }
                QLabel#SectionTitle { color: #00eaff; font-size: 18pt; font-weight: bold; padding-bottom: 5px; border-bottom: 2px solid #00eaff; margin-bottom: 15px; }
                QFrame#Card { background-color: #121f50; border: 1px solid #004455; border-radius: 8px; }
                QLabel#CardHeader { color: #ffffff; font-size: 12pt; font-weight: bold; margin-bottom: 8px; }
                QLabel { color: #e0e0e0; background: transparent; }
                QLabel#MutedText { color: #a0a0a0; }
                QPushButton { background-color: #00eaff; color: #0a0f2e; padding: 8px 15px; border: none; border-radius: 5px; font-weight: bold; }
                QPushButton:hover { background-color: #ffffff; }
                QPushButton#SecondaryButton { background-color: transparent; color: #00eaff; border: 1px solid #00eaff; }
                QPushButton#SecondaryButton:hover { background-color: #00eaff; color: #0a0f2e; }
                QPushButton#DangerButton { background-color: #ff4d4d; color: #ffffff; }
                QPushButton#DangerButton:hover { background-color: #ff7f7f; }
                QLineEdit { background-color: rgba(255, 255, 255, 0.1); border: 1px solid #004455; border-radius: 5px; color: #e0e0e0; padding: 5px; }
                QTableWidget { background-color: transparent; border: 1px solid #004455; gridline-color: #004455; color: #e0e0e0; }
                QHeaderView::section { background-color: #1a2a6c; color: #00eaff; padding: 4px; border: 1px solid #004455; font-weight: bold; }
            """)
        except Exception as e:
            print(f"Error applying stylesheet: {e}")

    def closeEvent(self, event):
        """ Limpieza al cerrar """
        print("Closing application...")
        # No thread pool cleanup needed
        event.accept()


# --- Punto de Entrada ---
if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec())