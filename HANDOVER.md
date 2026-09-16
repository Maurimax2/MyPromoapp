# MyPromo — everything another AI needs to know

Written 2026-09-16, on branch `claude/mypromo-web-kickoff-mwtduw` at `e102e16`.

This is the orientation document. **`CLAUDE.md` is the law** — it holds the
decisions the project owner has already made and does not want re-litigated.
Read it first and treat anything in it as settled. This file explains what the
app *is*, what is built, how it is put together, and where the traps are.

---

## 1. What this is

**MyPromo** is a study app for medical students at UNEM (Université de
Nouakchott, Mauritania). One phone column. Built by and for the students of
one faculty, starting with **PCEM2**, and intended to become commercial —
which is why the licence of every asset matters (§8).

The people using it are francophone medical students whose interface language
is Arabic. That gives the single most important rule in the project:

> **The interface is Arabic (RTL). Every piece of study content is French.**

Menus, buttons, screen names, labels, toasts: Arabic. Lecture titles, module
names, chapter names, MCQs, flashcards, explanations, anatomical structures:
French, always. **Never write a medical or anatomical term in Arabic** —
students do not know them in Arabic and never will. `S1` and `S2` are never
translated. Anything a student types carries `dir="auto"`, everywhere it is
written and everywhere it is shown, or French sentences end up with their full
stop on the wrong side.

---

## 2. Stack and shape

| | |
|---|---|
| Framework | Next.js 15 (App Router), React 19, JavaScript — **no TypeScript** |
| Rendering | Server components by default; `export const dynamic = 'force-dynamic'` on anything that reads the database |
| Data | Supabase (Postgres + Auth + Storage), row-level security everywhere |
| 3D | three.js 0.180 |
| PDF | pdf.js 6.3, loaded only through `lib/pdfjs.js` |
| OCR | tesseract.js (French traineddata vendored) |
| Styling | One hand-written stylesheet, `app/globals.css`, tokens on `:root`. No Tailwind, no CSS-in-JS, no component library |
| Font | IBM Plex Sans Arabic via `next/font/google`, self-hosted at build |
| Hosting | Vercel |

There is no test framework. Verification is done by **running the app** (§10).

### Directory map

```
app/                 routes (App Router)
  admin/             the staff panel — its own door, its own sign-in
  api/               route handlers
  anatomie/          the 3D anatomy reader (promo → semester → region)
  archive/ notes/ quiz/ review/ qa/ rooms/ chat/ duel/ points/ …
components/          Model3D, PdfViewer, QuickView, Post, Sheet, Icon, BottomNav…
lib/
  anatomy/           bundles, curriculum, landmarks, parts, notes, tissue, search
  qcm/ questions/    MCQ parsing, banks
  modules/           the old hand-written catalogue — history, read once by the migration
  supabase/          server.js, browser.js, admin.js
  catalogue.js       ← every student screen reads the catalogue through this
  storage.js  points.js  review.js  duel.js  notify.js  lectures.js  …
public/anatomy/      50 files: carved geometry (.bin) + manifests (.json) + landmark points
scripts/             carve-anatomy, place-landmarks, check-*, mock-supabase, build-search
supabase/            schema.sql, social.sql, catch-up.sql, fold-subjects.sql
```

---

## 3. Visual identity

The design direction is called **Cards**: white cards on a grey field, soft
shadows, generous spacing. Light theme only — dark mode is deliberately not
designed yet.

### Tokens (`app/globals.css`, `:root`)

```
--purple:       #6B21B5    the brand; the only coloured surface is الرئيسية's head
--purple-light: #8B5CF6
--purple-pale:  #EDE9FE
--orange:       #F97316    attention only, never decoration
--orange-light: #FDBA74
--orange-pale:  #FFF1E3
--bg:           #F1F5F9    the field
--surface:      #FFFFFF    every card
--ink:          #1A1424    --ink-2: #453D57    --ink-3: #6B6480
--line:         #E8E4F0    --line-soft: #F1EEF7
--shadow:       0 1px 2px rgba(26,20,36,.04), 0 4px 16px rgba(26,20,36,.06)
--r-card: 17px   --r-tile: 14px   --nav-h: 76px
--app-w: 430px   --sheet-w: 430px   --doc-w: 1100px
```

