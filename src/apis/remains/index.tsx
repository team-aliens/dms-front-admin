import { AxiosResponse } from 'axios';
import { instance } from '@/apis/axios';
import {
  createRemainBody,
  EditRemainBody,
  putRemainTimeBody,
} from '@/apis/remains/request';
import {
  getAllRemainTimeResponse,
  getRemainTimeResponse,
} from '@/apis/remains/response';

const router = '/remains';

export enum DAY {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}
export const putRemainTime = async (body: putRemainTimeBody) => {
  await instance.put(`${router}/available-time`, body);
};

export const getRemainTime = async () => {
  const { data } = await instance.get<getRemainTimeResponse>(
    `${router}/available-time`,
  );
  return data;
};

export const getAllRemain = async () => {
  const { data } = await instance.get<getAllRemainTimeResponse>(
    `${router}/options`,
  );
  return data;
};

export const createRemain = async (body: createRemainBody) => {
  await instance.post(`${router}/options`, body);
};

export const editRemain = async (body: EditRemainBody, path: string) => {
  await instance.patch(`${router}/options/${path}`, body);
};

export const deleteRemain = async (path: string) => {
  await instance.delete(`${router}/options/${path}`);
};

export const excelPrint = () => {
  instance
    .get(`${router}/status/file`, {
      responseType: 'blob',
    })
    .then((res: AxiosResponse<Blob>) => {
      const url = URL.createObjectURL(
        new Blob([res.data], { type: res.headers['content-type'] }),
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', '학생 잔류 신청 내역.xlsx');
      document.body.appendChild(link);
      link.click();
    });
};
