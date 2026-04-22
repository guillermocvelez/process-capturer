import { GuideEditor } from '../../../../components/guide-editor';
import { fetchGuideById } from '../../../../lib/api';

export default async function GuideEditPage({ params }: { params: { id: string } }) {
  const guide = await fetchGuideById(params.id);

  return <GuideEditor guideId={params.id} initialSteps={guide.steps || []} />;
}
