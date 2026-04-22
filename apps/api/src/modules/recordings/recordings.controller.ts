import { EventBatchDTO, StartSessionDTO } from './dto/capture-event.dto';

/**
 * Controlador de referencia (estilo NestJS) para el MVP.
 * Implementar con @Controller('v1/recordings') y servicios.
 */
export class RecordingsController {
  async startSession(payload: StartSessionDTO) {
    return {
      sessionId: 'sess_xxx',
      received: payload,
    };
  }

  async ingestBatch(payload: EventBatchDTO) {
    return {
      accepted: payload.events.length,
      sessionId: payload.sessionId,
    };
  }

  async finishSession(sessionId: string) {
    return {
      sessionId,
      guideId: 'guide_xxx',
      stepsCount: 0,
    };
  }
}
