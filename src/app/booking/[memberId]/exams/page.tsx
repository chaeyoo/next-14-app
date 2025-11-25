// app/booking/[memberId]/exams/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  mockIncludedExams,
  mockAdditionalExams,
} from '@/lib/mockData';
import { useBookingStore } from '@/store/bookingStore';

export default function ExamsSelectPage() {
  const router = useRouter();
  const params = useParams<{ memberId: string }>();
  const memberId = params.memberId;

  const {
    preferredDate1,
    selectedIncludedExamIds,
    selectedAdditionalExamIds,
    setExams,
  } = useBookingStore();

  useEffect(() => {
    if (!preferredDate1) {
      router.replace(`/booking/${memberId}/date`);
    }
  }, [preferredDate1, memberId, router]);

  const toggleIncluded = (id: string) => {
    const exists = selectedIncludedExamIds.includes(id);
    const next = exists
      ? selectedIncludedExamIds.filter((x) => x !== id)
      : [...selectedIncludedExamIds, id];

    setExams({
      included: next,
      additional: selectedAdditionalExamIds,
    });
  };

  const toggleAdditional = (id: string) => {
    const exists = selectedAdditionalExamIds.includes(id);
    const next = exists
      ? selectedAdditionalExamIds.filter((x) => x !== id)
      : [...selectedAdditionalExamIds, id];

    setExams({
      included: selectedIncludedExamIds,
      additional: next,
    });
  };

  const handleNext = () => {
    router.push(`/booking/${memberId}/confirm`);
  };

  return (
    <div className="space-y-6">
      <div className="md:hidden text-xs text-slate-500">
        5 / 6 단계 · 선택/추가 검사 선택
      </div>

      <h1 className="text-xl font-semibold mb-2">검사 항목 선택</h1>
      <p className="text-sm text-slate-600 mb-2">
        기본 패키지에 포함된 검사 외에, 필요 시 추가 검사를 선택할 수 있습니다.
      </p>

      <section className="space-y-2 rounded-md border p-4">
        <h2 className="text-sm font-semibold">패키지 기본 포함 검사</h2>
        <p className="text-xs text-slate-500">
          기본적으로 포함된 검사 항목입니다. 필요에 따라 해제할 수 있습니다.
        </p>
        <div className="mt-2 space-y-1">
          {mockIncludedExams.map((exam) => (
            <label
              key={exam.id}
              className="flex items-center gap-2 text-sm"
            >
              <input
                type="checkbox"
                checked={selectedIncludedExamIds.includes(exam.id)}
                onChange={() => toggleIncluded(exam.id)}
                className="h-4 w-4"
              />
              <span>{exam.name}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="space-y-2 rounded-md border p-4">
        <h2 className="text-sm font-semibold">추가 검사 선택 (선택사항)</h2>
        <p className="text-xs text-slate-500">
          의사 소견 또는 본인 희망에 따라 추가 검사를 선택할 수 있습니다.
        </p>
        <div className="mt-2 space-y-1">
          {mockAdditionalExams.map((exam) => (
            <label
              key={exam.id}
              className="flex items-center gap-2 text-sm"
            >
              <input
                type="checkbox"
                checked={selectedAdditionalExamIds.includes(exam.id)}
                onChange={() => toggleAdditional(exam.id)}
                className="h-4 w-4"
              />
              <span>{exam.name}</span>
            </label>
          ))}
        </div>
      </section>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => router.push(`/booking/${memberId}/date`)}
          className="rounded-md border px-4 py-2 text-sm"
        >
          이전
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
        >
          다음 (정보 확인)
        </button>
      </div>
    </div>
  );
}
