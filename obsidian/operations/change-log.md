# Change Log

Record meaningful changes using this structure:

## YYYY-MM-DD — Change title

- **Outcome:** What changed for users or operators.
- **Scope:** Components and paths affected.
- **Validation:** Commands and observed results.
- **Notes updated:** Related vault notes.
- **Limitations:** Remaining constraints or risks.

## 2026-06-25 — FlowAI landing page implementation

- **Outcome:** Replaced the scaffold with a complete accessible, responsive React+TypeScript landing page for FlowAI, including package comparison and copyable installation commands.
- **Scope:** `src/App.tsx`, `src/styles.css`, `src/App.test.tsx`, and affected Obsidian notes.
- **Validation:** `npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build` passed.
- **Notes updated:** [[../architecture/project-overview|Project Overview]], [[../architecture/overview|Architecture]], [[../architecture/feature-map|Feature Map]], [[../features/index|Features]], [[../decisions/log|Decision Log]].
- **Limitations:** The page is static and relies on browser clipboard support for copy actions.

