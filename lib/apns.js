// Waking an iPhone — Apple's own push service (APNs), straight from the server.
//
// Android goes through Firebase (lib/fcm.js). An iPhone could too, but only
// with Firebase's SDK compiled into the app to trade Apple's token for one of
// Google's: a native dependency, a GoogleService-Info.plist, and a build on a
// Mac to find out whether it worked. Talking to Apple directly needs none of
// it. Capacitor's plugin already hands the server Apple's own token on iOS;
// the server signs its requests with a key from the Apple Developer account,
// with node:crypto, as lib/fcm.js does for Google.
//
// Three variables on Vercel, from Apple Developer → Certificates, IDs &
// Profiles → Keys → (+) → Apple Push Notifications service (APNs):
//   APNS_KEY      the downloaded .p8 file, pasted whole (or base64 of it)
//   APNS_KEY_ID   the key's 10-character id, shown beside it
//   APNS_TEAM_ID  the team id, at the top right of the developer account
// APNS_TOPIC is the bundle id, com.mypromo.app unless it says otherwise.
// Without them nothing is sent to iPhones and nothing else changes.
//
// A TestFlight or App Store build is woken by Apple's production service; a
// build run from Xcode straight onto a phone, by the sandbox. Each refuses the
// other's tokens with BadDeviceToken, so a refusal is asked again of the
// other before the token is called dead.

import http2 from 'node:http2';
import crypto from 'node:crypto';

const PRODUCTION = process.env.APNS_HOST || 'https://api.push.apple.com';
const SANDBOX = 'https://api.sandbox.push.apple.com';

let conf;               // read once
let jwt = { token: null, until: 0 };

function config() {
  if (conf !== undefined) return conf;
  conf = null;
  const raw = process.env.APNS_KEY;
  const keyId = process.env.APNS_KEY_ID?.trim();
  const teamId = process.env.APNS_TEAM_ID?.trim();
  if (!raw || !keyId || !teamId) return conf;
  try {
    // Pasted as the file itself, with or without its line breaks surviving
    // the dashboard, or as base64 of it.
    let pem = raw.includes('BEGIN PRIVATE KEY') ? raw : Buffer.from(raw, 'base64').toString('utf8');
    pem = pem.replace(/\\n/g, '\n');
    if (!pem.includes('\n')) {
      const body = pem.replace(/-----(BEGIN|END) PRIVATE KEY-----/g, '').replace(/\s+/g, '');
      pem = `-----BEGIN PRIVATE KEY-----\n${body.match(/.{1,64}/g).join('\n')}\n-----END PRIVATE KEY-----\n`;
    }
    const key = crypto.createPrivateKey(pem);
    conf = { key, keyId, teamId, topic: process.env.APNS_TOPIC?.trim() || 'com.mypromo.app' };
  } catch { /* stays null: said so by apnsReady() */ }
  return conf;
}

export const apnsReady = () => !!config();

const b64 = (x) => Buffer.from(JSON.stringify(x)).toString('base64url');

// Apple keeps a signed token good for an hour and refuses one renewed more
// often than every twenty minutes, so it is made once and kept for fifty.
function bearer() {
  if (jwt.token && Date.now() < jwt.until) return jwt.token;
  const c = config();
  const head = b64({ alg: 'ES256', kid: c.keyId });
  const claim = b64({ iss: c.teamId, iat: Math.floor(Date.now() / 1000) });
  // ES256 in a JWT is the raw r‖s pair, not the DER node signs by default.
  const sig = crypto.sign('sha256', Buffer.from(`${head}.${claim}`), { key: c.key, dsaEncoding: 'ieee-p1363' })
    .toString('base64url');
  jwt = { token: `${head}.${claim}.${sig}`, until: Date.now() + 50 * 60 * 1000 };
  return jwt.token;
}

