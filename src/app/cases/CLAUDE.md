# /cases — 제약 업계 AI · RAG · MCP 실전 사례 페이지

제약 업계에서 AI/RAG/MCP로 생산성을 올린 **실제 사례**와 그 **구축 구조**를
정리한 자기완결형(self-contained) 페이지. 외부 API 없이 정적 콘텐츠로 동작.

## ⚠️ 콘텐츠 원칙 (가장 중요)

- **실제 사례만 수록한다. 지어내지 않는다.** 확인되지 않은 사례·수치는 넣지 않는다.
- 모든 사례에는 `sources`(출처 링크)를 반드시 명시한다.
- 시간 단축·건수 등 수치는 **출처가 보도·발표한 값을 그대로 인용**하고, 상세 화면 하단에
  "발표 주체의 자체 측정치일 수 있으니 자체 베이스라인으로 재검증" 고지를 유지한다.
- 사례 추가 시: 웹에서 1차/신뢰 출처를 확인한 뒤 `CASE_STUDIES`에 항목을 추가.

## 구조 (선언적 패턴)

```
cases/
├── page.tsx                    # 뷰 상태 머신 (home | case) + SiteNav
├── _types.ts                   # CaseStudy/CaseSector/ArchLayer/CaseSource/TechTag
├── _constants/
│   └── caseStudies.ts          # 영역(CASE_SECTORS) + 사례(CASE_STUDIES) 단일 소스
└── _components/
    ├── CasesHome.tsx           # 히어로 + 신뢰성 고지 + 영역별 사례 카드 (TechBadge)
    └── CaseView.tsx            # 상세: 문제 → 구축 구조 → 스택 → 성과 → FDE 학습 → 출처
```

## 수록 사례 (영역별)

- **신약 발굴**: Insilico Medicine — Rentosertib (PandaOmics + Chemistry42, Nature Medicine Phase IIa)
- **임상·규제 문서**: Novo Nordisk — NovoScribe (Bedrock+Claude+Atlas Vector+LangChain RAG) / Eli Lilly — 임상 문서 자동화
- **전사 플랫폼**: Moderna — mChat · 750 GPTs · Dose ID
- **의사결정 인텔리전스**: Sanofi — plai (Aily Labs)
- **마케팅 콘텐츠**: Pfizer — Charlie (승인 콘텐츠 그라운딩)
- **데이터·MCP 인프라**: Open Targets — Platform MCP Server

## 네비게이션

- 공통 네비게이션은 `@/components/common/SiteNav`. 콘텐츠 페이지(`/learn`, `/cases`,
  `/why/retrospect/2025`)에 상단 sticky 바로 삽입되어 있다.
- 페이지가 늘면 `SiteNav`의 `NAV_ITEMS` 배열에만 항목을 추가한다 (단일 소스).

## 주의

- 다크 테마 고정(`bg-slate-950`). 344px 이상에서 가로 오버플로우 없도록 유지
  (카드 컨테이너는 `min-w-0` + 자식 truncate). 670px↑에서 2열 그리드.
- 외부 출처 링크는 `target="_blank" rel="noopener noreferrer"`.
