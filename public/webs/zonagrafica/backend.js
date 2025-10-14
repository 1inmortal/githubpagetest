// ================================================================================
// BACKEND POCKETBASE - ZONA GRÁFICA
// ================================================================================
// Archivo separado para manejar toda la lógica de conexión con PocketBase
// Incluye: autenticación, obtención de datos, manejo de errores

// ================================================================================
// CONFIGURACIÓN DE POCKETBASE BACKEND
// ================================================================================
const POCKETBASE_URL = 'https://zonagraficapd.ezhostingit.com';

// Variables globales para almacenar datos dinámicos
let serviciosDinamicos = [];
let productosDinamicos = [];
let authToken = null;

// ================================================================================
// FUNCIONES DE AUTENTICACIÓN
// ================================================================================

/**
 * Autentica con PocketBase usando credenciales
 * @returns {Promise<boolean>} - true si la autenticación fue exitosa
 */
async function autenticarPocketBase() {
  try {
    // CONFIGURAR CREDENCIALES AQUÍ:
    // Reemplazar con las credenciales reales de tu usuario de PocketBase
    const CREDENTIALS = {
      identity: 'admin@zonagrafica.com', // Email o username del usuario
      password: 'admin123' // Contraseña del usuario
    };
    
    const response = await fetch(`${POCKETBASE_URL}/api/collections/users/auth-with-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(CREDENTIALS)
    });
    
    if (response.ok) {
      const data = await response.json();
      authToken = data.token;
      console.log('Autenticación exitosa');
      return true;
    } else {
      console.warn('Error en autenticación:', response.status);
      return false;
    }
  } catch (error) {
    console.warn('Error al autenticar:', error);
    return false;
  }
}

/**
 * Genera headers con autenticación JWT
 * @returns {Object} - Headers con token Bearer
 */
function getAuthHeaders() {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  
  return headers;
}

/**
 * Verifica si el token JWT es válido (no expirado)
 * @returns {boolean} - true si el token es válido
 */
function isTokenValid() {
  if (!authToken) return false;
  
  try {
    // Decodificar el JWT para verificar expiración
    const payload = JSON.parse(atob(authToken.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now;
  } catch (error) {
    console.warn('Error al verificar token:', error);
    return false;
  }
}

/**
 * Renueva el token si es necesario
 * @returns {Promise<boolean>} - true si el token es válido o se renovó
 */
async function ensureValidToken() {
  if (!isTokenValid()) {
    console.log('Token expirado, renovando...');
    return await autenticarPocketBase();
  }
  return true;
}

// ================================================================================
// FUNCIONES DE CONEXIÓN CON POCKETBASE BACKEND
// ================================================================================

/**
 * Obtiene categorías desde PocketBase
 * @returns {Promise<Array>} - Array de categorías
 */
async function obtenerCategorias() {
  try {
    // Verificar token antes de hacer la petición
    await ensureValidToken();
    
    const response = await fetch(`${POCKETBASE_URL}/api/collections/categorias/records`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.warn('Error al obtener categorías de PocketBase:', error);
    return [];
  }
}

/**
 * Obtiene productos desde PocketBase
 * @returns {Promise<Array>} - Array de productos
 */
async function obtenerProductos() {
  try {
    // Verificar token antes de hacer la petición
    await ensureValidToken();
    
    const response = await fetch(`${POCKETBASE_URL}/api/collections/productos/records`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.warn('Error al obtener productos de PocketBase:', error);
    return [];
  }
}

/**
 * Obtiene productos por categoría específica
 * @param {string} categoria - Nombre de la categoría
 * @returns {Promise<Array>} - Array de productos de la categoría
 */
async function obtenerProductosPorCategoria(categoria) {
  try {
    // Verificar token antes de hacer la petición
    await ensureValidToken();
    
    const response = await fetch(`${POCKETBASE_URL}/api/collections/productos/records?filter=(categoria='${categoria}')`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.warn(`Error al obtener productos de ${categoria}:`, error);
    return [];
  }
}

/**
 * Obtiene artículos desde PocketBase
 * @returns {Promise<Array>} - Array de artículos
 */
async function obtenerArticulosPocketBase() {
  try {
    // Verificar si la colección existe para evitar 404 ruidosos
    const meta = await fetch(`${POCKETBASE_URL}/api/collections/articulos`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    if (meta.status === 404) {
      return articulosRespaldo;
    }
    if (!meta.ok) {
      return articulosRespaldo;
    }

    const response = await fetch(`${POCKETBASE_URL}/api/collections/articulos/records?sort=-fecha&perPage=6`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    if (response.status === 404) {
      return articulosRespaldo;
    }
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.items && data.items.length > 0) {
      // Transformar datos de PocketBase al formato esperado
      return data.items.map(articulo => ({
        id: articulo.id,
        titulo: articulo.titulo || 'Sin título',
        categoria: articulo.categoria || 'General',
        imagen: articulo.imagen || 'img/web%205/ofertas/vinil.jpg',
        resumen: articulo.resumen || 'Descripción no disponible',
        vistas: articulo.vistas || 0,
        fecha: articulo.fecha ? new Date(articulo.fecha).toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }) : 'Fecha no disponible',
        trending: articulo.trending || false
      }));
    }
    return articulosRespaldo; // Usar datos de respaldo si no hay datos
  } catch (error) {
    console.info('Artículos: usando respaldo. Detalle:', error?.message || error);
    return articulosRespaldo; // Usar datos de respaldo en caso de error
  }
}

// ================================================================================
// FUNCIÓN PRINCIPAL DE CARGA DE DATOS DINÁMICOS
// ================================================================================

/**
 * Función principal que carga todos los datos desde PocketBase
 * Procesa categorías y productos, los organiza y dispara eventos
 * @returns {Promise<void>}
 */
async function cargarDatosDinamicos() {
  try {
    // Primero intentar autenticarse
    const autenticado = await autenticarPocketBase();
    if (!autenticado) {
      console.warn('No se pudo autenticar, usando datos estáticos');
      // Usar datos estáticos si falla la autenticación
      const event = new CustomEvent('datosCargados', { 
        detail: { servicios: servicios, productos: [] } 
      });
      window.dispatchEvent(event);
      return;
    }
    
    const [categorias, productos] = await Promise.all([
      obtenerCategorias(),
      obtenerProductos()
    ]);

    // Procesar categorías con productos específicos
    serviciosDinamicos = categorias.map(cat => {
      let productos = [];
      let descripcion = '';
      
      // Asignar productos específicos según la categoría
      switch(cat.nombre) {
        case 'IMPRENTA':
          productos = [
            'CARPETAS IMPRESAS',
            'TABLOIDE EN PAPEL COUCHE', 
            'TABLOIDE ADHESIVO CON RECORTE',
            'BLOCK DE NOTAS / FORMATOS',
            'VOLANTES / DIPTICOS / TRIPTICOS',
            'TARJETAS DE PRESENTACION'
          ];
          descripcion = 'Impresión digital y offset de alta calidad. Tarjetas de presentación, volantes, dípticos, trípticos, block de notas, tabloides adhesivos y carpetas impresas.';
          break;
        case 'GRAN FORMATO':
          productos = [
            'VINIL ESTATICO',
            'BANDERAS PUBLICITARIAS',
            'BACKLITE',
            'VINIL MATE / BRILLANTE',
            'MICROPERFORADO',
            'LONA IMPRESA'
          ];
          descripcion = 'Trabajos de gran formato para publicidad exterior e interior. Lonas impresas, microperforado, vinil mate/brillante, backlite, banderas publicitarias y vinil estático.';
          break;
        case 'ESTAMPADOS':
          productos = ['SERVICIOS DE ESTAMPADO DISPONIBLES'];
          descripcion = 'Playeras, gorras, textil personalizado y merchandising corporativo. Técnicas de serigrafía, sublimación y bordado profesional.';
          break;
        case 'RÍGIDOS':
          productos = ['SERVICIOS DE RÍGIDOS DISPONIBLES'];
          descripcion = 'Letreros rígidos, displays, stands y señalética de materiales sólidos como acrílico, PVC, foam board y metal. Durabilidad y resistencia.';
          break;
        case 'PROMOCIONALES':
          productos = ['SERVICIOS PROMOCIONALES DISPONIBLES'];
          descripcion = 'Material promocional, regalos corporativos, artículos publicitarios y merchandising personalizado para eventos y campañas.';
          break;
        case 'DISEÑO':
          productos = ['SERVICIOS DE DISEÑO DISPONIBLES'];
          descripcion = 'Servicios de diseño gráfico, identidad corporativa, logotipos, branding y creatividad visual profesional para todos tus proyectos.';
          break;
        case 'OTROS PRODUCTOS Y SERVICIOS':
          productos = ['SERVICIOS ADICIONALES DISPONIBLES'];
          descripcion = 'Servicios adicionales, productos especializados y soluciones personalizadas para necesidades específicas de tu empresa.';
          break;
        default:
          productos = ['SERVICIOS DISPONIBLES'];
          descripcion = cat.descripcion || `Servicios de ${cat.nombre.toLowerCase()}`;
      }
      
      return {
        id: cat.id,
        nombre: cat.nombre,
        desc: descripcion,
        icon: 'img/web 5/iconos/gran_formato_.png', // Icono por defecto
        productos: productos,
        imgs: [
          'img/web%205/ofertas/digital-printing-trends-Ghana-1.png',
          'img/web%205/ofertas/tendecia.webp',
          'img/web%205/ofertas/Tendencias-en-Diseno-Grafico.jpg',
          'img/web%205/ofertas/vinil.jpg'
        ]
      };
    });

    // Procesar productos y agrupar por categoría
    productos.forEach(producto => {
      const servicio = serviciosDinamicos.find(s => s.nombre === producto.categoria);
      if (servicio) {
        servicio.productos.push(producto.nombre);
      }
    });

    // Asignar iconos específicos según el nombre de la categoría
    serviciosDinamicos.forEach(servicio => {
      switch(servicio.nombre) {
        case 'GRAN FORMATO':
          servicio.icon = 'img/web 5/iconos/gran_formato_.png';
          break;
        case 'IMPRENTA':
          servicio.icon = 'img/web 5/iconos/imprenta.png';
          break;
        case 'ESTAMPADOS':
          servicio.icon = 'img/web 5/iconos/estampados.png';
          break;
        case 'RÍGIDOS':
          servicio.icon = 'img/web 5/iconos/rigidos.png';
          break;
        case 'PROMOCIONALES':
          servicio.icon = 'img/web 5/iconos/promocionales.png';
          break;
        case 'DISEÑO':
          servicio.icon = 'img/web 5/iconos/diseño.png';
          break;
        case 'OTROS PRODUCTOS Y SERVICIOS':
          servicio.icon = 'img/web 5/iconos/otros productos.png';
          break;
        default:
          servicio.icon = 'img/web 5/iconos/gran_formato_.png';
      }
    });

    productosDinamicos = productos;
    
    // Disparar evento para actualizar componentes
    const event = new CustomEvent('datosCargados', { 
      detail: { servicios: serviciosDinamicos, productos: productosDinamicos } 
    });
    window.dispatchEvent(event);

  } catch (error) {
    console.warn('Error al cargar datos dinámicos:', error);
  }
}

/**
 * Carga artículos al inicializar
 * @returns {Promise<void>}
 */
async function cargarArticulos() {
  const articulos = await obtenerArticulosPocketBase();
  // Forzar re-render del componente si es necesario
  const event = new CustomEvent('articulosCargados', { detail: articulos });
  window.dispatchEvent(event);
}

// ================================================================================
// INICIALIZACIÓN Y EXPORTACIÓN
// ================================================================================

// Cargar datos al inicializar la página
cargarDatosDinamicos();
cargarArticulos();

// Función global para refrescar datos (útil para debugging)
window.refrescarDatos = cargarDatosDinamicos;

// Exportar funciones para uso en otros archivos
window.PocketBaseAPI = {
  cargarDatosDinamicos,
  cargarArticulos,
  obtenerCategorias,
  obtenerProductos,
  obtenerProductosPorCategoria,
  obtenerArticulosPocketBase,
  autenticarPocketBase,
  getAuthHeaders,
  isTokenValid,
  ensureValidToken
};
