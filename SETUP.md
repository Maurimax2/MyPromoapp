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

## Storage

Nothing to do. The first upload creates the `media` bucket itself, public,
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

## Running it locally

    npm run mock     # a stand-in Supabase on :54321
    npm run dev      # with the four NEXT_PUBLIC_/SUPABASE_ vars pointed at it

`scripts/mock-supabase.mjs` answers the PostgREST, auth and storage calls the
app makes, keeping everything in memory. It exists because this app was being
compiled and looked at rather than clicked, and "the button does nothing" is
exactly the class of bug that only appears when you click.
