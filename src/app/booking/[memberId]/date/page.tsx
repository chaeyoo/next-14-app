// app/booking/[memberId]/date/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useBookingStore } from '@/store/bookingStore';

export default function DateSelectPage() {
  const router = useRouter();
  const params = useParams<{ memberId: string }>();
  const memberId = params.memberId;

  const {
    packageId,
    preferredDate1,
    preferredDate2,
    setPreferredDates,
  } = useBookingStore();

  const [date1, setDate1] = useState(preferredDate1 ?? '');
  const [date2, setDate2] = useState(preferredDate2 ?? '');

  useEffect(() => {
    if (!packageId) {
      router.replace(`/booking/${memberId}/package`);
    }
  }, [packageId, memberId, router]);

  const handleNext = () => {
    setPreferredDates({
      preferredDate1: date1 || null,
      preferredDate2: date2 || null,
    });
    router.push(`/booking/${memberId}/exams`);
  };

  const isNextDisabled = !date1; // 1차 희망일은 필수, 2차는 옵션 정도로

  return (
    <div className="space-y-6">
      <div className="md:hidden text-xs text-slate-500">
        4 / 6 단계 · 검진 희망일 선택
      </div>

      <h1 className="text-xl font-semibold mb-2">검진 희망일 선택</h1>
      <p className="text-sm text-slate-600">
        가능한 날짜를 1차, 2차 희망일로 입력해 주세요. 2차 희망일은 선택 사항입니다.
      </p>

      <section className="space-y-4 rounded-md border p-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            1차 희망일 <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={date1}
            onChange={(e) => setDate1(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            2차 희망일 (선택)
          </label>
          <input
            type="date"
            value={date2}
            onChange={(e) => setDate2(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>
      </section>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => router.push(`/booking/${memberId}/package`)}
          className="rounded-md border px-4 py-2 text-sm"
        >
          이전
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={isNextDisabled}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:bg-slate-300"
        >
          다음 (검사 선택)
        </button>
      </div>
    </div>
  );
}
