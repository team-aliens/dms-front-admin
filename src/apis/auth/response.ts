type Features = 'notice_service' | 'menu_service';

type IsUseAbleFeature = {
  [key in Features]: boolean;
};

// 로그인, 토큰 재발급시 response
export interface AuthorizationResponse {
  access_token: string;
  expired_at: Date;
  refresh_token: string;
  features: IsUseAbleFeature;
}

export interface EmailDuplicateCheckResponse {
  email: string;
}
