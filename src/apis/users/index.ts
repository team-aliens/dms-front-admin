import { instance } from '../axios';
import { ChangePasswordRequest } from './request';

const router = '/users';

export const changePassword = async (body: ChangePasswordRequest) => {
  await instance.patch(`${router}/password`, body);
};
