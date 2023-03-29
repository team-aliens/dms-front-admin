import { deleteTag, tagList } from '@/apis/tags';
import { useMutation, useQuery } from 'react-query';
import { useToast } from './useToast';

export const useTagList = () => useQuery(['tags'], tagList);

export const useDeleteStudentTag = (
  student_id: string,
  tag_id: string,
  refetchSearchStudents?: () => void,
  refetchStudentDetail?: () => void,
) => {
  const { toastDispatch } = useToast();

  return useMutation(() => deleteTag(student_id, tag_id), {
    onSuccess: () => {
      toastDispatch({
        actionType: 'APPEND_TOAST',
        message: '태그가 삭제되었습니다.',
        toastType: 'SUCCESS',
      });
      refetchSearchStudents();
      refetchStudentDetail();
    },
    onError: () => {
      toastDispatch({
        actionType: 'APPEND_TOAST',
        message: '태그 삭제에 실패하였습니다.',
        toastType: 'ERROR',
      });
    },
  });
};
