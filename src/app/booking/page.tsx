// app/booking/page.tsx
import Link from 'next/link';
import { mockMembers } from '@/lib/mockData';

export default function BookingMemberSelectPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <main className="mx-auto max-w-3xl py-10 px-4">
        <h1 className="text-2xl font-bold mb-4">건강검진 예약 대상자 선택</h1>
        <p className="text-sm text-slate-600 mb-6">
          회사에서 지원되는 본인 및 가족 구성원을 선택해 예약을 진행하세요.
        </p>

        <ul className="space-y-3">
          {mockMembers.map((member) => (
            <li
              key={member.id}
              className="flex items-center justify-between rounded-md border bg-white px-4 py-3"
            >
              <div>
                <div className="font-semibold">
                  {member.name}{' '}
                  <span className="text-xs text-slate-500">
                    ({member.relation})
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  생년월일: {member.birth}
                </div>
              </div>
              <Link
                href={`/booking/${member.id}`}
                className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                예약하기
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
