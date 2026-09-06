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

// Who the token belongs to.
//
// It used to be whoever the constant said, which meant the app could only
// ever be driven as the owner — and the whole gate (a new account is
// `pending` and reads nothing until somebody approves it) could not be
// walked through end to end. The token now carries the id, so signing in as
// a second person is signing in as a second person.
const tokenFor = (uid) => `mock.${uid}`;
const whoIs = (req) => {
  const raw = String(req.headers.authorization || '').replace(/^Bearer /i, '');
  const uid = raw.startsWith('mock.') ? raw.slice(5) : null;
  const known = [...db.profiles, ...db.authUsers].find((p) => p.id === uid);
  return known ? { id: known.id, email: known.email, user_metadata: {} } : USER;
};

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
  posts: [],
  chats: [],
  chat_messages: [],
  post_media: [],
  comments: [],
  likes: [],
  saves: [],
  rooms: [],
  room_members: [],
  room_messages: [],
  reviews: [],
  reports: [],
  notifications: [],
  authUsers: [{ id: 'u-owner', email: 'owner@unem.mr' }],
  buckets: [],
  objects: new Map(),
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
  // Paging a room's chat asks for anything newer than the last id it holds.
  if (op === 'gt')  return Number(cell) >  Number(val);
  if (op === 'gte') return Number(cell) >= Number(val);
  if (op === 'lt')  return Number(cell) <  Number(val);
  if (op === 'lte') return Number(cell) <= Number(val);
  return true;
}

/**
 * The file inside a multipart body.
 *
 * supabase-js uploads as multipart/form-data, so the raw request carries
 * boundaries and part headers around the bytes. Two traps: storing the whole
 * envelope gives an "image" no browser will paint, and the FIRST part is not
 * the file — supabase sends `cacheControl` ahead of it. The part we want is
 * the one whose headers carry a filename.
 */
