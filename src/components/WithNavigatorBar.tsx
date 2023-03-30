import { NavigatorBar } from '@team-aliens/design-system';
import styled from 'styled-components';
import React, { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { getCookie } from '@/utils/cookies';
import { ServiceToKorean } from '@/utils/translate';
import { useAvailAbleFeatures } from '@/hooks/useSchoolsApi';
import { setUseableFeatures } from '@/utils/setUseableFeatures';

interface PropsType {
  children: React.ReactNode;
}

export function WithNavigatorBar({ children }: PropsType) {
  const location = useLocation();
  const { data } = useAvailAbleFeatures();

  useEffect(() => {
    getCookie('service') || setUseableFeatures(data);
  }, [getCookie('service')]);

  const services: ServiceToKorean[] = useMemo(
    () =>
      ((getCookie('service') || '').split(',') as ServiceToKorean[]).filter(
        (i) => i,
      ),
    [getCookie('service'), getCookie('access_token'), location],
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
