import { CaptureEvent } from '../types/events';
import { getStableSelector } from '../utils/selectors';

function emitEvent(event: CaptureEvent) {
  chrome.runtime.sendMessage({ type: 'CAPTURE_EVENT', payload: event });
}

function baseEvent(eventType: CaptureEvent['eventType']): CaptureEvent {
  return {
    eventType,
    timestamp: new Date().toISOString(),
    url: window.location.href,
  };
}

document.addEventListener('click', (e) => {
  const target = e.target as Element | null;
  const tagName = target?.tagName?.toLowerCase();
  const text = (target as HTMLElement | null)?.innerText?.trim()?.slice(0, 120);

  emitEvent({
    ...baseEvent('CLICK'),
    selector: getStableSelector(target),
    tagName,
    label: text,
    isImportant: tagName === 'button' || target?.getAttribute('role') === 'button',
  });
});

document.addEventListener('input', (e) => {
  const target = e.target as HTMLInputElement | null;
  if (!target) return;

  const masked = target.type === 'password' ? '***' : String(target.value ?? '').slice(0, 120);

  emitEvent({
    ...baseEvent('INPUT'),
    selector: getStableSelector(target),
    tagName: target.tagName.toLowerCase(),
    label: target.name || target.id,
    valueMasked: masked,
    isImportant: false,
  });
});

document.addEventListener('change', (e) => {
  const target = e.target as HTMLInputElement | HTMLSelectElement | null;
  if (!target) return;

  emitEvent({
    ...baseEvent('CHANGE'),
    selector: getStableSelector(target),
    tagName: target.tagName.toLowerCase(),
    label: target.getAttribute('name') || target.getAttribute('id') || undefined,
    valueMasked: String((target as HTMLInputElement).value ?? '').slice(0, 120),
    isImportant: target.tagName.toLowerCase() === 'select',
  });
});

const originalPush = history.pushState;
const originalReplace = history.replaceState;

function handleUrlChange() {
  emitEvent({
    ...baseEvent('URL_CHANGE'),
    isImportant: true,
  });
}

history.pushState = function (...args) {
  originalPush.apply(this, args);
  handleUrlChange();
};

history.replaceState = function (...args) {
  originalReplace.apply(this, args);
  handleUrlChange();
};

window.addEventListener('popstate', handleUrlChange);
