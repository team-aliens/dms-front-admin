import { instance } from '../axios';
import {
  PostEmailAuthCodeRequest,
  LoginRequest,
  AuthCodeType,
} from './request';
import { AuthorizationResponse, EmailDuplicateCheckResponse } from './response';

const router = '/auth';

/** 로그인 */
export const login = async (body: LoginRequest) => {
  const { data } = await instance.post<AuthorizationResponse>(
    `${router}/tokens`,
    body,
  );
  return data;
};

export const reIssueToken = async (refreshToken: string) => {
  const { data } = await instance.put<AuthorizationResponse>(
    `${router}/reissue`,
    null,
    {
      headers: {
        'refresh-token': `${refreshToken}`,
      },
    },
  );
  return data;
};

/** 이메일 인증번호 보내기 */
export const postEmailAuthCode = async (body: PostEmailAuthCodeRequest) => {
  await instance.post(`${router}/code`, body);
};

/** 이메일 인증번호 확인 */
export const checkEmailAuthCode = async (
  email: string,
  auth_code: string,
  type: AuthCodeType,
) => {
  await instance.get(
    `${router}/code?email=${email}&auth_code=${auth_code}&type=${type}`,
  );
};

/** 이메일 검증 */
export const verificationEmail = async (account_id: string, email: string) => {
  await instance.get(`${router}/email?account_id=${account_id}&email=${email}`);
};

/** 아이디 존재 여부 확인(비밀번호 재설정) */
export const checkEmailDuplicate = async (account_id: string) => {
  const { data } = await instance.get<EmailDuplicateCheckResponse>(
    `${router}/account-id?account_id=${account_id}`,
  );
  return data;
};
