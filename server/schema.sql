-- Esquema de la base de datos para el backend Node.js + Express + PostgreSQL

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar algunos datos de ejemplo (opcional)
INSERT INTO usuarios (nombre, email, password) VALUES 
    ('Usuario Demo', 'demo@example.com', 'password123'),
    ('Admin', 'admin@example.com', 'admin123')
ON CONFLICT (email) DO NOTHING;

INSERT INTO productos (nombre, descripcion, precio, stock) VALUES 
    ('Producto Demo 1', 'Descripción del producto demo 1', 29.99, 10),
    ('Producto Demo 2', 'Descripción del producto demo 2', 49.99, 5)
ON CONFLICT DO NOTHING;
