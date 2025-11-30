import { http, HttpResponse } from 'msw';

import {
  mockReservationDetail,
  mockReservationList,
} from '../data/reservations';

const API_PREFIX = '/ebs/renewal/v1';

let reservationIdCounter = 1000;

export const reservationsHandlers = [
  // [32] 예약하기
  http.post(
    `${API_PREFIX}/healthcheck/reservations`,
    async ({ request }) => {
      const body = await request.json();
      console.log('[MSW] 예약 생성:', body);

      reservationIdCounter += 1;

      return HttpResponse.json({
        message: 'okay',
        reservation_id: reservationIdCounter,
      });
    }
  ),

  // [32] 예약 취소
  http.delete(
    `${API_PREFIX}/healthcheck/reservations/:reservationId`,
    ({ params }) => {
      const { reservationId } = params;
      console.log(`[MSW] 예약 취소 (ID: ${reservationId})`);

      return HttpResponse.json({
        message: 'okay',
      });
    }
  ),

  // [32] 예약 변경
  http.put(
    `${API_PREFIX}/healthcheck/reservations/:reservationId`,
    async ({ params, request }) => {
      const { reservationId } = params;
      const body = await request.json();
      console.log(`[MSW] 예약 변경 (ID: ${reservationId}):`, body);

      return HttpResponse.json({
        message: 'okay',
      });
    }
  ),

  // [32] 예약내역 상세 조회
  http.get(
    `${API_PREFIX}/healthcheck/reservations/:reservationId`,
    ({ params }) => {
      const { reservationId } = params;
      console.log(`[MSW] 예약 상세 조회 (ID: ${reservationId})`);

      return HttpResponse.json({
        message: 'okay',
        data: {
          ...mockReservationDetail,
          reservation: {
            ...mockReservationDetail.reservation,
            id: Number(reservationId),
          },
        },
      });
    }
  ),

  // [33] 예약내역 목록 조회
  http.get(
    `${API_PREFIX}/healthcheck/reservations`,
    ({ request }) => {
      const url = new URL(request.url);
      const status = url.searchParams.get('status');
      const relationship = url.searchParams.get('relationship');
      console.log(
        `[MSW] 예약 목록 조회 (status: ${status}, relationship: ${relationship})`
      );

      // 필터링 로직 (필요시 확장)
      let filteredList = mockReservationList;
      if (status) {
        filteredList = filteredList.filter(
          (r) => r.status === Number(status)
        );
      }

      return HttpResponse.json({
        message: 'okay',
        data: {
          reservations: filteredList,
          count: filteredList.length,
          total_count: mockReservationList.length,
        },
      });
    }
  ),
];