import './globals.css';
import BottomNav from '@/components/BottomNav';

export const metadata = {
  title: 'MyPromo',
  description: 'كل ما تشاركه دفعتك، في مكان واحد',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#6B21B5',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body>
        <div className="app">
          {children}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
