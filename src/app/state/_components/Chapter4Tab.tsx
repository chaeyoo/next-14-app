'use client';

/**
 * Chapter 4: 모듈 상태와 구독 패턴
 *
 * 예제 1: 기본 구독 패턴 (useStore)
 * 예제 2: Selector 패턴 (useStoreSelector) - 불필요한 리렌더링 방지
 */

import { useCallback } from 'react';
import { createStore, useStore, useStoreSelector } from './store';

// ============================================
// 예제 1: 기본 구독 패턴
// ============================================

// 모듈 레벨에서 스토어 인스턴스 생성
const store1 = createStore({ count: 0 });

function Component1A() {
  const [state, setState] = useStore(store1);
  console.log('Component1A 렌더링');

  return (
    <div className="rounded border border-blue-200 bg-blue-50 p-4">
      <p className="mb-2 font-medium text-blue-800">Component1A</p>
      <p className="mb-2">
        count: <span className="font-bold">{state.count}</span>
      </p>
      <button
        onClick={() => setState((prev) => ({ count: prev.count + 1 }))}
        className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
      >
        +1
      </button>
    </div>
  );
}

function Component1B() {
  const [state, setState] = useStore(store1);
  console.log('Component1B 렌더링');

  return (
    <div className="rounded border border-green-200 bg-green-50 p-4">
      <p className="mb-2 font-medium text-green-800">Component1B</p>
      <p className="mb-2">
        count: <span className="font-bold">{state.count}</span>
      </p>
      <button
        onClick={() => setState((prev) => ({ count: prev.count + 2 }))}
        className="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
      >
        +2
      </button>
    </div>
  );
}

function Example1() {
  return (
    <div className="mb-8">
      <h3 className="mb-2 text-lg font-semibold">예제 1: 기본 구독 패턴</h3>
      <p className="mb-4 text-sm text-gray-600">
        createStore로 생성한 스토어를 useStore 훅으로 구독합니다. Context 없이
        모듈 레벨에서 상태를 공유합니다. 상태 변경 시 구독 중인 모든 컴포넌트가
        리렌더링됩니다.
      </p>
      <div className="grid grid-cols-2 gap-4">
        <Component1A />
        <Component1B />
      </div>
    </div>
  );
}

// ============================================
// 예제 2: Selector 패턴 (리렌더링 최적화)
// ============================================

type State2 = {
  count1: number;
  count2: number;
};

const store2 = createStore<State2>({ count1: 0, count2: 0 });

// Selector 함수들 - useCallback 없이 사용하려면 컴포넌트 외부에 정의
const selectCount1 = (state: State2) => state.count1;
const selectCount2 = (state: State2) => state.count2;

function Component2A() {
  const count1 = useStoreSelector(store2, selectCount1);
  console.log('Component2A 렌더링 (count1만 구독)');

  return (
    <div className="rounded border border-purple-200 bg-purple-50 p-4">
      <p className="mb-2 font-medium text-purple-800">
        Component2A (count1만 구독)
      </p>
      <p className="mb-2">
        count1: <span className="font-bold">{count1}</span>
      </p>
      <button
        onClick={() =>
          store2.setState((prev) => ({ ...prev, count1: prev.count1 + 1 }))
        }
        className="rounded bg-purple-500 px-3 py-1 text-white hover:bg-purple-600"
      >
        count1 +1
      </button>
    </div>
  );
}

function Component2B() {
  const count2 = useStoreSelector(store2, selectCount2);
  console.log('Component2B 렌더링 (count2만 구독)');

  return (
    <div className="rounded border border-orange-200 bg-orange-50 p-4">
      <p className="mb-2 font-medium text-orange-800">
        Component2B (count2만 구독)
      </p>
      <p className="mb-2">
        count2: <span className="font-bold">{count2}</span>
      </p>
      <button
        onClick={() =>
          store2.setState((prev) => ({ ...prev, count2: prev.count2 + 1 }))
        }
        className="rounded bg-orange-500 px-3 py-1 text-white hover:bg-orange-600"
      >
        count2 +1
      </button>
    </div>
  );
}

function Component2Both() {
  // 컴포넌트 내부에서 selector 정의 시 useCallback 필요 (참조 안정성)
  const selectBoth = useCallback(
    (state: State2) => `count1: ${state.count1}, count2: ${state.count2}`,
    []
  );
  const bothCounts = useStoreSelector(store2, selectBoth);
  console.log('Component2Both 렌더링 (둘 다 구독)');

  return (
    <div className="rounded border border-gray-200 bg-gray-50 p-4">
      <p className="mb-2 font-medium text-gray-800">
        Component2Both (둘 다 구독)
      </p>
      <p className="mb-2 font-bold">{bothCounts}</p>
    </div>
  );
}

function Example2() {
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">
        예제 2: Selector 패턴 (리렌더링 최적화)
      </h3>
      <p className="mb-4 text-sm text-gray-600">
        useStoreSelector로 필요한 상태만 선택하여 구독합니다. count1 버튼을
        클릭하면 Component2A와 Component2Both만 리렌더링됩니다. count2 버튼을
        클릭하면 Component2B와 Component2Both만 리렌더링됩니다. (콘솔에서 확인)
      </p>
      <div className="grid grid-cols-3 gap-4">
        <Component2A />
        <Component2B />
        <Component2Both />
      </div>
    </div>
  );
}

// ============================================
// Chapter 4 탭 컴포넌트
// ============================================

export default function Chapter4Tab() {
  return (
    <div>
      <div className="mb-6 rounded-lg bg-gray-100 p-4">
        <h2 className="mb-2 text-xl font-bold">
          Chapter 4: 모듈 상태와 구독 패턴
        </h2>
        <p className="text-gray-700">
          Context 없이 모듈 레벨에서 상태를 관리합니다. createStore로 스토어를
          생성하고, subscribe 패턴으로 상태 변경을 구독합니다. Selector를
          활용하면 불필요한 리렌더링을 방지할 수 있습니다.
        </p>
      </div>

      <Example1 />
      <Example2 />
    </div>
  );
}
