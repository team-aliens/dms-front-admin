import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { findId, searchStudentList } from '@/apis/managers';
import { useToast } from '@/hooks/useToast';
import { queryKeys } from '@/utils/queryKeys';

interface PropsType {
  selectedId: string;
  answer: string;
}

export const useFindId = ({ selectedId, answer }: PropsType) => {
  const { toastDispatch } = useToast();
  const navigate = useNavigate();

  return useMutation(() => findId(selectedId, answer), {
    onSuccess: (res) => {
      toastDispatch({
        actionType: 'APPEND_TOAST',
        toastType: 'SUCCESS',
        message: `${res.email}으로 아이디가 발송되었습니다.`,
      });
      navigate('/login');
    },
    onError: () => {
      toastDispatch({
        actionType: 'APPEND_TOAST',
        toastType: 'ERROR',
        message: '학교 인증 질문과 답변이 일치하지 않습니다.',
      });
    },
  });
};

interface SearchStudentPropsType {
  name: string;
  sort: 'GCN' | 'NAME';
}

export const useSearchStudents = ({ name, sort }: SearchStudentPropsType) => useQuery([queryKeys.학생리스트조회, name, sort], () => searchStudentList(name, sort));
