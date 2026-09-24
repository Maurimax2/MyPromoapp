import { redirect } from 'next/navigation';
import { supabaseServer, currentProfile } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { subjectsOf, subjectRail, promosOf, moduleCounts } from '@/lib/catalogue';
import { browsingPromo } from '@/lib/promo';
import { stage } from '@/lib/duel';
import { urlFor } from '@/lib/storage';
import Home from './Home';
import { isHere } from '@/lib/rooms';
import { dailyQuestion, shown, dailyTally, myDaily } from '@/lib/daily';
import { streaksOf, studiedToday } from '@/lib/days';
import { dayOf, weekStart } from '@/lib/habit';

export const dynamic = 'force-dynamic';

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
  // Everybody has a username now — it is how classmates find and challenge
  // each other. Members from before it existed choose one, once, on /waiting.
  // (`undefined`, not `null`, while accounts.sql has not been pasted.)
  if (profile.username === null) redirect('/waiting');
  const promo = profile.promo || 'pcem2';
  const sb = await supabaseServer();
  const admin = supabaseAdmin();
  // The year being read is a cookie, checked against the list of years once
  // that arrives. The rail starts on the cookie's word meanwhile.
  const guess = await browsingPromo(profile, null);

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
    guessedRail,
    daily,
    answered,
    tally,
    today,
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
      const { data: open } = await sb.from('rooms')
        .select('id, title, topic, module, capacity, created_at')
        .eq('promo', promo).eq('closed', false)
        .order('created_at', { ascending: false }).limit(12);
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
    subjectsOf(promo),
    moduleCounts(),
    subjectRail(guess),
    // The daily habit (habits.sql): today's question for the year, whether I
    // answered it, how the year did, who studied today, and my own days.
    dailyQuestion(promo),
    myDaily(profile.id),
    dailyTally(promo),
    studiedToday(promo),
    streaksOf([profile.id]),
  ]);

  const reading = await browsingPromo(profile, years.promos);
  // Every subject of the year being read, one tile each rather than one per
  // semester — read again only if the cookie named a year that does not exist.
  const rail = reading === guess ? guessedRail : await subjectRail(reading);

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

  // The question, without its answer unless it has been answered already.
  const q = answered?.off ? null : shown(daily);
  if (q && answered?.answered) { q.answer = daily.answer; q.why = daily.why; }

  // Saturday and Sunday: how the week that ended went.
  const myHabit = habit.get(profile.id);
  const dow = new Date().getUTCDay();
  let recap = null;
  if ((dow === 6 || dow === 0) && myHabit) {
    const thisWeek = weekStart();
    const lastWeek = dayOf(Date.parse(`${thisWeek}T00:00:00Z`) - 7 * 86400000);
    const days = [...myHabit.days.keys()].filter((d) => d >= lastWeek && d < thisWeek).length;
    const { count } = await admin.from('daily_answers').select('person', { count: 'exact', head: true })
      .eq('person', profile.id).eq('correct', true).gte('day', lastWeek).lt('day', thisWeek);
    if (days || count) recap = { days, right: count || 0 };
  }

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
      daily={q ? { q, mine: answered, tally } : null}
      today={today}
      habitDays={myHabit ? Object.fromEntries(myHabit.days) : null}
      recap={recap}
    />
  );
}
