import React from "react";
import { Reveal } from "./Reveal";

export const SectionTitle: React.FC<{
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
