"use client";

import { useMemo, useState } from "react";
import { Check, X, ChevronRight, RotateCcw, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizQuestion } from "../_types";

type Props = {
  title: string;
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
  onExit?: () => void;
};

// 학습 후 진행하는 퀴즈. 문항별 즉시 채점 + 해설, 마지막에 결과 요약.
export const Quiz = ({ title, questions, onComplete, onExit }: Props) => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = questions[index];
  const isLast = index === questions.length - 1;
  const progressPct = useMemo(
    () => Math.round(((index + (finished ? 1 : 0)) / questions.length) * 100),
    [index, finished, questions.length],
  );

  const handleSelect = (optionIndex: number) => {
    if (locked) return;
    setSelected(optionIndex);
    setLocked(true);
    if (optionIndex === current.answerIndex) {
      setCorrectCount((c) => c + 1);
    }
  };

  const handleNext = () => {
    if (isLast) {
      // 마지막 문항은 handleSelect 에서 이미 채점되어 correctCount 에 반영됨
      setFinished(true);
      onComplete?.(correctCount, questions.length);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setLocked(false);
  };

  const handleRetry = () => {
    setIndex(0);
    setSelected(null);
    setLocked(false);
    setCorrectCount(0);
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((correctCount / questions.length) * 100);
    const passed = pct >= 70;
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
        <div
          className={cn(
            "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full",
            passed ? "bg-emerald-500/15" : "bg-amber-500/15",
          )}
        >
          <Trophy
            className={passed ? "text-emerald-400" : "text-amber-400"}
            size={30}
          />
        </div>
        <h3 className="text-xl font-bold text-white">
          {passed ? "통과했어요! 🎉" : "조금만 더!"}
        </h3>
        <p className="mt-1 text-sm text-white/50">{title}</p>

        <div className="my-6">
          <div className="text-5xl font-black text-white">
            {correctCount}
            <span className="text-2xl text-white/40"> / {questions.length}</span>
          </div>
          <div
            className={cn(
              "mt-2 text-sm font-semibold",
              passed ? "text-emerald-400" : "text-amber-400",
            )}
          >
            정답률 {pct}%
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            onClick={handleRetry}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <RotateCcw size={16} /> 다시 풀기
          </button>
          {onExit && (
            <button
              onClick={onExit}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white/90"
            >
              커리큘럼으로
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
      {/* 상단 진행바 */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs text-white/50">
          <span>{title}</span>
          <span>
            {index + 1} / {questions.length}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <h3 className="text-lg font-bold leading-snug text-white sm:text-xl">
        {current.question}
      </h3>

      <div className="mt-5 flex flex-col gap-2.5">
        {current.options.map((option, i) => {
          const isCorrect = i === current.answerIndex;
          const isChosen = i === selected;
          const showState = locked && (isCorrect || isChosen);
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={locked}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition",
                "border-white/10 bg-white/[0.02] text-white/90",
                !locked && "hover:border-white/30 hover:bg-white/[0.06]",
                showState && isCorrect && "border-emerald-500/60 bg-emerald-500/10",
                showState &&
                  isChosen &&
                  !isCorrect &&
                  "border-rose-500/60 bg-rose-500/10",
                locked && "cursor-default",
              )}
            >
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                  showState && isCorrect
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : showState && isChosen && !isCorrect
                      ? "border-rose-500 bg-rose-500 text-white"
                      : "border-white/25 text-white/50",
                )}
              >
                {showState && isCorrect ? (
                  <Check size={14} />
                ) : showState && isChosen && !isCorrect ? (
                  <X size={14} />
                ) : (
                  String.fromCharCode(65 + i)
                )}
              </span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      {/* 해설 */}
      {locked && (
        <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <div className="mb-1 flex items-center gap-2 text-sm font-semibold">
            {selected === current.answerIndex ? (
              <span className="text-emerald-400">정답이에요 ✓</span>
            ) : (
              <span className="text-rose-400">아쉬워요 ✗</span>
            )}
          </div>
          <p className="text-sm leading-relaxed text-white/70">
            {current.explanation}
          </p>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleNext}
          disabled={!locked}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-semibold transition",
            locked
              ? "bg-white text-slate-900 hover:bg-white/90"
              : "cursor-not-allowed bg-white/10 text-white/30",
          )}
        >
          {isLast ? "결과 보기" : "다음 문제"}
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
