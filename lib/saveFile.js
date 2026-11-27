'use client';

// Putting a file on the phone, or handing it to another app.
//
// Each place does it its own way, and the wrong way is not an error message
// but a button that does nothing, or an app that closes:
//
// - A browser on a computer or on Android downloads it, and shares it through
//   the Web Share API where there is one.
// - Safari on an iPhone has no download worth the name for a photo: what
//   students want is the Photos app, and the share sheet is where iOS keeps
//   «Enregistrer l'image». So on an iPhone saving and sharing are one button.
// - The store apps are a shell around the site, and the shell has no way to
//   save a file: Android's web view ignores a download, and iOS's share sheet
//   would close the app on «Save Image» (the app never declared
//   NSPhotoLibraryAddUsageDescription). What the shell does do is hand the
//   phone's browser any address it does not count as the app — and that is
//   where saving works. On iOS, anything opened in a new window goes to
//   Safari. On Android, a page that navigates off the allowed hosts goes to
//   Chrome; `*.supabase.co` is allowed, but Capacitor's mask matches only the
//   same number of labels, so Supabase's storage host
//   (`<ref>.storage.supabase.co`, the same objects) is not. With
//   `?download=<name>` Supabase sends it as an attachment under that name.
//   No store version needed (owner, 2026-11-27: «it's all in a shell»).
//
// In a browser the file is fetched as soon as it is shown (`prepare`), because
// Safari only lets a page open the share sheet straight out of a tap: a tap
// that first waits for a download has lost the right by the time it asks.

const cap = () => (typeof window === 'undefined' ? null : window.Capacitor);
const shell = () => (cap()?.isNativePlatform?.() ? cap().getPlatform?.() : null);
const isApple = () => typeof navigator !== 'undefined'
  && (/iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

const EXT = {
  'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/heic': 'heic', 'image/gif': 'gif',
  'application/pdf': 'pdf',
};

const SUPA = /^https:\/\/([a-z0-9]+)\.supabase\.co\/storage\/v1\/object\/public\//;
// The same object on the storage host, which the shells hand to the browser.
const outside = (url) => url.replace(SUPA, 'https://$1.storage.supabase.co/storage/v1/object/public/');
const named = (url, name) => `${url}${url.includes('?') ? '&' : '?'}download=${encodeURIComponent(name)}`;

// What this phone can do with a file of this type:
// - `download`: a button that saves it;
// - `share`: a button that opens the share sheet;
// - `saveInShare`: the share sheet is also how it is saved (an iPhone), so
//   the one button says both.
export function fileAbility(type = 'image/jpeg') {
  if (typeof window === 'undefined') return { download: false, share: false, saveInShare: false };
  const app = shell();
  if (app === 'android') return { download: true, share: false, saveInShare: false };
  if (app === 'ios') return { download: false, share: true, saveInShare: true };
  if (app) return { download: false, share: false, saveInShare: false };
  let files = false;
  try { files = !!navigator.canShare?.({ files: [new File([''], `x.${EXT[type] || 'bin'}`, { type })] }); } catch { files = false; }
  if (isApple() && files) return { download: false, share: true, saveInShare: true };
  return { download: true, share: files, saveInShare: false };
}

// The file behind a link, fetched once however many times it is asked for.
// Only a browser needs it: the shells hand the address over instead.
const cache = new Map();
export function prepare(url, name) {
  if (shell()) return Promise.resolve(null);
  if (!cache.has(url)) {
    cache.set(url, fetch(url).then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.blob();
    }).then((blob) => new File([blob], withExt(name, blob.type), { type: blob.type || 'application/octet-stream' }))
      .catch((e) => { cache.delete(url); throw e; }));
  }
  return cache.get(url);
}

// A name with the extension the file really has: from its type when that is
// known, else from the end of its address.
function withExt(name, type, url = '') {
  const ext = EXT[type] || (url.split('?')[0].match(/\.([a-z0-9]{2,5})$/i) || [])[1]?.toLowerCase();
  return ext && !name.toLowerCase().endsWith(`.${ext}`) ? `${name}.${ext}` : name;
}

// Download it.
export async function downloadFile(url, name, type) {
  if (shell() === 'android') {
    // Chrome takes it from here and drops it in Téléchargements under its name.
    window.location.assign(named(outside(url), withExt(name, type, url)));
    return;
  }
  const file = await prepare(url, name);
  const href = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = href; a.download = file.name; a.rel = 'noopener';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(href), 60000);
}

// Hand it to the phone's share sheet. A student closing the sheet is not a
// failure, so that comes back as `false` rather than as an error.
export async function shareFile(url, name, title, type) {
  if (shell() === 'ios') {
    // Safari opens it, with its own share button: a photo plainly (a long
    // press saves it to Photos), anything else as a download under its name.
    const to = outside(url);
    window.open(type?.startsWith('image/') ? to : named(to, withExt(name, type, url)), '_blank');
    return true;
  }
  const file = await prepare(url, name);
  try {
    await navigator.share({ files: [file], title });
    return true;
  } catch (e) {
    if (e?.name === 'AbortError') return false;
    throw e;
  }
}
