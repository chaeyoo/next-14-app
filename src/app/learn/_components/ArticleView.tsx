"use client";

import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  CheckCircle2,
  Clock,
  Lightbulb,
  Link2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Article } from "../_types";
import { getLesson } from "../_constants/curriculum";
import { ARTICLES, ARTICLE_SERIES } from "../_constants/articles";

type Props = {
  article: Article;
  read: boolean;
  allRead: boolean;
  onBack: () => void;
  onRead: (articleId: string) => void;
  onNavigate: (article: Article) => void;
  onStartExam: () => void;
};

// 심화 아티클 읽기 화면. 레슨과 달리 개별 퀴즈 없이 읽기 → 다음 아티클로 흐르고,
// 마지막(모두 읽음)에는 종합 퀴즈로 이어진다.
export const ArticleView = ({
  article,
  read,
  allRead,
  onBack,
  onRead,
  onNavigate,
  onStartExam,
}: Props) => {
  const series = ARTICLE_SERIES.find((s) => s.id === article.seriesId)!;
  const index = ARTICLES.findIndex((a) => a.id === article.id);
  const prev = index > 0 ? ARTICLES[index - 1] : undefined;
  const next = index < ARTICLES.length - 1 ? ARTICLES[index + 1] : undefined;
  const relatedLessons = article.relatedLessonIds
    .map(getLesson)
    .filter((l): l is NonNullable<typeof l> => !!l);

  const goNext = () => {
    onRead(article.id);
    if (next) onNavigate(next);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-white/50 transition hover:text-white"
      >
        <ArrowLeft size={16} /> 커리큘럼
      </button>

      {/* 아티클 헤더 */}
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br p-6 sm:p-8",
          series.gradient,
        )}
      >
        <div className="absolute inset-0 bg-slate-950/60" />
        <div className="relative">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium text-white/70">
            <span className="rounded-full bg-white/15 px-2.5 py-1">
              아티클 {String(article.order).padStart(2, "0")} · {series.title}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock size={12} /> 약 {article.readMinutes}분
            </span>
            {read && (
              <span className="inline-flex items-center gap-1 text-emerald-300">
                <CheckCircle2 size={12} /> 읽음
              </span>
            )}
          </div>
          <div className="flex items-start gap-3">
            <span className="text-4xl">{article.emoji}</span>
            <div>
              <h1 className="text-2xl font-black leading-tight text-white sm:text-3xl">
                {article.title}
              </h1>
              <p className="mt-1 text-sm text-white/80">{article.tagline}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 심화 대상 레슨 링크 배지 */}
      {relatedLessons.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/50">
          <span className="inline-flex items-center gap-1">
            <Link2 size={12} /> 이 아티클이 심화하는 레슨:
          </span>
          {relatedLessons.map((lesson) => (
            <span
              key={lesson.id}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-white/70"
            >
              {lesson.emoji} {lesson.title}
            </span>
          ))}
        </div>
      )}

      {/* 본문 — 번호 매긴 아티클 섹션 */}
      <article className="mt-6 space-y-6">
        {article.sections.map((section, i) => (
          <section
            key={i}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <h2 className="mb-2 flex items-baseline gap-2 text-lg font-bold text-white">
              <span className={cn("text-sm font-black", series.accent)}>
                {i + 1}.
              </span>
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
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
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
      </article>

      {/* 핵심 정리 */}
      <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-6">
        <div className="mb-3 flex items-center gap-2 font-bold text-amber-300">
          <Lightbulb size={18} /> 핵심 정리
        </div>
        <ul className="space-y-2">
          {article.keyTakeaways.map((t, i) => (
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

      {/* 하단 내비게이션 */}
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        {!read && (
          <div className="mb-4 text-center">
            <button
              onClick={() => onRead(article.id)}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-white/90"
            >
              <CheckCircle2 size={16} /> 다 읽었어요
            </button>
          </div>
        )}

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          {prev ? (
            <button
              onClick={() => onNavigate(prev)}
              className="inline-flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-left text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft size={15} className="shrink-0" />
              <span className="min-w-0 truncate">
                {prev.emoji} {prev.title}
              </span>
            </button>
          ) : (
            <span />
          )}

          {next ? (
            <button
              onClick={goNext}
              className="inline-flex min-w-0 items-center justify-end gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-right text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <span className="min-w-0 truncate">
                {next.emoji} {next.title}
              </span>
              <ArrowRight size={15} className="shrink-0" />
            </button>
          ) : (
            <button
              onClick={() => {
                onRead(article.id);
                onStartExam();
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-400 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-indigo-300"
            >
              <BookOpenText size={16} /> 아티클 종합 퀴즈 풀기
            </button>
          )}
        </div>

        {allRead && next && (
          <p className="mt-4 text-center text-xs text-white/40">
            모든 아티클을 읽었어요 — 홈에서 종합 퀴즈에 도전해보세요! 🎉
          </p>
        )}
      </div>
    </div>
  );
};
