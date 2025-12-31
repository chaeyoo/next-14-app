"use client";

import { Rocket, Heart, Users, Sparkles } from "lucide-react";
import { useScrollAnimation } from "../_hooks/useScrollAnimation";
import { TiltCard } from "./TiltCard";

const GOALS = [
  {
    id: 1,
    title: "커리어 / 성장",
    description: "새로운 기술을 배우고, 더 나은 전문가가 되기",
    icon: Rocket,
    gradient: "from-blue-400 to-cyan-400",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    id: 2,
    title: "건강 / 웰빙",
    description: "몸과 마음 모두 건강하게 챙기기",
    icon: Heart,
    gradient: "from-rose-400 to-pink-400",
    bgGradient: "from-rose-500/10 to-pink-500/10",
  },
  {
    id: 3,
    title: "관계 / 소통",
    description: "소중한 사람들과 더 깊은 관계 만들기",
    icon: Users,
    gradient: "from-amber-400 to-orange-400",
    bgGradient: "from-amber-500/10 to-orange-500/10",
  },
  {
    id: 4,
    title: "새로운 도전",
    description: "두려움을 넘어 새로운 것에 도전하기",
    icon: Sparkles,
    gradient: "from-violet-400 to-purple-400",
    bgGradient: "from-violet-500/10 to-purple-500/10",
  },
];

export const GoalsSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation({
    threshold: 0.2,
  });
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({
    threshold: 0.1,
  });

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-violet-900/20 to-slate-900/50" />

      <div className="relative max-w-6xl w-full">
        {/* 타이틀 */}
        <div
          ref={titleRef}
          className={`text-center mb-16 md:mb-20 transition-all duration-700 ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block text-sm md:text-base font-medium tracking-widest text-violet-400 mb-4">
            NEW YEAR GOALS
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold">
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              2026년, <br/> 어떤 해로 만들까요?
            </span>
          </h2>
          <p className="mt-4 md:mt-6 text-base md:text-xl text-white/50">
            새해에 이루고 싶은 목표를 떠올려보세요
          </p>
        </div>

        {/* 목표 카드들 - TiltCard 적용 */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {GOALS.map((goal, index) => {
            const Icon = goal.icon;
            return (
              <TiltCard
                key={goal.id}
                maxTilt={12}
                scale={1.03}
                className={`transition-all duration-700 ${
                  cardsVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div
                  className={`group relative h-full p-6 md:p-8 rounded-2xl border border-white/10 bg-gradient-to-br ${goal.bgGradient} backdrop-blur-sm cursor-pointer`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* 아이콘 */}
                  <div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${goal.gradient} mb-4 md:mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
                  >
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>

                  {/* 텍스트 */}
                  <h3
                    className={`text-xl md:text-2xl font-bold bg-gradient-to-r ${goal.gradient} bg-clip-text text-transparent mb-2 md:mb-3`}
                  >
                    {goal.title}
                  </h3>
                  <p className="text-sm md:text-base text-white/60">
                    {goal.description}
                  </p>

                  {/* 호버 글로우 */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${goal.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-300 -z-10 blur-xl`}
                  />

                  {/* 반짝이 효과 */}
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/30 animate-ping" />
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
