// ============================================================
// HAMBURGER MENU
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburgerMenu');
    const panel = document.getElementById('headerMobilePanel');
    
    if (hamburger && panel) {
        hamburger.addEventListener('click', function() {
            const isOpen = panel.classList.toggle('open');
            hamburger.classList.toggle('active', isOpen);
            document.body.classList.toggle('menu-open', isOpen);
            hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
        
        // Cerrar al hacer click fuera
        document.addEventListener('click', function(e) {
            if(window.innerWidth > 768) return;
            if(panel.classList.contains('open') && !panel.contains(e.target) && !hamburger.contains(e.target)) {
                panel.classList.remove('open');
                hamburger.classList.remove('active');
                document.body.classList.remove('menu-open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Cerrar con Escape
        document.addEventListener('keydown', function(e) {
            if(e.key === 'Escape' && panel.classList.contains('open')) {
                panel.classList.remove('open');
                hamburger.classList.remove('active');
                document.body.classList.remove('menu-open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Cerrar menú hamburguesa al hacer clic en cualquier enlace o botón dentro del panel móvil
        const cerrarMenuHamburguesa = () => {
            if (window.innerWidth <= 768 && panel.classList.contains('open')) {
                panel.classList.remove('open');
                hamburger.classList.remove('active');
                document.body.classList.remove('menu-open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        };
        
        if (panel) {
            panel.querySelectorAll('a, button').forEach(el => {
                el.addEventListener('click', function(e) {
                    cerrarMenuHamburguesa();
                });
            });
        }
    }
}); 