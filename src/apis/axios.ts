import axios, { AxiosError } from 'axios';
import { reIssueToken } from '@/apis/auth';
import { getCookie, setCookie } from '@/utils/cookies';

export const instance = axios.create({
  baseURL: `${process.env.APP_PUBLIC_URL}`,
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('access_token');
    const returnConfig = {
      ...config,
    };
    if (accessToken) {
      returnConfig.headers = {
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return returnConfig;
  },
  (error: AxiosError) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<AxiosError>) => {
    if (axios.isAxiosError(error) && error.response) {
      const { config } = error;
      const refreshToken = getCookie('refresh_token');
      if (
        error.response.data.message === 'Expired Token' ||
        error.response.data.message === 'Can Not Access'
      ) {
        if (refreshToken) {
          reIssueToken(refreshToken).then((res) => {
            const accessExpired = new Date(res.access_token_expired_at);
            const refreshExpired = new Date(res.refresh_token_expired_at);

            setCookie('access_token', res.access_token, {
              expires: accessExpired,
            });

            setCookie('refresh_token', res.refresh_token, {
              expires: refreshExpired,
            });

            if (config.headers) config.headers.Authorization = `Bearer ${res.access_token}`;
            return axios(config);
          });
        } else {
          window.location.href = '/login';
        }
      } else return Promise.reject(error);
    }
  },
);
