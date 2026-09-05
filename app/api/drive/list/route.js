// One folder's contents. The inventory page calls this once per folder and
// walks the tree itself, so no single request has to finish the whole Drive
// before the serverless function times out.

import { listFolder, isFolder, ROOT_FOLDER } from '@/lib/drive';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req) {
  const key = process.env.GOOGLE_API_KEY;
  if (!key) {
    return Response.json({ error: 'GOOGLE_API_KEY غير مضبوط' }, { status: 500 });
  }

  const id = new URL(req.url).searchParams.get('id') || ROOT_FOLDER;
  if (!/^[A-Za-z0-9_-]{10,80}$/.test(id)) {
    return Response.json({ error: 'معرّف مجلد غير صالح' }, { status: 400 });
  }

  let items;
  try {
    items = await listFolder(id, key);
  } catch (err) {
    return Response.json({ error: String(err.message || err) }, { status: 502 });
  }

  const folders = [];
  const files = [];

  for (const it of items) {
    if (isFolder(it)) {
      folders.push({ id: it.id, name: it.name });
    } else {
      files.push({
        id: it.id,
        name: it.name,
        mime: it.mimeType,
        bytes: it.size ? Number(it.size) : null,
        modified: it.modifiedTime || null,
      });
    }
  }

  return Response.json({ id, folders, files });
}
