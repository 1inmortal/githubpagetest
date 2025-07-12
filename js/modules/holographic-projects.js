/**
 * Holographic Projects Archive Module
 * Sistema interactivo para el archivo de proyectos holográficos
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- ARCHIVO DE PROYECTOS HOLOGRÁFICOS ---
  const alphabeticIndex = document.getElementById('alphabeticIndex');
  const projectTableBody = document.getElementById('projectTableBody');
  const dataFlowContainer = document.getElementById('dataFlowContainer');
  const dataFlowCanvas = document.getElementById('dataFlowCanvas');
  const statisticsHud = document.getElementById('statisticsHud');
  const holographicPreviewPanel = document.getElementById('holographicPreviewPanel');
  const previewVideo = document.getElementById('previewVideo');
  const linesOfCodeElement = document.getElementById('linesOfCode');
  const techDistributionElement = document.getElementById('techDistribution');
  const panelProjectId = document.getElementById('panelProjectId');
  const panelProjectStatus = document.getElementById('panelProjectStatus');

  // Variables de estado
  let currentHoveredRow = null;
  let isAnimationActive = false;
  let audioContext = null;
  let gainNode = null;

  // Inicializar audio context
  function initAudio() {
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      gainNode = audioContext.createGain();
      gainNode.connect(audioContext.destination);
      gainNode.gain.value = 0.3;
    } catch (e) {
      console.log('Audio context no disponible');
    }
  }

  // Función para reproducir sonidos
  function playSound(frequency = 800, duration = 0.1, type = 'sine') {
    if (!audioContext) return;
    
    try {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      oscillator.connect(gain);
      gain.connect(gainNode);
      
      oscillator.frequency.value = frequency;
      oscillator.type = type;
      
      gain.gain.setValueAtTime(0.1, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
      console.log('Error reproduciendo sonido');
    }
  }

  // Función para crear flujo de datos en canvas
  function createDataFlow(startX, startY, endX, endY) {
    const ctx = dataFlowCanvas.getContext('2d');
    dataFlowCanvas.width = window.innerWidth;
    dataFlowCanvas.height = window.innerHeight;

    const particles = [];
    const numParticles = 20;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: startX,
        y: startY,
        vx: (endX - startX) / 30,
        vy: (endY - startY) / 30,
        life: 1,
        decay: 0.02
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, dataFlowCanvas.width, dataFlowCanvas.height);
      
      let activeParticles = 0;
      
      particles.forEach(particle => {
        if (particle.life > 0) {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.life -= particle.decay;
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 255, 255, ${particle.life})`;
          ctx.fill();
          
          activeParticles++;
        }
      });

      if (activeParticles > 0) {
        requestAnimationFrame(animateParticles);
      } else {
        ctx.clearRect(0, 0, dataFlowCanvas.width, dataFlowCanvas.height);
      }
    }

    animateParticles();
  }

  // Función para mostrar estadísticas HUD
  function showStatisticsHud(projectData) {
    const linesOfCode = parseInt(projectData.linesOfCode);
    const techDistribution = projectData.techDistribution.split(',').map(Number);
    const technologies = projectData.technologies.split(',');

    // Animar contador de líneas de código
    let currentLines = 0;
    const increment = linesOfCode / 50;
    const counterInterval = setInterval(() => {
      currentLines += increment;
      if (currentLines >= linesOfCode) {
        currentLines = linesOfCode;
        clearInterval(counterInterval);
      }
      linesOfCodeElement.textContent = Math.floor(currentLines);
    }, 20);

    // Crear gráfico de distribución de tecnologías
    techDistributionElement.innerHTML = '';
    technologies.forEach((tech, index) => {
      const percentage = techDistribution[index];
      const bar = document.createElement('div');
      bar.style.cssText = `
        height: ${percentage}%;
        background: var(--color-accent);
        margin: 2px;
        border-radius: 2px;
        transition: height 0.5s ease;
        position: relative;
        display: inline-block;
        width: 20px;
      `;
      bar.style.height = '0%';
      techDistributionElement.appendChild(bar);
      
      setTimeout(() => {
        bar.style.height = `${percentage}%`;
      }, index * 100);
    });

    // Mostrar HUD
    statisticsHud.classList.add('visible');
    playSound(600, 0.3, 'square');
  }

  // Función para mostrar panel holográfico
  function showHolographicPanel(projectData) {
    // Actualizar información del panel
    panelProjectId.textContent = projectData.projectId;
    panelProjectStatus.textContent = projectData.status;
    panelProjectStatus.className = `project-status status-${projectData.status.toLowerCase()}`;

    // Actualizar video
    previewVideo.src = projectData.videoSrc;
    previewVideo.poster = projectData.posterSrc;

    // Mostrar panel
    holographicPreviewPanel.classList.add('visible');

    // Reproducir video
    previewVideo.play().catch(error => {
      console.log('Autoplay bloqueado:', error);
    });

    playSound(800, 0.2, 'sawtooth');
  }

  // Función para ocultar todo
  function hideAll() {
    statisticsHud.classList.remove('visible');
    holographicPreviewPanel.classList.remove('visible');
    
    // Pausar video
    previewVideo.pause();
    previewVideo.src = '';
    previewVideo.poster = '';

    // Limpiar canvas
    const ctx = dataFlowCanvas.getContext('2d');
    ctx.clearRect(0, 0, dataFlowCanvas.width, dataFlowCanvas.height);
  }

  // Event listeners para filas de la tabla
  projectTableBody.addEventListener('mouseenter', function(e) {
    const row = e.target.closest('.table-row');
    if (!row || isAnimationActive) return;

    isAnimationActive = true;
    currentHoveredRow = row;

    const projectData = {
      projectId: row.dataset.projectId,
      videoSrc: row.dataset.videoSrc,
      posterSrc: row.dataset.posterSrc,
      title: row.dataset.title,
      description: row.dataset.description,
      technologies: row.dataset.technologies,
      linesOfCode: row.dataset.linesOfCode,
      techDistribution: row.dataset.techDistribution,
      status: row.querySelector('.cell:last-child').textContent
    };

    // Fase 1: Extracción de datos (0-0.5s)
    const rowRect = row.getBoundingClientRect();
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    createDataFlow(rowRect.left + rowRect.width / 2, rowRect.top + rowRect.height / 2, centerX, centerY);
    playSound(400, 0.5, 'sawtooth');

    // Fase 2: Panel de estadísticas (0.5-1.2s)
    setTimeout(() => {
      showStatisticsHud(projectData);
    }, 500);

    // Fase 3: Panel holográfico (1.2-1.5s)
    setTimeout(() => {
      statisticsHud.classList.remove('visible');
      setTimeout(() => {
        showHolographicPanel(projectData);
        isAnimationActive = false;
      }, 300);
    }, 1200);
  });

  // Event listener para mouseleave en la tabla
  projectTableBody.addEventListener('mouseleave', function(e) {
    if (currentHoveredRow && !isAnimationActive) {
      hideAll();
      currentHoveredRow = null;
      playSound(300, 0.2);
    }
  });

  // Event listeners para índice alfabético
  alphabeticIndex.addEventListener('click', function(e) {
    const letter = e.target.closest('.letter');
    if (!letter || letter.classList.contains('inactive')) return;

    const selectedLetter = letter.dataset.letter;
    playSound(500, 0.1);

    // Filtrar proyectos
    const rows = document.querySelectorAll('.table-row');
    let visibleCount = 0;

    rows.forEach(row => {
      const projectName = row.querySelector('.cell:nth-child(2)').textContent;
      if (projectName.includes(`PROYECTO: ${selectedLetter}`)) {
        row.style.display = 'grid';
        visibleCount++;
      } else {
        row.style.display = 'none';
      }
    });

    // Actualizar estado de letras
    document.querySelectorAll('.letter').forEach(l => {
      l.classList.remove('active');
    });
    letter.classList.add('active');

    // Mostrar mensaje de resultados
    console.log(`Proyectos encontrados para la letra ${selectedLetter}: ${visibleCount}`);
  });

  // Función para actualizar estado de letras del índice
  function updateAlphabeticIndex() {
    const rows = document.querySelectorAll('.table-row');
    const projectNames = Array.from(rows).map(row => 
      row.querySelector('.cell:nth-child(2)').textContent.split(': ')[1]
    );

    document.querySelectorAll('.letter').forEach(letter => {
      const letterChar = letter.dataset.letter;
      const hasProjects = projectNames.some(name => name.startsWith(letterChar));
      
      if (hasProjects) {
        letter.classList.remove('inactive');
      } else {
        letter.classList.add('inactive');
      }
    });
  }

  // Inicialización
  initAudio();
  updateAlphabeticIndex();

  // Manejar redimensionamiento
  window.addEventListener('resize', function() {
    if (dataFlowCanvas) {
      dataFlowCanvas.width = window.innerWidth;
      dataFlowCanvas.height = window.innerHeight;
    }
  });
}); 