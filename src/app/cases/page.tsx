"use client";

import { useState } from "react";
import type { CaseStudy } from "./_types";
import { SiteNav } from "@/components/common/SiteNav";
import { CasesHome } from "./_components/CasesHome";
import { CaseView } from "./_components/CaseView";

type View = { kind: "home" } | { kind: "case"; caseStudy: CaseStudy };

// 제약 업계 AI/RAG/MCP 실전 사례 페이지 (자기완결형 · 외부 API 없음)
export default function CasesPage() {
  const [view, setView] = useState<View>({ kind: "home" });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SiteNav />

      {/* 은은한 배경 그라디언트 */}
      <div className="pointer-events-none fixed inset-0 opacity-60">
        <div className="absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-sky-600/20 blur-3xl" />
        <div className="absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-fuchsia-600/15 blur-3xl" />
      </div>

      <main className="relative px-4 py-10 sm:px-6 sm:py-14">
        {view.kind === "home" ? (
          <CasesHome
            onSelectCase={(caseStudy) => setView({ kind: "case", caseStudy })}
          />
        ) : (
          <CaseView
            caseStudy={view.caseStudy}
            onBack={() => setView({ kind: "home" })}
          />
        )}
      </main>
    </div>
  );
}
