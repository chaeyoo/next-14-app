'use client';

/**
 * Chapter 3: React Context를 활용한 상태 관리
 *
 * 예제 1: useState + useContext 기본 패턴
 * 예제 2: 다중 Context로 상태 분리 (리렌더링 최적화)
 * 예제 3: useReducer + 다중 Context (07)
 * 예제 4: 커스텀 훅 + Provider 컴포넌트 (08)
 * 예제 5: createStateContext 팩토리 패턴 (09)
 * 예제 6: reduceRight로 Provider 중첩 방지 (10)
 */

import {
  createContext,
  useContext,
  useState,
  useReducer,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react';

// ============================================
// 예제 1: useState + useContext 기본 패턴
// ============================================

type CountStateContextType = {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
};

const CountStateContext = createContext<CountStateContextType>({
  count: 0,
  setCount: () => {},
});

function CountProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);
  return (
    <CountStateContext.Provider value={{ count, setCount }}>
      {children}
    </CountStateContext.Provider>
  );
}

function Component1() {
  const { count, setCount } = useContext(CountStateContext);
  const handleClick = () => setCount((c) => c + 1);

  return (
    <div className="rounded border border-blue-200 bg-blue-50 p-4">
      <p className="mb-2 font-medium text-blue-800">Component1</p>
      <p className="mb-2">
        count: <span className="font-bold">{count}</span>
      </p>
      <button
        onClick={handleClick}
        className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
      >
        +1
      </button>
    </div>
  );
}

function Component2() {
  const { count, setCount } = useContext(CountStateContext);
  const handleClick = () => setCount((c) => c + 2);

  return (
    <div className="rounded border border-green-200 bg-green-50 p-4">
      <p className="mb-2 font-medium text-green-800">Component2</p>
      <p className="mb-2">
        count: <span className="font-bold">{count}</span>
      </p>
      <button
        onClick={handleClick}
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
      <h3 className="mb-2 text-lg font-semibold">
        예제 1: useState + useContext 기본 패턴
      </h3>
      <p className="mb-4 text-sm text-gray-600">
        하나의 Context에서 count 상태를 공유합니다. 두 컴포넌트 모두 같은 count
        값을 표시하고 업데이트합니다. props drilling을 피하고 상태를 공유할 수 있다.
      </p>
      <CountProvider>

        <div className="grid grid-cols-2 gap-4">
          <Component1 />
          <Component2 />
        </div>
      </CountProvider>
    </div>
  );
}

// ============================================
// 예제 2: 다중 Context로 상태 분리
// ============================================

type CountContextType = {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
};

const Count1Context = createContext<CountContextType>({
  count: 0,
  setCount: () => {},
});

const Count2Context = createContext<CountContextType>({
  count: 0,
  setCount: () => {},
});

function Count1Provider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);
  return (
    <Count1Context.Provider value={{ count, setCount }}>
      {children}
    </Count1Context.Provider>
  );
}

function Count2Provider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);
  return (
    <Count2Context.Provider value={{ count, setCount }}>
      {children}
    </Count2Context.Provider>
  );
}

function Counter1() {
  const { count, setCount } = useContext(Count1Context);
  console.log('Counter1 렌더링');

  return (
    <div className="rounded border border-purple-200 bg-purple-50 p-4">
      <p className="mb-2 font-medium text-purple-800">Counter1 (Count1Context)</p>
      <p className="mb-2">
        count1: <span className="font-bold">{count}</span>
      </p>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="rounded bg-purple-500 px-3 py-1 text-white hover:bg-purple-600"
      >
        +1
      </button>
    </div>
  );
}

function Counter2() {
  const { count, setCount } = useContext(Count2Context);
  console.log('Counter2 렌더링');

  return (
    <div className="rounded border border-orange-200 bg-orange-50 p-4">
      <p className="mb-2 font-medium text-orange-800">Counter2 (Count2Context)</p>
      <p className="mb-2">
        count2: <span className="font-bold">{count}</span>
      </p>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="rounded bg-orange-500 px-3 py-1 text-white hover:bg-orange-600"
      >
        +1
      </button>
    </div>
  );
}

function Example2() {
  return (
    <div className="mb-8">
      <h3 className="mb-2 text-lg font-semibold">
        예제 2: 다중 Context로 상태 분리
      </h3>
      <p className="mb-4 text-sm text-gray-600">
        Count1Context와 Count2Context를 분리하여 각각 독립적으로 상태를
        관리합니다. Counter1 버튼을 클릭해도 Counter2는 리렌더링되지 않습니다.
        (콘솔에서 확인)
      </p>
      <Count1Provider>
        <Count2Provider>
          <div className="grid grid-cols-2 gap-4">
            <Counter1 />
            <Counter1 />
            <Counter2 />
            <Counter2 />
          </div>
        </Count2Provider>
      </Count1Provider>
    </div>
  );
}

