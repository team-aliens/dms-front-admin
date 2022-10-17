import axios from 'axios';

export const instance = axios.create({
  baseURL: 'baseURL',
  timeout: 10000,
});
