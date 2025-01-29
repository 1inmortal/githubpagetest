import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.filechooser.FileNameExtensionFilter;
import java.awt.*;
import java.awt.event.*;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

// Clase principal que inicia la aplicación
public class Main {
    public static void main(String[] args) {
        // Configura el aspecto de la interfaz según el sistema operativo
        try {
            UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
        } catch (Exception ignored) {}

        // Inicia la pantalla de login
        SwingUtilities.invokeLater(() -> new LoginFrame());
    }
}

// Clase para la ventana de Login
class LoginFrame extends JFrame {
    private JTextField userField;
    private JPasswordField passField;
    private JComboBox<String> roleBox;

    public LoginFrame() {
        setTitle("Sistema de Inventario Chevrolet - Login");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(400, 250);
        setResizable(false);
        setLocationRelativeTo(null); // Centrar la ventana

        // Panel principal
        JPanel panel = new JPanel(new GridBagLayout());
        panel.setBorder(new EmptyBorder(20, 20, 20, 20));
        add(panel);

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.insets = new Insets(10,10,10,10);

        // Label de Usuario
        gbc.gridx = 0;
        gbc.gridy = 0;
        panel.add(new JLabel("Usuario:"), gbc);

        // Campo de Usuario
        gbc.gridx = 1;
        userField = new JTextField(15);
        panel.add(userField, gbc);

        // Label de Contraseña
        gbc.gridx = 0;
        gbc.gridy = 1;
        panel.add(new JLabel("Contraseña:"), gbc);

        // Campo de Contraseña
        gbc.gridx = 1;
        passField = new JPasswordField(15);
        panel.add(passField, gbc);

        // Label de Rol
        gbc.gridx = 0;
        gbc.gridy = 2;
        panel.add(new JLabel("Rol:"), gbc);

        // ComboBox de Rol
        gbc.gridx = 1;
        roleBox = new JComboBox<>(new String[]{"Usuario", "Admin"});
        panel.add(roleBox, gbc);

        // Botón de Login
        gbc.gridx = 0;
        gbc.gridy = 3;
        gbc.gridwidth = 2;
        gbc.anchor = GridBagConstraints.CENTER;
        JButton loginButton = new JButton("Iniciar Sesión");
        panel.add(loginButton, gbc);

        // Acción del botón de Login
        loginButton.addActionListener(e -> authenticate());

        // Permitir iniciar sesión con Enter
        getRootPane().setDefaultButton(loginButton);

        setVisible(true);
    }

    // Método para autenticar al usuario
    private void authenticate() {
        String usuario = userField.getText().trim();
        String contraseña = new String(passField.getPassword()).trim();
        String rol = (String) roleBox.getSelectedItem();

        // Validación de credenciales
        if (rol.equals("Admin") && contraseña.equals("Jose1234")) {
            // Login exitoso como Admin
            new InventoryFrame(usuario.isEmpty() ? "Admin" : usuario, rol);
            dispose();
        } else if (rol.equals("Usuario") && contraseña.equals("Jose1469")) {
            // Login exitoso como Usuario
            new InventoryFrame(usuario.isEmpty() ? "Usuario" : usuario, rol);
            dispose();
        } else {
            // Credenciales incorrectas
            JOptionPane.showMessageDialog(this, "Credenciales incorrectas. Inténtalo de nuevo.",
                    "Error", JOptionPane.ERROR_MESSAGE);
        }
    }
}

// Clase para la ventana de Inventario
class InventoryFrame extends JFrame {
    private String usuario;
    private String rol;
    private JLabel aliasLabel;
    private JTextField partNameField;
    private JTextField partCodeField;
    private JTextField quantityField;
    private JLabel photoLabel;
    private File selectedPhoto;

