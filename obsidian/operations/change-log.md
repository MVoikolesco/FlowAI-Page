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

## 2026-06-26 — Rebuilt React app from provided App.tsx

- **Outcome:** Replaced the existing landing page with the provided React `App.tsx` experience and wired the project to render it through Vite.
- **Scope:** `src/App.tsx`, `src/main.tsx`, `src/styles.css`, `src/App.test.tsx`, `tailwind.config.js`, `postcss.config.js`, `package.json`, `package-lock.json`, and affected Obsidian notes.
- **Validation:** `npm run typecheck`, `npm run lint`, `npm test` (3 tests), and `npm run build` passed on 2026-06-26.
- **Notes updated:** [[../architecture/project-overview|Project Overview]], [[../architecture/overview|Architecture]], [[../architecture/feature-map|Feature Map]], [[../features/index|Features]], [[../decisions/log|Decision Log]].
- **Limitations:** Build produced Rolldown plugin timing warnings only; no browser screenshot pass was run.

## 2026-06-26 — Restored workflow motor flow animation

- **Outcome:** Restored the original moving SVG flow particles in the "motor de workflow · representação viva" hero visualization.
- **Scope:** `src/App.tsx` plus affected feature notes.
- **Validation:** `npm run typecheck`, `npm run lint`, `npm test` (3 tests), and `npm run build` passed on 2026-06-26.
- **Notes updated:** [[../architecture/feature-map|Feature Map]], [[../features/index|Features]], [[../operations/change-log|Change Log]].
- **Limitations:** Build produced Rolldown plugin timing warnings only; no browser screenshot pass was run.

## 2026-06-26 — Restored memory graph activity animation

- **Outcome:** Restored animated activity in the "O projeto lembra de si" memory graph with a dashed write connection, pulsing root and new-memory nodes, writing status text, and corner marks.
- **Scope:** `src/App.tsx` plus affected feature notes.
- **Validation:** `npm run typecheck`, `npm run lint`, `npm test` (3 tests), and `npm run build` passed on 2026-06-26.
- **Notes updated:** [[../architecture/feature-map|Feature Map]], [[../features/index|Features]], [[../operations/change-log|Change Log]].
- **Limitations:** Build produced a Rolldown `vite:css` plugin timing warning only; no browser screenshot pass was run.

## 2026-06-26 — Restored original custom cursor

- **Outcome:** Restored the original custom cursor behavior with a gold dot, trailing ring, and active enlargement over interactive elements.
- **Scope:** `src/App.tsx` plus affected feature notes.
- **Validation:** `npm run typecheck`, `npm run lint`, `npm test` (3 tests), and `npm run build` passed on 2026-06-26.
- **Notes updated:** [[../architecture/feature-map|Feature Map]], [[../features/index|Features]], [[../operations/change-log|Change Log]].
- **Limitations:** Cursor is intentionally disabled for touch/coarse pointers and reduced-motion contexts; build produced a Rolldown `vite:css` plugin timing warning only.

## 2026-06-26 — Restored browser tab icon

- **Outcome:** Added the FlowAI circular mark as the browser tab icon and linked it from `index.html`.
- **Scope:** `index.html`, `public/favicon.svg`, and affected feature notes.
- **Validation:** `npm run build` passed and `curl.exe -I http://127.0.0.1:5173/favicon.svg` returned `HTTP/1.1 200 OK` with `Content-Type: image/svg+xml`.
- **Notes updated:** [[../architecture/feature-map|Feature Map]], [[../features/index|Features]], [[../operations/change-log|Change Log]].
- **Limitations:** Favicon is SVG-only; no `.ico` fallback was added.

