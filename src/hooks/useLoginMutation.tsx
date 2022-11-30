import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { login } from '@/apis/auth';
import { LoginRequest } from '@/apis/auth/request';
import { useToast } from '@/hooks/useToast';

interface PropsType {
  loginState: LoginRequest;
  autoSave: boolean;
  changeErrorMessage: (type: string, message: string) => void;
}

export const useLoginMutation = ({
  loginState,
  autoSave,
  changeErrorMessage,
}: PropsType) => {
  const { toastDispatch } = useToast();
  const navigate = useNavigate();
  return useMutation(() => login(loginState), {
    onSuccess: (res) => {
      toastDispatch({
        actionType: 'APPEND_TOAST',
        toastType: 'SUCCESS',
        message: '로그인이 완료되었습니다.',
      });
      localStorage.setItem('access_token', res.access_token);
      if (autoSave) localStorage.setItem('refresh_token', res.refresh_token);
      navigate('/');
    },
    onError: (err: AxiosError) => {
      if (err.response.status === 404) {
        changeErrorMessage('account_id', '존재하지 않는 사용자입니다.');
      } else if (err.response.status === 401) {
        changeErrorMessage('password', '비밀번호가 일치하지 않습니다.');
      }
    },
    onSettled: () => {
      autoSave
        ? localStorage.setItem('account_id', loginState.account_id)
        : localStorage.removeItem('account_id');
    },
  });
};
