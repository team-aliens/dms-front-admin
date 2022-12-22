import styled from 'styled-components';
import { Button, Text } from '@team-aliens/design-system';
import { StudentProfile } from '@/components/main/DetailBox/StudentInfo';
import { PointBox } from '@/components/main/DetailBox/PointBox';
import { GetStudentDetailResponse } from '@/apis/managers/response';

interface Props {
  studentDetail: GetStudentDetailResponse;
  studentId: string;
  onClickStudent: (id) => void;
}

export function StudentDetail({
  studentDetail,
  studentId,
  onClickStudent,
}: Props) {
  return (
    <_Wrapper isSelected={studentId !== ''}>
      <Text size="titleL" color="gray6">
        학생 상세 확인
      </Text>
      {studentId && studentDetail ? (
        <_DetailBox>
          <StudentProfile
            name={studentDetail.name}
            gcn={studentDetail.gcn}
            room_number={studentDetail.room_number}
            profile_image_url={studentDetail.profile_image_url}
          />
          <_PointWrapper>
            <PointBox pointType="BONUS" point={studentDetail.bonus_point} />
            <PointBox pointType="MINUS" point={studentDetail.minus_point} />
          </_PointWrapper>
          <Text size="bodyS" color="gray6" margin={['top', 40]}>
            동일 호실 학생
          </Text>
          <_MateList>
            {studentDetail.room_mates.map((item) => (
              <Button
                kind="outline"
                onClick={() => onClickStudent(item.id)}
                color="gray"
              >
                {item.name}
              </Button>
            ))}
          </_MateList>
        </_DetailBox>
      ) : (
        <_NotSelected
          size="bodyL"
          color="gray5"
          display="block"
          margin={['top', 40]}
        >
          학생 목록에서 선택하여 상세 내용을 확인하세요.
        </_NotSelected>
      )}
    </_Wrapper>
  );
}

const _Wrapper = styled.div<{
  isSelected: boolean;
}>`
  margin-top: 10px;
  width: ${({ isSelected }) => (isSelected ? 436 : 180)}px;
  transition: width 0.7s ease-in-out;
`;

const _DetailBox = styled.div`
  margin-top: 43px;
  padding: 60px 40px;
  width: 436px;
  height: 485px;
  display: flex;
  flex-direction: column;
`;
const _NotSelected = styled(Text)`
  width: 180px;
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

const _MateList = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 8px;
`;