// ============================================
// 예제 3: useReducer + 다중 Context (07)
// ============================================

type ReducerState = {
  count1: number;
  count2: number;
};

type ReducerAction = { type: 'INC1' } | { type: 'INC2' };

const ReducerCount1Context = createContext<number>(0);
const ReducerCount2Context = createContext<number>(0);
const DispatchContext = createContext<Dispatch<ReducerAction>>(() => {});

function reducer(state: ReducerState, action: ReducerAction): ReducerState {
  switch (action.type) {
    case 'INC1':
      return { ...state, count1: state.count1 + 1 };
    case 'INC2':
      return { ...state, count2: state.count2 + 1 };
    default:
      return state;
  }
}

function ReducerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { count1: 0, count2: 0 });
  return (
    <DispatchContext.Provider value={dispatch}>
      <ReducerCount1Context.Provider value={state.count1}>
        <ReducerCount2Context.Provider value={state.count2}>
          {children}
        </ReducerCount2Context.Provider>
      </ReducerCount1Context.Provider>
    </DispatchContext.Provider>
  );
}

function ReducerCounter1() {
  const count1 = useContext(ReducerCount1Context);
  const dispatch = useContext(DispatchContext);
  console.log('ReducerCounter1 렌더링');

  return (
    <div className="rounded border border-blue-200 bg-blue-50 p-4">
      <p className="mb-2 font-medium text-blue-800">ReducerCounter1</p>
      <p className="mb-2">
        count1: <span className="font-bold">{count1}</span>
      </p>
      <button
        onClick={() => dispatch({ type: 'INC1' })}
        className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
      >
        INC1
      </button>
    </div>
  );
}

function ReducerCounter2() {
  const count2 = useContext(ReducerCount2Context);
  const dispatch = useContext(DispatchContext);
  console.log('ReducerCounter2 렌더링');

  return (
    <div className="rounded border border-green-200 bg-green-50 p-4">
      <p className="mb-2 font-medium text-green-800">ReducerCounter2</p>
      <p className="mb-2">
        count2: <span className="font-bold">{count2}</span>
      </p>
      <button
        onClick={() => dispatch({ type: 'INC2' })}
        className="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
      >
        INC2
      </button>
    </div>
  );
}

function Example3() {
  return (
    <div className="mb-8">
      <h3 className="mb-2 text-lg font-semibold">
        예제 3: useReducer + 다중 Context
      </h3>
      <p className="mb-4 text-sm text-gray-600">
        useReducer로 중앙 상태를 관리하고, 각 값을 별도 Context로 분리합니다.
        DispatchContext는 액션 전달용으로 분리하여 dispatch만 필요한 컴포넌트의
        불필요한 리렌더링을 방지합니다. (콘솔에서 확인)
      </p>
      <ReducerProvider>
        <div className="grid grid-cols-2 gap-4">
          <ReducerCounter1 />
          <ReducerCounter1 />
          <ReducerCounter2 />
          <ReducerCounter2 />
        </div>
      </ReducerProvider>
    </div>
  );
}

// ============================================
// 예제 4: 커스텀 훅 + Provider 컴포넌트 (08)
// ============================================

type CustomCountContextType = [number, Dispatch<SetStateAction<number>>] | null;

const CustomCount1Context = createContext<CustomCountContextType>(null);
const CustomCount2Context = createContext<CustomCountContextType>(null);

function CustomCount1Provider({ children }: { children: ReactNode }) {
  return (
    <CustomCount1Context.Provider value={useState(0)}>
      {children}
    </CustomCount1Context.Provider>
  );
}

function CustomCount2Provider({ children }: { children: ReactNode }) {
  return (
    <CustomCount2Context.Provider value={useState(0)}>
      {children}
    </CustomCount2Context.Provider>
  );
}

// 커스텀 훅: Provider 누락 시 에러 발생
function useCustomCount1() {
  const value = useContext(CustomCount1Context);
  if (value === null) {
    throw new Error('CustomCount1Provider 내부에서 사용해야 합니다.');
  }
  return value;
}

function useCustomCount2() {
  const value = useContext(CustomCount2Context);
  if (value === null) {
    throw new Error('CustomCount2Provider 내부에서 사용해야 합니다.');
  }
  return value;
}

