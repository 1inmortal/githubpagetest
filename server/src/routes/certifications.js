/**
 * Rutas para certificaciones
 * @author INMORTAL_OS
 */

import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireAdmin } from './auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/certifications - Obtener todas las certificaciones
router.get('/', async (req, res) => {
  try {
    const certifications = await prisma.certification.findMany({
      orderBy: { issuedAt: 'desc' }
    });

    res.json(certifications);
  } catch (error) {
    console.error('Error obteniendo certificaciones:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// GET /api/certifications/:id - Obtener certificación por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const certification = await prisma.certification.findUnique({
      where: { id }
    });

    if (!certification) {
      return res.status(404).json({
        error: 'Certificación no encontrada'
      });
    }

    res.json(certification);
  } catch (error) {
    console.error('Error obteniendo certificación:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// POST /api/certifications - Crear nueva certificación (requiere autenticación)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, issuer, issuedAt, url } = req.body;

    // Validar campos requeridos
    if (!name || !issuer || !issuedAt) {
      return res.status(400).json({
        error: 'Nombre, entidad emisora y fecha de emisión son requeridos'
      });
    }

    // Validar formato de fecha
    const issuedDate = new Date(issuedAt);
    if (isNaN(issuedDate.getTime())) {
      return res.status(400).json({
        error: 'Formato de fecha inválido'
      });
    }

    // Crear certificación
    const newCertification = await prisma.certification.create({
      data: {
        name,
        issuer,
        issuedAt: issuedDate,
        url: url || null
      }
    });

    res.status(201).json({
      message: 'Certificación creada exitosamente',
      certification: newCertification
    });

  } catch (error) {
    console.error('Error creando certificación:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// PUT /api/certifications/:id - Actualizar certificación (requiere autenticación)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, issuer, issuedAt, url } = req.body;

    // Verificar que la certificación existe
    const existingCertification = await prisma.certification.findUnique({
      where: { id }
    });

    if (!existingCertification) {
      return res.status(404).json({
        error: 'Certificación no encontrada'
      });
    }

    // Validar formato de fecha si se proporciona
    let issuedDate = existingCertification.issuedAt;
    if (issuedAt) {
      issuedDate = new Date(issuedAt);
      if (isNaN(issuedDate.getTime())) {
        return res.status(400).json({
          error: 'Formato de fecha inválido'
        });
      }
    }

    // Actualizar certificación
    const updatedCertification = await prisma.certification.update({
      where: { id },
      data: {
        name: name || existingCertification.name,
        issuer: issuer || existingCertification.issuer,
        issuedAt: issuedDate,
        url: url !== undefined ? url : existingCertification.url
      }
    });

    res.json({
      message: 'Certificación actualizada exitosamente',
      certification: updatedCertification
    });

  } catch (error) {
    console.error('Error actualizando certificación:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// DELETE /api/certifications/:id - Eliminar certificación (requiere autenticación)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar que la certificación existe
    const existingCertification = await prisma.certification.findUnique({
      where: { id }
    });

    if (!existingCertification) {
      return res.status(404).json({
        error: 'Certificación no encontrada'
      });
    }

    // Eliminar certificación
    await prisma.certification.delete({
      where: { id }
    });

    res.json({
      message: 'Certificación eliminada exitosamente'
    });

  } catch (error) {
    console.error('Error eliminando certificación:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// GET /api/certifications/search?q=query - Buscar certificaciones
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        error: 'Query de búsqueda requerida'
      });
    }

    const certifications = await prisma.certification.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { issuer: { contains: q, mode: 'insensitive' } }
        ]
      },
      orderBy: { issuedAt: 'desc' }
    });

    res.json(certifications);
  } catch (error) {
    console.error('Error buscando certificaciones:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// GET /api/certifications/issuer/:issuer - Obtener certificaciones por emisor
router.get('/issuer/:issuer', async (req, res) => {
  try {
    const { issuer } = req.params;

    const certifications = await prisma.certification.findMany({
      where: {
        issuer: { contains: issuer, mode: 'insensitive' }
      },
      orderBy: { issuedAt: 'desc' }
    });

    res.json(certifications);
  } catch (error) {
    console.error('Error obteniendo certificaciones por emisor:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// GET /api/certifications/year/:year - Obtener certificaciones por año
router.get('/year/:year', async (req, res) => {
  try {
    const { year } = req.params;
    const yearInt = parseInt(year);

    if (isNaN(yearInt)) {
      return res.status(400).json({
        error: 'Año inválido'
      });
    }

    const startDate = new Date(yearInt, 0, 1);
    const endDate = new Date(yearInt + 1, 0, 1);

    const certifications = await prisma.certification.findMany({
      where: {
        issuedAt: {
          gte: startDate,
          lt: endDate
        }
      },
      orderBy: { issuedAt: 'desc' }
    });

    res.json(certifications);
  } catch (error) {
    console.error('Error obteniendo certificaciones por año:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

export default router;
