// Cloudflare R2, when it is configured.
//
// Supabase Storage is where everything has lived, for the honest reason that
// its keys were already on the server and working. It is also capped at a
// gigabyte on the plan this runs on, and the archive alone — every lecture a
// student has ever opened, kept so we stop asking Drive a thousand times — is
// several times that. It would not break tomorrow; it would fill quietly over
// a term and then start refusing uploads in front of somebody holding a
// photograph.
//
// R2 was paid for and never wired up. This wires it up, and leaves Supabase
// underneath: with no R2 settings, or one of them wrong, everything behaves
// exactly as it did. Nobody should discover a typo in a bucket name at the
// moment they press انشر.

import { AwsClient } from 'aws4fetch';

const need = ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY',
              'R2_BUCKET', 'R2_PUBLIC_URL'];

/** Whether all five settings are present. Four out of five is not configured. */
export const configured = () => need.every((k) => process.env[k]);

/** Which of them are missing, for a message somebody can act on. */
export const missing = () => need.filter((k) => !process.env[k]);

// A stand-in endpoint, so the signing and the upload can be driven without an
// account. Never set in production.
const endpoint = () =>
  process.env.R2_ENDPOINT || `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;

/** Where the world reads it from. */
export function urlFor(key) {
  const base = (process.env.R2_PUBLIC_URL || '').replace(/\/+$/, '');
  return base ? `${base}/${key}` : null;
}

let client = null;
function signer() {
  if (!client) {
    client = new AwsClient({
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      // R2 has no regions, but the signature has a shape and it wants one.
      region: 'auto',
      service: 's3',
    });
  }
  return client;
}

/** Put one object. Returns its public address. */
export async function put(key, body, { contentType, cacheControl } = {}) {
  const headers = {};
  if (contentType) headers['content-type'] = contentType;
  if (cacheControl) headers['cache-control'] = cacheControl;

  const res = await signer().fetch(`${endpoint()}/${process.env.R2_BUCKET}/${key}`, {
    method: 'PUT',
    body,
    headers,
  });

  if (!res.ok) {
    // R2 answers with XML. Enough of it to know what went wrong, not so much
    // that it fills the screen.
    const said = (await res.text().catch(() => '')).replace(/\s+/g, ' ').slice(0, 200);
    throw new Error(`R2 ${res.status} — ${said}`);
  }

  return urlFor(key);
}

/** Whether our copy is already there. */
export async function has(key) {
  const url = urlFor(key);
  if (!url) return false;
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok;
  } catch {
    return false;
  }
}
