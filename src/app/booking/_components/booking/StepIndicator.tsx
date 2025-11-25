// components/booking/StepIndicator.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const steps = [
  { id: 'consent', label: '동의 및 정보입력' },
  { id: 'hospital', label: '병원 선택' },
  { id: 'package', label: '패키지 선택' },
  { id: 'date', label: '검진 희망일' },
  { id: 'exams', label: '선택/추가 검사' },
  { id: 'confirm', label: '예약 확인' },
];

export function StepIndicator() {
  const pathname = usePathname();

  return (
    // 모바일에서는 숨기고, md 이상에서만 보이게
    <aside className="hidden md:block w-64 border-r bg-slate-50">
      <h2 className="px-4 py-3 text-sm font-semibold text-slate-700">
        건강검진 예약 진행 상황
      </h2>
      <ol className="space-y-1 px-2 pb-4">
        {steps.map((step, index) => {
          const isActive = pathname.includes(`/${step.id}`);
          const stepNumber = index + 1;

          return (
            <li key={step.id}>
              <Link
                href={pathname.replace(
                  /(consent|hospital|package|date|exams|confirm|complete)/,
                  step.id
                )}
                className={clsx(
                  'flex items-center gap-2 rounded-md px-3 py-2 text-sm',
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                )}
              >
                <span
                  className={clsx(
                    'flex h-6 w-6 items-center justify-center rounded-full text-xs',
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  )}
                >
                  {stepNumber}
                </span>
                <span>{step.label}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
