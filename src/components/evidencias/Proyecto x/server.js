const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const helmet = require('helmet');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');

// Importar configuración de seguridad centralizada
const securityConfig = require('../../../../config/security-config');

// Importar rate limiting
let rateLimit;
try {
    rateLimit = require('express-rate-limit');
} catch (error) {
    console.warn('⚠️ express-rate-limit no disponible, usando fallback');
}

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configuración de CORS
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000', 'https://1inmortal.github.io'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Configuración de Helmet para seguridad
app.use(helmet(securityConfig.getHelmetConfig()));

// Middleware para generar nonces únicos para cada request
app.use((req, res, next) => {
    const nonce = securityConfig.generateNonce();
    res.locals.nonce = nonce;
    
    // Headers de seguridad adicionales
    const securityHeaders = securityConfig.getSecurityHeaders();
    Object.entries(securityHeaders).forEach(([key, value]) => {
        res.setHeader(key, value);
    });
    
    next();
});

// Rate limiting
if (rateLimit) {
    const limiter = rateLimit(securityConfig.getRateLimitConfig());
    app.use(limiter);
    
    // Rate limiting específico para el chat
    const chatLimiter = rateLimit({
        windowMs: 1 * 60 * 1000, // 1 minuto
        max: 10, // máximo 10 mensajes por minuto
        message: {
            error: 'Demasiados mensajes, espera un momento.'
        }
    });
    
    app.use('/chat', chatLimiter);
} else {
    console.warn('⚠️ Rate limiting no disponible');
}

// Middleware para cookies y sesiones
app.use(cookieParser());
app.use(session(securityConfig.getSessionConfig()));

// Middleware para parsear JSON de forma segura
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Función para sanitizar entrada usando DOMPurify
function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return '';
    }
    
    // Sanitización básica antes de DOMPurify
    let sanitized = input
        .replace(/[<>\"'&]/g, '')
        .trim();
    
    // Si DOMPurify está disponible, usarlo para sanitización adicional
    if (typeof DOMPurify !== 'undefined') {
        sanitized = DOMPurify.sanitize(sanitized, {
            ALLOWED_TAGS: [],
            ALLOWED_ATTR: []
        });
    }
    
    return sanitized;
}

// Envía el main.html que está en el mismo directorio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'main.html'));
});

// Endpoint seguro para el chat
app.post('/chat', (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Mensaje inválido' });
        }
        
        // Sanitizar mensaje
        const sanitizedMessage = sanitizeInput(message);
        
        if (sanitizedMessage.length === 0) {
            return res.status(400).json({ error: 'Mensaje vacío' });
        }
        
        if (sanitizedMessage.length > 500) {
            return res.status(400).json({ error: 'Mensaje demasiado largo' });
        }
        
        // Emitir mensaje sanitizado
        io.emit('chat message', sanitizedMessage);
        
        res.json({ success: true, message: sanitizedMessage });
    } catch (error) {
        console.error('Error en endpoint de chat:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Si tienes otros recursos, configúralos (opcional)
// app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    
    // Rate limiting para mensajes de socket
    let messageCount = 0;
    const messageLimit = 10; // máximo 10 mensajes por minuto
    const messageWindow = 60000; // 1 minuto
    
    setInterval(() => {
        messageCount = 0;
    }, messageWindow);
    
    socket.on('chat message', (msg) => {
        // Verificar rate limit
        if (messageCount >= messageLimit) {
            socket.emit('error', 'Demasiados mensajes, espera un momento.');
            return;
        }
        
        // Sanitizar mensaje
        if (typeof msg === 'string') {
            const sanitizedMsg = sanitizeInput(msg);
            if (sanitizedMsg.length > 0 && sanitizedMsg.length <= 500) {
                messageCount++;
                io.emit('chat message', sanitizedMsg);
            }
        }
    });
    
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🔒 Servidor seguro escuchando en el puerto ${PORT}`);
    console.log('✅ Rate limiting: ' + (rateLimit ? 'Activado' : 'No disponible'));
    console.log('✅ Headers de seguridad: Activados');
    console.log('✅ Helmet: Activado');
    console.log('✅ CSP: Configurado sin unsafe-inline');
});
