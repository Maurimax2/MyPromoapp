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
- **The font is served from our own domain**, through `next/font`. It was a
  `<link>` to fonts.googleapis.com, and a browser will not paint a page until
  a stylesheet answers — which on mobile data is most of why a screen took
  seconds to appear. Never put a render-blocking third-party request back.
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

## Two doors

- **The app and the panel are separate pages with separate sign-ins.** The
  app's front door lands everybody in the app — staff included. The panel is
  reached by going to `/admin` and signing in there with a staff email.
- **Nothing in the student app links to the panel.** Not a card on الملف, not
  a redirect after sign-in. It is reached by typing the address.
- A magic link asked for at the panel door comes back to the panel; one asked
  for at the app's door comes back to the app.
- **A staff email with no profile row gets one.** Somebody can hold an account
  in `auth.users` and no profile — made in Supabase's dashboard, or a sign-up
  that fell over. `syncStaffRole` used to answer that with an UPDATE matching
  zero rows, no error, and a patched object: the panel let them in on a role
  that existed only in memory while the database had never heard of them, so
  every count came back zero. It creates the row now.
- Being turned away still says who you are and why — that message exists
  because a real staff account was once filed as a student and a silent
  bounce read as "there is no admin page".

## Shape of the app

- **Community first.** الرئيسية is a feed, not a comment list: posts carry
  media, have weight, and have a real action bar.
- Sign-in is the front door — opening the site lands on `/login`.
- Nav holds four: الرئيسية / الملخصات / الأرشيف / المحادثات. الملف used to
  hold the fourth slot and gave it up: it is reached by the picture of you in
  الرئيسية's head, which is the same one tap, and المحادثات is the only one of
  the four that can be waiting for you — so the count is where it is seen.
- **الرئيسية is a violet head over white cards.** The head is the only
  coloured surface in the app; the first card is pulled up into its lower edge.
  It carries who you are, the notifications bell, and the tools.
- **الرئيسية carries every feature that has no other door**, live ones in
  colour and the rest dashed and marked قريبًا — a student should see the whole
  app on day one, and five fit in one row without a swipe. **Nothing may lead
  where something on the same screen already leads**: two buttons to one page
  is the thing to avoid, not an extra route. What this has already cost:
  المحاضرات (a lecture opens from its subject), نماذج 3D (a model belongs to
  the subject it explains), المحادثات (a tab in the bar), المراجعة and
  جدول الحصص (both the اليوم card).
- **اليوم says something in every state** — a due count, a calm all-clear, or
  an invitation to start — so the screen does not change shape depending on how
  much a student has answered. It is the only way into المراجعة.
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

## Opening a file

- **Drive is asked once per file, ever — not once per open.** The first
  student to open a lecture gets it relayed; the file is then kept in our own
  `archive` bucket and everybody after is redirected straight to the CDN.
- **A copy is not a modification.** The Drive stays read-only and untouched;
  this is a copy of a file already shared with every student by link.
- Files over 60 MB are not kept — a 141 MB atlas would cost more in storage
  than it saves. Those keep going to Drive.
- **Never promise `Accept-Ranges` we do not have.** pdf.js asks in 256 KB
  pieces and believes the header; if the upstream ignores Range, every piece
  comes back as the whole file.

## Two ways to read a file

- **العرض السريع** is Google's own preview in a frame on our screen: Google
  draws the pages and sends pictures, so a 40 MB scan starts at once instead
  of arriving whole. Default for anything over 8 MB.
- **Our renderer** for the rest — better typography, our fonts, our page
  handling — and it must fetch the whole document first.
- Either way the student stays on our screen. The rule was never "no iframe",
  it was never handing them to the Drive app.
- The choice is remembered per device, and if Google refuses to be framed the
  fallback is one tap.
- **The bottom bar is hidden on a file.** It used to cover the last inch of
  every lecture, and the control for switching.

## The file viewer

