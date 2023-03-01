import { instance } from '../axios';
import { AllPointListResponse, StudentPointHistoryResponse } from './response';

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
