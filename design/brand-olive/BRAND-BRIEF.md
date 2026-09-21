# MyPromo — visual identity brief

Paste this whole file into ChatGPT at the start of a design session, and
attach `mypromo-mark.svg` (or `mypromo-mark-1024.png`) from
`Desktop/mypromo-olive/logo/`. Everything below is decided — treat it as
constraints, not suggestions.

---

## 1. What MyPromo is

A study app made **by and for medical students at FMPOS / UNEM in Nouakchott,
Mauritania**. It is not a generic edtech product and must never look like one.

Two halves, equally important:

- **A promo talking to itself.** A "promo" is a class year (PCEM1, PCEM2,
  DCEM1…). Students post summaries, share PDFs, ask each other questions,
  challenge each other on MCQs, and open study rooms.
- **The study material.** Lecture archive, ~10,000 MCQs, and a 3D anatomy
  reader with 33 body regions, 319 named bone landmarks and search across 818
  anatomical names.

The tagline, in the founders' own words: **منّا ولنا** ("from us, for us").
Secondary line: **صنعه طلبة الطب… لطلبة الطب**.

So the feeling is: *serious, warm, local, made by people who sit the same
exams.* Not corporate. Not childish. Not Silicon Valley.

---

## 2. Language rules — these are absolute

- **The interface is Arabic (RTL). All study content is French.**
- **Never write a medical or anatomical term in Arabic.** Students learn them
  in French and only know them in French. Write `Foramen ovale`, `Ostéologie
  du crâne`, `Le potentiel d'action` — never a translation.
- Module names stay as they are: `ANATOMIE`, `BIOCHIMIE`, `PHYSIOLOGIE S1`.
- `S1` and `S2` are never translated.
- Promo names stay Latin: `PCEM1`, `PCEM2`, `DCEM1`…
- Arabic and French sit side by side in the same sentence constantly. That is
  correct and normal — do not "fix" it.
- Numbers: Western digits (7, 12, 2026), not ٧ or ١٢.

---

## 3. The mark

Two figures — a purple-and-orange original, now **olive and ink** — standing
side by side and forming the letter **M**. Each figure is a circle (the head)
above a thick round-capped stroke (the body), and the two inner strokes meet
at the bottom centre to make the M's valley. It reads as two students
together, which is the entire idea of the product.

Exact source (48×48 viewBox):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">
  <circle cx="12.5" cy="10.5" r="5.2" fill="#17201A"/>
  <circle cx="35.5" cy="10.5" r="5.2" fill="#2A5B3E"/>
  <path d="M12.5 40V24l11.5 12" stroke="#17201A" stroke-width="8.4"
        stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M35.5 40V24L24 36" stroke="#2A5B3E" stroke-width="8.4"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

**Variants that exist** (all in `Desktop/mypromo-olive/logo/`):

| file | when |
|---|---|
| `mypromo-mark.svg` | the default — ink + olive, on ivory or white |
| `mypromo-mark-white.svg` | on olive, on ink, on a photograph |
| `mypromo-mark-ink.svg` | one colour — stamp, embroidery, single-colour print |
| `mypromo-mark-warm.svg` | olive + clay. Louder. **Posters only** |
| `mypromo-icon.svg` | the mark inset in an ivory rounded square — app icon, profile picture |
| `mypromo-lockup.png` | mark + the word MyPromo, side by side |

**Rules for the mark:**

1. Never redraw it, re-space it, add a gradient, add a shadow, outline it, or
   rotate it.
2. Never recolour it outside the four variants above.
3. Clear space on every side = the width of one head (about 11 units of the
   48-unit grid).
4. Minimum size: 24 px on screen, 8 mm in print.
5. **The mark does NOT go on subject banners or content artwork.** It belongs
   to the app, not to the material. (This matters: the previous banners had
   the logo baked in, and all 22 had to be remade when the identity changed.)

---

## 4. The palette — زيتون (olive)

Every value is a flat hex, ready for Canva's Brand Kit.

### Brand

| hex | name | job |
|---|---|---|
| `#2A5B3E` | Olive | **the brand AND the action.** Buttons, the active tab, the live dot, the second figure of the mark |
| `#3F7A57` | Olive light | pressed / hover |
| `#E3EDE5` | Olive pale | chips, tags, the tint behind an icon |

### Attention

| hex | name | job |
|---|---|---|
| `#A8502A` | Clay | **"this needs you."** A warning, a duel waiting, an unanswered question |
| `#F2E3DA` | Clay pale | the ground under a warning |

### Ground, ink, lines

| hex | name | job |
|---|---|---|
| `#F3F1E9` | Background | the ivory field everything sits on |
| `#FFFDF8` | Surface | every card — warm white, **never pure white** |
| `#17201A` | Ink | headings and body |
| `#6B6F69` | Ink 2 | secondary text |
| `#979992` | Ink 3 | captions, hints, disabled |
| `#DDDCD4` | Line | borders and dividers |
| `#EAE8E0` | Line soft | a divider inside a card |

### The years (promo badges)

`#3F7A57` PCEM1 · `#2A5B3E` PCEM2 · `#A8502A` DCEM1 · `#7D4A2A` DCEM2 ·
`#4B5B3A` DCEM3 · `#6B4A3A` DCEM4

### Canva Brand Kit order

