/**
 * Setup para tests unitarios
 * @author INMORTAL_OS
 */

import { vi, afterEach } from 'vitest';

// Mock de IndexedDB para que falle y force el fallback a localStorage
const indexedDB = {
  open: vi.fn(() => {
    const request = {
      onerror: null,
      onsuccess: null,
      onupgradeneeded: null,
      result: null
    };
    
    // Simular error para forzar fallback a localStorage
    setTimeout(() => {
      if (request.onerror) {
        request.onerror({ error: new Error('IndexedDB not available') });
      }
    }, 0);
    
    return request;
  }),
  deleteDatabase: vi.fn(),
  databases: vi.fn()
};

// Mock de localStorage con implementación funcional
const localStorageMock = {
  store: {},
  getItem: vi.fn((key) => {
    return localStorageMock.store[key] || null;
  }),
  setItem: vi.fn((key, value) => {
    localStorageMock.store[key] = value;
  }),
  removeItem: vi.fn((key) => {
    delete localStorageMock.store[key];
  }),
  clear: vi.fn(() => {
    localStorageMock.store = {};
  })
};

// Mock de sessionStorage
const sessionStorageMock = {
  store: {},
  getItem: vi.fn((key) => {
    return sessionStorageMock.store[key] || null;
  }),
  setItem: vi.fn((key, value) => {
    sessionStorageMock.store[key] = value;
  }),
  removeItem: vi.fn((key) => {
    delete sessionStorageMock.store[key];
  }),
  clear: vi.fn(() => {
    sessionStorageMock.store = {};
  })
};

// Mock de fetch
global.fetch = vi.fn();

// Mock de window
Object.defineProperty(window, 'indexedDB', {
  value: indexedDB,
  writable: true
});

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
});

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
  writable: true
});

// Mock de idb-keyval para que falle y force el fallback
window.idbKeyval = {
  get: vi.fn(() => Promise.reject(new Error('IndexedDB not available'))),
  set: vi.fn(() => Promise.reject(new Error('IndexedDB not available'))),
  delete: vi.fn(() => Promise.reject(new Error('IndexedDB not available'))),
  clear: vi.fn(() => Promise.reject(new Error('IndexedDB not available')))
};

// Mock de ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock de IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock de matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock de console para tests
global.console = {
  ...console,
  warn: vi.fn(),
  error: vi.fn(),
  log: vi.fn()
};

// Asegurar que localStorage esté disponible globalmente
global.localStorage = localStorageMock;
global.sessionStorage = sessionStorageMock;

// Limpiar mocks después de cada test
afterEach(() => {
  vi.clearAllMocks();
  localStorageMock.clear();
  sessionStorageMock.clear();
});
