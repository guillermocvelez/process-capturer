import Link from 'next/link';
import { fetchGuides } from '../../lib/api';

export default async function GuidesPage() {
  const guides = await fetchGuides();

  return (
    <main style={{ maxWidth: 880, margin: '0 auto', padding: 24 }}>
      <h1>Guías</h1>
      <ul>
        {(guides || []).map((guide: { id: string; title: string }) => (
          <li key={guide.id}>
            <Link href={`/guides/${guide.id}`}>{guide.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
