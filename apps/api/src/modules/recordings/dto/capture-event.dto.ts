export type CaptureEventType = 'CLICK' | 'INPUT' | 'CHANGE' | 'URL_CHANGE';

export interface CaptureEventDTO {
  eventType: CaptureEventType;
  timestamp: string; // ISO
  url: string;
  selector?: string;
  tagName?: string;
  label?: string;
  valueMasked?: string;
  isImportant?: boolean;
  screenshotUrl?: string;
  meta?: Record<string, unknown>;
}

export interface StartSessionDTO {
  initialUrl: string;
  userId?: string;
  workspaceId?: string;
}

export interface EventBatchDTO {
  sessionId: string;
  events: CaptureEventDTO[];
}
