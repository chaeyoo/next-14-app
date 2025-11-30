# CLAUDE.md - 건강검진 예약 시스템 (EBS Renewal)

## 프로젝트 개요

기업 임직원 대상 건강검진 예약 시스템의 프론트엔드 리뉴얼 프로젝트.
백엔드와 병행 개발 중이며, **MSW(Mock Service Worker)** 를 사용한 Mock API로 개발 진행.

### 핵심 기술 스택
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **상태관리**: TanStack React Query v5
- **UI**: Radix UI + Tailwind CSS + shadcn/ui 패턴
- **폼**: React Hook Form + Zod
- **인증**: NextAuth.js
- **Mock**: MSW (Mock Service Worker)

---

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── [company]/          # 회사별 동적 라우팅
│   │   └── (content)/
│   │       └── reservation/    # 예약 플로우 (멀티스텝)
│   │           ├── page.tsx
│   │           ├── _components/
│   │           └── _service/
│   └── api/
│       └── auth/           # NextAuth 설정
├── components/             # 공통 컴포넌트
│   ├── ui/                 # shadcn/ui 컴포넌트
│   └── common/
├── types/                  # 타입/인터페이스 정의
├── services/               # API 호출 로직 (신규 패턴)
├── service/                # 기존 API 레이어
├── providers/              # Context Providers
├── constants/              # 상수 (MENUS 등)
├── hooks/                  # Custom Hooks
├── lib/                    # 유틸리티
└── mocks/                  # MSW 설정
    ├── handlers/           # API 핸들러
    │   ├── index.ts
    │   ├── users.ts
    │   ├── centers.ts
    │   └── reservations.ts
    ├── data/               # Mock 데이터
    ├── browser.ts          # 브라우저용 워커
    ├── server.ts           # Node.js 테스트용
    └── MSWProvider.tsx     # Next.js Provider
```

---

## 코드 컨벤션

### 선언적 코딩 스타일
- **매직넘버 대신 상수 매핑 객체 사용**
- API 로직은 `services/` 폴더에 분리
- 타입/인터페이스는 `types/` 폴더에 분리
- Query Key는 팩토리 패턴으로 관리

### API Service 패턴 (권장)
```typescript
// services/userService.ts
const API_PREFIX = '/ebs/renewal/v1';

export const userService = {
  getMe: async (): Promise<UserResponse> => {
    const res = await fetch(`${API_PREFIX}/users/me`);
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  },
  
  getFamily: async (withMe = false): Promise<FamilyResponse> => {
    const res = await fetch(`${API_PREFIX}/users/me/family?with_me=${withMe}`);
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  },
};

// Query Keys - 팩토리 패턴
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

### 파일/폴더 네이밍
- 컴포넌트: `PascalCase` (예: `TabHospital.tsx`)
- 훅/유틸: `camelCase` (예: `useGetUserInfo.ts`)
- 서비스: `camelCase` (예: `userService.ts`)
- 타입 파일: `model.ts`, `user.ts`

### 컴포넌트 패턴
```typescript
// 1. Props 타입 정의
type Props = {
  defaultValue: SomeState;
  onNext(data: SomeState): void;
  onPrev(): void;
};

// 2. 컴포넌트
export const TabSomething = ({ defaultValue, onNext, onPrev }: Props) => {
  // 3. 상태 & 훅
  const [state, setState] = useState(defaultValue);
  
  // 4. 핸들러
  const handleNext = () => { onNext(state); };
  
  // 5. JSX
  return (
    <>
      <PreventPageReload />
      <div className="relative flex flex-col gap-[50px]">
        <header>...</header>
        <section>...</section>
        <FooterButtons ... />
      </div>
    </>
  );
};
```

### 스타일링
- Tailwind CSS 사용
- `cn()` 유틸리티로 조건부 클래스 병합
- shadcn/ui 컴포넌트의 variants 활용

---

## 핵심 비즈니스 플로우

### 예약 프로세스 (멀티스텝 폼)
```
1. TabUsers (대상자 선택)
   ↓ UserState
2. TabHospital (병원 선택)
   ↓ HealthCheckCenterState
3. TabGoods (검진 상품/항목 선택)
   ↓ SelectedGoods
4. TabSchedule (희망일 선택 - 1차, 2차)
   ↓ ScheduleState
5. TabConfirm (예약 확인)
   ↓ POST /reservations
6. TabSuccess (완료)
```

### 상태 관리 패턴
- `ReservationState`: 전체 예약 플로우의 상태를 단일 객체로 관리
- 스텝 변경 시 이전 값과 비교하여 다른 경우 이후 스텝 데이터 초기화
- `resetRegisterDataAfterStep` 함수로 처리

---

## API 명세

### Base URL
`/ebs/renewal/v1`

