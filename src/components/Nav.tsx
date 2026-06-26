import React from "react";

export const Nav: React.FC = () => (
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
