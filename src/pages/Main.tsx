import styled from 'styled-components';
import { NavigatorBar } from 'aliens-design-system-front';
import {  useState } from 'react';
import { StudentList } from '@/components/main/StudentList';
import { Divider } from '@/components/main/Divider';
import { StudentDetail } from '@/components/main/DetailBox/StudentDetail';
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
  // useEffect(() => {
  //   getStudentDetail(selectedStudentId)
  //     .then((res) => setStudentDetail(res))
  //     .catch((err) => {});
  // }, [selectedStudentId]);
  return (
    <_Flex>
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
    </_Flex>
  );
}

const _Flex = styled.div`
  display: flex;
`;

const _Wrapper = styled.div`
  display: flex;
  margin: 160px auto 0 auto;
`;
