import styled from 'styled-components';
import { Button } from 'aliens-design-system-front';
import { StudentInfo } from '@/components/main/DetailBox/StudentInfo';
import { PointBox } from '@/components/main/DetailBox/PointBox';
import { GetStudentDetailResponse } from '@/apis/managers/response';

interface Props {
  studentDetail: GetStudentDetailResponse;
  studentId: string;
}

export function StudentDetail({ studentDetail, studentId }: Props) {
  return (
    <_Wrapper>
      <_Title>학생 상세 확인</_Title>
      {studentDetail && studentId ? (
        <_DetailBox>
          <StudentInfo />
          <_PointWrapper>
            <PointBox pointType="BONUS" point={studentDetail.bonus_point} />
            <PointBox pointType="MINUS" point={studentDetail.minus_point} />
          </_PointWrapper>
          <_Roomates>
            <p>동일 호실 학생</p>
            <_MateList>
              {studentDetail.room_mates.map((item) => (
                <Button type="outline" onClick={() => {}} color="gray">
                  {item.name}
                </Button>
              ))}
            </_MateList>
          </_Roomates>
        </_DetailBox>
      ) : (
        <_NotSelected>
          학생 목록에서 선택하여 상세 내용을 확인하세요.
        </_NotSelected>
      )}
    </_Wrapper>
  );
}

const _Wrapper = styled.div`
  margin: 10px 0 0 40px;
`;

const _Title = styled.h1`
  font-size: ${({ theme }) => theme.titleFont.s.size}px;
  font-weight: ${({ theme }) => theme.titleFont.s.weight};
  color: ${({ theme }) => theme.color.gray6};
`;

const _DetailBox = styled.div`
  margin-top: 43px;
  padding: 60px;
  width: 476px;
  height: 525px;
  display: flex;
  flex-direction: column;
`;
const _NotSelected = styled.p`
  font-size: ${({ theme }) => theme.textFont.l.size}px;
  font-weight: ${({ theme }) => theme.textFont.l.weight};
  color: ${({ theme }) => theme.color.gray5};
  width: 180px;
  margin-top: 40px;
`;

const _PointWrapper = styled.div`
  display: flex;
  margin-top: 40px;
  > div {
    :last-child {
      margin-left: auto;
    }
  }
`;
const _Roomates = styled.div`
  margin-top: 60px;
  > p {
    font-size: ${({ theme }) => theme.textFont.s.size}px;
    font-weight: ${({ theme }) => theme.textFont.s.weight};
    color: ${({ theme }) => theme.color.gray6};
  }
`;
const _MateList = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 8px;
  > button {
    font-weight: 600;
  }
`;
