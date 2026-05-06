# Step 1 — Token repository audit (Harbor Token System)

## Context
Building a coded React + Vite demo that mirrors a Figma screen and proves brand-switching works by swapping a single CSS file. Before any project scaffolding or component work, we need a confirmed map of the token layer: file paths, naming convention, and category coverage in both brands. This document captures step-1 findings only — steps 2–5 are intentionally not designed yet (each is approved iteratively).

## File locations

Repo: https://github.com/marcinkwiatkowski605/Harbor-Token-System (branch `main`).

The files are **not** named `carentan.css` / `railyard.css` at the root of `dist/` — each brand has its own subfolder with a single `tokens.css`:

- `dist/carentan/tokens.css` → raw URL: `https://raw.githubusercontent.com/marcinkwiatkowski605/Harbor-Token-System/main/dist/carentan/tokens.css`
- `dist/railyard/tokens.css` → raw URL: `https://raw.githubusercontent.com/marcinkwiatkowski605/Harbor-Token-System/main/dist/railyard/tokens.css`

→ **Confirm with user**: should the React project import these as `carentan.css` / `railyard.css` (renamed during copy/build), or keep the `tokens.css` filename?

## Naming convention

All variables follow:

```
--{brand}-{layer}-{category}-{property}-{variant}-{state}
```

- `{brand}` ∈ `carentan` | `railyard` — every variable is brand-prefixed (no neutral `--` shared layer)
- `{layer}` ∈ `global` | `primitive` | `semantic` | `component` (3-tier + a primitive tier)
- subsequent segments use kebab-case, with numeric scales (`-100`, `-200`, … `-1000` for color; `-4`, `-8`, … `-128` for spacing/sizing)

Negative letter-spacing values are spelled out: `letter-spacing-minus-1`, `letter-spacing-minus-1-half`, `letter-spacing-minus-2`.

## Category structure (shared by both brands)

### `global` (raw scales — primitives meant for definition only, not direct UI use)
- `global-space-{0,4,8,12,16,24,32,40,48,64,80,96,128}` — 0–128px spacing scale
- `global-size-{4..128}` — same numeric scale, sizing semantics
- `global-color-{red,orange,green,blue}-{100..1000}` (with extra `-250` and `-850` rungs) — status/utility ramps
- `global-color-neutral-{0,100..1000}` — grayscale ramp
- `global-font-size-{12,14,16,18,20,24,28,32,40,48,56,64,96}`
- `global-font-weight-{400,700}`
- `global-font-line-height-{16,20,24,28,32,36,40,48,56,64,72,110}`
- `global-font-letter-spacing-{0,2,half,minus-1,minus-1-half,minus-2}`
- `global-font-text-transform-{none,uppercase}`
- `global-border-width-1`
- `global-opacity-50`

### `primitive` (brand-defining tier — **this is where the two brands diverge**)
| Token | Carentan | Railyard |
|---|---|---|
| Brand color ramp | `primitive-color-neonpink-{100..1000}` | `primitive-color-blueviolet-{100..1000}` |
| Font family | `primitive-font-family-inter` | `primitive-font-family-spacemono` |
| Border-radius scale | `primitive-border-radius-{0,2,4,8,12,16,20,24,full}` | `primitive-border-radius-0` *(only — see flag below)* |

### `semantic` (intent-named, identical names in both brands)
- **Surface**: `surface-{base,subtle}`
- **Background**: `background-neutral`, `background-neutral-subtle`, `background-brand-{default,hover,active,selected}`, `background-support-{error,warning,success,info}` and each `-subtle` variant
- **Border**: `border-{default,default-subtle,active,focus,error,warning,info,success}`
- **Text**: `text-{primary,secondary,inverse,placeholder,link,disabled,on-brand,error,success,warning,info}`
- **Icon**: `icon-{default,disabled,on-brand,info,error,success,warning,inverse}`
- **Opacity**: `opacity-{disabled,loading}`
- **Focus ring**: `focus-ring`
- **Border-radius (semantic scale)**: `border-radius-{1,2,3,4,5,6,7,none,circle}` — present in both brands ✅
- **Type composites** (each carries `font-family`, `font-weight`, `font-size`, `line-height`, `letter-spacing`, `text-case`):
  - `heading-{xxl,xl,lg,md,sm,xsm,xxs}`
  - `title-{lg,md,sm}`
  - `body-{lg,md,sm}`
  - `label-{lg,md,sm}`

