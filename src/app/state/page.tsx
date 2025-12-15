'use client';

/**
 * 상태 관리 학습 페이지
 *
 * "리액트 훅을 활용한 마이크로 상태 관리" 책의 Chapter 3, 4, 5 예제
 * https://github.com/wikibook/msmrh
 */

import { useState } from 'react';
import Chapter3Tab from './_components/Chapter3Tab';
import Chapter4Tab from './_components/Chapter4Tab';
import Chapter5Tab from './_components/Chapter5Tab';

type TabType = 'chapter3' | 'chapter4' | 'chapter5';

const TABS: { key: TabType; label: string; description: string }[] = [
  {
    key: 'chapter3',
    label: 'Chapter 3',
    description: 'React Context',
  },
  {
    key: 'chapter4',
    label: 'Chapter 4',
    description: '구독 패턴',
  },
  {
    key: 'chapter5',
    label: 'Chapter 5',
    description: 'Context + 구독',
  },
];

export default function StatePage() {
  const [activeTab, setActiveTab] = useState<TabType>('chapter3');

  return (
    <div className="min-h-screen bg-white p-8">
      <header className="mb-8">
        <h1 className="mb-2 text-2xl font-bold">
          마이크로 상태 관리 학습 페이지
        </h1>
        <p className="text-gray-600">
          리액트 훅을 활용한 마이크로 상태 관리 - Chapter 3, 4, 5 예제
        </p>
        <a
          href="https://github.com/wikibook/msmrh"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-500 hover:underline"
        >
          GitHub 레포지토리 보기
        </a>
      </header>

      {/* 탭 네비게이션 */}
      <nav className="mb-6 border-b border-gray-200">
        <div className="flex gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="block">{tab.label}</span>
              <span className="block text-xs text-gray-400">
                {tab.description}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* 탭 콘텐츠 */}
      <main>
        {activeTab === 'chapter3' && <Chapter3Tab />}
        {activeTab === 'chapter4' && <Chapter4Tab />}
        {activeTab === 'chapter5' && <Chapter5Tab />}
      </main>

      {/* 하단 안내 */}
      <footer className="mt-12 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
        <p className="font-medium">브라우저 콘솔을 열어 리렌더링 로그를 확인하세요!</p>
        <p className="mt-1 text-yellow-700">
          각 예제에서 버튼을 클릭하면 어떤 컴포넌트가 리렌더링되는지 console.log로
          확인할 수 있습니다.
        </p>
      </footer>
    </div>
  );
}
