// Reading how a screen is arranged.
//
// Falls back to the built-in order whenever the row is missing, empty, or the
// database refuses it — an arrangement nobody has saved yet must show the
// default screen, never an empty one.

import { supabaseServer } from '@/lib/supabase/server';
import { readLayout } from '@/lib/home-blocks';

export async function layoutOf(screen = 'home') {
  try {
    const sb = await supabaseServer();
    const { data, error } = await sb
      .from('layouts').select('blocks').eq('screen', screen).maybeSingle();
    if (error || !data) return readLayout(null);
    return readLayout(data.blocks);
  } catch {
    // A screen that cannot read its own arrangement still has to draw.
    return readLayout(null);
  }
}
