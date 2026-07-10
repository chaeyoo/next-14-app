import type { CaseSector, CaseStudy } from "../_types";

// ⚠️ 수록 원칙
// - 여기 실린 사례는 모두 공개된 실제 사례이며, 각 항목의 sources 로 출처를 명시한다.
// - 지표(시간 단축·건수 등)는 해당 출처가 보도/발표한 값을 그대로 인용한 것이다.
// - 확인되지 않은 사례·수치는 넣지 않는다 (지어내지 않는다).

export const CASE_SECTORS: CaseSector[] = [
  {
    id: "discovery",
    title: "신약 발굴",
    description: "생성형 AI가 타깃 발굴부터 후보물질 설계까지",
    gradient: "from-fuchsia-500 to-purple-500",
    accent: "text-fuchsia-400",
  },
  {
    id: "clinical-docs",
    title: "임상·규제 문서",
    description: "RAG로 임상시험 보고서·규제 문서를 자동 작성",
    gradient: "from-sky-500 to-blue-500",
    accent: "text-sky-400",
  },
  {
    id: "enterprise-platform",
    title: "전사 생산성 플랫폼",
    description: "임직원이 직접 만들어 쓰는 사내 AI 도구",
    gradient: "from-emerald-500 to-teal-400",
    accent: "text-emerald-400",
  },
  {
    id: "decision-intelligence",
    title: "의사결정 인텔리전스",
    description: "사내 데이터를 통합한 에이전트형 의사결정 지원",
    gradient: "from-amber-500 to-orange-500",
    accent: "text-amber-400",
  },
  {
    id: "marketing",
    title: "마케팅 콘텐츠",
    description: "승인 콘텐츠에 그라운딩한 규제 준수 생성",
    gradient: "from-rose-500 to-pink-500",
    accent: "text-rose-400",
  },
  {
    id: "data-infra",
    title: "데이터 · MCP 인프라",
    description: "표준 프로토콜로 연구 데이터를 에이전트에 연결",
    gradient: "from-indigo-500 to-violet-500",
    accent: "text-indigo-400",
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  // ─────────────── 임상·규제 문서 (RAG) ───────────────
  {
    id: "novo-nordisk-novoscribe",
    sectorId: "clinical-docs",
    company: "Novo Nordisk",
    product: "NovoScribe",
    emoji: "📄",
    tagline: "최대 300페이지 임상시험 보고서(CSR)를 RAG로 자동 초안 작성",
    tags: ["RAG", "AI", "Agent"],
    headline: { value: "12주 → 10분", label: "CSR 작성 시간 (MongoDB 사례 기준)" },
    challenge:
      "임상시험 보고서(CSR)는 최대 300페이지에 달하며, 작성-검토-재작성-승인의 다개월 주기를 거친다. 작성자 1인당 연평균 약 2.3건에 그칠 만큼 병목이 큰 업무였다.",
    architecture: [
      {
        name: "모델 레이어 — Amazon Bedrock",
        detail:
          "Claude 계열 모델(이후 Claude Code 포함)과 Amazon Titan 임베딩을 Amazon Bedrock 위에서 사용. 자체 ChatGPT 사설 인스턴스도 병행.",
      },
      {
        name: "벡터 DB — MongoDB Atlas Vector Search",
        detail:
          "보고서 데이터와 벡터 임베딩을 저장하고, 통계 출력값과 각 텍스트 스니펫의 유사도를 계산해 관련 문구를 높은 정밀도로 선택.",
      },
      {
        name: "검색 증강(RAG) + 도메인 승인 텍스트",
        detail:
          "정의된 콘텐츠 규칙과 통계 출력에 근거해, 도메인 전문가가 승인한 텍스트와 케이스별 변수를 결합해 규제 준수 문서를 생성.",
      },
      {
        name: "오케스트레이션 — LangChain",
        detail:
          "LangChain으로 모델 교체를 애플리케이션 코드 변경 없이 빠르게 전환. 벤더 종속을 낮추는 추상화 계층.",
      },
      {
        name: "검증 — 전체 출처 lineage",
        detail:
          "생성된 모든 문장의 출처 계보(lineage)를 함께 제시해, 작성자가 정확성을 직접 검증할 수 있게 함.",
      },
    ],
    stack: [
      "Amazon Bedrock",
      "Claude (Claude Code 포함)",
      "Amazon Titan Embeddings",
      "MongoDB Atlas Vector Search",
      "LangChain",
      "RAG",
    ],
    results: [
      "CSR 초안 작성 시간을 12주에서 약 10분으로 단축 (MongoDB 사례 기준; 일부 보도는 15주→10분)",
      "생성 문장마다 출처 계보를 제시해 규제 검증 가능성 확보",
      "Common Technical Document(CTD) 전체 자동화로 확장 진행 (Claude Code 활용)",
    ],
    fdeTakeaways: [
      "규제 문서에서 신뢰는 '출처 lineage'에서 나온다 — RAG의 인용 가능성이 핵심 가치",
      "LangChain 같은 오케스트레이션 추상화로 모델 교체 유연성을 확보하면 벤더 리스크가 준다",
      "사람(도메인 전문가)의 승인 텍스트를 재료로 쓰는 Human-in-the-Loop 설계",
    ],
    sources: [
      { title: "Anthropic — Novo Nordisk 고객 사례", url: "https://claude.com/customers/novo-nordisk" },
      { title: "MongoDB — Novo Nordisk 사례 연구", url: "https://www.mongodb.com/solutions/customer-case-studies/novo-nordisk" },
    ],
  },
  {
    id: "eli-lilly-clinical-content",
    sectorId: "clinical-docs",
    company: "Eli Lilly",
    product: "임상 문서 자동화 · AI fabric",
    emoji: "🧾",
    tagline: "환자 서사(patient narrative) 등 반복 규제 문서를 자동 생성",
    tags: ["AI", "RAG"],
    headline: { value: "주 → 초", label: "환자 서사 작성 시간" },
    challenge:
      "임상 문서(환자 서사 등)는 정형화되어 있으나 양이 방대하고, 제출 일정의 병목이자 외주 비용의 원천이었다.",
    architecture: [
      {
        name: "콘텐츠 자동화 엔진",
        detail:
          "정형 임상 문서를 위한 콘텐츠 자동화(파트너 Yseop 협업)로 규칙 기반 + 생성형 텍스트를 결합.",
      },
      {
        name: "사내 AI fabric",
        detail:
          "실제 과학·운영의 병목과 경제적 성과에 근거한 수백 개 유스케이스를 얹은 사내 AI 기반 위에서 운영.",
      },
      {
        name: "TuneLab — 연합학습 플랫폼",
        detail:
          "federated learning 기반으로 데이터를 노출하지 않고 여러 조직이 공유 모델을 개선. 데이터 접근·모델 배포·협업 거버넌스를 관리.",
      },
    ],
    stack: ["콘텐츠 자동화(Yseop)", "사내 AI 플랫폼", "TuneLab (federated learning)"],
    results: [
      "AI 이니셔티브로 약 140만 시간의 업무 절감 보고 (약 160년 상당)",
      "환자 서사 2,300건 완료, 관련 제3자 비용 전년 대비 53% 절감",
      "배포 6개월 내 제출 일정 가속 — 과거 수 주 걸리던 산출물을 수 초 단위로",
    ],
    fdeTakeaways: [
      "정형·반복 규제 문서는 시간·비용 절감 효과가 크고 계량하기 쉬운 첫 타깃",
      "성과를 '시간(hours)·비용(%)'으로 계량하면 확산 승인이 쉬워진다",
      "연합학습은 데이터를 옮기지 않고 협업하는 프라이버시 보존 설계의 실전 예",
    ],
    sources: [
      { title: "Yseop — Eli Lilly 콘텐츠 자동화 사례 연구", url: "https://yseop.com/case-study/eli-lilly-case-study-content-automation/" },
      { title: "Purdue Business — Lilly AI 유스케이스", url: "https://business.purdue.edu/daniels-insights/posts/2025/lillys-ai-use-cases.php" },
    ],
  },

  // ─────────────── 신약 발굴 (생성형 AI) ───────────────
  {
    id: "insilico-rentosertib",
    sectorId: "discovery",
    company: "Insilico Medicine",
    product: "Rentosertib (INS018_055)",
    emoji: "🧬",
    tagline: "타깃 발굴·분자 설계를 생성형 AI로 — 임상 검증까지 도달한 첫 사례",
    tags: ["GenAI-Discovery", "AI"],
    headline: { value: "Phase IIa 게재", label: "Nature Medicine (2025)" },
    challenge:
      "신약 발굴은 타깃 발굴부터 후보물질 설계까지 수년·막대한 비용이 드는 과정이다. 생성형 AI가 이 파이프라인을 실제 임상 결과로 입증할 수 있는가가 미해결 질문이었다.",
    architecture: [
      {
        name: "타깃 발굴 — PandaOmics",
        detail:
          "생성형/분석 AI로 특발성 폐섬유증(IPF)의 신규 타깃인 TNIK를 식별.",
      },
      {
        name: "분자 설계 — Chemistry42",
        detail:
          "생성형 화학 엔진으로 TNIK 저해제 후보 분자 구조를 설계.",
      },
      {
        name: "임상 개발 — AI 기반 결과 예측",
        detail:
          "AI 기반 예측으로 임상 개발을 안내. 타깃 발굴·구조 생성·개발 예측 전 과정에 AI가 개입한 첫 후기 단계 진입 사례.",
      },
    ],
    stack: ["PandaOmics (generative biology)", "Chemistry42 (generative chemistry)", "AI 임상 예측"],
    results: [
      "세계 최초의 'AI가 발굴·설계한 약물'의 Phase IIa 결과를 Nature Medicine에 게재 (2025)",
      "중국 22개 사이트, IPF 환자 71명 대상 12주 이중맹검 위약대조 시험",
      "60mg QD군에서 폐기능(FVC) 평균 +98.4mL 개선 vs 위약 -20.3mL",
      "Phase III 진입 — 타깃 식별·구조 생성·결과 예측 전 과정에 AI가 쓰인 첫 후기 임상",
    ],
    fdeTakeaways: [
      "생성형 AI는 콘텐츠 생성만이 아니라 R&D 파이프라인(발굴→설계) 자체를 단축할 수 있다",
      "AI 성과는 결국 도메인 검증(여기서는 임상 결과)으로 입증되어야 신뢰를 얻는다",
    ],
    sources: [
      { title: "Insilico Medicine — Nature Medicine 게재 발표", url: "https://insilico.com/news/tnrecuxsc1-insilico-announces-nature-medicine-publi" },
      { title: "PR Newswire — Phase IIa 결과 발표", url: "https://www.prnewswire.com/news-releases/insilico-medicine-announces-nature-medicine-publication-of-phase-iia-results-evaluating-rentosertib-the-novel-tnik-inhibitor-for-idiopathic-pulmonary-fibrosis-ipf-discovered-and-designed-with-a-pioneering-ai-approach-302472070.html" },
    ],
  },

  // ─────────────── 전사 생산성 플랫폼 ───────────────
  {
    id: "moderna-mchat-doseid",
    sectorId: "enterprise-platform",
    company: "Moderna",
    product: "mChat · 750 GPTs · Dose ID",
    emoji: "💉",
    tagline: "임직원이 직접 만드는 750개 맞춤 GPT — 그중 하나가 백신 용량 검증",
    tags: ["AI", "Agent"],
    headline: { value: "750 GPTs", label: "약 2개월 만에 사내 구축" },
    challenge:
      "AI 역량을 소수 데이터팀에 가두지 않고, 법무·연구·제조·상업 등 전 부서가 자기 업무에 맞는 도구를 스스로 만들어 쓰게 하려면 어떤 플랫폼과 거버넌스가 필요한가.",
    architecture: [
      {
        name: "기반 — ChatGPT Enterprise + OpenAI API",
        detail:
          "OpenAI API 위에 자체 인스턴스 mChat을 구축. mChat·Copilot·ChatGPT Enterprise 사용성 비교 테스트 후 ChatGPT Enterprise 채택.",
      },
      {
        name: "셀프서비스 GPT 빌더",
        detail:
          "부서별 사용자가 코드 없이 맞춤 GPT를 제작. 법무·연구·제조·상업 등에서 750개 이상을 약 2개월 만에 생성.",
      },
      {
        name: "유스케이스 — Dose ID GPT",
        detail:
          "고급 데이터 분석 기능으로 임상팀이 선택한 최적 백신 용량을 표준 기준에 따라 검증. 근거·출처를 제시하고 핵심 결과 차트를 생성해, 사람이 주도하는 리뷰를 보조.",
      },
      {
        name: "거버넌스 — 데이터 미학습 계약",
        detail:
          "ChatGPT Enterprise가 고객 데이터로 기반 모델을 학습하지 않으므로, 독점 연구·계약·제조 데이터를 외부 학습셋에서 배제한 채 자율 제작을 허용.",
      },
    ],
    stack: ["ChatGPT Enterprise", "OpenAI API", "custom GPTs", "advanced data analysis"],
    results: [
      "법무·연구·제조·상업 등에서 750개 이상 GPT를 약 2개월 만에 구축",
      "사용자 1인당 주평균 약 120건의 ChatGPT Enterprise 대화",
      "법무팀 100% 채택",
      "Dose ID GPT로 백신 용량 선택 검증을 자동화하되 최종 판단은 사람이 주도",
    ],
    fdeTakeaways: [
      "확산의 핵심은 '현장 사용자가 직접 도구를 만드는' 셀프서비스 구조",
      "고위험 도메인(용량 결정)은 AI가 검증·근거 제시를 보조하고 사람이 결정하는 경계 설정",
      "'데이터 미학습' 같은 계약 조건이 엔터프라이즈 거버넌스의 전제",
    ],
    sources: [
      { title: "OpenAI — Moderna 사례", url: "https://openai.com/index/moderna/" },
      { title: "Constellation Research — Moderna 750 GPTs", url: "https://www.constellationr.com/insights/news/moderna-uses-openais-chatgpt-enterprise-scale-750-gpts" },
    ],
  },

  // ─────────────── 의사결정 인텔리전스 (에이전트) ───────────────
  {
    id: "sanofi-plai",
    sectorId: "decision-intelligence",
    company: "Sanofi",
    product: "plai (Aily Labs)",
    emoji: "📊",
    tagline: "10억+ 데이터 포인트를 통합한 에이전트형 의사결정 앱",
    tags: ["Agent", "AI"],
    headline: { value: "일 15,000명", label: "사용자 (경영진 95% 포함)" },
    challenge:
      "R&D 비용, 임상 등록 일정, 성공 확률 같은 가치 동인을 실시간으로 예측하고 'what-if' 시나리오로 거버넌스 의사결정을 지원하려면 방대한 사내 데이터를 통합해야 한다.",
    architecture: [
      {
        name: "데이터 통합 레이어",
        detail:
          "Sanofi 전반의 10억 개 이상 데이터 포인트를 집계.",
      },
      {
        name: "예측 모델 앙상블",
        detail:
          "300개 이상의 AI 모델로 가치 동인(R&D 비용·임상 등록 일정·성공 확률)을 예측. 발표 기준 최대 99% 예측 정확도.",
      },
      {
        name: "에이전트형 대화 인터페이스",
        detail:
          "실시간·개인화된 'what-if' 시나리오를 대화형으로 제공해 거버넌스 논의를 안내.",
      },
    ],
    stack: ["Aily Labs 플랫폼", "300+ AI 모델", "agentic app"],
    results: [
      "일간 15,000명 이상, 최고 경영진의 95%가 사용",
      "공급망에서 저재고 위험의 80%를 예측하고 근본 원인·조치를 제안",
      "R&D에서 일부 연구 프로세스를 수 주에서 수 시간으로 단축, 타깃 식별 20~30% 개선 (발표 기준)",
    ],
    fdeTakeaways: [
      "에이전트형 도구의 가치는 '사내 데이터 통합'이라는 배관 위에서만 나온다",
      "경영진 채택률(95%)은 확산 성공을 보여주는 강력한 선행지표",
      "예측 정확도 수치는 발표 주체의 값이므로, 도입 시 자체 베이스라인으로 재검증 필요",
    ],
    sources: [
      { title: "Sanofi — 포트폴리오 의사결정 매거진", url: "https://www.sanofi.com/en/magazine/ai-in-healthcare/ai-across-the-research-development-value-chain-portfolio-decision-making" },
      { title: "Aily Labs — Sanofi 사례 연구", url: "https://www.ailylabs.com/case-study/sanofi" },
    ],
  },

  // ─────────────── 마케팅 콘텐츠 (그라운딩) ───────────────
  {
    id: "pfizer-charlie",
    sectorId: "marketing",
    company: "Pfizer",
    product: "Charlie",
    emoji: "✍️",
    tagline: "승인·검증된 자사 콘텐츠에 그라운딩해 환각을 억제하는 마케팅 생성 플랫폼",
    tags: ["AI", "RAG"],
    headline: { value: "전사 수천 명", label: "중앙 마케팅 + 브랜드 사용" },
    challenge:
      "규제가 강한 제약 마케팅에서 콘텐츠 생성·편집·팩트체크·법무 리뷰를 가속하되, 환각이나 규정 위반을 피해야 한다.",
    architecture: [
      {
        name: "생성 엔진 — 맞춤 ChatGPT",
        detail:
          "광고 카피·소셜 포스트·의학 아티클 초안 등 마케팅 자료를 생성. Publicis Groupe의 Marcel 기술과 협업한 중앙 마케팅 허브.",
      },
      {
        name: "그라운딩 검증",
        detail:
          "환각을 막기 위해, 답변을 과거에 게시·검증된 Pfizer 콘텐츠(승인 콘텐츠)에 근거해 검증. 세분화 모델로 세그먼트별 메시징을 학습.",
      },
      {
        name: "리뷰 워크플로우 통합",
        detail:
          "콘텐츠 생성뿐 아니라 편집·팩트체크·법무(MLR) 리뷰까지 하나의 허브에서 처리.",
      },
    ],
    stack: ["custom ChatGPT", "Publicis Marcel", "승인 콘텐츠 그라운딩", "세분화 모델"],
    results: [
      "중앙 마케팅 수백 명 + 전사 수천 명, 그리고 Publicis·IPG 등 에이전시 파트너가 사용",
      "콘텐츠 생성·편집·팩트체크·법무 리뷰를 단일 허브로 통합",
      "승인 콘텐츠 그라운딩으로 규제 산업의 환각·규정 위반 리스크 완화",
    ],
    fdeTakeaways: [
      "규제 산업에서 생성 AI는 '무엇을 만드느냐'보다 '무엇에 근거하느냐(그라운딩)'가 핵심",
      "AI를 기존 리뷰(MLR·법무) 워크플로우 안에 넣어야 실제로 채택된다",
    ],
    sources: [
      { title: "Digiday — Pfizer의 생성 AI 플랫폼 Charlie", url: "https://digiday.com/marketing/with-charlie-pfizer-is-building-a-new-generative-ai-platform-for-pharma-marketing/" },
      { title: "PharmiWeb — Pfizer의 AI 마케팅 혁신", url: "https://www.pharmiweb.jobs/article/how-pfizer-is-revolutionising-pharma-marketing-with-ai" },
    ],
  },

  // ─────────────── 데이터 · MCP 인프라 ───────────────
  {
    id: "open-targets-mcp",
    sectorId: "data-infra",
    company: "Open Targets",
    product: "Platform MCP Server",
    emoji: "🔌",
    tagline: "타깃-질환 연관 데이터를 표준 MCP로 노출해 에이전트에 연결",
    tags: ["MCP", "Agent", "RAG"],
    headline: { value: "공식 MCP 서버", label: "GraphQL API를 도구로 노출" },
    challenge:
      "신약 발굴 연구는 유전체·약물·질환·문헌 등 흩어진 데이터 소스를 넘나든다. LLM 에이전트가 이 데이터에 '커스텀 통합 없이' 근거 있게 접근하려면 표준 연결 방식이 필요하다.",
    architecture: [
      {
        name: "데이터 소스 — Open Targets Platform",
        detail:
          "타깃-질환 연관, 약물, 변이, 연구 등 체계적 타깃 발굴 데이터를 담은 GraphQL API.",
      },
      {
        name: "MCP 서버 — 도구화",
        detail:
          "GraphQL API를 MCP 도구로 노출: 스키마 조회(get_schema), 쿼리 실행(query), 배치 쿼리(batch_query), 엔티티 검색(search_entities) 등. 스키마 사전 로딩으로 최적화.",
      },
      {
        name: "연결 — 호스티드 엔드포인트 + 로컬",
        detail:
          "호스티드 엔드포인트(mcp.platform.opentargets.org)에 직접 연결하거나 uvx·Docker로 로컬 서버 실행.",
      },
      {
        name: "활용 — 에이전트 워크플로우 / Claude Desktop",
        detail:
          "에이전트 워크플로우에 배선하거나 Claude Desktop에서 도구를 켜, 질문을 'Open Targets 데이터에만 근거해' 답하도록 격리.",
      },
    ],
    stack: ["Model Context Protocol (MCP)", "GraphQL", "hosted endpoint", "uvx / Docker"],
    results: [
      "Open Targets Platform 데이터를 AI 도구·에이전트가 표준 방식으로 사용 가능하게 공식 공개",
      "get_schema·query·batch_query·search_entities 등 도구 제공, 커뮤니티 구현은 49개 GraphQL 오퍼레이션 래핑",
      "Monarch·MyGene 등 다른 MCP 서버와 결합한 생의학 에이전트 PoC 등장",
    ],
    fdeTakeaways: [
      "MCP는 데이터 소스를 '한 번 도구화'하면 여러 에이전트가 재사용하는 표준 커넥터 — 커스텀 통합 비용을 줄인다",
      "'특정 데이터에만 근거해 답하라'는 도구 격리가 근거 있는(grounded) 응답의 핵심 설계",
      "공개 데이터 MCP + 사내 데이터 MCP를 결합하면 하이브리드 지식 에이전트를 만들 수 있다",
    ],
    sources: [
      { title: "Open Targets — 공식 MCP 서버 소개", url: "https://blog.opentargets.org/official-open-targets-mcp/" },
      { title: "GitHub — opentargets/open-targets-platform-mcp", url: "https://github.com/opentargets/open-targets-platform-mcp" },
    ],
  },
];

// 편의 조회 헬퍼
export const getCaseStudy = (id: string) =>
  CASE_STUDIES.find((c) => c.id === id);

export const getCasesBySector = (sectorId: string) =>
  CASE_STUDIES.filter((c) => c.sectorId === sectorId);
