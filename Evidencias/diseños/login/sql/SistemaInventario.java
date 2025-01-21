import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class SistemaInventario {
    public static void main(String[] args) {
        // Aplicar estilo predeterminado
        try {
            UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
        } catch (Exception e) {
            e.printStackTrace();
        }

        new SistemaInventario();
    }

    public SistemaInventario() {
        mostrarLogin();
    }

    // Método para mostrar la pantalla de Login
    private void mostrarLogin() {
        JFrame frame = new JFrame("Login");
        frame.setSize(400, 250);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLayout(new GridBagLayout());
        frame.getContentPane().setBackground(new Color(50, 50, 50));

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(10, 10, 10, 10);
        gbc.fill = GridBagConstraints.HORIZONTAL;

        JLabel userLabel = new JLabel("Usuario:");
        userLabel.setForeground(Color.WHITE);
        JTextField userField = new JTextField();

        JLabel passLabel = new JLabel("Contraseña:");
        passLabel.setForeground(Color.WHITE);
        JPasswordField passField = new JPasswordField();

        JButton loginButton = new JButton("Iniciar sesión");
        loginButton.setBackground(Color.BLACK);
        loginButton.setForeground(Color.WHITE);
        loginButton.setFont(new Font("Arial", Font.BOLD, 14));

        gbc.gridx = 0;
        gbc.gridy = 0;
        frame.add(userLabel, gbc);

        gbc.gridx = 1;
        frame.add(userField, gbc);

        gbc.gridx = 0;
        gbc.gridy = 1;
        frame.add(passLabel, gbc);

        gbc.gridx = 1;
        frame.add(passField, gbc);

        gbc.gridx = 0;
        gbc.gridy = 2;
        gbc.gridwidth = 2;
        frame.add(loginButton, gbc);

        loginButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String user = userField.getText();
                String pass = new String(passField.getPassword());

                // Validación de niveles de usuario
                if (user.equals("Admin") && pass.equals("Jose1234")) {
                    JOptionPane.showMessageDialog(frame, "Bienvenido, Admin");
                    frame.dispose();
                    mostrarMenu("Admin");
                } else if (user.equals("usuario") && pass.equals("user123")) {
                    JOptionPane.showMessageDialog(frame, "Bienvenido, Usuario");
                    frame.dispose();
                    mostrarMenu("Usuario");
                } else {
                    JOptionPane.showMessageDialog(frame, "Credenciales incorrectas");
                }
            }
        });

        frame.setVisible(true);
    }

    // Método para mostrar el Menú Principal
    private void mostrarMenu(String nivelUsuario) {
        JFrame frame = new JFrame("Menú Principal");
        frame.setSize(400, 300);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLayout(new GridLayout(3, 1));
        frame.getContentPane().setBackground(new Color(40, 40, 40));

        JLabel welcomeLabel = new JLabel("Bienvenido: " + nivelUsuario, JLabel.CENTER);
        welcomeLabel.setFont(new Font("Arial", Font.BOLD, 16));
        welcomeLabel.setForeground(Color.WHITE);

        JButton formularioButton = new JButton("Formulario de Inventario");
        formularioButton.setBackground(Color.BLACK);
        formularioButton.setForeground(Color.WHITE);
        formularioButton.setFont(new Font("Arial", Font.BOLD, 14));

        JButton salirButton = new JButton("Salir");
        salirButton.setBackground(Color.BLACK);
        salirButton.setForeground(Color.WHITE);
        salirButton.setFont(new Font("Arial", Font.BOLD, 14));

        frame.add(welcomeLabel);
        frame.add(formularioButton);
        frame.add(salirButton);

        formularioButton.addActionListener(e -> {
            if (nivelUsuario.equals("Admin") || nivelUsuario.equals("Usuario")) {
                frame.dispose();
                mostrarFormulario();
            } else {
                JOptionPane.showMessageDialog(frame, "No tienes acceso.");
            }
        });

        salirButton.addActionListener(e -> System.exit(0));

        frame.setVisible(true);
    }

    // Método para mostrar el Formulario de Inventario
    private void mostrarFormulario() {
        JFrame frame = new JFrame("Formulario de Inventario - Chevrolet");
        frame.setSize(600, 700);
        frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        frame.setLayout(new GridBagLayout());
        frame.getContentPane().setBackground(new Color(30, 30, 30));

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(10, 10, 10, 10);
        gbc.fill = GridBagConstraints.HORIZONTAL;

        JLabel piezaLabel = new JLabel("Nombre de la Pieza:");
        piezaLabel.setForeground(Color.WHITE);
        JTextField piezaField = new JTextField();

        JLabel numeroParteLabel = new JLabel("Número de Parte:");
        numeroParteLabel.setForeground(Color.WHITE);
        JTextField numeroParteField = new JTextField();

        JLabel cantidadLabel = new JLabel("Cantidad en Inventario:");
        cantidadLabel.setForeground(Color.WHITE);
        JTextField cantidadField = new JTextField();

        JLabel precioLabel = new JLabel("Precio:");
        precioLabel.setForeground(Color.WHITE);
        JTextField precioField = new JTextField();

        JLabel proveedorLabel = new JLabel("Proveedor:");
        proveedorLabel.setForeground(Color.WHITE);
        JTextField proveedorField = new JTextField();

        JLabel ubicacionLabel = new JLabel("Ubicación en Almacén:");
        ubicacionLabel.setForeground(Color.WHITE);
        JTextField ubicacionField = new JTextField();

        JLabel fechaIngresoLabel = new JLabel("Fecha de Ingreso:");
        fechaIngresoLabel.setForeground(Color.WHITE);
        JTextField fechaIngresoField = new JTextField();

        JButton agregarFotoButton = new JButton("Agregar Foto");
        JButton guardarButton = new JButton("Guardar");
        JButton cerrarSesionButton = new JButton("Cerrar Sesión");

        agregarFotoButton.setBackground(Color.BLACK);
        agregarFotoButton.setForeground(Color.WHITE);
        agregarFotoButton.setFont(new Font("Arial", Font.BOLD, 14));

        guardarButton.setBackground(Color.BLACK);
        guardarButton.setForeground(Color.WHITE);
        guardarButton.setFont(new Font("Arial", Font.BOLD, 14));

        cerrarSesionButton.setBackground(Color.BLACK);
        cerrarSesionButton.setForeground(Color.WHITE);
        cerrarSesionButton.setFont(new Font("Arial", Font.BOLD, 14));

        gbc.gridx = 0;
        gbc.gridy = 0;
        frame.add(piezaLabel, gbc);

        gbc.gridx = 1;
        frame.add(piezaField, gbc);

        gbc.gridx = 0;
        gbc.gridy = 1;
        frame.add(numeroParteLabel, gbc);

        gbc.gridx = 1;
        frame.add(numeroParteField, gbc);

        gbc.gridx = 0;
        gbc.gridy = 2;
        frame.add(cantidadLabel, gbc);

        gbc.gridx = 1;
        frame.add(cantidadField, gbc);

        gbc.gridx = 0;
        gbc.gridy = 3;
        frame.add(precioLabel, gbc);

        gbc.gridx = 1;
        frame.add(precioField, gbc);

        gbc.gridx = 0;
        gbc.gridy = 4;
        frame.add(proveedorLabel, gbc);

        gbc.gridx = 1;
        frame.add(proveedorField, gbc);

        gbc.gridx = 0;
        gbc.gridy = 5;
        frame.add(ubicacionLabel, gbc);

        gbc.gridx = 1;
        frame.add(ubicacionField, gbc);

        gbc.gridx = 0;
        gbc.gridy = 6;
        frame.add(fechaIngresoLabel, gbc);

        gbc.gridx = 1;
        frame.add(fechaIngresoField, gbc);

        gbc.gridx = 0;
        gbc.gridy = 7;
        frame.add(agregarFotoButton, gbc);

        gbc.gridx = 1;
        frame.add(guardarButton, gbc);

        gbc.gridx = 0;
        gbc.gridy = 8;
        gbc.gridwidth = 2;
        frame.add(cerrarSesionButton, gbc);

        guardarButton.addActionListener(e -> {
            String pieza = piezaField.getText();
            String numeroParte = numeroParteField.getText();
            String cantidad = cantidadField.getText();
            String precio = precioField.getText();
            String proveedor = proveedorField.getText();
            String ubicacion = ubicacionField.getText();
            String fechaIngreso = fechaIngresoField.getText();

            JOptionPane.showMessageDialog(frame, "Datos guardados:\n" +
                    "Pieza: " + pieza + "\n" +
                    "Número de Parte: " + numeroParte + "\n" +
                    "Cantidad: " + cantidad + "\n" +
                    "Precio: " + precio + "\n" +
                    "Proveedor: " + proveedor + "\n" +
                    "Ubicación: " + ubicacion + "\n" +
                    "Fecha de Ingreso: " + fechaIngreso);
        });

        cerrarSesionButton.addActionListener(e -> {
            frame.dispose();
            mostrarLogin();
        });

        agregarFotoButton.addActionListener(e -> {
            JFileChooser fileChooser = new JFileChooser();
            int result = fileChooser.showOpenDialog(frame);
            if (result == JFileChooser.APPROVE_OPTION) {
                JOptionPane.showMessageDialog(frame, "Foto seleccionada: " + fileChooser.getSelectedFile().getName());
            }
        });

        frame.setVisible(true);
    }
}