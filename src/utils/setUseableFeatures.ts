import { setCookie } from './cookies';
import { serviceObjectToNavList } from '@/utils/serviceObjectToNavList';
import { IsUseAbleFeature } from './../apis/auth/response';
export const setUseableFeatures = (features: IsUseAbleFeature) => {
  const featureToArr = serviceObjectToNavList(features);
  setCookie('service', featureToArr.toString());
};
