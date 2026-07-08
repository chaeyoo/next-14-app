"use client";

import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import type { Lesson, QuizQuestion } from "./_types";
import { LESSONS } from "./_constants/curriculum";
import { useProgress } from "./_hooks/useProgress";
import { CurriculumHome } from "./_components/CurriculumHome";
import { LessonView } from "./_components/LessonView";
import { Quiz } from "./_components/Quiz";

type View =
  | { kind: "home" }
  | { kind: "lesson"; lesson: Lesson }
  | { kind: "final"; questions: QuizQuestion[] };

const FINAL_EXAM_SIZE = 10;

// 배열을 무작위로 섞어 앞에서 n개 선택 (이벤트 핸들러에서만 호출 — 클라이언트 런타임)
const pickRandom = <T,>(arr: T[], n: number): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
};

export default function LearnPage() {
  const { progress, hydrated, markLearned, recordScore, reset } = useProgress();
  const [view, setView] = useState<View>({ kind: "home" });

  const allQuestions = useMemo(
    () => LESSONS.flatMap((l) => l.quiz),
    [],
  );

  const startFinalExam = () => {
    setView({
      kind: "final",
      questions: pickRandom(allQuestions, Math.min(FINAL_EXAM_SIZE, allQuestions.length)),
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* 은은한 배경 그라디언트 */}
      <div className="pointer-events-none fixed inset-0 opacity-60">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-sky-600/15 blur-3xl" />
      </div>

      <main className="relative px-4 py-10 sm:px-6 sm:py-14">
        {!hydrated ? (
          <div className="mx-auto max-w-4xl animate-pulse space-y-4">
            <div className="h-52 rounded-3xl bg-white/5" />
            <div className="h-24 rounded-2xl bg-white/5" />
            <div className="h-24 rounded-2xl bg-white/5" />
          </div>
        ) : view.kind === "home" ? (
          <CurriculumHome
            progress={progress}
            onSelectLesson={(lesson) => setView({ kind: "lesson", lesson })}
            onStartFinalExam={startFinalExam}
            onReset={reset}
          />
        ) : view.kind === "lesson" ? (
          <LessonView
            lesson={view.lesson}
            learned={!!progress.learned[view.lesson.id]}
            bestScore={progress.bestScore[view.lesson.id]}
            onBack={() => setView({ kind: "home" })}
            onLearned={markLearned}
            onScore={recordScore}
          />
        ) : (
          <div className="mx-auto max-w-3xl">
            <button
              onClick={() => setView({ kind: "home" })}
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-white/50 transition hover:text-white"
            >
              <ArrowLeft size={16} /> 커리큘럼
            </button>
            <div className="mb-6 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-5">
              <h1 className="text-xl font-black text-white">🎓 최종 종합 퀴즈</h1>
              <p className="mt-1 text-sm text-white/60">
                전체 트랙에서 무작위로 뽑은 {view.questions.length}문항. 70%
                이상이면 통과!
              </p>
            </div>
            <Quiz
              title="최종 종합 퀴즈"
              questions={view.questions}
              onExit={() => setView({ kind: "home" })}
            />
          </div>
        )}
      </main>
    </div>
  );
}
