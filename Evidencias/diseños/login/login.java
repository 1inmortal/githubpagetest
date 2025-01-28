import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.io.File;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Login {
    public static void main(String[] args) {
        // Aplicar estilo predeterminado
        try {
            UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
        } catch (Exception e) {
            e.printStackTrace();
        }

        SwingUtilities.invokeLater(Login::new);
    }

    public Login() {
        mostrarLogin();
    }
    

    private void mostrarLogin() {
        JFrame frame = crearFrame("Login", 400, 250);
        JPanel panel = new JPanel(new GridBagLayout());
        panel.setBorder(new EmptyBorder(20, 20, 20, 20));
        panel.setBackground(new Color(245, 245, 245));
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(10, 10, 10, 10);
        gbc.fill = GridBagConstraints.HORIZONTAL;

        JLabel userLabel = crearEtiqueta("Usuario:");
        JTextField userField = crearCampoTexto();

        JLabel passLabel = crearEtiqueta("Contraseña:");
        JPasswordField passField = crearCampoContraseña();

        JButton loginButton = crearBoton("Iniciar Sesión", new Color(173, 216, 230), Color.BLACK);

        gbc.gridx = 0;
        gbc.gridy = 0;
        panel.add(userLabel, gbc);

        gbc.gridx = 1;
        panel.add(userField, gbc);

        gbc.gridx = 0;
        gbc.gridy = 1;
        panel.add(passLabel, gbc);

        gbc.gridx = 1;
        panel.add(passField, gbc);

        gbc.gridx = 0;
        gbc.gridy = 2;
        gbc.gridwidth = 2;
        panel.add(loginButton, gbc);

        loginButton.addActionListener(e -> {
            String user = userField.getText().trim();
            String pass = new String(passField.getPassword()).trim();

            if (user.isEmpty() || pass.isEmpty()) {
                mostrarMensaje(frame, "Por favor, completa todos los campos.", "Error", JOptionPane.ERROR_MESSAGE);
                return;
            }

            if (user.equals("Admin") && pass.equals("Jose1234")) {
                mostrarMensaje(frame, "Bienvenido, Admin", "Éxito", JOptionPane.INFORMATION_MESSAGE);
                frame.dispose();
                mostrarMenu("Admin");
            } else if (user.equals("usuario") && pass.equals("user123")) {
                mostrarMensaje(frame, "Bienvenido, Usuario", "Éxito", JOptionPane.INFORMATION_MESSAGE);
                frame.dispose();
                mostrarMenu("Usuario");
            } else {
                mostrarMensaje(frame, "Credenciales incorrectas.", "Error", JOptionPane.ERROR_MESSAGE);
            }
        });

        frame.add(panel);
        frame.setVisible(true);
    }

    private void mostrarMenu(String nivelUsuario) {
        JFrame frame = crearFrame("Menú Principal", 400, 300);
        frame.setLayout(new BorderLayout());

        JLabel welcomeLabel = crearEtiquetaCentro("Bienvenido: " + nivelUsuario, new Font("Arial", Font.BOLD, 16));
        welcomeLabel.setBorder(new EmptyBorder(20, 0, 20, 0));

        JPanel botonesPanel = new JPanel(new GridLayout(3, 1, 10, 10));
        botonesPanel.setBorder(new EmptyBorder(10, 50, 10, 50));
        botonesPanel.setBackground(new Color(245, 245, 245));

        JButton formularioButton = crearBoton("Pedido de Piezas", new Color(144, 238, 144), Color.BLACK);
        JButton reportesButton = crearBoton("Generar Reportes", new Color(255, 228, 181), Color.BLACK);
        JButton salirButton = crearBoton("Salir", new Color(255, 160, 122), Color.BLACK);

        botonesPanel.add(formularioButton);
        botonesPanel.add(reportesButton);
        botonesPanel.add(salirButton);

        formularioButton.addActionListener(e -> {
            frame.dispose();
            mostrarFormulario(nivelUsuario);
        });

        reportesButton.addActionListener(e -> {
            // iplementar funcionalidad de reportes
            mostrarMensaje(frame, "Funcionalidad de reportes en desarrollo.", "Información",
                    JOptionPane.INFORMATION_MESSAGE);
        });

        salirButton.addActionListener(e -> System.exit(0));

        frame.add(welcomeLabel, BorderLayout.NORTH);
        frame.add(botonesPanel, BorderLayout.CENTER);
        frame.setVisible(true);
    }

    private void mostrarFormulario(String nivelUsuario) {
        JFrame frame = crearFrame("Pedido de Piezas - Chevrolet", 700, 800);
        JPanel panel = new JPanel(new GridBagLayout());
        panel.setBorder(new EmptyBorder(20, 20, 20, 20));
        panel.setBackground(new Color(240, 248, 255));
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(10, 10, 10, 10);
        gbc.fill = GridBagConstraints.HORIZONTAL;

        // Campos del formulario xd
        JLabel piezaLabel = crearEtiqueta("Nombre de la Pieza:");
        JTextField piezaField = crearCampoTexto();

        JLabel numeroParteLabel = crearEtiqueta("Número de Parte:");
        JTextField numeroParteField = crearCampoTexto();

        JLabel cantidadLabel = crearEtiqueta("Cantidad:");
        JTextField cantidadField = crearCampoTexto();

        JLabel precioLabel = crearEtiqueta("Precio (USD):");
        JTextField precioField = crearCampoTexto();

        JLabel proveedorLabel = crearEtiqueta("Proveedor:");
        JTextField proveedorField = crearCampoTexto();

        JLabel direccionProveedorLabel = crearEtiqueta("Dirección del Proveedor:");
        JTextField direccionProveedorField = crearCampoTexto();

        JLabel descripcionLabel = crearEtiqueta("Descripción de la Pieza:");
        JTextArea descripcionArea = crearAreaTexto(5, 20);
        JScrollPane descripcionScroll = new JScrollPane(descripcionArea);

        JLabel fechaPedidoLabel = crearEtiqueta("Fecha de Pedido:");
        JTextField fechaPedidoField = crearCampoTexto();
        fechaPedidoField.setText(LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        fechaPedidoField.setEditable(false);
        fechaPedidoField.setBackground(Color.LIGHT_GRAY);

        JLabel fotoLabel = crearEtiqueta("Foto de la Pieza:");
        JLabel fotoPreview = new JLabel();
        fotoPreview.setPreferredSize(new Dimension(200, 150));
        fotoPreview.setBorder(BorderFactory.createLineBorder(Color.GRAY));

        JButton agregarFotoButton = crearBoton("Agregar Foto", new Color(173, 216, 230), Color.BLACK);
        JButton guardarButton = crearBoton("Guardar", new Color(144, 238, 144), Color.BLACK);
        JButton cerrarSesionButton = crearBoton("Cerrar Sesión", new Color(255, 160, 122), Color.BLACK);

        // Añadir componentes al panel
        gbc.gridx = 0;
        gbc.gridy = 0;
        panel.add(piezaLabel, gbc);

        gbc.gridx = 1;
        panel.add(piezaField, gbc);

        gbc.gridx = 0;
        gbc.gridy = 1;
        panel.add(numeroParteLabel, gbc);

        gbc.gridx = 1;
        panel.add(numeroParteField, gbc);

        gbc.gridx = 0;
        gbc.gridy = 2;
        panel.add(cantidadLabel, gbc);

        gbc.gridx = 1;
        panel.add(cantidadField, gbc);

        gbc.gridx = 0;
        gbc.gridy = 3;
        panel.add(precioLabel, gbc);

        gbc.gridx = 1;
        panel.add(precioField, gbc);

        gbc.gridx = 0;
        gbc.gridy = 4;
        panel.add(proveedorLabel, gbc);

        gbc.gridx = 1;
        panel.add(proveedorField, gbc);

        gbc.gridx = 0;
        gbc.gridy = 5;
        panel.add(direccionProveedorLabel, gbc);

        gbc.gridx = 1;
        panel.add(direccionProveedorField, gbc);

        gbc.gridx = 0;
        gbc.gridy = 6;
        panel.add(descripcionLabel, gbc);

        gbc.gridx = 1;
        panel.add(descripcionScroll, gbc);

        gbc.gridx = 0;
        gbc.gridy = 7;
        panel.add(fechaPedidoLabel, gbc);

        gbc.gridx = 1;
        panel.add(fechaPedidoField, gbc);

        gbc.gridx = 0;
        gbc.gridy = 8;
        panel.add(fotoLabel, gbc);

        gbc.gridx = 1;
        panel.add(fotoPreview, gbc);

        gbc.gridx = 1;
        gbc.gridy = 9;
        panel.add(agregarFotoButton, gbc);

        gbc.gridx = 0;
        gbc.gridy = 10;
        panel.add(guardarButton, gbc);

        gbc.gridx = 1;
        panel.add(cerrarSesionButton, gbc);

        // Acción para agregar foto
        agregarFotoButton.addActionListener(e -> {
            JFileChooser fileChooser = new JFileChooser();
            fileChooser.setDialogTitle("Seleccionar Foto de la Pieza");
            fileChooser.setAcceptAllFileFilterUsed(false);
            fileChooser.addChoosableFileFilter(
                    new javax.swing.filechooser.FileNameExtensionFilter("Imágenes", "jpg", "png", "jpeg", "gif"));

            int result = fileChooser.showOpenDialog(frame);
            if (result == JFileChooser.APPROVE_OPTION) {
                File selectedFile = fileChooser.getSelectedFile();
                ImageIcon icon = new ImageIcon(
                        new ImageIcon(selectedFile.getAbsolutePath()).getImage().getScaledInstance(
                                fotoPreview.getWidth(), fotoPreview.getHeight(), Image.SCALE_SMOOTH));
                fotoPreview.setIcon(icon);
            } else {
                mostrarMensaje(frame, "No se seleccionó ninguna foto.", "Información", JOptionPane.INFORMATION_MESSAGE);
            }
        });

        // Acción para guardar datos
        guardarButton.addActionListener(e -> {
            String pieza = piezaField.getText().trim();
            String numeroParte = numeroParteField.getText().trim();
            String cantidadStr = cantidadField.getText().trim();
            String precioStr = precioField.getText().trim();
            String proveedor = proveedorField.getText().trim();
            String direccionProveedor = direccionProveedorField.getText().trim();
            String descripcion = descripcionArea.getText().trim();
            String fechaPedido = fechaPedidoField.getText().trim();
            Icon foto = fotoPreview.getIcon();

            if (pieza.isEmpty() || numeroParte.isEmpty() || cantidadStr.isEmpty() || precioStr.isEmpty()
                    || proveedor.isEmpty() || direccionProveedor.isEmpty() || descripcion.isEmpty()) {
                mostrarMensaje(frame, "Por favor, completa todos los campos.", "Error", JOptionPane.ERROR_MESSAGE);
                return;
            }

            int cantidad;
            double precio;
            try {
                cantidad = Integer.parseInt(cantidadStr);
                precio = Double.parseDouble(precioStr);
            } catch (NumberFormatException ex) {
                mostrarMensaje(frame, "Cantidad y Precio deben ser números válidos.", "Error",
                        JOptionPane.ERROR_MESSAGE);
                return;
            }

            // Aquí puedes agregar la lógica para guardar los datos en una base de datos o
            // archivo.

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
                    pieza, numeroParte, cantidad, precio, proveedor, direccionProveedor, descripcion, fechaPedido,
                    (foto != null) ? "Sí" : "No");

            mostrarMensaje(frame, resumen, "Éxito", JOptionPane.INFORMATION_MESSAGE);
        });

        // Acción para cerrar sesión
        cerrarSesionButton.addActionListener(e -> {
            frame.dispose();
            mostrarLogin();
        });

        frame.add(panel);
        frame.setVisible(true);
    }

    // Métodos auxiliares para crear componentes
    private JFrame crearFrame(String titulo, int ancho, int alto) {
        JFrame frame = new JFrame(titulo);
        frame.setSize(ancho, alto);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLocationRelativeTo(null); // Centrar en la pantalla
        return frame;
    }

    private JLabel crearEtiqueta(String texto) {
        JLabel label = new JLabel(texto + ":");
        label.setFont(new Font("Arial", Font.PLAIN, 14));
        return label;
    }

    private JLabel crearEtiquetaCentro(String texto, Font fuente) {
        JLabel label = new JLabel(texto, JLabel.CENTER);
        label.setFont(fuente);
        return label;
    }

    private JTextField crearCampoTexto() {
        JTextField campo = new JTextField(20);
        campo.setFont(new Font("Arial", Font.PLAIN, 14));
        return campo;
    }

    private JTextArea crearAreaTexto(int filas, int columnas) {
        JTextArea area = new JTextArea(filas, columnas);
        area.setFont(new Font("Arial", Font.PLAIN, 14));
        area.setLineWrap(true);
        area.setWrapStyleWord(true);
        return area;
    }

    private JPasswordField crearCampoContraseña() {
        JPasswordField campo = new JPasswordField(20);
        campo.setFont(new Font("Arial", Font.PLAIN, 14));
        return campo;
    }

    private JButton crearBoton(String texto, Color colorFondo, Color colorTexto) {
        JButton boton = new JButton(texto);
        boton.setBackground(colorFondo);
        boton.setForeground(colorTexto);
        boton.setFont(new Font("Arial", Font.BOLD, 14));
        boton.setFocusPainted(false);
        return boton;
    }

    private void mostrarMensaje(Component parent, String mensaje, String titulo, int tipo) {
        JOptionPane.showMessageDialog(parent, mensaje, titulo, tipo);
    }
}
