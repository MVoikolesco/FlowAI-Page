# Features

## Landing Page

- Presents FlowAI through a modular React landing page composed from section and component modules.
- Uses Tailwind utility classes and `src/styles/flowai.css` global styles for a warm gold/brown editorial workflow visual direction.
- Covers hero, manifesto, workflow, agents, distributions, terminal, memory graph, CTA, and footer sections.
- Compares `@mvoikolesco/flowai` with `@mvoikolesco/flowai-portable`.
- Provides a copyable primary install command for `@mvoikolesco/flowai`.
- Adds reveal, workflow, terminal, and memory animations with an `IntersectionObserver` fallback for tests/older environments; the hero workflow motor uses the original moving SVG flow particles and the memory graph has animated write activity.
- Restores the original custom cursor with a gold dot, trailing ring, interactive enlargement, and touch/reduced-motion fallback.
- Restores the browser tab icon with the FlowAI circular mark in `public/favicon.svg`.
- Related implementation: `src/App.tsx`, `src/components/`, `src/sections/`, `src/data/content.ts`, `src/hooks/useInView.ts`, `src/styles.css`, `src/styles/flowai.css`, `tailwind.config.js`, `postcss.config.js`, and `src/App.test.tsx`.

## Related notes

- [[../architecture/overview|Architecture]]
- [[../architecture/feature-map|Feature Map]]
- [[../decisions/log|Decision Log]]
