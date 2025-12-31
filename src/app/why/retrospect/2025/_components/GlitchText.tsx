"use client";

import { useEffect, useState } from "react";

type GlitchTextProps = {
  text: string;
  className?: string;
};

export const GlitchText = ({ text, className = "" }: GlitchTextProps) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Main text */}
      <span className="relative z-10">{text}</span>

      {/* Glitch layers */}
      {isGlitching && (
        <>
          <span
            className="absolute top-0 left-0 z-20 text-cyan-400 opacity-80"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
              transform: "translate(-2px, -1px)",
              animation: "glitch-1 0.2s infinite linear alternate-reverse",
            }}
          >
            {text}
          </span>
          <span
            className="absolute top-0 left-0 z-20 text-red-400 opacity-80"
            style={{
              clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
              transform: "translate(2px, 1px)",
              animation: "glitch-2 0.2s infinite linear alternate-reverse",
            }}
          >
            {text}
          </span>
        </>
      )}

      <style jsx>{`
        @keyframes glitch-1 {
          0% {
            transform: translate(-2px, -1px);
          }
          100% {
            transform: translate(2px, 1px);
          }
        }
        @keyframes glitch-2 {
          0% {
            transform: translate(2px, 1px);
          }
          100% {
            transform: translate(-2px, -1px);
          }
        }
      `}</style>
    </span>
  );
};
