import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.io.File;
import javax.swing.filechooser.FileNameExtensionFilter;
import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;

public class Foto { // Aquí cambiamos el nombre de la clase a Foto xd :3
    private static final HashMap<String, String> users = new HashMap<>();
    private static File userPhoto;
    private static JFrame userFrame = null;

    private static String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hashBytes)
                hexString.append(String.format("%02x", b));
            return hexString.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static void main(String[] args) {
        users.put("Clase Alta", hashPassword("Clase-1"));
        users.put("clase media", hashPassword("Clase-2"));
        users.put("Clase baja", hashPassword("Clase-3"));

        try {
            UIManager.setLookAndFeel("javax.swing.plaf.nimbus.NimbusLookAndFeel");
        } catch (Exception e) {
            e.printStackTrace();
        }

        JFrame frame = new JFrame("Login");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(400, 300);
        JPanel panel = new JPanel(new BorderLayout());
        panel.setBackground(new Color(40, 40, 40));

        JLabel titleLabel = new JLabel("Bienvenido", JLabel.CENTER);
        titleLabel.setFont(new Font("Arial", Font.BOLD, 24));
        titleLabel.setForeground(Color.WHITE);
        panel.add(titleLabel, BorderLayout.NORTH);

        JTextField userField = new JTextField(20);
        JPasswordField passField = new JPasswordField(20);
        styleField(userField, passField);

        JPanel inputPanel = new JPanel(new GridLayout(2, 2, 10, 10));
        inputPanel.setOpaque(false);
        inputPanel.add(createStyledLabel("Usuario:"));
        inputPanel.add(userField);
        inputPanel.add(createStyledLabel("Contraseña:"));
        inputPanel.add(passField);
        panel.add(inputPanel, BorderLayout.CENTER);

        JPanel buttonPanel = new JPanel();
        buttonPanel.setOpaque(false);

        JButton loginButton = new JButton("Iniciar sesión");
        styleButton(loginButton);
        loginButton.addActionListener(e -> {
            String username = userField.getText();
            String password = new String(passField.getPassword());
            if (username.trim().isEmpty() || password.trim().isEmpty()) {
                showMessage("Por favor complete todos los campos.");
            } else if (users.containsKey(username) && users.get(username).equals(hashPassword(password))) {
                frame.dispose();
                showUserForm(username);
            } else
                showMessage("Usuario o contraseña incorrectos.");
        });

        JButton cancelButton = new JButton("Cancelar");
        styleButton(cancelButton);
        cancelButton.addActionListener(e -> System.exit(0));

        buttonPanel.add(loginButton);
        buttonPanel.add(cancelButton);
        panel.add(buttonPanel, BorderLayout.SOUTH);

        frame.add(panel);
        frame.setLocationRelativeTo(null);
        frame.setVisible(true);
    }

    private static void showMessage(String message) {
        JOptionPane.showMessageDialog(null, message);
    }

    private static void styleField(JTextField... fields) {
        for (JTextField field : fields) {
            field.setFont(new Font("Arial", Font.PLAIN, 14));
            field.setBorder(BorderFactory.createLineBorder(new Color(100, 149, 237), 2));
            field.setBackground(new Color(60, 60, 60));
            field.setForeground(Color.WHITE);
            field.setCaretColor(Color.WHITE);
            field.setMargin(new Insets(5, 10, 5, 10));
        }
    }

    private static void styleButton(JButton button) {
        button.setFont(new Font("Arial", Font.BOLD, 14));
        button.setBackground(new Color(100, 149, 237));
        button.setForeground(Color.WHITE);
        button.setFocusPainted(false);
        button.setBorder(BorderFactory.createEmptyBorder(10, 20, 10, 20));
        button.setPreferredSize(new Dimension(150, 40));
        button.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
        button.setOpaque(true);
    }

    private static JLabel createStyledLabel(String text) {
        JLabel label = new JLabel(text);
        label.setForeground(Color.WHITE);
        label.setFont(new Font("Arial", Font.PLAIN, 16));
        return label;
    }

    private static void showUserForm(String username) {
        if (userFrame == null) {
            userFrame = new JFrame("Panel de Usuario");
            userFrame.setSize(400, 400);

            JPanel panel = new JPanel(new BorderLayout());
            panel.setBackground(new Color(40, 40, 40));

            JLabel welcomeLabel = new JLabel("¡Bienvenido, " + username + "!", JLabel.CENTER);
            welcomeLabel.setFont(new Font("Arial", Font.BOLD, 20));
            welcomeLabel.setForeground(Color.WHITE);
            panel.add(welcomeLabel, BorderLayout.NORTH);

            JPanel questionPanel = new JPanel(new GridLayout(3, 1, 10, 10));
            questionPanel.setOpaque(false);

            JLabel questionLabel = new JLabel("¿Cuál es tu color favorito?");
            questionLabel.setForeground(Color.WHITE);
            JTextField questionField = new JTextField(20);
            styleField(questionField);

            JLabel photoLabel = new JLabel("Selecciona una foto:");
            JButton uploadButton = new JButton("Subir foto");
            uploadButton.addActionListener(e -> choosePhoto());

            JLabel imageLabel = new JLabel();
            imageLabel.setPreferredSize(new Dimension(100, 100));
            if (userPhoto != null) {
                ImageIcon photoIcon = new ImageIcon(userPhoto.getAbsolutePath());
                imageLabel.setIcon(new ImageIcon(photoIcon.getImage().getScaledInstance(100, 100, Image.SCALE_SMOOTH)));
            }

            questionPanel.add(questionLabel);
            questionPanel.add(questionField);
            questionPanel.add(photoLabel);
            questionPanel.add(uploadButton);
            questionPanel.add(imageLabel);

            JButton logoutButton = new JButton("Cerrar sesión");
            styleButton(logoutButton);
            logoutButton.addActionListener(e -> {
                userFrame.dispose();
                userFrame = null;
                main(null);
            });

            panel.add(questionPanel, BorderLayout.CENTER);
            panel.add(logoutButton, BorderLayout.SOUTH);

            userFrame.add(panel);
            userFrame.setLocationRelativeTo(null);
            userFrame.setVisible(true);
        }
    }

    private static void choosePhoto() {
        JFileChooser fileChooser = new JFileChooser();
        fileChooser.setDialogTitle("Selecciona una imagen");
        fileChooser.setAcceptAllFileFilterUsed(false);
        FileNameExtensionFilter filter = new FileNameExtensionFilter("Imágenes JPG y PNG", "jpg", "png");
        fileChooser.addChoosableFileFilter(filter);

        if (fileChooser.showOpenDialog(null) == JFileChooser.APPROVE_OPTION) {
            userPhoto = fileChooser.getSelectedFile();
            JOptionPane.showMessageDialog(null, "Foto seleccionada: " + userPhoto.getAbsolutePath());
            showUserForm("Clase Alta");
        }
    }
}
