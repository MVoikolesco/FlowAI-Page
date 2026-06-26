import React, { useCallback, useEffect, useRef, useState } from "react";

// --- HOOKS E UTILITÁRIOS ---

interface InViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

const useInView = (options: InViewOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      const fallbackTimer = globalThis.setTimeout(() => setInView(true), 0);
      return () => globalThis.clearTimeout(fallbackTimer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (options.triggerOnce !== false) {
            observer.unobserve(element);
          }
        } else if (options.triggerOnce === false) {
          setInView(false);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || "0px 0px -50px 0px",
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.triggerOnce]);

  return { ref, inView };
};

// Componente Reveal genérico
const Reveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = React.memo(({ children, className = "", delay = 0 }) => {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
});
Reveal.displayName = "Reveal";

// --- COMPONENTES DE ÍCONE (SVG OTIMIZADOS) ---

const WorkflowNode: React.FC<{
  label: string;
  index: string;
  active?: boolean;
}> = React.memo(({ label, index, active }) => (
  <g className="node-group">
    <circle r="42" fill="rgba(212,175,106,0.03)" />
    <circle
      r="26"
      fill="none"
      stroke="rgba(212,175,106,0.2)"
      strokeWidth="0.8"
    />
    <circle
      r="18"
      fill="rgba(212,175,106,0.04)"
      stroke="#d4af6a"
      strokeWidth="1.4"
    />
    <circle
      r="3"
      fill={active ? "#c8922a" : "#d4af6a"}
      className="node-breathe"
      style={{ animationDelay: active ? "-2.5s" : "-1s" }}
    />
    <text
      y="58"
      textAnchor="middle"
      fill="#b8a888"
      fontFamily="JetBrains Mono"
      fontSize="10"
      letterSpacing="1.5"
    >
      {label}
    </text>
    <text
      y="73"
      textAnchor="middle"
      fill="#7a6b54"
      fontFamily="JetBrains Mono"
      fontSize="9"
    >
      {index}
    </text>
  </g>
));
WorkflowNode.displayName = "WorkflowNode";

// --- SEÇÕES ---

const Nav: React.FC = () => (
  <nav
    className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-5"
    style={{
      background: "rgba(13, 10, 6, 0.85)",
      borderBottom: "1px solid var(--line)",
    }}
  >
    <div className="max-w-[1440px] mx-auto flex items-center justify-between">
      <a href="#top" className="flex items-center gap-3 group">
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          className="transition-transform duration-700 group-hover:rotate-180"
        >
          <circle
            cx="15"
            cy="15"
            r="13"
            fill="none"
            stroke="#d4af6a"
            strokeWidth="0.8"
            opacity="0.35"
          />
          <circle
            cx="15"
            cy="15"
            r="8.5"
            fill="none"
            stroke="#d4af6a"
            strokeWidth="0.8"
            opacity="0.7"
          />
          <circle cx="15" cy="15" r="3" fill="#d4af6a" />
        </svg>
        <span className="serif text-xl font-medium tracking-tight">FlowAI</span>
      </a>
      <div className="hidden lg:flex items-center gap-9 mono text-xs">
        <a href="#manifesto" className="ulink">
          Manifesto
        </a>
        <a href="#workflow" className="ulink">
          Workflow
        </a>
        <a href="#agentes" className="ulink">
          Agentes
        </a>
        <a href="#distribuicoes" className="ulink">
          Pacotes
        </a>
        <a href="#memoria" className="ulink">
          Memória
        </a>
      </div>
      <a
        href="https://www.npmjs.com/package/@mvoikolesco/flowai"
        target="_blank"
        rel="noopener"
        className="mono text-xs flex items-center gap-2 px-4 py-2 border transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
        style={{ borderColor: "var(--line-strong)" }}
      >
        <span style={{ color: "var(--gold)" }}>°</span> npm
      </a>
    </div>
  </nav>
);

