import './globals.css';
import { Readex_Pro } from 'next/font/google';
import BottomNav from '@/components/BottomNav';
import PushListener from '@/components/PushListener';
import Heartbeat from '@/components/Heartbeat';
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
const readex = Readex_Pro({
  subsets: ['arabic', 'latin'],
  // Readex Pro ships 200–700; the app uses four of them.
  weight: ['300', '400', '500', '600'],
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
  themeColor: '#2A5B3E',
  // The app draws its own bar along the bottom; on a notched phone it has to
  // reach the edge of the glass rather than stopping above it.
  viewportFit: 'cover',
};

// Arabic or French, as this phone chose (lib/i18n.js): French turns the
// whole page round to read left to right, and only then is the dictionary
// sent down with it.
export default async function RootLayout({ children }) {
  const lang = await getLang();
  return (
    <html lang={lang} dir={dirOf(lang)} className={readex.variable}>
      <body>
        <LangProvider lang={lang} dict={dictOf(lang)}>
          <div className="app">
            {children}
            <BottomNav />
          </div>
          <PushListener />
          <Heartbeat />
        </LangProvider>
      </body>
    </html>
  );
}
