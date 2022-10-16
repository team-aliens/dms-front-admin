type Features = 'notice_service' | 'menu_service';

type IsUseAbleFeature = {
  [key in Features]: boolean;
};

export interface AuthResponse {
  access_token: string;
  expired_at: Date;
  refresh_token: string;
  features: IsUseAbleFeature;
}

export interface EmailDuplicateCheckResponse {
  email: string;
}
