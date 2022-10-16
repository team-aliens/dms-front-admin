export interface LoginRequest {
  account_id: string;
  password: string;
}

export type AuthCodeType = 'SIGNUP' | 'ACCOUNT_ID' | 'PASSWORD';

export interface PostEmailAuthCodeRequest {
  email: string;
  type: AuthCodeType;
}
