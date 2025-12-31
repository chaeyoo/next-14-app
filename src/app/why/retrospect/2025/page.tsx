"use client";

import { StarBackground } from "./_components/StarBackground";
import { HeroSection } from "./_components/HeroSection";
import { QuestionSection } from "./_components/QuestionSection";
import { GoalsSection } from "./_components/GoalsSection";
import { ClosingSection } from "./_components/ClosingSection";
import { MouseGlow } from "./_components/MouseGlow";
import { ScrollProgress } from "./_components/ScrollProgress";
import { ClickSparkle } from "./_components/ClickSparkle";
import { MouseTrail } from "./_components/MouseTrail";
import { RETROSPECT_QUESTIONS } from "./_constants/questions";

export default function Retrospect2025Page() {
  return (
    <main className="relative min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* 인터랙티브 글로벌 요소들 */}
      <MouseGlow />
      <ScrollProgress />
      <ClickSparkle />
      <MouseTrail />

      {/* 별 배경 (고정, 패럴랙스 + 마우스 반응) */}
      <StarBackground />

      {/* 스크롤 컨테이너 */}
      <div className="relative z-10">
        {/* Hero 섹션 - 글리치 + 타이핑 + 마그네틱 */}
        <HeroSection />

        {/* 질문 섹션들 */}
        {RETROSPECT_QUESTIONS.map((question, index) => (
          <QuestionSection key={question.id} question={question} index={index} />
        ))}

        {/* 2026 목표 섹션 - 3D 틸트 카드 */}
        <GoalsSection />

        {/* 마무리 섹션 - 콘페티 효과 */}
        <ClosingSection />

        {/* 푸터 */}
        <footer className="relative py-12 text-center">
          <p className="text-sm text-white/30">
            Made with love for your better tomorrow
          </p>
          <p className="mt-2 text-xs text-white/20">2025 Retrospect</p>
        </footer>
      </div>
    </main>
  );
}
