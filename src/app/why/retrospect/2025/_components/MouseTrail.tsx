"use client";

import { useEffect, useState, useCallback } from "react";

type TrailPoint = {
  id: number;
  x: number;
  y: number;
  opacity: number;
};

export const MouseTrail = () => {
  const [trail, setTrail] = useState<TrailPoint[]>([]);

  const addPoint = useCallback((x: number, y: number) => {
    setTrail((prev) => {
      const newTrail = [
        ...prev,
        { id: Date.now(), x, y, opacity: 1 },
      ].slice(-20); // Keep last 20 points
      return newTrail;
    });
  }, []);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const distance = Math.sqrt(
        Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2)
      );

      if (distance > 10) {
        addPoint(e.clientX, e.clientY);
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [addPoint]);

  useEffect(() => {
    if (trail.length === 0) return;

    const interval = setInterval(() => {
      setTrail((prev) =>
        prev
          .map((p) => ({ ...p, opacity: p.opacity - 0.05 }))
          .filter((p) => p.opacity > 0)
      );
    }, 30);

    return () => clearInterval(interval);
  }, [trail.length]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="absolute"
          style={{
            left: point.x,
            top: point.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <svg
            width={8 + index * 0.3}
            height={8 + index * 0.3}
            viewBox="0 0 24 24"
            fill="none"
            style={{ opacity: point.opacity * 0.6 }}
          >
            <path
              d="M12 2L14.09 8.26L20.18 9.27L15.54 13.14L16.82 19.02L12 16.27L7.18 19.02L8.46 13.14L3.82 9.27L9.91 8.26L12 2Z"
              fill="url(#starGradient)"
            />
            <defs>
              <linearGradient
                id="starGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  );
};
