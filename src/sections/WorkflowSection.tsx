import React from "react";
import { workflowStages } from "../data/content";
import { Reveal } from "../components/Reveal";
import { SectionTitle } from "../components/SectionTitle";

const WorkflowTrail: React.FC = () => {
  return (
    <div className="relative">
      <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 hairline-v -translate-x-1/2"></div>
      <div className="lg:hidden absolute left-[22px] top-0 bottom-0 hairline-v"></div>

      {workflowStages.map((stage) => (
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

export const WorkflowSection: React.FC = () => (
  <section id="workflow" className="relative px-6 lg:px-12 py-32 lg:py-48">
    <div className="max-w-[1440px] mx-auto">
      <SectionTitle
        section="§ II"
        title={
          <>
            Seis estágios, uma {" "}
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
);
