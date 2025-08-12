/**
 * Cargador de Utilidades de Seguridad
 * Incluye las funciones de seguridad en páginas HTML
 */

// Verificar si las utilidades de seguridad ya están cargadas
if (typeof SecurityUtils === 'undefined') {
  console.warn('SecurityUtils no encontrado. Cargando utilidades de seguridad...');

  // Cargar el archivo de utilidades de seguridad
  const script = document.createElement('script');
  script.src = 'assets/js/security-utils.js';
  script.onload = function () {
    console.log('✅ Utilidades de seguridad cargadas correctamente');

    // Reemplazar funciones básicas con versiones seguras
    if (typeof window.sanitizeHTML === 'function') {
      // La función ya existe, no reemplazar
      console.log('✅ Función sanitizeHTML ya disponible');
    } else {
      // Usar la función de SecurityUtils
      window.sanitizeHTML = SecurityUtils.sanitizeHTML;
    }

    if (typeof window.escapeQuotes === 'function') {
      console.log('✅ Función escapeQuotes ya disponible');
    } else {
      window.escapeQuotes = SecurityUtils.escapeQuotes;
    }

    // Inicializar validación de formularios
    initializeFormSecurity();
  };
  script.onerror = function () {
    console.error('❌ Error cargando utilidades de seguridad');
  };
  document.head.appendChild(script);
} else {
  console.log('✅ Utilidades de seguridad ya cargadas');
  initializeFormSecurity();
}

/**
 * Inicializar seguridad en formularios
 */
function initializeFormSecurity () {
  // Buscar todos los formularios en la página
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    // Agregar validación de seguridad al envío
    form.addEventListener('submit', function (e) {
      if (typeof SecurityUtils !== 'undefined') {
        const formData = SecurityUtils.sanitizeForm(form);

        if (!formData.isValid) {
          e.preventDefault();

          // Mostrar errores de validación
          showValidationErrors(formData.errors);

          console.error('❌ Formulario rechazado por errores de validación:', formData.errors);
          return false;
        }

        console.log('✅ Formulario validado correctamente');
      }
    });

    // Agregar validación en tiempo real
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', function () {
        validateInput(this);
      });
    });
  });
}

/**
 * Validar un campo de entrada individual
 * @param {HTMLElement} input - Campo de entrada a validar
 */
function validateInput (input) {
  if (typeof SecurityUtils === 'undefined') return;

  const value = input.value;
  const type = input.type || 'text';

  const validation = SecurityUtils.validateAndSanitizeInput(value, type);

  // Remover clases de error previas
  input.classList.remove('error');

  if (!validation.isValid) {
    input.classList.add('error');

    // Mostrar mensaje de error
    showInputError(input, validation.error);
  } else {
    // Actualizar valor sanitizado
    if (validation.sanitized !== value) {
      input.value = validation.sanitized;
    }
  }
}

/**
 * Mostrar errores de validación
 * @param {Array} errors - Lista de errores
 */
function showValidationErrors (errors) {
  // Crear o actualizar contenedor de errores
  let errorContainer = document.getElementById('validation-errors');

  if (!errorContainer) {
    errorContainer = document.createElement('div');
    errorContainer.id = 'validation-errors';
    errorContainer.className = 'validation-errors';
    errorContainer.style.cssText = `
            background-color: #fee;
            border: 1px solid #fcc;
            color: #c33;
            padding: 10px;
            margin: 10px 0;
            border-radius: 4px;
            font-size: 14px;
        `;

    // Insertar al principio del body
    document.body.insertBefore(errorContainer, document.body.firstChild);
  }

  // Mostrar errores
  errorContainer.innerHTML = `
        <strong>Errores de validación:</strong>
        <ul>
            ${errors.map(error => `<li>${error}</li>`).join('')}
        </ul>
    `;

  // Ocultar después de 5 segundos
  setTimeout(() => {
    errorContainer.style.display = 'none';
  }, 5000);
}

/**
 * Mostrar error para un campo específico
 * @param {HTMLElement} input - Campo de entrada
 * @param {string} error - Mensaje de error
 */
function showInputError (input, error) {
  // Remover mensaje de error previo
  const existingError = input.parentNode.querySelector('.input-error');
  if (existingError) {
    existingError.remove();
  }

  // Crear mensaje de error
  const errorElement = document.createElement('div');
  errorElement.className = 'input-error';
  errorElement.textContent = error;
  errorElement.style.cssText = `
        color: #c33;
        font-size: 12px;
        margin-top: 2px;
    `;

  // Insertar después del campo
  input.parentNode.insertBefore(errorElement, input.nextSibling);
}

/**
 * Función para sanitizar contenido HTML de forma segura
 * @param {string} html - HTML a sanitizar
 * @returns {string} - HTML sanitizado
 */
function safeInnerHTML (element, html) {
  if (typeof SecurityUtils !== 'undefined') {
    SecurityUtils.insertSafeHTML(element, html);
  } else {
    // Fallback básico
    element.textContent = html;
  }
}

/**
 * Función para crear elementos HTML de forma segura
 * @param {string} tagName - Nombre del elemento
 * @param {object} attributes - Atributos
 * @param {string} content - Contenido
 * @returns {HTMLElement} - Elemento seguro
 */
function createSafeElement (tagName, attributes = {}, content = '') {
  if (typeof SecurityUtils !== 'undefined') {
    return SecurityUtils.createSafeElement(tagName, attributes, content);
  } else {
    // Fallback básico
    const element = document.createElement(tagName);
    element.textContent = content;
    return element;
  }
}

// Exportar funciones para uso global
window.safeInnerHTML = safeInnerHTML;
window.createSafeElement = createSafeElement;

console.log('🔒 Cargador de seguridad inicializado');
