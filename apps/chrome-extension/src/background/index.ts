import { CaptureEvent } from '../types/events';

const API_BASE_URL = 'http://localhost:4000';
const FLUSH_INTERVAL_MS = 3000;
const MAX_BATCH_SIZE = 20;

let activeSessionId: string | null = null;
let buffer: CaptureEvent[] = [];

async function startSession(initialUrl: string) {
  const res = await fetch(`${API_BASE_URL}/v1/recordings/session/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ initialUrl }),
  });

  const data = await res.json();
  activeSessionId = data.sessionId;
}

async function flushBuffer() {
  if (!activeSessionId || buffer.length === 0) return;

  const batch = buffer.slice(0, MAX_BATCH_SIZE);
  buffer = buffer.slice(MAX_BATCH_SIZE);

  await fetch(`${API_BASE_URL}/v1/recordings/events/batch`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId: activeSessionId, events: batch }),
  });
}

setInterval(() => {
  void flushBuffer();
}, FLUSH_INTERVAL_MS);

chrome.runtime.onInstalled.addListener(() => {
  console.log('Process Capturer extension installed');
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === 'START_CAPTURE') {
    void startSession(message?.payload?.initialUrl || 'about:blank').then(() => {
      sendResponse({ ok: true, sessionId: activeSessionId });
    });
    return true;
  }

  if (message?.type === 'CAPTURE_EVENT') {
    buffer.push(message.payload as CaptureEvent);

    if ((message.payload as CaptureEvent).isImportant) {
      // TODO: integrar chrome.tabs.captureVisibleTab + upload screenshot.
    }

    if (buffer.length >= MAX_BATCH_SIZE) {
      void flushBuffer();
    }

    sendResponse({ ok: true });
    return true;
  }

  if (message?.type === 'STOP_CAPTURE') {
    const currentSession = activeSessionId;
    void flushBuffer().then(async () => {
      if (currentSession) {
        await fetch(`${API_BASE_URL}/v1/recordings/session/${currentSession}/finish`, {
          method: 'POST',
        });
      }
      activeSessionId = null;
      sendResponse({ ok: true });
    });

    return true;
  }

  return false;
});
