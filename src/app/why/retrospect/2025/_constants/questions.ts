import {
  Star,
  Trophy,
  Cloud,
  Rocket,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";

export type Question = {
  id: number;
  question: string;
  subText: string;
  icon: LucideIcon;
  gradient: {
    from: string;
    via?: string;
    to: string;
  };
  bgGradient: string;
};

export const RETROSPECT_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "올해 가장 기억에 남는 순간은?",
    subText: "눈을 감고 떠올려보세요. 어떤 장면이 먼저 떠오르나요?",
    icon: Star,
    gradient: { from: "from-purple-400", via: "via-pink-500", to: "to-rose-500" },
    bgGradient: "from-purple-900/20 via-pink-900/20 to-rose-900/20",
  },
  {
    id: 2,
    question: "올해 가장 큰 성취는 무엇인가요?",
    subText: "크든 작든, 당신이 이뤄낸 것들을 자랑스러워하세요.",
    icon: Trophy,
    gradient: { from: "from-amber-400", via: "via-orange-500", to: "to-red-500" },
    bgGradient: "from-amber-900/20 via-orange-900/20 to-red-900/20",
  },
  {
    id: 3,
    question: "올해 가장 힘들었던 순간은?",
    subText: "힘들었던 시간도 당신을 성장시킨 소중한 경험입니다.",
    icon: Cloud,
    gradient: { from: "from-blue-400", via: "via-indigo-500", to: "to-slate-500" },
    bgGradient: "from-blue-900/20 via-indigo-900/20 to-slate-900/20",
  },
  {
    id: 4,
    question: "2026년, \n어떤 사람이 되고 싶나요?",
    subText: "새해에는 어떤 모습으로 성장하고 싶은지 그려보세요.",
    icon: Rocket,
    gradient: { from: "from-cyan-400", via: "via-teal-500", to: "to-emerald-500" },
    bgGradient: "from-cyan-900/20 via-teal-900/20 to-emerald-900/20",
  },
  {
    id: 5,
    question: "자신에게 해주고 싶은 말은?",
    subText: "한 해 동안 정말 수고했어요. 스스로에게 따뜻한 말 한마디.",
    icon: MessageCircle,
    gradient: { from: "from-violet-400", via: "via-purple-500", to: "to-indigo-500" },
    bgGradient: "from-violet-900/20 via-purple-900/20 to-indigo-900/20",
  },
];
