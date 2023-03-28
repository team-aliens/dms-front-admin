import { setCookie } from './cookies';
import { serviceObjectToNavList } from '@/utils/serviceObjectToNavList';
import { IsUseAbleFeature } from './../apis/auth/response';
export const setUseableFeatures = (features: IsUseAbleFeature) => {
  const featureToArr = serviceObjectToNavList(features);
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 10);

  setCookie('service', featureToArr.toString(), {
    expires,
  });
};
