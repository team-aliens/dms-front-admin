import { LogoBox } from '@/components/auth/LogoBox';
import { ResetPassword } from '@/components/auth/ResetPassword';
import { _FlexWrapper } from '@/components/common/flexWrapper';

export function ResetPasswordPage() {
  return (
    <_FlexWrapper>
      <LogoBox />
      <ResetPassword />
    </_FlexWrapper>
  );
}