```
#2A5B3E #3F7A57 #E3EDE5 #A8502A #F2E3DA #17201A #6B6F69 #979992 #F3F1E9 #FFFDF8 #DDDCD4
```

---

## 5. Typeface

**Readex Pro** — Arabic and Latin in one family. Free, SIL Open Font Licence,
from Google Fonts: `fonts.google.com/specimen/Readex+Pro`

Weights in use: **300, 400, 500, 600**. Nothing heavier — Readex Pro's 600 is
already strong, and 700+ makes Arabic look shouty.

Typographic discipline, applied everywhere:

- **Maximum four type sizes** on any one design.
- **Maximum two weights** in any one block.
- Hierarchy comes from **size, weight and opacity** — never from colour.
- Arabic headlines want slightly more line-height than Latin: 1.3–1.4.
- Negative letter-spacing on large Arabic headlines (-0.5px at 30px+).

---

## 6. Design principles

These are the rules the app itself obeys. Posters should obey them too, so
that a poster and the app look like the same thing.

1. **Olive is the brand and the action, so there is only ever ONE olive button
   or olive block per composition.** Everything else is ink on ivory. This is
   the single most important rule — the moment there are two olive blocks, the
   design stops working.
2. **Clay means "this needs you."** Never decoration, never a second brand
   colour, never used because the layout "needed some warmth".
3. **Light only.** There is no dark mode and no dark poster. Warm white on
   ivory. If a design needs contrast, use ink (`#17201A`) as a solid block —
   not black, and not a dark gradient.
4. **60 / 30 / 10.** 60% ivory ground, 30% ink text and ink blocks, 10% olive.
5. **8-point grid.** Every margin, padding and gap divisible by 8 or 4.
6. **One radius family.** 14–18px on cards, 999px on chips and pills. No mixed
   radii in one design.
7. **Hairlines, not shadows.** A 1px `#DDDCD4` border instead of a drop
   shadow. If a shadow is unavoidable, make it almost invisible.
8. **People are the imagery.** MyPromo is a promo. Faces, avatars, "four of
   your promo are studying right now" — that beats any illustration.

---

## 7. Content artwork (subject banners, post images)

- A subject banner carries **the subject**, not the brand. Name + a drawn
  element + flat colour. **No logo on it.**
- Anatomy imagery should come from **the app's own 3D models** (real
  screenshots), not from stock or generated art.
- If a drawn element is needed, keep it a **single-weight line drawing** in
  white or ink on a flat field — a spine, a molecule, an ECG trace, a bone.
- Each subject may have its own colour, drawn from the muted family above
  (olive, clay, deep teal `#14555F`, plum `#5A3A85`, ochre `#8A6A14`).

---

## 8. Voice and copy

- Arabic marketing copy, French for anything that names study material.
- Plain, direct, a bit warm. Students talking to students, not a brand talking
  to a market.
- Lines that are already in use and should stay consistent:
  - **منّا ولنا.** (the main line)
  - **صنعه طلبة الطب… لطلبة الطب**
  - **شاركنا رأيك** (the feedback CTA)
  - **ساعدنا نبني تجربة أفضل لطلبة FMPOS**
- **Never invent statistics.** No "10,000 students", no "98% satisfaction".
  Real numbers only: 33 anatomy regions, 319 bone landmarks, 818 searchable
  anatomical names, 906 documents in PCEM2. If a number isn't in this list,
  don't use it.

---

## 9. Hard "do not" list

- ❌ Do not use purple `#6B21B5` or orange `#F97316` — that is the **old**
  identity and it is being retired.
- ❌ No gradients. Not in the logo, not in backgrounds, not in buttons.
- ❌ No dark mode, no dark posters.
- ❌ No glassmorphism, no blur panels, no neon, no glow.
- ❌ No stethoscopes, no DNA helixes, no generic doctor illustrations, no
  stock photography of smiling students, no AI-generated "medical" art.
- ❌ No emoji as section markers or icons.
- ❌ No medical term written in Arabic.
- ❌ No logo inside content artwork.
- ❌ No pure white (`#FFFFFF`) surfaces — the warm white is `#FFFDF8`.
- ❌ No more than one olive block per composition.

---

## 10. Poster formats we need

| use | size |
|---|---|
| WhatsApp status / story | 1080 × 1920 |
| WhatsApp group share | 1080 × 1080 |
| Instagram post | 1080 × 1350 |
| Printed A4 for faculty noticeboards | 210 × 297 mm, 300 dpi |
| Play Store feature graphic | 1024 × 500 |
| App Store / Play screenshots | phone screenshots at 1284 × 2778 |

A poster should carry, at minimum: the mark, one line of Arabic, and one real
screenshot of the app. It should not carry a feature list.

---

## 11. A prompt you can paste

> You are helping design visual material for MyPromo, a study app made by and
> for medical students at FMPOS in Nouakchott, Mauritania. I have attached the
> brand brief and the logo. Follow the brief exactly — the palette, the
> typeface (Readex Pro), the one-olive-block rule, and the do-not list are
> constraints, not suggestions. The interface language is Arabic (RTL) and all
> medical content stays in French. Ask me for the real screenshot you need
> rather than generating fake app imagery. Start by telling me which format
> we're designing for and what single sentence it has to carry.
