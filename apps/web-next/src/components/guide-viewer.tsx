interface GuideStep {
  id: string;
  orderIndex: number;
  title: string;
  instruction: string;
  screenshotUrl?: string;
}

export function GuideViewer({ title, steps }: { title: string; steps: GuideStep[] }) {
  return (
    <main style={{ maxWidth: 880, margin: '0 auto', padding: 24 }}>
      <h1>{title}</h1>
      <ol>
        {steps.map((step) => (
          <li key={step.id} style={{ marginBottom: 20 }}>
            <h3>{step.title}</h3>
            <p>{step.instruction}</p>
            {step.screenshotUrl ? <img src={step.screenshotUrl} alt={step.title} style={{ maxWidth: '100%' }} /> : null}
          </li>
        ))}
      </ol>
    </main>
  );
}
