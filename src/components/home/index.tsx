import styled from 'styled-components';
import { StudentList } from './studentList/StudentList';
import { _FlexWrapper } from '../common/flexWrapper';
import { DetailStudent } from './DetailStudent';

export function Home() {
  return (
    <_FlexWrapper>
      <StudentList />
      <DetailStudent />
    </_FlexWrapper>
  );
}
