# Architecture

## System Context

Static browser application presenting FlowAI to developers. External destinations are public npm package pages for `@mvoikolesco/flowai` and `@mvoikolesco/flowai-portable`.

## Components

- `src/App.tsx`: compact composition root for the FlowAI landing page, assembling navigation, hero, content sections, cursor, ambient lights, CTA, and footer.
- `src/components/`: reusable presentational and behavior components such as `Reveal`, `CustomCursor`, `SectionTitle`, `WorkflowNode`, `AgentCard`, `Nav`, and `AmbientLights`.
- `src/sections/`: page section modules for hero, manifesto, workflow, agents, distributions, terminal copy interaction, memory graph, CTA, and footer.
- `src/data/content.ts`: typed static content for workflow stages, agents, distributions, manifesto principles, hero index, and memory graph records.
- `src/hooks/useInView.ts`: shared `IntersectionObserver` reveal hook with fallback for non-browser test environments.
- `src/styles.css` and `src/styles/flowai.css`: Tailwind entrypoint/reset plus page-specific global visual rules moved out of JSX.
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

