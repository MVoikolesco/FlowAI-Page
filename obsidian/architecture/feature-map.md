# Feature Map

## Implemented Features

- Modern responsive FlowAI landing page with warm mustard/gold/amber/cream/black academic workshop visual direction.
- Semantic sections: header/nav/npm link, hero with CTA and abstract study-room/workflow visual, benefits, animated workflow sequence, package comparison, installation terminal blocks, operational principles, final CTA, and MIT/npm footer.
- Functional copy buttons for the complete and portable installation command blocks, including manual-copy guidance when Clipboard API support is unavailable or writing fails.
- FlowAI-specific visuals cover workflow diagram, abstract stage seals, agent connection patterns, Obsidian memory representation, records/evidence/checkpoints, and terminal states (`READING_RULES`, `PLANNING`, `IMPLEMENTING`, `VALIDATING`, `UPDATING_MEMORY`, `COMPLETED`).
- Accessibility-oriented structure with landmarks, semantic lists for workflow visuals, labeled navigation/groups, keyboard focus styles, live copy status, contrast-conscious colors, reduced-motion handling, and a decorative cursor disabled for touch/reduced-motion contexts.

## Important Flows

- Visitor scans the hero, benefits, and workflow: `Solicitação → Classificação → Planejamento → Implementação → Validação → Memória`.
- Visitor compares `@mvoikolesco/flowai` for OpenCode projects with `@mvoikolesco/flowai-portable` for agents that read `AGENTS.md`.
- Visitor copies installation commands from a terminal card; success changes the button to `Copiado` and announces the outcome, while unsupported or failed copy attempts keep the commands visible and provide manual-copy guidance.

## Known Limitations

The page is static and does not implement fallback copy mechanisms beyond visible manual-copy guidance. No backend, analytics, or live package metadata fetch is implemented.

## Related Notes

- [[Architecture]]
- [[Change Log]]

