import { useState } from 'react';
import { Login } from '@/components/auth/Login';
import { AuthTemplate } from '@/components/auth/AuthTemplate';
import { useObj } from '@/hooks/useObj';
import { useForm } from '@/hooks/useForm';
import { LoginRequest } from '@/apis/auth/request';
import { useLoginMutation } from '@/hooks/useAuth';

const errorTypes = ['account_id', 'password'] as const;

const savedAccountId = localStorage.getItem('account_id');

export function LoginPage() {
  const [autoSave, setAutoSave] = useState<boolean>(savedAccountId && true);
  const onChangeAutoSaveStatus = (status: boolean) => {
    setAutoSave(status);
  };

  const { obj: errorMessages, changeObjectValue: changeErrorMessage } =
    useObj(errorTypes);

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
