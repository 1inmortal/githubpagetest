import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;
import java.awt.event.*;
import java.util.List;

public class SistemaDeAutenticacion {

    // ----------------------------------------------------------------
    //                         MODELO
    // ----------------------------------------------------------------

    // Clase Usuario
    static class Usuario {
        private String id;
        private String username;
        private String password;
        private String rol; // "Admin" o "Usuario"

        // Constructor
        public Usuario(String id, String username, String password, String rol) {
            this.id = id;
            this.username = username;
            this.password = password;
            this.rol = rol;
        }

        // Getters
        public String getId() { return id; }
        public String getUsername() { return username; }
        public String getPassword() { return password; }
        public String getRol() { return rol; }
    }

    // ----------------------------------------------------------------
    //                     PANELES DEGRADADOS
    // ----------------------------------------------------------------
    // Panel con fondo degradado para un estilo más "corporativo".
    static class GradientPanel extends JPanel {
        private Color color1;
        private Color color2;

        // Recibe dos colores para el degradado
        public GradientPanel(Color c1, Color c2) {
            this.color1 = c1;
            this.color2 = c2;
        }

        @Override
        protected void paintComponent(Graphics g) {
            super.paintComponent(g);
            Graphics2D g2d = (Graphics2D) g.create();
            int w = getWidth();
            int h = getHeight();

            // Crea un degradado vertical de color1 a color2
            GradientPaint gp = new GradientPaint(0, 0, color1, 0, h, color2);
            g2d.setPaint(gp);
            g2d.fillRect(0, 0, w, h);
            g2d.dispose();
        }
    }

    // ----------------------------------------------------------------
    //                      VENTANA DE LOGIN
    // ----------------------------------------------------------------
    static class VentanaLogin {
        private JFrame frame;
        private JTextField txtUsername;
        private JPasswordField txtPassword;
        private Usuario usuario;

        public VentanaLogin() {
            // Configuración de la ventana
            frame = new JFrame("Sistema de Autenticación");
            frame.setSize(450, 350);
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            frame.setLocationRelativeTo(null);

            // Panel principal con degradado
            GradientPanel mainPanel = new GradientPanel(
                    new Color(25, 25, 25),      // color superior (negro grisáceo)
                    new Color(70, 70, 70)      // color inferior (gris más claro)
            );
            mainPanel.setLayout(new BorderLayout());
            mainPanel.setBorder(new EmptyBorder(40, 40, 40, 40));
            frame.add(mainPanel);

            // Título del Login
            JLabel titulo = new JLabel("Iniciar Sesión", SwingConstants.CENTER);
            titulo.setFont(new Font("Calibri", Font.BOLD, 24));
            titulo.setForeground(new Color(230, 230, 230));
            mainPanel.add(titulo, BorderLayout.NORTH);

            // Panel para los campos de texto
            JPanel inputPanel = new JPanel(new GridLayout(2, 2, 10, 10));
            inputPanel.setOpaque(false); // para que se vea el degradado del panel padre

            JLabel lblUsername = new JLabel("Usuario:");
            lblUsername.setForeground(Color.WHITE);
            txtUsername = new JTextField();
            txtUsername.setBorder(BorderFactory.createLineBorder(new Color(200, 200, 200), 2));

            JLabel lblPassword = new JLabel("Contraseña:");
            lblPassword.setForeground(Color.WHITE);
            txtPassword = new JPasswordField();
            txtPassword.setBorder(BorderFactory.createLineBorder(new Color(200, 200, 200), 2));

            inputPanel.add(lblUsername);
            inputPanel.add(txtUsername);
            inputPanel.add(lblPassword);
            inputPanel.add(txtPassword);

            mainPanel.add(inputPanel, BorderLayout.CENTER);

            // Botón de Login
            JButton btnLogin = new JButton("Acceder");
            btnLogin.setBackground(new Color(200, 200, 0));
            btnLogin.setForeground(Color.BLACK);
            btnLogin.setFont(new Font("Arial", Font.BOLD, 16));
            btnLogin.setFocusPainted(false);
            btnLogin.setBorder(BorderFactory.createLineBorder(Color.BLACK, 2));

            // Acción del botón
            btnLogin.addActionListener(new ActionListener() {
                @Override
                public void actionPerformed(ActionEvent e) {
                    String username = txtUsername.getText();
                    String password = new String(txtPassword.getPassword());

                    if (autenticar(username, password)) {
                        JOptionPane.showMessageDialog(frame, "¡Inicio de sesión exitoso!");
                        abrirVentanaFormulario(); 
                    } else {
                        JOptionPane.showMessageDialog(frame, "Credenciales inválidas. Intente de nuevo.");
                    }
                }
            });

            mainPanel.add(btnLogin, BorderLayout.SOUTH);

            frame.setVisible(true);
        }

        // Método de autenticación básico
        private boolean autenticar(String username, String password) {
            // Ejemplo de lista de usuarios
            List<Usuario> usuarios = List.of(
                new Usuario("1", "admin", "admin123", "Admin"),
                new Usuario("2", "user", "user123", "Usuario")
            );
            for (Usuario u : usuarios) {
                if (u.getUsername().equals(username) && u.getPassword().equals(password)) {
                    this.usuario = u;
                    return true;
                }
            }
            return false;
        }

