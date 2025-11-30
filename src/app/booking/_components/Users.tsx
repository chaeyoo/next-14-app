'use client';

import { useQuery } from '@tanstack/react-query';
import { userService, userKeys } from '@/services/userService';
import type { User } from '@/types/user';

// 선언적 매핑
const RELATIONSHIP_LABEL: Record<number, string> = {
  1: '본인',
  2: '배우자',
  3: '자녀',
  4: '부모',
};

const GENDER_LABEL: Record<number, string> = {
  1: '남성',
  2: '여성',
};

// 유틸 함수
const formatPhoneNumber = (phone: string) =>
  phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');

// 서브 컴포넌트
function UserAvatar({ name, highlight = false }: { name: string; highlight?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center rounded-full ${
        highlight ? 'w-12 h-12 bg-teal-100' : 'w-10 h-10 bg-gray-100'
      }`}
    >
      <span className={`font-bold ${highlight ? 'text-lg text-teal-600' : 'text-gray-600'}`}>
        {name.charAt(0)}
      </span>
    </div>
  );
}

function UserCard({ user, isMe = false }: { user: User; isMe?: boolean }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center gap-3 mb-3">
        <UserAvatar name={user.name} highlight={isMe} />
        <div>
          <p className="font-semibold text-gray-900">{user.name}</p>
          <p className="text-sm text-gray-500">
            {RELATIONSHIP_LABEL[user.relationship] || '기타'} · {GENDER_LABEL[user.gender]}
          </p>
        </div>
      </div>

      {isMe && (
        <div className="space-y-2 text-sm">
          <InfoRow label="이메일" value={user.email || '-'} />
          <InfoRow label="연락처" value={formatPhoneNumber(user.phone_number)} />
          <InfoRow label="생년월일" value={user.birthday} />
          {user.company_name && <InfoRow label="회사" value={user.company_name} />}
          {user.department_name && <InfoRow label="부서" value={user.department_name} />}
        </div>
      )}

      {!isMe && (
        <p className="text-sm text-gray-500 mt-2">{user.birthday}</p>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-900">{value}</span>
    </div>
  );
}

function LoadingState() {
  return <div className="p-4 text-center text-gray-500">데이터를 불러오는 중...</div>;
}

function ErrorState() {
  return <div className="p-4 text-center text-red-500">데이터를 불러오는데 실패했습니다.</div>;
}

// 메인 컴포넌트
export default function Users() {
  const { data: meData, isLoading: meLoading, isError: meError } = useQuery({
    queryKey: userKeys.me(),
    queryFn: userService.getMe,
  });

  const { data: familyData, isLoading: familyLoading, isError: familyError } = useQuery({
    queryKey: userKeys.family(),
    queryFn: () => userService.getFamily(false),
  });

  if (meLoading || familyLoading) return <LoadingState />;
  if (meError || familyError) return <ErrorState />;

  const me = meData?.data.user;
  const family = familyData?.data.users ?? [];
  const remainCount = familyData?.data.remain_family_support_count ?? 0;

  return (
    <div className="p-4 space-y-6">
      {/* 본인 정보 */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">내 정보</h2>
        {me && <UserCard user={me} isMe />}
      </section>

      {/* 가족 정보 */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900">가족 정보</h2>
          <span className="text-sm text-gray-500">남은 지원 횟수: {remainCount}회</span>
        </div>

        {family.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
            등록된 가족이 없습니다.
          </div>
        ) : (
          <div className="space-y-3">
            {family.map((member) => (
              <UserCard key={member.id} user={member} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
