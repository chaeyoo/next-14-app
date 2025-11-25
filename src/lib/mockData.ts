// lib/mockData.ts

export const mockMembers = [
    {
      id: 'm1',
      name: '홍길동',
      relation: '본인',
      birth: '1995-01-01',
    },
    {
      id: 'm2',
      name: '홍길순',
      relation: '배우자',
      birth: '1995-05-10',
    },
    {
      id: 'm3',
      name: '홍어린',
      relation: '자녀',
      birth: '2020-03-02',
    },
  ];
  
  export const mockHospitals = [
    { id: 'h1', name: '서울 건강검진센터', address: '서울시 강남구 어딘가 1' },
    { id: 'h2', name: '강남 메디컬 센터', address: '서울시 강남구 어딘가 2' },
  ];
  
  export const mockPackages = [
    { id: 'p1', name: '기본 종합검진', description: '혈액검사, 흉부 X-ray 포함' },
    { id: 'p2', name: '프리미엄 종합검진', description: '위내시경, CT 포함' },
  ];
  
  export const mockIncludedExams = [
    { id: 'e1', name: '혈액 검사' },
    { id: 'e2', name: '소변 검사' },
  ];
  
  export const mockAdditionalExams = [
    { id: 'e3', name: '위 내시경' },
    { id: 'e4', name: '대장 내시경' },
    { id: 'e5', name: 'CT 촬영' },
  ];
  