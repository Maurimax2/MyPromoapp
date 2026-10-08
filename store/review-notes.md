# Review notes and the reviewer's account

Both stores need a working account to look inside the app. A reviewer cannot
make their own: sign-up asks for a university number (or, in first year, a
WhatsApp number), which they do not have.

## 1. Make the reviewer's account (5 minutes, once)

On the live app, signed out:

1. **حساب جديد**.
2. Name `App Review`, username `appreview`, an email you control (a Gmail
   alias like `yourname+review@gmail.com` works — no email is ever sent), a
   password of 12+ characters you keep somewhere safe.
3. Year **PCEM2**, the year with the most content. University number
   `RV0001` (the right shape, and no real student holds it).
4. Sign in once on a phone and check that **الدراسة** shows subjects and
   that a quiz opens.

Do not put the password in this repository. Type it only into App Store
Connect and Play Console.

Optional, so the reviewer sees a lived-in account: post one message on
الرئيسية, open one quiz, and send yourself a friend request from another
account.

## 2. App Store Connect → App Review Information

- **Sign-in required:** yes. User name / password: the account above.
- **Contact:** your name, phone, the contact email.
- **Notes** (paste as is):

```
MyPromo is a study app for the students of the Faculty of Medicine,
Pharmacy and Dentistry (FMPOS), University of Nouakchott, Mauritania.
It is made by students of the faculty for their classmates.

LANGUAGE
The interface is Arabic by default. To review it in French, tap the
"Français" button at the top of the sign-in screen, or after signing in:
أنا (Me, last tab) → اللغة (Language). Study content (lectures, MCQs,
anatomy) is in French in both languages, as it is taught.

DEMO ACCOUNT
The account above is a student in PCEM2 (second year of medicine), the
year with the most content. Sign up requires a university student number,
so please use this account.

WHERE THINGS ARE
- Home (الرئيسية): next lecture from the timetable, duels, posts from the
  class.
- Study (الدراسة): subjects → lectures (PDFs open in-app), MCQ quizzes from
  past exams, spaced review, 3D anatomy models (rotate, tap a structure to
  see its French name and description).
- Ranking (الترتيب): weekly class leaderboard.
- Me (أنا): profile, friends, chats, study rooms, notifications settings,
  language, blocked users, delete account.

USER-GENERATED CONTENT (Guideline 1.2)
- Every post, reply, answer, shared summary, private chat, profile and
  study room has a "⋯" menu with Report and Block.
- Blocking hides the person both ways (posts, replies, chats, duels,
  notifications) and stops them from messaging, challenging or adding the
  user. Blocked users are listed in Me → Blocked, where they can be
  unblocked.
- Reports go to a moderation queue reviewed by the student team within
  24 hours; moderators hide content and suspend accounts.
- Users agree to the Terms of Use (zero tolerance for objectionable content
  and abusive users) on the sign-in screen:
  https://mypromo-nu.vercel.app/terms
- The app is limited to students of the faculty: each class sees only its
  own members.

ACCOUNT DELETION (5.1.1(v))
Me (أنا) → scroll to the bottom → "حذف حسابي" (Delete my account). Also
on the web: https://mypromo-nu.vercel.app/delete-account

PERMISSIONS
- Notifications: asked only when the user taps "Enable notifications".
- Camera and microphone: asked only when the user turns them on inside a
  study room (live voice/video with classmates; nothing is recorded).

No in-app purchases, no ads, no tracking. Sign-in is email and password.
```

## 3. Play Console → App content → App access

- **All or some functionality is restricted** → Add instructions:
  - Name: `Student account`
  - Username / password: the account above
  - Any other information: the «LANGUAGE» and «WHERE THINGS ARE» paragraphs
    from the notes above.

## 4. If Apple asks about the content (5.2)

Answer only what is true for you. The facts, for reference:

- Lecture PDFs are the faculty's course files, shared by link with every
  student of the year in the class's Google Drive; MyPromo shows them to
  students of that year only. Commercial books (ECN, Collège, Résidanat) are
  deliberately not included.
- MCQs come from the faculty's past exam papers. Where a paper had no answer
  key, the answer was proposed by MyPromo and is kept marked in the database
  for teachers to check (it is no longer labelled on screen since 30
  September); the terms of use say some answers are MyPromo's and may be
  wrong.
- 3D anatomy: BodyParts3D (© The Database Center for Life Science, CC BY
  4.0) and Z-Anatomy (CC BY-SA 4.0), credited on each model's screen.

In App Store Connect → App Information → **Content Rights**, the question is
«Does your app contain, show, or access third-party content?» — the answer
is **Yes**, and you then confirm you have the rights to use it. If you are
not sure about the lecture PDFs, ask the class representatives or a teacher
for a written OK before submitting; it is the one question here only you can
answer.
