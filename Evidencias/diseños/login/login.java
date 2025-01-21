import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;

public class App {
    private JFrame frame;
    private JTextField userField;
    private JPasswordField passField;
    private JLabel resultLabel;

    public static void main(String[] args) {
        new App().iniciarAplicacion();
    }

    private void iniciarAplicacion() {
        // Crear el marco (JFrame)
        frame = new JFrame("Inicio de Sesión");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(400, 300);
        frame.setLayout(null);

        // Crear los componentes
        JLabel userLabel = new JLabel("Usuario:");
        userLabel.setBounds(50, 50, 100, 30);
        frame.add(userLabel);

        userField = new JTextField();
        userField.setBounds(150, 50, 200, 30);
        frame.add(userField);

        JLabel passLabel = new JLabel("Contraseña:");
        passLabel.setBounds(50, 100, 100, 30);
        frame.add(passLabel);

        passField = new JPasswordField();
        passField.setBounds(150, 100, 200, 30);
        frame.add(passField);

        JButton loginButton = new JButton("Iniciar Sesión");
        loginButton.setBounds(150, 150, 150, 30);
        frame.add(loginButton);

        resultLabel = new JLabel("");
        resultLabel.setBounds(50, 200, 300, 30);
        resultLabel.setHorizontalAlignment(SwingConstants.CENTER);
        frame.add(resultLabel);

        // Agregar un oyente de eventos al botón de inicio de sesión
        loginButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // Verificar las credenciales del usuario
                if (verificarCredenciales(userField.getText(), new String(passField.getPassword()))) {
                    // Mostrar el formulario después del inicio de sesión
                    mostrarFormulario();
                } else {
                    resultLabel.setText("Credenciales incorrectas");
                }
            }
        });

        // Mostrar el marco
        frame.setVisible(true);
    }

    // Método para verificar las credenciales del usuario
    private boolean verificarCredenciales(String usuario, String contraseña) {
        // Aquí va el código para verificar las credenciales del usuario
        // Por ejemplo, podrías comparar las credenciales con una base de datos
        return true; // Devuelve true si las credenciales son correctas
    }

    // Método para mostrar el formulario después del inicio de sesión
    private void mostrarFormulario() {
        // Crear un nuevo panel para el formulario
        JPanel formularioPanel = new JPanel();
        formularioPanel.setLayout(new BoxLayout(formularioPanel, BoxLayout.Y_AXIS));

        // Agregar etiquetas y campos de texto para el formulario
        JLabel etiquetaNombre = new JLabel("Nombre:");
        JTextField campoNombre = new JTextField();
        formularioPanel.add(etiquetaNombre);
        formularioPanel.add(campoNombre);

        JLabel etiquetaApellido = new JLabel("Apellido:");
        JTextField campoApellido = new JTextField();
        formularioPanel.add(etiquetaApellido);
        formularioPanel.add(campoApellido);

        JLabel etiquetaCorreo = new JLabel("Correo electrónico:");
        JTextField campoCorreo = new JTextField();
        formularioPanel.add(etiquetaCorreo);
        formularioPanel.add(campoCorreo);

        // Agregar un botón para subir foto
        JButton botonSubirFoto = new JButton("Subir foto");
        formularioPanel.add(botonSubirFoto);

        // Agregar un oyente de eventos al botón de subir foto
        botonSubirFoto.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // Abrir un diálogo para seleccionar la foto
                JFileChooser fileChooser = new JFileChooser();
                int resultado = fileChooser.showOpenDialog(frame);
                if (resultado == JFileChooser.APPROVE_OPTION) {
                    // Obtener la ruta de la foto seleccionada
                    File fotoSeleccionada = fileChooser.getSelectedFile();
                    // Aquí va el código para subir la foto al servidor
                }
            }
        });

        // Agregar el panel del formulario al marco
        frame.add(formularioPanel, BorderLayout.CENTER);

        // Mostrar el marco
        frame.setVisible(true);
    }
}