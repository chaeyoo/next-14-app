// components/booking/BookingDebugPanel.tsx
'use client';

import { useBookingStore } from '@/store/bookingStore';

export function BookingDebugPanel() {
  const state = useBookingStore();

  return (
    <pre className="mt-4 max-h-64 overflow-auto rounded-md bg-slate-900 p-3 text-xs text-slate-50">
      {JSON.stringify(state, null, 2)}
    </pre>
  );
}
