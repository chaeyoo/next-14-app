import type { UserResponse, FamilyResponse, AddressResponse } from '@/types/user';

const API_PREFIX = '/ebs/renewal/v1';

export const userService = {
  getMe: async (): Promise<UserResponse> => {
    const res = await fetch(`${API_PREFIX}/users/me`);
    if (!res.ok) throw new Error('Failed to fetch user');
    return res.json();
  },

  getFamily: async (withMe = false): Promise<FamilyResponse> => {
    const res = await fetch(`${API_PREFIX}/users/me/family?with_me=${withMe}`);
    if (!res.ok) throw new Error('Failed to fetch family');
    return res.json();
  },

  getAddresses: async (): Promise<AddressResponse> => {
    const res = await fetch(`${API_PREFIX}/users/me/addresses`);
    if (!res.ok) throw new Error('Failed to fetch addresses');
    return res.json();
  },

  updateMe: async (data: Partial<{ phone_number: string; address: string }>) => {
    const res = await fetch(`${API_PREFIX}/users/me`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update user');
    return res.json();
  },
};

// Query Keys - 선언적 관리
export const userKeys = {
  all: ['user'] as const,
  me: () => [...userKeys.all, 'me'] as const,
  family: () => [...userKeys.all, 'family'] as const,
  addresses: () => [...userKeys.all, 'addresses'] as const,
};