### `component` (component-scoped, identical names in both brands)
- `button` — `color-bg-{default,hover,active,selected}`, `color-{text,icon}`, `opacity-{disabled,loading}`, `border-radius-{lg,md,sm}`, `sizing-height-{lg,md,sm}`, `icon-sizing-square`, `spacing-inline-{lg,md,sm}`, `spacing-gap`
- `icon-button` — same shape as button plus per-state `color-icon-{default,hover,active,selected}`, three sizes
- `input` — `border-radius`, `opacity-disabled`, `color-bg`, `color-border-{default,active,error}`, `color-text-{filled,placeholder}`, `color-icon`, `sizing-{height,border}`, `icon-sizing-square`, `spacing-{inline,gap}`
- `select` — same as input plus `spacing-inline-{start,end}`
- `textarea` — `color-{bg, border-{default,active,error}, text-{filled,placeholder}}`, `border-radius`, `sizing-{border,min-height}`, `opacity-disabled`, `spacing-{inline,block}`

## Differences between brands (non-prefix)

1. **Brand color family** — Carentan = `neonpink`, Railyard = `blueviolet` (both 100–1000).
2. **Brand font family** — Carentan = `inter`, Railyard = `spacemono`.
3. **Primitive border-radius scale** — Carentan exposes `0,2,4,8,12,16,20,24,full`; **Railyard exposes only `0`**. ⚠️
   - Impact: any UI code that consumed `primitive-border-radius-{2..24,full}` directly would break on brand-swap.
   - Mitigation: components must consume the **semantic** radius scale (`semantic-border-radius-{1..7,none,circle}`), which is present in both brands. This is the rule we will follow.

Aside from those three points, both files appear to be name-identical (just `--carentan-` ↔ `--railyard-` prefix swap).

## Decisions captured (user-confirmed)

1. **Brand-swap mechanism** → **Runtime toggle, both stylesheets loaded.** Both `tokens.css` files are loaded once; the active brand is selected via a `data-brand` attribute on the root element. Step 2 will design how each file is scoped under its `[data-brand="…"]` selector so they coexist without collision.
2. **Alias layer** → **Yes — thin neutral layer.** Component CSS references brand-agnostic vars (e.g. `--color-background-primary`, `--font-family-base`, `--radius-md`) which resolve to the active brand's semantic tokens. Components never reference `--carentan-…` / `--railyard-…` directly.
3. **Filenames** → **Keep `tokens.css` per brand folder** (`src/tokens/carentan/tokens.css`, `src/tokens/railyard/tokens.css`) so the source repo can be re-synced cleanly.

## Verification for step 1
- ✅ Both files located and fetched (raw URLs above resolve).
- ✅ Full variable list captured for both brands.
- ✅ Structural diff completed; the only meaningful divergence is the primitive-border-radius scale, which is mitigated by consuming semantic radii.

## Step 1 status: ✅ APPROVED

---

# Step 2 — Project structure, token integration & brand-switching mechanism

## Context
With token shape understood and decisions captured, step 2 stands up the empty Vite + React shell, vendors the two `tokens.css` files in a way that lets both coexist under `data-brand` selectors, defines the neutral alias layer that components will consume, and wires the brand toggle. No screen-specific UI is built yet — that starts in step 3 (components) and step 4 (assembly). The deliverable of step 2 is: open the dev server, see a near-empty page with a working brand toggle that visibly changes background, text color, and font family.

## Stack & dependencies
- **Build**: Vite (`vite`), React 18 (`react`, `react-dom`), TypeScript (`typescript`, `@types/react`, `@types/react-dom`)
- **Deploy** (used in step 5): `gh-pages`
- **No CSS framework, no CSS-in-JS** — plain `.css` files only, per the rules.

