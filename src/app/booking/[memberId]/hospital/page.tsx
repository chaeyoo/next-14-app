// app/booking/[memberId]/hospital/page.tsx
'use client';

import { useRouter, useParams } from 'next/navigation';
import { mockHospitals } from '@/lib/mockData';
import { useBookingStore } from '@/store/bookingStore';

export default function HospitalSelectPage() {
  const router = useRouter();
  const params = useParams<{ memberId: string }>();
  const memberId = params.memberId;

  const { hospitalId, setHospitalId, consentAgreed } = useBookingStore();

  // 간단한 가드: 동의 안 했는데 바로 들어오면 consent로 보내기
  if (!consentAgreed) {
    if (typeof window !== 'undefined') {
      router.replace(`/booking/${memberId}/consent`);
    }
  }

  const handleNext = () => {
    router.push(`/booking/${memberId}/package`);
  };

  return (
    <div className="space-y-6">
      <div className="md:hidden text-xs text-slate-500">
        2 / 6 단계 · 병원 선택
      </div>

      <h1 className="text-xl font-semibold mb-2">검진 병원 선택</h1>
      <p className="text-sm text-slate-600">
        회사와 제휴된 건강검진 병원 중에서 원하는 곳을 선택해 주세요.
      </p>

      <ul className="space-y-3">
        {mockHospitals.map((hospital) => {
          const isSelected = hospitalId === hospital.id;
          return (
            <li
              key={hospital.id}
              className={`cursor-pointer rounded-md border px-4 py-3 text-sm ${
                isSelected
                  ? 'border-blue-600 bg-blue-50'
                  : 'hover:bg-slate-50'
              }`}
              onClick={() => setHospitalId(hospital.id)}
            >
              <div className="font-semibold">{hospital.name}</div>
              <div className="text-xs text-slate-500">{hospital.address}</div>
            </li>
          );
        })}
      </ul>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => router.push(`/booking/${memberId}/consent`)}
          className="rounded-md border px-4 py-2 text-sm"
        >
          이전
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!hospitalId}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:bg-slate-300"
        >
          다음 (패키지 선택)
        </button>
      </div>
    </div>
  );
}
