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

/** The signed-in person's profile, or null. */
export async function currentProfile() {
  const sb = await supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return null;

  const { data } = await sb.from('profiles').select('*').eq('id', user.id).single();
  return data || { id: user.id, email: user.email, role: 'student', status: 'pending' };
}

export const isStaff = (p) => !!p && ['owner', 'admin', 'editor'].includes(p.role);
export const isAdmin = (p) => !!p && ['owner', 'admin'].includes(p.role);

/** Where a signed-in person belongs. Staff run the panel; students get the app. */
export const homeFor = (p) => (isStaff(p) ? '/admin' : '/feed');
