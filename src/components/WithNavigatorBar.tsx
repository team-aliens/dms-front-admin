import { NavigatorBar } from '@team-aliens/design-system';
import styled from 'styled-components';
import React, { useMemo } from 'react';
import { getCookie } from '@/utils/cookies';
import { ServiceToKorean } from '@/utils/translate';

interface PropsType {
  children: React.ReactNode;
}

export function WithNavigatorBar({ children }: PropsType) {
  const services: ServiceToKorean[] = useMemo(
    () => (getCookie('service').split(',') as ServiceToKorean[]).filter((i) => i),
    [getCookie('service'), getCookie('access_token')],
  );
  return (
    <_Wrapper>
      <NavigatorBar navList={services} />
      {children}
    </_Wrapper>
  );
}

const _Wrapper = styled.div`
  display: flex;
`;
