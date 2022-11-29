import styled from 'styled-components';
import { useEffect, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { StudentList } from '@/components/main/StudentList';
import { Divider } from '@/components/main/Divider';
import { StudentDetail } from '@/components/main/DetailBox/StudentDetail';
import { GetStudentDetailResponse } from '@/apis/managers/response';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import { getStudentDetail } from '@/apis/managers';

export function Home() {
  const [studentDetail, setStudentDetail] =
    useState<GetStudentDetailResponse>();
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');

  useEffect(() => {
    getStudentDetail(selectedStudentId)
      .then((res) => setStudentDetail(res))
      .catch(() => {});
  }, [selectedStudentId]);

  return (
    <WithNavigatorBar>
      <_Wrapper>
        <StudentList
          setSelectedStudentId={setSelectedStudentId}
          selectedStudentId={selectedStudentId}
        />
        <Divider />
        <OutsideClickHandler
          onOutsideClick={(e: MouseEvent) => {
            const { className } = e.target as Element;
            const isClickAbleElement =
              className.includes('studentBox') ||
              className.includes('filterButton') ||
              className.includes('searchBox');
            if (!isClickAbleElement) setSelectedStudentId('');
          }}
        >
          <StudentDetail
            studentDetail={studentDetail}
            studentId={selectedStudentId}
          />
        </OutsideClickHandler>
      </_Wrapper>
    </WithNavigatorBar>
  );
}

const _Wrapper = styled.div`
  display: flex;
  margin: 160px auto 0 auto;
`;
