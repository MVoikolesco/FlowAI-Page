# Decision Log

Record durable decisions using this structure:

## YYYY-MM-DD — Decision title

- **Context:** Why a decision was required.
- **Decision:** What was chosen.
- **Rationale:** Why this option was selected.
- **Consequences:** Benefits, costs, risks, and follow-up work.
- **Affected paths:** Relevant repository paths.
- **Related notes:** Links such as [[Architecture]] or [[Feature Map]].

## 2026-06-25 — Static React landing page with in-file components

- **Context:** The landing page needed a complete responsive implementation without adding dependencies.
- **Decision:** Keep reusable presentation components inside `src/App.tsx` and the visual system in `src/styles.css`.
- **Rationale:** The current app is a focused single-page experience; local components keep the increment small while preserving testability.
- **Consequences:** Future growth may justify extracting components, but current behavior remains easy to inspect and validate.
- **Affected paths:** `src/App.tsx`, `src/styles.css`, `src/App.test.tsx`.
- **Related notes:** [[../architecture/overview|Architecture]], [[../architecture/feature-map|Feature Map]].

## 2026-06-25 — Dependency-light visual redesign

- **Context:** The landing page needed a scoped redesign with custom visuals, animation, and cursor behavior while preserving verified Portuguese FlowAI content and existing clipboard behavior.
- **Decision:** Keep the redesign in `src/App.tsx` and `src/styles.css` using React hooks, CSS transforms/opacity, media queries, and no new runtime dependencies.
- **Rationale:** The app is a static single-page surface; dependency-free components and CSS keep behavior inspectable, responsive, accessible, and easy to test.
- **Consequences:** Rich visuals remain tied to the landing page implementation; future page expansion may warrant extracting visual components.
- **Affected paths:** `src/App.tsx`, `src/styles.css`, `src/App.test.tsx`.
- **Related notes:** [[../architecture/overview|Architecture]], [[../architecture/feature-map|Feature Map]], [[../features/index|Features]].

## 2026-06-26 — Rebuild around provided Tailwind-style App component

- **Context:** The project needed to be rebuilt from a provided `App.tsx` attachment, and the user allowed fully cleaning the existing implementation.
- **Decision:** Replace the previous landing page implementation with the provided single-file React component, add Tailwind CSS/PostCSS for its utility classes, and keep project CSS as a minimal Tailwind entrypoint.
- **Rationale:** The provided component depends on Tailwind-style utilities; adding Tailwind preserves the intended layout and avoids manually recreating a utility framework in local CSS.
- **Consequences:** The page is now driven mostly by `src/App.tsx`, including injected global styles. Future visual edits should account for both Tailwind classes and the in-component `<style>` block.
- **Affected paths:** `src/App.tsx`, `src/main.tsx`, `src/styles.css`, `src/App.test.tsx`, `tailwind.config.js`, `postcss.config.js`, `package.json`, `package-lock.json`.
- **Related notes:** [[../architecture/overview|Architecture]], [[../architecture/feature-map|Feature Map]], [[../features/index|Features]].

