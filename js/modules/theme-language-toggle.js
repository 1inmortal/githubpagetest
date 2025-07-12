// ============================================================
// THEME & LANGUAGE TOGGLE
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const langToggle = document.getElementById('langToggle');
    const htmlEl = document.documentElement;

    // Theme Toggle
    if (themeToggle) {
        // Initialize theme from localStorage or default to dark
        const currentTheme = localStorage.getItem('portfolioTheme') || 'dark';
        htmlEl.setAttribute('data-theme', currentTheme);
        updateThemeButton(currentTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlEl.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlEl.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolioTheme', newTheme);
            updateThemeButton(newTheme);
            
            if (window.playSound) window.playSound('click');
        });
    }

    function updateThemeButton(theme) {
        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? 'LGT' : 'DRK';
            themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a Tema Claro' : 'Cambiar a Tema Oscuro');
        }
    }

    // Language Toggle
    if (langToggle) {
        // Initialize language from localStorage or default to Spanish
        const currentLang = localStorage.getItem('portfolioLanguage') || 'es';
        updateLanguageButton(currentLang);

        langToggle.addEventListener('click', () => {
            const currentLang = langToggle.textContent === 'EN' ? 'es' : 'en';
            const newLang = currentLang === 'es' ? 'en' : 'es';
            
            localStorage.setItem('portfolioLanguage', newLang);
            updateLanguageButton(newLang);
            
            if (window.playSound) window.playSound('click');
            
            // Here you could implement actual language switching logic
            // For now, we just update the button
        });
    }

    function updateLanguageButton(lang) {
        if (langToggle) {
            langToggle.textContent = lang === 'es' ? 'EN' : 'ES';
            langToggle.setAttribute('aria-label', lang === 'es' ? 'Cambiar a Inglés' : 'Cambiar a Español');
        }
    }
}); 