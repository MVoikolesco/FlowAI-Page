import React from "react";
import { distributions } from "../data/content";
import { Reveal } from "../components/Reveal";
import { SectionTitle } from "../components/SectionTitle";

export const DistributionsSection: React.FC = () => (
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
              {distributions.map((dist) => (
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
);
