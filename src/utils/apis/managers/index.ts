import { AxiosResponse } from 'axios';
import { instance } from '../axios';
import { FindAccountIdResponse } from './response';
import { ResetPasswordRequest } from './request';

const router = '/managers';

export const findAccountId = async (schoolId: string) => {
  const { data }: AxiosResponse<Promise<FindAccountIdResponse>> =
    await instance.get(`${router}/account-id/${schoolId}`);
  return data;
};

export const resetPassword = async (body: ResetPasswordRequest) => {
  await instance.patch(`${router}/password/initialization`, body);
};