### Rules

- **Typeface: IBM Plex Sans Arabic**, chosen over the Cairo on the identity
  sheet (the sheet is out of date on this one point). Served from our own
  domain through `next/font` — a `<link>` to fonts.googleapis.com is
  render-blocking and was most of why the app took seconds to appear on mobile
  data. Never put a third-party stylesheet request back.
- **One icon set** (Lucide paths, stroke 2), **one radius, one shadow**.
- **Touch targets never below 44px.** Tap highlight and the 300ms delay are
  both turned off in `globals.css`, which means every pressable thing needs an
  `:active` state of its own or it feels dead.
- The app is a fixed-width phone column; four fixed elements read `--app-w`
  so a tablet widens all of them at once.
- **Subject banners are used whole** — logo, name and drawing together, never
  cropped, and **never print the name over or under one**: the banner already
  says it. They scroll sideways one at a time with the next one peeking. A
  subject with no banner falls back to its French name on a tinted block.
- **Never print a count under a subject banner** — that would be describing
  study material in Arabic.

### The shape of the app

- **Community first.** `الرئيسية` (`/feed`) is a feed, not a comment list:
  posts carry media, have weight, have a real action bar.
- **الرئيسية is a violet head over white cards.** The head is the only
  coloured surface; the first card is pulled up into its lower edge. It
  carries who you are, the bell, and the tools.
- Sign-in is the front door: opening the site lands on `/login`.
- **Bottom nav holds four**: الرئيسية / الملخصات / الأرشيف / المحادثات.
  المحادثات is there because it is the only one that can be *waiting* for you,
  so the unread count is where it is seen. الملف gave up its slot and is
  reached by tapping your picture in الرئيسية's head.
- **The `+` in the bar is an action, not a destination.** On الرئيسية it puts
  the cursor in the composer; on الملخصات it opens the upload; anywhere else
  it goes to the composer.
- **الرئيسية carries every feature that has no other door** — live ones in
  colour, the rest dashed and marked `قريبًا`. Live: اختبر نفسك, سؤال وجواب,
  غرف الدراسة, النقاط, تحدّي زميلك. **Nothing may lead where something on the
  same screen already leads.** المحاضرات, نماذج 3D, المحادثات, المراجعة and
  جدول الحصص have all been removed from it for exactly that reason.
- **اليوم says something in every state** — a due count, an all-clear, or an
  invitation — so the screen never changes shape. It is the only way into
  المراجعة.
- The bottom bar is hidden on a file and on `/anatomie/*`.

---

## 4. Accounts, approval and the two doors

- **Sign-up takes an email, a password and a year. No confirmation email** —
  Supabase's built-in mailer sends about two an hour and cost an evening. The
  magic link still exists as an option, it is just not the only door.
- **Approval is the gate, not the inbox.** A new profile is `pending`; every
  policy is written against `is_approved()`. A new account reads nothing until
  somebody approves it in `اللوحة ← الأعضاء`.
- **An unapproved account sees exactly one screen: `/waiting`**, enforced in
  `middleware.js` — in one place, because the screen somebody adds next month
  is the one that would forget it. RLS alone produced an app that looked
  normal and failed one button at a time.
- The student picks their own promo at sign-up; an admin fixes it if wrong.
- **The app and the panel are separate pages with separate sign-ins.** The
  app's front door lands everybody in the app, staff included. The panel is
  reached by typing `/admin` and signing in there with a staff email
  (`ADMIN_EMAILS`). **Nothing in the student app links to the panel.**
