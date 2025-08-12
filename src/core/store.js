/**
 * Store minimal con persistencia en IndexedDB y fallback a localStorage
 * @author INMORTAL_OS
 */

class Store {
  constructor (name = 'app-store') {
    this.name = name;
    this.subscribers = new Set();
    this.data = {};
    this.initialized = false;
    this.init();
  }

  async init () {
    try {
      // Intentar usar IndexedDB primero
      if (typeof window !== 'undefined' && 'indexedDB' in window && window.idbKeyval) {
        try {
          await this.initIndexedDB();
        } catch (error) {
          console.warn('Store: Fallback a localStorage debido a error en IndexedDB:', error);
          this.initLocalStorage();
        }
      } else {
        // Fallback a localStorage
        this.initLocalStorage();
      }
    } catch (error) {
      console.warn('Store: Fallback a localStorage debido a error general:', error);
      this.initLocalStorage();
    }
    this.initialized = true;
  }

  async initIndexedDB () {
    // Usar idb-keyval si está disponible
    if (typeof window !== 'undefined' && window.idbKeyval) {
      try {
        const stored = await window.idbKeyval.get(this.name);
        if (stored) {
          this.data = { ...this.data, ...stored };
        }
      } catch (error) {
        console.warn('Store: Error leyendo de IndexedDB:', error);
        throw error; // Re-lanzar para que se capture en init()
      }
    } else {
      // Implementación básica de IndexedDB
      return new Promise((resolve, reject) => {
        const request = indexedDB.open('StoreDB', 1);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const db = request.result;
          const transaction = db.transaction(['stores'], 'readonly');
          const store = transaction.objectStore('stores');
          const getRequest = store.get(this.name);

          getRequest.onsuccess = () => {
            if (getRequest.result) {
              this.data = { ...this.data, ...getRequest.result };
            }
            resolve();
          };

          getRequest.onerror = () => reject(getRequest.error);
        };

        request.onupgradeneeded = () => {
          const db = request.result;
          if (!db.objectStoreNames.contains('stores')) {
            db.createObjectStore('stores', { keyPath: 'name' });
          }
        };
      });
    }
  }

  initLocalStorage () {
    try {
      if (typeof window !== 'undefined' && 'localStorage' in window) {
        const stored = localStorage.getItem(this.name);
        if (stored) {
          this.data = { ...this.data, ...JSON.parse(stored) };
        }
      }
    } catch (error) {
      console.warn('Store: Error leyendo de localStorage:', error);
    }
  }

  async set (key, value) {
    this.data[key] = value;

    // Persistir datos
    try {
      if (typeof window !== 'undefined' && 'indexedDB' in window && window.idbKeyval) {
        try {
          await window.idbKeyval.set(this.name, this.data);
        } catch (error) {
          console.warn('Store: Error persistiendo en IndexedDB, fallback a localStorage:', error);
          if (typeof window !== 'undefined' && 'localStorage' in window) {
            localStorage.setItem(this.name, JSON.stringify(this.data));
          }
        }
      } else if (typeof window !== 'undefined' && 'localStorage' in window) {
        localStorage.setItem(this.name, JSON.stringify(this.data));
      }
    } catch (error) {
      console.warn('Store: Error persistiendo datos:', error);
    }

    // Notificar suscriptores
    this.subscribers.forEach(callback => callback(key, value, this.data));
  }

  get (key) {
    return this.data[key];
  }

  getAll () {
    return { ...this.data };
  }

  subscribe (callback) {
    this.subscribers.add(callback);

    // Retornar función para desuscribirse
    return () => {
      this.subscribers.delete(callback);
    };
  }

  async delete (key) {
    delete this.data[key];

    try {
      if (typeof window !== 'undefined' && 'indexedDB' in window && window.idbKeyval) {
        try {
          await window.idbKeyval.set(this.name, this.data);
        } catch (error) {
          console.warn('Store: Error persistiendo en IndexedDB después de eliminar, fallback a localStorage:', error);
          if (typeof window !== 'undefined' && 'localStorage' in window) {
            localStorage.setItem(this.name, JSON.stringify(this.data));
          }
        }
      } else if (typeof window !== 'undefined' && 'localStorage' in window) {
        localStorage.setItem(this.name, JSON.stringify(this.data));
      }
    } catch (error) {
      console.warn('Store: Error persistiendo datos después de eliminar:', error);
    }

    this.subscribers.forEach(callback => callback(key, undefined, this.data));
  }

  async clear () {
    this.data = {};

    try {
      if (typeof window !== 'undefined' && 'indexedDB' in window && window.idbKeyval) {
        try {
          await window.idbKeyval.delete(this.name);
        } catch (error) {
          console.warn('Store: Error limpiando en IndexedDB, fallback a localStorage:', error);
          if (typeof window !== 'undefined' && 'localStorage' in window) {
            localStorage.removeItem(this.name);
          }
        }
      } else if (typeof window !== 'undefined' && 'localStorage' in window) {
        localStorage.removeItem(this.name);
      }
    } catch (error) {
      console.warn('Store: Error limpiando datos:', error);
    }

    this.subscribers.forEach(callback => callback(null, undefined, {}));
  }

  isInitialized () {
    return this.initialized;
  }
}

// Instancia global del store
const store = new Store('githubpagetest-store');

// Exportar tanto la clase como la instancia
export { Store, store };
export default store;
