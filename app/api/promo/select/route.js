import { NextResponse } from 'next/server';

export async function POST(request) {
  const { promo } = await request.json();

  if (!promo || !['pcem1', 'pcem2', 'dcem1', 'dcem2', 'dcem3', 'dcem4'].includes(promo)) {
    return NextResponse.json({ error: 'Invalid promo' }, { status: 400 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set('selected-promo', promo, { maxAge: 60 * 60 * 24 * 365 });
  return res;
}
