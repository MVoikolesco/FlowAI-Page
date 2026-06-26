import React from "react";
import type { Agent } from "../data/content";

export const AgentCard: React.FC<{ agent: Agent }> = React.memo(({ agent }) => (
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