### 주요 엔드포인트
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/me` | 내 정보 조회 |
| GET | `/users/me/family` | 가족 목록 |
| PATCH | `/users/me` | 내 정보 수정 |
| PATCH | `/users/me/consents` | 동의 처리 |
| GET | `/users/me/addresses` | 위치 정보 |
| POST | `/users/me/addresses` | 위치 추가 |
| DELETE | `/users/me/addresses/:id` | 위치 삭제 |
| GET | `/healthcheck/centers/filters` | 필터 조회 |
| POST | `/healthcheck/centers` | 병원 검색 |
| GET | `/healthcheck/centers/:id` | 병원 상세 |
| GET | `/healthcheck/centers/:id/goods` | 검진 상품 |
| GET | `/healthcheck/centers/:id/capacities` | 예약 가능일 |
| GET | `/healthcheck/reservations` | 예약 목록 |
| POST | `/healthcheck/reservations` | 예약 생성 |
| GET | `/healthcheck/reservations/:id` | 예약 상세 |
| PUT | `/healthcheck/reservations/:id` | 예약 변경 |
| DELETE | `/healthcheck/reservations/:id` | 예약 취소 |

---

## MSW (Mock Service Worker)

### 환경변수 설정
```bash
# .env.local
NEXT_PUBLIC_API_MOCKING=enabled   # Mock 사용
NEXT_PUBLIC_API_MOCKING=disabled  # 실제 API 사용
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

### API별 Mock 제어 (선택적)
```typescript
// src/mocks/handlers/index.ts
export const handlers = [
  ...(process.env.NEXT_PUBLIC_MOCK_USERS !== 'false' ? usersHandlers : []),
  ...(process.env.NEXT_PUBLIC_MOCK_CENTERS !== 'false' ? centersHandlers : []),
];
```

### MSW 핸들러 패턴
```typescript
// mocks/handlers/users.ts
import { http, HttpResponse } from 'msw';

// pathname만 사용 (origin 무관하게 매칭)
const API = '/ebs/renewal/v1';

export const usersHandlers = [
  http.get(`${API}/users/me`, () => {
    console.log('[MSW] GET /users/me');
    return HttpResponse.json({
      message: 'okay',
      data: { user: mockUserMe },
    });
  }),
];
```

### 디버깅 & 테스트

**브라우저 콘솔에서 직접 테스트:**
```javascript
fetch('/ebs/renewal/v1/users/me').then(r => r.json()).then(console.log)
```

**MSW 동작 확인:**
1. 콘솔에 `[MSW] Mocking enabled` 메시지 확인
2. Network 탭에서 요청에 `(ServiceWorker)` 라벨 확인
3. 핸들러 내 `console.log` 로그 확인

**404 에러 발생 시 체크리스트:**
1. `public/mockServiceWorker.js` 파일 존재 확인
2. `MSWProvider`가 layout에 적용되었는지 확인
3. 핸들러 URL 패턴이 실제 요청과 일치하는지 확인
4. `onUnhandledRequest: 'warn'` 설정으로 미매칭 요청 확인

### 실제 API 전환 시 체크리스트
1. `NEXT_PUBLIC_API_MOCKING=disabled` 설정
2. 응답 타입 검증 (Mock과 실제 응답 구조 비교)
3. 에러 핸들링 확인

---

## 주요 도메인 타입

### User 관련
- `relationship`: 1=본인, 2=배우자, 3=자녀, 4=부모
- `gender`: 1=남성, 2=여성
- `user_grade`: 검진 등급 (1~5)
- `agree_terms_yn`: 1=미동의, 2=동의

### 예약 관련
- `reservation.status`: 1=신청, 2=확정, 3=취소, 4=완료
- `time_type`: "morning" | "afternoon"
- `date_type`: "wish1" | "wish2" | "confirmed"

### 검진 상품
- `goods_detail_type`: 1=기본검사, 2=선택검사, 3=추가검사

## PC/모바일 분기 기준
- 제일 작은 건  344px에서 깨지면 안됨, 
- 670px부터 PC레이아웃

---

## 개발 시 주의사항

### 1. 회사별 분기 처리
```typescript
const { companyMode } = useCompanyNameInParam();
if (companyMode.isCj || companyMode.isCjLeader) {
  // CJ 전용 로직
}
```

### 2. 인증 처리
- 서버/클라이언트 환경에 따라 세션 가져오는 방식 다름
- `getServerSession` (서버) vs `getSession` (클라이언트)

### 3. 에러 바운더리
- `QueryErrorResetBoundary` + `ErrorBoundary` 조합 사용
- `CommonErrorBoundary` 컴포넌트 활용

