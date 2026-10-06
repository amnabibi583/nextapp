# CareAlert Dashboard

CareAlert Dashboard is a small Next.js App Router starter for a patient-safety alert dashboard.

## Routes

- `/` — Dashboard summary cards for open, acknowledged, and resolved alerts.
- `/contacts` — Emergency Contacts placeholder.
- `/settings` — Settings placeholder.
- `/health` — Server-rendered health check using JSONPlaceholder.

## Local setup

```bash
npm install
npm run dev
```

Open (https://nextcarealert.netlify.app/).

## Build

```bash
npm run build
```

## Deployment on Vercel

Import the GitHub repository into Vercel. The framework should be detected as Next.js automatically. Use the default build command and output settings, and add values from `.env.example` only if needed. No secrets are required for this starter.

## Technologies

Next.js App Router, TypeScript, Tailwind CSS, ESLint, and native CSS.
