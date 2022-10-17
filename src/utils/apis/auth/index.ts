import { AxiosResponse } from 'axios';
import { instance } from '../axios';
import {
  PostEmailAuthCodeRequest,
  LoginRequest,
  AuthCodeType,
} from './request';
import { AuthResponse, EmailDuplicateCheckResponse } from './response';

const router = '/auth';

export const login = async (body: LoginRequest) => {
  const { data }: AxiosResponse<Promise<AuthResponse>> = await instance.post(
    `${router}/tokens`,
    body,
  );
  return data;
};

export const postEmailAuthCode = async (body: PostEmailAuthCodeRequest) => {
  await instance.post(`${router}/code`, body);
};

export const checkEmailAuthCode = async (
  email: string,
  auth_code: string,
  type: AuthCodeType,
) => {
  await instance.get(
    `${router}/code?email=${email}&auth_code=${auth_code}&type=${type}`,
  );
};

export const tokenRefresh = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  const { data }: AxiosResponse<Promise<AuthResponse>> = await instance.post(
    `${router}/reissue`,
    null,
    {
      headers: {
        'refresh-token': refreshToken,
      },
    },
  );
  return data;
};

export const verificationEmail = async (account_id: string, email: string) => {
  await instance.get(`${router}/email?account_id=${account_id}&email=${email}`);
};

export const checkEmailDuplicate = async (account_id: string) => {
  const { data }: AxiosResponse<Promise<EmailDuplicateCheckResponse>> =
    await instance.get(`${router}/account-id&account_id=${account_id}`);
  return data;
};
