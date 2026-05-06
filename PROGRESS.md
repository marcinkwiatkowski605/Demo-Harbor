# Project Progress

## Completed components

- **BrandToggle** — sticky bottom bar with Carentan/Railyard switch (debug bar). Files: `src/components/BrandToggle/{BrandToggle.tsx,BrandToggle.css,index.ts}`. Tokens: `--space-{4,8,12,16}`, `--color-bg-neutral`, `--color-bg-neutral-subtle`, `--color-border-default`, `--color-border-default-subtle`, `--color-text-secondary`, `--color-bg-brand-default`, `--color-text-on-brand`, `--radius-circle`, `.text-label-sm`.
- **Button** — primary action button (sizes `lg`/`md`/`sm`, fullWidth, leading/trailing icons, hover/active/disabled). Files: `src/components/Button/{Button.tsx,Button.css,index.ts}`. Tokens: `--button-bg-{default,hover,active,selected}`, `--button-text`, `--button-icon`, `--button-radius-{lg,md,sm}`, `--button-height-{lg,md,sm}`, `--button-padding-{lg,md,sm}`, `--button-gap`, `--button-icon-size`, `--button-opacity-disabled`, `.text-label-lg`.
- **Input** — labeled text input with optional "(optional)" suffix, label/leading/trailing icon slots, helper text, error/disabled states. Files: `src/components/Input/{Input.tsx,Input.css,index.ts}`. Tokens: `--input-bg`, `--input-border-{default,active,error}`, `--input-text-{filled,placeholder}`, `--input-icon`, `--input-radius`, `--input-height`, `--input-icon-size`, `--input-border-width`, `--input-padding-inline`, `--input-gap`, `--input-opacity-disabled`, `--space-4`, `--color-text-{primary,secondary,error}`, `--color-icon-default`, `--focus-ring`, `.text-label-md`, `.text-body-md`, `.text-body-sm`.
- **Select** — labeled combobox-style select with chevron-down, value/placeholder, leading icon slot, helper text, error/disabled states. Implemented as a styled `<button role="combobox">` (presentational). Files: `src/components/Select/{Select.tsx,Select.css,index.ts}`. Tokens: `--select-*` (15 vars), `--space-4`, `--color-text-{primary,secondary,error}`, `--color-icon-default`, `--focus-ring`, `.text-label-md`, `.text-body-md`, `.text-body-sm`. Uses `lucide-react/ChevronDown`.
- **Textarea** — labeled multi-line text field with optional flag, helper text + icon, character counter (`showCounter` + `maxLength`), error/disabled states. Files: `src/components/Textarea/{Textarea.tsx,Textarea.css,index.ts}`. Tokens: `--textarea-bg`, `--textarea-border-{default,active,error}`, `--textarea-text-{filled,placeholder}`, `--textarea-radius`, `--textarea-border-width`, `--textarea-min-height`, `--textarea-padding-{inline,block}`, `--textarea-opacity-disabled`, `--input-icon-size` (reused — no textarea icon-size token in upstream), `--space-{4,8,16}`, `--color-text-{primary,secondary,error}`, `--focus-ring`, `.text-label-md`, `.text-body-md`, `.text-body-sm`. Uses `lucide-react/Info` for helper-text icon.
- **IconButton** — icon-only button (sizes `lg`/`md`/`sm`, hover/active/selected/disabled states). Figma: size `sm` (32×32), icons `Search` + `Bell` from `lucide-react` (20×20, `strokeWidth={1.5}`). Files: `src/components/IconButton/{IconButton.tsx,IconButton.css,index.ts}`. Tokens: `--icon-button-bg-{default,hover,active,selected}`, `--icon-button-icon-{default,hover,active,selected}`, `--icon-button-radius-{lg,md,sm}`, `--icon-button-size-{lg,md,sm}`, `--icon-button-icon-size`, `--icon-button-opacity-disabled`. Carentan radius-sm=2px, Railyard radius-sm=0px — brand swap verified.

