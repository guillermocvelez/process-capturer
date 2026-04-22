import { UpdateGuideStepDTO } from './dto/update-step.dto';

/**
 * Controlador de referencia (estilo NestJS) para el MVP.
 */
export class GuidesController {
  async listGuides() {
    return [];
  }

  async getGuideById(id: string) {
    return { id, steps: [] };
  }

  async createGuide(payload: { title: string; description?: string }) {
    return { id: 'guide_xxx', ...payload };
  }

  async updateGuideStep(guideId: string, stepId: string, payload: UpdateGuideStepDTO) {
    return { guideId, stepId, ...payload };
  }
}
