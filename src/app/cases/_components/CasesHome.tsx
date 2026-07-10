"use client";

import { ArrowUpRight, Info, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CaseStudy, TechTag } from "../_types";
import { CASE_SECTORS, CASE_STUDIES, getCasesBySector } from "../_constants/caseStudies";

type Props = {
  onSelectCase: (c: CaseStudy) => void;
};

// 기술 태그별 배지 색상 (매직값 대신 상수 매핑)
const TAG_STYLE: Record<TechTag, string> = {
  AI: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  RAG: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  MCP: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
  Agent: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  "GenAI-Discovery": "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30",
  "Fine-tuning": "bg-amber-500/15 text-amber-300 border-amber-500/30",
};

export const TechBadge = ({ tag }: { tag: TechTag }) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold",
      TAG_STYLE[tag],
    )}
  >
    {tag}
  </span>
);

export const CasesHome = ({ onSelectCase }: Props) => {
  return (
    <div className="mx-auto max-w-5xl">
      {/* 히어로 */}
      <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-sky-700 via-indigo-700 to-fuchsia-700 p-8 sm:p-10">
        <div className="absolute inset-0 bg-slate-950/45" />
        <div className="relative">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white">
            <FlaskIcon /> 제약 업계 AI · RAG · MCP 실전 사례
          </div>
          <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl">
            실제로 생산성을 올린
            <br />
            <span className="text-white/80">제약 AI 구축 사례</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80">
            신약 발굴, 임상·규제 문서, 전사 플랫폼, 의사결정 에이전트,
            마케팅 그라운딩, MCP 데이터 인프라까지 — 공개된 실제 사례를
            <b className="text-white"> 무엇을 어떻게 구축했는지 </b>
            구조 중심으로 정리했습니다.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <HeroStat value={`${CASE_STUDIES.length}`} label="실제 사례" />
            <HeroStat value={`${CASE_SECTORS.length}`} label="적용 영역" />
            <HeroStat value="출처 명시" label="모든 수치에 근거" />
          </div>
        </div>
      </header>

      {/* 신뢰성 고지 */}
      <div className="mt-4 flex items-start gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-4 text-sm text-white/70">
        <ShieldCheck size={18} className="mt-0.5 shrink-0 text-emerald-400" />
        <p>
          이 페이지의 사례는 <b className="text-white">모두 공개된 실제 사례</b>이며,
          각 카드의 상세에 <b className="text-white">출처 링크</b>를 명시했습니다.
          시간 단축·건수 같은 수치는 해당 출처가 보도·발표한 값을 인용한 것으로,
          도입 시에는 자체 베이스라인으로 재검증하는 것이 좋습니다.
        </p>
      </div>

      {/* 영역별 사례 */}
      {CASE_SECTORS.map((sector) => {
        const cases = getCasesBySector(sector.id);
        if (cases.length === 0) return null;
        return (
          <section key={sector.id} className="mt-8">
            <div className="mb-3 flex items-baseline gap-3">
              <h2 className={cn("text-lg font-bold", sector.accent)}>
                {sector.title}
              </h2>
              <span className="text-sm text-white/40">{sector.description}</span>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {cases.map((c) => (
                <CaseCard key={c.id} caseStudy={c} onClick={() => onSelectCase(c)} />
              ))}
            </div>
          </section>
        );
      })}

      <p className="mt-10 flex items-center justify-center gap-1.5 text-center text-xs text-white/30">
        <Info size={12} /> 새로운 검증된 사례가 확인되면 이 목록에 추가됩니다.
      </p>
    </div>
  );
};

const FlaskIcon = () => (
  <span className="text-sm" aria-hidden>
    🧪
  </span>
);

const HeroStat = ({ value, label }: { value: string; label: string }) => (
  <div className="rounded-xl bg-white/10 p-3">
    <div className="text-lg font-black text-white">{value}</div>
    <div className="text-[11px] text-white/60">{label}</div>
  </div>
);

const CaseCard = ({
  caseStudy,
  onClick,
}: {
  caseStudy: CaseStudy;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="group flex min-w-0 flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-white/25 hover:bg-white/[0.06]"
  >
    <div className="flex items-start gap-3">
      <span className="text-2xl">{caseStudy.emoji}</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <h3 className="min-w-0 truncate font-bold text-white">
            {caseStudy.company}
          </h3>
          <ArrowUpRight
            size={15}
            className="shrink-0 text-white/30 transition group-hover:text-white/70"
          />
        </div>
        {caseStudy.product && (
          <p className="truncate text-xs text-white/45">{caseStudy.product}</p>
        )}
      </div>
    </div>

    <p className="line-clamp-2 text-[13px] leading-relaxed text-white/70">
      {caseStudy.tagline}
    </p>

    <div className="mt-auto flex items-end justify-between gap-2">
      <div className="flex flex-wrap gap-1">
        {caseStudy.tags.map((t) => (
          <TechBadge key={t} tag={t} />
        ))}
      </div>
      <div className="shrink-0 text-right">
        <div className="text-sm font-black leading-tight text-white">
          {caseStudy.headline.value}
        </div>
        <div className="text-[10px] leading-tight text-white/40">
          {caseStudy.headline.label}
        </div>
      </div>
    </div>
  </button>
);