function CustomCounter1() {
  const [count, setCount] = useCustomCount1();
  console.log('CustomCounter1 렌더링');

  return (
    <div className="rounded border border-purple-200 bg-purple-50 p-4">
      <p className="mb-2 font-medium text-purple-800">CustomCounter1</p>
      <p className="mb-2">
        count1: <span className="font-bold">{count}</span>
      </p>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="rounded bg-purple-500 px-3 py-1 text-white hover:bg-purple-600"
      >
        +1
      </button>
    </div>
  );
}

function CustomCounter2() {
  const [count, setCount] = useCustomCount2();
  console.log('CustomCounter2 렌더링');

  return (
    <div className="rounded border border-orange-200 bg-orange-50 p-4">
      <p className="mb-2 font-medium text-orange-800">CustomCounter2</p>
      <p className="mb-2">
        count2: <span className="font-bold">{count}</span>
      </p>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="rounded bg-orange-500 px-3 py-1 text-white hover:bg-orange-600"
      >
        +1
      </button>
    </div>
  );
}

function Example4() {
  return (
    <div className="mb-8">
      <h3 className="mb-2 text-lg font-semibold">
        예제 4: 커스텀 훅 + Provider 컴포넌트
      </h3>
      <p className="mb-4 text-sm text-gray-600">
        커스텀 훅(useCustomCount1, useCustomCount2)으로 Context 접근을 추상화합니다.
        Provider가 없으면 에러를 발생시켜 실수를 방지합니다.
        useState를 직접 Provider value로 전달하는 간결한 패턴입니다.<br/>
        POINT: 커스텀 훅을 사용하여 Context 접근을 추상화할 수 있다. ➡️ CustomCounter1 컴포넌트가 useCustomCount1 훅에 숨겨진 컨텍스트에 대해서는 알지 못함
      </p>
      <CustomCount1Provider>
        <CustomCount2Provider>
          <div className="grid grid-cols-2 gap-4">
            <CustomCounter1 />
            <CustomCounter1 />
            <CustomCounter2 />
            <CustomCounter2 />
          </div>
        </CustomCount2Provider>
      </CustomCount1Provider>
    </div>
  );
}

// ============================================
// 예제 5: createStateContext 팩토리 패턴 (09)
// ============================================

/**
 * createStateContext - Context + Provider + Hook을 생성하는 팩토리 함수
 *
 * @param useValue 상태를 생성하는 훅 (예: () => useState(0))
 * @returns [Provider, useContextState] 튜플
 */
function createStateContext<T>(
  useValue: () => T
): [
  ({ children }: { children: ReactNode }) => JSX.Element,
  () => T
] {
  const StateContext = createContext<T | null>(null);

  const StateProvider = ({ children }: { children: ReactNode }) => {
    const value = useValue();
    return (
      <StateContext.Provider value={value}>{children}</StateContext.Provider>
    );
  };

  const useContextState = () => {
    const value = useContext(StateContext);
    if (value === null) {
      throw new Error('StateProvider 내부에서 사용해야 합니다.');
    }
    return value;
  };

  return [StateProvider, useContextState];
}

// 팩토리로 생성한 Context들
const useNumberState = () => useState(0);

const [FactoryCount1Provider, useFactoryCount1] = createStateContext(useNumberState);
const [FactoryCount2Provider, useFactoryCount2] = createStateContext(useNumberState);

function FactoryCounter1() {
  const [count, setCount] = useFactoryCount1();
  console.log('FactoryCounter1 렌더링');

  return (
    <div className="rounded border border-teal-200 bg-teal-50 p-4">
      <p className="mb-2 font-medium text-teal-800">FactoryCounter1</p>
      <p className="mb-2">
        count1: <span className="font-bold">{count}</span>
      </p>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="rounded bg-teal-500 px-3 py-1 text-white hover:bg-teal-600"
      >
        +1
      </button>
    </div>
  );
}

function FactoryCounter2() {
  const [count, setCount] = useFactoryCount2();
  console.log('FactoryCounter2 렌더링');

  return (
    <div className="rounded border border-pink-200 bg-pink-50 p-4">
      <p className="mb-2 font-medium text-pink-800">FactoryCounter2</p>
      <p className="mb-2">
        count2: <span className="font-bold">{count}</span>
      </p>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="rounded bg-pink-500 px-3 py-1 text-white hover:bg-pink-600"
      >
        +1
      </button>
    </div>
  );
}

