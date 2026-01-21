/* eslint-disable no-undef */
/* global clients */

const CACHE_NAME = 'inmortal-os-v2.0.0';
const STATIC_CACHE = 'inmortal-static-v2.0.0';
const DYNAMIC_CACHE = 'inmortal-dynamic-v2.0.0';

// Recursos críticos que se cachean inmediatamente
const urlsToCache = [
  '/',
  '/index.html',
  '/src/assets/css/critical.css',
  '/src/assets/css/main.css',
  '/src/assets/js/performance-optimizer.js',
  '/src/assets/js/main.js',
  '/src/assets/img/FAVICON/LOGO.png',
  '/src/assets/img/ID/1.jpg',
  '/privacy-policy.html',
  '/terms.html'
];

// Recursos externos que se cachean de forma dinámica
const externalResources = [
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollToPlugin.min.js',
  'https://cdn.jsdelivr.net/gh/studio-freight/lenis@1/bundled/lenis.min.js'
];

// Recursos de imágenes que se cachean bajo demanda
const imageResources = [
  'https://i.pinimg.com/1200x/a5/ca/51/a5ca519d1ce2b61fdfa779c4a428e33f.jpg',
  'https://i.pinimg.com/1200x/ff/3b/2b/ff3b2b07e81f0636eeebee255700ac42.jpg',
  'https://i.pinimg.com/1200x/a5/1d/11/a51d11ee16d57efb9d21b7e4d372abdc.jpg',
  'https://i.pinimg.com/1200x/22/34/8c/22348cd14df60aae68d804dfbad44325.jpg',
  'https://i.pinimg.com/originals/17/f6/ae/17f6aee105b91f8608d517d50077fe3c.gif',
  'https://i.pinimg.com/originals/79/e0/be/79e0bec2053fad1e60df1cca1bb0b83c.gif',
  'https://i.pinimg.com/1200x/00/c6/cb/00c6cbd9e4f01ed7efbd31a47e2527a6.jpg'
];

// Install event - cache recursos críticos
self.addEventListener('install', event => {
  console.log('Service Worker: Installing v2.0.0...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Service Worker: Caching critical files');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: Critical files cached successfully');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: Error caching critical files', error);
      })
  );
});

// Activate event - limpiar caches antiguos
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating v2.0.0...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activated successfully');
      return self.clients.claim();
    })
  );
});

// Fetch event - estrategia de cache mejorada
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorar requests no GET
  if (request.method !== 'GET') {
    return;
  }
  
  // Estrategia para recursos estáticos locales
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) {
            return response;
          }
          
          return fetch(request)
            .then(response => {
              // No cachear si no es una respuesta válida
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              
              const responseToCache = response.clone();
              caches.open(STATIC_CACHE)
                .then(cache => {
                  cache.put(request, responseToCache);
                });
              
              return response;
            });
        })
        .catch(() => {
          // Fallback para navegación offline
          if (request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        })
    );
  }
  
  // Estrategia para recursos externos (CDN)
  else if (externalResources.includes(request.url) || imageResources.includes(request.url)) {
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) {
            return response;
          }
          
          return fetch(request)
            .then(response => {
              if (!response || response.status !== 200) {
                return response;
              }
              
              const responseToCache = response.clone();
              caches.open(DYNAMIC_CACHE)
                .then(cache => {
                  cache.put(request, responseToCache);
                });
              
              return response;
            })
            .catch(() => {
              console.warn('Service Worker: Failed to fetch external resource:', request.url);
            });
        })
    );
  }
});

// Background sync para recursos de imágenes
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync-images') {
    event.waitUntil(preloadImages());
  }
});

// Función para precargar imágenes en background
async function preloadImages() {
  const cache = await caches.open(DYNAMIC_CACHE);
  
  for (const imageUrl of imageResources) {
    try {
      const cachedResponse = await cache.match(imageUrl);
      if (!cachedResponse) {
        const response = await fetch(imageUrl);
        if (response.status === 200) {
          await cache.put(imageUrl, response);
          console.log('Service Worker: Background cached image:', imageUrl);
        }
      }
    } catch (error) {
      console.warn('Service Worker: Failed to background cache image:', imageUrl, error);
    }
  }
}

// Mensaje desde el cliente para limpiar cache
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      }).then(() => {
        event.ports[0].postMessage({ success: true });
      })
    );
  }
});('activate', event => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activated successfully');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension requests
  if (event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('Service Worker: Serving from cache', event.request.url);
          return cachedResponse;
        }

        // Otherwise, fetch from network
        console.log('Service Worker: Fetching from network', event.request.url);
        return fetch(event.request)
          .then(response => {
            // Don't cache if not a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache the fetched resource
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
                console.log('Service Worker: Cached new resource', event.request.url);
              });

            return response;
          })
          .catch(error => {
            console.error('Service Worker: Fetch failed', error);
            
            // Return offline page for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// Background sync for offline form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    console.log('Service Worker: Background sync triggered');
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Handle offline form submissions or other background tasks
  console.log('Service Worker: Processing background sync');
  return Promise.resolve();
}

// Push notification handling (for future use)
self.addEventListener('push', event => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'Nueva notificación de INMORTAL_OS',
    icon: '/src/assets/img/FAVICON/LOGO.png',
    badge: '/src/assets/img/FAVICON/LOGO.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver Portafolio',
        icon: '/src/assets/img/FAVICON/LOGO.png'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: '/src/assets/img/FAVICON/LOGO.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('INMORTAL_OS', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
}); 