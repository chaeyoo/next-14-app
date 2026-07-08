import type { Category, Lesson } from "../_types";

// 카테고리 정의 (선언적 상수 매핑)
export const CATEGORIES: Category[] = [
  {
    id: "core",
    title: "핵심 개념",
    description: "생성형 AI 서비스를 지탱하는 5가지 뼈대 개념",
    gradient: "from-violet-500 to-fuchsia-500",
    accent: "text-violet-400",
  },
  {
    id: "frameworks",
    title: "프레임워크 · 도구",
    description: "실제 서비스를 구현할 때 손에 쥐는 라이브러리들",
    gradient: "from-sky-500 to-cyan-400",
    accent: "text-sky-400",
  },
  {
    id: "practice",
    title: "실무 · 방법론",
    description: "AI를 업무에 이식하는 사람 — FDE의 일하는 방식",
    gradient: "from-amber-500 to-orange-500",
    accent: "text-amber-400",
  },
];

export const LESSONS: Lesson[] = [
  // ─────────────────────────── CORE ───────────────────────────
  {
    id: "rag",
    categoryId: "core",
    order: 1,
    title: "RAG 최적화",
    emoji: "📚",
    tagline: "모델이 모르는 지식을 '검색해서' 물려주는 기술",
    readMinutes: 5,
    sections: [
      {
        heading: "RAG란 무엇인가",
        body: "RAG(Retrieval-Augmented Generation, 검색 증강 생성)는 LLM이 답을 생성하기 전에, 외부 지식 저장소에서 관련 문서를 '검색(Retrieval)'해 프롬프트에 끼워 넣는 구조다. 모델의 파라미터를 재학습하지 않고도 최신·사내 데이터를 근거로 답하게 만든다.",
        bullets: [
          "모델 가중치는 그대로 두고, 참고 자료만 실시간으로 바꿔 끼운다",
          "환각(hallucination)을 줄이고 출처를 제시할 수 있다",
          "파인튜닝보다 저렴하고, 지식이 바뀌면 문서만 갱신하면 된다",
        ],
      },
      {
        heading: "동작 파이프라인",
        body: "일반적인 RAG는 다음 단계로 흐른다: ① 문서를 청크(chunk) 단위로 쪼갠다 → ② 임베딩 모델로 벡터화한다 → ③ 벡터 DB에 저장한다 → ④ 질문이 오면 질문도 벡터화해 유사한 청크를 검색한다 → ⑤ 검색된 청크를 컨텍스트로 넣어 LLM이 답을 생성한다.",
        bullets: [
          "Chunking: 문서를 의미 단위로 분할 (너무 크면 노이즈, 너무 작으면 맥락 손실)",
          "Embedding: 텍스트를 의미 벡터로 변환",
          "Vector DB: 코사인 유사도 등으로 최근접 이웃 검색",
        ],
      },
      {
        heading: "'최적화'가 필요한 이유",
        body: "단순 RAG는 엉뚱한 문서를 물어오거나, 정작 필요한 문서를 놓치기 쉽다. RAG 최적화란 검색 품질과 답변 정확도를 끌어올리는 모든 튜닝을 말한다.",
        bullets: [
          "청크 전략: 크기·오버랩·문서 구조 반영",
          "하이브리드 검색: 키워드(BM25) + 벡터 검색 결합",
          "Re-ranking: 1차 검색 결과를 다시 정렬해 상위 문서 품질 향상",
          "쿼리 재작성(Query Rewriting): 사용자 질문을 검색에 유리하게 변형",
          "메타데이터 필터링: 부서·날짜·권한 등으로 검색 범위 축소",
        ],
      },
    ],
    keyTakeaways: [
      "RAG = 검색으로 찾아온 문서를 근거로 LLM이 답을 생성하는 구조",
      "재학습 없이 최신·사내 지식을 주입하고 환각을 줄인다",
      "최적화 핵심: 청킹, 하이브리드 검색, 리랭킹, 쿼리 재작성",
    ],
    quiz: [
      {
        id: "rag-q1",
        question: "RAG의 핵심 아이디어를 가장 잘 설명한 것은?",
        options: [
          "모델 가중치를 재학습해 새 지식을 주입한다",
          "답변 생성 전에 외부 문서를 검색해 프롬프트에 근거로 넣는다",
          "모델의 출력 토큰 수를 제한해 비용을 줄인다",
          "여러 모델의 답을 투표로 합친다",
        ],
        answerIndex: 1,
        explanation:
          "RAG는 재학습 없이 검색(Retrieval)으로 관련 문서를 찾아 컨텍스트로 주입한 뒤 생성(Generation)한다.",
      },
      {
        id: "rag-q2",
        question: "다음 중 'RAG 최적화' 기법이 아닌 것은?",
        options: [
          "하이브리드 검색(키워드 + 벡터)",
          "Re-ranking으로 검색 결과 재정렬",
          "청크 크기와 오버랩 튜닝",
          "GPU 개수를 늘려 학습 속도를 높이기",
        ],
        answerIndex: 3,
        explanation:
          "GPU 증설은 학습 인프라 이야기지 RAG 검색 품질 최적화와 직접 관련이 없다.",
      },
      {
        id: "rag-q3",
        question: "벡터 DB가 RAG에서 하는 역할은?",
        options: [
          "LLM의 파라미터를 저장한다",
          "임베딩된 문서를 저장하고 유사도로 검색한다",
          "사용자 세션을 캐싱한다",
          "프롬프트 템플릿을 렌더링한다",
        ],
        answerIndex: 1,
        explanation:
          "벡터 DB는 임베딩(의미 벡터)을 저장하고, 질문 벡터와 가까운 청크를 최근접 이웃 검색으로 찾아준다.",
      },
    ],
  },
  {
    id: "function-calling",
    categoryId: "core",
    order: 2,
    title: "Function Calling",
    emoji: "🔧",
    tagline: "LLM이 '함수를 호출하겠다'는 구조화된 요청을 만들어내는 능력",
    readMinutes: 4,
    sections: [
      {
        heading: "Function Calling이란",
        body: "Function Calling(도구 호출/Tool Use)은 LLM에게 사용 가능한 함수 목록과 그 스키마(이름·파라미터)를 알려주면, 모델이 '이 함수를 이런 인자로 호출해줘'라는 구조화된 JSON을 반환하는 기능이다. 모델이 직접 코드를 실행하는 게 아니라, 호출 '요청'을 만들어내고 실제 실행은 애플리케이션이 한다.",
        bullets: [
          "모델은 자연어를 → 구조화된 함수 호출로 변환한다",
          "실행은 개발자 코드가 담당하고, 결과를 다시 모델에 돌려준다",
          "날씨 조회, DB 질의, 계산 등 '모델 밖 세계'와 연결하는 다리",
        ],
      },
      {
        heading: "동작 흐름",
        body: "① 개발자가 함수 스키마를 모델에 전달 → ② 모델이 필요하다고 판단하면 tool_use 블록으로 함수명과 인자를 반환 → ③ 앱이 실제 함수를 실행 → ④ 실행 결과를 tool_result 로 모델에 재전달 → ⑤ 모델이 결과를 반영해 최종 답변을 생성.",
        code: `// 스키마 예시 (Anthropic 스타일)
{
  "name": "get_weather",
  "description": "특정 도시의 현재 날씨를 조회",
  "input_schema": {
    "type": "object",
    "properties": {
      "city": { "type": "string" }
    },
    "required": ["city"]
  }
}`,
      },
      {
        heading: "왜 중요한가",
        body: "Function Calling은 Agentic Workflow와 MCP의 토대다. 모델이 '판단'하고 도구가 '행동'하는 분업 구조를 만들며, 신뢰할 수 있는 구조화 출력(스키마 검증)을 보장한다. PydanticAI 같은 도구는 이 스키마 검증을 타입 안전하게 감싸준다.",
      },
    ],
    keyTakeaways: [
      "모델은 함수를 '실행'하지 않고 '호출 요청(JSON)'을 만든다 — 실행은 앱의 몫",
      "자연어 → 구조화된 도구 호출로 변환하는 것이 핵심",
      "Agentic Workflow · MCP · 구조화 출력의 기반 기술",
    ],
    quiz: [
      {
        id: "fc-q1",
        question: "Function Calling에서 실제 함수를 '실행'하는 주체는?",
        options: [
          "LLM 모델 자체가 코드를 실행한다",
          "애플리케이션(개발자 코드)이 실행하고 결과를 모델에 돌려준다",
          "벡터 DB가 실행한다",
          "브라우저가 자동 실행한다",
        ],
        answerIndex: 1,
        explanation:
          "모델은 '어떤 함수를 어떤 인자로 부를지' JSON을 만들 뿐, 실행과 결과 반환은 앱이 담당한다.",
      },
      {
        id: "fc-q2",
        question: "Function Calling의 결과를 모델에 되돌려주는 이유는?",
        options: [
          "모델을 재학습시키기 위해",
          "실행 결과를 반영해 최종 답변을 생성하게 하려고",
          "벡터 임베딩을 갱신하려고",
          "토큰 비용을 0으로 만들려고",
        ],
        answerIndex: 1,
        explanation:
          "tool_result 로 실행 결과를 돌려주면 모델이 그 값을 근거로 다음 판단·최종 답변을 만든다.",
      },
      {
        id: "fc-q3",
        question: "Function Calling이 기반 기술로 쓰이는 개념은?",
        options: [
          "이미지 압축",
          "Agentic Workflow와 MCP",
          "CSS 애니메이션",
          "데이터베이스 인덱싱만",
        ],
        answerIndex: 1,
        explanation:
          "에이전트가 도구를 쓰고, MCP로 외부 도구를 연결하는 모든 흐름의 밑바탕이 Function Calling이다.",
      },
    ],
  },
  {
    id: "agentic-workflow",
    categoryId: "core",
    order: 3,
    title: "Agentic Workflow",
    emoji: "🤖",
    tagline: "LLM이 스스로 계획하고, 도구를 쓰고, 반복하며 목표를 달성하는 흐름",
    readMinutes: 5,
    sections: [
      {
        heading: "Workflow vs Agent",
        body: "단순 '워크플로우'는 개발자가 미리 정해둔 고정된 경로로 LLM과 도구를 호출한다. 반면 '에이전트(Agentic)'는 모델이 스스로 다음에 무엇을 할지 판단하고, 도구 사용과 반복 횟수를 동적으로 결정한다. Agentic Workflow는 이 둘을 아우르는, LLM이 주도권을 갖고 다단계로 문제를 푸는 구조를 말한다.",
        bullets: [
          "고정 워크플로우: 예측 가능·저비용, 정해진 파이프라인",
          "에이전트: 유연·자율적, 열린 문제에 강함 (대신 비용·불확실성↑)",
        ],
      },
      {
        heading: "핵심 루프: 계획 → 행동 → 관찰",
        body: "대부분의 에이전트는 관찰(Observe) → 사고(Think) → 행동(Act) 루프를 돈다. 모델이 상황을 보고, 다음 행동(도구 호출)을 결정하고, 결과를 관찰한 뒤 목표에 도달할 때까지 반복한다. 이를 위해 Function Calling으로 도구를 쓰고, 중간 결과를 메모리/컨텍스트에 유지한다.",
        bullets: [
          "Planning: 목표를 하위 단계로 분해",
          "Tool Use: 각 단계에서 필요한 도구 호출",
          "Reflection: 결과를 스스로 평가하고 경로 수정",
          "Termination: 목표 달성 또는 종료 조건 판단",
        ],
      },
      {
        heading: "대표 패턴",
        body: "Anthropic이 정리한 대표 패턴으로 프롬프트 체이닝, 라우팅, 병렬화(parallelization), 오케스트레이터-워커, 평가자-최적화(evaluator-optimizer) 등이 있다. '가장 단순한 구조로 시작하고, 필요할 때만 복잡도를 더하라'가 핵심 원칙이다.",
        bullets: [
          "Orchestrator-Worker: 오케스트레이터가 작업을 쪼개 워커(서브에이전트)에 분배",
          "Evaluator-Optimizer: 한 모델이 만들고 다른 모델이 평가·피드백",
          "Routing: 입력을 분류해 알맞은 처리 경로로 보냄",
        ],
      },
    ],
    keyTakeaways: [
      "Agentic = 모델이 스스로 계획·도구 사용·반복을 결정하는 자율적 흐름",
      "관찰 → 사고 → 행동 루프를 목표 달성까지 반복",
      "필요할 때만 복잡도를 더하고, 단순한 워크플로우로 시작하라",
    ],
    quiz: [
      {
        id: "aw-q1",
        question: "고정 워크플로우와 에이전트의 가장 큰 차이는?",
        options: [
          "에이전트는 GPU를 쓰지 않는다",
          "에이전트는 모델이 스스로 다음 행동과 반복을 동적으로 결정한다",
          "워크플로우는 항상 더 비싸다",
          "에이전트는 프롬프트가 필요 없다",
        ],
        answerIndex: 1,
        explanation:
          "고정 워크플로우는 정해진 경로를 따르고, 에이전트는 모델이 자율적으로 경로·도구·반복을 결정한다.",
      },
      {
        id: "aw-q2",
        question: "에이전트의 핵심 루프로 가장 알맞은 것은?",
        options: [
          "컴파일 → 링크 → 실행",
          "관찰 → 사고 → 행동의 반복",
          "학습 → 검증 → 배포",
          "요청 → 응답 → 종료(1회)",
        ],
        answerIndex: 1,
        explanation:
          "에이전트는 상황을 관찰하고, 다음 행동을 사고·결정하고, 도구로 행동한 뒤 목표까지 반복한다.",
      },
      {
        id: "aw-q3",
        question: "Anthropic이 강조하는 에이전트 설계 원칙은?",
        options: [
          "항상 최대한 많은 도구를 붙여라",
          "가장 단순한 구조로 시작하고 필요할 때만 복잡도를 더하라",
          "반드시 서브에이전트를 5개 이상 써라",
          "RAG 없이 설계하라",
        ],
        answerIndex: 1,
        explanation:
          "불필요한 자율성·복잡도는 비용과 불확실성을 키운다. 단순하게 시작해 필요할 때만 확장한다.",
      },
    ],
  },
  {
    id: "subagent",
    categoryId: "core",
    order: 4,
    title: "Subagent",
    emoji: "🧩",
    tagline: "큰 문제를 나눠 맡기는 '전문 하위 에이전트'",
    readMinutes: 4,
    sections: [
      {
        heading: "Subagent란",
        body: "서브에이전트는 메인(오케스트레이터) 에이전트가 특정 하위 작업을 위임하는 별도의 에이전트다. 각자 자신만의 컨텍스트 창, 도구 세트, 시스템 프롬프트(역할)를 갖는다. 코드 리뷰, 검색, 테스트 작성처럼 전문화된 일을 병렬로 처리한다.",
        bullets: [
          "역할 분리: 각 서브에이전트는 하나의 책임에 집중",
          "컨텍스트 격리: 메인 대화가 세부 탐색으로 오염되지 않음",
          "병렬화: 독립적인 작업을 동시에 수행해 속도↑",
        ],
      },
      {
        heading: "왜 나누는가",
        body: "단일 에이전트에 모든 걸 맡기면 컨텍스트가 길어져 성능이 떨어지고, 서로 다른 관심사가 뒤섞인다. 서브에이전트는 각자 깨끗한 컨텍스트에서 자기 일만 하고, 결과(결론)만 메인에 돌려준다. 메인은 파일 덤프가 아니라 요약된 결론을 받는다.",
        bullets: [
          "Context 절약: 세부 작업 로그는 서브에이전트 안에 남고 결론만 전달",
          "전문화: 리뷰 전용, 탐색 전용 등 프롬프트/도구를 목적에 맞게 구성",
        ],
      },
      {
        heading: "오케스트레이터-워커 패턴",
        body: "메인 에이전트(오케스트레이터)가 작업을 쪼개 여러 서브에이전트(워커)에게 분배하고, 결과를 취합·종합한다. Claude Code의 Agent/Task 도구, Anthropic의 멀티 에이전트 리서치 시스템이 대표 사례다.",
      },
    ],
    keyTakeaways: [
      "서브에이전트 = 전용 컨텍스트·도구·역할을 가진 하위 에이전트",
      "컨텍스트 격리와 병렬화로 큰 문제를 효율적으로 분해",
      "오케스트레이터가 분배하고 워커가 결론만 돌려준다",
    ],
    quiz: [
      {
        id: "sa-q1",
        question: "서브에이전트를 쓰는 핵심 이점이 아닌 것은?",
        options: [
          "컨텍스트 격리로 메인 대화 오염 방지",
          "독립 작업의 병렬 처리",
          "역할별 전문화",
          "모델 파라미터를 자동으로 재학습",
        ],
        answerIndex: 3,
        explanation:
          "서브에이전트는 재학습과 무관하다. 컨텍스트 격리·병렬화·전문화가 핵심 이점이다.",
      },
      {
        id: "sa-q2",
        question: "오케스트레이터-워커 패턴에서 메인 에이전트가 받는 것은?",
        options: [
          "각 워커의 전체 작업 로그 원본",
          "워커가 요약한 결론(결과)",
          "워커의 GPU 사용량",
          "아무것도 받지 않는다",
        ],
        answerIndex: 1,
        explanation:
          "워커는 세부 작업을 자기 컨텍스트에서 처리하고, 요약된 결론만 오케스트레이터에 돌려준다.",
      },
      {
        id: "sa-q3",
        question: "단일 에이전트에 모든 작업을 몰아줄 때 생기는 문제는?",
        options: [
          "컨텍스트가 길어져 성능·집중도가 떨어진다",
          "네트워크 대역폭이 항상 부족해진다",
          "함수 호출이 불가능해진다",
          "임베딩이 사라진다",
        ],
        answerIndex: 0,
        explanation:
          "관심사가 뒤섞이고 컨텍스트가 비대해지면 성능이 저하된다. 그래서 서브에이전트로 분할한다.",
      },
    ],
  },
  {
    id: "mcp",
    categoryId: "core",
    order: 5,
    title: "MCP (Model Context Protocol)",
    emoji: "🔌",
    tagline: "AI와 외부 도구·데이터를 잇는 'USB-C' 같은 표준 프로토콜",
    readMinutes: 5,
    sections: [
      {
        heading: "MCP란",
        body: "MCP(Model Context Protocol)는 Anthropic이 공개한 오픈 표준으로, LLM 애플리케이션이 외부 데이터·도구에 연결되는 방식을 표준화한다. 흔히 'AI를 위한 USB-C'에 비유된다. 각 서비스마다 커스텀 연동을 짜는 대신, MCP라는 공통 규격에 맞추면 어떤 클라이언트든 붙을 수 있다.",
        bullets: [
          "N×M 통합 문제(모델마다·도구마다 커스텀 연동)를 하나의 표준으로 축소",
          "Function Calling을 프로세스 밖 서버로 표준화·확장한 것",
        ],
      },
      {
        heading: "구성 요소",
        body: "MCP는 클라이언트-서버 구조다. 호스트(예: Claude Desktop, IDE) 안의 MCP 클라이언트가, 도구·데이터를 제공하는 MCP 서버에 연결한다. 서버는 세 가지를 노출한다.",
        bullets: [
          "Tools: 모델이 호출할 수 있는 함수(행동)",
          "Resources: 모델이 읽을 수 있는 데이터(파일·DB 레코드 등)",
          "Prompts: 재사용 가능한 프롬프트 템플릿",
        ],
      },
      {
        heading: "왜 중요한가",
        body: "MCP 서버 하나를 만들면 Claude, IDE, 여러 에이전트가 모두 재사용할 수 있다. 사내 시스템(예: 사내 위키, 티켓 시스템)을 MCP 서버로 감싸두면, 어떤 AI 도구든 표준 방식으로 연결해 생산성을 높일 수 있다. FastMCP는 이 서버를 파이썬으로 쉽게 만들도록 돕는다.",
      },
    ],
    keyTakeaways: [
      "MCP = AI와 외부 도구/데이터를 잇는 오픈 표준 프로토콜 ('AI의 USB-C')",
      "클라이언트-서버 구조, 서버는 Tools·Resources·Prompts를 노출",
      "한 번 만든 MCP 서버를 여러 AI 클라이언트가 재사용",
    ],
    quiz: [
      {
        id: "mcp-q1",
        question: "MCP를 가장 잘 비유한 표현은?",
        options: [
          "AI를 위한 USB-C 같은 표준 연결 규격",
          "새로운 딥러닝 모델 아키텍처",
          "벡터 DB의 한 종류",
          "GPU 스케줄러",
        ],
        answerIndex: 0,
        explanation:
          "MCP는 AI와 외부 도구·데이터를 잇는 표준 프로토콜로 'AI의 USB-C'에 흔히 비유된다.",
      },
      {
        id: "mcp-q2",
        question: "MCP 서버가 노출하는 세 가지 주요 요소는?",
        options: [
          "GPU, CPU, RAM",
          "Tools, Resources, Prompts",
          "Model, Optimizer, Loss",
          "HTML, CSS, JS",
        ],
        answerIndex: 1,
        explanation:
          "MCP 서버는 호출 가능한 Tools, 읽을 수 있는 Resources, 재사용 Prompts를 클라이언트에 제공한다.",
      },
      {
        id: "mcp-q3",
        question: "MCP가 해결하려는 근본 문제는?",
        options: [
          "모델 학습 속도가 느린 문제",
          "모델·도구마다 커스텀 연동을 짜야 하는 N×M 통합 문제",
          "이미지 렌더링 속도",
          "토큰 임베딩 차원 축소",
        ],
        answerIndex: 1,
        explanation:
          "각 모델·도구 조합마다 별도 연동을 만드는 부담을, 하나의 공통 표준으로 줄이는 것이 MCP의 목적이다.",
      },
    ],
  },

  // ─────────────────────── FRAMEWORKS ───────────────────────
  {
    id: "fastapi",
    categoryId: "frameworks",
    order: 6,
    title: "FastAPI",
    emoji: "⚡",
    tagline: "타입 힌트 기반의 빠른 파이썬 웹 API 프레임워크",
    readMinutes: 4,
    sections: [
      {
        heading: "FastAPI란",
        body: "FastAPI는 파이썬 타입 힌트를 기반으로 API를 만드는 현대적 웹 프레임워크다. Pydantic으로 요청/응답을 검증하고, Starlette 위에서 비동기(async)로 동작해 성능이 뛰어나다. AI 서비스의 백엔드(모델 서빙, RAG API, 에이전트 엔드포인트)로 널리 쓰인다.",
        bullets: [
          "타입 힌트 → 자동 검증 + 자동 문서화(Swagger/OpenAPI)",
          "async/await 기반 고성능 — LLM 스트리밍·동시 요청에 적합",
          "Pydantic 모델로 요청/응답 스키마를 선언적으로 정의",
        ],
      },
      {
        heading: "왜 AI 백엔드에 잘 맞나",
        body: "LLM 호출은 대기 시간이 길고 동시 요청이 많다. FastAPI의 비동기 처리는 이런 I/O 바운드 작업에 최적이다. 또한 SSE/스트리밍 응답을 지원해 토큰을 실시간으로 흘려보낼 수 있고, Pydantic 검증으로 도구 입력을 안전하게 다룬다.",
        code: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(req: ChatRequest):
    # LLM 호출 (비동기)
    return {"reply": f"echo: {req.message}"}`,
      },
    ],
    keyTakeaways: [
      "FastAPI = 타입 힌트 + Pydantic 검증 + async 고성능 파이썬 API 프레임워크",
      "자동 OpenAPI 문서화가 기본 제공",
      "LLM 스트리밍·동시 요청 등 I/O 바운드 AI 백엔드에 적합",
    ],
    quiz: [
      {
        id: "fa-q1",
        question: "FastAPI가 요청/응답 검증에 사용하는 라이브러리는?",
        options: ["NumPy", "Pydantic", "Pandas", "SQLAlchemy"],
        answerIndex: 1,
        explanation:
          "FastAPI는 Pydantic 모델과 타입 힌트로 요청/응답을 선언적으로 검증한다.",
      },
      {
        id: "fa-q2",
        question: "FastAPI가 LLM 백엔드에 적합한 이유로 알맞은 것은?",
        options: [
          "GPU를 직접 제어하기 때문",
          "async 비동기 처리로 I/O 바운드·스트리밍에 강하기 때문",
          "자바스크립트로 작성되기 때문",
          "모델을 자동 학습하기 때문",
        ],
        answerIndex: 1,
        explanation:
          "LLM 호출은 대기 시간이 긴 I/O 작업이라, 비동기 처리를 지원하는 FastAPI가 잘 맞는다.",
      },
      {
        id: "fa-q3",
        question: "FastAPI가 기본 제공하는 것은?",
        options: [
          "자동 OpenAPI/Swagger 문서",
          "벡터 검색 엔진",
          "GPU 클러스터 관리",
          "프런트엔드 렌더링",
        ],
        answerIndex: 0,
        explanation:
          "타입 힌트를 바탕으로 Swagger UI와 OpenAPI 스펙을 자동 생성한다.",
      },
    ],
  },
  {
    id: "fastmcp",
    categoryId: "frameworks",
    order: 7,
    title: "FastMCP",
    emoji: "🚀",
    tagline: "MCP 서버를 몇 줄로 만드는 파이썬 프레임워크",
    readMinutes: 4,
    sections: [
      {
        heading: "FastMCP란",
        body: "FastMCP는 MCP 서버(및 클라이언트)를 파이썬으로 빠르게 만들도록 돕는 프레임워크다. 데코레이터로 함수를 감싸면 그 함수가 MCP Tool이 된다. 이름처럼 FastAPI에서 영감을 받은 '파이써닉한' 개발 경험을 제공하며, MCP 공식 파이썬 SDK에도 핵심이 반영되어 있다.",
        bullets: [
          "@mcp.tool 데코레이터로 함수 → MCP 도구로 노출",
          "타입 힌트에서 입력 스키마를 자동 생성",
          "Resources·Prompts도 데코레이터로 간단히 정의",
        ],
      },
      {
        heading: "코드로 보기",
        body: "아래처럼 함수에 데코레이터만 붙이면 MCP 서버가 된다. Claude Desktop이나 IDE 같은 MCP 클라이언트가 이 서버에 붙어 add 도구를 호출할 수 있다.",
        code: `from fastmcp import FastMCP

mcp = FastMCP("Demo")

@mcp.tool
def add(a: int, b: int) -> int:
    """두 수를 더한다"""
    return a + b

if __name__ == "__main__":
    mcp.run()`,
      },
      {
        heading: "MCP와의 관계",
        body: "MCP가 '표준 규격'이라면, FastMCP는 그 규격을 따르는 서버를 쉽게 '구현'하는 도구다. FastAPI가 웹 표준(HTTP) 위에서 API를 쉽게 만들듯, FastMCP는 MCP 표준 위에서 도구 서버를 쉽게 만든다.",
      },
    ],
    keyTakeaways: [
      "FastMCP = MCP 서버/클라이언트를 파이썬으로 빠르게 만드는 프레임워크",
      "@mcp.tool 데코레이터 + 타입 힌트로 도구를 선언",
      "MCP는 표준, FastMCP는 그 표준을 구현하는 개발 도구",
    ],
    quiz: [
      {
        id: "fmcp-q1",
        question: "FastMCP의 주된 목적은?",
        options: [
          "벡터 임베딩을 학습시키는 것",
          "MCP 서버를 파이썬으로 쉽게 구현하는 것",
          "프런트엔드 UI를 그리는 것",
          "GPU 스케줄링",
        ],
        answerIndex: 1,
        explanation:
          "FastMCP는 데코레이터 기반으로 MCP 서버(도구·리소스·프롬프트)를 손쉽게 구현하게 해준다.",
      },
      {
        id: "fmcp-q2",
        question: "FastMCP에서 함수를 MCP 도구로 노출하는 방법은?",
        options: [
          "@mcp.tool 데코레이터를 붙인다",
          "함수 이름을 tool_ 로 시작한다",
          "별도 YAML을 손으로 작성한다",
          "GPU에 등록한다",
        ],
        answerIndex: 0,
        explanation:
          "함수 위에 @mcp.tool 데코레이터를 붙이면 타입 힌트로부터 스키마가 생성되며 도구로 노출된다.",
      },
      {
        id: "fmcp-q3",
        question: "MCP와 FastMCP의 관계를 옳게 설명한 것은?",
        options: [
          "둘은 완전히 무관하다",
          "MCP는 표준 규격, FastMCP는 그 규격을 구현하는 프레임워크",
          "FastMCP가 MCP를 대체하는 새 표준이다",
          "MCP는 프런트엔드, FastMCP는 백엔드 언어다",
        ],
        answerIndex: 1,
        explanation:
          "MCP는 프로토콜 표준이고, FastMCP는 그 표준을 따르는 서버를 쉽게 만드는 구현 도구다.",
      },
    ],
  },
  {
    id: "pydantic-ai",
    categoryId: "frameworks",
    order: 8,
    title: "PydanticAI",
    emoji: "🛡️",
    tagline: "타입 안전한 에이전트를 만드는 파이썬 에이전트 프레임워크",
    readMinutes: 4,
    sections: [
      {
        heading: "PydanticAI란",
        body: "PydanticAI는 Pydantic 팀이 만든 에이전트 프레임워크다. 'FastAPI 같은 개발 경험을 GenAI 앱에도'가 목표다. LLM의 출력을 Pydantic 모델로 검증해, 구조화되고 타입 안전한 결과를 보장한다. 여러 모델 제공자(Anthropic, OpenAI 등)를 공통 인터페이스로 다룬다.",
        bullets: [
          "출력 검증: LLM 결과를 Pydantic 모델로 타입 안전하게 파싱",
          "모델 무관: 여러 LLM 제공자를 통일된 방식으로 사용",
          "도구·의존성 주입: 타입이 붙은 도구와 컨텍스트 주입 지원",
        ],
      },
      {
        heading: "왜 타입 안전이 중요한가",
        body: "LLM 출력은 본질적으로 비결정적이다. 이를 그대로 쓰면 파싱 오류·필드 누락이 잦다. PydanticAI는 결과를 지정한 스키마에 맞춰 검증하고, 어긋나면 모델에 재시도를 요청한다. 덕분에 다운스트림 코드가 안심하고 타입을 신뢰할 수 있다.",
        code: `from pydantic import BaseModel
from pydantic_ai import Agent

class CityInfo(BaseModel):
    city: str
    country: str

agent = Agent("anthropic:claude-...", output_type=CityInfo)
result = agent.run_sync("서울은 어느 나라?")
print(result.output.country)  # 타입 안전`,
      },
    ],
    keyTakeaways: [
      "PydanticAI = 타입 안전한 출력 검증을 앞세운 파이썬 에이전트 프레임워크",
      "LLM 결과를 Pydantic 모델로 검증하고, 어긋나면 재시도",
      "여러 모델 제공자를 통일된 인터페이스로 사용",
    ],
    quiz: [
      {
        id: "pai-q1",
        question: "PydanticAI가 가장 강조하는 특징은?",
        options: [
          "타입 안전한 구조화 출력 검증",
          "가장 빠른 GPU 학습",
          "무료 벡터 DB 제공",
          "브라우저 자동화",
        ],
        answerIndex: 0,
        explanation:
          "PydanticAI는 LLM 출력을 Pydantic 모델로 검증해 타입 안전성을 보장하는 데 초점을 둔다.",
      },
      {
        id: "pai-q2",
        question: "LLM 출력이 지정한 스키마에 맞지 않을 때 PydanticAI의 동작은?",
        options: [
          "그냥 문자열로 반환한다",
          "검증 실패를 근거로 모델에 재시도를 요청할 수 있다",
          "서버를 종료한다",
          "출력을 무시하고 빈 값을 준다",
        ],
        answerIndex: 1,
        explanation:
          "스키마 검증에 실패하면 모델에게 올바른 형식으로 다시 생성하도록 유도할 수 있다.",
      },
      {
        id: "pai-q3",
        question: "PydanticAI가 지향하는 개발 경험의 비유는?",
        options: [
          "'GenAI 앱을 위한 FastAPI 같은 경험'",
          "'AI를 위한 포토샵'",
          "'에이전트를 위한 엑셀'",
          "'모델을 위한 도커'",
        ],
        answerIndex: 0,
        explanation:
          "Pydantic 팀은 FastAPI가 준 생산적 개발 경험을 GenAI 앱 개발에도 가져오는 것을 목표로 한다.",
      },
    ],
  },
  {
    id: "langchain-langgraph",
    categoryId: "frameworks",
    order: 9,
    title: "LangChain & LangGraph",
    emoji: "🔗",
    tagline: "LLM 앱을 조립하는 체인, 그리고 상태를 가진 그래프 오케스트레이션",
    readMinutes: 5,
    sections: [
      {
        heading: "LangChain",
        body: "LangChain은 LLM 애플리케이션을 구성하는 컴포넌트(프롬프트, 모델, 리트리버, 도구, 메모리 등)를 표준 인터페이스로 묶어 '체인'으로 조립하게 해주는 프레임워크다. RAG 파이프라인, 도구 사용, 다양한 모델 교체를 일관된 방식으로 다룰 수 있다.",
        bullets: [
          "다양한 LLM·벡터 DB·도구를 공통 추상화로 연결",
          "RAG, 요약, 대화 메모리 등 흔한 패턴을 컴포넌트로 제공",
          "LCEL(LangChain Expression Language)로 체인을 선언적으로 구성",
        ],
      },
      {
        heading: "LangGraph",
        body: "LangGraph는 LangChain 생태계의 에이전트/오케스트레이션 프레임워크다. 워크플로우를 노드(작업)와 엣지(전이)로 이뤄진 그래프로 표현하고, 상태(state)를 공유하며 순환(loop)·분기·사람 개입(human-in-the-loop)을 명시적으로 다룬다. 복잡한 에이전트를 예측 가능하게 제어할 때 강력하다.",
        bullets: [
          "상태 그래프: 노드=단계, 엣지=전이, 공유 State",
          "순환/조건 분기: 에이전트 루프를 명시적으로 표현",
          "지속성·중단/재개·휴먼 인 더 루프 지원",
        ],
      },
      {
        heading: "언제 무엇을 쓰나",
        body: "선형적이거나 단순한 조립은 LangChain(체인)으로 충분하다. 반복·분기·다중 에이전트처럼 제어 흐름이 복잡하고 상태 관리가 중요한 경우 LangGraph로 그래프를 명시적으로 설계한다. 둘은 대체가 아니라 보완 관계다.",
      },
    ],
    keyTakeaways: [
      "LangChain = LLM 앱 컴포넌트를 표준 인터페이스로 조립하는 프레임워크",
      "LangGraph = 상태 그래프(노드·엣지)로 순환·분기·다중 에이전트를 제어",
      "단순 조립은 LangChain, 복잡한 상태·제어 흐름은 LangGraph",
    ],
    quiz: [
      {
        id: "lc-q1",
        question: "LangGraph가 워크플로우를 표현하는 방식은?",
        options: [
          "단일 함수 호출",
          "노드(작업)와 엣지(전이)로 이뤄진 상태 그래프",
          "SQL 테이블",
          "CSS 그리드",
        ],
        answerIndex: 1,
        explanation:
          "LangGraph는 상태를 공유하는 노드·엣지 그래프로 순환·분기를 명시적으로 표현한다.",
      },
      {
        id: "lc-q2",
        question: "LangChain의 주된 역할은?",
        options: [
          "GPU 드라이버 관리",
          "LLM·리트리버·도구 등 컴포넌트를 표준 인터페이스로 조립",
          "이미지 편집",
          "운영체제 커널",
        ],
        answerIndex: 1,
        explanation:
          "LangChain은 프롬프트·모델·리트리버·도구·메모리를 공통 추상화로 묶어 체인으로 조립한다.",
      },
      {
        id: "lc-q3",
        question: "복잡한 순환·분기·다중 에이전트 제어에 더 적합한 것은?",
        options: ["LangGraph", "단순 LangChain 체인", "Pydantic", "NumPy"],
        answerIndex: 0,
        explanation:
          "상태와 제어 흐름이 복잡할수록 그래프로 명시적 제어가 가능한 LangGraph가 적합하다.",
      },
    ],
  },

  // ─────────────────────── PRACTICE ───────────────────────
  {
    id: "llm-fundamentals",
    categoryId: "practice",
    order: 10,
    title: "Enterprise LLM API & ML/DL 기초",
    emoji: "🧠",
    tagline: "엔터프라이즈 LLM을 다루는 감각과, 그 아래 깔린 ML/DL 이론",
    readMinutes: 5,
    sections: [
      {
        heading: "Enterprise LLM API",
        body: "엔터프라이즈 LLM API는 기업 환경에서 요구되는 보안·규정·규모를 갖춘 상용 LLM 접근 방식이다. Claude, GPT 등을 클라우드(예: AWS Bedrock, Azure) 또는 전용 엔드포인트로 제공하며, 데이터 프라이버시·감사 로그·SLA·비용 관리가 핵심 관심사다.",
        bullets: [
          "토큰 기반 과금 — 입력/출력 토큰 수가 비용을 결정",
          "프롬프트 캐싱·배치 처리로 비용·지연 최적화",
          "데이터 거버넌스: 학습 미사용 보장, 접근 제어, 감사 로그",
          "레이트 리밋·SLA·리전 선택 등 운영 요소",
        ],
      },
      {
        heading: "ML/DL 이론 — 왜 알아야 하나",
        body: "LLM은 딥러닝(트랜스포머)의 산물이다. 토큰화, 임베딩, 어텐션, 확률적 생성(temperature/top-p), 학습 vs 추론의 차이를 이해하면 프롬프트·RAG·파인튜닝을 논리적으로 설계할 수 있다. '왜 이 모델이 이렇게 답하는가'를 이론으로 설명할 수 있어야 구조적 해결이 나온다.",
        bullets: [
          "토큰화·임베딩: 텍스트를 벡터로 표현하는 방식",
          "어텐션/트랜스포머: 문맥을 가중치로 반영하는 구조",
          "확률적 디코딩: temperature·top-p가 다양성·일관성을 조절",
          "학습(train) vs 추론(inference), 그리고 파인튜닝 vs RAG의 트레이드오프",
        ],
      },
      {
        heading: "설계 감각",
        body: "같은 문제라도 RAG로 풀지, 파인튜닝할지, 프롬프트만 손볼지는 데이터 양·변화 빈도·정확도 요구·비용에 따라 달라진다. 이론을 알면 이 선택을 '감'이 아니라 '논리'로 정당화할 수 있다.",
      },
    ],
    keyTakeaways: [
      "엔터프라이즈 LLM = 보안·거버넌스·비용·SLA가 핵심인 상용 LLM 운영",
      "비용은 토큰 기반 — 캐싱·배치로 최적화",
      "ML/DL 이론(토큰화·어텐션·확률적 생성)은 구조적 설계의 근거",
    ],
    quiz: [
      {
        id: "llm-q1",
        question: "엔터프라이즈 LLM API의 비용을 주로 결정하는 것은?",
        options: [
          "화면 해상도",
          "입력·출력 토큰 수",
          "마우스 클릭 횟수",
          "CSS 파일 크기",
        ],
        answerIndex: 1,
        explanation:
          "상용 LLM API는 대개 처리한 입력/출력 토큰 수를 기준으로 과금한다.",
      },
      {
        id: "llm-q2",
        question: "temperature·top-p 파라미터가 조절하는 것은?",
        options: [
          "GPU 온도",
          "생성 결과의 다양성/무작위성 정도",
          "네트워크 지연",
          "임베딩 차원 수",
        ],
        answerIndex: 1,
        explanation:
          "확률적 디코딩 파라미터로, 값이 클수록 다양하고 창의적이며 작을수록 일관·보수적이다.",
      },
      {
        id: "llm-q3",
        question: "지식이 자주 바뀌고 출처가 중요할 때, 파인튜닝보다 흔히 선호되는 접근은?",
        options: [
          "매번 모델을 재학습",
          "RAG(검색 증강 생성)",
          "temperature를 0으로 고정",
          "토큰을 늘리기만 하면 됨",
        ],
        answerIndex: 1,
        explanation:
          "자주 변하는 지식·출처 제시가 중요하면 문서만 갱신하면 되는 RAG가 파인튜닝보다 유리한 경우가 많다.",
      },
    ],
  },
  {
    id: "ai-dev-tools",
    categoryId: "practice",
    order: 11,
    title: "AI 기반 개발도구 (Claude Code · Cursor)",
    emoji: "🛠️",
    tagline: "코드를 '짜는' 도구에서 '위임하는' 도구로",
    readMinutes: 4,
    sections: [
      {
        heading: "무엇인가",
        body: "Claude Code, Cursor 같은 AI 개발도구는 코드베이스를 이해하고, 파일을 직접 읽고 수정하며, 명령을 실행하고, 테스트를 돌리는 에이전트형 도구다. 단순 자동완성을 넘어, 자연어 목표를 주면 다단계 작업을 스스로 수행한다.",
        bullets: [
          "Cursor: AI 기능이 내장된 에디터(IDE)",
          "Claude Code: 터미널·IDE·웹에서 동작하는 에이전트형 코딩 도구",
          "코드베이스 탐색 → 수정 → 실행 → 검증까지 위임 가능",
        ],
      },
      {
        heading: "잘 쓰는 법",
        body: "AI 도구는 컨텍스트를 얼마나 잘 주느냐가 성패를 가른다. 명확한 목표, 관련 파일·규칙(예: CLAUDE.md), 검증 방법을 함께 주면 품질이 크게 오른다. 결과를 항상 리뷰하고, 큰 작업은 서브에이전트/워크플로우로 분할한다.",
        bullets: [
          "프로젝트 규칙 파일(CLAUDE.md 등)로 컨벤션을 학습시킨다",
          "작업을 작게 쪼개고 결과를 검증(테스트/실행)한다",
          "반복·병렬 작업은 서브에이전트로 위임",
        ],
      },
      {
        heading: "생산성 관점",
        body: "이 도구들은 개발자를 '타이핑하는 사람'에서 '방향을 정하고 검증하는 사람'으로 바꾼다. FDE에게는 사내 프로세스에 AI를 이식하는 핵심 지렛대다.",
      },
    ],
    keyTakeaways: [
      "Claude Code·Cursor = 코드베이스를 이해하고 다단계 작업을 수행하는 에이전트형 도구",
      "성패는 컨텍스트 품질 — 목표·규칙·검증 방법을 함께 제공",
      "개발자의 역할을 '작성'에서 '방향 설정·검증'으로 이동",
    ],
    quiz: [
      {
        id: "dev-q1",
        question: "Claude Code·Cursor 같은 도구가 단순 자동완성과 다른 점은?",
        options: [
          "글자 색만 바꾼다",
          "코드베이스를 이해하고 다단계 작업(수정·실행·검증)을 수행한다",
          "인터넷 없이 학습한다",
          "오직 한 줄만 완성한다",
        ],
        answerIndex: 1,
        explanation:
          "에이전트형 도구는 파일 탐색·수정·명령 실행·테스트까지 다단계로 위임받아 수행한다.",
      },
      {
        id: "dev-q2",
        question: "AI 개발도구의 결과 품질을 좌우하는 가장 큰 요인은?",
        options: [
          "제공한 컨텍스트(목표·규칙·검증)의 품질",
          "모니터 크기",
          "키보드 종류",
          "폰트 크기",
        ],
        answerIndex: 0,
        explanation:
          "명확한 목표, 프로젝트 규칙, 검증 방법 등 컨텍스트를 잘 줄수록 결과 품질이 오른다.",
      },
      {
        id: "dev-q3",
        question: "큰 작업을 AI 도구로 처리할 때 권장되는 방식은?",
        options: [
          "한 번에 전부 몰아준다",
          "작게 쪼개고 결과를 검증하며, 필요 시 서브에이전트로 분할",
          "검증 없이 바로 배포",
          "규칙 파일을 지운다",
        ],
        answerIndex: 1,
        explanation:
          "작업을 분할하고 검증하며 서브에이전트로 병렬화하면 안정적으로 큰 작업을 처리할 수 있다.",
      },
    ],
  },
  {
    id: "fde",
    categoryId: "practice",
    order: 12,
    title: "FDE 정체성 (Forward Deployed Engineer)",
    emoji: "🎯",
    tagline: "고객·현장 한복판에서 '왜'를 던지고 구조로 해결하는 엔지니어",
    readMinutes: 5,
    sections: [
      {
        heading: "FDE란",
        body: "FDE(Forward Deployed Engineer)는 고객·현업 현장에 '전진 배치'되어, 실제 업무 문제를 직접 관찰하고 기술로 해결하는 엔지니어다. 제품을 만들기만 하는 게 아니라, 현장의 맥락을 이해하고 그 자리에서 프로토타입·통합·자동화를 만들어 가치를 증명한다.",
        bullets: [
          "고객/현업 곁에서 문제를 1차로 관찰",
          "빠르게 프로토타입 → 검증 → 이식",
          "제품팀과 현장 사이의 다리 역할",
        ],
      },
      {
        heading: "'왜'를 던지는 사고방식",
        body: "채용 공고의 핵심 문구 — '사용자 입장에서 왜를 던지고 구조적 해결을 설계'. FDE는 요구사항을 그대로 구현하지 않는다. 진짜 문제(Job To Be Done)를 파고들어, 표면 증상이 아니라 구조를 바꾼다. 이 관점이 AI를 업무에 이식할 때 특히 강력하다.",
        bullets: [
          "표면 요구가 아니라 근본 원인·목표를 먼저 묻는다",
          "일회성 해결이 아니라 재사용 가능한 구조를 설계",
          "비즈니스 워크플로우 분석 → 최적 프로세스 재설계",
        ],
      },
      {
        heading: "AI 시대의 FDE",
        body: "공고의 우대사항 '사내 업무 프로세스에 AI를 이식해 생산성을 개선해 본 실무 경험 ← FDE 정체성 그 자체'가 핵심이다. RAG·에이전트·MCP·Function Calling을 도구로 삼아, 제약/바이오/헬스케어 같은 도메인의 실제 워크플로우를 분석하고 AI로 재설계하는 사람이 바로 이 역할이다.",
        bullets: [
          "도메인 이해(예: 헬스케어) + AI 기술을 결합",
          "생산성을 '실제로' 개선한 경험이 곧 정체성",
          "기술·비즈니스·현장을 잇는 통역가이자 해결사",
        ],
      },
    ],
    keyTakeaways: [
      "FDE = 현장에 전진 배치되어 실제 문제를 기술로 해결하는 엔지니어",
      "요구사항을 그대로 짜지 않고 '왜'를 물어 구조적으로 해결",
      "AI를 사내 워크플로우에 이식해 생산성을 개선하는 것이 FDE 정체성",
    ],
    quiz: [
      {
        id: "fde-q1",
        question: "FDE(Forward Deployed Engineer)를 가장 잘 설명한 것은?",
        options: [
          "고객·현장에 전진 배치되어 실제 문제를 기술로 해결하는 엔지니어",
          "오직 사무실에서 문서만 작성하는 사람",
          "모델을 학습만 시키는 연구원",
          "고객을 만나지 않는 백엔드 전담자",
        ],
        answerIndex: 0,
        explanation:
          "FDE는 현장에 배치되어 실제 업무 맥락을 관찰하고 그 자리에서 해결책을 만들어 가치를 증명한다.",
      },
      {
        id: "fde-q2",
        question: "채용 공고가 강조하는 FDE의 사고방식은?",
        options: [
          "요구사항을 그대로 최대한 빨리 구현한다",
          "사용자 입장에서 '왜'를 던지고 구조적 해결을 설계한다",
          "항상 최신 모델만 쓴다",
          "문서를 절대 읽지 않는다",
        ],
        answerIndex: 1,
        explanation:
          "표면 요구가 아니라 근본 문제를 묻고, 재사용 가능한 구조로 해결하는 것이 FDE의 핵심 사고다.",
      },
      {
        id: "fde-q3",
        question: "공고에서 'FDE 정체성 그 자체'라고 표현한 경험은?",
        options: [
          "사내 업무 프로세스에 AI를 이식해 생산성을 개선한 실무 경험",
          "가장 많은 논문을 읽은 경험",
          "GPU를 가장 많이 써 본 경험",
          "가장 긴 코드를 짠 경험",
        ],
        answerIndex: 0,
        explanation:
          "공고는 'AI를 사내 프로세스에 이식해 생산성을 개선한 경험'을 FDE 정체성 그 자체로 규정한다.",
      },
    ],
  },
];

// 편의 조회 헬퍼
export const getLesson = (id: string) => LESSONS.find((l) => l.id === id);

export const getLessonsByCategory = (categoryId: string) =>
  LESSONS.filter((l) => l.categoryId === categoryId).sort(
    (a, b) => a.order - b.order,
  );

export const TOTAL_QUIZ_COUNT = LESSONS.reduce(
  (sum, l) => sum + l.quiz.length,
  0,
);
