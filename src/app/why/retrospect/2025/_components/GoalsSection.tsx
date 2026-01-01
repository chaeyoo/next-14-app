"use client";

import { useState, useEffect } from "react";
import { Rocket, Heart, Users, Sparkles } from "lucide-react";
import { useScrollAnimation } from "../_hooks/useScrollAnimation";
import { TiltCard } from "./TiltCard";

const STORAGE_KEY = "retrospect-2025-categories";

const CATEGORIES = [
  {
    id: "career",
    title: "커리어 / 성장",
    description: "새로운 기술을 배우고, 더 나은 전문가가 되기",
    icon: Rocket,
    gradient: "from-blue-400 to-cyan-400",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    focusRing: "focus:border-blue-400/50 focus:ring-blue-400/20",
  },
  {
    id: "health",
    title: "건강 / 웰빙",
    description: "몸과 마음 모두 건강하게 챙기기",
    icon: Heart,
    gradient: "from-rose-400 to-pink-400",
    bgGradient: "from-rose-500/10 to-pink-500/10",
    focusRing: "focus:border-rose-400/50 focus:ring-rose-400/20",
  },
  {
    id: "relationship",
    title: "관계 / 소통",
    description: "소중한 사람들과 더 깊은 관계 만들기",
    icon: Users,
    gradient: "from-amber-400 to-orange-400",
    bgGradient: "from-amber-500/10 to-orange-500/10",
    focusRing: "focus:border-amber-400/50 focus:ring-amber-400/20",
  },
  {
    id: "challenge",
    title: "새로운 도전",
    description: "두려움을 넘어 새로운 것에 도전하기",
    icon: Sparkles,
    gradient: "from-violet-400 to-purple-400",
    bgGradient: "from-violet-500/10 to-purple-500/10",
    focusRing: "focus:border-violet-400/50 focus:ring-violet-400/20",
  },
];

type CategoryData = {
  [categoryId: string]: {
    why: string;
    soi: string;
  };
};

const DEFAULT_DATA: CategoryData = {
  career: { why: "", soi: "" },
  health: { why: "", soi: "" },
  relationship: { why: "", soi: "" },
  challenge: { why: "", soi: "" },
};

export const GoalsSection = () => {
  const [data, setData] = useState<CategoryData>(DEFAULT_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation({
    threshold: 0.2,
  });
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({
    threshold: 0.1,
  });

  // localStorage에서 데이터 로드
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved data:", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // 데이터 변경 핸들러
  const handleChange = (
    categoryId: string,
    author: "why" | "soi",
    value: string
  ) => {
    const newData = {
      ...data,
      [categoryId]: { ...data[categoryId], [author]: value },
    };
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

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
            2025 RETROSPECT
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold">
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              2025년 회고
            </span>
          </h2>
          <p className="mt-4 md:mt-6 text-base md:text-xl text-white/50">
            각 분야에서 어떤 한 해를 보냈는지 기록해보세요
          </p>
        </div>

        {/* 카테고리별 카드들 */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {CATEGORIES.map((category, index) => {
            const Icon = category.icon;
            return (
              <TiltCard
                key={category.id}
                maxTilt={8}
                scale={1.02}
                className={`transition-all duration-700 ${
                  cardsVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div
                  className={`group relative h-full p-6 md:p-8 rounded-2xl border border-white/10 bg-gradient-to-br ${category.bgGradient} backdrop-blur-sm`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* 헤더: 아이콘 + 카테고리 정보 */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.gradient} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <h3
                        className={`text-xl md:text-2xl font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}
                      >
                        {category.title}
                      </h3>
                      <p className="text-sm text-white/50">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* 작성자 1: why */}
                  <div className="mb-4">
                    <label
                      className={`block text-sm font-medium bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent mb-2`}
                    >
                      why
                    </label>
                    <textarea
                      value={isLoaded ? data[category.id]?.why || "" : ""}
                      onChange={(e) =>
                        handleChange(category.id, "why", e.target.value)
                      }
                      placeholder="이 분야에 대한 회고를 작성해주세요..."
                      className={`w-full min-h-[100px] p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 resize-none transition-all duration-300 outline-none focus:ring-2 ${category.focusRing}`}
                    />
                  </div>

                  {/* 구분선 */}
                  <div className="border-t border-white/10 my-4" />

                  {/* 작성자 2: soi */}
                  <div>
                    <label
                      className={`block text-sm font-medium bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent mb-2`}
                    >
                      soi
                    </label>
                    <textarea
                      value={isLoaded ? data[category.id]?.soi || "" : ""}
                      onChange={(e) =>
                        handleChange(category.id, "soi", e.target.value)
                      }
                      placeholder="이 분야에 대한 회고를 작성해주세요..."
                      className={`w-full min-h-[100px] p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 resize-none transition-all duration-300 outline-none focus:ring-2 ${category.focusRing}`}
                    />
                  </div>

                  {/* 호버 글로우 */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10 blur-xl`}
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
