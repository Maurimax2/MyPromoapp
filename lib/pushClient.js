// Push, from the phone's side: asking, registering, and going where a tapped
// notification points.
//
// Two ways in, one set of functions:
//   - inside the Android/iOS app, Capacitor's push plugin (Firebase)
//   - in a browser, a service worker (public/sw.js) and the Web Push standard
//
// Nothing here asks for permission on its own. A browser that is asked on
// the first screen says no and never asks again; the question is asked when
// a student taps «فعّل الإشعارات», having just been told what for.

const VAPID = process.env.NEXT_PUBLIC_VAPID_KEY;
const SYNCED = 'mypromo.push.synced';
// Turned off here by the student. The browser (or the phone) still says
// «granted» — permission is not taken back by unsubscribing — so this is what
// remembers that the answer is now no.
const STOPPED = 'mypromo.push.stopped';
const stopped = () => { try { return localStorage.getItem(STOPPED) === '1'; } catch { return false; } };
const setStopped = (yes) => {
  try { if (yes) localStorage.setItem(STOPPED, '1'); else localStorage.removeItem(STOPPED); } catch { /* private mode */ }
};

export const isNative = () => typeof window !== 'undefined' && !!window.Capacitor?.isNativePlatform?.();
const platformOf = () => (window.Capacitor?.getPlatform?.() === 'ios' ? 'ios' : 'android');

async function plugin() {
  const { PushNotifications } = await import('@capacitor/push-notifications');
  return PushNotifications;
}

const webCan = () => typeof window !== 'undefined'
  && 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window && !!VAPID;

// An iPhone only allows web push to a site added to the home screen.
const iosBrowser = () => typeof navigator !== 'undefined'
  && /iPhone|iPad|iPod/.test(navigator.userAgent) && !navigator.standalone;

function keyBytes(b64) {
  const pad = '='.repeat((4 - (b64.length % 4)) % 4);
  const raw = atob((b64 + pad).replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
}

async function save(body) {
  try {
    const res = await fetch('/api/me/push', {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body),
    });
    return res.ok;
  } catch { return false; }
}

/**
 * 'granted' | 'default' | 'denied' | 'install' (iPhone, not on the home
 * screen yet) | 'unsupported'
 */
export async function pushStatus() {
  if (typeof window === 'undefined') return 'unsupported';
  if (isNative()) {
    try {
      const p = await (await plugin()).checkPermissions();
      if (p.receive === 'granted') return stopped() ? 'default' : 'granted';
      return p.receive === 'denied' ? 'denied' : 'default';
    } catch { return 'unsupported'; }
  }
  if (!webCan()) return iosBrowser() ? 'install' : 'unsupported';
  if (Notification.permission !== 'granted') return Notification.permission;
  return stopped() ? 'default' : 'granted';
}

// ---------------------------------------------------------------- native

let native = null;
function nativeReady(go) {
  if (native) return native;
  native = (async () => {
    const P = await plugin();
    await P.addListener('registration', (t) => { save({ platform: platformOf(), token: t.value }); });
    await P.addListener('registrationError', () => {});
    // Tapped, whether the app was open, asleep, or not running at all — the
    // plugin holds the tap until this listener exists.
    await P.addListener('pushNotificationActionPerformed', (a) => {
      const url = a?.notification?.data?.url;
      if (url && url.startsWith('/')) go(url);
    });
    // Android 8+: a channel of our own, loud enough to show on top of other
    // apps, rather than Firebase's «Miscellaneous».
    try { await P.createChannel({ id: 'mypromo', name: 'MyPromo', importance: 4, visibility: 1 }); } catch { /* iOS */ }
    return P;
  })();
  return native;
}

// ---------------------------------------------------------------- web

async function webSubscription(create) {
  const reg = await navigator.serviceWorker.register('/sw.js');
  await navigator.serviceWorker.ready;
  let sub = await reg.pushManager.getSubscription();
  if (!sub && create) {
    sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: keyBytes(VAPID) });
  }
  return sub;
}

// ---------------------------------------------------------------- the three verbs

/** Ask, register, and tell the server. Returns the status after. */
export async function enablePush(go = (u) => window.location.assign(u)) {
  if (isNative()) {
    try {
      const P = await nativeReady(go);
      let p = await P.checkPermissions();
      if (p.receive !== 'granted') p = await P.requestPermissions();
      if (p.receive !== 'granted') return 'denied';
      setStopped(false);
      await P.register();                 // the token arrives at the listener
      return 'granted';
    } catch { return 'unsupported'; }
  }
  if (!webCan()) return iosBrowser() ? 'install' : 'unsupported';
  try {
    const perm = await Notification.requestPermission();
    if (perm !== 'granted') return perm;
    const sub = await webSubscription(true);
    const j = sub.toJSON();
    const ok = await save({ platform: 'web', token: j.endpoint, keys: j.keys });
    if (ok) setStopped(false);
    try { localStorage.setItem(SYNCED, `${new Date().toISOString().slice(0, 10)}|${j.endpoint}`); } catch { /* private mode */ }
    return ok ? 'granted' : 'error';
  } catch {
    return 'error';
  }
}

/**
 * On every start: listen for taps, and — when permission was given before —
 * make sure the server still has this device. Tokens rotate; a device the
 * server forgot is a student who silently stops hearing anything.
 */
export async function syncPush(go) {
  if (isNative()) {
    try {
      const P = await nativeReady(go);
      const p = await P.checkPermissions();
      if (p.receive === 'granted' && !stopped()) await P.register();
    } catch { /* not this build */ }
    return;
  }
  if (!webCan() || Notification.permission !== 'granted' || stopped()) return;
  try {
    const sub = await webSubscription(true);
    const j = sub.toJSON();
    const stamp = `${new Date().toISOString().slice(0, 10)}|${j.endpoint}`;
    let last = null;
    try { last = localStorage.getItem(SYNCED); } catch { /* private mode */ }
    if (last === stamp) return;           // told the server today already
    if (await save({ platform: 'web', token: j.endpoint, keys: j.keys })) {
      try { localStorage.setItem(SYNCED, stamp); } catch { /* private mode */ }
    }
  } catch { /* the site still works */ }
}

/** Stop this device. */
export async function disablePush() {
  setStopped(true);
  let token = null;
  try {
    if (isNative()) {
      await (await plugin()).unregister();
    } else if (webCan()) {
      const sub = await webSubscription(false);
      token = sub?.endpoint || null;
      await sub?.unsubscribe();
      try { localStorage.removeItem(SYNCED); } catch { /* private mode */ }
    }
  } catch { /* forget it on the server anyway */ }
  await fetch('/api/me/push', {
    method: 'DELETE', headers: { 'content-type': 'application/json' }, body: JSON.stringify(token ? { token } : {}),
  }).catch(() => {});
}
