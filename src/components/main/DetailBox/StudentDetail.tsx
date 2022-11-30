import styled from 'styled-components';
import { Button, Text } from 'aliens-design-system-front';
import { StudentInfo } from '@/components/main/DetailBox/StudentInfo';
import { PointBox } from '@/components/main/DetailBox/PointBox';
import { GetStudentDetailResponse } from '@/apis/managers/response';

interface Props {
  studentDetail?: GetStudentDetailResponse;
  studentId: string;
}

const testValue: GetStudentDetailResponse = {
  name: '김범진',
  gcn: '2111',
  profile_image_url: 'https://~~',
  bonus_point: 1,
  minus_point: 999,
  room_number: 201,
  room_mates: [
    {
      id: '9c4f2fd8-4311-11ed-b878-0242ac120002',
      name: '김민성',
      profile_image_url: 'https://~~',
    },
  ],
};

export function StudentDetail({ studentDetail = testValue, studentId }: Props) {
  return (
    <_Wrapper isSelected={studentId !== ''}>
      <Text size="headLineL" color="gray6">
        학생 상세 확인
      </Text>
      {studentId && studentDetail ? (
        <_DetailBox>
          <StudentInfo
            name={studentDetail.name}
            gcn={studentDetail.gcn}
            room_number={studentDetail.room_number}
            profile_image_url={studentDetail.profile_image_url}
          />
          <_PointWrapper>
            <PointBox pointType="BONUS" point={studentDetail.bonus_point} />
            <PointBox pointType="MINUS" point={studentDetail.minus_point} />
          </_PointWrapper>
          <_RoomMates size="bodyS" color="gray6">
            동일 호실 학생
          </_RoomMates>
          <_MateList>
            {studentDetail.room_mates.map((item) => (
              <Button type="outline" onClick={() => {}} color="gray">
                {item.name}
              </Button>
            ))}
          </_MateList>
        </_DetailBox>
      ) : (
        <_NotSelected size="bodyL" color="gray5" display="block">
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
const _RoomMates = styled(Text)`
  margin-top: 40px;
`;
const _MateList = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 8px;
`;
