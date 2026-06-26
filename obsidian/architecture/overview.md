# Architecture

## System Context

Static browser application presenting FlowAI to developers. External destinations are public npm package pages for `@mvoikolesco/flowai` and `@mvoikolesco/flowai-portable`.

## Components

- `src/App.tsx`: provided single-file React landing page with header/nav, hero, animated workflow trail, agent cards, package comparison, terminal copy interaction, memory graph, CTA, footer, injected global visual styles, and an `IntersectionObserver` reveal hook with fallback for non-browser test environments.
- `src/styles.css`: Tailwind entrypoint plus minimal global resets; most page-specific visual rules are injected by `src/App.tsx`.
- `tailwind.config.js` and `postcss.config.js`: Tailwind v3/PostCSS configuration for Vite builds.
- `src/App.test.tsx`: smoke coverage for the provided page content, workflow/agent labels, npm package link, and main copy button.

## Data Flow

The page is static except the terminal copy button and reveal animations. The copy button writes `npm install @mvoikolesco/flowai` through `navigator.clipboard.writeText` when available and shows a temporary copied state.

Reveal sections subscribe to `IntersectionObserver`; when unavailable, they mark themselves visible asynchronously so tests and older environments can render the page without throwing.

## Runtime and Deployment

Built with Vite as a client-only static bundle. Validation uses `npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build`.

## Related Notes

- [[Project Overview]]
- [[Decision Log]]
- [[Feature Map]]

