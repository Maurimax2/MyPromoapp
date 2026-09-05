'use client';

// The browser's view of Supabase. It carries the publishable key, so every
// query it makes is checked against the row-level security policies in
// supabase/schema.sql — the browser is never trusted with more than a student
// is allowed to see.

import { createBrowserClient } from '@supabase/ssr';

let client;

export function supabase() {
  if (!client) {
    client = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );
  }
  return client;
}
