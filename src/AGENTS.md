# Kalkulator Cuan Frontend Source

## Package Identity

`src/` contains the full React frontend for Kalkulator Cuan: form input, result panel, saved products, education tab, UI primitives, state store, and calculation logic.

Primary stack: React 19, TypeScript, Tailwind CSS v4 utility classes, Zustand persist, and Vitest.

## Setup & Run

From repository root:

```bash
npm run dev
npm run typecheck
npm test
npm run build
```

Run tests in watch mode while changing calculation logic:

```bash
npm run test:watch
```

## Patterns & Conventions

- App shell and tab routing live in `src/App.tsx`.
- Use lazy loading for non-default tabs, following `SavedTab` and `EducationTab` in `src/App.tsx`.
- Main calculator workflow lives in `src/components/tabs/CalculatorTab.tsx`.
- Result display and pricing suggestions live in `src/components/ResultPanel.tsx`.
- Saved-product UI lives in `src/components/tabs/SavedTab.tsx`.
- Education/help content lives in `src/components/tabs/EducationTab.tsx`.
- Shared UI primitives belong in `src/components/ui/`.
- DO: reuse `src/components/ui/Card.tsx`, `src/components/ui/Inputs.tsx`, and `src/components/ui/PushButton.tsx` for consistent tactile UI.
- DO: keep number parsing, margin math, discount logic, and labor helper math in `src/lib/calculations.ts`.
- DO: update `src/lib/calculations.test.ts` when changing calculation behavior.
- DO: put formatting helpers in `src/lib/format.ts`.
- DO: keep persisted form/product shape in `src/types/product.ts` and `src/store/useMarginStore.ts` aligned.
- DON'T: duplicate calculation formulas inside components; call `calculate(formData)` instead.
- DON'T: save only display results when products need to be editable; preserve `formSnapshot` like `src/store/useMarginStore.ts`.
- DON'T: use accounting-heavy labels without friendly wording. Prefer examples from `src/components/tabs/CalculatorTab.tsx` such as `Modal / Produk (HPP)` and `Pajak Pembeli`.
- DON'T: add global state unless it belongs in `src/store/useMarginStore.ts`.

## Key Files

- Entry point: `src/main.tsx`
- App shell: `src/App.tsx`
- Global styles/theme tokens: `src/index.css`
- Calculator tab: `src/components/tabs/CalculatorTab.tsx`
- Result panel: `src/components/ResultPanel.tsx`
- Saved products tab: `src/components/tabs/SavedTab.tsx`
- Zustand store: `src/store/useMarginStore.ts`
- Product/calculation types: `src/types/product.ts`
- Calculation logic: `src/lib/calculations.ts`
- Calculation tests: `src/lib/calculations.test.ts`
- Formatting helpers: `src/lib/format.ts`

## JIT Index Hints

```bash
rg -n "roundedPriceSuggestions|marginHealth|getRoundedPriceSuggestions" src/lib src/components
rg -n "formSnapshot|savedProducts|saveProduct|loadProduct" src/store src/types src/components
rg -n "PercentInput|MoneyInput" src/components
rg -n "localStorage|persist|STORAGE_KEY" src
rg -n "dark|ThemeToggle|localStorage" src index.html
find src/components -name "*.tsx"
find src/lib -name "*.test.ts"
```

## UI & Copy Guidelines

- Target users are UMKM owners, including less technical millennials, Gen X, and boomers.
- Optimize the flow for: input modal → see safe price → choose rounded catalog price → save/copy.
- Keep labels practical and familiar: `Modal`, `Porsi`, `Harga Jual`, `Pajak Pembeli`, `Diskon`.
- Use badges like `Untung tipis`, `Cukup aman`, `Sehat`, and `Premium` instead of technical-only terms.
- Preserve mobile-first layout and bottom navigation from `src/components/BottomNav.tsx`.
- Preserve dark mode behavior from `src/components/ThemeToggle.tsx` and `src/index.css`.

## Calculation Gotchas

- Margin is based on selling price, not cost markup.
- Formula: `idealPrice = hppPerUnit / (1 - marginDecimal)`.
- Rounded catalog prices may need decimal margin values; do not force integer margin if exact rounded price behavior matters.
- Tax is added above the selling price and should not reduce profit.
- Discount safety compares discounted selling price against `hppPerUnit`.
- Quantity must fall back to at least `1` to avoid division by zero.

## State & Persistence Gotchas

- Zustand persist only stores `savedProducts`; form/UI state is temporary.
- Product edits require `formSnapshot` to restore original inputs like quantity and cost structure.
- Keep legacy fallback behavior for older saved products without `formSnapshot`.
- `STORAGE_KEY` is defined in `src/types/product.ts`.

## Pre-PR Checks

From repository root:

```bash
npm run typecheck && npm test && npm run build
```
