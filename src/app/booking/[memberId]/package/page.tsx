// app/booking/[memberId]/package/page.tsx
'use client';

import { useRouter, useParams } from 'next/navigation';
import { mockPackages } from '@/lib/mockData';
import { useBookingStore } from '@/store/bookingStore';

export default function PackageSelectPage() {
  const router = useRouter();
  const params = useParams<{ memberId: string }>();
  const memberId = params.memberId;

  const { hospitalId, packageId, setPackageId } = useBookingStore();

  // 간단 가드: 병원 선택 안 했으면 병원 선택으로
  if (!hospitalId && typeof window !== 'undefined') {
    router.replace(`/booking/${memberId}/hospital`);
  }

  const handleNext = () => {
    router.push(`/booking/${memberId}/date`);
  };

  return (
    <div className="space-y-6">
      <div className="md:hidden text-xs text-slate-500">
        3 / 6 단계 · 패키지 선택
      </div>

      <h1 className="text-xl font-semibold mb-2">검진 패키지 선택</h1>
      <p className="text-sm text-slate-600 mb-4">
        선택한 병원에서 제공하는 건강검진 패키지 중 하나를 선택해 주세요.
      </p>

      <ul className="space-y-3">
        {mockPackages.map((pkg) => {
          const isSelected = packageId === pkg.id;

          return (
            <li
              key={pkg.id}
              className={`cursor-pointer rounded-md border px-4 py-3 text-sm ${
                isSelected
                  ? 'border-blue-600 bg-blue-50'
                  : 'hover:bg-slate-50'
              }`}
              onClick={() => setPackageId(pkg.id)}
            >
              <div className="font-semibold">{pkg.name}</div>
              <div className="mt-1 text-xs text-slate-500">
                {pkg.description}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={() => router.push(`/booking/${memberId}/hospital`)}
          className="rounded-md border px-4 py-2 text-sm"
        >
          이전
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!packageId}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:bg-slate-300"
        >
          다음 (검진 희망일 선택)
        </button>
      </div>
    </div>
  );
}
