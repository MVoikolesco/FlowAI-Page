import { useEffect, useRef, useState, type ReactNode } from 'react';

const npmUrl = 'https://www.npmjs.com/package/@mvoikolesco/flowai';
const portableNpmUrl = 'https://www.npmjs.com/package/@mvoikolesco/flowai-portable';

const benefits = [
  {
    title: 'Classificação',
    text: 'Enquadra intenção, risco, modo e perfil de engenharia antes da primeira edição.',
  },
  {
    title: 'Planejamento',
    text: 'Transforma mudanças não triviais em escopo, critérios de aceite e passos verificáveis.',
  },
  {
    title: 'Preservação',
    text: 'Protege trabalho existente, evita ações externas sem autorização e mantém alterações focadas.',
  },
  {
    title: 'Validação',
    text: 'Executa checagens proporcionais ao risco e não declara sucesso sem evidências observadas.',
  },
  {
    title: 'Memória',
    text: 'Atualiza uma base Obsidian com decisões, arquitetura, recursos e conhecimento durável.',
  },
  {
    title: 'Segurança',
    text: 'Mantém segredos, dados privados e logs brutos fora da memória e dos relatos do agente.',
  },
];

const flowSteps = ['Solicitação', 'Classificação', 'Planejamento', 'Implementação', 'Validação', 'Memória'];

const terminalStates = ['READING_RULES', 'PLANNING', 'IMPLEMENTING', 'VALIDATING', 'UPDATING_MEMORY', 'COMPLETED'];

const principles = [
  'Ler instruções do projeto e notas relevantes antes de agir.',
  'Escolher apenas as skills necessárias para o trabalho.',
  'Implementar o menor incremento completo e testável.',
  'Registrar decisões e comportamento durável no vault Obsidian.',
];

type TerminalBlockProps = {
  title: string;
  description: string;
  commands: string[];
};

type CopyStatus = 'idle' | 'success' | 'unsupported' | 'error';

const copyStatusMessages: Record<CopyStatus, string> = {
  idle: '',
  success: 'Comandos copiados para a área de transferência.',
  unsupported: 'Área de transferência indisponível. Selecione e copie os comandos manualmente.',
  error: 'Não foi possível copiar. Selecione e copie os comandos manualmente.',
};

function useScrollReveal() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    document.documentElement.classList.add('reveal-enabled');

    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-visible'));
      return () => document.documentElement.classList.remove('reveal-enabled');
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.16 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('reveal-enabled');
    };
  }, []);
}

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const point = useRef({ x: 0, y: 0 });
  const visual = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!window.matchMedia) {
      return undefined;
    }

    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!canHover || reducedMotion) {
      return undefined;
    }

    document.documentElement.classList.add('custom-cursor-enabled');

    let frame = 0;
    const move = (event: PointerEvent) => {
      point.current = { x: event.clientX, y: event.clientY };
    };
    const setInteractive = (event: PointerEvent) => {
      const target = event.target as Element | null;
      cursorRef.current?.classList.toggle(
        'is-interactive',
        Boolean(target?.closest('a, button, [role="button"], input, textarea, select')),
      );
    };
    const draw = () => {
      visual.current.x += (point.current.x - visual.current.x) * 0.24;
      visual.current.y += (point.current.y - visual.current.y) * 0.24;
      cursorRef.current?.style.setProperty('--cursor-x', `${visual.current.x}px`);
      cursorRef.current?.style.setProperty('--cursor-y', `${visual.current.y}px`);
      frame = window.requestAnimationFrame(draw);
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', setInteractive);
    frame = window.requestAnimationFrame(draw);

    return () => {
      document.documentElement.classList.remove('custom-cursor-enabled');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', setInteractive);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="custom-cursor" ref={cursorRef} aria-hidden="true" />;
}

function TerminalBlock({ title, description, commands }: TerminalBlockProps) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle');
  const commandText = commands.join('\n');

  async function copyCommands() {
    if (!navigator.clipboard?.writeText) {
      setCopyStatus('unsupported');
      return;
    }

    try {
      await navigator.clipboard.writeText(commandText);
      setCopyStatus('success');
      window.setTimeout(() => setCopyStatus('idle'), 1800);
    } catch {
      setCopyStatus('error');
    }
  }

  const copied = copyStatus === 'success';
  const statusMessage = copyStatusMessages[copyStatus];

  return (
    <article className={`terminal-card ${copied ? 'is-copied' : ''}`}>
      <div>
        <p className="eyebrow">Instalação</p>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="terminal" role="group" aria-label={`Comandos para ${title}`}>
        <div className="terminal-bar" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <pre>
          <code>{commands.map((command) => `$ ${command}`).join('\n')}</code>
        </pre>
        <div className="terminal-processing" aria-hidden="true">
          {terminalStates.map((state) => <span key={state}>{state}</span>)}
        </div>
      </div>
      <button className="copy-button" type="button" onClick={copyCommands}>
        {copied ? 'Copiado' : 'Copiar comandos'}
      </button>
      <p className="copy-status" role="status" aria-live="polite">
        {statusMessage}
      </p>
    </article>
  );
}

function SectionHeading({
  eyebrow,
  title,
  titleId,
  children,
}: {
  eyebrow: string;
  title: string;
  titleId: string;
  children: ReactNode;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={titleId}>{title}</h2>
      <p>{children}</p>
    </div>
  );
}

function StageSeal({ step, index }: { step: string; index: number }) {
  return (
    <li className="visual-node">
      <span className="seal" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <strong>{step}</strong>
    </li>
  );
}

