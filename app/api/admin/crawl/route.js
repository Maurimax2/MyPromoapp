// Reading a Drive link so it can be named and filed.
//
// Nothing is saved here. The panel shows what was found, a person corrects the
// names and says what each file is, and only then does anything reach the
// database.
//
// The link may point at a folder or at a single file — a student sending you
// one lecture sends a /file/d/ link, and refusing that would be silly. We ask
// Drive what the id is before deciding how to read it.

import { NextResponse } from 'next/server';
import { walkFolder, cleanName, guessKind, driveIdFromUrl, getFile, isFolder } from '@/lib/drive';
import { currentProfile, isStaff } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const maxDuration = 60;

const describe = (f, folder = '') => ({
  drive_id: f.id,
  original: f.name,
  folder,
  title: cleanName(f.name),
  bytes: f.size ? Number(f.size) : (f.bytes ?? null),
  ext: (f.name.match(/\.([a-z0-9]{1,5})$/i)?.[1] || 'pdf').toUpperCase(),
  ...guessKind(f),
});

export async function POST(request) {
  const profile = await currentProfile();
  if (!isStaff(profile)) return NextResponse.json({ error: 'staff only' }, { status: 403 });

  const key = process.env.GOOGLE_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: 'GOOGLE_API_KEY غير مضبوط على الخادم' }, { status: 500 });
  }

  const { url } = await request.json();
  const id = driveIdFromUrl(url);
  if (!id) return NextResponse.json({ error: 'هذا ليس رابط Drive' }, { status: 400 });

  try {
    const meta = await getFile(id, key);

    if (!isFolder(meta)) {
      return NextResponse.json({ truncated: false, files: [describe(meta)] });
    }

    const { files, truncated } = await walkFolder(id, key);
    return NextResponse.json({
      truncated,
      files: files.map((f) => describe(f, f.path.join(' / '))),
    });
  } catch (err) {
    return NextResponse.json({ error: String(err.message) }, { status: err.status || 502 });
  }
}