- **CoverPhoto** — image placeholder (504×157.5px, aspect-ratio 16/5, `object-fit: cover`). Files: `src/components/CoverPhoto/{CoverPhoto.tsx,CoverPhoto.css,index.ts}`. Tokens: `--radius-2` (Figma cornerRadius 8 → no 8px token; user chose --radius-2 = 4px/0px), `--color-bg-neutral-subtle` (placeholder bg). Brand swap verified: Carentan 4px, Railyard 0px.

- **ProgressBar** — pasek postępu z labels row (label + counter + Info icon), track + fill, motivational text. Files: `src/components/ProgressBar/{ProgressBar.tsx,ProgressBar.css,index.ts}`. Tokens: `--color-bg-neutral-subtle` (track), `--color-bg-brand-default` (fill), `--radius-2` (track), `--radius-circle` (fill), `--color-text-{primary,secondary}`, `--color-icon-default`, `--space-{4,8}`. Uses `lucide-react/Info`. No component-level tokens (semantic only).

## Assembled screen

- **FormCard** (node 37:1657 "Form 1.2") — assembled card with CoverPhoto, ProgressBar, Input, Select, Textarea, Button. Files: `src/screens/FormCard/{FormCard.tsx,FormCard.css,index.ts}`. Tokens: `--color-bg-neutral` (card bg), `--color-border-default-subtle` (border), `--radius-7` (24px/0px), `--space-24` (padding + content/fields gaps), `--space-16` (header gap), `--space-8` (hero + section gaps), `--color-text-primary` (headings), `--color-text-secondary` (body). Typography: `.text-heading-xxs` (28px title), `.text-title-lg` (24px section), `.text-body-lg` (16px body). Brand swap verified: Railyard → 0px radius + Space Mono font. New aliases added to `aliases.css`: `font-heading-{xsm,xxs}`, `font-title-{lg,md,sm}` (both brand blocks) + utility classes `.text-heading-{xsm,xxs}`, `.text-title-{lg,md,sm}`.

## Current status

**Step 4 ukończony.** FormCard zmontowany i zweryfikowany. App.tsx pokazuje tylko FormCard + BrandToggle.

## Token mapping decisions

- **Radius conflict policy** — Figma `cornerRadius: 8` vs `--component-*-border-radius-*` tokens at `4px`/`0px`. **Token wins globally** for Button, Input, Select, Textarea, IconButton — no further questions.
- **"(optional)" sub-label color** — Figma `#5f5f5f` (no token match) → `--color-text-secondary` (`#6b6e76`). Closest semantic token; #5f5f5f treated as Figma drift.
- **`#383838` heading/title color** — Figma drift → `--color-text-primary` (`#292a2e`). Decided in FormCard step.
- **Component aliases architecture** — neutral aliases mirror token system layers. Component CSS references `--button-*` / `--input-*` / `--select-*` / `--textarea-*` (component-tier aliases), never raw `--carentan-*` / `--railyard-*`. Each new component adds its tier-aliases to `src/tokens/aliases.css` for both brands.
- **Per-brand component differences** — `--component-button-border-radius-lg` is `4px` in Carentan, `0px` in Railyard. Same component code renders rounded in Carentan, sharp in Railyard — by design.
- **Helper-icon size in Textarea** — upstream has no `--component-textarea-icon-sizing-*` token. Reusing `--input-icon-size` (20px in both brands, same as all other component icon sizes) for the helper-text icon row.
- **Resize handle** — Figma shows a custom 6-dot SVG resize handle. We rely on the browser's native `resize: vertical` (CSS) which provides equivalent functionality. The visual differs (browser default chevron) but is token-agnostic and accessible.
- **Counter color** — `0/120` counter rendered with `--color-text-primary` (per Figma) while helper text on the same row uses `--color-text-secondary`. Designed asymmetry, not a token conflict.
- **Icons library** — `lucide-react` (v1.14.0). Used: `ChevronDown` (Select), `Info` (Textarea helper + ProgressBar).

## To resume in a new session

1. Read this file first.
2. Read `src/tokens/carentan/tokens.css` and `src/tokens/railyard/tokens.css` (vendored, scoped under `[data-brand="<brand>"]`).
3. Read `role-you-are-a-sleepy-emerson.md` (project root) for full plan & locked decisions.
4. FormCard assembled. Next steps TBD with user.
