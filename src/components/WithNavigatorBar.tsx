import { NavigatorBar } from 'aliens-design-system-front';
import styled from 'styled-components';
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface PropsType {
  children: ReactNode;
}

export function WithNavigatorBar({ children }: PropsType) {
  const { pathname } = useLocation();
  return (
    <_Wrapper>
      <NavigatorBar
        Link={Link}
        navList={['홈', '신청', '공지', '설문', '분실문', '마이페이지']}
        pathname={pathname}
      />
      {children}
    </_Wrapper>
  );
}

const _Wrapper = styled.div`
  display: flex;
`;
