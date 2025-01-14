import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;

public class LoginSystem {

    // Crear un HashMap para almacenar usuarios y contraseñas encriptadas
    private static final HashMap<String, String> users = new HashMap<>();

    // Función para encriptar la contraseña
    private static String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hashBytes) {
                hexString.append(String.format("%02x", b));
            }
            return hexString.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static void main(String[] args) {
        // Pre-cargar los usuarios y sus contraseñas encriptadas
        users.put("admin", hashPassword("admin"));
        users.put("moderador", hashPassword("mod123"));
        users.put("usuario", hashPassword("user123"));

        // Crear la ventana del login
        JFrame frame = new JFrame("Sistema de Login");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(350, 250);

        // Crear el panel principal y configurar el layout
        JPanel mainPanel = new JPanel();
        mainPanel.setLayout(new BoxLayout(mainPanel, BoxLayout.Y_AXIS));

        // Crear los componentes
        JTextField userField = new JTextField(20);
        JPasswordField passField = new JPasswordField(20);
        JLabel messageLabel = new JLabel("");
        messageLabel.setForeground(Color.RED);

        // Panel para los campos de usuario y contraseña
        JPanel userPanel = new JPanel();
        userPanel.add(new JLabel("Usuario:"));
        userPanel.add(userField);

        JPanel passPanel = new JPanel();
        passPanel.add(new JLabel("Contraseña:"));
        passPanel.add(passField);

        // Panel de botones
        JPanel buttonPanel = new JPanel();
        JButton loginButton = new JButton("Iniciar sesión");
        JButton cancelButton = new JButton("Cancelar");
        buttonPanel.add(loginButton);
        buttonPanel.add(cancelButton);

        // Añadir los componentes al panel principal
        mainPanel.add(userPanel);
        mainPanel.add(Box.createRigidArea(new Dimension(0, 10)));
        mainPanel.add(passPanel);
        mainPanel.add(Box.createRigidArea(new Dimension(0, 10)));
        mainPanel.add(buttonPanel);
        mainPanel.add(Box.createRigidArea(new Dimension(0, 10)));
        mainPanel.add(messageLabel);

        // Agregar el panel principal a la ventana
        frame.add(mainPanel);
        frame.setLocationRelativeTo(null);
        frame.setVisible(true);

        // Acción del botón de login
        ActionListener loginAction = e -> {
            String username = userField.getText();
            String password = new String(passField.getPassword());

            // Verificar si los campos están vacíos
            if (username.trim().isEmpty() || password.trim().isEmpty()) {
                messageLabel.setText("Por favor complete todos los campos.");
                return;
            }

            // Verificar si las credenciales son correctas
            if (users.containsKey(username) && users.get(username).equals(hashPassword(password))) {
                frame.dispose();  // Cerrar la ventana de login
                showUserPanel(username);  // Mostrar el panel de usuario
            } else {
                messageLabel.setText("Usuario o contraseña incorrectos.");
                passField.setText("");  // Limpiar el campo de la contraseña
            }
        };

        // Activar el login con el botón de login
        loginButton.addActionListener(loginAction);

        // Activar el login cuando el usuario presiona "Enter" en el campo de contraseña
        passField.addActionListener(loginAction);

        // Acción para el botón de cancelar (cerrar el programa)
        cancelButton.addActionListener(e -> System.exit(0));
    }

    // Función para mostrar el panel de usuario después del login exitoso
    private static void showUserPanel(String username) {
        JFrame userFrame = new JFrame("Panel de Usuario");
        userFrame.setSize(400, 200);

        JPanel panel = new JPanel();
        panel.setLayout(new BorderLayout());

        JLabel welcomeLabel = new JLabel("¡Bienvenido, " + username + "!", JLabel.CENTER);
        panel.add(welcomeLabel, BorderLayout.CENTER);

        JButton logoutButton = new JButton("Cerrar sesión");
        panel.add(logoutButton, BorderLayout.SOUTH);

        userFrame.add(panel);
        userFrame.setLocationRelativeTo(null);
        userFrame.setVisible(true);

        // Acción para cerrar sesión
        logoutButton.addActionListener(e -> {
            userFrame.dispose();  // Cerrar el panel de usuario
            main(null);  // Volver a abrir la ventana de login
        });
    }
}


// java LoginSystem     ejecutar el programa en la terminal 