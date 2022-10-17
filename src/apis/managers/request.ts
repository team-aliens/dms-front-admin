export interface ResetPasswordRequest {
  account_id: string;
  email: string;
  auth_code: string;
  new_password: string;
}
