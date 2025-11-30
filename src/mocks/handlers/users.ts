import { http, HttpResponse } from 'msw';

import {
  mockAddresses,
  mockFamilyUsers,
  mockUserMe,
} from '../data/users'

const API_PREFIX = '/ebs/renewal/v1';

export const usersHandlers = [
  // [16] 대상자 조회
  http.get(`${API_PREFIX}/users/me`, () => {
    return HttpResponse.json({
      message: 'okay',
      data: {
        user: mockUserMe,
      },
    });
  }),

  // [16] 대상자 가족 조회
  http.get(`${API_PREFIX}/users/me/family`, ({ request }) => {
    const url = new URL(request.url);
    const withMe = url.searchParams.get('with_me') === 'true';

    const users = withMe
      ? [mockUserMe, ...mockFamilyUsers]
      : mockFamilyUsers;

    return HttpResponse.json({
      message: 'okay',
      data: {
        users,
        total_count: users.length,
        remain_family_support_count: 2,
      },
    });
  }),

  // [17] 서비스 이용/검진결과수집 동의
  http.patch(`${API_PREFIX}/users/me/consents`, async ({ request }) => {
    const body = await request.json();
    console.log('[MSW] 동의 처리:', body);

    return HttpResponse.json({
      message: 'okay',
    });
  }),

  // [18] 대상자 수정
  http.patch(`${API_PREFIX}/users/me`, async ({ request }) => {
    const body = await request.json();
    console.log('[MSW] 대상자 수정:', body);

    return HttpResponse.json({
      message: 'okay',
      data: {
        user: {
          ...mockUserMe,
          ...(body as object),
        },
      },
    });
  }),

  // [18] 대상자 가족 수정
  http.patch(
    `${API_PREFIX}/users/me/family/:familyUserId`,
    async ({ params, request }) => {
      const { familyUserId } = params;
      const body = await request.json();
      console.log(`[MSW] 가족 수정 (ID: ${familyUserId}):`, body);

      const targetUser = mockFamilyUsers.find(
        (u) => u.id === Number(familyUserId)
      );

      return HttpResponse.json({
        message: 'okay',
        data: {
          user: {
            ...targetUser,
            ...(body as object),
          },
        },
      });
    }
  ),

  // [30] 예약 확인 - 기본 정보 조회
  http.get(`${API_PREFIX}/users/:userId`, ({ params }) => {
    const { userId } = params;
    const user =
      Number(userId) === mockUserMe.id
        ? mockUserMe
        : mockFamilyUsers.find((u) => u.id === Number(userId));

    if (!user) {
      return HttpResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      message: 'okay',
      data: { user },
    });
  }),

  // [30] 휴대폰 변경
  http.patch(
    `${API_PREFIX}/users/me/phone-number`,
    async ({ request }) => {
      const body = await request.json();
      console.log('[MSW] 휴대폰 변경:', body);

      return HttpResponse.json({
        message: 'okay',
      });
    }
  ),

  // [21] 위치 정보 조회
  http.get(`${API_PREFIX}/users/me/addresses`, () => {
    return HttpResponse.json({
      message: 'okay',
      data: {
        addresses: mockAddresses,
      },
    });
  }),

  // [21] 위치 정보 추가
  http.post(
    `${API_PREFIX}/users/me/addresses`,
    async ({ request }) => {
      const body = await request.json();
      console.log('[MSW] 위치 추가:', body);

      return HttpResponse.json({
        message: 'okay',
      });
    }
  ),

  // [21] 위치 정보 삭제
  http.delete(
    `${API_PREFIX}/users/me/addresses/:addressId`,
    ({ params }) => {
      const { addressId } = params;
      console.log(`[MSW] 위치 삭제 (ID: ${addressId})`);

      return HttpResponse.json({
        message: 'okay',
      });
    }
  ),
];