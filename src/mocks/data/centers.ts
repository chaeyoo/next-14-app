// API 명세 기반 Mock 데이터 - Centers

export const mockCenterFilters = [
    {
      code: 'is_visited_before',
      label: '과거 방문',
      type: 'boolean',
    },
    {
      code: 'reservation_date_range',
      label: '검사일',
      type: 'date_range',
      default_value: {
        start_at: '2025-01-01',
        end_at: '2025-03-31',
      },
    },
    {
      code: 'healthcheck_items',
      label: '검사항목',
      type: 'checkbox',
      options: [
        {
          category: '전체',
          items: [
            { id: 1, name: '위내시경' },
            { id: 2, name: '골반초음파' },
            { id: 3, name: '대장내시경' },
            { id: 4, name: '복부CT' },
          ],
        },
        {
          category: '내분비-대사',
          items: [
            { id: 5, name: '갑상선초음파' },
            { id: 6, name: '당화혈색소' },
          ],
        },
        {
          category: '심혈관',
          items: [
            { id: 7, name: '심장초음파' },
            { id: 8, name: '경동맥초음파' },
          ],
        },
      ],
    },
    {
      code: 'monday_availability',
      label: '월요일 가능',
      type: 'boolean',
    },
    {
      code: 'friday_availability',
      label: '금요일 가능',
      type: 'boolean',
    },
    {
      code: 'saturday_availability',
      label: '토요일 가능',
      type: 'boolean',
    },
  ];
  
  export const mockCenterList = [
    {
      id: 1,
      name: '강남 하트스캔',
      address: '서울 강남구 선정릉대로 171길 122',
      visit_years: [2024, 2025],
      distance_to_center: '1.2km',
      additional_cost: 80000,
    },
    {
      id: 2,
      name: '서울아산병원 건강증진센터',
      address: '서울 송파구 올림픽로 43길 88',
      visit_years: [2023],
      distance_to_center: '5.3km',
      additional_cost: 120000,
    },
    {
      id: 3,
      name: '삼성서울병원 건강의학센터',
      address: '서울 강남구 일원로 81',
      visit_years: [],
      distance_to_center: '8.1km',
      additional_cost: 150000,
    },
    {
      id: 4,
      name: '강릉 동인병원',
      address: '강원 강릉시 강릉대로419번길 42',
      visit_years: [2024, 2025],
      distance_to_center: '165km',
      additional_cost: 50000,
    },
    {
      id: 5,
      name: '분당서울대학교병원',
      address: '경기 성남시 분당구 구미로 173번길 82',
      visit_years: [],
      distance_to_center: '25km',
      additional_cost: 100000,
    },
  ];
  
  export const mockCenterDetail = {
    id: 1,
    name: '강남 하트스캔',
    zip_code: '06015',
    address: '서울 강남구 선정릉대로 171길 122',
    detail_address: '제이타워 12층',
    latitude: 37.551229,
    longitude: 126.988205,
    description: '심혈관 질환 전문 검진센터입니다. 최신 장비와 전문 의료진이 정밀한 검진을 제공합니다.',
    center_type: 1,
    specialization_field: 1,
    nursing_institution_number: '1234567890',
    business_registration_number: '123-45-67890',
    homepage_url: 'https://www.heartscan.co.kr',
    main_image_url_list: [
      'https://via.placeholder.com/800x400/3b82f6/ffffff?text=Hospital+Main',
      'https://via.placeholder.com/800x400/10b981/ffffff?text=Equipment',
      'https://via.placeholder.com/800x400/8b5cf6/ffffff?text=Lobby',
    ],
    phone_number: '1599-8114',
    introduction:
      '강남 하트스캔은 심혈관 질환 전문 검진센터로, 최신 CT/MRI 장비를 보유하고 있습니다. 경험 풍부한 전문 의료진이 정확하고 신속한 검진 결과를 제공합니다.',
    parking_information:
      '건물 지하 1~3층 주차장 이용 가능\n검진 고객 3시간 무료 주차\n주차공간: 약 200대',
    preparation: `※ 검진전날
  * 저녁 7시 이전에 저녁식사를 가볍게 하십시오.
  * 9시 이후부터는 음식은 물론 물, 껌, 담배, 사탕 등을 삼가하십시오.
  * 복용 중인 약도 삼가하십시오.
  * 단, 부득이한 약은 담당 의사의 처방을 받으십시오.
  * 무리한 운동은 삼가하십시오.
  * 여성의 경우 임신 및 생리 중에는 검사가 불가능합니다.
  
  ※ 검진 당일
  * 공복상태로 오셔야 하며 검사는 3시간 정도의 시간이 소요됩니다.
  * 본원 도착시간은 오전 8시부터 9시까지입니다.
  * 가벼운 산책, 양치질 정도는 해도 무방합니다.
  * 문진표와 검사용 채변을 가지고 오십시오.`,
    create_date: '2022-01-01T00:00:00',
    update_date: '2024-06-01T00:00:00',
    score: {
      accessibility: 4.5,
      kindness: 4.8,
      satisfaction: 4.6,
    },
    specialist_list: [
      {
        id: 1,
        healthcheck_center_id: 1,
        medical_department: '내과',
        specialist_number: 10,
        description: '심혈관 전문의 10명 상주',
        equipment: 'CT, MRI, 초음파',
      },
      {
        id: 2,
        healthcheck_center_id: 1,
        medical_department: '영상의학과',
        specialist_number: 5,
        description: '영상의학 전문의 5명',
        equipment: '3.0T MRI, 128채널 CT',
      },
    ],
  };
  
  export const mockCenterGoods = {
    goods_list: [
      {
        id: 83,
        name: '프리미엄 종합검진',
        description: '가장 인기 있는 종합검진 패키지입니다.',
        type: 0,
        price: 800000,
        cost: 500000,
        center_id: 1,
        goods_by_type_list: [
          {
            type: 1,
            name: '기본검사',
            category_counts: [
              { name: '신장/체중/비만도 측정', value: 3 },
              { name: '시력/청력 검사', value: 5 },
              { name: '혈압측정', value: 4 },
              { name: '혈액검사', value: 20 },
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
              {
                category: '혈액검사',
                id: 528,
                name: '일반혈액검사',
                description: '빈혈, 백혈병, 감염 등 확인',
                note: '',
                sort_order: 2,
                goods_type: 0,
                goods_detail_id: 320,
                goods_detail_name: '기본검사',
                goods_detail_type: 1,
                goods_detail_mapping_id: 2,
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
              {
                id: 125,
                name: '복부초음파',
                description: '간, 담낭, 췌장, 신장 등 검사',
                note: '',
                sort_order: 3,
                goods_type: 0,
                goods_detail_id: 321,
                goods_detail_name: '선택검사',
                goods_detail_type: 2,
                goods_detail_mapping_id: 3,
                tags: [
                  { name: 'is_ai_recommended', value: false },
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
              {
                id: 322,
                name: '심장CT',
                description: '관상동맥 석회화 및 협착 확인',
                note: '',
                price: 200000,
                sort_order: 2,
                goods_type: 0,
                goods_detail_id: 322,
                goods_detail_name: '추가검사',
                goods_detail_type: 3,
                goods_detail_mapping_id: 2,
                tags: [
                  { name: 'is_ai_recommended', value: false },
                  { name: 'has_last_year', value: false },
                ],
              },
              {
                id: 323,
                name: 'PET-CT',
                description: '전신 암 검사',
                note: '촬영 전 6시간 금식 필요',
                price: 1200000,
                sort_order: 3,
                goods_type: 0,
                goods_detail_id: 322,
                goods_detail_name: '추가검사',
                goods_detail_type: 3,
                goods_detail_mapping_id: 3,
                tags: [
                  { name: 'is_ai_recommended', value: false },
                  { name: 'has_last_year', value: false },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 84,
        name: '기본 종합검진',
        description: '필수 검사 항목으로 구성된 기본 패키지입니다.',
        type: 0,
        price: 400000,
        cost: 250000,
        center_id: 1,
        goods_by_type_list: [
          {
            type: 1,
            name: '기본검사',
            category_counts: [
              { name: '신장/체중/비만도 측정', value: 3 },
              { name: '혈압측정', value: 2 },
              { name: '혈액검사', value: 10 },
            ],
            total_items_count: 15,
            items: [],
          },
        ],
      },
    ],
    my_user_grade: 1,
    tags: [
      { name: 'reservation_date_available', value: true },
      { name: 'selected_items_available', value: true },
    ],
  };
  
  // 예약 가능일 데이터 생성 함수
  function generateCapacities() {
    const capacities = [];
    const today = new Date();
  
    for (let i = 7; i < 90; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
  
      // 주말 제외
      if (date.getDay() === 0) continue; // 일요일
      
      const dateStr = date.toISOString().split('T')[0];
      const isSaturday = date.getDay() === 6;
  
      // 오전
      capacities.push({
        date: dateStr,
        time_type: 'morning',
        is_selectable: Math.random() > 0.3,
        items: [
          {
            id: 527,
            name: '위내시경',
            tags: [
              { name: 'is_available', value: Math.random() > 0.2 },
              { name: 'is_selected_by_filter', value: false },
            ],
          },
          {
            id: 528,
            name: '대장내시경',
            tags: [
              { name: 'is_available', value: Math.random() > 0.4 },
              { name: 'is_selected_by_filter', value: false },
            ],
          },
        ],
      });
  
      // 오후 (토요일은 오전만)
      if (!isSaturday) {
        capacities.push({
          date: dateStr,
          time_type: 'afternoon',
          is_selectable: Math.random() > 0.4,
          items: [
            {
              id: 527,
              name: '위내시경',
              tags: [
                { name: 'is_available', value: Math.random() > 0.3 },
                { name: 'is_selected_by_filter', value: false },
              ],
            },
            {
              id: 528,
              name: '대장내시경',
              tags: [
                { name: 'is_available', value: Math.random() > 0.5 },
                { name: 'is_selected_by_filter', value: false },
              ],
            },
          ],
        });
      }
    }
  
    return capacities;
  }
  
  export const mockCenterCapacities = generateCapacities();