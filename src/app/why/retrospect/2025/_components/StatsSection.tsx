"use client";

import { Calendar, Clock, Sun, Heart } from "lucide-react";
import { useCountUp } from "../_hooks/useCountUp";
import { useScrollAnimation } from "../_hooks/useScrollAnimation";

const STATS = [
  {
    id: 1,
    value: 365,
    label: "일",
    subLabel: "함께한 날들",
    icon: Calendar,
    gradient: "from-blue-400 to-cyan-400",
  },
  {
    id: 2,
    value: 8760,
    label: "시간",
    subLabel: "소중한 순간들",
    icon: Clock,
    gradient: "from-purple-400 to-pink-400",
  },
  {
    id: 3,
    value: 52,
    label: "주",
    subLabel: "성장의 시간",
    icon: Sun,
    gradient: "from-amber-400 to-orange-400",
  },
  {
    id: 4,
    value: 12,
    label: "달",
    subLabel: "추억의 계절",
    icon: Heart,
    gradient: "from-rose-400 to-pink-400",
  },
];

type StatCardProps = {
  stat: (typeof STATS)[0];
  isVisible: boolean;
  delay: number;
};

const StatCard = ({ stat, isVisible, delay }: StatCardProps) => {
  const { ref, count } = useCountUp({
    end: stat.value,
    duration: 2500,
    startOnView: true,
  });
  const Icon = stat.icon;

  return (
    <div
      ref={ref}
      className={`relative group text-center p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-700 hover:scale-105 hover:bg-white/10 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* 아이콘 */}
      <div
        className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.gradient} mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>

      {/* 숫자 */}
      <div className="flex items-baseline justify-center gap-1">
        <span
          className={`text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
        >
          {count.toLocaleString()}
        </span>
        <span className="text-lg md:text-xl text-white/60">{stat.label}</span>
      </div>

      {/* 라벨 */}
      <p className="mt-2 text-sm md:text-base text-white/40">{stat.subLabel}</p>

      {/* 호버 글로우 */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10 blur-xl`}
      />
    </div>
  );
};

export const StatsSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation({
    threshold: 0.2,
  });
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({
    threshold: 0.1,
  });

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
      {/* 배경 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/10 to-transparent" />

      <div className="relative max-w-5xl w-full">
        {/* 타이틀 */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block text-sm md:text-base font-medium tracking-widest text-cyan-400 mb-4">
            YOUR 2025 IN NUMBERS
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              숫자로 보는 2025
            </span>
          </h2>
          <p className="mt-4 md:mt-6 text-base md:text-xl text-white/50">
            올해 당신과 함께한 시간들
          </p>
        </div>

        {/* 카드 그리드 */}
        <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((stat, index) => (
            <StatCard
              key={stat.id}
              stat={stat}
              isVisible={cardsVisible}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
