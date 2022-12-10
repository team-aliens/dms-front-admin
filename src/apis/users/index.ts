import { instance } from '../axios';
import { ChangePasswordRequest } from './request';

const router = '/users';

export const changePwd = async (body: ChangePasswordRequest) => {
  await instance.patch(`${router}/password`, body);
};

export const checkPwd = async (password: string) => {
  await instance.get(`${router}/password?password=${password}`);
};
