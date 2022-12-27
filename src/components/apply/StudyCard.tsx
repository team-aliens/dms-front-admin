import styled from 'styled-components';
import { Text } from '@team-aliens/design-system';
import { StudyRoomItem } from '@/apis/studyRooms/response';
import { gradeTypeToKorean, sexTypeToKorean } from '@/utils/translate';

export function StudyCard({
  floor,
  name,
  available_grade,
  available_sex,
  total_available_seat,
  in_use_headcount,
}: StudyRoomItem) {
  return (
    <_Wrapper>
      <_Info>
        <Text color="primary" size="bodyM">
          {floor}
          층
        </Text>
        <Text color="gray8" size="bodyM" margin={['left', 14]}>
          {name}
        </Text>
      </_Info>
      <_Divider />
      <_Info>
        <Text color="primary" size="bodyM">
          {gradeTypeToKorean(available_grade)}
          {' '}
          {sexTypeToKorean(available_sex)}
        </Text>
        <Text color="gray5" size="bodyM" margin={['left', 'auto']}>
          {in_use_headcount}
          /
          {total_available_seat}
        </Text>
      </_Info>
    </_Wrapper>
  );
}

const _Wrapper = styled.li`
  width: 280px;
  height: 110px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.gray1};
  box-shadow: 0 1px 20px rgba(238, 238, 238, 0.8);
  padding: 20px 20px 14px 20px;
`;

const _Divider = styled.hr`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.color.gray4};
  margin: 12px 0 14px 0;
`;

const _Info = styled.div`
  display: flex;
`;
