import { getFileNameFromContentDisposition } from './../../utils/decoder';
import { MutationOptions, useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useModal } from '@/hooks/useModal';
import { instance } from '..';
import {
  AllPointListResponse,
  AllPointsOptionResponse,
  StudentPointHistoryResponse,
} from './response';
import { useToast } from '@/hooks/useToast';
import fileSaver from 'file-saver';

const router = '/points';

export type PointType = 'ALL' | 'BONUS' | 'MINUS';
export enum PointEnum {
  ALL = '전체',
  BONUS = '상점',
  MINUS = '벌점',
}

/** 학생 상/벌점 내역 조회 */
export const getStudentPointHistory = async (
  student_id: string,
  page?: number,
  size?: number,
) => {
  if (student_id !== '') {
    const { data } = await instance.get<Promise<StudentPointHistoryResponse>>(
      `${router}/history/students/${student_id}${
        page || size ? `?page=${page}&size=${size}` : ''
      }`,
    );
    return data;
  }
};

/** 상/벌점 전체 조회 */
export const getAllPoints = async () => {
  const { data } = await instance.get<Promise<AllPointsOptionResponse>>(
    `${router}/options`,
  );
  return data;
};

/** 전체 상/벌점 내역 보기 */
export const getAllPointHistory = async (type: PointType) => {
  const { data } = await instance.get<Promise<AllPointListResponse>>(
    `${router}/history?type=${type}`,
  );
  return data;
};

export const cancelPointHistory = async (point_history_id: string) => {
  await instance.put(`${router}/history/${point_history_id}`);
};

export const useDownloadPointHistoryExcel = () =>
  useMutation(
    () =>
      instance.get(`${router}/history/file`, {
        responseType: 'arraybuffer',
      }),
    {
      onSuccess: (res) => {
        const blob = new Blob([res.data], {
          type: res.headers['content-type'],
        });
        const fileName = res.headers['content-disposition'];

        fileSaver.saveAs(blob, getFileNameFromContentDisposition(fileName));
      },
    },
  );

export const useGivePointOption = (
  selectedPointOption: string,
  selectedStudentId: string[],
  options?: MutationOptions,
) => {
  const body = {
    point_option_id: selectedPointOption,
    student_id_list: selectedStudentId,
  };
  return useMutation(async () => instance.post(`${router}/history`, body), {
    ...options,
  });
};

export const useAddPointOption = (
  score: number,
  name: string,
  type: string,
  options?: MutationOptions,
) => {
  const types = type === '상점' ? 'BONUS' : 'MINUS';
  const body = {
    type: types,
    score,
    name,
  };

  return useMutation(async () => instance.post(`${router}/options`, body), {
    ...options,
  });
};

export const useEditPointOption = (
  id: string,
  score: number,
  name: string,
  type: string,
  options?: MutationOptions,
) => {
  const types = type === '상점' ? 'BONUS' : 'MINUS';
  const { toastDispatch } = useToast();
  const body = {
    type: types,
    score: Number(score),
    name,
  };
  return useMutation(
    async () => instance.patch(`${router}/options/${id}`, body),
    {
      ...options,
    },
  );
};

export const useDeletePointOption = (id: string, options?: MutationOptions) => {
  const navigate = useNavigate();
  const { toastDispatch } = useToast();
  return useMutation(
    async () => await instance.delete(`${router}/options/${id}`),
    {
      ...options,
    },
  );
};
