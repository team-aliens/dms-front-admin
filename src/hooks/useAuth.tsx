import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { resetPassword } from '@/apis/managers';
import { ResetPasswordRequest } from '@/apis/managers/request';
import { useToast } from '@/hooks/useToast';
import { LoginRequest } from '@/apis/auth/request';
import { checkEmailDuplicate, login } from '@/apis/auth';
import { useCookie } from '@/hooks/useCookie';

interface PropsType {
  resetPwdState: ResetPasswordRequest;
}

export const useResetPwdMutation = ({ resetPwdState }: PropsType) => {
  const { toastDispatch } = useToast();
  const navigate = useNavigate();

  return useMutation(() => resetPassword(resetPwdState), {
    onSuccess: () => {
      toastDispatch({
        actionType: 'APPEND_TOAST',
        toastType: 'SUCCESS',
        message: '비밀번호가 변경되었습니다.',
      });
      navigate('/');
    },
  });
};

interface LoginPropsType {
  loginState: LoginRequest;
  autoSave: boolean;
  changeErrorMessage: (type: string, message: string) => void;
}

export const useLoginMutation = ({
  loginState,
  autoSave,
  changeErrorMessage,
}: LoginPropsType) => {
  const { toastDispatch } = useToast();
  const navigate = useNavigate();
  const { setCookie } = useCookie();

  return useMutation(() => login(loginState), {
    onSuccess: (res) => {
      toastDispatch({
        actionType: 'APPEND_TOAST',
        toastType: 'SUCCESS',
        message: '로그인이 완료되었습니다.',
      });

      setCookie('access_token', res.access_token, {
        expires: res.access_token_expired_at,
      });

      if (autoSave) {
        setCookie('refresh_token', res.refresh_token, {
          expires: res.refresh_token_expired_at,
        });
      }
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

interface CheckEmailDuplicatePropsType {
  accountId: string;
}

export const useCheckEmailDuplicate = ({
  accountId,
}: CheckEmailDuplicatePropsType) => useMutation(() => checkEmailDuplicate(accountId));
