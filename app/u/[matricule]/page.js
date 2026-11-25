import Link from '@/components/Link';
import { redirect } from 'next/navigation';
import Icon from '@/components/Icon';
import { currentProfile } from '@/lib/supabase/server';
import { promoById, badgeOf } from '@/lib/data-core';
import { normalise, looksRight } from '@/lib/matricule';
import { normaliseUsername, handleOf } from '@/lib/identity';
import { friendState } from '@/lib/friends';
import FriendButton from '@/components/FriendButton';
import Flag from '@/components/Flag';
import Unblock from '@/components/Unblock';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { getT } from '@/lib/lang';

export const dynamic = 'force-dynamic';

const ROLE = {
  owner: 'مالك', admin: 'مشرف', editor: 'محرّر',
  marketing: 'تسويق', student: 'طالب',
};

/**
 * A classmate, found by the number the faculty gave them.
 *
 * The number is what a student actually has written down about somebody
 * else, so it is what the address bar takes: /u/D12345.
 *
 * From any year (owner, 2026-11-25): a student's own key reads only their
 * year's profiles, so this reads with the server's key and takes only what the
 * screen prints — never the email, past the name it falls back to. Somebody
 * who has blocked you reads as nobody, the same answer as a number nobody
 * holds; somebody you blocked is shown, with the way to undo it.
 */
export default async function PersonPage({ params }) {
  const t = await getT();
  const me = await currentProfile();
  if (!me) redirect('/login');

  // A university number or a username — /u/D12345 or /u/sidi.ahmed. First-
  // years have no number yet, and a username is what friends remember.
  const raw = decodeURIComponent((await params).matricule);
  const number = normalise(raw);
  const byNumber = looksRight(number);
  const handle = normaliseUsername(raw);
  const db = supabaseAdmin();

  const { data: found } = await db
    .from('profiles')
    .select('id, full_name, email, username, matricule, promo, role, status')
    .eq(byNumber ? 'matricule' : 'username', byNumber ? number : handle)
    .maybeSingle();
  // An account not let in yet is nobody to a student.
  const visible = found && (found.status === 'approved' || ['owner', 'admin', 'editor'].includes(found.role));
  const theyBlocked = visible && found.id !== me.id
    ? await db.from('blocks').select('blocker').eq('blocker', found.id).eq('blocked', me.id).maybeSingle()
      .then((r) => !!r.data, () => false)
    : false;
  const person = visible && !theyBlocked ? found : null;

  // Your own number lands on your own screen, which has the things only you
  // may see on it.
  if (person && person.id === me.id) redirect('/profile');

  const name = person
    ? (person.full_name || person.email?.split('@')[0] || t('طالب'))
    : null;
  const promo = person ? promoById(person.promo) : null;

  // Counted only when somebody was found, and counted the same way الملف
  // counts them, so two screens never disagree about how many answers a
  // person has had accepted. With the server's key: their posts are in their
  // own year's feed, which your key does not read.
  const [posts, answers, rooms, friendship, blocking] = person
    ? await Promise.all([
      db.from('posts').select('*', { count: 'exact', head: true })
        .eq('author', person.id).eq('removed', false),
      db.from('comments').select('*', { count: 'exact', head: true })
        .eq('author', person.id).eq('accepted', true),
      db.from('room_members').select('*', { count: 'exact', head: true })
        .eq('person', person.id),
      friendState(me.id, person.id),
      // Only a block you made is shown here. One they made is not yours to
      // know about — their profile reads as it always did.
      supabaseAdmin().from('blocks').select('blocker')
        .eq('blocker', me.id).eq('blocked', person.id).maybeSingle()
        .then((r) => !!r.data, () => false),
    ])
    : [null, null, null, 'none', false];

  return (
    <>
      <header className="head">
        <div className="head-row">
          <Link href="/profile" className="icobtn" aria-label={t('رجوع')}>
            <Icon name="chev" size={19} />
          </Link>
          <div className="head-t">{name || t('لم نجد أحدًا')}</div>
          {person && (
            <Flag type="profile" id={person.id} person={{ id: person.id, name }} blocked={blocking}
              className="icobtn" />
          )}
        </div>
      </header>

      <div className="scroll">
        {!person ? (
          <div className="notice">
            <Icon name="alert" size={19} />
            <div>
              <div className="notice-t">{t('لا أحد بهذا الاسم أو الرقم')}</div>
              <div className="notice-b">{t('تحقّق من')}{' '}<span dir="ltr">{byNumber ? number : `@${handle}`}</span></div>
            </div>
          </div>
        ) : (
          <>
            <div className="me">
              <div className="av" style={{ width: 68, height: 68, fontSize: 22, background: 'var(--olive)' }}>
                {name.slice(0, 2)}
              </div>
              <div className="me-name">{name}</div>
              <div className="me-row">
                {promo && (
                  <span className="pill solid" style={{ background: badgeOf(promo), fontSize: 11 }}>
                    {promo.name}
                  </span>
                )}
                <span className="me-sub">{t(ROLE[person.role] || person.role)} · FMPOS</span>
              </div>
              {/* The number, not the address: a classmate's email is theirs. */}
              <div className="me-mail" dir="ltr">
                {[person.username && `@${person.username}`, person.matricule].filter(Boolean).join(' · ')}
              </div>

              <div className="me-stats">
                {[[posts?.count || 0, t('منشور')],
                  [answers?.count || 0, t('جواب مقبول')],
                  [rooms?.count || 0, t('غرفة')]].map(([n, l]) => (
                  <div key={l} className="me-stat">
                    <b>{n}</b><span>{l}</span>
                  </div>
                ))}
              </div>
            </div>

            {blocking ? (
              <div className="notice">
                <Icon name="block" size={19} />
                <div className="grow">
                  <div className="notice-t">{t('حظرت هذا الحساب')}</div>
                  <div className="notice-b">{t('لا يرى أحدكما ما ينشره الآخر، ولا يستطيع مراسلتك أو تحدّيك.')}</div>
                </div>
                <Unblock person={person.id} className="fr-unblock" />
              </div>
            ) : (
              <>
                <FriendButton to={handleOf(person) || person.id} state={friendship} />

                {/* نفس الأسئلة، ونتيجتان. الرقم معروف هنا، فلا داعي لكتابته. */}
                <Link href={`/duel/new?to=${encodeURIComponent(handleOf(person) || '')}`} className="btn p">
                  <Icon name="swords" size={18} />{t('تحدَّ {v1}', { v1: name.split(' ')[0] })}</Link>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
