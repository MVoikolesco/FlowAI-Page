import React from "react";
import { useInView } from "../hooks/useInView";

export const Reveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = React.memo(({ children, className = "", delay = 0 }) => {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
});
Reveal.displayName = "Reveal";
