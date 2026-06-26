export interface HeroWorkflowItem {
  num: string;
  label: string;
  tag: string;
  highlight?: boolean;
}

export interface WorkflowStage {
  num: string;
  label: string;
  title: string;
  desc: string;
  code: string;
  side: "left" | "right";
  highlight?: boolean;
}

export interface Agent {
  span: string;
  role: string;
  name: string;
  desc: string;
  stage: string;
  svg: string;
  highlight?: boolean;
}

export interface Distribution {
  pkg: string;
  type: "integrado" | "agnóstico";
  desc: string;
  features: string[];
}

export interface ManifestoPrinciple {
  n: string;
  t: string;
  d: string;
  highlight?: boolean;
}

export interface MemoryNode {
  x: number;
  y: number;
  r: number;
  l: string;
}

export interface RecentRecord {
  time: string;
  agent: string;
  text: string;
}

export const heroWorkflowIndex: HeroWorkflowItem[] = [
  { num: "01°", label: "Solicitação", tag: "entry" },
  { num: "02°", label: "Classificação", tag: "triage" },
  { num: "03°", label: "Planejamento", tag: "plan" },
  { num: "04°", label: "Implementação", tag: "build" },
  { num: "05°", label: "Validação", tag: "verify" },
  { num: "06°", label: "Memória", tag: "durable", highlight: true },
];

export const mobileWorkflowLabels = ["Solicitação", "Classificação", "Planejamento", "Implementação", "Validação"];

export const workflowStages: WorkflowStage[] = [
  { num: "01°", label: "entry · solicitação", title: "Solicitação", desc: "A intenção humana entra no sistema como texto, contexto e restrições. Nada é executado ainda — apenas recebido e armazenado com fidelidade.", code: "// input\nrequest → { intent, scope, context }", side: "right" },
  { num: "02°", label: "triage · classificação", title: "Classificação", desc: "O Nexus examina a solicitação e a classifica: tipo de tarefa, domínio, complexidade, arquivos provavelmente envolvidos, riscos antecipados.", code: "// classify\ntype: refactor · risk: low", side: "left" },
  { num: "03°", label: "plan · planejamento", title: "Planejamento", desc: "O Scout mapeia o território: arquivos a tocar, arquivos a preservar, ordem de operações, critérios de conclusão. Um plano vira objeto verificável.", code: "// plan\nsteps: [edit, test, verify, document]", side: "right" },
  { num: "04°", label: "build · implementação", title: "Implementação", desc: "O Forge executa o plano em passos controlados. Cada alteração é small, revisável e reversível. Nada é feito em lote cego.", code: "// build\npatch → file.ts · status: applied", side: "left" },
  { num: "05°", label: "verify · validação", title: "Validação", desc: "O Aegis submete o trabalho a critérios objetivos: testes, tipos, compilação, lint, contratos. Sem verde, não há sucesso — há hipótese.", code: "// verify\ntests: 24/24 · types: clean", side: "right" },
  { num: "06°", label: "durable · memória", title: "Memória", desc: "O Patch escreve o que foi aprendido: decisões tomadas, contextos preservados, atalhos descobertos. O projeto fica mais inteligente a cada ciclo.", code: "// remember\nmemory → AGENTS.md · status: persisted", side: "left", highlight: true },
];

export const manifestoPrinciples: ManifestoPrinciple[] = [
  { n: "01°", t: "Entender antes de editar.", d: "Toda solicitação é classificada por intenção, escopo e contexto antes de qualquer linha ser tocada." },
  { n: "02°", t: "Planejar antes de implementar.", d: "Um plano explícito substitui adivinhações. Etapas, arquivos afetados e riscos são nomeados antes da execução." },
  { n: "03°", t: "Preservar o trabalho existente.", d: "O código que já funciona é patrimônio. Mudanças propõem-se sobre o que existe, nunca contra." },
  { n: "04°", t: "Validar antes de declarar sucesso.", d: "Nenhuma tarefa é concluída sem evidência. Testes, compilação e critérios objetivos sustentam cada conclusão." },
  { n: "05°", t: "Registrar conhecimento durável.", d: "Decisões, contextos e aprendizados são escritos em memória de projeto — acessíveis às próximas execuções." },
  { n: "06°", t: "Pedir autorização antes de ações sensíveis.", d: "Operações irreversíveis passam por um portão. Autonomia não significa licença para agir sem consentimento.", highlight: true },
];