    public InventoryFrame(String usuario, String rol) {
        this.usuario = usuario;
        this.rol = rol;

        setTitle("Sistema de Inventario Chevrolet");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(800, 600);
        setResizable(false);
        setLocationRelativeTo(null); // Centrar la ventana

        // Panel principal con BorderLayout
        JPanel mainPanel = new JPanel(new BorderLayout(10, 10));
        mainPanel.setBorder(new EmptyBorder(10,10,10,10));
        add(mainPanel);

        // Panel superior para alias
        JPanel topPanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
        aliasLabel = new JLabel("Accedido por: " + usuario + " (" + rol + ")");
        aliasLabel.setFont(new Font("Arial", Font.BOLD, 14));
        topPanel.add(aliasLabel);
        mainPanel.add(topPanel, BorderLayout.NORTH);

        // Panel central para el formulario
        JPanel formPanel = new JPanel(new GridBagLayout());
        formPanel.setBorder(BorderFactory.createTitledBorder("Formulario de Inventario"));
        mainPanel.add(formPanel, BorderLayout.CENTER);

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.insets = new Insets(10,10,10,10);

        // Campo Nombre de la Pieza
        gbc.gridx = 0;
        gbc.gridy = 0;
        formPanel.add(new JLabel("Nombre de la Pieza:"), gbc);

        gbc.gridx = 1;
        partNameField = new JTextField(20);
        formPanel.add(partNameField, gbc);

        // Campo Código de la Pieza
        gbc.gridx = 0;
        gbc.gridy = 1;
        formPanel.add(new JLabel("Código de la Pieza:"), gbc);

        gbc.gridx = 1;
        partCodeField = new JTextField(20);
        formPanel.add(partCodeField, gbc);

        // Campo Cantidad
        gbc.gridx = 0;
        gbc.gridy = 2;
        formPanel.add(new JLabel("Cantidad:"), gbc);

        gbc.gridx = 1;
        quantityField = new JTextField(20);
        formPanel.add(quantityField, gbc);

        // Sección para la Foto
        gbc.gridx = 0;
        gbc.gridy = 3;
        formPanel.add(new JLabel("Foto de la Pieza:"), gbc);

        gbc.gridx = 1;
        photoLabel = new JLabel();
        photoLabel.setPreferredSize(new Dimension(200, 150));
        photoLabel.setBorder(BorderFactory.createLineBorder(Color.GRAY));
        formPanel.add(photoLabel, gbc);

        // Botón para agregar foto
        gbc.gridy = 4;
        JButton addPhotoButton = new JButton("Agregar Foto");
        formPanel.add(addPhotoButton, gbc);

        addPhotoButton.addActionListener(e -> addPhoto());

        // Panel inferior para botones
        JPanel buttonPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT));
        JButton saveButton = new JButton("Guardar Datos");
        JButton logoutButton = new JButton("Cerrar Sesión");
        buttonPanel.add(saveButton);
        buttonPanel.add(logoutButton);
        mainPanel.add(buttonPanel, BorderLayout.SOUTH);

        // Acción del botón de Guardar
        saveButton.addActionListener(e -> saveData());

        // Acción del botón de Cerrar Sesión
        logoutButton.addActionListener(e -> logout());

        setVisible(true);
    }

    // Método para agregar una foto
    private void addPhoto() {
        JFileChooser fileChooser = new JFileChooser();
        FileNameExtensionFilter filter = new FileNameExtensionFilter(
                "Archivos de Imagen", "jpg", "png", "jpeg", "gif");
        fileChooser.setFileFilter(filter);
        int option = fileChooser.showOpenDialog(this);
        if(option == JFileChooser.APPROVE_OPTION){
            selectedPhoto = fileChooser.getSelectedFile();
            ImageIcon icon = new ImageIcon(new ImageIcon(selectedPhoto.getAbsolutePath()).getImage().getScaledInstance(
                    photoLabel.getWidth(), photoLabel.getHeight(), Image.SCALE_SMOOTH));
            photoLabel.setIcon(icon);
        }
    }

    // Método para guardar los datos ingresados
    private void saveData() {
        String nombre = partNameField.getText().trim();
        String codigo = partCodeField.getText().trim();
        String cantidad = quantityField.getText().trim();

        if(nombre.isEmpty() || codigo.isEmpty() || cantidad.isEmpty()){
            JOptionPane.showMessageDialog(this, "Por favor, completa todos los campos.",
                    "Error", JOptionPane.ERROR_MESSAGE);
            return;
        }

        // Validar que la cantidad sea un número positivo
        if(!cantidad.matches("\\d+")){
            JOptionPane.showMessageDialog(this, "La cantidad debe ser un número positivo.",
                    "Error", JOptionPane.ERROR_MESSAGE);
            return;
        }

        // Guardar los datos en un archivo de texto (puedes modificar esto para usar una base de datos)
        try (FileWriter writer = new FileWriter("inventario.txt", true)) {
            writer.write("Usuario: " + usuario + " (" + rol + ")\n");
            writer.write("Nombre de la Pieza: " + nombre + "\n");
            writer.write("Código de la Pieza: " + codigo + "\n");
            writer.write("Cantidad: " + cantidad + "\n");
            if(selectedPhoto != null){
                writer.write("Foto: " + selectedPhoto.getAbsolutePath() + "\n");
            }
            writer.write("-----\n");
            JOptionPane.showMessageDialog(this, "Datos guardados exitosamente.",
                    "Éxito", JOptionPane.INFORMATION_MESSAGE);
            clearForm();
        } catch (IOException ex) {
            JOptionPane.showMessageDialog(this, "Error al guardar los datos.",
                    "Error", JOptionPane.ERROR_MESSAGE);
        }
    }

    // Método para limpiar el formulario después de guardar
    private void clearForm(){
        partNameField.setText("");
        partCodeField.setText("");
        quantityField.setText("");
        photoLabel.setIcon(null);
        selectedPhoto = null;
    }

    // Método para cerrar sesión y volver al login
    private void logout(){
        int confirm = JOptionPane.showConfirmDialog(this, "¿Estás seguro de cerrar sesión?",
                "Confirmar", JOptionPane.YES_NO_OPTION);
        if(confirm == JOptionPane.YES_OPTION){
            new LoginFrame();
            dispose();
        }
    }
}

