import React from "react";
import { agents } from "../data/content";
import { AgentCard } from "../components/AgentCard";
import { Reveal } from "../components/Reveal";
import { SectionTitle } from "../components/SectionTitle";

export const AgentsSection: React.FC = () => (
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
              {agents.map((agent) => (
                <Reveal key={agent.name} className={agent.span}>
                  <AgentCard agent={agent} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
);
