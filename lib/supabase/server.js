// Supabase as the signed-in person, on the server.
//
// Reads the session from cookies, so a server component knows who is asking
// and the same row-level security applies. Route handlers may write the
// refreshed cookie back; a server component may not, and Next throws if it
// tries — hence the swallowed error.

import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export async function supabaseServer() {
  const store = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => store.getAll(),
        setAll: (list) => {
          try {
            for (const { name, value, options } of list) store.set(name, value, options);
          } catch {
            // A server component cannot set cookies. The middleware refreshes
            // the session instead, so there is nothing to do here.
          }
        },
      },
    },
  );
}

/**
 * The signed-in person's profile, or null.
 *
 * A signed-in person with no row is a real case and not a rare one: the
 * magic link creates the auth user before anybody has filled in a form, and
 * an account made in Supabase's own dashboard has no profile either. This
 * used to answer that by inventing one in memory — the same mistake
 * `syncStaffRole` made, and with the same result one level down. The person
 * could use the app, `profiles` had never heard of them, and so
 * اللوحة ← الأعضاء could not list them: they signed up, waited, and no
 * amount of looking at the panel would ever show them to anybody.
 *
 * So write the row. It is `pending` like any other new account, which puts
 * them in the list an admin actually reads. The insert is allowed by
 * `profiles_insert` (`id = auth.uid()`), so it needs no service key, and it
 * happens once per person rather than once per page.
 */
export async function currentProfile() {
  const sb = await supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return null;

  const { data } = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
  if (data) return data;

  const row = {
    id: user.id,
    email: user.email,
    full_name: user.user_metadata?.full_name || null,
    role: 'student',
    status: 'pending',
  };

  // Two tabs of a first sign-in race each other here, so a row that already
  // exists is the expected outcome, not a failure: read it back either way.
  const { data: made } = await sb.from('profiles').insert(row).select('*').maybeSingle();
  if (made) return made;

  const { data: raced } = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
  return raced || row;
}

export const isStaff = (p) => !!p && ['owner', 'admin', 'editor'].includes(p.role);
export const isAdmin = (p) => !!p && ['owner', 'admin'].includes(p.role);

/**
 * Where signing in lets you out — the app, for everybody.
 *
 * It used to send staff to the panel, back when only staff had the site at
 * all. The panel is now its own door with its own sign-in: nothing in the app
 * links to it, and coming through the app's front door lands you in the app
 * whoever you are.
 */
export const homeFor = () => '/feed';