        // Abre el formulario (multi-step) después de login
        private void abrirVentanaFormulario() {
            if (usuario != null) {
                String tituloForm = usuario.getRol().equals("Admin") 
                        ? "Formulario de Admin - Chevrolet"
                        : "Formulario de Usuario - Chevrolet";
                new VentanaFormulario(tituloForm);
            }
            frame.dispose();
        }
    }

    // ----------------------------------------------------------------
    //      VENTANA DE FORMULARIO (MULTI-STEP) CON CardLayout
    // ----------------------------------------------------------------
    static class VentanaFormulario {
        private JFrame frame;
        private CardLayout cardLayout;
        private JPanel cardPanel;
        private JButton btnSiguiente;
        private int paginaActual = 0;
        private final int totalPaginas = 3;  // Tenemos 3 páginas

        public VentanaFormulario(String titulo) {
            frame = new JFrame(titulo);
            frame.setSize(600, 500);
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            frame.setLocationRelativeTo(null);

            // Panel principal con BorderLayout
            JPanel mainPanel = new JPanel(new BorderLayout());
            mainPanel.setBackground(new Color(230, 230, 230));

            // Etiqueta de título en la parte superior
            JLabel labelTitulo = new JLabel(titulo, SwingConstants.CENTER);
            labelTitulo.setFont(new Font("Calibri", Font.BOLD, 28));
            labelTitulo.setForeground(new Color(50, 50, 50));
            mainPanel.add(labelTitulo, BorderLayout.NORTH);

            // Panel de "tarjetas"
            cardLayout = new CardLayout();
            cardPanel = new JPanel(cardLayout);

            // Páginas del formulario
            JPanel pagina1 = crearPagina1();
            JPanel pagina2 = crearPagina2();
            JPanel pagina3 = crearPagina3();

            // Añadir al cardPanel
            cardPanel.add(pagina1, "pagina1");
            cardPanel.add(pagina2, "pagina2");
            cardPanel.add(pagina3, "pagina3");

            mainPanel.add(cardPanel, BorderLayout.CENTER);

            // Botón de siguiente / finalizar
            btnSiguiente = new JButton("Siguiente");
            btnSiguiente.setBackground(new Color(0, 150, 136));
            btnSiguiente.setForeground(Color.WHITE);
            btnSiguiente.setFont(new Font("Arial", Font.BOLD, 16));
            btnSiguiente.setFocusPainted(false);
            btnSiguiente.setBorder(BorderFactory.createLineBorder(new Color(0, 150, 136), 2));

            btnSiguiente.addActionListener(new ActionListener() {
                @Override
                public void actionPerformed(ActionEvent e) {
                    paginaActual++;
                    if (paginaActual < totalPaginas) {
                        cardLayout.next(cardPanel);
                        if (paginaActual == totalPaginas - 1) {
                            btnSiguiente.setText("Finalizar");
                        }
                    } else {
                        // Aquí se puede procesar/guardar la información
                        JOptionPane.showMessageDialog(frame, 
                            "¡Formulario completado con éxito!\n" +
                            "Se procederá a guardar la información.");
                        frame.dispose();
                    }
                }
            });

            JPanel panelBoton = new JPanel();
            panelBoton.setBackground(new Color(230, 230, 230));
            panelBoton.add(btnSiguiente);
            mainPanel.add(panelBoton, BorderLayout.SOUTH);

            frame.add(mainPanel);
            frame.setVisible(true);
        }

        // Página 1: Información Personal
        private JPanel crearPagina1() {
            JPanel panel = new JPanel(new GridLayout(4, 2, 10, 10));
            panel.setBorder(new EmptyBorder(20, 60, 20, 60));
            panel.setBackground(Color.WHITE);

            panel.add(new JLabel("Nombre:"));
            panel.add(new JTextField());
            panel.add(new JLabel("Apellido:"));
            panel.add(new JTextField());
            panel.add(new JLabel("Teléfono:"));
            panel.add(new JTextField());
            panel.add(new JLabel("Email:"));
            panel.add(new JTextField());
            return panel;
        }

        // Página 2: Información del Vehículo (Chevrolet)
        private JPanel crearPagina2() {
            JPanel panel = new JPanel(new GridLayout(4, 2, 10, 10));
            panel.setBorder(new EmptyBorder(20, 60, 20, 60));
            panel.setBackground(Color.WHITE);

            panel.add(new JLabel("Marca (ej. Chevrolet):"));
            JTextField txtMarca = new JTextField("Chevrolet"); 
            panel.add(txtMarca);
            panel.add(new JLabel("Modelo:"));
            panel.add(new JTextField());
            panel.add(new JLabel("Año:"));
            panel.add(new JTextField());
            panel.add(new JLabel("Placas:"));
            panel.add(new JTextField());
            return panel;
        }

        // Página 3: Información de la Pieza
        private JPanel crearPagina3() {
            JPanel panel = new JPanel(new GridLayout(4, 2, 10, 10));
            panel.setBorder(new EmptyBorder(20, 60, 20, 60));
            panel.setBackground(Color.WHITE);

            panel.add(new JLabel("Número de parte:"));
            panel.add(new JTextField());
            panel.add(new JLabel("Tipo de pieza:"));
            panel.add(new JTextField("Ej: Filtro, Pastilla de freno..."));
            panel.add(new JLabel("Descripción del daño:"));
            panel.add(new JTextField());
            panel.add(new JLabel("Cantidad requerida:"));
            panel.add(new JTextField());
            return panel;
        }
    }

    // ----------------------------------------------------------------
    //                          MAIN
    // ----------------------------------------------------------------
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            new VentanaLogin();
        });
    }
}