// One HTTP/2 connection per host, kept while messages are going out and
// closed when they stop — a hundred notifications are a hundred streams on
// one connection, which is how Apple asks to be talked to.
const sessions = new Map();
function session(host) {
  let s = sessions.get(host);
  if (!s || s.closed || s.destroyed) {
    s = http2.connect(host);
    s.on('error', () => sessions.delete(host));
    s.on('close', () => sessions.delete(host));
    s.on('goaway', () => sessions.delete(host));
    sessions.set(host, s);
  }
  clearTimeout(s.idle);
  s.idle = setTimeout(() => s.close(), 15000);
  s.idle.unref?.();
  return s;
}

/** @returns {Promise<{status: number, reason?: string}>} */
function send(host, token, headers, payload) {
  return new Promise((resolve) => {
    let done = false;
    const finish = (r) => { if (!done) { done = true; resolve(r); } };
    let req;
    try {
      req = session(host).request({
        ':method': 'POST',
        ':path': `/3/device/${token}`,
        authorization: `bearer ${bearer()}`,
        'content-type': 'application/json',
        ...headers,
      });
    } catch {
      finish({ status: 0 });
      return;
    }
    let status = 0;
    let body = '';
    req.setEncoding('utf8');
    req.on('response', (h) => { status = Number(h[':status']) || 0; });
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      let reason;
      try { reason = JSON.parse(body || '{}').reason; } catch { /* no body */ }
      finish({ status, reason });
    });
    req.on('error', () => finish({ status: 0 }));
    req.setTimeout(10000, () => { req.close(); finish({ status: 0 }); });
    req.end(JSON.stringify(payload));
  });
}

/**
 * One notification to one iPhone.
 * @returns {'ok'|'gone'|'failed'} — as fcmSend: 'gone' means the token will
 *   never work again and should be forgotten.
 */
export async function apnsSend(token, { title, body, url, tag, kind }) {
  const c = config();
  if (!c || !/^[0-9a-f]{32,200}$/i.test(String(token || ''))) return c ? 'gone' : 'failed';

  const headers = {
    'apns-topic': c.topic,
    'apns-push-type': 'alert',
    'apns-priority': '10',
    // A second like on the same post replaces the first on the lock screen,
    // as `tag` does on Android.
    ...(tag ? { 'apns-collapse-id': String(tag).slice(0, 64) } : {}),
  };
  const payload = {
    aps: { alert: { title, body: body || '' }, sound: 'default', ...(tag ? { 'thread-id': tag } : {}) },
    // Read by the app when the notification is tapped: where to go.
    url: url || '/feed',
    kind: kind || '',
  };

  try {
    let r = await send(PRODUCTION, token, headers, payload);
    if (r.status === 400 && r.reason === 'BadDeviceToken' && PRODUCTION !== SANDBOX) {
      r = await send(SANDBOX, token, headers, payload);
    }
    if (r.status === 200) return 'ok';
    if (r.status === 410 || (r.status === 400 && r.reason === 'BadDeviceToken')) return 'gone';
    if (r.status === 403) jwt = { token: null, until: 0 };
    return 'failed';
  } catch {
    return 'failed';
  }
}

/**
 * Does Apple accept our key, without waking anybody?
 *
 * A token that is deliberately not a real one is answered, when the key and
 * the team are right, with «BadDeviceToken» — Apple read the signature and
 * only then looked at the phone. A key it does not recognise is a 403.
 *
 * @returns {'none'|'auth'|'topic'|'ok'|'unknown'}
 */
export async function apnsCheck() {
  const c = config();
  if (!c) return 'none';
  try {
    const r = await send(PRODUCTION, '0'.repeat(64), {
      'apns-topic': c.topic, 'apns-push-type': 'alert', 'apns-priority': '10',
    }, { aps: { alert: { title: 'check' } } });
    if (r.status === 400 && r.reason === 'BadDeviceToken') return 'ok';
    if (r.status === 400 && /Topic/i.test(r.reason || '')) return 'topic';
    if (r.status === 403) { jwt = { token: null, until: 0 }; return 'auth'; }
    return 'unknown';
  } catch {
    return 'unknown';
  }
}
