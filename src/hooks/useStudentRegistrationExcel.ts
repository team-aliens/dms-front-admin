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
      toastDispatch({
        actionType: 'APPEND_TOAST',
        toastType: 'ERROR',
        message: e.message,
      });
    },
  });
};
