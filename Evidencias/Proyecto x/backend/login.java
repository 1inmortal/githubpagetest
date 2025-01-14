import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionListener;
import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;

public class LoginSystem {
    private static String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (Exception e) {
            throw new RuntimeException("Error al hashear la contraseña.", e);
        }
    }

    public static void main(String[] args) {
        // Crear usuarios con contraseñas hasheadas
        HashMap<String, String> users = new HashMap<>();
        users.put("admin", hashPassword("admin"));
        users.put("moderador", hashPassword("mod123"));
        users.put("usuario", hashPassword("user123"));

        // Crear componentes de la interfaz
        JFrame frame = new JFrame("Sistema de Inicio de Sesión");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(400, 300);

        JPanel mainPanel = new JPanel();
        mainPanel.setLayout(new BoxLayout(mainPanel, BoxLayout.Y_AXIS));

        JPanel userPanel = new JPanel();
        JLabel userLabel = new JLabel("Usuario:");
        JTextField userField = new JTextField(20);
        userPanel.add(userLabel);
        userPanel.add(userField);

        JPanel passPanel = new JPanel();
        JLabel passLabel = new JLabel("Contraseña:");
        JPasswordField passField = new JPasswordField(20);
        passPanel.add(passLabel);
        passPanel.add(passField);

        JPanel buttonPanel = new JPanel();
        JButton loginButton = new JButton("Iniciar sesión");
        JButton cancelButton = new JButton("Cancelar");
        buttonPanel.add(loginButton);
        buttonPanel.add(cancelButton);

        JLabel messageLabel = new JLabel("");
        messageLabel.setForeground(Color.RED);

        // Configurar acción de inicio de sesión
        ActionListener loginAction = e -> {
            String username = userField.getText().trim();
            String password = new String(passField.getPassword()).trim();

            if (username.isEmpty() || password.isEmpty()) {
                messageLabel.setText("Por favor complete todos los campos.");
            } else if (users.containsKey(username) && users.get(username).equals(hashPassword(password))) {
                frame.dispose();
                SwingUtilities.invokeLater(() -> JOptionPane.showMessageDialog(null, "Bienvenido, " + username));
            } else {
                messageLabel.setText("Usuario o contraseña incorrectos.");
                passField.setText("");
            }
        };

        // Asignar eventos
        loginButton.addActionListener(loginAction);
        passField.addActionListener(loginAction);
        cancelButton.addActionListener(e -> System.exit(0));

        // Construir la interfaz
        mainPanel.add(userPanel);
        mainPanel.add(Box.createRigidArea(new Dimension(0, 10)));
        mainPanel.add(passPanel);
        mainPanel.add(Box.createRigidArea(new Dimension(0, 20)));
        mainPanel.add(buttonPanel);
        mainPanel.add(Box.createRigidArea(new Dimension(0, 20)));
        mainPanel.add(messageLabel);

        frame.add(mainPanel);
        frame.setLocationRelativeTo(null);
        frame.setVisible(true);
    }
}
