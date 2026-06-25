# Architecture

## System Context

Static browser application presenting FlowAI to developers. External destinations are public npm package pages for `@mvoikolesco/flowai` and `@mvoikolesco/flowai-portable`.

## Components

- `src/App.tsx`: reusable in-file React sections for header, progressive hero, abstract study-room/workflow visuals, benefits, animated workflow, package comparison, terminal install blocks with FlowAI states, operational principles, CTA, footer, scroll reveal behavior, and fine-pointer custom cursor.
- `src/styles.css`: global warm academic/workshop visual system, responsive layout, ambient and functional transform/opacity animations, accessible focus states, custom cursor rules, and `prefers-reduced-motion` behavior.
- `src/App.test.tsx`: content, package-link, FlowAI terminal-state, and copy-button coverage for success, unavailable Clipboard API, and rejected clipboard writes.

## Data Flow

The page is static except terminal copy buttons. Each terminal block joins command strings, checks for `navigator.clipboard.writeText`, writes when available, and exposes success, unsupported, or failure feedback through a visible `role="status"` live region.

The custom cursor is decorative and enabled only for fine hover pointers when reduced motion is not requested; it uses `pointer-events: none` and leaves touch/reduced-motion users with the native cursor.

## Runtime and Deployment

Built with Vite as a client-only static bundle. Validation uses `npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build`.

## Related Notes

- [[Project Overview]]
- [[Decision Log]]
- [[Feature Map]]

