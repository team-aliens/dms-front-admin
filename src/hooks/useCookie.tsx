import { Cookies } from 'react-cookie';

export interface CookieSetOptions {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: boolean | 'none' | 'lax' | 'strict';
  encode?: (value: string) => string;
}

export const useCookie = () => {
  const cookie = new Cookies();

  const getCookie = (name: string) => cookie.get<string>(name);
  const setCookie = (
    name: string,
    value: string,
    options: CookieSetOptions,
  ) => {
    cookie.set(name, value, options);
  };
  return {
    getCookie,
    setCookie,
  };
};
