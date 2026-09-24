# What to run before the app works

Two SQL files, one paste each, in Supabase → SQL Editor → New query → Run.
Both are safe to run twice.

## 1. `supabase/schema.sql`

The catalogue and the people: profiles, promos, modules, chapters, documents,
question banks, questions, reports, the audit log, and every row-level
security policy. You have already run this one — run it again anyway, because
it now adds the unique **constraints** that were only indexes before, and
`reports.handled_at`.

## 2. `supabase/social.sql` — new, not yet run

Everything students do: posts with their photographs and PDFs, comments,
likes, saves, questions and accepted answers, study rooms with their members
and messages, private chats, and the notifications the bell reads.

Nothing on the social side works until this runs. The app will not crash — the
screens will simply be empty and say so.

It also carries one fix that is not about posts at all: `schema.sql` let a
student read exactly one profile, their own, so every author's name on every
screen would have come back empty with nothing to say why. This adds the
policy that lets people in the same promo see each other.

## 3. `supabase/accounts.sql` — new, paste it once

Usernames, first-years' WhatsApp numbers, and the pharmacy (PCEP1) and dental
(PCED1) first years, which share medicine's first-year programme — dental all
year, pharmacy for S1. It also takes the old union's name out of paper titles.

Supabase → SQL Editor → paste the whole file → Run. Safe to run twice.

Until it runs, sign-up still works (without usernames), and PCEP1/PCED1 are
not offered. After it runs, members who joined before are asked to choose a
username once, the next time they open the app.

## 4. `supabase/habits.sql` — new, paste it once

Days studied and the question of the day — what the streaks, the streak
freezes, the 7/30/100-day badges, «N من دفعتك درسوا اليوم» and the weekly
leaderboard are counted from. Nothing counted is stored; only the days and
the answers are.

Supabase → SQL Editor → paste → Run. Safe to run twice. Until it runs, the
question of the day does not show and streaks stay on each phone.

## Google sign-in

The button is on the website already; it answers «غير مفعّل بعد» until:

1. Google Cloud Console → **APIs & Services → Credentials → Create OAuth
   client ID** (type: Web application). Authorised redirect URI: the one
   Supabase shows in the next step.
2. Supabase → **Authentication → Providers → Google** → turn it on, paste the
   client ID and secret, and copy its callback URL into step 1.
3. Supabase → **Authentication → URL Configuration** → add
   `https://mypromo-nu.vercel.app/auth/callback` to the redirect URLs.

Inside the Android and iOS app the button is hidden for now: Google refuses to
sign in inside an app's own web view, so the app needs its own Google sign-in,
which comes with the store builds.

## Storage

Nothing to do. Two buckets are made by the app itself the first time each is
needed: `media` for what students upload, capped at 25 MB, and `archive` for
MyPromo's own copy of a Drive file, capped at 60 MB. The second is what stops
every open of a lecture going to Google — the first student to open one pays
for it, everybody after is sent to the CDN.
 The first upload creates the `media` bucket itself, public,
capped at 25 MB, accepting images and PDFs only.

Files live in Supabase Storage rather than R2 for now. R2 is paid for and its
keys are in Vercel, but it has no bucket name or public URL configured, and a
half-configured store fails at the moment a student is holding a photograph.
`lib/storage.js` is the only file that knows where things are kept, so moving
to R2 later is one file.

## Accounts

A student signs up with an email, a password and their year — no confirmation
email, because Supabase's built-in mailer sends about two an hour.

Confirming an email was never the gate. A new profile is `pending`, and every
policy is written against `is_approved()`, so a new account reads nothing at
all until somebody approves it in **اللوحة ← الأعضاء**. That is the door.

Your own team still needs `ADMIN_EMAILS` on Vercel — comma-separated, then
redeploy. Anyone in that list becomes staff on their next sign-in.

## Checking the SQL before you paste it

    npm run check:sql

It stands up a real Postgres, applies both files to an empty database, applies
them a second time to prove they are safe to repeat, and then asks the
policies who can read what — that an approved student sees their promo's
people and posts and nobody else's, that an account waiting for approval sees
nothing at all, and that no year reads another year's.

It caught the one thing that would have failed on your database: `social.sql`
indexed a column three lines before adding it, so on a fresh run it stopped
with an error and nothing after it ran.

And

    npm run check:queries

reads the same two files, works out what each table really has, and checks
every query in the app against it. The mock answers from plain JavaScript
objects, so it returns a row for a column that does not exist — a query like
that only fails in front of a student.

## Running it locally

    npm run mock     # a stand-in Supabase on :54321
    npm run dev      # with the four NEXT_PUBLIC_/SUPABASE_ vars pointed at it

`scripts/mock-supabase.mjs` answers the PostgREST, auth and storage calls the
app makes, keeping everything in memory. It exists because this app was being
compiled and looked at rather than clicked, and "the button does nothing" is
exactly the class of bug that only appears when you click.
