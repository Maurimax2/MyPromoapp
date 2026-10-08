// Reporting something.
//
// Apple will not accept an app carrying what students write without a way to
// report it and a way for somebody to act — and beyond the rule, a promo of
// eighty needs it the first time somebody posts an exam paper they should
// not have.
//
// What can be reported, and what `id` is:
//   post, note   a post's id            comment   a comment's id
//   profile      the person's id        room      the room's id
//   message      the chat's id — stored as the id of the *other* person, with
//                what they wrote copied into the report (see blocks.sql: a
//                moderator never reads a private chat, only that copy)

import { NextResponse } from 'next/server';
import { currentProfile, isAdmin } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { getT } from '@/lib/lang';

export const runtime = 'nodejs';

const KINDS = ['post', 'comment', 'note', 'profile', 'room', 'message'];
// Reported as a person rather than as a thing they posted: acting on one
// means the account, not hiding a row.
const PEOPLE = ['profile', 'message', 'room'];

const stamp = (iso) => String(iso || '').slice(0, 16).replace('T', ' ');
const nameOf = (p) => p?.full_name || p?.email?.split('@')[0] || '—';

/** The last things said, as a moderator will read them. */
function excerptOf(rows, names) {
  return rows.slice(-20)
    .map((m) => `[${stamp(m.created_at)}]${names ? ` ${names.get(m.author) || '—'}:` : ''} ${m.body}`)
    .join('\n').slice(-4000) || null;
}

export async function POST(request) {
  const t = await getT();
  const me = await currentProfile();
  if (!me) return NextResponse.json({ error: t('سجّل الدخول') }, { status: 401 });

  const { type, id, reason } = await request.json();
  if (!KINDS.includes(type) || !id) {
    return NextResponse.json({ error: t('ما الذي تُبلّغ عنه؟') }, { status: 400 });
  }

  const db = supabaseAdmin();
  let target = String(id);
  let excerpt = null;

  if (type === 'message') {
    const { data: chat } = await db.from('chats').select('a, b').eq('id', id).maybeSingle();
    if (!chat || (chat.a !== me.id && chat.b !== me.id)) {
      return NextResponse.json({ error: t('ليست محادثتك') }, { status: 403 });
    }
    target = chat.a === me.id ? chat.b : chat.a;
    const { data: said } = await db.from('chat_messages').select('author, body, created_at')
      .eq('chat', id).eq('author', target).order('created_at', { ascending: false }).limit(20);
    excerpt = excerptOf((said || []).reverse());
  }

  if (type === 'room') {
    const { data: said } = await db.from('room_messages').select('author, body, created_at')
      .eq('room', id).order('created_at', { ascending: false }).limit(20);
    const rows = (said || []).reverse();
    const ids = [...new Set(rows.map((m) => m.author))];
    const { data: people } = ids.length
      ? await db.from('profiles').select('id, full_name, email').in('id', ids)
      : { data: [] };
    excerpt = excerptOf(rows, new Map((people || []).map((p) => [p.id, nameOf(p)])));
  }

  // Reporting the same thing twice is a person pressing again, not two
  // reports. It should not double the queue.
  const { data: already } = await db.from('reports')
    .select('id').eq('reporter', me.id).eq('target_type', type)
    .eq('target_id', target).eq('state', 'open').maybeSingle();
  if (already) return NextResponse.json({ ok: true, already: true });

  const row = {
    target_type: type,
    target_id: target,
    reason: String(reason || '').trim().slice(0, 400) || null,
    reporter: me.id,
  };
  let { error } = await db.from('reports').insert(excerpt ? { ...row, excerpt } : row);
  // Before blocks.sql there is no `excerpt` column. The report still matters
  // more than the copy that goes with it.
  if (error && /excerpt/.test(error.message || '')) {
    ({ error } = await db.from('reports').insert(row));
  }
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}

/**
 * Acting on one: hide what was reported, close the account it came from, or
 * decide there is nothing wrong.
 */
export async function PATCH(request) {
  const t = await getT();
  const me = await currentProfile();
  if (!isAdmin(me)) return NextResponse.json({ error: 'admins only' }, { status: 403 });

  const { id, action } = await request.json();
  if (!id || !['remove', 'suspend', 'dismiss'].includes(action)) {
    return NextResponse.json({ error: 'bad action' }, { status: 400 });
  }

  const db = supabaseAdmin();
  const { data: report } = await db.from('reports')
    .select('target_type, target_id').eq('id', id).maybeSingle();
  if (!report) return NextResponse.json({ error: t('لا بلاغ') }, { status: 404 });

  if (action === 'remove') {
    // Hidden, never deleted: a moderator must be able to look at what they
    // removed, and so must whoever asks them why. Only a post or a comment
    // can be hidden — «remove» on a person used to hide whichever post
    // happened to share the person's id.
    if (PEOPLE.includes(report.target_type)) {
      return NextResponse.json({ error: 'هذا بلاغ عن شخص — أوقف الحساب أو ارفض البلاغ' }, { status: 400 });
    }
    const table = report.target_type === 'comment' ? 'comments' : 'posts';
    await db.from(table).update({ removed: true }).eq('id', report.target_id);
  }

  if (action === 'suspend') {
    // The person behind it goes back behind the door: `refused` sees /waiting
    // and nothing else, exactly like an account never approved. Undone from
    // الأعضاء. Never staff — a report is not a way to lock out a moderator.
    let person = report.target_id;
    if (report.target_type === 'room') {
      const { data: room } = await db.from('rooms').select('host').eq('id', report.target_id).maybeSingle();
      person = room?.host;
    } else if (report.target_type === 'comment' || report.target_type === 'post' || report.target_type === 'note') {
      const table = report.target_type === 'comment' ? 'comments' : 'posts';
      const { data: thing } = await db.from(table).select('author').eq('id', report.target_id).maybeSingle();
      person = thing?.author;
    }
    const { data: them } = person
      ? await db.from('profiles').select('id, role').eq('id', person).maybeSingle()
      : { data: null };
    if (!them) return NextResponse.json({ error: 'الحساب غير موجود' }, { status: 404 });
    if (them.role !== 'student') return NextResponse.json({ error: 'لا يُوقف حساب مشرف من هنا' }, { status: 403 });
    const { error } = await db.from('profiles').update({ status: 'refused' }).eq('id', them.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { error } = await db.from('reports')
    .update({ state: action === 'dismiss' ? 'dismissed' : 'actioned',
              handled_by: me.id, handled_at: new Date().toISOString() })
    .eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await db.from('audit_log').insert({
    actor: me.id, action: `report_${action}`,
    target_type: report.target_type, target_id: report.target_id,
  });

  return NextResponse.json({ ok: true });
}
