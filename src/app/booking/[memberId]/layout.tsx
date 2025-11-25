// app/booking/[memberId]/layout.tsx
import type { ReactNode } from 'react';
import { StepIndicator } from '@/app/booking/_components/booking/StepIndicator';

export default function BookingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100">
      <main className="mx-auto flex max-w-5xl gap-0 md:gap-6 py-6 px-4">
        {/* PC: 좌측에 StepIndicator */}
        <StepIndicator />

        {/* 우측 컨텐츠 영역 (모바일에서는 전체 폭) */}
        <section className="flex-1 rounded-lg bg-white shadow-sm p-4 md:p-6">
          {children}
        </section>
      </main>
    </div>
  );
}
