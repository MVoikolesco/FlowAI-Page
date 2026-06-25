# Feature Map

## Implemented Features

- Modern responsive FlowAI landing page with dark blue/violet/cyan visual direction.
- Semantic sections: header/nav/npm link, hero with CTA and workflow visual, benefits, workflow sequence, package comparison, installation terminal blocks, operational principles, final CTA, and MIT/npm footer.
- Functional copy buttons for the complete and portable installation command blocks, including manual-copy guidance when Clipboard API support is unavailable or writing fails.
- Accessibility-oriented structure with landmarks, semantic lists for workflow visuals, labeled navigation/groups, keyboard focus styles, live copy status, contrast-conscious colors, and reduced-motion handling.

## Important Flows

- Visitor scans the hero, benefits, and workflow: `Solicitação → Classificação → Planejamento → Implementação → Validação → Memória`.
- Visitor compares `@mvoikolesco/flowai` for OpenCode projects with `@mvoikolesco/flowai-portable` for agents that read `AGENTS.md`.
- Visitor copies installation commands from a terminal card; success changes the button to `Copiado` and announces the outcome, while unsupported or failed copy attempts keep the commands visible and provide manual-copy guidance.

## Known Limitations

The page is static and does not implement fallback copy mechanisms beyond visible manual-copy guidance. No backend, analytics, or live package metadata fetch is implemented.

## Related Notes

- [[Architecture]]
- [[Change Log]]

