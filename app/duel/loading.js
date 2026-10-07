import { SkScreen } from '@/components/Skeleton';
import { getT } from '@/lib/lang';

export default async function Loading() {
  const t = await getT();
  return <SkScreen title={t('تحدّي زميلك')} rows={4} hero />;
}
