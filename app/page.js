import { redirect } from 'next/navigation';

// Opening the site lands on sign-in, not the feed.
export default function Home() {
  redirect('/login');
}
