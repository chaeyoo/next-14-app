// app/booking/[memberId]/consent/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useBookingStore } from '@/store/bookingStore';

export default function ConsentPage() {
  const params = useParams<{ memberId: string }>();
  const router = useRouter();
  const memberId = params.memberId;

  const {
    memberId: storedMemberId,
    setMemberId,
    setConsentInfo,
    phone,
    address,
    consentAgreed,
  } = useBookingStore();

  const [localPhone, setLocalPhone] = useState(phone);
  const [localAddress, setLocalAddress] = useState(address);
  const [localConsent, setLocalConsent] = useState(consentAgreed);

  useEffect(() => {
    if (!storedMemberId && memberId) {
      setMemberId(memberId);
    }
  }, [storedMemberId, memberId, setMemberId]);

  const handleNext = () => {
    setConsentInfo({
      phone: localPhone,
      address: localAddress,
      consentAgreed: localConsent,
    });
    router.push(`/booking/${memberId}/hospital`);
  };

  const isNextDisabled =
    !localConsent || localPhone.trim() === '' || localAddress.trim() === '';

  return (
    <div className="space-y-6">
      {/* 모바일용 상단 스텝 텍스트 */}
      <div className="md:hidden text-xs text-slate-500">
        1 / 6 단계 · 동의 및 정보 입력
      </div>

      <h1 className="text-xl font-semibold">서비스 이용 동의 및 정보 입력</h1>

      <section className="space-y-3 rounded-md border p-4">
        <h2 className="text-sm font-semibold">서비스 이용 및 개인정보 처리 동의</h2>
        <p className="text-xs text-slate-600">
          건강검진 예약을 위해 서비스 이용약관 및 개인정보 처리방침에 동의해 주세요.
        </p>
        <label className="mt-2 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={localConsent}
            onChange={(e) => setLocalConsent(e.target.checked)}
            className="h-4 w-4"
          />
          <span>위 약관 및 개인정보 처리방침에 동의합니다.</span>
        </label>
      </section>

      <section className="space-y-4 rounded-md border p-4">
        <div>
          <label className="block text-sm font-medium mb-1">휴대폰 번호</label>
          <input
            type="tel"
            value={localPhone}
            onChange={(e) => setLocalPhone(e.target.value)}
            placeholder="010-1234-5678"
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">주소</label>
          <input
            type="text"
            value={localAddress}
            onChange={(e) => setLocalAddress(e.target.value)}
            placeholder="서울시 ..."
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>
      </section>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => router.back()}
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
          다음 (병원 선택)
        </button>
      </div>
    </div>
  );
}
