import javax.swing.*;
import javax.swing.border.EmptyBorder;
import net.miginfocom.swing.MigLayout;
import com.formdev.flatlaf.FlatDarkLaf;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.io.File;

public class ChevroletApp {

    public static void main(String[] args) {
        // Establecer FlatLaf como Look and Feel antes de crear cualquier componente Swing
        try {
            UIManager.setLookAndFeel(new FlatDarkLaf());
        } catch (UnsupportedLookAndFeelException e) {
            e.printStackTrace();
        }

        SwingUtilities.invokeLater(ChevroletApp::new);
    }

    public ChevroletApp() {
        new LoginFrame();
    }

    // Clase de Login
    class LoginFrame extends JFrame {
        private JTextField userField;
        private JPasswordField passField;

        public LoginFrame() {
            setTitle("Login - Chevrolet");
            setSize(800, 500);
            setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            setLocationRelativeTo(null); // Centrar en la pantalla
            setResizable(false);

            initUI();
            setVisible(true);
        }

        private void initUI() {
            // Configurar el layout principal con MigLayout
            JPanel mainPanel = new JPanel(new MigLayout("fill, insets 0", "[50%][50%]", "[]"));
            mainPanel.setBackground(Color.DARK_GRAY);

            // Panel de bienvenida
            JPanel welcomePanel = new JPanel(new BorderLayout());
            welcomePanel.setBackground(new Color(60, 63, 65));
            welcomePanel.setBorder(new EmptyBorder(50, 20, 50, 20));

            JLabel welcomeLabel = new JLabel("<html><h1>Bienvenido a Chevrolet</h1>"
                    + "<p>Inicia sesión para acceder a la aplicación.</p></html>", SwingConstants.CENTER);
            welcomeLabel.setForeground(Color.WHITE);
            welcomePanel.add(welcomeLabel, BorderLayout.CENTER);

            // Panel de login
            JPanel loginPanel = new JPanel(new MigLayout("wrap 2", "[][grow, fill]", "[][][][][]10[]"));
            loginPanel.setBackground(new Color(45, 45, 45));
            loginPanel.setBorder(new EmptyBorder(50, 50, 50, 50));

            JLabel titleLabel = new JLabel("Iniciar Sesión");
            titleLabel.setFont(new Font("Segoe UI", Font.BOLD, 24));
            titleLabel.setForeground(Color.WHITE);
            loginPanel.add(titleLabel, "span, center, wrap 20");

            JLabel userLabel = new JLabel("Usuario:");
            userLabel.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            userLabel.setForeground(Color.WHITE);
            loginPanel.add(userLabel);

            userField = new JTextField();
            estilizarCampoTexto(userField);
            loginPanel.add(userField, "grow, wrap");

            JLabel passLabel = new JLabel("Contraseña:");
            passLabel.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            passLabel.setForeground(Color.WHITE);
            loginPanel.add(passLabel);

            passField = new JPasswordField();
            estilizarCampoTexto(passField);
            loginPanel.add(passField, "grow, wrap");

            JCheckBox rememberCheckBox = new JCheckBox("Recordar Usuario");
            estilizarCheckBox(rememberCheckBox);
            loginPanel.add(rememberCheckBox, "span, align left, wrap");

            JButton loginButton = new JButton("Iniciar Sesión");
            estilizarBoton(loginButton, new Color(70, 130, 180));
            loginPanel.add(loginButton, "span, grow, wrap");

            JButton forgotPassButton = new JButton("¿Olvidaste tu contraseña?");
            estilizarBotonSecundario(forgotPassButton, new Color(70, 130, 180));
            loginPanel.add(forgotPassButton, "span, grow");

            // Acciones de los botones
            loginButton.addActionListener(this::handleLogin);
            forgotPassButton.addActionListener(this::handleForgotPassword);

            // Agregar los paneles al mainPanel
            mainPanel.add(welcomePanel, "grow");
            mainPanel.add(loginPanel, "grow");

            add(mainPanel);
        }

