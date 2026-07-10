"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenText, FlaskConical, GraduationCap, NotebookPen } from "lucide-react";
import { cn } from "@/lib/utils";

// 지금까지 만든 콘텐츠 페이지들을 잇는 공통 네비게이션.
// 새 페이지가 생기면 여기 항목만 추가하면 된다 (선언적 단일 소스).
type NavItem = {
  href: string;
  label: string;
  icon: typeof GraduationCap;
  // 하위 경로까지 활성으로 볼지 (예: /why/retrospect/2025)
  matchPrefix?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/learn", label: "AI 학습", icon: GraduationCap },
  { href: "/cases", label: "제약 AI 사례", icon: FlaskConical },
  { href: "/why/retrospect/2025", label: "2025 회고", icon: NotebookPen, matchPrefix: true },
];

const isActive = (pathname: string, item: NavItem) => {
  // "/" 도 /learn 콘텐츠를 노출하므로 홈에서는 학습 탭을 활성으로 본다
  if (item.href === "/learn" && pathname === "/") return true;
  return item.matchPrefix ? pathname.startsWith(item.href) : pathname === item.href;
};

export const SiteNav = () => {
  const pathname = usePathname() ?? "/";

  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-3 sm:px-6">
        <Link
          href="/learn"
          className="mr-1 inline-flex shrink-0 items-center gap-1.5 text-sm font-black text-white"
        >
          <BookOpenText size={16} className="text-violet-400" />
          <span className="hidden sm:inline">FDE 학습 허브</span>
        </Link>

        <div className="flex flex-1 items-center gap-1 overflow-x-auto">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition sm:text-sm",
                  active
                    ? "bg-white text-slate-900"
                    : "text-white/60 hover:bg-white/10 hover:text-white",
                )}
              >
                <Icon size={14} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
