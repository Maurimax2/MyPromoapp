import './globals.css';
import { IBM_Plex_Sans_Arabic } from 'next/font/google';
import BottomNav from '@/components/BottomNav';

// The typeface, served from our own domain.
//
// It used to be a <link> to fonts.googleapis.com, which a browser will not
// paint the page without. On a good connection that is invisible; on mobile
// data in Nouakchott it is the whole reason a screen takes seconds to appear.
// Next fetches the files at build time, serves them from here, and inlines
// the CSS, so there is no third-party request in the way of the first paint.
const plex = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-plex',
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
  themeColor: '#6B21B5',
  // The app draws its own bar along the bottom; on a notched phone it has to
  // reach the edge of the glass rather than stopping above it.
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={plex.variable}>
      <body>
        <div className="app">
          {children}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
