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

const cookie = new Cookies();

export const getCookie = (name: string) => cookie.get<string>(name);

export const setCookie = (
  name: string,
  value: string,
  options?: CookieSetOptions,
) => {
  cookie.set(name, value, {
    ...options,
    path: '/',
  });
};
