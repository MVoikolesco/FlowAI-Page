import React, { useEffect, useRef } from "react";

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !window.matchMedia ||
      window.matchMedia("(hover: none), (pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let frame = 0;

    document.documentElement.classList.add("cursor-enabled");

    const moveCursor = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
    };

    const setInteractiveState = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const active = Boolean(
        target?.closest('a, button, [data-cursor="active"]'),
      );
      dotRef.current?.classList.toggle("active", active);
      ringRef.current?.classList.toggle("active", active);
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }
      frame = requestAnimationFrame(animateRing);
    };

    window.addEventListener("pointermove", moveCursor);
    window.addEventListener("pointerover", setInteractiveState);
    frame = requestAnimationFrame(animateRing);

    return () => {
      document.documentElement.classList.remove("cursor-enabled");
      window.removeEventListener("pointermove", moveCursor);
      window.removeEventListener("pointerover", setInteractiveState);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true"></div>
      <div className="cursor-ring" ref={ringRef} aria-hidden="true"></div>
    </>
  );
};
