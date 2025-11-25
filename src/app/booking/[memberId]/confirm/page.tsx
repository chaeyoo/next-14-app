// app/booking/[memberId]/confirm/page.tsx
'use client';

import { useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useBookingStore } from '@/store/bookingStore';
import {
  mockMembers,
  mockHospitals,
  mockPackages,
  mockIncludedExams,
  mockAdditionalExams,
} from '@/lib/mockData';

export default function BookingConfirmPage() {
  const router = useRouter();
  const params = useParams<{ memberId: string }>();
  const memberId = params.memberId;

  const booking = useBookingStore();

  const member = useMemo(
    () => mockMembers.find((m) => m.id === booking.memberId),
    [booking.memberId]
  );
  const hospital = useMemo(
    () => mockHospitals.find((h) => h.id === booking.hospitalId),
    [booking.hospitalId]
  );
  const pkg = useMemo(
    () => mockPackages.find((p) => p.id === booking.packageId),
    [booking.packageId]
  );

  const includedExams = useMemo(
    () =>
      mockIncludedExams.filter((exam) =>
        booking.selectedIncludedExamIds.includes(exam.id)
      ),
    [booking.selectedIncludedExamIds]
  );
  const additionalExams = useMemo(
    () =>
      mockAdditionalExams.filter((exam) =>
        booking.selectedAdditionalExamIds.includes(exam.id)
      ),
    [booking.selectedAdditionalExamIds]
  );

  const handleSubmit = () => {
    // 실제로는 여기서 API 호출
    console.log('예약 요청 payload:', booking);

    router.push(`/booking/${memberId}/complete`);
  };

  return (
    <div className="space-y-6">
      <div className="md:hidden text-xs text-slate-500">
        6 / 6 단계 · 예약 내용 확인
      </div>

      <h1 className="text-xl font-semibold">예약 정보 확인</h1>
      <p className="text-sm text-slate-600">
        아래 내용을 확인하신 후 예약을 완료해 주세요.
      </p>

      {/* 대상자 & 연락처 */}
      <section className="space-y-2 rounded-md border p-4 text-sm">
        <h2 className="text-sm font-semibold mb-1">대상자 정보</h2>
        <div className="flex justify-between">
          <span className="text-slate-500">대상자</span>
          <span className="font-medium">
            {member ? `${member.name} (${member.relation})` : '-'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">휴대폰 번호</span>
          <span className="font-medium">{booking.phone || '-'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">주소</span>
          <span className="font-medium">{booking.address || '-'}</span>
        </div>
      </section>

      {/* 병원 & 패키지 */}
      <section className="space-y-2 rounded-md border p-4 text-sm">
        <h2 className="text-sm font-semibold mb-1">병원 및 패키지</h2>
        <div className="flex justify-between">
          <span className="text-slate-500">병원</span>
          <span className="font-medium">
            {hospital ? hospital.name : '-'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">패키지</span>
          <span className="font-medium">{pkg ? pkg.name : '-'}</span>
        </div>
      </section>

      {/* 날짜 */}
      <section className="space-y-2 rounded-md border p-4 text-sm">
        <h2 className="text-sm font-semibold mb-1">검진 희망일</h2>
        <div className="flex justify-between">
          <span className="text-slate-500">1차 희망일</span>
          <span className="font-medium">
            {booking.preferredDate1 || '-'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">2차 희망일</span>
          <span className="font-medium">
            {booking.preferredDate2 || '-'}
          </span>
        </div>
      </section>

      {/* 검사 항목 */}
      <section className="space-y-2 rounded-md border p-4 text-sm">
        <h2 className="text-sm font-semibold mb-1">검사 항목</h2>
        <div>
          <div className="text-xs text-slate-500 mb-1">
            기본 포함 검사
          </div>
          {includedExams.length > 0 ? (
            <ul className="list-disc pl-5 space-y-0.5">
              {includedExams.map((exam) => (
                <li key={exam.id}>{exam.name}</li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-400">선택된 항목이 없습니다.</p>
          )}
        </div>

        <div className="mt-3">
          <div className="text-xs text-slate-500 mb-1">
            추가 검사
          </div>
          {additionalExams.length > 0 ? (
            <ul className="list-disc pl-5 space-y-0.5">
              {additionalExams.map((exam) => (
                <li key={exam.id}>{exam.name}</li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-400">
              추가로 선택된 검사가 없습니다.
            </p>
          )}
        </div>
      </section>

      <div className="flex flex-col gap-2 border border-amber-200 bg-amber-50 p-3 rounded-md text-xs text-amber-700">
        <p>
          ※ 실제 서비스에서는 예약 완료 후 문자 또는 알림으로 예약 결과가 전달됩니다.
        </p>
        <p>
          ※ 검진 날짜는 병원 사정에 따라 조정될 수 있으며, 변경 시 별도 안내가 제공됩니다.
        </p>
      </div>

      <div className="flex justify-between gap-2">
        <button
          type="button"
          onClick={() => router.push(`/booking/${memberId}/exams`)}
          className="rounded-md border px-4 py-2 text-sm"
        >
          이전
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
        >
          예약 완료하기
        </button>
      </div>
    </div>
  );
}
