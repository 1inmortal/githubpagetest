-- Script para insertar auditorías detectadas en el sitio web
-- Ejecutar en pgAdmin conectado a tu base de datos

-- INSERTAR HALLAZGOS DE SEO
INSERT INTO auditorias (url, seccion, tipo, mensaje, nivel) VALUES 
('https://1inmortal.github.io/githubpagetest/', 'head', 'SEO', 'Falta etiqueta canonical URL para evitar contenido duplicado', 'warning');

INSERT INTO auditorias (url, seccion, tipo, mensaje, nivel) VALUES 
('https://1inmortal.github.io/githubpagetest/', 'head', 'SEO', 'Falta hreflang para internacionalización del sitio', 'info');

INSERT INTO auditorias (url, seccion, tipo, mensaje, nivel) VALUES 
('https://1inmortal.github.io/githubpagetest/', 'head', 'SEO', 'Falta structured data (Schema.org) para mejor indexación', 'warning');

INSERT INTO auditorias (url, seccion, tipo, mensaje, nivel) VALUES 
('https://1inmortal.github.io/githubpagetest/', 'root', 'SEO', 'Falta archivo robots.txt para control de indexación', 'warning');

INSERT INTO auditorias (url, seccion, tipo, mensaje, nivel) VALUES 
('https://1inmortal.github.io/githubpagetest/', 'root', 'SEO', 'Sitemap.xml mencionado en navegación pero no verificado', 'info');

-- INSERTAR HALLAZGOS DE ACCESIBILIDAD
INSERT INTO auditorias (url, seccion, tipo, mensaje, nivel) VALUES 
('https://1inmortal.github.io/githubpagetest/', 'images', 'Accesibilidad', 'Faltan atributos alt en todas las imágenes del sitio', 'error');

INSERT INTO auditorias (url, seccion, tipo, mensaje, nivel) VALUES 
('https://1inmortal.github.io/githubpagetest/', 'navigation', 'Accesibilidad', 'Faltan skip links para navegación por teclado', 'warning');

INSERT INTO auditorias (url, seccion, tipo, mensaje, nivel) VALUES 
('https://1inmortal.github.io/githubpagetest/', 'forms', 'Accesibilidad', 'Faltan indicadores de foco visible para navegación por teclado', 'warning');

INSERT INTO auditorias (url, seccion, tipo, mensaje, nivel) VALUES 
('https://1inmortal.github.io/githubpagetest/', 'semantics', 'Accesibilidad', 'Faltan ARIA landmarks para mejor navegación con lectores de pantalla', 'warning');

INSERT INTO auditorias (url, seccion, tipo, mensaje, nivel) VALUES 
('https://1inmortal.github.io/githubpagetest/', 'colors', 'Accesibilidad', 'Verificar ratios de contraste WCAG para accesibilidad visual', 'warning');

-- INSERTAR HALLAZGOS DE RENDIMIENTO
INSERT INTO auditorias (url, seccion, tipo, mensaje, nivel) VALUES 
('https://1inmortal.github.io/githubpagetest/', 'assets', 'Rendimiento', 'Dependencia de imágenes externas en CDNs que pueden afectar velocidad', 'warning');

INSERT INTO auditorias (url, seccion, tipo, mensaje, nivel) VALUES 
('https://1inmortal.github.io/githubpagetest/', 'fonts', 'Rendimiento', 'Fuentes externas sin preload pueden causar FOUT (Flash of Unstyled Text)', 'warning');

INSERT INTO auditorias (url, seccion, tipo, mensaje, nivel) VALUES 
('https://1inmortal.github.io/githubpagetest/', 'scripts', 'Rendimiento', 'Scripts externos (GSAP, Lenis) sin optimización de carga', 'warning');

INSERT INTO auditorias (url, seccion, tipo, mensaje, nivel) VALUES 
('https://1inmortal.github.io/githubpagetest/', 'compression', 'Rendimiento', 'Verificar implementación de compresión gzip/brotli para archivos estáticos', 'info');

INSERT INTO auditorias (url, seccion, tipo, mensaje, nivel) VALUES 
('https://1inmortal.github.io/githubpagetest/', 'caching', 'Rendimiento', 'Implementar estrategias de cache para mejorar rendimiento', 'info');

-- INSERTAR HALLAZGOS DE INTEGRACIÓN BACKEND
INSERT INTO auditorias (url, seccion, tipo, mensaje, nivel) VALUES 
('https://1inmortal.github.io/githubpagetest/', 'backend', 'Integración', 'Formulario de contacto configurado para enviar datos a base de datos PostgreSQL', 'success');

INSERT INTO auditorias (url, seccion, tipo, mensaje, nivel) VALUES 
('https://1inmortal.github.io/githubpagetest/', 'backend', 'Integración', 'Backend configurado en Render con CORS habilitado para GitHub Pages', 'success');

INSERT INTO auditorias (url, seccion, tipo, mensaje, nivel) VALUES 
('https://1inmortal.github.io/githubpagetest/', 'database', 'Integración', 'Base de datos PostgreSQL configurada con tablas usuarios, contactos y auditorias', 'success');

-- VERIFICAR INSERCIONES
SELECT 
    tipo,
    nivel,
    COUNT(*) as cantidad,
    MAX(detectado_en) as ultima_deteccion
FROM auditorias 
GROUP BY tipo, nivel 
ORDER BY 
    CASE nivel 
        WHEN 'error' THEN 1 
        WHEN 'warning' THEN 2 
        WHEN 'info' THEN 3 
        WHEN 'success' THEN 4 
    END,
    tipo;
