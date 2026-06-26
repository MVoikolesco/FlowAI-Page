import React from "react";

export const Footer: React.FC = () => (
<footer
          className="relative px-6 lg:px-12 py-16 border-t"
          style={{ borderColor: "var(--line)" }}
        >
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <svg width="26" height="26" viewBox="0 0 30 30">
                <circle
                  cx="15"
                  cy="15"
                  r="13"
                  fill="none"
                  stroke="#d4af6a"
                  strokeWidth="0.8"
                  opacity="0.4"
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
              <span className="serif text-lg font-medium">FlowAI</span>
            </div>
            <p
              className="mono text-[10px]"
              style={{ color: "var(--ink-mute)" }}
            >
              MIT · uso livre · sem garantia
            </p>
            <div className="flex gap-6">
              <a
                href="https://www.npmjs.com/package/@mvoikolesco/flowai"
                target="_blank"
                rel="noopener"
                className="mono text-xs ulink"
              >
                @mvoikolesco/flowai
              </a>
              <a
                href="https://www.npmjs.com/package/@mvoikolesco/flowai-portable"
                target="_blank"
                rel="noopener"
                className="mono text-xs ulink"
              >
                @mvoikolesco/flowai-portable
              </a>
            </div>
          </div>
        </footer>
);
