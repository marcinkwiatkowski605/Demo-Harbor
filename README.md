# Harbor Tokens — Demo

Coded demo of a Figma screen showing multi-brand token switching. Two brands (Carentan, Railyard) share component code; only the loaded CSS token file changes.

**Live demo:** https://marcinkwiatkowski605.github.io/demo-harbor/

Tokens are vendored from [marcinkwiatkowski605/Harbor-Token-System](https://github.com/marcinkwiatkowski605/Harbor-Token-System).

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run sync-tokens` — refetch upstream `tokens.css` for both brands and rewrite into `src/tokens/<brand>/tokens.css`
- `npm run deploy` — build + push to GitHub Pages