const Hero: React.FC = () => (
  <section className="relative min-h-screen pt-32 pb-24 px-6 lg:px-12">
    <div className="max-w-[1440px] mx-auto">
      <div
        className="hero-in flex items-center gap-4 mb-12"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="hairline w-12"></div>
        <span className="label-mono">
          Biblioteca de orquestração · MIT · v1.0
        </span>
        <div className="hairline flex-1 max-w-[200px]"></div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-7">
          <h1
            className="title-display text-[3rem] sm:text-6xl lg:text-7xl xl:text-[5.5rem] mb-8 hero-in"
            style={{ animationDelay: "0.2s" }}
          >
            Engenharia com
            <br />
            <span style={{ fontStyle: "italic", color: "var(--gold)" }}>
              agentes
            </span>
            ,<br />
            sem <span style={{ fontWeight: 300 }}>improviso.</span>
          </h1>
          <p
            className="serif text-lg md:text-xl leading-relaxed max-w-xl mb-10 hero-in"
            style={{
              color: "var(--ink-dim)",
              animationDelay: "0.4s",
              fontWeight: 350,
            }}
          >
            O FlowAI transforma solicitações em{" "}
            <em style={{ color: "var(--ink)", fontStyle: "italic" }}>
              workflows estruturados
            </em>{" "}
            de planejamento, implementação, validação e memória.
          </p>
          <div
            className="flex flex-wrap gap-3 hero-in"
            style={{ animationDelay: "0.6s" }}
          >
            <a href="#workflow" className="btn-primary">
              <span>Explorar o FlowAI</span>
              <span>→</span>
            </a>
            <a
              href="https://www.npmjs.com/package/@mvoikolesco/flowai"
              target="_blank"
              rel="noopener"
              className="btn-secondary"
            >
              Ver no npm
            </a>
          </div>
        </div>

        <div
          className="lg:col-span-5 lg:pt-6 hero-in"
          style={{ animationDelay: "0.8s" }}
        >
          <div
            className="border-l pl-6"
            style={{ borderColor: "var(--line-strong)" }}
          >
            <div className="label-mono mb-5">índice · workflow</div>
            <ol
              className="space-y-3 serif text-base"
              style={{ color: "var(--ink-dim)" }}
            >
              {[
                { num: "01°", label: "Solicitação", tag: "entry" },
                { num: "02°", label: "Classificação", tag: "triage" },
                { num: "03°", label: "Planejamento", tag: "plan" },
                { num: "04°", label: "Implementação", tag: "build" },
                { num: "05°", label: "Validação", tag: "verify" },
                {
                  num: "06°",
                  label: "Memória",
                  tag: "durable",
                  highlight: true,
                },
              ].map((item) => (
                <li key={item.num} className="flex items-baseline gap-4">
                  <span
                    className="mono text-xs"
                    style={{
                      color: item.highlight ? "var(--mustard)" : "var(--gold)",
                    }}
                  >
                    {item.num}
                  </span>
                  <span
                    style={{ color: item.highlight ? "var(--ink)" : "inherit" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="ml-auto mono text-[10px]"
                    style={{
                      color: item.highlight ? "var(--gold)" : "var(--ink-mute)",
                    }}
                  >
                    {item.tag}
                  </span>
                </li>
              ))}
            </ol>
            <div className="hairline mt-6 mb-4"></div>
            <p
              className="mono text-[11px] leading-relaxed"
              style={{ color: "var(--ink-mute)" }}
            >
              Cada solicitação percorre seis estágios
              <br />
              conectados por linhas, evidências e contexto.
            </p>
          </div>
        </div>
      </div>

      {/* Workflow visualization */}
      <div className="mt-20 lg:mt-28 hero-in" style={{ animationDelay: "1s" }}>
        <div className="flex items-center justify-between mb-8 flex-wrap gap-2">
          <span className="label-mono">
            motor de workflow · representação viva
          </span>
          <span className="label-mono">6 estágios · ciclo contínuo</span>
        </div>

        <div className="hidden md:block relative">
          <svg
            viewBox="0 0 1200 280"
            className="w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#c8922a" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#d4af6a" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#c8922a" stopOpacity="0.15" />
              </linearGradient>
            </defs>

            <path
              id="p1"
              d="M 90 170 Q 190 90, 290 110"
              stroke="url(#goldGrad)"
              strokeWidth="1.3"
              fill="none"
              className="workflow-path"
            />
            <path
              id="p2"
              d="M 290 110 Q 390 210, 490 190"
              stroke="url(#goldGrad)"
              strokeWidth="1.3"
              fill="none"
              className="workflow-path"
              style={{ animationDelay: "0.3s" }}
            />
            <path
              id="p3"
              d="M 490 190 Q 590 90, 690 120"
              stroke="url(#goldGrad)"
              strokeWidth="1.3"
              fill="none"
              className="workflow-path"
              style={{ animationDelay: "0.6s" }}
            />
            <path
              id="p4"
              d="M 690 120 Q 790 220, 890 180"
              stroke="url(#goldGrad)"
              strokeWidth="1.3"
              fill="none"
              className="workflow-path"
              style={{ animationDelay: "0.9s" }}
            />
            <path
              id="p5"
              d="M 890 180 Q 990 90, 1090 120"
              stroke="url(#goldGrad)"
              strokeWidth="1.3"
              fill="none"
              className="workflow-path"
              style={{ animationDelay: "1.2s" }}
            />

            <circle r="3.5" className="pulse-glow">
              <animateMotion
                dur="3.5s"
                repeatCount="indefinite"
                path="M 90 170 Q 190 90, 290 110"
              />
            </circle>
            <circle r="3.5" className="pulse-glow">
              <animateMotion
                dur="3.5s"
                repeatCount="indefinite"
                begin="0.7s"
                path="M 290 110 Q 390 210, 490 190"
              />
            </circle>
            <circle r="3.5" className="pulse-glow">
              <animateMotion
                dur="3.5s"
                repeatCount="indefinite"
                begin="1.4s"
                path="M 490 190 Q 590 90, 690 120"
              />
            </circle>
            <circle r="3.5" className="pulse-glow">
              <animateMotion
                dur="3.5s"
                repeatCount="indefinite"
                begin="2.1s"
                path="M 690 120 Q 790 220, 890 180"
              />
            </circle>
            <circle r="3.5" className="pulse-glow">
              <animateMotion
                dur="3.5s"
                repeatCount="indefinite"
                begin="2.8s"
                path="M 890 180 Q 990 90, 1090 120"
              />
            </circle>

            {/* Nós */}
            <g transform="translate(90, 170)">
              <WorkflowNode label="SOLICITAÇÃO" index="01°" />
            </g>
            <g transform="translate(290, 110)">
              <WorkflowNode label="CLASSIFICAÇÃO" index="02°" />
            </g>
            <g transform="translate(490, 190)">
              <WorkflowNode label="PLANEJAMENTO" index="03°" />
            </g>
            <g transform="translate(690, 120)">
              <WorkflowNode label="IMPLEMENTAÇÃO" index="04°" />
            </g>
            <g transform="translate(890, 180)">
              <WorkflowNode label="VALIDAÇÃO" index="05°" />
            </g>
            <g transform="translate(1090, 120)">
              <WorkflowNode label="MEMÓRIA" index="06°" active />
            </g>
          </svg>
        </div>

        <div className="md:hidden relative pl-10">
          <div className="absolute left-[18px] top-3 bottom-3 hairline-v"></div>
          <div className="space-y-7">
            {[
              "Solicitação",
              "Classificação",
              "Planejamento",
              "Implementação",
              "Validação",
            ].map((label, i) => (
              <div key={label} className="relative flex items-center gap-4">
                <div
                  className="absolute -left-[22px] w-3 h-3 rounded-full border"
                  style={{
                    background: "var(--bg)",
                    borderColor: "var(--gold)",
                  }}
                ></div>
                <span
                  className="mono text-[10px]"
                  style={{ color: "var(--gold)" }}
                >
                  0{i + 1}°
                </span>
                <span className="serif">{label}</span>
              </div>
            ))}
            <div className="relative flex items-center gap-4">
              <div
                className="absolute -left-[22px] w-3 h-3 rounded-full"
                style={{ background: "var(--mustard)" }}
              ></div>
              <span
                className="mono text-[10px]"
                style={{ color: "var(--mustard)" }}
              >
                06°
              </span>
              <span className="serif" style={{ color: "var(--gold)" }}>
                Memória
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Componente genérico para as seções de texto
const SectionTitle: React.FC<{
  section: string;
  title: React.ReactNode;
  desc?: string;
  id?: string;
}> = ({ section, title, desc, id }) => (
  <div id={id} className="grid lg:grid-cols-12 gap-10 mb-20">
    <Reveal className="lg:col-span-7">
      <div className="flex items-center gap-3 mb-6">
        <span className="sec-num mono text-xs" style={{ color: "var(--gold)" }}>
          {section}
        </span>
        <div className="hairline w-10"></div>
        <span className="label-mono">workflow · trilha narrativa</span>
      </div>
      <h2 className="title-display text-4xl md:text-5xl lg:text-6xl">
        {title}
      </h2>
    </Reveal>
    {desc && (
      <Reveal className="lg:col-span-5 lg:pt-4" delay={100}>
        <p
          className="serif text-base leading-relaxed"
          style={{ color: "var(--ink-dim)" }}
        >
          {desc}
        </p>
      </Reveal>
    )}
  </div>
);

const WorkflowTrail: React.FC = () => {
  const stages = [
    {
      num: "01°",
      label: "entry · solicitação",
      title: "Solicitação",
      desc: "A intenção humana entra no sistema como texto, contexto e restrições. Nada é executado ainda — apenas recebido e armazenado com fidelidade.",
      code: "// input\nrequest → { intent, scope, context }",
      side: "right",
    },
    {
      num: "02°",
      label: "triage · classificação",
      title: "Classificação",
      desc: "O Nexus examina a solicitação e a classifica: tipo de tarefa, domínio, complexidade, arquivos provavelmente envolvidos, riscos antecipados.",
      code: "// classify\ntype: refactor · risk: low",
      side: "left",
    },
    {
      num: "03°",
      label: "plan · planejamento",
      title: "Planejamento",
      desc: "O Scout mapeia o território: arquivos a tocar, arquivos a preservar, ordem de operações, critérios de conclusão. Um plano vira objeto verificável.",
      code: "// plan\nsteps: [edit, test, verify, document]",
      side: "right",
    },
    {
      num: "04°",
      label: "build · implementação",
      title: "Implementação",
      desc: "O Forge executa o plano em passos controlados. Cada alteração é small, revisável e reversível. Nada é feito em lote cego.",
      code: "// build\npatch → file.ts · status: applied",
      side: "left",
    },
    {
      num: "05°",
      label: "verify · validação",
      title: "Validação",
      desc: "O Aegis submete o trabalho a critérios objetivos: testes, tipos, compilação, lint, contratos. Sem verde, não há sucesso — há hipótese.",
      code: "// verify\ntests: 24/24 · types: clean",
      side: "right",
    },
    {
      num: "06°",
      label: "durable · memória",
      title: "Memória",
      desc: "O Patch escreve o que foi aprendido: decisões tomadas, contextos preservados, atalhos descobertos. O projeto fica mais inteligente a cada ciclo.",
      code: "// remember\nmemory → AGENTS.md · status: persisted",
      side: "left",
      highlight: true,
    },
  ];

  return (
    <div className="relative">
      <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 hairline-v -translate-x-1/2"></div>
      <div className="lg:hidden absolute left-[22px] top-0 bottom-0 hairline-v"></div>

      {stages.map((stage) => (
        <Reveal
          key={stage.num}
          className={`grid lg:grid-cols-2 gap-8 lg:gap-20 mb-16 lg:mb-24 relative`}
        >
          {stage.side === "right" ? (
            <div className="hidden lg:block"></div>
          ) : null}

          <div
            className={`lg:pr-0 pl-12 lg:pl-0 relative ${stage.side === "left" ? "lg:text-right" : ""}`}
          >
            <div
              className={`absolute lg:left-0 left-[14px] top-2 -translate-x-1/2 lg:-translate-x-1/2 ${stage.side === "left" ? "lg:right-0 lg:left-auto lg:translate-x-1/2" : ""}`}
            >
              <div className="relative">
                <div
                  className="absolute inset-0 -m-3 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(212,175,106,0.15), transparent 70%)",
                  }}
                ></div>
                <div
                  className={`relative w-4 h-4 rounded-full border-2 ${stage.highlight ? "bg-[var(--mustard)]" : ""}`}
                  style={{
                    background: stage.highlight
                      ? "var(--mustard)"
                      : "var(--bg)",
                    borderColor: stage.highlight
                      ? "var(--mustard)"
                      : "var(--gold)",
                    boxShadow: stage.highlight
                      ? "0 0 14px rgba(200,146,42,0.6)"
                      : "none",
                  }}
                ></div>
              </div>
            </div>

            <div className={stage.side === "left" ? "lg:pr-8" : "lg:pl-8"}>
              <div
                className={`flex items-baseline gap-4 mb-3 ${stage.side === "left" ? "lg:justify-end" : ""}`}
              >
                {stage.side === "left" ? (
                  <>
                    <span
                      className="label-mono"
                      style={{
                        color: stage.highlight ? "var(--gold)" : "inherit",
                      }}
                    >
                      {stage.label}
                    </span>
                    <span
                      className="mono text-xs"
                      style={{
                        color: stage.highlight
                          ? "var(--mustard)"
                          : "var(--gold)",
                      }}
                    >
                      {stage.num}
                    </span>
                  </>
                ) : (
                  <>
                    <span
                      className="mono text-xs"
                      style={{
                        color: stage.highlight
                          ? "var(--mustard)"
                          : "var(--gold)",
                      }}
                    >
                      {stage.num}
                    </span>
                    <span
                      className="label-mono"
                      style={{
                        color: stage.highlight ? "var(--gold)" : "inherit",
                      }}
                    >
                      {stage.label}
                    </span>
                  </>
                )}
              </div>
              <h3
                className="title-display text-3xl lg:text-4xl mb-4"
                style={{ color: stage.highlight ? "var(--gold)" : "inherit" }}
              >
                {stage.title}
              </h3>
              <p
                className="serif text-base lg:text-lg leading-relaxed mb-5"
                style={{
                  color: stage.highlight ? "var(--ink)" : "var(--ink-dim)",
                }}
              >
                {stage.desc}
              </p>
              <div
                className={`mono text-xs p-4 border ${stage.side === "left" ? "lg:inline-block text-left" : ""}`}
                style={{
                  borderColor: stage.highlight
                    ? "var(--mustard)"
                    : "var(--line)",
                  color: "var(--ink-dim)",
                  background: stage.highlight
                    ? "rgba(200,146,42,0.05)"
                    : "rgba(212,175,106,0.02)",
                  whiteSpace: "pre-line",
                }}
              >
                {stage.code}
              </div>
            </div>
          </div>

          {stage.side === "left" ? (
            <div className="hidden lg:block"></div>
          ) : null}
        </Reveal>
      ))}
    </div>
  );
};

// Para economizar espaço no arquivo, os SVGs dos agentes foram inline, mas em React real poderiam ser componentes separados.
type Agent = {
  span: string;
  role: string;
  name: string;
  desc: string;
  stage: string;
  svg: string;
  highlight?: boolean;
};

const AgentCard: React.FC<{ agent: Agent }> = React.memo(({ agent }) => (
  <div
    className="agent-card p-8 lg:p-12 relative"
    style={{ background: "var(--bg)" }}
  >
    <div className="flex items-start justify-between mb-8">
      <div>
        <div
          className="label-mono mb-2"
          style={{ color: agent.highlight ? "var(--gold)" : "inherit" }}
        >
          {agent.role}
        </div>
        <h3
          className="title-display text-3xl lg:text-4xl"
          style={{ color: agent.highlight ? "var(--gold)" : "inherit" }}
        >
          {agent.name}
        </h3>
      </div>
      <div dangerouslySetInnerHTML={{ __html: agent.svg }} />
    </div>
    <p
      className="serif text-base leading-relaxed mb-6"
      style={{ color: "var(--ink-dim)" }}
    >
      {agent.desc}
    </p>
    <div
      className="mono text-[11px] flex items-center gap-2"
      style={{ color: agent.highlight ? "var(--gold)" : "var(--ink-mute)" }}
    >
      <span style={{ color: "var(--gold)" }}>°</span> {agent.stage}
    </div>
  </div>
));

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !window.matchMedia ||
      window.matchMedia("(hover: none), (pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let frame = 0;

    document.documentElement.classList.add("cursor-enabled");

    const moveCursor = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
    };

    const setInteractiveState = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const active = Boolean(
        target?.closest('a, button, [data-cursor="active"]'),
      );
      dotRef.current?.classList.toggle("active", active);
      ringRef.current?.classList.toggle("active", active);
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }
      frame = requestAnimationFrame(animateRing);
    };

    window.addEventListener("pointermove", moveCursor);
    window.addEventListener("pointerover", setInteractiveState);
    frame = requestAnimationFrame(animateRing);

    return () => {
      document.documentElement.classList.remove("cursor-enabled");
      window.removeEventListener("pointermove", moveCursor);
      window.removeEventListener("pointerover", setInteractiveState);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true"></div>
      <div className="cursor-ring" ref={ringRef} aria-hidden="true"></div>
    </>
  );
};

