// This is a dummy service worker to resolve 404s and clean up old workers.

self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  self.registration.unregister().then(function() {
    return self.clients.claim();
  });
});