"use client";

import { BookOpenText, CheckCircle2, Circle, Clock, ScrollText } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Article, Progress } from "../_types";
import {
  ARTICLES,
  ARTICLE_EXAM_ID,
  ARTICLE_EXAM_SIZE,
  ARTICLE_SERIES,
  getArticlesBySeries,
} from "../_constants/articles";

type Props = {
  progress: Progress;
  onSelectArticle: (article: Article) => void;
  onStartExam: () => void;
};

// 커리큘럼 홈 하단에 붙는 심화 아티클 서가.
// 레슨(용어 학습)과 달리 아티클은 읽기 중심이며, 마무리로 종합 퀴즈 하나를 본다.
export const ArticlesShelf = ({ progress, onSelectArticle, onStartExam }: Props) => {
  const readCount = ARTICLES.filter((a) => progress.learned[a.id]).length;
  const readPct = Math.round((readCount / ARTICLES.length) * 100);
  const allRead = readCount === ARTICLES.length;
  const examBest = progress.bestScore[ARTICLE_EXAM_ID];

  return (
    <section className="mt-12">
      {/* 서가 헤더 */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-950 p-6 sm:p-8">
        <div className="relative">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
            <ScrollText size={13} /> 심화 아티클 · {ARTICLES.length}편
          </div>
          <h2 className="text-2xl font-black text-white sm:text-3xl">
            깊이 읽는 FDE
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60">
            레슨에서 익힌 용어를 실전 설계 수준으로 심화하는 아티클
            시리즈입니다. 아키텍처 → 프로덕션 → 현장 순서로 읽고, 마지막에
            종합 퀴즈로 마무리하세요.
          </p>

          <div className="mt-5 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-emerald-400 transition-all duration-500"
                style={{ width: `${readPct}%` }}
              />
            </div>
            <span className="shrink-0 text-xs font-semibold text-white/60">
              {readCount}/{ARTICLES.length} 읽음
            </span>
          </div>
        </div>
      </div>

      {/* 시리즈별 아티클 목록 */}
      {ARTICLE_SERIES.map((series) => {
        const articles = getArticlesBySeries(series.id);
        return (
          <div key={series.id} className="mt-7">
            <div className="mb-3 flex items-baseline gap-3">
              <h3 className={cn("text-base font-bold", series.accent)}>
                {series.title}
              </h3>
              <span className="text-sm text-white/40">{series.description}</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {articles.map((article) => (
                <ArticleRow
                  key={article.id}
                  article={article}
                  read={!!progress.learned[article.id]}
                  onClick={() => onSelectArticle(article)}
                />
              ))}
            </div>
          </div>
        );
      })}

      {/* 아티클 종합 퀴즈 */}
      <div
        className={cn(
          "mt-8 rounded-2xl border p-6 sm:p-7",
          allRead
            ? "border-indigo-400/30 bg-indigo-500/[0.08]"
            : "border-white/10 bg-white/[0.03]",
        )}
      >
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
              <BookOpenText className="text-indigo-300" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">아티클 종합 퀴즈</h3>
              <p className="mt-0.5 text-sm text-white/60">
                15편의 아티클에서 한 문항씩, 총 {ARTICLE_EXAM_SIZE}문항.
                {typeof examBest === "number" ? (
                  <span className="ml-1 text-emerald-400">
                    최고 {examBest}/{ARTICLE_EXAM_SIZE}
                  </span>
                ) : !allRead ? (
                  <span className="text-white/40"> (모두 읽으면 준비 완료!)</span>
                ) : null}
              </p>
            </div>
          </div>
          <button
            onClick={onStartExam}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-indigo-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-indigo-300"
          >
            <BookOpenText size={18} /> 종합 퀴즈 풀기
          </button>
        </div>
      </div>
    </section>
  );
};

const ArticleRow = ({
  article,
  read,
  onClick,
}: {
  article: Article;
  read: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-white/25 hover:bg-white/[0.06]"
  >
    <span className="w-7 shrink-0 text-center text-sm font-black text-white/25 group-hover:text-white/50">
      {String(article.order).padStart(2, "0")}
    </span>
    <span className="text-2xl">{article.emoji}</span>
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-2">
        <h4 className="min-w-0 truncate font-bold text-white">{article.title}</h4>
        {read ? (
          <CheckCircle2 size={15} className="shrink-0 text-emerald-400" />
        ) : (
          <Circle size={15} className="shrink-0 text-white/20" />
        )}
      </div>
      <p className="mt-0.5 line-clamp-1 text-xs leading-relaxed text-white/55">
        {article.tagline}
      </p>
    </div>
    <span className="hidden shrink-0 items-center gap-1 text-[11px] text-white/40 sm:inline-flex">
      <Clock size={11} /> {article.readMinutes}분
    </span>
  </button>
);
