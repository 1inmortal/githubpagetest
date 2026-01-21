/**
 * Configuración específica para GitHub Pages
 * Este archivo maneja las configuraciones específicas del entorno de GitHub Pages
 */

// Configuración base para GitHub Pages
export const GITHUB_PAGES_CONFIG = {
  // URL base del repositorio
  baseUrl: 'https://1inmortal.github.io/githubpagetest/',
  
  // Configuración de rutas
  routes: {
    home: '/',
    projects: '/proyectos.html',
    privacy: '/privacy-policy.html',
    terms: '/terms.html',
    verification: '/verificación.html',
    wordpress: '/wordpress.html'
  },
  
  // Configuración de assets
  assets: {
    images: '/src/assets/img/',
    media: '/src/assets/media/',
    css: '/src/assets/css/',
    js: '/src/assets/js/',
    pdf: '/src/pdf/'
  },
  
  // Configuración de APIs
  api: {
    baseUrl: 'https://githubpagetest-api.onrender.com',
    endpoints: {
      contact: '/api/contact',
      projects: '/api/projects',
      skills: '/api/skills',
      testimonials: '/api/testimonials'
    }
  },
  
  // Configuración de analytics
  analytics: {
    googleAnalytics: 'G-XXXXXXXXXX', // Reemplazar con tu ID de GA
    hotjar: 'XXXXXXXXXX' // Reemplazar con tu ID de Hotjar
  },
  
  // Configuración de SEO
  seo: {
    title: 'INMORTAL_OS - Desarrollador Full Stack',
    description: 'Portafolio profesional de desarrollo full-stack con experiencia en AWS, Azure, React, Python y tecnologías cloud',
    keywords: 'desarrollador, full-stack, react, python, aws, azure, portfolio, web development',
    author: 'INMORTAL_OS',
    image: '/src/assets/img/universo.png',
    url: 'https://1inmortal.github.io/githubpagetest/'
  },
  
  // Configuración de redes sociales
  social: {
    github: 'https://github.com/1inmortal',
    linkedin: 'https://linkedin.com/in/inmortal-os',
    twitter: 'https://twitter.com/inmortal_os',
    email: 'inmortal.os@example.com'
  },
  
  // Configuración de rendimiento
  performance: {
    // Lazy loading para imágenes
    lazyLoading: true,
    // Preload de recursos críticos
    preload: [
      '/src/assets/css/main.css',
      '/src/assets/js/main.js'
    ],
    // Configuración de caché
    cache: {
      static: 31536000, // 1 año
      html: 3600, // 1 hora
      api: 300 // 5 minutos
    }
  },
  
  // Configuración de errores
  errorPages: {
    404: '/404.html',
    500: '/500.html'
  }
};

// Función para obtener la URL completa de un asset
export function getAssetUrl(path) {
  return `${GITHUB_PAGES_CONFIG.baseUrl}${path}`;
}

// Función para obtener la URL completa de una ruta
export function getRouteUrl(route) {
  return `${GITHUB_PAGES_CONFIG.baseUrl}${route}`;
}

// Función para verificar si estamos en GitHub Pages
export function isGitHubPages() {
  return window.location.hostname === '1inmortal.github.io';
}

// Función para configurar el título de la página
export function setPageTitle(title) {
  document.title = `${title} - ${GITHUB_PAGES_CONFIG.seo.title}`;
}

// Función para configurar meta tags
export function setMetaTags(meta) {
  const head = document.head;
  
  // Título
  if (meta.title) {
    setPageTitle(meta.title);
  }
  
  // Descripción
  if (meta.description) {
    let metaDesc = head.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      head.appendChild(metaDesc);
    }
    metaDesc.content = meta.description;
  }
  
  // Keywords
  if (meta.keywords) {
    let metaKeywords = head.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      head.appendChild(metaKeywords);
    }
    metaKeywords.content = meta.keywords;
  }
  
  // Open Graph
  if (meta.image) {
    let ogImage = head.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      head.appendChild(ogImage);
    }
    ogImage.content = getAssetUrl(meta.image);
  }
}

// Función para inicializar la configuración de GitHub Pages
export function initGitHubPages() {
  // Configurar meta tags por defecto
  setMetaTags({
    title: GITHUB_PAGES_CONFIG.seo.title,
    description: GITHUB_PAGES_CONFIG.seo.description,
    keywords: GITHUB_PAGES_CONFIG.seo.keywords,
    image: GITHUB_PAGES_CONFIG.seo.image
  });
  
  // Configurar canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = GITHUB_PAGES_CONFIG.seo.url;
  
  console.log('✅ Configuración de GitHub Pages inicializada');
}

// Exportar configuración por defecto
export default GITHUB_PAGES_CONFIG;
