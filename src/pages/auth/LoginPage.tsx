import { Login } from '@/components/auth/Login';
import { LogoBox } from '@/components/auth/LogoBox';
import { _FlexWrapper } from '@/styles/flexWrapper';

export function LoginPage() {
  return (
    <_FlexWrapper>
      <LogoBox />
      <Login />
    </_FlexWrapper>
  );
}
