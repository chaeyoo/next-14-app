// 제약 업계 AI 실전 사례 - 도메인 타입 정의
// 원칙: 모든 사례는 출처가 확인된 실제 사례만 수록한다. 수치는 각 출처가 보도/발표한 값을 그대로 인용한다.

export type TechTag = "AI" | "RAG" | "MCP" | "Agent" | "GenAI-Discovery" | "Fine-tuning";

export type CaseSectorId =
  | "discovery"
  | "clinical-docs"
  | "enterprise-platform"
  | "decision-intelligence"
  | "marketing"
  | "data-infra";

export type CaseSector = {
  id: CaseSectorId;
  title: string;
  description: string;
  gradient: string; // Tailwind gradient 유틸 문자열
  accent: string;
};

// 구축 구조의 한 계층 (예: 모델 레이어 / 벡터 DB / 오케스트레이션)
export type ArchLayer = {
  name: string;
  detail: string;
};

export type CaseSource = {
  title: string;
  url: string;
};

export type CaseStudy = {
  id: string;
  sectorId: CaseSectorId;
  company: string;
  product: string; // 시스템/플랫폼 이름 (없으면 빈 문자열)
  emoji: string;
  tagline: string;
  tags: TechTag[];
  // 한눈에 보여줄 대표 지표 (출처 보도값)
  headline: { value: string; label: string };
  challenge: string;
  // 어떻게 구축했는가 — 계층별 구조
  architecture: ArchLayer[];
  // 사용 기술 스택 (구체 제품명)
  stack: string[];
  // 보도/발표된 성과 (수치는 출처 인용)
  results: string[];
  // FDE 관점의 학습 포인트
  fdeTakeaways: string[];
  sources: CaseSource[];
};
