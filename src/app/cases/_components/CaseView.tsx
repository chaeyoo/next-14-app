"use client";

import {
  ArrowLeft,
  ExternalLink,
  Layers,
  Lightbulb,
  Sparkles,
  Target,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "../_types";
import { CASE_SECTORS } from "../_constants/caseStudies";
import { TechBadge } from "./CasesHome";

type Props = {
  caseStudy: CaseStudy;
  onBack: () => void;
};

// 단일 사례 상세: 문제 → 구축 구조(아키텍처) → 스택 → 성과 → FDE 학습 → 출처
export const CaseView = ({ caseStudy, onBack }: Props) => {
  const sector = CASE_SECTORS.find((s) => s.id === caseStudy.sectorId)!;

  return (
    <div className="mx-auto max-w-3xl">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-white/50 transition hover:text-white"
      >
        <ArrowLeft size={16} /> 사례 목록
      </button>

      {/* 헤더 */}
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br p-6 sm:p-8",
          sector.gradient,
        )}
      >
        <div className="absolute inset-0 bg-slate-950/60" />
        <div className="relative">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium text-white/75">
            <span className="rounded-full bg-white/15 px-2.5 py-1">
              {sector.title}
            </span>
            {caseStudy.tags.map((t) => (
              <TechBadge key={t} tag={t} />
            ))}
          </div>
          <div className="flex items-start gap-3">
            <span className="text-4xl">{caseStudy.emoji}</span>
            <div className="min-w-0">
              <h1 className="text-2xl font-black leading-tight text-white sm:text-3xl">
                {caseStudy.company}
              </h1>
              {caseStudy.product && (
                <p className="text-sm font-semibold text-white/80">
                  {caseStudy.product}
                </p>
              )}
              <p className="mt-1 text-sm text-white/80">{caseStudy.tagline}</p>
            </div>
          </div>

          {/* 대표 지표 */}
          <div className="mt-5 inline-flex flex-col rounded-xl bg-white/12 px-4 py-2.5">
            <span className="text-xl font-black text-white">
              {caseStudy.headline.value}
            </span>
            <span className="text-[11px] text-white/70">
              {caseStudy.headline.label}
            </span>
          </div>
        </div>
      </div>

      {/* 문제 */}
      <Section icon={Target} title="풀어야 했던 문제" accent="text-rose-300">
        <p className="text-[15px] leading-relaxed text-white/75">
          {caseStudy.challenge}
        </p>
      </Section>

      {/* 구축 구조 */}
      <Section icon={Layers} title="어떻게 구축했나 — 구조" accent="text-sky-300">
        <ol className="relative space-y-4 border-l border-white/10 pl-5">
          {caseStudy.architecture.map((layer, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-[26px] flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-slate-900 text-[10px] font-bold text-white/70">
                {i + 1}
              </span>
              <h3 className="text-sm font-bold text-white">{layer.name}</h3>
              <p className="mt-0.5 text-[13px] leading-relaxed text-white/65">
                {layer.detail}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 스택 */}
      <Section icon={Wrench} title="사용 기술 스택" accent="text-indigo-300">
        <div className="flex flex-wrap gap-2">
          {caseStudy.stack.map((s) => (
            <span
              key={s}
              className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/75"
            >
              {s}
            </span>
          ))}
        </div>
      </Section>

      {/* 성과 */}
      <Section icon={Sparkles} title="보도·발표된 성과" accent="text-emerald-300">
        <ul className="space-y-2">
          {caseStudy.results.map((r, i) => (
            <li
              key={i}
              className="flex gap-2 text-[14px] leading-relaxed text-white/75"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/70" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* FDE 학습 포인트 */}
      <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-6">
        <div className="mb-3 flex items-center gap-2 font-bold text-amber-300">
          <Lightbulb size={18} /> FDE의 시선 — 여기서 배울 것
        </div>
        <ul className="space-y-2">
          {caseStudy.fdeTakeaways.map((t, i) => (
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

      {/* 출처 */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="mb-3 text-sm font-bold text-white/80">출처</h2>
        <ul className="space-y-2">
          {caseStudy.sources.map((src) => (
            <li key={src.url}>
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-1.5 text-sm text-sky-300 underline-offset-2 transition hover:text-sky-200 hover:underline"
              >
                <ExternalLink size={14} className="mt-0.5 shrink-0" />
                <span>{src.title}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[11px] leading-relaxed text-white/35">
          ※ 수치는 위 출처가 보도·발표한 값입니다. 발표 주체의 자체 측정치일 수
          있으므로, 실제 도입 시에는 자체 베이스라인으로 재검증하세요.
        </p>
      </div>
    </div>
  );
};

const Section = ({
  icon: Icon,
  title,
  accent,
  children,
}: {
  icon: typeof Target;
  title: string;
  accent: string;
  children: React.ReactNode;
}) => (
  <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
    <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-white">
      <Icon size={17} className={accent} />
      {title}
    </h2>
    {children}
  </section>
);
