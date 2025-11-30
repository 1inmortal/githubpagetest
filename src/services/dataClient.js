/**
 * DataClient con SWR para cache local y revalidación en background
 * @author INMORTAL_OS
 */

import { store } from '../core/store.js';
import { API_BASE_URL, isDevelopment } from '../config/environment.js';

class DataClient {
  constructor() {
    this.cache = new Map();
    this.subscribers = new Map();
    // Usar configuración de entorno
    this.baseURL = API_BASE_URL;
    this.revalidationInterval = 30000; // 30 segundos
    this.setupRevalidation();
    
    // Log de configuración en desarrollo
    if (isDevelopment()) {
      console.log('🔧 DataClient configurado para desarrollo:', {
        baseURL: this.baseURL,
        environment: 'development'
      });
    }
  }

  // Obtener la URL base según el entorno
  getBaseURL() {
    const hostname = window.location.hostname;
    const allowedHosts = ['localhost', '127.0.0.1', '1inmortal.github.io'];

    if (allowedHosts.includes(hostname)) {
      if (hostname === '1inmortal.github.io') {
        return 'https://tu-servidor-produccion.com/api';
      }
      return 'http://localhost:3001/api';
    }

    throw new Error(`Hostname no autorizado: ${hostname}`);
  }

  // Configurar revalidación automática
  setupRevalidation() {
    setInterval(() => {
      this.revalidateAll();
    }, this.revalidationInterval);
  }

  // Función principal SWR (Stale-While-Revalidate)
  async swr(key, fetcher, options = {}) {
    const {
      // revalidateOnFocus = true,
      // revalidateOnReconnect = true,
      // dedupingInterval = 2000,
      errorRetryCount = 3,
      errorRetryInterval = 5000
    } = options;

    // Verificar cache local primero
    const cached = this.getFromCache(key);
    if (cached && !this.isStale(cached, options)) {
      // Retornar datos del cache inmediatamente
      this.triggerUpdate(key, cached.data);
      
      // Revalidar en background si es necesario
      if (this.shouldRevalidate(cached, options)) {
        this.revalidateInBackground(key, fetcher, options);
      }
      
      return cached.data;
    }

    // Si no hay cache o está obsoleto, hacer fetch
    try {
      const data = await this.fetchWithRetry(key, fetcher, errorRetryCount, errorRetryInterval);
      this.setCache(key, data);
      this.triggerUpdate(key, data);
      return data;
    } catch (error) {
      // Si hay error y tenemos cache, retornar cache
      if (cached) {
        console.warn(`DataClient: Error en fetch para ${key}, usando cache obsoleto:`, error);
        return cached.data;
      }
      throw error;
    }
  }

  // Fetch con reintentos
  async fetchWithRetry(key, fetcher, retryCount, retryInterval) {
    let lastError;
    
    for (let i = 0; i <= retryCount; i++) {
      try {
        return await fetcher();
      } catch (error) {
        lastError = error;
        if (i < retryCount) {
          await new Promise(resolve => setTimeout(resolve, retryInterval * (i + 1)));
        }
      }
    }
    
    throw lastError;
  }

  // Verificar si los datos están obsoletos
  isStale(cached, options) {
    const { maxAge = 60000 } = options; // 1 minuto por defecto
    return Date.now() - cached.timestamp > maxAge;
  }

  // Verificar si se debe revalidar
  shouldRevalidate(cached, options) {
    const { revalidateInterval = 30000 } = options; // 30 segundos por defecto
    return Date.now() - cached.timestamp > revalidateInterval;
  }

  // Revalidar en background
  async revalidateInBackground(key, fetcher, options) {
    try {
      const data = await fetcher();
      this.setCache(key, data);
      this.triggerUpdate(key, data);
    } catch (error) {
      console.warn(`DataClient: Error en revalidación de ${key}:`, error);
    }
  }

  // Cache management
  getFromCache(key) {
    return this.cache.get(key);
  }

  setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  clearCache(key) {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }

  // Revalidar todos los datos
  async revalidateAll() {
    const keys = Array.from(this.cache.keys());
    for (const key of keys) {
      const cached = this.cache.get(key);
      if (cached && this.shouldRevalidate(cached, { revalidateInterval: 60000 })) {
        // Revalidar solo si han pasado más de 1 minuto
        this.revalidateInBackground(key, () => this.fetchData(key), {});
      }
    }
  }

