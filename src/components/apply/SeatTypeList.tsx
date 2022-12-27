import styled from 'styled-components';
import { Text } from '@team-aliens/design-system';
import { SeatType } from '@/apis/studyRooms/response';

interface PropsType {
  seatTypes: SeatType[];
}

export function SeatTypeList({ seatTypes }: PropsType) {
  return (
    <_Wrapper>
      {seatTypes.map((i) => (
        <_Type color={i.color}>
          <div className="color" />
          <Text margin={['left', 9]} className="colorName">
            {i.name}
          </Text>
        </_Type>
      ))}
    </_Wrapper>
  );
}

const _Wrapper = styled.ul`
  width: 360px;
  display: flow;
  overflow-x: scroll;
  height: 24px;
  margin-bottom: 15px;
`;

const _Type = styled.li<{
  color: string;
}>`
  display: flex;
  align-items: center;
  margin-right: 16px;
  :last-of-type {
    margin-right: 0;
  }
  > .color {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${({ color }) => color};
  }
  > .colorName {
    color: ${({ color }) => color};
  }
`;
