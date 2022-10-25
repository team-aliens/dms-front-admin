import { FindAccountId } from '@/components/auth/FindAccountId';
import { LogoBox } from '@/components/auth/LogoBox';
import styled from 'styled-components';

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
