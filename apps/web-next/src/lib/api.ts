const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

export async function fetchGuides() {
  const res = await fetch(`${API_BASE_URL}/v1/guides`, { cache: 'no-store' });
  return res.json();
}

export async function fetchGuideById(id: string) {
  const res = await fetch(`${API_BASE_URL}/v1/guides/${id}`, { cache: 'no-store' });
  return res.json();
}

export async function updateGuideStep(guideId: string, stepId: string, payload: { title?: string; instruction?: string }) {
  const res = await fetch(`${API_BASE_URL}/v1/guides/${guideId}/steps/${stepId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return res.json();
}
