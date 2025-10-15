// ============================================================================
// ORDEN Y FLUJO DEL ARCHIVO (Guía rápida para mantenimiento)
// 1) Configuración general y dependencias (React vía ESM import)
// 2) Configuración de backend (PocketBase URL, WhatsApp)
// 3) Funciones de conexión (fetch a PocketBase vía REST: categorías/productos)
// 4) Datos estáticos de respaldo (servicios, banners, testimonios)
// 5) Componentes UI en orden de aparición:
//    - Header
//    - BannerCarousel
//    - ServiciosGrid (dinámico + modal)
//    - TrustBadges
//    - LocationSection
//    - ContactForm (POST solo a backend: window.BACKEND_URL/contacto)
//    - TestimonialsSection
//    - Footer
// 6) Componente raíz App que orquesta todo el layout
// 7) Exponer App en window para render desde index.html
// Nota: window.BACKEND_URL se define en index.html. Este frontend no envía correos;
//       solo inserta vía backend y el backend dispara el email.
// ============================================================================
import React, { useState, useEffect } from 'react';

// ================================================================================
// CONFIGURACIÓN INICIAL Y DEPENDENCIAS
// ================================================================================

// ================================================================================
// CONFIGURACIÓN DE POCKETBASE BACKEND
// ================================================================================
const POCKETBASE_URL = 'https://zonagraficapd.ezhostingit.com';
const WHATSAPP_PHONE = '528998737313';

// ================================================================================
// FUNCIONES DE CONEXIÓN CON POCKETBASE BACKEND
// ==============================================================================

/**
 * OBTENER CATEGORÍAS DESDE POCKETBASE
 * Función para obtener categorías de servicios desde el backend
 * Endpoint: /api/collections/categorias/records
 * @returns {Array} Array de categorías o array vacío si hay error
 */
