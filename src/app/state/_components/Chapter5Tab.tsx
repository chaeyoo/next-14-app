'use client';

/**
 * Chapter 5: Context와 구독 패턴의 결합
 *
 * 예제 1: StoreProvider + useSelector + useSetState
 * 예제 2: 범위 기반 독립적 상태 관리
 */

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { createStore, type Store } from './store';

// ============================================
// Context + 구독 결합 유틸리티
// ============================================

type State = {
  count: number;
};

const StoreContext = createContext<Store<State> | null>(null);

/**
 * StoreProvider - Context를 통해 스토어 제공
 *
 * 각 Provider는 독립적인 스토어 인스턴스를 생성합니다.
 * 이를 통해 컴포넌트 범위에 따른 상태 분리가 가능합니다.
 */
function StoreProvider({
  initialState,
  children,
}: {
  initialState: State;
  children: ReactNode;
}) {
  // useRef로 스토어 인스턴스를 안정적으로 유지
  const storeRef = useRef<Store<State>>();
  if (!storeRef.current) {
    storeRef.current = createStore(initialState);
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
}

/**
 * useSelector - Context의 스토어에서 상태 선택
 */
function useSelector<S>(selector: (state: State) => S): S {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('StoreProvider 내부에서 사용해야 합니다.');
  }

  const [state, setState] = useState(() => selector(store.getState()));

  useEffect(() => {
    const callback = () => setState(selector(store.getState()));
    const unsubscribe = store.subscribe(callback);
    callback();
    return unsubscribe;
  }, [store, selector]);

  return state;
}

/**
 * useSetState - Context의 스토어에서 setState 반환
 */
function useSetState(): Store<State>['setState'] {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('StoreProvider 내부에서 사용해야 합니다.');
  }
  return store.setState;
}

// ============================================
// 예제 1: 기본 사용법
// ============================================

const selectCount = (state: State) => state.count;

function Counter() {
  const count = useSelector(selectCount);
  const setState = useSetState();
  console.log('Counter 렌더링');

  return (
    <div className="rounded border border-blue-200 bg-blue-50 p-4">
      <p className="mb-2 font-medium text-blue-800">Counter</p>
      <p className="mb-2">
        count: <span className="font-bold">{count}</span>
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

function CounterDisplay() {
  const count = useSelector(selectCount);
  console.log('CounterDisplay 렌더링');

  return (
    <div className="rounded border border-green-200 bg-green-50 p-4">
      <p className="mb-2 font-medium text-green-800">CounterDisplay (읽기 전용)</p>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );
}

function Example1() {
  return (
    <div className="mb-8">
      <h3 className="mb-2 text-lg font-semibold">
        예제 1: StoreProvider + useSelector + useSetState
      </h3>
      <p className="mb-4 text-sm text-gray-600">
        Context를 통해 스토어를 제공하고, useSelector로 상태를 구독,
        useSetState로 상태를 업데이트합니다. Counter와 CounterDisplay가 같은
        스토어를 공유합니다.
      </p>
      <StoreProvider initialState={{ count: 0 }}>
        <div className="grid grid-cols-2 gap-4">
          <Counter />
          <CounterDisplay />
        </div>
      </StoreProvider>
    </div>
  );
}

// ============================================
// 예제 2: 범위 기반 독립적 상태
// ============================================

function ScopedCounter({ label }: { label: string }) {
  const count = useSelector(selectCount);
  const setState = useSetState();

  return (
    <div className="rounded border border-purple-200 bg-purple-50 p-4">
      <p className="mb-2 font-medium text-purple-800">{label}</p>
      <p className="mb-2">
        count: <span className="font-bold">{count}</span>
      </p>
      <button
        onClick={() => setState((prev) => ({ count: prev.count + 1 }))}
        className="rounded bg-purple-500 px-3 py-1 text-white hover:bg-purple-600"
      >
        +1
      </button>
    </div>
  );
}

function Example2() {
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">
        예제 2: 범위 기반 독립적 상태
      </h3>
      <p className="mb-4 text-sm text-gray-600">
        각 StoreProvider는 독립적인 스토어 인스턴스를 생성합니다. 같은
        ScopedCounter 컴포넌트지만 Provider 범위에 따라 다른 상태를 가집니다.
        Scope A와 Scope B의 카운터는 서로 영향을 주지 않습니다.
      </p>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h4 className="mb-2 font-semibold text-orange-600">Scope A (초기값: 0)</h4>
          <StoreProvider initialState={{ count: 0 }}>
            <div className="space-y-4">
              <ScopedCounter label="A-Counter 1" />
              <ScopedCounter label="A-Counter 2" />
            </div>
          </StoreProvider>
        </div>
        <div>
          <h4 className="mb-2 font-semibold text-teal-600">Scope B (초기값: 100)</h4>
          <StoreProvider initialState={{ count: 100 }}>
            <div className="space-y-4">
              <ScopedCounter label="B-Counter 1" />
              <ScopedCounter label="B-Counter 2" />
            </div>
          </StoreProvider>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Chapter 5 탭 컴포넌트
// ============================================

export default function Chapter5Tab() {
  return (
    <div>
      <div className="mb-6 rounded-lg bg-gray-100 p-4">
        <h2 className="mb-2 text-xl font-bold">
          Chapter 5: Context와 구독 패턴의 결합
        </h2>
        <p className="text-gray-700">
          Chapter 3의 Context API와 Chapter 4의 구독 패턴을 결합합니다.
          StoreProvider로 범위를 지정하고, useSelector로 선택적 구독,
          useSetState로 상태 업데이트를 합니다. 이를 통해 컴포넌트 범위에 따른
          독립적 상태 관리가 가능합니다.
        </p>
      </div>

      <Example1 />
      <Example2 />
    </div>
  );
}
