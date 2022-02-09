export interface IUserModel {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  created_at?: string;
  updated_at?: string;
}

export interface IUserOptionalModel {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  role?: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
}
