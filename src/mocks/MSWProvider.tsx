'use client';

import { useEffect, useState } from 'react';

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  console.log('[MSW] MSWProvider rendered');

  useEffect(() => {
    console.log('[MSW] useEffect called');

    async function initMSW() {
      try {
        console.log('[MSW] API_MOCKING:', process.env.NEXT_PUBLIC_API_MOCKING);

        if (process.env.NEXT_PUBLIC_API_MOCKING !== 'enabled') {
          console.log('[MSW] Mocking disabled, skipping...');
          setIsReady(true);
          return;
        }

        if (typeof window !== 'undefined') {
          console.log('[MSW] Importing worker...');
          const { worker } = await import('./browser');
          console.log('[MSW] Starting worker...');
          await worker.start({
            onUnhandledRequest: 'bypass',
            serviceWorker: {
              url: '/mockServiceWorker.js',
            },
          });
          console.log('[MSW] Mock Service Worker started');
        }

        setIsReady(true);
      } catch (error) {
        console.error('[MSW] Error:', error);
        setIsReady(true);
      }
    }

    initMSW();
  }, []);

  if (!isReady) {
    return null; // 또는 로딩 스피너
  }

  return <>{children}</>;
}