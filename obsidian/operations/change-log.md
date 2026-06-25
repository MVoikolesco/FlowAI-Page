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

## 2026-06-25 — Scoped warm FlowAI visual redesign

- **Outcome:** Redesigned the landing page with a warm academic/workshop/futuristic atmosphere, custom fine-pointer cursor, FlowAI-specific workflow/terminal/memory visuals, responsive layouts, and reduced-motion-safe functional animations while preserving Portuguese product content, npm links, and clipboard feedback states.
- **Scope:** `src/App.tsx`, `src/styles.css`, `src/App.test.tsx`, and affected Obsidian notes.
- **Validation:** `npm run typecheck`, `npm run lint`, `npm run test` (6 tests), and `npm run build` passed on 2026-06-25.
- **Notes updated:** [[../architecture/overview|Architecture]], [[../architecture/feature-map|Feature Map]], [[../features/index|Features]], [[../decisions/log|Decision Log]], [[../operations/change-log|Change Log]].
- **Limitations:** Responsiveness was validated through CSS breakpoints and automated build/test checks, not through a browser screenshot pass in this environment.

