/**
 * Configuración de Seguridad Centralizada
 * Este archivo contiene todas las configuraciones de seguridad para el proyecto
 */

const crypto = require('crypto');

// Generar nonce único para cada request
const generateNonce = () => crypto.randomBytes(16).toString('base64');

// Configuración de Content Security Policy
const getCSPConfig = (nonce) => ({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
            "'self'",
            `'nonce-${nonce}'`,
            "https://www.googletagmanager.com",
            "https://cdnjs.cloudflare.com",
            "https://www.google-analytics.com",
            "https://code.jquery.com"
        ],
        styleSrc: [
            "'self'",
            `'nonce-${nonce}'`,
            "https://fonts.googleapis.com",
            "https://cdn.jsdelivr.net",
            "https://cdnjs.cloudflare.com"
        ],
        fontSrc: [
            "'self'",
            "https://fonts.gstatic.com",
            "https://cdn.jsdelivr.net",
            "https://cdnjs.cloudflare.com"
        ],
        imgSrc: [
            "'self'",
            "data:",
            "https:",
            "https://www.google-analytics.com",
            "https://images.unsplash.com",
            "https://upload.wikimedia.org"
        ],
        connectSrc: [
            "'self'",
            "https://www.google-analytics.com",
            "https://fonts.googleapis.com",
            "https://fonts.gstatic.com"
        ],
        mediaSrc: [
            "'self'",
            "https:"
        ],
        objectSrc: ["'none'"],
        frameSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        upgradeInsecureRequests: []
    }
});

// Headers de seguridad adicionales
const getSecurityHeaders = () => ({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin',
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
});

// Configuración de Helmet
const getHelmetConfig = (nonce) => ({
    contentSecurityPolicy: getCSPConfig(nonce),
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    permissionsPolicy: {
        features: {
            geolocation: [],
            microphone: [],
            camera: [],
            payment: [],
            usb: [],
            magnetometer: [],
            gyroscope: [],
            accelerometer: []
        }
    }
});

// Configuración de rate limiting
const getRateLimitConfig = () => ({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máximo 100 requests por ventana
    message: {
        error: 'Demasiadas requests desde esta IP, intenta de nuevo más tarde.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false,
    skipFailedRequests: false
});

// Configuración de cookies seguras
const getCookieConfig = () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000, // 24 horas
    path: '/'
});

// Configuración de sesiones
const getSessionConfig = () => ({
    secret: process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex'),
    resave: false,
    saveUninitialized: false,
    cookie: getCookieConfig(),
    name: 'sessionId'
});

module.exports = {
    generateNonce,
    getCSPConfig,
    getSecurityHeaders,
    getHelmetConfig,
    getRateLimitConfig,
    getCookieConfig,
    getSessionConfig
};
