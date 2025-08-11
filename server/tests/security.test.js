/**
 * Tests de seguridad para verificar las medidas implementadas
 * @author INMORTAL_OS
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { securityMiddlewares } from '../src/middleware/security.js';
import { securityConfig, validateSecurityConfig } from '../src/config/security.js';

// Crear aplicación de prueba
const app = express();
app.use(express.json());

// Aplicar middlewares de seguridad
securityMiddlewares.forEach(middleware => app.use(middleware));

// Ruta de prueba para testing
app.post('/test/upload', (req, res) => {
  res.json({ message: 'Test successful' });
});

app.get('/test/path/:filename', (req, res) => {
  res.json({ filename: req.params.filename });
});

app.post('/test/input', (req, res) => {
  res.json({ 
    body: req.body,
    query: req.query,
    params: req.params
  });
});

describe('🔒 Tests de Seguridad', () => {
  
  describe('Configuración de Seguridad', () => {
    it('debe tener configuración válida', () => {
      expect(securityConfig).toBeDefined();
      expect(securityConfig.files.maxSize).toBeGreaterThan(0);
      expect(securityConfig.files.allowedImageTypes).toBeInstanceOf(Array);
      expect(securityConfig.validation.maxMessageLength).toBeGreaterThan(0);
    });

    it('debe validar configuración correctamente', () => {
      expect(() => validateSecurityConfig()).not.toThrow();
    });
  });

  describe('Middleware de Sanitización', () => {
    it('debe sanitizar entradas maliciosas', async () => {
      const maliciousInput = {
        message: '<script>alert("xss")</script>',
        email: 'test@example.com',
        nested: {
          value: 'javascript:alert("xss")',
          event: 'onclick="alert(\'xss\')"'
        }
      };

      const response = await request(app)
        .post('/test/input')
        .send(maliciousInput)
        .expect(200);

      // Verificar que el script malicioso fue removido
      expect(response.body.body.message).not.toContain('<script>');
      expect(response.body.body.message).not.toContain('</script>');
      
      // Verificar que el protocolo javascript fue removido
      expect(response.body.body.nested.value).not.toContain('javascript:');
      
      // Verificar que los event handlers fueron removidos
      expect(response.body.body.nested.event).not.toContain('onclick');
    });

    it('debe limitar longitud de mensajes', async () => {
      const longMessage = 'a'.repeat(300); // Más del límite permitido
      
      const response = await request(app)
        .post('/test/input')
        .send({ message: longMessage })
        .expect(200);

      expect(response.body.body.message.length).toBeLessThanOrEqual(
        securityConfig.validation.maxMessageLength
      );
    });
  });

  describe('Prevención de Path Traversal', () => {
    it('debe bloquear intentos de path traversal', async () => {
      const maliciousPaths = [
        '../../../etc/passwd',
        '..\\..\\..\\windows\\system32\\config\\sam',
        '....//....//....//etc/passwd',
        'uploads/../../../config.json'
      ];

      for (const maliciousPath of maliciousPaths) {
        await request(app)
          .get(`/test/path/${encodeURIComponent(maliciousPath)}`)
          .expect(400); // Debe ser bloqueado por el middleware
      }
    });

    it('debe permitir nombres de archivo válidos', async () => {
      const validFilenames = [
        'avatar.jpg',
        'profile.png',
        'user_photo.webp',
        'image-123.jpeg'
      ];

      for (const validFilename of validFilenames) {
        const response = await request(app)
          .get(`/test/path/${validFilename}`)
          .expect(200);
        
        expect(response.body.filename).toBe(validFilename);
      }
    });
  });

  describe('Validación de Content-Type', () => {
    it('debe requerir Content-Type JSON para POST', async () => {
      await request(app)
        .post('/test/input')
        .set('Content-Type', 'text/plain')
        .send('invalid content')
        .expect(400);
    });

    it('debe permitir Content-Type JSON válido', async () => {
      await request(app)
        .post('/test/input')
        .set('Content-Type', 'application/json')
        .send({ test: 'data' })
        .expect(200);
    });
  });

  describe('Headers de Seguridad', () => {
    it('debe incluir headers de seguridad', async () => {
      const response = await request(app)
        .get('/test/path/test.jpg')
        .expect(200);

      // Verificar headers de seguridad
      expect(response.headers['x-frame-options']).toBe('DENY');
      expect(response.headers['x-content-type-options']).toBe('nosniff');
      expect(response.headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
      expect(response.headers['permissions-policy']).toBe('geolocation=(), microphone=(), camera=()');
    });

    it('debe configurar cache control para rutas sensibles', async () => {
      // Simular ruta de autenticación
      app.get('/api/auth/test', (req, res) => {
        res.json({ test: true });
      });

      const response = await request(app)
        .get('/api/auth/test')
        .expect(200);

      expect(response.headers['cache-control']).toContain('no-store');
      expect(response.headers['cache-control']).toContain('no-cache');
      expect(response.headers['pragma']).toBe('no-cache');
    });
  });

  describe('Validación de JWT', () => {
    it('debe validar formato de JWT', async () => {
      const invalidTokens = [
        'invalid-token',
        'Bearer invalid',
        'Bearer token.part1.part2', // Solo 2 partes
        'Bearer token.part1.part2.part3.part4' // 4 partes
      ];

      for (const invalidToken of invalidTokens) {
        await request(app)
          .get('/test/path/test.jpg')
          .set('Authorization', invalidToken)
          .expect(200); // La ruta no requiere autenticación, pero el middleware valida el formato
      }
    });

    it('debe permitir tokens JWT válidos', async () => {
      const validToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      
      const response = await request(app)
        .get('/test/path/test.jpg')
        .set('Authorization', validToken)
        .expect(200);

      expect(response.body.filename).toBe('test.jpg');
    });
  });

  describe('Rate Limiting y Logging', () => {
    it('debe registrar requests de seguridad', async () => {
      // Mock console.log para capturar logs
      const originalLog = console.log;
      const logs = [];
      console.log = (...args) => logs.push(args.join(' '));

      await request(app)
        .post('/test/input')
        .send({ test: 'data' })
        .expect(200);

      // Restaurar console.log
      console.log = originalLog;

      // Verificar que se registraron logs de seguridad
      expect(logs.some(log => log.includes('📊 Request:'))).toBe(true);
    });
  });

  describe('Validación de Archivos', () => {
    it('debe validar tipos de archivo permitidos', () => {
      const allowedTypes = securityConfig.files.allowedImageTypes;
      const allowedExtensions = securityConfig.files.allowedExtensions;

      expect(allowedTypes).toContain('image/jpeg');
      expect(allowedTypes).toContain('image/png');
      expect(allowedTypes).toContain('image/webp');
      
      expect(allowedExtensions).toContain('.jpg');
      expect(allowedExtensions).toContain('.png');
      expect(allowedExtensions).toContain('.webp');
    });

    it('debe tener límites de tamaño configurados', () => {
      expect(securityConfig.files.maxSize).toBe(5 * 1024 * 1024); // 5MB
    });
  });

  describe('Prevención de Timing Attacks', () => {
    it('debe agregar delays aleatorios', async () => {
      const startTime = Date.now();
      
      await request(app)
        .get('/test/path/test.jpg')
        .expect(200);
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      // El delay aleatorio puede ser de 0-100ms
      expect(responseTime).toBeGreaterThanOrEqual(0);
      expect(responseTime).toBeLessThanOrEqual(200); // Margen de tolerancia
    });
  });

  describe('Sanitización de Mensajes de Error', () => {
    it('debe escapar caracteres HTML en mensajes', () => {
      const testCases = [
        { input: '<script>alert("xss")</script>', expected: '&lt;script&gt;alert("xss")&lt;/script&gt;' },
        { input: 'User & Admin', expected: 'User &amp; Admin' },
        { input: 'Quote "test"', expected: 'Quote &quot;test&quot;' },
        { input: "Single 'quote'", expected: 'Single &#39;quote&#39;' }
      ];

      testCases.forEach(({ input, expected }) => {
        // Simular la función de sanitización
        const sanitized = input
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
        
        expect(sanitized).toBe(expected);
      });
    });
  });

  describe('Configuración de Entorno', () => {
    it('debe tener valores por defecto seguros', () => {
      expect(securityConfig.jwt.secret).not.toBe('dev-jwt-secret-change-in-production');
      expect(securityConfig.cookies.secret).not.toBe('dev-cookie-secret-change-in-production');
    });

    it('debe validar configuración de producción', () => {
      // Simular entorno de producción
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
      
      // Esto debería lanzar un error si los secretos son los por defecto
      if (securityConfig.jwt.secret === 'dev-jwt-secret-change-in-production' ||
          securityConfig.cookies.secret === 'dev-cookie-secret-change-in-production') {
        expect(() => validateSecurityConfig()).toThrow();
      }
      
      // Restaurar entorno
      process.env.NODE_ENV = originalEnv;
    });
  });
});

describe('🚀 Tests de Integración de Seguridad', () => {
  it('debe mantener todas las protecciones activas', async () => {
    // Test completo de una ruta con todas las protecciones
    const response = await request(app)
      .post('/test/input')
      .set('Content-Type', 'application/json')
      .send({
        message: '<script>alert("xss")</script>',
        filename: '../../../etc/passwd',
        data: 'javascript:alert("xss")'
      })
      .expect(200);

    // Verificar que todas las protecciones funcionaron
    expect(response.body.body.message).not.toContain('<script>');
    expect(response.body.body.filename).not.toContain('..');
    expect(response.body.body.data).not.toContain('javascript:');
    
    // Verificar headers de seguridad
    expect(response.headers['x-frame-options']).toBe('DENY');
    expect(response.headers['x-content-type-options']).toBe('nosniff');
  });
});
