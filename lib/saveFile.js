'use client';

// Putting a file on the phone, or handing it to another app.
//
// Each place does it its own way, and the wrong way is not an error message
// but a button that does nothing, or an app that closes:
//
// - A browser on a computer or on Android downloads it (`<a download>`), and
//   shares it through the Web Share API where there is one.
// - Safari on an iPhone has no download worth the name for a photo: what
//   students want is the Photos app, and the share sheet is where iOS keeps
//   «Enregistrer l'image». So on an iPhone saving and sharing are one button.
// - The store apps are a web view, and a web view does neither by itself:
//   Android's ignores a download, and iOS's share sheet closes the app the
//   moment somebody taps «Save Image», because the app never declared
//   NSPhotoLibraryAddUsageDescription. They need Capacitor's Filesystem and
//   Share plugins, which only a new store version brings. Until a phone has
//   them, the app offers neither — the photo still opens and zooms.
//
// The file is fetched as soon as it is shown (`prepare`), because Safari only
// lets a page open the share sheet straight out of a tap: a tap that first
// waits for a download has lost the right by the time it asks.

const cap = () => (typeof window === 'undefined' ? null : window.Capacitor);
const isNative = () => !!cap()?.isNativePlatform?.();
const plugin = (name) => (isNative() && cap()?.isPluginAvailable?.(name) ? cap().Plugins[name] : null);
const isApple = () => typeof navigator !== 'undefined'
  && (/iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

const EXT = {
  'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/heic': 'heic', 'image/gif': 'gif',
  'application/pdf': 'pdf',
};

// What this phone can do with a file of this type: download it, share it, and
// whether sharing is also how it is saved (an iPhone).
export function fileAbility(type = 'image/jpeg') {
  if (typeof window === 'undefined') return { download: false, share: false, saveInShare: false };
  if (isNative()) {
    const fs = plugin('Filesystem'), share = plugin('Share');
    if (!fs || !share) return { download: false, share: false, saveInShare: false };
    const ios = cap().getPlatform?.() === 'ios';
    return { download: !ios, share: true, saveInShare: ios };
  }
  let files = false;
  try { files = !!navigator.canShare?.({ files: [new File([''], `x.${EXT[type] || 'bin'}`, { type })] }); } catch { files = false; }
  if (isApple() && files) return { download: false, share: true, saveInShare: true };
  return { download: true, share: files, saveInShare: false };
}

// The file behind a link, fetched once however many times it is asked for.
const cache = new Map();
export function prepare(url, name) {
  if (!cache.has(url)) {
    cache.set(url, fetch(url).then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.blob();
    }).then((blob) => {
      const ext = EXT[blob.type];
      const named = ext && !name.toLowerCase().endsWith(`.${ext}`) ? `${name}.${ext}` : name;
      return new File([blob], named, { type: blob.type || 'application/octet-stream' });
    }).catch((e) => { cache.delete(url); throw e; }));
  }
  return cache.get(url);
}

const base64 = (file) => new Promise((ok, no) => {
  const r = new FileReader();
  r.onload = () => ok(String(r.result).split(',')[1] || '');
  r.onerror = () => no(r.error);
  r.readAsDataURL(file);
});

// Download it. Answers where it went when the phone does not show that itself.
export async function downloadFile(url, name) {
  const file = await prepare(url, name);
  const fs = plugin('Filesystem');
  if (fs) {
    await fs.writeFile({ path: `MyPromo/${file.name}`, data: await base64(file), directory: 'DOCUMENTS', recursive: true });
    return { where: 'Documents/MyPromo' };
  }
  const href = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = href; a.download = file.name; a.rel = 'noopener';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(href), 60000);
  return { where: null };
}

// Hand it to the phone's share sheet. A student closing the sheet is not a
// failure, so that comes back as `false` rather than as an error.
export async function shareFile(url, name, title) {
  const file = await prepare(url, name);
  try {
    const share = plugin('Share'), fs = plugin('Filesystem');
    if (share && fs) {
      const { uri } = await fs.writeFile({ path: file.name, data: await base64(file), directory: 'CACHE' });
      await share.share({ title, files: [uri] });
    } else {
      await navigator.share({ files: [file], title });
    }
    return true;
  } catch (e) {
    if (e?.name === 'AbortError' || /cancel/i.test(e?.message || '')) return false;
    throw e;
  }
}
