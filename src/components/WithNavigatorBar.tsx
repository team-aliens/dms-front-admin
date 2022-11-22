import { NavigatorBar } from 'aliens-design-system-front';
import styled from 'styled-components';
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

export const WithNavigatorBar = ({ children }: Props) => {
  const { pathname } = useLocation();
  return (
    <_Flex>
      <NavigatorBar
        Link={Link}
        navList={['홈', '신청', '공지', '설문', '분실문', '마이페이지']}
        pathname={pathname}
      />
      {children}
    </_Flex>
  );
};

const _Flex = styled.div`
  display: flex;
`;
