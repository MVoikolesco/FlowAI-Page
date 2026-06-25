# Architecture

## System Context

Static browser application presenting FlowAI to developers. External destinations are public npm package pages for `@mvoikolesco/flowai` and `@mvoikolesco/flowai-portable`.

## Components

- `src/App.tsx`: reusable in-file React sections for header, hero, benefits, workflow, package comparison, terminal install blocks, operational principles, CTA, and footer, with section headings connected to landmarks through `aria-labelledby`.
- `src/styles.css`: global visual system, responsive layout, accessible focus states, dark tech aesthetic, and `prefers-reduced-motion` behavior.
- `src/App.test.tsx`: content and copy-button coverage for success, unavailable Clipboard API, and rejected clipboard writes.

## Data Flow

The page is static except terminal copy buttons. Each terminal block joins command strings, checks for `navigator.clipboard.writeText`, writes when available, and exposes success, unsupported, or failure feedback through a visible `role="status"` live region.

## Runtime and Deployment

Built with Vite as a client-only static bundle. Validation uses `npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build`.

## Related Notes

- [[Project Overview]]
- [[Decision Log]]
- [[Feature Map]]

