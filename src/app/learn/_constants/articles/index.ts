import type { Article, ArticleSeries, ArticleSeriesId } from "../../_types";
import { ARCHITECTURE_ARTICLES } from "./architecture";
import { PRODUCTION_ARTICLES } from "./production";
import { FIELD_ARTICLES } from "./field";

// 아티클 시리즈 정의 (선언적 상수 매핑)
export const ARTICLE_SERIES: ArticleSeries[] = [
  {
    id: "architecture",
    title: "아키텍처 심화",
    description: "핵심 개념 레슨을 실제 시스템 설계 수준으로",
    gradient: "from-indigo-500 to-violet-500",
    accent: "text-indigo-400",
  },
  {
    id: "production",
    title: "프로덕션 & 신뢰성",
    description: "PoC를 넘어 실서비스로 — 평가·신뢰성·비용·보안·운영",
    gradient: "from-rose-500 to-orange-400",
    accent: "text-rose-400",
  },
  {
    id: "field",
    title: "FDE 현장 플레이북",
    description: "문제 발굴부터 조직 안착까지, 고객 현장의 실무 기술",
    gradient: "from-emerald-500 to-lime-400",
    accent: "text-emerald-400",
  },
];

// 전체 아티클 (권장 읽기 순서로 정렬)
export const ARTICLES: Article[] = [
  ...ARCHITECTURE_ARTICLES,
  ...PRODUCTION_ARTICLES,
  ...FIELD_ARTICLES,
].sort((a, b) => a.order - b.order);

// 편의 조회 헬퍼
export const getArticle = (id: string) => ARTICLES.find((a) => a.id === id);

export const getArticlesBySeries = (seriesId: ArticleSeriesId) =>
  ARTICLES.filter((a) => a.seriesId === seriesId).sort(
    (a, b) => a.order - b.order,
  );

// 아티클 종합 퀴즈 — 진도(bestScore) 저장용 가상 id
export const ARTICLE_EXAM_ID = "articles-final";

// 아티클 종합 퀴즈 총 문항 수 (아티클당 1문항씩 무작위 출제)
export const ARTICLE_EXAM_SIZE = ARTICLES.length;

export const TOTAL_ARTICLE_QUIZ_POOL = ARTICLES.reduce(
  (sum, a) => sum + a.quiz.length,
  0,
);
