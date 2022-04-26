export interface UserInfoModel {
    id: number
    email: string
    phone: string
    password: string
    full_name: string
    status: string
    type: number
    channels: any
    avatar: any
    token_active: string
    timeExpried_active: string
    investor_reviews: any
    token_web: any
    token_app: string
    card_back: any
    front_facing_card: any
    identity: any
    created_by: string
    token_reset_password: any
    time_token_exprired_reset_password: any
    source: any
    data_source: any
    referral_code: any
    is_admin: number
    accuracy: number
    updated_by: any
    birthday: any
    type_payment: any
    created_at: number
    updated_at: number
    job: any
    tax_code: any
    city: any
    district: any
    ward: any
    last_login: string,
    address: string,
    sex: string,
    birth_date: string
  }
export interface InForUser {
    full_name: string;
    birthday: string;
    phone: string;
    job: string;
    tax_code: string;
    email: string;
    city: any,
    district: any,
    ward: any
}

  