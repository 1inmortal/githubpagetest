// ============================================================
// THEME & LANGUAGE TOGGLE
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const langToggle = document.getElementById('langToggle');
    const htmlEl = document.documentElement;

    // Theme Toggle
    if (themeToggle) {
        // Siempre inicia en oscuro (verde) salvo que el usuario seleccione claro manualmente
        let currentTheme = 'dark';
        if (localStorage.getItem('portfolioTheme') === 'light') {
            currentTheme = 'light';
        }
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
            // Aquí podrías implementar la lógica real de cambio de idioma
        });
    }

    function updateLanguageButton(lang) {
        if (langToggle) {
            langToggle.textContent = lang === 'es' ? 'EN' : 'ES';
            langToggle.setAttribute('aria-label', lang === 'es' ? 'Cambiar a Inglés' : 'Cambiar a Español');
        }
    }
}); 