import React from "react";
import { memoryNodes, recentRecords } from "../data/content";
import { Reveal } from "../components/Reveal";
import { SectionTitle } from "../components/SectionTitle";

export const MemorySection: React.FC = () => (
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
                    {memoryNodes.map((node) => (
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
                    {recentRecords.map((r) => (
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
);