export function App() {
  useScrollReveal();

  return (
    <div className="site-shell">
      <CustomCursor />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="FlowAI início">
          <span className="brand-mark" aria-hidden="true">°</span>
          <span>FlowAI</span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#beneficios">Benefícios</a>
          <a href="#fluxo">Fluxo</a>
          <a href="#instalacao">Instalação</a>
          <a className="nav-pill" href={npmUrl}>npm</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow hero-kicker">Workflow confiável para agentes de código</p>
            <h1 id="hero-title">Planejamento, validação e memória para engenharia com IA.</h1>
            <p className="hero-lede">
              FlowAI adiciona contrato operacional, skills especializadas e uma base Obsidian ao seu projeto para orientar agentes do pedido à evidência.
            </p>
            <div className="hero-actions" role="group" aria-label="Ações principais">
              <a className="button primary" href="#instalacao">Instalar FlowAI</a>
              <a className="button secondary" href={npmUrl}>Ver no npm</a>
            </div>
          </div>
          <div className="study-room" aria-hidden="true">
            <div className="lamp-glow" />
            <div className="desk-slab" />
            <div className="obsidian-vault"><span /> <span /> <span /></div>
            <div className="evidence-stack"><span /> <span /> <span /></div>
          </div>
          <ol className="workflow-visual" aria-label="Visual do workflow FlowAI">
            {flowSteps.map((step, index) => <StageSeal step={step} index={index} key={step} />)}
          </ol>
        </section>

        <section className="section" id="beneficios" aria-labelledby="benefits-title" data-reveal>
          <SectionHeading eyebrow="Benefícios" title="Guardrails para entregar com confiança" titleId="benefits-title">
            Um fluxo reutilizável que melhora disciplina operacional sem adicionar dependências à aplicação.
          </SectionHeading>
          <div className="card-grid">
            {benefits.map((benefit) => (
              <article className="info-card" key={benefit.title}>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section flow-section" id="fluxo" aria-labelledby="flow-title" data-reveal>
          <SectionHeading eyebrow="Fluxo visual" title="Da solicitação à memória" titleId="flow-title">
            Cada etapa reforça entendimento, execução segura, validação proporcional e continuidade do conhecimento.
          </SectionHeading>
          <div className="flow-board">
            <ol className="flow-list" aria-label="Etapas do FlowAI">
              {flowSteps.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}
            </ol>
            <div className="connection-pattern" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="comparison-title" data-reveal>
          <SectionHeading eyebrow="Pacotes" title="Escolha entre integração completa e portátil" titleId="comparison-title">
            Use a distribuição alinhada ao agente e ao nível de integração desejado.
          </SectionHeading>
          <div className="comparison-grid">
            <article className="package-card featured">
              <p className="package-label">Completo</p>
              <h3>@mvoikolesco/flowai</h3>
              <p>Para projetos que usam OpenCode.</p>
              <ul>
                <li>Agents, commands, skills, plugins e tools.</li>
                <li>Inclui contrato operacional e memória Obsidian.</li>
                <li>Suporta comandos como /forge, /trial e /mend.</li>
              </ul>
              <a href={npmUrl}>Abrir pacote completo no npm</a>
            </article>
            <article className="package-card">
              <p className="package-label">Portátil</p>
              <h3>@mvoikolesco/flowai-portable</h3>
              <p>Para agentes compatíveis com AGENTS.md.</p>
              <ul>
                <li>Contrato, skills e memória Obsidian.</li>
                <li>Sem configuração específica de OpenCode.</li>
                <li>Indicado para Codex, Claude Code, Cursor e similares.</li>
              </ul>
              <a href={portableNpmUrl}>Abrir pacote portátil no npm</a>
            </article>
          </div>
        </section>

        <section className="section" id="instalacao" aria-labelledby="install-title" data-reveal>
          <SectionHeading eyebrow="Instalação" title="Comece pelo terminal" titleId="install-title">
            Requer Node.js 20.11 ou superior. A versão completa também requer OpenCode instalado.
          </SectionHeading>
          <div className="terminal-grid">
            <TerminalBlock
              title="Completa com OpenCode"
              description="Cria ou atualiza AGENTS.md, opencode.jsonc, .opencode/ e obsidian/."
              commands={['npm install --save-dev @mvoikolesco/flowai', 'npx flowai init', 'npx flowai doctor']}
            />
            <TerminalBlock
              title="Portátil"
              description="Instala os recursos compartilhados para qualquer agente que leia AGENTS.md."
              commands={['npm install --save-dev @mvoikolesco/flowai-portable', 'npx flowai init']}
            />
          </div>
        </section>

        <section className="section principles" aria-labelledby="principles-title" data-reveal>
          <SectionHeading eyebrow="Princípios operacionais" title="Menos improviso, mais evidência" titleId="principles-title">
            FlowAI transforma boas práticas de engenharia assistida em um caminho explícito e auditável.
          </SectionHeading>
          <ul>
            {principles.map((principle) => <li key={principle}>{principle}</li>)}
          </ul>
        </section>

        <section className="final-cta" aria-labelledby="cta-title" data-reveal>
          <p className="eyebrow">Pronto para usar</p>
          <h2 id="cta-title">Dê ao seu agente um fluxo antes de pedir código.</h2>
          <a className="button primary" href="#instalacao">Copiar comandos de instalação</a>
        </section>
      </main>

      <footer className="site-footer">
        <span>Licença MIT</span>
        <a href={npmUrl}>@mvoikolesco/flowai no npm</a>
      </footer>
    </div>
  );
}
