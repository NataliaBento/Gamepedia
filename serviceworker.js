const CACHE_NAME = 'gamepedia-cache-v1';
const urlsToCache = [
    './', 
    './index.html',
    './paginainicial.html',
    './public/assets/css/login.css',
    './index.js',
    './public/assets/js/paginainicial.js',
    './public/assets/css/paginainicial.css',
    './public/assets/css/formulariocadastro.css',
    './manifest.json',
    './icons/icon-192x192.png',
    './icons/icon-512x512.png'
  ];
 
// Instalando o Service Worker e armazenando arquivos no cache
self.addEventListener('install', event => {
  event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
          return cache.addAll(urlsToCache);
      })
  );
});

// Interceptando requisições para servir conteúdo do cache e salvar dinamicamente novas páginas
self.addEventListener('fetch', event => {
  event.respondWith(
      caches.match(event.request).then(response => {
          return response || fetch(event.request)
              .then(fetchResponse => {
                  return caches.open(CACHE_NAME).then(cache => {
                      cache.put(event.request, fetchResponse.clone());
                      return fetchResponse;
                  });
              })
              .catch(() => caches.match('./offline.html')); // Se não encontrar na rede, exibe a página offline
      })
  );
});

// Atualizando o cache quando o Service Worker é ativado
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
      caches.keys().then(cacheNames => {
          return Promise.all(
              cacheNames.map(cacheName => {
                  if (!cacheWhitelist.includes(cacheName)) {
                      return caches.delete(cacheName);
                  }
              })
          );
      })
  );
});

// Escutando eventos de push
self.addEventListener('push', event => {
    const options = {
        body: 'Você tem uma nova notificação no GamePedia!',
        icon: './icons/icon-192x192.png',
        badge: './icons/icon-192x192.png',
        vibrate: [200, 100, 200], // Vibração no celular
        actions: [
            { action: 'abrir', title: 'Abrir GamePedia' }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('GamePedia', options)
    );
});

// Escutando evento de clique na notificação
self.addEventListener('notificationclick', event => {
    event.notification.close();
    if (event.action === 'abrir') {
        clients.openWindow('./paginainicial.html');
    }
});

