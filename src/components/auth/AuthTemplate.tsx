import styled from 'styled-components';
import { LogoBox } from '@/components/auth/LogoBox';

interface Props {
  children: React.ReactNode;
}

export function AuthTemplate({ children }: Props) {
  return (
    <_Wrapper>
      <LogoBox />
      {children}
    </_Wrapper>
  );
}

const _Wrapper = styled.div`
  display: flex;
`;
