import styled from 'styled-components';
import { SeeMore, Text } from '@team-aliens/design-system';
import { useState } from 'react';
import { GenderType } from '@/apis/managers/response';
import { GenderEnum } from '@/apis/managers';
import { useModal } from '@/hooks/useModal';

interface Props {
  student_id: string;
  name: string;
  gcn: string;
  sex: GenderType;
  room_number: string;
  profile_image_url: string;
}

export function StudentProfile({
  student_id,
  name,
  gcn,
  sex,
  room_number,
  profile_image_url,
}: Props) {
  const [openDeleteStudent, setOpenDeleteStudent] = useState<boolean>(false);
  const { selectModal } = useModal();
  const openDeleteStudentModal = () => selectModal('DELETE_STUDENT');

  const ChangeState = () => {
    setOpenDeleteStudent(!openDeleteStudent);
  };

  return (
    <_StudentInfo>
      <img src={profile_image_url} alt="프로필" />
      <_Wrapper>
        <_PersonalInfo>
          <Text size="headlineS" color="gray10">
            {name}
          </Text>
          <Text size="headlineS" color="gray6" margin={['left', 16]}>
            {gcn}
          </Text>
          <_Icon onClick={ChangeState}>
            <SeeMore size={24} colorKey="gray5" />
          </_Icon>
          {openDeleteStudent && (
            <_DeleteStudent onClick={openDeleteStudentModal}>
              학생 삭제
            </_DeleteStudent>
          )}
        </_PersonalInfo>
        <_HStack>
          <Text size="bodyL" color="gray6" margin={['top', 12]}>
            {room_number}호
          </Text>
          <_Gender sex={sex}>{GenderEnum[sex]}</_Gender>
        </_HStack>
      </_Wrapper>
    </_StudentInfo>
  );
}

const _StudentInfo = styled.div`
  display: flex;
  > img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 24px;
    background-color: gray;
  }
`;
const _Wrapper = styled.div`
  margin-top: 13px;
`;
const _PersonalInfo = styled.div`
  display: flex;
`;

const _DeleteStudent = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.error};
  ${({ theme }) => theme.font.bodyM};
  top: 114px;
  right: 40px;
  width: 160px;
  height: 56px;
  box-shadow: 0px 1px 20px rgba(238, 238, 238, 0.8);
  background-color: ${({ theme }) => theme.color.gray1};
  border-radius: 6px;
  cursor: pointer;
  z-index: 2;
`;

const _HStack = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const _Icon = styled.div`
  position: absolute;
  cursor: pointer;
  right: 45px;
  top: 75px;
`;

const _Gender = styled.div<{ sex: GenderType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 30px;
  background-color: ${({ theme, sex }) =>
    sex === 'MALE' ? theme.color.primaryLighten2 : theme.color.errorLighten2};
  border-radius: 24px;
  color: ${({ theme, sex }) =>
    sex === 'MALE' ? theme.color.primary : theme.color.error};
  margin-top: 12px;
  ${({ theme }) => theme.font.BtnM};
  z-index: 1;
`;