        private void estilizarBoton(JButton boton, Color colorFondo) {
            boton.setFont(new Font("Segoe UI", Font.BOLD, 14));
            boton.setBackground(colorFondo);
            boton.setForeground(Color.WHITE);
            boton.setFocusPainted(false);
            boton.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
            boton.setBorder(BorderFactory.createLineBorder(colorFondo));
            // Efecto de hover
            boton.addMouseListener(new java.awt.event.MouseAdapter() {
                public void mouseEntered(java.awt.event.MouseEvent evt) {
                    boton.setBackground(boton.getBackground().brighter());
                }

                public void mouseExited(java.awt.event.MouseEvent evt) {
                    boton.setBackground(colorFondo);
                }
            });
        }

        private void estilizarBotonSecundario(JButton boton, Color colorFondo) {
            boton.setFont(new Font("Segoe UI", Font.PLAIN, 12));
            boton.setBackground(new Color(45, 45, 45));
            boton.setForeground(colorFondo);
            boton.setFocusPainted(false);
            boton.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
            boton.setBorder(BorderFactory.createLineBorder(new Color(45, 45, 45)));
            // Efecto de hover
            boton.addMouseListener(new java.awt.event.MouseAdapter() {
                public void mouseEntered(java.awt.event.MouseEvent evt) {
                    boton.setForeground(boton.getForeground().brighter());
                }

                public void mouseExited(java.awt.event.MouseEvent evt) {
                    boton.setForeground(colorFondo);
                }
            });
        }

        private void estilizarCampoTexto(JTextField campo) {
            campo.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            campo.setBackground(new Color(70, 70, 70));
            campo.setForeground(Color.WHITE);
            campo.setBorder(BorderFactory.createLineBorder(Color.GRAY));
            campo.setCaretColor(Color.WHITE);
        }

        private void estilizarCheckBox(JCheckBox checkBox) {
            checkBox.setBackground(new Color(45, 45, 45));
            checkBox.setFont(new Font("Segoe UI", Font.PLAIN, 12));
            checkBox.setForeground(Color.WHITE);
        }

        private void handleLogin(ActionEvent e) {
            String user = userField.getText().trim();
            String pass = new String(passField.getPassword()).trim();

            if (user.isEmpty() || pass.isEmpty()) {
                showMessage("Por favor, completa todos los campos.", "Error", JOptionPane.ERROR_MESSAGE);
                return;
            }

            // Validación de credenciales
            if (user.equals("Admin") && pass.equals("Jose1234")) {
                showMessage("Bienvenido, Admin", "Éxito", JOptionPane.INFORMATION_MESSAGE);
                dispose();
                new MainMenuFrame("Admin", user);
            } else if (user.equals("Usuario") && pass.equals("Jose1469")) {
                showMessage("Bienvenido, Usuario", "Éxito", JOptionPane.INFORMATION_MESSAGE);
                dispose();
                new MainMenuFrame("Usuario", user);
            } else {
                showMessage("Credenciales incorrectas.", "Error", JOptionPane.ERROR_MESSAGE);
            }
        }

        private void handleForgotPassword(ActionEvent e) {
            // Simulación de recuperación de contraseña
            showMessage("Funcionalidad de recuperación de contraseña en desarrollo.", "Información",
                    JOptionPane.INFORMATION_MESSAGE);
        }

        private void showMessage(String message, String title, int type) {
            JOptionPane.showMessageDialog(this, message, title, type);
        }
    }

    // Clase de Menú Principal
    class MainMenuFrame extends JFrame {
        private String userLevel;
        private String username;

        public MainMenuFrame(String userLevel, String username) {
            this.userLevel = userLevel;
            this.username = username;
            setTitle("Menú Principal - Chevrolet");
            setSize(800, 600);
            setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            setLocationRelativeTo(null); // Centrar en la pantalla
            setResizable(false);

            initUI();
            setVisible(true);
        }

