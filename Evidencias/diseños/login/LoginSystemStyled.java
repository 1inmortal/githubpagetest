import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;

public class LoginSystemStyled {

    private static final HashMap<String, String> users = new HashMap<>();

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
        // Pre-cargar usuarios
        users.put("admin", hashPassword("admin"));
        users.put("moderador", hashPassword("mod123"));
        users.put("usuario", hashPassword("user123"));

        // Configurar el Look and Feel
        try {
            UIManager.setLookAndFeel("javax.swing.plaf.nimbus.NimbusLookAndFeel");
        } catch (Exception e) {
            e.printStackTrace();
        }

        JFrame frame = new JFrame("Sistema de Login");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(400, 300);

        // Crear el panel principal con diseño personalizado
        JPanel mainPanel = new JPanel();
        mainPanel.setLayout(new BoxLayout(mainPanel, BoxLayout.Y_AXIS));
        mainPanel.setBackground(new Color(50, 50, 50)); // Fondo oscuro

        // Crear los componentes con estilo
        JLabel titleLabel = new JLabel("Bienvenido");
        titleLabel.setFont(new Font("Arial", Font.BOLD, 24));
        titleLabel.setForeground(Color.WHITE);
        titleLabel.setAlignmentX(Component.CENTER_ALIGNMENT);

        JTextField userField = new JTextField(20);
        styleTextField(userField);

        JPasswordField passField = new JPasswordField(20);
        styleTextField(passField);

        JLabel messageLabel = new JLabel("");
        messageLabel.setForeground(Color.RED);
        messageLabel.setAlignmentX(Component.CENTER_ALIGNMENT);

        // Panel para campos de entrada
        JPanel inputPanel = new JPanel();
        inputPanel.setLayout(new GridLayout(2, 2, 10, 10));
        inputPanel.setOpaque(false); // Fondo transparente
        inputPanel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
        inputPanel.add(createStyledLabel("Usuario:"));
        inputPanel.add(userField);
        inputPanel.add(createStyledLabel("Contraseña:"));
        inputPanel.add(passField);

        // Botones con estilo
        JButton loginButton = new JButton("Iniciar sesión");
        styleButton(loginButton);

        JButton cancelButton = new JButton("Cancelar");
        styleButton(cancelButton);

        JPanel buttonPanel = new JPanel();
        buttonPanel.setOpaque(false); // Fondo transparente
        buttonPanel.add(loginButton);
        buttonPanel.add(cancelButton);

        // Añadir componentes al panel principal
        mainPanel.add(Box.createVerticalStrut(10));
        mainPanel.add(titleLabel);
        mainPanel.add(Box.createVerticalStrut(10));
        mainPanel.add(inputPanel);
        mainPanel.add(Box.createVerticalStrut(10));
        mainPanel.add(buttonPanel);
        mainPanel.add(Box.createVerticalStrut(10));
        mainPanel.add(messageLabel);

        frame.add(mainPanel);
        frame.setLocationRelativeTo(null);
        frame.setVisible(true);

        // Acción del botón de login
        loginButton.addActionListener(e -> {
            String username = userField.getText();
            String password = new String(passField.getPassword());
            if (username.trim().isEmpty() || password.trim().isEmpty()) {
                messageLabel.setText("Por favor complete todos los campos.");
            } else if (users.containsKey(username) && users.get(username).equals(hashPassword(password))) {
                frame.dispose();
                showUserPanel(username);
            } else {
                messageLabel.setText("Usuario o contraseña incorrectos.");
                passField.setText("");
            }
        });

        // Acción del botón cancelar
        cancelButton.addActionListener(e -> System.exit(0));
    }

    private static JLabel createStyledLabel(String text) {
        JLabel label = new JLabel(text);
        label.setForeground(Color.WHITE);
        label.setFont(new Font("Arial", Font.PLAIN, 14));
        return label;
    }

    private static void styleTextField(JTextField textField) {
        textField.setFont(new Font("Arial", Font.PLAIN, 14));
        textField.setBorder(BorderFactory.createLineBorder(Color.WHITE));
        textField.setBackground(new Color(70, 70, 70));
        textField.setForeground(Color.WHITE);
        textField.setCaretColor(Color.WHITE);
    }

    private static void styleButton(JButton button) {
        button.setFont(new Font("Arial", Font.BOLD, 14));
        button.setBackground(new Color(100, 149, 237)); // Azul claro
        button.setForeground(Color.WHITE);
        button.setFocusPainted(false);
        button.setBorder(BorderFactory.createEmptyBorder(5, 15, 5, 15));
    }

    private static void showUserPanel(String username) {
        JFrame userFrame = new JFrame("Panel de Usuario");
        userFrame.setSize(400, 200);

        JPanel panel = new JPanel();
        panel.setLayout(new BorderLayout());
        panel.setBackground(new Color(50, 50, 50));

        JLabel welcomeLabel = new JLabel("¡Bienvenido, " + username + "!", JLabel.CENTER);
        welcomeLabel.setFont(new Font("Arial", Font.BOLD, 20));
        welcomeLabel.setForeground(Color.WHITE);
        panel.add(welcomeLabel, BorderLayout.CENTER);

        JButton logoutButton = new JButton("Cerrar sesión");
        styleButton(logoutButton);
        panel.add(logoutButton, BorderLayout.SOUTH);

        userFrame.add(panel);
        userFrame.setLocationRelativeTo(null);
        userFrame.setVisible(true);

        logoutButton.addActionListener(e -> {
            userFrame.dispose();
            main(null);
        });
    }
}
//  LoginSystemStyled.java   verifica 
// java LoginSystemStyled         ejecuta       en la terminal 