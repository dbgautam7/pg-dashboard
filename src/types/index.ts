export interface IAuthDetails {
  token: string;
  user?: unknown;
}

export interface IUserData {
  id?: number;
  current_role_id?: number;
  created_by?: number;
  code?: null;
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  status?: string;
  status_remarks?: string;
  remember_token?: null;
  profile_image?: null;
  verified_at?: null;
  created_at?: Date;
  updated_at?: Date;
}

export interface ISystemConfigList {
  id: number;
  payment_config_id: number;
  name: string;
  parameter: string;
  value: string;
  comment: string;
}

export interface IPayTransactionList {
  ct_merchant_id: number;
  member_id: number;
  username: string;
  order_number: string;
  amount: number;
  response: string;
  status: boolean;
}

export interface ISelectOptions {
  value: string;
  label: string;
}
