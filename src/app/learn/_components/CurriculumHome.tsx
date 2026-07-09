"use client";

import { CheckCircle2, Circle, Clock, GraduationCap, Sparkles, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Lesson, Progress } from "../_types";
import {
  CATEGORIES,
  LESSONS,
  TOTAL_QUIZ_COUNT,
  getLessonsByCategory,
} from "../_constants/curriculum";

type Props = {
  progress: Progress;
  onSelectLesson: (lesson: Lesson) => void;
  onStartFinalExam: () => void;
  onReset: () => void;
};

export const CurriculumHome = ({
  progress,
  onSelectLesson,
  onStartFinalExam,
  onReset,
}: Props) => {
  const learnedCount = LESSONS.filter((l) => progress.learned[l.id]).length;
  const learnedPct = Math.round((learnedCount / LESSONS.length) * 100);
  const totalBest = LESSONS.reduce(
    (sum, l) => sum + (progress.bestScore[l.id] ?? 0),
    0,
  );
  const allLearned = learnedCount === LESSONS.length;

  return (
    <div className="mx-auto max-w-4xl">
      {/* 히어로 */}
      <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-sky-500 p-8 sm:p-10">
        <div className="absolute inset-0 bg-slate-950/40" />
        <div className="relative">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white">
            <Sparkles size={13} /> 생성형 AI 서비스 개발 · 학습 & 퀴즈
          </div>
          <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl">
            AI 엔지니어 핵심 용어
            <br />
            <span className="text-white/80">배우고 · 퀴즈로 확인하기</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80">
            RAG · Agentic Workflow · Function Calling · Subagent · MCP부터
            FastAPI · FastMCP · PydanticAI · LangChain/LangGraph, 그리고
            프롬프트 엔지니어링 · Evals · 가드레일 · 현장 디스커버리 ·
            프로덕션 운영까지 — FDE에게 필요한 개념을 익히고 바로 퀴즈로
            점검하세요.
          </p>

          {/* 진도 요약 */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <Stat label="학습 진도" value={`${learnedPct}%`} sub={`${learnedCount}/${LESSONS.length} 레슨`} />
            <Stat label="획득 점수" value={`${totalBest}`} sub={`총 ${TOTAL_QUIZ_COUNT}문항`} />
            <Stat label="레슨 수" value={`${LESSONS.length}`} sub={`${CATEGORIES.length}개 트랙`} />
          </div>

          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white transition-all duration-500"
              style={{ width: `${learnedPct}%` }}
            />
          </div>
        </div>
      </header>

      {/* 카테고리별 레슨 */}
      {CATEGORIES.map((category) => {
        const lessons = getLessonsByCategory(category.id);
        return (
          <section key={category.id} className="mt-8">
            <div className="mb-3 flex items-baseline gap-3">
              <h2 className="text-lg font-bold text-white">{category.title}</h2>
              <span className="text-sm text-white/40">
                {category.description}
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {lessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  learned={!!progress.learned[lesson.id]}
                  bestScore={progress.bestScore[lesson.id]}
                  onClick={() => onSelectLesson(lesson)}
                />
              ))}
            </div>
          </section>
        );
      })}

      {/* 최종 시험 */}
      <section className="mt-10">
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl border p-6 sm:p-8",
            allLearned
              ? "border-emerald-400/30 bg-emerald-500/[0.08]"
              : "border-white/10 bg-white/[0.03]",
          )}
        >
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <Trophy className="text-amber-300" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">최종 종합 퀴즈</h3>
                <p className="mt-0.5 text-sm text-white/60">
                  전체 트랙에서 무작위로 섞인 문제를 풀어 실력을 검증하세요.
                  {!allLearned && (
                    <span className="text-white/40">
                      {" "}
                      (모든 레슨을 학습하면 준비 완료!)
                    </span>
                  )}
                </p>
              </div>
            </div>
            <button
              onClick={onStartFinalExam}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-white/90"
            >
              <GraduationCap size={18} /> 최종 시험 보기
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onReset}
            className="text-xs text-white/30 transition hover:text-white/60"
          >
            학습 기록 초기화
          </button>
        </div>
      </section>
    </div>
  );
};

const Stat = ({ label, value, sub }: { label: string; value: string; sub: string }) => (
  <div className="rounded-xl bg-white/10 p-3">
    <div className="text-[11px] text-white/60">{label}</div>
    <div className="text-xl font-black text-white">{value}</div>
    <div className="text-[11px] text-white/50">{sub}</div>
  </div>
);

const LessonCard = ({
  lesson,
  learned,
  bestScore,
  onClick,
}: {
  lesson: Lesson;
  learned: boolean;
  bestScore?: number;
  onClick: () => void;
}) => {
  const aced =
    typeof bestScore === "number" && bestScore === lesson.quiz.length;
  return (
    <button
      onClick={onClick}
      className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-white/25 hover:bg-white/[0.06]"
    >
      <span className="text-2xl">{lesson.emoji}</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-bold text-white">{lesson.title}</h3>
          {learned ? (
            <CheckCircle2
              size={15}
              className={aced ? "text-emerald-400" : "text-white/40"}
            />
          ) : (
            <Circle size={15} className="text-white/20" />
          )}
        </div>
        <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-white/55">
          {lesson.tagline}
        </p>
        <div className="mt-2 flex items-center gap-3 text-[11px] text-white/40">
          <span className="inline-flex items-center gap-1">
            <Clock size={11} /> {lesson.readMinutes}분
          </span>
          <span>퀴즈 {lesson.quiz.length}문항</span>
          {typeof bestScore === "number" && (
            <span className="text-emerald-400/80">
              최고 {bestScore}/{lesson.quiz.length}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};
