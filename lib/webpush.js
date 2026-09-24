// Waking a browser — the Web Push standard, for the website.
//
// Chrome on Android, Edge, Firefox, and Safari on an iPhone once the site is
// added to the home screen. Nothing of Google's is in the way: the keys are
// our own (VAPID), made once and kept on Vercel.

import webpush from 'web-push';

let ready = null;

export function webReady() {
  if (ready !== null) return ready;
  const pub = process.env.NEXT_PUBLIC_VAPID_KEY;
  const priv = process.env.VAPID_PRIVATE_KEY;
  ready = false;
  if (!pub || !priv) return ready;
  try {
    // The address a push service writes to if our pushes misbehave.
    const site = process.env.MYPROMO_URL || 'https://mypromo-nu.vercel.app';
    webpush.setVapidDetails(site, pub, priv);
    ready = true;
  } catch { /* malformed keys: stays off */ }
  return ready;
}

/** @returns {'ok'|'gone'|'failed'} — as fcmSend. */
export async function webSend(device, { title, body, url, tag, kind }) {
  if (!webReady() || !device.keys?.p256dh || !device.keys?.auth) return 'failed';
  try {
    await webpush.sendNotification(
      { endpoint: device.token, keys: device.keys },
      JSON.stringify({ title, body: body || '', url: url || '/feed', tag: tag || null, kind: kind || null }),
      { TTL: 60 * 60 * 24, urgency: 'high' },
    );
    return 'ok';
  } catch (e) {
    // 404 and 410: the browser unsubscribed, or the subscription expired.
    return e?.statusCode === 404 || e?.statusCode === 410 ? 'gone' : 'failed';
  }
}
