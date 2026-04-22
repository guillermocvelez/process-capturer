# Process Capturer MVP (Scribe-like)

MVP para capturar flujos web desde una extensión de Chrome y convertirlos en guías paso a paso editables.

## Stack

- **Extensión Chrome**: TypeScript + Manifest V3
- **Frontend**: Next.js (App Router)
- **Backend**: Node.js con estructura NestJS (REST)
- **Base de datos**: PostgreSQL (Prisma)
- **Storage de screenshots**: S3-compatible (ej: AWS S3, Cloudflare R2)

## Arquitectura de carpetas

```txt
.
├─ apps/
│  ├─ chrome-extension/          # Captura de eventos + screenshots
│  ├─ web-next/                  # Visor/editor de guías
│  └─ api/                       # Backend REST (estilo NestJS)
├─ packages/
│  └─ database/                  # Prisma schema + migraciones
└─ docs/
   └─ mvp-architecture.md        # Decisiones técnicas y pendientes
```

## Modelos de datos (Prisma)

Ver `packages/database/prisma/schema.prisma`.

- `Guide`
- `GuideStep`
- `CaptureSession`
- `CaptureEvent`

## Endpoints MVP

Ver `apps/api/src/modules/**` y resumen en `docs/mvp-architecture.md`.

### Recordings

- `POST /v1/recordings/session/start`
- `POST /v1/recordings/events/batch`
- `POST /v1/recordings/session/:sessionId/finish`
- `POST /v1/uploads/screenshot-url`

### Guides

- `GET /v1/guides`
- `GET /v1/guides/:id`
- `POST /v1/guides`
- `PATCH /v1/guides/:id/steps/:stepId`

## Extensión base

En `apps/chrome-extension/`:

- Content script captura `click`, `input`, `change` y cambios de URL
- Service worker mantiene buffer y envía batches al API
- Modelo de evento con timestamp y metadata
- Placeholder para screenshot por paso importante

## Frontend base

En `apps/web-next/`:

- `GET /guides`: listado de guías
- `GET /guides/[id]`: visor de guía paso a paso
- `GET /guides/[id]/edit`: edición de texto de pasos

## Arranque rápido

> Proyecto base (scaffold). Ajusta package manager (`pnpm`, `npm`, `yarn`) según prefieras.

1. Crear `.env` en `apps/api` y `apps/web-next`.
2. Variables mínimas:

```bash
DATABASE_URL=postgresql://user:pass@localhost:5432/process_capturer
API_BASE_URL=http://localhost:4000
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
S3_BUCKET=process-capturer
S3_REGION=us-east-1
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...
```

3. Base de datos:

```bash
cd packages/database
npx prisma migrate dev
npx prisma generate
```

4. API:

```bash
cd apps/api
npm install
npm run start:dev
```

5. Frontend:

```bash
cd apps/web-next
npm install
npm run dev
```

6. Extensión Chrome:

- Compilar `apps/chrome-extension`
- Abrir `chrome://extensions`
- Activar **Developer mode**
- Cargar carpeta `dist` como **Load unpacked**

## Decisiones técnicas y pendientes

Revisar `docs/mvp-architecture.md`.
