/**
 * Chapter 4 & 5: 마이크로 상태 관리를 위한 Store 유틸리티
 *
 * createStore: getState, setState, subscribe 메서드를 제공하는 스토어 생성
 * useStore: 전체 상태를 구독하는 훅
 * useStoreSelector: 선택자를 통해 부분 상태만 구독하는 훅 (리렌더링 최적화)
 */

import { useEffect, useState, useCallback } from 'react';

// Store 타입 정의
export type Store<T> = {
  getState: () => T;
  setState: (action: T | ((prev: T) => T)) => void;
  subscribe: (callback: () => void) => () => void;
};

/**
 * createStore - 구독 패턴 기반 스토어 생성 함수
 *
 * @param initialState 초기 상태값
 * @returns Store 객체 (getState, setState, subscribe)
 */
export const createStore = <T>(initialState: T): Store<T> => {
  let state = initialState;
  const callbacks = new Set<() => void>();

  return {
    getState: () => state,
    setState: (nextState) => {
      state =
        typeof nextState === 'function'
          ? (nextState as (prev: T) => T)(state)
          : nextState;
      // 모든 구독자에게 상태 변경 알림
      callbacks.forEach((callback) => callback());
    },
    subscribe: (callback) => {
      callbacks.add(callback);
      // 구독 해제 함수 반환
      return () => callbacks.delete(callback);
    },
  };
};

/**
 * useStore - 스토어의 전체 상태를 구독하는 훅
 *
 * 상태가 변경될 때마다 컴포넌트가 리렌더링됨
 */
export const useStore = <T>(store: Store<T>): [T, Store<T>['setState']] => {
  const [state, setState] = useState(() => store.getState());

  useEffect(() => {
    const callback = () => setState(store.getState());
    const unsubscribe = store.subscribe(callback);
    // 마운트 시점에 최신 상태로 동기화
    callback();
    return unsubscribe;
  }, [store]);

  return [state, store.setState];
};

/**
 * useStoreSelector - 선택자를 통해 부분 상태만 구독하는 훅
 *
 * selector가 반환하는 값이 변경될 때만 리렌더링됨
 * 불필요한 리렌더링을 방지하여 성능 최적화
 */
export const useStoreSelector = <T, S>(
  store: Store<T>,
  selector: (state: T) => S
): S => {
  const [state, setState] = useState(() => selector(store.getState()));

  useEffect(() => {
    const callback = () => {
      const newState = selector(store.getState());
      setState(newState);
    };
    const unsubscribe = store.subscribe(callback);
    // 마운트 시점에 최신 상태로 동기화
    callback();
    return unsubscribe;
  }, [store, selector]);

  return state;
};

/**
 * useSetStore - setState만 필요한 경우 사용
 *
 * 상태 변경 함수만 반환하며, 상태 구독은 하지 않음
 */
export const useSetStore = <T>(store: Store<T>): Store<T>['setState'] => {
  return useCallback(store.setState, [store]);
};
