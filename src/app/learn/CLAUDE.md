# /learn — 생성형 AI 용어 학습 & 퀴즈 페이지

채용 공고(생성형 AI 서비스 개발, FDE)의 핵심 용어를 **학습 → 퀴즈**로 익히는
자기완결형(self-contained) 페이지. 외부 API 없이 정적 콘텐츠 + localStorage 진도.

## 구조 (선언적 패턴)

```
learn/
├── page.tsx                  # 뷰 상태 머신 (home | lesson | final)
├── _types.ts                 # Lesson/Category/Quiz/Progress 타입
├── _constants/
│   └── curriculum.ts         # 모든 학습 콘텐츠 + 퀴즈 (단일 소스)
├── _hooks/
│   └── useProgress.ts        # localStorage 진도 영속화
└── _components/
    ├── CurriculumHome.tsx    # 커리큘럼 홈(트랙별 레슨 카드 + 진도)
    ├── LessonView.tsx        # 레슨 읽기 → 미니 퀴즈 전환
    └── Quiz.tsx              # 재사용 퀴즈(즉시 채점·해설·결과)
```

## 콘텐츠 트랙 (4개)

1. **핵심 개념**: RAG 최적화 · Function Calling · Agentic Workflow · Subagent · MCP
2. **프레임워크·도구**: FastAPI · FastMCP · PydanticAI · LangChain/LangGraph
3. **실무·방법론**: Enterprise LLM API & ML/DL 기초 · AI 개발도구 · FDE 정체성
4. **FDE 실전 역량**: 프롬프트·컨텍스트 엔지니어링 · LLM 평가(Evals)·관측성 · 가드레일·AI 안전 · 현장 디스커버리·워크플로우 분석 · PoC→프로덕션

## 콘텐츠 추가/수정

- 레슨/퀴즈는 **`_constants/curriculum.ts` 한 곳**에서만 관리한다.
- 새 레슨: `LESSONS`에 객체 추가(`categoryId`, `order`, `sections`, `keyTakeaways`, `quiz`).
- 퀴즈 통과 기준은 정답률 70%. 최종 시험은 전체 문항에서 무작위 10문항.

## 주의

- `page.tsx`의 `pickRandom`은 `Math.random`을 쓰므로 **이벤트 핸들러(클라이언트 런타임)**에서만 호출.
- 진도 저장 키: `ai-learn-progress-v1` (스키마 변경 시 버전 접미사 올리기).
- 다크 테마 고정 디자인(`bg-slate-950`). 344px 이상에서 깨지지 않도록 반응형 유지.
