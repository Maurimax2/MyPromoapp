# Google Play — «Apply for production» answers

When the closed test reaches 14 days with 12+ testers opted in, Play Console
→ Dashboard → **Apply for production**. Google asks the questions below and
usually answers within 7 days. A rejection means another 14 days of testing,
so these answers are worth getting right.

What Google looks for: real testers who used the app, real feedback, real
changes made because of it. Be specific, and write in the first person
plural. The parts in **[brackets]** are yours to fill in — only you know the
numbers. Everything else is taken from what actually changed in the app
during the test (git history, 24 Sep – 8 Oct 2026).

---

## Part 1 — About your closed test

**How easy was it to recruit testers for your app?**

> Easy

**Describe the engagement you received from testers during your closed test.**

> Our testers are [N] medical, pharmacy and dental students of the Faculty of
> Medicine (FMPOS) in Nouakchott — the exact people the app is for. We
> invited them through our class WhatsApp groups. They used the app the way
> they would for real: opening lectures, answering MCQs from past exams,
> reviewing anatomy in 3D, challenging each other to duels, opening study
> rooms with voice and video, and posting in their class feed. [About X
> testers opened it most days; the most active ones answered several hundred
> MCQs.] Our admin panel shows daily opens per year of study, which is how
> we followed engagement.

**Provide a summary of the feedback you received from testers. Include how
you collected the feedback.**

The points below are worked out from what was changed during the test. Keep
only the ones testers really raised, and add what they said in their words.

> We collected feedback through a feedback page in Arabic and French
> (mypromo-nu.vercel.app/feedback) that [N] students filled in, and messages
> in our class WhatsApp groups[, and Play's tester feedback]. The main
> points:
> - Some students do not read Arabic and asked for a French interface.
> - Lecture files were slow to open on mobile data.
> - Students wanted to study together privately, not only in rooms open to
>   the whole class.
> - Students wanted to know what is coming next in their timetable.
> - Notifications did not arrive on some phones, with no explanation.
> - [Anything else you remember students asking for.]

---

## Part 2 — About your app

**Who is the intended audience of your app?**

> University students of medicine, pharmacy and dentistry at the Faculty of
> Medicine, Pharmacy and Odonto-Stomatology (FMPOS), University of
> Nouakchott, Mauritania — from first to final year. Adults only.

**Describe how your app provides value to users.**

> Today these students study from PDFs and exam papers scattered across
> dozens of WhatsApp groups. MyPromo puts their whole year in one place:
> lectures by subject, MCQs from past exams organised by lecture with a
> review system for mistakes, interactive 3D anatomy with French names,
> shared summaries and Q&A with their class, study rooms with voice and
> video, duels, and a weekly class leaderboard. The interface is in Arabic
> or French; study content is in French, as it is taught.

**How many installs do you expect in your first year?**

> [Pick the range that fits: the faculty has a few thousand students, so
> 1,000 – 10,000 is realistic.]

---

## Part 3 — Production readiness

**What changes did you make to your app based on what you learned during
your closed test?**

> - Added a complete French interface, chosen per phone, because some
>   students do not read Arabic.
> - Made lecture files open in a fast preview first, with a download as
>   fallback, and moved our server next to our database to cut loading
>   times.
> - Added private study rooms that only people with the invitation link can
>   join.
> - Added the timetable: the next lecture on the home screen and a week
>   view.
> - Rebuilt push notification registration so the app waits for the device
>   token and says why it failed, and added a test that checks our
>   notification setup without a phone.
> - Added reporting and blocking on every post, reply, chat, profile and
>   study room, a moderation queue, and terms of use.
> - Polished the quiz, the leaderboard, badges and loading screens, and
>   fixed 3D models appearing in the wrong subjects.

**How did you decide that your app is ready for production?**

> Testers used every main feature on their own phones for the full test
> period, the issues they reported were fixed and confirmed by them, and the
> app now has what a public app needs: a privacy policy, terms of use,
> in-app account deletion, reporting and blocking, and a moderation team
> from the class. The new school year has started[, and students are asking
> for it on the Play Store rather than as a direct download].
