import { TitleBox } from '../../components/auth/titleBox/index';
import { Login } from '../../components/auth/login/Login';
import { LogoBox } from '../../components/auth/logoBox/index';

export function LoginPage() {
  return (
    <div>
      <LogoBox />
      <TitleBox />
      <Login />
    </div>
  );
}
