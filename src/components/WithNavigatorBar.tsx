import { NavigatorBar } from 'aliens-design-system-front';
import styled from 'styled-components';
import React from 'react';

const feature = {
  point_service: true,
  apply_service: true,
  notice_service: true,
  survey_service: true,
  lost_service: true,
  my_page: true,
  meal_service: false,
};

interface Props {
  children: React.ReactNode;
}

export const WithNavigatorBar = ({ children }: Props) => {
  return (
    <_Flex>
      <NavigatorBar features={feature} />
      {children}
    </_Flex>
  );
};

const _Flex = styled.div`
  display: flex;
  overflow: hidden;
`;
