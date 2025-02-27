import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.ArrayList;
import javax.imageio.ImageIO;

public class CarInfoApp {
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new MainMenu());
    }
}

class MainMenu extends JFrame {
    public MainMenu() {
        setTitle("Admin");
        setSize(400, 300);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setLayout(new BorderLayout());

        JLabel titleLabel = new JLabel("Admin", SwingConstants.CENTER);
        titleLabel.setFont(new Font("Arial", Font.BOLD, 20));
        add(titleLabel, BorderLayout.NORTH);

        JPanel buttonPanel = new JPanel();
        buttonPanel.setLayout(new GridLayout(2, 1, 10, 10));

        JButton userButton = new JButton("Registro de usuarios");
        JButton carButton = new JButton("Registro de carros");

        userButton.setPreferredSize(new Dimension(200, 50));
        carButton.setPreferredSize(new Dimension(200, 50));

        carButton.addActionListener(e -> {
            dispose();
            new CarList();
        });

        buttonPanel.add(userButton);
        buttonPanel.add(carButton);

        add(buttonPanel, BorderLayout.CENTER);
        setVisible(true);
    }
}

class CarList extends JFrame {
    private ArrayList<CarBrand> carBrands = new ArrayList<>();
    private JPanel carPanel;

    public CarList() {
        setTitle("Registro de carros");
        setSize(600, 500);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setLayout(new BorderLayout());

        JPanel topPanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
        JButton backButton = new JButton("←");
        backButton.addActionListener(e -> {
            dispose();
            new MainMenu();
        });
        topPanel.add(backButton);
        add(topPanel, BorderLayout.NORTH);

        carPanel = new JPanel();
        carPanel.setLayout(new BoxLayout(carPanel, BoxLayout.Y_AXIS));

        // Botones de control
        JPanel controls = new JPanel(new FlowLayout());
        JButton addBtn = new JButton("Añadir");
        JButton editBtn = new JButton("Editar");

        // Cargar marcas iniciales
        loadSampleBrands();
        refreshUI();

        // Listeners
        addBtn.addActionListener(e -> showAddEditDialog(null));
        editBtn.addActionListener(e -> showSelectionDialog());

        controls.add(addBtn);
        controls.add(editBtn);

        add(new JScrollPane(carPanel), BorderLayout.CENTER);
        add(controls, BorderLayout.SOUTH);
        setVisible(true);
    }

    private void loadSampleBrands() {
        carBrands.add(new CarBrand("Toyota", null));
        carBrands.add(new CarBrand("Ford", null));
    }

    private void refreshUI() {
        carPanel.removeAll();

        for (CarBrand brand : carBrands) {
            JPanel brandPanel = new JPanel(new BorderLayout());
            brandPanel.setBorder(BorderFactory.createEmptyBorder(5, 5, 5, 5));

            // Panel de imagen
            JLabel imageLabel = new JLabel();
            imageLabel.setPreferredSize(new Dimension(80, 80));
            if (brand.getImage() != null) {
                ImageIcon icon = new ImageIcon(brand.getImage().getScaledInstance(80, 80, Image.SCALE_SMOOTH));
                imageLabel.setIcon(icon);
            }

            // Botón de marca
            JButton brandBtn = new JButton(brand.getName());
            brandBtn.setPreferredSize(new Dimension(200, 80));
            brandBtn.addActionListener(e -> {
                dispose();
                new ModelSelection(brand);
            });

            brandPanel.add(imageLabel, BorderLayout.WEST);
            brandPanel.add(brandBtn, BorderLayout.CENTER);
            carPanel.add(brandPanel);
        }

        carPanel.revalidate();
        carPanel.repaint();
    }

    private void showAddEditDialog(CarBrand brandToEdit) {
        JDialog dialog = new JDialog(this, "Editar Marca", true);
        JPanel content = new JPanel(new BorderLayout());

        JTextField nameField = new JTextField(20);
        JLabel imageLabel = new JLabel();
        JButton uploadBtn = new JButton("Subir Imagen");

        if (brandToEdit != null) {
            nameField.setText(brandToEdit.getName());
            if (brandToEdit.getImage() != null) {
                imageLabel.setIcon(new ImageIcon(brandToEdit.getImage()));
            }
        }

        uploadBtn.addActionListener(e -> {
            JFileChooser fc = new JFileChooser();
            if (fc.showOpenDialog(null) == JFileChooser.APPROVE_OPTION) {
                try {
                    BufferedImage img = ImageIO.read(fc.getSelectedFile());
                    imageLabel.setIcon(new ImageIcon(img));
                    if (brandToEdit != null) brandToEdit.setImage(img);
                } catch (Exception ex) { ex.printStackTrace(); }
            }
        });

        JButton saveBtn = new JButton("Guardar");
        saveBtn.addActionListener(e -> {
            if (brandToEdit == null) {
                CarBrand newBrand = new CarBrand(nameField.getText(), 
                    ((ImageIcon)imageLabel.getIcon()).getImage());
                carBrands.add(newBrand);
            } else {
                brandToEdit.setName(nameField.getText());
            }
            refreshUI();
            dialog.dispose();
        });

        JPanel formPanel = new JPanel(new GridLayout(3, 1));
        formPanel.add(new JLabel("Nombre:"));
        formPanel.add(nameField);
        formPanel.add(uploadBtn);

        content.add(formPanel, BorderLayout.CENTER);
        content.add(imageLabel, BorderLayout.EAST);
        content.add(saveBtn, BorderLayout.SOUTH);

        dialog.add(content);
        dialog.pack();
        dialog.setLocationRelativeTo(this);
        dialog.setVisible(true);
    }

    private void showSelectionDialog() {
        JDialog dialog = new JDialog(this, "Seleccionar Marca", true);
        JPanel content = new JPanel(new BorderLayout());

        JComboBox<CarBrand> brandCombo = new JComboBox<>(carBrands.toArray(new CarBrand[0]));
        JButton selectBtn = new JButton("Seleccionar");

        selectBtn.addActionListener(e -> {
            CarBrand selected = (CarBrand)brandCombo.getSelectedItem();
            dialog.dispose();
            showAddEditDialog(selected);
        });

        content.add(brandCombo, BorderLayout.CENTER);
        content.add(selectBtn, BorderLayout.SOUTH);
        dialog.add(content);
        dialog.pack();
        dialog.setLocationRelativeTo(this);
        dialog.setVisible(true);
    }
}

class CarBrand {
    private String name;
    private Image image;

    public CarBrand(String name, Image image) {
        this.name = name;
        this.image = image;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Image getImage() { return image; }
    public void setImage(Image image) { this.image = image; }

    @Override
    public String toString() { return name; }
}