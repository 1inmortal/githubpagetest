document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const mainContent = document.getElementById('main-content');
    const loader = document.getElementById('loader');

    // --- Configuración API Google AI ---
    // !! ADVERTENCIA DE SEGURIDAD !!
    // ¡Nunca expongas tu API Key directamente en el código del frontend en producción!
    // Esto es solo para fines de demostración. En un entorno real, usa un backend como proxy.
    const GOOGLE_AI_API_KEY = "TU_API_KEY_DE_GOOGLE_AI_STUDIO"; // <-- ¡REEMPLAZA ESTO!
    const GOOGLE_AI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GOOGLE_AI_API_KEY}`;

    // Función para mostrar el loader
    const showLoader = () => {
        loader.classList.remove('hidden');
        loader.style.pointerEvents = 'auto'; // Permitir que bloquee
    };

    // Función para ocultar el loader
    const hideLoader = () => {
        loader.classList.add('hidden');
        loader.style.pointerEvents = 'none'; // Dejar de bloquear
    };

    // Función para llamar a la API de Google AI
    async function callGoogleAI(prompt) {
        if (!GOOGLE_AI_API_KEY || GOOGLE_AI_API_KEY === "TU_API_KEY_DE_GOOGLE_AI_STUDIO") {
            console.warn("API Key de Google AI no configurada. Usando respuesta simulada.");
            // Simulación si no hay API Key
            await new Promise(resolve => setTimeout(resolve, 800)); // Simular delay
            return `Respuesta simulada de IA para: "${prompt.substring(0, 50)}..."\n\n- Punto clave 1.\n- Punto clave 2.\n- Recomendación de seguridad simulada.`;
        }

        showLoader(); // Mostrar loader durante la llamada a la API

        try {
            const response = await fetch(GOOGLE_AI_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    // Opcional: Configuración de generación
                    // generationConfig: {
                    //     temperature: 0.7,
                    //     maxOutputTokens: 256,
                    // }
                }),
            });

            hideLoader(); // Ocultar loader tras recibir respuesta

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error en API Google AI:", response.status, errorData);
                throw new Error(`Error de API: ${errorData.error?.message || response.statusText}`);
            }

            const data = await response.json();

            // Verificar estructura de respuesta (puede variar ligeramente)
            if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
                return data.candidates[0].content.parts[0].text;
            } else {
                console.error("Respuesta inesperada de la API:", data);
                throw new Error("Formato de respuesta de API no reconocido.");
            }

        } catch (error) {
            hideLoader(); // Asegurarse de ocultar el loader en caso de error
            console.error("Error al llamar a Google AI:", error);
            return `Error al contactar la IA: ${error.message}. Mostrando información genérica.\n\nRecomendación: Verifica tu conexión y la configuración de la API Key.`;
        }
    }


    // Función para cargar el contenido de la sección
    const loadSectionContent = async (sectionId) => {
        showLoader();
        // Simula un pequeño retardo de carga para la percepción
        await new Promise(resolve => setTimeout(resolve, 300));

        mainContent.innerHTML = ''; // Limpiar contenido anterior
        const container = document.createElement('div');
        container.classList.add('section-container');
        let contentHTML = '';

        // --- Contenido Específico por Sección ---
        switch (sectionId) {
            case 'dashboard':
                contentHTML = `
                    <h2 class="section-title"><i class="fas fa-tachometer-alt"></i> Dashboard General</h2>
                    <div class="grid-container">
                        <div class="card" data-aos="fade-up">
                            <div class="card-header"><i class="fas fa-shield-virus"></i> Estado de Seguridad</div>
                            <div class="card-content">
                                <p><span class="status-dot success"></span> Sistema: <strong>Protegido</strong></p>
                                <p>Último análisis: Hoy, 10:30 AM</p>
                                <p>Amenazas detectadas (24h): <strong>0</strong></p>
                            </div>
                        </div>
                        <div class="card" data-aos="fade-up" data-aos-delay="100">
                            <div class="card-header"><i class="fas fa-user-secret"></i> Comportamiento Anómalo</div>
                            <div class="card-content">
                                <p><span class="status-dot warning"></span> Actividad reciente: <strong>1 Sospechosa</strong></p>
                                <p>Origen: Inicio de sesión inusual (IP: 198.51.100.5)</p>
                                <button class="btn btn-secondary btn-sm" onclick="navigateTo('anomaly-detection')"><i class="fas fa-search"></i> Investigar</button>
                            </div>
                        </div>
                        <div class="card" data-aos="fade-up" data-aos-delay="200">
                            <div class="card-header"><i class="fas fa-bell"></i> Alertas Recientes</div>
                            <div class="card-content">
                                <p>Alertas críticas: <strong>0</strong></p>
                                <p>Alertas medias: <strong>1</strong> (Contraseña débil detectada)</p>
                                <p>Alertas bajas: <strong>3</strong></p>
                                <button class="btn btn-secondary btn-sm" onclick="navigateTo('alerts')"><i class="fas fa-eye"></i> Ver Alertas</button>
                            </div>
                        </div>
                        <div class="card" data-aos="fade-up" data-aos-delay="300">
                            <div class="card-header"><i class="fas fa-tasks"></i> Resumen de Tareas</div>
                            <div class="card-content">
                                <p>Contraseñas por revisar: <strong>2</strong></p>
                                <p>Configuración MFA pendiente: <strong>Sí (App Móvil)</strong></p>
                                <button class="btn btn-secondary btn-sm" onclick="navigateTo('password-vault')"><i class="fas fa-lock"></i> Ir a Bóveda</button>
                            </div>
                        </div>
                         <div class="card ai-summary-card" data-aos="fade-up" data-aos-delay="400">
                            <div class="card-header"><i class="fas fa-brain"></i> Resumen IA</div>
                            <div class="card-content">
                                <p>Obteniendo análisis inteligente...</p>
                                <div class="ai-response" id="ai-dashboard-summary">
                                    <div class="spinner-small"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                container.innerHTML = contentHTML;
                mainContent.appendChild(container);
                // Cargar resumen IA del dashboard
                const aiSummaryElement = document.getElementById('ai-dashboard-summary');
                if(aiSummaryElement) {
                    const summaryPrompt = "Actúa como un asistente de ciberseguridad. Basado en estos datos simulados (Sistema Protegido, 1 actividad sospechosa reciente de IP inusual, 1 alerta de contraseña débil, 3 alertas bajas, MFA pendiente), dame un resumen conciso del estado general y una recomendación principal.";
                    callGoogleAI(summaryPrompt)
                        .then(response => aiSummaryElement.textContent = response)
                        .catch(error => aiSummaryElement.textContent = `Error al obtener resumen de IA: ${error.message}`);
                }
                break;

            case 'anomaly-detection':
                contentHTML = `
                    <h2 class="section-title"><i class="fas fa-user-secret"></i> Detección de Comportamientos Anómalos</h2>
                    <p style="margin-bottom: 20px;">Análisis basado en IA de patrones de uso para detectar actividades inusuales.</p>
                    <div class="grid-container">
                        <div class="card alert-card medium" data-aos="fade-up">
                            <div class="card-header"><i class="fas fa-map-marker-alt"></i> Inicio de Sesión Inusual</div>
                            <div class="card-content">
                                <p><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</p>
                                <p><strong>Hora:</strong> 09:15 AM</p>
                                <p><strong>IP:</strong> 198.51.100.5 (Ubicación desconocida)</p>
                                <p><strong>Dispositivo:</strong> Navegador Chrome (Windows)</p>
                                <p><strong>Razón:</strong> Primera vez desde esta IP/región.</p>
                                <button class="btn btn-sm btn-danger"><i class="fas fa-ban"></i> Bloquear IP</button>
                                <button class="btn btn-sm btn-success" style="margin-left: 10px;"><i class="fas fa-check"></i> Marcar como seguro</button>
                            </div>
                        </div>
                        <div class="card" data-aos="fade-up" data-aos-delay="100">
                            <div class="card-header"><i class="fas fa-clock"></i> Acceso Fuera de Horario</div>
                             <div class="card-content">
                                <p><strong>Fecha:</strong> ${new Date(Date.now() - 86400000).toLocaleDateString()} (Ayer)</p>
                                <p><strong>Hora:</strong> 03:30 AM</p>
                                <p><strong>Acción:</strong> Intento de modificación de perfil.</p>
                                <p><strong>Estado:</strong> <span class="status-dot success"></span> Bloqueado por MFA.</p>
                            </div>
                        </div>
                        </div>
                    <div class="ai-analysis-section" style="margin-top: 30px;">
                        <h3><i class="fas fa-brain"></i> Análisis IA de la Actividad Reciente</h3>
                        <p>Solicitando a la IA una explicación detallada del riesgo del inicio de sesión inusual...</p>
                        <div class="ai-response" id="ai-anomaly-analysis">
                             <div class="spinner-small"></div>
                        </div>
                         <button class="btn" id="analyze-anomaly-btn"><i class="fas fa-cogs"></i> Volver a Analizar con IA</button>
                    </div>
                `;
                 container.innerHTML = contentHTML;
                 mainContent.appendChild(container);
                 // Cargar análisis IA
                 const anomalyAnalysisElement = document.getElementById('ai-anomaly-analysis');
                 const analyzeAnomalyBtn = document.getElementById('analyze-anomaly-btn');

                 const runAnomalyAnalysis = () => {
                    if(anomalyAnalysisElement) {
                        anomalyAnalysisElement.innerHTML = '<div class="spinner-small"></div>'; // Show spinner
                        const anomalyPrompt = "Actúa como analista de ciberseguridad. Explica los riesgos potenciales de un inicio de sesión desde una IP (198.51.100.5) y ubicación geográfica inusuales por primera vez en una cuenta. ¿Qué pasos inmediatos debería tomar el usuario?";
                        callGoogleAI(anomalyPrompt)
                            .then(response => anomalyAnalysisElement.textContent = response)
                            .catch(error => anomalyAnalysisElement.textContent = `Error al obtener análisis de IA: ${error.message}`);
                    }
                 }
                 runAnomalyAnalysis(); // Run on load
                 if (analyzeAnomalyBtn) {
                    analyzeAnomalyBtn.addEventListener('click', runAnomalyAnalysis);
                 }
                 break;

            case 'mfa':
                contentHTML = `
                    <h2 class="section-title"><i class="fas fa-key"></i> Gestión de Autenticación Multifactor (MFA)</h2>
                    <p style="margin-bottom: 20px;">Asegura tu cuenta requiriendo una segunda forma de verificación.</p>
                     <div class="grid-container">
                         <div class="card" data-aos="fade-up">
                             <div class="card-header"><i class="fas fa-mobile-alt"></i> App Autenticadora</div>
                             <div class="card-content">
                                 <p><strong>Estado:</strong> <span class="status-dot success"></span> Activo</p>
                                 <p>Recomendado para máxima seguridad.</p>
                                 <button class="btn btn-secondary btn-sm"><i class="fas fa-cog"></i> Configurar</button>
                             </div>
                         </div>
                         <div class="card" data-aos="fade-up" data-aos-delay="100">
                             <div class="card-header"><i class="fas fa-sms"></i> SMS / Mensaje de Texto</div>
                             <div class="card-content">
                                 <p><strong>Estado:</strong> <span class="status-dot warning"></span> Inactivo</p>
                                 <p>Menos seguro que la app, pero mejor que nada.</p>
                                 <button class="btn btn-sm"><i class="fas fa-plus"></i> Activar</button>
                             </div>
                         </div>
                         <div class="card" data-aos="fade-up" data-aos-delay="200">
                             <div class="card-header"><i class="fas fa-fingerprint"></i> Claves de Seguridad Físicas (YubiKey, etc.)</div>
                             <div class="card-content">
                                 <p><strong>Estado:</strong> <span class="status-dot danger"></span> No configurado</p>
                                 <p>El método más seguro.</p>
                                  <button class="btn btn-secondary btn-sm"><i class="fas fa-info-circle"></i> Más información</button>
                             </div>
                         </div>
                     </div>
                     <div class="ai-mfa-tips" style="margin-top: 30px;">
                         <h3><i class="fas fa-brain"></i> Consejo de IA sobre MFA</h3>
                         <div class="ai-response" id="ai-mfa-tip">
                              <div class="spinner-small"></div>
                         </div>
                     </div>
                 `;
                 container.innerHTML = contentHTML;
                 mainContent.appendChild(container);
                 // Cargar consejo IA
                 const mfaTipElement = document.getElementById('ai-mfa-tip');
                 if(mfaTipElement) {
                    const mfaPrompt = "Actúa como experto en ciberseguridad. Explica brevemente por qué usar una App Autenticadora es generalmente más seguro que recibir códigos MFA por SMS.";
                    callGoogleAI(mfaPrompt)
                        .then(response => mfaTipElement.textContent = response)
                        .catch(error => mfaTipElement.textContent = `Error al obtener consejo de IA: ${error.message}`);
                 }
                 break;

             case 'password-vault':
                 // Simulación de datos de contraseñas
                 const passwords = [
                     { site: "Banco XYZ", username: "j.espinosa", strength: "Fuerte", lastChanged: "Hace 2 meses", id: 1 },
                     { site: "Red Social A", username: "jose.armando", strength: "Débil", lastChanged: "Hace 1 año", id: 2 },
                     { site: "Correo Electrónico Corp.", username: "jespinosa@empresa.com", strength: "Media", lastChanged: "Hace 6 meses", id: 3 },
                     { site: "Tienda Online B", username: "armando.e", strength: "Fuerte", lastChanged: "Hace 1 semana", id: 4 },
                 ];

                 let passwordRows = passwords.map(p => `
                     <tr>
                         <td>${p.site}</td>
                         <td>${p.username}</td>
                         <td><span class="status-dot ${p.strength === 'Fuerte' ? 'success' : p.strength === 'Media' ? 'warning' : 'danger'}"></span> ${p.strength}</td>
                         <td>${p.lastChanged}</td>
                         <td>
                             <button class="btn btn-secondary btn-sm" title="Ver/Editar"><i class="fas fa-eye"></i></button>
                             <button class="btn btn-danger btn-sm" title="Eliminar"><i class="fas fa-trash"></i></button>
                         </td>
                     </tr>
                 `).join('');

                 contentHTML = `
                     <h2 class="section-title"><i class="fas fa-lock"></i> Bóveda de Contraseñas Segura</h2>
                     <p style="margin-bottom: 20px;">Gestiona y genera contraseñas fuertes para tus cuentas.</p>
                     <button class="btn" style="margin-bottom: 20px;"><i class="fas fa-plus"></i> Añadir Nueva Contraseña</button>
                     <div class="table-responsive" style="overflow-x: auto;">
                         <table class="data-table">
                             <thead>
                                 <tr>
                                     <th>Sitio Web / Servicio</th>
                                     <th>Usuario</th>
                                     <th>Fortaleza</th>
                                     <th>Último Cambio</th>
                                     <th>Acciones</th>
                                 </tr>
                             </thead>
                             <tbody>
                                 ${passwordRows}
                             </tbody>
                         </table>
                     </div>
                      <div class="ai-password-check" style="margin-top: 30px;">
                         <h3><i class="fas fa-brain"></i> Chequeo de Contraseñas con IA</h3>
                         <p>Pide a la IA que evalúe la fortaleza general de tus contraseñas (basado en datos simulados).</p>
                         <div class="ai-response" id="ai-password-strength-analysis">
                              <div class="spinner-small"></div>
                         </div>
                         <button class="btn" id="analyze-passwords-btn"><i class="fas fa-cogs"></i> Analizar Fortaleza</button>
                     </div>
                 `;
                 container.innerHTML = contentHTML;
                 mainContent.appendChild(container);

                 // Lógica para el análisis de contraseñas con IA
                 const passwordAnalysisElement = document.getElementById('ai-password-strength-analysis');
                 const analyzePasswordsBtn = document.getElementById('analyze-passwords-btn');

                 const runPasswordAnalysis = () => {
                     if (passwordAnalysisElement) {
                         passwordAnalysisElement.innerHTML = '<div class="spinner-small"></div>'; // Show spinner
                         const passwordPrompt = `Actúa como un experto en seguridad de contraseñas. Tengo ${passwords.length} contraseñas guardadas. Sus niveles de fortaleza son: ${passwords.map(p => p.strength).join(', ')}. Dame un breve análisis general de la seguridad de mis contraseñas y dos consejos clave para mejorarla, considerando que hay una débil y una media.`;
                         callGoogleAI(passwordPrompt)
                             .then(response => passwordAnalysisElement.textContent = response)
                             .catch(error => passwordAnalysisElement.textContent = `Error al obtener análisis de IA: ${error.message}`);
                     }
                 };
                runPasswordAnalysis(); // Run on load
                 if (analyzePasswordsBtn) {
                    analyzePasswordsBtn.addEventListener('click', runPasswordAnalysis);
                 }
                 break;

            case 'alerts':
                 // Simulación de alertas
                 const alerts = [
                     { id: 1, severity: 'medium', title: 'Contraseña débil detectada', description: 'La contraseña para "Red Social A" es considerada débil y podría ser vulnerable.', timestamp: new Date(Date.now() - 3600000), read: false },
                     { id: 2, severity: 'low', title: 'Nuevo inicio de sesión', description: 'Se detectó un inicio de sesión desde un nuevo dispositivo (Móvil Android) en tu cuenta principal.', timestamp: new Date(Date.now() - 7200000), read: false },
                     { id: 3, severity: 'low', title: 'Actualización de seguridad disponible', description: 'Se recomienda revisar la configuración de seguridad de tu cuenta bancaria.', timestamp: new Date(Date.now() - 86400000), read: true },
                     { id: 4, severity: 'low', title: 'Política de cookies actualizada', description: 'El sitio web "Tienda Online B" actualizó su política de cookies.', timestamp: new Date(Date.now() - 172800000), read: true },
                 ];

                 let alertCards = alerts.map(alert => `
                     <div class="card alert-card ${alert.severity} ${alert.read ? 'read' : 'unread'}" data-aos="fade-up">
                         <div class="card-header">
                             <i class="fas ${alert.severity === 'high' ? 'fa-exclamation-triangle' : alert.severity === 'medium' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                             ${alert.title}
                             <span class="alert-timestamp">${timeAgo(alert.timestamp)}</span>
                             ${!alert.read ? '<span class="unread-indicator" title="No leído"></span>' : ''}
                         </div>
                         <div class="card-content">
                             <p>${alert.description}</p>
                             <button class="btn btn-secondary btn-sm"><i class="fas fa-check"></i> Marcar como leída</button>
                             <button class="btn btn-danger btn-sm" style="margin-left: 5px;"><i class="fas fa-trash"></i> Eliminar</button>
                         </div>
                     </div>
                 `).join('');

                 contentHTML = `
                     <h2 class="section-title"><i class="fas fa-bell"></i> Alertas Inteligentes</h2>
                     <p style="margin-bottom: 20px;">Notificaciones sobre eventos de seguridad importantes y recomendaciones.</p>
                     <div class="grid-container">
                         ${alertCards || '<p>No hay alertas recientes.</p>'}
                     </div>
                      <div class="ai-alert-summary" style="margin-top: 30px;">
                         <h3><i class="fas fa-brain"></i> Resumen Inteligente de Alertas (IA)</h3>
                         <p>Pide a la IA que priorice y resuma las alertas activas.</p>
                         <div class="ai-response" id="ai-alert-summary-response">
                              <div class="spinner-small"></div>
                         </div>
                         <button class="btn" id="summarize-alerts-btn"><i class="fas fa-cogs"></i> Resumir con IA</button>
                     </div>
                 `;
                 container.innerHTML = contentHTML;
                 mainContent.appendChild(container);

                  // Lógica para el resumen de alertas con IA
                 const alertSummaryElement = document.getElementById('ai-alert-summary-response');
                 const summarizeAlertsBtn = document.getElementById('summarize-alerts-btn');

                 const runAlertSummary = () => {
                     if (alertSummaryElement) {
                         alertSummaryElement.innerHTML = '<div class="spinner-small"></div>'; // Show spinner
                         const unreadAlerts = alerts.filter(a => !a.read);
                         const alertPrompt = `Actúa como un asistente de seguridad. Tengo estas alertas activas: ${unreadAlerts.map(a => `[${a.severity}] ${a.title}`).join('; ')}. Por favor, priorízalas y dame un resumen muy breve de lo que debo hacer.`;
                         callGoogleAI(alertPrompt)
                             .then(response => alertSummaryElement.textContent = response)
                             .catch(error => alertSummaryElement.textContent = `Error al obtener resumen de IA: ${error.message}`);
                     }
                 };
                runAlertSummary(); // Run on load
                 if (summarizeAlertsBtn) {
                    summarizeAlertsBtn.addEventListener('click', runAlertSummary);
                 }
                 break;

            case 'settings':
                contentHTML = `
                    <h2 class="section-title"><i class="fas fa-cog"></i> Configuración General</h2>
                     <div class="grid-container">
                         <div class="card" data-aos="fade-up">
                             <div class="card-header"><i class="fas fa-user-circle"></i> Perfil de Usuario</div>
                             <div class="card-content">
                                 <label for="profile-name">Nombre:</label>
                                 <input type="text" id="profile-name" value="José Armando Espinosa Martínez">
                                 <label for="profile-email">Email:</label>
                                 <input type="text" id="profile-email" value="ja.espinosa@email.com" disabled>
                                 <button class="btn btn-sm">Guardar Cambios</button>
                             </div>
                         </div>
                         <div class="card" data-aos="fade-up" data-aos-delay="100">
                             <div class="card-header"><i class="fas fa-bell"></i> Preferencias de Notificación</div>
                             <div class="card-content">
                                <p>Recibir alertas por email: <input type="checkbox" checked></p>
                                <p>Recibir resumen semanal: <input type="checkbox"></p>
                                <p>Notificaciones push (móvil): <span class="status-dot warning"></span> Pendiente configurar</p>
                             </div>
                         </div>
                          <div class="card" data-aos="fade-up" data-aos-delay="200">
                             <div class="card-header"><i class="fas fa-database"></i> Gestión de Datos</div>
                             <div class="card-content">
                                <button class="btn btn-secondary btn-sm"><i class="fas fa-download"></i> Exportar mis datos</button>
                                <button class="btn btn-danger btn-sm" style="margin-top: 10px;"><i class="fas fa-trash-alt"></i> Eliminar mi cuenta</button>
                             </div>
                         </div>
                     </div>
                 `;
                 container.innerHTML = contentHTML;
                 mainContent.appendChild(container);
                 break;

            // --- Secciones de Gestión de Proyectos ---
            case 'project-info':
                 contentHTML = `
                     <h2 class="section-title"><i class="fas fa-project-diagram"></i> Información del Proyecto</h2>
                     <p><strong>Título:</strong> Aplicación de Técnicas de Gestión de Proyectos en el Desarrollo de una Aplicación de Seguridad Personalizada con IA</p>
                     <p><strong>Presentado por:</strong> Ing. Espinosa Martínez José Armando</p>
                     <p><strong>Carrera:</strong> Tecnologías de la Información y la Comunicación (TIC) en sistemas</p>
                     <p><strong>Fecha Documento Base:</strong> 25 de enero de 2025</p>
                     <h3 style="margin-top: 20px;">Objetivo General:</h3>
                     <p>Desarrollar una aplicación multiplataforma con IA que brinde seguridad digital personalizada al usuario, mediante la detección proactiva de amenazas y comportamientos anómalos.</p>
                     <h3 style="margin-top: 20px;">Alcance Resumido:</h3>
                     <p>Frontend (Web/Móvil), Backend (API REST), Modelo de IA (Análisis Comportamiento), Autenticación MFA, Cifrado, Alertas Inteligentes, Gestión de Contraseñas.</p>
                     <h3 style="margin-top: 20px;">Tecnologías Clave (Stack):</h3>
                     <p>React Native, React.js, Node.js, Express, Python (TensorFlow/PyTorch), PostgreSQL, Docker.</p>
                 `;
                 container.innerHTML = contentHTML;
                 mainContent.appendChild(container);
                 break;

             case 'gantt':
                 contentHTML = `
                     <h2 class="section-title"><i class="fas fa-chart-bar"></i> Cronograma (Diagrama de Gantt)</h2>
                     <p>Representación visual del cronograma del proyecto. En una implementación completa, esto podría ser un gráfico interactivo generado con Chart.js o una librería similar, o una imagen estática del diagrama creado en Microsoft Project.</p>
                     <div class="gantt-placeholder" style="margin-top: 20px; text-align: center; background: rgba(0,0,0,0.2); padding: 20px; border-radius: 8px;">
                         <p><strong>[ Placeholder para Gráfico de Gantt ]</strong></p>
                         <p><em>Imagina aquí una visualización de tareas, duraciones y dependencias a lo largo del tiempo.</em></p>
                         <!-- Ejemplo con imagen estática -->
                         <!-- <img src="path/to/your/gantt_chart_image.png" alt="Diagrama de Gantt del Proyecto"> -->
                         <canvas id="ganttChartPlaceholder" style="max-width: 100%; margin-top: 20px;"></canvas>
                         <p style="margin-top: 15px; font-size: 0.9em; color: var(--text-muted);">Nota: Este es un gráfico de ejemplo simplificado.</p>
                     </div>
                 `;
                 container.innerHTML = contentHTML;
                 mainContent.appendChild(container);
                 // Intentar renderizar un Gantt muy básico con Chart.js (opcional)
                 renderSimpleGantt();
                 break;

             case 'pert-cpm':
                 contentHTML = `
                     <h2 class="section-title"><i class="fas fa-network-wired"></i> Planificación (PERT/CPM)</h2>
                     <p>El método PERT (Program Evaluation and Review Technique) y CPM (Critical Path Method) se utilizaron para planificar las tareas, estimar duraciones y determinar la ruta crítica del proyecto.</p>
                     <div class="card" style="margin-top: 20px;">
                         <div class="card-header"><i class="fas fa-tasks"></i> Conceptos Clave Aplicados</div>
                         <div class="card-content">
                             <ul>
                                 <li>Identificación de tareas y dependencias.</li>
                                 <li>Estimación de tiempos (optimista, pesimista, más probable) para tareas clave (Ej: Entrenamiento IA).</li>
                                 <li>Cálculo de holguras para identificar flexibilidad.</li>
                                 <li>Identificación de la <strong>Ruta Crítica</strong>: La secuencia de tareas que determina la duración mínima del proyecto (Ej: Diseño Arquitectura -> Desarrollo Backend Core -> Entrenamiento Modelo IA Base -> Pruebas Integración).</li>
                                 <li>Uso de Microsoft Project para visualizar y gestionar la red PERT/CPM.</li>
                             </ul>
                         </div>
                     </div>
                     <div class="ai-pert-explanation" style="margin-top: 30px;">
                         <h3><i class="fas fa-brain"></i> Explicación IA sobre PERT/CPM</h3>
                         <p>Pregunta a la IA sobre la importancia de la ruta crítica.</p>
                         <div class="ai-response" id="ai-pert-explanation-response">
                              <div class="spinner-small"></div>
                         </div>
                     </div>
                 `;
                 container.innerHTML = contentHTML;
                 mainContent.appendChild(container);
                 // Cargar explicación IA
                 const pertExplanationElement = document.getElementById('ai-pert-explanation-response');
                 if(pertExplanationElement) {
                    const pertPrompt = "Actúa como un experto en gestión de proyectos. Explica brevemente por qué es crucial identificar y gestionar la 'Ruta Crítica' en un proyecto complejo como el desarrollo de software con IA.";
                    callGoogleAI(pertPrompt)
                        .then(response => pertExplanationElement.textContent = response)
                        .catch(error => pertExplanationElement.textContent = `Error al obtener explicación de IA: ${error.message}`);
                 }
                 break;

            default:
                contentHTML = `<h2 class="section-title">Sección no encontrada</h2><p>El contenido para '${sectionId}' no está disponible.</p>`;
                container.innerHTML = contentHTML;
                mainContent.appendChild(container);
        }

        // Inicializar AOS (Animate On Scroll) para las nuevas tarjetas
        AOS.refresh();

        hideLoader(); // Ocultar loader al finalizar
    };

    // Función auxiliar para navegación interna (usada en botones)
    window.navigateTo = (sectionId) => {
        const targetLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
        if (targetLink) {
            navLinks.forEach(link => link.classList.remove('active'));
            targetLink.classList.add('active');
            loadSectionContent(sectionId);
        } else {
            console.error(`Sección "${sectionId}" no encontrada en la navegación.`);
        }
    }

    // Función auxiliar para formatear tiempo (para alertas)
    function timeAgo(timestamp) {
        const now = new Date();
        const past = new Date(timestamp);
        const diffInSeconds = Math.floor((now - past) / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInSeconds < 60) return `Hace ${diffInSeconds} seg`;
        if (diffInMinutes < 60) return `Hace ${diffInMinutes} min`;
        if (diffInHours < 24) return `Hace ${diffInHours} hr`;
        if (diffInDays === 1) return `Ayer`;
        return `Hace ${diffInDays} días`;
    }

    // Función para renderizar un Gantt simplificado (Placeholder)
    function renderSimpleGantt() {
        const ctx = document.getElementById('ganttChartPlaceholder')?.getContext('2d');
        if (!ctx) return;

        // Datos de ejemplo MUY simplificados
        const tasks = [
            { label: 'Fase 1: Planificación', start: 0, duration: 4, color: 'rgba(0, 234, 255, 0.6)' },
            { label: 'Fase 2: Diseño Arq.', start: 4, duration: 6, color: 'rgba(0, 200, 255, 0.6)' },
            { label: 'Fase 3: Desarrollo Core', start: 10, duration: 12, color: 'rgba(0, 160, 255, 0.6)' },
            { label: 'Fase 4: Desarrollo IA', start: 12, duration: 10, color: 'rgba(0, 120, 220, 0.6)' }, // Paralelo parcial
            { label: 'Fase 5: Pruebas', start: 22, duration: 5, color: 'rgba(0, 80, 180, 0.6)' },
            { label: 'Fase 6: Despliegue', start: 27, duration: 3, color: 'rgba(0, 50, 150, 0.6)' },
        ];

        const chartData = {
            datasets: tasks.map((task, index) => ({
                label: task.label,
                data: [{
                    x: [task.start, task.start + task.duration], // [Inicio, Fin] en semanas (ejemplo)
                    y: task.label
                }],
                backgroundColor: task.color,
                borderColor: task.color.replace('0.6', '1'), // Borde más opaco
                borderWidth: 1,
                borderSkipped: false, // Dibuja la barra completa
                borderRadius: 5,
                barPercentage: 0.6,
            }))
        };

        new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                indexAxis: 'y', // Barras horizontales
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }, // Ocultar leyenda por simplicidad
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const task = tasks[context.datasetIndex];
                                return `${task.label}: Semana ${task.start} a ${task.start + task.duration} (${task.duration} sem)`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        position: 'top',
                        title: {
                            display: true,
                            text: 'Semanas del Proyecto',
                            color: 'var(--text-muted)',
                        },
                        grid: { color: 'var(--border-color)'},
                        ticks: { color: 'var(--text-muted)'}
                    },
                    y: {
                         grid: { display: false }, // Sin rejilla vertical
                         ticks: { color: 'var(--text-muted)'}
                    }
                }
            }
        });
    }

    // Event Listeners para la Navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Quitar active de todos
            navLinks.forEach(l => l.classList.remove('active'));
            // Añadir active al clickeado
            link.classList.add('active');

            const sectionId = link.getAttribute('data-section');
            loadSectionContent(sectionId);
        });
    });

    // Carga Inicial (Dashboard) y ocultar loader inicial
    loadSectionContent('dashboard').finally(() => {
        // Asegúrate que el loader se oculte después de la carga inicial,
        // incluso si hubo errores internos en loadSectionContent
       // hideLoader(); Ya se llama dentro de loadSectionContent
    });

    // Inicializar AOS globalmente
    AOS.init({
        duration: 600, // Duración de la animación
        once: true, // Animar solo una vez
        offset: 50 // Offset antes de que la animación empiece
    });

    // Estilo para el spinner pequeño usado en las respuestas de IA
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`
        .spinner-small {
            width: 20px;
            height: 20px;
            border: 3px solid var(--border-color);
            border-top-color: var(--accent-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            display: inline-block; /* o block con margin auto */
            margin: 10px auto; /* Centrar si es block */
        }
    `, styleSheet.cssRules.length);

     // Estilos adicionales para la tabla
    styleSheet.insertRule(`
        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            font-size: 0.9em;
        }
    `, styleSheet.cssRules.length);
    styleSheet.insertRule(`
        .data-table th, .data-table td {
            padding: 12px 15px;
            border: 1px solid var(--border-color);
            text-align: left;
        }
    `, styleSheet.cssRules.length);
    styleSheet.insertRule(`
        .data-table thead th {
            background-color: var(--secondary-color);
            color: var(--accent-color);
            font-family: var(--font-display);
            letter-spacing: 0.5px;
        }
    `, styleSheet.cssRules.length);
    styleSheet.insertRule(`
        .data-table tbody tr:nth-child(even) {
            background-color: rgba(26, 42, 108, 0.2);
        }
    `, styleSheet.cssRules.length);
    styleSheet.insertRule(`
        .data-table tbody tr:hover {
            background-color: var(--bg-glass);
        }
    `, styleSheet.cssRules.length);
    styleSheet.insertRule(`
        .data-table .btn-sm { padding: 5px 10px; font-size: 0.8em; }
    `, styleSheet.cssRules.length);

     // Estilos para alertas (unread, timestamp)
    styleSheet.insertRule(`
        .alert-card.unread { border-left-width: 8px; }
    `, styleSheet.cssRules.length);
    styleSheet.insertRule(`
        .alert-card .card-header { position: relative; }
    `, styleSheet.cssRules.length);
    styleSheet.insertRule(`
        .alert-timestamp {
            font-size: 0.8em;
            color: var(--text-muted);
            margin-left: auto; /* Empuja a la derecha */
            padding-left: 15px;
        }
    `, styleSheet.cssRules.length);
     styleSheet.insertRule(`
        .unread-indicator {
            display: inline-block;
            width: 8px;
            height: 8px;
            background-color: var(--accent-color);
            border-radius: 50%;
            margin-left: 10px;
            vertical-align: middle;
            box-shadow: 0 0 5px var(--accent-color);
        }
    `, styleSheet.cssRules.length);

});