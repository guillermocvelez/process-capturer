# Chrome Extension MVP

## Qué hace

- Captura eventos de usuario en páginas web:
  - click
  - input
  - change
  - url_change
- Envía eventos por lotes al backend.
- Define punto de integración para screenshot en pasos importantes.

## Archivos clave

- `src/content/index.ts`: listeners y normalización de eventos
- `src/background/index.ts`: sesión activa, batching y envío al API
- `src/types/events.ts`: contrato de evento
- `manifest.json`: configuración MV3
