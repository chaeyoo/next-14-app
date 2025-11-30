// API 명세 기반 Mock 데이터 - Reservations

export const mockReservationDetail = {
    user: {
      id: 1,
      name: '김튼튼',
      phone_number: '01012345678',
      birthday: '1990-01-01',
      gender: 1,
      relationship: 1,
      company_name: '튼튼이홀딩스',
      employee_number: '10001',
      description: '비고사항입니다.',
      user_grade: 1,
      goods_grade: 0,
      address: '서울특별시 용산구 서빙고로 137',
      detail_address: '용산동6가 101호',
      zip_code: '04383',
    },
    center: {
      id: 1,
      name: '강남 하트스캔',
      zip_code: '06015',
      address: '서울 강남구 선정릉대로 171길 122',
      detail_address: '제이타워 12층',
      address_map_link: 'https://map.kakao.com/?q=강남하트스캔',
      description: '심혈관 질환 전문 검진센터입니다.',
      preparation: `※ 검진전날
  * 저녁 7시 이전에 저녁식사를 가볍게 하십시오.
  * 9시 이후부터는 금식하십시오.
  
  ※ 검진 당일
  * 공복상태로 오셔야 합니다.
  * 도착시간: 오전 8시~9시`,
    },
    reservation: {
      id: 1204,
      status: 1, // 1: 신청, 2: 확정, 3: 취소, 4: 완료
      type: 1,
      cost: 500000,
      additional_cost: 350000,
      price: 850000,
      reservation_dates: [
        {
          date_type: 'wish1',
          date: '2025-03-26',
          time_type: 'morning',
        },
        {
          date_type: 'wish2',
          date: '2025-03-27',
          time_type: 'afternoon',
        },
      ],
      user_request: [
        {
          user_request_category: '병원 전달사항',
          user_request_content: '수면내시경 희망합니다.',
        },
      ],
      submit_date: '2025-01-15T10:30:00.000Z',
      goods_id: 83,
      goods_name: '프리미엄 종합검진',
    },
    goods_by_type_list: [
      {
        type: 1,
        name: '기본검사',
        category_counts: [
          { name: '신장/체중/비만도 측정', value: 3 },
          { name: '시력/청력 검사', value: 5 },
          { name: '혈압측정', value: 4 },
        ],
        total_items_count: 32,
        items: [
          {
            category: '신장/체중/비만도 측정',
            id: 527,
            name: '신체계측',
            description: '신장, 체중, 체질량지수(BMI) 측정',
            note: '',
            sort_order: 1,
            goods_type: 0,
            goods_detail_id: 320,
            goods_detail_name: '기본검사',
            goods_detail_type: 1,
            goods_detail_mapping_id: 1,
            tags: [
              { name: 'is_ai_recommended', value: false },
              { name: 'has_last_year', value: true },
            ],
          },
        ],
      },
      {
        type: 2,
        name: '선택검사A',
        total_items_count: 15,
        available_items_count: 3,
        items: [
          {
            id: 123,
            name: '위내시경',
            description: '위암, 위궤양, 위염 등 조기발견',
            note: '수면 시 추가비용 5만원',
            sort_order: 1,
            goods_type: 0,
            goods_detail_id: 321,
            goods_detail_name: '선택검사',
            goods_detail_type: 2,
            goods_detail_mapping_id: 1,
            tags: [
              { name: 'is_ai_recommended', value: true },
              { name: 'has_last_year', value: false },
            ],
          },
          {
            id: 124,
            name: '대장내시경',
            description: '대장암, 용종 등 조기발견',
            note: '수면 시 추가비용 5만원',
            sort_order: 2,
            goods_type: 0,
            goods_detail_id: 321,
            goods_detail_name: '선택검사',
            goods_detail_type: 2,
            goods_detail_mapping_id: 2,
            tags: [
              { name: 'is_ai_recommended', value: true },
              { name: 'has_last_year', value: true },
            ],
          },
        ],
      },
      {
        type: 3,
        name: '추가검사',
        total_items_count: 20,
        items: [
          {
            id: 321,
            name: '뇌MRI',
            description: '뇌졸중, 뇌종양 등 조기발견',
            note: '촬영시간 약 30분 소요',
            price: 350000,
            sort_order: 1,
            goods_type: 0,
            goods_detail_id: 322,
            goods_detail_name: '추가검사',
            goods_detail_type: 3,
            goods_detail_mapping_id: 1,
            tags: [
              { name: 'is_ai_recommended', value: true },
              { name: 'has_last_year', value: false },
            ],
          },
        ],
      },
    ],
  };
  
  export const mockReservationList = [
    {
      id: 1204,
      status: 2, // 확정
      reservation_dates: [
        {
          date_type: 'confirmed',
          date: '2025-03-27',
          time_type: 'morning',
        },
      ],
      type: 1,
      user: {
        id: 1,
        users_by_years_id: 1,
        name: '김튼튼',
        phone_number: '01012345678',
        birthday: '1990-01-01',
        gender: 1,
        relationship: 1,
        user_grade: 1,
        goods_grade: 0,
        address: '서울특별시 용산구 서빙고로 137 (용산동6가)',
        detail_address: '101호',
        zip_code: '04383',
        description: '비고사항입니다.',
        year: '2025',
      },
      center: {
        id: 1,
        name: '강남 하트스캔',
        zip_code: '06015',
        address: '서울 강남구 선정릉대로 171길 122',
        detail_address: '제이타워 12층',
        address_map_link: 'https://map.kakao.com/?q=강남하트스캔',
        description: '심혈관 질환 전문 검진센터입니다.',
      },
      submit_date: '2025-01-15T10:30:00.000Z',
      goods_id: 83,
      goods_name: '프리미엄 종합검진',
    },
    {
      id: 1203,
      status: 1, // 신청
      reservation_dates: [
        {
          date_type: 'wish1',
          date: '2025-04-10',
          time_type: 'morning',
        },
        {
          date_type: 'wish2',
          date: '2025-04-11',
          time_type: 'afternoon',
        },
      ],
      type: 1,
      user: {
        id: 2,
        users_by_years_id: 2,
        name: '김건강',
        phone_number: '01098765432',
        birthday: '1992-05-15',
        gender: 2,
        relationship: 2, // 배우자
        user_grade: 3,
        goods_grade: 0,
        address: '서울특별시 용산구 서빙고로 137 (용산동6가)',
        detail_address: '101호',
        zip_code: '04383',
        description: '',
        year: '2025',
      },
      center: {
        id: 2,
        name: '서울아산병원 건강증진센터',
        zip_code: '05505',
        address: '서울 송파구 올림픽로 43길 88',
        detail_address: '',
        address_map_link: 'https://map.kakao.com/?q=서울아산병원',
        description: '종합검진 전문센터입니다.',
      },
      submit_date: '2025-01-20T14:00:00.000Z',
      goods_id: 84,
      goods_name: '기본 종합검진',
    },
    {
      id: 1202,
      status: 4, // 완료
      reservation_dates: [
        {
          date_type: 'confirmed',
          date: '2024-12-15',
          time_type: 'morning',
        },
      ],
      type: 1,
      user: {
        id: 1,
        users_by_years_id: 1,
        name: '김튼튼',
        phone_number: '01012345678',
        birthday: '1990-01-01',
        gender: 1,
        relationship: 1,
        user_grade: 1,
        goods_grade: 0,
        address: '서울특별시 용산구 서빙고로 137 (용산동6가)',
        detail_address: '101호',
        zip_code: '04383',
        description: '',
        year: '2024',
      },
      center: {
        id: 1,
        name: '강남 하트스캔',
        zip_code: '06015',
        address: '서울 강남구 선정릉대로 171길 122',
        detail_address: '제이타워 12층',
        address_map_link: 'https://map.kakao.com/?q=강남하트스캔',
        description: '심혈관 질환 전문 검진센터입니다.',
      },
      submit_date: '2024-11-01T09:00:00.000Z',
      goods_id: 83,
      goods_name: '프리미엄 종합검진',
    },
  ];