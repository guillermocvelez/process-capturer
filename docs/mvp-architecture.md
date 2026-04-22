# Arquitectura MVP: Grabación de procesos web

## 1) Flujo end-to-end

1. Usuario inicia grabación desde la extensión.
2. Content script escucha eventos (`click`, `input`, `change`, `url_change`) y genera payload normalizado.
3. Service worker acumula en buffer y envía lotes (`events/batch`) cada N segundos o cada N eventos.
4. Para pasos importantes, la extensión solicita captura y sube screenshot (URL firmada o endpoint directo).
5. Al finalizar sesión, backend transforma eventos a pasos legibles.
6. Se crea `Guide` + `GuideStep[]` en Postgres.
7. Frontend muestra la guía y permite editar texto de pasos.

## 2) Estructura de carpetas propuesta

```txt
apps/
  chrome-extension/
    src/background/
    src/content/
    src/types/
  api/
    src/modules/recordings/
    src/modules/guides/
  web-next/
    src/app/guides/
    src/components/
packages/
  database/prisma/
docs/
```

## 3) Estrategia de captura

### Eventos mínimos

- `click`
- `input`
- `change`
- `url_change`

### Metadata por evento

- `sessionId`
- `timestamp`
- `url`
- `selector` (CSS estable)
- `tagName`
- `inputType` (si aplica)
- `valueMasked` (nunca guardar secreto en texto plano)
- `isImportant` (si amerita screenshot)

### Heurística “paso importante”

- navegación de URL
- click en botones primarios (`button`, `[role=button]`)
- submit de formularios
- aperturas de modal

## 4) Transformación evento -> paso legible

Reglas iniciales:

- `click` sobre botón con texto “Submit” → `Haz clic en "Submit"`.
- `input` en campo label/email → `Escribe tu email en "Email"`.
- `url_change` → `Navega a /ruta`.

En MVP usar plantilla deterministic-first. Más adelante sumar LLM opcional para reescritura natural.

## 5) Endpoints (MVP)

### Recordings

- `POST /v1/recordings/session/start`
  - input: `{ userId?, workspaceId?, initialUrl }`
  - output: `{ sessionId }`

- `POST /v1/recordings/events/batch`
  - input: `{ sessionId, events: CaptureEventDTO[] }`
  - output: `{ accepted: number }`

- `POST /v1/recordings/session/:sessionId/finish`
  - procesa eventos, crea guía
  - output: `{ guideId, stepsCount }`

- `POST /v1/uploads/screenshot-url`
  - output: `{ uploadUrl, fileUrl }`

### Guides

- `GET /v1/guides`
- `GET /v1/guides/:id`
- `POST /v1/guides`
- `PATCH /v1/guides/:id/steps/:stepId`

## 6) Decisiones técnicas

1. **Postgres + Prisma** por velocidad de iteración y tipado.
2. **S3-compatible storage** para screenshots escalable y barato.
3. **Batching desde extensión** para reducir chatty network.
4. **Sanitización de inputs** para evitar capturar secretos.
5. **Selección CSS estable** con prioridad por `data-testid`, `aria-label`, `id`.

## 7) Pendientes críticos

1. Política de privacidad y redacción de datos sensibles.
2. Retries offline y cola persistente en extensión (IndexedDB).
3. Autenticación entre extensión y backend.
4. Versionado de pasos (historial de ediciones).
5. Motor de “pasos importantes” más robusto.
6. Soporte multi-tenant/workspace.
7. Exportación de guía (Markdown/PDF).
