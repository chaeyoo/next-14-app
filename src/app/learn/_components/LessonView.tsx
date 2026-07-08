"use client";

import { useState } from "react";
import { ArrowLeft, Clock, Lightbulb, CheckCircle2, PenLine } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Lesson } from "../_types";
import { CATEGORIES } from "../_constants/curriculum";
import { Quiz } from "./Quiz";

type Props = {
  lesson: Lesson;
  learned: boolean;
  bestScore?: number;
  onBack: () => void;
  onLearned: (lessonId: string) => void;
  onScore: (lessonId: string, score: number) => void;
};

// 단일 레슨 화면: 학습 콘텐츠 → 미니 퀴즈 단계로 전환
export const LessonView = ({
  lesson,
  learned,
  bestScore,
  onBack,
  onLearned,
  onScore,
}: Props) => {
  const [mode, setMode] = useState<"read" | "quiz">("read");
  const category = CATEGORIES.find((c) => c.id === lesson.categoryId)!;

  const startQuiz = () => {
    onLearned(lesson.id);
    setMode("quiz");
  };

  return (
    <div className="mx-auto max-w-3xl">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-white/50 transition hover:text-white"
      >
        <ArrowLeft size={16} /> 커리큘럼
      </button>

      {/* 헤더 */}
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br p-6 sm:p-8",
          category.gradient,
        )}
      >
        <div className="absolute inset-0 bg-slate-950/55" />
        <div className="relative">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium text-white/70">
            <span className="rounded-full bg-white/15 px-2.5 py-1">
              {category.title}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock size={12} /> 약 {lesson.readMinutes}분
            </span>
            {learned && (
              <span className="inline-flex items-center gap-1 text-emerald-300">
                <CheckCircle2 size={12} /> 학습 완료
              </span>
            )}
          </div>
          <div className="flex items-start gap-3">
            <span className="text-4xl">{lesson.emoji}</span>
            <div>
              <h1 className="text-2xl font-black text-white sm:text-3xl">
                {lesson.title}
              </h1>
              <p className="mt-1 text-sm text-white/80">{lesson.tagline}</p>
            </div>
          </div>
        </div>
      </div>

      {mode === "read" ? (
        <>
          {/* 본문 섹션 */}
          <div className="mt-6 space-y-6">
            {lesson.sections.map((section, i) => (
              <section
                key={i}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <h2 className="mb-2 text-lg font-bold text-white">
                  {section.heading}
                </h2>
                <p className="text-[15px] leading-relaxed text-white/75">
                  {section.body}
                </p>
                {section.bullets && (
                  <ul className="mt-3 space-y-1.5">
                    {section.bullets.map((b, bi) => (
                      <li
                        key={bi}
                        className="flex gap-2 text-[14px] leading-relaxed text-white/70"
                      >
                        <span className={cn("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", "bg-white/40")} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.code && (
                  <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-slate-950/70 p-4 text-[13px] leading-relaxed text-cyan-200">
                    <code>{section.code}</code>
                  </pre>
                )}
              </section>
            ))}
          </div>

          {/* 핵심 요약 */}
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-6">
            <div className="mb-3 flex items-center gap-2 font-bold text-amber-300">
              <Lightbulb size={18} /> 핵심 정리
            </div>
            <ul className="space-y-2">
              {lesson.keyTakeaways.map((t, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm leading-relaxed text-white/80"
                >
                  <span className="font-bold text-amber-300">{i + 1}.</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 퀴즈 시작 */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
            <p className="text-sm text-white/60">
              내용을 이해했다면 퀴즈로 확인해봐요 · 총 {lesson.quiz.length}문항
              {typeof bestScore === "number" && (
                <span className="ml-1 text-emerald-400">
                  (최고 {bestScore}/{lesson.quiz.length})
                </span>
              )}
            </p>
            <button
              onClick={startQuiz}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-white/90"
            >
              <PenLine size={16} /> 퀴즈 시작하기
            </button>
          </div>
        </>
      ) : (
        <div className="mt-6">
          <Quiz
            title={`${lesson.title} 퀴즈`}
            questions={lesson.quiz}
            onComplete={(score) => onScore(lesson.id, score)}
            onExit={onBack}
          />
          <button
            onClick={() => setMode("read")}
            className="mt-4 text-sm text-white/50 transition hover:text-white"
          >
            ← 학습 내용 다시 보기
          </button>
        </div>
      )}
    </div>
  );
};
