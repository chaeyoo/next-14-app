"use client";

import { useEffect, useState } from "react";
import { useMousePosition } from "../_hooks/useMousePosition";

type Star = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDuration: number;
  animationDelay: number;
  layer: number; // 패럴랙스 레이어 (1, 2, 3)
};

export const StarBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const { normalizedX, normalizedY } = useMousePosition();

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      const starCount = 200;

      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.7 + 0.3,
          animationDuration: Math.random() * 3 + 2,
          animationDelay: Math.random() * 2,
          layer: Math.floor(Math.random() * 3) + 1,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 패럴랙스 + 마우스 반응 계산
  const getParallaxStyle = (layer: number) => {
    const parallaxSpeed = layer * 0.05;
    const mouseSpeed = layer * 5;

    return {
      transform: `translate(${normalizedX * mouseSpeed}px, ${
        normalizedY * mouseSpeed + scrollY * parallaxSpeed
      }px)`,
      transition: "transform 0.3s ease-out",
    };
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* 그라데이션 배경 */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

      {/* 성운 효과 - 마우스 반응형 */}
      <div className="absolute inset-0" style={getParallaxStyle(2)}>
        <div
          className="absolute w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            top: `calc(25% + ${normalizedY * 20}px)`,
            left: `calc(25% + ${normalizedX * 20}px)`,
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            bottom: `calc(33% + ${normalizedY * -15}px)`,
            right: `calc(25% + ${normalizedX * -15}px)`,
            animationDelay: "1s",
          }}
        />
        <div
          className="absolute w-[350px] h-[350px] bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            top: `calc(50% + ${normalizedY * 25}px)`,
            right: `calc(33% + ${normalizedX * -25}px)`,
            animationDelay: "0.5s",
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] bg-cyan-500/8 rounded-full blur-3xl animate-pulse"
          style={{
            bottom: `calc(20% + ${normalizedY * -10}px)`,
            left: `calc(40% + ${normalizedX * 10}px)`,
            animationDelay: "1.5s",
          }}
        />
      </div>

      {/* 별들 - 레이어별 패럴랙스 */}
      {[1, 2, 3].map((layer) => (
        <div
          key={layer}
          className="absolute inset-0"
          style={getParallaxStyle(layer)}
        >
          {stars
            .filter((s) => s.layer === layer)
            .map((star) => (
              <div
                key={star.id}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  opacity: star.opacity,
                  animation: `twinkle ${star.animationDuration}s ease-in-out infinite`,
                  animationDelay: `${star.animationDelay}s`,
                }}
              />
            ))}
        </div>
      ))}

      {/* 유성 효과 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="shooting-star" />
        <div className="shooting-star delay-2" />
        <div className="shooting-star delay-4" />
        <div className="shooting-star delay-6" />
      </div>

      {/* 오로라 효과 */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(ellipse at ${50 + normalizedX * 10}% ${
            30 + normalizedY * 10
          }%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`,
          transition: "background 0.5s ease-out",
        }}
      />

      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }

        .shooting-star {
          position: absolute;
          width: 150px;
          height: 2px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(255, 255, 255, 0.8),
            transparent
          );
          top: 10%;
          left: -150px;
          animation: shoot 8s ease-in-out infinite;
          opacity: 0;
        }

        .shooting-star.delay-2 {
          animation-delay: 2s;
          top: 25%;
        }

        .shooting-star.delay-4 {
          animation-delay: 4s;
          top: 15%;
        }

        .shooting-star.delay-6 {
          animation-delay: 6s;
          top: 35%;
        }

        @keyframes shoot {
          0% {
            left: -150px;
            opacity: 0;
            transform: rotate(-45deg) translateY(0);
          }
          5% {
            opacity: 1;
          }
          35% {
            left: 110%;
            opacity: 0;
          }
          100% {
            left: 110%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
