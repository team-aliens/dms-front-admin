import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { findId } from '@/apis/managers';
import { useToast } from '@/hooks/useToast';

interface PropsType {
  selectedId: string;
  answer: string;
}

export const useFindId = ({ selectedId, answer }: PropsType) => {
  const { toastDispatch } = useToast();
  const navigate = useNavigate();

  return useMutation(() => findId(selectedId, answer)
    .then((res) => {
      toastDispatch({
        actionType: 'APPEND_TOAST',
        toastType: 'SUCCESS',
        message: `${res.email}으로 아이디가 발송되었습니다.`,
      });
      navigate('/login');
    })
    .catch(() => {
      toastDispatch({
        actionType: 'APPEND_TOAST',
        toastType: 'ERROR',
        message: '학교 인증 질문과 답변이 일치하지 않습니다.',
      });
    }));
};
