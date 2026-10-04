import { redirect } from 'next/navigation';

// Opening the site lands in the app. A signed-out visitor never gets there:
// the middleware sends them to the door first, and a signed-in one is not made
// to stop at it.
export default function Home() {
  redirect('/feed');
}
