/**
 * Migración Automática de localStorage a Cookies Seguras
 * Este script migra automáticamente todos los datos de localStorage a cookies seguras
 * y proporciona funciones para manejo seguro de datos
 */

// Configuración de cookies seguras
const COOKIE_CONFIG = {
    domain: '.github.io',
    secure: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000, // 24 horas
    path: '/'
};

// Mapeo completo de claves de localStorage a cookies seguras
const MIGRATION_MAP = new Map([
    // Configuraciones de audio
    ['isAudioEnabled', 'audio_enabled'],
    ['menuMuted', 'menu_muted'],
    ['dashboardMuted', 'dashboard_muted'],
    
    // Configuraciones de tema
    ['theme', 'app_theme'],
    ['themePrimaryColor', 'theme_primary'],
    ['themeSecondaryColor', 'theme_secondary'],
    ['themeAccentColor', 'theme_accent'],
    ['highContrast', 'high_contrast'],
    
    // Configuraciones de volumen
    ['volume', 'audio_volume'],
    
    // Configuraciones de playlist
    ['playlistData', 'playlist_data'],
    
    // Configuraciones de proyecto
    ['selectedItemId_projects', 'selected_project_id'],
    ['selectedItemId_missions', 'selected_mission_id'],
    ['selectedMissionId', 'selected_mission'],
    ['projectOrder', 'project_order'],
    ['achievements', 'user_achievements'],
    
    // Configuraciones de interfaz
    ['animationsEnabled', 'animations_enabled'],
    ['soundNotificationsEnabled', 'sound_notifications'],
    ['vibrationEnabled', 'vibration_enabled'],
    ['layoutDragEnabled', 'layout_drag_enabled'],
    ['animationSpeedFactor', 'animation_speed'],
    
    // Configuraciones de tutorial
    ['tutorialShown', 'tutorial_shown'],
    
    // Configuraciones de herramientas
    ['cyberToolsSettings', 'cyber_tools_settings'],
    ['phonkPrompts', 'phonk_prompts']
]);

/**
 * Clase para migración de localStorage a cookies seguras
 */
class LocalStorageMigrator {
    constructor() {
        this.migrationMap = MIGRATION_MAP;
        this.cookieConfig = COOKIE_CONFIG;
    }

    /**
     * Migrar un valor de localStorage a cookie segura
     * @param {string} localStorageKey - Clave en localStorage
     * @param {string} defaultValue - Valor por defecto si no existe
     * @returns {string} - Valor migrado
     */
    migrateValue(localStorageKey, defaultValue = '') {
        const cookieKey = this.migrationMap.get(localStorageKey);
        if (!cookieKey) return defaultValue;

        // Intentar obtener de cookie primero
        let value = this.getCookie(cookieKey);
        
        // Si no hay cookie, intentar localStorage y migrar
        if (value === null) {
            const localValue = localStorage.getItem(localStorageKey);
            if (localValue !== null) {
                value = localValue;
                this.setCookie(cookieKey, value);
                // Limpiar localStorage
                localStorage.removeItem(localStorageKey);
                console.log(`🔄 Migrado: ${localStorageKey} -> ${cookieKey}`);
            }
        }

        return value !== null ? value : defaultValue;
    }

    /**
     * Establecer un valor seguro en cookie
     * @param {string} localStorageKey - Clave original de localStorage
     * @param {string} value - Valor a guardar
     */
    setSecureValue(localStorageKey, value) {
        const cookieKey = this.migrationMap.get(localStorageKey);
        if (cookieKey) {
            this.setCookie(cookieKey, value);
        }
    }

    /**
     * Obtener un valor seguro
     * @param {string} localStorageKey - Clave original de localStorage
     * @param {string} defaultValue - Valor por defecto
     * @returns {string} - Valor almacenado
     */
    getSecureValue(localStorageKey, defaultValue = '') {
        return this.migrateValue(localStorageKey, defaultValue);
    }

