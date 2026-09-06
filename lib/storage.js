// Where the things students post are kept.
//
// Supabase Storage rather than R2, for one reason: the keys are already on
// the server and working. R2 is set up but has no bucket name or public URL
// configured yet, and a half-configured store fails at upload time — in front
// of a student, holding a photograph. This can move to R2 later by changing
// this file alone; nothing above it knows the difference.

import { supabaseAdmin } from '@/lib/supabase/admin';

export const BUCKET = 'media';

const IMAGES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
const FILES = ['application/pdf'];

/** What we accept, and what we call it. Anything else is refused by name. */
export function kindOf(type) {
  if (IMAGES.includes(type)) return 'image';
  if (FILES.includes(type)) return 'file';
  return null;
}

export const MAX_BYTES = 25 * 1024 * 1024;   // a scanned lecture runs large

let ensured = false;

/** The bucket, made once if it is not there. */
export async function ensureBucket(db) {
  if (ensured) return;
  const { data } = await db.storage.getBucket(BUCKET);
  if (!data) {
    await db.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: MAX_BYTES,
      allowedMimeTypes: [...IMAGES, ...FILES],
    });
  }
  ensured = true;
}

const EXT = {
  'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp',
  'image/gif': 'gif', 'image/avif': 'avif', 'application/pdf': 'pdf',
};

/** Store one file and return what a post needs to show it. */
export async function put(file, prefix = 'posts') {
  const kind = kindOf(file.type);
  if (!kind) throw new Error('نقبل الصور وملفات PDF فقط');
  if (file.size > MAX_BYTES) throw new Error('الملف أكبر من 25 ميغابايت');

  const db = supabaseAdmin();
  await ensureBucket(db);

  // A name of our own, not the one the phone gave it: two students uploading
  // "IMG_0001.jpg" must not land on the same object.
  const path = `${prefix}/${crypto.randomUUID()}.${EXT[file.type]}`;

  const { error } = await db.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) throw new Error(error.message);

  const { data } = db.storage.from(BUCKET).getPublicUrl(path);

  return {
    kind,
    path,
    url: data.publicUrl,
    name: String(file.name || '').slice(0, 120) || null,
    bytes: file.size,
  };
}

/** The public address of a stored object, built rather than fetched. */
export function urlFor(path) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return path ? `${base}/storage/v1/object/public/${BUCKET}/${path}` : null;
}
