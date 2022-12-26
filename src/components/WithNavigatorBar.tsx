import { NavigatorBar } from '@team-aliens/design-system';
import styled from 'styled-components';
import React from 'react';

interface PropsType {
  children: React.ReactNode;
}

export function WithNavigatorBar({ children }: PropsType) {
  return (
    <_Wrapper>
      <NavigatorBar
        navList={['홈', '신청', '공지', '설문', '분실문', '마이페이지']}
      />
      {children}
    </_Wrapper>
  );
}

const _Wrapper = styled.div`
  display: flex;
`;
