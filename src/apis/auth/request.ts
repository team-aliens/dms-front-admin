export interface LoginRequest {
  account_id: string;
  password: string;
}

// 이메일 인증 타입
export type AuthCodeType = 'SIGNUP' | 'PASSWORD';

// 이메일 인증번호 보내기 body
export interface PostEmailAuthCodeRequest {
  email: string;
  type: AuthCodeType;
}
