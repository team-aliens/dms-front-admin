import styled from 'styled-components';
import { Text } from '@team-aliens/design-system';

interface Props {
  name: string;
  gcn: string;
  room_number: number;
  profile_image_url: string;
}

export function StudentProfile({
  name,
  gcn,
  room_number,
  profile_image_url,
}: Props) {
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
        </_PersonalInfo>
        <Text size="bodyL" color="gray6" margin={['top', 12]}>
          {room_number}
          호
        </Text>
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