async function obtenerCategorias() {
  try {
    const response = await fetch(`${POCKETBASE_URL}/api/collections/categorias/records`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error obteniendo categorías:', error);
    return [];
  }
}

/**
 * OBTENER PRODUCTOS DESDE POCKETBASE
 * Función para obtener productos desde el backend
 * Endpoint: /api/collections/productos/records
 * @returns {Array} Array de productos o array vacío si hay error
 */
async function obtenerProductos() {
  try {
    const response = await fetch(`${POCKETBASE_URL}/api/collections/productos/records`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    return [];
  }
}

/**
 * OBTENER PRODUCTOS POR CATEGORÍA (USANDO ID) DESDE POCKETBASE
 * @param {string} categoriaId ID de la categoría (relación en productos.categoria)
 * @returns {Array<string>} Lista de nombres de productos
 */
async function obtenerProductosPorCategoria(categoriaId) {
  const id = (categoriaId || '').toString().trim();
  if (!id) return [];
  try {
    const filter = encodeURIComponent(`categoria='${id}'`);
    const response = await fetch(`${POCKETBASE_URL}/api/collections/productos/records?filter=(${filter})&perPage=200`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    const items = Array.isArray(data.items) ? data.items : [];
    return items
      .map(p => p.nombre || p.name || p.titulo || p.title)
      .filter(Boolean);
  } catch (error) {
    console.error('Error obteniendo productos por categoría (ID):', id, error);
    return [];
  }
}

// ================================================================================
// DATOS ESTÁTICOS Y CONFIGURACIÓN
// ================================================================================

// Normaliza rutas de assets para GitHub Pages.
// Calcula la base pública removiendo el sufijo 'dist/' de import.meta.env.BASE_URL.
const __BASE_URL__ = (typeof importmeta !== 'undefined' ? importmeta : import.meta) && import.meta && import.meta.env && import.meta.env.BASE_URL
  ? import.meta.env.BASE_URL
  : '/';
const __PUBLIC_BASE__ = __BASE_URL__.replace(/dist\/?$/, '');
const asset = (relativePath) => `${__PUBLIC_BASE__}${String(relativePath).replace(/^\/?/, '')}`;

// Servicios de respaldo (fallback)
const servicios = [
  { id: 1, nombre: 'Gran Formato', icono: asset('img/web%205/servicios/gran-formato.png'), descripcion: 'Impresiones de gran formato para publicidad exterior' },
  { id: 2, nombre: 'Imprenta', icono: asset('img/web%205/iconos/imprenta.png'), descripcion: 'Servicios de imprenta tradicional y digital' },
  { id: 3, nombre: 'Estampados', icono: asset('img/web%205/servicios/estampados.png'), descripcion: 'Estampados en playeras, gorras y textiles' },
  { id: 4, nombre: 'Grabados', icono: asset('img/web%205/servicios/grabados.png'), descripcion: 'Grabados en láser y corte de precisión' },
  { id: 5, nombre: 'Letreros', icono: asset('img/web%205/servicios/letreros.png'), descripcion: 'Letreros luminosos y señalización' },
  { id: 6, nombre: 'Diseño', icono: asset('img/web%205/servicios/diseno.png'), descripcion: 'Servicios de diseño gráfico profesional' }
];

// Banners de publicidad
const banners = [
  asset('img/web%205/ofertas/digital-printing-trends-Ghana-1.png'),
  asset('img/web%205/ofertas/tendecia.webp'),
  asset('img/web%205/ofertas/Tendencias-en-Diseno-Grafico.jpg'),
  asset('img/web%205/ofertas/vinil.jpg'),
  asset('img/web%205/portada.jpeg')
];

// Testimonios
const testimonios = [
  {
    id: 1,
    texto: 'Excelente servicio y calidad en sus trabajos. Muy recomendable para cualquier proyecto gráfico.',
    autor: 'María González',
    empresa: 'Restaurante El Buen Sabor',
    avatar: asset('img/web%205/WhatsApp%20Image%202025-10-06%20at%2010.06.42%20AM%20(8).jpeg'),
    calificacion: 5
  },
  {
    id: 2,
    texto: 'Profesionales y puntuales. El resultado superó nuestras expectativas completamente.',
    autor: 'Carlos Rodríguez',
    empresa: 'Farmacia San Miguel',
    avatar: asset('img/web%205/WhatsApp%20Image%202025-10-06%20at%2010.06.42%20AM%20(7).jpeg'),
    calificacion: 5
  },
  {
    id: 3,
    texto: 'La mejor opción en Reynosa para servicios gráficos. Calidad y precio justo.',
    autor: 'Ana Martínez',
    empresa: 'Boutique Elegance',
    avatar: asset('img/web%205/WhatsApp%20Image%202025-10-06%20at%2010.06.42%20AM%20(4).jpeg'),
    calificacion: 5
  }
];

// ================================================================================
// COMPONENTES REACT
// ================================================================================

/**
 * COMPONENTE HEADER
 * Header fijo con navegación responsive, logo y botones de acción
 * - Navegación principal con enlaces a secciones
 * - Menú móvil con panel deslizable
 * - Botones de WhatsApp y teléfono
 * - Efectos de scroll para ocultar/mostrar header
 */
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  useEffect(() => {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderHidden(true);
      } else {
        setIsHeaderHidden(false);
      }
      
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="topbar"></div>
      <div className="infobar">
        <div className="infobar-inner">
          <div className="left">
            <div className="item">
              <span className="i mail"></span>
              <span>zgrafica.mx@gmail.com</span>
            </div>
            <div className="item">
              <span className="i clock"></span>
              <span>Lun–Vie 9:00–18:00</span>
            </div>
          </div>
          <div className="right">
            <div className="item">
              <span className="i lock"></span>
              <span>Privacidad y pagos seguros</span>
            </div>
          </div>
        </div>
      </div>
      <header className={`header ${isHeaderHidden ? 'hidden' : ''}`}>
        <div className="header-inner">
          <div className="logo">
            <img 
              className="logo-img" 
              src="https://zonagraficapd.ezhostingit.com/api/files/logos/2l093oa950g2vl2/cabecera_awhf16wd05.jpeg" 
              alt="Zona Gráfica"
            />
          </div>
          <nav className="nav">
            <a href="#servicios">Servicios</a>
            <a href="#ubicacion">Ubicación</a>
            <a href="#cotiza">Cotiza</a>
            <a href="#contacto">Contacto</a>
          </nav>
          <div className="header-cta">
            <a 
              className="wa-btn" 
              href={`https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}`}
              target="_blank" 
              rel="noopener"
              title="WhatsApp: +52 899 873 7313"
            >
              <span style={{display: 'inline-flex', width: 24, height: 24, background: `url(${asset('img/web%205/iconos/whatsapp.png')}) center/contain no-repeat`}}></span>
            </a>
            <a className="login-btn" href="https://zonagraficapd.ezhostingit.com/_/#/collections?collection=_pb_users_auth_&filter=&sort=-%40rowid" rel="noopener">
              <span>Login</span>
            </a>
          </div>
          <button 
            className="menu-btn" 
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            id="menuBtn"
            aria-controls="mobilePanel"
          >
            ☰
          </button>
        </div>
        <div className={`mobile-panel ${isMenuOpen ? 'open' : ''}`} id="mobilePanel">
          <a href="#servicios" onClick={() => setIsMenuOpen(false)}>Servicios</a>
          <a href="#ubicacion" onClick={() => setIsMenuOpen(false)}>Ubicación</a>
          <a href="#cotiza" onClick={() => setIsMenuOpen(false)}>Cotiza</a>
          <a href="#contacto" onClick={() => setIsMenuOpen(false)}>Contacto</a>
          <a 
            href={`https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}`}
            target="_blank"
            rel="noopener"
            title="WhatsApp: +52 899 873 7313"
            onClick={() => setIsMenuOpen(false)}
          >WhatsApp</a>
        </div>
      </header>
    </>
  );
}

/**
 * COMPONENTE BANNER CAROUSEL
 * Carrusel principal con productos destacados y banners promocionales
 * - Integración con Swiper.js para funcionalidad de carrusel
 * - Navegación automática y manual
 * - Indicadores de paginación
 * - Botones de llamada a la acción
 */
function BannerCarousel() {
  useEffect(() => {
    // Inicializar Swiper cuando el componente se monte
    const swiper = new window.Swiper('.swiper', {
      loop: true,
      autoplay: { delay: 3500, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
    });

    return () => {
      if (swiper) swiper.destroy();
    };
  }, []);

  return (
    <section className="hero">
      <div className="container">
        <div className="swiper">
          <div className="swiper-wrapper">
            {banners.map((src, i) => (
              <div key={i} className="swiper-slide">
                <div className="card">
                  <img src={src} alt={`Banner ${i+1}`} />
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-pagination"></div>
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </div>
      </div>
    </section>
  );
}

/**
 * COMPONENTE SERVICIOS GRID
 * Grid de servicios con integración PocketBase y carrusel móvil
 * - Carga dinámica de servicios desde PocketBase
 * - Fallback a datos estáticos si falla la conexión
 * - Grid responsive para desktop
 * - Carrusel Swiper para móviles
 * - Modal para mostrar detalles del servicio
 */
function ServiciosGrid() {
  const [modal, setModal] = useState({ open: false, servicio: null });
  const [serviciosActuales, setServiciosActuales] = useState(servicios.map(s => ({ ...s, productos: [] })));
  const [cargando, setCargando] = useState(true);
  const [swiperInit, setSwiperInit] = useState(false);

  // Mapeo de iconos/descr por nombre de categoría (fallback si PocketBase no trae campos)
  const mapCategoriaExtras = (nombre) => {
    const upper = (nombre || '').toString().trim().toUpperCase();
    switch (upper) {
      case 'GRAN FORMATO':
        return { 
          icono: asset('img/web%205/iconos/gran_formato_.png'), 
          descripcion: 'Lonas, microperforado, vinil, backlite y más.',
          imgs: [
            'img/web%205/ofertas/digital-printing-trends-Ghana-1.png',
            'img/web%205/ofertas/tendecia.webp',
            'img/web%205/ofertas/vinil.jpg'
          ]
        };
      case 'IMPRENTA':
        return { 
          icono: asset('img/web%205/iconos/imprenta.png'), 
          descripcion: 'Impresión tradicional y digital.',
          imgs: [
            'img/web%205/ofertas/vinil.jpg',
            'img/web%205/ofertas/Tendencias-en-Diseno-Grafico.jpg',
            'img/web%205/ofertas/tendecia.webp'
          ]
        };
      case 'ESTAMPADOS':
        return { 
          icono: asset('img/web%205/iconos/estampados.png'), 
          descripcion: 'Playeras, gorras y textil personalizado.',
          imgs: [
            'img/web%205/ofertas/tendecia.webp',
            'img/web%205/ofertas/Tendencias-en-Diseno-Grafico.jpg',
            'img/web%205/ofertas/vinil.jpg'
          ]
        };
      case 'RÍGIDOS':
      case 'RIGIDOS':
        return { 
          icono: asset('img/web%205/iconos/rigidos.png'), 
          descripcion: 'Letreros rígidos, displays y señalética.',
          imgs: [
            'img/web%205/ofertas/Tendencias-en-Diseno-Grafico.jpg',
            'img/web%205/ofertas/digital-printing-trends-Ghana-1.png',
            'img/web%205/ofertas/tendecia.webp'
          ]
        };
      case 'PROMOCIONALES':
        return { 
          icono: asset('img/web%205/iconos/promocionales.png'), 
          descripcion: 'Merchandising y regalos corporativos.',
          imgs: [
            'img/web%205/ofertas/vinil.jpg',
            'img/web%205/ofertas/Tendencias-en-Diseno-Grafico.jpg',
            'img/web%205/ofertas/tendecia.webp'
          ]
        };
      case 'DISEÑO':
        return { 
          icono: asset('img/web%205/iconos/diseño.png'), 
          descripcion: 'Identidad, branding y creatividad visual.',
          imgs: [
            'img/web%205/ofertas/tendecia.webp',
            'img/web%205/ofertas/Tendencias-en-Diseno-Grafico.jpg',
            'img/web%205/ofertas/vinil.jpg'
          ]
        };
      case 'OTROS PRODUCTOS Y SERVICIOS':
        return { 
          icono: asset('img/web%205/iconos/otros%20productos.png'), 
          descripcion: 'Soluciones personalizadas y servicios adicionales.',
          imgs: [
            'img/web%205/ofertas/Tendencias-en-Diseno-Grafico.jpg',
            'img/web%205/ofertas/digital-printing-trends-Ghana-1.png',
            'img/web%205/ofertas/tendecia.webp'
          ]
        };
      default:
        return { icono: asset('img/web%205/servicios/default.png'), descripcion: 'Servicio profesional.', imgs: [] };
    }
  };

  useEffect(() => {
    // Cargar categorías y productos desde PocketBase y fusionar
    const cargarServicios = async () => {
      try {
        const [categorias, productos] = await Promise.all([
          obtenerCategorias(),
          obtenerProductos()
        ]);

        if (categorias.length > 0) {
          const serviciosPocketBase = categorias.map(cat => {
            const nombre = cat.nombre || cat.name;
            const extras = mapCategoriaExtras(nombre);
            return {
              id: cat.id,
              nombre,
              icono: cat.icono || cat.image || extras.icono,
              descripcion: cat.descripcion || cat.description || extras.descripcion,
              productos: [],
              imgs: Array.isArray(cat.imgs) ? cat.imgs : (extras.imgs || [])
            };
          });

          // Agrupar productos por categoría usando ID de relación
          if (Array.isArray(productos) && productos.length > 0) {
            productos.forEach(p => {
              const categoriaIdProducto = p.categoria || p.categoryId || p.categoria_id;
              const nombreProducto = p.nombre || p.name || p.titulo || p.title;
              if (!categoriaIdProducto || !nombreProducto) return;
              const servicio = serviciosPocketBase.find(s => (s.id || '').toString() === (categoriaIdProducto || '').toString());
              if (servicio) {
                servicio.productos.push(nombreProducto);
              }
            });
          }

          setServiciosActuales(serviciosPocketBase);
        }
      } catch (error) {
        console.error('Error cargando servicios/productos:', error);
        // Mantener servicios de fallback
      } finally {
        setCargando(false);
      }
    };

    cargarServicios();
  }, []);

  const abrirModal = async (servicio) => {
    // Abrir rápido con datos locales
    setModal({ open: true, servicio });
    // Intentar enriquecer productos desde backend por categoría
    try {
      const productosCat = await obtenerProductosPorCategoria(servicio?.id);
      if (Array.isArray(productosCat) && productosCat.length > 0) {
        setModal(prev => ({ 
          ...prev, 
          servicio: { ...prev.servicio, productos: productosCat }
        }));
      }
    } catch (_) {}
  };

  const cerrarModal = () => {
    setModal({ open: false, servicio: null });
  };

  // Inicializar Swiper del carrusel móvil al tener datos
  useEffect(() => {
    if (!cargando && !swiperInit && typeof window !== 'undefined' && window.Swiper) {
      try {
        // eslint-disable-next-line no-new
        new window.Swiper('.servicios-swiper', {
          slidesPerView: 2,
          spaceBetween: 10,
          pagination: { el: '.servicios-carousel .swiper-pagination', clickable: true },
          touchRatio: 1,
          grabCursor: true,
          breakpoints: {
            320: { slidesPerView: 1.6, spaceBetween: 10 },
            480: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 12 }
          }
        });
        setSwiperInit(true);
      } catch (_) {}
    }
  }, [cargando, swiperInit, serviciosActuales]);

  return (
    <section id="servicios" className="section">
      <div className="container">
        <div className="title-wrap">
          <div className="line"></div>
          <h2>Nuestros Servicios</h2>
          <div className="line"></div>
        </div>
        <p className="subtitle">Soluciones gráficas profesionales para tu negocio</p>
        
        {cargando ? (
          <div className="loading-services">Cargando servicios...</div>
        ) : (
          <>
            <div className="servicios-grid-desktop">
              {serviciosActuales.map(servicio => (
                <div 
                  key={servicio.id} 
                  className="service"
                  onClick={() => abrirModal(servicio)}
                >
                  <img src={servicio.icono} alt={servicio.nombre} />
                  <b>{servicio.nombre}</b>
                </div>
              ))}
            </div>
            
            {/* Vista móvil: carrusel Swiper */}
            <div className="servicios-carousel">
              <div className="swiper servicios-swiper">
                <div className="swiper-wrapper">
                  {serviciosActuales.map((servicio, idx) => (
                    <div className="swiper-slide" key={servicio.id || idx}>
                      <div className="service" onClick={() => abrirModal(servicio)}>
                        <img src={servicio.icono} alt={servicio.nombre} />
                        <b>{servicio.nombre}</b>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="swiper-pagination"></div>
              </div>
            </div>

            <div className="swipe-hint">
              <span className="arrow">←</span>
              <span>Desliza para ver más servicios</span>
              <span className="arrow">→</span>
            </div>
          </>
        )}
      </div>
      
      {modal.open && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={cerrarModal}>×</button>
            <div className="modal-header">
              <h3>{modal.servicio?.nombre}</h3>
            </div>
            <div className="modal-body">
              {/* Descripción en caja */}
              <p className="service-description">{modal.servicio?.descripcion}</p>

              {/* Productos disponibles */}
              {Array.isArray(modal.servicio?.productos) && modal.servicio.productos.length > 0 && (
                <div className="productos-lista">
                  <h3 className="gallery-title">Productos Disponibles</h3>
                  <div className="productos-grid">
                    {modal.servicio.productos.map((prod, i) => (
                      <div key={i} className="producto-item">
                        <b>{prod}</b>
                        <button
                          onClick={() => {
                            const msg = `Hola! Me interesa cotizar: ${prod} - ${modal.servicio?.nombre}`;
                            window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(msg)}`, '_blank');
                          }}
                        >
                          COTIZAR
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Galería de trabajos */}
              {Array.isArray(modal.servicio?.imgs) && modal.servicio.imgs.length > 0 && (
                <>
                  <h3 className="gallery-title" style={{ marginTop: 16 }}>Galería de Trabajos</h3>
                  <div className="gallery">
                    {modal.servicio.imgs.map((src, i) => (
                      <img key={i} src={src} alt={`${modal.servicio?.nombre} ${i+1}`} />
                    ))}
                  </div>
                </>
              )}

              {/* CTA WhatsApp */}
              <a 
                className="cta-whatsapp" 
                href={`https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent('Hola, me interesa el servicio de ' + (modal.servicio?.nombre || ''))}`}
                target="_blank" 
                rel="noopener"
              >
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * COMPONENTE TRUST BADGES
 * Elementos de confianza y garantías con efectos visuales
 * - Badges con iconos de confianza
 * - Efectos de fondo con gradientes radiales
 * - Animaciones de hover
 * - Diseño responsive
 */
function TrustBadges() {
  return (
    <section className="trust section">
      <div className="container">
        <div className="title-wrap">
          <div className="line"></div>
          <h2>¿Por qué elegirnos?</h2>
          <div className="line"></div>
        </div>
        <div className="trust-grid">
          <div className="trust-badge">
            <div className="icon shield"></div>
            <div className="txt">
              <b>Garantía de satisfacción</b>
              <small>Calidad constante en cada proyecto</small>
            </div>
          </div>
          <div className="trust-badge">
            <div className="icon bolt"></div>
            <div className="txt">
              <b>Respuesta rápida</b>
              <small>Atención ágil por WhatsApp</small>
            </div>
          </div>
          <div className="trust-badge">
            <div className="icon certificate"></div>
            <div className="txt">
              <b>Materiales certificados</b>
              <small>Marcas líderes y acabados</small>
            </div>
          </div>
          <div className="trust-badge">
            <div className="icon truck"></div>
            <div className="txt">
              <b>Entregas puntuales</b>
              <small>Cumplimos tus tiempos de entrega</small>
            </div>
          </div>
        </div>
        <div className="fade-bottom"></div>
      </div>
    </section>
  );
}

/**
 * COMPONENTE TESTIMONIOS
 * Carrusel manual de testimonios de clientes
 * - Navegación manual con flechas prev/next
 * - Responsive: 3 columnas desktop, 1 móvil
 * - Testimonios con avatar, nombre y calificación
 * - Controles de navegación personalizados
 */
function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const updatePerView = () => {
      if (window.innerWidth <= 768) {
        setPerView(1);
      } else if (window.innerWidth <= 1024) {
        setPerView(2);
      } else {
        setPerView(3);
      }
    };

    updatePerView();
    window.addEventListener('resize', updatePerView);
    return () => window.removeEventListener('resize', updatePerView);
  }, []);

  const maxIndex = Math.max(0, Math.ceil(testimonios.length / perView) - 1);
  const next = () => setIndex(prev => Math.min(maxIndex, prev + 1));
  const prev = () => setIndex(prev => Math.max(0, prev - 1));

  return (
    <section className="testimonials">
      <div className="container">
        <h2>Lo que dicen nuestros clientes</h2>
        <p className="subtitle">Testimonios reales de clientes satisfechos</p>
        
        <div className="testimonials-carousel">
          <div className="tc-viewport">
            <div 
              className="tc-track" 
              style={{ transform: `translateX(-${index * (100 / perView)}%)` }}
            >
              {testimonios.map(testimonio => (
                <div key={testimonio.id} className="tc-item">
                  <div className="testimonial-card">
                    <div className="testimonial-text">{testimonio.texto}</div>
                    <div className="testimonial-author">
                      <img 
                        className="author-avatar" 
                        src={testimonio.avatar} 
                        alt={testimonio.autor}
                      />
                      <div className="author-info">
                        <h4>{testimonio.autor}</h4>
                        <p>{testimonio.empresa}</p>
                        <div className="stars">
                          {[...Array(testimonio.calificacion)].map((_, i) => (
                            <span key={i} className="star">★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="tc-arrow tc-prev" onClick={prev} disabled={index===0}>‹</button>
          <button className="tc-arrow tc-next" onClick={next} disabled={index===maxIndex}>›</button>
        </div>
      </div>
    </section>
  );
}

/**
 * COMPONENTE UBICACIÓN
 * Sección de ubicación y contacto
 * - Información de horarios
 * - Datos de contacto
 * - Diseño con iconos y texto
 */
function LocationSection() {
  return (
    <section id="ubicacion" className="location-section">
      <div className="location-container">
        <div className="location-content">
          <h2>Nuestra Ubicación</h2>
          <p>Encuéntranos en Reynosa, Tamaulipas</p>
        </div>
        <div className="location-info">
          <div className="location-item">
            <div className="location-icon" style={{backgroundImage: "url('https://zonagraficapd.ezhostingit.com/api/files/logos/2l093oa950g2vl2/cabecera_awhf16wd05.jpeg')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}></div>
            <div className="location-text">
              <h4>Dirección</h4>
              <p>Blvd. Las Fuentes #654 Col. Aztlán, Reynosa, Tamaulipas</p>
            </div>
          </div>
          <div className="location-item">
            <div className="location-icon" style={{backgroundImage: "url('https://zonagraficapd.ezhostingit.com/api/files/logos/2l093oa950g2vl2/cabecera_awhf16wd05.jpeg')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}></div>
            <div className="location-text">
              <h4>Horarios</h4>
              <p>Lun-Vie: 9:00-18:00, Sáb: 9:00-14:00</p>
            </div>
          </div>
          <div className="location-item">
            <div className="location-icon" style={{backgroundImage: "url('https://zonagraficapd.ezhostingit.com/api/files/logos/2l093oa950g2vl2/cabecera_awhf16wd05.jpeg')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}></div>
            <div className="location-text">
              <h4>Contacto</h4>
              <p>WhatsApp: +52 899 873 7313</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * COMPONENTE FORMULARIO DE CONTACTO
 * Formulario funcional con envío POST al backend
 * - Campos: nombre, email, teléfono, servicio, mensaje
 * - Validación de campos requeridos
 * - Estados de carga y mensajes de éxito/error
 * - Envío asíncrono a /api/contacto
 * - Diseño responsive con efectos glassmorphism
 */
function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    servicio: '',
    mensaje: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const backendBase = (typeof window !== 'undefined' && window.BACKEND_URL) ? window.BACKEND_URL : '';
      const url = backendBase ? `${backendBase}/contacto` : '/api/contacto';
      const payload = {
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        proyecto: formData.servicio || 'General',
        mensaje: formData.mensaje
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: '¡Mensaje enviado correctamente! Te contactaremos pronto.' 
        });
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          servicio: '',
          mensaje: ''
        });
      } else {
        throw new Error('Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ 
        type: 'error', 
        text: 'Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo o contáctanos directamente.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="cotiza" className="email-section">
      <div className="email-container">
        <div className="email-header">
          <h2 className="email-title">Solicita una cotización</h2>
          <p className="email-subtitle">¿Tienes un proyecto en mente?</p>
          <p className="email-description">
            Completa el formulario con los detalles de tu proyecto y te enviaremos una cotización personalizada en menos de 24 horas.
          </p>
        </div>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombre">Nombre completo *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Tu nombre completo"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                placeholder="+52 899 123 4567"
              />
            </div>
            <div className="form-group">
              <label htmlFor="servicio">Servicio de interés</label>
              <select
                id="servicio"
                name="servicio"
                value={formData.servicio}
                onChange={handleInputChange}
              >
                <option value="">Selecciona un servicio</option>
                <option value="gran-formato">Gran Formato</option>
                <option value="imprenta">Imprenta</option>
                <option value="estampados">Estampados</option>
                <option value="grabados">Grabados</option>
                <option value="letreros">Letreros</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="mensaje">Descripción del proyecto *</label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleInputChange}
              placeholder="Describe tu proyecto: dimensiones, materiales, cantidad, colores, fecha requerida, etc."
              required
            />
          </div>
          
          {message.text && (
            <div className={`message ${message.type} show`}>
              {message.text}
            </div>
          )}
          
          <button
            type="submit"
            className={`submit-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            <span className="loading-spinner"></span>
            <span className="submit-icon"></span>
            <span>{isLoading ? 'Enviando...' : 'Enviar mensaje'}</span>
          </button>
        </form>
        
        <div className="email-features">
          <div className="features-panel">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h4 className="feature-title">Respuesta rápida</h4>
              <p className="feature-desc">Te contactamos en menos de 24 horas</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h4 className="feature-title">Cotización gratuita</h4>
              <p className="feature-desc">Sin compromiso, sin costo oculto</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h4 className="feature-title">Personalizada</h4>
              <p className="feature-desc">Adaptada a tus necesidades específicas</p>
            </div>
          </div>
        </div>
        
        <div className="email-cta">
          <p className="cta-text">¿Prefieres contactarnos directamente?</p>
          <a className="cta-email" href="mailto:zgrafica.mx@gmail.com">
            zgrafica.mx@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * COMPONENTE FOOTER
 * Pie de página con información de contacto y enlaces
 * - Logo y slogan de la empresa
 * - Información de contacto (email, teléfono, WhatsApp)
 * - Enlaces de navegación
 * - Enlaces a redes sociales
 * - Botón flotante de WhatsApp
 */
function Footer() {
  return (
    <footer id="contacto" className="footer">
      <div className="container cols">
        <div className="brand-line">
          <img 
            className="footer-logo" 
            src="https://zonagraficapd.ezhostingit.com/api/files/logos/p837754ujpv1f8k/pie_de_pagina_a49ixaoy6p.jpeg" 
            alt="Zona Gráfica – Hacemos posible tus ideas"
          />
        </div>
        <div className="contact">
          <h4>CONTÁCTANOS</h4>
          <div className="citem">
            <span className="cicon mail"></span>
            <span>zgrafica.mx@gmail.com</span>
          </div>
          <div className="citem">
            <span className="cicon facebook"></span>
            <span>Zona Gráfica</span>
          </div>
          <div className="citem">
            <span className="cicon whatsapp"></span>
            <span>+52 899 873 7313</span>
          </div>
          <div className="citem">
            <span className="cicon map"></span>
            <span>Blvd. Las Fuentes #654 Col. Aztlán, 88740 Reynosa, México</span>
          </div>
        </div>
        <div className="footer-links">
          <div className="grid">
            <div>
              <h5>Nosotros</h5>
              <a href="#servicios">Quiénes somos</a>
              <a href="#servicios">Marcas y materiales</a>
              <a href="#servicios">Portafolio</a>
            </div>
            <div>
              <h5>Atención</h5>
              <a href="#cotiza">Cotiza ahora</a>
              <a href="mailto:zgrafica.mx@gmail.com">Email</a>
              <a 
                href={`https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}`}
                target="_blank" 
                rel="noopener"
                title="WhatsApp: +52 899 873 7313"
              >
                <span style={{display: 'inline-flex', width: 24, height: 24, background: `url(${asset('img/web%205/iconos/whatsapp.png')}) center/contain no-repeat`}}></span>
              </a>
            </div>
            <div>
              <h5>Información</h5>
              <a href="#contacto">Garantías y envíos</a>
              <a href="#contacto">Términos y condiciones</a>
            </div>
            <div>
              <h5>Ubicación</h5>
              <a href="#contacto">Reynosa, Tamaulipas</a>
              <a href="#contacto">Cómo llegar</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * COMPONENTE PRINCIPAL DE LA APLICACIÓN
 * Componente raíz que renderiza toda la aplicación React
 * - Orquesta todos los componentes de la página
 * - Maneja el estado global de la aplicación
 * - Renderiza el layout completo con todas las secciones
 */
function App() {
  return (
    <>
      <Header />
      <BannerCarousel />
      <ServiciosGrid />
      <TrustBadges />
      <LocationSection />
      <ContactForm />
      <TestimonialsSection />
      <a 
        href={`https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}`}
        className="wa-btn wa-float" 
        target="_blank" 
        rel="noopener" 
        title="WhatsApp: +52 899 873 7313"
      >
        <span style={{display: 'inline-flex', width: 32, height: 32, background: `url(${asset('img/web%205/iconos/whatsapp.png')}) center/contain no-repeat`}}></span>
      </a>
      <Footer />
    </>
  );
}

export default App;
