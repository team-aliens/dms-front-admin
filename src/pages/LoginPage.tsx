import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { Login } from '@/components/auth/Login';
import { AuthTemplate } from '@/components/auth/AuthTemplate';
import { useToast } from '@/hooks/useToast';
import { useObj } from '@/hooks/useObj';
import { useForm } from '@/hooks/useForm';
import { LoginRequest } from '@/apis/auth/request';
import { login } from '@/apis/auth';
import { queryKeys } from '@/utils/queryKeys';

const errorTypes = ['account_id', 'password'] as const;

export function LoginPage() {
  const savedAccountId = localStorage.getItem('account_id');
  const navigate = useNavigate();
  const { toastDispatch } = useToast();
  const { obj: errorMessages, changeObjectValue: changeErrorMessage } =
    useObj(errorTypes);
  const { onHandleChange, state: loginState } = useForm<LoginRequest>({
    account_id: savedAccountId || '',
    password: '',
  });
  const [autoSave, setAutoSave] = useState<boolean>(savedAccountId && true);
  const onChangeAutoSaveStatus = (status: boolean) => {
    setAutoSave(status);
  };
  const loginMutation = useMutation(
    [queryKeys.로그인],
    () => login(loginState),
    {
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
      onSettled: () => (autoSave
        ? localStorage.setItem('account_id', loginState.account_id)
        : localStorage.removeItem('account_id')),
    },
  );
  const onClickLogin = () => {
    loginMutation.mutate();
  };
  return (
    <AuthTemplate>
      <Login
        onClickLogin={onClickLogin}
        onChangeAutoSaveStatus={onChangeAutoSaveStatus}
        onChange={onHandleChange}
        autoSave={autoSave}
        loginState={loginState}
        errorMessage={errorMessages}
        disabled={!(loginState.account_id && loginState.password)}
      />
    </AuthTemplate>
  );
}
