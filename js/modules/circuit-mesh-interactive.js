/**
 * Circuit Mesh Interactive Module
 * Sistema completo de interactividad para la malla de circuitos
 */

document.addEventListener('DOMContentLoaded', function() {
  const circuitMeshLayer = document.getElementById('circuitMeshLayer');
  const circuitPattern = circuitMeshLayer.querySelector('.circuit-pattern');
  
  if (!circuitMeshLayer || !circuitPattern) return;

  // Variables para la interactividad
  let mouseX = 0;
  let mouseY = 0;
  let isMouseMoving = false;
  let mouseTimeout;

  // Función para crear pulsos adicionales basados en la posición del mouse
  function createMousePulse(x, y) {
    const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const startX = Math.max(0, x - 50);
    const startY = Math.max(0, y - 50);
    const endX = Math.min(800, x + 50);
    const endY = Math.min(600, y + 50);
    
    pulse.setAttribute('d', `M${startX},${startY} L${endX},${endY}`);
    pulse.setAttribute('stroke', 'var(--color-accent)');
    pulse.setAttribute('stroke-width', '2');
    pulse.setAttribute('fill', 'none');
    pulse.setAttribute('opacity', '0.6');
    pulse.setAttribute('stroke-dasharray', '100');
    pulse.setAttribute('stroke-dashoffset', '100');
    pulse.classList.add('mouse-pulse');
    
    // Animación del pulso
    pulse.style.animation = 'mouse-pulse-travel 2s linear forwards';
    
    circuitPattern.appendChild(pulse);
    
    // Remover el pulso después de la animación
    setTimeout(() => {
      if (pulse.parentNode) {
        pulse.parentNode.removeChild(pulse);
      }
    }, 2000);
  }

  // Event listeners para la interactividad
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseMoving = true;
    
    // Limpiar timeout anterior
    clearTimeout(mouseTimeout);
    
    // Crear pulso ocasionalmente durante el movimiento
    if (Math.random() < 0.1) { // 10% de probabilidad
      createMousePulse(mouseX, mouseY);
    }
    
    // Marcar como no moviéndose después de un tiempo
    mouseTimeout = setTimeout(() => {
      isMouseMoving = false;
    }, 100);
  });

  // Event listener para clicks
  document.addEventListener('click', function(e) {
    // Crear pulso más intenso en el punto de click
    createMousePulse(e.clientX, e.clientY);
    
    // Crear pulsos adicionales en puntos cercanos
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const offsetX = e.clientX + (Math.random() - 0.5) * 100;
        const offsetY = e.clientY + (Math.random() - 0.5) * 100;
        createMousePulse(offsetX, offsetY);
      }, i * 200);
    }
  });

  // Función para crear pulsos aleatorios automáticos
  function createRandomPulse() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    createMousePulse(x, y);
  }

  // Crear pulsos aleatorios cada cierto tiempo
  setInterval(createRandomPulse, 8000); // Cada 8 segundos

  // Función para ajustar la intensidad basada en el scroll
  function updateCircuitIntensity() {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    const intensity = 0.12 + (scrollPercent * 0.0005); // Aumentar ligeramente con el scroll
    circuitMeshLayer.style.opacity = Math.min(0.2, intensity);
  }

  // Event listener para scroll
  window.addEventListener('scroll', updateCircuitIntensity);

  // Función para crear efecto de "carga" al cargar la página
  function createInitialPulses() {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        createMousePulse(x, y);
      }, i * 300);
    }
  }

  // Ejecutar pulsos iniciales después de un breve delay
  setTimeout(createInitialPulses, 1000);

  // ============================================================
  // AUDIO VISUALIZER SYSTEM
  // ============================================================


  // ============================================================
  // SYSTEM LOG SYSTEM
  // ============================================================
  const logContainer = document.getElementById('logContainer');
  const maxLogMessages = 5;

  function addLogMessage(message) {
    if (!logContainer) return;

    const logMessage = document.createElement('div');
    logMessage.className = 'log-message';
    logMessage.textContent = `// ${message}`;
    
    logContainer.appendChild(logMessage);
    
    // Mantener solo el número máximo de mensajes
    const messages = logContainer.querySelectorAll('.log-message');
    if (messages.length > maxLogMessages) {
      const oldestMessage = messages[0];
      oldestMessage.classList.add('fade-out');
      setTimeout(() => {
        if (oldestMessage.parentNode) {
          oldestMessage.parentNode.removeChild(oldestMessage);
        }
      }, 300);
    }
  }

  // ============================================================
  // ACHIEVEMENT SYSTEM
  // ============================================================
  const achievements = {
    explorer: { id: 'explorer', name: 'Explorador de la Matriz', description: 'Visitar todas las secciones principales', unlocked: false },
    tinkerer: { id: 'tinkerer', name: 'Tinkerer', description: 'Cambiar tema e idioma del sistema', unlocked: false },
    archivist: { id: 'archivist', name: 'Archivista', description: 'Descargar el CV del sistema', unlocked: false },
    deep_diver: { id: 'deep_diver', name: 'Deep Diver', description: 'Llegar al final de la página', unlocked: false },
    sound_maestro: { id: 'sound_maestro', name: 'Sound Maestro', description: 'Interactuar con el sistema de audio', unlocked: false }
  };

  let visitedSections = new Set();
  let themeChanged = false;
  let languageChanged = false;
  let cvDownloaded = false;
  let reachedBottom = false;
  let soundInteracted = false;

  function loadAchievements() {
    const savedAchievements = localStorage.getItem('portfolioAchievements');
    if (savedAchievements) {
      const saved = JSON.parse(savedAchievements);
      Object.keys(saved).forEach(key => {
        if (achievements[key]) {
          achievements[key].unlocked = saved[key];
        }
      });
    }
  }

  function saveAchievements() {
    const achievementsToSave = {};
    Object.keys(achievements).forEach(key => {
      achievementsToSave[key] = achievements[key].unlocked;
    });
    localStorage.setItem('portfolioAchievements', JSON.stringify(achievementsToSave));
  }

  function unlockAchievement(achievementId) {
    if (!achievements[achievementId] || achievements[achievementId].unlocked) return;
    
    achievements[achievementId].unlocked = true;
    saveAchievements();
    
    // Actualizar visualización del logro
    updateAchievementDisplay(achievementId);
    
    // Mostrar notificación
    showAchievementNotification(achievements[achievementId].name);
    addLogMessage(`LOGRO_DESBLOQUEADO: ${achievements[achievementId].name}`);
    
    console.log(`🏆 Logro desbloqueado: ${achievements[achievementId].name}`);
  }

  function updateAchievementDisplay(achievementId) {
    const achievementElement = document.querySelector(`[data-achievement="${achievementId}"]`);
    if (!achievementElement) return;
    
    const iconElement = achievementElement.querySelector('.achievement-icon');
    const statusText = achievementElement.querySelector('p');
    
    if (iconElement) {
      iconElement.textContent = '🏆';
      iconElement.style.animation = 'achievement-pulse 2s infinite';
    }
    
    if (statusText) {
      statusText.textContent = statusText.textContent.replace('[Status: LOCKED]', '[Status: UNLOCKED]');
    }
    
    // Agregar efecto visual
    achievementElement.style.borderColor = 'var(--color-accent)';
    achievementElement.style.boxShadow = '0 0 15px var(--color-accent-glow)';
  }

  function loadAchievementDisplays() {
    Object.keys(achievements).forEach(achievementId => {
      if (achievements[achievementId].unlocked) {
        updateAchievementDisplay(achievementId);
      }
    });
  }

  function showAchievementNotification(achievementName) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
      <div class="achievement-content">
        <span class="achievement-icon">🏆</span>
        <span class="achievement-text">[LOGRO DESBLOQUEADO]: ${achievementName}</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Reproducir sonido de logro
    playSound('complete', 0.3);
    
    // Remover después de 3 segundos
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  }

  // ============================================================
  // ACHIEVEMENT TRACKING
  // ============================================================
  
  // Tracking de secciones visitadas
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        if (sectionId && !visitedSections.has(sectionId)) {
          visitedSections.add(sectionId);
          addLogMessage(`NAV_TARGET_ACQUIRED: #${sectionId}`);
          
          // Verificar logro de explorador
          const mainSections = ['hero', 'about', 'skills', 'proyectos', 'timeline', 'achievements', 'certificados', 'process', 'blog'];
          if (mainSections.every(section => visitedSections.has(section))) {
            unlockAchievement('explorer');
          }
        }
      }
    });
  }, observerOptions);

  // Observar secciones principales
  document.querySelectorAll('.section-container').forEach(section => {
    sectionObserver.observe(section);
  });

  // Tracking de cambios de tema e idioma
  const themeToggle = document.getElementById('themeToggle');
  const langToggle = document.getElementById('langToggle');
  const muteButton = document.getElementById('muteButton');
  const downloadButtons = document.querySelectorAll('.download-trigger');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      themeChanged = true;
      addLogMessage('VISUAL_MODE_SWITCH: light_protocol_engaged');
      
      if (themeChanged && languageChanged) {
        unlockAchievement('tinkerer');
      }
    });
  }

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      languageChanged = true;
      addLogMessage('LANGUAGE_SWITCH: protocol_engaged');
      
      if (themeChanged && languageChanged) {
        unlockAchievement('tinkerer');
      }
    });
  }

  // Tracking de descarga de CV
  downloadButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (!cvDownloaded) {
        cvDownloaded = true;
        unlockAchievement('archivist');
        addLogMessage('CV_DOWNLOAD: Archivo descargado');
      }
    });
  });

  // Tracking de scroll al final
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    if (scrollPercent > 95 && !reachedBottom) {
      reachedBottom = true;
      unlockAchievement('deep_diver');
      addLogMessage('SCROLL_DEPTH: Bottom_reached');
    }
  });

  // Tracking de interacción con sonido
  if (muteButton) {
    muteButton.addEventListener('click', () => {
      if (!soundInteracted) {
        soundInteracted = true;
        unlockAchievement('sound_maestro');
      }
    });
  }

  // ============================================================
  // INITIALIZATION
  // ============================================================
  
  // Cargar logros al inicio
  loadAchievements();
  loadAchievementDisplays();
  
  // Debug: Verificar que los elementos existen
  console.log('🔍 Debug - Elementos del HUD:');
  console.log('System Log:', document.getElementById('systemLog'));
  console.log('Log Container:', document.getElementById('logContainer'));
  
  // Forzar visibilidad de elementos
  const systemLog = document.getElementById('systemLog');
  
  if (systemLog) {
    systemLog.style.display = 'block';
    systemLog.style.opacity = '1';
    systemLog.style.visibility = 'visible';
    systemLog.style.background = 'rgba(0, 0, 0, 0.9)';
    systemLog.style.border = '2px solid #00ffaa';
    systemLog.style.color = '#00ffaa';
    console.log('✅ System Log visible');
    
    // Agregar mensaje de prueba inmediatamente
    setTimeout(() => {
      addLogMessage('TEST: Sistema de log funcionando');
      addLogMessage('TEST: Elementos del HUD visibles');
    }, 100);
  }
  


  // Mensaje inicial del sistema
  setTimeout(() => {
    addLogMessage('SYSTEM_BOOT_COMPLETE: Welcome, user');
    addLogMessage('DEBUG: Sistema de logros activo');
  }, 2000);

  // Logs adicionales para mejorar la experiencia
  document.addEventListener('click', (e) => {
    if (e.target.closest('.nav-link')) {
      const href = e.target.closest('.nav-link').getAttribute('href');
      if (href && href.startsWith('#')) {
        addLogMessage(`NAV_TARGET_ACQUIRED: ${href}`);
      }
    }
  });

  // Log cuando se cambia el tema
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      setTimeout(() => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        addLogMessage(`VISUAL_MODE_SWITCH: ${currentTheme}_protocol_engaged`);
      }, 100);
    });
  }

  // Log cuando se descarga CV
  document.querySelectorAll('a[download]').forEach(link => {
    link.addEventListener('click', () => {
      addLogMessage('CV_DOWNLOAD: Archivo descargado');
    });
  });

  // Script de prueba adicional
  setTimeout(() => {
    console.log('🔍 Verificación final de elementos:');
    const elements = {
      systemLog: document.getElementById('systemLog'),
      logContainer: document.getElementById('logContainer')
    };
    
    Object.entries(elements).forEach(([name, element]) => {
      if (element) {
        console.log(`✅ ${name}:`, element);
        console.log(`   - Visible:`, element.style.display !== 'none' && element.style.visibility !== 'hidden');
        console.log(`   - Opacity:`, element.style.opacity);
        console.log(`   - Position:`, element.style.position);
        console.log(`   - Z-index:`, element.style.zIndex);
      } else {
        console.log(`❌ ${name}: No encontrado`);
      }
    });
    
    if (elements.systemLog) {
      elements.systemLog.style.cssText = `
        position: absolute !important;
        bottom: 60px !important;
        left: 15px !important;
        display: block !important;
        opacity: 1 !important;
        visibility: visible !important;
        background: rgba(0, 0, 0, 0.9) !important;
        border: 2px solid #00ffaa !important;
        color: #00ffaa !important;
        z-index: 1001 !important;
      `;
    }
    
    // Agregar mensajes de prueba al log
    if (elements.systemLog && elements.logContainer) {
      const testMessages = [
        'TEST: Sistema de log funcionando',
        'TEST: Elementos del HUD visibles',
        'TEST: Interfaz cyberpunk activa'
      ];
      
      testMessages.forEach((msg, index) => {
        setTimeout(() => {
          addLogMessage(msg);
        }, index * 500);
      });
    }
    
  }, 1000);

}); 