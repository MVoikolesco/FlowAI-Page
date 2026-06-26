# Feature Map

## Implemented Features

- Responsive FlowAI landing page rebuilt from the provided `App.tsx` attachment.
- Tailwind-powered layout utilities with page-specific visual styles injected from `src/App.tsx`.
- Sections: fixed nav/npm link, hero, workflow visualization, manifesto, six-stage workflow trail, six agent cards, package comparison, animated terminal, memory graph, final CTA, and footer.
- Main copy button writes `npm install @mvoikolesco/flowai` and temporarily changes to `copiado`.
- Workflow visualization includes the original moving SVG flow particles using `animateMotion` over the five workflow paths.
- Memory graph visualization includes animated dashed write connection, pulsing root/new-memory nodes, writing status text, and graph corner marks.
- Custom cursor restores the original gold dot and trailing ring interaction on fine pointers, expanding over links/buttons and disabling itself for touch or reduced-motion contexts.
- Browser tab icon is restored via `public/favicon.svg`, matching the circular FlowAI mark used in the page navigation/footer.
- Reveal animations use `IntersectionObserver` with a test/legacy fallback.

## Important Flows

- Visitor scans the hero, benefits, and workflow: `Solicitação → Classificação → Planejamento → Implementação → Validação → Memória`.
- Visitor compares `@mvoikolesco/flowai` for OpenCode projects with `@mvoikolesco/flowai-portable` for agents that read `AGENTS.md`.
- Visitor copies the primary FlowAI installation command from the terminal; success changes the button to `copiado`.

## Known Limitations

The page is static and does not implement backend, analytics, live package metadata fetches, or detailed clipboard failure messaging beyond preserving the button state.

## Related Notes

- [[Architecture]]
- [[Change Log]]