- A magic link asked for at the panel door comes back to the panel.
- **A staff email with no profile row gets one** — `syncStaffRole` creates it.
  It used to UPDATE zero rows and hand back a patched object, so the panel let
  someone in on a role that existed only in memory and every count read zero.
- Being turned away says who you are and why; a silent bounce once read as
  "there is no admin page".
- Six promos to begin with — PCEM1, PCEM2, DCEM1, DCEM2, DCEM3, DCEM4 — each
  with its own badge colour, shown on every post. **Six was a fact, not a
  rule: the panel can add a year.** Only PCEM2 has real content so far.

---

## 5. Where things are kept

- **Content lives in Postgres**, not in `lib/data.js`. The files under
  `lib/modules/` are history that the migration reads once.
- **Every student screen reads the catalogue through `lib/catalogue.js`**,
  which reads Postgres and returns the shape `lib/data.js` used to. Nothing
  student-facing imports `MODULES` any more. That file is why a subject added
  in the panel never appeared in the app.
- The file is still the **fallback, per subject**, so a half-finished
  migration cannot blank the archive.
- **Read narrowly**: `subjectsOf` for a list of names, `notesOf` for
  الملخصات, the whole catalogue only where the whole catalogue is shown.
  PCEM2 is 906 documents.
- **A year is ready when it has subjects**, not when somebody ticks `indexed`.
- Uploads go to **Supabase Storage**, not R2. R2 is paid for but has no bucket
  name or public URL configured, and a half-configured store fails at the
  moment a student is holding a photograph. `lib/storage.js` is the only file
  that knows; moving to R2 later is one file.
- **People in the same promo can read each other's profile row** — they have
  to, every screen names an author. The row carries an email, so the app only
  ever prints the name (or the part before the `@`). Hiding the column
  properly needs a view or column grants and both break `select *`.
- **Never use `ON CONFLICT` / `upsert` against this schema.** Postgres infers
  a conflict target only from a unique CONSTRAINT and several of ours are
  partial indexes. Look first, then insert what is missing.

### Tables (`supabase/schema.sql`, `supabase/social.sql`)

`profiles`, `promos`, `modules`, `chapters`, `documents`, `question_banks`,
`questions`, `import_jobs`, `reports`, `audit_log`, `posts`, `post_media`,
`comments`, `likes`, `saves`, `rooms`, `room_members`, `room_messages`,
`reviews`, `notifications`, `chats`, `chat_messages`, `duels`.

### Environment

`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAILS`, `GOOGLE_API_KEY`,
`GEMINI_API_KEY` (+ `GEMINI_MODEL`, `*_API_BASE`, `*_DEADLINE_MS` for tests),
`R2_*` (configured but unused), `ARCHIVE_SOURCE_BASE` (a fake Drive, for
driving the cache end to end; never set in production).

> **Outstanding chore:** a Google API key was once pasted into a chat. It
> should be rotated in Vercel.

---

## 6. The Drive, and opening a file

- The `UNEM-PCEM2` folder is **owned by somebody else**
  (`gahethmane@gmail.com`) and shared read-only. **Never rename, move or
  modify anything in it.** Files are shared `anyone with the link`, so a
  server may fetch them. Clean display names live in `lib/data.js` and point
  at untouched originals.
- **Files open inside MyPromo**, never by handing the student to the Drive app.
- **Drive is asked once per file, ever — not once per open.** The first
  student to open a lecture gets it relayed; the file is then kept in our own
  `archive` bucket and everybody after is redirected to the CDN
  (`app/api/file/[fid]`, `lib/archive-cache.js`). A copy is not a
  modification. Files over 60 MB are not kept.
- **Never promise `Accept-Ranges` we do not have.** pdf.js asks in 256 KB
  pieces and believes the header; if the upstream ignores Range, every piece
  comes back as the whole file.
