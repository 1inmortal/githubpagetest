// ProjectFilter.jsx - Sistema de filtros reactivo
import React, { useState, useMemo } from 'react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

const ProjectFilter = ({ projects = [] }) => {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const categories = [
    { key: 'all', label: 'Todos', icon: '🌐' },
    { key: 'Frontend', label: 'Frontend', icon: '🎨' },
    { key: 'Backend', label: 'Backend', icon: '⚙️' },
    { key: 'Fullstack', label: 'Fullstack', icon: '🚀' },
    { key: 'AI', label: 'AI/ML', icon: '🧠' },
    { key: 'UI/UX', label: 'UI/UX', icon: '✨' }
  ];
  
  const filteredProjects = useMemo(() => {
    if (filter === 'all') return projects;
    return projects.filter(project => project.clase === filter);
  }, [projects, filter]);
  
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };
  
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    // Reproducir sonido de filtro si está disponible
    try {
      const audio = document.querySelector('audio[id="hover"]');
      if (audio) {
        audio.currentTime = 0;
        audio.volume = 0.1;
        audio.play().catch(() => {});
      }
    } catch (e) {
      // Silencioso si falla
    }
  };

  return (
    <div className="projects-section-react">
      <div className="section-header">
        <h2>Archivo Central de Proyectos /// CyberLab_DB</h2>
        <div className="section-subtitle">
          <span className="section-indicator">ÍNDICE ALFABÉTICO</span>
          <span className="section-status">ACTIVO</span>
        </div>
      </div>
      
      <div className="filter-controls">
        <div className="filter-buttons">
          {categories.map(category => (
            <button
              key={category.key}
              className={`filter-btn ${filter === category.key ? 'active' : ''}`}
              onClick={() => handleFilterChange(category.key)}
              data-filter={category.key}
            >
              <span className="filter-icon">{category.icon}</span>
              <span className="filter-label">{category.label}</span>
              <span className="filter-count">
                {category.key === 'all' 
                  ? projects.length 
                  : projects.filter(p => p.clase === category.key).length
                }
              </span>
            </button>
          ))}
        </div>
        
        <div className="filter-info">
          <span className="filter-results">
            Mostrando {filteredProjects.length} de {projects.length} proyectos
          </span>
        </div>
      </div>
      
      <div className="projects-grid-react">
        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <ProjectCard 
              key={project.id}
              project={project}
              onClick={handleProjectClick}
            />
          ))
        ) : (
          <div className="no-projects">
            <div className="no-projects-icon">🔍</div>
            <h3>No se encontraron proyectos</h3>
            <p>No hay proyectos en la categoría "{categories.find(c => c.key === filter)?.label}"</p>
          </div>
        )}
      </div>
      
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default ProjectFilter;
