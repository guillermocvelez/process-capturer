import Link from 'next/link';
import { GuideViewer } from '../../../components/guide-viewer';
import { fetchGuideById } from '../../../lib/api';

export default async function GuideDetailPage({ params }: { params: { id: string } }) {
  const guide = await fetchGuideById(params.id);

  return (
    <>
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '12px 24px' }}>
        <Link href={`/guides/${params.id}/edit`}>Editar guía</Link>
      </div>
      <GuideViewer title={guide.title || 'Guía'} steps={guide.steps || []} />
    </>
  );
}
