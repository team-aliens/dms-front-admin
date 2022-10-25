import { Login } from '@/components/auth/Login';
import { AuthTemplate } from '@/components/auth/AuthTemplate';

export function LoginPage() {
  return (
    <AuthTemplate>
      <Login />
    </AuthTemplate>
  );
}
