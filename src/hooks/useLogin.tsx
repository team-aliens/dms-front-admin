import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from '@/hooks/useToast';
import { login } from '@/apis/auth';
import { useObj } from '@/hooks/useObj';
import { useForm } from '@/hooks/useForm';
import { LoginRequest } from '@/apis/auth/request';

interface Props {}

const errorTypes = ['account_id', 'password'] as const;

export const useLogin = () => {
  const savedAccountId = localStorage.getItem('account_id');

  const navigate = useNavigate();

  const { toastDispatch } = useToast();

  const [autoSave, setAutoSave] = useState<boolean>(savedAccountId && true);

  const { obj: errorMessages, changeObjectValue: changeErrorMessage } =
    useObj(errorTypes);

  const { onHandleChange, state: loginState } = useForm<LoginRequest>({
    account_id: savedAccountId || '',
    password: '',
  });

  const onChangeAutoSaveStatus = (status: boolean) => {
    setAutoSave(status);
  };
  const loginMutation = useMutation(() => login(loginState), {
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
  const onClickLogin = () => {
    loginMutation.mutate();
  };
  return {
    onClickLogin,
    onChangeAutoSaveStatus,
    onHandleChange,
    autoSave,
    loginState,
    errorMessages,
  };
};
