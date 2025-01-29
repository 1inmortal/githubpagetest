import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class ChevroletApp {

    public static void main(String[] args) {
        // Aplicar el look and feel de Nimbus para una apariencia moderna
        try {
            for (UIManager.LookAndFeelInfo info : UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (Exception e) {
            // Si Nimbus no está disponible, usar el look and feel del sistema
            try {
                UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
            } catch (Exception ex) {
                ex.printStackTrace();
            }
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
            setSize(700, 400);
            setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            setLocationRelativeTo(null); // Centrar en la pantalla
            setResizable(false);

            initUI();
            setVisible(true);
        }

        private void initUI() {
            // Configurar el layout principal
            JPanel mainPanel = new JPanel(new BorderLayout());
            mainPanel.setBackground(new Color(40, 40, 40));

            // Panel de bienvenida
            JPanel welcomePanel = new JPanel();
            welcomePanel.setPreferredSize(new Dimension(300, 0));
            welcomePanel.setBackground(new Color(60, 63, 65)); // Gris oscuro
            welcomePanel.setLayout(new BorderLayout());

            JLabel welcomeLabel = new JLabel("<html><div style='text-align: center;'>"
                    + "<h1 style='color:white;'>Bienvenido a Chevrolet</h1>"
                    + "<p style='color:white;'>Por favor, inicia sesión para continuar.</p></div></html>", JLabel.CENTER);
            welcomePanel.add(welcomeLabel, BorderLayout.CENTER);

            mainPanel.add(welcomePanel, BorderLayout.WEST);

            // Panel de login con fondo oscuro
            JPanel loginPanel = new JPanel(new GridBagLayout());
            loginPanel.setBackground(new Color(45, 45, 45));
            loginPanel.setBorder(new EmptyBorder(30, 30, 30, 30));

            GridBagConstraints gbc = new GridBagConstraints();
            gbc.insets = new Insets(10, 10, 10, 10);
            gbc.fill = GridBagConstraints.HORIZONTAL;

            JLabel titleLabel = new JLabel("Iniciar Sesión");
            titleLabel.setFont(new Font("Segoe UI", Font.BOLD, 24));
            titleLabel.setForeground(Color.WHITE);
            titleLabel.setHorizontalAlignment(JLabel.CENTER);

            gbc.gridx = 0;
            gbc.gridy = 0;
            gbc.gridwidth = 2;
            loginPanel.add(titleLabel, gbc);

            gbc.gridwidth = 1;

            JLabel userLabel = new JLabel("Usuario:");
            userLabel.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            userLabel.setForeground(Color.WHITE);
            gbc.gridx = 0;
            gbc.gridy = 1;
            loginPanel.add(userLabel, gbc);

            userField = new JTextField(20);
            estilizarCampoTexto(userField);
            gbc.gridx = 1;
            loginPanel.add(userField, gbc);

            JLabel passLabel = new JLabel("Contraseña:");
            passLabel.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            passLabel.setForeground(Color.WHITE);
            gbc.gridx = 0;
            gbc.gridy = 2;
            loginPanel.add(passLabel, gbc);

            passField = new JPasswordField(20);
            estilizarCampoTexto(passField);
            gbc.gridx = 1;
            loginPanel.add(passField, gbc);

            JCheckBox rememberCheckBox = new JCheckBox("Recordar Usuario");
            estilizarCheckBox(rememberCheckBox);
            gbc.gridx = 0;
            gbc.gridy = 3;
            gbc.gridwidth = 2;
            loginPanel.add(rememberCheckBox, gbc);

            JButton loginButton = new JButton("Iniciar Sesión");
            estilizarBoton(loginButton, new Color(70, 130, 180));
            gbc.gridy = 4;
            loginPanel.add(loginButton, gbc);

            JButton forgotPassButton = new JButton("¿Olvidaste tu contraseña?");
            estilizarBotonSecundario(forgotPassButton, new Color(70, 130, 180));
            gbc.gridy = 5;
            loginPanel.add(forgotPassButton, gbc);

            // Acciones de los botones
            loginButton.addActionListener(this::handleLogin);
            forgotPassButton.addActionListener(this::handleForgotPassword);

            mainPanel.add(loginPanel, BorderLayout.CENTER);

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
            setSize(600, 450);
            setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            setLocationRelativeTo(null); // Centrar en la pantalla
            setResizable(false);

            initUI();
            setVisible(true);
        }

        private void initUI() {
            setLayout(new BorderLayout());
            getContentPane().setBackground(new Color(40, 40, 40));

            // Panel superior para mostrar el rol y el nombre de usuario
            JPanel topPanel = new JPanel(new BorderLayout());
            topPanel.setBorder(new EmptyBorder(10, 10, 10, 10));
            topPanel.setBackground(new Color(60, 63, 65));

            JLabel roleLabel = new JLabel("Rol: " + userLevel);
            roleLabel.setFont(new Font("Segoe UI", Font.BOLD, 14));
            roleLabel.setForeground(Color.WHITE);
            topPanel.add(roleLabel, BorderLayout.WEST);

            JLabel userLabel = new JLabel("Usuario: " + username);
            userLabel.setFont(new Font("Segoe UI", Font.BOLD, 14));
            userLabel.setForeground(Color.WHITE);
            topPanel.add(userLabel, BorderLayout.EAST);

            add(topPanel, BorderLayout.NORTH);

            // Panel central con los botones de funcionalidades
            JPanel buttonsPanel = new JPanel(new GridLayout(4, 1, 15, 15));
            buttonsPanel.setBorder(new EmptyBorder(30, 150, 30, 150));
            buttonsPanel.setBackground(new Color(40, 40, 40));

            JButton pedidoButton = new JButton("Pedido de Piezas");
            JButton reportesButton = new JButton("Generar Reportes");
            JButton cambiarPassButton = new JButton("Cambiar Contraseña");
            JButton salirButton = new JButton("Salir");

            estilizarBotonMenu(pedidoButton);
            estilizarBotonMenu(reportesButton);
            estilizarBotonMenu(cambiarPassButton);
            estilizarBotonMenu(salirButton);

            buttonsPanel.add(pedidoButton);
            buttonsPanel.add(reportesButton);
            buttonsPanel.add(cambiarPassButton);
            buttonsPanel.add(salirButton);

            add(buttonsPanel, BorderLayout.CENTER);

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
            setSize(800, 900);
            setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            setLocationRelativeTo(null); // Centrar en la pantalla
            setResizable(false);

            initUI();
            setVisible(true);
        }

        private void initUI() {
            JPanel panel = new JPanel(new GridBagLayout());
            panel.setBorder(new EmptyBorder(30, 30, 30, 30));
            panel.setBackground(new Color(40, 40, 40));

            GridBagConstraints gbc = new GridBagConstraints();
            gbc.insets = new Insets(10, 10, 10, 10);
            gbc.fill = GridBagConstraints.HORIZONTAL;

            // Panel superior para mostrar el rol y el nombre de usuario
            JPanel topPanel = new JPanel(new BorderLayout());
            topPanel.setBorder(new EmptyBorder(10, 10, 10, 10));
            topPanel.setBackground(new Color(60, 63, 65));

            JLabel roleLabel = new JLabel("Rol: " + userLevel);
            roleLabel.setFont(new Font("Segoe UI", Font.BOLD, 14));
            roleLabel.setForeground(Color.WHITE);
            topPanel.add(roleLabel, BorderLayout.WEST);

            JLabel userLabel = new JLabel("Usuario: " + username);
            userLabel.setFont(new Font("Segoe UI", Font.BOLD, 14));
            userLabel.setForeground(Color.WHITE);
            topPanel.add(userLabel, BorderLayout.EAST);

            gbc.gridx = 0;
            gbc.gridy = 0;
            gbc.gridwidth = 2;
            panel.add(topPanel, gbc);

            gbc.gridwidth = 1;

            JLabel titleLabel = new JLabel("Formulario de Pedido de Piezas");
            titleLabel.setFont(new Font("Segoe UI", Font.BOLD, 22));
            titleLabel.setForeground(Color.WHITE);
            titleLabel.setHorizontalAlignment(JLabel.CENTER);
            gbc.gridx = 0;
            gbc.gridy = 1;
            gbc.gridwidth = 2;
            panel.add(titleLabel, gbc);

            gbc.gridwidth = 1;

            // Campos del formulario
            JLabel piezaLabel = new JLabel("Nombre de la Pieza:");
            estilizarEtiquetaFormulario(piezaLabel);
            gbc.gridx = 0;
            gbc.gridy = 2;
            panel.add(piezaLabel, gbc);

            piezaField = new JTextField(20);
            estilizarCampoTextoFormulario(piezaField);
            gbc.gridx = 1;
            panel.add(piezaField, gbc);

            JLabel numeroParteLabel = new JLabel("Número de Parte:");
            estilizarEtiquetaFormulario(numeroParteLabel);
            gbc.gridx = 0;
            gbc.gridy = 3;
            panel.add(numeroParteLabel, gbc);

            numeroParteField = new JTextField(20);
            estilizarCampoTextoFormulario(numeroParteField);
            gbc.gridx = 1;
            panel.add(numeroParteField, gbc);

            JLabel cantidadLabel = new JLabel("Cantidad:");
            estilizarEtiquetaFormulario(cantidadLabel);
            gbc.gridx = 0;
            gbc.gridy = 4;
            panel.add(cantidadLabel, gbc);

            cantidadField = new JTextField(20);
            estilizarCampoTextoFormulario(cantidadField);
            gbc.gridx = 1;
            panel.add(cantidadField, gbc);

            JLabel precioLabel = new JLabel("Precio (USD):");
            estilizarEtiquetaFormulario(precioLabel);
            gbc.gridx = 0;
            gbc.gridy = 5;
            panel.add(precioLabel, gbc);

            precioField = new JTextField(20);
            estilizarCampoTextoFormulario(precioField);
            gbc.gridx = 1;
            panel.add(precioField, gbc);

            JLabel proveedorLabel = new JLabel("Proveedor:");
            estilizarEtiquetaFormulario(proveedorLabel);
            gbc.gridx = 0;
            gbc.gridy = 6;
            panel.add(proveedorLabel, gbc);

            proveedorField = new JTextField(20);
            estilizarCampoTextoFormulario(proveedorField);
            gbc.gridx = 1;
            panel.add(proveedorField, gbc);

            JLabel direccionProveedorLabel = new JLabel("Dirección del Proveedor:");
            estilizarEtiquetaFormulario(direccionProveedorLabel);
            gbc.gridx = 0;
            gbc.gridy = 7;
            panel.add(direccionProveedorLabel, gbc);

            direccionProveedorField = new JTextField(20);
            estilizarCampoTextoFormulario(direccionProveedorField);
            gbc.gridx = 1;
            panel.add(direccionProveedorField, gbc);

            JLabel descripcionLabel = new JLabel("Descripción de la Pieza:");
            estilizarEtiquetaFormulario(descripcionLabel);
            gbc.gridx = 0;
            gbc.gridy = 8;
            panel.add(descripcionLabel, gbc);

            descripcionArea = new JTextArea(5, 20);
            estilizarAreaTextoFormulario(descripcionArea);
            JScrollPane descripcionScroll = new JScrollPane(descripcionArea);
            gbc.gridx = 1;
            panel.add(descripcionScroll, gbc);

            JLabel fechaPedidoLabel = new JLabel("Fecha de Pedido:");
            estilizarEtiquetaFormulario(fechaPedidoLabel);
            gbc.gridx = 0;
            gbc.gridy = 9;
            panel.add(fechaPedidoLabel, gbc);

            JTextField fechaPedidoField = new JTextField(20);
            estilizarCampoTextoFormulario(fechaPedidoField);
            fechaPedidoField.setText(LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
            fechaPedidoField.setEditable(false);
            fechaPedidoField.setBackground(new Color(70, 70, 70));
            fechaPedidoField.setForeground(Color.WHITE);
            gbc.gridx = 1;
            panel.add(fechaPedidoField, gbc);

            JLabel fotoLabel = new JLabel("Foto de la Pieza:");
            estilizarEtiquetaFormulario(fotoLabel);
            gbc.gridx = 0;
            gbc.gridy = 10;
            panel.add(fotoLabel, gbc);

            fotoPreview = new JLabel();
            fotoPreview.setPreferredSize(new Dimension(200, 150));
            fotoPreview.setOpaque(true);
            fotoPreview.setBackground(new Color(70, 70, 70));
            fotoPreview.setBorder(BorderFactory.createLineBorder(Color.GRAY));
            gbc.gridx = 1;
            panel.add(fotoPreview, gbc);

            JButton agregarFotoButton = new JButton("Agregar Foto");
            estilizarBotonFormulario(agregarFotoButton, new Color(70, 130, 180));
            gbc.gridx = 1;
            gbc.gridy = 11;
            panel.add(agregarFotoButton, gbc);

            // Botones de acción
            JPanel actionPanel = new JPanel(new FlowLayout(FlowLayout.CENTER, 20, 20));
            actionPanel.setBackground(new Color(40, 40, 40));

            JButton guardarButton = new JButton("Guardar");
            JButton cerrarSesionButton = new JButton("Cerrar Sesión");

            estilizarBotonAccion(guardarButton, new Color(34, 139, 34));
            estilizarBotonAccion(cerrarSesionButton, new Color(178, 34, 34));

            actionPanel.add(guardarButton);
            actionPanel.add(cerrarSesionButton);

            gbc.gridx = 0;
            gbc.gridy = 12;
            gbc.gridwidth = 2;
            panel.add(actionPanel, gbc);

            // Acciones de los botones
            agregarFotoButton.addActionListener(e -> agregarFoto());
            guardarButton.addActionListener(e -> guardarDatos());
            cerrarSesionButton.addActionListener(e -> cerrarSesion());

            add(new JScrollPane(panel));
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
                java.io.File selectedFile = fileChooser.getSelectedFile();
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

