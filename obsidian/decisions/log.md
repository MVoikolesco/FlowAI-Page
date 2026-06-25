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

