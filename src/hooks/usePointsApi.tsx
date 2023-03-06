import { MutationOptions, useMutation, useQuery } from 'react-query';
import {
  cancelPointHistory,
  getAllPointHistory,
  getAllPoints,
  getStudentPointHistory,
  PointType,
} from '@/apis/points';
import { pagePath } from '@/utils/pagePath';

export const useAllPointHistory = (pointType: PointType) =>
  useQuery(
    ['getAllPointHistory', pointType],
    () => getAllPointHistory(pointType),
    {
      refetchOnWindowFocus: true,
    },
  );

export const useStudentPointHistory = (
  student_id: string,
  page?: number,
  size?: number,
) =>
  useQuery(
    [`getStudentPointHistory${student_id}`, student_id, page, size],
    () => getStudentPointHistory(student_id, page, size),
    {
      refetchOnWindowFocus: true,
    },
  );

export const usePointOptionList = () =>
  useQuery(['usePointList'], () => getAllPoints(), {
    refetchOnWindowFocus: true,
  });

export const useCancelPointHistory = (
  point_history_id: string,
  options?: MutationOptions,
) => {
  return useMutation(() => cancelPointHistory(point_history_id), {
    ...options,
  });
};
