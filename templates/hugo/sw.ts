interface FetchEvent extends Event {
  request: Request;
  respondWith(response: Promise<Response> | Response): Promise<Response>;
}

(() => {
  const version: string = '{{ .Date.Unix | replaceRE "^-?" "v" }}';
  const cacheName: string = '{{ .Site.Title | lower | replaceRE "\\s" "" }}:';
  const staticCacheName: string = `${version}:${cacheName}static`;
  const pagesCacheName: string = `${cacheName}pages`;
  const imagesCacheName: string = `${cacheName}images`;
  const staticAssets: string[] = [
    {{ range (os.ReadDir "static/fonts") }}
      {{ if ne .Name ".DS_Store" }}
        "fonts/{{ .Name }}",
      {{ end }}
    {{ end }}
    "scripts.min.js",
    "styles.min.css"
  ];

  const updateStaticCache = () =>
    // These items must be cached for the Service Worker to complete installation
    caches
      .open(staticCacheName)
      .then((cache) =>
        cache.addAll(
          staticAssets.map(
            (url) => new Request(url, { credentials: 'include' }),
          ),
        ),
      );
  const stashInCache = (
    name: string,
    request: RequestInfo,
    response: Response,
  ) => {
    caches.open(name).then((cache) => cache.put(request, response));
  };
  // Limit the number of items in a specified cache.
  const trimCache = (name: string, maxItems: number) => {
    caches.open(name).then((cache) => {
      cache.keys().then((keys) => {
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
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.indexOf(version) !== 0)
            .map((key) => caches.delete(key)),
        ),
      );

  // Events!
  self.addEventListener('message', (event) => {
    if (event.data.command === 'trimCaches') {
      trimCache(pagesCacheName, 35);
      trimCache(imagesCacheName, 20);
    }
  });
  self.addEventListener('install', (event) => {
    event.waitUntil(updateStaticCache().then(() => self.skipWaiting()));
  });
  self.addEventListener('activate', (event) => {
    event.waitUntil(clearOldCaches().then(() => self.clients.claim()));
  });
  self.addEventListener('fetch', (event: FetchEvent) => {
    const { request } = event;
    const url = new URL(request.url);

    if (url.href.indexOf('{{ .Site.BaseURL }}') !== 0) {
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
          .then((response) => {
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
              .then((response) => response || caches.match('/offline/')),
          ),
      );
      return;
    }
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (request.headers.get('Accept').includes('image')) {
            const copy = response.clone();
            stashInCache(imagesCacheName, request, copy);
          }
          return response;
        })
        .catch(() =>
          caches
            .match(request)
            .then((response) => response)
            .catch(console.error),
        ),
    );
  });
})();