export const agents: Agent[] = [
  { span: "lg:col-span-5", role: "classificador", name: "Nexus", desc: "Recebe a solicitação e a decompõe em tipo, escopo, risco e contexto. É a porta de entrada — onde a intenção vira estrutura.", stage: "etapa 01 · classificação", svg: `<svg width="56" height="56" viewBox="0 0 56 56" class="agent-symbol"><circle cx="28" cy="28" r="22" fill="none" stroke="#d4af6a" stroke-width="1" opacity="0.4"/><circle cx="28" cy="28" r="14" fill="none" stroke="#d4af6a" stroke-width="1" opacity="0.7"/><circle cx="28" cy="28" r="6" fill="none" stroke="#d4af6a" stroke-width="1.2"/><circle cx="28" cy="28" r="2" fill="#d4af6a"/><line x1="28" y1="2" x2="28" y2="8" stroke="#d4af6a" stroke-width="1"/><line x1="28" y1="48" x2="28" y2="54" stroke="#d4af6a" stroke-width="1"/><line x1="2" y1="28" x2="8" y2="28" stroke="#d4af6a" stroke-width="1"/><line x1="48" y1="28" x2="54" y2="28" stroke="#d4af6a" stroke-width="1"/></svg>` },
  { span: "lg:col-span-4", role: "planejador", name: "Scout", desc: "Explora o código, mapeia dependências e propõe um plano. Sua função é ver antes — antecipar o caminho.", stage: "etapa 02 · planejamento", svg: `<svg width="56" height="56" viewBox="0 0 56 56" class="agent-symbol"><path d="M 28 4 L 33 24 L 52 28 L 33 32 L 28 52 L 23 32 L 4 28 L 23 24 Z" fill="none" stroke="#d4af6a" stroke-width="1.2"/><circle cx="28" cy="28" r="4" fill="#d4af6a"/></svg>` },
  { span: "lg:col-span-3", role: "portão", name: "Gate", desc: "Avalia riscos e pede autorização antes de ações sensíveis.", stage: "etapa 03 · autorização", svg: `<svg width="48" height="48" viewBox="0 0 48 48" class="agent-symbol"><line x1="14" y1="6" x2="14" y2="42" stroke="#d4af6a" stroke-width="1.4"/><line x1="34" y1="6" x2="34" y2="42" stroke="#d4af6a" stroke-width="1.4"/><rect x="22" y="20" width="4" height="8" fill="#d4af6a"/></svg>` },
  { span: "lg:col-span-3", role: "construtor", name: "Forge", desc: "Executa o plano em passos controlados e reversíveis.", stage: "etapa 04 · implementação", svg: `<svg width="48" height="48" viewBox="0 0 48 48" class="agent-symbol"><path d="M 24 4 L 42 36 L 6 36 Z" fill="none" stroke="#d4af6a" stroke-width="1.4"/><circle cx="24" cy="26" r="2.5" fill="#d4af6a"/></svg>` },
  { span: "lg:col-span-4", role: "validador", name: "Aegis", desc: "Submete o trabalho a critérios objetivos — testes, tipos, contratos. Sem evidência, não há conclusão.", stage: "etapa 05 · validação", svg: `<svg width="56" height="56" viewBox="0 0 56 56" class="agent-symbol"><path d="M 28 4 L 48 12 L 48 28 Q 48 42 28 52 Q 8 42 8 28 L 8 12 Z" fill="none" stroke="#d4af6a" stroke-width="1.4"/><path d="M 18 28 L 25 35 L 38 20" fill="none" stroke="#d4af6a" stroke-width="1.6"/></svg>` },
  { span: "lg:col-span-5", role: "memória", name: "Patch", desc: "Escreve decisões, contextos e aprendizados em memória durável. Costura o que foi feito ao que será feito.", stage: "etapa 06 · memória · persistente", highlight: true, svg: `<svg width="56" height="56" viewBox="0 0 56 56" class="agent-symbol"><line x1="8" y1="8" x2="48" y2="48" stroke="#d4af6a" stroke-width="1.2"/><line x1="48" y1="8" x2="8" y2="48" stroke="#d4af6a" stroke-width="1.2"/><circle cx="28" cy="28" r="4" fill="#c8922a"/></svg>` },
];

export const distributions: Distribution[] = [
  { pkg: "@mvoikolesco/flowai", type: "integrado", desc: "Integração completa com OpenCode. O workflow é executado nativamente, com acesso a todas as etapas, agentes e memória persistente do projeto.", features: ["orquestração nativa via OpenCode", "seis agentes com jurisdições próprias", "memória de projeto persistente"] },
  { pkg: "@mvoikolesco/flowai-portable", type: "agnóstico", desc: "Workflow agnóstico baseado em AGENTS.md e skills compartilhadas. Leve o método para qualquer ferramenta que respeite o protocolo.", features: ["protocolo AGENTS.md como contrato", "skills reutilizáveis entre projetos", "compatível com múltiplos runtimes"] },
];

export const memoryNodes: MemoryNode[] = [
  { x: 280, y: 180, r: 20, l: "AGENTS.md" },
  { x: 150, y: 100, r: 14, l: "architecture.md" },
  { x: 420, y: 120, r: 14, l: "auth.md" },
  { x: 550, y: 200, r: 14, l: "api-routes.md" },
  { x: 380, y: 280, r: 14, l: "validation.md" },
  { x: 200, y: 240, r: 14, l: "conventions.md" },
  { x: 500, y: 380, r: 14, l: "testing.md" },
  { x: 620, y: 320, r: 14, l: "decisions.md" },
  { x: 120, y: 380, r: 14, l: "schema.md" },
  { x: 350, y: 420, r: 14, l: "patches.md" },
];

export const recentRecords: RecentRecord[] = [
  { time: "14:32", agent: "patch · auth", text: "Rate-limit adicionado ao endpoint /auth. Decisão: token bucket, 10 req/min." },
  { time: "14:18", agent: "aegis · validate", text: "24 testes, 0 falhas. Tipos limpos. Critério de conclusão atendido." },
  { time: "14:05", agent: "scout · plan", text: "Plano para feature de rate-limit: 4 arquivos, 6 etapas, 1 risco mapeado." },
  { time: "13:58", agent: "nexus · classify", text: "Solicitação classificada como feature · segurança · média complexidade." },
];
