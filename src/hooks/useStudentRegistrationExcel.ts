import { studentAccountIssuance } from '@/apis/files';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { useToast } from './useToast';

export const useStudentAccountIssuance = (
  file: FileList[0],
  closeModal: () => void,
) => {
  const { toastDispatch } = useToast();

  return useMutation(() => studentAccountIssuance(file), {
    onSuccess: () => {
      toastDispatch({
        actionType: 'APPEND_TOAST',
        toastType: 'SUCCESS',
        message: '엑셀이 업로드 되었습니다.',
      });
      closeModal();
    },
    onError: (e: AxiosError<{ message: string }>) => {
      if (e.response.data.message === 'Bas Excel Format') {
        toastDispatch({
          actionType: 'APPEND_TOAST',
          toastType: 'ERROR',
          message: '올바른 데이터 형식이 아닙니다.',
        });
      } else {
        toastDispatch({
          actionType: 'APPEND_TOAST',
          toastType: 'ERROR',
          message: '중복된 데이터가 존재합니다.',
        });
      }
    },
  });
};
