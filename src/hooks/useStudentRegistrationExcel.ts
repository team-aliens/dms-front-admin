import { studentAccountIssuance } from '@/apis/files';
import { useMutation } from 'react-query';
import { useToast } from './useToast';

export const useStudentAccountIssuance = (file: FormData) => {
  const { toastDispatch } = useToast();

  return useMutation(() => studentAccountIssuance(file), {
    onSuccess: () => {
      toastDispatch({
        actionType: 'APPEND_TOAST',
        toastType: 'SUCCESS',
        message: '엑셀이 업로드 되었습니다.',
      });
    },
  });
};