### 4. Suspense 패턴
- `useSuspenseQuery` 사용 시 반드시 `Suspense`로 감싸기
- `LoadingTable` 컴포넌트를 fallback으로 사용

---

## 자주 하는 작업

### 새 API 엔드포인트 추가
1. `types/` 에 Request/Response 타입 정의
2. `services/` 에 API 함수 + Query Keys 작성
3. `mocks/handlers/` 에 Mock 핸들러 추가
4. `mocks/data/` 에 Mock 데이터 추가

### 새 예약 스텝 컴포넌트 추가
1. `_components/Tab{Name}/` 폴더 생성
2. `Props` 타입 정의 (defaultValue, onNext, onPrev)
3. `page.tsx`의 `ReservationState` 타입 확장
4. `DEFAULT_RESERVATION_STATE` 초기값 추가
5. `PATH_MAP` 라우팅 추가

### Mock 데이터 수정
- `mocks/data/` 디렉토리의 해당 파일 수정
- API 명세 문서와 동기화 유지

---

## 빌드 & 배포

```bash
# 개발
npm run dev

# 환경별 빌드
npm run build-dev   # .env.dev
npm run build-stg   # .env.stg  
npm run build-prd   # .env.prd
```

---

## 참고 문서
- API 명세: (백엔드 팀 문서 링크)
- 피그마: (디자인 링크)
- Swagger: (있다면)


## 할일
- API 명세 복붙 해놓기 업데이트 되는대로 항상!
- tailwind.config 알려주기
- 모바일 레이아웃 먼저 작업 후에 PC할 것임
- 예약 프로세스 (멀티스텝 폼)가 변경된 것 알려주기
- v2가 PATH에 들어갈때랑 안들어갈 떄가 있는데, 사용자에게 노출된 URL이 유지되어야 함. V2에서 시작했으면 V2것이 쭉 나와야 하고 없는 URL에서 시작했으면, 그 URL이 유지가 되어야 함
- path별로 CLAUDE.md 넣어두고, pc/mobile 이미지 넣어두기, 이미지 넣을 때 디자인 상태값 상세히 전달하기
- 기존 프로젝트 분석먼저 시키고 너가 다시 프로젝트 작업을 해야할 떄 기억해야할 내용 뽑아내라고 하기
- 기존 프로젝트로 만들어진거 => 프로세스 변경된 부분 알려주고 안정화먼저 하기
- 아래 페이지 나누기 내용을 보고 필요한 대충의 프로세스, 뼈대만 잡아달라고 파일 만들어달라고 하기
- PC, 모바일 전체 UI 한파일에 뽑기, mock api 넣기, 파일 분리하기 (선언적)
- 중요 내용: 상태값 관리를 하는게 중요함 >> 이것부터 정리하고 가기


## 페이지 나누기  (이 내용은 각 페이지별 CLAUDE.md에 넣어두기, 뼈대만 만들어달라고 하고 폴더 생기면 이미지 모바일 이미지랑 pc이미지 넣어두기)
1. 검진예약 페이지 (/reservation)에서 모든 예약 과정이 이루어짐 (대상자 선택, 병원 선택, 검진희망일, 검사항목, 예약 확인 페이지)
검진 예약 페이지 내에서 스텝별로 나누어짐 (아래 스텝들은 검진예약 페이지 (reservation의 레이아웃을 따름))
- 대상자 선택: 본인과 본인의 가족 목록이 나옴 (Step indicator 노출), 대상자 카드 목록의 예약하기를 클릭 -> 서비스 이용 미동의 시 서비스 이용 동의 팝업 먼저 -> 본인 정보 중에 휴대폰 번호와 주소, 배송시 요청사항이 없는 경우, 본인정보 입력 화면 노출  (Step indicator 노출) -> 다음 버튼 클릭하여 다음 단계로
- 병원 선택: 병원 목록 노출 (검색필터 존재) (Step indicator 노출), 목록에 노출된 병원 카드를 클릭하면 -> 병원 상세 페이지, 하단에 '예약하기' 클릭하여 다음 단계로
- 검진희망일 (다음 단계인 검사 항목 먼저 선택하러 다음 단계로 갈 수 있음)(모든 세부 스텝에서 Step indicator 노출): 1차 검진 희망일 (오전/오후)을 선택 -> 2차 검진 희망일 (오전/오후)을 선택
- 검사항목 (이전 단계인 검진 희망일을 선택하기 전에 먼저 선택할 수도 있고, 검사항목을 선택하다가 다시 검진 희망일을 선택하러 갈 수도 있음)(Step indicator 노출): 검진 패키지를 Select box로 선택하면 아래 검사 항목들이 변경 / 기본검사는 필수값이어서 체크박스가 켜진채로 disabled임, 선택검사와 추가 검사는 선택사항이어서 체크박스가 selectable함 -> 검사항목들을 모두 선택한 후 다음 버튼을 눌러서 다음 단계로
- 예약 확인 페이지: 대상자 기본정보와, 지금까지 선택했던 내용들 전부 보여주는 곳 (병원정보, 검진희망일, 검사정보는 기존 소스코드 적극 활용해도 될거같음), 휴대폰 번호, 주소, 병원 전달사항을 수정할 수 있는 페이지 팝업이 오픈 / 완료 버튼을 누르면 예약 완료 -> 예약이 이미 마감되었다면 사용자에게 마감되었다고 안내하는 팝업을 띄우고 다른 병원부터 선택 하거나, 날짜를 변경하는 선택지를 줌. 예약 완료 이후에는 예약 내역 조회 페이지로 이동


