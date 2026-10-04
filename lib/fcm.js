// Waking a phone — Firebase Cloud Messaging, for the Android and iOS app.
//
// FCM's HTTP v1 API takes a short-lived OAuth token, which a Google service
// account signs for itself: a JWT signed with the account's private key,
// exchanged for an access token that lasts an hour. That is all the Admin
// SDK would do here, so it is done with node:crypto rather than pulling in a
// package the size of the rest of the server.
//
// The account is FIREBASE_SERVICE_ACCOUNT on Vercel: the whole JSON file
// Firebase hands out under Project settings → Service accounts → Generate new
// private key. It never reaches the browser, and without it nothing is sent
// — the app works exactly as before, only quieter.

import crypto from 'node:crypto';

const SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';

let account;            // parsed once
let access = { token: null, until: 0 };

function credentials() {
  if (account !== undefined) return account;
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  account = null;
  if (!raw) return account;
  try {
    // Pasted as the JSON itself, or — when a dashboard mangles newlines — as
    // base64 of it.
    const text = raw.trim().startsWith('{') ? raw : Buffer.from(raw, 'base64').toString('utf8');
    const c = JSON.parse(text);
    if (c.client_email && c.private_key && c.project_id) {
      account = { ...c, private_key: c.private_key.replace(/\\n/g, '\n') };
    }
  } catch { /* stays null: said so by fcmReady() */ }
  return account;
}

export const fcmReady = () => !!credentials();

const b64 = (x) => Buffer.from(typeof x === 'string' ? x : JSON.stringify(x)).toString('base64url');

async function accessToken() {
  if (access.token && Date.now() < access.until) return access.token;
  const c = credentials();
  const aud = c.token_uri || 'https://oauth2.googleapis.com/token';
  const now = Math.floor(Date.now() / 1000);
  const head = b64({ alg: 'RS256', typ: 'JWT' });
  const claim = b64({ iss: c.client_email, scope: SCOPE, aud, iat: now, exp: now + 3600 });
  const sig = crypto.createSign('RSA-SHA256').update(`${head}.${claim}`).sign(c.private_key).toString('base64url');

  const res = await fetch(aud, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${head}.${claim}.${sig}`,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access_token) throw new Error(`fcm auth ${res.status}`);
  // A minute early, so a token never expires between here and FCM.
  access = { token: data.access_token, until: Date.now() + ((data.expires_in || 3600) - 60) * 1000 };
  return access.token;
}

/**
 * One notification to one device.
 * @returns {'ok'|'gone'|'failed'} — 'gone' means the token will never work
 *   again (the app was uninstalled, or the token was rotated) and should be
 *   forgotten.
 */
export async function fcmSend(token, { title, body, url, tag, kind }) {
  const c = credentials();
  if (!c) return 'failed';
  let bearer;
  try { bearer = await accessToken(); } catch { return 'failed'; }

  const base = process.env.FCM_ENDPOINT || 'https://fcm.googleapis.com';
  const message = {
    token,
    notification: { title, body: body || '' },
    // Read by the app when the notification is tapped: where to go.
    data: { url: url || '/feed', kind: kind || '' },
    android: {
      priority: 'HIGH',
      notification: {
        channel_id: 'mypromo',
        // A second like on the same post replaces the first on the lock
        // screen rather than stacking under it.
        ...(tag ? { tag } : {}),
      },
    },
    apns: { payload: { aps: { sound: 'default', ...(tag ? { 'thread-id': tag } : {}) } } },
  };

  try {
    const res = await fetch(`${base}/v1/projects/${c.project_id}/messages:send`, {
      method: 'POST',
      headers: { authorization: `Bearer ${bearer}`, 'content-type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    if (res.ok) return 'ok';
    const err = await res.json().catch(() => ({}));
    const code = (err?.error?.details || []).map((d) => d.errorCode).find(Boolean) || err?.error?.status;
    if (res.status === 404 || code === 'UNREGISTERED') return 'gone';
    if (res.status === 400 && /registration token/i.test(err?.error?.message || '')) return 'gone';
    if (res.status === 401) access = { token: null, until: 0 };
    return 'failed';
  } catch {
    return 'failed';
  }
}

/**
 * Does Google accept our key, without waking anybody?
 *
 * FCM can be asked to check a message and send nothing (`validate_only`). With
 * a token that is deliberately not a real one, a good key is answered with
 * «that is not a valid registration token» — which is the proof: the key was
 * accepted and the API is on. Anything else says which part is wrong.
 *
 * @returns {'none'|'auth'|'api'|'project'|'ok'|'unknown'}
 *   none: no key on the server · auth: Google refused the key · api: the key is
 *   fine but Cloud Messaging is off or not allowed for it · project: the
 *   project in the key does not exist · ok: the key works
 */
export async function fcmCheck() {
  const c = credentials();
  if (!c) return 'none';
  let bearer;
  try { bearer = await accessToken(); } catch { return 'auth'; }
  try {
    const base = process.env.FCM_ENDPOINT || 'https://fcm.googleapis.com';
    const res = await fetch(`${base}/v1/projects/${c.project_id}/messages:send`, {
      method: 'POST',
      headers: { authorization: `Bearer ${bearer}`, 'content-type': 'application/json' },
      body: JSON.stringify({ validate_only: true, message: { token: 'not-a-real-token', notification: { title: 'check' } } }),
    });
    if (res.status === 400) return 'ok';
    if (res.status === 401) return 'auth';
    if (res.status === 403) return 'api';
    if (res.status === 404) return 'project';
    return res.ok ? 'ok' : 'unknown';
  } catch {
    return 'unknown';
  }
}
