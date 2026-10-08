import { redirect } from 'next/navigation';
import { supabaseServer, currentProfile } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { subjectsOf, subjectRail, promosOf, moduleCounts } from '@/lib/catalogue';
import { stage } from '@/lib/duel';
import { urlFor } from '@/lib/storage';
import Home from './Home';
import { isHere } from '@/lib/rooms';
import { streaksOf } from '@/lib/days';
import { sessionsOf, hasPlanning, LECTURE } from '@/lib/timetable';
import { withLinks } from '@/lib/timetable-links';
import { getT } from '@/lib/lang';

export const dynamic = 'force-dynamic';

// From today on, up to the sixth lecture — and everything before it, because
// the rows between (a week of «Vacances», a day left for revision) are what
// say why nothing is on. Counting rows instead stops short inside a holiday.
function soon(sessions, today) {
  const out = [];
  let lectures = 0;
  for (const x of sessions) {
    if (x.date < today) continue;
    out.push(x);
    if (LECTURE.has(x.kind) && ++lectures >= 6) break;
  }
  return out;
}

// Two letters and a name. A promo is small enough that everyone knows every
// face, so initials read as people rather than as placeholders.
const nameOf = (p) => ({ id: p.id, name: p.full_name || p.email?.split('@')[0] || 'زميل' });

