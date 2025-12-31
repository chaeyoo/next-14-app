"use client";

import { PartyPopper } from "lucide-react";
import { useScrollAnimation } from "../_hooks/useScrollAnimation";
import { useEffect, useState } from "react";

type Confetti = {
  id: number;
  x: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
};

const COLORS = [
  "bg-purple-400",
  "bg-pink-400",
  "bg-blue-400",
  "bg-cyan-400",
  "bg-amber-400",
  "bg-rose-400",
  "bg-violet-400",
  "bg-orange-400",
];

export const ClosingSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  useEffect(() => {
    if (isVisible) {
      const pieces: Confetti[] = [];
      for (let i = 0; i < 50; i++) {
        pieces.push({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 2,
          duration: Math.random() * 3 + 2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: Math.random() * 8 + 4,
        });
      }
      setConfetti(pieces);
    }
  }, [isVisible]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden"
    >
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-transparent" />

      {/* 콘페티 효과 */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className={`absolute top-0 ${piece.color} rounded-sm opacity-80`}
          style={{
            left: `${piece.x}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            animation: `fall ${piece.duration}s ease-out forwards`,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}

      <div className="relative text-center max-w-4xl">
        {/* 아이콘 */}
        <div
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        >
          <div className="inline-flex p-6 md:p-8 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500">
            <PartyPopper className="w-12 h-12 md:w-16 md:h-16 text-white" />
          </div>
        </div>

        {/* 메인 메시지 */}
        <h2
          className={`text-3xl md:text-5xl lg:text-7xl font-black leading-tight transition-all duration-700 delay-200 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent">
            2025년,
          </span>
          <br />
          <span className="text-white">정말 수고 많았어요</span>
        </h2>

        {/* 서브 메시지 */}
        <p
          className={`mt-6 md:mt-8 text-lg md:text-2xl text-white/70 leading-relaxed transition-all duration-700 delay-400 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          어떤 순간이든, 그 자리에 있었던 당신이 대단해요.
          <br className="hidden md:block" />
          <span className="md:hidden"> </span>
          2026년도 함께 빛나는 한 해가 되길!
        </p>

        {/* 연도 전환 */}
        <div
          className={`mt-12 md:mt-16 flex items-center justify-center gap-4 md:gap-8 transition-all duration-700 delay-600 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-4xl md:text-6xl font-bold text-white/30">
            2025
          </span>
          <div className="flex items-center gap-2">
            <div className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-white/30 to-white/50" />
            <div className="w-3 h-3 md:w-4 md:h-4 rotate-45 bg-gradient-to-br from-amber-400 to-rose-400" />
            <div className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-white/50 to-white/30" />
          </div>
          <span className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent">
            2026
          </span>
        </div>

        {/* 화이팅 메시지 */}
        <div
          className={`mt-12 md:mt-16 transition-all duration-700 delay-800 ${
            isVisible
              ? "opacity-100 scale-100"
              : "opacity-0 scale-90"
          }`}
        >
          <span className="inline-block px-6 py-3 md:px-8 md:py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-lg md:text-xl text-white/80 font-medium">
            Happy New Year! 🎉
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};
