// A stand-in for Supabase, so the panel can be driven before it is shipped.
//
// Not a database — an in-memory answer to the handful of PostgREST and auth
// calls the panel makes. It exists because everything in this project was
// being compiled and eyeballed rather than clicked, and "the button does
// nothing" is exactly the class of bug that only shows up when you click.
//
//   node scripts/mock-supabase.mjs &
//   NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321 ... npx next dev

import { createServer } from 'node:http';

const PORT = 54321;
let nextId = 1000;
const id = () => ++nextId;

const USER = { id: 'u-owner', email: 'owner@unem.mr' };

const db = {
  profiles: [
    { id: 'u-owner', email: 'owner@unem.mr', full_name: 'Hamad', promo: 'pcem2',
      role: 'owner', status: 'approved', created_at: '2026-09-01' },
    { id: 'u-1', email: 'mohamedvall@gmail.com', full_name: 'Mohamed Vall', promo: null,
      role: 'student', status: 'pending', created_at: '2026-09-04' },
    { id: 'u-2', email: 'aichetou.b@gmail.com', full_name: null, promo: null,
      role: 'student', status: 'pending', created_at: '2026-09-04' },
    { id: 'u-3', email: 'sidi@gmail.com', full_name: 'Sidi Ahmed', promo: 'pcem2',
      role: 'editor', status: 'approved', created_at: '2026-09-02' },
  ],
  promos: [
    { id: 'pcem1', name: 'PCEM1', label: 'السنة الأولى', badge: '#8B5CF6', position: 1, indexed: false },
    { id: 'pcem2', name: 'PCEM2', label: 'السنة الثانية', badge: '#6B21B5', position: 2, indexed: true },
    { id: 'dcem1', name: 'DCEM1', label: 'السنة الثالثة', badge: '#F97316', position: 3, indexed: false },
    { id: 'dcem2', name: 'DCEM2', label: 'السنة الرابعة', badge: '#C2410C', position: 4, indexed: false },
    { id: 'dcem3', name: 'DCEM3', label: 'السنة الخامسة', badge: '#7C3AED', position: 5, indexed: false },
    { id: 'dcem4', name: 'DCEM4', label: 'السنة السادسة', badge: '#9A3412', position: 6, indexed: false },
  ],
  modules: [
    { id: 'anatomie', promo: 'pcem2', semester: 'S1', name: 'ANATOMIE', icon: 'person', tint: 'purple', professors: [], position: 0 },
    { id: 'biochimie', promo: 'pcem2', semester: 'S1', name: 'BIOCHIMIE', icon: 'flask', tint: 'orange', professors: [], position: 1 },
    { id: 'biophysique', promo: 'pcem2', semester: 'S2', name: 'BIOPHYSIQUE', icon: 'atom', tint: 'purple', professors: [], position: 2 },
  ],
  chapters: [{ id: 1, module: 'anatomie', title: 'Tête et cou', subtitle: null, position: 0 }],
  documents: [
    { id: 1, module: 'anatomie', chapter: 1, where_shown: 'archive', section: 'lecture', n: '4',
      title: 'Ostéologie du crâne', prof: null, year: 2021, ext: 'PDF', bytes: 8800000,
      drive_id: 'drv1', published: true, position: 0 },
    { id: 2, module: 'anatomie', chapter: 1, where_shown: 'archive', section: 'lecture', n: '5',
      title: 'Les vaisseaux tête et cou', prof: null, year: null, ext: 'PDF', bytes: 12700000,
      drive_id: 'drv2', published: true, position: 1 },
    { id: 3, module: 'anatomie', chapter: null, where_shown: 'quiz', section: 'exam', n: null,
      title: 'Examen ANATOMIE 2021', prof: null, year: 2021, ext: 'PDF', bytes: 2100000,
      drive_id: 'drv3', published: true, position: 0 },
  ],
  question_banks: [{ id: 1, module: 'anatomie', document: 3, title: 'Examen ANATOMIE 2021', section: null, position: 0 }],
  questions: [
    { id: 1, bank: 1, n: '1', stem: "Concernant les muscles masticateurs, quelle(s) proposition(s) est (sont) exacte(s) ?",
      options: ['Le temporal est innervé par le nerf mandibulaire', 'Le masséter est abaisseur', 'Le ptérygoïdien latéral est propulseur'],
      answer: [], why: null, source: 'paper', status: 'needs_answer' },
    { id: 2, bank: 1, n: '2', stem: "Le nerf facial émerge du…",
      options: ['sillon bulbo-pontique', 'mésencéphale', 'moelle spinale'],
      answer: [0], why: null, source: 'paper', status: 'published' },
  ],
  audit_log: [],
  import_jobs: [],
};

const send = (res, code, body, headers = {}) => {
  const text = body === undefined ? '' : JSON.stringify(body);
  res.writeHead(code, {
    'content-type': 'application/json',
    'access-control-allow-origin': '*',
    'access-control-allow-headers': '*',
    'access-control-expose-headers': 'content-range',
    ...headers,
  });
  res.end(text);
};

