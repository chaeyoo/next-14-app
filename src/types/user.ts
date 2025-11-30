export interface User {
  id: number;
  name: string;
  email: string | null;
  phone_number: string;
  birthday: string;
  gender: number;
  relationship: number;
  department_name?: string;
  company_name?: string;
  address?: string;
  detail_address?: string;
  zip_code?: string;
  employee_number?: string | null;
  user_grade?: number;
}

export interface UserResponse {
  message: string;
  data: {
    user: User;
  };
}

export interface FamilyResponse {
  message: string;
  data: {
    users: User[];
    total_count: number;
    remain_family_support_count: number;
  };
}

export interface Address {
  id: number;
  address: string;
  is_default: boolean;
}

export interface AddressResponse {
  message: string;
  data: {
    addresses: Address[];
  };
}
