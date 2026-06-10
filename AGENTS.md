# Kalkulator Cuan

## Project Snapshot

Kalkulator Cuan is a simple single-package Vite React app for calculating HPP/modal, selling price, margin, tax, discount safety, and saved product data for Indonesian UMKM users.

Tech stack: React 19, TypeScript, Vite 6, Tailwind CSS v4, Zustand, lucide-react, and Vitest.

Most implementation guidance lives in `src/AGENTS.md`; read the nearest AGENTS.md before editing files.

## Root Setup Commands

```bash
npm install
npm run dev
npm run typecheck
npm test
npm run build
npm run preview
```

## Universal Conventions

- Keep the app lightweight: avoid new dependencies unless clearly justified.
- Prefer small, focused React components over returning to a monolithic file.
- Keep business logic in pure functions under `src/lib/` and test it with Vitest.
- Keep UI copy simple and UMKM-friendly; avoid accounting-heavy wording unless explained.
- Preserve mobile-first behavior and tactile visual style.
- Do not commit generated `dist/`, `*.tsbuildinfo`, or local environment files.
- Do not commit unless the user explicitly asks.

## Security & Secrets

- Never commit secrets, tokens, API keys, cookies, or credentials.
- This app currently stores data in browser `localStorage`; do not add PII-heavy storage without explicit review.
- If adding backend or sync features, review auth, authorization, and data privacy first.

## JIT Index

### Package Structure

- App shell: `src/App.tsx`
- Frontend implementation: `src/` -> see `src/AGENTS.md`
- Project README: `README.md`
- Product notes/spec: `prd.md`

### Quick Find Commands

```bash
rg -n "calculate\(" src
rg -n "useMarginStore" src
rg -n "export function" src/components
rg -n "SavedProduct|FormData|CalculationResult" src
find src -name "*.test.ts"
```

## Definition of Done

Before claiming implementation is complete, run:

```bash
npm run typecheck && npm test && npm run build
```

For behavior changes, add or update tests in `src/lib/*.test.ts` when the changed behavior is calculable or pure.
