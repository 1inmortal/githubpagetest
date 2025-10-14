// Script para analizar problemas de responsive design en T-1.html
console.log('🔍 Analizando problemas de responsive design...');

// Función para detectar elementos que se salen del viewport
function detectOverflowIssues() {
    const issues = [];
    
    // Verificar si hay scroll horizontal
    if (document.body.scrollWidth > window.innerWidth) {
        issues.push({
            type: 'horizontal_scroll',
            message: 'Scroll horizontal detectado - elementos se salen del viewport',
            severity: 'high'
        });
    }
    
    // Verificar elementos con width fijo problemático
    const fixedWidthElements = document.querySelectorAll('*');
    fixedWidthElements.forEach(el => {
        const computedStyle = window.getComputedStyle(el);
        const width = computedStyle.width;
        
        // Detectar elementos con width fijo que pueden causar problemas
        if (width.includes('px') && !width.includes('max-width')) {
            const widthValue = parseInt(width);
            if (widthValue > window.innerWidth * 0.9) {
                issues.push({
                    type: 'fixed_width',
                    element: el.tagName + (el.className ? '.' + el.className : ''),
                    message: `Elemento con width fijo de ${width} puede causar overflow`,
                    severity: 'medium'
                });
            }
        }
    });
    
    return issues;
}

// Función para analizar títulos muy grandes
function analyzeTitleSizes() {
    const issues = [];
    const titles = document.querySelectorAll('h1, h2, h3, .section-title, .hero-title');
    
    titles.forEach(title => {
        const computedStyle = window.getComputedStyle(title);
        const fontSize = parseFloat(computedStyle.fontSize);
        const viewportWidth = window.innerWidth;
        
        // Si el título es muy grande para el viewport
        if (fontSize > viewportWidth * 0.15) {
            issues.push({
                type: 'large_title',
                element: title.tagName + (title.className ? '.' + title.className : ''),
                message: `Título muy grande: ${fontSize}px en viewport de ${viewportWidth}px`,
                severity: 'high'
            });
        }
    });
    
    return issues;
}

// Función para analizar paneles desproporcionados
function analyzePanelSizes() {
    const issues = [];
    const panels = document.querySelectorAll('.feature-card, .demo-card, .metric-card, .python-terminal');
    
    panels.forEach(panel => {
        const rect = panel.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        
        // Si el panel es muy alto para el viewport
        if (rect.height > viewportHeight * 0.4) {
            issues.push({
                type: 'tall_panel',
                element: panel.className,
                message: `Panel muy alto: ${Math.round(rect.height)}px (${Math.round(rect.height/viewportHeight*100)}% del viewport)`,
                severity: 'medium'
            });
        }
        
        // Si el panel es muy ancho
        if (rect.width > viewportWidth * 0.95) {
            issues.push({
                type: 'wide_panel',
                element: panel.className,
                message: `Panel muy ancho: ${Math.round(rect.width)}px (${Math.round(rect.width/viewportWidth*100)}% del viewport)`,
                severity: 'medium'
            });
        }
    });
    
    return issues;
}

// Función para detectar problemas de padding/margin
function analyzeSpacing() {
    const issues = [];
    const containers = document.querySelectorAll('.container, .feature-card, .python-demo-container');
    
    containers.forEach(container => {
        const computedStyle = window.getComputedStyle(container);
        const paddingLeft = parseFloat(computedStyle.paddingLeft);
        const paddingRight = parseFloat(computedStyle.paddingRight);
        const marginLeft = parseFloat(computedStyle.marginLeft);
        const marginRight = parseFloat(computedStyle.marginRight);
        
        const totalHorizontalSpace = paddingLeft + paddingRight + marginLeft + marginRight;
        const viewportWidth = window.innerWidth;
        
        // Si el espaciado es excesivo
        if (totalHorizontalSpace > viewportWidth * 0.2) {
            issues.push({
                type: 'excessive_spacing',
                element: container.className,
                message: `Espaciado excesivo: ${Math.round(totalHorizontalSpace)}px (${Math.round(totalHorizontalSpace/viewportWidth*100)}% del viewport)`,
                severity: 'low'
            });
        }
    });
    
    return issues;
}

// Ejecutar análisis
function runAnalysis() {
    console.log('📱 Iniciando análisis de responsive design...');
    
    const overflowIssues = detectOverflowIssues();
    const titleIssues = analyzeTitleSizes();
    const panelIssues = analyzePanelSizes();
    const spacingIssues = analyzeSpacing();
    
    const allIssues = [...overflowIssues, ...titleIssues, ...panelIssues, ...spacingIssues];
    
    console.log(`\n📊 Resumen del análisis:`);
    console.log(`- Problemas de overflow: ${overflowIssues.length}`);
    console.log(`- Títulos problemáticos: ${titleIssues.length}`);
    console.log(`- Paneles desproporcionados: ${panelIssues.length}`);
    console.log(`- Problemas de espaciado: ${spacingIssues.length}`);
    console.log(`- Total de problemas: ${allIssues.length}`);
    
    if (allIssues.length > 0) {
        console.log('\n🚨 Problemas detectados:');
        allIssues.forEach((issue, index) => {
            const severityIcon = issue.severity === 'high' ? '🔴' : issue.severity === 'medium' ? '🟡' : '🟢';
            console.log(`${severityIcon} ${index + 1}. [${issue.type.toUpperCase()}] ${issue.message}`);
            if (issue.element) {
                console.log(`   Elemento: ${issue.element}`);
            }
        });
    } else {
        console.log('\n✅ No se detectaron problemas significativos de responsive design');
    }
    
    return allIssues;
}

// Ejecutar cuando la página esté cargada
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAnalysis);
} else {
    runAnalysis();
}

// Re-ejecutar en diferentes tamaños de ventana
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        console.log('\n🔄 Re-analizando después de cambio de tamaño...');
        runAnalysis();
    }, 500);
});

// Exportar para uso en consola
window.mobileAnalysis = {
    runAnalysis,
    detectOverflowIssues,
    analyzeTitleSizes,
    analyzePanelSizes,
    analyzeSpacing
};

console.log('💡 Usa window.mobileAnalysis.runAnalysis() para re-ejecutar el análisis');
