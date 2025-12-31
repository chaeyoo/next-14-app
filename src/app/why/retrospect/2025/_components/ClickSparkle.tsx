"use client";

import { useEffect, useState, useCallback } from "react";

type Particle = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
};

const COLORS = [
  "#a855f7", // purple
  "#ec4899", // pink
  "#f97316", // orange
  "#06b6d4", // cyan
  "#fbbf24", // amber
  "#22c55e", // green
];

export const ClickSparkle = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const createParticles = useCallback((x: number, y: number) => {
    const newParticles: Particle[] = [];
    const count = 12;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const velocity = 3 + Math.random() * 4;

      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 4 + Math.random() * 6,
        life: 1,
      });
    }

    setParticles((prev) => [...prev, ...newParticles]);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      createParticles(e.clientX, e.clientY);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [createParticles]);

  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.15, // gravity
            life: p.life - 0.03,
          }))
          .filter((p) => p.life > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [particles.length]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60]">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size * p.life,
            height: p.size * p.life,
            backgroundColor: p.color,
            opacity: p.life,
            transform: "translate(-50%, -50%)",
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
};
