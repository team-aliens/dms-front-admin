import { LogoBox } from '@/components/auth/LogoBox';
import { Reset } from '@/components/auth/Reset';
import { _FlexWrapper } from '@/styles/flexWrapper';

export function ResetPage() {
  return (
    <_FlexWrapper>
      <LogoBox />
      <Reset />
    </_FlexWrapper>
  );
}
