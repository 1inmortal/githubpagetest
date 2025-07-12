// ============================================================
// PROJECTS ARCHIVE
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    const searchProjectInput = document.getElementById('searchProjectInput');
    const searchProjectBtn = document.getElementById('searchProjectBtn');
    const projectGrid = document.getElementById('projectGrid');
    const allProjectItems = projectGrid ? Array.from(projectGrid.querySelectorAll('.project-item')) : [];
    
    // Search functionality
    if (searchProjectInput && searchProjectBtn) {
        searchProjectBtn.addEventListener('click', () => {
            const searchTerm = searchProjectInput.value.toLowerCase().trim();
            filterProjects(searchTerm);
        });
        
        searchProjectInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = searchProjectInput.value.toLowerCase().trim();
                filterProjects(searchTerm);
            }
        });
    }
    
    function filterProjects(searchTerm) {
        if (!projectGrid) return;
        
        allProjectItems.forEach(item => {
            const title = item.querySelector('.project-title')?.textContent.toLowerCase() || '';
            const description = item.querySelector('.project-description')?.textContent.toLowerCase() || '';
            const tags = item.querySelector('.project-tags')?.textContent.toLowerCase() || '';
            
            const matches = title.includes(searchTerm) || 
                          description.includes(searchTerm) || 
                          tags.includes(searchTerm);
            
            if (matches) {
                item.style.display = 'block';
                item.classList.add('visible');
            } else {
                item.style.display = 'none';
                item.classList.remove('visible');
            }
        });
        
        if (window.playSound) window.playSound('click');
    }
    
    // Project statistics
    function updateProjectStats() {
        const visibleProjects = allProjectItems.filter(item => 
            item.style.display !== 'none' && item.classList.contains('visible')
        );
        
        const statsContainer = document.querySelector('.project-stats');
        if (statsContainer) {
            const totalProjects = allProjectItems.length;
            const visibleCount = visibleProjects.length;
            
            statsContainer.innerHTML = `
                <div class="stat-item">
                    <span class="stat-label">Proyectos Mostrados:</span>
                    <span class="stat-value">${visibleCount}/${totalProjects}</span>
                </div>
            `;
        }
    }
    
    // Initialize project archive
    if (projectGrid) {
        updateProjectStats();
        
        // Add click handlers for project items
        allProjectItems.forEach(item => {
            item.addEventListener('click', () => {
                // Add project preview functionality here
                if (window.playSound) window.playSound('click');
            });
        });
    }
}); 