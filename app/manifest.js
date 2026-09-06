// What a phone reads when a student adds MyPromo to their home screen.
//
// Without it the icon is blank, the name is the URL, and opening it launches
// a browser with an address bar — which is the difference between something
// that feels like an app and something that feels like a website somebody
// bookmarked.
export default function manifest() {
  return {
    name: 'MyPromo',
    short_name: 'MyPromo',
    description: 'كل ما تشاركه دفعتك، في مكان واحد',
    lang: 'ar',
    dir: 'rtl',
    start_url: '/feed',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#F1F5F9',
    theme_color: '#6B21B5',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