function unwrap(raw, contentType) {
  const m = /boundary=(.+)$/.exec(contentType || '');
  if (!m) return { type: contentType || 'application/octet-stream', bytes: raw };

  const boundary = Buffer.from(`--${m[1].trim()}`);
  let at = raw.indexOf(boundary);

  while (at >= 0) {
    const headEnd = raw.indexOf('\r\n\r\n', at);
    if (headEnd < 0) break;
    const headers = raw.slice(at + boundary.length, headEnd).toString();
    const next = raw.indexOf(boundary, headEnd);

    if (/filename=/i.test(headers)) {
      return {
        type: (/content-type:\s*(\S+)/i.exec(headers)?.[1]) || 'application/octet-stream',
        // -2 drops the CRLF that precedes the closing boundary.
        bytes: raw.slice(headEnd + 4, next < 0 ? raw.length : next - 2),
      };
    }
    if (next < 0) break;
    at = next;
  }

  return { type: contentType, bytes: raw };
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
    // The service-key side: making and removing accounts.
    if (path.startsWith('/auth/v1/admin/users')) {
      if (req.method === 'POST') {
        const body_ = await body(req);
        const email = String(body_?.email || '').toLowerCase();
        if (db.profiles.some((p) => p.email.toLowerCase() === email)) {
          return send(res, 422, { message: 'User already registered' });
        }
        const user = { id: 'u-' + id(), email, user_metadata: body_?.user_metadata || {} };
        db.authUsers.push(user);
        return send(res, 200, { user });
      }
      if (req.method === 'DELETE') {
        const uid = path.split('/').pop();
        db.authUsers = db.authUsers.filter((u) => u.id !== uid);
        return send(res, 200, {});
      }
    }

    if (path.endsWith('/token')) {
      const asked = await body(req);
      const email = String(asked?.email || '').toLowerCase();
      const found = email
        ? [...db.profiles, ...db.authUsers].find((p) => (p.email || '').toLowerCase() === email)
        : null;
      if (email && !found) {
        return send(res, 400, { error: 'invalid_grant', error_description: 'Invalid login credentials' });
      }
      const user = found ? { id: found.id, email: found.email, user_metadata: {} } : USER;
      return send(res, 200, {
        access_token: tokenFor(user.id), refresh_token: tokenFor(user.id),
        token_type: 'bearer', expires_in: 3600,
        expires_at: Math.floor(Date.now() / 1000) + 3600, user,
      });
    }
    if (path.endsWith('/user')) return send(res, 200, whoIs(req));
    if (path.endsWith('/logout')) return send(res, 204);
    if (path.endsWith('/otp')) return send(res, 200, {});
    return send(res, 200, {});
  }

  // ---- storage ----------------------------------------------------------
  // Enough of it to prove an upload reaches the server and comes back with a
  // path the page can build a URL from. Nothing is kept on disk.
  if (path.startsWith('/storage/v1/')) {
    if (path.startsWith('/storage/v1/bucket')) {
      const name = path.split('/').pop();
      if (req.method === 'GET' && name !== 'bucket') {
        return db.buckets.includes(name)
          ? send(res, 200, { name, public: true })
          : send(res, 404, { message: 'Bucket not found' });
      }
      if (req.method === 'POST') {
        const b = await body(req);
        if (b?.name && !db.buckets.includes(b.name)) db.buckets.push(b.name);
        return send(res, 200, { name: b?.name });
      }
    }
    // Keep the bytes, so an <img> pointing at a stored object actually paints.
    // Without this the element exists with no height, which is invisible to a
    // browser and to anything checking the page.
    if (path.startsWith('/storage/v1/object/') && req.method === 'POST') {
      const key = decodeURIComponent(path.slice('/storage/v1/object/'.length));
      const chunks = [];
      await new Promise((done) => {
        req.on('data', (c) => chunks.push(c));
        req.on('end', done);
      });
      db.objects.set(key, unwrap(Buffer.concat(chunks), req.headers['content-type']));
      return send(res, 200, { Key: key });
    }

    // HEAD is how the app asks "do we already have this?", and answering 200
    // to everything told it we had files we did not.
    if (path.startsWith('/storage/v1/object/public/') && req.method === 'HEAD') {
      const key = decodeURIComponent(path.slice('/storage/v1/object/public/'.length));
      const obj = db.objects.get(key);
      res.writeHead(obj ? 200 : 404, obj
        ? { 'content-type': obj.type, 'content-length': obj.bytes.length }
        : { 'content-type': 'application/json' });
      return res.end();
    }

    if (path.startsWith('/storage/v1/object/public/') && req.method === 'GET') {
      const key = decodeURIComponent(path.slice('/storage/v1/object/public/'.length));
      const obj = db.objects.get(key);
      if (!obj) return send(res, 404, { message: 'Object not found' });
      res.writeHead(200, {
        'content-type': obj.type,
        'content-length': obj.bytes.length,
        'access-control-allow-origin': '*',
      });
      return res.end(obj.bytes);
    }

    return send(res, 200, {});
  }

  // ---- PostgREST --------------------------------------------------------
  if (!path.startsWith('/rest/v1/')) return send(res, 404, { message: 'not found' });

  const table = path.slice('/rest/v1/'.length).split('?')[0];
  if (!db[table]) return send(res, 404, { message: `relation ${table} does not exist` });

  const params = url.searchParams;
  const prefer = req.headers.prefer || '';
  const filters = [...params.entries()].filter(([k]) =>
    !['select', 'order', 'limit', 'offset', 'on_conflict', 'columns', 'or'].includes(k));

  // `.or('a.eq.x,b.eq.y')` comes through as a single `or` parameter.
  const orClause = params.get('or');
  const matchesOr = (row) => {
    if (!orClause) return true;
    return orClause.replace(/^\(|\)$/g, '').split(',').some((part) => {
      const [col, op, val] = part.split('.');
      return matches(row, col, `${op}.${val}`);
    });
  };

  const pick = () => db[table].filter((row) => matchesOr(row) &&
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

    // Embedded selects — the handful this app actually asks for.
    const select = params.get('select') || '*';
    if (table === 'questions' && select.includes('question_banks')) {
      rows = rows.map((r) => ({
        ...r,
        question_banks: db.question_banks.find((b) => b.id === r.bank) || null,
      }));
    }
    if ((table === 'posts' || table === 'comments') && select.includes('author:profiles')) {
      rows = rows.map((r) => ({
        ...r, author: db.profiles.find((p) => p.id === r.author) || null,
      }));
    }
    if (table === 'posts' && select.includes('post_media')) {
      rows = rows.map((r) => ({
        ...r, post_media: db.post_media.filter((m) => m.post === r.id),
      }));
    }
    if (table === 'rooms' && select.includes('host:profiles')) {
      rows = rows.map((r) => ({ ...r, host: db.profiles.find((p) => p.id === r.host) || null }));
    }
    if (table === 'room_members' && select.includes('person:profiles')) {
      rows = rows.map((r) => ({ ...r, person: db.profiles.find((p) => p.id === r.person) || null }));
    }
    if (table === 'room_messages' && select.includes('author:profiles')) {
      rows = rows.map((r) => ({ ...r, author: db.profiles.find((p) => p.id === r.author) || null }));
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

  // Postgres keeps posts.likes and posts.comments true with a trigger; here
  // it is done by hand so a feed row shows the same number it would live.
  const recount = (post) => {
    const p = db.posts.find((x) => x.id === Number(post) || x.id === post);
    if (!p) return;
    p.likes = db.likes.filter((l) => String(l.post) === String(p.id)).length;
    p.comments = db.comments.filter((c) => String(c.post) === String(p.id)).length;
  };

  // Postgres fills a column's default on insert; without this the app's own
  // `removed = false` filter drops every row it just wrote.
  const DEFAULTS = {
    posts:    () => ({ removed: false, likes: 0, comments: 0, created_at: new Date().toISOString() }),
    comments: () => ({ removed: false, created_at: new Date().toISOString() }),
    likes:    () => ({ created_at: new Date().toISOString() }),
    rooms:    () => ({ closed: false, capacity: 12, created_at: new Date().toISOString() }),
    chats:    () => ({ created_at: new Date().toISOString(), last_at: new Date().toISOString() }),
    chat_messages: () => ({ created_at: new Date().toISOString(), seen: false }),
    room_messages: () => ({ created_at: new Date().toISOString() }),
    room_members:  () => ({ joined_at: new Date().toISOString(), seen_at: new Date().toISOString() }),
    profiles: () => ({ created_at: new Date().toISOString() }),
    documents: () => ({ published: true }),
    reviews:  () => ({ box: 0, wrong: 0, due_at: new Date().toISOString(), seen_at: new Date().toISOString() }),
    reports:  () => ({ state: 'open', created_at: new Date().toISOString() }),
    notifications: () => ({ seen: false, created_at: new Date().toISOString() }),
  };

  if (req.method === 'POST') {
    const payload = await body(req);
    const list = Array.isArray(payload) ? payload : [payload];
    const made = list.map((r) => {
      const row = { ...(DEFAULTS[table]?.() || {}), ...r };
      // Tables whose primary key is the pair, not a serial of their own.
      if (row.id === undefined
          && !['likes', 'saves', 'room_members', 'reviews'].includes(table)) row.id = id();
      db[table].push(row);
      return row;
    });
    if (table === 'likes' || table === 'comments') made.forEach((r) => recount(r.post));

    // .single() asks for one object, not an array of one. Returning the array
    // makes `data.id` undefined, and the caller writes a row with a missing
    // foreign key and no error to show for it.
    const one = req.headers.accept?.includes('vnd.pgrst.object');
    const out = one ? (made[0] ?? null) : made;
    return send(res, 201, prefer.includes('return=representation') ? out : null,
      { 'content-range': `0-${made.length - 1}/${made.length}` });
  }

  if (req.method === 'PATCH') {
    const payload = await body(req);
    const hit = pick();
    hit.forEach((row) => Object.assign(row, payload));
    const one = req.headers.accept?.includes('vnd.pgrst.object');
    return send(res, 200, prefer.includes('return=representation')
      ? (one ? (hit[0] ?? null) : hit) : null);
  }

  if (req.method === 'DELETE') {
    const hit = new Set(pick());
    db[table] = db[table].filter((r) => !hit.has(r));
    if (table === 'likes' || table === 'comments') [...hit].forEach((r) => recount(r.post));
    return send(res, 200, prefer.includes('return=representation') ? [...hit] : null);
  }

  return send(res, 405, { message: 'method not allowed' });
}).listen(PORT, () => console.log(`mock supabase on http://127.0.0.1:${PORT}`));
