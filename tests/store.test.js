/**
 * Tests unitarios para el store
 * @author INMORTAL_OS
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Store, store } from '../src/core/store.js';

describe('Store', () => {
  let testStore;

  beforeEach(() => {
    // Limpiar localStorage antes de cada test
    localStorage.clear();
    testStore = new Store('test-store');
  });

  describe('Inicialización', () => {
    it('debe inicializar con nombre correcto', () => {
      expect(testStore.name).toBe('test-store');
    });

    it('debe inicializar con suscriptores vacíos', () => {
      expect(testStore.subscribers.size).toBe(0);
    });

    it('debe inicializar con datos vacíos', () => {
      expect(testStore.data).toEqual({});
    });
  });

  describe('Métodos básicos', () => {
    it('debe establecer y obtener valores', async () => {
      await testStore.set('testKey', 'testValue');
      expect(testStore.get('testKey')).toBe('testValue');
    });

    it('debe obtener todos los datos', async () => {
      await testStore.set('key1', 'value1');
      await testStore.set('key2', 'value2');
      
      const allData = testStore.getAll();
      expect(allData).toEqual({
        key1: 'value1',
        key2: 'value2'
      });
    });

    it('debe eliminar valores', async () => {
      await testStore.set('testKey', 'testValue');
      await testStore.delete('testKey');
      
      expect(testStore.get('testKey')).toBeUndefined();
    });

    it('debe limpiar todos los datos', async () => {
      await testStore.set('key1', 'value1');
      await testStore.set('key2', 'value2');
      await testStore.clear();
      
      expect(testStore.data).toEqual({});
    });
  });

  describe('Sistema de suscripciones', () => {
    it('debe suscribir y notificar cambios', async () => {
      const mockCallback = vi.fn();
      const unsubscribe = testStore.subscribe(mockCallback);
      
      await testStore.set('testKey', 'testValue');
      
      expect(mockCallback).toHaveBeenCalledWith('testKey', 'testValue', { testKey: 'testValue' });
      
      unsubscribe();
    });

    it('debe permitir desuscribirse', async () => {
      const mockCallback = vi.fn();
      const unsubscribe = testStore.subscribe(mockCallback);
      
      unsubscribe();
      await testStore.set('testKey', 'testValue');
      
      expect(mockCallback).not.toHaveBeenCalled();
    });

    it('debe notificar a múltiples suscriptores', async () => {
      const mockCallback1 = vi.fn();
      const mockCallback2 = vi.fn();
      
      testStore.subscribe(mockCallback1);
      testStore.subscribe(mockCallback2);
      
      await testStore.set('testKey', 'testValue');
      
      expect(mockCallback1).toHaveBeenCalled();
      expect(mockCallback2).toHaveBeenCalled();
    });
  });

  describe('Persistencia', () => {
    it('debe persistir datos en localStorage', async () => {
      await testStore.set('persistentKey', 'persistentValue');
      
      // Verificar que se guardó en localStorage
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'test-store',
        JSON.stringify({ persistentKey: 'persistentValue' })
      );
    });

    it('debe cargar datos desde localStorage al inicializar', async () => {
      const storedData = { existingKey: 'existingValue' };
      localStorage.getItem.mockReturnValue(JSON.stringify(storedData));
      
      const newStore = new Store('test-store');
      
      // Esperar a que se complete la inicialización
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(newStore.get('existingKey')).toBe('existingValue');
    });

    it('debe manejar errores de localStorage graciosamente', () => {
      localStorage.setItem.mockImplementation(() => {
        throw new Error('Storage error');
      });
      
      // No debe fallar
      expect(() => {
        testStore.set('testKey', 'testValue');
      }).not.toThrow();
    });
  });

  describe('Estado de inicialización', () => {
    it('debe reportar estado de inicialización correctamente', async () => {
      // Crear un nuevo Store para esta prueba
      const freshStore = new Store('fresh-test-store');
      
      // Inicialmente debe ser false hasta que se complete la inicialización
      expect(freshStore.isInitialized()).toBe(false);
      
      // Esperar a que se complete la inicialización
      await new Promise(resolve => setTimeout(resolve, 10));
      
      // Después de la inicialización debe ser true
      expect(freshStore.isInitialized()).toBe(true);
    });
  });
});

describe('Store global', () => {
  it('debe exportar instancia global', () => {
    expect(store).toBeInstanceOf(Store);
  });

  it('debe tener nombre por defecto', () => {
    expect(store.name).toBe('githubpagetest-store');
  });
});