  // Fetch de datos de la API
  async fetchData(endpoint) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`DataClient: Error fetching ${endpoint}:`, error);
      throw error;
    }
  }

  // Obtener token de autenticación
  getAuthToken() {
    return store.get('authToken') || localStorage.getItem('authToken');
  }

  // Métodos específicos para proyectos
  async getProjects(/* options = {} */) {
    return this.swr('projects', () => this.fetchData('/projects'), {});
  }

  async getProject(id, options = {}) {
    return this.swr(`project-${id}`, () => this.fetchData(`/projects/${id}`), options);
  }

  async createProject(projectData) {
    try {
      const response = await fetch(`${this.baseURL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify(projectData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newProject = await response.json();
      
      // Invalidar cache de proyectos
      this.clearCache('projects');
      
      // Actualizar store
      store.set('projects', newProject);
      
      return newProject;
    } catch (error) {
      console.error('DataClient: Error creating project:', error);
      throw error;
    }
  }

  async updateProject(id, projectData) {
    try {
      const response = await fetch(`${this.baseURL}/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify(projectData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedProject = await response.json();
      
      // Invalidar cache
      this.clearCache(`project-${id}`);
      this.clearCache('projects');
      
      // Actualizar store
      store.set(`project-${id}`, updatedProject);
      
      return updatedProject;
    } catch (error) {
      console.error('DataClient: Error updating project:', error);
      throw error;
    }
  }

  async deleteProject(id) {
    try {
      const response = await fetch(`${this.baseURL}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Invalidar cache
      this.clearCache(`project-${id}`);
      this.clearCache('projects');
      
      // Actualizar store
      store.delete(`project-${id}`);
      
      return true;
    } catch (error) {
      console.error('DataClient: Error deleting project:', error);
      throw error;
    }
  }

  // Métodos específicos para certificaciones
  async getCertifications(options = {}) {
    return this.swr('certifications', () => this.fetchData('/certifications'), options);
  }

  async getCertification(id, options = {}) {
    return this.swr(`certification-${id}`, () => this.fetchData(`/certifications/${id}`), options);
  }

  async createCertification(certData) {
    try {
      const response = await fetch(`${this.baseURL}/certifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify(certData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newCert = await response.json();
      
      // Invalidar cache
      this.clearCache('certifications');
      
      // Actualizar store
      store.set('certifications', newCert);
      
      return newCert;
    } catch (error) {
      console.error('DataClient: Error creating certification:', error);
      throw error;
    }
  }

  async updateCertification(id, certData) {
    try {
      const response = await fetch(`${this.baseURL}/certifications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify(certData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedCert = await response.json();
      
      // Invalidar cache
      this.clearCache(`certification-${id}`);
      this.clearCache('certifications');
      
      // Actualizar store
      store.set(`certification-${id}`, updatedCert);
      
      return updatedCert;
    } catch (error) {
      console.error('DataClient: Error updating certification:', error);
      throw error;
    }
  }

  async deleteCertification(id) {
    try {
      const response = await fetch(`${this.baseURL}/certifications/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Invalidar cache
      this.clearCache(`certification-${id}`);
      this.clearCache('certifications');
      
      // Actualizar store
      store.delete(`certification-${id}`);
      
      return true;
    } catch (error) {
      console.error('DataClient: Error deleting certification:', error);
      throw error;
    }
  }

  // Sistema de suscripciones para actualizaciones en tiempo real
  subscribe(key, callback) {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, new Set());
    }
    this.subscribers.get(key).add(callback);
    
    return () => {
      const callbacks = this.subscribers.get(key);
      if (callbacks) {
        callbacks.delete(callback);
        if (callbacks.size === 0) {
          this.subscribers.delete(key);
        }
      }
    };
  }

  // Disparar actualizaciones
  triggerUpdate(key, data) {
    const callbacks = this.subscribers.get(key);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }

  // Método para migrar datos existentes
  async migrateExistingData() {
    try {
      // Intentar cargar datos de archivos JSON existentes
      const projectsResponse = await fetch('/src/data/proyectos.json');
      const certificationsResponse = await fetch('/src/data/certificaciones.json');
      
      if (projectsResponse.ok) {
        const projects = await projectsResponse.json();
        store.set('projects', projects);
        this.setCache('projects', projects);
      }
      
      if (certificationsResponse.ok) {
        const certifications = await certificationsResponse.json();
        store.set('certifications', certifications);
        this.setCache('certifications', certifications);
      }
    } catch (error) {
      console.warn('DataClient: Error migrando datos existentes:', error);
    }
  }
}

// Instancia global del dataClient
const dataClient = new DataClient();

// Migrar datos existentes al inicializar
dataClient.migrateExistingData();

export { DataClient, dataClient };
export default dataClient;
