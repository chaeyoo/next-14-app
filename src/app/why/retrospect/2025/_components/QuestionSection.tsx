"use client";

import type { Question } from "../_constants/questions";
import { useScrollAnimation } from "../_hooks/useScrollAnimation";

type Props = {
  question: Question;
  index: number;
};

export const QuestionSection = ({ question, index }: Props) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const Icon = question.icon;

  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      className={`relative min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br ${question.bgGradient}`}
    >
      <div
        className={`max-w-4xl w-full flex flex-col ${
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        } items-center gap-8 md:gap-16`}
      >
        {/* 아이콘 영역 */}
        <div
          className={`flex-shrink-0 transition-all duration-700 delay-100 ${
            isVisible
              ? "opacity-100 scale-100"
              : "opacity-0 scale-75"
          }`}
        >
          <div
            className={`relative p-8 md:p-12 rounded-full bg-gradient-to-br ${question.gradient.from} ${question.gradient.via || ""} ${question.gradient.to}`}
          >
            <Icon className="w-16 h-16 md:w-24 md:h-24 text-white" strokeWidth={1.5} />

            {/* 글로우 효과 */}
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-br ${question.gradient.from} ${question.gradient.to} blur-xl opacity-50 -z-10 animate-pulse`}
            />
          </div>
        </div>

        {/* 텍스트 영역 */}
        <div
          className={`flex-1 text-center ${isEven ? "md:text-left" : "md:text-right"}`}
        >
          {/* 질문 번호 */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            <span
              className={`inline-block text-sm md:text-base font-medium tracking-widest text-transparent bg-clip-text bg-gradient-to-r ${question.gradient.from} ${question.gradient.to} mb-4`}
            >
              QUESTION {String(question.id).padStart(2, "0")}
            </span>
          </div>

          {/* 질문 */}
          <h2
            className={`text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight transition-all duration-700 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            <span
              className={`bg-gradient-to-r ${question.gradient.from} ${question.gradient.via || ""} ${question.gradient.to} bg-clip-text text-transparent whitespace-pre-line`}
            >
              {question.question}
            </span>
          </h2>

          {/* 서브 텍스트 */}
          <p
            className={`mt-4 md:mt-6 text-base md:text-xl text-white/60 leading-relaxed transition-all duration-700 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            {question.subText}
          </p>

          {/* 장식 라인 */}
          <div
            className={`mt-8 md:mt-10 h-1 w-20 mx-auto ${isEven ? "md:mx-0" : "md:ml-auto md:mr-0"} rounded-full bg-gradient-to-r ${question.gradient.from} ${question.gradient.to} transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 w-20 md:w-32" : "opacity-0 w-0"
            }`}
          />
        </div>
      </div>

      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-20 -right-20 w-40 h-40 md:w-64 md:h-64 rounded-full bg-gradient-to-br ${question.gradient.from} ${question.gradient.to} opacity-5 blur-3xl`}
        />
        <div
          className={`absolute -bottom-20 -left-20 w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br ${question.gradient.from} ${question.gradient.to} opacity-5 blur-3xl`}
        />
      </div>
    </section>
  );
};
