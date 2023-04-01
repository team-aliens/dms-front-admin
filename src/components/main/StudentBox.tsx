import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Text } from '@team-aliens/design-system';
import { StudentInfo } from '@/apis/managers/response';
import { ModeType } from '@/pages/Home';
import { usePointHistoryList } from '@/hooks/usePointHistoryList';
import { Tag } from './Tag';

interface Props {
  mode: ModeType;
  studentInfo: StudentInfo;
  onClickStudent: (id: string, modeType?: ModeType) => void;
  isSelected: boolean;
  selectedStudentId: string[];
}

export function StudentBox({
  studentInfo,
  onClickStudent,
  isSelected,
  selectedStudentId,
  mode,
}: Props) {
  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (selectedStudentId.includes(studentInfo.id))
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [selectedStudentId]);
  const { updateRecentlyStudentInfo } = usePointHistoryList();
  return (
    <_Wrapper
      ref={ref}
      isSelected={isSelected}
      className="studentBox"
      onClick={() => {
        onClickStudent(studentInfo.id, mode);
        updateRecentlyStudentInfo({
          studentId: studentInfo.id,
          gcn: studentInfo.gcn,
          name: studentInfo.name,
        });
      }}
    >
      <img
        className="studentBox"
        src={studentInfo.profile_image_url}
        alt="프로필"
      />
      <Text
        className="studentBox"
        size="bodyL"
        color={isSelected ? 'gray1' : 'gray10'}
        margin={['left', 16]}
      >
        {studentInfo.name}
      </Text>
      <Text
        className="studentBox"
        margin={['left', 16]}
        size="bodyL"
        color={isSelected ? 'gray4' : 'gray6'}
      >
        {studentInfo.gcn}
      </Text>
      <_Tags isSelected={isSelected}>
        {studentInfo.tags?.map((tag) => (
          <Tag key={tag.id} id={tag.id} color={tag.color} name={tag.name} />
        ))}
      </_Tags>
      <Text
        className="studentBox"
        size="bodyL"
        color={isSelected ? 'gray4' : 'gray6'}
        margin={['left', 'auto']}
      >
        {studentInfo.room_number}호
      </Text>
    </_Wrapper>
  );
}

interface WrapperProps {
  isSelected: boolean;
}

const _Wrapper = styled.li<WrapperProps>`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 70px;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.color.primaryDarken1 : theme.color.gray1};
  box-shadow: 0 1px 20px rgba(204, 204, 204, 0.24);
  border-radius: 4px;
  padding: 17px 40px 17px 36px;
  display: flex;
  align-items: center;
  cursor: pointer;
  > img {
    width: 36px;
    height: 36px;
    background-color: ${({ theme, isSelected }) =>
      isSelected ? theme.color.primary : theme.color.gray5};
    border-radius: 50%;
  }
`;

const _Tags = styled.div<{ isSelected: boolean }>`
  max-width: 45%;
  display: flex;
  align-items: center;
  margin-left: 24px;
  gap: 10px;
  white-space: nowrap;
  overflow: hidden;
  opacity: ${({ isSelected }) => (isSelected ? 0.5 : 1)};
`;
