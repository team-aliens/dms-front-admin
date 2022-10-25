import styled from 'styled-components';
import { Title, Text } from 'aliens-design-system-front';

interface Props {
  name: string;
  gcn: string;
  room_number: number;
  profile_image_url: string;
}

export function StudentInfo({
  name,
  gcn,
  room_number,
  profile_image_url,
}: Props) {
  return (
    <_StudnetInfo>
      <img src={profile_image_url} alt="프로필" />
      <_Wrapper>
        <_PersonalInfo>
          <Title fontSize="s" color="gray9">
            {name}
          </Title>
          <Title fontSize="s" color="gray6" className="gcn">
            {gcn}
          </Title>
        </_PersonalInfo>
        <Text fontSize="l" color="gray6" className="roomNumber">
          {room_number}호
        </Text>
      </_Wrapper>
    </_StudnetInfo>
  );
}

const _StudnetInfo = styled.div`
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
  > .roomNumber {
    margin-top: 12px;
  }
`;
const _PersonalInfo = styled.div`
  display: flex;
  > .gcn {
    margin-left: 16px;
  }
`;
