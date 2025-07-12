/**
 * HUD Verification Module
 * Verifica y fuerza la visibilidad de elementos del HUD al cargar la página
 */

(function() {
  console.log('🚀 Iniciando verificación de elementos del HUD...');
  
  // Verificar elementos inmediatamente
  const elements = {
    hudOverlay: document.querySelector('.hud-overlay'),
    systemLog: document.getElementById('systemLog'),
    logContainer: document.getElementById('logContainer')
  };
  
  console.log('📋 Elementos encontrados:', elements);
  
  // Forzar visibilidad inmediatamente
  if (elements.hudOverlay) {
    elements.hudOverlay.style.cssText = `
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      pointer-events: none !important;
      z-index: 1000 !important;
      overflow: visible !important;
      opacity: 1 !important;
      visibility: visible !important;
    `;
    console.log('✅ HUD Overlay visible');
  }
  

  
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
      font-family: 'Share Tech Mono', monospace !important;
      font-size: 0.7rem !important;
      max-width: 300px !important;
      max-height: 120px !important;
      overflow: hidden !important;
    `;
    console.log('✅ System Log visible');
  }
  

  
  console.log('🎯 Verificación completada');
})(); 