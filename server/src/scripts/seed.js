/**
 * Script de seed para poblar la base de datos
 * @author INMORTAL_OS
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  try {
    // Crear usuario administrador
    console.log('👤 Creando usuario administrador...');
    const adminPassword = await bcrypt.hash('admin123', 12);
    
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@inmortal.com' },
      update: {},
      create: {
        email: 'admin@inmortal.com',
        passwordHash: adminPassword,
        role: 'admin'
      }
    });
    console.log('✅ Usuario administrador creado:', adminUser.email);

    // Crear proyectos de ejemplo
    console.log('🚀 Creando proyectos de ejemplo...');
    
    const projects = [
      {
        title: 'PROYECTO: CERBERUS',
        description: 'Este menú está diseñado para ofrecer una experiencia segura y amigable con autenticación biométrica avanzada.',
        tags: ['HTML', 'CSS', 'JS', 'Biometrics'],
        url: 'https://github.com/1inmortal/cerberus'
      },
      {
        title: 'PROYECTO: SPHERE',
        description: 'Una experiencia única con nuestra interfaz esférica intuitiva y dinámica que revoluciona la navegación web.',
        tags: ['Three.js', 'WebGL', 'UI', '3D'],
        url: 'https://github.com/1inmortal/sphere'
      },
      {
        title: 'PROYECTO: NEURAL',
        description: 'Landing page con tipografía deformable y espectros cromáticos, impulsada por inteligencia artificial.',
        tags: ['AI', 'JS', 'Canvas', 'Creative Coding'],
        url: 'https://github.com/1inmortal/neural'
      },
      {
        title: 'PROYECTO: HOLOGRAPH',
        description: 'Sistema avanzado de visualización de datos neuronales con interfaz holográfica y análisis en tiempo real.',
        tags: ['Neural Networks', 'Data Viz', 'Real-time', 'Holographic UI'],
        url: 'https://github.com/1inmortal/holograph'
      }
    ];

    for (const projectData of projects) {
      // Verificar si el proyecto ya existe
      const existingProject = await prisma.project.findFirst({
        where: { title: projectData.title }
      });
      
      if (!existingProject) {
        const project = await prisma.project.create({
          data: {
            title: projectData.title,
            description: projectData.description,
            tags: JSON.stringify(projectData.tags),
            url: projectData.url
          }
        });
        console.log(`✅ Proyecto creado: ${project.title}`);
      } else {
        console.log(`⏭️  Proyecto ya existe: ${projectData.title}`);
      }
    }

    // Crear certificaciones de ejemplo
    console.log('🏆 Creando certificaciones de ejemplo...');
    
    const certifications = [
      {
        name: 'Certificación en Ciberseguridad',
        issuer: 'Cisco',
        issuedAt: new Date('2024-01-15'),
        url: 'https://verify.cisco.com/cert/example'
      },
      {
        name: 'Generative AI - Elevate your Software Development',
        issuer: 'Microsoft',
        issuedAt: new Date('2024-03-20'),
        url: 'https://verify.microsoft.com/cert/example'
      },
      {
        name: 'Getting Started with Git and GitHub',
        issuer: 'GitHub',
        issuedAt: new Date('2024-02-10'),
        url: 'https://verify.github.com/cert/example'
      },
      {
        name: 'AWS Cloud Practitioner',
        issuer: 'Amazon Web Services',
        issuedAt: new Date('2024-04-05'),
        url: 'https://verify.aws.amazon.com/cert/example'
      },
      {
        name: 'React Developer Certification',
        issuer: 'Meta',
        issuedAt: new Date('2024-05-12'),
        url: 'https://verify.meta.com/cert/example'
      },
      {
        name: 'Docker Certified Associate',
        issuer: 'Docker',
        issuedAt: new Date('2024-06-18'),
        url: 'https://verify.docker.com/cert/example'
      }
    ];

    for (const certData of certifications) {
      const certification = await prisma.certification.upsert({
        where: { 
          name_issuer: {
            name: certData.name,
            issuer: certData.issuer
          }
        },
        update: {},
        create: {
          name: certData.name,
          issuer: certData.issuer,
          issuedAt: certData.issuedAt,
          url: certData.url
        }
      });
      console.log(`✅ Certificación creada: ${certification.name} - ${certification.issuer}`);
    }

    console.log('🎉 Seed completado exitosamente!');
    console.log('\n📋 Resumen:');
    console.log(`   - Usuarios: 1`);
    console.log(`   - Proyectos: ${projects.length}`);
    console.log(`   - Certificaciones: ${certifications.length}`);
    console.log('\n🔑 Credenciales de administrador:');
    console.log(`   - Email: admin@inmortal.com`);
    console.log(`   - Contraseña: admin123`);

  } catch (error) {
    console.error('❌ Error durante el seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar seed
main()
  .catch((e) => {
    console.error('❌ Error fatal:', e);
    process.exit(1);
  });