    /**
     * Establecer una cookie segura
     * @param {string} name - Nombre de la cookie
     * @param {string} value - Valor de la cookie
     */
    setCookie(name, value) {
        let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
        
        if (this.cookieConfig.domain) cookieString += `; domain=${this.cookieConfig.domain}`;
        if (this.cookieConfig.path) cookieString += `; path=${this.cookieConfig.path}`;
        if (this.cookieConfig.maxAge) cookieString += `; max-age=${this.cookieConfig.maxAge}`;
        if (this.cookieConfig.secure) cookieString += '; secure';
        if (this.cookieConfig.sameSite) cookieString += `; samesite=${this.cookieConfig.sameSite}`;

        document.cookie = cookieString;
    }

    /**
     * Obtener el valor de una cookie
     * @param {string} name - Nombre de la cookie
     * @returns {string|null} - Valor de la cookie o null si no existe
     */
    getCookie(name) {
        const nameEQ = encodeURIComponent(name) + "=";
        const ca = document.cookie.split(';');
        
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) {
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
            }
        }
        return null;
    }

    /**
     * Eliminar una cookie
     * @param {string} name - Nombre de la cookie
     */
    deleteCookie(name) {
        this.setCookie(name, '', { maxAge: -1 });
    }
}

// Instancia global del migrador
const migrator = new LocalStorageMigrator();

// Función para migrar todas las claves de localStorage
function migrateAllLocalStorage() {
    console.log('🔄 Iniciando migración completa de localStorage a cookies seguras...');
    
    const migrationStatus = {
        migrated: {},
        errors: {},
        localStorage: {},
        cookies: {}
    };

    // Migrar cada clave del mapa
    for (const [localKey, cookieKey] of MIGRATION_MAP) {
        try {
            const localValue = localStorage.getItem(localKey);
            if (localValue !== null) {
                const migratedValue = migrator.migrateValue(localKey);
                migrationStatus.migrated[localKey] = {
                    from: localValue,
                    to: migratedValue,
                    cookieKey: cookieKey
                };
                
                // Limpiar localStorage después de la migración
                if (localStorage.getItem(localKey) !== null) {
                    localStorage.removeItem(localKey);
                    console.log(`🗑️ Limpiado localStorage: ${localKey}`);
                }
            }
        } catch (error) {
            migrationStatus.errors[localKey] = error.message;
            console.error(`❌ Error migrando ${localKey}:`, error);
        }
    }

    // Verificar estado final
    for (const [localKey, cookieKey] of MIGRATION_MAP) {
        const localValue = localStorage.getItem(localKey);
        const cookieValue = migrator.getSecureValue(localKey);
        
        migrationStatus.localStorage[localKey] = localValue;
        migrationStatus.cookies[cookieKey] = cookieValue;
        
        if (localValue !== null && localValue !== '') {
            console.warn(`⚠️ localStorage aún contiene datos: ${localKey}`);
        }
    }

    console.log('📊 Estado de migración:', migrationStatus);
    return migrationStatus;
}

// Función para limpiar localStorage completamente
function clearLocalStorage() {
    console.log('🧹 Iniciando limpieza completa de localStorage...');
    
    let clearedCount = 0;
    const keysToCheck = Array.from(MIGRATION_MAP.keys());
    
    for (const key of keysToCheck) {
        if (localStorage.getItem(key) !== null) {
            localStorage.removeItem(key);
            clearedCount++;
            console.log(`🗑️ Limpiado localStorage: ${key}`);
        }
    }
    
    console.log(`🗑️ Limpieza completada: ${clearedCount} claves eliminadas de localStorage`);
    return clearedCount;
}

// API pública
window.LocalStorageMigration = {
    migrate: migrateAllLocalStorage,
    clear: clearLocalStorage,
    migrator: migrator,
    getSecureValue: (key, defaultValue) => migrator.getSecureValue(key, defaultValue),
    setSecureValue: (key, value) => migrator.setSecureValue(key, value)
};

// Migración automática al cargar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', migrateAllLocalStorage);
} else {
    migrateAllLocalStorage();
}

// Log de carga
console.log('🚀 Script de migración de localStorage cargado');
console.log('📋 Claves disponibles para migración:', Array.from(MIGRATION_MAP.keys()));
