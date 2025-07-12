/**
 * Data Loader Module
 * Carga y gestiona datos desde archivos JSON externos
 * @author INMORTAL
 * @version 2.5
 */

class DataLoader {
  constructor() {
    this.cache = new Map();
    this.baseUrl = './data/';
  }

  /**
   * Carga un archivo JSON con manejo de errores
   * @param {string} filename - Nombre del archivo JSON
   * @returns {Promise<Object>} Datos cargados
   */
  async loadJSON(filename) {
    try {
      // Verificar cache primero
      if (this.cache.has(filename)) {
        return this.cache.get(filename);
      }

      const response = await fetch(`${this.baseUrl}${filename}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Guardar en cache
      this.cache.set(filename, data);
      
      console.log(`✅ Datos cargados: ${filename}`);
      return data;
      
    } catch (error) {
      console.error(`❌ Error cargando ${filename}:`, error);
      throw error;
    }
  }

  /**
   * Carga múltiples archivos JSON en paralelo
   * @param {string[]} filenames - Array de nombres de archivos
   * @returns {Promise<Object>} Objeto con todos los datos
   */
  async loadMultiple(filenames) {
    try {
      const promises = filenames.map(filename => this.loadJSON(filename));
      const results = await Promise.all(promises);
      
      const data = {};
      filenames.forEach((filename, index) => {
        const key = filename.replace('.json', '');
        data[key] = results[index];
      });
      
      return data;
    } catch (error) {
      console.error('❌ Error cargando múltiples archivos:', error);
      throw error;
    }
  }

  /**
   * Limpia el cache
   */
  clearCache() {
    this.cache.clear();
    console.log('🗑️ Cache limpiado');
  }
}

/**
 * Renderer Module
 * Renderiza datos en el DOM
 */
class DataRenderer {
  constructor() {
    this.loader = new DataLoader();
  }

  /**
   * Renderiza la tabla de proyectos
   * @param {Array} proyectos - Array de proyectos
   */
  renderProyectos(proyectos) {
    const tableBody = document.getElementById('projectTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    proyectos.forEach(proyecto => {
      const row = document.createElement('div');
      row.className = 'table-row';
      row.dataset.projectId = proyecto.id;
      row.dataset.videoSrc = proyecto.videoSrc;
      row.dataset.posterSrc = proyecto.posterSrc;
      row.dataset.title = proyecto.titulo;
      row.dataset.description = proyecto.descripcion;
      row.dataset.technologies = proyecto.tecnologias.join(',');
      row.dataset.linesOfCode = proyecto.lineasCodigo;
      row.dataset.techDistribution = proyecto.distribucionTech.join(',');

      row.innerHTML = `
        <div class="cell">${proyecto.id}</div>
        <div class="cell">${proyecto.nombre}</div>
        <div class="cell">${proyecto.clase}</div>
        <div class="cell">${proyecto.fecha}</div>
        <div class="cell status-${proyecto.status.toLowerCase()}">${proyecto.status}</div>
      `;

      tableBody.appendChild(row);
    });

    console.log(`✅ ${proyectos.length} proyectos renderizados`);
  }

  /**
   * Renderiza los testimonios
   * @param {Array} testimonios - Array de testimonios
   */
  renderTestimonios(testimonios) {
    const transmissionList = document.querySelector('.transmission-list');
    const testimonialText = document.getElementById('testimonialText');
    const testimonialSource = document.getElementById('testimonialSource');
    
    if (!transmissionList) return;

    // Limpiar lista existente
    transmissionList.innerHTML = '';

    // Crear items de transmisión
    testimonios.forEach((testimonio, index) => {
      const item = document.createElement('div');
      item.className = `transmission-item ${index === 0 ? 'active' : ''}`;
      item.dataset.transmission = index;

      item.innerHTML = `
        <span class="transmission-id">[TRANSMISSION: ${testimonio.id}]</span>
        <span class="transmission-status">${testimonio.status}</span>
      `;

      transmissionList.appendChild(item);
    });

    // Configurar datos para el sistema de testimonios existente
    if (window.testimonialsData) {
      window.testimonialsData = testimonios.map(t => ({
        text: testimonio.texto,
        source: testimonio.fuente
      }));
    }

    console.log(`✅ ${testimonios.length} testimonios renderizados`);
  }

  /**
   * Renderiza las habilidades
   * @param {Object} skillsData - Datos de habilidades
   */
  renderSkills(skillsData) {
    const { habilidades, tecnologias } = skillsData;
    
    // Renderizar habilidades principales
    this.renderHabilidadesPrincipales(habilidades);
    
    // Renderizar tecnologías secundarias
    this.renderTecnologiasSecundarias(tecnologias);
    
    console.log(`✅ ${habilidades.length} habilidades y ${tecnologias.length} tecnologías renderizadas`);
  }

  /**
   * Renderiza las habilidades principales
   * @param {Array} habilidades - Array de habilidades
   */
  renderHabilidadesPrincipales(habilidades) {
    const skillsTrack = document.querySelector('.skills-slider-track');
    if (!skillsTrack) return;

    // Limpiar contenido existente
    skillsTrack.innerHTML = '';

    // Crear items duplicados para el bucle infinito
    const items = [...habilidades, ...habilidades]; // Duplicar para el bucle

    items.forEach(habilidad => {
      const item = document.createElement('div');
      item.className = 'skill-item content-box';

      item.innerHTML = `
        <img src="${habilidad.imagen}" alt="${habilidad.nombre}">
        <h3>${habilidad.nombre}</h3>
        <div class="progress-bar-container" data-label="${habilidad.nivel}">
          <div class="progress-bar-fill" data-skill-level="${habilidad.nivel}"></div>
        </div>
        <div class="skill-level">Nivel: ${habilidad.descripcion} // ${habilidad.nivel}%</div>
      `;

      skillsTrack.appendChild(item);
    });
  }

  /**
   * Renderiza las tecnologías secundarias
   * @param {Array} tecnologias - Array de tecnologías
   */
  renderTecnologiasSecundarias(tecnologias) {
    const tagList = document.querySelector('.tech-logo-scroller .tag-list');
    if (!tagList) return;

    // Limpiar contenido existente
    tagList.innerHTML = '';

    tecnologias.forEach(tech => {
      const li = document.createElement('li');
      li.dataset.logoUrl = tech.logo;
      
      li.innerHTML = `<span class="logo-tooltip">${tech.nombre}</span>`;
      
      tagList.appendChild(li);
    });
  }

  /**
   * Aplica traducciones al DOM
   * @param {Object} traducciones - Objeto con traducciones
   */
  aplicarTraducciones(traducciones) {
    // Aplicar traducciones a elementos específicos
    const elements = {
      '#heroTitle': traducciones.hero.titulo,
      '#heroSubtitle': traducciones.hero.subtitulo,
      '[data-text*="Sobre Mí"]': traducciones.secciones.sobreMi.titulo,
      '[data-text*="Habilidades"]': traducciones.secciones.habilidades.titulo,
      '[data-text*="Proyectos"]': traducciones.secciones.proyectos.titulo,
      '[data-text*="Testimonios"]': traducciones.secciones.testimonios.titulo,
      '[data-text*="Blog"]': traducciones.secciones.blog.titulo
    };

    Object.entries(elements).forEach(([selector, text]) => {
      const element = document.querySelector(selector);
      if (element) {
        element.textContent = text;
        if (element.dataset.text) {
          element.dataset.text = text;
        }
      }
    });

    console.log('✅ Traducciones aplicadas');
  }
}

/**
 * Inicializador principal
 */
class DataManager {
  constructor() {
    this.loader = new DataLoader();
    this.renderer = new DataRenderer();
    this.data = {};
  }

  /**
   * Inicializa la carga de datos
   */
  async init() {
    try {
      console.log('🚀 Iniciando carga de datos...');
      
      // Cargar todos los datos en paralelo
      this.data = await this.loader.loadMultiple([
        'proyectos.json',
        'testimonios.json', 
        'skills.json',
        'es.json'
      ]);

      // Renderizar datos
      this.renderer.renderProyectos(this.data.proyectos);
      this.renderer.renderTestimonios(this.data.testimonios);
      this.renderer.renderSkills(this.data.skills);
      this.renderer.aplicarTraducciones(this.data.es);

      console.log('✅ Todos los datos cargados y renderizados');
      
      // Disparar evento personalizado
      document.dispatchEvent(new CustomEvent('dataLoaded', { 
        detail: this.data 
      }));

    } catch (error) {
      console.error('❌ Error en la inicialización:', error);
      this.handleError(error);
    }
  }

  /**
   * Maneja errores de carga
   * @param {Error} error - Error capturado
   */
  handleError(error) {
    // Mostrar mensaje de error en el DOM
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message content-box';
    errorDiv.innerHTML = `
      <h3>⚠️ Error de Carga</h3>
      <p>No se pudieron cargar algunos datos. Verifica la conexión y recarga la página.</p>
      <button onclick="location.reload()">Reintentar</button>
    `;
    
    document.body.appendChild(errorDiv);
  }

  /**
   * Recarga datos específicos
   * @param {string} filename - Nombre del archivo a recargar
   */
  async reloadData(filename) {
    try {
      this.loader.cache.delete(filename);
      const newData = await this.loader.loadJSON(filename);
      
      // Actualizar datos y re-renderizar
      this.data[filename.replace('.json', '')] = newData;
      
      console.log(`✅ ${filename} recargado`);
      
    } catch (error) {
      console.error(`❌ Error recargando ${filename}:`, error);
    }
  }
}

// Exportar para uso global
window.DataManager = DataManager;
window.DataLoader = DataLoader;
window.DataRenderer = DataRenderer; 