- **Two ways to read**: `العرض السريع` is Google's own preview in a frame on
  our screen (Google rasterises, so a 40 MB scan starts at once) — the default
  above 8 MB; **our renderer** for the rest. The choice is remembered per
  device and the fallback is one tap. Either way the student stays on our
  screen: the rule was never "no iframe", it was never handing them to Drive.

### The file viewer — the expensive lessons

- **pdf.js is loaded through `lib/pdfjs.js`, never imported directly.** 6.3
  calls `Map.prototype.getOrInsertComputed`, which no browser ships; without
  the polyfill the document loads, the page count appears, and every page
  throws silently — on screen, a viewer that spins for ever. That cost a day.
- The worker runs in its own realm and needs the polyfill too;
  `scripts/copy-pdfjs.mjs` prepends it to the copied worker.
- `standardFontDataUrl` and `cMapUrl` must both be served from our origin.
- **Rendered pages are bitmaps and must be freed** — keeping every page drawn
  crashed Safari on long lectures. Only a window around the viewport is kept.
- Never measure every page before drawing: page one is measured and drawn, and
  its shape sizes the placeholders for the rest.

---

## 7. النقاط and الإشعارات

- Points are **computed, never stored** (`lib/points.js`). Every total is read
  back from what already happened, so no number can drift.
- **Reading earns nothing.** A point is paid for something another student can
  use: a résumé (6), an accepted answer (10), an answer (2), a post (2), a
  question (1), a like on your post (1), a question mastered (1).
- Badges state their own condition. A locked badge with a hidden condition is
  a taunt, not a goal.
- A notification is **written when the thing happens** (`lib/notify.js`), not
  worked out later from "what is new since I last looked".
- **Nobody is ever notified about their own doing.**
- Opening the screen marks them read; there is no button.
- Writing a notification may fail without the thing itself failing.

---

## 8. The anatomy system — the largest part of the app

### Sources and licences

- **BodyParts3D**, as the Database Center for Life Science ships it —
  **CC BY 4.0**. Has no muscles of mastication and no muscles of the face.
- **Z-Anatomy** — BodyParts3D with structures added by a medical illustrator:
  every facial muscle, the twelve cranial nerves, the lungs, 289 ligaments,
  the intervertebral discs. **CC BY-SA 4.0**: commercial use fine,
  share-alike applies.
- **The credit line is per model** and `check:anatomy` refuses a Z-Anatomy
  model whose credit does not say CC BY-SA. The credit is printed on the
  screen the model is drawn on.
- **Never take a NonCommercial source.** Some AnatomyTOOL collections are
  CC BY-NC-SA. The app is going to be commercial — a licence, not a judgement
  call.
- The CC BY-SA 2.1 Japan line inside old BodyParts3D files is superseded by
  the database's current licence.

### Reading Z-Anatomy

`scripts/read-fbx.mjs` and `scripts/fbx-meshes.mjs` parse the binary FBX
without Blender and without a 3D engine. Two things that file will not tell
you unless you ask:

1. A geometry is drawn around its own origin; where it really sits is on the
   `Model` above it, so the transforms must be walked or the masseter and the
   temporalis end up inside one another.
2. It is in **centimetres** where everything else here is metres.

**Z-Anatomy ships only the left of each pair** — the right is a mirror
modifier the export did not bake, so it is made at carve time by flipping `x`
*and reversing the winding*, or the whole side is lit from inside.

The two sources are the same body about a centimetre apart in `z`. Close
enough to mix one day; **no model draws from both yet.**

### The single most important architectural fact

> **All 21 bundles are carved in ONE world coordinate frame** — a standing
> body, metres, `y` = height off the floor. Composing bundles into a scene
> needs no transform whatsoever.

That is what makes the region screens possible: a region names the bundles its
scene is made of and they arrive already sitting on each other.

### The files