        private void initUI() {
            // Configurar el layout principal con MigLayout
            JPanel mainPanel = new JPanel(new MigLayout("fill", "[grow]", "[grow][grow][grow]"));
            mainPanel.setBackground(new Color(40, 40, 40));

            // Panel superior para mostrar el rol y el nombre de usuario
            JPanel topPanel = new JPanel(new MigLayout("fillx, insets 10", "[grow][grow]", "[]"));
            topPanel.setBackground(new Color(60, 63, 65));
            topPanel.setBorder(BorderFactory.createLineBorder(new Color(70, 130, 180), 2));

            JLabel roleLabel = new JLabel("Rol: " + userLevel);
            roleLabel.setFont(new Font("Segoe UI", Font.BOLD, 14));
            roleLabel.setForeground(Color.WHITE);
            topPanel.add(roleLabel, "align left");

            JLabel userLabel = new JLabel("Usuario: " + username);
            userLabel.setFont(new Font("Segoe UI", Font.BOLD, 14));
            userLabel.setForeground(Color.WHITE);
            topPanel.add(userLabel, "align right");

            mainPanel.add(topPanel, "span, growx, wrap 50");

            // Panel central con los botones de funcionalidades
            JPanel buttonsPanel = new JPanel(new MigLayout("wrap 2, fillx, insets 50", "[grow][grow]", "[]20[]20[]20[]"));
            buttonsPanel.setBackground(new Color(40, 40, 40));

            JButton pedidoButton = new JButton("Pedido de Piezas");
            JButton reportesButton = new JButton("Generar Reportes");
            JButton cambiarPassButton = new JButton("Cambiar Contraseña");
            JButton salirButton = new JButton("Salir");

            estilizarBotonMenu(pedidoButton);
            estilizarBotonMenu(reportesButton);
            estilizarBotonMenu(cambiarPassButton);
            estilizarBotonMenu(salirButton);

            buttonsPanel.add(pedidoButton, "span 2, growx");
            buttonsPanel.add(reportesButton, "span 2, growx");
            buttonsPanel.add(cambiarPassButton, "span 2, growx");
            buttonsPanel.add(salirButton, "span 2, growx");

            mainPanel.add(buttonsPanel, "span, grow");

            add(mainPanel);

            // Acciones de los botones
            pedidoButton.addActionListener(this::mostrarFormulario);
            reportesButton.addActionListener(this::mostrarReportes);
            cambiarPassButton.addActionListener(this::cambiarContraseña);
            salirButton.addActionListener(e -> System.exit(0));
        }

        private void estilizarBotonMenu(JButton boton) {
            boton.setFont(new Font("Segoe UI", Font.BOLD, 16));
            boton.setBackground(new Color(70, 130, 180));
            boton.setForeground(Color.WHITE);
            boton.setFocusPainted(false);
            boton.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
            boton.setBorder(BorderFactory.createLineBorder(new Color(70, 130, 180)));
            boton.setPreferredSize(new Dimension(200, 50));
            // Efecto de hover
            boton.addMouseListener(new java.awt.event.MouseAdapter() {
                public void mouseEntered(java.awt.event.MouseEvent evt) {
                    boton.setBackground(boton.getBackground().brighter());
                }

                public void mouseExited(java.awt.event.MouseEvent evt) {
                    boton.setBackground(new Color(70, 130, 180));
                }
            });
        }

        private void mostrarFormulario(ActionEvent e) {
            dispose();
            new PedidoFrame(userLevel, username);
        }

        private void mostrarReportes(ActionEvent e) {
            // Implementar funcionalidad de reportes
            JOptionPane.showMessageDialog(this, "Funcionalidad de reportes en desarrollo.", "Información",
                    JOptionPane.INFORMATION_MESSAGE);
        }

        private void cambiarContraseña(ActionEvent e) {
            // Simulación de cambio de contraseña
            JOptionPane.showMessageDialog(this, "Funcionalidad de cambio de contraseña en desarrollo.", "Información",
                    JOptionPane.INFORMATION_MESSAGE);
        }
    }

    // Clase de Formulario de Pedido
    class PedidoFrame extends JFrame {
        private JTextField piezaField;
        private JTextField numeroParteField;
        private JTextField cantidadField;
        private JTextField precioField;
        private JTextField proveedorField;
        private JTextField direccionProveedorField;
        private JTextArea descripcionArea;
        private JLabel fotoPreview;
        private String userLevel;
        private String username;

