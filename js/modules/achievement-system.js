// ============================================================
// ACHIEVEMENT SYSTEM
// ============================================================

window.achievementSystem = {
    achievements: [
        {
            id: 'first_visit',
            title: 'Primera Visita',
            description: 'Bienvenido al portafolio cyberpunk',
            unlocked: false
        },
        {
            id: 'scroll_master',
            title: 'Maestro del Scroll',
            description: 'Has navegado por todas las secciones',
            unlocked: false
        },
        {
            id: 'sound_explorer',
            title: 'Explorador de Sonidos',
            description: 'Has interactuado con todos los elementos de audio',
            unlocked: false
        },
        {
            id: 'theme_changer',
            title: 'Cambiador de Temas',
            description: 'Has cambiado entre temas claro y oscuro',
            unlocked: false
        }
    ],
    
    unlockedCount: 0,
    
    init: function() {
        // Load achievements from localStorage
        const savedAchievements = localStorage.getItem('portfolioAchievements');
        if (savedAchievements) {
            this.achievements = JSON.parse(savedAchievements);
        }
        
        this.updateUnlockedCount();
        this.checkAchievements();
    },
    
    unlock: function(achievementId) {
        const achievement = this.achievements.find(a => a.id === achievementId);
        if (achievement && !achievement.unlocked) {
            achievement.unlocked = true;
            this.unlockedCount++;
            
            // Save to localStorage
            localStorage.setItem('portfolioAchievements', JSON.stringify(this.achievements));
            
            // Show notification
            this.showNotification(achievement);
            
            // Log achievement
            if (window.systemLog) {
                window.systemLog.add(`¡Logro desbloqueado: ${achievement.title}!`, 'success');
            }
            
            if (window.playSound) window.playSound('complete', 0.8);
        }
    },
    
    showNotification: function(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <h3>🏆 ${achievement.title}</h3>
                <p>${achievement.description}</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    },
    
    updateUnlockedCount: function() {
        this.unlockedCount = this.achievements.filter(a => a.unlocked).length;
    },
    
    checkAchievements: function() {
        // Check for first visit
        if (!localStorage.getItem('portfolioFirstVisit')) {
            localStorage.setItem('portfolioFirstVisit', 'true');
            this.unlock('first_visit');
        }
        
        // Check for theme changes
        const themeChanges = localStorage.getItem('portfolioThemeChanges') || 0;
        if (parseInt(themeChanges) > 0) {
            this.unlock('theme_changer');
        }
    },
    
    getProgress: function() {
        return {
            unlocked: this.unlockedCount,
            total: this.achievements.length,
            percentage: Math.round((this.unlockedCount / this.achievements.length) * 100)
        };
    }
};

// Initialize achievement system
document.addEventListener('DOMContentLoaded', () => {
    window.achievementSystem.init();
}); 