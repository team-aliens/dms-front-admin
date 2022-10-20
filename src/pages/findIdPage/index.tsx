import { FindId } from '@/components/auth/FindId';
import { LogoBox } from '@/components/auth/LogoBox';
import styled from 'styled-components';

export function FindIdPage() {
  return (
    <_Wrapper>
      <LogoBox />
      <FindId />
    </_Wrapper>
  );
}

const _Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
