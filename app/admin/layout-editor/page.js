// Arranging الرئيسية.
//
// Every layout question — four tools or six, the row above the fold or below,
// banners before the feed or after — used to be a question for whoever could
// deploy. This is the same question, answered in ten seconds by whoever owns
// the app.

import { layoutOf } from '@/lib/layout';
import { BLOCKS } from '@/lib/home-blocks';
import Arrange from './Arrange';

export const dynamic = 'force-dynamic';

export default async function LayoutEditor() {
  const blocks = await layoutOf('home');
  return <Arrange blocks={blocks} catalogue={BLOCKS} />;
}
