# /learn — 생성형 AI 용어 학습 & 퀴즈 페이지

채용 공고(생성형 AI 서비스 개발, FDE)의 핵심 용어를 **학습 → 퀴즈**로 익히는
자기완결형(self-contained) 페이지. 외부 API 없이 정적 콘텐츠 + localStorage 진도.

## 구조 (선언적 패턴)

```
learn/
├── page.tsx                  # 뷰 상태 머신 (home | lesson | article | final | articleExam)
├── _types.ts                 # Lesson/Category/Article/ArticleSeries/Quiz/Progress 타입
├── _constants/
│   ├── curriculum.ts         # 레슨 학습 콘텐츠 + 퀴즈 (단일 소스)
│   └── articles/             # 심화 아티클 15편 (시리즈별 파일 분리)
│       ├── index.ts          # ARTICLE_SERIES/ARTICLES/헬퍼/ARTICLE_EXAM_ID
│       ├── architecture.ts   # 시리즈 1 — 아키텍처 심화 (5편)
│       ├── production.ts     # 시리즈 2 — 프로덕션 & 신뢰성 (5편)
│       └── field.ts          # 시리즈 3 — FDE 현장 플레이북 (5편)
├── _hooks/
│   └── useProgress.ts        # localStorage 진도 영속화 (레슨·아티클 공용)
└── _components/
    ├── CurriculumHome.tsx    # 커리큘럼 홈(트랙별 레슨 카드 + 진도 + 아티클 서가)
    ├── LessonView.tsx        # 레슨 읽기 → 미니 퀴즈 전환
    ├── ArticlesShelf.tsx     # 심화 아티클 목록 + 읽기 진도 + 종합 퀴즈 CTA
    ├── ArticleView.tsx       # 아티클 읽기 (읽음 표시·이전/다음 이동·관련 레슨 배지)
    └── Quiz.tsx              # 재사용 퀴즈(즉시 채점·해설·결과)
```

## 콘텐츠 구성

### 레슨 트랙 (4개) — 용어 학습 & 레슨별 퀴즈

1. **핵심 개념**: RAG 최적화 · Function Calling · Agentic Workflow · Subagent · MCP
2. **프레임워크·도구**: FastAPI · FastMCP · PydanticAI · LangChain/LangGraph
3. **실무·방법론**: Enterprise LLM API & ML/DL 기초 · AI 개발도구 · FDE 정체성
4. **FDE 실전 역량**: 프롬프트·컨텍스트 엔지니어링 · LLM 평가(Evals)·관측성 · 가드레일·AI 안전 · 현장 디스커버리·워크플로우 분석 · PoC→프로덕션

### 심화 아티클 시리즈 (3개, 총 15편) — 읽기 중심 + 종합 퀴즈 마무리

1. **아키텍처 심화**(5편): 컨텍스트 윈도우의 경제학 · 고급 RAG 아키텍처 · 임베딩과 검색 품질 · 구조화 출력 설계 · 멀티 에이전트 패턴
2. **프로덕션 & 신뢰성**(5편): 골든셋과 LLM-as-Judge · 신뢰성 엔지니어링 · 비용·레이턴시 최적화 · 프롬프트 인젝션과 보안 · 관측성과 운영 루프
3. **FDE 현장 플레이북**(5편): 엔터프라이즈 데이터 통합 · Human-in-the-Loop 설계 · 디스커버리와 ROI 설계 · 프롬프팅 vs RAG vs 파인튜닝 · 파일럿에서 전사 확산

- 아티클에는 **개별 퀴즈가 없다**. 각 아티클의 `quiz`(2문항)는 **아티클 종합 퀴즈의 출제 풀**로만 쓰이며, 종합 퀴즈는 아티클당 1문항씩 무작위 추출(총 15문항, 통과 70%).
- 각 아티클은 `relatedLessonIds`로 심화 대상 레슨을 명시한다 (ArticleView에서 배지로 노출).

## 콘텐츠 추가/수정

- 레슨/레슨 퀴즈: **`_constants/curriculum.ts` 한 곳**에서만 관리 (`categoryId`, `order`, `sections`, `keyTakeaways`, `quiz`).
- 아티클: `_constants/articles/` 의 **시리즈 파일**에 추가하고 `order`(전체 순번)를 부여. 새 시리즈는 `_types.ts`의 `ArticleSeriesId` 확장 + `index.ts`의 `ARTICLE_SERIES`에 등록.
- 퀴즈 통과 기준은 정답률 70%. 레슨 최종 시험은 전체 문항에서 무작위 10문항.

## 진도 저장

- 저장 키: `ai-learn-progress-v1` (스키마 변경 시 버전 접미사 올리기).
- `Progress.learned`에는 레슨 학습 완료와 **아티클 읽음**이 같은 스키마로 저장된다 (id로 구분).
- 아티클 종합 퀴즈 최고 점수는 가상 id `articles-final`(`ARTICLE_EXAM_ID`)로 `bestScore`에 저장.

## 주의

- `page.tsx`의 `pickRandom`은 `Math.random`을 쓰므로 **이벤트 핸들러(클라이언트 런타임)**에서만 호출.
- 다크 테마 고정 디자인(`bg-slate-950`). 344px 이상에서 깨지지 않도록 반응형 유지.
- 도메인 루트(`/`)는 `src/app/page.tsx`에서 이 페이지를 그대로 재노출한다.