| file | what it holds |
|---|---|
| `lib/anatomy/bundles.js` | the catalogue — **21 bundles**, 538 named structures, every one named in French by hand; `families`, `tissue`, `frame`, `facing`, `source`, `credit`; `boneOf()`, `familyOf()` |
| `lib/anatomy/curriculum.js` | **33 regions** across PCEM1 S1/S2 and PCEM2 S1/S2 — `{id, title, subtitle, bundles, lead, frame, takes}` |
| `lib/anatomy/landmarks.js` | **319 landmarks** written as *rules*, not coordinates (crâne 130, thorax 38, membre-sup 37, membre-inf 33, rachis 22, colonne 20, pied 20, main 19) |
| `lib/anatomy/parts.js` | the division of 28 bones into their named parts, by anchor + `pull` |
| `lib/anatomy/notes.js` | **716 descriptions**, written not scraped |
| `lib/anatomy/tissue.js` | the plate convention (§ colour below) |
| `lib/anatomy/scene.js` | multi-bundle loading: `loadScene`, `boundsOf`, `frameOf`, `keyOf` |
| `lib/anatomy/search.js` + `search-index.js` | 818 names, index built at build time |
| `public/anatomy/*` | 35 MB of carved geometry and manifests, committed |

Scripts: `carve-anatomy.mjs` (cuts a bundle out of a checkout of the atlas —
the result is committed, so nobody needs the atlas to build the app),
`carve-zanatomy.mjs`, `divide-bone.mjs`, `place-landmarks.mjs` (turns the
rules into points), `build-search.mjs`, and `npm run check:anatomy`, which
reads the files the way the browser reads them — a wrong offset does not
throw, it draws a cloud of triangles.

### The rules the models obey

- **A model belongs to the lecture it explains.** It opens from the subject
  and nowhere else. That is why نماذج 3D came off الرئيسية.
- **A model is a named handful of structures, never the whole atlas.** The
  complete body is 33 MB; the skull is 1.3 MB — less than the lecture it goes
  with. A student opening the skull pays for the skull.
- **Every structure is named in French, by hand.** Listing them one by one is
  also what keeps a bundle honest: a region cut by coordinates quietly
  includes whatever else sat in the box — their `skull` holds the corneas.
- **Nothing is ever made see-through.** Ghosting the rest of the skull to
  point at one bone is an X-ray of twenty-two overlapping bones, which is a
  picture of none of them. The bone you touched takes its colour; the others
  stay bone. Levels are **CONTEXT / FOCUS / ISOLATE** — they take structures
  *off the screen*, they never fade them.
- **Muscles are coloured by the group they are taught in**, not one colour
  each; a bundle that names no `families`, like the skull, is one colour per
  structure. **One colour per bone, not per mesh** — the left and right
  parietal are the same bone.
- **A muscle is read differently from a bone**: Origine, Insertion,
  Innervation, Action, Rapports.
- **A model may start with something taken off** — the platysma is a sheet
  over the whole neck; it is in the list, marked off, one tap back.
- **A bone shown by itself re-aims the camera at it** (half the skull is
  buried); **a bone can be taken off to see behind it**.
- **A foramen and a process are labelled points, not pieces.** BodyParts3D is
  one mesh per whole bone. The shapes are all there at full detail, so a
  landmark is a point on the surface with a name over it, the way a printed
  plate does it.
