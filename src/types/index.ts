interface PaginatedResponseType {
  links: { next: string; previous: string };
  page: number;
  page_size: number;
  total: number;
}

export interface IAuthDetails {
  token: string;
  user?: unknown;
}

export interface AssociationType {
  about_us: string;
  contact_number: string;
  created_at: string;
  created_date: string;
  deleted_at: string;
  description: string;
  district: string;
  email: string;
  id: number;
  idx: string;
  is_active: boolean;
  is_deleted: boolean;
  mission: string;
  name: string;
  office_address: string;
  office_municipality: string;
  parent: number;
  total_events: number;
  total_plans: number;
  updated_at: string;
  user: number;
  vision: string;
  ward: number;
}

export interface EventType {
  association: number;
  created_at: string;
  created_date: string;
  deleted_at: string;
  end_date: string;
  fees: {
    amount_cents: number;
    association: number;
    created_at: string;
    created_date: string;
    currency: "npr" | "usd";
    id: number;
    idx: string;
    is_active: boolean;
    name: string;
    updated_at: string;
  }[];
  id: number;
  idx: string;
  image: string;
  is_active: boolean;
  is_deleted: boolean;
  long_description: string;
  name: string;
  short_description: string;
  start_date: string;
  updated_at: string;
  venue: string;
}

export interface EventResponseType extends PaginatedResponseType {
  results: EventType[];
}

export interface AssociationResponseType extends PaginatedResponseType {
  results: AssociationType[];
}

export interface AccountType {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface AddressResponseType {
  message: string;
  details: {
    id: number;
    title: string;
  }[];
}

// New

export interface ListType<T> {
  count: number;
  next: any;
  previous: any;
  results: T[];
}

export interface UserResponseType {
  idx: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  is_active: string;
}

export interface UserType {
  idx: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  isActive: boolean;
}

export interface InterventionResponseType {
  idx: string;
  title: string;
  description: string;
  is_active: boolean;
}

export interface InterventionType {
  idx: string;
  title: string;
  description: string;
  isActive: boolean;
}

// posts
export interface IPostResponseType {
  idx: string;
  title: string;
  description: string;
  created_at: string;
  category: ICategoryType[];
  location_coordinate: string;
  muncipality: number;
  post_type: string;
  is_enabled: boolean;
  created_by: ICreatedByResponseType;
  directed_to: string;
  state: string;
  total_saved: number;
  total_shared: number;
  total_supporters: number;
  total_opposers: number;
  images: any[];
}

export interface ICategoryType {
  title: string;
  description: string;
}

export interface ICreatedByResponseType {
  idx: string;
  email: string;
  full_name: string;
  following: boolean;
}
