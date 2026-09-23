import { redirect } from 'next/navigation';
import { supabaseServer, currentProfile } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { subjectsOf, subjectRail, promosOf, moduleCounts } from '@/lib/catalogue';
import { browsingPromo } from '@/lib/promo';
import { stage } from '@/lib/duel';
import { urlFor } from '@/lib/storage';
import Home from './Home';
import { isHere } from '@/lib/rooms';

export const dynamic = 'force-dynamic';

// Two letters and a name. A promo is small enough that everyone knows every
// face, so initials read as people rather than as placeholders.
const nameOf = (p) => ({ id: p.id, name: p.full_name || p.email?.split('@')[0] || 'زميل' });

// الرئيسية — what your promo is saying, and everything the app can do.
export default async function Feed() {
  const profile = await currentProfile();
  if (!profile) redirect('/login');

  // Two different things, and conflating them is what makes a student post
  // into a year they are not in: `promo` is who they are and whose feed this
  // is; `reading` is the year whose subjects they are looking at.
  //
  // No year at all is a third thing, and falling back to 'pcem2' here was a
  // lie the policies do not tell: the query asked for PCEM2's posts while
  // my_promo() stayed NULL, so row-level security refused every one of them
  // and the student was left reading an empty feed that looked like a quiet
  // day. /waiting is where a year gets chosen.
  if (!profile.promo && !['owner', 'admin', 'editor'].includes(profile.role)) {
    redirect('/waiting');
  }
  const promo = profile.promo || 'pcem2';
  const years = await promosOf();
  const reading = await browsingPromo(profile, years.promos);
  const sb = await supabaseServer();

  // The posts, their authors, their attachments, and which ones I have
  // already liked — four things, one round trip each, all at once.
  const [{ data: rows, error: readError }, { data: mine }] = await Promise.all([
    sb.from('posts')
      .select(`id, body, kind, module, created_at, likes, comments,
               author:profiles!posts_author_fkey(id, full_name, email, promo),
               post_media(kind, path, name, bytes, position)`)
      .eq('promo', promo).eq('removed', false)
      .order('created_at', { ascending: false }).limit(30),
    sb.from('likes').select('post').eq('person', profile.id),
  ]);

  const liked = new Set((mine || []).map((l) => l.post));

  // An empty feed has two very different causes and used to look identical
  // either way: nobody has posted, or the database has posts and will not
  // hand them to you. Row-level security does not raise an error when it
  // refuses — it simply returns nothing — so the only way to tell is to ask
  // again with the key that ignores policies and compare the two numbers.
  let refused = 0;
  if (!readError && !(rows || []).length) {
    const { count } = await supabaseAdmin()
      .from('posts').select('id', { count: 'exact', head: true })
      .eq('promo', promo).eq('removed', false);
    refused = count || 0;
  }

  // Read with the service key: a student's own notifications are their own
  // rows, but the count is wanted on every load and this is one head request.
  const { count: unseen } = await supabaseAdmin()
    .from('notifications').select('id', { count: 'exact', head: true })
    .eq('person', profile.id).eq('seen', false);


  // مَن يدرس الآن — the row of faces at the top of the screen, and the sheet
  // it opens. Both come from the same read: the promo's open rooms and who
  // is sitting in them. It is the one thing on this screen that is true only
  // at this second, so it is never cached and never guessed at — an empty
  // result draws no row at all rather than a zero.
  const { data: openRooms } = await sb.from('rooms')
    .select('id, title, topic, module, capacity, created_at')
    .eq('promo', promo).eq('closed', false)
    .order('created_at', { ascending: false }).limit(12);

  const roomIds = (openRooms || []).map((r) => r.id);
  const { data: sitting } = roomIds.length
    ? await sb.from('room_members')
        .select('room, person, seen_at, profile:profiles!room_members_person_fkey(id, full_name, email)')
        .in('room', roomIds)
    : { data: [] };

  // A student in two rooms is one student studying, not two.
  const who = new Map();
  const inRoom = new Map();
  // Only who is on a room screen now (lib/rooms.js), not who ever joined one.
  const now = Date.now();
  for (const m of (sitting || []).filter((x) => isHere(x, now))) {
    const person = m.profile;
    if (person && !who.has(person.id)) who.set(person.id, person);
    inRoom.set(m.room, [...(inRoom.get(m.room) || []), person].filter(Boolean));
  }

  const named2 = Object.fromEntries((await subjectsOf(promo)).map((m) => [m.id, m.name]));
  // A room nobody is sitting in is not «open» in any sense a student cares
  // about, so the sheet does not offer it.
  const rooms = (openRooms || []).filter((r) => inRoom.get(r.id)?.length).map((r) => ({
    id: r.id,
    title: r.title,
    topic: r.topic || named2[r.module] || null,
    capacity: r.capacity || null,
    people: (inRoom.get(r.id) || []).map((x) => nameOf(x)),
  }));

  const studying = [...who.values()].map((x) => nameOf(x));

  // The one duel that is waiting on your answer, for the line under the row
  // of faces. Only one is drawn however many there are: الدراسة holds the
  // list, and a feed that opens with three orange rows is a feed nobody
  // reads. The oldest is the one that has been waiting longest.
  const { data: duelRows } = await sb.from('duels')
    .select(`id, title, state, questions, seconds, challenger, opponent, challenger_at, opponent_at, created_at,
             a:profiles!duels_challenger_fkey(id, full_name, email),
             b:profiles!duels_opponent_fkey(id, full_name, email)`)
    .or(`challenger.eq.${profile.id},opponent.eq.${profile.id}`)
    .order('created_at', { ascending: false })
    .limit(40);

  // Every duel still in play, the ones that need you first. A finished duel
  // is on /duel; الرئيسية is for what can still happen.
  const ORDER = { invited: 0, play: 1, sent: 2, waiting: 3 };
  const duels = (duelRows || [])
    .map((d) => ({ ...d, at: stage(d, profile.id) }))
    .filter((d) => d.at in ORDER)
    .sort((x, y) => ORDER[x.at] - ORDER[y.at])
    .slice(0, 6)
    .map((d) => {
      const them = d.challenger === profile.id ? d.b : d.a;
      return {
        id: d.id, at: d.at, title: d.title,
        them: nameOf(them || {}),
        count: Array.isArray(d.questions) ? d.questions.length : null,
        seconds: d.seconds || 0,
      };
    });

  // Somebody to challenge, so the section is never an empty shelf. Classmates
  // with a matricule — the challenge form is addressed by it — and not the
  // ones you are already in a duel with.
  const busyWith = new Set(duels.map((d) => d.them.id));
  const { data: mates } = await sb.from('profiles')
    .select('id, full_name, email, matricule')
    .eq('promo', promo).eq('status', 'approved')
    .not('matricule', 'is', null)
    .neq('id', profile.id)
    .limit(12);
  const rivals = (mates || [])
    .filter((m) => !busyWith.has(m.id))
    .slice(0, 3)
    .map((m) => ({ ...nameOf(m), matricule: m.matricule }));

  const subjectRows = await subjectsOf(promo);
  const named = Object.fromEntries(subjectRows.map((m) => [m.id, m.name]));

  const posts = (rows || []).map((p) => ({
    ...p,
    liked: liked.has(p.id),
    subject: named[p.module] || null,
    media: (p.post_media || [])
      .sort((a, b) => a.position - b.position)
      .map((m) => ({ ...m, url: urlFor(m.path) })),
  }));

  // Every subject the promo has, one tile each rather than one per
  // semester, including one a colleague added this morning with no files
  // in it yet.
  //
  // The banner is gone. Twenty-two pieces of Canva artwork with the
  // retired mark baked into every one is not something the app can
  // restyle, and a rail of photographs shouts down the two cards either
  // side of it. A subject now carries its name, its colour, and how much
  // is in it.
  const { counts } = await moduleCounts();
  const subjects = (await subjectRail(reading)).map((m) => ({
    id: m.id,
    name: m.name,
    tint: m.tint,
    // Every semester of the subject together: ANATOMIE and ANATOMIE S2
    // are one tile, so they are one number.
    lectures: (m.parts || [{ id: m.id }])
      .reduce((n, part) => n + (counts.get(part.id)?.lectures || 0), 0),
  }));

  return (
    <Home
      unseen={unseen || 0}
      readError={readError ? (readError.message || 'تعذّرت قراءة المنشورات') : null}
      refused={refused}
      me={{ id: profile.id, name: profile.full_name || profile.email.split('@')[0],
            promo: profile.promo,
            approved: profile.status === 'approved'
              || ['owner', 'admin', 'editor'].includes(profile.role) }}
      promos={years.promos}
      reading={reading}
      mySubjects={subjectRows.map((m) => ({ id: m.id, name: m.name }))}
      posts={posts}
      subjects={subjects}
      studying={studying}
      rooms={rooms}
      duels={duels}
      rivals={rivals}
    />
  );
}
