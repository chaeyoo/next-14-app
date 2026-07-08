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

export type CategoryId = "core" | "frameworks" | "practice";

export type Category = {
  id: CategoryId;
  title: string;
  description: string;
  // Tailwind gradient utility 문자열 (매직값 대신 상수 매핑)
  gradient: string;
  accent: string;
};

// 진도 상태값 (localStorage 로 영속화)
export type Progress = {
  // lessonId -> 학습 완료 여부
  learned: Record<string, boolean>;
  // lessonId -> 퀴즈 최고 점수(정답 수)
  bestScore: Record<string, number>;
};
