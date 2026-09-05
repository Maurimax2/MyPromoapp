// Supabase with the secret key — no row-level security, no user.
//
// This bypasses every policy in the schema, so it belongs only in code that
// has already established who is asking and what they may do. It is never
// imported into anything the browser can reach.

import { createClient } from '@supabase/supabase-js';

export function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase is not configured on the server');

  return createClient(url, key, { auth: { persistSession: false } });
}

/** The emails allowed to sign in as staff, from Vercel's ADMIN_EMAILS. */
export function staffEmails() {
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

const STAFF = ['owner', 'admin', 'editor'];

/**
 * Bring a profile's role in line with ADMIN_EMAILS.
 *
 * The role used to be written once, when the row was created, so anyone added
 * to ADMIN_EMAILS afterwards stayed a student until they signed in again —
 * and signing in again means a magic link, which is exactly the thing that
 * runs out. So it is applied wherever it is noticed instead: the variable is
 * server config nobody but us can set, and the update is idempotent.
 */
export async function syncStaffRole(profile) {
  if (!profile?.id || !profile.email) return profile;
  if (STAFF.includes(profile.role)) return profile;
  if (!staffEmails().includes(profile.email.toLowerCase())) return profile;

  const { error } = await supabaseAdmin()
    .from('profiles')
    .update({ role: 'admin', status: 'approved' })
    .eq('id', profile.id);
  if (error) return profile;

  return { ...profile, role: 'admin', status: 'approved' };
}
