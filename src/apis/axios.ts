import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://3.39.162.197:8080/',
  timeout: 10000,
});
