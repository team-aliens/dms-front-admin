import styled from 'styled-components';
import { Title, Text } from 'aliens-design-system-front';

interface Props {
  name: string;
  gcn: string;
  room_number: number;
}

export function StudentInfo({ name, gcn, room_number }: Props) {
  return (
    <_StudnetInfo>
      <img />
      <_Wrapper>
        <_PersonalInfo>
          <Title fontSize="m" color="gray9">
            {name}
          </Title>
          <Title fontSize="m" color="gray6" className="gcn">
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
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-right: 24px;
    background-color: gray;
  }
`;
const _Wrapper = styled.div`
  margin-top: 18px;
  > .roomNumber {
    margin-top: 20px;
  }
`;
const _PersonalInfo = styled.div`
  display: flex;
  > .gcn {
    margin-left: 20px;
  }
`;
