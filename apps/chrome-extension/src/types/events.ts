export type CaptureEventType = 'CLICK' | 'INPUT' | 'CHANGE' | 'URL_CHANGE';

export interface CaptureEvent {
  eventType: CaptureEventType;
  timestamp: string;
  url: string;
  selector?: string;
  tagName?: string;
  label?: string;
  valueMasked?: string;
  isImportant?: boolean;
  screenshotUrl?: string;
  meta?: Record<string, unknown>;
}