// الرئيسية — what your promo is saying, and everything the app can do.
//
// Everything it needs is asked for at once. It used to be asked for one
// thing after another — thirteen waits in a row, the subjects read twice —
// and on mobile data the screen took as long as all of them added together.
// Now it takes as long as the slowest one, plus one more for who is sitting
// in the rooms, which needs the rooms first.
export default async function Feed() {
  const t = await getT();
  const profile = await currentProfile();
  if (!profile) redirect('/login');

  // `promo` is who the student is: whose feed this is, whose subjects «موادك»
  // shows, and the year they post into. Other years are browsed from الدراسة.
  //
  // No year at all is a third thing, and falling back to 'pcem2' here was a
  // lie the policies do not tell: the query asked for PCEM2's posts while
  // my_promo() stayed NULL, so row-level security refused every one of them
  // and the student was left reading an empty feed that looked like a quiet
  // day. /waiting is where a year gets chosen.
  if (!profile.promo && !['owner', 'admin', 'editor'].includes(profile.role)) {
    redirect('/waiting');
  }
  // Everybody has a username now — it is how classmates find and challenge
  // each other. Members from before it existed choose one, once, on /waiting.
  // (`undefined`, not `null`, while accounts.sql has not been pasted.)
  if (profile.username === null) redirect('/waiting');
  const promo = profile.promo || 'pcem2';
  const sb = await supabaseServer();
  const admin = supabaseAdmin();

  // The planning's next few sessions: everything from today on, enough to
  // say what is live, what is next, and why an empty day is empty.
  const rendered = Date.now();
  const planned = hasPlanning(promo) ? sessionsOf(promo) : [];
  const term = planned.length ? { first: planned[0].date, last: planned.at(-1).date } : null;
  const today = new Date(rendered).toISOString().slice(0, 10);
  const subjectsP = subjectsOf(promo);
  const upcomingP = planned.length
    ? subjectsP.then((rows) => withLinks(
        soon(planned, today),
        rows.map((m) => ({ id: m.id, name: m.name })), sb))
    : Promise.resolve([]);

  const [
    years,
    { data: rows, error: readError },
    { data: mine },
    { count: unseen },
    { openRooms, sitting },
    { data: duelRows },
    { data: mates },
    subjectRows,
    { counts },
    rail,
    upcoming,
    habit,
  ] = await Promise.all([
    promosOf(),
    // The posts, their authors and their attachments…
    sb.from('posts')
      .select(`id, body, kind, module, created_at, likes, comments,
               author:profiles!posts_author_fkey(id, full_name, email, promo),
               post_media(kind, path, name, bytes, position)`)
      .eq('promo', promo).eq('removed', false)
      .order('created_at', { ascending: false }).limit(30),
    // …which ones I have already liked…
    sb.from('likes').select('post').eq('person', profile.id),
    // …and the bell. Read with the service key: a student's own
    // notifications are their own rows, and this is one head request.
    admin.from('notifications').select('id', { count: 'exact', head: true })
      .eq('person', profile.id).eq('seen', false),
    // مَن يدرس الآن — the promo's open rooms and who is sitting in them. The
    // one thing on this screen that is true only at this second, so it is
    // never cached and never guessed at.
    (async () => {
      // `*` and a filter here, not a column in the query: a database that has
      // not had rooms-private.sql has no `private`, and naming it would hide
      // every room until it did. A private room is never offered.
      const { data: every } = await sb.from('rooms')
        .select('*')
        .eq('promo', promo).eq('closed', false)
        .order('created_at', { ascending: false }).limit(24);
      const open = (every || []).filter((r) => !r.private).slice(0, 12);
      const ids = (open || []).map((r) => r.id);
      const { data: seated } = ids.length
        ? await sb.from('room_members')
            .select('room, person, seen_at, profile:profiles!room_members_person_fkey(id, full_name, email)')
            .in('room', ids)
        : { data: [] };
      return { openRooms: open || [], sitting: seated || [] };
    })(),
    sb.from('duels')
      .select(`id, title, state, questions, seconds, challenger, opponent, challenger_at, opponent_at, created_at,
               a:profiles!duels_challenger_fkey(id, full_name, email),
               b:profiles!duels_opponent_fkey(id, full_name, email)`)
      .or(`challenger.eq.${profile.id},opponent.eq.${profile.id}`)
      .order('created_at', { ascending: false })
      .limit(40),
    // Somebody to challenge, so the duels section is never an empty shelf —
    // anybody with a number or a username to address a challenge to.
    sb.from('profiles')
      .select('*')
      .eq('promo', promo).eq('status', 'approved')
      .neq('id', profile.id)
      .limit(24),
    subjectsP,
    moduleCounts(),
    // موادك is the student's own year, always. It used to follow the year
    // being browsed (the cookie الدراسة sets), so a peek at PCEM1 left
    // PCEM1's subjects on the home screen under «موادك» for good.
    subjectRail(promo),
    // What the faculty's planning has next for my year, with a way to revise
    // each — read beside everything else, so it costs no wait of its own.
    upcomingP,
    // My own days (habits.sql), for the flame.
    streaksOf([profile.id]),
  ]);


  const liked = new Set((mine || []).map((l) => l.post));

  // An empty feed has two very different causes and used to look identical
  // either way: nobody has posted, or the database has posts and will not
  // hand them to you. Row-level security does not raise an error when it
  // refuses — it simply returns nothing — so the only way to tell is to ask
  // again with the key that ignores policies and compare the two numbers.
  let refused = 0;
  if (!readError && !(rows || []).length) {
    const { count } = await admin
      .from('posts').select('id', { count: 'exact', head: true })
      .eq('promo', promo).eq('removed', false);
    refused = count || 0;
  }

  const named = Object.fromEntries(subjectRows.map((m) => [m.id, m.name]));

  // A student in two rooms is one student studying, not two — and only who
  // is on a room screen now (lib/rooms.js), not who ever joined one.
  const who = new Map();
  const inRoom = new Map();
  const now = Date.now();
  for (const m of sitting.filter((x) => isHere(x, now))) {
    const person = m.profile;
    if (person && !who.has(person.id)) who.set(person.id, person);
    inRoom.set(m.room, [...(inRoom.get(m.room) || []), person].filter(Boolean));
  }

  // A room nobody is sitting in is not «open» in any sense a student cares
  // about, so the sheet does not offer it.
  const rooms = openRooms.filter((r) => inRoom.get(r.id)?.length).map((r) => ({
    id: r.id,
    title: r.title,
    topic: r.topic || named[r.module] || null,
    capacity: r.capacity || null,
    people: (inRoom.get(r.id) || []).map((x) => nameOf(x)),
  }));

  const studying = [...who.values()].map((x) => nameOf(x));

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

  // Classmates you are not already in a duel with.
  const busyWith = new Set(duels.map((d) => d.them.id));
  const rivals = (mates || [])
    .filter((m) => !busyWith.has(m.id) && (m.matricule || m.username))
    .slice(0, 3)
    .map((m) => ({ ...nameOf(m), handle: m.matricule || m.username }));

  const posts = (rows || []).map((p) => ({
    ...p,
    liked: liked.has(p.id),
    subject: named[p.module] || null,
    media: (p.post_media || [])
      .sort((a, b) => a.position - b.position)
      .map((m) => ({ ...m, url: urlFor(m.path) })),
  }));

  const myHabit = habit.get(profile.id);

  const subjects = rail.map((m) => ({
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
      readError={readError ? (readError.message || t('تعذّرت قراءة المنشورات')) : null}
      refused={refused}
      me={{ id: profile.id, name: profile.full_name || profile.email.split('@')[0],
            promo: profile.promo,
            approved: profile.status === 'approved'
              || ['owner', 'admin', 'editor'].includes(profile.role) }}
      promos={years.promos}
      mySubjects={subjectRows.map((m) => ({ id: m.id, name: m.name }))}
      posts={posts}
      subjects={subjects}
      studying={studying}
      rooms={rooms}
      duels={duels}
      rivals={rivals}
      next={upcoming}
      term={term}
      now={rendered}
      habitDays={myHabit ? Object.fromEntries(myHabit.days) : null}
    />
  );
}