- **pdf.js is loaded through `lib/pdfjs.js`, never imported directly.** 6.3
  calls `Map.prototype.getOrInsertComputed`, a proposal no browser ships yet;
  without the polyfill the document loads, the page count appears, and every
  page throws and is never drawn — which on screen is a viewer that spins for
  ever, indistinguishable from a slow network. It cost most of a day looking
  at Drive, at byte ranges, at caching, at everything except the browser
  console.
- The worker runs in its own realm and needs the polyfill too;
  `scripts/copy-pdfjs.mjs` prepends it to the copied worker.
- pdf.js needs `standardFontDataUrl` and `cMapUrl`, both served from our own
  origin. Without the first, standard fonts are substituted and the letter
  spacing collapses.
- **Rendered pages are bitmaps and must be freed.** Keeping every page drawn
  is what crashed Safari on long lectures. Only a window around the viewport
  is ever retained.
- Never measure every page before drawing. Page one is measured, drawn, and
  its shape sizes the placeholders for the rest.

## The models

- Geometry is **BodyParts3D, CC BY 4.0** — attribution, no share-alike. The
  CC BY-SA 2.1 Japan line inside the old source files is superseded by the
  database's own current licence, which permits redistribution and adaptation.
  The credit is printed on the screen the model is drawn on, not filed away
  in a settings page.
- **There are two sources, and each model says which.** BodyParts3D as the
  Database Center ships it, **CC BY 4.0**, has no muscles of mastication and no
  muscles of the face at all. **Z-Anatomy**, which is BodyParts3D with
  structures added by a medical illustrator, has every one of them — and the
  twelve cranial nerves, the lungs, 289 ligaments and the intervertebral discs.
  It is **CC BY-SA 4.0**: commercial use is fine, share-alike is not. **The
  credit line is per model** and `check:anatomy` refuses a Z-Anatomy model
  whose credit does not say CC BY-SA.
- **Never take a NonCommercial source.** Some of the AnatomyTOOL collections
  are CC BY-NC-SA. The app is going to be commercial, so those are out — not a
  judgement call, a licence.
- **Z-Anatomy is read straight out of its FBX.** `scripts/read-fbx.mjs` and
  `scripts/fbx-meshes.mjs` do it without Blender and without a 3D engine. Two
  things that file will not tell you unless you ask: a geometry is drawn around
  its own origin and where it really sits is on the Model above it, so the
  transforms have to be walked or the masseter and the temporal end up inside
  one another; and it is in centimetres where everything else here is metres.
- **Z-Anatomy ships only the left of each pair.** The right is a mirror
  modifier the FBX export did not bake, so it is made at carve time by flipping
  x — and reversing the winding, or the whole side is lit from inside.
- The two sources are the same body about a centimetre apart in z. Close
  enough to mix one day; not mixed yet, so no model draws from both.
- **A model belongs to the lecture it explains.** It opens from the subject
  and nowhere else. That is why نماذج 3D came off الرئيسية.
- **A model is a named handful of structures, never the whole atlas.** The
  complete body is 33 MB of geometry; the skull is 1.3 MB, which is less than
  the lecture it goes with. A student opening the skull pays for the skull.
- **Every structure is named in French, by hand, in `lib/anatomy/bundles.js`.**
  The source names are English. Listing them one by one is also what keeps a
  bundle honest: a region cut by coordinates quietly includes whatever else
  sat in the same box — their `skull` holds the corneas and the lacrimal
  glands.
- **Nothing in a model is ever made see-through.** Ghosting the rest of the
  skull to point at one bone turns the whole thing into an X-ray, and an X-ray
  of twenty-two overlapping bones is a picture of none of them. The bone you
  touched takes its colour; the others stay bone.
- **Muscles are coloured by the group they are taught in**, not one colour
  each. Twenty-six colours tell a student nothing, and « les muscles
  sous-hyoïdiens » is how the question is asked. A bundle names its groups in
  `families`; a bundle that names none, like the skull, is one colour per
  structure.
- **A muscle is read differently from a bone**: Origine, Insertion,
  Innervation, Action, Rapports. Same file, different sections.
- **A model may start with something taken off.** The platysma is a sheet
  under the skin covering the whole neck: left on, the first thing a student
  sees is a pink curtain with everything behind it. It is in the list like any
  other, marked off, one tap back.
