import React from "react";
import { heroWorkflowIndex, mobileWorkflowLabels } from "../data/content";
import { WorkflowNode } from "../components/WorkflowNode";

export const Hero: React.FC = () => (
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
              {heroWorkflowIndex.map((item) => (
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
            {mobileWorkflowLabels.map((label, i) => (
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
