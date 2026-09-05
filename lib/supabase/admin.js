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