- **One colour per bone, not per mesh.** The left and right parietal are the
  same bone and every plate in every textbook colours them the same. The list
  carries the same colours, because fourteen colours on a skull say nothing
  without the names beside them.
- **A bone shown by itself re-aims the camera at it.** Half the skull is
  buried — the sphenoid, the vomer, the ethmoid — and those are exactly the
  ones worth looking at alone. Leaving the camera where the whole head was put
  a maxilla in the corner at the size of a stamp.
- **A foramen and a process are labelled points, not pieces.** BodyParts3D is
  one mesh per whole bone; the only thing it calls a foramen in the entire
  body is in the brain. The shapes are all there at full detail — the foramen
  magnum is a real hole — so a landmark is a point on the surface with a name
  over it, the way a printed plate does it.
- **A landmark is written as a rule, not as coordinates.** `lib/anatomy/
  landmarks.js` says which direction to look: the mastoid is the lowest point
  of the temporal, the glabelle the frontmost point of the frontal. Re-cutting
  the geometry then moves the labels with the bone instead of leaving them
  hanging in the air.
- **The foramina are named outright, not found.** A two millimetre scan
  simplified for the browser closed every opening but the largest: of the
  whole skull only the foramen magnum and two pairs in the sphenoid survive as
  real holes. So a foramen's rule says where it is, and the point is snapped to
  the surface of its bone. The placement script prints how far the bone was
  from where the rule asked, and anything past a few millimetres is a guess
  that needs looking at.
- **Ask for a foramen on the face it opens through.** The ovale and the épineux
  asked for at mid-height of the greater wing snapped to the endocranial
  surface, so from under the skull — the only place you look for them — they
  faced away and were never drawn.
- **What runs through an orifice is the reason it is named.** Every one carries
  its contents: the jugular foramen gives IX, X, XI, the inferior petrosal
  sinus and the jugular bulb.
- **Choosing a landmark turns the model to face it.** Half of them are
  underneath or behind, and being left looking at the face is choosing nothing.
- **The names are off until they are asked for.** Thirty labelled points on
  the first open is somebody else's diagram, not a skull.
- **A landmark is a dot, and only the one you choose is named.** Turning the
  names on turns the points on; the name appears when you touch a dot or pick
  its row. Thirty names printed at once covers the skull with somebody else's
  diagram, and the whole point of a labelled point is that you ask it what it
  is.
- **A name goes in a column down the side with a line to the place it names**,
  the way a plate in a book sets them. A name printed where it lands covers
  the thing it is naming.
- **Choosing a bone narrows the points to that bone.** Seventeen dots at once
  is a rash; the same screen with a bone chosen is a plate.
- The dots are smaller than a thumb on purpose. Thirty at a comfortable width
  would cover the skull and overlap; the list is the target that keeps its full
  height, and the dot is the shortcut.
- **A bone can be taken off to see behind it** — the mandible over the base of
  the skull, the parietal over the temporal. The list says which are off and
  puts them back; so does إعادة الضبط.
- **A bone is divided into its parts, and colour means the same thing at both
  levels.** With no bone chosen the colours separate the bones; with one chosen
  they separate that bone's parts. Les parties de l'os temporal is an exam
  question and the atlas drew the temporal as one piece.
- **The division is approximate, and that is stated rather than hidden.** Each
  part gets an anchor written like a landmark — a direction, and the point of
  the bone furthest that way — and every triangle goes to the anchor it is
  nearest. The boundaries fall where the parts meet, not along a suture the
  geometry does not contain.
- **A part also has a reach (`pull`).** Nearest-anchor alone gave the styloid
  process, a spike the width of a pencil, as much of the temporal as the
  mastoid: territory is decided by the gap between anchors, not by the size of
  the thing.
- **Anchors are measured inside the bone's own box, not in metres.** A maxilla
  is three times as deep as it is wide, so in raw coordinates "forward and a
  little to the side" is just "forward" — and the two sides of a nearly
  symmetrical pair came out divided differently.
- **Touching a divided bone names the bone first and the part under it.** The
  part replaced the bone for a while and the bone was gone from the screen
  altogether: you could no longer touch the temporal and be told it was the
  temporal.
