import styled from 'styled-components';
import { NavigatorBar } from 'aliens-design-system-front';
import { _FlexWrapper } from '@/styles/flexWrapper';
import { StudentList } from './studentList/StudentList';
import { DetailStudent } from './DetailStudent';

const feature = {
  point_service: true,
  apply_service: true,
  notice_service: true,
  survey_service: true,
  lost_service: true,
  my_page: true,
  meal_service: false,
};

export function Home() {
  return (
    <_FlexWrapper>
      <NavigatorBar features={feature} />
      <_HomeWrapper>
        <StudentList />
        <DetailStudent />
      </_HomeWrapper>
    </_FlexWrapper>
  );
}

const _HomeWrapper = styled.div`
  display: flex;
  margin: 0 auto;
`;