const App: React.FC = () => {
  // Terminal logic state
  const [terminalLines, setTerminalLines] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);
  const { ref: terminalRef, inView: terminalInView } = useInView({
    threshold: 0.3,
  });

  useEffect(() => {
    if (terminalInView) {
      const timers: ReturnType<typeof setTimeout>[] = [];
      timers.push(
        setTimeout(
          () => setTerminalLines([true, true, false, false, false, false]),
          800,
        ),
      );
      timers.push(
        setTimeout(
          () => setTerminalLines([true, true, true, false, false, false]),
          1400,
        ),
      );
      timers.push(
        setTimeout(
          () => setTerminalLines([true, true, true, true, false, false]),
          2600,
        ),
      );
      timers.push(
        setTimeout(
          () => setTerminalLines([true, true, true, true, true, false]),
          3300,
        ),
      );
      timers.push(
        setTimeout(
          () => setTerminalLines([true, true, true, true, true, true]),
          4700,
        ),
      );
      return () => timers.forEach(clearTimeout);
    }
  }, [terminalInView]);

  // Copy button state
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard?.writeText("npm install @mvoikolesco/flowai");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, []);

  return (
    <div id="top" className="relative">
      {/* Estilos Globais Injetados */}
      <style>{`
        :root {
          --bg: #0d0a06; --bg2: #14100a; --bg3: #1a140d;
          --ink: #e8dcc0; --ink-dim: #b8a888; --ink-mute: #7a6b54;
          --mustard: #c8922a; --gold: #d4af6a; --amber: #c9852a;
          --brown: #2a1f15; --brown-lt: #3a2a1a;
          --line: rgba(212, 175, 106, 0.18);
          --line-strong: rgba(212, 175, 106, 0.4);
        }
        .cursor-enabled * { cursor: none; }
        .cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 5px;
          height: 5px;
          background: var(--gold);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: width 0.25s ease, height 0.25s ease, background 0.25s ease;
          box-shadow: 0 0 10px rgba(212, 175, 106, 0.7);
        }
        .cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          width: 28px;
          height: 28px;
          border: 1px solid rgba(212, 175, 106, 0.5);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          transition:
            width 0.35s cubic-bezier(0.2, 0.9, 0.3, 1),
            height 0.35s cubic-bezier(0.2, 0.9, 0.3, 1),
            border-color 0.3s,
            opacity 0.3s;
        }
        .cursor-dot.active {
          width: 7px;
          height: 7px;
          background: var(--mustard);
        }
        .cursor-ring.active {
          width: 52px;
          height: 52px;
          border-color: rgba(200, 146, 42, 0.7);
        }
        html { scroll-behavior: smooth; }
        body {
          background: var(--bg); color: var(--ink);
          font-family: 'Fraunces', serif; font-weight: 350;
          overflow-x: hidden; -webkit-font-smoothing: antialiased;
          background-image:
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(200, 146, 42, 0.08), transparent 60%),
            radial-gradient(ellipse 60% 40% at 90% 50%, rgba(184, 115, 42, 0.04), transparent 60%);
          /* Otimização: Textura de grão aplicada no body ao invés de overlay fixed */
          background-color: var(--bg);
        }
        .serif { font-family: 'Fraunces', serif; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .title-display {
          font-family: 'Fraunces', serif; font-weight: 400;
          font-variation-settings: "opsz" 144, "SOFT" 0;
          letter-spacing: -0.025em; line-height: 0.95;
        }
        .label-mono {
          font-family: 'JetBrains Mono', monospace; font-size: 11px;
          font-weight: 400; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--ink-mute);
        }
        .hairline { background: linear-gradient(90deg, transparent, var(--line-strong), transparent); height: 1px; }
        .hairline-v { background: linear-gradient(180deg, transparent, var(--line-strong) 8%, var(--line-strong) 92%, transparent); width: 1px; }

        /* Otimização: Apenas transform e opacity para GPU */
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.2, 0.9, 0.3, 1); }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        .btn-primary {
          position: relative; background: var(--gold); color: var(--bg);
          font-family: 'JetBrains Mono', monospace; font-size: 13px;
          font-weight: 500; letter-spacing: 0.05em;
          padding: 14px 26px; border: none; overflow: hidden;
          transition: color 0.3s ease; display: inline-flex; align-items: center; gap: 8px;
        }
        .btn-primary::before {
          content: ''; position: absolute; inset: 0; background: var(--ink);
          transform: translateY(101%); transition: transform 0.45s cubic-bezier(0.2, 0.9, 0.3, 1); z-index: 0;
        }
        .btn-primary:hover::before { transform: translateY(0); }
        .btn-primary > * { position: relative; z-index: 1; }

        .btn-secondary {
          background: transparent; color: var(--ink);
          font-family: 'JetBrains Mono', monospace; font-size: 13px;
          padding: 14px 26px; border: 1px solid var(--line-strong);
          transition: all 0.3s ease; display: inline-flex; align-items: center; gap: 8px;
        }
        .btn-secondary:hover { border-color: var(--gold); color: var(--gold); }

        /* Animações otimizadas */
        @keyframes drawLine { from { stroke-dashoffset: 800; } to { stroke-dashoffset: 0; } }
        .workflow-path { stroke-dasharray: 800; stroke-dashoffset: 800; animation: drawLine 2.5s ease-out forwards; }

        .pulse-glow {
          fill: var(--gold);
          filter: drop-shadow(0 0 5px rgba(212, 175, 106, 0.9));
        }

        @keyframes nodeBreathe { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.06); } }
        .node-breathe { transform-origin: center; transform-box: fill-box; animation: nodeBreathe 4s ease-in-out infinite; }

        .ulink { position: relative; color: var(--ink-dim); text-decoration: none; transition: color 0.3s; }
        .ulink::after {
          content: ''; position: absolute; bottom: -3px; left: 0; width: 100%; height: 1px;
          background: var(--gold); transform: scaleX(0); transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.2, 0.9, 0.3, 1);
        }
        .ulink:hover { color: var(--gold); }
        .ulink:hover::after { transform: scaleX(1); transform-origin: left; }

        @keyframes float { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(20px, -20px); } }
        .float-slow { animation: float 14s ease-in-out infinite; }

        @keyframes heroIn { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
        .hero-in { animation: heroIn 1.1s cubic-bezier(0.2, 0.9, 0.3, 1) forwards; opacity: 0; }

        @keyframes memNodePulse { 0%, 100% { opacity: 0.5; r: 3; } 50% { opacity: 1; r: 5; } }
        .mem-pulse { animation: memNodePulse 4s ease-in-out infinite; }

        .blink::after { content: '▌'; color: var(--gold); animation: blink 1s steps(2) infinite; margin-left: 2px; }
        @keyframes blink { 50% { opacity: 0; } }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
          .cursor-dot,
          .cursor-ring { display: none !important; }
          .cursor-enabled * { cursor: auto !important; }
        }
        @media (hover: none), (pointer: coarse) {
          .cursor-dot,
          .cursor-ring { display: none !important; }
          .cursor-enabled * { cursor: auto !important; }
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--brown-lt); }
        ::selection { background: rgba(212, 175, 106, 0.3); color: var(--ink); }
        *:focus-visible { outline: 2px solid var(--gold); outline-offset: 4px; }
      `}</style>
      <CustomCursor />

      {/* Ambient lights otimizados (sem blur pesado, usando cores solidas com opacidade) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute float-slow"
          style={{
            top: "8%",
            left: "3%",
            width: "280px",
            height: "280px",
            background:
              "radial-gradient(circle, rgba(200, 146, 42, 0.1), transparent 70%)",
          }}
        ></div>
        <div
          className="absolute float-slow"
          style={{
            top: "55%",
            right: "0%",
            width: "320px",
            height: "320px",
            background:
              "radial-gradient(circle, rgba(184, 115, 42, 0.08), transparent 70%)",
            animationDelay: "-5s",
          }}
        ></div>
      </div>

      <div className="relative z-10">
        <Nav />
        <Hero />

        {/* MANIFESTO */}
        <section
          id="manifesto"
          className="relative px-6 lg:px-12 py-32 lg:py-48"
        >
          <div className="max-w-[1440px] mx-auto">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
              <Reveal className="lg:col-span-4">
                <div className="sticky top-32">
                  <div className="flex items-center gap-3 mb-6">
                    <span
                      className="sec-num mono text-xs"
                      style={{ color: "var(--gold)" }}
                    >
                      § I
                    </span>
                    <div className="hairline w-10"></div>
                    <span className="label-mono">manifesto</span>
                  </div>
                  <h2 className="title-display text-4xl md:text-5xl lg:text-6xl mb-8">
                    Agentes rápidos ainda precisam de{" "}
                    <em style={{ color: "var(--gold)", fontStyle: "italic" }}>
                      processos confiáveis
                    </em>
                    .
                  </h2>
                  <p
                    className="serif text-base leading-relaxed"
                    style={{ color: "var(--ink-dim)" }}
                  >
                    Velocidade sem método é ruído. O FlowAI é uma biblioteca de
                    princípios operacionais que se manifestam como etapas,
                    agentes e registros — para que autonomia não vire abandono.
                  </p>
                </div>
              </Reveal>
              <Reveal className="lg:col-span-8" delay={100}>
                <ol className="space-y-0">
                  {[
                    {
                      n: "01°",
                      t: "Entender antes de editar.",
                      d: "Toda solicitação é classificada por intenção, escopo e contexto antes de qualquer linha ser tocada.",
                    },
                    {
                      n: "02°",
                      t: "Planejar antes de implementar.",
                      d: "Um plano explícito substitui adivinhações. Etapas, arquivos afetados e riscos são nomeados antes da execução.",
                    },
                    {
                      n: "03°",
                      t: "Preservar o trabalho existente.",
                      d: "O código que já funciona é patrimônio. Mudanças propõem-se sobre o que existe, nunca contra.",
                    },
                    {
                      n: "04°",
                      t: "Validar antes de declarar sucesso.",
                      d: "Nenhuma tarefa é concluída sem evidência. Testes, compilação e critérios objetivos sustentam cada conclusão.",
                    },
                    {
                      n: "05°",
                      t: "Registrar conhecimento durável.",
                      d: "Decisões, contextos e aprendizados são escritos em memória de projeto — acessíveis às próximas execuções.",
                    },
                    {
                      n: "06°",
                      t: "Pedir autorização antes de ações sensíveis.",
                      d: "Operações irreversíveis passam por um portão. Autonomia não significa licença para agir sem consentimento.",
                      highlight: true,
                    },
                  ].map((p) => (
                    <li
                      key={p.n}
                      className="grid grid-cols-12 gap-4 lg:gap-8 py-7 border-t"
                      style={{ borderColor: "var(--line)" }}
                    >
                      <span
                        className="col-span-2 mono text-sm"
                        style={{
                          color: p.highlight ? "var(--mustard)" : "var(--gold)",
                        }}
                      >
                        {p.n}
                      </span>
                      <div className="col-span-10">
                        <h3
                          className="serif text-2xl lg:text-3xl mb-2"
                          style={{ fontWeight: 400 }}
                        >
                          {p.t}
                        </h3>
                        <p
                          className="serif text-base leading-relaxed"
                          style={{ color: "var(--ink-dim)" }}
                        >
                          {p.d}
                        </p>
                      </div>
                    </li>
                  ))}
                  <div
                    className="border-t border-b"
                    style={{ borderColor: "var(--line)", height: "1px" }}
                  ></div>
                </ol>
              </Reveal>
            </div>
          </div>
        </section>

        {/* WORKFLOW */}
        <section
          id="workflow"
          className="relative px-6 lg:px-12 py-32 lg:py-48"
        >
          <div className="max-w-[1440px] mx-auto">
            <SectionTitle
              section="§ II"
              title={
                <>
                  Seis estágios, uma{" "}
                  <em style={{ color: "var(--gold)", fontStyle: "italic" }}>
                    trilha contínua
                  </em>
                  .
                </>
              }
              desc="Cada solicitação entra como intenção e sai como registro. O que está entre os dois é o trabalho silencioso de classificar, planejar, implementar, validar e lembrar."
            />
            <WorkflowTrail />
          </div>
        </section>

        {/* AGENTES */}
        <section id="agentes" className="relative px-6 lg:px-12 py-32 lg:py-48">
          <div className="max-w-[1440px] mx-auto">
            <SectionTitle
              section="§ III"
              title={
                <>
                  Seis especialistas,{" "}
                  <em style={{ color: "var(--gold)", fontStyle: "italic" }}>
                    um mesmo sistema
                  </em>
                  .
                </>
              }
              desc="Cada agente tem papel definido, símbolo próprio e jurisdição clara. Eles se conectam por contratos explícitos — não por improvisos de prompt."
            />

            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-px"
              style={{ background: "var(--line)" }}
            >
              {[
                {
                  span: "lg:col-span-5",
                  role: "classificador",
                  name: "Nexus",
                  desc: "Recebe a solicitação e a decompõe em tipo, escopo, risco e contexto. É a porta de entrada — onde a intenção vira estrutura.",
                  stage: "etapa 01 · classificação",
                  svg: `<svg width="56" height="56" viewBox="0 0 56 56" class="agent-symbol"><circle cx="28" cy="28" r="22" fill="none" stroke="#d4af6a" stroke-width="1" opacity="0.4"/><circle cx="28" cy="28" r="14" fill="none" stroke="#d4af6a" stroke-width="1" opacity="0.7"/><circle cx="28" cy="28" r="6" fill="none" stroke="#d4af6a" stroke-width="1.2"/><circle cx="28" cy="28" r="2" fill="#d4af6a"/><line x1="28" y1="2" x2="28" y2="8" stroke="#d4af6a" stroke-width="1"/><line x1="28" y1="48" x2="28" y2="54" stroke="#d4af6a" stroke-width="1"/><line x1="2" y1="28" x2="8" y2="28" stroke="#d4af6a" stroke-width="1"/><line x1="48" y1="28" x2="54" y2="28" stroke="#d4af6a" stroke-width="1"/></svg>`,
                },
                {
                  span: "lg:col-span-4",
                  role: "planejador",
                  name: "Scout",
                  desc: "Explora o código, mapeia dependências e propõe um plano. Sua função é ver antes — antecipar o caminho.",
                  stage: "etapa 02 · planejamento",
                  svg: `<svg width="56" height="56" viewBox="0 0 56 56" class="agent-symbol"><path d="M 28 4 L 33 24 L 52 28 L 33 32 L 28 52 L 23 32 L 4 28 L 23 24 Z" fill="none" stroke="#d4af6a" stroke-width="1.2"/><circle cx="28" cy="28" r="4" fill="#d4af6a"/></svg>`,
                },
                {
                  span: "lg:col-span-3",
                  role: "portão",
                  name: "Gate",
                  desc: "Avalia riscos e pede autorização antes de ações sensíveis.",
                  stage: "etapa 03 · autorização",
                  svg: `<svg width="48" height="48" viewBox="0 0 48 48" class="agent-symbol"><line x1="14" y1="6" x2="14" y2="42" stroke="#d4af6a" stroke-width="1.4"/><line x1="34" y1="6" x2="34" y2="42" stroke="#d4af6a" stroke-width="1.4"/><rect x="22" y="20" width="4" height="8" fill="#d4af6a"/></svg>`,
                },
                {
                  span: "lg:col-span-3",
                  role: "construtor",
                  name: "Forge",
                  desc: "Executa o plano em passos controlados e reversíveis.",
                  stage: "etapa 04 · implementação",
                  svg: `<svg width="48" height="48" viewBox="0 0 48 48" class="agent-symbol"><path d="M 24 4 L 42 36 L 6 36 Z" fill="none" stroke="#d4af6a" stroke-width="1.4"/><circle cx="24" cy="26" r="2.5" fill="#d4af6a"/></svg>`,
                },
                {
                  span: "lg:col-span-4",
                  role: "validador",
                  name: "Aegis",
                  desc: "Submete o trabalho a critérios objetivos — testes, tipos, contratos. Sem evidência, não há conclusão.",
                  stage: "etapa 05 · validação",
                  svg: `<svg width="56" height="56" viewBox="0 0 56 56" class="agent-symbol"><path d="M 28 4 L 48 12 L 48 28 Q 48 42 28 52 Q 8 42 8 28 L 8 12 Z" fill="none" stroke="#d4af6a" stroke-width="1.4"/><path d="M 18 28 L 25 35 L 38 20" fill="none" stroke="#d4af6a" stroke-width="1.6"/></svg>`,
                },
                {
                  span: "lg:col-span-5",
                  role: "memória",
                  name: "Patch",
                  desc: "Escreve decisões, contextos e aprendizados em memória durável. Costura o que foi feito ao que será feito.",
                  stage: "etapa 06 · memória · persistente",
                  highlight: true,
                  svg: `<svg width="56" height="56" viewBox="0 0 56 56" class="agent-symbol"><line x1="8" y1="8" x2="48" y2="48" stroke="#d4af6a" stroke-width="1.2"/><line x1="48" y1="8" x2="8" y2="48" stroke="#d4af6a" stroke-width="1.2"/><circle cx="28" cy="28" r="4" fill="#c8922a"/></svg>`,
                },
              ].map((agent) => (
                <Reveal key={agent.name} className={agent.span}>
                  <AgentCard agent={agent} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* DISTRIBUIÇÕES */}
        <section
          id="distribuicoes"
          className="relative px-6 lg:px-12 py-32 lg:py-48"
        >
          <div className="max-w-[1440px] mx-auto">
            <SectionTitle
              section="§ IV"
              title={
                <>
                  Duas ferramentas,{" "}
                  <em style={{ color: "var(--gold)", fontStyle: "italic" }}>
                    mesmo ofício
                  </em>
                  .
                </>
              }
              desc="O FlowAI existe em duas formas: uma integrada ao OpenCode, outra portátil baseada em AGENTS.md. Escolha conforme o ferramental do seu projeto."
            />
            <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
              {[
                {
                  pkg: "@mvoikolesco/flowai",
                  type: "integrado",
                  desc: "Integração completa com OpenCode. O workflow é executado nativamente, com acesso a todas as etapas, agentes e memória persistente do projeto.",
                  features: [
                    "orquestração nativa via OpenCode",
                    "seis agentes com jurisdições próprias",
                    "memória de projeto persistente",
                  ],
                },
                {
                  pkg: "@mvoikolesco/flowai-portable",
                  type: "agnóstico",
                  desc: "Workflow agnóstico baseado em AGENTS.md e skills compartilhadas. Leve o método para qualquer ferramenta que respeite o protocolo.",
                  features: [
                    "protocolo AGENTS.md como contrato",
                    "skills reutilizáveis entre projetos",
                    "compatível com múltiplos runtimes",
                  ],
                },
              ].map((dist) => (
                <Reveal
                  key={dist.pkg}
                  className="artifact p-8 lg:p-12 relative"
                >
                  <div className="flex items-center justify-between mb-8">
                    <span className="label-mono">distribuição {dist.type}</span>
                    <span
                      className="mono text-[10px] px-2 py-1 border"
                      style={{
                        borderColor:
                          dist.type === "integrado"
                            ? "var(--gold)"
                            : "var(--line-strong)",
                        color:
                          dist.type === "integrado"
                            ? "var(--gold)"
                            : "var(--ink-dim)",
                      }}
                    >
                      {dist.type}
                    </span>
                  </div>
                  <h3 className="title-display text-3xl lg:text-4xl mb-4">
                    {dist.pkg}
                  </h3>
                  <p
                    className="serif text-base leading-relaxed mb-8"
                    style={{ color: "var(--ink-dim)" }}
                  >
                    {dist.desc}
                  </p>
                  <div className="space-y-3 mb-8">
                    {dist.features.map((f) => (
                      <div
                        key={f}
                        className="flex items-start gap-3 mono text-xs"
                      >
                        <span style={{ color: "var(--gold)" }}>°</span>
                        <span style={{ color: "var(--ink-dim)" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <div
                    className="mono text-xs p-4 border"
                    style={{
                      borderColor: "var(--line)",
                      background: "rgba(0,0,0,0.4)",
                    }}
                  >
                    <span style={{ color: "var(--ink-mute)" }}>$</span>{" "}
                    <span style={{ color: "var(--ink)" }}>npm install</span>{" "}
                    <span style={{ color: "var(--gold)" }}>{dist.pkg}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* TERMINAL */}
        <section
          id="terminal"
          className="relative px-6 lg:px-12 py-32 lg:py-48"
        >
          <div className="max-w-[1440px] mx-auto">
            <SectionTitle
              section="§ V"
              title={
                <>
                  Três linhas para{" "}
                  <em style={{ color: "var(--gold)", fontStyle: "italic" }}>
                    começar
                  </em>
                  .
                </>
              }
              desc="Instale. Inicialize. Chame o FlowAI dentro do seu agente. O workflow passa a operar entre a solicitação e a resposta."
            />
            <Reveal className="max-w-3xl">
              <div ref={terminalRef} className="terminal relative">
                <div
                  className="flex items-center justify-between px-5 py-3 border-b"
                  style={{ borderColor: "var(--line)" }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: "rgba(212,175,106,0.3)" }}
                    ></div>
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: "rgba(212,175,106,0.5)" }}
                    ></div>
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: "var(--gold)" }}
                    ></div>
                  </div>
                  <span
                    className="mono text-[10px]"
                    style={{ color: "var(--ink-mute)" }}
                  >
                    ~ / project
                  </span>
                </div>
                <div className="p-5 lg:p-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <span
                      className="mono select-none"
                      style={{ color: "var(--mustard)" }}
                    >
                      $
                    </span>
                    <span className="mono flex-1">
                      <span style={{ color: "var(--ink)" }}>npm install</span>{" "}
                      <span style={{ color: "var(--gold)" }}>
                        @mvoikolesco/flowai
                      </span>
                      {!terminalLines[1] && <span className="blink"></span>}
                    </span>
                  </div>
                  {terminalLines[1] && (
                    <div
                      className="mono text-xs"
                      style={{ color: "var(--ink-mute)" }}
                    >
                      <span style={{ color: "var(--gold)" }}>°</span> adicionado
                      a dependencies · 1 pacote · 12s
                    </div>
                  )}
                  {terminalLines[2] && (
                    <div className="flex items-start gap-3">
                      <span
                        className="mono select-none"
                        style={{ color: "var(--mustard)" }}
                      >
                        $
                      </span>
                      <span className="mono flex-1">
                        <span style={{ color: "var(--ink)" }}>npx flowai</span>{" "}
                        <span style={{ color: "var(--gold)" }}>init</span>
                        {!terminalLines[3] && <span className="blink"></span>}
                      </span>
                    </div>
                  )}
                  {terminalLines[3] && (
                    <div
                      className="mono text-xs"
                      style={{ color: "var(--ink-mute)" }}
                    >
                      <span style={{ color: "var(--gold)" }}>°</span> AGENTS.md
                      criado · skills registradas · memória inicializada
                    </div>
                  )}
                  {terminalLines[4] && (
                    <div className="flex items-start gap-3">
                      <span
                        className="mono select-none"
                        style={{ color: "var(--mustard)" }}
                      >
                        $
                      </span>
                      <span className="mono flex-1">
                        <span style={{ color: "var(--ink)" }}>flowai</span>{" "}
                        <span style={{ color: "var(--gold)" }}>run</span>{" "}
                        <span style={{ color: "var(--ink-dim)" }}>
                          "adicionar validação no endpoint /auth"
                        </span>
                        {!terminalLines[5] && <span className="blink"></span>}
                      </span>
                    </div>
                  )}
                  {terminalLines[5] && (
                    <div
                      className="mono text-xs"
                      style={{ color: "var(--ink-mute)" }}
                    >
                      <span style={{ color: "var(--gold)" }}>°</span> Nexus
                      classificou · Scout planejou · Forge implementou
                      <br />
                      <span style={{ color: "var(--gold)" }}>°</span> Aegis
                      validou · Patch persistiu memória
                      <br />
                      <span style={{ color: "var(--mustard)" }}>°</span>{" "}
                      workflow concluído · 6 etapas · evidências em /memory
                    </div>
                  )}
                </div>
                <div
                  className="px-5 py-3 border-t flex items-center justify-between"
                  style={{ borderColor: "var(--line)" }}
                >
                  <span
                    className="mono text-[10px]"
                    style={{ color: "var(--ink-mute)" }}
                  >
                    comando principal
                  </span>
                  <button
                    onClick={handleCopy}
                    className="mono text-[11px] px-3 py-1.5 border flex items-center gap-2 transition-colors"
                    style={{
                      borderColor: copied
                        ? "var(--mustard)"
                        : "var(--line-strong)",
                      color: copied ? "var(--mustard)" : "var(--ink-dim)",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <rect
                        x="3"
                        y="3"
                        width="6"
                        height="6"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                      <path
                        d="M 1 8 L 1 1 L 8 1"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                      />
                    </svg>
                    <span>{copied ? "copiado" : "copiar"}</span>
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* MEMÓRIA */}
        <section id="memoria" className="relative px-6 lg:px-12 py-32 lg:py-48">
          <div className="max-w-[1440px] mx-auto">
            <SectionTitle
              section="§ VI"
              title={
                <>
                  O projeto{" "}
                  <em style={{ color: "var(--gold)", fontStyle: "italic" }}>
                    lembra de si
                  </em>
                  .
                </>
              }
              desc="Cada execução escreve na memória: decisões, contextos, atalhos, restrições. O que foi aprendido vira estrutura para a próxima execução."
            />

            <Reveal className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-8 relative">
                <div
                  className="border p-6 lg:p-10 relative"
                  style={{
                    borderColor: "var(--line)",
                    background:
                      "linear-gradient(180deg, rgba(212,175,106,0.02), transparent)",
                  }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="mono text-[11px]"
                      style={{ color: "var(--ink-dim)" }}
                    >
                      memory.graph · 12 nós · 18 conexões
                    </span>
                    <span
                      className="mono text-[10px]"
                      style={{ color: "var(--ink-mute)" }}
                    >
                      live
                    </span>
                  </div>
                  <svg
                    viewBox="0 0 700 480"
                    className="w-full"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    {/* Conexões estáticas para performance */}
                    <g
                      stroke="#d4af6a"
                      strokeWidth="0.8"
                      fill="none"
                      opacity="0.4"
                    >
                      <line x1="150" y1="100" x2="280" y2="180" />
                      <line x1="280" y1="180" x2="420" y2="120" />
                      <line x1="280" y1="180" x2="380" y2="280" />
                      <line x1="420" y1="120" x2="550" y2="200" />
                      <line x1="380" y1="280" x2="550" y2="200" />
                      <line x1="380" y1="280" x2="500" y2="380" />
                      <line x1="150" y1="100" x2="200" y2="240" />
                      <line x1="200" y1="240" x2="280" y2="180" />
                      <line x1="200" y1="240" x2="380" y2="280" />
                      <line x1="550" y1="200" x2="620" y2="320" />
                      <line x1="500" y1="380" x2="620" y2="320" />
                      <line x1="500" y1="380" x2="350" y2="420" />
                      <line x1="200" y1="240" x2="120" y2="380" />
                      <line x1="120" y1="380" x2="350" y2="420" />
                      <line x1="350" y1="420" x2="500" y2="380" />
                    </g>
                    {/* Nós simplificados */}
                    {[
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
                    ].map((node) => (
                      <g
                        key={node.l}
                        transform={`translate(${node.x}, ${node.y})`}
                      >
                        <circle
                          r={node.r}
                          fill="rgba(212,175,106,0.05)"
                          stroke="#d4af6a"
                          strokeWidth="1"
                        />
                        <circle r="3" fill="#d4af6a" />
                        <text
                          y="28"
                          textAnchor="middle"
                          fill="#b8a888"
                          fontFamily="JetBrains Mono"
                          fontSize="9"
                        >
                          {node.l}
                        </text>
                      </g>
                    ))}
                    {/* Novo nó sendo escrito (animação leve) */}
                    <g transform="translate(280, 180)">
                      <circle r="4" fill="#d4af6a" className="mem-pulse" />
                      <text
                        y="50"
                        textAnchor="middle"
                        fill="#7a6b54"
                        fontFamily="JetBrains Mono"
                        fontSize="8"
                      >
                        root
                      </text>
                    </g>

                    <line
                      x1="550"
                      y1="200"
                      x2="620"
                      y2="100"
                      stroke="#c8922a"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="0"
                        to="-12"
                        dur="1.2s"
                        repeatCount="indefinite"
                      />
                    </line>
                    <g transform="translate(620, 100)">
                      <circle
                        r="14"
                        fill="rgba(200,146,42,0.15)"
                        stroke="#c8922a"
                        strokeWidth="1.5"
                      >
                        <animate
                          attributeName="r"
                          values="14;17;14"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle r="4" fill="#c8922a" className="mem-pulse" />
                      <text
                        y="28"
                        textAnchor="middle"
                        fill="#d4af6a"
                        fontFamily="JetBrains Mono"
                        fontSize="9"
                      >
                        + rate-limit.md
                      </text>
                      <text
                        y="40"
                        textAnchor="middle"
                        fill="#c8922a"
                        fontFamily="JetBrains Mono"
                        fontSize="7"
                      >
                        writing...
                      </text>
                    </g>
                    <g
                      stroke="#d4af6a"
                      strokeWidth="0.6"
                      opacity="0.4"
                      fill="none"
                    >
                      <path d="M 10 10 L 10 25 M 10 10 L 25 10" />
                      <path d="M 690 10 L 690 25 M 690 10 L 675 10" />
                      <path d="M 10 470 L 10 455 M 10 470 L 25 470" />
                      <path d="M 690 470 L 690 455 M 690 470 L 675 470" />
                    </g>
                  </svg>
                  <div
                    className="mt-4 flex items-center justify-between mono text-[10px]"
                    style={{ color: "var(--ink-mute)" }}
                  >
                    <span>ultima escrita: 14:32 - Patch</span>
                    <span>memoria viva</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div
                  className="border-l pl-6"
                  style={{ borderColor: "var(--line-strong)" }}
                >
                  <div className="label-mono mb-6">registros recentes</div>
                  <div className="space-y-7">
                    {[
                      {
                        time: "14:32",
                        agent: "patch · auth",
                        text: "Rate-limit adicionado ao endpoint /auth. Decisão: token bucket, 10 req/min.",
                      },
                      {
                        time: "14:18",
                        agent: "aegis · validate",
                        text: "24 testes, 0 falhas. Tipos limpos. Critério de conclusão atendido.",
                      },
                      {
                        time: "14:05",
                        agent: "scout · plan",
                        text: "Plano para feature de rate-limit: 4 arquivos, 6 etapas, 1 risco mapeado.",
                      },
                      {
                        time: "13:58",
                        agent: "nexus · classify",
                        text: "Solicitação classificada como feature · segurança · média complexidade.",
                      },
                    ].map((r) => (
                      <div key={r.time}>
                        <div className="flex items-baseline gap-3 mb-2">
                          <span
                            className="mono text-[10px]"
                            style={{ color: "var(--gold)" }}
                          >
                            {r.time}
                          </span>
                          <span
                            className="mono text-[10px]"
                            style={{ color: "var(--ink-mute)" }}
                          >
                            {r.agent}
                          </span>
                        </div>
                        <p
                          className="serif text-sm leading-relaxed"
                          style={{ color: "var(--ink-dim)" }}
                        >
                          {r.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="relative px-6 lg:px-12 py-32 lg:py-48 overflow-hidden">
          <div className="max-w-[1440px] mx-auto relative text-center">
            <Reveal>
              <h2 className="title-display text-4xl md:text-6xl lg:text-7xl mb-10">
                Transforme velocidade em{" "}
                <em style={{ color: "var(--gold)", fontStyle: "italic" }}>
                  engenharia confiável
                </em>
                .
              </h2>
              <a
                href="https://www.npmjs.com/package/@mvoikolesco/flowai"
                target="_blank"
                rel="noopener"
                className="btn-primary inline-flex"
              >
                <span>Conhecer o FlowAI no npm</span>
                <span>→</span>
              </a>
            </Reveal>
          </div>
        </section>

        {/* FOOTER */}
        <footer
          className="relative px-6 lg:px-12 py-16 border-t"
          style={{ borderColor: "var(--line)" }}
        >
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <svg width="26" height="26" viewBox="0 0 30 30">
                <circle
                  cx="15"
                  cy="15"
                  r="13"
                  fill="none"
                  stroke="#d4af6a"
                  strokeWidth="0.8"
                  opacity="0.4"
                />
                <circle
                  cx="15"
                  cy="15"
                  r="8.5"
                  fill="none"
                  stroke="#d4af6a"
                  strokeWidth="0.8"
                  opacity="0.7"
                />
                <circle cx="15" cy="15" r="3" fill="#d4af6a" />
              </svg>
              <span className="serif text-lg font-medium">FlowAI</span>
            </div>
            <p
              className="mono text-[10px]"
              style={{ color: "var(--ink-mute)" }}
            >
              MIT · uso livre · sem garantia
            </p>
            <div className="flex gap-6">
              <a
                href="https://www.npmjs.com/package/@mvoikolesco/flowai"
                target="_blank"
                rel="noopener"
                className="mono text-xs ulink"
              >
                @mvoikolesco/flowai
              </a>
              <a
                href="https://www.npmjs.com/package/@mvoikolesco/flowai-portable"
                target="_blank"
                rel="noopener"
                className="mono text-xs ulink"
              >
                @mvoikolesco/flowai-portable
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