- **Which part was touched comes from the renderer**, through the hit face's
  material index. Working it out from the face number and the group ranges
  named the wrong part of the bone.
- A part's description is its bone's: that is where its parts are listed.
- **A model without descriptions is a picture.** What is revised is the parts,
  the articulations, the insertions and what runs through — so every structure
  carries them, in `lib/anatomy/notes.js`, and `check:anatomy` fails on one
  that does not.
- **The descriptions are written, not scraped.** Standard descriptive anatomy
  is the same in every atlas and has not moved in a century, so it is written
  here directly in French, under Terminologia Anatomica with the older French
  term in brackets where a teacher still uses it. Nothing is copied out of a
  book.
- One description per bone, not per mesh, like the colours: the left and right
  temporal have the same description.
- The sections are fixed — Parties, Reliefs, Articulations, Insertions
  musculaires, Éléments qui le traversent — and the check refuses a section
  the screen does not know how to draw.
- `scripts/carve-anatomy.mjs` cuts a bundle out of a checkout of the atlas and
  the result is committed. Nobody needs the atlas to build the app.
- `scripts/place-landmarks.mjs` turns the rules into points beside it.
- `npm run check:anatomy` reads the files the way the browser reads them. A
  wrong offset does not throw — it draws a cloud of triangles, which on a
  phone is indistinguishable from a model that never loaded.

## Which region belongs to which semester

The order the models are built in, because it is the order they are taught.

- **PCEM1 S1** — appareil locomoteur: membre supérieur and membre inférieur,
  the hand and the foot above all.
- **PCEM1 S2** — thorax et abdomen.
- **PCEM2 S1** — tête et cou, and neuroanatomie.
- **PCEM2 S2** — appareil urinaire and région uro-génitale.

## Still to build

Q&A, discussion, chat, study rooms, per-subject icons, badges students earn.

The models now cover every region of the curriculum map. What is genuinely
missing from both sources, and is not faked:

- **Female anatomy.** BodyParts3D and Z-Anatomy are both a male reference
  body. The uro-genital model says so on its face rather than presenting a
  male pelvis as the pelvis.
- **The ileum, the caecum and the rectum** are not separate meshes in
  Z-Anatomy: the gut it holds runs duodenum, jejunum, then the colon. The
  descriptions name what is absent instead of relabelling a neighbour.
- **The lateral sulcus** is a fissure, not a surface, so there is no mesh for
  it. The central, parieto-occipital and calcarine sulci are real and drawn.
- **The superior thyroid, lingual and posterior auricular arteries** are not
  in the cardiovascular file. They are named in the external carotid's
  description, because the six branches are the answer to the question.

## Where things are kept

- Content lives in **Postgres**, not in `lib/data.js`. The files under
  `lib/modules/` are history the migration reads once.
- **Read narrowly.** `subjectsOf` for a list of names, `notesOf` for الملخصات,
  the whole catalogue only where the whole catalogue is shown. PCEM2 is 906
  documents; sending those to a phone to draw nine names is how an app earns
  a reputation for being slow.
- **Every student screen reads the catalogue through `lib/catalogue.js`**,
  which reads Postgres and hands back the shape `lib/data.js` used to. Nothing
  student-facing imports `MODULES` any more. That file was why a subject added
  in the panel — a new year, DCEM1 — never appeared in the app: the panel
  wrote to the database and every screen read the file.
- The file is still the **fallback, per subject**: a module the database knows
  but holds no files for falls back to the file's copy, so a half-finished
  migration cannot blank the archive.
- **A year is ready when it has subjects**, not when somebody ticks `indexed`.
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
- **Run the SQL before sending it too** — `npm run check:sql` applies both
  migrations to a real Postgres, twice, and then checks the policies by
  asking them as four different people. The mock has no row-level security,
  so until this existed the policies had never once been run.
- **Run it before sending it.** `npm run mock` stands up a Supabase in memory
  and the app can then be driven in a browser. Compiling is not testing:
  "the button does nothing" only ever shows up when you click it.
