# API MVP (estructura NestJS)

## Módulos

- `modules/recordings`: ingesta de eventos de la extensión
- `modules/guides`: consulta y edición de guías
- `common/uploads.controller.ts`: URL de carga de screenshots

## Rutas objetivo

- `POST /v1/recordings/session/start`
- `POST /v1/recordings/events/batch`
- `POST /v1/recordings/session/:sessionId/finish`
- `POST /v1/uploads/screenshot-url`
- `GET /v1/guides`
- `GET /v1/guides/:id`
- `POST /v1/guides`
- `PATCH /v1/guides/:id/steps/:stepId`
