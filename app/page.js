import { redirect } from 'next/navigation';

// Opening the site lands on sign-in. Always — even when you are already
// signed in, because the front door is the front door and skipping it is how
// you end up unable to tell whether the lock works.
export default function Home() {
  redirect('/login');
}
