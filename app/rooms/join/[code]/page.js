import Link from 'next/link';
import { redirect } from 'next/navigation';
import Icon from '@/components/Icon';
import { currentProfile, isStaff } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

// The door of a private room: the link somebody sent.
//
// Whoever is signed in and let in, from any year, joins with the code in the
// link and is taken inside. Somebody not signed in is sent to the door and
// brought back here after (the middleware and /auth/home carry the link). A
// code that matches nothing — a typo, a room its host closed — says so plainly
// and says no more than that: it must not confirm that some other code exists.
export default async function JoinRoom({ params }) {
  const { code } = await params;
  const profile = await currentProfile();
  if (!profile) redirect(`/login?next=${encodeURIComponent(`/rooms/join/${code}`)}`);
  if (profile.status !== 'approved' && !isStaff(profile)) redirect('/waiting');

  const db = supabaseAdmin();
  // Selected by code alone; a database without rooms-private.sql has no such
  // column and the answer is the same as for a wrong code.
  const { data: room } = await db.from('rooms')
    .select('id, title, capacity, closed, private').eq('code', code).maybeSingle();

  let why = null;
  if (!room || !room.private) why = 'الرابط غير صحيح أو انتهت صلاحيته.';
  else if (room.closed) why = 'أغلق مضيف الغرفة هذه الغرفة.';

  if (!why) {
    const { data: already } = await db.from('room_members')
      .select('person').eq('room', room.id).eq('person', profile.id).maybeSingle();
    if (!already) {
      const { count } = await db.from('room_members')
        .select('*', { count: 'exact', head: true }).eq('room', room.id);
      if ((count || 0) >= room.capacity) why = 'الغرفة ممتلئة.';
      else await db.from('room_members').insert({ room: room.id, person: profile.id });
    }
    if (!why) redirect(`/rooms/${room.id}`);
  }

  return (
    <>
      <header className="head">
        <div className="head-row">
          <Link href="/rooms" className="icobtn" aria-label="رجوع"><Icon name="chev" size={19} /></Link>
          <div className="grow"><div className="head-t">غرفة خاصة</div></div>
        </div>
      </header>
      <div className="scroll">
        <div className="empty">
          <div className="tile tint-olive"><Icon name="lock" size={24} /></div>
          <div className="empty-t">تعذّر الدخول</div>
          <div className="empty-b">{why}</div>
          <Link href="/rooms" className="btn p" style={{ maxWidth: 240, marginTop: 8 }}>غرف الدراسة</Link>
        </div>
      </div>
    </>
  );
}
