import React, { useCallback, useEffect, useState } from "react";
import { useInView } from "../hooks/useInView";
import { Reveal } from "../components/Reveal";
import { SectionTitle } from "../components/SectionTitle";

export const TerminalSection: React.FC = () => {
  const [terminalLines, setTerminalLines] = useState([true, false, false, false, false, false]);
  const { ref: terminalRef, inView: terminalInView } = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (terminalInView) {
      const timers: ReturnType<typeof setTimeout>[] = [];
      timers.push(setTimeout(() => setTerminalLines([true, true, false, false, false, false]), 800));
      timers.push(setTimeout(() => setTerminalLines([true, true, true, false, false, false]), 1400));
      timers.push(setTimeout(() => setTerminalLines([true, true, true, true, false, false]), 2600));
      timers.push(setTimeout(() => setTerminalLines([true, true, true, true, true, false]), 3300));
      timers.push(setTimeout(() => setTerminalLines([true, true, true, true, true, true]), 4700));
      return () => timers.forEach(clearTimeout);
    }
  }, [terminalInView]);

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
  );
};
