
const COOKIE_CONFIG = {
    domain: '.github.io',
    secure: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000,
    path: '/'
};
const MIGRATION_MAP = new Map([
    ['isAudioEnabled', 'audio_enabled'],
    ['menuMuted', 'menu_muted'],
    ['dashboardMuted', 'dashboard_muted'],
    ['theme', 'app_theme'],
    ['themePrimaryColor', 'theme_primary'],
    ['themeSecondaryColor', 'theme_secondary'],
    ['themeAccentColor', 'theme_accent'],
    ['highContrast', 'high_contrast'],
    ['volume', 'audio_volume'],
    ['playlistData', 'playlist_data'],
    ['selectedItemId_projects', 'selected_project_id'],
    ['selectedItemId_missions', 'selected_mission_id'],
    ['selectedMissionId', 'selected_mission'],
    ['projectOrder', 'project_order'],
    ['achievements', 'user_achievements'],
    ['animationsEnabled', 'animations_enabled'],
    ['soundNotificationsEnabled', 'sound_notifications'],
    ['vibrationEnabled', 'vibration_enabled'],
    ['layoutDragEnabled', 'layout_drag_enabled'],
    ['animationSpeedFactor', 'animation_speed'],
    ['tutorialShown', 'tutorial_shown'],
    ['cyberToolsSettings', 'cyber_tools_settings'],
    ['phonkPrompts', 'phonk_prompts']
]);
class LocalStorageMigrator {
    constructor() {
        this.migrationMap = MIGRATION_MAP;
        this.cookieConfig = COOKIE_CONFIG;
    }
    migrateValue(localStorageKey, defaultValue = '') {
        const cookieKey = this.migrationMap.get(localStorageKey);
        if (!cookieKey) return defaultValue;
        let value = this.getCookie(cookieKey);
        if (value === null) {
            const localValue = localStorage.getItem(localStorageKey);
            if (localValue !== null) {
                value = localValue;
                this.setCookie(cookieKey, value);
                localStorage.removeItem(localStorageKey);
                console.log(`🔄 Migrado: ${localStorageKey} -> ${cookieKey}`);
            }
        }
        return value !== null ? value : defaultValue;
    }
    setSecureValue(localStorageKey, value) {
        const cookieKey = this.migrationMap.get(localStorageKey);
        if (cookieKey) {
            this.setCookie(cookieKey, value);
        }
    }
    getSecureValue(localStorageKey, defaultValue = '') {
        return this.migrateValue(localStorageKey, defaultValue);
    }
    setCookie(name, value) {
        let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
        if (this.cookieConfig.domain) cookieString += `; domain=${this.cookieConfig.domain}`;
        if (this.cookieConfig.path) cookieString += `; path=${this.cookieConfig.path}`;
        if (this.cookieConfig.maxAge) cookieString += `; max-age=${this.cookieConfig.maxAge}`;
        if (this.cookieConfig.secure) cookieString += '; secure';
        if (this.cookieConfig.sameSite) cookieString += `; samesite=${this.cookieConfig.sameSite}`;
        document.cookie = cookieString;
    }
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
    deleteCookie(name) {
        this.setCookie(name, '', { maxAge: -1 });
    }
}
const migrator = new LocalStorageMigrator();
function migrateAllLocalStorage() {
    console.log('🔄 Iniciando migración completa de localStorage a cookies seguras...');
    const migrationStatus = {
        migrated: {},
        errors: {},
        localStorage: {},
        cookies: {}
    };
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
window.LocalStorageMigration = {
    migrate: migrateAllLocalStorage,
    clear: clearLocalStorage,
    migrator: migrator,
    getSecureValue: (key, defaultValue) => migrator.getSecureValue(key, defaultValue),
    setSecureValue: (key, value) => migrator.setSecureValue(key, value)
};
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', migrateAllLocalStorage);
} else {
    migrateAllLocalStorage();
}
console.log('🚀 Script de migración de localStorage cargado');
console.log('📋 Claves disponibles para migración:', Array.from(MIGRATION_MAP.keys()));
