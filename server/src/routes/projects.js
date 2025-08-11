/**
 * Rutas para proyectos
 * @author INMORTAL_OS
 */

import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireAdmin } from './auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/projects - Obtener todos los proyectos
router.get('/', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // Parsear tags de JSON string a array
    const projectsWithParsedTags = projects.map(project => ({
      ...project,
      tags: JSON.parse(project.tags || '[]')
    }));

    res.json(projectsWithParsedTags);
  } catch (error) {
    console.error('Error obteniendo proyectos:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// GET /api/projects/:id - Obtener proyecto por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id }
    });

    if (!project) {
      return res.status(404).json({
        error: 'Proyecto no encontrado'
      });
    }

    // Parsear tags de JSON string a array
    const projectWithParsedTags = {
      ...project,
      tags: JSON.parse(project.tags || '[]')
    };

    res.json(projectWithParsedTags);
  } catch (error) {
    console.error('Error obteniendo proyecto:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// POST /api/projects - Crear nuevo proyecto (requiere autenticación)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { title, description, tags, url } = req.body;

    // Validar campos requeridos
    if (!title || !description) {
      return res.status(400).json({
        error: 'Título y descripción son requeridos'
      });
    }

    // Validar que tags sea un array
    if (tags && !Array.isArray(tags)) {
      return res.status(400).json({
        error: 'Tags debe ser un array'
      });
    }

    // Crear proyecto
    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        tags: JSON.stringify(tags || []),
        url: url || null
      }
    });

    // Parsear tags para la respuesta
    const projectWithParsedTags = {
      ...newProject,
      tags: JSON.parse(newProject.tags || '[]')
    };

    res.status(201).json({
      message: 'Proyecto creado exitosamente',
      project: projectWithParsedTags
    });

  } catch (error) {
    console.error('Error creando proyecto:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// PUT /api/projects/:id - Actualizar proyecto (requiere autenticación)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, tags, url } = req.body;

    // Verificar que el proyecto existe
    const existingProject = await prisma.project.findUnique({
      where: { id }
    });

    if (!existingProject) {
      return res.status(404).json({
        error: 'Proyecto no encontrado'
      });
    }

    // Validar que tags sea un array si se proporciona
    if (tags && !Array.isArray(tags)) {
      return res.status(400).json({
        error: 'Tags debe ser un array'
      });
    }

    // Actualizar proyecto
    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title: title || existingProject.title,
        description: description || existingProject.description,
        tags: tags ? JSON.stringify(tags) : existingProject.tags,
        url: url !== undefined ? url : existingProject.url
      }
    });

    // Parsear tags para la respuesta
    const projectWithParsedTags = {
      ...updatedProject,
      tags: JSON.parse(updatedProject.tags || '[]')
    };

    res.json({
      message: 'Proyecto actualizado exitosamente',
      project: projectWithParsedTags
    });

  } catch (error) {
    console.error('Error actualizando proyecto:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// DELETE /api/projects/:id - Eliminar proyecto (requiere autenticación)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar que el proyecto existe
    const existingProject = await prisma.project.findUnique({
      where: { id }
    });

    if (!existingProject) {
      return res.status(404).json({
        error: 'Proyecto no encontrado'
      });
    }

    // Eliminar proyecto
    await prisma.project.delete({
      where: { id }
    });

    res.json({
      message: 'Proyecto eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error eliminando proyecto:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// GET /api/projects/search?q=query - Buscar proyectos
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        error: 'Query de búsqueda requerida'
      });
    }

    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } }
        ]
      },
      orderBy: { createdAt: 'desc' }
    });

    // Parsear tags de JSON string a array
    const projectsWithParsedTags = projects.map(project => ({
      ...project,
      tags: JSON.parse(project.tags || '[]')
    }));

    res.json(projectsWithParsedTags);
  } catch (error) {
    console.error('Error buscando proyectos:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// GET /api/projects/tags/:tag - Obtener proyectos por tag
router.get('/tags/:tag', async (req, res) => {
  try {
    const { tag } = req.params;

    const projects = await prisma.project.findMany({
      where: {
        tags: { contains: tag }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Parsear tags de JSON string a array
    const projectsWithParsedTags = projects.map(project => ({
      ...project,
      tags: JSON.parse(project.tags || '[]')
    }));

    res.json(projectsWithParsedTags);
  } catch (error) {
    console.error('Error obteniendo proyectos por tag:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

export default router;