/** eq.x / in.(a,b) / gt.x — the operators the panel actually sends. */
function matches(row, key, spec) {
  const [op, ...rest] = String(spec).split('.');
  const val = rest.join('.');
  const cell = row[key];
  if (op === 'eq') return String(cell) === val;
  if (op === 'neq') return String(cell) !== val;
  if (op === 'is') return val === 'null' ? cell == null : String(cell) === val;
  if (op === 'in') {
    const list = val.replace(/^\(|\)$/g, '').split(',').map((s) => s.replace(/^"|"$/g, ''));
    return list.includes(String(cell));
  }
  return true;
}

const body = (req) => new Promise((resolve) => {
  let b = ''; req.on('data', (c) => { b += c; });
  req.on('end', () => { try { resolve(b ? JSON.parse(b) : null); } catch { resolve(null); } });
});

createServer(async (req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
  const path = url.pathname;

  if (req.method === 'OPTIONS') return send(res, 204);

  // ---- auth -------------------------------------------------------------
  if (path.startsWith('/auth/v1/')) {
    if (path.endsWith('/token')) {
      return send(res, 200, {
        access_token: 'mock-access', refresh_token: 'mock-refresh',
        token_type: 'bearer', expires_in: 3600,
        expires_at: Math.floor(Date.now() / 1000) + 3600, user: USER,
      });
    }
    if (path.endsWith('/user')) return send(res, 200, USER);
    if (path.endsWith('/logout')) return send(res, 204);
    if (path.endsWith('/otp')) return send(res, 200, {});
    return send(res, 200, {});
  }

  // ---- PostgREST --------------------------------------------------------
  if (!path.startsWith('/rest/v1/')) return send(res, 404, { message: 'not found' });

  const table = path.slice('/rest/v1/'.length).split('?')[0];
  if (!db[table]) return send(res, 404, { message: `relation ${table} does not exist` });

  const params = url.searchParams;
  const prefer = req.headers.prefer || '';
  const filters = [...params.entries()].filter(([k]) =>
    !['select', 'order', 'limit', 'offset', 'on_conflict', 'columns'].includes(k));

  const pick = () => db[table].filter((row) =>
    filters.every(([k, v]) => {
      // questions?question_banks.module=eq.x — a filter on an embedded table
      if (k.includes('.')) {
        const [rel, col] = k.split('.');
        if (rel === 'question_banks') {
          const bank = db.question_banks.find((b) => b.id === row.bank);
          return bank ? matches(bank, col, v) : false;
        }
        return true;
      }
      return matches(row, k, v);
    }));

  if (req.method === 'GET' || req.method === 'HEAD') {
    let rows = pick();

    const order = params.get('order');
    if (order) {
      const [col, dir] = order.split('.');
      rows = [...rows].sort((a, b) =>
        (a[col] > b[col] ? 1 : a[col] < b[col] ? -1 : 0) * (dir === 'desc' ? -1 : 1));
    }

    const total = rows.length;
    const limit = Number(params.get('limit') || 0);
    if (limit) rows = rows.slice(0, limit);

    // Embedded selects: questions carry their bank.
    const select = params.get('select') || '*';
    if (table === 'questions' && select.includes('question_banks')) {
      rows = rows.map((r) => ({
        ...r,
        question_banks: db.question_banks.find((b) => b.id === r.bank) || null,
      }));
    }

    const headers = { 'content-range': `0-${Math.max(rows.length - 1, 0)}/${total}` };
    if (prefer.includes('count=exact') && req.headers['accept']?.includes('json')) {
      // head:true comes through as a GET the client reads the range from
    }
    if (params.get('select') && prefer.includes('return=')) { /* no-op */ }

    // count queries come through as HEAD with Prefer: count=exact — the number
    // lives in the content-range header, not the body.
    if (req.method === 'HEAD') return send(res, 200, undefined, headers);

    const single = req.headers.accept?.includes('vnd.pgrst.object');
    if (single) {
      if (!rows.length) return send(res, 406, { message: 'no rows' }, headers);
      return send(res, 200, rows[0], headers);
    }
    return send(res, 200, rows, headers);
  }

  if (req.method === 'POST') {
    const payload = await body(req);
    const list = Array.isArray(payload) ? payload : [payload];
    const made = list.map((r) => {
      const row = { ...r };
      if (row.id === undefined) row.id = id();
      db[table].push(row);
      return row;
    });
    return send(res, 201, prefer.includes('return=representation') ? made : null,
      { 'content-range': `0-${made.length - 1}/${made.length}` });
  }

  if (req.method === 'PATCH') {
    const payload = await body(req);
    const hit = pick();
    hit.forEach((row) => Object.assign(row, payload));
    return send(res, 200, prefer.includes('return=representation') ? hit : null);
  }

  if (req.method === 'DELETE') {
    const hit = new Set(pick());
    db[table] = db[table].filter((r) => !hit.has(r));
    return send(res, 200, prefer.includes('return=representation') ? [...hit] : null);
  }

  return send(res, 405, { message: 'method not allowed' });
}).listen(PORT, () => console.log(`mock supabase on http://127.0.0.1:${PORT}`));
