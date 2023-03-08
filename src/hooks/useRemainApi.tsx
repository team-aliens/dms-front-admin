import { useMutation, useQuery } from 'react-query';
import {
  createRemain,
  deleteRemain,
  editRemain,
  getAllRemain,
  getRemainTime,
  putRemainTime,
} from '@/apis/remains';
import { useToast } from '@/hooks/useToast';
import {
  createRemainBody,
  EditRemainBody,
  putRemainTimeBody,
} from '@/apis/remains/request';

export const useGetAllRemains = () =>
  useQuery(['getAllRemains'], () => getAllRemain(), {
    refetchOnWindowFocus: true,
  });

export const useCreateRemain = (body: createRemainBody) => {
  const { toastDispatch } = useToast();

  return useMutation(() => createRemain(body), {
    onSuccess: () => {
      toastDispatch({
        actionType: 'APPEND_TOAST',
        toastType: 'SUCCESS',
        message: '잔류 항목이 추가되었습니다.',
      });
    },
  });
};

export const useGetRemainTime = () =>
  useQuery(['getRemainTime'], getRemainTime, {
    refetchOnWindowFocus: true,
  });
export const useSetRemainTime = (body: putRemainTimeBody) =>
  useMutation(() => putRemainTime(body));
export const useDeleteRemain = (id: string) => {
  const { toastDispatch } = useToast();

  return useMutation(() => deleteRemain(id), {
    onSuccess: () => {
      toastDispatch({
        actionType: 'APPEND_TOAST',
        toastType: 'SUCCESS',
        message: '잔류 항목이 삭제되었습니다.',
      });
    },
  });
};
export const useEditRemain = (id: string, body: EditRemainBody) => {
  const { toastDispatch } = useToast();

  return useMutation(() => editRemain(body, id), {
    onSuccess: () => {
      toastDispatch({
        actionType: 'APPEND_TOAST',
        toastType: 'SUCCESS',
        message: '잔류 항목이 수정되었습니다.',
      });
    },
  });
};
