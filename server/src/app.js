/**
 * Aplicación Express para pruebas
 * @author INMORTAL_OS
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Importar rutas
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import certificationRoutes from './routes/certifications.js';

// Configurar variables de entorno
dotenv.config();

const app = express();

// Inicializar Prisma
const prisma = new PrismaClient();

// Middleware de seguridad
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ['\'self\''],
      styleSrc: ['\'self\'', '\'unsafe-inline\'', 'https://fonts.googleapis.com'],
      fontSrc: ['\'self\'', 'https://fonts.gstatic.com'],
      scriptSrc: ['\'self\'', 'https://cdnjs.cloudflare.com', 'https://www.googletagmanager.com'],
      imgSrc: ['\'self\'', 'data:', 'https:'],
      connectSrc: ['\'self\''],
      frameSrc: ['\'self\''],
      objectSrc: ['\'none\''],
      upgradeInsecureRequests: []
    }
  }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por ventana
  message: {
    error: 'Demasiadas requests desde esta IP, intenta de nuevo en 15 minutos.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

app.use('/api/', limiter);

// Middleware adicional
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Middleware de manejo de errores de Prisma
app.use((err, req, res, next) => {
  if (err.code === 'P2002') {
    return res.status(409).json({
      error: 'Conflicto: El recurso ya existe'
    });
  }
  if (err.code === 'P2025') {
    return res.status(404).json({
      error: 'No encontrado'
    });
  }
  next(err);
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/certifications', certificationRoutes);

// Ruta de health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'GitHub Page Test API',
    version: '1.0.0',
    author: 'INMORTAL_OS',
    endpoints: {
      auth: '/api/auth',
      projects: '/api/projects',
      certifications: '/api/certifications',
      health: '/api/health'
    }
  });
});

// Middleware de manejo de errores 404
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint no encontrado',
    path: req.originalUrl,
    method: req.method
  });
});

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error global:', err);

  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Error interno del servidor'
      : err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

export { app, prisma };
