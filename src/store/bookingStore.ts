// store/bookingStore.ts
'use client';

import { create } from 'zustand';

export type Exam = {
  id: string;
  name: string;
  type: 'included' | 'additional';
};

export type BookingState = {
  memberId: string | null;
  phone: string;
  address: string;
  consentAgreed: boolean;

  hospitalId: string | null;
  packageId: string | null;

  preferredDate1: string | null; // ISO string or 'YYYY-MM-DD'
  preferredDate2: string | null;

  selectedIncludedExamIds: string[];
  selectedAdditionalExamIds: string[];

  // actions
  reset: () => void;
  setMemberId: (memberId: string) => void;
  setConsentInfo: (data: { phone: string; address: string; consentAgreed: boolean }) => void;
  setHospitalId: (hospitalId: string) => void;
  setPackageId: (packageId: string) => void;
  setPreferredDates: (dates: { preferredDate1: string | null; preferredDate2: string | null }) => void;
  setExams: (data: { included: string[]; additional: string[] }) => void;
};

const initialState: Omit<
  BookingState,
  | 'reset'
  | 'setMemberId'
  | 'setConsentInfo'
  | 'setHospitalId'
  | 'setPackageId'
  | 'setPreferredDates'
  | 'setExams'
> = {
  memberId: null,
  phone: '',
  address: '',
  consentAgreed: false,
  hospitalId: null,
  packageId: null,
  preferredDate1: null,
  preferredDate2: null,
  selectedIncludedExamIds: [],
  selectedAdditionalExamIds: [],
};

export const useBookingStore = create<BookingState>((set) => ({
  ...initialState,

  reset: () => set(initialState),

  setMemberId: (memberId) => set({ memberId }),

  setConsentInfo: ({ phone, address, consentAgreed }) =>
    set({ phone, address, consentAgreed }),

  setHospitalId: (hospitalId) => set({ hospitalId }),

  setPackageId: (packageId) => set({ packageId }),

  setPreferredDates: ({ preferredDate1, preferredDate2 }) =>
    set({ preferredDate1, preferredDate2 }),

  setExams: ({ included, additional }) =>
    set({
      selectedIncludedExamIds: included,
      selectedAdditionalExamIds: additional,
    }),
}));
