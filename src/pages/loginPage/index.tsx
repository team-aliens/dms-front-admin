import { Login } from '../../components/auth/login/Login';
import { LogoBox } from '../../components/auth/logoBox/index';
import { _FlexWrapper } from '../../components/common/flexWrapper/index';

export function LoginPage() {
  return (
    <_FlexWrapper>
      <LogoBox />
      <Login />
    </_FlexWrapper>
  );
}
