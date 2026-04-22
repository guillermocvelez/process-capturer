'use client';

import { useState } from 'react';
import { updateGuideStep } from '../lib/api';

interface GuideStep {
  id: string;
  title: string;
  instruction: string;
}

export function GuideEditor({ guideId, initialSteps }: { guideId: string; initialSteps: GuideStep[] }) {
  const [steps, setSteps] = useState(initialSteps);
  const [savingId, setSavingId] = useState<string | null>(null);

  async function onSave(stepId: string) {
    const step = steps.find((s) => s.id === stepId);
    if (!step) return;

    setSavingId(stepId);
    await updateGuideStep(guideId, stepId, {
      title: step.title,
      instruction: step.instruction,
    });
    setSavingId(null);
  }

  return (
    <main style={{ maxWidth: 880, margin: '0 auto', padding: 24 }}>
      <h1>Editar guía</h1>
      {steps.map((step, idx) => (
        <section key={step.id} style={{ marginBottom: 24 }}>
          <h3>Paso {idx + 1}</h3>
          <input
            value={step.title}
            onChange={(e) =>
              setSteps((prev) => prev.map((s) => (s.id === step.id ? { ...s, title: e.target.value } : s)))
            }
            placeholder="Título"
            style={{ width: '100%', marginBottom: 8 }}
          />
          <textarea
            value={step.instruction}
            onChange={(e) =>
              setSteps((prev) => prev.map((s) => (s.id === step.id ? { ...s, instruction: e.target.value } : s)))
            }
            placeholder="Instrucción"
            rows={4}
            style={{ width: '100%', marginBottom: 8 }}
          />
          <button type="button" onClick={() => onSave(step.id)} disabled={savingId === step.id}>
            {savingId === step.id ? 'Guardando...' : 'Guardar paso'}
          </button>
        </section>
      ))}
    </main>
  );
}
