# Project Guidelines

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Tanstack Query (React Query)
- MSW (Mock Service Worker)

## Project Structure

```
src/
├── app/                    # Next.js App Router
├── components/             # 공통 컴포넌트
├── types/                  # 타입/인터페이스 정의
├── services/               # API 호출 로직
├── providers/              # Context Providers
├── mocks/                  # MSW 설정
│   ├── handlers/           # API 핸들러
│   ├── data/               # Mock 데이터
│   ├── browser.ts          # 브라우저용 워커
│   ├── server.ts           # Node.js 테스트용
│   └── MSWProvider.tsx     # Next.js Provider
└── hooks/                  # Custom Hooks
```

## Coding Conventions

### 선언적 코딩 스타일
- 매직넘버 대신 상수 매핑 객체 사용
- API 로직은 `services/` 폴더에 분리
- 타입/인터페이스는 `types/` 폴더에 분리
- Query Key는 팩토리 패턴으로 관리

### API Service 패턴
```typescript
// services/userService.ts
export const userService = {
  getMe: async (): Promise<UserResponse> => {
    const res = await fetch(`${API_PREFIX}/users/me`);
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  },
};

// Query Keys
export const userKeys = {
  all: ['user'] as const,
  me: () => [...userKeys.all, 'me'] as const,
  family: () => [...userKeys.all, 'family'] as const,
};
```

### 컴포넌트에서 사용
```typescript
import { useQuery } from '@tanstack/react-query';
import { userService, userKeys } from '@/services/userService';
import type { User } from '@/types/user';

const { data, isLoading, isError } = useQuery({
  queryKey: userKeys.me(),
  queryFn: userService.getMe,
});
```

## MSW (Mock Service Worker)

### 환경변수
```bash
# .env.local
NEXT_PUBLIC_API_MOCKING=enabled   # mock 사용
NEXT_PUBLIC_API_MOCKING=disabled  # 실제 API 사용
```

### API별 Mock 제어
```typescript
// src/mocks/handlers/index.ts
export const handlers = [
  ...(process.env.NEXT_PUBLIC_MOCK_USERS === 'true' ? usersHandlers : []),
  ...(process.env.NEXT_PUBLIC_MOCK_CENTERS === 'true' ? centersHandlers : []),
];
```

### 테스트 방법
브라우저 콘솔에서:
```javascript
fetch('/ebs/renewal/v1/users/me').then(r => r.json()).then(console.log)
```

## API Endpoints (Mock)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/ebs/renewal/v1/users/me` | 내 정보 조회 |
| GET | `/ebs/renewal/v1/users/me/family` | 가족 목록 |
| GET | `/ebs/renewal/v1/users/me/addresses` | 위치 정보 |
| POST | `/ebs/renewal/v1/healthcheck/centers` | 병원 검색 |
| GET | `/ebs/renewal/v1/healthcheck/centers/:id` | 병원 상세 |
| GET | `/ebs/renewal/v1/healthcheck/reservations` | 예약 목록 |
| POST | `/ebs/renewal/v1/healthcheck/reservations` | 예약 생성 |
