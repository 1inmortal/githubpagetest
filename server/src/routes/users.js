import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { authenticateToken, requireRole } from './auth.js';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Configuración segura de multer para subida de archivos
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const uploadsDir = path.resolve(process.cwd(), 'uploads');
      await fs.mkdir(uploadsDir, { recursive: true });
      cb(null, uploadsDir);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    // Generar nombre de archivo seguro y único
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 15);
    const extension = path.extname(file.originalname).toLowerCase();
    const safeName = `avatar_${timestamp}_${randomSuffix}${extension}`;
    cb(null, safeName);
  }
});

// Filtro de archivos para validar tipos de imagen
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB máximo
  
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Solo se permiten archivos de imagen (JPEG, PNG, WebP)'), false);
  }
  
  if (file.size > maxSize) {
    return cb(new Error('El archivo es demasiado grande. Máximo 5MB'), false);
  }
  
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1
  }
});

// Función para sanitizar mensajes de error (previene XSS)
function sanitizeMessage(message) {
  if (typeof message !== 'string') {
    return 'Error desconocido';
  }
  
  return message
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .substring(0, 200); // Limitar longitud del mensaje
}

// Función para validar y normalizar nombres de archivo (previene path traversal)
function validateFileName(fileName) {
  if (!fileName || typeof fileName !== 'string') {
    return null;
  }
  
  // Normalizar la ruta y obtener solo el nombre del archivo
  const normalizedPath = path.normalize(fileName);
  const basename = path.basename(normalizedPath);
  
  // Verificar que no contenga caracteres peligrosos
  if (basename.includes('..') || basename.includes('/') || basename.includes('\\')) {
    return null;
  }
  
  return basename;
}

// GET /api/users/profile - Obtener perfil del usuario autenticado
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        role: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    const safeMessage = sanitizeMessage(error.message);
    res.status(500).json({ error: `Error interno del servidor: ${safeMessage}` });
  }
});

// POST /api/users/avatar - Subir avatar del usuario
router.post('/avatar', authenticateToken, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó ningún archivo' });
    }

    const fileName = req.file.filename;
    const filePath = `/uploads/${fileName}`;
    
    // Actualizar el usuario con la nueva URL del avatar
    const updatedUser = await prisma.user.update({
      where: { id: req.user.userId },
      data: { avatarUrl: filePath },
      select: {
        id: true,
        email: true,
        avatarUrl: true,
        updatedAt: true
      }
    });

    res.json({
      message: 'Avatar subido exitosamente',
      user: updatedUser
    });

  } catch (error) {
    console.error('Error al subir avatar:', error);
    
    // Limpiar archivo si se subió pero falló la actualización en BD
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Error al eliminar archivo:', unlinkError);
      }
    }
    
    const safeMessage = sanitizeMessage(error.message);
    res.status(500).json({ error: `Error al subir avatar: ${safeMessage}` });
  }
});

// DELETE /api/users/avatar - Eliminar avatar del usuario
router.delete('/avatar', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { avatarUrl: true }
    });

    if (user?.avatarUrl) {
      // Eliminar archivo físico
      const filePath = path.resolve(process.cwd(), user.avatarUrl.substring(1));
      try {
        await fs.unlink(filePath);
      } catch (unlinkError) {
        console.error('Error al eliminar archivo físico:', unlinkError);
        // Continuar aunque falle la eliminación del archivo
      }
    }

    // Actualizar usuario para remover avatarUrl
    await prisma.user.update({
      where: { id: req.user.userId },
      data: { avatarUrl: null }
    });

    res.json({ message: 'Avatar eliminado exitosamente' });

  } catch (error) {
    console.error('Error al eliminar avatar:', error);
    const safeMessage = sanitizeMessage(error.message);
    res.status(500).json({ error: `Error al eliminar avatar: ${safeMessage}` });
  }
});

// GET /api/users/avatar/:filename - Servir archivo de avatar
router.get('/avatar/:filename', async (req, res) => {
  try {
    const fileName = validateFileName(req.params.filename);
    
    if (!fileName) {
      return res.status(400).json({ error: 'Nombre de archivo inválido' });
    }

    const filePath = path.resolve(process.cwd(), 'uploads', fileName);
    
    // Verificar que el archivo existe y está dentro del directorio uploads
    try {
      const stats = await fs.stat(filePath);
      if (!stats.isFile()) {
        return res.status(404).json({ error: 'Archivo no encontrado' });
      }
    } catch (statError) {
      return res.status(404).json({ error: 'Archivo no encontrado' });
    }

    // Servir el archivo con headers de seguridad
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 año
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.sendFile(filePath);

  } catch (error) {
    console.error('Error al servir avatar:', error);
    const safeMessage = sanitizeMessage(error.message);
    res.status(500).json({ error: `Error interno del servidor: ${safeMessage}` });
  }
});

// PUT /api/users/profile - Actualizar perfil del usuario
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { email } = req.body;
    
    // Validaciones básicas
    if (email && typeof email === 'string') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Formato de email inválido' });
      }
    }

    const updateData = {};
    if (email) updateData.email = email;

    const updatedUser = await prisma.user.update({
      where: { id: req.user.userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        role: true,
        avatarUrl: true,
        updatedAt: true
      }
    });

    res.json({
      message: 'Perfil actualizado exitosamente',
      user: updatedUser
    });

  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    const safeMessage = sanitizeMessage(error.message);
    res.status(500).json({ error: `Error al actualizar perfil: ${safeMessage}` });
  }
});

// GET /api/users (solo admin) - Listar usuarios
router.get('/', authenticateToken, requireRole('admin'), async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ users });
  } catch (error) {
    console.error('Error al listar usuarios:', error);
    const safeMessage = sanitizeMessage(error.message);
    res.status(500).json({ error: `Error interno del servidor: ${safeMessage}` });
  }
});

export default router;
