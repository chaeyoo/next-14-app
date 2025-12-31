"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollAnimation } from "../_hooks/useScrollAnimation";
import { GlitchText } from "./GlitchText";
import { TypeWriter } from "./TypeWriter";
import { MagneticButton } from "./MagneticButton";

export const HeroSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [typingComplete, setTypingComplete] = useState(false);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6"
    >
      <div
        className={`text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* 연도 - 글리치 효과 */}
        <h1 className="text-[120px] md:text-[200px] lg:text-[280px] font-black leading-none tracking-tighter">
          <GlitchText
            text="2025"
            className="bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 bg-clip-text text-transparent drop-shadow-2xl"
          />
        </h1>

        {/* 서브 타이틀 - 타이핑 효과 */}
        <div
          className={`mt-4 md:mt-8 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {isVisible && (
            <p className="text-xl md:text-3xl lg:text-4xl text-white/90 font-light tracking-wide h-[1.5em]">
              <TypeWriter
                text="당신의 한 해를 돌아보세요"
                delay={80}
                onComplete={() => setTypingComplete(true)}
              />
            </p>
          )}
          <p
            className={`mt-3 md:mt-4 text-sm md:text-lg text-white/50 transition-all duration-700 ${
              typingComplete
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            스크롤하여 회고를 시작하세요
          </p>
        </div>
      </div>

      {/* 스크롤 인디케이터 - 마그네틱 효과 */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          typingComplete ? "opacity-100" : "opacity-0"
        }`}
      >
        <MagneticButton strength={0.4}>
          <div className="flex flex-col items-center gap-2 animate-bounce cursor-pointer">
            <ChevronDown className="w-8 h-8 text-white/50" />
            <ChevronDown className="w-8 h-8 text-white/30 -mt-5" />
          </div>
        </MagneticButton>
      </div>

      {/* 장식 요소 - 인터랙티브 */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-purple-400 rounded-full animate-ping" />
      <div className="absolute top-1/3 right-16 w-3 h-3 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: "0.5s" }} />
      <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: "1.5s" }} />
      <div className="absolute bottom-1/4 right-10 w-3 h-3 bg-amber-400 rounded-full animate-ping" style={{ animationDelay: "2s" }} />
    </section>
  );
};
