import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.io.File;
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
            setSize(450, 300);
            setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            setLocationRelativeTo(null); // Centrar en la pantalla
            setResizable(false);

            initUI();
            setVisible(true);
        }

        private void initUI() {
            JPanel panel = new JPanel(new GridBagLayout());
            panel.setBorder(new EmptyBorder(30, 30, 30, 30));
            panel.setBackground(Color.WHITE);

            GridBagConstraints gbc = new GridBagConstraints();
            gbc.insets = new Insets(10, 10, 10, 10);
            gbc.fill = GridBagConstraints.HORIZONTAL;

            JLabel titleLabel = new JLabel("Bienvenido a Chevrolet");
            titleLabel.setFont(new Font("Segoe UI", Font.BOLD, 20));
            titleLabel.setHorizontalAlignment(JLabel.CENTER);

            gbc.gridx = 0;
            gbc.gridy = 0;
            gbc.gridwidth = 2;
            panel.add(titleLabel, gbc);

            gbc.gridwidth = 1;

            JLabel userLabel = new JLabel("Usuario:");
            userLabel.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            gbc.gridx = 0;
            gbc.gridy = 1;
            panel.add(userLabel, gbc);

            userField = new JTextField(20);
            userField.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            gbc.gridx = 1;
            panel.add(userField, gbc);

            JLabel passLabel = new JLabel("Contraseña:");
            passLabel.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            gbc.gridx = 0;
            gbc.gridy = 2;
            panel.add(passLabel, gbc);

            passField = new JPasswordField(20);
            passField.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            gbc.gridx = 1;
            panel.add(passField, gbc);

            JCheckBox rememberCheckBox = new JCheckBox("Recordar Usuario");
            rememberCheckBox.setBackground(Color.WHITE);
            rememberCheckBox.setFont(new Font("Segoe UI", Font.PLAIN, 12));
            gbc.gridx = 0;
            gbc.gridy = 3;
            gbc.gridwidth = 2;
            panel.add(rememberCheckBox, gbc);

            JButton loginButton = new JButton("Iniciar Sesión");
            loginButton.setFont(new Font("Segoe UI", Font.BOLD, 14));
            loginButton.setBackground(new Color(70, 130, 180));
            loginButton.setForeground(Color.WHITE);
            loginButton.setFocusPainted(false);
            gbc.gridy = 4;
            panel.add(loginButton, gbc);

            JButton forgotPassButton = new JButton("¿Olvidaste tu contraseña?");
            forgotPassButton.setFont(new Font("Segoe UI", Font.PLAIN, 12));
            forgotPassButton.setBackground(Color.WHITE);
            forgotPassButton.setForeground(new Color(70, 130, 180));
            forgotPassButton.setBorderPainted(false);
            forgotPassButton.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
            gbc.gridy = 5;
            panel.add(forgotPassButton, gbc);

            // Acciones de los botones
            loginButton.addActionListener(this::handleLogin);
            forgotPassButton.addActionListener(this::handleForgotPassword);

            add(panel);
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
            setSize(500, 400);
            setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            setLocationRelativeTo(null); // Centrar en la pantalla
            setResizable(false);

            initUI();
            setVisible(true);
        }

        private void initUI() {
            setLayout(new BorderLayout());

            // Panel superior para mostrar el rol y el nombre de usuario
            JPanel topPanel = new JPanel(new BorderLayout());
            topPanel.setBorder(new EmptyBorder(10, 10, 10, 10));
            topPanel.setBackground(new Color(245, 245, 245));

            JLabel roleLabel = new JLabel("Rol: " + userLevel);
            roleLabel.setFont(new Font("Segoe UI", Font.BOLD, 14));
            topPanel.add(roleLabel, BorderLayout.WEST);

            JLabel userLabel = new JLabel("Usuario: " + username);
            userLabel.setFont(new Font("Segoe UI", Font.BOLD, 14));
            topPanel.add(userLabel, BorderLayout.EAST);

            add(topPanel, BorderLayout.NORTH);

            // Panel central con los botones de funcionalidades
            JPanel buttonsPanel = new JPanel(new GridLayout(4, 1, 15, 15));
            buttonsPanel.setBorder(new EmptyBorder(30, 100, 30, 100));
            buttonsPanel.setBackground(new Color(245, 245, 245));

            JButton pedidoButton = new JButton("Pedido de Piezas");
            JButton reportesButton = new JButton("Generar Reportes");
            JButton cambiarPassButton = new JButton("Cambiar Contraseña");
            JButton salirButton = new JButton("Salir");

            estilizarBoton(pedidoButton);
            estilizarBoton(reportesButton);
            estilizarBoton(cambiarPassButton);
            estilizarBoton(salirButton);

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

        private void estilizarBoton(JButton boton) {
            boton.setFont(new Font("Segoe UI", Font.BOLD, 14));
            boton.setBackground(new Color(70, 130, 180));
            boton.setForeground(Color.WHITE);
            boton.setFocusPainted(false);
            boton.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
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
            panel.setBackground(Color.WHITE);

            GridBagConstraints gbc = new GridBagConstraints();
            gbc.insets = new Insets(10, 10, 10, 10);
            gbc.fill = GridBagConstraints.HORIZONTAL;

            // Panel superior para mostrar el rol y el nombre de usuario
            JPanel topPanel = new JPanel(new BorderLayout());
            topPanel.setBorder(new EmptyBorder(10, 10, 10, 10));
            topPanel.setBackground(new Color(245, 245, 245));

            JLabel roleLabel = new JLabel("Rol: " + userLevel);
            roleLabel.setFont(new Font("Segoe UI", Font.BOLD, 14));
            topPanel.add(roleLabel, BorderLayout.WEST);

            JLabel userLabel = new JLabel("Usuario: " + username);
            userLabel.setFont(new Font("Segoe UI", Font.BOLD, 14));
            topPanel.add(userLabel, BorderLayout.EAST);

            gbc.gridx = 0;
            gbc.gridy = 0;
            gbc.gridwidth = 2;
            panel.add(topPanel, gbc);

            gbc.gridwidth = 1;

            JLabel titleLabel = new JLabel("Formulario de Pedido de Piezas");
            titleLabel.setFont(new Font("Segoe UI", Font.BOLD, 22));
            titleLabel.setHorizontalAlignment(JLabel.CENTER);
            gbc.gridx = 0;
            gbc.gridy = 1;
            gbc.gridwidth = 2;
            panel.add(titleLabel, gbc);

            gbc.gridwidth = 1;

            // Campos del formulario
            JLabel piezaLabel = new JLabel("Nombre de la Pieza:");
            piezaLabel.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            gbc.gridx = 0;
            gbc.gridy = 2;
            panel.add(piezaLabel, gbc);

            piezaField = new JTextField(20);
            piezaField.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            gbc.gridx = 1;
            panel.add(piezaField, gbc);

            JLabel numeroParteLabel = new JLabel("Número de Parte:");
            numeroParteLabel.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            gbc.gridx = 0;
            gbc.gridy = 3;
            panel.add(numeroParteLabel, gbc);

            numeroParteField = new JTextField(20);
            numeroParteField.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            gbc.gridx = 1;
            panel.add(numeroParteField, gbc);

            JLabel cantidadLabel = new JLabel("Cantidad:");
            cantidadLabel.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            gbc.gridx = 0;
            gbc.gridy = 4;
            panel.add(cantidadLabel, gbc);

            cantidadField = new JTextField(20);
            cantidadField.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            gbc.gridx = 1;
            panel.add(cantidadField, gbc);

            JLabel precioLabel = new JLabel("Precio (USD):");
            precioLabel.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            gbc.gridx = 0;
            gbc.gridy = 5;
            panel.add(precioLabel, gbc);

            precioField = new JTextField(20);
            precioField.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            gbc.gridx = 1;
            panel.add(precioField, gbc);

            JLabel proveedorLabel = new JLabel("Proveedor:");
            proveedorLabel.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            gbc.gridx = 0;
            gbc.gridy = 6;
            panel.add(proveedorLabel, gbc);

            proveedorField = new JTextField(20);
            proveedorField.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            gbc.gridx = 1;
            panel.add(proveedorField, gbc);

            JLabel direccionProveedorLabel = new JLabel("Dirección del Proveedor:");
            direccionProveedorLabel.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            gbc.gridx = 0;
            gbc.gridy = 7;
            panel.add(direccionProveedorLabel, gbc);

            direccionProveedorField = new JTextField(20);
            direccionProveedorField.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            gbc.gridx = 1;
            panel.add(direccionProveedorField, gbc);

            JLabel descripcionLabel = new JLabel("Descripción de la Pieza:");
            descripcionLabel.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            gbc.gridx = 0;
            gbc.gridy = 8;
            panel.add(descripcionLabel, gbc);

            descripcionArea = new JTextArea(5, 20);
            descripcionArea.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            descripcionArea.setLineWrap(true);
            descripcionArea.setWrapStyleWord(true);
            JScrollPane descripcionScroll = new JScrollPane(descripcionArea);
            gbc.gridx = 1;
            panel.add(descripcionScroll, gbc);

            JLabel fechaPedidoLabel = new JLabel("Fecha de Pedido:");
            fechaPedidoLabel.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            gbc.gridx = 0;
            gbc.gridy = 9;
            panel.add(fechaPedidoLabel, gbc);

            JTextField fechaPedidoField = new JTextField(20);
            fechaPedidoField.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            fechaPedidoField.setText(LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
            fechaPedidoField.setEditable(false);
            fechaPedidoField.setBackground(new Color(240, 240, 240));
            gbc.gridx = 1;
            panel.add(fechaPedidoField, gbc);

            JLabel fotoLabel = new JLabel("Foto de la Pieza:");
            fotoLabel.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            gbc.gridx = 0;
            gbc.gridy = 10;
            panel.add(fotoLabel, gbc);

            fotoPreview = new JLabel();
            fotoPreview.setPreferredSize(new Dimension(200, 150));
            fotoPreview.setBorder(BorderFactory.createLineBorder(Color.GRAY));
            gbc.gridx = 1;
            panel.add(fotoPreview, gbc);

            JButton agregarFotoButton = new JButton("Agregar Foto");
            agregarFotoButton.setFont(new Font("Segoe UI", Font.BOLD, 14));
            agregarFotoButton.setBackground(new Color(70, 130, 180));
            agregarFotoButton.setForeground(Color.WHITE);
            agregarFotoButton.setFocusPainted(false);
            agregarFotoButton.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
            gbc.gridx = 1;
            gbc.gridy = 11;
            panel.add(agregarFotoButton, gbc);

            // Botones de acción
            JPanel actionPanel = new JPanel(new FlowLayout(FlowLayout.CENTER, 20, 20));
            actionPanel.setBackground(Color.WHITE);

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

        private void estilizarBotonAccion(JButton boton, Color colorFondo) {
            boton.setFont(new Font("Segoe UI", Font.BOLD, 14));
            boton.setBackground(colorFondo);
            boton.setForeground(Color.WHITE);
            boton.setFocusPainted(false);
            boton.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
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


