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

