import {
  MutationOptions,
  useMutation,
  useQuery,
  UseQueryOptions,
} from 'react-query';
import {
  cancelPointHistory,
  getAllPointHistory,
  getAllPoints,
  getStudentPointHistory,
  PointType,
} from '@/apis/points';
import { StudentPointHistoryResponse } from '@/apis/points/response';

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
  options?: UseQueryOptions<StudentPointHistoryResponse>,
) =>
  useQuery(
    [`getStudentPointHistory_${student_id}`, student_id],
    () => getStudentPointHistory(student_id),
    options,
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
