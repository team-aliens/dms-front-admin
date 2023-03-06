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

type CookieType = 'access_token' | 'refresh_token' | 'navList' | 'service';

export const getCookie = (name: CookieType) => cookie.get<string>(name);

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
