import { http, HttpResponse } from 'msw';

import {
  mockCenterDetail,
  mockCenterFilters,
  mockCenterGoods,
  mockCenterCapacities,
  mockCenterList,
} from '../data/centers';

const API_PREFIX = '/ebs/renewal/v1';

export const centersHandlers = [
  // [19] 필터 조회
  http.get(`${API_PREFIX}/healthcheck/centers/filters`, () => {
    return HttpResponse.json({
      filters: mockCenterFilters,
    });
  }),

  // [19][20] 병원 조회 (POST - 복잡한 파라미터)
  http.post(
    `${API_PREFIX}/healthcheck/centers`,
    async ({ request }) => {
      const body = await request.json();
      console.log('[MSW] 병원 검색:', body);

      // 검색 조건에 따른 필터링 로직 (필요시 확장)
      return HttpResponse.json({
        message: 'okay',
        data: {
          centers: mockCenterList,
        },
      });
    }
  ),

  // [24] 병원 상세 조회
  http.get(
    `${API_PREFIX}/healthcheck/centers/:centerId`,
    ({ params }) => {
      const { centerId } = params;
      console.log(`[MSW] 병원 상세 조회 (ID: ${centerId})`);

      return HttpResponse.json({
        message: 'okay',
        data: {
          center: {
            ...mockCenterDetail,
            id: Number(centerId),
          },
          specialist_list: mockCenterDetail.specialist_list,
        },
      });
    }
  ),

  // [24] 병원 상세 - 검사정보 조회
  http.get(
    `${API_PREFIX}/healthcheck/centers/:centerId/goods`,
    ({ params }) => {
      const { centerId } = params;
      console.log(`[MSW] 검사정보 조회 (센터 ID: ${centerId})`);

      return HttpResponse.json({
        message: 'okay',
        data: mockCenterGoods,
      });
    }
  ),

  // [28] 희망일 조회
  http.get(
    `${API_PREFIX}/healthcheck/centers/:centerId/capacities`,
    ({ params, request }) => {
      const { centerId } = params;
      const url = new URL(request.url);
      const itemIds = url.searchParams.get('healthcheck_item_ids');
      console.log(
        `[MSW] 예약 가능일 조회 (센터 ID: ${centerId}, 항목: ${itemIds})`
      );

      return HttpResponse.json({
        message: 'okay',
        data: {
          capacities: mockCenterCapacities,
        },
      });
    }
  ),
];