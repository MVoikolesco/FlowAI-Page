import React from "react";
import { manifestoPrinciples } from "../data/content";
import { Reveal } from "../components/Reveal";

export const ManifestoSection: React.FC = () => (
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
                  {manifestoPrinciples.map((p) => (
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
);
