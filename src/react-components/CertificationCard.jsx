// CertificationCard.jsx - Tarjeta de certificación
import React from 'react';

const CertificationCard = ({ certification, onClick }) => {
  const handleClick = () => {
    onClick(certification);
    // Reproducir sonido si está disponible
    try {
      const audio = document.querySelector('audio[id="hover"]');
      if (audio) {
        audio.currentTime = 0;
        audio.volume = 0.2;
        audio.play().catch(() => {});
      }
    } catch (e) {
      // Silencioso si falla
    }
  };

  return (
    <div 
      className="certification-card"
      onClick={handleClick}
      data-cert-id={certification.id}
    >
      <div className="cert-header">
        <div className="cert-logo-container">
          <img 
            src={certification.logo} 
            alt={certification.entidad}
            className="entity-logo"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="cert-title-section">
          <h3 className="cert-title">{certification.titulo}</h3>
          <span className="cert-entity">{certification.entidad}</span>
        </div>
      </div>
      
      <div className="cert-body">
        <p className="cert-description">{certification.descripcion}</p>
        
        <div className="cert-meta">
          <div className="cert-date">
            <span className="meta-label">Fecha:</span>
            <span className="meta-value">{certification.fecha}</span>
          </div>
          <div className="cert-id">
            <span className="meta-label">ID:</span>
            <span className="meta-value">{certification.id}</span>
          </div>
        </div>
        
        <div className="cert-skills">
          {certification.habilidades && certification.habilidades.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div className="cert-footer">
        <div className="cert-status">
          <span className={`status-badge ${certification.estado?.toLowerCase() || 'activo'}`}>
            {certification.estado || 'ACTIVO'}
          </span>
        </div>
        
        <div className="cert-actions">
          <button className="cert-btn">
            Ver Detalles
            <span className="btn-icon">→</span>
          </button>
        </div>
      </div>
      
      {certification.image && (
        <div className="cert-preview">
          <img 
            src={certification.image} 
            alt={certification.titulo}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
    </div>
  );
};

export default CertificationCard;
