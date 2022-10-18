import { Login } from '@/components/auth/login/Login';
import { LogoBox } from '@/components/auth/logoBox';
import { _FlexWrapper } from '@/components/common/flexWrapper';

export function LoginPage() {
  return (
    <_FlexWrapper>
      <LogoBox />
      <Login />
    </_FlexWrapper>
  );
}
