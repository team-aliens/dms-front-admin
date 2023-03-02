import { useModal } from '@/hooks/useModal';
import { useMutation } from 'react-query';
import { instance } from '../axios';
import {
  AllPointListResponse,
  AllPointsOptionResponse,
  StudentPointHistoryResponse,
} from './response';

const router = '/points';

export type PointType = 'ALL' | 'BONUS' | 'MINUS';
export enum PointEnum {
  ALL = '전체',
  BONUS = '상점',
  MINUS = '벌점',
}

/** 학생 상/벌점 내역 조회 */
export const getStudentPointHistory = async (student_id: string) => {
  const { data } = await instance.get<Promise<StudentPointHistoryResponse>>(
    `${router}/history/students/${student_id}`,
  );
  return data;
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

// export const getAllPointExcel = async () => {
//   const { data } = await instance.get(`${router}/history/files`, {
//     responseType: 'blob',
//   });
//   return new Blob(data);
// };

export const useGivePointOption = (
  selectedPointOption: string,
  selectedStudentId: string,
) => {
  const body = {
    point_option_id: selectedPointOption,
    student_id_list: selectedStudentId,
  };
  return useMutation(async () => instance.post(`${router}/history`, body), {});
};

export const useAddPointOption = (
  score: number,
  name: string,
  type: string,
) => {
  const types = type === '상점' ? 'BONUS' : 'MINUS';
  const body = {
    type: types,
    score: score,
    name: name,
  };
  return useMutation(async () => instance.post(`${router}/options`, body), {});
};

export const useEditPointOption = (
  id: string,
  score: number,
  name: string,
  type: string,
) => {
  const types = type === '상점' ? 'BONUS' : 'MINUS';
  const { closeModal } = useModal();
  const body = {
    type: types,
    score: Number(score),
    name: name,
  };
  return useMutation(
    async () => instance.patch(`${router}/options/${id}`, body),
    { onSuccess: () => closeModal() },
  );
};
