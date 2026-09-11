import Link from 'next/link';
import { redirect } from 'next/navigation';
import Icon from '@/components/Icon';
import { supabaseServer, currentProfile } from '@/lib/supabase/server';
import { promoById } from '@/lib/data';
import { normalise } from '@/lib/matricule';

export const dynamic = 'force-dynamic';

const ROLE = {
  owner: 'مالك', admin: 'مشرف', editor: 'محرّر',
  marketing: 'تسويق', student: 'طالب',
};

/**
 * A classmate, found by the number the faculty gave them.
 *
 * The number is what a student actually has written down about somebody
 * else, so it is what the address bar takes: /u/D04458.
 *
 * What comes back is decided by the policies, not here. An approved student
 * reads the profiles of their own promo, so a number from another year finds
 * nobody — which is the same answer as a number nobody holds, and the screen
 * says so the same way rather than confirming that the person exists
 * elsewhere.
 */
export default async function PersonPage({ params }) {
  const me = await currentProfile();
  if (!me) redirect('/login');

  const number = normalise((await params).matricule);
  const sb = await supabaseServer();

  const { data: person } = await sb
    .from('profiles')
    .select('id, full_name, email, promo, role, matricule, created_at')
    .eq('matricule', number)
    .maybeSingle();

  // Your own number lands on your own screen, which has the things only you
  // may see on it.
  if (person && person.id === me.id) redirect('/profile');

  const name = person
    ? (person.full_name || person.email?.split('@')[0] || 'طالب')
    : null;
  const promo = person ? promoById(person.promo) : null;

  // Counted only when somebody was found, and counted the same way الملف
  // counts them, so two screens never disagree about how many answers a
  // person has had accepted.
  const [posts, answers, rooms] = person
    ? await Promise.all([
      sb.from('posts').select('*', { count: 'exact', head: true })
        .eq('author', person.id).eq('removed', false),
      sb.from('comments').select('*', { count: 'exact', head: true })
        .eq('author', person.id).eq('accepted', true),
      sb.from('room_members').select('*', { count: 'exact', head: true })
        .eq('person', person.id),
    ])
    : [null, null, null];

  return (
    <>
      <header className="head">
        <div className="head-row">
          <Link href="/profile" className="icobtn" aria-label="رجوع">
            <Icon name="chev" size={19} />
          </Link>
          <div className="head-t">{name || 'لا أحد بهذا الرقم'}</div>
        </div>
      </header>

      <div className="scroll">
        {!person ? (
          <div className="notice">
            <Icon name="alert" size={19} />
            <div>
              <div className="notice-t">لا أحد بهذا الرقم في دفعتك</div>
              <div className="notice-b">
                تحقّق من الرقم <span dir="ltr">{number}</span> — أو أنّ صاحبه في دفعة أخرى.
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="me">
              <div className="av" style={{ width: 68, height: 68, fontSize: 22, background: 'var(--purple)' }}>
                {name.slice(0, 2)}
              </div>
              <div className="me-name">{name}</div>
              <div className="me-row">
                {promo && (
                  <span className="pill solid" style={{ background: promo.badge, fontSize: 11 }}>
                    {promo.name}
                  </span>
                )}
                <span className="me-sub">{ROLE[person.role] || person.role} · UNEM</span>
              </div>
              {/* The number, not the address: a classmate's email is theirs. */}
              <div className="me-mail" dir="ltr">{person.matricule}</div>

              <div className="me-stats">
                {[[posts?.count || 0, 'منشور'],
                  [answers?.count || 0, 'جواب مقبول'],
                  [rooms?.count || 0, 'غرفة']].map(([n, l]) => (
                  <div key={l} className="me-stat">
                    <b>{n}</b><span>{l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* الصداقة والتحدّي لاحقًا — ما يظهر هنا يجب أن يعمل. */}
          </>
        )}
      </div>
    </>
  );
}