- **A landmark is written as a rule** (`dir`, optional `band`/`box` as
  fractions of the bone's own bounding box, `hole: axis`, or `at:`), so
  re-cutting the geometry moves the labels with the bone.
- **The foramina are named outright, not found** — a 2 mm scan simplified for
  the browser closed every opening but the largest. The placer prints how far
  the bone was from where the rule asked; past a few millimetres is a guess.
- **Ask for a foramen on the face it opens through** — the ovale asked for at
  mid-height of the greater wing snapped to the endocranial surface and faced
  away from the only place you look for it.
- **What runs through an orifice is the reason it is named** — every one
  carries its contents.
- **Choosing a landmark turns the model to face it.**
- **The names are off until asked for. A landmark is a dot, and only the one
  you choose is named** — thirty names at once is somebody else's diagram.
- **A name goes in a column down the side with a line to the place it names.**
- **Choosing a bone narrows the points to that bone.**
- **A bone is divided into its parts, and colour means the same thing at both
  levels.** The division is approximate and says so; a part has an anchor and
  a `pull` (reach), because territory is decided by the gap between anchors,
  not the size of the thing. Anchors are measured **inside the bone's own
  box**, not in metres.
- **Touching a divided bone names the bone first and the part under it.**
  Which part was touched comes from the renderer (`hit.face.materialIndex`);
  working it out from the face number named the wrong part.
- **A model without descriptions is a picture.** `check:anatomy` fails on a
  structure with no note. The sections are fixed and the check refuses one the
  screen cannot draw.

### The plate convention (`lib/anatomy/tissue.js`)

Bone `#E8E1D2` (with a procedural grain normal map, roughness .86),
cartilage `#D6DEE4`, disc `#C9CFC2`, muscle `#A83236`, tendon/aponeurosis
`#EDE7DA`, nerve `#E3C244`, artery `#C0392B`, vein `#2E6DA8`, sinus `#1E3F66`,
brain `#C9B5B0`, grey matter `#9E8C93`, CSF `#7FB8D8`, lung `#D6A9A2`, heart
`#9E3B3B`, liver `#8C5A3C`, gut `#C9A06B`, gland `#B5757E`, kidney `#9B4B4B`,
urine `#D8C98A`, gonad `#C08A8A`, erectile `#B05C6B`. Tissue is decided by
name pattern first, then the family's tissue, then the bundle's, then bone.

### Which region belongs to which semester

The order the models were built in, because it is the order they are taught.

- **PCEM1 S1** — appareil locomoteur: membre supérieur, membre inférieur, the
  hand and the foot above all.
- **PCEM1 S2** — thorax et abdomen.
- **PCEM2 S1** — tête et cou, and neuroanatomie.
- **PCEM2 S2** — appareil urinaire and région uro-génitale.

### What is genuinely missing, and is not faked

- **Female anatomy.** Both sources are a male reference body. The uro-genital
  model says so on its face.
- **The ileum, the caecum and the rectum** are not separate meshes in
  Z-Anatomy. The descriptions name what is absent rather than relabelling a
  neighbour.
- **The lateral sulcus** is a fissure, not a surface, so there is no mesh.
- **The superior thyroid, lingual and posterior auricular arteries** are not
  in the cardiovascular file; they are named in the external carotid's
  description, because the six branches are the answer to the question.

---

## 9. The anatomy reader as it stands (newest work)

Route: `/anatomie/[promo]/[semestre]` → `/anatomie/[promo]/[semestre]/[region]`.
A subject in the archive now offers **the regions of the body it covers**
rather than the carved files behind them.

`components/Model3D.js` (≈950 lines) takes
`{id, title, hidden, facing, credit, layers, lead, frame, takes, pick, point}`:

- `layers` — every bundle drawn; `lead` — whose list opens first; `frame` —
  the box the camera opens on; `takes` — which of a bundle's groups this
  region uses (« Bras » wants the two compartments of the arm, not the whole
  shoulder girdle that lives in the same file).
- Three levels, **CONTEXT / FOCUS / ISOLATE**. FOCUS keeps the bones of the
  region (the lead bundle) plus the group the picked structure is taught in,
  so nothing is ever alone.
- A tap is a tap and a drag is a drag; tapping the background puts everything
  back.

**Search** (`lib/anatomy/search.js`, `components/AnatomySearch.js`): 818 names
— 455 structures, 101 named parts, 262 landmarks. The index is built by
`scripts/build-search.mjs` from the *carved* files, because where a hit opens
has to be decided from the coordinate the thing actually sits at: the smallest
region whose `frame` contains it, preferring the region that **leads** with
that bundle. Worked out in the browser from the list of bundles instead, it
sent le tubercule de Gerdy to *la hanche* and le foramen ovale to *les nerfs
crâniens* rather than *la base du crâne*. 13.5 KB gzipped, shipped with the
page, so answers appear as the letters are typed.

A hit opens `?pick=` (structure or part) or `?point=` (landmark) and **lands
at FOCUS**, because in CONTEXT the humerus is two green slivers between the
biceps and the triceps. A landmark also holds the bone it sits on (which
narrows the dots to it); a named part turns the coloured plate on, because a
bone's parts tell themselves apart nowhere else.

### Still open on the reader

- Bone learning mode as tabs — Overview / Reliefs / Articulations / Insertions
  / Orifices / Orientation.
- Landmark hierarchy (important vs all) and label modes.
- Exam / study mode.
- A part hidden behind a neighbouring bone (the acetabulum behind the femoral
  head) is named but not visible until the student turns the model.
- Four skull foramina still slip 7–11 mm (supra-orbital, infra-orbital,
  pterygoid and carotid canals) — now fixable as boxed rules.
- The aesthetics pass the owner deferred: "after all is done we will work on
  aesthetic".

---

## 10. Working method — how the owner wants this done

These are not suggestions.

1. **Show pictures before HTML.** Screenshots of the running app, not file
   dumps.
2. **Small steps. Stop and show after each one.**
3. **Ask before deciding when there is more than one reasonable option.**
4. **Run it before sending it.** `npm run mock` stands up a Supabase in memory
   and the app can then be driven in a browser with Playwright.
   *Compiling is not testing* — "the button does nothing" only ever shows up
   when you click it.
5. **Run the SQL too.** `npm run check:sql` applies both migrations to a real
   Postgres, twice, then checks the policies by asking them as four different
   people. The mock has no RLS, so until this existed the policies had never
   once been run.

### Driving the app locally

```bash
npm run mock &                                   # in-memory Supabase on :54321
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321 \
NEXT_PUBLIC_SUPABASE_ANON_KEY=mock npx next dev
# then Playwright, chromium at /opt/pw-browsers/…
# sign in: owner@unem.mr / any password, via "ادخل بكلمة السر"
# MOCK_DELAY=2500 npm run mock   ← to actually see a loading skeleton
```

### Checks

`check:anatomy`, `check:sql`, `check:queries`, `check:lectures`,
`check:paste`, `check:paste-json`, `check:matricule`, `check:duel`,
`build:search`.

### Traps that have cost real time

- **Never run `npx next build` while `next dev` is running** — it corrupts
  `.next`, and the symptoms are 404 chunks, `/icon.svg` returning 500, and a
  password field that never appears. Kill dev, `rm -rf .next`, restart, wait
  for `/icon.svg` to answer 200.
- `PUT_ORDER` is not a valid Next.js export; a second verb needs its own
  route file.
- A local named `frame` shadowed the new `frame` prop in `Model3D` and every
  region was framed on everything. Found by looking at a screenshot, not by
  compiling.
- `boneOf` strips a trailing `gauche`/`droit` — which is wrong for « Sinus
  droit », the heart chambers and the lung lobes. They are in a `WHOLE` set.

---

## 11. Still to build

Q&A, discussion and chat exist but are thin; study rooms, per-subject icons,
badges students earn. `supabase/social.sql` still needs pasting for duels.

The MCQ pipeline is the live one: the owner and friends generate MCQs with
Google Colab + Gemini against their own Drive — roughly **6000 questions** so
far. They arrive in the panel unclassified, and `اللوحة ← المحتوى` now lets a
staff member order a subject's lectures (arrows, sort by name) and derive
lecture numbers so the classify tool has something to point at.

---

*Last verified against the running app on 2026-09-16. When a rule here and a
rule in `CLAUDE.md` disagree, `CLAUDE.md` wins.*
