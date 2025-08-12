/**
 * SEO Optimizer - Core Web Vitals & Performance Optimization
 * INMORTAL_OS Portfolio v3.0
 */

class SEOOptimizer {
  constructor () {
    this.init();
  }

  init () {
    this.setupLazyLoading();
    this.setupCoreWebVitals();
    this.optimizeImages();
    this.setupIntersectionObserver();
    this.optimizeFonts();
    this.setupServiceWorker();
  }

  // Lazy Loading Implementation
  setupLazyLoading () {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // Core Web Vitals Tracking
  setupCoreWebVitals () {
    // LCP (Largest Contentful Paint)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const lcp = entry.startTime;
        console.log('LCP:', lcp);
        this.sendToAnalytics('LCP', lcp);
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // FID (First Input Delay)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const fid = entry.processingStart - entry.startTime;
        console.log('FID:', fid);
        this.sendToAnalytics('FID', fid);
      }
    }).observe({ entryTypes: ['first-input'] });

    // CLS (Cumulative Layout Shift)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          console.log('CLS:', clsValue);
          this.sendToAnalytics('CLS', clsValue);
        }
      }
    }).observe({ entryTypes: ['layout-shift'] });
  }

  // Image Optimization
  optimizeImages () {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Add loading="lazy" for non-critical images
      if (!img.classList.contains('critical')) {
        img.loading = 'lazy';
      }

      // Add alt text if missing
      if (!img.alt) {
        img.alt = 'INMORTAL_OS Portfolio Image';
      }

      // Add width and height attributes for better CLS
      if (!img.width || !img.height) {
        img.addEventListener('load', () => {
          img.style.width = `${img.naturalWidth}px`;
          img.style.height = `${img.naturalHeight}px`;
        });
      }
    });
  }

  // Intersection Observer for animations
  setupIntersectionObserver () {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  // Font Optimization
  optimizeFonts () {
    // Preload critical fonts
    const fontLinks = document.querySelectorAll('link[rel="preload"][as="style"]');
    fontLinks.forEach(link => {
      link.addEventListener('load', () => {
        link.rel = 'stylesheet';
      });
    });

    // Font display swap for better performance
    const style = document.createElement('style');
    style.textContent = `
            @font-face {
                font-family: 'Poppins';
                font-display: swap;
            }
            @font-face {
                font-family: 'Orbitron';
                font-display: swap;
            }
        `;
    document.head.appendChild(style);
  }

  // Service Worker Registration
  setupServiceWorker () {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/githubpagetest/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }

  // Analytics Helper
  sendToAnalytics (metric, value) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'web_vitals', {
        event_category: 'Web Vitals',
        event_label: metric,
        value: Math.round(value),
        non_interaction: true
      });
    }
  }

  // SEO Meta Tags Dynamic Update
  updateMetaTags (pageData) {
    if (pageData.title) {
      document.title = pageData.title;
      document.querySelector('meta[property="og:title"]').setAttribute('content', pageData.title);
      document.querySelector('meta[name="twitter:title"]').setAttribute('content', pageData.title);
    }

    if (pageData.description) {
      document.querySelector('meta[name="description"]').setAttribute('content', pageData.description);
      document.querySelector('meta[property="og:description"]').setAttribute('content', pageData.description);
      document.querySelector('meta[name="twitter:description"]').setAttribute('content', pageData.description);
    }

    if (pageData.image) {
      document.querySelector('meta[property="og:image"]').setAttribute('content', pageData.image);
      document.querySelector('meta[name="twitter:image"]').setAttribute('content', pageData.image);
    }
  }

  // Structured Data Injection
  injectStructuredData (data) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  // Performance Monitoring
  monitorPerformance () {
    // Navigation Timing API
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      console.log('Page Load Time:', loadTime);
      this.sendToAnalytics('PageLoadTime', loadTime);
    });

    // Resource Timing
    const resources = performance.getEntriesByType('resource');
    resources.forEach(resource => {
      if (resource.initiatorType === 'img' && resource.duration > 1000) {
        console.log('Slow image load:', resource.name, resource.duration);
      }
    });
  }
}

// Initialize SEO Optimizer
document.addEventListener('DOMContentLoaded', () => {
  window.seoOptimizer = new SEOOptimizer();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SEOOptimizer;
}
