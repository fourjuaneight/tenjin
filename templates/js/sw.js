(() => {
  const version = '';
  const cacheName = ':';
  const staticCacheName = `${version}:${cacheName}static`;
  const pagesCacheName = `${cacheName}pages`;
  const imagesCacheName = `${cacheName}images`;
  const staticAssets = [];

  const updateStaticCache = () =>
    // These items must be cached for the Service Worker to complete installation
    caches
      .open(staticCacheName)
      .then(cache =>
        cache.addAll(
          staticAssets.map(url => new Request(url, { credentials: 'include' }))
        )
      );
  const stashInCache = (name, request, response) => {
    caches.open(name).then(cache => cache.put(request, response));
  };
  // Limit the number of items in a specified cache.
  const trimCache = (name, maxItems) => {
    caches.open(name).then(cache => {
      cache.keys().then(keys => {
        if (keys.length > maxItems) {
          cache.delete(keys[0]).then(trimCache(cacheName, maxItems));
        }
      });
    });
  };
  // Remove caches whose name is no longer valid
  const clearOldCaches = () =>
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(key => key.indexOf(version) !== 0)
            .map(key => caches.delete(key))
        )
      );

  // Events!
  /* eslint-disable no-restricted-globals */
  self.addEventListener('message', event => {
    if (event.data.command === 'trimCaches') {
      trimCache(pagesCacheName, 35);
      trimCache(imagesCacheName, 20);
    }
  });
  self.addEventListener('install', event => {
    event.waitUntil(updateStaticCache().then(() => self.skipWaiting()));
  });
  self.addEventListener('activate', event => {
    event.waitUntil(clearOldCaches().then(() => self.clients.claim()));
  });
  self.addEventListener('fetch', event => {
    /* eslint-enable */
    const { request } = event;
    const url = new URL(request.url);
    if (url.href.indexOf('baseURL') !== 0) {
      return;
    }
    if (request.method !== 'GET') {
      return;
    }
    if (url.href.indexOf('?') !== -1) {
      return;
    }
    if (request.headers.get('Accept').includes('text/html')) {
      event.respondWith(
        fetch(request)
          .then(response => {
            const copy = response.clone();
            if (
              staticAssets.includes(url.pathname) ||
              staticAssets.includes(`${url.pathname}/`)
            ) {
              stashInCache(staticCacheName, request, copy);
            } else {
              stashInCache(pagesCacheName, request, copy);
            }
            return response;
          })
          .catch(() =>
            // CACHE or FALLBACK
            caches
              .match(request)
              .then(response => response || caches.match('/offline/'))
          )
      );
      return;
    }
    event.respondWith(
      fetch(request)
        .then(response => {
          if (request.headers.get('Accept').includes('image')) {
            const copy = response.clone();
            stashInCache(imagesCacheName, request, copy);
          }
          return response;
        })
        .catch(() =>
          caches
            .match(request)
            .then(response => response)
            .catch(console.error)
        )
    );
  });
})();