2. 검진 예약내역 상세 페이지 이동 (/reservations/[id])


* 특이사항: 검진 희망일 선택 화면에서 일자를 선택하지 않고 검사항목 선택화면으로 가거나, 검사 항목 선택화면에서 검사항목을 선택하지 않고 검진 희망일을 선택하러 갈떄 이동 전 안내 팝업 필요, Step Indicator 에도 반영이 되어야 함
* 예약 마감 시 처리에 대해: 다른 병원부터 선택 시에는 병원, 희망일, 검사항목 외 정보 유지 하거나, 날짜를 변경 희망일, 검사항목 외 다른 정보 유지
* 검진 hierachy: 병원 > 검진 패키지 > 기본검사 + 선택검사 (A, B, C...) + 추가 검사
* 병원을 선택할 때 검사항목 필터와, 희망일을 선택할 때 검사항목 필터가 같은 애임!!

* 팝업의 종류 (팝업이 나오는 내용은 여길 항상 참조!)
- 페이지 팝업이란, PC에서만 있는 것이고 layout의 children 부분 만큼을 다 덮는 팝업임
1) 대상자 선택 화면에서 건강검진 서비스 이용 동의는 모바일에서 바텀시트 팝업 / PC에서 페이지 팝업
2) 대싱자 선택 화면에서 본인정보 입력하는 부분은 모바일에서 풀팝업 / PC에서 페이지 팝업
3) 대싱자 선택 화면에서 본인정보 입력후 휴대폰 번호 확인하는 부분은 모바일에서 센터 팝업 / PC에서 센터 팝업
4) 검진기관 목록 검색 필터들은 모바일에서 바텀시트 팝업 (검사 희망기간, 검사항목필터) / PC에서 레이어 팝업
5) 검색어 입력 팝업은 모바일에서 풀팝업 / PC에서는 화면내에 포함
6) 병원선택 병원 상세 페이지/검사항목 선택 화면에서 패키지 선택하는 팝업은 모바일에서 바텀시트 팝업 / 그냥 Select box로 처리
7) 병원선택 병원 상세 페이지/검사항목 선택 화면에서 검사항목 설명 팝업은 모바일에서 바텀시트 팝업 / PC에서 레이어 팝업
8) 검진 희망일 선택 화면에서 검사항목 먼저 선택할 때 나오는 경고 팝업 (또는 반대)은 모바일에서 센터 팝업 / PC에서 센터 팝업
9) 검진 희망일 선택 화면에서 검사항목 필터 팝업은 모바일에서 바텀시트 팝업 / PC아직 미정
10) 예약 확인 화면에서 휴대폰 번호, 병원에 전달할 유의사항 하는 부분은 모바일에서 바텀시트 팝업 / PC에서 페이지 팝업
11) 예액 마감 안내 팝업은 모바일에서 바텀시트 팝업 / PC에서 센터팝업


#12월 1일에 일정 안내 해야댐 (API 없이 12월 둘째주까지 .,..하기 시버ㅏㄹ)
대상자 선택 - 대상자 목록 조회, 가족 추가, 약관동의, 본인정보, 
검진기관 조회 - 검진기관 목록 조회, 검색 필터, 바텀시트(검사 희망기간, 검사항목 필터), 위치설정 (설정, 주소 추가)
검진기관 검색 화면
검진기관 상세 화면 - 기본정보/검진정보 탭, 검사 상세 바텀시트, 패키지 선택 시 바텀시트 팝업
희망일 선택 - 스와이프, 검사항목 필터 (검진기관 조회에서 쓰는거랑 동일한거)
검사항목 선택 - 바텀시트 (페키지 선택, 설명)
예약정보 확인 - 휴대폰번호, 병원전달사항 바텀 시트, 예약 완료 화면/예약 마감 바텀 시트
예약 조회 상세 페이지 
예약 조회 목록 페이지
웹로그인 

예약 취소/변경
AI (설문조사, 추천 검사항목, 가족)
일검 연동 결과 페이지