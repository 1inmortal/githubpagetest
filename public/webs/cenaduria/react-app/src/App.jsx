import React, { useEffect } from 'react';
import './styles.css';

function GeneratedApp() {
  useEffect(() => {
    console.log('🚀 App montada, esperando librerías CDN...');
    
    // Función para verificar si las librerías están disponibles
    const checkLibsAvailable = () => {
      // GSAP puede estar en window.gsap o window.GSAP
      const gsapAvailable = typeof window.gsap !== 'undefined' || typeof window.GSAP !== 'undefined';
      // ScrollTrigger puede estar en window.ScrollTrigger o como plugin de GSAP
      const scrollTriggerAvailable = typeof window.ScrollTrigger !== 'undefined' || 
                                     (gsapAvailable && window.gsap?.plugins?.scrollTrigger);
      // Lenis puede estar en window.Lenis
      const lenisAvailable = typeof window.Lenis !== 'undefined';
      
      return { gsapAvailable, scrollTriggerAvailable, lenisAvailable };
    };
    
    // Esperar a que las librerías CDN se carguen o continuar después de un tiempo razonable
    let checkCount = 0;
    const maxChecks = 150; // 15 segundos máximo (150 * 100ms)
    
    const checkLibs = setInterval(() => {
      checkCount++;
      const libs = checkLibsAvailable();
      
      // Continuar si todas las librerías están disponibles o después de 3 segundos
      if ((libs.gsapAvailable && libs.scrollTriggerAvailable && libs.lenisAvailable) || checkCount >= 30) {
        clearInterval(checkLibs);
        
        if (checkCount >= 30 && (!libs.gsapAvailable || !libs.scrollTriggerAvailable || !libs.lenisAvailable)) {
          console.warn('⚠️ Algunas librerías CDN no se cargaron completamente:', libs);
          console.log('Continuando de todas formas...');
        } else {
          console.log('✅ Librerías CDN cargadas:', libs);
        }
        
        // Esperar a que React termine de renderizar el DOM completamente
        setTimeout(() => {
          // Verificar que los elementos existan antes de cargar el script
          const menuGrid = document.getElementById('menu-grid');
          const hero = document.querySelector('.hero');
          const loader = document.querySelector('.loader');
          
          if (menuGrid && hero && loader) {
            console.log('✅ DOM completamente renderizado, cargando script...');
            
            // Cargar el script de la app
            const script = document.createElement('script');
            script.src = './app-script.js';
            script.async = false;
            script.onload = () => {
              console.log('✅ Script de la app cargado y ejecutado');
            };
            script.onerror = (error) => {
              console.error('❌ Error al cargar app-script.js:', error);
            };
            document.body.appendChild(script);
          } else {
            console.warn('⚠️ Algunos elementos del DOM no encontrados, continuando:', {
              menuGrid: !!menuGrid,
              hero: !!hero,
              loader: !!loader
            });
            // Intentar cargar el script de todas formas
            const script = document.createElement('script');
            script.src = './app-script.js';
            script.async = false;
            document.body.appendChild(script);
          }
        }, 500); // Delay de 500ms para asegurar que React termine de renderizar
      }
    }, 100);
    
    // Timeout de seguridad
    const timeout = setTimeout(() => {
      clearInterval(checkLibs);
      const libs = checkLibsAvailable();
      console.warn('⚠️ Timeout alcanzado. Estado de librerías:', libs);
      console.log('Continuando de todas formas...');
    }, 15000);
    
    return () => {
      clearInterval(checkLibs);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div>
      {/* Cursor personalizado */}
      <div className="cursor-dot"></div>
      <div className="cursor-circle"></div>

      {/* Loader */}
      <div className="loader">
        <div className="loader-logo serif">Las Flores</div>
        <div style={{ width: '200px', height: '2px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
          <div className="loader-line"></div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="container nav-inner">
          <a href="#" className="logo serif" data-cursor="hover">Las Flores</a>
          <div className="magnetic-wrap">
            <a href="#menu" className="btn" data-cursor="hover">Reservar</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero" id="top">
        <div className="hero-bg-pattern"></div>
        <div className="container hero-content">
          <img src="./png/flores.png" alt="Las Flores" className="hero-logo" />
          <p className="hero-tagline accent-font">Estilo Mante • Desde 1985</p>
          <h1 className="split-text">Tradición<br />Viva</h1>
          <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <div className="magnetic-wrap">
              <a href="#menu" className="btn btn-primary" data-cursor="hover">Ver Menú</a>
            </div>
            <div className="magnetic-wrap">
              <a href="#footer" className="btn" data-cursor="hover">Ubicación</a>
            </div>
          </div>
        </div>
      </header>

      {/* Gallery */}
      <section className="gallery-wrapper" id="gallery">
        <div className="gallery-track">
          <div className="gallery-img">
            <img src="https://images.unsplash.com/photo-1599321955726-e04852be82d2?q=80&w=1000" alt="Platillo 1" loading="lazy" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', maxWidth: '500px', padding: '0 1rem' }}>
            <h2 className="serif" style={{ fontSize: '3rem', color: 'var(--mx-pink)', marginBottom: '1rem' }}>Raíces</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--ink)' }}>Nuestra cocina honra los ingredientes de la tierra. Cada tortilla es hecha a mano, cada salsa molcajeteada al momento.</p>
          </div>
          <div className="gallery-img">
            <img src="https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?q=80&w=1000" alt="Ambiente" loading="lazy" />
          </div>
          <div className="gallery-img">
            <img src="https://images.unsplash.com/photo-1568106690101-fd6822e876f6?q=80&w=1000" alt="Sopes" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="menu-section" id="menu">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="serif split-text" style={{ fontSize: '4rem', color: 'var(--mx-pink)' }}>La Carta</h2>
          </div>
          
          <div className="filters">
            <button className="filter-btn active" data-filter="all" data-cursor="hover">Todo</button>
            <button className="filter-btn" data-filter="antojitos" data-cursor="hover">Antojitos</button>
            <button className="filter-btn" data-filter="fuertes" data-cursor="hover">Platos Fuertes</button>
            <button className="filter-btn" data-filter="postres" data-cursor="hover">Dulces</button>
          </div>

          <div className="menu-grid" id="menu-grid">
            {/* El menú se genera dinámicamente con JavaScript */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-premium" id="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h2 className="serif" style={{ fontSize: '3rem', marginBottom: '2rem' }}>Visítanos</h2>
              <p className="accent-font" style={{ color: 'var(--gold)', marginBottom: '1rem' }}>Calle 4 #744, Col. Vista Hermosa</p>
              <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.8 }}>
                Abierto de 6:00 pm a 10:30 pm.<br />
                Reservaciones: 899 872 0238
              </p>
              <div className="magnetic-wrap">
                <a href="#" className="btn" data-cursor="hover">WhatsApp</a>
              </div>
            </div>
            <div className="map-container" data-cursor="hover">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1065.499766935871!2d-98.35684153852233!3d26.069532910377227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x866505aa03926f91%3A0x398bede07f56a8fc!2zQW50b2ppdG9zIOKAnExhcyBGbG9yZXPigJ0!5e0!3m2!1ses-419!2smx!4v1768966058355!5m2!1ses-419!2smx" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
            <p className="accent-font" style={{ fontSize: '0.8rem', opacity: 0.5 }}>© 2024 Las Flores. Tradición Mexicana.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default GeneratedApp;
