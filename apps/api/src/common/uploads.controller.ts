/**
 * Endpoint MVP para generar URL firmada de screenshot.
 */
export class UploadsController {
  async createScreenshotUploadUrl() {
    return {
      uploadUrl: 'https://storage.example.com/presigned-upload',
      fileUrl: 'https://cdn.example.com/screenshots/file.png',
    };
  }
}
