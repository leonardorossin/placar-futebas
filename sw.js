/* Guarda o app no celular para abrir mesmo com internet ruim no campo.
   Páginas e arquivos do app: tenta a internet primeiro (pega a versão nova) e usa a cópia guardada se falhar.
   Fontes do Google: usa a cópia guardada, que quase nunca muda. */
var CACHE = 'futebas-v6';
var ARQUIVOS = ['/', '/manifest.webmanifest', '/icones/escudo.png', '/icones/icone-192.png', '/icones/apple-touch-icon.png'];

self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(ARQUIVOS); }).then(function(){ return self.skipWaiting(); }));
});

self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});

self.addEventListener('fetch', function(e){
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  var fonte = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (url.origin !== location.origin && !fonte) return;

  if (fonte){
    e.respondWith(caches.match(req).then(function(r){
      return r || fetch(req).then(function(resp){
        var copia = resp.clone(); caches.open(CACHE).then(function(c){ c.put(req, copia); });
        return resp;
      });
    }));
    return;
  }

  e.respondWith(fetch(req).then(function(resp){
    if (resp.ok){ var copia = resp.clone(); caches.open(CACHE).then(function(c){ c.put(req, copia); }); }
    return resp;
  }).catch(function(){
    return caches.match(req).then(function(r){ return r || (req.mode === 'navigate' ? caches.match('/') : undefined); });
  }));
});
