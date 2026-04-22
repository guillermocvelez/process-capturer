import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ maxWidth: 880, margin: '0 auto', padding: 24 }}>
      <h1>Process Capturer MVP</h1>
      <Link href="/guides">Ir a guías</Link>
    </main>
  );
}
