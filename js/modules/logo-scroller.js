/**
 * Logo Scroller Module
 * Sistema para el scroller de logos infinito y aplicación de máscaras SVG
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- SCRIPT PARA APLICAR MÁSCARAS DE LOGOS SVG DINÁMICAMENTE ---
  const logoItems = document.querySelectorAll(".tech-logo-scroller .tag-list li[data-logo-url]");
  if (logoItems.length > 0) {
    logoItems.forEach(item => {
      const logoUrl = item.dataset.logoUrl;
      if (logoUrl) {
        item.style.webkitMaskImage = `url(${logoUrl})`;
        item.style.maskImage = `url(${logoUrl})`;
      }
    });
  }

  // --- SCRIPT PARA EL SCROLLER DE LOGOS INFINITO ---
  const scrollers = document.querySelectorAll(".tech-logo-scroller");

  if (scrollers.length > 0) {
    scrollers.forEach((scroller) => {
      const scrollerInner = scroller.querySelector(".scroller__inner");
      if (scrollerInner) {
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);
          scrollerInner.appendChild(duplicatedItem);
        });
      }
    });
  }
}); 