## Project layout
```
DEMO/
├── index.html                          # Google Fonts <link> for Inter + Space Mono
├── package.json
├── tsconfig.json
├── vite.config.ts                      # base: '/<repo-name>/' for GH Pages
├── .gitignore
├── README.md
├── scripts/
│   └── sync-tokens.mjs                 # fetch + scope upstream tokens.css
├── public/
└── src/
    ├── main.tsx                        # mounts <App />
    ├── App.tsx                         # brand state + toggle, screen slot
    ├── lib/
    │   └── useBrand.ts                 # hook: returns [brand, setBrand]; writes data-brand to <html>
    ├── tokens/
    │   ├── index.css                   # imports both scoped tokens + aliases (single entry)
    │   ├── carentan/
    │   │   └── tokens.css              # vendored + scoped under [data-brand="carentan"]
    │   ├── railyard/
    │   │   └── tokens.css              # vendored + scoped under [data-brand="railyard"]
    │   └── aliases.css                 # neutral alias layer (the contract for components)
    ├── styles/
    │   └── reset.css                   # minimal reset; box-sizing, body bg/color via aliases
    ├── components/                     # (empty in step 2; filled in step 3)
    └── screens/                        # (empty in step 2; filled in step 4)
```

## Token integration mechanism

### 2.1 Vendoring & scoping (`scripts/sync-tokens.mjs`)
The upstream files declare variables on `:root { … }`. With both files loaded, the second one's `:root` would silently overwrite the first. To make `data-brand` actually do the selecting, each file must have its `:root` rewritten to a brand-scoped selector.

A 30-line Node script:
1. Fetches both raw URLs:
   - `https://raw.githubusercontent.com/marcinkwiatkowski605/Harbor-Token-System/main/dist/carentan/tokens.css`
   - `https://raw.githubusercontent.com/marcinkwiatkowski605/Harbor-Token-System/main/dist/railyard/tokens.css`
2. Replaces the first `:root` selector with `[data-brand="carentan"], :root[data-brand="carentan"]` (and same for railyard). The fallback `:root[data-brand=…]` form lets the variables apply when the attribute is on `<html>` itself.
3. Writes to `src/tokens/<brand>/tokens.css`.

