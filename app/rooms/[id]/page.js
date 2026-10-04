import { redirect, notFound } from 'next/navigation';
import { supabaseServer, currentProfile, isStaff } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { artOf, regionArt } from '@/lib/subjectArt';
import { REGIONS, regionsFor } from '@/lib/anatomy/curriculum';
import { CREDIT, bundleOf } from '@/lib/anatomy/bundles';
import { isHere } from '@/lib/rooms';
import { sourcesOf, studies } from '@/lib/catalogue';
import Room from './Room';

export const dynamic = 'force-dynamic';

// A region, packed with everything the 3D viewer needs, so the room can open
// it for everyone without a trip to the region's own page.
const scene = (r) => ({
  key: `${r.promo.toLowerCase()}/${r.semesterId}/${r.id}`,
  title: r.title,
  subtitle: r.subtitle,
  img: regionArt(r),
  group: r.semesterTitle,
  view: {
    id: r.lead || r.bundles[0],
    title: r.title,
    layers: r.bundles,
    lead: r.lead || r.bundles[0],
    frame: r.frame || null,
    takes: r.takes || null,
    credit: [...new Set(r.bundles.map((b) => bundleOf(b)?.credit || CREDIT))].join(' · '),
  },
});

export default async function RoomPage({ params }) {
  const { id } = await params;
  const profile = await currentProfile();
  if (!profile) redirect('/login');

  const sb = await supabaseServer();
  // Read with the server's key and authorised here, because a private room's
  // people can come from any year and a student's own key sees only their
  // promo's rows (and a private room's names with them).
  const db = supabaseAdmin();
  const [{ data: room }, { data: members }, { data: messages }] = await Promise.all([
    db.from('rooms')
      .select('*, host:profiles!rooms_host_fkey(id, full_name, email)')
      .eq('id', id).maybeSingle(),
    db.from('room_members')
      .select('seen_at, person:profiles!room_members_person_fkey(id, full_name, email)').eq('room', id),
    db.from('room_messages')
      .select('id, body, created_at, author:profiles!room_messages_author_fkey(id, full_name, email)')
      .eq('room', id).order('created_at').limit(200),
  ]);

  if (!room) notFound();

  const insideRoom = (members || []).some((m) => m.person?.id === profile.id);
  // A private room does not exist for anybody without its link; a public one
  // is looked at by its own promo, as it always was.
  if (room.private ? !(insideRoom || room.host?.id === profile.id || isStaff(profile))
                   : (room.promo !== profile.promo && !isStaff(profile))) notFound();
  // Only people who are in it read what is said.
  const said = insideRoom || isStaff(profile) ? messages : [];

  // The subject the room is about, by name and with its model, when it has one.
  let subject = null;
  let regions = [];
  if (room.module) {
    const { data: m } = await sb.from('modules').select('id, name, promo, semester').eq('id', room.module).maybeSingle();
    if (m) {
      const art = artOf(m.name);
      subject = { id: m.id, name: m.name, img: art.img, bg: art.bg };
      regions = regionsFor(m.promo, m.semester);
    }
  }
  // A room about no particular subject — or one whose subject has no body in
  // it — can still be shown any region its year studies, including the
  // first year a pharmacy or dental year shares with medicine.
  if (!regions.length) {
    const sources = await sourcesOf(String(room.promo || '').toLowerCase());
    regions = REGIONS.filter((r) => studies(sources, { promo: r.promo.toLowerCase(), semester: String(r.semester).toUpperCase() }));
  }

  const now = Date.now();
  const people = (members || []).map((m) => m.person).filter(Boolean);
  const here = (members || []).filter((m) => m.person && isHere(m, now)).map((m) => m.person.id);
  const inside = people.some((p) => p.id === profile.id);

  return (
    <Room
      // Held in state so new messages can be appended. Without a key,
      // walking from one room to another kept the first room's messages.
      key={id}
      room={{ ...room, code: room.private && insideRoom ? room.code : null }}
      subject={subject}
      people={people}
      // Who is on this screen right now. You are, if you are a member —
      // you are looking at it.
      here={inside ? [...new Set([...here, profile.id])] : here}
      first={said || []}
      regions={regions.map(scene)}
      me={{ id: profile.id, name: profile.full_name || profile.email.split('@')[0],
            host: room.host?.id === profile.id, inside }}
    />
  );
}
