// Reading a Drive folder so it can be named and filed.
//
// Nothing is saved here. The panel shows what was found, a person corrects the
// names and says what each file is, and only then does anything reach the
// database.

import { NextResponse } from 'next/server';
import { walkFolder, cleanName, guessKind, driveIdFromUrl } from '@/lib/drive';
import { currentProfile, isStaff } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request) {
  const profile = await currentProfile();
  if (!isStaff(profile)) return NextResponse.json({ error: 'staff only' }, { status: 403 });

  const key = process.env.GOOGLE_API_KEY;
  if (!key) return NextResponse.json({ error: 'GOOGLE_API_KEY غير مضبوط' }, { status: 500 });

  const { url } = await request.json();
  const id = driveIdFromUrl(url);
  if (!id) return NextResponse.json({ error: 'هذا ليس رابط Drive' }, { status: 400 });

  try {
    const { files, truncated } = await walkFolder(id, key);
    return NextResponse.json({
      truncated,
      files: files.map((f) => ({
        drive_id: f.id,
        original: f.name,
        folder: f.path.join(' / '),
        title: cleanName(f.name),
        bytes: f.bytes,
        ext: (f.name.match(/\.([a-z0-9]{1,5})$/i)?.[1] || 'pdf').toUpperCase(),
        ...guessKind(f),
      })),
    });
  } catch (err) {
    // A folder that is not shared reads as "not found" to an API key, which is
    // the single most likely thing to go wrong here.
    const message = /404|not found/i.test(String(err.message))
      ? 'المجلد غير موجود أو غير مشارَك — تأكد أنه مشارك مع «أي شخص لديه الرابط»'
      : String(err.message);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