Exposed as `npm run sync-tokens`. Output is committed (so GH Pages deploy stays static and doesn't need the script at build time).

### 2.2 Aliases (`src/tokens/aliases.css`) — the contract for components
Defined under `[data-brand="carentan"]` and `[data-brand="railyard"]` blocks. Components reference **only** these neutral names, never `--carentan-…` / `--railyard-…`.

Initial alias surface (extended as step-3 components reveal more needs):

| Neutral alias | Carentan source | Railyard source |
|---|---|---|
| `--font-family-base` | `--carentan-primitive-font-family-inter` | `--railyard-primitive-font-family-spacemono` |
| `--color-surface-base` | `--carentan-semantic-color-surface-base` | `--railyard-semantic-color-surface-base` |
| `--color-surface-subtle` | `--carentan-semantic-color-surface-subtle` | `--railyard-semantic-color-surface-subtle` |
| `--color-bg-neutral` | `--carentan-semantic-color-background-neutral` | `--railyard-semantic-color-background-neutral` |
| `--color-bg-brand-default` | `--carentan-semantic-color-background-brand-default` | `--railyard-semantic-color-background-brand-default` |
| `--color-bg-brand-hover` / `-active` / `-selected` | corresponding carentan token | corresponding railyard token |
| `--color-text-primary` / `-secondary` / `-inverse` / `-placeholder` / `-link` / `-disabled` / `-on-brand` | `--carentan-semantic-color-text-…` | `--railyard-semantic-color-text-…` |
| `--color-border-default` / `-active` / `-focus` / `-error` | `--carentan-semantic-color-border-…` | `--railyard-semantic-color-border-…` |
| `--color-icon-default` / `-on-brand` / `-disabled` | `--carentan-semantic-color-icon-…` | `--railyard-semantic-color-icon-…` |
| `--radius-1` … `--radius-7`, `--radius-none`, `--radius-circle` | `--carentan-semantic-border-radius-…` | `--railyard-semantic-border-radius-…` |
| `--space-4`, `-8`, `-12`, `-16`, `-24`, `-32`, `-40`, `-48`, `-64`, `-80`, `-96`, `-128` | `--carentan-global-space-…` | `--railyard-global-space-…` |
| Type composites: `--font-heading-{xxl,xl,lg,md,sm,xsm,xxs}-*`, `--font-body-{lg,md,sm}-*`, `--font-title-{lg,md,sm}-*`, `--font-label-{lg,md,sm}-*` (each with `-family`, `-weight`, `-size`, `-line-height`, `-letter-spacing`, `-text-case`) | `--carentan-semantic-{role}-{size}-{prop}` | `--railyard-semantic-{role}-{size}-{prop}` |

Status/support colors (`error`, `warning`, `success`, `info`) are added on demand when a component needs them.

### 2.3 Single entry point (`src/tokens/index.css`)
```css
@import './carentan/tokens.css';
@import './railyard/tokens.css';
@import './aliases.css';
```
Imported once from `main.tsx`. Both brands' raw tokens are present in the document; `aliases.css` is the only file components ever indirectly touch.

## Brand-switching mechanism

`src/lib/useBrand.ts`:
```ts
export type Brand = 'carentan' | 'railyard';
export function useBrand(initial: Brand = 'carentan') { … }
```
- Holds `brand` in `useState`.
- `useEffect` writes `document.documentElement.setAttribute('data-brand', brand)` whenever it changes.
- Returns `[brand, setBrand]`.

`App.tsx` reads the hook, renders a temporary inline toggle (a real `ToggleSwitch` component is built in step 3 from Figma). The toggle calls `setBrand(brand === 'carentan' ? 'railyard' : 'carentan')`. `<html data-brand="carentan">` is the initial state in `index.html`.

## Font loading
Both fonts loaded eagerly in `index.html` via Google Fonts `<link>` so a brand swap doesn't trigger a font fetch and FOIT/FOUT:
```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
```

## Reset (`src/styles/reset.css`)
Minimal: `*, *::before, *::after { box-sizing: border-box; }`, margin/padding zero on `html, body`, `body { background: var(--color-surface-base); color: var(--color-text-primary); font-family: var(--font-family-base); }`.

## Critical files to create in step 2
- `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `.gitignore`, `README.md`
- `scripts/sync-tokens.mjs`
- `src/main.tsx`, `src/App.tsx`
- `src/lib/useBrand.ts`
- `src/tokens/index.css`, `src/tokens/aliases.css`
- `src/tokens/carentan/tokens.css`, `src/tokens/railyard/tokens.css` (produced by `npm run sync-tokens`)
- `src/styles/reset.css`

## Existing utilities to reuse
None — fresh repo. Token files in the source repo are reused verbatim (only `:root` selector is rewritten).

## Verification (end-to-end)
1. `npm install`, `npm run sync-tokens`, `npm run dev`.
2. Page renders with a body background and text color; default font is Inter.
3. Click the brand toggle: background, text color, and font family change to Railyard's values; no reload, no flicker.
4. DevTools → Elements: `<html data-brand="carentan">` flips to `data-brand="railyard"`.
5. DevTools → Network: both `tokens.css` files load exactly once at app start.
6. Computed styles on `<body>`: `background-color` resolves through `--color-surface-base` → `var(--carentan-semantic-color-surface-base)` (or railyard equivalent), proving the alias chain.
7. Search the codebase: `grep -r 'var(--carentan-' src/components src/screens` returns zero hits (rule check; passes trivially in step 2 since both folders are empty, but verified again at the end of every later step).

## Step 2 status: APPROVED, execution paused for follow-up interview

---

# Interview decisions (przed wznowieniem step 2)

Następujące wiążące decyzje zostały podjęte podczas dodatkowego wywiadu po zatwierdzeniu step 2. Wszystko poniżej nadpisuje wcześniejsze założenia i obowiązuje przez całą resztę projektu.

## Zakres i UX dema
- **Zakres ekranu:** wyłącznie frame `node-id=40-4443` z Figmy. Bez responsywności, bez dodatkowych ekranów.
- **Toggle marki:** sticky bar na dole viewportu, mały, debug-bar style. Pokazuje tylko nazwy marek i przełącznik — **bez** educational overlay (żadnego "data-brand: ..." czy mapowań tokenów dla widza).
- **Side-by-side:** nie. Tylko jeden ekran z togglem.
- **Persystencja:** brak. Każde wejście startuje od Carentan.
- **Animacja swapu:** brak. Instant change.
- **Interaktywność:** stany wizualne tak (hover/focus/disabled/error), logika nie (formularze nic nie robią po submit).

## Visual fidelity i mapowanie tokenów
- **Tolerancja:** **token-perfect**, nie pixel-perfect. Każdy element musi używać poprawnego tokena; jeśli token daje 24px a Figma rysuje 25px — zostaje 24px.
- **Mapping fallback:** jeśli wartość z Figmy nie matchuje czysto żadnego tokena → **pytam usera za każdym razem przed użyciem**. Bez improwizacji, bez TODO, bez hardkodów.
- **Walidacja per komponent:** główna obawa user'a to złe mapowanie. Po każdym ukończonym komponencie raportuję listę użytych tokenów (alias → źródło per brand) do kontroli przed przejściem dalej.

## Stack i konwencje
- **TypeScript:** strict. Użyć `strict: true`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`.
- **Struktura komponentów:** folder per komponent (`src/components/Button/Button.tsx` + `Button.css` + `index.ts`).
- **Klasy utility typografii:** prefiks `.text-`, np. `.text-heading-xxl`, `.text-body-lg`. Aplikowane przez `className`. Każda klasa ustawia 6 propów (family/weight/size/line-height/letter-spacing/text-case).
- **Ikony:** Lucide/Heroicons jako gotowa biblioteka. Per ikona sprawdzam czy ta z Figmy matchuje standard — jeśli custom, eksportujemy SVG przez MCP.
- **Fonty:** Google Fonts (Inter + Space Mono) załadowane eagerly w `index.html`. Fallback w stacku: `var(--carentan-primitive-font-family-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` dla Carentan; analogicznie z `monospace` dla Railyard.

## A11y
- Focus rings via `--focus-ring` (semantic-focus-ring token).
- Semantic HTML: `<button>`, `<input>`, `<label>`, itd.
- `aria-label` dla icon button'ów.
- `role="switch"` dla toggle'a marki.

## Sync-tokens
- Uruchamiany **ręcznie** (`npm run sync-tokens`), nie automatycznie przed buildem.
- Output committed do repo.
- Zachowanie przy zmianach upstream: **po cichu** nadpisuje pliki (drift widać w `git status`).

## Repo i deploy
- **Repo:** nowe, publiczne, nazwa `harbor-tokens-demo`. URL: `marcinkwiatkowski605.github.io/harbor-tokens-demo`. Vite `base: '/harbor-tokens-demo/'`.
- **Setup repo:** **user tworzy repo na GitHubie sam**. Ja pracuję lokalnie, dodaję remote i pushuję dopiero po jego sygnale.
- **README:** minimalny — 1-2 paragrafy (co to jest + link do dema) + npm scripts.

## Railyard primitive border-radius gap
- Ignorujemy. Komponenty referują wyłącznie `semantic-border-radius-{1..7,none,circle}`. Bez lint check'a, bez issue w upstream repo.

## Co to NIE jest
- Nie portfolio case study (README minimalny).
- Nie kompletna design system docs (tylko jeden ekran).
- Nie produkcyjny kod (forms nie submitują).
- Nie test suite (brak Vitest/RTL na razie).

---

## Step 2 status: APPROVED + decisions locked. Execution wznawiam po sygnale "go".

---

## Mid-step-3 policies (zatwierdzone)

- **Radius conflict policy:** ilekroć Figma rysuje inny `cornerRadius` niż wartość w odpowiednim `--*-component-*-border-radius-*` tokenie, **token wygrywa** bez ponownego pytania. Stosuje się do Button (4px zamiast 8px), Input, Select, Textarea, IconButton.
- **"(optional)" label sub-text:** mapowane na `--color-text-secondary` (#6b6e76) — najbliższy semantic token; #5f5f5f z Figmy traktujemy jako drift.
