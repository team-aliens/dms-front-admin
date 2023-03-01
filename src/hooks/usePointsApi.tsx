import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import {
  cancelPointHistory,
  getAllPointHistory,
  getAllPoints,
  getStudentPointHistory,
  PointType,
} from '@/apis/points';

export const useAllPointHistory = (pointType: PointType) =>
  useQuery(
    ['getAllPointHistory', pointType],
    () => getAllPointHistory(pointType),
    {
      refetchOnWindowFocus: true,
    },
  );

export const useStudentPointHistory = (student_id: string) =>
  useQuery(
    ['getStudentPointHistory', student_id],
    () => getStudentPointHistory(student_id),
    {
      refetchOnWindowFocus: true,
    },
  );

  export const usePointOptionList = () =>
  useQuery(
    ['usePointList'],
    () => getAllPoints(),
    {
      refetchOnWindowFocus: true,
    },
  );

export const useCancelPointHistory = (point_history_id: string) => {
  const navigate = useNavigate();
  return useMutation(() => cancelPointHistory(point_history_id), {
    onSuccess: () => navigate('/'),
  });
};

// export const useDownLoadExcelFile = () =>
//   useQuery(['document-download'], getAllPointExcel);
