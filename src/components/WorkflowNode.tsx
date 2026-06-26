import React from "react";

export const WorkflowNode: React.FC<{
  label: string;
  index: string;
  active?: boolean;
}> = React.memo(({ label, index, active }) => (
  <g className="node-group">
    <circle r="42" fill="rgba(212,175,106,0.03)" />
    <circle
      r="26"
      fill="none"
      stroke="rgba(212,175,106,0.2)"
      strokeWidth="0.8"
    />
    <circle
      r="18"
      fill="rgba(212,175,106,0.04)"
      stroke="#d4af6a"
      strokeWidth="1.4"
    />
    <circle
      r="3"
      fill={active ? "#c8922a" : "#d4af6a"}
      className="node-breathe"
      style={{ animationDelay: active ? "-2.5s" : "-1s" }}
    />
    <text
      y="58"
      textAnchor="middle"
      fill="#b8a888"
      fontFamily="JetBrains Mono"
      fontSize="10"
      letterSpacing="1.5"
    >
      {label}
    </text>
    <text
      y="73"
      textAnchor="middle"
      fill="#7a6b54"
      fontFamily="JetBrains Mono"
      fontSize="9"
    >
      {index}
    </text>
  </g>
));
WorkflowNode.displayName = "WorkflowNode";
