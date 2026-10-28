import './globals.css';
import { Alexandria } from 'next/font/google';
import { cookies } from 'next/headers';
import './dark.css';
import BottomNav from '@/components/BottomNav';
import PushListener from '@/components/PushListener';
import Heartbeat from '@/components/Heartbeat';
import StatusBar from '@/components/StatusBar';
import { LangProvider } from '@/components/Lang';
import { getLang, dictOf } from '@/lib/lang';
import { dirOf } from '@/lib/i18n';

// The typeface, served from our own domain.
//
// It used to be a <link> to fonts.googleapis.com, which a browser will not
// paint the page without. On a good connection that is invisible; on mobile
// data in Nouakchott it is the whole reason a screen takes seconds to appear.
// Next fetches the files at build time, serves them from here, and inlines
// the CSS, so there is no third-party request in the way of the first paint.
// Alexandria since the v2 look (2026-10): one face for Arabic and the French
// of the course, with the light weight the big numbers and the quiet lines use.
const appFont = Alexandria({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-app',
});

export const metadata = {
  title: 'MyPromo',
  description: 'كل ما تشاركه دفعتك، في مكان واحد',
  manifest: '/manifest.webmanifest',
  // Added to the home screen on an iPhone, it opens without an address bar.
  appleWebApp: { capable: true, title: 'MyPromo', statusBarStyle: 'default' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  // An app, not a page: an iPhone zooms in when a field is focused and leaves the
  // page zoomed after the keyboard closes. Together with the 16px fields in
  // globals.css this keeps the screen where it was.
  maximumScale: 1,
  themeColor: '#0F4A3B',
  // The app draws its own bar along the bottom; on a notched phone it has to
  // reach the edge of the glass rather than stopping above it.
  viewportFit: 'cover',
};

// Arabic or French, as this phone chose (lib/i18n.js): French turns the
// whole page round to read left to right, and only then is the dictionary
// sent down with it.
export default async function RootLayout({ children }) {
  const lang = await getLang();
  // Dark or light, as this phone chose (components/ThemeToggle.js), read here so
  // the page arrives in its colours instead of flashing white first.
  const theme = (await cookies()).get('mp-theme')?.value === 'dark' ? 'dark' : 'light';
  return (
    <html lang={lang} dir={dirOf(lang)} data-theme={theme} className={appFont.variable}>
      <body>
        <LangProvider lang={lang} dict={dictOf(lang)}>
          <div className="app">
            {children}
            <BottomNav />
          </div>
          <PushListener />
          <Heartbeat />
          <StatusBar />
        </LangProvider>
      </body>
    </html>
  );
}