        public PedidoFrame(String userLevel, String username) {
            this.userLevel = userLevel;
            this.username = username;
            setTitle("Pedido de Piezas - Chevrolet");
            setSize(900, 700);
            setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            setLocationRelativeTo(null); // Centrar en la pantalla
            setResizable(false);

            initUI();
            setVisible(true);
        }

        private void initUI() {
            // Configurar el layout principal con MigLayout
            JPanel mainPanel = new JPanel(new MigLayout("fill, wrap 1", "[grow]", "[]"));
            mainPanel.setBackground(new Color(40, 40, 40));

            // Panel superior para mostrar el rol y el nombre de usuario
            JPanel topPanel = new JPanel(new MigLayout("fillx, insets 10", "[grow][grow]", "[]"));
            topPanel.setBackground(new Color(60, 63, 65));
            topPanel.setBorder(BorderFactory.createLineBorder(new Color(70, 130, 180), 2));

            JLabel roleLabel = new JLabel("Rol: " + userLevel);
            roleLabel.setFont(new Font("Segoe UI", Font.BOLD, 14));
            roleLabel.setForeground(Color.WHITE);
            topPanel.add(roleLabel, "align left");

            JLabel userLabel = new JLabel("Usuario: " + username);
            userLabel.setFont(new Font("Segoe UI", Font.BOLD, 14));
            userLabel.setForeground(Color.WHITE);
            topPanel.add(userLabel, "align right");

            mainPanel.add(topPanel, "growx, wrap 20");

            // Panel de formulario
            JPanel formPanel = new JPanel(new MigLayout("wrap 2, insets 20", "[right][grow, fill]", "[]10[]10[]10[]10[]10[]10[]10[]10[]10[]"));
            formPanel.setBackground(new Color(45, 45, 45));
            formPanel.setBorder(new EmptyBorder(20, 50, 20, 50));

            JLabel titleLabel = new JLabel("Formulario de Pedido de Piezas");
            titleLabel.setFont(new Font("Segoe UI", Font.BOLD, 22));
            titleLabel.setForeground(Color.WHITE);
            formPanel.add(titleLabel, "span 2, center, wrap 20");

            // Campos del formulario
            JLabel piezaLabel = new JLabel("Nombre de la Pieza:");
            estilizarEtiquetaFormulario(piezaLabel);
            formPanel.add(piezaLabel);

            piezaField = new JTextField();
            estilizarCampoTextoFormulario(piezaField);
            formPanel.add(piezaField, "grow, wrap");

            JLabel numeroParteLabel = new JLabel("Número de Parte:");
            estilizarEtiquetaFormulario(numeroParteLabel);
            formPanel.add(numeroParteLabel);

            numeroParteField = new JTextField();
            estilizarCampoTextoFormulario(numeroParteField);
            formPanel.add(numeroParteField, "grow, wrap");

            JLabel cantidadLabel = new JLabel("Cantidad:");
            estilizarEtiquetaFormulario(cantidadLabel);
            formPanel.add(cantidadLabel);

            cantidadField = new JTextField();
            estilizarCampoTextoFormulario(cantidadField);
            formPanel.add(cantidadField, "grow, wrap");

            JLabel precioLabel = new JLabel("Precio (USD):");
            estilizarEtiquetaFormulario(precioLabel);
            formPanel.add(precioLabel);

            precioField = new JTextField();
            estilizarCampoTextoFormulario(precioField);
            formPanel.add(precioField, "grow, wrap");

            JLabel proveedorLabel = new JLabel("Proveedor:");
            estilizarEtiquetaFormulario(proveedorLabel);
            formPanel.add(proveedorLabel);

            proveedorField = new JTextField();
            estilizarCampoTextoFormulario(proveedorField);
            formPanel.add(proveedorField, "grow, wrap");

            JLabel direccionProveedorLabel = new JLabel("Dirección del Proveedor:");
            estilizarEtiquetaFormulario(direccionProveedorLabel);
            formPanel.add(direccionProveedorLabel);

            direccionProveedorField = new JTextField();
            estilizarCampoTextoFormulario(direccionProveedorField);
            formPanel.add(direccionProveedorField, "grow, wrap");

            JLabel descripcionLabel = new JLabel("Descripción de la Pieza:");
            estilizarEtiquetaFormulario(descripcionLabel);
            formPanel.add(descripcionLabel);

            descripcionArea = new JTextArea(5, 20);
            estilizarAreaTextoFormulario(descripcionArea);
            JScrollPane descripcionScroll = new JScrollPane(descripcionArea);
            formPanel.add(descripcionScroll, "grow, wrap");

            JLabel fechaPedidoLabel = new JLabel("Fecha de Pedido:");
            estilizarEtiquetaFormulario(fechaPedidoLabel);
            formPanel.add(fechaPedidoLabel);

            JTextField fechaPedidoField = new JTextField();
            estilizarCampoTextoFormulario(fechaPedidoField);
            fechaPedidoField.setText(LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
            fechaPedidoField.setEditable(false);
            formPanel.add(fechaPedidoField, "grow, wrap");

            JLabel fotoLabel = new JLabel("Foto de la Pieza:");
            estilizarEtiquetaFormulario(fotoLabel);
            formPanel.add(fotoLabel);

            fotoPreview = new JLabel();
            estilizarFotoPreview(fotoPreview);
            formPanel.add(fotoPreview, "grow, wrap");

            JButton agregarFotoButton = new JButton("Agregar Foto");
            estilizarBotonFormulario(agregarFotoButton, new Color(70, 130, 180));
            formPanel.add(agregarFotoButton, "span 2, growx, wrap");

            // Botones de acción
            JPanel actionPanel = new JPanel(new FlowLayout(FlowLayout.CENTER, 20, 20));
            actionPanel.setBackground(new Color(45, 45, 45));

            JButton guardarButton = new JButton("Guardar");
            JButton cerrarSesionButton = new JButton("Cerrar Sesión");

            estilizarBotonAccion(guardarButton, new Color(34, 139, 34));
            estilizarBotonAccion(cerrarSesionButton, new Color(178, 34, 34));

            actionPanel.add(guardarButton);
            actionPanel.add(cerrarSesionButton);

            formPanel.add(actionPanel, "span 2, growx, wrap");

            // Acciones de los botones
            agregarFotoButton.addActionListener(e -> agregarFoto());
            guardarButton.addActionListener(e -> guardarDatos());
            cerrarSesionButton.addActionListener(e -> cerrarSesion());

            mainPanel.add(formPanel, "grow");

            add(mainPanel);
        }

        private void estilizarEtiquetaFormulario(JLabel etiqueta) {
            etiqueta.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            etiqueta.setForeground(Color.WHITE);
        }

        private void estilizarCampoTextoFormulario(JTextField campo) {
            campo.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            campo.setBackground(new Color(70, 70, 70));
            campo.setForeground(Color.WHITE);
            campo.setBorder(BorderFactory.createLineBorder(Color.GRAY));
            campo.setCaretColor(Color.WHITE);
        }

        private void estilizarAreaTextoFormulario(JTextArea area) {
            area.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            area.setBackground(new Color(70, 70, 70));
            area.setForeground(Color.WHITE);
            area.setBorder(BorderFactory.createLineBorder(Color.GRAY));
            area.setCaretColor(Color.WHITE);
            area.setLineWrap(true);
            area.setWrapStyleWord(true);
        }

        private void estilizarFotoPreview(JLabel label) {
            label.setPreferredSize(new Dimension(200, 150));
            label.setOpaque(true);
            label.setBackground(new Color(70, 70, 70));
            label.setBorder(BorderFactory.createLineBorder(Color.GRAY));
        }

        private void estilizarBotonFormulario(JButton boton, Color colorFondo) {
            boton.setFont(new Font("Segoe UI", Font.BOLD, 14));
            boton.setBackground(colorFondo);
            boton.setForeground(Color.WHITE);
            boton.setFocusPainted(false);
            boton.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
            boton.setBorder(BorderFactory.createLineBorder(colorFondo));
            // Efecto de hover
            boton.addMouseListener(new java.awt.event.MouseAdapter() {
                public void mouseEntered(java.awt.event.MouseEvent evt) {
                    boton.setBackground(boton.getBackground().brighter());
                }

                public void mouseExited(java.awt.event.MouseEvent evt) {
                    boton.setBackground(colorFondo);
                }
            });
        }

        private void estilizarBotonAccion(JButton boton, Color colorFondo) {
            boton.setFont(new Font("Segoe UI", Font.BOLD, 14));
            boton.setBackground(colorFondo);
            boton.setForeground(Color.WHITE);
            boton.setFocusPainted(false);
            boton.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
            boton.setBorder(BorderFactory.createLineBorder(colorFondo));
            // Efecto de hover
            boton.addMouseListener(new java.awt.event.MouseAdapter() {
                public void mouseEntered(java.awt.event.MouseEvent evt) {
                    boton.setBackground(boton.getBackground().brighter());
                }

                public void mouseExited(java.awt.event.MouseEvent evt) {
                    boton.setBackground(colorFondo);
                }
            });
        }

        private void agregarFoto() {
            JFileChooser fileChooser = new JFileChooser();
            fileChooser.setDialogTitle("Seleccionar Foto de la Pieza");
            fileChooser.setAcceptAllFileFilterUsed(false);
            fileChooser.addChoosableFileFilter(
                    new javax.swing.filechooser.FileNameExtensionFilter("Imágenes", "jpg", "png", "jpeg", "gif"));

            int result = fileChooser.showOpenDialog(this);
            if (result == JFileChooser.APPROVE_OPTION) {
                File selectedFile = fileChooser.getSelectedFile();
                ImageIcon icon = new ImageIcon(
                        new ImageIcon(selectedFile.getAbsolutePath()).getImage().getScaledInstance(
                                fotoPreview.getWidth(), fotoPreview.getHeight(), Image.SCALE_SMOOTH));
                fotoPreview.setIcon(icon);
            } else {
                JOptionPane.showMessageDialog(this, "No se seleccionó ninguna foto.", "Información",
                        JOptionPane.INFORMATION_MESSAGE);
            }
        }

        private void guardarDatos() {
            String pieza = piezaField.getText().trim();
            String numeroParte = numeroParteField.getText().trim();
            String cantidadStr = cantidadField.getText().trim();
            String precioStr = precioField.getText().trim();
            String proveedor = proveedorField.getText().trim();
            String direccionProveedor = direccionProveedorField.getText().trim();
            String descripcion = descripcionArea.getText().trim();
            Icon foto = fotoPreview.getIcon();

            if (pieza.isEmpty() || numeroParte.isEmpty() || cantidadStr.isEmpty() || precioStr.isEmpty()
                    || proveedor.isEmpty() || direccionProveedor.isEmpty() || descripcion.isEmpty()) {
                JOptionPane.showMessageDialog(this, "Por favor, completa todos los campos.", "Error",
                        JOptionPane.ERROR_MESSAGE);
                return;
            }

            int cantidad;
            double precio;
            try {
                cantidad = Integer.parseInt(cantidadStr);
                precio = Double.parseDouble(precioStr);
                if (cantidad <= 0 || precio <= 0) {
                    throw new NumberFormatException("Valores negativos o cero no permitidos.");
                }
            } catch (NumberFormatException ex) {
                JOptionPane.showMessageDialog(this, "Cantidad y Precio deben ser números válidos y mayores que cero.", "Error",
                        JOptionPane.ERROR_MESSAGE);
                return;
            }

            // Aquí puedes agregar la lógica para guardar los datos en una base de datos o archivo.

            String resumen = String.format(
                    "Datos guardados:\n" +
                            "Pieza: %s\n" +
                            "Número de Parte: %s\n" +
                            "Cantidad: %d\n" +
                            "Precio: %.2f USD\n" +
                            "Proveedor: %s\n" +
                            "Dirección del Proveedor: %s\n" +
                            "Descripción: %s\n" +
                            "Fecha de Pedido: %s\n" +
                            "Foto Adjunta: %s",
                    pieza, numeroParte, cantidad, precio, proveedor, direccionProveedor, descripcion,
                    LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")),
                    (foto != null) ? "Sí" : "No");

            JOptionPane.showMessageDialog(this, resumen, "Éxito", JOptionPane.INFORMATION_MESSAGE);
        }

        private void cerrarSesion() {
            dispose();
            new LoginFrame();
        }
    }
}
