// MyPromo's service worker — for push notifications, and nothing else.
//
// It does not cache pages or intercept requests: the app is live data, and a
// worker that serves yesterday's feed from a cache is a bug nobody can see.
// It exists because a browser only shows a notification from a worker, and
// only a worker is awake when the site is closed.

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

self.addEventListener('push', (event) => {
  let m = {};
  try { m = event.data ? event.data.json() : {}; } catch { m = { body: event.data ? event.data.text() : '' }; }
  const title = m.title || 'MyPromo';
  event.waitUntil(self.registration.showNotification(title, {
    body: m.body || '',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    dir: 'rtl',
    lang: 'ar',
    tag: m.tag || undefined,
    renotify: !!m.tag,
    data: { url: m.url || '/feed' },
  }));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = new URL(event.notification.data?.url || '/feed', self.location.origin);
  // Somewhere outside the app (an announcement's link) opens in a new tab.
  const inside = url.origin === self.location.origin;
  event.waitUntil((async () => {
    if (inside) {
      const open = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      for (const c of open) {
        if (new URL(c.url).origin !== self.location.origin) continue;
        try {
          await c.focus();
          if ('navigate' in c) await c.navigate(url.href);
          return;
        } catch { /* not ours to steer — open a new one below */ }
      }
    }
    await self.clients.openWindow(url.href);
  })());
});
