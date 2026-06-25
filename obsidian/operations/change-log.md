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

## 2026-06-25 — Aegis remediation for clipboard, accessibility, and repo hygiene

- **Outcome:** Clipboard copy now checks browser support, reports success/failure/unavailable states through accessible status text, and keeps manual copy available. Generic labeled div usage was reduced by using semantic/role-adjusted structures. Tracked `opencode-error.log` was removed without inspecting log contents and `*.log` is ignored.
- **Scope:** `src/App.tsx`, `src/styles.css`, `src/App.test.tsx`, `.gitignore`, `README.md`, and affected Obsidian notes.
- **Validation:** `npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build` passed on 2026-06-25.
- **Notes updated:** [[../architecture/overview|Architecture]], [[../architecture/feature-map|Feature Map]], [[../features/index|Features]], [[../operations/change-log|Change Log]].
- **Limitations:** Copy fallback is guidance-based; the app does not implement legacy clipboard APIs.

