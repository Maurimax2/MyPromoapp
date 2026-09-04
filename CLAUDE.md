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

## Design

- Cards direction: white cards on grey, soft shadows, generous spacing.
- Typeface is **IBM Plex Sans Arabic**, chosen over the Cairo named on the
  identity sheet. The sheet is out of date on this one point.
- One icon set (Lucide paths, stroke 2), one radius, one shadow.
- Orange is spent only where something needs attention — not decoration.
- Light theme only. Dark mode is deliberately not designed yet.
- Touch targets are never below 44px.

## Shape of the app

- **Community first.** الرئيسية is a feed, not a comment list: posts carry
  media, have weight, and have a real action bar.
- Sign-in is the front door — opening the site lands on `/login`.
- Nav holds four: الرئيسية / الملخصات / الأرشيف / الملف. المحاضرات lives as
  a card at the top of the feed.
- **Files open inside MyPromo**, never by handing the student to the Drive app.
- Six promos: PCEM1, PCEM2, DCEM1, DCEM2, DCEM3, DCEM4. Each has its own badge
  colour, shown on every post. Only PCEM2 is indexed so far.

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

## Working method

- Show pictures before HTML. Screenshots of the running app, not file dumps.
- Small steps. Stop and show after each one.
- Ask before deciding when there is more than one reasonable option.
