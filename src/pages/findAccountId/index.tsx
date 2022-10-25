import styled from 'styled-components';
import { FindAccountId } from '@/components/auth/findAccount/FindAccountId';
import { LogoBox } from '@/components/auth/LogoBox';

export function FindAccountIdPage() {
  return (
    <_Wrapper>
      <LogoBox />
      <FindAccountId />
    </_Wrapper>
  );
}

const _Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
