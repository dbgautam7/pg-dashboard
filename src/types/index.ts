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
  id?: number | string;
  payment_config_id: number;
  name: string;
  parameter: string;
  value: string;
  comment: string;
}

export interface IPayTransactionList {
  id?: number;
  order_number: string;
  detail_order_number: string;
  gateway: string;
  username: string;
  amount: number;
  status: string;
  created_at: Date;
  updated_at: Date;
  ct_merchant_id: number;
  member_id: number;
  response: null;
}

export interface ISelectOptions {
  value: string | number;
  label: string;
}

export interface IRadioButtonProps {
  filterOptions: ISelectOptions[];
  selectedFilter: ISelectOptions;
  setSelectedFilter: (option: ISelectOptions) => void;
}

export interface IDateRangeSelectOptions {
  label: string;
  startDate: Date;
  endDate: Date;
}
