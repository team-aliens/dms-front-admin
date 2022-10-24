import styled from 'styled-components';
import { NavigatorBar } from 'aliens-design-system-front';
import { useEffect, useState } from 'react';
import { StudentList } from '@/components/main/StudentList';
import { Divider } from '@/components/main/Divider';
import { _FlexWrapper } from '@/styles/flexWrapper';
import { StudentDetail } from '@/components/main/DetailBox/StudentDetail';
import { getStudentDetail } from '@/apis/managers';
import { GetStudentDetailResponse } from '@/apis/managers/response';

const feature = {
  point_service: true,
  apply_service: true,
  notice_service: true,
  survey_service: true,
  lost_service: true,
  my_page: true,
  meal_service: false,
};

export function Main() {
  const [studentDetail, setStudentDetail] =
    useState<GetStudentDetailResponse>();
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  useEffect(() => {
    getStudentDetail(selectedStudentId)
      .then((res) => setStudentDetail(res))
      .catch((err) => {});
  }, [selectedStudentId]);
  return (
    <_FlexWrapper>
      <NavigatorBar features={feature} />
      <_Wrapper>
        <StudentList
          setSelectedStudentId={setSelectedStudentId}
          selectedStudentId={selectedStudentId}
        />
        <Divider />
        <StudentDetail
          studentDetail={studentDetail}
          studentId={selectedStudentId}
        />
      </_Wrapper>
    </_FlexWrapper>
  );
}

const _Wrapper = styled.div`
  display: flex;
  margin-top: 160px;
`;
