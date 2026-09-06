# MyPromo — decisions that must not be re-litigated

Rules established by the project owner. Follow them; do not re-derive them.

## Course content

- **Vessels always come before lymphatics.** In ANATOMIE both
  `Les vaisseaux tête et cou` and `Lymphatiques tête–cou` are numbered `-5-`
  in Drive. Vessels are 5, lymphatics 5b. This is a fact about the course,
  not a guess — never reorder them and never flag it as unresolved again.

- **Lectures belong to a chapter and are numbered straight through the module.**
  Files Drive leaves unnumbered continue from where the numbered ones stop —
  ANATOMIE runs 1–10 for الرأس والعنق, then 11–18 for التشريح العصبي. Never
  show a lecture with a dash instead of a number.

## Language

The split is absolute: **the interface is Arabic, every piece of study content
is French.** Students never study in Arabic and do not know the anatomical
terms in Arabic — French is a necessity, not a preference.

- Interface chrome — menus, buttons, screen names, labels — is Arabic, RTL.
- **All study content is French.** Lecture titles, chapter names where they
  name material, MCQs, flashcards, answer explanations, notes. Always.
- **`S1` and `S2` are never translated.** That is what students say.
- Module and lecture names stay in French, exactly as they appear in Drive.
- Never write a medical or anatomical term in Arabic. Nobody uses them.

## The Drive

- The `UNEM-PCEM2` folder is **owned by someone else** (`gahethmane@gmail.com`)
  and shared read-only. **Never rename, move or modify anything in it.**
- Files are shared `anyone with the link` — a server may fetch them.
- Clean display names live in `lib/data.js` and point at untouched originals.

## Subject pictures

- A subject's banner is **used whole** — logo, name and drawing together. Never
  cropped to a tile, and **never print the name over or under it**: the banner
  already says it.
- Banners scroll sideways, one at a time, the next one peeking so a thumb
  knows there is more.
- A subject with no banner yet falls back to its French name on a tinted
  block, never a broken image.

## Design

- Cards direction: white cards on grey, soft shadows, generous spacing.
- Typeface is **IBM Plex Sans Arabic**, chosen over the Cairo named on the
  identity sheet. The sheet is out of date on this one point.
- One icon set (Lucide paths, stroke 2), one radius, one shadow.
- Orange is spent only where something needs attention — not decoration.
- Light theme only. Dark mode is deliberately not designed yet.
- Touch targets are never below 44px.

## Accounts

- **Sign-up takes an email, a password and a year — no confirmation email.**
  Supabase's built-in mailer sends about two an hour; it cost us an evening.
  The magic link stays as an option, it is just not the only door.
- **Approval is the gate, not the inbox.** A new profile is `pending` and
  every policy is written against `is_approved()`, so a new account reads
  nothing until somebody approves it in اللوحة ← الأعضاء.
- The student picks their own promo at sign-up. An admin changes it if wrong.
- **An unapproved account sees one screen: `/waiting`.** Enforced in the
  middleware, in one place, because the screen somebody adds next month is
  the one that would forget it. Row-level security alone produced an app that
  looked normal and failed one button at a time — an empty feed and a
  composer that took a photograph and then refused to post it.

## Shape of the app

- **Community first.** الرئيسية is a feed, not a comment list: posts carry
  media, have weight, and have a real action bar.
- Sign-in is the front door — opening the site lands on `/login`.
- Nav holds four: الرئيسية / الملخصات / الأرشيف / الملف.
- **الرئيسية carries a rail of every feature**, live ones in colour and the
  rest dashed and marked قريبًا — a student should see the whole app on day
  one. **No tile may lead where the nav already leads**: two buttons to one
  page is the thing to avoid, not an extra route.
- **Never print a count under a subject banner.** The banner names the
  subject; anything else is describing study material, and describing it in
  Arabic breaks the language rule.
- **Files open inside MyPromo**, never by handing the student to the Drive app.
- Six promos to begin with: PCEM1, PCEM2, DCEM1, DCEM2, DCEM3, DCEM4. Each has
  its own badge colour, shown on every post. **Six was a fact, not a rule —
  the panel can add a year.** Only PCEM2 has content so far.

## النقاط

- Points are **computed, never stored**. Every total is read back from what
  already happened — posts, likes, answers, accepted answers, the review
  schedule — so no number can drift from the thing it counts and there is no
  table to keep in step.
- **Reading earns nothing.** A point is paid for something another student can
  use: a résumé, an answer, an accepted answer. A counter that rewards opening
  the app rewards the wrong thing.
- Badges state their own condition. A locked badge with a hidden condition is
  a taunt, not a goal.

## الإشعارات

- A notification is **written when the thing happens**, not worked out later
  by asking "what is new since I last looked" — that query gets slower every
  week and cannot tell you what you have already read.
- **Nobody is ever notified about their own doing.** Liking your own post
  tells you nothing you did not just do.
- Opening the screen marks them read. There is no button for that.
- Writing a notification can fail without the thing itself failing: the like
  matters, being told about it does not.

## Direction

- **What a student types picks its own direction** (`dir="auto"`), everywhere
  it is written and everywhere it is shown. Study content is French inside an
  Arabic RTL interface, so without it every French sentence ends up with its
  full stop on the wrong side.

## The + in the bar

- It is an **action, not a destination**. On الرئيسية it puts the cursor in
  the composer, on الملخصات it opens the upload — both already on the screen,
  never a second way to do the same thing. From anywhere else it goes to the
  composer.
- It was a `<div>` for a while: the biggest, brightest thing on the screen,
  doing nothing at all.

## The file viewer

- pdf.js needs `standardFontDataUrl` and `cMapUrl`, both served from our own
  origin. Without the first, standard fonts are substituted and the letter
  spacing collapses.
- **Rendered pages are bitmaps and must be freed.** Keeping every page drawn
  is what crashed Safari on long lectures. Only a window around the viewport
  is ever retained.
- Never measure every page before drawing. Page one is measured, drawn, and
  its shape sizes the placeholders for the rest.

## Still to build

Q&A, discussion, chat, study rooms, per-subject icons, badges students earn.
3D anatomical models are possible with open assets (Z-Anatomy, BodyParts3D)
but heavy on mobile data — a later thing.

## Where things are kept

- Content lives in **Postgres**, not in `lib/data.js`. The files under
  `lib/modules/` are history the migration reads once.
- What students upload goes to **Supabase Storage**, not R2. R2 is paid for
  but has no bucket name or public URL set, and a half-configured store fails
  at the moment a student is holding a photograph. `lib/storage.js` is the
  only file that knows — moving to R2 later is one file.
- **People in the same promo can read each other's profile row.** They have to
  — every screen names the author of something, and without it they all come
  back blank. The row carries an email, so the app only ever prints the name,
  or the part of the address before the @ when there is no name. Hiding the
  column properly needs a view or column grants; both break `select *`.
- **Never use `ON CONFLICT`/`upsert` against this schema.** Postgres infers a
  conflict target only from a unique CONSTRAINT, and several of ours are
  partial indexes. Look first, then insert what is missing.

## Working method

- Show pictures before HTML. Screenshots of the running app, not file dumps.
- Small steps. Stop and show after each one.
- Ask before deciding when there is more than one reasonable option.
- **Run it before sending it.** `npm run mock` stands up a Supabase in memory
  and the app can then be driven in a browser. Compiling is not testing:
  "the button does nothing" only ever shows up when you click it.
