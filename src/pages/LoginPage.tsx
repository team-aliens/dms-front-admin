import { Login } from '@/components/auth/Login';
import { AuthTemplate } from '@/components/auth/AuthTemplate';
import { useLogin } from '@/hooks/useLogin';

export function LoginPage() {
  const {
    onHandleChange,
    onChangeAutoSaveStatus,
    onClickLogin,
    loginState,
    autoSave,
    errorMessages,
  } = useLogin();
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
