// 생성형 AI 학습 플랫폼 - 도메인 타입 정의

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

export type LessonSection = {
  heading: string;
  body: string;
  bullets?: string[];
  code?: string;
};

export type Lesson = {
  id: string;
  categoryId: CategoryId;
  order: number;
  title: string;
  emoji: string;
  tagline: string;
  readMinutes: number;
  sections: LessonSection[];
  keyTakeaways: string[];
  quiz: QuizQuestion[];
};

export type CategoryId = "core" | "frameworks" | "practice" | "fde-craft";

export type Category = {
  id: CategoryId;
  title: string;
  description: string;
  // Tailwind gradient utility 문자열 (매직값 대신 상수 매핑)
  gradient: string;
  accent: string;
};

// ───────────────────────── 심화 아티클 ─────────────────────────

export type ArticleSeriesId = "architecture" | "production" | "field";

export type ArticleSeries = {
  id: ArticleSeriesId;
  title: string;
  description: string;
  // Tailwind gradient utility 문자열 (매직값 대신 상수 매핑)
  gradient: string;
  accent: string;
};

// 레슨을 심화하는 긴 호흡의 읽기 콘텐츠.
// 아티클 자체에는 개별 퀴즈가 없고, quiz 는 '아티클 종합 퀴즈' 출제 풀로만 쓰인다.
export type Article = {
  id: string;
  seriesId: ArticleSeriesId;
  order: number; // 전체 아티클에서의 권장 읽기 순서 (1~N)
  title: string;
  emoji: string;
  tagline: string;
  readMinutes: number;
  // 이 아티클이 심화하는 기존 레슨 id 목록
  relatedLessonIds: string[];
  sections: LessonSection[];
  keyTakeaways: string[];
  quiz: QuizQuestion[];
};

// 진도 상태값 (localStorage 로 영속화)
// learned 에는 lessonId 외에 articleId(읽음)도 같은 스키마로 저장한다.
export type Progress = {
  // lessonId -> 학습 완료 여부
  learned: Record<string, boolean>;
  // lessonId -> 퀴즈 최고 점수(정답 수)
  bestScore: Record<string, number>;
};
