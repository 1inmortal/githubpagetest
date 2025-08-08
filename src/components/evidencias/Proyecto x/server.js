const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

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

// Configuración de seguridad
app.use((req, res, next) => {
    // Headers de seguridad
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;");
    
    next();
});

// Rate limiting
if (rateLimit) {
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutos
        max: 100, // máximo 100 requests por ventana
        message: {
            error: 'Demasiadas requests desde esta IP, intenta de nuevo más tarde.'
        },
        standardHeaders: true,
        legacyHeaders: false,
    });
    
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

// Middleware para parsear JSON de forma segura
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Función para sanitizar entrada
function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return '';
    }
    
    return input
        .replace(/[<>\"'&]/g, '')
        .trim();
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
});