function Example5() {
  return (
    <div className="mb-8">
      <h3 className="mb-2 text-lg font-semibold">
        예제 5: createStateContext 팩토리 패턴
      </h3>
      <p className="mb-4 text-sm text-gray-600">
        createStateContext 팩토리 함수로 Context, Provider, Hook을 한 번에
        생성합니다. 동일한 패턴의 상태 관리를 반복 구현할 필요 없이 재사용할 수
        있습니다.
      </p>
      <FactoryCount1Provider>
        <FactoryCount2Provider>
          <div className="grid grid-cols-2 gap-4">
            <FactoryCounter1 />
            <FactoryCounter1 />
            <FactoryCounter2 />
            <FactoryCounter2 />
          </div>
        </FactoryCount2Provider>
      </FactoryCount1Provider>
    </div>
  );
}

// ============================================
// 예제 6: reduceRight로 Provider 중첩 방지 (10)
// ============================================

// 여러 개의 Provider 생성
const [NestedCount1Provider, useNestedCount1] = createStateContext(useNumberState);
const [NestedCount2Provider, useNestedCount2] = createStateContext(useNumberState);
const [NestedCount3Provider, useNestedCount3] = createStateContext(useNumberState);
const [NestedCount4Provider, useNestedCount4] = createStateContext(useNumberState);
const [NestedCount5Provider, useNestedCount5] = createStateContext(useNumberState);

function NestedCounter({ label, useCount }: { label: string; useCount: () => [number, Dispatch<SetStateAction<number>>] }) {
  const [count, setCount] = useCount();

  return (
    <div className="rounded border border-gray-200 bg-gray-50 p-3">
      <p className="mb-1 text-sm font-medium text-gray-700">{label}</p>
      <div className="flex items-center gap-2">
        <span className="font-bold">{count}</span>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="rounded bg-gray-500 px-2 py-0.5 text-sm text-white hover:bg-gray-600"
        >
          +1
        </button>
      </div>
    </div>
  );
}

function NestedCountersDisplay() {
  return (
    <div className="grid grid-cols-5 gap-2">
      <NestedCounter label="Count1" useCount={useNestedCount1} />
      <NestedCounter label="Count2" useCount={useNestedCount2} />
      <NestedCounter label="Count3" useCount={useNestedCount3} />
      <NestedCounter label="Count4" useCount={useNestedCount4} />
      <NestedCounter label="Count5" useCount={useNestedCount5} />
    </div>
  );
}

function Example6() {
  // Provider 배열
  const providers = [
    NestedCount1Provider,
    NestedCount2Provider,
    NestedCount3Provider,
    NestedCount4Provider,
    NestedCount5Provider,
  ];

  // reduceRight로 Provider 중첩 동적 생성
  const ProvidersTree = providers.reduceRight(
    (children, Provider) => <Provider>{children}</Provider>,
    <NestedCountersDisplay />
  );

  return (
    <div className="mb-8">
      <h3 className="mb-2 text-lg font-semibold">
        예제 6: reduceRight로 Provider 중첩 방지
      </h3>
      <p className="mb-4 text-sm text-gray-600">
        여러 Provider를 중첩할 때 JSX가 깊어지는 문제를 reduceRight로 해결합니다.
        아래 코드는 5개의 Provider를 동적으로 중첩합니다.
      </p>
      <div className="mb-4 rounded bg-gray-800 p-3 text-sm text-gray-100">
        <code>
          {`providers.reduceRight(`}
          <br />
          {`  (children, Provider) => <Provider>{children}</Provider>,`}
          <br />
          {`  <App />`}
          <br />
          {`)`}
        </code>
      </div>
      {ProvidersTree}
    </div>
  );
}

// ============================================
// Chapter 3 탭 컴포넌트
// ============================================

export default function Chapter3Tab() {
  return (
    <div>
      <div className="mb-6 rounded-lg bg-gray-100 p-4">
        <h2 className="mb-2 text-xl font-bold">
          Chapter 3: React Context를 활용한 상태 관리
        </h2>
        <p className="text-gray-700">
          컨텍스트를 컴포넌트 상태와 결합하면 전역 상태를 제공할 수 있다.
          상태가 갱신될 때 모든 컨텍스트 소비자가 리렌더링 되므로 불필요한 렌더링이 발생할 수 있다.
          상태를 작은 조각으로 분리하면 불필요한 리렌더링을 방지할 수
          있습니다.
        </p>
      </div>

      <Example1 />
      <Example2 />
      <Example3 />
      <Example4 />
      <Example5 />
      <Example6 />
    </div>
  );
}
