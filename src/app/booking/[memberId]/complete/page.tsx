// app/booking/[memberId]/complete/page.tsx
'use client';

import { useRouter, useParams } from 'next/navigation';
import { useBookingStore } from '@/store/bookingStore';

export default function BookingCompletePage() {
  const router = useRouter();
  const params = useParams<{ memberId: string }>();
  const memberId = params.memberId;

  const { reset } = useBookingStore();

  const handleBackToList = () => {
    reset();
    router.push('/booking');
  };

  const handleNewBooking = () => {
    reset();
    router.push(`/booking/${memberId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
        <span className="text-2xl">✅</span>
      </div>
      <h1 className="text-xl font-semibold mb-2">예약이 완료되었습니다</h1>
      <p className="text-sm text-slate-600 mb-6 text-center max-w-md">
        건강검진 예약이 정상적으로 접수되었습니다.
        <br />
        예약 확정 및 일정 안내는 이후 문자 또는 이메일로 다시
        안내드릴 예정입니다.
      </p>

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          onClick={handleBackToList}
          className="rounded-md border px-4 py-2 text-sm"
        >
          다른 대상자 예약하기 (목록으로)
        </button>
        <button
          type="button"
          onClick={handleNewBooking}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
        >
          동일 대상자 재예약 흐름 테스트
        </button>
      </div>
    </div>
  );
}
