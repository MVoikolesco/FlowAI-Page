import React from "react";
import { Reveal } from "../components/Reveal";

export const CtaSection: React.FC = () => (
<section className="relative px-6 lg:px-12 py-32 lg:py-48 overflow-hidden">
          <div className="max-w-[1440px] mx-auto relative text-center">
            <Reveal>
              <h2 className="title-display text-4xl md:text-6xl lg:text-7xl mb-10">
                Transforme velocidade em{" "}
                <em style={{ color: "var(--gold)", fontStyle: "italic" }}>
                  engenharia confiável
                </em>
                .
              </h2>
              <a
                href="https://www.npmjs.com/package/@mvoikolesco/flowai"
                target="_blank"
                rel="noopener"
                className="btn-primary inline-flex"
              >
                <span>Conhecer o FlowAI no npm</span>
                <span>→</span>
              </a>
            </Reveal>
          </div>
        </section>
);
