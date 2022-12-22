import { useState } from 'react';
import { Login } from '@/components/auth/Login';
import { AuthTemplate } from '@/components/auth/AuthTemplate';
import { useObj } from '@/hooks/useObj';
import { useForm } from '@/hooks/useForm';
import { LoginRequest } from '@/apis/auth/request';
import { useLoginMutation } from '@/hooks/useAuthApi';

interface ErrorPropsType {
  account_id: string;
  password: string;
}

const savedAccountId = localStorage.getItem('account_id');

export function LoginPage() {
  const [autoSave, setAutoSave] = useState<boolean>(savedAccountId && true);
  const onChangeAutoLogin = (status: boolean) => setAutoSave(status);

  const { obj: errorMessages, changeObjectValue: changeErrorMessage } =
    useObj<ErrorPropsType>({
      account_id: '',
      password: '',
    });

  const { onHandleChange, state: loginState } = useForm<LoginRequest>({
    account_id: savedAccountId || '',
    password: '',
  });

  const loginMutation = useLoginMutation({
    loginState,
    autoSave,
    changeErrorMessage,
  });

  return (
    <AuthTemplate>
      <Login
        onClickLogin={() => loginMutation.mutate()}
        onChangeAutoSaveStatus={onChangeAutoLogin}
        onChange={onHandleChange}
        autoSave={autoSave}
        loginState={loginState}
        errorMessage={errorMessages}
        disabled={!(loginState.account_id && loginState.password)}
      />
    </AuthTemplate>
  );
}
