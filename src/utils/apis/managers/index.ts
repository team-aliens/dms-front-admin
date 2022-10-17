import { AxiosResponse } from 'axios';
import { instance } from '../axios';
import { FindAccountIdResponse } from './response';
import { ResetPasswordRequest } from './request';

const router = '/managers';

// 아이디 찾기
export const findAccountId = async (schoolId: string) => {
  const { data }: AxiosResponse<Promise<FindAccountIdResponse>> =
    await instance.get(`${router}/account-id/${schoolId}`);
  return data;
};

// 비밀번호 재설정
export const resetPassword = async (body: ResetPasswordRequest) => {
  await instance.patch(`${router}/password/initialization`, body);
};
