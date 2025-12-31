"use client";

import { useMousePosition } from "../_hooks/useMousePosition";

export const MouseGlow = () => {
  const { x, y } = useMousePosition();

  return (
    <div
      className="fixed pointer-events-none z-50 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
      style={{
        left: x - 250,
        top: y - 250,
        background:
          "radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(236,72,153,0.2) 40%, transparent 70%)",
        transition: "left 0.15s ease-out, top 0.15s ease-out",
      }}
    />
  );
};
