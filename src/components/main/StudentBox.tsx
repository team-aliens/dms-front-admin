import styled from 'styled-components';
import { Text } from '@team-aliens/design-system';
import { StudentInfo } from '@/apis/managers/response';
import { useEffect, useRef } from 'react';

interface Props {
  studentInfo: StudentInfo;
  onClickStudent: (id: string) => void;
  isSelected: boolean;
  selectedStudentId: string;
}

export function StudentBox({
  studentInfo,
  onClickStudent,
  isSelected,
  selectedStudentId,
}: Props) {
  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (studentInfo.id === selectedStudentId)
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [selectedStudentId]);
  return (
    <_Wrapper
      ref={ref}
      isSelected={isSelected}
      className="studentBox"
      onClick={() => onClickStudent(studentInfo.id)}
    >
      <img src={studentInfo.profile_image_url} alt="프로필" />
      <Text
        size="bodyL"
        color={isSelected ? 'gray1' : 'gray10'}
        margin={['left', 16]}
      >
        {studentInfo.name}
      </Text>
      <Text
        margin={['left', 16]}
        size="bodyL"
        color={isSelected ? 'gray4' : 'gray6'}
      >
        {studentInfo.gcn}
      </Text>
      <Text
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
  z-index: 20;
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
