"use client";

import { useCallback, useEffect, useState } from "react";
import type { Progress } from "../_types";

const STORAGE_KEY = "ai-learn-progress-v1";

const EMPTY: Progress = { learned: {}, bestScore: {} };

// 학습 진도를 localStorage 로 영속화하는 커스텀 훅
export const useProgress = () => {
  const [progress, setProgress] = useState<Progress>(EMPTY);
  const [hydrated, setHydrated] = useState(false);

  // 최초 마운트 시 저장된 진도 복원
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setProgress({ ...EMPTY, ...JSON.parse(raw) });
    } catch {
      // 파싱 실패 시 초기값 유지
    }
    setHydrated(true);
  }, []);

  const persist = useCallback((next: Progress) => {
    setProgress(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // 저장 실패는 무시 (프라이빗 모드 등)
    }
  }, []);

  const markLearned = useCallback(
    (lessonId: string) => {
      persist({
        ...progress,
        learned: { ...progress.learned, [lessonId]: true },
      });
    },
    [progress, persist],
  );

  const recordScore = useCallback(
    (lessonId: string, score: number) => {
      const prevBest = progress.bestScore[lessonId] ?? 0;
      persist({
        ...progress,
        bestScore: {
          ...progress.bestScore,
          [lessonId]: Math.max(prevBest, score),
        },
      });
    },
    [progress, persist],
  );

  const reset = useCallback(() => persist(EMPTY), [persist]);

  return { progress, hydrated, markLearned, recordScore, reset };
};
